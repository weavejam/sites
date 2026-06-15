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

type DisplayFormat = "triangular" | "linear";

function generateTriangle(rows: number): number[][] {
  const triangle: number[][] = [];
  for (let n = 0; n < rows; n++) {
    const row: number[] = [];
    for (let k = 0; k <= n; k++) {
      if (k === 0 || k === n) {
        row.push(1);
      } else {
        row.push(triangle[n - 1][k - 1] + triangle[n - 1][k]);
      }
    }
    triangle.push(row);
  }
  return triangle;
}

export default function PascalsTriangleCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.pascals-triangle-calculator");

  const [rows, setRows] = React.useState("5");
  const [specificRow, setSpecificRow] = React.useState("");
  const [format, setFormat] = React.useState<DisplayFormat>("triangular");
  const [touched, setTouched] = React.useState(false);

  function reset() {
    setRows("5");
    setSpecificRow("");
    setFormat("triangular");
    setTouched(false);
  }

  const rowsNum = parseInt(rows);
  const specRowNum = specificRow !== "" ? parseInt(specificRow) : null;

  const rowsValid = !isNaN(rowsNum) && rowsNum >= 1 && rowsNum <= 20;
  const specRowValid =
    specRowNum === null ||
    (!isNaN(specRowNum) && specRowNum >= 0 && specRowNum < rowsNum);

  const triangle = React.useMemo(() => {
    if (!rowsValid) return null;
    return generateTriangle(rowsNum);
  }, [rowsValid, rowsNum]);

  const displayRows = React.useMemo(() => {
    if (!triangle) return null;
    if (specRowNum !== null && specRowValid) {
      return [triangle[specRowNum]];
    }
    return triangle;
  }, [triangle, specRowNum, specRowValid]);

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

  const FORMATS: DisplayFormat[] = ["triangular", "linear"];

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
              <Label htmlFor="pt-rows">{t("field.rows")}</Label>
              <Input
                id="pt-rows"
                type="number"
                inputMode="numeric"
                min={1}
                max={20}
                value={rows}
                placeholder={t("placeholder.rows")}
                onChange={(e) => { setRows(e.target.value); setTouched(true); }}
              />
              <p className="text-xs text-zinc-500">{t("field.rowsHint")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pt-spec">{t("field.specificRow")}</Label>
              <Input
                id="pt-spec"
                type="number"
                inputMode="numeric"
                min={0}
                value={specificRow}
                placeholder={t("placeholder.specificRow")}
                onChange={(e) => { setSpecificRow(e.target.value); setTouched(true); }}
              />
              <p className="text-xs text-zinc-500">{t("field.specificRowHint")}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.format")}</Label>
            <div className="flex flex-wrap gap-2">
              {FORMATS.map((f) => (
                <Button
                  key={f}
                  type="button"
                  variant={format === f ? "default" : "outline"}
                  onClick={() => { setFormat(f); setTouched(true); }}
                >
                  {t(`type.${f}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.generate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {touched && !rowsValid && (
            <p className="text-sm text-red-600">{t("error.invalidRows")}</p>
          )}
          {touched && rowsValid && !specRowValid && (
            <p className="text-sm text-red-600">{t("error.invalidSpecificRow")}</p>
          )}

          {touched && displayRows && rowsValid && specRowValid && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              {specRowNum !== null ? (
                <div>
                  <div className="text-xs text-zinc-500 mb-1">
                    {t("result.specificRowHeading", { row: specRowNum })}
                  </div>
                  <div className="font-mono text-zinc-900">
                    {displayRows[0].join(", ")}
                  </div>
                </div>
              ) : format === "linear" ? (
                <div className="space-y-1">
                  {displayRows.map((row, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="text-xs text-zinc-400 w-12 shrink-0">{t("result.rowLabel")} {i}</span>
                      <span className="font-mono text-sm text-zinc-900">{row.join(", ")}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <div className="flex flex-col items-center space-y-1">
                    {displayRows.map((row, i) => (
                      <div key={i} className="flex gap-2">
                        {row.map((val, k) => (
                          <span
                            key={k}
                            className="inline-block min-w-[2.5rem] text-center font-mono text-sm bg-white border border-zinc-200 rounded px-1 py-0.5 text-zinc-900"
                          >
                            {val}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="text-xs text-zinc-500">{t("result.binomialFormula")}</div>
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
