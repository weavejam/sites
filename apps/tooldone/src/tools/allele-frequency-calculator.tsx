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

type InputMode = "genotypeCounts" | "alleleCounts";

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

export default function AlleleFrequencyCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.allele-frequency-calculator");

  const [inputMode, setInputMode] = React.useState<InputMode>("genotypeCounts");
  const [aa2, setAa2] = React.useState(""); // AA homozygous dominant
  const [aa1, setAa1] = React.useState(""); // Aa heterozygous
  const [aa0, setAa0] = React.useState(""); // aa homozygous recessive
  const [alleleA, setAlleleA] = React.useState(""); // direct A count
  const [allelea, setAllelea] = React.useState(""); // direct a count
  const [totalOverride, setTotalOverride] = React.useState(""); // optional total N
  const [touched, setTouched] = React.useState(false);

  interface CalcResult {
    N: number;
    p: number;
    q: number;
    totalAlleles: number;
    aaExp: number;
    AaExp: number;
    aa0Exp: number;
    chiSq: number | null;
    inHWE: boolean;
    aaObs: number | null;
    AaObs: number | null;
    aa0Obs: number | null;
  }

  const result = React.useMemo<CalcResult | null>(() => {
    if (!touched) return null;
    if (inputMode === "genotypeCounts") {
      const nAA = parseFloat(aa2);
      const nAa = parseFloat(aa1);
      const naa = parseFloat(aa0);
      if (!Number.isFinite(nAA) || !Number.isFinite(nAa) || !Number.isFinite(naa)) return null;
      if (nAA < 0 || nAa < 0 || naa < 0) return null;
      const N = nAA + nAa + naa;
      if (N === 0) return null;
      const totalAlleles = 2 * N;
      const p = (2 * nAA + nAa) / totalAlleles;
      const q = 1 - p;
      const aaExp = p * p * N;
      const AaExp = 2 * p * q * N;
      const aa0Exp = q * q * N;
      // Chi-square test for HWE
      const chi = aaExp > 0 ? Math.pow(nAA - aaExp, 2) / aaExp : 0;
      const chi2 = AaExp > 0 ? Math.pow(nAa - AaExp, 2) / AaExp : 0;
      const chi3 = aa0Exp > 0 ? Math.pow(naa - aa0Exp, 2) / aa0Exp : 0;
      const chiSq = chi + chi2 + chi3;
      return { N, p, q, totalAlleles, aaExp, AaExp, aa0Exp, chiSq, inHWE: chiSq < 3.841, aaObs: nAA, AaObs: nAa, aa0Obs: naa };
    } else {
      const nA = parseFloat(alleleA);
      const na = parseFloat(allelea);
      if (!Number.isFinite(nA) || !Number.isFinite(na)) return null;
      if (nA < 0 || na < 0) return null;
      const totalAlleles = nA + na;
      if (totalAlleles === 0) return null;
      const p = nA / totalAlleles;
      const q = 1 - p;
      const totalN = totalOverride !== "" ? parseFloat(totalOverride) : totalAlleles / 2;
      const N = Number.isFinite(totalN) && totalN > 0 ? totalN : totalAlleles / 2;
      const aaExp = p * p * N;
      const AaExp = 2 * p * q * N;
      const aa0Exp = q * q * N;
      return { N, p, q, totalAlleles, aaExp, AaExp, aa0Exp, chiSq: null, inHWE: true, aaObs: null, AaObs: null, aa0Obs: null };
    }
  }, [touched, inputMode, aa2, aa1, aa0, alleleA, allelea, totalOverride]);

  function reset() {
    setAa2(""); setAa1(""); setAa0(""); setAlleleA(""); setAllelea(""); setTotalOverride(""); setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
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

  const showError = touched && result === null;

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
          <div className="space-y-2">
            <Label>{t("field.inputMode")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["genotypeCounts", "alleleCounts"] as InputMode[]).map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={inputMode === m ? "default" : "outline"}
                  onClick={() => { setInputMode(m); setTouched(false); }}
                >
                  {t(`type.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {inputMode === "genotypeCounts" ? (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="af-aa">{t("field.aa2")}</Label>
                <Input
                  id="af-aa"
                  type="number"
                  inputMode="numeric"
                  value={aa2}
                  placeholder={t("placeholder.count")}
                  onChange={(e) => { setAa2(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="af-Aa">{t("field.aa1")}</Label>
                <Input
                  id="af-Aa"
                  type="number"
                  inputMode="numeric"
                  value={aa1}
                  placeholder={t("placeholder.count")}
                  onChange={(e) => { setAa1(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="af-aa0">{t("field.aa0")}</Label>
                <Input
                  id="af-aa0"
                  type="number"
                  inputMode="numeric"
                  value={aa0}
                  placeholder={t("placeholder.count")}
                  onChange={(e) => { setAa0(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="af-A">{t("field.alleleA")}</Label>
                <Input
                  id="af-A"
                  type="number"
                  inputMode="numeric"
                  value={alleleA}
                  placeholder={t("placeholder.count")}
                  onChange={(e) => { setAlleleA(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="af-a">{t("field.allelea")}</Label>
                <Input
                  id="af-a"
                  type="number"
                  inputMode="numeric"
                  value={allelea}
                  placeholder={t("placeholder.count")}
                  onChange={(e) => { setAllelea(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="af-total">{t("field.totalN")}</Label>
                <Input
                  id="af-total"
                  type="number"
                  inputMode="numeric"
                  value={totalOverride}
                  placeholder={t("placeholder.optional")}
                  onChange={(e) => { setTotalOverride(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.freqA")}</div>
                  <div className="text-xl font-semibold">{fmt(result.p)} (p)</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.freqa")}</div>
                  <div className="text-xl font-semibold">{fmt(result.q)} (q)</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.totalN")}</div>
                  <div className="text-xl font-semibold">{fmt(result.N, 0)}</div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.totalAlleles")}</div>
                  <div className="text-xl font-semibold">{fmt(result.totalAlleles, 0)}</div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-zinc-600 mb-2">{t("result.hwExpected")}</div>
                <div className="grid gap-2 sm:grid-cols-3">
                  <div className="rounded border border-zinc-200 bg-white p-3 text-sm">
                    <span className="text-zinc-500">AA (p²×N): </span>
                    <span className="font-semibold">{fmt(result.aaExp, 2)}</span>
                    {result.aaObs !== null && <span className="text-zinc-400 ml-1">({t("result.obs")}: {result.aaObs})</span>}
                  </div>
                  <div className="rounded border border-zinc-200 bg-white p-3 text-sm">
                    <span className="text-zinc-500">Aa (2pq×N): </span>
                    <span className="font-semibold">{fmt(result.AaExp, 2)}</span>
                    {result.AaObs !== null && <span className="text-zinc-400 ml-1">({t("result.obs")}: {result.AaObs})</span>}
                  </div>
                  <div className="rounded border border-zinc-200 bg-white p-3 text-sm">
                    <span className="text-zinc-500">aa (q²×N): </span>
                    <span className="font-semibold">{fmt(result.aa0Exp, 2)}</span>
                    {result.aa0Obs !== null && <span className="text-zinc-400 ml-1">({t("result.obs")}: {result.aa0Obs})</span>}
                  </div>
                </div>
              </div>
              {result.chiSq !== null && (
                <div className="text-sm text-zinc-600">
                  {t("result.chiSq")}: {fmt(result.chiSq, 4)} —{" "}
                  {result.inHWE ? t("result.inHWE") : t("result.notHWE")}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">{t("about.body")}</div>
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
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
