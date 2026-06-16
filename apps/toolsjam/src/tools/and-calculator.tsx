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

type OpType = "binary" | "truthTable" | "sequence";

function andBits(bits: number[]): number {
  return bits.reduce((acc, b) => acc & b, 1);
}

function generateTruthTable(n: number): { inputs: number[]; output: number }[] {
  const rows: { inputs: number[]; output: number }[] = [];
  for (let i = 0; i < Math.pow(2, n); i++) {
    const inputs = Array.from({ length: n }, (_, k) =>
      (i >> (n - 1 - k)) & 1
    );
    rows.push({ inputs, output: andBits(inputs) });
  }
  return rows;
}

export default function AndCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.and-calculator");

  const [opType, setOpType] = React.useState<OpType>("binary");
  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("");
  const [c, setC] = React.useState("");
  const [sequence, setSequence] = React.useState("");
  const [numInputs, setNumInputs] = React.useState(2);
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState<React.ReactNode | null>(null);

  function reset() {
    setA(""); setB(""); setC(""); setSequence("");
    setError(""); setResult(null);
  }

  function calculate() {
    setError(""); setResult(null);

    if (opType === "binary") {
      const bits = [a, b, c !== "" ? c : null].filter((v) => v !== null) as string[];
      for (const v of bits) {
        if (v !== "0" && v !== "1") {
          setError(t("error.invalidBit"));
          return;
        }
      }
      const nums = bits.map(Number);
      const out = andBits(nums);
      setResult(
        <div className="space-y-2">
          <div className="text-sm font-medium text-zinc-500">
            {t("result.andResult")}
          </div>
          <div className="text-4xl font-bold text-zinc-900">{out}</div>
          <div className="text-sm text-zinc-500 font-mono">
            {bits.join(` ${t("field.operatorAnd")} `)} = {out}
          </div>
        </div>
      );
    } else if (opType === "truthTable") {
      const n = numInputs;
      const rows = generateTruthTable(n);
      const cols = Array.from({ length: n }, (_, i) =>
        String.fromCharCode(65 + i)
      );
      setResult(
        <div className="space-y-2">
          <div className="text-sm font-medium text-zinc-500">
            {t("result.truthTableHeading")}
          </div>
          <div className="overflow-x-auto">
            <table className="border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  {cols.map((col) => (
                    <th key={col} className="px-4 py-2 font-semibold">
                      {col}
                    </th>
                  ))}
                  <th className="px-4 py-2 font-semibold">
                    {t("result.colOut")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    className={
                      row.output === 1
                        ? "bg-green-50 border-b border-zinc-100"
                        : "border-b border-zinc-100"
                    }
                  >
                    {row.inputs.map((bit, j) => (
                      <td key={j} className="px-4 py-2 text-center font-mono">
                        {bit}
                      </td>
                    ))}
                    <td className="px-4 py-2 text-center font-mono font-bold">
                      {row.output}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      if (!sequence.trim()) {
        setError(t("error.emptySequence"));
        return;
      }
      if (!/^[01]+$/.test(sequence)) {
        setError(t("error.invalidSequence"));
        return;
      }
      const bits = sequence.split("").map(Number);
      const steps: { step: number; value: number; running: number }[] = [];
      let running = bits[0];
      steps.push({ step: 1, value: bits[0], running });
      for (let i = 1; i < bits.length; i++) {
        running = running & bits[i];
        steps.push({ step: i + 1, value: bits[i], running });
      }
      setResult(
        <div className="space-y-2">
          <div className="text-sm font-medium text-zinc-500">
            {t("result.sequenceHeading")}
          </div>
          <div className="overflow-x-auto">
            <table className="border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="px-4 py-2 font-semibold">{t("result.colStep")}</th>
                  <th className="px-4 py-2 font-semibold">{t("result.colValue")}</th>
                  <th className="px-4 py-2 font-semibold">{t("result.colRunning")}</th>
                </tr>
              </thead>
              <tbody>
                {steps.map((s, i) => (
                  <tr key={i} className="border-b border-zinc-100">
                    <td className="px-4 py-2 text-center">{s.step}</td>
                    <td className="px-4 py-2 text-center font-mono">{s.value}</td>
                    <td className="px-4 py-2 text-center font-mono font-bold">
                      {s.running}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note: string }[]
      | undefined;
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

  const OP_TYPES: OpType[] = ["binary", "truthTable", "sequence"];

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
            <Label>{t("field.operationType")}</Label>
            <div className="flex flex-wrap gap-2">
              {OP_TYPES.map((op) => (
                <Button
                  key={op}
                  type="button"
                  variant={opType === op ? "default" : "outline"}
                  onClick={() => {
                    setOpType(op);
                    reset();
                  }}
                >
                  {t(`type.${op}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {opType === "binary" && (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="and-a">{t("field.inputA")}</Label>
                <Input
                  id="and-a"
                  type="number"
                  inputMode="numeric"
                  placeholder={t("field.placeholder")}
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="and-b">{t("field.inputB")}</Label>
                <Input
                  id="and-b"
                  type="number"
                  inputMode="numeric"
                  placeholder={t("field.placeholder")}
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="and-c">{t("field.inputC")}</Label>
                <Input
                  id="and-c"
                  type="number"
                  inputMode="numeric"
                  placeholder={t("field.placeholder")}
                  value={c}
                  onChange={(e) => setC(e.target.value)}
                />
              </div>
            </div>
          )}

          {opType === "truthTable" && (
            <div className="space-y-2">
              <Label>{t("field.numInputs")}</Label>
              <div className="flex gap-2">
                {[2, 3, 4].map((n) => (
                  <Button
                    key={n}
                    type="button"
                    variant={numInputs === n ? "default" : "outline"}
                    onClick={() => { setNumInputs(n); setResult(null); }}
                  >
                    {n}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {opType === "sequence" && (
            <div className="space-y-2">
              <Label htmlFor="and-seq">{t("field.sequence")}</Label>
              <Input
                id="and-seq"
                type="text"
                placeholder={t("field.sequencePlaceholder")}
                value={sequence}
                onChange={(e) => setSequence(e.target.value)}
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={calculate}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              {result}
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
                  <td className="px-3 py-2 font-mono text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{ex.output}</td>
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
