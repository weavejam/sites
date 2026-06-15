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

type SolveFor = "wavelength" | "spacing" | "angle" | "order";
const SOLVE_OPTIONS: SolveFor[] = ["wavelength", "spacing", "angle", "order"];

interface ExampleRow {
  input: string;
  output: string;
  note?: string;
}

function formatNum(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

export default function BraggsLawCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.braggs-law-calculator");

  const [solveFor, setSolveFor] = React.useState<SolveFor>("wavelength");
  const [wavelength, setWavelength] = React.useState("");
  const [spacing, setSpacing] = React.useState("");
  const [angle, setAngle] = React.useState("");
  const [order, setOrder] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const lambda = parseFloat(wavelength);
  const d = parseFloat(spacing);
  const theta = parseFloat(angle);
  const n = parseFloat(order);

  type ErrorKey = "invalid" | "sinRange" | "asinRange" | "orderNonInteger" | null;

  const result = React.useMemo<{ value: number; error: ErrorKey }>(() => {
    if (!touched) return { value: NaN, error: null };

    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const toDeg = (rad: number) => (rad * 180) / Math.PI;

    switch (solveFor) {
      case "wavelength": {
        if (!Number.isFinite(d) || d <= 0 || !Number.isFinite(theta) || theta <= 0 || theta >= 90 || !Number.isFinite(n) || n <= 0) return { value: NaN, error: "invalid" };
        const sinT = Math.sin(toRad(theta));
        return { value: (2 * d * sinT) / n, error: null };
      }
      case "spacing": {
        if (!Number.isFinite(lambda) || lambda <= 0 || !Number.isFinite(theta) || theta <= 0 || theta >= 90 || !Number.isFinite(n) || n <= 0) return { value: NaN, error: "invalid" };
        const sinT = Math.sin(toRad(theta));
        if (sinT <= 0) return { value: NaN, error: "sinRange" };
        return { value: (n * lambda) / (2 * sinT), error: null };
      }
      case "angle": {
        if (!Number.isFinite(lambda) || lambda <= 0 || !Number.isFinite(d) || d <= 0 || !Number.isFinite(n) || n <= 0) return { value: NaN, error: "invalid" };
        const sinVal = (n * lambda) / (2 * d);
        if (sinVal > 1) return { value: NaN, error: "asinRange" };
        return { value: toDeg(Math.asin(sinVal)), error: null };
      }
      case "order": {
        if (!Number.isFinite(lambda) || lambda <= 0 || !Number.isFinite(d) || d <= 0 || !Number.isFinite(theta) || theta <= 0 || theta >= 90) return { value: NaN, error: "invalid" };
        const nRaw = (2 * d * Math.sin(toRad(theta))) / lambda;
        if (Math.abs(nRaw - Math.round(nRaw)) > 0.05) return { value: nRaw, error: "orderNonInteger" };
        return { value: nRaw, error: null };
      }
    }
  }, [touched, solveFor, lambda, d, theta, n]);

  const showError = touched && (result.error !== null);

  const examplesItems: ExampleRow[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleRow[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
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

  function handleReset() {
    setWavelength(""); setSpacing(""); setAngle(""); setOrder(""); setTouched(false);
  }

  function loadExample(sf: SolveFor, lam: string, sp: string, ang: string, ord: string) {
    setSolveFor(sf); setWavelength(lam); setSpacing(sp); setAngle(ang); setOrder(ord); setTouched(true);
  }

  const showLambda = solveFor !== "wavelength";
  const showSpacing = solveFor !== "spacing";
  const showAngle = solveFor !== "angle";
  const showOrder = solveFor !== "order";

  const resultUnit = (() => {
    switch (solveFor) {
      case "wavelength": return t("unit.wavelength");
      case "spacing": return t("unit.spacing");
      case "angle": return t("unit.angle");
      case "order": return t("unit.order");
    }
  })();

  // Compute verification 2d sin θ
  const verif = React.useMemo(() => {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const finalD = solveFor === "spacing" && Number.isFinite(result.value) ? result.value : d;
    const finalTheta = solveFor === "angle" && Number.isFinite(result.value) ? result.value : theta;
    if (!Number.isFinite(finalD) || !Number.isFinite(finalTheta)) return null;
    return 2 * finalD * Math.sin(toRad(finalTheta));
  }, [solveFor, result.value, d, theta]);

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
          <div className="space-y-2">
            <Label>{t("field.solveFor")}</Label>
            <div className="flex flex-wrap gap-2">
              {SOLVE_OPTIONS.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant={solveFor === opt ? "default" : "outline"}
                  onClick={() => { setSolveFor(opt); setTouched(false); }}
                >
                  {t(`solveFor.${opt}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {showLambda && (
              <div className="space-y-2">
                <Label htmlFor="br-lambda">{t("field.wavelength")} ({t("unit.wavelength")})</Label>
                <Input id="br-lambda" type="number" inputMode="decimal" value={wavelength}
                  placeholder={t("placeholder.wavelength")} min="0" step="any"
                  onChange={(e) => { setWavelength(e.target.value); setTouched(false); }} />
              </div>
            )}
            {showSpacing && (
              <div className="space-y-2">
                <Label htmlFor="br-d">{t("field.spacing")} ({t("unit.spacing")})</Label>
                <Input id="br-d" type="number" inputMode="decimal" value={spacing}
                  placeholder={t("placeholder.spacing")} min="0" step="any"
                  onChange={(e) => { setSpacing(e.target.value); setTouched(false); }} />
              </div>
            )}
            {showAngle && (
              <div className="space-y-2">
                <Label htmlFor="br-theta">{t("field.angle")} ({t("unit.angle")})</Label>
                <Input id="br-theta" type="number" inputMode="decimal" value={angle}
                  placeholder={t("placeholder.angle")} min="0" max="90" step="any"
                  onChange={(e) => { setAngle(e.target.value); setTouched(false); }} />
              </div>
            )}
            {showOrder && (
              <div className="space-y-2">
                <Label htmlFor="br-n">{t("field.order")}</Label>
                <Input id="br-n" type="number" inputMode="numeric" value={order}
                  placeholder={t("placeholder.order")} min="1" step="1"
                  onChange={(e) => { setOrder(e.target.value); setTouched(false); }} />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={handleReset}>{t("button.reset")}</Button>
          </div>

          {showError && result.error && (
            <p className="text-sm text-red-600">{t(`error.${result.error}` as never)}</p>
          )}

          {touched && Number.isFinite(result.value) && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-zinc-500">{t(`result.${solveFor}` as never)}</div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {formatNum(result.value)} {resultUnit}
                  </div>
                </div>
                {verif !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.verification")}</div>
                    <div className="text-base font-medium text-zinc-700">{formatNum(verif)} nm</div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("wavelength", "", "0.203", "22.5", "1")}>
              {t("examples.loadFindLambda")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("spacing", "0.154", "", "30", "1")}>
              {t("examples.loadFindD")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("angle", "0.154", "0.203", "", "1")}>
              {t("examples.loadFindTheta")}
            </Button>
            <Button type="button" variant="outline" size="sm"
              onClick={() => loadExample("order", "0.154", "0.203", "22.5", "")}>
              {t("examples.loadFindN")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">{t("about.body")}</div>
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
          {howtoSteps.map((s, i) => <li key={i}>{s}</li>)}
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
