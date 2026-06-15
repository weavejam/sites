"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/locales";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type BulkModulusError = { error: "invalid" | "volumeChange" | "poissonsRange" };
type BulkModulusOk = {
  K: number;
  compressibility: number;
  volumeStrain: number | null;
  method: string;
};
type BulkModulusResult = BulkModulusError | BulkModulusOk;
type CalcMethod = "directPV" | "densitySound" | "youngPoisson";

function isOk(r: BulkModulusResult): r is BulkModulusOk {
  return "K" in r;
}

const METHODS: CalcMethod[] = ["directPV", "densitySound", "youngPoisson"];

function formatNum(n: number, digits = 6): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

function formatSci(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (n === 0) return "0";
  const exp = Math.floor(Math.log10(Math.abs(n)));
  const mantissa = n / 10 ** exp;
  return `${mantissa.toLocaleString("en-US", { maximumFractionDigits: 4 })} × 10^${exp}`;
}

export default function BulkModulusCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.bulk-modulus-calculator");

  const [method, setMethod] = React.useState<CalcMethod>("directPV");

  // Direct PV fields
  const [v0, setV0] = React.useState("");
  const [vf, setVf] = React.useState("");
  const [p0, setP0] = React.useState("");
  const [pf, setPf] = React.useState("");

  // Density + sound speed fields
  const [density, setDensity] = React.useState("");
  const [soundSpeed, setSoundSpeed] = React.useState("");

  // Young's + Poisson's fields
  const [youngs, setYoungs] = React.useState("");
  const [poisson, setPoisson] = React.useState("");

  const [touched, setTouched] = React.useState(false);

  function reset() {
    setV0("");
    setVf("");
    setP0("");
    setPf("");
    setDensity("");
    setSoundSpeed("");
    setYoungs("");
    setPoisson("");
    setTouched(false);
  }

  const result = React.useMemo((): BulkModulusResult | null => {
    if (!touched) return null;

    if (method === "directPV") {
      const v0n = parseFloat(v0);
      const vfn = parseFloat(vf);
      const p0n = parseFloat(p0);
      const pfn = parseFloat(pf);
      if (
        ![v0n, vfn, p0n, pfn].every((x) => Number.isFinite(x)) ||
        v0n <= 0 ||
        vfn <= 0
      )
        return { error: "invalid" as const };
      const dV = vfn - v0n;
      if (dV === 0) return { error: "volumeChange" as const };
      const dP = pfn - p0n;
      const K = -v0n * (dP / dV);
      const volumeStrain = dV / v0n;
      return { K, compressibility: 1 / K, volumeStrain, method: "directPV" };
    }

    if (method === "densitySound") {
      const rho = parseFloat(density);
      const c = parseFloat(soundSpeed);
      if (!Number.isFinite(rho) || !Number.isFinite(c) || rho <= 0 || c <= 0)
        return { error: "invalid" as const };
      const K = rho * c * c;
      return { K, compressibility: 1 / K, volumeStrain: null, method: "densitySound" };
    }

    if (method === "youngPoisson") {
      const E = parseFloat(youngs);
      const nu = parseFloat(poisson);
      if (!Number.isFinite(E) || !Number.isFinite(nu) || E <= 0)
        return { error: "invalid" as const };
      if (nu <= -1 || nu >= 0.5) return { error: "poissonsRange" as const };
      const K = E / (3 * (1 - 2 * nu));
      return { K, compressibility: 1 / K, volumeStrain: null, method: "youngPoisson" };
    }

    return null;
  }, [touched, method, v0, vf, p0, pf, density, soundSpeed, youngs, poisson]);

  function loadExample(
    m: CalcMethod,
    fields: Partial<{
      v0: string;
      vf: string;
      p0: string;
      pf: string;
      density: string;
      soundSpeed: string;
      youngs: string;
      poisson: string;
    }>
  ) {
    setMethod(m);
    if (fields.v0 !== undefined) setV0(fields.v0);
    if (fields.vf !== undefined) setVf(fields.vf);
    if (fields.p0 !== undefined) setP0(fields.p0);
    if (fields.pf !== undefined) setPf(fields.pf);
    if (fields.density !== undefined) setDensity(fields.density);
    if (fields.soundSpeed !== undefined) setSoundSpeed(fields.soundSpeed);
    if (fields.youngs !== undefined) setYoungs(fields.youngs);
    if (fields.poisson !== undefined) setPoisson(fields.poisson);
    setTouched(true);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note: string }[]
      | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch {
        break;
      }
    }
    return arr;
  }, [t]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: t("title"),
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description: t("tagline"),
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  const errorKey =
    result && !isOk(result) ? result.error : null;

  const okResult = result && isOk(result) ? result : null;

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="text-lg text-zinc-600">{t("tagline")}</p>
        <p className="text-sm text-zinc-500">{t("intro")}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("tagline")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Method selector */}
          <div className="space-y-2">
            <Label>{t("method.label")}</Label>
            <div className="flex flex-wrap gap-2">
              {METHODS.map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={method === m ? "default" : "outline"}
                  onClick={() => {
                    setMethod(m);
                    setTouched(false);
                  }}
                >
                  {t(`method.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {/* Direct PV fields */}
          {method === "directPV" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="bm-v0">{t("field.initialVolume")}</Label>
                <Input
                  id="bm-v0"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={v0}
                  placeholder={t("placeholder.initialVolume")}
                  onChange={(e) => { setV0(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bm-vf">{t("field.finalVolume")}</Label>
                <Input
                  id="bm-vf"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={vf}
                  placeholder={t("placeholder.finalVolume")}
                  onChange={(e) => { setVf(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bm-p0">{t("field.initialPressure")}</Label>
                <Input
                  id="bm-p0"
                  type="number"
                  inputMode="decimal"
                  step="any"
                  value={p0}
                  placeholder={t("placeholder.initialPressure")}
                  onChange={(e) => { setP0(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bm-pf">{t("field.finalPressure")}</Label>
                <Input
                  id="bm-pf"
                  type="number"
                  inputMode="decimal"
                  step="any"
                  value={pf}
                  placeholder={t("placeholder.finalPressure")}
                  onChange={(e) => { setPf(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
          )}

          {/* Density + sound speed fields */}
          {method === "densitySound" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="bm-density">{t("field.density")}</Label>
                <Input
                  id="bm-density"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={density}
                  placeholder={t("placeholder.density")}
                  onChange={(e) => { setDensity(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bm-sound">{t("field.soundSpeed")}</Label>
                <Input
                  id="bm-sound"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={soundSpeed}
                  placeholder={t("placeholder.soundSpeed")}
                  onChange={(e) => { setSoundSpeed(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
          )}

          {/* Young's + Poisson's fields */}
          {method === "youngPoisson" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="bm-youngs">{t("field.youngsModulus")}</Label>
                <Input
                  id="bm-youngs"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={youngs}
                  placeholder={t("placeholder.youngsModulus")}
                  onChange={(e) => { setYoungs(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bm-poisson">{t("field.poissonsRatio")}</Label>
                <Input
                  id="bm-poisson"
                  type="number"
                  inputMode="decimal"
                  step="any"
                  value={poisson}
                  placeholder={t("placeholder.poissonsRatio")}
                  onChange={(e) => { setPoisson(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {errorKey && (
            <p className="text-sm text-red-600">
              {t(`error.${errorKey}` as never)}
            </p>
          )}

          {okResult && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.bulkModulus")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatNum(okResult.K / 1e9, 4)} GPa
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.compressibility")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatSci(okResult.compressibility)} Pa⁻¹
                  </div>
                </div>
                {okResult.volumeStrain !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">
                      {t("result.volumeStrain")}
                    </div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {formatNum(okResult.volumeStrain * 100, 4)}%
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("about.heading")}
        </h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("examples.heading")}
        </h2>
        <p className="text-zinc-600">{t("examples.intro")}</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colInput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colOutput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colNote")}
                </th>
              </tr>
            </thead>
            <tbody>
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {ex.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("directPV", {
                v0: "0.001",
                vf: "0.000995",
                p0: "101325",
                pf: "10100000",
              })
            }
          >
            {t("examples.loadWater")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("youngPoisson", {
                youngs: "200000000000",
                poisson: "0.3",
              })
            }
          >
            {t("examples.loadSteel")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("directPV", {
                v0: "0.01",
                vf: "0.008",
                p0: "101325",
                pf: "200000",
              })
            }
          >
            {t("examples.loadAir")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((f, i) => (
            <div key={i} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{f.q}</div>
              <div className="mt-1 text-zinc-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
