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

type OpType = "boolean" | "binary" | "bitwise";

const OP_TYPES: OpType[] = ["boolean", "binary", "bitwise"];

function parseBoolInput(s: string): boolean | null {
  const v = s.trim().toLowerCase();
  if (v === "1" || v === "true") return true;
  if (v === "0" || v === "false") return false;
  return null;
}

function xorBoolean(a: boolean, b: boolean): boolean {
  return a !== b;
}

function xorBinary(a: string, b: string): {
  result: string;
  bitOps: { pos: number; a: string; b: string; r: string }[];
} {
  const maxLen = Math.max(a.length, b.length);
  const pa = a.padStart(maxLen, "0");
  const pb = b.padStart(maxLen, "0");
  const bitOps: { pos: number; a: string; b: string; r: string }[] = [];
  let result = "";
  for (let i = 0; i < maxLen; i++) {
    const ba = pa[i] === "1";
    const bb = pb[i] === "1";
    const br = ba !== bb;
    result += br ? "1" : "0";
    bitOps.push({ pos: i + 1, a: pa[i], b: pb[i], r: br ? "1" : "0" });
  }
  return { result, bitOps };
}

interface BitwiseResult {
  decimal: number;
  binary: string;
  hex: string;
  aBin: string;
  bBin: string;
  rBin: string;
  aVal: number;
  bVal: number;
}

function xorBitwise(a: number, b: number): BitwiseResult {
  const result = a ^ b;
  const maxLen = Math.max(
    (a >>> 0).toString(2).length,
    (b >>> 0).toString(2).length,
    (result >>> 0).toString(2).length
  );
  const aBin = (a >>> 0).toString(2).padStart(maxLen, "0");
  const bBin = (b >>> 0).toString(2).padStart(maxLen, "0");
  const rBin = (result >>> 0).toString(2).padStart(maxLen, "0");
  return {
    decimal: result,
    binary: (result >>> 0).toString(2),
    hex: result.toString(16).toUpperCase(),
    aBin,
    bBin,
    rBin,
    aVal: a,
    bVal: b,
  };
}

