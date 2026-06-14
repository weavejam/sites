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

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface KWResult {
  H: number;
  df: number;
  pValue: number;
  N: number;
  groups: { n: number; rankSum: number; mean: number }[];
}

function parseNumbers(text: string): number[] {
  return text
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map((s) => parseFloat(s))
    .filter((n) => Number.isFinite(n));
}

function assignRanks(values: number[]): number[] {
  const n = values.length;
  const indexed = values.map((v, i) => ({ v, i }));
  indexed.sort((a, b) => a.v - b.v);
  const ranks = new Array(n).fill(0);
  let i = 0;
  while (i < n) {
    let j = i;
    while (j < n - 1 && indexed[j + 1].v === indexed[j].v) j++;
    const avg = (i + j + 2) / 2;
    for (let k = i; k <= j; k++) ranks[indexed[k].i] = avg;
    i = j + 1;
  }
  return ranks;
}

// Regularized incomplete gamma function via series expansion
function gammaLn(x: number): number {
  const c = [76.18009172947146, -86.50532032941677, 24.01409824083091,
    -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
  let y = x;
  let tmp = x + 5.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;
  for (let j = 0; j < 6; j++) { y += 1; ser += c[j] / y; }
  return -tmp + Math.log(2.5066282746310005 * ser / x);
}

function gammainc(a: number, x: number): number {
  // regularized lower incomplete gamma via series
  if (x < 0 || a <= 0) return 0;
  if (x === 0) return 0;
  if (x < a + 1) {
    // series
    let ap = a;
    let sum = 1 / a;
    let del = sum;
    for (let n = 0; n < 200; n++) {
      ap += 1;
      del *= x / ap;
      sum += del;
      if (Math.abs(del) < Math.abs(sum) * 1e-10) break;
    }
    return sum * Math.exp(-x + a * Math.log(x) - gammaLn(a));
  } else {
    // continued fraction (upper)
    let b = x + 1 - a;
    let c = 1 / 1e-30;
    let d = 1 / b;
    let h = d;
    for (let i = 1; i <= 200; i++) {
      const an = -i * (i - a);
      b += 2;
      d = an * d + b;
      if (Math.abs(d) < 1e-30) d = 1e-30;
      c = b + an / c;
      if (Math.abs(c) < 1e-30) c = 1e-30;
      d = 1 / d;
      const del = d * c;
      h *= del;
      if (Math.abs(del - 1) < 1e-10) break;
    }
    const upper = Math.exp(-x + a * Math.log(x) - gammaLn(a)) * h;
    return 1 - upper;
  }
}

function chiSquaredPValue(x: number, df: number): number {
  if (x <= 0) return 1;
  return 1 - gammainc(df / 2, x / 2);
}

function computeKW(groups: number[][]): KWResult {
  const all = groups.flatMap((g) => g);
  const N = all.length;
  const ranks = assignRanks(all);
  let offset = 0;
  const groupStats = groups.map((g) => {
    const n = g.length;
    const rankSum = ranks.slice(offset, offset + n).reduce((s, r) => s + r, 0);
    offset += n;
    return { n, rankSum, mean: rankSum / n };
  });
  const rawH =
    (12 / (N * (N + 1))) *
      groupStats.reduce((s, g) => s + (g.rankSum * g.rankSum) / g.n, 0) -
    3 * (N + 1);

  // Tie correction: H_corrected = H_raw / (1 - Σ(t³-t)/(N³-N))
  const valCounts = new Map<number, number>();
  for (const v of all) valCounts.set(v, (valCounts.get(v) ?? 0) + 1);
  let tieSum = 0;
  for (const c of valCounts.values()) {
    if (c > 1) tieSum += c * c * c - c;
  }
  const denom = N * N * N - N;
  const correctionFactor = denom > 0 ? 1 - tieSum / denom : 1;
  const H = correctionFactor > 0 ? rawH / correctionFactor : rawH;

  const df = groups.length - 1;
  const pValue = chiSquaredPValue(H, df);
  return { H, df, pValue, N, groups: groupStats };
}

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

export default function KruskalWallisHTestCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.kruskal-wallis-h-test-calculator");

  const [groupInputs, setGroupInputs] = React.useState<string[]>(["", "", ""]);
  const [alpha, setAlpha] = React.useState("0.05");
  const [touched, setTouched] = React.useState(false);

  const parsedGroups = React.useMemo(
    () => groupInputs.map(parseNumbers),
    [groupInputs]
  );

  const result = React.useMemo<KWResult | null>(() => {
    const valid = parsedGroups.filter((g) => g.length >= 1);
    if (valid.length < 2) return null;
    const withData = parsedGroups.filter((g) => g.length >= 1);
    if (withData.length < 2) return null;
    return computeKW(withData);
  }, [parsedGroups]);

  function addGroup() {
    if (groupInputs.length < 5) setGroupInputs((prev) => [...prev, ""]);
  }
  function removeGroup(idx: number) {
    if (groupInputs.length > 2)
      setGroupInputs((prev) => prev.filter((_, i) => i !== idx));
  }
  function setGroup(idx: number, val: string) {
    setGroupInputs((prev) => prev.map((v, i) => (i === idx ? val : v)));
    setTouched(true);
  }
  function reset() {
    setGroupInputs(["", "", ""]);
    setAlpha("0.05");
    setTouched(false);
  }

  const alphaNum = parseFloat(alpha);
  const reject = result !== null && result.pValue < alphaNum;

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<{ q: string; a: string }[]>(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
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

  const ALPHAS = ["0.01", "0.05", "0.10"];

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
          <div className="space-y-4">
            {groupInputs.map((val, idx) => (
              <div key={idx} className="flex items-end gap-3">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`kw-g${idx}`}>
                    {t("field.group")} {idx + 1}
                  </Label>
                  <Input
                    id={`kw-g${idx}`}
                    value={val}
                    placeholder={t("placeholder.values")}
                    onChange={(e) => setGroup(idx, e.target.value)}
                  />
                </div>
                {groupInputs.length > 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeGroup(idx)}
                  >
                    {t("button.removeGroup")}
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {groupInputs.length < 5 && (
              <Button type="button" variant="outline" size="sm" onClick={addGroup}>
                {t("button.addGroup")}
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <Label>{t("field.alpha")}</Label>
            <div className="flex flex-wrap gap-2">
              {ALPHAS.map((a) => (
                <Button
                  key={a}
                  type="button"
                  variant={alpha === a ? "default" : "outline"}
                  onClick={() => setAlpha(a)}
                >
                  {a}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {touched && result === null && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.H")}</div>
                  <div className="text-xl font-semibold">{fmt(result.H)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.df")}</div>
                  <div className="text-xl font-semibold">{result.df}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.pValue")}</div>
                  <div className="text-xl font-semibold">{fmt(result.pValue)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.N")}</div>
                  <div className="text-xl font-semibold">{result.N}</div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200">
                      <th className="px-2 py-1 font-semibold">{t("result.groupCol")}</th>
                      <th className="px-2 py-1 font-semibold">{t("result.nCol")}</th>
                      <th className="px-2 py-1 font-semibold">{t("result.rankSumCol")}</th>
                      <th className="px-2 py-1 font-semibold">{t("result.meanRankCol")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.groups.map((g, i) => (
                      <tr key={i} className="border-b border-zinc-100">
                        <td className="px-2 py-1">{i + 1}</td>
                        <td className="px-2 py-1">{g.n}</td>
                        <td className="px-2 py-1">{fmt(g.rankSum)}</td>
                        <td className="px-2 py-1">{fmt(g.mean)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                className={`text-sm font-medium ${reject ? "text-red-600" : "text-green-600"}`}
              >
                {reject ? t("result.reject") : t("result.failReject")}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("examples.heading")}</h2>
        <p className="text-zinc-600">{t("examples.intro")}</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="px-3 py-2 font-semibold">{t("examples.colInput")}</th>
                <th className="px-3 py-2 font-semibold">{t("examples.colOutput")}</th>
                <th className="px-3 py-2 font-semibold">{t("examples.colNote")}</th>
              </tr>
            </thead>
            <tbody>
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{ex.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
        <div className="space-y-4">
          {faqItems.map((f, idx) => (
            <div key={idx} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{f.q}</div>
              <div className="mt-1 text-zinc-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
