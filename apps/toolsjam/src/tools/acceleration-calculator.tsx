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

type VelocityUnit = "ms" | "kmh" | "mph" | "fts";
type TimeUnit = "s" | "min" | "h";

const VELOCITY_TO_MS: Record<VelocityUnit, number> = {
  ms: 1,
  kmh: 1 / 3.6,
  mph: 0.44704,
  fts: 0.3048,
};

const TIME_TO_S: Record<TimeUnit, number> = {
  s: 1,
  min: 60,
  h: 3600,
};

const G = 9.80665;

function fmtNum(n: number, decimals = 3): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(decimals)).toLocaleString("en-US", {
    maximumFractionDigits: decimals,
  });
}

export default function AccelerationCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.acceleration-calculator");

  const [v0, setV0] = React.useState("");
  const [v, setV] = React.useState("");
  const [vUnit, setVUnit] = React.useState<VelocityUnit>("ms");
  const [time, setTime] = React.useState("");
  const [tUnit, setTUnit] = React.useState<TimeUnit>("s");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    if (!touched) return null;
    const v0Num = parseFloat(v0);
    const vNum = parseFloat(v);
    const tNum = parseFloat(time);
    if (!Number.isFinite(v0Num) || !Number.isFinite(vNum) || !Number.isFinite(tNum)) return null;
    if (tNum <= 0) return { error: "zeroTime" as const };
    const v0SI = v0Num * VELOCITY_TO_MS[vUnit];
    const vSI = vNum * VELOCITY_TO_MS[vUnit];
    const tSI = tNum * TIME_TO_S[tUnit];
    const accel = (vSI - v0SI) / tSI;
    const deltaV = vSI - v0SI;
    const gs = accel / G;
    return { accel, deltaV, gs, error: null };
  }, [touched, v0, v, vUnit, time, tUnit]);

  function loadExample(v0v: string, vv: string, vu: VelocityUnit, tv: string, tu: TimeUnit) {
    setV0(v0v); setV(vv); setVUnit(vu); setTime(tv); setTUnit(tu); setTouched(true);
  }

  function reset() {
    setV0(""); setV(""); setVUnit("ms"); setTime(""); setTUnit("s"); setTouched(false);
  }

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

  const VELOCITY_UNITS: VelocityUnit[] = ["ms", "kmh", "mph", "fts"];
  const TIME_UNITS: TimeUnit[] = ["s", "min", "h"];

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
              <Label htmlFor="acc-v0">{t("field.initialVelocity")}</Label>
              <Input
                id="acc-v0"
                type="number"
                inputMode="decimal"
                step="any"
                placeholder={t("field.placeholder.initialVelocity")}
                value={v0}
                onChange={(e) => { setV0(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="acc-v">{t("field.finalVelocity")}</Label>
              <Input
                id="acc-v"
                type="number"
                inputMode="decimal"
                step="any"
                placeholder={t("field.placeholder.finalVelocity")}
                value={v}
                onChange={(e) => { setV(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="acc-vunit">{t("field.velocityUnit")}</Label>
              <select
                id="acc-vunit"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none"
                value={vUnit}
                onChange={(e) => setVUnit(e.target.value as VelocityUnit)}
              >
                {VELOCITY_UNITS.map((u) => (
                  <option key={u} value={u}>{t(`unit.velocity.${u}` as never)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="acc-t">{t("field.time")}</Label>
              <div className="flex gap-2">
                <Input
                  id="acc-t"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="any"
                  placeholder={t("field.placeholder.time")}
                  value={time}
                  onChange={(e) => { setTime(e.target.value); setTouched(true); }}
                />
                <select
                  className="flex h-9 w-28 flex-shrink-0 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none"
                  value={tUnit}
                  onChange={(e) => setTUnit(e.target.value as TimeUnit)}
                >
                  {TIME_UNITS.map((u) => (
                    <option key={u} value={u}>{t(`unit.time.${u}` as never)}</option>
                  ))}
                </select>
              </div>
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
          {result?.error === "zeroTime" && (
            <p className="text-sm text-red-600">{t("error.zeroTime")}</p>
          )}

          {result !== null && result.error === null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-sm text-zinc-500">{t("result.accelerationSI")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtNum(result.accel)} m/s²</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.accelerationGs")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtNum(result.gs, 4)} g</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{t("result.deltaV")}</p>
                  <p className="text-xl font-semibold font-mono">{fmtNum(result.deltaV)} m/s</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("0", "60", "mph", "3", "s")}>
              {t("examples.loadCar")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("0", "39.2", "ms", "4", "s")}>
              {t("examples.loadFreefall")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("120", "80", "kmh", "10", "s")}>
              {t("examples.loadTrain")}
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
