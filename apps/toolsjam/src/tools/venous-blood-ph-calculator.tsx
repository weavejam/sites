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

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

function fmt(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

type AcidBaseDisorder =
  | "normal"
  | "metabolicAcidosis"
  | "metabolicAlkalosis"
  | "respiratoryAcidosis"
  | "respiratoryAlkalosis"
  | "mixedAcidosis"
  | "mixedAlkalosis";

function classifyAcidBase(
  ph: number,
  hco3: number,
  pco2: number,
  be: number,
): { disorder: AcidBaseDisorder; severity: string } {
  const acidotic = ph < 7.30;
  const alkalotic = ph > 7.40;
  const metAcid = hco3 < 22 || be < -2;
  const metAlk = hco3 > 26 || be > 2;
  const respAcid = pco2 > 50;
  const respAlk = pco2 < 40;

  if (!acidotic && !alkalotic && !metAcid && !metAlk && !respAcid && !respAlk) {
    return { disorder: "normal", severity: "normal" };
  }

  if (acidotic && metAcid && respAcid) {
    return { disorder: "mixedAcidosis", severity: "severe" };
  }
  if (alkalotic && metAlk && respAlk) {
    return { disorder: "mixedAlkalosis", severity: "moderate" };
  }
  if (acidotic && metAcid) {
    return {
      disorder: "metabolicAcidosis",
      severity: ph < 7.2 ? "severe" : ph < 7.25 ? "moderate" : "mild",
    };
  }
  if (acidotic && respAcid) {
    return {
      disorder: "respiratoryAcidosis",
      severity: ph < 7.2 ? "severe" : "moderate",
    };
  }
  if (alkalotic && metAlk) {
    return { disorder: "metabolicAlkalosis", severity: "mild" };
  }
  if (alkalotic && respAlk) {
    return { disorder: "respiratoryAlkalosis", severity: "mild" };
  }
  if (acidotic) {
    return {
      disorder: metAcid ? "metabolicAcidosis" : "respiratoryAcidosis",
      severity: "mild",
    };
  }
  if (alkalotic) {
    return {
      disorder: metAlk ? "metabolicAlkalosis" : "respiratoryAlkalosis",
      severity: "mild",
    };
  }
  return { disorder: "normal", severity: "normal" };
}

export default function VenousBloodPhCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.venous-blood-ph-calculator");

  const [ph, setPh] = React.useState("");
  const [hco3, setHco3] = React.useState("");
  const [pco2, setPco2] = React.useState("");
  const [be, setBe] = React.useState("");
  const [temp, setTemp] = React.useState("37");
  const [hb, setHb] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const phNum = parseFloat(ph);
  const hco3Num = parseFloat(hco3);
  const pco2Num = parseFloat(pco2);
  const beNum = parseFloat(be);
  const tempNum = parseFloat(temp);
  const hbNum = parseFloat(hb);

  const phValid = ph !== "" && Number.isFinite(phNum) && phNum >= 6.5 && phNum <= 8.0;
  const hco3Valid = hco3 !== "" && Number.isFinite(hco3Num) && hco3Num > 0;
  const pco2Valid = pco2 !== "" && Number.isFinite(pco2Num) && pco2Num > 0;
  const beValid = be !== "" && Number.isFinite(beNum);
  const tempValid = temp !== "" && Number.isFinite(tempNum) && tempNum > 30 && tempNum < 45;
  const hbValid = hb === "" || (Number.isFinite(hbNum) && hbNum > 0);

  const allValid = phValid && hco3Valid && pco2Valid && beValid && tempValid && hbValid;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    // Henderson-Hasselbalch: pH = 6.1 + log([HCO3-] / (0.0307 * PCO2))
    const calcPh = 6.1 + Math.log10(hco3Num / (0.0307 * pco2Num));
    // Temperature-corrected pH (Rosenthal factor: -0.015 per °C from 37)
    const tempCorrPh = calcPh - 0.015 * (tempNum - 37);
    const { disorder, severity } = classifyAcidBase(phNum, hco3Num, pco2Num, beNum);
    // Oxygen content approximation if Hb provided
    const o2Content = hb !== "" ? (1.34 * hbNum * 0.75 + 0.003 * 40).toFixed(1) : null;
    return { calcPh, tempCorrPh, disorder, severity, o2Content };
  }, [allValid, phNum, hco3Num, pco2Num, beNum, tempNum, hbNum, hb]);

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: FaqItem[] = React.useMemo(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
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

  function loadExample(
    p: string, h: string, pc: string, b: string, tm: string, hgb: string,
  ) {
    setPh(p); setHco3(h); setPco2(pc); setBe(b); setTemp(tm); setHb(hgb);
    setTouched(true);
  }

  function reset() {
    setPh(""); setHco3(""); setPco2(""); setBe(""); setTemp("37"); setHb("");
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
              <Label htmlFor="vbph-ph">{t("field.ph")}</Label>
              <Input
                id="vbph-ph"
                type="number"
                inputMode="decimal"
                step="0.01"
                value={ph}
                placeholder={t("placeholder.ph")}
                onChange={(e) => { setPh(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vbph-hco3">{t("field.hco3")}</Label>
              <Input
                id="vbph-hco3"
                type="number"
                inputMode="decimal"
                min="0"
                value={hco3}
                placeholder={t("placeholder.hco3")}
                onChange={(e) => { setHco3(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vbph-pco2">{t("field.pco2")}</Label>
              <Input
                id="vbph-pco2"
                type="number"
                inputMode="decimal"
                min="0"
                value={pco2}
                placeholder={t("placeholder.pco2")}
                onChange={(e) => { setPco2(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vbph-be">{t("field.be")}</Label>
              <Input
                id="vbph-be"
                type="number"
                inputMode="decimal"
                step="0.1"
                value={be}
                placeholder={t("placeholder.be")}
                onChange={(e) => { setBe(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vbph-temp">{t("field.temp")}</Label>
              <Input
                id="vbph-temp"
                type="number"
                inputMode="decimal"
                step="0.1"
                value={temp}
                placeholder={t("placeholder.temp")}
                onChange={(e) => { setTemp(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vbph-hb">{t("field.hb")}</Label>
              <Input
                id="vbph-hb"
                type="number"
                inputMode="decimal"
                min="0"
                value={hb}
                placeholder={t("placeholder.hb")}
                onChange={(e) => { setHb(e.target.value); setTouched(true); }}
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

          {touched && !allValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.calcPh")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.calcPh, 3)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.tempCorrPh")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.tempCorrPh, 3)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.disorder")}</div>
                  <div className="text-base font-semibold text-zinc-900">
                    {t(`disorder.${result.disorder}` as never)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.severity")}</div>
                  <div className="text-base font-semibold text-zinc-900">
                    {t(`severity.${result.severity}` as never)}
                  </div>
                </div>
                {result.o2Content !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.o2Content")}</div>
                    <div className="text-base font-semibold text-zinc-900">
                      {result.o2Content} {t("unit.o2Content")}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-2 text-xs text-zinc-500">{t("formula")}</div>
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
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("7.35", "24", "45", "0", "37", "14")}>
            {t("examples.loadNormal")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("7.20", "12", "35", "-15", "37", "14")}>
            {t("examples.loadMetabolicAcidosis")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("7.45", "22", "30", "-2", "37", "14")}>
            {t("examples.loadRespAlkalosis")}
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
