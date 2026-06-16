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

export default function UrineOutputCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.urine-output-calculator");

  const [volume, setVolume] = React.useState("");
  const [time, setTime] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [intake, setIntake] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const volNum = parseFloat(volume);
  const timeNum = parseFloat(time);
  const weightNum = parseFloat(weight);
  const intakeNum = parseFloat(intake);

  const volValid = volume !== "" && Number.isFinite(volNum) && volNum >= 0;
  const timeValid = time !== "" && Number.isFinite(timeNum) && timeNum > 0;
  const weightValid = weight !== "" && Number.isFinite(weightNum) && weightNum > 0;
  const intakeValid = intake === "" || (Number.isFinite(intakeNum) && intakeNum >= 0);

  const result = React.useMemo(() => {
    if (!volValid || !timeValid || !weightValid) return null;
    const ratePerKg = volNum / (timeNum * weightNum);
    const ratePerHr = volNum / timeNum;
    const fluidBalance = intakeValid && intake !== "" ? intakeNum - volNum : null;
    let category: string;
    if (ratePerKg < 0.1) category = "anuria";
    else if (ratePerKg < 0.5) category = "oliguria";
    else if (ratePerKg <= 1.0) category = "normal";
    else if (ratePerKg <= 3.0) category = "high";
    else category = "polyuria";
    return { ratePerKg, ratePerHr, fluidBalance, category };
  }, [volNum, timeNum, weightNum, intakeNum, volValid, timeValid, weightValid, intakeValid, intake]);

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

  function loadExample(v: string, tm: string, w: string, i: string) {
    setVolume(v);
    setTime(tm);
    setWeight(w);
    setIntake(i);
    setTouched(true);
  }

  function reset() {
    setVolume("");
    setTime("");
    setWeight("");
    setIntake("");
    setTouched(false);
  }

  const showError = touched && (!volValid || !timeValid || !weightValid);

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
              <Label htmlFor="uo-volume">{t("field.volume")}</Label>
              <Input
                id="uo-volume"
                type="number"
                inputMode="decimal"
                min="0"
                value={volume}
                placeholder={t("placeholder.volume")}
                onChange={(e) => { setVolume(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uo-time">{t("field.time")}</Label>
              <Input
                id="uo-time"
                type="number"
                inputMode="decimal"
                min="0"
                value={time}
                placeholder={t("placeholder.time")}
                onChange={(e) => { setTime(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uo-weight">{t("field.weight")}</Label>
              <Input
                id="uo-weight"
                type="number"
                inputMode="decimal"
                min="0"
                value={weight}
                placeholder={t("placeholder.weight")}
                onChange={(e) => { setWeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uo-intake">{t("field.intake")}</Label>
              <Input
                id="uo-intake"
                type="number"
                inputMode="decimal"
                min="0"
                value={intake}
                placeholder={t("placeholder.intake")}
                onChange={(e) => { setIntake(e.target.value); setTouched(true); }}
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

          {result && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.ratePerKg")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.ratePerKg)} {t("unit.mlKgHr")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.ratePerHr")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.ratePerHr)} {t("unit.mlHr")}
                  </div>
                </div>
                {result.fluidBalance !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.fluidBalance")}</div>
                    <div className="text-xl font-semibold text-zinc-900">
                      {fmt(result.fluidBalance, 0)} {t("unit.ml")}
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-xs text-zinc-500">{t("result.category")}</div>
                  <div className="text-base font-semibold text-zinc-900">
                    {t(`category.${result.category}` as never)}
                  </div>
                </div>
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
            onClick={() => loadExample("1500", "24", "70", "2500")}>
            {t("examples.loadNormal")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("400", "24", "65", "2000")}>
            {t("examples.loadLow")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("3000", "24", "75", "3500")}>
            {t("examples.loadHigh")}
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
