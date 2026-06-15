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

interface CubeResult {
  isPerfectCube: boolean;
  root?: number;
  prevCube?: number;
  nextCube?: number;
}

function checkPerfectCube(n: number): CubeResult {
  if (n === 0) return { isPerfectCube: true, root: 0 };
  const sign = n < 0 ? -1 : 1;
  const absN = Math.abs(n);
  const cbrtApprox = Math.cbrt(absN);
  const cbrtRounded = Math.round(cbrtApprox);
  if (cbrtRounded * cbrtRounded * cbrtRounded === absN) {
    return { isPerfectCube: true, root: sign * cbrtRounded };
  }
  const floorCbrt = Math.floor(cbrtApprox);
  if (sign > 0) {
    return {
      isPerfectCube: false,
      prevCube: floorCbrt * floorCbrt * floorCbrt,
      nextCube: (floorCbrt + 1) * (floorCbrt + 1) * (floorCbrt + 1),
    };
  } else {
    const ceilCbrt = Math.ceil(cbrtApprox);
    return {
      isPerfectCube: false,
      prevCube: -(ceilCbrt * ceilCbrt * ceilCbrt),
      nextCube: -(floorCbrt * floorCbrt * floorCbrt),
    };
  }
}

export default function PerfectCubeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.perfect-cube-calculator");
  const [input, setInput] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const inputNum = parseFloat(input);
  const inputValid =
    input !== "" &&
    Number.isFinite(inputNum) &&
    Number.isInteger(inputNum) &&
    Math.abs(inputNum) <= Number.MAX_SAFE_INTEGER;

  const result = React.useMemo<CubeResult | null>(() => {
    if (!inputValid) return null;
    return checkPerfectCube(inputNum);
  }, [inputNum, inputValid]);

  function reset() {
    setInput("");
    setTouched(false);
  }

  function loadExample(val: string) {
    setInput(val);
    setTouched(true);
  }

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
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

  const showError = touched && !inputValid;

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
          <div className="max-w-xs space-y-2">
            <Label htmlFor="pcc-number">{t("field.number")}</Label>
            <Input
              id="pcc-number"
              type="number"
              inputMode="numeric"
              value={input}
              placeholder={t("placeholder.integer")}
              onChange={(e) => {
                setInput(e.target.value);
                setTouched(true);
              }}
            />
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

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-lg font-semibold text-zinc-900">
                {result.isPerfectCube
                  ? t("result.yes", { n: inputNum })
                  : t("result.no", { n: inputNum })}
              </div>
              {result.isPerfectCube && result.root !== undefined && (
                <div className="text-zinc-700">
                  {t("result.root", { root: result.root, n: inputNum })}
                </div>
              )}
              {!result.isPerfectCube &&
                result.prevCube !== undefined &&
                result.nextCube !== undefined && (
                  <div className="text-zinc-600 text-sm space-y-1">
                    <div>{t("result.prevCube", { cube: result.prevCube })}</div>
                    <div>{t("result.nextCube", { cube: result.nextCube })}</div>
                  </div>
                )}
              <div className="mt-2 text-xs text-zinc-500">{t("formula")}</div>
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note ?? ""}</td>
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
            onClick={() => loadExample("27")}
          >
            {t("examples.load27")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("-64")}
          >
            {t("examples.loadNeg64")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1000")}
          >
            {t("examples.load1000")}
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
