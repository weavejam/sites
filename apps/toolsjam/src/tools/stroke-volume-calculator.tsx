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

function fmt(n: number, decimals = 1): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

export default function StrokeVolumeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.stroke-volume-calculator");

  const [lvedd, setLvedd] = React.useState("");
  const [lvesd, setLvesd] = React.useState("");
  const [hr, setHr] = React.useState("");
  const [bsa, setBsa] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const lveddn = parseFloat(lvedd);
  const lvesdn = parseFloat(lvesd);
  const hrn = parseFloat(hr);
  const bsan = parseFloat(bsa);

  const lvedValid = lvedd !== "" && Number.isFinite(lveddn) && lveddn > 0;
  const lvesdValid = lvesd !== "" && Number.isFinite(lvesdn) && lvesdn > 0;
  const hrValid = hr !== "" && Number.isFinite(hrn) && hrn > 0;
  const bsaValid = bsa === "" || (Number.isFinite(bsan) && bsan > 0);
  const orderValid = lvedValid && lvesdValid && lvesdn < lveddn;

  const result = React.useMemo(() => {
    if (!lvedValid || !lvesdValid || !hrValid || !bsaValid || !orderValid)
      return null;
    const edv = 0.523 * lveddn ** 3;
    const esv = 0.523 * lvesdn ** 3;
    const sv = edv - esv;
    const ef = (sv / edv) * 100;
    const co = (sv * hrn) / 1000;
    const ci = bsa !== "" ? co / bsan : null;
    return { edv, esv, sv, ef, co, ci };
  }, [lvedValid, lvesdValid, hrValid, bsaValid, orderValid, lveddn, lvesdn, hrn, bsan, bsa]);

  function efLabel(): string {
    if (result === null) return "";
    const ef = result.ef;
    if (ef >= 55) return t("result.efNormal");
    if (ef >= 45) return t("result.efMildReduced");
    if (ef >= 30) return t("result.efModReduced");
    return t("result.efSevereReduced");
  }

  function reset() {
    setLvedd("");
    setLvesd("");
    setHr("");
    setBsa("");
    setTouched(false);
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

  const showError =
    touched &&
    (!lvedValid || !lvesdValid || !hrValid || !bsaValid);
  const showOrderError = touched && lvedValid && lvesdValid && !orderValid;

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
              <Label htmlFor="svc-lvedd">{t("field.lvedd")}</Label>
              <Input
                id="svc-lvedd"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.lvedd")}
                value={lvedd}
                onChange={(e) => { setLvedd(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="svc-lvesd">{t("field.lvesd")}</Label>
              <Input
                id="svc-lvesd"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.lvesd")}
                value={lvesd}
                onChange={(e) => { setLvesd(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="svc-hr">{t("field.heartRate")}</Label>
              <Input
                id="svc-hr"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.heartRate")}
                value={hr}
                onChange={(e) => { setHr(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="svc-bsa">{t("field.bodySurfaceArea")}</Label>
              <Input
                id="svc-bsa"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.bodySurfaceArea")}
                value={bsa}
                onChange={(e) => { setBsa(e.target.value); setTouched(true); }}
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
          {showOrderError && (
            <p className="text-sm text-red-600">{t("error.lvesd")}</p>
          )}

          {result !== null && !showOrderError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-semibold text-zinc-600">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="flex justify-between rounded bg-white px-3 py-2 text-sm border border-zinc-100">
                  <span className="text-zinc-500">{t("result.edv")}</span>
                  <span className="font-semibold">{fmt(result.edv)} {t("result.unitMl")}</span>
                </div>
                <div className="flex justify-between rounded bg-white px-3 py-2 text-sm border border-zinc-100">
                  <span className="text-zinc-500">{t("result.esv")}</span>
                  <span className="font-semibold">{fmt(result.esv)} {t("result.unitMl")}</span>
                </div>
                <div className="flex justify-between rounded bg-white px-3 py-2 text-sm border border-zinc-100">
                  <span className="text-zinc-500">{t("result.sv")}</span>
                  <span className="font-semibold text-green-700">{fmt(result.sv)} {t("result.unitMl")}</span>
                </div>
                <div className="flex justify-between rounded bg-white px-3 py-2 text-sm border border-zinc-100">
                  <span className="text-zinc-500">{t("result.ef")}</span>
                  <span className="font-semibold">{fmt(result.ef)}{t("result.unitPercent")} — {efLabel()}</span>
                </div>
                <div className="flex justify-between rounded bg-white px-3 py-2 text-sm border border-zinc-100">
                  <span className="text-zinc-500">{t("result.co")}</span>
                  <span className="font-semibold">{fmt(result.co, 2)} {t("result.unitLmin")}</span>
                </div>
                {result.ci !== null && (
                  <div className="flex justify-between rounded bg-white px-3 py-2 text-sm border border-zinc-100">
                    <span className="text-zinc-500">{t("result.ci")}</span>
                    <span className="font-semibold">{fmt(result.ci, 2)} {t("result.unitLminM2")}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-zinc-500">{t("result.coNormal")}</p>
              {result.ci !== null && (
                <p className="text-xs text-zinc-500">{t("result.ciNormal")}</p>
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
