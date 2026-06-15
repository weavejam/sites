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

function sphereVolume(diameterCm: number): number {
  const r = diameterCm / 2 / 100; // convert cm → m
  return (4 / 3) * Math.PI * r * r * r;
}

function fmt(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function SnowmanCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.snowman-calculator");

  const [baseDiameter, setBaseDiameter] = React.useState("");
  const [snowDensity, setSnowDensity] = React.useState("");
  const [snowmanHeight, setSnowmanHeight] = React.useState("");
  const [includeAccessories, setIncludeAccessories] = React.useState(true);
  const [touched, setTouched] = React.useState(false);

  const baseNum = parseFloat(baseDiameter);
  const densityNum = parseFloat(snowDensity);
  const heightNum = parseFloat(snowmanHeight);

  // Derive diameters from inputs. Base diameter takes priority when entered; height is the fallback.
  function getDiameters(): { headD: number; bodyD: number; baseD: number } | null {
    if (baseNum > 0 && Number.isFinite(baseNum)) {
      return { headD: baseNum / 3, bodyD: (baseNum * 2) / 3, baseD: baseNum };
    }
    if (heightNum > 0 && Number.isFinite(heightNum)) {
      const x = heightNum / 6;
      return { headD: x, bodyD: 2 * x, baseD: 3 * x };
    }
    return null;
  }

  const result = React.useMemo(() => {
    if (!densityNum || !Number.isFinite(densityNum) || densityNum <= 0) return null;
    const dims = getDiameters();
    if (!dims) return null;

    const { headD, bodyD, baseD } = dims;
    const headVol = sphereVolume(headD);
    const bodyVol = sphereVolume(bodyD);
    const baseVol = sphereVolume(baseD);
    const totalVol = headVol + bodyVol + baseVol;

    const headW = headVol * densityNum;
    const bodyW = bodyVol * densityNum;
    const baseW = baseVol * densityNum;
    const accessoriesW = includeAccessories ? 2 : 0;
    const totalW = headW + bodyW + baseW + accessoriesW;

    return { headD, bodyD, baseD, headVol, bodyVol, baseVol, totalVol, headW, bodyW, baseW, totalW };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heightNum, baseNum, densityNum, includeAccessories]);

  const showError = touched && !result;

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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

  function reset() {
    setBaseDiameter("");
    setSnowDensity("");
    setSnowmanHeight("");
    setIncludeAccessories(true);
    setTouched(false);
  }

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
            <div className="space-y-2">
              <Label htmlFor="sc-height">{t("field.snowmanHeight")}</Label>
              <Input
                id="sc-height"
                type="number"
                inputMode="decimal"
                value={snowmanHeight}
                placeholder={t("placeholder.height")}
                min={0}
                onChange={(e) => {
                  setSnowmanHeight(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sc-density">{t("field.snowDensity")}</Label>
              <Input
                id="sc-density"
                type="number"
                inputMode="decimal"
                value={snowDensity}
                placeholder={t("placeholder.density")}
                min={0}
                onChange={(e) => {
                  setSnowDensity(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sc-base">{t("field.baseDiameter")}</Label>
              <Input
                id="sc-base"
                type="number"
                inputMode="decimal"
                value={baseDiameter}
                placeholder={t("placeholder.diameter")}
                min={0}
                onChange={(e) => {
                  setBaseDiameter(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input
                id="sc-accessories"
                type="checkbox"
                checked={includeAccessories}
                onChange={(e) => setIncludeAccessories(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300"
              />
              <Label htmlFor="sc-accessories">{t("field.includeAccessories")}</Label>
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

          {result && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: t("result.baseSection"), d: result.baseD, v: result.baseVol, w: result.baseW },
                  { label: t("result.bodySection"), d: result.bodyD, v: result.bodyVol, w: result.bodyW },
                  { label: t("result.headSection"), d: result.headD, v: result.headVol, w: result.headW },
                ].map((sec) => (
                  <div key={sec.label} className="rounded border border-zinc-200 bg-white p-3 text-sm">
                    <div className="font-semibold text-zinc-800 mb-1">{sec.label}</div>
                    <div className="text-zinc-600">{t("result.diameter")}: <span className="font-medium text-zinc-900">{fmt(sec.d, 1)} cm</span></div>
                    <div className="text-zinc-600">{t("result.volume")}: <span className="font-medium text-zinc-900">{fmt(sec.v * 1e6, 0)} cm³</span></div>
                    <div className="text-zinc-600">{t("result.weight")}: <span className="font-medium text-zinc-900">{fmt(sec.w, 1)} kg</span></div>
                  </div>
                ))}
              </div>
              {includeAccessories && (
                <div className="text-sm text-zinc-600">{t("result.accessories")}: <span className="font-medium text-zinc-900">2 kg</span> <span className="text-zinc-400">({t("result.accessoriesNote")})</span></div>
              )}
              <div className="border-t border-zinc-200 pt-3 flex flex-wrap gap-6">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalVolume")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">{fmt(result.totalVol * 1e6, 0)} cm³</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalWeight")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">{fmt(result.totalW, 1)} kg</div>
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
