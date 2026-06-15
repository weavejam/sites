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

type FilterType = "canister" | "hangOnBack" | "sponge" | "internal" | "undergravel";
const FILTER_TYPES: FilterType[] = ["canister", "hangOnBack", "sponge", "internal", "undergravel"];

function fmt(n: number, dec = 1): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: dec });
}

interface AquariumResult {
  volume: number;
  fishCapacity: number;
  filterFlow: number;
  weeklyChange: number;
  heaterAdequate: boolean | null;
}

function calcAquarium(
  length: number, width: number, height: number,
  waterLevel: number, fishSize: number, heaterPower: number
): AquariumResult | null {
  if (
    !Number.isFinite(length) || length <= 0 ||
    !Number.isFinite(width) || width <= 0 ||
    !Number.isFinite(height) || height <= 0 ||
    !Number.isFinite(waterLevel) || waterLevel <= 0 || waterLevel > 100
  ) return null;

  const volume = (length * width * height * (waterLevel / 100)) / 1000;
  const fishCapacity = fishSize > 0 ? Math.floor(volume / fishSize) : 0;
  const filterFlow = volume * 4;
  const weeklyChange = volume * 0.25;
  const heaterAdequate = Number.isFinite(heaterPower) && heaterPower > 0
    ? heaterPower >= volume * 1.0
    : null;

  return { volume, fishCapacity, filterFlow, weeklyChange, heaterAdequate };
}

export default function AquariumCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.aquarium-calculator");

  const [length, setLength] = React.useState("");
  const [width, setWidth] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [waterLevel, setWaterLevel] = React.useState("90");
  const [fishCount, setFishCount] = React.useState("");
  const [fishSize, setFishSize] = React.useState("");
  const [filterType, setFilterType] = React.useState<FilterType>("canister");
  const [heaterPower, setHeaterPower] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    if (!touched) return null;
    return calcAquarium(
      parseFloat(length), parseFloat(width), parseFloat(height),
      parseFloat(waterLevel), parseFloat(fishSize), parseFloat(heaterPower)
    );
  }, [touched, length, width, height, waterLevel, fishSize, heaterPower]);

  function loadExample(l: string, w: string, h: string, wl: string, fc: string, fs: string, ft: FilterType, hp: string) {
    setLength(l); setWidth(w); setHeight(h);
    setWaterLevel(wl); setFishCount(fc); setFishSize(fs);
    setFilterType(ft); setHeaterPower(hp);
    setTouched(true);
  }

  function reset() {
    setLength(""); setWidth(""); setHeight("");
    setWaterLevel("90"); setFishCount(""); setFishSize("");
    setFilterType("canister"); setHeaterPower("");
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
              <Label htmlFor="aq-l">{t("field.length")}</Label>
              <Input id="aq-l" type="number" inputMode="decimal" min="0" step="any"
                value={length} placeholder={t("placeholder.dimension")}
                onChange={(e) => { setLength(e.target.value); setTouched(false); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aq-w">{t("field.width")}</Label>
              <Input id="aq-w" type="number" inputMode="decimal" min="0" step="any"
                value={width} placeholder={t("placeholder.dimension")}
                onChange={(e) => { setWidth(e.target.value); setTouched(false); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aq-h">{t("field.height")}</Label>
              <Input id="aq-h" type="number" inputMode="decimal" min="0" step="any"
                value={height} placeholder={t("placeholder.dimension")}
                onChange={(e) => { setHeight(e.target.value); setTouched(false); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aq-wl">{t("field.waterLevel")}</Label>
              <Input id="aq-wl" type="number" inputMode="decimal" min="1" max="100" step="any"
                value={waterLevel} placeholder={t("placeholder.percent")}
                onChange={(e) => { setWaterLevel(e.target.value); setTouched(false); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aq-fc">{t("field.fishCount")}</Label>
              <Input id="aq-fc" type="number" inputMode="numeric" min="0" step="1"
                value={fishCount} placeholder={t("placeholder.count")}
                onChange={(e) => { setFishCount(e.target.value); setTouched(false); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aq-fs">{t("field.fishSize")}</Label>
              <Input id="aq-fs" type="number" inputMode="decimal" min="0" step="any"
                value={fishSize} placeholder={t("placeholder.size")}
                onChange={(e) => { setFishSize(e.target.value); setTouched(false); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aq-ft">{t("field.filterType")}</Label>
              <select
                id="aq-ft"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as FilterType)}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {FILTER_TYPES.map((ft) => (
                  <option key={ft} value={ft}>{t(`filterType.${ft}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="aq-hp">{t("field.heaterPower")}</Label>
              <Input id="aq-hp" type="number" inputMode="decimal" min="0" step="any"
                value={heaterPower} placeholder={t("placeholder.watt")}
                onChange={(e) => { setHeaterPower(e.target.value); setTouched(false); }} />
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
                  <span className="text-xs text-zinc-500">{t("result.volume")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.volume)} {t("result.unitLiters")}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.fishCapacity")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.fishCapacity} {t("result.unitFish")}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.filterFlow")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.filterFlow)} {t("result.unitLph")}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.weeklyChange")}</span>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.weeklyChange)} {t("result.unitLiters")}
                  </div>
                </div>
                {result.heaterAdequate !== null && (
                  <div className="sm:col-span-2">
                    <span className="text-xs text-zinc-500">{t("result.heaterStatus")}</span>
                    <div className={`text-base font-semibold ${result.heaterAdequate ? "text-green-700" : "text-amber-600"}`}>
                      {result.heaterAdequate ? t("result.heaterOk") : t("result.heaterLow")}
                    </div>
                  </div>
                )}
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
            onClick={() => loadExample("50", "30", "40", "90", "10", "3", "canister", "75")}>
            {t("examples.loadSmall")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("100", "40", "50", "90", "15", "8", "hangOnBack", "200")}>
            {t("examples.loadMedium")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("120", "50", "55", "88", "8", "15", "canister", "300")}>
            {t("examples.loadLarge")}
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
