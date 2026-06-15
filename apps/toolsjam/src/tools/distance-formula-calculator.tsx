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

type Dimension = "2d" | "3d";

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const r = Math.round(n * 1e10) / 1e10;
  return r.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

export default function DistanceFormulaCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.distance-formula-calculator");
  const [dim, setDim] = React.useState<Dimension>("2d");
  const [x1, setX1] = React.useState("");
  const [y1, setY1] = React.useState("");
  const [z1, setZ1] = React.useState("");
  const [x2, setX2] = React.useState("");
  const [y2, setY2] = React.useState("");
  const [z2, setZ2] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const nx1 = parseFloat(x1);
  const ny1 = parseFloat(y1);
  const nz1 = parseFloat(z1);
  const nx2 = parseFloat(x2);
  const ny2 = parseFloat(y2);
  const nz2 = parseFloat(z2);

  const baseValid =
    x1 !== "" &&
    Number.isFinite(nx1) &&
    y1 !== "" &&
    Number.isFinite(ny1) &&
    x2 !== "" &&
    Number.isFinite(nx2) &&
    y2 !== "" &&
    Number.isFinite(ny2);

  const allValid =
    baseValid &&
    (dim === "2d" ||
      (z1 !== "" && Number.isFinite(nz1) && z2 !== "" && Number.isFinite(nz2)));

  const distance = React.useMemo<number | null>(() => {
    if (!allValid) return null;
    if (dim === "2d") {
      return Math.sqrt((nx2 - nx1) ** 2 + (ny2 - ny1) ** 2);
    }
    return Math.sqrt(
      (nx2 - nx1) ** 2 + (ny2 - ny1) ** 2 + (nz2 - nz1) ** 2
    );
  }, [allValid, dim, nx1, ny1, nz1, nx2, ny2, nz2]);

  function reset() {
    setX1("");
    setY1("");
    setZ1("");
    setX2("");
    setY2("");
    setZ2("");
    setTouched(false);
  }

  function loadExample(
    ax1: string,
    ay1: string,
    ax2: string,
    ay2: string,
    d: Dimension,
    az1?: string,
    az2?: string
  ) {
    setDim(d);
    setX1(ax1);
    setY1(ay1);
    setZ1(az1 ?? "");
    setX2(ax2);
    setY2(ay2);
    setZ2(az2 ?? "");
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
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const showError = touched && !allValid;

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
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("tagline")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>{t("field.dimension")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["2d", "3d"] as Dimension[]).map((d) => (
                <Button
                  key={d}
                  type="button"
                  variant={dim === d ? "default" : "outline"}
                  onClick={() => {
                    setDim(d);
                    setTouched(false);
                  }}
                >
                  {t(`type.${d}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-zinc-600">
                {t("field.point1")}
              </p>
              <div className="space-y-2">
                <Label htmlFor="df-x1">{t("field.x1")}</Label>
                <Input
                  id="df-x1"
                  type="number"
                  inputMode="decimal"
                  value={x1}
                  placeholder={t("placeholder.coord")}
                  onChange={(e) => {
                    setX1(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="df-y1">{t("field.y1")}</Label>
                <Input
                  id="df-y1"
                  type="number"
                  inputMode="decimal"
                  value={y1}
                  placeholder={t("placeholder.coord")}
                  onChange={(e) => {
                    setY1(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              {dim === "3d" && (
                <div className="space-y-2">
                  <Label htmlFor="df-z1">{t("field.z1")}</Label>
                  <Input
                    id="df-z1"
                    type="number"
                    inputMode="decimal"
                    value={z1}
                    placeholder={t("placeholder.coord")}
                    onChange={(e) => {
                      setZ1(e.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-zinc-600">
                {t("field.point2")}
              </p>
              <div className="space-y-2">
                <Label htmlFor="df-x2">{t("field.x2")}</Label>
                <Input
                  id="df-x2"
                  type="number"
                  inputMode="decimal"
                  value={x2}
                  placeholder={t("placeholder.coord")}
                  onChange={(e) => {
                    setX2(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="df-y2">{t("field.y2")}</Label>
                <Input
                  id="df-y2"
                  type="number"
                  inputMode="decimal"
                  value={y2}
                  placeholder={t("placeholder.coord")}
                  onChange={(e) => {
                    setY2(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              {dim === "3d" && (
                <div className="space-y-2">
                  <Label htmlFor="df-z2">{t("field.z2")}</Label>
                  <Input
                    id="df-z2"
                    type="number"
                    inputMode="decimal"
                    value={z2}
                    placeholder={t("placeholder.coord")}
                    onChange={(e) => {
                      setZ2(e.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
              )}
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

          {distance !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-1">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.distance")}: {fmt(distance)}
              </div>
              <div className="text-xs text-zinc-500">
                {dim === "2d" ? t("formula.2d") : t("formula.3d")}
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
                onClick={() => loadExample("0", "0", "3", "4", "2d")}
              >
                {t("examples.load1")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => loadExample("-1", "2", "2", "6", "2d")}
              >
                {t("examples.load2")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => loadExample("0", "0", "1", "1", "3d", "0", "1")}
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
