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

type Method = "twoPoints" | "equation";

interface SlopeResult {
  slope: number | null; // null = undefined (vertical line)
  isUndefined: boolean;
  angleRad: number | null;
  angleDeg: number | null;
  distance: number | null;
  equation: string | null;
}

// Parse y = mx + b form (and variants like y=2x, y=-x+3, y=5, etc.)
function parseLineEquation(eq: string): number | null {
  const s = eq.replace(/\s+/g, "").toLowerCase();
  // Must start with "y="
  const match = s.match(/^y=(.+)$/);
  if (!match) return null;
  const rhs = match[1];

  // Try to extract m from mx+b, mx-b, mx, -mx, x, -x forms
  // Pattern: optional coefficient, x, optional constant
  const mxbMatch = rhs.match(/^([+-]?[\d.]*)?x([+-][\d.]+)?$/);
  if (mxbMatch) {
    const mStr = mxbMatch[1];
    if (mStr === undefined || mStr === "" || mStr === "+") return 1;
    if (mStr === "-") return -1;
    const m = parseFloat(mStr);
    return Number.isFinite(m) ? m : null;
  }

  // y = b (constant, slope = 0)
  const constMatch = rhs.match(/^([+-]?[\d.]+)$/);
  if (constMatch) return 0;

  return null;
}

function calcSlopeFromPoints(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): SlopeResult {
  const dx = x2 - x1;
  const dy = y2 - y1;

  if (dx === 0) {
    return {
      slope: null,
      isUndefined: true,
      angleRad: Math.PI / 2,
      angleDeg: 90,
      distance: Math.abs(dy),
      equation: null,
    };
  }

  const m = dy / dx;
  const b = y1 - m * x1;
  const angleRad = Math.atan(m);
  const angleDeg = (angleRad * 180) / Math.PI;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const bStr =
    b === 0
      ? ""
      : b > 0
      ? ` + ${fmt(b)}`
      : ` - ${fmt(Math.abs(b))}`;
  const mStr = m === 1 ? "" : m === -1 ? "-" : `${fmt(m)}`;
  const equation = `y = ${mStr}x${bStr}`;

  return { slope: m, isUndefined: false, angleRad, angleDeg, distance, equation };
}

