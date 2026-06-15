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

// RCF = 1.118e-5 × r(cm) × RPM²
// r in mm input → cm = r_mm / 10
type SolveFor = "rcf" | "rpm" | "radius";

const SOLVE_FOR: SolveFor[] = ["rcf", "rpm", "radius"];

function fmtNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  let dec = 4;
  if (abs >= 1e6) dec = 0;
  else if (abs >= 10000) dec = 0;
  else if (abs >= 1000) dec = 1;
  else if (abs >= 10) dec = 2;
  return parseFloat(n.toFixed(dec)).toLocaleString("en-US", { maximumFractionDigits: dec });
}

export default function CentrifugeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.centrifuge-calculator");

  const [solveFor, setSolveFor] = React.useState<SolveFor>("rcf");
  const [rcf, setRcf] = React.useState("");
  const [rpm, setRpm] = React.useState("");
  const [radius, setRadius] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const rcfNum = parseFloat(rcf);
  const rpmNum = parseFloat(rpm);
  const radiusNum = parseFloat(radius); // mm

  const rcfValid = rcf !== "" && Number.isFinite(rcfNum) && rcfNum > 0;
  const rpmValid = rpm !== "" && Number.isFinite(rpmNum) && rpmNum > 0;
  const radiusValid = radius !== "" && Number.isFinite(radiusNum) && radiusNum > 0;

  // Need two inputs based on what we're solving for
  const inputsValid = React.useMemo(() => {
    if (solveFor === "rcf") return rpmValid && radiusValid;
    if (solveFor === "rpm") return rcfValid && radiusValid;
    return rcfValid && rpmValid;
  }, [solveFor, rcfValid, rpmValid, radiusValid]);

  const result = React.useMemo<number | null>(() => {
    if (!inputsValid) return null;
    const r_cm = radiusNum / 10; // mm to cm
    if (solveFor === "rcf") {
      return 1.118e-5 * r_cm * rpmNum * rpmNum;
    }
    if (solveFor === "rpm") {
      return Math.sqrt(rcfNum / (1.118e-5 * r_cm));
    }
    // radius: solve for r_cm, then convert to mm
    const r_cm_result = rcfNum / (1.118e-5 * rpmNum * rpmNum);
    return r_cm_result * 10; // cm to mm
  }, [inputsValid, solveFor, rcfNum, rpmNum, radiusNum]);

  function reset() {
    setRcf("");
    setRpm("");
    setRadius("");
    setTouched(false);
  }

  function loadExample(s: SolveFor, r: string, rp: string, rc: string) {
    setSolveFor(s);
    setRadius(r);
    setRpm(rp);
    setRcf(rc);
    setTouched(true);
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

  const resultUnit = solveFor === "rcf" ? t("result.unitRcf") : solveFor === "rpm" ? t("result.unitRpm") : t("result.unitRadius");
  const resultLabel = t(`result.label_${solveFor}` as never);

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
          {/* Solve-for selector */}
          <div className="space-y-2">
            <Label>{t("field.solveFor")}</Label>
            <div className="flex flex-wrap gap-2">
              {SOLVE_FOR.map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant={solveFor === s ? "default" : "outline"}
                  onClick={() => { setSolveFor(s); setTouched(false); }}
                >
                  {t(`type.${s}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {/* RCF */}
            <div className="space-y-2">
              <Label htmlFor="cen-rcf">{t("field.rcf")}</Label>
              <Input
                id="cen-rcf"
                type="number"
                inputMode="decimal"
                min="0"
                value={rcf}
                placeholder={t("placeholder.rcf")}
                disabled={solveFor === "rcf"}
                onChange={(e) => { setRcf(e.target.value); setTouched(true); }}
              />
            </div>
            {/* RPM */}
            <div className="space-y-2">
              <Label htmlFor="cen-rpm">{t("field.rpm")}</Label>
              <Input
                id="cen-rpm"
                type="number"
                inputMode="decimal"
                min="0"
                value={rpm}
                placeholder={t("placeholder.rpm")}
                disabled={solveFor === "rpm"}
                onChange={(e) => { setRpm(e.target.value); setTouched(true); }}
              />
            </div>
            {/* Radius */}
            <div className="space-y-2">
              <Label htmlFor="cen-radius">{t("field.radius")}</Label>
              <Input
                id="cen-radius"
                type="number"
                inputMode="decimal"
                min="0"
                value={radius}
                placeholder={t("placeholder.radius")}
                disabled={solveFor === "radius"}
                onChange={(e) => { setRadius(e.target.value); setTouched(true); }}
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

          {touched && !inputsValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && touched && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-1">
              <div className="text-sm font-medium text-zinc-500">
                {resultLabel}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {fmtNum(result)} {resultUnit}
              </div>
              <div className="text-xs text-zinc-500">{t("result.formula")}</div>
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("rcf", "85", "3000", "")}
          >
            {t("examples.loadCellPellet")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("rpm", "85", "", "12000")}
          >
            {t("examples.loadProtocol")}
          </Button>
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
