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

interface ExampleRow {
  input: string;
  output: string;
  note?: string;
}

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) < 0.0001 || Math.abs(n) >= 1e7) return n.toExponential(4);
  return parseFloat(n.toPrecision(5)).toString();
}

export default function CapacitorsInSeriesCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.capacitors-in-series-calculator");

  const [c1, setC1] = React.useState("");
  const [c2, setC2] = React.useState("");
  const [c3, setC3] = React.useState("");
  const [c4, setC4] = React.useState("");
  const [totalVoltage, setTotalVoltage] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const c1Num = parseFloat(c1);
  const c2Num = parseFloat(c2);
  const c3Num = parseFloat(c3);
  const c4Num = parseFloat(c4);
  const vNum = parseFloat(totalVoltage);

  const result = React.useMemo(() => {
    if (!touched) return null;
    if (!Number.isFinite(c1Num) || c1Num <= 0) return null;
    if (!Number.isFinite(c2Num) || c2Num <= 0) return null;
    if (!Number.isFinite(vNum) || vNum <= 0) return null;

    // Build array of valid capacitor values
    const caps: number[] = [c1Num, c2Num];
    if (c3 !== "" && Number.isFinite(c3Num) && c3Num > 0) caps.push(c3Num);
    if (c4 !== "" && Number.isFinite(c4Num) && c4Num > 0) caps.push(c4Num);

    // Equivalent capacitance: 1/Ceq = sum(1/Ci)
    const recipSum = caps.reduce((sum, c) => sum + 1 / c, 0);
    const ceq = 1 / recipSum;

    // Charge is the same on each capacitor in series: Q = Ceq × V
    const charge = ceq * vNum;

    // Voltage across each capacitor: Vi = Q / Ci
    const voltages = caps.map((c) => charge / c);

    // Total energy stored
    const energy = 0.5 * ceq * vNum * vNum;

    return { ceq, charge, voltages, energy, caps };
  }, [touched, c1Num, c2Num, c3Num, c4Num, vNum, c3, c4]);

  const showError = touched && result === null;

  const examplesItems: ExampleRow[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleRow[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
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
        applicationCategory: "UtilitiesApplication",
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

  function loadExample(c1v: string, c2v: string, c3v: string, c4v: string, vv: string) {
    setC1(c1v); setC2(c2v); setC3(c3v); setC4(c4v); setTotalVoltage(vv);
    setTouched(true);
  }

  function handleReset() {
    setC1(""); setC2(""); setC3(""); setC4(""); setTotalVoltage("");
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
              <Label htmlFor="cis-c1">{t("field.c1")}</Label>
              <Input
                id="cis-c1"
                type="number"
                inputMode="decimal"
                value={c1}
                placeholder={t("placeholder.capacitor")}
                min="0"
                step="any"
                onChange={(e) => { setC1(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cis-c2">{t("field.c2")}</Label>
              <Input
                id="cis-c2"
                type="number"
                inputMode="decimal"
                value={c2}
                placeholder={t("placeholder.capacitor")}
                min="0"
                step="any"
                onChange={(e) => { setC2(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cis-c3">{t("field.c3")}</Label>
              <Input
                id="cis-c3"
                type="number"
                inputMode="decimal"
                value={c3}
                placeholder={t("placeholder.optional")}
                min="0"
                step="any"
                onChange={(e) => { setC3(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cis-c4">{t("field.c4")}</Label>
              <Input
                id="cis-c4"
                type="number"
                inputMode="decimal"
                value={c4}
                placeholder={t("placeholder.optional")}
                min="0"
                step="any"
                onChange={(e) => { setC4(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="cis-v">{t("field.totalVoltage")}</Label>
              <Input
                id="cis-v"
                type="number"
                inputMode="decimal"
                value={totalVoltage}
                placeholder={t("placeholder.voltage")}
                min="0"
                step="any"
                onChange={(e) => { setTotalVoltage(e.target.value); setTouched(false); }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.ceq")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.ceq)} F</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.charge")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.charge)} C</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.energy")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.energy)} J</div>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <div className="text-xs font-medium text-zinc-500">{t("result.voltageDistribution")}</div>
                {result.voltages.map((v, i) => (
                  <div key={i} className="text-sm text-zinc-700">
                    {t(`result.v${i + 1}` as never)}: <span className="font-semibold">{formatNum(v)} V</span>
                    {" "}({t("result.charge")}: {formatNum(result.charge)} C)
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
            onClick={() => loadExample("0.000001", "0.000001", "", "", "10")}>
            {t("examples.loadTwoEqual")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("0.000001", "0.000002", "0.000003", "", "15")}>
            {t("examples.loadVoltageDivider")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("0.000001", "0.000001", "0.000001", "0.000001", "100")}>
            {t("examples.loadHighVoltage")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
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
