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

type ConversionType = "deltaToWye" | "wyeToDelta";

function fmtNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(6)).toLocaleString("en-US", {
    maximumFractionDigits: 6,
  });
}

interface DeltaToWyeResult {
  ra: number;
  rb: number;
  rc: number;
}

interface WyeToDeltaResult {
  rab: number;
  rbc: number;
  rca: number;
}

export default function DeltaToWyeConversion(_props: { locale: Locale }) {
  const t = useTranslations("tool.delta-to-wye-conversion");

  const [convType, setConvType] = React.useState<ConversionType>("deltaToWye");
  const [r1, setR1] = React.useState("");
  const [r2, setR2] = React.useState("");
  const [r3, setR3] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const r1Num = parseFloat(r1);
  const r2Num = parseFloat(r2);
  const r3Num = parseFloat(r3);

  const allValid =
    r1 !== "" &&
    r2 !== "" &&
    r3 !== "" &&
    Number.isFinite(r1Num) &&
    Number.isFinite(r2Num) &&
    Number.isFinite(r3Num) &&
    r1Num > 0 &&
    r2Num > 0 &&
    r3Num > 0;

  const deltaToWyeResult = React.useMemo<DeltaToWyeResult | null>(() => {
    if (!allValid || convType !== "deltaToWye") return null;
    const sum = r1Num + r2Num + r3Num;
    return {
      ra: (r1Num * r3Num) / sum,
      rb: (r1Num * r2Num) / sum,
      rc: (r2Num * r3Num) / sum,
    };
  }, [allValid, convType, r1Num, r2Num, r3Num]);

  const wyeToDeltaResult = React.useMemo<WyeToDeltaResult | null>(() => {
    if (!allValid || convType !== "wyeToDelta") return null;
    const s = r1Num * r2Num + r2Num * r3Num + r3Num * r1Num;
    return {
      rab: s / r3Num,
      rbc: s / r1Num,
      rca: s / r2Num,
    };
  }, [allValid, convType, r1Num, r2Num, r3Num]);

  function reset() {
    setR1("");
    setR2("");
    setR3("");
    setTouched(false);
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
          <div className="space-y-2">
            <Label>{t("field.type")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["deltaToWye", "wyeToDelta"] as ConversionType[]).map((ct) => (
                <Button
                  key={ct}
                  type="button"
                  variant={convType === ct ? "default" : "outline"}
                  onClick={() => {
                    setConvType(ct);
                    setTouched(false);
                  }}
                >
                  {t(`type.${ct}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="dtw-r1">{t("field.r1")}</Label>
              <Input
                id="dtw-r1"
                type="number"
                inputMode="decimal"
                min="0"
                value={r1}
                placeholder="0"
                onChange={(e) => { setR1(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dtw-r2">{t("field.r2")}</Label>
              <Input
                id="dtw-r2"
                type="number"
                inputMode="decimal"
                min="0"
                value={r2}
                placeholder="0"
                onChange={(e) => { setR2(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dtw-r3">{t("field.r3")}</Label>
              <Input
                id="dtw-r3"
                type="number"
                inputMode="decimal"
                min="0"
                value={r3}
                placeholder="0"
                onChange={(e) => { setR3(e.target.value); setTouched(true); }}
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

          {touched && allValid && deltaToWyeResult && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.deltaToWye")}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.ra")}</div>
                  <div className="text-xl font-semibold">{fmtNum(deltaToWyeResult.ra)} Ω</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.rb")}</div>
                  <div className="text-xl font-semibold">{fmtNum(deltaToWyeResult.rb)} Ω</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.rc")}</div>
                  <div className="text-xl font-semibold">{fmtNum(deltaToWyeResult.rc)} Ω</div>
                </div>
              </div>
            </div>
          )}

          {touched && allValid && wyeToDeltaResult && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.wyeToDelta")}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.rab")}</div>
                  <div className="text-xl font-semibold">{fmtNum(wyeToDeltaResult.rab)} Ω</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.rbc")}</div>
                  <div className="text-xl font-semibold">{fmtNum(wyeToDeltaResult.rbc)} Ω</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.rca")}</div>
                  <div className="text-xl font-semibold">{fmtNum(wyeToDeltaResult.rca)} Ω</div>
                </div>
              </div>
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
