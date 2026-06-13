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

// Q critical values table for Tukey HSD
// Rows: df_error, Cols index: k-2 (k = number of groups, k=2..10)
const Q_TABLE_005: Record<number, number[]> = {
  1:   [17.97, 26.98, 32.82, 37.08, 40.41, 43.12, 45.40, 47.36, 49.07],
  2:   [6.085, 8.331, 9.798, 10.88, 11.74, 12.44, 13.03, 13.54, 13.99],
  3:   [4.501, 5.910, 6.825, 7.502, 8.037, 8.478, 8.853, 9.177, 9.462],
  4:   [3.927, 5.040, 5.757, 6.287, 6.707, 7.053, 7.347, 7.602, 7.826],
  5:   [3.635, 4.602, 5.218, 5.673, 6.033, 6.330, 6.582, 6.802, 6.995],
  6:   [3.461, 4.339, 4.896, 5.305, 5.628, 5.895, 6.122, 6.319, 6.493],
  7:   [3.344, 4.165, 4.681, 5.060, 5.359, 5.606, 5.815, 5.998, 6.158],
  8:   [3.261, 4.041, 4.529, 4.886, 5.167, 5.399, 5.597, 5.767, 5.918],
  9:   [3.199, 3.949, 4.415, 4.756, 5.024, 5.244, 5.432, 5.595, 5.739],
  10:  [3.151, 3.877, 4.327, 4.654, 4.912, 5.124, 5.305, 5.461, 5.599],
  12:  [3.082, 3.773, 4.199, 4.508, 4.751, 4.950, 5.119, 5.265, 5.395],
  15:  [3.014, 3.674, 4.076, 4.367, 4.595, 4.782, 4.940, 5.077, 5.198],
  20:  [2.950, 3.578, 3.958, 4.232, 4.445, 4.620, 4.768, 4.895, 5.008],
  24:  [2.919, 3.532, 3.901, 4.166, 4.373, 4.541, 4.684, 4.807, 4.915],
  30:  [2.888, 3.486, 3.845, 4.102, 4.302, 4.464, 4.602, 4.720, 4.824],
  40:  [2.858, 3.442, 3.791, 4.039, 4.232, 4.389, 4.521, 4.635, 4.735],
  60:  [2.829, 3.399, 3.737, 3.977, 4.163, 4.314, 4.441, 4.550, 4.646],
  120: [2.800, 3.356, 3.685, 3.917, 4.096, 4.241, 4.363, 4.468, 4.560],
  9999:[2.772, 3.314, 3.633, 3.858, 4.030, 4.170, 4.286, 4.387, 4.474],
};

const Q_TABLE_001: Record<number, number[]> = {
  1:   [90.03, 135.0, 164.3, 185.6, 202.2, 215.8, 227.2, 237.0, 245.6],
  2:   [14.04, 19.02, 22.29, 24.72, 26.63, 28.20, 29.53, 30.68, 31.69],
  3:   [8.261, 10.62, 12.17, 13.33, 14.24, 15.00, 15.64, 16.20, 16.69],
  4:   [6.512, 8.120, 9.173, 9.958, 10.58, 11.10, 11.55, 11.93, 12.27],
  5:   [5.702, 6.976, 7.804, 8.421, 8.913, 9.321, 9.669, 9.972, 10.24],
  6:   [5.243, 6.331, 7.033, 7.556, 7.973, 8.318, 8.613, 8.869, 9.097],
  7:   [4.949, 5.919, 6.543, 7.005, 7.373, 7.679, 7.939, 8.166, 8.368],
  8:   [4.746, 5.635, 6.204, 6.625, 6.960, 7.237, 7.474, 7.681, 7.863],
  9:   [4.596, 5.428, 5.957, 6.348, 6.658, 6.915, 7.134, 7.325, 7.495],
  10:  [4.482, 5.270, 5.769, 6.136, 6.428, 6.669, 6.875, 7.055, 7.213],
  12:  [4.320, 5.046, 5.502, 5.836, 6.101, 6.321, 6.507, 6.670, 6.814],
  15:  [4.168, 4.836, 5.252, 5.556, 5.796, 5.998, 6.170, 6.322, 6.456],
  20:  [4.024, 4.639, 5.018, 5.294, 5.510, 5.692, 5.849, 5.987, 6.112],
  24:  [3.956, 4.546, 4.907, 5.168, 5.374, 5.547, 5.695, 5.825, 5.943],
  30:  [3.889, 4.455, 4.799, 5.048, 5.242, 5.405, 5.546, 5.672, 5.785],
  40:  [3.825, 4.367, 4.696, 4.931, 5.114, 5.265, 5.399, 5.517, 5.622],
  60:  [3.762, 4.282, 4.595, 4.818, 4.991, 5.133, 5.258, 5.368, 5.469],
  120: [3.702, 4.200, 4.497, 4.709, 4.872, 5.005, 5.122, 5.225, 5.317],
  9999:[3.643, 4.120, 4.403, 4.603, 4.757, 4.882, 4.990, 5.085, 5.169],
};

