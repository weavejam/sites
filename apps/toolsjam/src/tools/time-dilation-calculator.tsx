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

const C = 299792458; // m/s

function fmtNum(n: number, sig = 6): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toPrecision(sig)).toLocaleString("en-US", {
    maximumFractionDigits: 10,
  });
}

function fmtSci(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) < 1e-9 && n !== 0) return n.toExponential(6);
  return fmtNum(n, 8);
}

export default function TimeDilationCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.time-dilation-calculator");

  const [velocity, setVelocity] = React.useState("");
  const [refTime, setRefTime] = React.useState("");
  const [speedOfLight, setSpeedOfLight] = React.useState(String(C));
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    if (!touched) return null;
    const v = parseFloat(velocity);
    const t0 = parseFloat(refTime);
    const c = parseFloat(speedOfLight);

    if (!Number.isFinite(v) || !Number.isFinite(t0) || !Number.isFinite(c)) return null;
    if (c <= 0 || t0 <= 0 || v < 0) return null;
    if (v >= c) return null; // velocity must be less than c

    const beta = v / c;
    const betaSq = beta * beta;
    const gamma = 1 / Math.sqrt(1 - betaSq);
    const dilatedTime = gamma * t0;
    const timeDiff = dilatedTime - t0;
    const betaPct = beta * 100;

    return { gamma, dilatedTime, timeDiff, beta, betaPct, t0 };
  }, [touched, velocity, refTime, speedOfLight]);

  function loadExample(v: string, t0: string, c: string) {
    setVelocity(v);
    setRefTime(t0);
    setSpeedOfLight(c);
    setTouched(true);
  }

  function reset() {
    setVelocity("");
    setRefTime("");
    setSpeedOfLight(String(C));
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
              <Label htmlFor="td-v">{t("field.velocity")}</Label>
              <Input
                id="td-v"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                  placeholder={t("field.placeholder.velocity")}
                value={velocity}
                onChange={(e) => { setVelocity(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="td-t0">{t("field.referenceTime")}</Label>
              <Input
                id="td-t0"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                  placeholder={t("field.placeholder.referenceTime")}
                value={refTime}
                onChange={(e) => { setRefTime(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="td-c">{t("field.speedOfLight")}</Label>
              <Input
                id="td-c"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                  placeholder={t("field.placeholder.speedOfLight")}
                value={speedOfLight}
                onChange={(e) => { setSpeedOfLight(e.target.value); setTouched(true); }}
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
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-zinc-500">{t("result.lorentzFactor")}</p>
                  <p className="text-2xl font-bold font-mono">{fmtSci(result.gamma)}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.velocityRatio")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtSci(result.beta)} c ({fmtSci(result.betaPct)}%)</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.properTime")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtSci(result.t0)} s</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.dilatedTime")}</p>
                  <p className="text-xl font-semibold font-mono text-blue-700">{fmtSci(result.dilatedTime)} s</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-zinc-500">{t("result.timeDifference")}</p>
                  <p className="text-lg font-semibold font-mono">{fmtSci(result.timeDiff)} s</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("3874", "86400", String(C))}>
              {t("examples.loadGPS")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("29979245.8", "3600", String(C))}>
              {t("examples.loadSpaceship")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("269813212.2", "1", String(C))}>
              {t("examples.loadParticle")}
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
