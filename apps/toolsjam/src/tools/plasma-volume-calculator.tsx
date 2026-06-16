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
type CalcMethod = "bodyWeight" | "hematocrit" | "bsa";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function calcBSA(weightKg: number, heightCm: number): number {
  return 0.007184 * Math.pow(heightCm, 0.725) * Math.pow(weightKg, 0.425);
}

function calcPlasmaVolume(
  weightKg: number,
  heightCm: number,
  hematocrit: number,
  gender: Gender,
  method: CalcMethod
): { plasmaVolume: number; bloodVolume: number | null; bsa: number | null } {
  if (method === "bodyWeight") {
    const pvPerKg = gender === "male" ? 40 : 38;
    return { plasmaVolume: weightKg * pvPerKg, bloodVolume: null, bsa: null };
  }
  if (method === "hematocrit") {
    const bvPerKg = gender === "male" ? 70 : 65;
    const bloodVolume = weightKg * bvPerKg;
    const plasmaVolume = bloodVolume * (1 - hematocrit / 100);
    return { plasmaVolume, bloodVolume, bsa: null };
  }
  // BSA method
  const bsa = calcBSA(weightKg, heightCm);
  const plasmaVolume = bsa * 1500;
  return { plasmaVolume, bloodVolume: null, bsa };
}

function fmt(n: number, decimals = 0): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

export default function PlasmaVolumeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.plasma-volume-calculator");

  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<Gender>("male");
  const [hematocrit, setHematocrit] = React.useState("");
  const [method, setMethod] = React.useState<CalcMethod>("hematocrit");
  const [touched, setTouched] = React.useState(false);

  const weightNum = parseFloat(weight);
  const heightNum = parseFloat(height);
  const ageNum = parseFloat(age);
  const hctNum = parseFloat(hematocrit);

  const hctRequired = method === "hematocrit";
  const hctValid = !hctRequired || (hematocrit !== "" && Number.isFinite(hctNum) && hctNum > 0 && hctNum < 100);

  const allValid =
    weight !== "" && Number.isFinite(weightNum) && weightNum > 0 &&
    height !== "" && Number.isFinite(heightNum) && heightNum > 0 &&
    age !== "" && Number.isFinite(ageNum) && ageNum > 0 &&
    hctValid;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    return calcPlasmaVolume(weightNum, heightNum, hctNum || 42, gender, method);
  }, [allValid, weightNum, heightNum, hctNum, gender, method]);

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

  function reset() {
    setWeight(""); setHeight(""); setAge(""); setHematocrit("");
    setGender("male"); setMethod("hematocrit"); setTouched(false);
  }

  const mark = (setter: (v: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setter(e.target.value as never);
      setTouched(true);
    };

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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="pv-weight">{t("field.weight")}</Label>
              <Input
                id="pv-weight"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={weight}
                placeholder={t("placeholder.weight")}
                onChange={mark(setWeight)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pv-height">{t("field.height")}</Label>
              <Input
                id="pv-height"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={height}
                placeholder={t("placeholder.height")}
                onChange={mark(setHeight)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pv-age">{t("field.age")}</Label>
              <Input
                id="pv-age"
                type="number"
                inputMode="decimal"
                min="0"
                step="1"
                value={age}
                placeholder={t("placeholder.age")}
                onChange={mark(setAge)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pv-gender">{t("field.gender")}</Label>
              <select
                id="pv-gender"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                value={gender}
                onChange={(e) => { setGender(e.target.value as Gender); setTouched(true); }}
              >
                <option value="male">{t("option.gender.male")}</option>
                <option value="female">{t("option.gender.female")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pv-hematocrit">{t("field.hematocrit")}</Label>
              <Input
                id="pv-hematocrit"
                type="number"
                inputMode="decimal"
                min="0"
                max="100"
                step="any"
                value={hematocrit}
                placeholder={t("placeholder.hematocrit")}
                onChange={mark(setHematocrit)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pv-method">{t("field.calculationMethod")}</Label>
              <select
                id="pv-method"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                value={method}
                onChange={(e) => { setMethod(e.target.value as CalcMethod); setTouched(true); }}
              >
                <option value="bodyWeight">{t("option.calculationMethod.bodyWeight")}</option>
                <option value="hematocrit">{t("option.calculationMethod.hematocrit")}</option>
                <option value="bsa">{t("option.calculationMethod.bsa")}</option>
              </select>
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

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-bold text-zinc-900">
                {t("result.plasmaVolume", { value: fmt(result.plasmaVolume) })}
              </div>
              <div className="text-sm font-medium text-zinc-500">
                {t("result.method", { name: t(`option.calculationMethod.${method}` as never) })}
              </div>
              {result.bloodVolume !== null && (
                <div className="text-sm text-zinc-700">
                  {t("result.bloodVolume", { value: fmt(result.bloodVolume) })}
                </div>
              )}
              {result.bsa !== null && (
                <div className="text-sm text-zinc-700">
                  {t("result.bsa", { value: result.bsa.toFixed(2) })}
                </div>
              )}
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
