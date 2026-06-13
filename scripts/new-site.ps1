# scripts/new-site.ps1
#
# Scaffold a new site in apps/<name>/ from a template, then create the GA4
# property and inject the Measurement ID.
#
# Usage:
#   pnpm new-site -Name blog -Template vite -Domain blog.weavejam.com
#   pnpm new-site -Name shop -Template nextjs -Domain shop.weavejam.com
#
# After this finishes you still need to:
#   - Create a Cloudflare Pages project named <Name> (or run the deploy
#     command — Pages auto-creates on first wrangler deploy)
#   - Add a CNAME <name>.weavejam.com -> <name>.pages.dev (use the
#     cloudflare-dns skill)

param(
  [Parameter(Mandatory=$true)][string]$Name,
  [Parameter(Mandatory=$true)][ValidateSet("vite", "nextjs")][string]$Template,
  [Parameter(Mandatory=$true)][string]$Domain,
  [string]$GaAccountId = "129287754"   # Bill Personal — change for other accounts
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$templateName = if ($Template -eq "vite") { "vite-react" } else { "nextjs" }
$templateDir = Join-Path $repoRoot "templates/$templateName"
$appDir = Join-Path $repoRoot "apps/$Name"

if (Test-Path $appDir) {
  Write-Error "apps/$Name already exists. Pick a different name or delete it first."
}
if (-not (Test-Path $templateDir)) {
  Write-Error "Template directory not found: $templateDir"
}

# 1) Copy template
Write-Host "==> Copying template '$Template' -> apps/$Name ..."
Copy-Item -Recurse -Path $templateDir -Destination $appDir

# 2) Create GA4 property (sets $mid)
Write-Host "==> Creating GA4 Property for https://$Domain ..."
$gaScript = "D:\ga4-tools\new-ga4-property.ps1"
if (-not (Test-Path $gaScript)) {
  Write-Warning "GA script not found at $gaScript. Skipping — you'll need to inject GA manually."
  $mid = "G-XXXXXXXXXX"
} else {
  $env:Path = "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin;$env:Path"
  $gaOut = & $gaScript -AccountId $GaAccountId -DisplayName "$Name ($Domain)" -Url "https://$Domain" -StreamName "Web Stream"
  $mid = ($gaOut | Select-Object -Last 1).Trim()
  if ($mid -notmatch '^G-[A-Z0-9]+$') {
    Write-Warning "Couldn't parse Measurement ID from GA script output. Got: '$mid'. Using placeholder."
    $mid = "G-XXXXXXXXXX"
  }
}
Write-Host "    Measurement ID: $mid"

# 3) Replace placeholders in every template file
Write-Host "==> Substituting placeholders (__SITENAME__, __GA_MEASUREMENT_ID__) ..."
$textExts = @(".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".html", ".css", ".md", ".toml", ".yaml", ".yml")
Get-ChildItem $appDir -Recurse -File | Where-Object { $textExts -contains $_.Extension.ToLower() } | ForEach-Object {
  $content = Get-Content $_.FullName -Raw -Encoding UTF8
  $new = $content.Replace("__SITENAME__", $Name).Replace("__GA_MEASUREMENT_ID__", $mid)
  if ($new -ne $content) {
    Set-Content -Path $_.FullName -Value $new -Encoding UTF8 -NoNewline
  }
}

# 3b) Render deploy workflow into .github/workflows/deploy-<name>.yml
Write-Host "==> Adding deploy workflow .github/workflows/deploy-$Name.yml ..."
$outDir = if ($Template -eq "vite") { "dist" } else { "out" }
$workflowsDir = Join-Path $repoRoot ".github/workflows"
New-Item -ItemType Directory -Force -Path $workflowsDir | Out-Null
$tmpl = Get-Content (Join-Path $repoRoot "templates/_shared/deploy.yml.tmpl") -Raw -Encoding UTF8
$rendered = $tmpl.Replace("__SITENAME__", $Name).Replace("__DOMAIN__", $Domain).Replace("__OUTDIR__", $outDir)
$workflowPath = Join-Path $workflowsDir "deploy-$Name.yml"
Set-Content -Path $workflowPath -Value $rendered -Encoding UTF8 -NoNewline
Write-Host "    -> $workflowPath"

# 4) Install deps for the new workspace
Write-Host "==> Installing dependencies (pnpm) ..."
Push-Location $repoRoot
try {
  pnpm install | Out-Host
} finally {
  Pop-Location
}

# 5) Print next steps
Write-Host ""
Write-Host "Done." -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. cd apps/$Name && pnpm dev"
Write-Host "  2. First deploy (creates the CF Pages project automatically):"
Write-Host "       pnpm --filter @weavejam/$Name build"
Write-Host "       pnpm --filter @weavejam/$Name deploy"
Write-Host "  3. Add DNS: $Domain CNAME -> $Name.pages.dev"
Write-Host "       (use cloudflare-dns skill — already auto-loads token)"
Write-Host "  4. Add the custom domain in the CF Pages project settings."
Write-Host "  5. Subsequent deploys are automated via .github/workflows/deploy-$Name.yml"
Write-Host "     (needs repo secrets CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID — already set on weavejam/sites)."
Write-Host ""
Write-Host "GSC: $Domain is already covered by the sc-domain:weavejam.com Domain"
Write-Host "     property. Zero action needed."