function getQCritical(table: Record<number, number[]>, df: number, k: number): number {
  const kIdx = Math.min(Math.max(k, 2), 10) - 2;
  const dfKeys = Object.keys(table).map(Number).sort((a, b) => a - b);
  const dfClamped = Math.max(1, Math.min(df, 9999));

  let lower = dfKeys[0];
  let upper = dfKeys[dfKeys.length - 1];
  for (const key of dfKeys) {
    if (key <= dfClamped) lower = key;
    if (key >= dfClamped && upper === dfKeys[dfKeys.length - 1]) upper = key;
  }
  for (const key of dfKeys) {
    if (key >= dfClamped) { upper = key; break; }
  }

  if (lower === upper) return table[lower][kIdx];
  const lo = table[lower][kIdx];
  const hi = table[upper][kIdx];
  const t = (dfClamped - lower) / (upper - lower);
  return lo + t * (hi - lo);
}

interface GroupStats {
  n: number;
  mean: number;
  values: number[];
}

interface AnovaResult {
  groups: GroupStats[];
  grandMean: number;
  ssBetween: number;
  ssWithin: number;
  dfBetween: number;
  dfWithin: number;
  msBetween: number;
  msWithin: number;
  fStat: number;
}

interface PairResult {
  i: number;
  j: number;
  meanDiff: number;
  qStat: number;
  significant: boolean;
}

interface HsdResult {
  anova: AnovaResult;
  qCritical: number;
  hsdValue: number;
  pairs: PairResult[];
}

function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

function parseGroup(s: string): number[] {
  return s.split(/[\s,]+/).map((v) => parseFloat(v.trim())).filter((v) => Number.isFinite(v));
}

function computeHsd(groups: string[], alpha: "0.05" | "0.01"): HsdResult | null {
  const parsed = groups.map(parseGroup).filter((g) => g.length >= 2);
  if (parsed.length < 2) return null;

  const k = parsed.length;
  const N = parsed.reduce((s, g) => s + g.length, 0);
  if (N - k < 1) return null;

  const groupStats: GroupStats[] = parsed.map((vals) => {
    const n = vals.length;
    const mean = vals.reduce((s, v) => s + v, 0) / n;
    return { n, mean, values: vals };
  });

  const grandMean = groupStats.reduce((s, g) => s + g.n * g.mean, 0) / N;

  const ssBetween = groupStats.reduce((s, g) => s + g.n * (g.mean - grandMean) ** 2, 0);
  const ssWithin = groupStats.reduce((acc, g) => {
    return acc + g.values.reduce((s, v) => s + (v - g.mean) ** 2, 0);
  }, 0);

  const dfBetween = k - 1;
  const dfWithin = N - k;
  const msBetween = ssBetween / dfBetween;
  const msWithin = ssWithin / dfWithin;
  const fStat = msWithin > 0 ? msBetween / msWithin : 0;

  const nHarmonic = k / groupStats.reduce((s, g) => s + 1 / g.n, 0);

  const table = alpha === "0.05" ? Q_TABLE_005 : Q_TABLE_001;
  const qCritical = getQCritical(table, dfWithin, k);
  const hsdValue = qCritical * Math.sqrt(msWithin / nHarmonic);

  const pairs: PairResult[] = [];
  for (let i = 0; i < k; i++) {
    for (let j = i + 1; j < k; j++) {
      const meanDiff = Math.abs(groupStats[i].mean - groupStats[j].mean);
      const se = Math.sqrt(msWithin * (1 / groupStats[i].n + 1 / groupStats[j].n) / 2);
      const qStat = se > 0 ? meanDiff / se : 0;
      pairs.push({ i, j, meanDiff, qStat, significant: meanDiff > hsdValue });
    }
  }

  return {
    anova: { groups: groupStats, grandMean, ssBetween, ssWithin, dfBetween, dfWithin, msBetween, msWithin, fStat },
    qCritical,
    hsdValue,
    pairs,
  };
}

