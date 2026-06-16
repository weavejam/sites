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

const SELECT_CLASS_NAME =
  "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500";

function fmt(value: number, decimals = 1): string {
  if (!Number.isFinite(value)) return "—";
  return value.toFixed(decimals);
}

export default function ScoradCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.scorad-calculator-scoring-atopic-dermatitis");

  const [extent, setExtent] = React.useState("");
  const [erythema, setErythema] = React.useState("0");
  const [edemaPapulation, setEdemaPapulation] = React.useState("0");
  const [oozingCrusts, setOozingCrusts] = React.useState("0");
  const [excoriations, setExcoriations] = React.useState("0");
  const [lichenification, setLichenification] = React.useState("0");
  const [dryness, setDryness] = React.useState("0");
  const [pruritus, setPruritus] = React.useState("");
  const [sleepLoss, setSleepLoss] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const extentNum = parseFloat(extent);
  const pruritusNum = parseFloat(pruritus);
  const sleepLossNum = parseFloat(sleepLoss);
  const intensityValues = React.useMemo(
    () => [
      parseInt(erythema, 10),
      parseInt(edemaPapulation, 10),
      parseInt(oozingCrusts, 10),
      parseInt(excoriations, 10),
      parseInt(lichenification, 10),
      parseInt(dryness, 10),
    ],
    [dryness, edemaPapulation, erythema, excoriations, lichenification, oozingCrusts]
  );

  const extentValid =
    extent !== "" && Number.isFinite(extentNum) && extentNum >= 0 && extentNum <= 100;
  const pruritusValid =
    pruritus !== "" &&
    Number.isFinite(pruritusNum) &&
    pruritusNum >= 0 &&
    pruritusNum <= 10;
  const sleepLossValid =
    sleepLoss !== "" &&
    Number.isFinite(sleepLossNum) &&
    sleepLossNum >= 0 &&
    sleepLossNum <= 10;
  const intensityValid = intensityValues.every(
    (value) => Number.isInteger(value) && value >= 0 && value <= 3
  );

  const result = React.useMemo(() => {
    if (!extentValid || !pruritusValid || !sleepLossValid || !intensityValid) {
      return null;
    }
    const a = extentNum;
    const b = intensityValues.reduce((sum, value) => sum + value, 0);
    const c = pruritusNum + sleepLossNum;
    const scorad = a / 5 + (7 * b) / 2 + c;
    let category: "mild" | "moderate" | "severe";
    if (scorad < 25) category = "mild";
    else if (scorad <= 50) category = "moderate";
    else category = "severe";
    return { scorad, a, b, c, category };
  }, [
    extentNum,
    extentValid,
    intensityValid,
    intensityValues,
    pruritusNum,
    pruritusValid,
    sleepLossNum,
    sleepLossValid,
  ]);

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

  function loadExample(example: {
    extent: string;
    erythema: string;
    edemaPapulation: string;
    oozingCrusts: string;
    excoriations: string;
    lichenification: string;
    dryness: string;
    pruritus: string;
    sleepLoss: string;
  }) {
    setExtent(example.extent);
    setErythema(example.erythema);
    setEdemaPapulation(example.edemaPapulation);
    setOozingCrusts(example.oozingCrusts);
    setExcoriations(example.excoriations);
    setLichenification(example.lichenification);
    setDryness(example.dryness);
    setPruritus(example.pruritus);
    setSleepLoss(example.sleepLoss);
    setTouched(true);
  }

  function reset() {
    setExtent("");
    setErythema("0");
    setEdemaPapulation("0");
    setOozingCrusts("0");
    setExcoriations("0");
    setLichenification("0");
    setDryness("0");
    setPruritus("");
    setSleepLoss("");
    setTouched(false);
  }

  const showError =
    touched && (!extentValid || !pruritusValid || !sleepLossValid || !intensityValid);
  const scoreOptions = ["0", "1", "2", "3"] as const;

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
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="scorad-extent">{t("field.extent")}</Label>
              <Input
                id="scorad-extent"
                type="number"
                inputMode="decimal"
                value={extent}
                placeholder={t("placeholder.extent")}
                onChange={(e) => {
                  setExtent(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scorad-pruritus">{t("field.pruritus")}</Label>
              <Input
                id="scorad-pruritus"
                type="number"
                inputMode="decimal"
                value={pruritus}
                placeholder={t("placeholder.pruritus")}
                onChange={(e) => {
                  setPruritus(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scorad-sleep-loss">{t("field.sleepLoss")}</Label>
              <Input
                id="scorad-sleep-loss"
                type="number"
                inputMode="decimal"
                value={sleepLoss}
                placeholder={t("placeholder.sleepLoss")}
                onChange={(e) => {
                  setSleepLoss(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            {(
              [
                ["scorad-erythema", t("field.erythema"), erythema, setErythema],
                ["scorad-edema", t("field.edemaPapulation"), edemaPapulation, setEdemaPapulation],
                ["scorad-oozing", t("field.oozingCrusts"), oozingCrusts, setOozingCrusts],
                ["scorad-excoriations", t("field.excoriations"), excoriations, setExcoriations],
                ["scorad-lichenification", t("field.lichenification"), lichenification, setLichenification],
                ["scorad-dryness", t("field.dryness"), dryness, setDryness],
              ] as [string, string, string, React.Dispatch<React.SetStateAction<string>>][]
            ).map(([id, label, value, setter]) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={id}>{label}</Label>
                <div>
                  <select
                    id={id}
                    value={value}
                    onChange={(e) => {
                      setter(e.target.value);
                      setTouched(true);
                    }}
                    className={SELECT_CLASS_NAME}
                  >
                    {scoreOptions.map((option) => (
                      <option key={option} value={option}>
                        {t(`option.score${option}` as never)}
                      </option>
                    ))}
                  </select>
                </div>
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

          {showError && <p className="text-sm text-red-600">{t("error.invalid")}</p>}

          {result && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-3xl font-semibold text-zinc-900">
                {fmt(result.scorad)}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-md border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.componentA")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.a, 0)}
                  </div>
                </div>
                <div className="rounded-md border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.componentB")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.b, 0)}
                  </div>
                </div>
                <div className="rounded-md border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.componentC")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {fmt(result.c, 0)}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-zinc-500">{t("result.interpretation")}</div>
                <div className="text-base font-semibold text-zinc-900">
                  {t(`category.${result.category}` as never)}
                </div>
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
              {examplesItems.map((example, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{example.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{example.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{example.note ?? ""}</td>
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
            onClick={() =>
              loadExample({
                extent: "10",
                erythema: "1",
                edemaPapulation: "1",
                oozingCrusts: "0",
                excoriations: "1",
                lichenification: "0",
                dryness: "1",
                pruritus: "2",
                sleepLoss: "1",
              })
            }
          >
            {t("examples.loadMild")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample({
                extent: "35",
                erythema: "2",
                edemaPapulation: "1",
                oozingCrusts: "1",
                excoriations: "1",
                lichenification: "1",
                dryness: "2",
                pruritus: "5",
                sleepLoss: "3",
              })
            }
          >
            {t("examples.loadModerate")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample({
                extent: "70",
                erythema: "3",
                edemaPapulation: "3",
                oozingCrusts: "2",
                excoriations: "3",
                lichenification: "2",
                dryness: "2",
                pruritus: "9",
                sleepLoss: "8",
              })
            }
          >
            {t("examples.loadSevere")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{item.q}</div>
              <div className="mt-1 text-zinc-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
