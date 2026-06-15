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

interface PortalResult {
  netherX: number;
  netherY: number;
  netherZ: number;
  overworldX: number;
  overworldY: number;
  overworldZ: number;
  obsidian: number;
  innerWidth: number;
  innerHeight: number;
  outerWidth: number;
  outerHeight: number;
}

function roundCoord(n: number): number {
  return Math.round(n);
}

export default function NetherPortalCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.nether-portal-calculator");

  const [overworldX, setOverworldX] = React.useState("");
  const [overworldY, setOverworldY] = React.useState("");
  const [overworldZ, setOverworldZ] = React.useState("");
  const [netherX, setNetherX] = React.useState("");
  const [netherY, setNetherY] = React.useState("");
  const [netherZ, setNetherZ] = React.useState("");
  const [portalWidth, setPortalWidth] = React.useState("");
  const [portalHeight, setPortalHeight] = React.useState("");
  const [result, setResult] = React.useState<PortalResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [touched, setTouched] = React.useState(false);

  function calculate() {
    setTouched(true);
    setError(null);
    setResult(null);

    const ox = parseFloat(overworldX);
    const oy = parseFloat(overworldY || "64");
    const oz = parseFloat(overworldZ);

    if (!Number.isFinite(ox) || !Number.isFinite(oz)) {
      setError(t("error.invalidCoordinates"));
      return;
    }

    const w = portalWidth !== "" ? parseInt(portalWidth) : 2;
    const h = portalHeight !== "" ? parseInt(portalHeight) : 3;

    if (w < 2 || w > 21 || h < 3 || h > 21) {
      setError(t("error.invalidPortalSize"));
      return;
    }

    const nx = netherX !== "" ? parseFloat(netherX) : roundCoord(ox / 8);
    const ny = netherY !== "" ? parseFloat(netherY) : roundCoord(oy);
    const nz = netherZ !== "" ? parseFloat(netherZ) : roundCoord(oz / 8);

    const obsidian = 2 * (w + 2) + 2 * h;

    setResult({
      netherX: roundCoord(ox / 8),
      netherY: roundCoord(oy),
      netherZ: roundCoord(oz / 8),
      overworldX: roundCoord(nx * 8),
      overworldY: roundCoord(ny),
      overworldZ: roundCoord(nz * 8),
      obsidian,
      innerWidth: w,
      innerHeight: h,
      outerWidth: w + 2,
      outerHeight: h + 2,
    });
  }

  function reset() {
    setOverworldX("");
    setOverworldY("");
    setOverworldZ("");
    setNetherX("");
    setNetherY("");
    setNetherZ("");
    setPortalWidth("");
    setPortalHeight("");
    setResult(null);
    setError(null);
    setTouched(false);
  }

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
          <div>
            <p className="mb-2 text-sm font-medium text-zinc-700">
              {t("result.overworldCoords")}
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="np-ox">{t("field.overworldX")}</Label>
                <Input
                  id="np-ox"
                  type="number"
                  inputMode="decimal"
                  value={overworldX}
                  placeholder={t("placeholder.coordinate")}
                  onChange={(e) => setOverworldX(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="np-oy">{t("field.overworldY")}</Label>
                <Input
                  id="np-oy"
                  type="number"
                  inputMode="decimal"
                  value={overworldY}
                  placeholder={t("placeholder.coordinate")}
                  onChange={(e) => setOverworldY(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="np-oz">{t("field.overworldZ")}</Label>
                <Input
                  id="np-oz"
                  type="number"
                  inputMode="decimal"
                  value={overworldZ}
                  placeholder={t("placeholder.coordinate")}
                  onChange={(e) => setOverworldZ(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-zinc-700">
              {t("label.netherCoordsOptional")}
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="np-nx">{t("field.netherX")}</Label>
                <Input
                  id="np-nx"
                  type="number"
                  inputMode="decimal"
                  value={netherX}
                  placeholder={t("placeholder.coordinate")}
                  onChange={(e) => setNetherX(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="np-ny">{t("field.netherY")}</Label>
                <Input
                  id="np-ny"
                  type="number"
                  inputMode="decimal"
                  value={netherY}
                  placeholder={t("placeholder.coordinate")}
                  onChange={(e) => setNetherY(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="np-nz">{t("field.netherZ")}</Label>
                <Input
                  id="np-nz"
                  type="number"
                  inputMode="decimal"
                  value={netherZ}
                  placeholder={t("placeholder.coordinate")}
                  onChange={(e) => setNetherZ(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="np-pw">{t("field.portalWidth")}</Label>
              <Input
                id="np-pw"
                type="number"
                inputMode="numeric"
                value={portalWidth}
                placeholder={t("placeholder.portalWidth")}
                onChange={(e) => setPortalWidth(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="np-ph">{t("field.portalHeight")}</Label>
              <Input
                id="np-ph"
                type="number"
                inputMode="numeric"
                value={portalHeight}
                placeholder={t("placeholder.portalHeight")}
                onChange={(e) => setPortalHeight(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={calculate}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {error && touched && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-zinc-200 bg-white p-3">
                  <div className="text-xs font-medium text-zinc-500 mb-1">
                    {t("result.netherCoords")}
                  </div>
                  <div className="text-sm font-mono text-zinc-900">
                    {t("result.xLabel")}: {result.netherX} &nbsp;
                    {t("result.yLabel")}: {result.netherY} &nbsp;
                    {t("result.zLabel")}: {result.netherZ}
                  </div>
                </div>
                <div className="rounded-md border border-zinc-200 bg-white p-3">
                  <div className="text-xs font-medium text-zinc-500 mb-1">
                    {t("result.overworldCoords")} ({t("result.fromNether")})
                  </div>
                  <div className="text-sm font-mono text-zinc-900">
                    {t("result.xLabel")}: {result.overworldX} &nbsp;
                    {t("result.yLabel")}: {result.overworldY} &nbsp;
                    {t("result.zLabel")}: {result.overworldZ}
                  </div>
                </div>
                <div className="rounded-md border border-zinc-200 bg-white p-3">
                  <div className="text-xs font-medium text-zinc-500 mb-1">
                    {t("result.obsidianRequired")}
                  </div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {result.obsidian} {t("result.obsidianUnit")}
                  </div>
                </div>
                <div className="rounded-md border border-zinc-200 bg-white p-3">
                  <div className="text-xs font-medium text-zinc-500 mb-1">
                    {t("result.portalSize")} / {t("result.frameSize")}
                  </div>
                  <div className="text-sm text-zinc-900">
                    {result.innerWidth}×{result.innerHeight} {t("result.innerLabel")} / {result.outerWidth}×{result.outerHeight} {t("result.outerLabel")}
                  </div>
                </div>
              </div>
              <p className="text-xs text-zinc-500">{t("result.conversionNote")}</p>
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
