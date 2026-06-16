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

interface MassPoint {
  mass: string;
  x: string;
  y: string;
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(8)).toString();
}

const DEFAULT_POINTS: MassPoint[] = [
  { mass: "", x: "", y: "" },
  { mass: "", x: "", y: "" },
];

export default function CenterOfMassCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.center-of-mass-calculator");
  const [points, setPoints] = React.useState<MassPoint[]>(DEFAULT_POINTS);
  const [massUnit, setMassUnit] = React.useState("kg");
  const [posUnit, setPosUnit] = React.useState("m");
  const [touched, setTouched] = React.useState(false);

  const massUnits = ["kg", "g", "lb", "oz"];
  const posUnits = ["m", "cm", "mm", "ft", "in"];

  function updatePoint(idx: number, field: keyof MassPoint, val: string) {
    setPoints((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: val };
      return next;
    });
    setTouched(true);
  }

  function addPoint() {
    setPoints((prev) => [...prev, { mass: "", x: "", y: "" }]);
  }

  function removePoint(idx: number) {
    setPoints((prev) => prev.filter((_, i) => i !== idx));
  }

  function reset() {
    setPoints(DEFAULT_POINTS);
    setTouched(false);
  }

  const parsedPoints = React.useMemo(() => {
    return points.map((p) => {
      const m = parseFloat(p.mass);
      const px = parseFloat(p.x);
      const py = parseFloat(p.y);
      if (!Number.isFinite(m) || m <= 0) return null;
      if (!Number.isFinite(px) || !Number.isFinite(py)) return null;
      return { m, x: px, y: py };
    });
  }, [points]);

  const validPoints = React.useMemo(
    () => parsedPoints.filter((p): p is { m: number; x: number; y: number } => p !== null),
    [parsedPoints]
  );

  const result = React.useMemo(() => {
    if (validPoints.length < 1) return null;
    const totalMass = validPoints.reduce((s, p) => s + p.m, 0);
    if (totalMass === 0) return null;
    const xcm = validPoints.reduce((s, p) => s + p.m * p.x, 0) / totalMass;
    const ycm = validPoints.reduce((s, p) => s + p.m * p.y, 0) / totalMass;
    return { xcm, ycm, totalMass };
  }, [validPoints]);

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
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

  const hasAnyInput = points.some((p) => p.mass || p.x || p.y);
  const showError = touched && hasAnyInput && validPoints.length < 1;

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
              <Label>{t("field.massUnit")}</Label>
              <div className="flex flex-wrap gap-2">
                {massUnits.map((u) => (
                  <Button
                    key={u}
                    type="button"
                    size="sm"
                    variant={massUnit === u ? "default" : "outline"}
                    onClick={() => setMassUnit(u)}
                  >
                    {u}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("field.posUnit")}</Label>
              <div className="flex flex-wrap gap-2">
                {posUnits.map((u) => (
                  <Button
                    key={u}
                    type="button"
                    size="sm"
                    variant={posUnit === u ? "default" : "outline"}
                    onClick={() => setPosUnit(u)}
                  >
                    {u}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label>{t("field.massPoints")}</Label>
            <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 text-sm font-medium text-zinc-500 px-1">
              <span>{t("field.mass")} ({massUnit})</span>
              <span>{t("field.xPos")} ({posUnit})</span>
              <span>{t("field.yPos")} ({posUnit})</span>
              <span></span>
            </div>
            {points.map((pt, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2">
                <Input
                  type="number"
                  inputMode="decimal"
                  value={pt.mass}
                  placeholder={t("placeholder.mass")}
                  aria-label={`${t("field.mass")} ${idx + 1}`}
                  onChange={(e) => updatePoint(idx, "mass", e.target.value)}
                />
                <Input
                  type="number"
                  inputMode="decimal"
                  value={pt.x}
                  placeholder="x"
                  aria-label={`${t("field.xPos")} ${idx + 1}`}
                  onChange={(e) => updatePoint(idx, "x", e.target.value)}
                />
                <Input
                  type="number"
                  inputMode="decimal"
                  value={pt.y}
                  placeholder="y"
                  aria-label={`${t("field.yPos")} ${idx + 1}`}
                  onChange={(e) => updatePoint(idx, "y", e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={points.length <= 1}
                  onClick={() => removePoint(idx)}
                >
                  {t("button.remove")}
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addPoint}>
              {t("button.addPoint")}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {showError && <p className="text-sm text-red-600">{t("error.invalid")}</p>}

          {result && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-48 font-medium text-zinc-500">{t("result.xcm")}</span>
                  <span className="font-semibold text-zinc-900">{fmt(result.xcm)} {posUnit}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-48 font-medium text-zinc-500">{t("result.ycm")}</span>
                  <span className="font-semibold text-zinc-900">{fmt(result.ycm)} {posUnit}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-48 font-medium text-zinc-500">{t("result.totalMass")}</span>
                  <span className="font-semibold text-zinc-900">{fmt(result.totalMass)} {massUnit}</span>
                </div>
              </div>
              <div className="text-xs text-zinc-500">{t("result.formula")}</div>
            </div>
          )}
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
