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

type Method = "wallaceRule" | "gcContent" | "nearestNeighbor";

// Nearest-neighbor parameters (SantaLucia 1998)
const NN_DH: Record<string, number> = {
  AA: -7900, TT: -7900, AT: -7200, TA: -7200,
  CA: -8500, TG: -8500, GT: -8400, AC: -8400,
  CT: -7800, AG: -7800, GA: -8200, TC: -8200,
  CG: -10600, GC: -9800, GG: -8000, CC: -8000,
};
const NN_DS: Record<string, number> = {
  AA: -22.2, TT: -22.2, AT: -20.4, TA: -21.3,
  CA: -22.7, TG: -22.7, GT: -22.4, AC: -22.4,
  CT: -21.0, AG: -21.0, GA: -22.2, TC: -22.2,
  CG: -27.2, GC: -24.4, GG: -19.9, CC: -19.9,
};

function calcTmWallace(seq: string): number {
  const s = seq.toUpperCase().replace(/[^ATGCU]/g, "");
  let at = 0, gc = 0;
  for (const c of s) {
    if (c === "A" || c === "T" || c === "U") at++;
    else if (c === "G" || c === "C") gc++;
  }
  return 2 * at + 4 * gc;
}

function calcTmGC(seq: string): number {
  const s = seq.toUpperCase().replace(/[^ATGCU]/g, "");
  const n = s.length;
  if (n === 0) return 0;
  let gc = 0;
  for (const c of s) if (c === "G" || c === "C") gc++;
  return 69.3 + 41 * (gc / n) - 650 / n;
}

function calcTmNN(seq: string, saltMM: number, dnaNM: number): number {
  const s = seq.toUpperCase().replace(/[^ATGCU]/g, "");
  const n = s.length;
  if (n < 2) return 0;
  let dH = 0, dS = 0;
  for (let i = 0; i < n - 1; i++) {
    const pair = s[i] + s[i + 1];
    dH += NN_DH[pair] ?? -8000;
    dS += NN_DS[pair] ?? -21;
  }
  // Initiation parameters
  const s1 = s[0], sn = s[n - 1];
  if (s1 === "G" || s1 === "C") { dH += 100; dS += -2.8; }
  else { dH += -6300; dS += -18.5; }
  if (sn === "G" || sn === "C") { dH += 100; dS += -2.8; }
  else { dH += -6300; dS += -18.5; }

  const R = 1.987; // cal/mol·K
  const CT = (dnaNM * 1e-9) / 4; // assume non-self-complementary
  const Tm = (dH / (dS + R * Math.log(CT))) - 273.15;
  // Salt correction: +16.6 × log10([Na+]/1000) where [Na+] ≈ salt in mM
  const saltCorrection = 16.6 * Math.log10(saltMM / 1000);
  return Tm + saltCorrection;
}

function fmt(n: number, d = 1): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });
}

function countBases(seq: string): { a: number; t: number; g: number; c: number; n: number; gcPct: number } {
  const s = seq.toUpperCase().replace(/[^ATGCU]/g, "");
  let a = 0, t = 0, g = 0, c = 0;
  for (const ch of s) {
    if (ch === "A") a++;
    else if (ch === "T" || ch === "U") t++;
    else if (ch === "G") g++;
    else if (ch === "C") c++;
  }
  const n = a + t + g + c;
  return { a, t, g, c, n, gcPct: n > 0 ? ((g + c) / n) * 100 : 0 };
}

