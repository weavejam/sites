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

type Operator = "lt" | "lte" | "gt" | "gte";

interface FaqItem {
  q: string;
  a: string;
}

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const r = Math.round(n * 1e10) / 1e10;
  return r.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

type InequalityResult =
  | { kind: "noSolution" }
  | { kind: "allReals" }
  | { kind: "bounded"; lower: number; upper: number; strict: boolean }
  | { kind: "unbounded"; lower: number; upper: number; strict: boolean };

function solveInequality(
  a: number,
  b: number,
  op: Operator,
  c: number
): InequalityResult {
  const isLt = op === "lt" || op === "lte";
  const isStrict = op === "lt" || op === "gt";

  if (isLt) {
    // |ax+b| < c  =>  -c < ax+b < c
    if (c < 0) return { kind: "noSolution" };
    if (c === 0 && isStrict) return { kind: "noSolution" };
    // solve: (−c − b)/a < x < (c − b)/a (adjust for sign of a)
    const v1 = (-c - b) / a;
    const v2 = (c - b) / a;
    const lower = Math.min(v1, v2);
    const upper = Math.max(v1, v2);
    return { kind: "bounded", lower, upper, strict: isStrict };
  } else {
    // |ax+b| > c  =>  ax+b > c OR ax+b < -c
    if (c < 0) return { kind: "allReals" };
    if (c === 0 && !isStrict) return { kind: "allReals" };
    const v1 = (-c - b) / a;
    const v2 = (c - b) / a;
    const lower = Math.min(v1, v2);
    const upper = Math.max(v1, v2);
    return { kind: "unbounded", lower, upper, strict: isStrict };
  }
}

const OPERATORS: Operator[] = ["lt", "lte", "gt", "gte"];

export default function AbsoluteValueInequalitiesCalculator(_props: {
  locale: Locale;
}) {
  const t = useTranslations("tool.absolute-value-inequalities-calculator");

  const [aVal, setAVal] = React.useState("");
  const [bVal, setBVal] = React.useState("");
  const [op, setOp] = React.useState<Operator>("lt");
  const [cVal, setCVal] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const aNum = parseFloat(aVal);
  const bNum = parseFloat(bVal);
  const cNum = parseFloat(cVal);

  const aValid = aVal !== "" && Number.isFinite(aNum) && aNum !== 0;
  const bValid = bVal !== "" && Number.isFinite(bNum);
  const cValid = cVal !== "" && Number.isFinite(cNum);

  const result = React.useMemo<InequalityResult | null>(() => {
    if (!aValid || !bValid || !cValid) return null;
    return solveInequality(aNum, bNum, op, cNum);
  }, [aNum, bNum, op, cNum, aValid, bValid, cValid]);

  function reset() {
    setAVal("");
    setBVal("");
    setOp("lt");
    setCVal("");
    setTouched(false);
  }

  const faqItems: FaqItem[] = React.useMemo(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as {
      input: string;
      output: string;
      note: string;
    }[];
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

  const showError = touched && (!aValid || !bValid || !cValid);

  function renderResult(res: InequalityResult) {
    if (res.kind === "noSolution") {
      return (
        <div className="text-lg font-semibold text-zinc-900">
          {t("result.noSolution")}
        </div>
      );
    }
    if (res.kind === "allReals") {
      return (
        <div className="text-lg font-semibold text-zinc-900">
          {t("result.allReals")}
        </div>
      );
    }
    const lop = res.strict ? "<" : "≤";
    const rop = res.strict ? "<" : "≤";
    if (res.kind === "bounded") {
      return (
        <div className="text-2xl font-semibold text-zinc-900">
          {t("result.bounded", {
            lower: formatNum(res.lower),
            upper: formatNum(res.upper),
            lop,
            rop,
          })}
        </div>
      );
    }
    const glop = res.strict ? "<" : "≤";
    const grop = res.strict ? ">" : "≥";
    return (
      <div className="text-2xl font-semibold text-zinc-900">
        {t("result.unbounded", {
          lower: formatNum(res.lower),
          upper: formatNum(res.upper),
          lop: glop,
          rop: grop,
        })}
      </div>
    );
  }

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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="avi-a">{t("field.a")}</Label>
              <Input
                id="avi-a"
                type="number"
                inputMode="decimal"
                value={aVal}
                placeholder={t("placeholder.a")}
                onChange={(e) => {
                  setAVal(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avi-b">{t("field.b")}</Label>
              <Input
                id="avi-b"
                type="number"
                inputMode="decimal"
                value={bVal}
                placeholder={t("placeholder.b")}
                onChange={(e) => {
                  setBVal(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("field.op")}</Label>
              <div className="flex flex-wrap gap-1">
                {OPERATORS.map((o) => (
                  <Button
                    key={o}
                    type="button"
                    size="sm"
                    variant={op === o ? "default" : "outline"}
                    onClick={() => {
                      setOp(o);
                      setTouched(false);
                    }}
                  >
                    {t(`type.${o}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="avi-c">{t("field.c")}</Label>
              <Input
                id="avi-c"
                type="number"
                inputMode="decimal"
                value={cVal}
                placeholder={t("placeholder.c")}
                onChange={(e) => {
                  setCVal(e.target.value);
                  setTouched(true);
                }}
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
            <div className="space-y-1 text-sm text-red-600">
              {!aValid && <p>{t("error.invalidA")}</p>}
              {aValid && !bValid && <p>{t("error.invalidB")}</p>}
              {aValid && bValid && !cValid && <p>{t("error.invalidC")}</p>}
            </div>
          )}

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-1">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              {renderResult(result)}
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
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
