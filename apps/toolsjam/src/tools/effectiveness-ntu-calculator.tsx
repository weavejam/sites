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

const CP_WATER = 4186; // J/(kg·K)

function formatNum(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  });
}

interface Results {
  ntu: number;
  effectiveness: number;
  heatTransferRate: number;
  capacityRateRatio: number;
  cmin: number;
}

function compute(
  tHotIn: number,
  tHotOut: number,
  tColdIn: number,
  tColdOut: number,
  mHot: number,
  mCold: number,
  u: number,
  a: number
): Results | null {
  if (
    !Number.isFinite(tHotIn) ||
    !Number.isFinite(tHotOut) ||
    !Number.isFinite(tColdIn) ||
    !Number.isFinite(tColdOut) ||
    !Number.isFinite(mHot) ||
    !Number.isFinite(mCold) ||
    !Number.isFinite(u) ||
    !Number.isFinite(a) ||
    mHot <= 0 ||
    mCold <= 0 ||
    u <= 0 ||
    a <= 0
  )
    return null;
  const cHot = mHot * CP_WATER;
  const cCold = mCold * CP_WATER;
  const cMin = Math.min(cHot, cCold);
  const cMax = Math.max(cHot, cCold);
  const cr = cMin / cMax;
  const ntu = (u * a) / cMin;
  // Primary heat duty from hot-side temperatures
  const q = cHot * (tHotIn - tHotOut);
  // Cross-check with cold side (tColdOut provides an independent energy balance)
  const qCold = cCold * (tColdOut - tColdIn);
  // If energy balance is badly violated (>20% discrepancy), flag inconsistency
  if (q > 0 && Math.abs(q - qCold) / q > 0.20) return null;
  const qMax = cMin * (tHotIn - tColdIn);
  if (qMax === 0) return null;
  const effectiveness = q / qMax;
  return { ntu, effectiveness, heatTransferRate: q, capacityRateRatio: cr, cmin: cMin };
}

export default function EffectivenessNtuCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.effectiveness-ntu-calculator");

  const [hotInletTemp, setHotInletTemp] = React.useState("");
  const [hotOutletTemp, setHotOutletTemp] = React.useState("");
  const [coldInletTemp, setColdInletTemp] = React.useState("");
  const [coldOutletTemp, setColdOutletTemp] = React.useState("");
  const [hotMassFlow, setHotMassFlow] = React.useState("");
  const [coldMassFlow, setColdMassFlow] = React.useState("");
  const [heatTransferCoeff, setHeatTransferCoeff] = React.useState("");
  const [heatTransferArea, setHeatTransferArea] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const vals = {
    tHotIn: parseFloat(hotInletTemp),
    tHotOut: parseFloat(hotOutletTemp),
    tColdIn: parseFloat(coldInletTemp),
    tColdOut: parseFloat(coldOutletTemp),
    mHot: parseFloat(hotMassFlow),
    mCold: parseFloat(coldMassFlow),
    u: parseFloat(heatTransferCoeff),
    a: parseFloat(heatTransferArea),
  };

  const allFilled =
    hotInletTemp !== "" &&
    hotOutletTemp !== "" &&
    coldInletTemp !== "" &&
    coldOutletTemp !== "" &&
    hotMassFlow !== "" &&
    coldMassFlow !== "" &&
    heatTransferCoeff !== "" &&
    heatTransferArea !== "";

  const tempError =
    touched && allFilled && Number.isFinite(vals.tHotIn) && Number.isFinite(vals.tColdIn)
      ? vals.tHotIn <= vals.tColdIn
      : false;

  const results = React.useMemo<Results | null>(() => {
    if (!touched) return null;
    return compute(
      vals.tHotIn,
      vals.tHotOut,
      vals.tColdIn,
      vals.tColdOut,
      vals.mHot,
      vals.mCold,
      vals.u,
      vals.a
    );
  }, [touched, vals.tHotIn, vals.tHotOut, vals.tColdIn, vals.tColdOut, vals.mHot, vals.mCold, vals.u, vals.a]);

  const showInvalidError = touched && allFilled && results === null && !tempError;

  function reset() {
    setHotInletTemp("");
    setHotOutletTemp("");
    setColdInletTemp("");
    setColdOutletTemp("");
    setHotMassFlow("");
    setColdMassFlow("");
    setHeatTransferCoeff("");
    setHeatTransferArea("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
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
            {(
              [
                ["hotInletTemp", hotInletTemp, setHotInletTemp],
                ["hotOutletTemp", hotOutletTemp, setHotOutletTemp],
                ["coldInletTemp", coldInletTemp, setColdInletTemp],
                ["coldOutletTemp", coldOutletTemp, setColdOutletTemp],
                ["hotMassFlow", hotMassFlow, setHotMassFlow],
                ["coldMassFlow", coldMassFlow, setColdMassFlow],
                ["heatTransferCoeff", heatTransferCoeff, setHeatTransferCoeff],
                ["heatTransferArea", heatTransferArea, setHeatTransferArea],
              ] as [string, string, (v: string) => void][]
            ).map(([key, value, setter]) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={`ntu-${key}`}>{t(`field.${key}` as never)}</Label>
                <Input
                  id={`ntu-${key}`}
                  type="number"
                  inputMode="decimal"
                  value={value}
                  placeholder={t(`placeholder.${key}` as never)}
                  onChange={(e) => {
                    setter(e.target.value);
                    setTouched(false);
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {tempError && (
            <p className="text-sm text-red-600">{t("error.tempRange")}</p>
          )}
          {showInvalidError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {results !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-xs text-zinc-500">{t("result.ntu")}: </span>
                  <span className="font-semibold">{formatNum(results.ntu)}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.effectiveness")}: </span>
                  <span className="font-semibold">{formatNum(results.effectiveness)} ({formatNum(results.effectiveness * 100, 2)}%)</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.heatTransferRate")}: </span>
                  <span className="font-semibold">{formatNum(results.heatTransferRate, 2)} W</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.capacityRateRatio")}: </span>
                  <span className="font-semibold">{formatNum(results.capacityRateRatio)}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.cmin")}: </span>
                  <span className="font-semibold">{formatNum(results.cmin, 2)} W/K</span>
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
