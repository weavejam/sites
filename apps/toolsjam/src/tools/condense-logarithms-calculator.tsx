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

type Op = "addition" | "subtraction" | "power";
type BaseKey = "base10" | "baseE" | "base2" | "baseCustom";

const OPS: Op[] = ["addition", "subtraction", "power"];
const BASES: BaseKey[] = ["base10", "baseE", "base2", "baseCustom"];

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function baseLabel(b: BaseKey, customValue: string): string {
  switch (b) {
    case "base10":
      return "10";
    case "baseE":
      return "e";
    case "base2":
      return "2";
    case "baseCustom":
      return customValue || "b";
  }
}

function logSymbol(b: BaseKey, customValue: string): string {
  if (b === "baseE") return "ln";
  if (b === "base10") return "log";
  return `log_${baseLabel(b, customValue)}`;
}

export default function CondenseLogarithmsCalculator(_props: {
  locale: Locale;
}) {
  const t = useTranslations("tool.condense-logarithms-calculator");
  const [op, setOp] = React.useState<Op>("addition");
  const [base, setBase] = React.useState<BaseKey>("base10");
  const [customBase, setCustomBase] = React.useState<string>("");
  const [a, setA] = React.useState<string>("");
  const [b, setB] = React.useState<string>("");
  const [k, setK] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const isCustom = base === "baseCustom";
  const customNum = parseFloat(customBase);
  const customValid =
    !isCustom ||
    (customBase !== "" &&
      Number.isFinite(customNum) &&
      customNum > 0 &&
      customNum !== 1);

  const aFilled = a.trim() !== "";
  const bFilled = b.trim() !== "";
  const kFilled = k.trim() !== "";

  const needsB = op === "addition" || op === "subtraction";
  const needsK = op === "power";

  const inputsValid =
    aFilled && (!needsB || bFilled) && (!needsK || kFilled) && customValid;

  const computed = React.useMemo(() => {
    if (!inputsValid) return null;
    const sym = logSymbol(base, customBase);
    const aStr = a.trim();
    const bStr = b.trim();
    const kStr = k.trim();
    let inputExpr = "";
    let outputExpr = "";
    let rule: "ruleAdd" | "ruleSub" | "rulePow" = "ruleAdd";
    if (op === "addition") {
      inputExpr = `${sym}(${aStr}) + ${sym}(${bStr})`;
      outputExpr = `${sym}(${aStr} · ${bStr})`;
      rule = "ruleAdd";
    } else if (op === "subtraction") {
      inputExpr = `${sym}(${aStr}) − ${sym}(${bStr})`;
      outputExpr = `${sym}(${aStr} / ${bStr})`;
      rule = "ruleSub";
    } else {
      inputExpr = `${kStr} · ${sym}(${aStr})`;
      outputExpr = `${sym}(${aStr}^${kStr})`;
      rule = "rulePow";
    }
    return { inputExpr, outputExpr, rule };
  }, [inputsValid, op, base, customBase, a, b, k]);

  function reset() {
    setA("");
    setB("");
    setK("");
    setCustomBase("");
    setTouched(false);
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

  const showError = touched && !inputsValid && (!isCustom || customValid);
  const showCustomError = touched && isCustom && !customValid;

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
            <Label>{t("field.operation")}</Label>
            <div className="flex flex-wrap gap-2">
              {OPS.map((o) => (
                <Button
                  key={o}
                  type="button"
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
            <Label>{t("field.base")}</Label>
            <div className="flex flex-wrap gap-2">
              {BASES.map((bk) => (
                <Button
                  key={bk}
                  type="button"
                  variant={base === bk ? "default" : "outline"}
                  onClick={() => {
                    setBase(bk);
                    setTouched(false);
                  }}
                >
                  {t(`type.${bk}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {isCustom && (
            <div className="space-y-2">
              <Label htmlFor="clc-cb">{t("field.customBase")}</Label>
              <Input
                id="clc-cb"
                type="number"
                inputMode="decimal"
                value={customBase}
                placeholder={t("placeholder.customBase")}
                onChange={(e) => {
                  setCustomBase(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="clc-a">{t("field.first")}</Label>
              <Input
                id="clc-a"
                type="text"
                value={a}
                placeholder={t("placeholder.first")}
                onChange={(e) => {
                  setA(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            {needsB && (
              <div className="space-y-2">
                <Label htmlFor="clc-b">{t("field.second")}</Label>
                <Input
                  id="clc-b"
                  type="text"
                  value={b}
                  placeholder={t("placeholder.second")}
                  onChange={(e) => {
                    setB(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}
            {needsK && (
              <div className="space-y-2">
                <Label htmlFor="clc-k">{t("field.coefficient")}</Label>
                <Input
                  id="clc-k"
                  type="text"
                  value={k}
                  placeholder={t("placeholder.coefficient")}
                  onChange={(e) => {
                    setK(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showCustomError && (
            <p className="text-sm text-red-600">{t("error.customBase")}</p>
          )}
          {showError && !showCustomError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {computed && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-sm text-zinc-700">
                <span className="font-medium">{t("result.input")}:</span>{" "}
                <span className="font-mono">{computed.inputExpr}</span>
              </div>
              <div className="text-lg text-zinc-900">
                <span className="font-medium">{t("result.output")}:</span>{" "}
                <span className="font-mono">{computed.outputExpr}</span>
              </div>
              <div className="text-xs text-zinc-500">
                {t(`result.${computed.rule}` as never)}
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
