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

type DistUnit = "km" | "mi" | "nm";
const UNITS: DistUnit[] = ["km", "mi", "nm"];

const EARTH_RADIUS_KM = 6371;
const KM_TO_MI = 0.621371;
const KM_TO_NM = 0.539957;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function toDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): { km: number; bearing: number; midLat: number; midLon: number } {
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.asin(Math.sqrt(a));
  const km = EARTH_RADIUS_KM * c;

  // Initial bearing
  const y = Math.sin(toRad(lon2 - lon1)) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(toRad(lon2 - lon1));
  const bearing = ((toDeg(Math.atan2(y, x)) + 360) % 360);

  // Midpoint
  const Bx = Math.cos(φ2) * Math.cos(toRad(lon2 - lon1));
  const By = Math.cos(φ2) * Math.sin(toRad(lon2 - lon1));
  const midLat = toDeg(
    Math.atan2(
      Math.sin(φ1) + Math.sin(φ2),
      Math.sqrt((Math.cos(φ1) + Bx) ** 2 + By ** 2)
    )
  );
  const midLon = lon1 + toDeg(Math.atan2(By, Math.cos(φ1) + Bx));

  return { km, bearing, midLat, midLon };
}

function convertDist(km: number, unit: DistUnit): number {
  if (unit === "mi") return km * KM_TO_MI;
  if (unit === "nm") return km * KM_TO_NM;
  return km;
}

function fmtCoord(n: number): string {
  return (Math.round(n * 10000) / 10000).toString();
}

function fmtDist(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function GreatCircleCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.great-circle-calculator");

  const [lat1, setLat1] = React.useState("");
  const [lon1, setLon1] = React.useState("");
  const [lat2, setLat2] = React.useState("");
  const [lon2, setLon2] = React.useState("");
  const [unit, setUnit] = React.useState<DistUnit>("km");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    if (!touched) return null;
    const la1 = parseFloat(lat1);
    const lo1 = parseFloat(lon1);
    const la2 = parseFloat(lat2);
    const lo2 = parseFloat(lon2);
    if ([la1, lo1, la2, lo2].some(Number.isNaN)) return { error: "invalid" as const };
    if (Math.abs(la1) > 90 || Math.abs(la2) > 90) return { error: "invalidLat" as const };
    if (Math.abs(lo1) > 180 || Math.abs(lo2) > 180) return { error: "invalidLon" as const };
    return haversine(la1, lo1, la2, lo2);
  }, [touched, lat1, lon1, lat2, lon2]);

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
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

  function loadExample(la1: string, lo1: string, la2: string, lo2: string) {
    setLat1(la1);
    setLon1(lo1);
    setLat2(la2);
    setLon2(lo2);
    setTouched(true);
  }

  function reset() {
    setLat1("");
    setLon1("");
    setLat2("");
    setLon2("");
    setTouched(false);
  }

  const goodResult = result && !("error" in result) ? result : null;
  const errorKey = result && "error" in result ? result.error : null;

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gc-lat1">{t("field.lat1")}</Label>
                <Input
                  id="gc-lat1"
                  type="number"
                  inputMode="decimal"
                  placeholder={t("field.latPlaceholder")}
                  value={lat1}
                  onChange={(e) => { setLat1(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gc-lon1">{t("field.lon1")}</Label>
                <Input
                  id="gc-lon1"
                  type="number"
                  inputMode="decimal"
                  placeholder={t("field.lonPlaceholder")}
                  value={lon1}
                  onChange={(e) => { setLon1(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gc-lat2">{t("field.lat2")}</Label>
                <Input
                  id="gc-lat2"
                  type="number"
                  inputMode="decimal"
                  placeholder={t("field.latPlaceholder")}
                  value={lat2}
                  onChange={(e) => { setLat2(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gc-lon2">{t("field.lon2")}</Label>
                <Input
                  id="gc-lon2"
                  type="number"
                  inputMode="decimal"
                  placeholder={t("field.lonPlaceholder")}
                  value={lon2}
                  onChange={(e) => { setLon2(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.unit")}</Label>
            <div className="flex flex-wrap gap-2">
              {UNITS.map((u) => (
                <Button
                  key={u}
                  type="button"
                  variant={unit === u ? "default" : "outline"}
                  onClick={() => setUnit(u)}
                >
                  {t(`unit.${u}` as never)}
                </Button>
              ))}
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

          {errorKey && (
            <p className="text-sm text-red-600">{t(`error.${errorKey}` as never)}</p>
          )}

          {goodResult && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.distance", {
                  distance: fmtDist(convertDist(goodResult.km, unit)),
                  unit,
                })}
              </div>
              <p className="text-sm text-zinc-600">
                {t("result.bearing", {
                  bearing: Math.round(goodResult.bearing * 10) / 10,
                })}
              </p>
              <p className="text-sm text-zinc-600">
                {t("result.midpoint", {
                  lat: fmtCoord(goodResult.midLat),
                  lon: fmtCoord(goodResult.midLon),
                })}
              </p>
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
            onClick={() => loadExample("40.7128", "-74.0060", "51.5074", "-0.1278")}
          >
            {t("examples.loadNYLondon")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("-33.8688", "151.2093", "35.6895", "139.6917")}
          >
            {t("examples.loadSydTokyo")}
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
