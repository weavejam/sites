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

function formatNs(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 }) + " ns";
}

export default function RamLatencyCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.ram-latency-calculator");

  const [cl, setCl] = React.useState("");
  const [freq, setFreq] = React.useState("");
  const [tRCD, setTRCD] = React.useState("");
  const [tRP, setTRP] = React.useState("");
  const [tRAS, setTRAS] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const clNum = parseFloat(cl);
  const freqNum = parseFloat(freq);
  const tRCDNum = parseFloat(tRCD);
  const tRPNum = parseFloat(tRP);
  const tRASNum = parseFloat(tRAS);

  const clValid = cl !== "" && Number.isFinite(clNum) && clNum > 0;
  const freqValid = freq !== "" && Number.isFinite(freqNum) && freqNum > 0;

  const result = React.useMemo(() => {
    if (!clValid || !freqValid) return null;
    // DDR: actual clock = freq / 2
    const clockCycle = 2000 / freqNum; // ns per cycle
    const clLatency = clNum * clockCycle;
    const tRCDLatency = tRCD !== "" && Number.isFinite(tRCDNum) && tRCDNum > 0 ? tRCDNum * clockCycle : null;
    const tRPLatency = tRP !== "" && Number.isFinite(tRPNum) && tRPNum > 0 ? tRPNum * clockCycle : null;
    const tRASLatency = tRAS !== "" && Number.isFinite(tRASNum) && tRASNum > 0 ? tRASNum * clockCycle : null;
    const totalLatency =
      tRCDLatency !== null && tRPLatency !== null
        ? clLatency + tRCDLatency + tRPLatency
        : null;
    return { clockCycle, clLatency, tRCDLatency, tRPLatency, tRASLatency, totalLatency };
  }, [clNum, freqNum, tRCDNum, tRPNum, tRASNum, clValid, freqValid, tRCD, tRP, tRAS]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
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

  function reset() {
    setCl(""); setFreq(""); setTRCD(""); setTRP(""); setTRAS("");
    setTouched(false);
  }

  const showError = touched && (!clValid || !freqValid);

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
              <Label htmlFor="rlc-cl">{t("field.casLatency")}</Label>
              <Input
                id="rlc-cl"
                type="number"
                inputMode="decimal"
                min="0"
                value={cl}
                placeholder={t("placeholder.casLatency")}
                onChange={(e) => { setCl(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rlc-freq">{t("field.frequency")}</Label>
              <Input
                id="rlc-freq"
                type="number"
                inputMode="decimal"
                min="0"
                value={freq}
                placeholder={t("placeholder.frequency")}
                onChange={(e) => { setFreq(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rlc-trcd">{t("field.tRCD")}</Label>
              <Input
                id="rlc-trcd"
                type="number"
                inputMode="decimal"
                min="0"
                value={tRCD}
                placeholder={t("placeholder.tRCD")}
                onChange={(e) => { setTRCD(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rlc-trp">{t("field.tRP")}</Label>
              <Input
                id="rlc-trp"
                type="number"
                inputMode="decimal"
                min="0"
                value={tRP}
                placeholder={t("placeholder.tRP")}
                onChange={(e) => { setTRP(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rlc-tras">{t("field.tRAS")}</Label>
              <Input
                id="rlc-tras"
                type="number"
                inputMode="decimal"
                min="0"
                value={tRAS}
                placeholder={t("placeholder.tRAS")}
                onChange={(e) => { setTRAS(e.target.value); setTouched(true); }}
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

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.clockCycle")}</div>
                  <div className="font-semibold text-zinc-900">{formatNs(result.clockCycle)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.clLatency")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">{formatNs(result.clLatency)}</div>
                </div>
                {result.tRCDLatency !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.tRCDLatency")}</div>
                    <div className="font-semibold text-zinc-900">{formatNs(result.tRCDLatency)}</div>
                  </div>
                )}
                {result.tRPLatency !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.tRPLatency")}</div>
                    <div className="font-semibold text-zinc-900">{formatNs(result.tRPLatency)}</div>
                  </div>
                )}
                {result.totalLatency !== null && (
                  <div className="col-span-2">
                    <div className="text-xs text-zinc-500">{t("result.totalLatency")}</div>
                    <div className="text-xl font-semibold text-zinc-900">{formatNs(result.totalLatency)}</div>
                  </div>
                )}
              </div>
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
