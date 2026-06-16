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

type PtUnit = "seconds" | "ratio";

interface InrResult {
  inr: number;
  ptRatio: number;
  interpretation: "normal" | "subtherapeutic" | "therapeutic" | "highRisk" | "dangerous";
}

function computeInr(patientPT: number, controlPT: number, isi: number, ptUnit: PtUnit): InrResult | null {
  if (!Number.isFinite(isi) || isi <= 0) return null;
  let ptRatio: number;
  if (ptUnit === "seconds") {
    if (!Number.isFinite(patientPT) || patientPT <= 0) return null;
    if (!Number.isFinite(controlPT) || controlPT <= 0) return null;
    ptRatio = patientPT / controlPT;
  } else {
    if (!Number.isFinite(patientPT) || patientPT <= 0) return null;
    ptRatio = patientPT;
  }
  const inr = Math.pow(ptRatio, isi);
  let interpretation: InrResult["interpretation"];
  if (inr < 1.2) interpretation = "normal";
  else if (inr < 2.0) interpretation = "subtherapeutic";
  else if (inr <= 3.0) interpretation = "therapeutic";
  else if (inr <= 4.5) interpretation = "highRisk";
  else interpretation = "dangerous";
  return { inr, ptRatio, interpretation };
}

function fmt(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

export default function InrCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.inr-calculator");

  const [ptUnit, setPtUnit] = React.useState<PtUnit>("seconds");
  const [patientPT, setPatientPT] = React.useState("");
  const [controlPT, setControlPT] = React.useState("");
  const [isi, setIsi] = React.useState("1.0");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<InrResult | null>(() => {
    if (!touched) return null;
    return computeInr(
      parseFloat(patientPT),
      parseFloat(controlPT),
      parseFloat(isi),
      ptUnit,
    );
  }, [touched, patientPT, controlPT, isi, ptUnit]);

  function reset() {
    setPatientPT("");
    setControlPT("");
    setIsi("1.0");
    setPtUnit("seconds");
    setTouched(false);
  }

  function loadExample(pp: string, cp: string, i: string, u: PtUnit) {
    setPatientPT(pp);
    setControlPT(cp);
    setIsi(i);
    setPtUnit(u);
    setTouched(true);
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

  const showError = touched && result === null;
  const PT_UNITS: PtUnit[] = ["seconds", "ratio"];

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
            <Label>{t("field.ptUnit")}</Label>
            <div className="flex flex-wrap gap-2">
              {PT_UNITS.map((u) => (
                <Button
                  key={u}
                  type="button"
                  variant={ptUnit === u ? "default" : "outline"}
                  onClick={() => { setPtUnit(u); setTouched(false); }}
                >
                  {t(`ptUnit.${u}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="inr-patient-pt">
                {ptUnit === "seconds" ? t("field.patientPT") : t("field.ptRatio")}
              </Label>
              <Input
                id="inr-patient-pt"
                type="number"
                inputMode="decimal"
                value={patientPT}
                placeholder={ptUnit === "seconds" ? t("placeholder.patientPT") : t("placeholder.ptRatio")}
                onChange={(e) => { setPatientPT(e.target.value); setTouched(true); }}
              />
            </div>
            {ptUnit === "seconds" && (
              <div className="space-y-2">
                <Label htmlFor="inr-control-pt">{t("field.controlPT")}</Label>
                <Input
                  id="inr-control-pt"
                  type="number"
                  inputMode="decimal"
                  value={controlPT}
                  placeholder={t("placeholder.controlPT")}
                  onChange={(e) => { setControlPT(e.target.value); setTouched(true); }}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="inr-isi">{t("field.isi")}</Label>
              <Input
                id="inr-isi"
                type="number"
                inputMode="decimal"
                value={isi}
                placeholder={t("placeholder.isi")}
                onChange={(e) => { setIsi(e.target.value); setTouched(true); }}
              />
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
              <div className="text-3xl font-bold text-zinc-900">
                {fmt(result.inr)} <span className="text-lg font-normal text-zinc-500">{t("result.inr")}</span>
              </div>
              <div className="text-sm text-zinc-700">
                <span className="font-medium">{t("result.ptRatio")}:</span> {fmt(result.ptRatio)}
              </div>
              <div className="text-sm font-medium text-zinc-700">
                <span className="font-medium">{t("result.interpretation")}:</span>{" "}
                <span className={
                  result.interpretation === "normal" ? "text-green-700" :
                  result.interpretation === "subtherapeutic" ? "text-yellow-700" :
                  result.interpretation === "therapeutic" ? "text-blue-700" :
                  result.interpretation === "highRisk" ? "text-orange-700" :
                  "text-red-700"
                }>
                  {t(`range.${result.interpretation}` as never)}
                </span>
              </div>
              <div className="text-xs text-zinc-500">{t("result.formula")}</div>
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
            onClick={() => loadExample("12", "12", "1.0", "seconds")}>
            {t("examples.loadNormal")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("24", "12", "1.0", "seconds")}>
            {t("examples.loadTherapeutic")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("48", "12", "1.0", "seconds")}>
            {t("examples.loadElevated")}
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
