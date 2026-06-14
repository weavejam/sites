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

function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(digits)).toString();
}

interface RRRResult {
  cer: number;
  eer: number;
  rr: number;
  rrr: number;
  arr: number;
  nnt: number;
}

function compute(
  treatEvents: number,
  treatTotal: number,
  controlEvents: number,
  controlTotal: number
): RRRResult | null {
  if (
    treatTotal <= 0 ||
    controlTotal <= 0 ||
    treatEvents < 0 ||
    controlEvents < 0 ||
    treatEvents > treatTotal ||
    controlEvents > controlTotal
  )
    return null;
  const cer = controlEvents / controlTotal;
  const eer = treatEvents / treatTotal;
  if (cer === 0) return null;
  const rr = eer / cer;
  const rrr = (cer - eer) / cer;
  const arr = cer - eer;
  const nnt = arr !== 0 ? 1 / Math.abs(arr) : Infinity;
  return { cer, eer, rr, rrr, arr, nnt };
}

export default function RelativeRiskReductionCalculator(_props: {
  locale: Locale;
}) {
  const t = useTranslations("tool.relative-risk-reduction-calculator");
  const [treatEvents, setTreatEvents] = React.useState<string>("");
  const [treatTotal, setTreatTotal] = React.useState<string>("");
  const [controlEvents, setControlEvents] = React.useState<string>("");
  const [controlTotal, setControlTotal] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const te = parseFloat(treatEvents);
  const tt = parseFloat(treatTotal);
  const ce = parseFloat(controlEvents);
  const ct = parseFloat(controlTotal);
  const allValid =
    treatEvents !== "" &&
    treatTotal !== "" &&
    controlEvents !== "" &&
    controlTotal !== "" &&
    [te, tt, ce, ct].every((n) => Number.isFinite(n) && n >= 0) &&
    te <= tt &&
    ce <= ct;

  const result = React.useMemo<RRRResult | null>(() => {
    if (!allValid) return null;
    return compute(te, tt, ce, ct);
  }, [te, tt, ce, ct, allValid]);

  function loadExample(
    tev: string,
    ttv: string,
    cev: string,
    ctv: string
  ) {
    setTreatEvents(tev);
    setTreatTotal(ttv);
    setControlEvents(cev);
    setControlTotal(ctv);
    setTouched(true);
  }

  function reset() {
    setTreatEvents("");
    setTreatTotal("");
    setControlEvents("");
    setControlTotal("");
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
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch {
        break;
      }
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

  const showError = touched && (!allValid || result === null);

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
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold text-zinc-800">
                {t("group.treatment")}
              </h3>
              <div className="space-y-2">
                <Label htmlFor="rrrC-te">
                  {t("field.treatmentEvents")}
                </Label>
                <Input
                  id="rrrC-te"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  value={treatEvents}
                  placeholder={t("placeholder.events")}
                  onChange={(e) => {
                    setTreatEvents(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rrrC-tt">
                  {t("field.treatmentTotal")}
                </Label>
                <Input
                  id="rrrC-tt"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  value={treatTotal}
                  placeholder={t("placeholder.total")}
                  onChange={(e) => {
                    setTreatTotal(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-zinc-800">
                {t("group.control")}
              </h3>
              <div className="space-y-2">
                <Label htmlFor="rrrC-ce">{t("field.controlEvents")}</Label>
                <Input
                  id="rrrC-ce"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  value={controlEvents}
                  placeholder={t("placeholder.events")}
                  onChange={(e) => {
                    setControlEvents(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rrrC-ct">{t("field.controlTotal")}</Label>
                <Input
                  id="rrrC-ct"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  value={controlTotal}
                  placeholder={t("placeholder.total")}
                  onChange={(e) => {
                    setControlTotal(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && allValid && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {(
                  [
                    ["result.cer", `${fmt(result.cer * 100)}%`],
                    ["result.eer", `${fmt(result.eer * 100)}%`],
                    ["result.rr", fmt(result.rr)],
                    ["result.rrr", `${fmt(result.rrr * 100)}%`],
                    ["result.arr", `${fmt(result.arr * 100)}%`],
                    [
                      "result.nnt",
                      Number.isFinite(result.nnt)
                        ? fmt(result.nnt, 1)
                        : "∞",
                    ],
                  ] as [string, string][]
                ).map(([key, val]) => (
                  <div
                    key={key}
                    className="rounded border border-zinc-200 bg-white p-3"
                  >
                    <div className="text-xs text-zinc-500">
                      {t(key as never)}
                    </div>
                    <div className="mt-1 text-lg font-semibold text-zinc-900">
                      {val}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-zinc-500">{t("formula")}</p>
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
            onClick={() => loadExample("80", "1000", "120", "1000")}
          >
            {t("examples.loadDrug")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("25", "5000", "85", "5000")}
          >
            {t("examples.loadVaccine")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("10", "250", "25", "250")}
          >
            {t("examples.loadSurgery")}
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