export default function TukeyHsdCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.tukey-hsd-calculator");
  const [numGroups, setNumGroups] = React.useState(3);
  const [groups, setGroups] = React.useState<string[]>(["", "", "", "", "", ""]);
  const [alpha, setAlpha] = React.useState<"0.05" | "0.01">("0.05");
  const [calculated, setCalculated] = React.useState(false);

  const result = React.useMemo<HsdResult | null>(() => {
    if (!calculated) return null;
    return computeHsd(groups.slice(0, numGroups), alpha);
  }, [calculated, groups, numGroups, alpha]);

  function updateGroup(i: number, val: string) {
    setGroups((prev) => { const next = [...prev]; next[i] = val; return next; });
    setCalculated(false);
  }

  function reset() {
    setGroups(["", "", "", "", "", ""]);
    setCalculated(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch { break; }
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

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
        <p className="text-lg text-zinc-600">{t("tagline")}</p>
        <p className="text-sm text-zinc-500">{t("intro")}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("tagline")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t("field.numGroups")}</Label>
              <div className="flex flex-wrap gap-2">
                {[2, 3, 4, 5, 6].map((n) => (
                  <Button
                    key={n}
                    type="button"
                    variant={numGroups === n ? "default" : "outline"}
                    size="sm"
                    onClick={() => { setNumGroups(n); setCalculated(false); }}
                  >
                    {n}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("field.alpha")}</Label>
              <div className="flex gap-2">
                {(["0.05", "0.01"] as const).map((a) => (
                  <Button
                    key={a}
                    type="button"
                    variant={alpha === a ? "default" : "outline"}
                    size="sm"
                    onClick={() => { setAlpha(a); setCalculated(false); }}
                  >
                    α = {a}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {Array.from({ length: numGroups }, (_, i) => (
              <div key={i} className="space-y-1">
                <Label htmlFor={`group-${i}`}>
                  {t("field.group")} {i + 1}
                </Label>
                <Input
                  id={`group-${i}`}
                  type="text"
                  value={groups[i]}
                  placeholder={t("placeholder.group")}
                  onChange={(e) => updateGroup(i, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setCalculated(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {calculated && !result && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && (
            <div className="space-y-6">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
                <div className="text-sm font-semibold text-zinc-700">{t("result.anovaHeading")}</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-200">
                        <th className="px-3 py-1 text-left font-medium">{t("result.source")}</th>
                        <th className="px-3 py-1 text-right font-medium">{t("result.ss")}</th>
                        <th className="px-3 py-1 text-right font-medium">{t("result.df")}</th>
                        <th className="px-3 py-1 text-right font-medium">{t("result.ms")}</th>
                        <th className="px-3 py-1 text-right font-medium">{t("result.f")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-zinc-100">
                        <td className="px-3 py-1">{t("result.between")}</td>
                        <td className="px-3 py-1 text-right">{fmt(result.anova.ssBetween)}</td>
                        <td className="px-3 py-1 text-right">{result.anova.dfBetween}</td>
                        <td className="px-3 py-1 text-right">{fmt(result.anova.msBetween)}</td>
                        <td className="px-3 py-1 text-right font-semibold">{fmt(result.anova.fStat)}</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-1">{t("result.within")}</td>
                        <td className="px-3 py-1 text-right">{fmt(result.anova.ssWithin)}</td>
                        <td className="px-3 py-1 text-right">{result.anova.dfWithin}</td>
                        <td className="px-3 py-1 text-right">{fmt(result.anova.msWithin)}</td>
                        <td className="px-3 py-1 text-right">—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-xs text-zinc-500">
                  {t("result.hsdValue")}: <span className="font-semibold text-zinc-800">{fmt(result.hsdValue)}</span>
                  {" | "}
                  {t("result.qCritical")}: <span className="font-semibold text-zinc-800">{fmt(result.qCritical)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold text-zinc-700">{t("result.pairHeading")}</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-200 bg-zinc-50">
                        <th className="px-3 py-2 text-left font-medium">{t("result.pair")}</th>
                        <th className="px-3 py-2 text-right font-medium">{t("result.meanI")}</th>
                        <th className="px-3 py-2 text-right font-medium">{t("result.meanJ")}</th>
                        <th className="px-3 py-2 text-right font-medium">{t("result.diff")}</th>
                        <th className="px-3 py-2 text-center font-medium">{t("result.significance")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.pairs.map((p, idx) => (
                        <tr key={idx} className="border-b border-zinc-100">
                          <td className="px-3 py-2">
                            {t("field.group")} {p.i + 1} {t("result.vsLabel")} {t("field.group")} {p.j + 1}
                          </td>
                          <td className="px-3 py-2 text-right">{fmt(result.anova.groups[p.i].mean)}</td>
                          <td className="px-3 py-2 text-right">{fmt(result.anova.groups[p.j].mean)}</td>
                          <td className="px-3 py-2 text-right">{fmt(p.meanDiff)}</td>
                          <td className="px-3 py-2 text-center">
                            <span className={p.significant ? "text-green-700 font-semibold" : "text-zinc-500"}>
                              {p.significant ? t("result.significant") : t("result.notSignificant")}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
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
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
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
