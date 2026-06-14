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

// ── math helpers ──────────────────────────────────────────────────────────

function erf(x: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const p =
    t *
    (0.254829592 +
      t *
        (-0.284496736 +
          t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const r = 1 - p * Math.exp(-x * x);
  return x >= 0 ? r : -r;
}

function normalCDF(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

// ── types ─────────────────────────────────────────────────────────────────

interface ORResult {
  or: number;
  lnOR: number;
  se: number;
  z: number;
  pValue: number;
  ciLow: number;
  ciHigh: number;
  corrected: boolean;
}

const CONFIDENCE_LEVELS = ["0.90", "0.95", "0.99"];
const Z_FOR_CL: Record<string, number> = { "0.90": 1.6449, "0.95": 1.96, "0.99": 2.5758 };

function compute(
  a: number, b: number, c: number, d: number, cl: string
): ORResult | null {
  if ([a, b, c, d].some((v) => !Number.isFinite(v) || v < 0)) return null;
  let aa = a, bb = b, cc = c, dd = d;
  const corrected = aa === 0 || bb === 0 || cc === 0 || dd === 0;
  if (corrected) { aa += 0.5; bb += 0.5; cc += 0.5; dd += 0.5; }
  if (bb === 0 || cc === 0) return null;
  const or = (aa * dd) / (bb * cc);
  if (or <= 0) return null;
  const lnOR = Math.log(or);
  const se = Math.sqrt(1 / aa + 1 / bb + 1 / cc + 1 / dd);
  const z = lnOR / se;
  const pValue = Math.min(2 * (1 - normalCDF(Math.abs(z))), 1);
  const zCl = Z_FOR_CL[cl] ?? 1.96;
  const ciLow = Math.exp(lnOR - zCl * se);
  const ciHigh = Math.exp(lnOR + zCl * se);
  return { or, lnOR, se, z, pValue, ciLow, ciHigh, corrected };
}

// ── component ─────────────────────────────────────────────────────────────

export default function OddsRatioCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.odds-ratio-calculator");
  const [aVal, setAVal] = React.useState("");
  const [bVal, setBVal] = React.useState("");
  const [cVal, setCVal] = React.useState("");
  const [dVal, setDVal] = React.useState("");
  const [cl, setCl] = React.useState("0.95");
  const [touched, setTouched] = React.useState(false);

  const a = parseFloat(aVal), b = parseFloat(bVal);
  const c = parseFloat(cVal), d = parseFloat(dVal);
  const allValid =
    aVal !== "" && bVal !== "" && cVal !== "" && dVal !== "" &&
    [a, b, c, d].every((v) => Number.isFinite(v) && v >= 0);

  const result = React.useMemo<ORResult | null>(() => {
    if (!allValid) return null;
    return compute(a, b, c, d, cl);
  }, [a, b, c, d, cl, allValid]);

  function loadExample(av: string, bv: string, cv: string, dv: string) {
    setAVal(av); setBVal(bv); setCVal(cv); setDVal(dv);
    setTouched(true);
  }

  function reset() {
    setAVal(""); setBVal(""); setCVal(""); setDVal("");
    setCl("0.95"); setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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
        const a2 = t(`faq.q${i}_a` as never);
        if (q && a2 && !q.startsWith("tool.")) arr.push({ q, a: a2 });
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

  const showError = touched && (!allValid || (allValid && result === null));

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
          <p className="text-sm text-zinc-500">{t("tableNote")}</p>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold text-zinc-800">{t("group.exposed")}</h3>
              <div className="space-y-2">
                <Label htmlFor="orc-a">{t("field.a")}</Label>
                <Input
                  id="orc-a" type="number" inputMode="numeric" min="0"
                  value={aVal} placeholder={t("placeholder.cell")}
                  onChange={(e) => { setAVal(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orc-b">{t("field.b")}</Label>
                <Input
                  id="orc-b" type="number" inputMode="numeric" min="0"
                  value={bVal} placeholder={t("placeholder.cell")}
                  onChange={(e) => { setBVal(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-zinc-800">{t("group.unexposed")}</h3>
              <div className="space-y-2">
                <Label htmlFor="orc-c">{t("field.c")}</Label>
                <Input
                  id="orc-c" type="number" inputMode="numeric" min="0"
                  value={cVal} placeholder={t("placeholder.cell")}
                  onChange={(e) => { setCVal(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orc-d">{t("field.d")}</Label>
                <Input
                  id="orc-d" type="number" inputMode="numeric" min="0"
                  value={dVal} placeholder={t("placeholder.cell")}
                  onChange={(e) => { setDVal(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="orc-cl">{t("field.confidenceLevel")}</Label>
            <select
              id="orc-cl"
              value={cl}
              className="flex h-9 w-full max-w-xs rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
              onChange={(e) => { setCl(e.target.value); setTouched(true); }}
            >
              {CONFIDENCE_LEVELS.map((v) => (
                <option key={v} value={v}>{(parseFloat(v) * 100).toFixed(0)}%</option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && allValid && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              {result.corrected && (
                <p className="text-xs text-amber-600">{t("result.correctionNote")}</p>
              )}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {([
                  ["result.or", fmt(result.or)],
                  ["result.ciLabel", `${fmt(result.ciLow)} – ${fmt(result.ciHigh)}`],
                  ["result.z", fmt(result.z)],
                  ["result.pValue", fmt(result.pValue)],
                  ["result.lnOR", fmt(result.lnOR)],
                  ["result.se", fmt(result.se)],
                ] as [string, string][]).map(([key, val]) => (
                  <div key={key} className="rounded border border-zinc-200 bg-white p-3">
                    <div className="text-xs text-zinc-500">{t(key as never)}</div>
                    <div className="mt-1 text-lg font-semibold text-zinc-900">{val}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-zinc-500">{t("formula")}</p>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("650", "350", "100", "900")}>
            {t("examples.loadSmoking")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("38", "162", "85", "115")}>
            {t("examples.loadDrug")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("15", "485", "55", "445")}>
            {t("examples.loadVaccine")}
          </Button>
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
