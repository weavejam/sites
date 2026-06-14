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

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function formatNum(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(digits)).toString();
}

export default function WindCorrectionAngleCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.wind-correction-angle-calculator");

  const [tc, setTc] = React.useState("");
  const [wd, setWd] = React.useState("");
  const [ws, setWs] = React.useState("");
  const [tas, setTas] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const tcn = parseFloat(tc);
  const wdn = parseFloat(wd);
  const wsn = parseFloat(ws);
  const tasn = parseFloat(tas);

  const valid =
    tc !== "" && wd !== "" && ws !== "" && tas !== "" &&
    Number.isFinite(tcn) && Number.isFinite(wdn) && Number.isFinite(wsn) && Number.isFinite(tasn) &&
    wsn >= 0 && tasn > 0;

  const result = React.useMemo<{
    wca: number;
    th: number;
    gs: number;
  } | null>(() => {
    if (!valid) return null;
    // Wind angle relative to true course
    const windAngle = toRad(wdn - tcn);
    // Wind correction angle: WCA = asin(WS * sin(windAngle) / TAS)
    const sinWca = (wsn * Math.sin(windAngle)) / tasn;
    if (Math.abs(sinWca) > 1) return null;
    const wca = (Math.asin(sinWca) * 180) / Math.PI;
    // True Heading = True Course + WCA
    const th = (tcn + wca + 360) % 360;
    // Ground Speed using vector addition:
    // Ground velocity = TAS velocity - wind velocity (wind blows FROM wdn)
    const groundVx = tasn * Math.sin(toRad(th)) - wsn * Math.sin(toRad(wdn));
    const groundVy = tasn * Math.cos(toRad(th)) - wsn * Math.cos(toRad(wdn));
    const gs = Math.sqrt(groundVx * groundVx + groundVy * groundVy);
    return { wca, th, gs };
  }, [valid, tcn, wdn, wsn, tasn]);

  function loadExample(tcv: string, wdv: string, wsv: string, tasv: string) {
    setTc(tcv); setWd(wdv); setWs(wsv); setTas(tasv);
    setTouched(true);
  }

  function reset() {
    setTc(""); setWd(""); setWs(""); setTas("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch { break; }
    }
    return arr;
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

  const showError = touched && !valid;

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="wca-tc">{t("field.trueCourse")}</Label>
              <Input
                id="wca-tc"
                type="number"
                inputMode="decimal"
                value={tc}
                placeholder={t("placeholder.trueCourse")}
                onChange={(e) => { setTc(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wca-wd">{t("field.windDirection")}</Label>
              <Input
                id="wca-wd"
                type="number"
                inputMode="decimal"
                value={wd}
                placeholder={t("placeholder.windDirection")}
                onChange={(e) => { setWd(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wca-ws">{t("field.windSpeed")}</Label>
              <Input
                id="wca-ws"
                type="number"
                inputMode="decimal"
                value={ws}
                placeholder={t("placeholder.windSpeed")}
                onChange={(e) => { setWs(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wca-tas">{t("field.trueAirspeed")}</Label>
              <Input
                id="wca-tas"
                type="number"
                inputMode="decimal"
                value={tas}
                placeholder={t("placeholder.trueAirspeed")}
                onChange={(e) => { setTas(e.target.value); setTouched(true); }}
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
          {touched && valid && result === null && (
            <p className="text-sm text-red-600">{t("error.windTooStrong")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.wca", { value: formatNum(result.wca) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.trueHeading", { value: formatNum(result.th) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.groundSpeed", { value: formatNum(result.gs) })}
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
            onClick={() => loadExample("90", "0", "15", "80")}>
            {t("examples.loadCrosswind")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("180", "180", "20", "120")}>
            {t("examples.loadHeadwind")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("270", "90", "25", "150")}>
            {t("examples.loadTailwind")}
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
