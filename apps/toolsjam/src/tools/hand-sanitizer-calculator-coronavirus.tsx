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

type Method = "optimal" | "adequate";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function getEffectivenessRating(
  alcoholPct: number,
  contactTime: number,
  method: Method
): string {
  if (alcoholPct < 60) return "ineffective";
  if (alcoholPct >= 75 && alcoholPct <= 85 && contactTime >= 20 && method === "optimal")
    return "optimal";
  if (alcoholPct >= 80) return "high";
  if (alcoholPct >= 70) return "standard";
  return "basic";
}

function getMlPerUse(method: Method): number {
  return method === "optimal" ? 1.5 : 2.0;
}

export default function HandSanitizerCalculatorCoronavirus(
  _props: { locale: Locale }
) {
  const t = useTranslations("tool.hand-sanitizer-calculator-coronavirus");

  const [alcoholPct, setAlcoholPct] = React.useState("");
  const [volume, setVolume] = React.useState("");
  const [cost, setCost] = React.useState("");
  const [usesPerDay, setUsesPerDay] = React.useState("");
  const [contactTime, setContactTime] = React.useState("");
  const [method, setMethod] = React.useState<Method | "">("");
  const [touched, setTouched] = React.useState(false);

  const parsed = React.useMemo(() => {
    return {
      alcoholPct: parseFloat(alcoholPct),
      volume: parseFloat(volume),
      cost: parseFloat(cost),
      usesPerDay: parseInt(usesPerDay, 10),
      contactTime: parseFloat(contactTime),
    };
  }, [alcoholPct, volume, cost, usesPerDay, contactTime]);

  const validationError = React.useMemo(() => {
    if (!touched) return null;
    if (
      !alcoholPct ||
      !volume ||
      !cost ||
      !usesPerDay ||
      !contactTime ||
      method === ""
    )
      return t("error.required");
    if (!Number.isFinite(parsed.alcoholPct) || parsed.alcoholPct < 0 || parsed.alcoholPct > 100)
      return t("error.alcoholRange");
    if (!Number.isFinite(parsed.volume) || parsed.volume <= 0)
      return t("error.positiveVolume");
    if (!Number.isFinite(parsed.cost) || parsed.cost < 0)
      return t("error.positiveCost");
    if (!Number.isFinite(parsed.usesPerDay) || parsed.usesPerDay < 1)
      return t("error.positiveUses");
    if (!Number.isFinite(parsed.contactTime) || parsed.contactTime <= 0)
      return t("error.positiveContact");
    return null;
  }, [touched, alcoholPct, volume, cost, usesPerDay, contactTime, method, parsed, t]);

  const result = React.useMemo(() => {
    if (validationError !== null) return null;
    if (!touched || method === "") return null;
    const mlPerUse = getMlPerUse(method as Method);
    const totalUses = Math.floor(parsed.volume / mlPerUse);
    const costPerUse = totalUses > 0 ? parsed.cost / totalUses : 0;
    const daysSupply =
      parsed.usesPerDay > 0 ? totalUses / parsed.usesPerDay : 0;
    const rating = getEffectivenessRating(
      parsed.alcoholPct,
      parsed.contactTime,
      method as Method
    );
    return { mlPerUse, totalUses, costPerUse, daysSupply, rating };
  }, [validationError, touched, method, parsed]);

  function reset() {
    setAlcoholPct("");
    setVolume("");
    setCost("");
    setUsesPerDay("");
    setContactTime("");
    setMethod("");
    setTouched(false);
  }

  function loadExample(
    ap: string,
    vol: string,
    c: string,
    upd: string,
    ct: string,
    m: Method
  ) {
    setAlcoholPct(ap);
    setVolume(vol);
    setCost(c);
    setUsesPerDay(upd);
    setContactTime(ct);
    setMethod(m);
    setTouched(true);
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
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch {
        break;
      }
    }
    return arr;
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
              <Label htmlFor="hsc-alcohol">{t("field.alcoholPct")}</Label>
              <Input
                id="hsc-alcohol"
                type="number"
                inputMode="decimal"
                min={0}
                max={100}
                value={alcoholPct}
                placeholder={t("placeholder.alcoholPct")}
                onChange={(e) => { setAlcoholPct(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hsc-volume">{t("field.volume")}</Label>
              <Input
                id="hsc-volume"
                type="number"
                inputMode="decimal"
                min={0}
                value={volume}
                placeholder={t("placeholder.volume")}
                onChange={(e) => { setVolume(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hsc-cost">{t("field.cost")}</Label>
              <Input
                id="hsc-cost"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.01"
                value={cost}
                placeholder={t("placeholder.cost")}
                onChange={(e) => { setCost(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hsc-uses">{t("field.usesPerDay")}</Label>
              <Input
                id="hsc-uses"
                type="number"
                inputMode="numeric"
                min={1}
                value={usesPerDay}
                placeholder={t("placeholder.usesPerDay")}
                onChange={(e) => { setUsesPerDay(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hsc-contact">{t("field.contactTime")}</Label>
              <Input
                id="hsc-contact"
                type="number"
                inputMode="decimal"
                min={0}
                value={contactTime}
                placeholder={t("placeholder.contactTime")}
                onChange={(e) => { setContactTime(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2 sm:col-span-2 lg:col-span-3">
              <Label>{t("field.method")}</Label>
              <div className="flex flex-wrap gap-2">
                {(["optimal", "adequate"] as Method[]).map((m) => (
                  <Button
                    key={m}
                    type="button"
                    variant={method === m ? "default" : "outline"}
                    onClick={() => { setMethod(m); setTouched(true); }}
                  >
                    {t(`method.${m}` as never)}
                  </Button>
                ))}
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

          {validationError && (
            <p className="text-sm text-red-600">{validationError}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.effectiveness")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {t(`rating.${result.rating}` as never)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.costPerUse")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    ${result.costPerUse.toFixed(3)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.daysSupply")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {t("result.daysFormat", { days: result.daysSupply.toFixed(1) })}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalUses")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {t("result.totalUsesFormat", { count: result.totalUses, ml: result.mlPerUse })}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <p className="text-sm font-medium text-zinc-700">{t("examples.heading")}</p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => loadExample("75", "500", "12.99", "8", "25", "optimal")}
              >
                {t("button.loadHigh")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => loadExample("70", "300", "6.99", "12", "20", "adequate")}
              >
                {t("button.loadStandard")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => loadExample("62", "1000", "8.49", "6", "15", "adequate")}
              >
                {t("button.loadBudget")}
              </Button>
            </div>
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
