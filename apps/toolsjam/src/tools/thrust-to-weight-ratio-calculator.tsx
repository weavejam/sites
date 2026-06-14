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

function fmtNum(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(decimals)).toLocaleString("en-US", {
    maximumFractionDigits: decimals,
  });
}

export default function ThrustToWeightRatioCalculator(
  _props: { locale: Locale }
) {
  const t = useTranslations("tool.thrust-to-weight-ratio-calculator");

  const [thrust, setThrust] = React.useState("");
  const [mass, setMass] = React.useState("");
  const [gravity, setGravity] = React.useState("9.81");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    if (!touched) return null;
    const F = parseFloat(thrust);
    const m = parseFloat(mass);
    const g = parseFloat(gravity);
    if (!Number.isFinite(F) || !Number.isFinite(m) || !Number.isFinite(g)) return null;
    if (m <= 0 || g <= 0 || F < 0) return null;
    const W = m * g;
    const twr = F / W;
    const netForce = F - W;
    const netAccel = netForce / m;
    return { twr, W, netForce, netAccel, canLiftOff: twr > 1 };
  }, [touched, thrust, mass, gravity]);

  function loadExample(t_val: string, m_val: string, g_val: string) {
    setThrust(t_val);
    setMass(m_val);
    setGravity(g_val);
    setTouched(true);
  }

  function reset() {
    setThrust("");
    setMass("");
    setGravity("9.81");
    setTouched(false);
  }

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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="twr-thrust">{t("field.thrust")}</Label>
              <Input
                id="twr-thrust"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                  placeholder={t("field.placeholder.thrust")}
                value={thrust}
                onChange={(e) => { setThrust(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twr-mass">{t("field.mass")}</Label>
              <Input
                id="twr-mass"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                  placeholder={t("field.placeholder.mass")}
                value={mass}
                onChange={(e) => { setMass(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twr-g">{t("field.gravity")}</Label>
              <Input
                id="twr-g"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                  placeholder={t("field.placeholder.gravity")}
                value={gravity}
                onChange={(e) => { setGravity(e.target.value); setTouched(true); }}
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

          {touched && result === null && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-3xl font-bold text-zinc-900">
                {t("result.twr")}: <span className="font-mono">{fmtNum(result.twr)}</span>
              </div>
              <div
                className={`rounded-md px-3 py-2 text-sm font-semibold ${
                  result.canLiftOff
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {result.canLiftOff ? t("result.canLiftOff") : t("result.cannotLiftOff")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-zinc-500">{t("result.weight")}</p>
                  <p className="text-lg font-semibold font-mono">{fmtNum(result.W, 2)} N</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.netForce")}</p>
                  <p className="text-lg font-semibold font-mono">{fmtNum(result.netForce, 2)} N</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.netAcceleration")}</p>
                  <p className="text-lg font-semibold font-mono">{fmtNum(result.netAccel, 4)} m/s²</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("34500000", "2300000", "9.81")}>
              {t("examples.loadSaturnV")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("130000", "16000", "9.81")}>
              {t("examples.loadF16")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("40", "2", "9.81")}>
              {t("examples.loadDrone")}
            </Button>
          </div>
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
