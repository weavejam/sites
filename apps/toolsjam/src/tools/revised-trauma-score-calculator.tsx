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

type SeverityLevel = "minor" | "moderate" | "serious" | "severe" | "critical";

interface RTSResult {
  gcsCode: number;
  sbpCode: number;
  rrCode: number;
  tRTS: number;
  severity: SeverityLevel;
}

function codeGCS(gcs: number): number {
  if (gcs >= 13) return 4;
  if (gcs >= 9) return 3;
  if (gcs >= 6) return 2;
  if (gcs >= 4) return 1;
  return 0;
}

function codeSBP(sbp: number): number {
  if (sbp > 89) return 4;
  if (sbp >= 76) return 3;
  if (sbp >= 50) return 2;
  if (sbp >= 1) return 1;
  return 0;
}

function codeRR(rr: number): number {
  if (rr >= 10 && rr <= 29) return 4;
  if (rr > 29) return 3;
  if (rr >= 6) return 2;
  if (rr >= 1) return 1;
  return 0;
}

function getSeverity(tRTS: number): SeverityLevel {
  if (tRTS >= 11) return "minor";
  if (tRTS >= 9) return "moderate";
  if (tRTS >= 7) return "serious";
  if (tRTS >= 4) return "severe";
  return "critical";
}

function computeRTS(gcs: number, sbp: number, rr: number): RTSResult {
  const gcsCode = codeGCS(gcs);
  const sbpCode = codeSBP(sbp);
  const rrCode = codeRR(rr);
  const tRTS = gcsCode + sbpCode + rrCode;
  return { gcsCode, sbpCode, rrCode, tRTS, severity: getSeverity(tRTS) };
}

export default function RevisedTraumaScoreCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.revised-trauma-score-calculator");

  const [gcs, setGcs] = React.useState("");
  const [sbp, setSbp] = React.useState("");
  const [rr, setRr] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const gcsNum = parseFloat(gcs);
  const sbpNum = parseFloat(sbp);
  const rrNum = parseFloat(rr);

  const gcsValid =
    Number.isFinite(gcsNum) && gcsNum >= 3 && gcsNum <= 15 && Number.isInteger(gcsNum);
  const sbpValid = Number.isFinite(sbpNum) && sbpNum >= 0 && sbpNum <= 300;
  const rrValid = Number.isFinite(rrNum) && rrNum >= 0 && rrNum <= 100;
  const isValid = gcsValid && sbpValid && rrValid;

  const result = React.useMemo<RTSResult | null>(() => {
    if (!isValid) return null;
    return computeRTS(gcsNum, sbpNum, rrNum);
  }, [isValid, gcsNum, sbpNum, rrNum]);

  function loadExample(gcsVal: string, sbpVal: string, rrVal: string) {
    setGcs(gcsVal);
    setSbp(sbpVal);
    setRr(rrVal);
    setTouched(true);
  }

  function reset() {
    setGcs("");
    setSbp("");
    setRr("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[];
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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="rts-gcs">{t("field.gcs")}</Label>
              <Input
                id="rts-gcs"
                type="number"
                inputMode="numeric"
                value={gcs}
                placeholder={t("placeholder.gcs")}
                min={3}
                max={15}
                onChange={(e) => { setGcs(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rts-sbp">{t("field.sbp")}</Label>
              <Input
                id="rts-sbp"
                type="number"
                inputMode="numeric"
                value={sbp}
                placeholder={t("placeholder.sbp")}
                onChange={(e) => { setSbp(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rts-rr">{t("field.rr")}</Label>
              <Input
                id="rts-rr"
                type="number"
                inputMode="numeric"
                value={rr}
                placeholder={t("placeholder.rr")}
                onChange={(e) => { setRr(e.target.value); setTouched(true); }}
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

          {touched && !isValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalRTS")}</div>
                  <div className="text-3xl font-bold text-zinc-900">{result.tRTS}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.severity")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {t(`result.severity_${result.severity}` as never)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.mortalityRisk")}</div>
                  <div className="text-lg font-semibold text-zinc-900">
                    {t(`result.mortality_${result.severity}` as never)}
                  </div>
                </div>
              </div>
              <div className="grid gap-2 border-t border-zinc-200 pt-3 sm:grid-cols-3 text-sm text-zinc-600">
                <div>
                  {t("result.gcsCode")}: <span className="font-medium">{result.gcsCode}</span>
                </div>
                <div>
                  {t("result.sbpCode")}: <span className="font-medium">{result.sbpCode}</span>
                </div>
                <div>
                  {t("result.rrCode")}: <span className="font-medium">{result.rrCode}</span>
                </div>
              </div>
              <div className="text-sm text-zinc-700">
                {t(`result.interp_${result.severity}` as never)}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => loadExample("15", "120", "16")}
        >
          {t("examples.loadMinor")}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => loadExample("11", "80", "22")}
        >
          {t("examples.loadModerate")}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => loadExample("5", "60", "35")}
        >
          {t("examples.loadSevere")}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => loadExample("3", "40", "5")}
        >
          {t("examples.loadCritical")}
        </Button>
      </div>

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
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{ex.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
        <div className="space-y-4">
          {faqItems.map((f, idx) => (
            <div key={idx} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{f.q}</div>
              <div className="mt-1 text-zinc-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
