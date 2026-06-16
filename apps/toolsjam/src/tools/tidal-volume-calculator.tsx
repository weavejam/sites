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

type Gender = "male" | "female";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function fmt(n: number, d = 0): string {
  if (!Number.isFinite(n)) return "—";
  return d === 0 ? Math.round(n).toString() : n.toFixed(d);
}

function calcIBW(heightCm: number, gender: Gender): number {
  if (gender === "male") {
    return 50 + 0.91 * (heightCm - 152.4);
  }
  return 45.5 + 0.91 * (heightCm - 152.4);
}

export default function TidalVolumeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.tidal-volume-calculator");

  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [gender, setGender] = React.useState<Gender>("male");
  const [age, setAge] = React.useState("");
  const [rr, setRr] = React.useState("");
  const [mv, setMv] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const weightn = parseFloat(weight);
  const heightn = parseFloat(height);
  const rrn = parseFloat(rr);
  const mvn = parseFloat(mv);

  const weightValid = weight !== "" && Number.isFinite(weightn) && weightn > 0;
  const heightValid = height !== "" && Number.isFinite(heightn) && heightn > 0;
  const rrValid = rr === "" || (Number.isFinite(rrn) && rrn > 0);
  const mvValid = mv === "" || (Number.isFinite(mvn) && mvn > 0);
  const rrMvValid = (rr === "") === (mv === "") || rr === "" || mv === "";

  const result = React.useMemo(() => {
    if (!weightValid || !heightValid || !rrValid || !mvValid) return null;
    const ibw = calcIBW(heightn, gender);
    const tv6 = ibw * 6;
    const tv8 = ibw * 8;
    const tvFromMV =
      rr !== "" && mv !== "" && rrn > 0 ? (mvn * 1000) / rrn : null;
    return { ibw, tv6, tv8, tvFromMV };
  }, [weightValid, heightValid, rrValid, mvValid, weightn, heightn, gender, rr, mv, rrn, mvn]);

  function reset() {
    setWeight("");
    setHeight("");
    setAge("");
    setRr("");
    setMv("");
    setTouched(false);
    setGender("male");
  }

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
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

  const showError = touched && (!weightValid || !heightValid || !rrValid || !mvValid);

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
              <Label htmlFor="tvc-weight">{t("field.patientWeight")}</Label>
              <Input
                id="tvc-weight"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.weight")}
                value={weight}
                onChange={(e) => { setWeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tvc-height">{t("field.patientHeight")}</Label>
              <Input
                id="tvc-height"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.height")}
                value={height}
                onChange={(e) => { setHeight(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tvc-gender">{t("field.gender")}</Label>
              <select
                id="tvc-gender"
                value={gender}
                onChange={(e) => { setGender(e.target.value as Gender); setTouched(true); }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                <option value="male">{t("gender.male")}</option>
                <option value="female">{t("gender.female")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tvc-age">{t("field.age")}</Label>
              <Input
                id="tvc-age"
                type="number"
                inputMode="numeric"
                placeholder={t("placeholder.age")}
                value={age}
                onChange={(e) => { setAge(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tvc-rr">{t("field.respiratoryRate")}</Label>
              <Input
                id="tvc-rr"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.rr")}
                value={rr}
                onChange={(e) => { setRr(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tvc-mv">{t("field.minuteVentilation")}</Label>
              <Input
                id="tvc-mv"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.mv")}
                value={mv}
                onChange={(e) => { setMv(e.target.value); setTouched(true); }}
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
              <div className="text-sm font-semibold text-zinc-600">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="flex justify-between rounded bg-white px-3 py-2 text-sm border border-zinc-100">
                  <span className="text-zinc-500">{t("result.ibw")}</span>
                  <span className="font-semibold">{fmt(result.ibw, 1)} {t("result.unitKg")}</span>
                </div>
                <div className="flex justify-between rounded bg-white px-3 py-2 text-sm border border-zinc-100">
                  <span className="text-zinc-500">{t("result.tvIbw6")}</span>
                  <span className="font-semibold">{fmt(result.tv6)} {t("result.unitMl")}</span>
                </div>
                <div className="flex justify-between rounded bg-white px-3 py-2 text-sm border border-zinc-100">
                  <span className="text-zinc-500">{t("result.tvIbw8")}</span>
                  <span className="font-semibold">{fmt(result.tv8)} {t("result.unitMl")}</span>
                </div>
                {result.tvFromMV !== null && (
                  <div className="flex justify-between rounded bg-white px-3 py-2 text-sm border border-zinc-100">
                    <span className="text-zinc-500">{t("result.tvFromMV")}</span>
                    <span className="font-semibold">{fmt(result.tvFromMV)} {t("result.unitMl")}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-zinc-500">{t("result.normalRange")}</p>
              <p className="text-xs text-zinc-500">{t("result.ventRange")}</p>
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