export default function AnnealingTemperatureCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.annealing-temperature-calculator");

  const [forward, setForward] = React.useState("");
  const [reverse, setReverse] = React.useState("");
  const [salt, setSalt] = React.useState("50");
  const [dna, setDna] = React.useState("250");
  const [method, setMethod] = React.useState<Method>("nearestNeighbor");
  const [touched, setTouched] = React.useState(false);

  interface CalcResult {
    tmFwd: number;
    tmRev: number | null;
    ta: number;
    fwdBases: ReturnType<typeof countBases>;
    revBases: ReturnType<typeof countBases> | null;
  }

  const result = React.useMemo<CalcResult | null>(() => {
    if (!touched) return null;
    const fwd = forward.trim();
    if (fwd.length < 10) return null;
    const saltMM = parseFloat(salt);
    const dnaNM = parseFloat(dna);
    if (!Number.isFinite(saltMM) || saltMM <= 0) return null;
    if (!Number.isFinite(dnaNM) || dnaNM <= 0) return null;

    let tmFwd: number;
    if (method === "wallaceRule") tmFwd = calcTmWallace(fwd);
    else if (method === "gcContent") tmFwd = calcTmGC(fwd);
    else tmFwd = calcTmNN(fwd, saltMM, dnaNM);

    const rev = reverse.trim();
    let tmRev: number | null = null;
    if (rev.length >= 10) {
      if (method === "wallaceRule") tmRev = calcTmWallace(rev);
      else if (method === "gcContent") tmRev = calcTmGC(rev);
      else tmRev = calcTmNN(rev, saltMM, dnaNM);
    }

    const lowerTm = tmRev !== null ? Math.min(tmFwd, tmRev) : tmFwd;
    const ta = lowerTm - 5;

    return {
      tmFwd,
      tmRev,
      ta,
      fwdBases: countBases(fwd),
      revBases: rev.length >= 10 ? countBases(rev) : null,
    };
  }, [touched, forward, reverse, salt, dna, method]);

  function reset() {
    setForward(""); setReverse(""); setSalt("50"); setDna("250"); setTouched(false);
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
  const methods: Method[] = ["wallaceRule", "gcContent", "nearestNeighbor"];

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
            <Label htmlFor="at-fwd">{t("field.forwardPrimer")}</Label>
            <Input
              id="at-fwd"
              type="text"
              value={forward}
              placeholder={t("placeholder.primerSeq")}
              onChange={(e) => { setForward(e.target.value); setTouched(true); }}
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="at-rev">{t("field.reversePrimer")}</Label>
            <Input
              id="at-rev"
              type="text"
              value={reverse}
              placeholder={t("placeholder.optional")}
              onChange={(e) => { setReverse(e.target.value); setTouched(true); }}
              className="font-mono"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="at-salt">{t("field.salt")}</Label>
              <Input
                id="at-salt"
                type="number"
                inputMode="decimal"
                value={salt}
                placeholder="50"
                onChange={(e) => { setSalt(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="at-dna">{t("field.dna")}</Label>
              <Input
                id="at-dna"
                type="number"
                inputMode="decimal"
                value={dna}
                placeholder="250"
                onChange={(e) => { setDna(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("field.method")}</Label>
              <select
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                value={method}
                onChange={(e) => setMethod(e.target.value as Method)}
              >
                {methods.map((m) => (
                  <option key={m} value={m}>{t(`type.${m}` as never)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="rounded border border-blue-100 bg-blue-50 p-3 text-center">
                <div className="text-xs text-blue-600 font-medium">{t("result.annealingTemp")}</div>
                <div className="text-3xl font-bold text-blue-700">{fmt(result.ta)}°C</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.tmForward")}</div>
                  <div className="text-xl font-semibold">{fmt(result.tmFwd)}°C</div>
                  <div className="text-xs text-zinc-400">
                    {result.fwdBases.n} bp · {fmt(result.fwdBases.gcPct, 1)}% GC
                  </div>
                </div>
                {result.tmRev !== null && result.revBases && (
                  <div className="rounded border border-zinc-200 bg-white p-3">
                    <div className="text-xs text-zinc-500">{t("result.tmReverse")}</div>
                    <div className="text-xl font-semibold">{fmt(result.tmRev)}°C</div>
                    <div className="text-xs text-zinc-400">
                      {result.revBases.n} bp · {fmt(result.revBases.gcPct, 1)}% GC
                    </div>
                  </div>
                )}
              </div>
              <div className="text-xs text-zinc-400">{t("result.formula")}</div>
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
                  <td className="px-3 py-2 text-zinc-800 font-mono text-xs">{ex.input}</td>
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
