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

type FormType = "slopeIntercept" | "twoPoint" | "standard";

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const r = Math.round(n * 1e10) / 1e10;
  return r.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

function calcParallel(
  form: FormType,
  vals: Record<string, string>,
  px: string,
  py: string
): { slope: number; intercept: number; vertical?: boolean; vertX?: number } | null {
  const p = parseFloat;
  const pxN = p(px);
  const pyN = p(py);
  if (!Number.isFinite(pxN) || !Number.isFinite(pyN)) return null;

  let slope: number;
  if (form === "slopeIntercept") {
    slope = p(vals.slope ?? "");
    if (!Number.isFinite(slope)) return null;
  } else if (form === "twoPoint") {
    const x1 = p(vals.x1 ?? ""), y1 = p(vals.y1 ?? "");
    const x2 = p(vals.x2 ?? ""), y2 = p(vals.y2 ?? "");
    if (!Number.isFinite(x1) || !Number.isFinite(y1) || !Number.isFinite(x2) || !Number.isFinite(y2)) return null;
    if (x1 === x2) {
      // vertical line
      return { slope: Infinity, intercept: NaN, vertical: true, vertX: pxN };
    }
    slope = (y2 - y1) / (x2 - x1);
  } else {
    // standard form Ax + By = C
    const A = p(vals.A ?? ""), B = p(vals.B ?? ""), C = p(vals.C ?? "");
    if (!Number.isFinite(A) || !Number.isFinite(B) || !Number.isFinite(C)) return null;
    if (B === 0) {
      // Vertical line x = C/A — parallel line is x = pointX
      if (A === 0) return null;
      return { slope: Infinity, intercept: NaN, vertical: true, vertX: pxN };
    }
    slope = -A / B;
  }

  const intercept = pyN - slope * pxN;
  return { slope, intercept };
}

export default function ParallelLineCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.parallel-line-calculator");

  const [form, setForm] = React.useState<FormType>("slopeIntercept");
  const [vals, setVals] = React.useState<Record<string, string>>({});
  const [pointX, setPointX] = React.useState("");
  const [pointY, setPointY] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  function setVal(key: string, val: string) {
    setVals((v) => ({ ...v, [key]: val }));
    setTouched(true);
  }

  function reset() {
    setVals({});
    setPointX("");
    setPointY("");
    setTouched(false);
  }

  function switchForm(f: FormType) {
    setForm(f);
    setVals({});
    setTouched(false);
  }

  const result = React.useMemo(() => {
    if (!touched) return null;
    return calcParallel(form, vals, pointX, pointY);
  }, [form, vals, pointX, pointY, touched]);

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

  const FORMS: FormType[] = ["slopeIntercept", "twoPoint", "standard"];

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
          {/* Form type selector */}
          <div className="space-y-2">
            <Label>{t("field.formType")}</Label>
            <div className="flex flex-wrap gap-2">
              {FORMS.map((f) => (
                <Button
                  key={f}
                  type="button"
                  variant={form === f ? "default" : "outline"}
                  onClick={() => switchForm(f)}
                >
                  {t(`type.${f}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {/* Inputs for original line */}
          {form === "slopeIntercept" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="plc-slope">{t("field.slope")}</Label>
                <Input
                  id="plc-slope"
                  type="number"
                  inputMode="decimal"
                  value={vals.slope ?? ""}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => setVal("slope", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plc-yint">{t("field.yIntercept")}</Label>
                <Input
                  id="plc-yint"
                  type="number"
                  inputMode="decimal"
                  value={vals.yIntercept ?? ""}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => setVal("yIntercept", e.target.value)}
                />
              </div>
            </div>
          )}

          {form === "twoPoint" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {(["x1", "y1", "x2", "y2"] as const).map((k, i) => (
                <div key={k} className="space-y-2">
                  <Label htmlFor={`plc-${k}`}>
                    {i === 0 ? t("field.point1X") : i === 1 ? t("field.point1Y") : i === 2 ? t("field.point2X") : t("field.point2Y")}
                  </Label>
                  <Input
                    id={`plc-${k}`}
                    type="number"
                    inputMode="decimal"
                    value={vals[k] ?? ""}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => setVal(k, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          {form === "standard" && (
            <div className="grid gap-4 sm:grid-cols-3">
              {(["A", "B", "C"] as const).map((k) => (
                <div key={k} className="space-y-2">
                  <Label htmlFor={`plc-${k}`}>
                    {k === "A" ? t("field.coeffA") : k === "B" ? t("field.coeffB") : t("field.coeffC")}
                  </Label>
                  <Input
                    id={`plc-${k}`}
                    type="number"
                    inputMode="decimal"
                    value={vals[k] ?? ""}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => setVal(k, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Point through which the parallel line passes */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="plc-px">{t("field.pointX")}</Label>
              <Input
                id="plc-px"
                type="number"
                inputMode="decimal"
                value={pointX}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setPointX(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plc-py">{t("field.pointY")}</Label>
              <Input
                id="plc-py"
                type="number"
                inputMode="decimal"
                value={pointY}
                placeholder={t("placeholder.number")}
                onChange={(e) => { setPointY(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {touched && result === null && (
            <p className="text-sm text-red-600">{t("error.invalidInputs")}</p>
          )}

          {result && result.vertical && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="mt-1 text-xl font-semibold text-zinc-900">
                {t("error.undefinedSlope", { x: formatNum(result.vertX ?? parseFloat(pointX)) })}
              </div>
            </div>
          )}

          {result && !result.vertical && Number.isFinite(result.slope) && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.equation", { m: formatNum(result.slope), b: formatNum(result.intercept) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.slope")}: {formatNum(result.slope)} &nbsp;|&nbsp;
                {t("result.yIntercept")}: {formatNum(result.intercept)}
              </div>
              <div className="text-xs text-zinc-500">
                {t("error.sameSlope", { m: formatNum(result.slope) })}
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
