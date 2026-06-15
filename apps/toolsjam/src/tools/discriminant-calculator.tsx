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

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const r = Math.round(n * 1e10) / 1e10;
  return r.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

function fmtComplex(real: number, imag: number): string {
  const r = fmt(real);
  const im = fmt(Math.abs(imag));
  if (imag >= 0) return `${r} + ${im}i`;
  return `${r} − ${im}i`;
}

export default function DiscriminantCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.discriminant-calculator");
  const [a, setA] = React.useState("1");
  const [b, setB] = React.useState("-5");
  const [c, setC] = React.useState("6");
  const [touched, setTouched] = React.useState(false);

  const na = parseFloat(a);
  const nb = parseFloat(b);
  const nc = parseFloat(c);
  const aValid = a !== "" && Number.isFinite(na) && na !== 0;
  const bValid = b !== "" && Number.isFinite(nb);
  const cValid = c !== "" && Number.isFinite(nc);
  const allValid = aValid && bValid && cValid;

  const computed = React.useMemo(() => {
    if (!allValid) return null;
    const disc = nb * nb - 4 * na * nc;
    let nature: "positive" | "zero" | "negative";
    if (disc > 0) nature = "positive";
    else if (disc === 0) nature = "zero";
    else nature = "negative";

    let root1: string, root2: string;
    if (disc >= 0) {
      const sqrtDisc = Math.sqrt(disc);
      root1 = fmt((-nb + sqrtDisc) / (2 * na));
      root2 = fmt((-nb - sqrtDisc) / (2 * na));
    } else {
      const realPart = -nb / (2 * na);
      const imagPart = Math.sqrt(-disc) / (2 * na);
      root1 = fmtComplex(realPart, imagPart);
      root2 = fmtComplex(realPart, -imagPart);
    }

    return { disc, nature, root1, root2 };
  }, [allValid, na, nb, nc]);

  function loadExample(av: string, bv: string, cv: string) {
    setA(av);
    setB(bv);
    setC(cv);
    setTouched(true);
  }

  function reset() {
    setA("1");
    setB("-5");
    setC("6");
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

  const showError = touched && !allValid;
  const showZeroAError = touched && a !== "" && Number.isFinite(na) && na === 0;

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

  const natureColorMap = {
    positive: "text-green-700",
    zero: "text-amber-700",
    negative: "text-red-700",
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
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("tagline")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-zinc-500">{t("intro")}</p>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="disc-a">{t("field.a")}</Label>
              <Input
                id="disc-a"
                type="number"
                inputMode="decimal"
                value={a}
                placeholder={t("placeholder.coefficient")}
                onChange={(e) => {
                  setA(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disc-b">{t("field.b")}</Label>
              <Input
                id="disc-b"
                type="number"
                inputMode="decimal"
                value={b}
                placeholder={t("placeholder.coefficient")}
                onChange={(e) => {
                  setB(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disc-c">{t("field.c")}</Label>
              <Input
                id="disc-c"
                type="number"
                inputMode="decimal"
                value={c}
                placeholder={t("placeholder.coefficient")}
                onChange={(e) => {
                  setC(e.target.value);
                  setTouched(true);
                }}
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

          {showZeroAError && (
            <p className="text-sm text-red-600">{t("error.zeroA")}</p>
          )}
          {showError && !showZeroAError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {computed !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                Δ = {fmt(computed.disc)}
              </div>
              <div
                className={`text-sm font-medium ${natureColorMap[computed.nature]}`}
              >
                {t(`result.nature.${computed.nature}` as never)}
              </div>
              <div className="mt-2 text-sm text-zinc-700 space-y-1">
                <div>
                  <span className="font-medium">{t("result.root1")}:</span>{" "}
                  {computed.root1}
                </div>
                <div>
                  <span className="font-medium">{t("result.root2")}:</span>{" "}
                  {computed.root2}
                </div>
              </div>
              <div className="mt-1 text-xs text-zinc-500">
                {t("formula")}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-600">
              {t("examples.loadLabel")}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => loadExample("1", "-5", "6")}
              >
                {t("examples.load1")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => loadExample("1", "-4", "4")}
              >
                {t("examples.load2")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => loadExample("1", "2", "5")}
              >
                {t("examples.load3")}
              </Button>
            </div>
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
