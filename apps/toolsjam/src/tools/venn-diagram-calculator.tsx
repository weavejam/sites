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

type SetMode = "two" | "three";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface VennResult2 {
  aOnly: number;
  bOnly: number;
  aAndB: number;
  union: number;
}

interface VennResult3 {
  aOnly: number;
  bOnly: number;
  cOnly: number;
  aAndBOnly: number;
  aAndCOnly: number;
  bAndCOnly: number;
  aAndBAndC: number;
  union: number;
}

function computeVenn2(
  a: number,
  b: number,
  aAndB: number
): VennResult2 | null {
  if (a < 0 || b < 0 || aAndB < 0) return null;
  if (aAndB > a || aAndB > b) return null;
  return {
    aOnly: a - aAndB,
    bOnly: b - aAndB,
    aAndB,
    union: a + b - aAndB,
  };
}

function computeVenn3(
  a: number,
  b: number,
  c: number,
  aAndB: number,
  aAndC: number,
  bAndC: number,
  aAndBAndC: number
): VennResult3 | null {
  if (a < 0 || b < 0 || c < 0 || aAndB < 0 || aAndC < 0 || bAndC < 0 || aAndBAndC < 0)
    return null;
  if (aAndBAndC > aAndB || aAndBAndC > aAndC || aAndBAndC > bAndC)
    return null;
  if (aAndB > a || aAndB > b) return null;
  if (aAndC > a || aAndC > c) return null;
  if (bAndC > b || bAndC > c) return null;
  // Ensure exclusive regions are non-negative
  const aOnly = a - aAndB - aAndC + aAndBAndC;
  const bOnly = b - aAndB - bAndC + aAndBAndC;
  const cOnly = c - aAndC - bAndC + aAndBAndC;
  if (aOnly < 0 || bOnly < 0 || cOnly < 0) return null;
  return {
    aOnly,
    bOnly,
    cOnly,
    aAndBOnly: aAndB - aAndBAndC,
    aAndCOnly: aAndC - aAndBAndC,
    bAndCOnly: bAndC - aAndBAndC,
    aAndBAndC,
    union: a + b + c - aAndB - aAndC - bAndC + aAndBAndC,
  };
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: 4 });
}

