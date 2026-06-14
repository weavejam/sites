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

type SolveFor = "di" | "do" | "f";

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs === 0) return "0";
  if (abs >= 0.001 && abs < 1e7) {
    return parseFloat(n.toPrecision(6)).toString();
  }
  return n.toExponential(4);
}

export default function ThinLensEquationCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.thin-lens-equation-calculator");

  const [solveFor, setSolveFor] = React.useState<SolveFor>("di");
  const [doVal, setDoVal] = React.useState("");
  const [diVal, setDiVal] = React.useState("");
  const [fVal, setFVal] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const SOLVE_OPTIONS: SolveFor[] = ["di", "do", "f"];

  const result = React.useMemo(() => {
    if (!touched) return null;
    const doN = parseFloat(doVal);
    const diN = parseFloat(diVal);
    const fN = parseFloat(fVal);

    let solvedDo: number, solvedDi: number, solvedF: number;

    if (solveFor === "di") {
      if (!Number.isFinite(doN) || !Number.isFinite(fN)) return null;
      if (doN === fN) return null; // undefined
      solvedDo = doN;
      solvedF = fN;
      // 1/di = 1/f - 1/do
      const invDi = 1 / fN - 1 / doN;
      if (invDi === 0) return null;
      solvedDi = 1 / invDi;
    } else if (solveFor === "do") {
      if (!Number.isFinite(diN) || !Number.isFinite(fN)) return null;
      if (diN === fN) return null;
      solvedDi = diN;
      solvedF = fN;
      // 1/do = 1/f - 1/di
      const invDo = 1 / fN - 1 / diN;
      if (invDo === 0) return null;
      solvedDo = 1 / invDo;
    } else {
      // solveFor === "f"
      if (!Number.isFinite(doN) || !Number.isFinite(diN)) return null;
      solvedDo = doN;
      solvedDi = diN;
      // 1/f = 1/do + 1/di
      const invF = 1 / doN + 1 / diN;
      if (invF === 0) return null;
      solvedF = 1 / invF;
    }

    const m = -solvedDi! / solvedDo!;
    const isRealImage = solvedDi! > 0;
    const isUpright = m > 0;
    const isMagnified = Math.abs(m) > 1;

    return {
      do: solvedDo!,
      di: solvedDi!,
      f: solvedF!,
      m,
      isRealImage,
      isUpright,
      isMagnified,
    };
  }, [touched, solveFor, doVal, diVal, fVal]);

  function loadExample(sv: SolveFor, doV: string, diV: string, fV: string) {
    setSolveFor(sv);
    setDoVal(doV);
    setDiVal(diV);
    setFVal(fV);
    setTouched(true);
  }

  function reset() {
    setDoVal("");
    setDiVal("");
    setFVal("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
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

  const isDisabled = (field: "do" | "di" | "f") => field === solveFor;

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
            <Label>{t("field.solveFor")}</Label>
            <div className="flex flex-wrap gap-2">
              {SOLVE_OPTIONS.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant={solveFor === opt ? "default" : "outline"}
                  onClick={() => { setSolveFor(opt); setTouched(false); }}
                >
                  {t(`type.${opt}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="tl-do">{t("field.objectDistance")}</Label>
              <Input
                id="tl-do"
                type="number"
                inputMode="decimal"
                step="any"
                  placeholder={t("field.placeholder.objectDistance")}
                value={doVal}
                disabled={isDisabled("do")}
                className={isDisabled("do") ? "bg-zinc-100" : ""}
                onChange={(e) => { setDoVal(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tl-di">{t("field.imageDistance")}</Label>
              <Input
                id="tl-di"
                type="number"
                inputMode="decimal"
                step="any"
                  placeholder={t("field.placeholder.imageDistance")}
                value={diVal}
                disabled={isDisabled("di")}
                className={isDisabled("di") ? "bg-zinc-100" : ""}
                onChange={(e) => { setDiVal(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tl-f">{t("field.focalLength")}</Label>
              <Input
                id="tl-f"
                type="number"
                inputMode="decimal"
                step="any"
                  placeholder={t("field.placeholder.focalLength")}
                value={fVal}
                disabled={isDisabled("f")}
                className={isDisabled("f") ? "bg-zinc-100" : ""}
                onChange={(e) => { setFVal(e.target.value); setTouched(true); }}
              />
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
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <div>
                  <span className="text-sm text-zinc-500">{t("field.objectDistance")}</span>
                  <p className="text-lg font-semibold font-mono">{formatNum(result.do)} cm</p>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{t("field.imageDistance")}</span>
                  <p className="text-lg font-semibold font-mono">{formatNum(result.di)} cm</p>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{t("field.focalLength")}</span>
                  <p className="text-lg font-semibold font-mono">{formatNum(result.f)} cm</p>
                </div>
              </div>
              <div className="border-t border-zinc-200 pt-2 space-y-1">
                <p className="text-zinc-800">
                  {t("result.magnification")}: <span className="font-mono font-semibold">{formatNum(result.m)}×</span>
                </p>
                <p className="text-zinc-800">
                  {t("result.imageType")}: <span className="font-semibold">{result.isRealImage ? t("result.real") : t("result.virtual")}</span>
                  {", "}
                  <span className="font-semibold">{result.isUpright ? t("result.upright") : t("result.inverted")}</span>
                  {", "}
                  <span className="font-semibold">{result.isMagnified ? t("result.magnified") : t("result.diminished")}</span>
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("di", "30", "", "10")}>
              {t("examples.loadRealImage")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("di", "5", "", "10")}>
              {t("examples.loadVirtualImage")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("f", "20", "20", "")}>
              {t("examples.loadFocalLength")}
            </Button>
          </div>
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
