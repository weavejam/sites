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

interface ParsedInequality {
  type: "simple" | "compound";
  lower?: { value: number; inclusive: boolean };
  upper?: { value: number; inclusive: boolean };
  direction?: "left" | "right";
}

function parseInequality(raw: string): ParsedInequality | null {
  const s = raw.trim().replace(/≤/g, "<=").replace(/≥/g, ">=");

  // Compound: number op var op number  OR  number op var AND var op number
  const compoundMatch = s.match(
    /^(-?[\d.]+)\s*(<=|<|>=|>)\s*[a-zA-Z]+\s*(<=|<|>=|>)\s*(-?[\d.]+)$/
  );
  if (compoundMatch) {
    const [, n1, op1, op2, n2] = compoundMatch;
    let lv = parseFloat(n1);
    let uv = parseFloat(n2);
    if (isNaN(lv) || isNaN(uv)) return null;

    // op1 direction: "<" or "<=" means n1 is lower bound (n1 < x); ">" or ">=" means n1 is upper bound (x < n1)
    const op1IsLower = op1 === "<" || op1 === "<=";
    if (!op1IsLower) {
      // swap so lv is always the lower bound
      [lv, uv] = [uv, lv];
    }
    // After swap: lv = lower bound, uv = upper bound
    const lowerInclusive = op1IsLower ? op1 === "<=" : op2 === "<=";
    const upperInclusive = op1IsLower ? op2 === "<=" : op1 === "<=";
    if (lv >= uv) return null;
    return {
      type: "compound",
      lower: { value: lv, inclusive: lowerInclusive },
      upper: { value: uv, inclusive: upperInclusive },
    };
  }

  // Simple: var op number  OR  number op var
  const simpleVarFirst = s.match(/^[a-zA-Z]+\s*(<=|>=|<|>)\s*(-?[\d.]+)$/);
  if (simpleVarFirst) {
    const [, op, numStr] = simpleVarFirst;
    const v = parseFloat(numStr);
    if (isNaN(v)) return null;
    const inclusive = op === "<=" || op === ">=";
    const direction: "left" | "right" = op === "<" || op === "<=" ? "left" : "right";
    if (direction === "right") {
      return { type: "simple", lower: { value: v, inclusive }, direction: "right" };
    } else {
      return { type: "simple", upper: { value: v, inclusive }, direction: "left" };
    }
  }

  const simpleNumFirst = s.match(/^(-?[\d.]+)\s*(<=|>=|<|>)\s*[a-zA-Z]+$/);
  if (simpleNumFirst) {
    const [, numStr, op] = simpleNumFirst;
    const v = parseFloat(numStr);
    if (isNaN(v)) return null;
    const inclusive = op === "<=" || op === ">=";
    // "5 > x" means x < 5
    const flipped = op === "<" ? ">" : op === ">" ? "<" : op === "<=" ? ">=" : "<=";
    const direction: "left" | "right" = flipped === "<" || flipped === "<=" ? "left" : "right";
    if (direction === "right") {
      return { type: "simple", lower: { value: v, inclusive }, direction: "right" };
    } else {
      return { type: "simple", upper: { value: v, inclusive }, direction: "left" };
    }
  }

  return null;
}

function toIntervalNotation(p: ParsedInequality): string {
  if (p.type === "compound" && p.lower !== undefined && p.upper !== undefined) {
    const lb = p.lower.inclusive ? "[" : "(";
    const rb = p.upper.inclusive ? "]" : ")";
    return `${lb}${p.lower.value}, ${p.upper.value}${rb}`;
  }
  if (p.type === "simple") {
    if (p.direction === "right" && p.lower !== undefined) {
      const lb = p.lower.inclusive ? "[" : "(";
      return `${lb}${p.lower.value}, ∞)`;
    }
    if (p.direction === "left" && p.upper !== undefined) {
      const rb = p.upper.inclusive ? "]" : ")";
      return `(−∞, ${p.upper.value}${rb}`;
    }
  }
  return "";
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function GraphingInequalitiesOnANumberLineCalculator(
  _props: { locale: Locale }
) {
  const t = useTranslations(
    "tool.graphing-inequalities-on-a-number-line-calculator"
  );

  const [inequality, setInequality] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    if (!touched || !inequality.trim()) return null;
    const parsed = parseInequality(inequality);
    if (!parsed) return { error: true };
    return { parsed, interval: toIntervalNotation(parsed) };
  }, [touched, inequality]);

  function describeGraph(p: ParsedInequality): string {
    const openLabel = t("circle.open");
    const closedLabel = t("circle.closed");
    if (p.type === "compound" && p.lower && p.upper) {
      const c1 = p.lower.inclusive ? closedLabel : openLabel;
      const c2 = p.upper.inclusive ? closedLabel : openLabel;
      return t("result.compound", {
        circle1: c1,
        bound1: p.lower.value,
        circle2: c2,
        bound2: p.upper.value,
      });
    }
    if (p.type === "simple") {
      const bound = p.direction === "right" ? p.lower! : p.upper!;
      const circ = bound.inclusive ? closedLabel : openLabel;
      const dir =
        p.direction === "right" ? t("direction.right") : t("direction.left");
      return t("result.simple", { circle1: circ, bound1: bound.value, dir });
    }
    return "";
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

  function loadExample(val: string) {
    setInequality(val);
    setTouched(true);
  }

  function reset() {
    setInequality("");
    setTouched(false);
  }

  const goodResult =
    result && !("error" in result && result.error) ? result : null;

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
            <Label htmlFor="gi-ineq">{t("field.inequality")}</Label>
            <Input
              id="gi-ineq"
              type="text"
              placeholder={t("field.inequalityPlaceholder")}
              value={inequality}
              onChange={(e) => {
                setInequality(e.target.value);
                setTouched(true);
              }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {result && "error" in result && result.error && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {goodResult && goodResult.parsed && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="font-semibold text-zinc-900 text-lg font-mono">
                {goodResult.interval}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.description")}: {describeGraph(goodResult.parsed)}
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("x > 3")}
          >
            {t("examples.loadSimple")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("-1 < x <= 4")}
          >
            {t("examples.loadCompound")}
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