export default function XorCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.xor-calculator");

  const [opType, setOpType] = React.useState<OpType>("boolean");
  const [valueA, setValueA] = React.useState("");
  const [valueB, setValueB] = React.useState("");
  const [showTruthTable, setShowTruthTable] = React.useState(false);
  const [showSteps, setShowSteps] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  function reset() {
    setValueA("");
    setValueB("");
    setTouched(false);
  }

  const result = React.useMemo(() => {
    if (!touched) return null;
    const a = valueA.trim();
    const b = valueB.trim();
    if (!a || !b) return null;

    if (opType === "boolean") {
      const ba = parseBoolInput(a);
      const bb = parseBoolInput(b);
      if (ba === null || bb === null) return { error: "invalidBoolean" as const };
      const res = xorBoolean(ba, bb);
      return { type: "boolean" as const, a: ba, b: bb, result: res };
    }

    if (opType === "binary") {
      if (!/^[01]+$/.test(a) || !/^[01]+$/.test(b))
        return { error: "invalidBinary" as const };
      const { result: res, bitOps } = xorBinary(a, b);
      return { type: "binary" as const, a, b, result: res, bitOps };
    }

    // bitwise
    const ia = Number(a);
    const ib = Number(b);
    if (!Number.isInteger(ia) || !Number.isInteger(ib) || isNaN(ia) || isNaN(ib))
      return { error: "invalidDecimal" as const };
    const res = xorBitwise(ia, ib);
    return { type: "bitwise" as const, a: ia, b: ib, result: res };
  }, [touched, opType, valueA, valueB]);

  const placeholder =
    opType === "boolean"
      ? t("field.placeholderBoolean")
      : opType === "binary"
      ? t("field.placeholderBinary")
      : t("field.placeholderDecimal");

  const howtoSteps: string[] = React.useMemo(
    () => (t.raw("howto.steps") as string[] | undefined) ?? [],
    [t]
  );

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems = React.useMemo(
    () =>
      (
        t.raw("examples.items") as
          | { input: string; output: string; note?: string }[]
          | undefined
      ) ?? [],
    [t]
  );

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

  const boolTruthTable = [
    [false, false, false],
    [false, true, true],
    [true, false, true],
    [true, true, false],
  ] as [boolean, boolean, boolean][];

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
          {/* Operation type */}
          <div className="space-y-2">
            <Label>{t("field.operationType")}</Label>
            <div className="flex flex-wrap gap-2">
              {OP_TYPES.map((op) => (
                <Button
                  key={op}
                  type="button"
                  variant={opType === op ? "default" : "outline"}
                  onClick={() => {
                    setOpType(op);
                    setTouched(false);
                  }}
                >
                  {t(`type.${op}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              {t(`type.${opType}_desc` as never)}
            </p>
          </div>

          {/* Inputs */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="xor-a">{t("field.valueA")}</Label>
              <Input
                id="xor-a"
                type={opType === "bitwise" ? "number" : "text"}
                value={valueA}
                placeholder={placeholder}
                onChange={(e) => {
                  setValueA(e.target.value);
                  setTouched(false);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xor-b">{t("field.valueB")}</Label>
              <Input
                id="xor-b"
                type={opType === "bitwise" ? "number" : "text"}
                value={valueB}
                placeholder={placeholder}
                onChange={(e) => {
                  setValueB(e.target.value);
                  setTouched(false);
                }}
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={showTruthTable}
                onChange={(e) => setShowTruthTable(e.target.checked)}
                className="h-4 w-4"
              />
              {t("field.showTruthTable")}
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={showSteps}
                onChange={(e) => setShowSteps(e.target.checked)}
                className="h-4 w-4"
              />
              {t("field.showSteps")}
            </label>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {/* Error */}
          {result && "error" in result && (
            <p className="text-sm text-red-600">
              {t(`error.${result.error}` as never)}
            </p>
          )}

          {/* Result */}
          {result && !("error" in result) && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              {result.type === "boolean" && (
                <div className="text-2xl font-semibold text-zinc-900">
                  {t("result.booleanResult", {
                    a: String(result.a),
                    b: String(result.b),
                    result: String(result.result),
                  })}
                </div>
              )}
              {result.type === "binary" && (
                <div className="text-2xl font-semibold text-zinc-900 font-mono">
                  {t("result.binaryResult", {
                    a: result.a,
                    b: result.b,
                    result: result.result,
                  })}
                </div>
              )}
              {result.type === "bitwise" && (
                <div className="space-y-1">
                  <div className="text-2xl font-semibold text-zinc-900">
                    {t("result.bitwiseResult", {
                      a: String(result.a),
                      b: String(result.b),
                      result: String(result.result.decimal),
                    })}
                  </div>
                  <div className="text-sm text-zinc-600 font-mono space-y-0.5">
                    <div>{t("result.binary")}: {result.result.binary}</div>
                    <div>{t("result.hex")}: {result.result.hex}</div>
                  </div>
                </div>
              )}

              {/* Steps */}
              {showSteps && result.type !== "boolean" && (
                <div className="mt-3 border-t border-zinc-200 pt-3">
                  <div className="text-sm font-medium text-zinc-500 mb-1">
                    {t("steps.heading")}
                  </div>
                  <ol className="text-sm font-mono space-y-1 text-zinc-700">
                    {result.type === "binary" &&
                      result.bitOps.map((op, i) => (
                        <li key={i}>
                          {t("steps.binaryBit", {
                            pos: String(op.pos),
                            a: op.a,
                            b: op.b,
                            result: op.r,
                          })}
                        </li>
                      ))}
                    {result.type === "bitwise" && (
                      <>
                        <li>
                          {t("steps.bitwiseInputA", {
                            value: String(result.result.aVal),
                            binary: result.result.aBin,
                          })}
                        </li>
                        <li>
                          {t("steps.bitwiseInputB", {
                            value: String(result.result.bVal),
                            binary: result.result.bBin,
                          })}
                        </li>
                        <li>
                          {t("steps.bitwiseResult", {
                            binary: result.result.rBin,
                          })}
                        </li>
                      </>
                    )}
                  </ol>
                </div>
              )}
            </div>
          )}

          {/* Truth Table */}
          {showTruthTable && opType === "boolean" && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-zinc-700">
                {t("truthTable.heading")}
              </div>
              <table className="text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50">
                    <th className="px-4 py-2 text-left">{t("truthTable.colA")}</th>
                    <th className="px-4 py-2 text-left">{t("truthTable.colB")}</th>
                    <th className="px-4 py-2 text-left">{t("truthTable.colResult")}</th>
                  </tr>
                </thead>
                <tbody>
                  {boolTruthTable.map(([a, b, r], i) => (
                    <tr key={i} className="border-b border-zinc-100">
                      <td className="px-4 py-2 font-mono">{String(a)}</td>
                      <td className="px-4 py-2 font-mono">{String(b)}</td>
                      <td className="px-4 py-2 font-mono font-semibold">{String(r)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* About */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("about.heading")}
        </h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      {/* Examples */}
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
                  <td className="px-3 py-2 text-zinc-800 font-mono">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900 font-mono">{ex.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* How-to */}
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

      {/* FAQ */}
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
