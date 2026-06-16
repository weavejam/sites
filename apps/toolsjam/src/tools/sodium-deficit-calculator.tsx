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

function fmt(n: number, decimals = 1): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

export default function SodiumDeficitCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.sodium-deficit-calculator");

  const [currentNa, setCurrentNa] = React.useState("");
  const [desiredNa, setDesiredNa] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [gender, setGender] = React.useState<Gender>("male");
  const [bodyFat, setBodyFat] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const curNum = parseFloat(currentNa);
  const desNum = parseFloat(desiredNa);
  const wNum = parseFloat(weight);
  const bfNum = parseFloat(bodyFat);

  const curValid = currentNa !== "" && Number.isFinite(curNum) && curNum > 0;
  const desValid = desiredNa !== "" && Number.isFinite(desNum) && desNum > 0;
  const wValid = weight !== "" && Number.isFinite(wNum) && wNum > 0;
  const bfValid =
    bodyFat !== "" && Number.isFinite(bfNum) && bfNum >= 0 && bfNum < 100;

  interface CalcResult {
    lbm: number;
    tbw: number;
    deficitMeq: number;
    deficitNa: number;
    deficitNaCl: number;
  }

  const result = React.useMemo<CalcResult | null>(() => {
    if (!curValid || !desValid || !wValid) return null;
    if (curNum === desNum) return null;

    let tbw: number;
    let lbm: number;
    if (bfValid) {
      lbm = wNum * (1 - bfNum / 100);
      tbw = lbm * 0.73;
    } else {
      lbm = gender === "male" ? wNum * 0.8 : wNum * 0.7;
      tbw = wNum * (gender === "male" ? 0.6 : 0.5);
    }

    const deficitMeq = tbw * (desNum - curNum);
    const deficitNa = (deficitMeq * 23) / 1000;
    const deficitNaCl = (deficitMeq * 58.44) / 1000;
    return { lbm, tbw, deficitMeq, deficitNa, deficitNaCl };
  }, [curValid, desValid, wValid, bfValid, curNum, desNum, wNum, gender, bfNum]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
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

  function reset() {
    setCurrentNa("");
    setDesiredNa("");
    setWeight("");
    setGender("male");
    setBodyFat("");
    setTouched(false);
  }

  const showError = touched && (!curValid || !desValid || !wValid);
  const showSameError =
    touched && curValid && desValid && curNum === desNum;

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
              <Label htmlFor="sd-cur">
                {t("field.currentSodium")} ({t("field.currentSodiumUnit")})
              </Label>
              <Input
                id="sd-cur"
                type="number"
                inputMode="decimal"
                step="0.1"
                min={100}
                max={200}
                value={currentNa}
                placeholder={t("field.placeholder.currentSodium")}
                onChange={(e) => {
                  setCurrentNa(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sd-des">
                {t("field.desiredSodium")} ({t("field.desiredSodiumUnit")})
              </Label>
              <Input
                id="sd-des"
                type="number"
                inputMode="decimal"
                step="0.1"
                min={100}
                max={200}
                value={desiredNa}
                placeholder={t("field.placeholder.desiredSodium")}
                onChange={(e) => {
                  setDesiredNa(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sd-wt">
                {t("field.weight")} ({t("field.weightUnit")})
              </Label>
              <Input
                id="sd-wt"
                type="number"
                inputMode="decimal"
                step="0.1"
                min={1}
                value={weight}
                placeholder={t("field.placeholder.weight")}
                onChange={(e) => {
                  setWeight(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sd-gender">{t("field.gender")}</Label>
              <select
                id="sd-gender"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none"
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
              >
                <option value="male">{t("gender.male")}</option>
                <option value="female">{t("gender.female")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sd-bf">
                {t("field.bodyFat")} ({t("field.bodyFatUnit")})
              </Label>
              <Input
                id="sd-bf"
                type="number"
                inputMode="decimal"
                step="0.1"
                min={0}
                max={99}
                value={bodyFat}
                placeholder={t("field.placeholder.bodyFat")}
                onChange={(e) => {
                  setBodyFat(e.target.value);
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showSameError && (
            <p className="text-sm text-red-600">{t("error.sameNa")}</p>
          )}

          {result !== null && touched && !showError && !showSameError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2 text-sm">
                <div>
                  <span className="text-zinc-500">{t("result.lbm")}: </span>
                  <span className="font-semibold">
                    {fmt(result.lbm)} {t("result.lbmUnit")}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.tbw")}: </span>
                  <span className="font-semibold">
                    {fmt(result.tbw)} {t("result.tbwUnit")}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">
                    {t("result.deficitMeq")}:{" "}
                  </span>
                  <span className="font-semibold text-base">
                    {fmt(result.deficitMeq)} {t("result.deficitMeqUnit")}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">
                    {t("result.deficitNa")}:{" "}
                  </span>
                  <span className="font-semibold">
                    {fmt(result.deficitNa, 2)} {t("result.deficitNaUnit")}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">
                    {t("result.deficitNaCl")}:{" "}
                  </span>
                  <span className="font-semibold">
                    {fmt(result.deficitNaCl, 2)} {t("result.deficitNaClUnit")}
                  </span>
                </div>
              </div>
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
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colInput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colOutput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colNote")}
                </th>
              </tr>
            </thead>
            <tbody>
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {ex.output}
                  </td>
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
