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

const EARTH_RADIUS_KM = 6371.0;
const EARTH_CIRCUMFERENCE_HALF_KM = Math.PI * EARTH_RADIUS_KM;
const KM_TO_MILES = 0.621371;

function fmt(n: number, dec = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: dec });
}

function formatCoord(deg: number, posLabel: string, negLabel: string): string {
  const abs = Math.abs(deg);
  const label = deg >= 0 ? posLabel : negLabel;
  return `${fmt(abs, 4)}° ${label}`;
}
function calcAntipode(lat: number, lon: number): { antipodeLat: number; antipodeLon: number } | null {
  if (!Number.isFinite(lat) || lat < -90 || lat > 90) return null;
  if (!Number.isFinite(lon) || lon < -180 || lon > 180) return null;
  const antipodeLat = -lat;
  let antipodeLon = lon > 0 ? lon - 180 : lon + 180;
  // Normalise to (-180, 180]
  if (antipodeLon <= -180) antipodeLon += 360;
  if (antipodeLon > 180) antipodeLon -= 360;
  return { antipodeLat, antipodeLon };
}

export default function AntipodeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.antipode-calculator");

  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    if (!touched) return null;
    return calcAntipode(parseFloat(latitude), parseFloat(longitude));
  }, [touched, latitude, longitude]);

  function loadExample(lat: string, lon: string) {
    setLatitude(lat);
    setLongitude(lon);
    setTouched(true);
  }

  function reset() {
    setLatitude("");
    setLongitude("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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

  const showError = touched && result === null;

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
              <Label htmlFor="ant-lat">{t("field.latitude")}</Label>
              <Input
                id="ant-lat"
                type="number"
                inputMode="decimal"
                min="-90"
                max="90"
                step="any"
                value={latitude}
                placeholder={t("placeholder.latitude")}
                onChange={(e) => { setLatitude(e.target.value); setTouched(false); }}
              />
              <p className="text-xs text-zinc-500">{t("hint.latitude")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ant-lon">{t("field.longitude")}</Label>
              <Input
                id="ant-lon"
                type="number"
                inputMode="decimal"
                min="-180"
                max="180"
                step="any"
                value={longitude}
                placeholder={t("placeholder.longitude")}
                onChange={(e) => { setLongitude(e.target.value); setTouched(false); }}
              />
              <p className="text-xs text-zinc-500">{t("hint.longitude")}</p>
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

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-xs text-zinc-500">{t("result.antipodeLat")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatCoord(result.antipodeLat, t("direction.N"), t("direction.S"))}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.antipodeLon")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatCoord(result.antipodeLon, t("direction.E"), t("direction.W"))}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-xs text-zinc-500">{t("result.distance")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(EARTH_CIRCUMFERENCE_HALF_KM, 0)} {t("result.unitKm")}
                    {" / "}
                    {fmt(EARTH_CIRCUMFERENCE_HALF_KM * KM_TO_MILES, 0)} {t("result.unitMi")}
                  </div>
                </div>
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("40.7128", "-74.006")}>
            {t("examples.loadNYC")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("51.5074", "-0.1278")}>
            {t("examples.loadLondon")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("35.6762", "139.6503")}>
            {t("examples.loadTokyo")}
          </Button>
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
