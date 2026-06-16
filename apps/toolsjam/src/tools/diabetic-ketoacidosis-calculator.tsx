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

type DKASeverity = "noDKA" | "mild" | "moderate" | "severe";
type DeltaInterp = "hyperchloremic" | "mixed" | "pure" | "mixedAlk";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function fmt(n: number, decimals = 1): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

function computeDKA(params: {
  na: number;
  k: number;
  cl: number;
  hco3: number;
  glucose: number;
  bun: number;
  ph: number | null;
  measuredOsm: number | null;
}): {
  anionGap: number;
  deltaRatio: number | null;
  deltaInterp: DeltaInterp | null;
  correctedNa: number;
  calcOsm: number;
  osmolalGap: number | null;
  severity: DKASeverity;
} {
  const { na, cl, hco3, glucose, bun, ph, measuredOsm } = params;

  const anionGap = na - (cl + hco3);

  // Delta ratio: only meaningful when AG is elevated
  let deltaRatio: number | null = null;
  let deltaInterp: DeltaInterp | null = null;
  const hco3Deficit = 24 - hco3;
  if (anionGap > 12 && hco3Deficit > 0) {
    deltaRatio = (anionGap - 12) / hco3Deficit;
    if (deltaRatio < 0.4) deltaInterp = "hyperchloremic";
    else if (deltaRatio < 1) deltaInterp = "mixed";
    else if (deltaRatio <= 2) deltaInterp = "pure";
    else deltaInterp = "mixedAlk";
  } else if (anionGap > 12 && hco3Deficit <= 0) {
    deltaRatio = null;
    deltaInterp = "mixedAlk";
  }

  // Corrected sodium for hyperglycaemia
  const correctedNa = na + 1.6 * ((glucose - 100) / 100);

  // Calculated osmolality
  const calcOsm = 2 * na + glucose / 18 + bun / 2.8;

  // Osmolal gap
  const osmolalGap = measuredOsm !== null ? measuredOsm - calcOsm : null;

  // DKA severity
  let severity: DKASeverity;
  if (glucose <= 250 || anionGap <= 12) {
    severity = "noDKA";
  } else if (ph !== null) {
    if (ph < 7.0 || hco3 < 10) severity = "severe";
    else if (ph < 7.25 || hco3 < 15) severity = "moderate";
    else if (ph <= 7.30 || hco3 <= 18) severity = "mild";
    else severity = "noDKA";
  } else {
    // Without pH, classify by HCO3
    if (hco3 < 10) severity = "severe";
    else if (hco3 < 15) severity = "moderate";
    else if (hco3 <= 18) severity = "mild";
    else severity = "noDKA";
  }

  return { anionGap, deltaRatio, deltaInterp, correctedNa, calcOsm, osmolalGap, severity };
}

const SEVERITY_COLORS: Record<DKASeverity, string> = {
  noDKA: "text-green-700 bg-green-50 border-green-200",
  mild: "text-yellow-700 bg-yellow-50 border-yellow-200",
  moderate: "text-orange-700 bg-orange-50 border-orange-200",
  severe: "text-red-700 bg-red-50 border-red-200",
};

export default function DiabeticKetoacidosisCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.diabetic-ketoacidosis-calculator");

  const [na, setNa] = React.useState("");
  const [k, setK] = React.useState("");
  const [cl, setCl] = React.useState("");
  const [hco3, setHco3] = React.useState("");
  const [glucose, setGlucose] = React.useState("");
  const [bun, setBun] = React.useState("");
  const [ph, setPh] = React.useState("");
  const [measuredOsm, setMeasuredOsm] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const naNum = parseFloat(na);
  const kNum = parseFloat(k);
  const clNum = parseFloat(cl);
  const hco3Num = parseFloat(hco3);
  const glucoseNum = parseFloat(glucose);
  const bunNum = parseFloat(bun);
  const phNum = ph !== "" ? parseFloat(ph) : null;
  const osmNum = measuredOsm !== "" ? parseFloat(measuredOsm) : null;

  const requiredValid =
    na !== "" && Number.isFinite(naNum) &&
    k !== "" && Number.isFinite(kNum) &&
    cl !== "" && Number.isFinite(clNum) &&
    hco3 !== "" && Number.isFinite(hco3Num) &&
    glucose !== "" && Number.isFinite(glucoseNum) &&
    bun !== "" && Number.isFinite(bunNum);

  const result = React.useMemo(() => {
    if (!requiredValid) return null;
    return computeDKA({
      na: naNum,
      k: kNum,
      cl: clNum,
      hco3: hco3Num,
      glucose: glucoseNum,
      bun: bunNum,
      ph: phNum,
      measuredOsm: osmNum,
    });
  }, [requiredValid, naNum, kNum, clNum, hco3Num, glucoseNum, bunNum, phNum, osmNum]);

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<{ q: string; a: string }[]>(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: t("title"),
        applicationCategory: "HealthApplication",
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
    setNa(""); setK(""); setCl(""); setHco3("");
    setGlucose(""); setBun(""); setPh(""); setMeasuredOsm("");
    setTouched(false);
  }

  function loadProfile(
    naV: string, kV: string, clV: string, hco3V: string,
    glV: string, bunV: string, phV: string, osmV: string,
  ) {
    setNa(naV); setK(kV); setCl(clV); setHco3(hco3V);
    setGlucose(glV); setBun(bunV); setPh(phV); setMeasuredOsm(osmV);
    setTouched(true);
  }

  const NumberInput = ({
    id, label, value, onChange, placeholder, optional,
  }: {
    id: string; label: string; value: string;
    onChange: (v: string) => void; placeholder: string; optional?: boolean;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {optional && <span className="ml-1 text-xs text-zinc-400">{t("label.optional")}</span>}
      </Label>
      <Input
        id={id}
        type="number"
        inputMode="decimal"
        value={value}
        placeholder={placeholder}
        onChange={(e) => { onChange(e.target.value); setTouched(true); }}
      />
    </div>
  );

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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <NumberInput id="dka-na" label={t("field.sodium")} value={na} onChange={setNa} placeholder={t("placeholder.sodium")} />
            <NumberInput id="dka-k" label={t("field.potassium")} value={k} onChange={setK} placeholder={t("placeholder.potassium")} />
            <NumberInput id="dka-cl" label={t("field.chloride")} value={cl} onChange={setCl} placeholder={t("placeholder.chloride")} />
            <NumberInput id="dka-hco3" label={t("field.bicarbonate")} value={hco3} onChange={setHco3} placeholder={t("placeholder.bicarbonate")} />
            <NumberInput id="dka-glucose" label={t("field.glucose")} value={glucose} onChange={setGlucose} placeholder={t("placeholder.glucose")} />
            <NumberInput id="dka-bun" label={t("field.bun")} value={bun} onChange={setBun} placeholder={t("placeholder.bun")} />
            <NumberInput id="dka-ph" label={t("field.ph")} value={ph} onChange={setPh} placeholder={t("placeholder.ph")} optional />
            <NumberInput id="dka-osm" label={t("field.measuredOsm")} value={measuredOsm} onChange={setMeasuredOsm} placeholder={t("placeholder.measuredOsm")} optional />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {touched && !requiredValid && (
            <p className="text-sm text-red-600">{t("error.required")}</p>
          )}

          {result !== null && (
            <div className={`rounded-lg border p-4 space-y-3 ${SEVERITY_COLORS[result.severity]}`}>
              <div className="text-sm font-medium">{t("result.heading")}</div>
              <div className="text-2xl font-bold">
                {t(`severity.${result.severity}` as never)}
              </div>
              <div className="grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <span className="font-semibold">{t("result.anionGap")}: </span>
                  {fmt(result.anionGap)} mEq/L{" "}
                  <span className="opacity-75">{t("result.anionGapNormal")}</span>
                </div>
                <div>
                  <span className="font-semibold">{t("result.correctedNa")}: </span>
                  {fmt(result.correctedNa)} mEq/L
                </div>
                <div>
                  <span className="font-semibold">{t("result.calcOsm")}: </span>
                  {fmt(result.calcOsm)} mOsm/kg
                </div>
                {result.osmolalGap !== null && (
                  <div>
                    <span className="font-semibold">{t("result.osmolalGap")}: </span>
                    {fmt(result.osmolalGap)}{" "}
                    <span className="opacity-75">{t("result.osmolalGapNormal")}</span>
                  </div>
                )}
                {result.deltaRatio !== null && (
                  <div className="sm:col-span-2">
                    <span className="font-semibold">{t("result.deltaRatio")}: </span>
                    {fmt(result.deltaRatio, 2)} —{" "}
                    {result.deltaInterp
                      ? t(`deltaInterp.${result.deltaInterp}` as never)
                      : ""}
                  </div>
                )}
              </div>
              <p className="mt-2 text-xs opacity-75">{t("result.note")}</p>
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
            onClick={() => loadProfile("140", "4.0", "102", "24", "100", "15", "7.4", "290")}>
            {t("examples.loadNormal")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadProfile("138", "4.2", "100", "18", "350", "18", "7.30", "315")}>
            {t("examples.loadMild")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadProfile("135", "4.8", "95", "12", "500", "25", "7.20", "330")}>
            {t("examples.loadModerate")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadProfile("130", "5.5", "90", "8", "650", "35", "7.10", "350")}>
            {t("examples.loadSevere")}
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