export default function VennDiagramCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.venn-diagram-calculator");
  const [mode, setMode] = React.useState<SetMode>("two");

  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("");
  const [c, setC] = React.useState("");
  const [aAndB, setAAndB] = React.useState("");
  const [aAndC, setAAndC] = React.useState("");
  const [bAndC, setBAndC] = React.useState("");
  const [aAndBAndC, setAAndBAndC] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const aNum = parseFloat(a);
  const bNum = parseFloat(b);
  const cNum = parseFloat(c);
  const aAndBNum = parseFloat(aAndB);
  const aAndCNum = parseFloat(aAndC);
  const bAndCNum = parseFloat(bAndC);
  const aAndBAndCNum = parseFloat(aAndBAndC);

  const result2 = React.useMemo<VennResult2 | null>(() => {
    if (mode !== "two") return null;
    if (!Number.isFinite(aNum) || !Number.isFinite(bNum) || !Number.isFinite(aAndBNum))
      return null;
    return computeVenn2(aNum, bNum, aAndBNum);
  }, [mode, aNum, bNum, aAndBNum]);

  const result3 = React.useMemo<VennResult3 | null>(() => {
    if (mode !== "three") return null;
    if (
      !Number.isFinite(aNum) ||
      !Number.isFinite(bNum) ||
      !Number.isFinite(cNum) ||
      !Number.isFinite(aAndBNum) ||
      !Number.isFinite(aAndCNum) ||
      !Number.isFinite(bAndCNum) ||
      !Number.isFinite(aAndBAndCNum)
    )
      return null;
    return computeVenn3(aNum, bNum, cNum, aAndBNum, aAndCNum, bAndCNum, aAndBAndCNum);
  }, [mode, aNum, bNum, cNum, aAndBNum, aAndCNum, bAndCNum, aAndBAndCNum]);

  function reset() {
    setA(""); setB(""); setC("");
    setAAndB(""); setAAndC(""); setBAndC(""); setAAndBAndC("");
    setTouched(false);
  }

  function loadExample(
    m: SetMode,
    vals: { a: string; b: string; c?: string; ab: string; ac?: string; bc?: string; abc?: string }
  ) {
    setMode(m);
    setA(vals.a); setB(vals.b); setC(vals.c ?? "");
    setAAndB(vals.ab); setAAndC(vals.ac ?? ""); setBAndC(vals.bc ?? ""); setAAndBAndC(vals.abc ?? "");
    setTouched(true);
  }

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<FaqItem[]>(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
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

  const showError =
    touched && mode === "two" && result2 === null
      ? true
      : touched && mode === "three" && result3 === null
      ? true
      : false;

  const resultRows2: { label: string; value: string }[] = result2
    ? [
        { label: t("result.aOnly"), value: fmt(result2.aOnly) },
        { label: t("result.bOnly"), value: fmt(result2.bOnly) },
        { label: t("result.aAndB"), value: fmt(result2.aAndB) },
        { label: t("result.union"), value: fmt(result2.union) },
      ]
    : [];

  const resultRows3: { label: string; value: string }[] = result3
    ? [
        { label: t("result.aOnly"), value: fmt(result3.aOnly) },
        { label: t("result.bOnly"), value: fmt(result3.bOnly) },
        { label: t("result.cOnly"), value: fmt(result3.cOnly) },
        { label: t("result.aAndBOnly"), value: fmt(result3.aAndBOnly) },
        { label: t("result.aAndCOnly"), value: fmt(result3.aAndCOnly) },
        { label: t("result.bAndCOnly"), value: fmt(result3.bAndCOnly) },
        { label: t("result.aAndBAndC"), value: fmt(result3.aAndBAndC) },
        { label: t("result.union"), value: fmt(result3.union) },
      ]
    : [];

  const resultRows = mode === "two" ? resultRows2 : resultRows3;
  const hasResult = mode === "two" ? result2 !== null : result3 !== null;

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
          <div className="space-y-2">
            <Label>{t("field.mode")}</Label>
            <div className="flex gap-2">
              {(["two", "three"] as SetMode[]).map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={mode === m ? "default" : "outline"}
                  onClick={() => { setMode(m); setTouched(false); }}
                >
                  {t(`type.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vd-a">{t("field.setA")}</Label>
              <Input id="vd-a" type="number" inputMode="decimal" value={a}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setA(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vd-b">{t("field.setB")}</Label>
              <Input id="vd-b" type="number" inputMode="decimal" value={b}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setB(e.target.value); setTouched(true); }} />
            </div>
            {mode === "three" && (
              <div className="space-y-2">
                <Label htmlFor="vd-c">{t("field.setC")}</Label>
                <Input id="vd-c" type="number" inputMode="decimal" value={c}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => { setC(e.target.value); setTouched(true); }} />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="vd-ab">{t("field.aAndB")}</Label>
              <Input id="vd-ab" type="number" inputMode="decimal" value={aAndB}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setAAndB(e.target.value); setTouched(true); }} />
            </div>
            {mode === "three" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="vd-ac">{t("field.aAndC")}</Label>
                  <Input id="vd-ac" type="number" inputMode="decimal" value={aAndC}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => { setAAndC(e.target.value); setTouched(true); }} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vd-bc">{t("field.bAndC")}</Label>
                  <Input id="vd-bc" type="number" inputMode="decimal" value={bAndC}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => { setBAndC(e.target.value); setTouched(true); }} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vd-abc">{t("field.aAndBAndC")}</Label>
                  <Input id="vd-abc" type="number" inputMode="decimal" value={aAndBAndC}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => { setAAndBAndC(e.target.value); setTouched(true); }} />
                </div>
              </>
            )}
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

          {hasResult && touched && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {resultRows.map((row, i) => (
                  <div key={i}>
                    <div className="text-xs text-zinc-500">{row.label}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {row.value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("two", { a: "40", b: "30", ab: "10" })}>
            {t("examples.loadStudents")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("two", { a: "150", b: "100", ab: "75" })}>
            {t("examples.loadReading")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("three", { a: "60", b: "50", c: "40", ab: "30", ac: "20", bc: "15", abc: "5" })}>
            {t("examples.loadSocial")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
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
