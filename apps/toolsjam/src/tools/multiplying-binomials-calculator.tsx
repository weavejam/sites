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

function round(n: number): number {
  return Math.round(n * 1e10) / 1e10;
}

function fmtXterm(c: number): string {
  if (c === 1) return "x";
  if (c === -1) return "-x";
  return `${c}x`;
}

function fmtX2term(c: number): string {
  if (c === 1) return "x²";
  if (c === -1) return "-x²";
  return `${c}x²`;
}

function formatPolynomial(ac: number, adbc: number, bd: number): string {
  const terms: string[] = [];

  if (ac !== 0) {
    if (ac === 1) terms.push("x²");
    else if (ac === -1) terms.push("-x²");
    else terms.push(`${ac}x²`);
  }
  if (adbc !== 0) {
    if (adbc === 1) terms.push("x");
    else if (adbc === -1) terms.push("-x");
    else terms.push(`${adbc}x`);
  }
  if (bd !== 0) {
    terms.push(`${bd}`);
  }
  if (terms.length === 0) return "0";

  let result = terms[0];
  for (let i = 1; i < terms.length; i++) {
    const tm = terms[i];
    if (tm.startsWith("-")) {
      result += ` - ${tm.slice(1)}`;
    } else {
      result += ` + ${tm}`;
    }
  }
  return result;
}

function formatBinomialExpr(a: number, b: number): string {
  const aPart = a === 1 ? "x" : a === -1 ? "-x" : `${a}x`;
  const bPart = b >= 0 ? ` + ${b}` : ` - ${Math.abs(b)}`;
  return `(${aPart}${bPart})`;
}

export default function MultiplyingBinomialsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.multiplying-binomials-calculator");
  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("");
  const [c, setC] = React.useState("");
  const [d, setD] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const aNum = parseFloat(a);
  const bNum = parseFloat(b);
  const cNum = parseFloat(c);
  const dNum = parseFloat(d);

  const allValid =
    a !== "" && b !== "" && c !== "" && d !== "" &&
    Number.isFinite(aNum) && Number.isFinite(bNum) &&
    Number.isFinite(cNum) && Number.isFinite(dNum);

  const computed = React.useMemo(() => {
    if (!allValid) return null;
    const ac = round(aNum * cNum);
    const adbc = round(aNum * dNum + bNum * cNum);
    const bd = round(bNum * dNum);
    const F = ac;
    const O = round(aNum * dNum);
    const I = round(bNum * cNum);
    const L = bd;
    const result = formatPolynomial(ac, adbc, bd);
    const equation = `${formatBinomialExpr(aNum, bNum)} × ${formatBinomialExpr(cNum, dNum)} = ${result}`;
    const foilSteps = [
      { label: "foilFirst" as const, expr: `${fmtXterm(aNum)} × ${fmtXterm(cNum)} = ${fmtX2term(F)}` },
      { label: "foilOuter" as const, expr: `${fmtXterm(aNum)} × ${dNum} = ${F !== 0 || O !== 0 ? fmtXterm(O) : "0"}` },
      { label: "foilInner" as const, expr: `${bNum} × ${fmtXterm(cNum)} = ${fmtXterm(I)}` },
      { label: "foilLast" as const, expr: `${bNum} × ${dNum} = ${L}` },
      { label: "foilCombine" as const, expr: result },
    ];
    return { result, equation, foilSteps };
  }, [aNum, bNum, cNum, dNum, allValid]);

  function reset() {
    setA(""); setB(""); setC(""); setD("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as Array<{ input: string; output: string; note: string }>;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as Array<{ q: string; a: string }>;
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
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t("card.title")}</CardTitle>
          <CardDescription>{t("card.description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4 rounded-lg border p-4">
              <p className="font-semibold">{t("field.firstBinomial")}</p>
              <div className="space-y-2">
                <Label htmlFor="mb-a">{t("field.a")}</Label>
                <Input
                  id="mb-a"
                  type="number"
                  inputMode="decimal"
                  value={a}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setA(e.target.value); setTouched(false); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mb-b">{t("field.b")}</Label>
                <Input
                  id="mb-b"
                  type="number"
                  inputMode="decimal"
                  value={b}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setB(e.target.value); setTouched(false); }}
                />
              </div>
            </div>
            <div className="space-y-4 rounded-lg border p-4">
              <p className="font-semibold">{t("field.secondBinomial")}</p>
              <div className="space-y-2">
                <Label htmlFor="mb-c">{t("field.c")}</Label>
                <Input
                  id="mb-c"
                  type="number"
                  inputMode="decimal"
                  value={c}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setC(e.target.value); setTouched(false); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mb-d">{t("field.d")}</Label>
                <Input
                  id="mb-d"
                  type="number"
                  inputMode="decimal"
                  value={d}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setD(e.target.value); setTouched(false); }}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {touched && !allValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && allValid && computed !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-xl font-semibold text-zinc-900 font-mono">
                {computed.equation}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-zinc-600">{t("result.foilSteps")}</p>
                <ol className="list-decimal pl-5 text-sm text-zinc-700 space-y-1">
                    {computed.foilSteps.map((s, i) => (
                      <li key={i}>{t(`result.${s.label}` as never)}: {s.expr}</li>
                    ))}
                  </ol>
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
                  <td className="px-3 py-2 text-zinc-800 font-mono">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900 font-mono">{ex.output}</td>
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
          {howtoSteps.map((s, i) => <li key={i}>{s}</li>)}
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