function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  const r = Math.round(n * 1e8) / 1e8;
  return r.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export default function SlopeCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.slope-calculator");

  const [method, setMethod] = React.useState<Method>("twoPoints");
  const [x1, setX1] = React.useState<string>("");
  const [y1, setY1] = React.useState<string>("");
  const [x2, setX2] = React.useState<string>("");
  const [y2, setY2] = React.useState<string>("");
  const [equation, setEquation] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  function reset() {
    setX1(""); setY1(""); setX2(""); setY2(""); setEquation("");
    setTouched(false);
  }

  const result = React.useMemo<SlopeResult | null>(() => {
    if (!touched) return null;
    if (method === "twoPoints") {
      const nums = [x1, y1, x2, y2].map(parseFloat);
      if (nums.some((n) => !Number.isFinite(n))) return null;
      return calcSlopeFromPoints(nums[0], nums[1], nums[2], nums[3]);
    } else {
      const m = parseLineEquation(equation);
      if (m === null) return null;
      const b = 0; // equation slope only
      const angleRad = Math.atan(m);
      const angleDeg = (angleRad * 180) / Math.PI;
      return {
        slope: m,
        isUndefined: false,
        angleRad,
        angleDeg,
        distance: null,
        equation: equation.trim(),
      };
    }
  }, [method, x1, y1, x2, y2, equation, touched]);

  function loadTwoPoints(lx1: string, ly1: string, lx2: string, ly2: string) {
    setMethod("twoPoints");
    setX1(lx1); setY1(ly1); setX2(lx2); setY2(ly2);
    setEquation("");
    setTouched(true);
  }

  function loadEquation(eq: string) {
    setMethod("equation");
    setEquation(eq);
    setX1(""); setY1(""); setX2(""); setY2("");
    setTouched(true);
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

  const showError = touched && result === null;

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
            <Label>{t("field.method")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["twoPoints", "equation"] as Method[]).map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={method === m ? "default" : "outline"}
                  onClick={() => { setMethod(m); setTouched(false); }}
                >
                  {t(`method.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {method === "twoPoints" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>{t("field.point1")}</Label>
                <div className="flex gap-2">
                  <div className="space-y-1 flex-1">
                    <Label htmlFor="sl-x1" className="text-xs text-zinc-500">{t("field.x1")}</Label>
                    <Input
                      id="sl-x1"
                      type="number"
                      inputMode="decimal"
                      value={x1}
                      placeholder={t("field.x1")}
                      onChange={(e) => { setX1(e.target.value); setTouched(true); }}
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <Label htmlFor="sl-y1" className="text-xs text-zinc-500">{t("field.y1")}</Label>
                    <Input
                      id="sl-y1"
                      type="number"
                      inputMode="decimal"
                      value={y1}
                      placeholder={t("field.y1")}
                      onChange={(e) => { setY1(e.target.value); setTouched(true); }}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t("field.point2")}</Label>
                <div className="flex gap-2">
                  <div className="space-y-1 flex-1">
                    <Label htmlFor="sl-x2" className="text-xs text-zinc-500">{t("field.x2")}</Label>
                    <Input
                      id="sl-x2"
                      type="number"
                      inputMode="decimal"
                      value={x2}
                      placeholder={t("field.x2")}
                      onChange={(e) => { setX2(e.target.value); setTouched(true); }}
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <Label htmlFor="sl-y2" className="text-xs text-zinc-500">{t("field.y2")}</Label>
                    <Input
                      id="sl-y2"
                      type="number"
                      inputMode="decimal"
                      value={y2}
                      placeholder={t("field.y2")}
                      onChange={(e) => { setY2(e.target.value); setTouched(true); }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {method === "equation" && (
            <div className="space-y-2">
              <Label htmlFor="sl-eq">{t("field.equation")}</Label>
              <Input
                id="sl-eq"
                type="text"
                value={equation}
                placeholder={t("placeholder.equation")}
                onChange={(e) => { setEquation(e.target.value); setTouched(true); }}
              />
              <p className="text-xs text-zinc-500">{t("field.equationHint")}</p>
            </div>
          )}

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

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {result.isUndefined
                  ? t("result.undefinedSlope")
                  : t("result.slope", { m: fmt(result.slope!) })}
              </div>
              <div className="grid gap-2 sm:grid-cols-2 text-sm">
                {result.angleDeg !== null && (
                  <div>
                    <span className="text-zinc-500">{t("result.angle")}: </span>
                    <span className="font-semibold">
                      {fmt(result.angleDeg)}° ({fmt(result.angleRad!)} {t("unit.radians")})
                    </span>
                  </div>
                )}
                {result.distance !== null && (
                  <div>
                    <span className="text-zinc-500">{t("result.distance")}: </span>
                    <span className="font-semibold">{fmt(result.distance)}</span>
                  </div>
                )}
                {result.equation !== null && !result.isUndefined && method === "twoPoints" && (
                  <div className="sm:col-span-2">
                    <span className="text-zinc-500">{t("result.lineEquation")}: </span>
                    <span className="font-semibold font-mono">{result.equation}</span>
                  </div>
                )}
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colInput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colOutput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colNote")}
                </th>
              </tr>
            </thead>
            <tbody>
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {ex.output}
                  </td>
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
            onClick={() => loadTwoPoints("2", "3", "5", "9")}
          >
            {t("examples.loadPositive")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadTwoPoints("-1", "5", "3", "1")}
          >
            {t("examples.loadNegative")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadEquation("y = -2.5x + 7")}
          >
            {t("examples.loadEquation")}
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
