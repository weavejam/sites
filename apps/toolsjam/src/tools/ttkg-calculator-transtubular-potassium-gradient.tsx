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

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * 100) / 100).toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
}

export default function TTKGCalculator(_props: { locale: Locale }) {
  const t = useTranslations(
    "tool.ttkg-calculator-transtubular-potassium-gradient"
  );

  const [urineK, setUrineK] = React.useState("");
  const [plasmaK, setPlasmaK] = React.useState("");
  const [urineOsm, setUrineOsm] = React.useState("");
  const [plasmaOsm, setPlasmaOsm] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const urineKNum = parseFloat(urineK);
  const plasmaKNum = parseFloat(plasmaK);
  const urineOsmNum = parseFloat(urineOsm);
  const plasmaOsmNum = parseFloat(plasmaOsm);

  const urineKValid = urineK !== "" && Number.isFinite(urineKNum) && urineKNum >= 0;
  const plasmaKValid = plasmaK !== "" && Number.isFinite(plasmaKNum) && plasmaKNum > 0;
  const urineOsmValid = urineOsm !== "" && Number.isFinite(urineOsmNum) && urineOsmNum > 0;
  const plasmaOsmValid = plasmaOsm !== "" && Number.isFinite(plasmaOsmNum) && plasmaOsmNum > 0;

  const allValid = urineKValid && plasmaKValid && urineOsmValid && plasmaOsmValid;

  const result = React.useMemo<number | null>(() => {
    if (!allValid) return null;
    return (urineKNum * plasmaOsmNum) / (plasmaKNum * urineOsmNum);
  }, [allValid, urineKNum, plasmaKNum, urineOsmNum, plasmaOsmNum]);

  const interpretation = React.useMemo<string | null>(() => {
    if (result === null) return null;
    // Use plasma K+ context for clinically accurate interpretation
    const isHypokalemia = plasmaKNum < 3.5;
    const isHyperkalemia = plasmaKNum > 5.0;
    if (isHypokalemia) {
      return result < 2
        ? t("interpretation.hypoLow")
        : t("interpretation.hypoHigh");
    }
    if (isHyperkalemia) {
      return result < 5
        ? t("interpretation.hyperLow")
        : t("interpretation.hyperHigh");
    }
    return t("interpretation.normal");
  }, [result, plasmaKNum, t]);

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

  function reset() {
    setUrineK("");
    setPlasmaK("");
    setUrineOsm("");
    setPlasmaOsm("");
    setTouched(false);
  }

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

  const showError = touched && !allValid;

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
              <Label htmlFor="ttkg-uk">{t("field.urinePotassium")}</Label>
              <Input
                id="ttkg-uk"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                value={urineK}
                placeholder={t("placeholder.urinePotassium")}
                onChange={(e) => {
                  setUrineK(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ttkg-pk">{t("field.plasmaPotassium")}</Label>
              <Input
                id="ttkg-pk"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                value={plasmaK}
                placeholder={t("placeholder.plasmaPotassium")}
                onChange={(e) => {
                  setPlasmaK(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ttkg-uosm">{t("field.urineOsmolality")}</Label>
              <Input
                id="ttkg-uosm"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                value={urineOsm}
                placeholder={t("placeholder.urineOsmolality")}
                onChange={(e) => {
                  setUrineOsm(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ttkg-posm">{t("field.plasmaOsmolality")}</Label>
              <Input
                id="ttkg-posm"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                value={plasmaOsm}
                placeholder={t("placeholder.plasmaOsmolality")}
                onChange={(e) => {
                  setPlasmaOsm(e.target.value);
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

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {formatNum(result)}
              </div>
              <div className="text-sm text-zinc-700">{interpretation}</div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setUrineK("25");
              setPlasmaK("4.0");
              setUrineOsm("600");
              setPlasmaOsm("290");
              setTouched(true);
            }}
          >
            {t("examples.loadNormal")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setUrineK("10");
              setPlasmaK("2.8");
              setUrineOsm("500");
              setPlasmaOsm("290");
              setTouched(true);
            }}
          >
            {t("examples.loadHypo")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setUrineK("80");
              setPlasmaK("5.8");
              setUrineOsm("650");
              setPlasmaOsm("290");
              setTouched(true);
            }}
          >
            {t("examples.loadHyper")}
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
