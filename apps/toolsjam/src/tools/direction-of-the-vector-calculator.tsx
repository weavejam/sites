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

function toDeg(rad: number): string {
  const deg = (rad * 180) / Math.PI;
  return deg.toLocaleString("en-US", { maximumFractionDigits: 6 }) + "°";
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const r = Math.round(n * 1e10) / 1e10;
  return r.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

export default function DirectionOfTheVectorCalculator(_props: {
  locale: Locale;
}) {
  const t = useTranslations("tool.direction-of-the-vector-calculator");
  const [dim, setDim] = React.useState<Dimension>("2d");
  const [x, setX] = React.useState("");
  const [y, setY] = React.useState("");
  const [z, setZ] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const nx = parseFloat(x);
  const ny = parseFloat(y);
  const nz = parseFloat(z);
  const xValid = x !== "" && Number.isFinite(nx);
  const yValid = y !== "" && Number.isFinite(ny);
  const zValid = dim === "2d" || (z !== "" && Number.isFinite(nz));

  const allValid = xValid && yValid && zValid;

  const computed = React.useMemo(() => {
    if (!allValid) return null;
    const zVal = dim === "3d" ? nz : 0;
    const mag =
      dim === "2d"
        ? Math.sqrt(nx * nx + ny * ny)
        : Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (mag === 0) return null;
    if (dim === "2d") {
      const angleAlpha = Math.atan2(ny, nx);
      return {
        magnitude: mag,
        alpha: angleAlpha,
        cosAlpha: nx / mag,
        cosBeta: ny / mag,
        ux: nx / mag,
        uy: ny / mag,
        uz: null as null,
      };
    } else {
      const alpha = Math.acos(nx / mag);
      const beta = Math.acos(ny / mag);
      const gamma = Math.acos(nz / mag);
      return {
        magnitude: mag,
        alpha,
        beta,
        gamma,
        cosAlpha: nx / mag,
        cosBeta: ny / mag,
        cosGamma: zVal / mag,
        ux: nx / mag,
        uy: ny / mag,
        uz: nz / mag,
      };
    }
  }, [allValid, dim, nx, ny, nz]);

  const showError = touched && !allValid;
  const showZeroError = touched && allValid && computed === null;

  function reset() {
    setX("");
    setY("");
    setZ("");
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

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="dvc-x">{t("field.x")}</Label>
              <Input
                id="dvc-x"
                type="number"
                inputMode="decimal"
                value={x}
                placeholder={t("placeholder.number")}
                onChange={(e) => {
                  setX(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dvc-y">{t("field.y")}</Label>
              <Input
                id="dvc-y"
                type="number"
                inputMode="decimal"
                value={y}
                placeholder={t("placeholder.number")}
                onChange={(e) => {
                  setY(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            {dim === "3d" && (
              <div className="space-y-2">
                <Label htmlFor="dvc-z">{t("field.z")}</Label>
                <Input
                  id="dvc-z"
                  type="number"
                  inputMode="decimal"
                  value={z}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => {
                    setZ(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
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
          {showZeroError && (
            <p className="text-sm text-red-600">{t("error.zeroVector")}</p>
          )}

          {computed !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-1 text-sm">
                <div>
                  <span className="font-medium text-zinc-700">
                    {t("result.magnitude")}:
                  </span>{" "}
                  {fmt(computed.magnitude)}
                </div>
                {dim === "2d" ? (
                  <>
                    <div>
                      <span className="font-medium text-zinc-700">
                        {t("result.angle")} (α):
                      </span>{" "}
                      {toDeg(computed.alpha!)}
                    </div>
                    <div>
                      <span className="font-medium text-zinc-700">
                        {t("result.cosAlpha")}:
                      </span>{" "}
                      {fmt(computed.cosAlpha)}
                    </div>
                    <div>
                      <span className="font-medium text-zinc-700">
                        {t("result.cosBeta")}:
                      </span>{" "}
                      {fmt(computed.cosBeta!)}
                    </div>
                    <div>
                      <span className="font-medium text-zinc-700">
                        {t("result.unitVector")}:
                      </span>{" "}
                      ({fmt(computed.ux)}, {fmt(computed.uy)})
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="font-medium text-zinc-700">
                        {t("result.alpha")} (α):
                      </span>{" "}
                      {toDeg(computed.alpha!)}
                    </div>
                    <div>
                      <span className="font-medium text-zinc-700">
                        {t("result.beta")} (β):
                      </span>{" "}
                      {toDeg((computed as { beta?: number }).beta ?? 0)}
                    </div>
                    <div>
                      <span className="font-medium text-zinc-700">
                        {t("result.gamma")} (γ):
                      </span>{" "}
                      {toDeg((computed as { gamma?: number }).gamma ?? 0)}
                    </div>
                    <div>
                      <span className="font-medium text-zinc-700">
                        {t("result.cosAlpha")}:
                      </span>{" "}
                      {fmt(computed.cosAlpha)}
                    </div>
                    <div>
                      <span className="font-medium text-zinc-700">
                        {t("result.cosBeta")}:
                      </span>{" "}
                      {fmt(computed.cosBeta!)}
                    </div>
                    <div>
                      <span className="font-medium text-zinc-700">
                        {t("result.cosGamma")}:
                      </span>{" "}
                      {fmt((computed as { cosGamma?: number }).cosGamma ?? 0)}
                    </div>
                    <div>
                      <span className="font-medium text-zinc-700">
                        {t("result.unitVector")}:
                      </span>{" "}
                      ({fmt(computed.ux)}, {fmt(computed.uy)},{" "}
                      {fmt(computed.uz ?? 0)})
                    </div>
                  </>
                )}
              </div>
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
