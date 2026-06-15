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

type ConicType = "parabola" | "ellipse" | "hyperbola";
const CONIC_TYPES: ConicType[] = ["parabola", "ellipse", "hyperbola"];

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e8) / 1e8;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 8 });
}

export default function LatusRectumCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.latus-rectum-calculator");

  const [conicType, setConicType] = React.useState<ConicType | "">("");
  const [param, setParam] = React.useState("");
  const [semiMajor, setSemiMajor] = React.useState("");
  const [semiMinor, setSemiMinor] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const pNum = parseFloat(param);
  const aNum = parseFloat(semiMajor);
  const bNum = parseFloat(semiMinor);

  const { valid, errorKey } = React.useMemo(() => {
    if (!conicType) return { valid: false, errorKey: "error.selectType" };
    if (conicType === "parabola") {
      if (param === "" || !Number.isFinite(pNum) || pNum <= 0)
        return { valid: false, errorKey: "error.invalidParabola" };
    } else {
      if (
        semiMajor === "" ||
        semiMinor === "" ||
        !Number.isFinite(aNum) ||
        !Number.isFinite(bNum) ||
        aNum <= 0 ||
        bNum <= 0
      )
        return { valid: false, errorKey: "error.invalidAxes" };
      if (conicType === "ellipse" && aNum <= bNum)
        return { valid: false, errorKey: "error.ellipseConstraint" };
    }
    return { valid: true, errorKey: "" };
  }, [conicType, param, pNum, semiMajor, semiMinor, aNum, bNum]);

  const result = React.useMemo<number | null>(() => {
    if (!valid || !conicType) return null;
    if (conicType === "parabola") return 4 * pNum;
    return (2 * bNum * bNum) / aNum;
  }, [valid, conicType, pNum, aNum, bNum]);

  function reset() {
    setConicType("");
    setParam("");
    setSemiMajor("");
    setSemiMinor("");
    setTouched(false);
  }

  function loadExample(
    type: ConicType,
    p?: string,
    a?: string,
    b?: string
  ) {
    setConicType(type);
    setParam(p ?? "");
    setSemiMajor(a ?? "");
    setSemiMinor(b ?? "");
    setTouched(true);
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
    const raw = t.raw("faq.items") as
      | { q: string; a: string }[]
      | undefined;
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

  const showError = touched && !valid;

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
            <Label>{t("field.conicType")}</Label>
            <div className="flex flex-wrap gap-2">
              {CONIC_TYPES.map((ct) => (
                <Button
                  key={ct}
                  type="button"
                  variant={conicType === ct ? "default" : "outline"}
                  onClick={() => {
                    setConicType(ct);
                    setTouched(false);
                  }}
                >
                  {t(`type.${ct}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {conicType === "parabola" && (
            <div className="space-y-2">
              <Label htmlFor="lr-p">{t("field.parameter")}</Label>
              <Input
                id="lr-p"
                type="number"
                inputMode="decimal"
                value={param}
                placeholder={t("placeholder.parameter")}
                onChange={(e) => {
                  setParam(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
          )}

          {(conicType === "ellipse" || conicType === "hyperbola") && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="lr-a">{t("field.semiMajorAxis")}</Label>
                <Input
                  id="lr-a"
                  type="number"
                  inputMode="decimal"
                  value={semiMajor}
                  placeholder={t("placeholder.semiMajorAxis")}
                  onChange={(e) => {
                    setSemiMajor(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lr-b">{t("field.semiMinorAxis")}</Label>
                <Input
                  id="lr-b"
                  type="number"
                  inputMode="decimal"
                  value={semiMinor}
                  placeholder={t("placeholder.semiMinorAxis")}
                  onChange={(e) => {
                    setSemiMinor(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">
              {t(errorKey as never)}
            </p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.length", { result: formatNum(result) })}
              </div>
              <div className="text-xs text-zinc-400">
                {conicType === "parabola"
                  ? t("result.formulaParabola")
                  : t("result.formulaEllipseHyperbola")}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
            onClick={() => loadExample("parabola", "2")}
          >
            {t("examples.loadParabola")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("ellipse", undefined, "5", "3")}
          >
            {t("examples.loadEllipse")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("hyperbola", undefined, "4", "2")}
          >
            {t("examples.loadHyperbola")}
          </Button>
        </div>
      </section>

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
