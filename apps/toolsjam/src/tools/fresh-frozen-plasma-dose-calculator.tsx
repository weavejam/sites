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

type Indication =
  | "warfarin-reversal"
  | "bleeding-disorder"
  | "massive-transfusion"
  | "liver-disease"
  | "other";

const INDICATIONS: Indication[] = [
  "warfarin-reversal",
  "bleeding-disorder",
  "massive-transfusion",
  "liver-disease",
  "other",
];

// Dose ranges (mL/kg) per indication
const DOSE_MLKG: Record<Indication, number> = {
  "warfarin-reversal": 20,
  "bleeding-disorder": 15,
  "massive-transfusion": 15,
  "liver-disease": 15,
  other: 10,
};

// Clinical notes per indication
const NOTE_KEYS: Record<Indication, string> = {
  "warfarin-reversal": "noteWarfarin",
  "bleeding-disorder": "noteBleeding",
  "massive-transfusion": "noteMTP",
  "liver-disease": "noteLiver",
  other: "noteOther",
};

const FFP_UNIT_ML = 250;

interface FFPResult {
  doseMl: number;
  doseMlKg: number;
  units: number;
  noteKey: string;
}

function computeFFPDose(weight: number, indication: Indication): FFPResult {
  const doseMlKg = DOSE_MLKG[indication];
  const doseMl = weight * doseMlKg;
  const units = Math.ceil(doseMl / FFP_UNIT_ML);
  return { doseMl, doseMlKg, units, noteKey: NOTE_KEYS[indication] };
}

export default function FreshFrozenPlasmaDoseCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.fresh-frozen-plasma-dose-calculator");

  const [weight, setWeight] = React.useState("");
  const [indication, setIndication] = React.useState<Indication | "">("");
  const [currentINR, setCurrentINR] = React.useState("");
  const [targetINR, setTargetINR] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const weightNum = parseFloat(weight);

  const valid = {
    weight: weight !== "" && Number.isFinite(weightNum) && weightNum >= 1 && weightNum <= 300,
    indication: indication !== "",
  };
  const allValid = valid.weight && valid.indication;

  const result = React.useMemo<FFPResult | null>(() => {
    if (!allValid || indication === "") return null;
    return computeFFPDose(weightNum, indication);
  }, [allValid, weightNum, indication]);

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<FaqItem[]>(() => {
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

  function reset() {
    setWeight("");
    setIndication("");
    setCurrentINR("");
    setTargetINR("");
    setTouched(false);
  }

  function loadExample(
    w: string,
    ind: Indication,
    cINR?: string,
    tINR?: string,
  ) {
    setWeight(w);
    setIndication(ind);
    if (cINR !== undefined) setCurrentINR(cINR);
    if (tINR !== undefined) setTargetINR(tINR);
    setTouched(true);
  }

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
          <div className="space-y-2">
            <Label htmlFor="ffp-weight">{t("field.weight")}</Label>
            <Input
              id="ffp-weight"
              type="number"
              inputMode="decimal"
              value={weight}
              placeholder={t("placeholder.weight")}
              onChange={(e) => {
                setWeight(e.target.value);
                setTouched(true);
              }}
            />
          </div>

          <div className="space-y-2">
            <Label>{t("field.indication")}</Label>
            <div className="flex flex-wrap gap-2">
              {INDICATIONS.map((ind) => (
                <Button
                  key={ind}
                  type="button"
                  variant={indication === ind ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setIndication(ind);
                    setTouched(true);
                  }}
                >
                  {t(`indication.${ind}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ffp-inr-current">{t("field.currentINR")}</Label>
              <Input
                id="ffp-inr-current"
                type="number"
                inputMode="decimal"
                value={currentINR}
                placeholder={t("placeholder.currentINR")}
                onChange={(e) => {
                  setCurrentINR(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ffp-inr-target">{t("field.targetINR")}</Label>
              <Input
                id="ffp-inr-target"
                type="number"
                inputMode="decimal"
                value={targetINR}
                placeholder={t("placeholder.targetINR")}
                onChange={(e) => {
                  setTargetINR(e.target.value);
                  setTouched(true);
                }}
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
            <div className="space-y-1">
              {!valid.weight && (
                <p className="text-sm text-red-600">{t("error.invalidWeight")}</p>
              )}
              {!valid.indication && (
                <p className="text-sm text-red-600">{t("error.selectIndication")}</p>
              )}
            </div>
          )}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.dose")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {Math.round(result.doseMl)} {t("unit.ml")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.doseMlKg")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {result.doseMlKg} {t("unit.mlkg")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.units")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    ~{result.units} {t("unit.units")}
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
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("75", "warfarin-reversal", "4.2", "1.5")}
          >
            {t("examples.loadWarfarin")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("65", "bleeding-disorder")}
          >
            {t("examples.loadBleeding")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("80", "massive-transfusion")}
          >
            {t("examples.loadMTP")}
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
