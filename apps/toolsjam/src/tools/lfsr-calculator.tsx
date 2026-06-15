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

type LfsrType = "fibonacci" | "galois";

interface LfsrResult {
  outputBits: number[];
  states: string[];
  period: number;
  isMaximal: boolean;
}

function runFibonacciLfsr(
  seed: number[],
  taps: number[],
  iterations: number
): LfsrResult {
  const n = seed.length;
  const register = [...seed];
  const outputBits: number[] = [];
  const states: string[] = [register.join("")];
  const seenStates = new Map<string, number>();
  seenStates.set(register.join(""), 0);
  let period = 0;

  for (let i = 0; i < iterations; i++) {
    // Output bit is the last element
    const out = register[n - 1];
    outputBits.push(out);

    // Compute feedback: XOR of tap positions (1-indexed, from left)
    let feedback = 0;
    for (const tap of taps) {
      feedback ^= register[tap - 1];
    }

    // Shift right, insert feedback at position 0
    for (let j = n - 1; j > 0; j--) {
      register[j] = register[j - 1];
    }
    register[0] = feedback;

    const stateStr = register.join("");
    states.push(stateStr);

    if (period === 0 && seenStates.has(stateStr)) {
      period = i + 1 - (seenStates.get(stateStr) ?? 0);
    }
    if (!seenStates.has(stateStr)) {
      seenStates.set(stateStr, i + 1);
    }
  }

  if (period === 0) period = iterations;
  const maxPeriod = Math.pow(2, n) - 1;
  const isMaximal = period === maxPeriod;

  return { outputBits, states, period, isMaximal };
}

function runGaloisLfsr(
  seed: number[],
  taps: number[],
  iterations: number
): LfsrResult {
  const n = seed.length;
  const register = [...seed];
  const outputBits: number[] = [];
  const states: string[] = [register.join("")];
  const seenStates = new Map<string, number>();
  seenStates.set(register.join(""), 0);
  let period = 0;

  for (let i = 0; i < iterations; i++) {
    const out = register[n - 1];
    outputBits.push(out);

    const feedback = register[n - 1];

    // Shift right
    for (let j = n - 1; j > 0; j--) {
      register[j] = register[j - 1];
    }
    register[0] = feedback;

    // XOR feedback into tap positions (excluding position n which is the input)
    for (const tap of taps) {
      if (tap < n) {
        register[tap - 1] ^= feedback;
      }
    }

    const stateStr = register.join("");
    states.push(stateStr);

    if (period === 0 && seenStates.has(stateStr)) {
      period = i + 1 - (seenStates.get(stateStr) ?? 0);
    }
    if (!seenStates.has(stateStr)) {
      seenStates.set(stateStr, i + 1);
    }
  }

  if (period === 0) period = iterations;
  const maxPeriod = Math.pow(2, n) - 1;
  const isMaximal = period === maxPeriod;

  return { outputBits, states, period, isMaximal };
}

function parseSeed(input: string): number[] | null {
  if (!/^[01]+$/.test(input.trim())) return null;
  return input.trim().split("").map(Number);
}

function parseTaps(input: string, n: number): number[] | null {
  const parts = input.split(/[\s,]+/).filter((s) => s.trim().length > 0);
  const taps = parts.map((s) => Number(s));
  if (taps.some((t) => !Number.isInteger(t) || t < 1 || t > n)) return null;
  if (taps.length === 0) return null;
  return taps;
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

const LFSR_TYPES: LfsrType[] = ["fibonacci", "galois"];

export default function LfsrCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.lfsr-calculator");
  const [registerLength, setRegisterLength] = React.useState("4");
  const [seed, setSeed] = React.useState("1000");
  const [taps, setTaps] = React.useState("4, 3");
  const [lfsrType, setLfsrType] = React.useState<LfsrType>("fibonacci");
  const [iterations, setIterations] = React.useState("15");
  const [touched, setTouched] = React.useState(false);

  const n = parseInt(registerLength, 10);
  const seedArr = parseSeed(seed);
  const tapsArr = seedArr ? parseTaps(taps, n) : null;
  const iterNum = parseInt(iterations, 10);

  const isValid =
    Number.isInteger(n) &&
    n >= 2 &&
    seedArr !== null &&
    seedArr.length === n &&
    tapsArr !== null &&
    Number.isInteger(iterNum) &&
    iterNum > 0;

  const result = React.useMemo<LfsrResult | null>(() => {
    if (!isValid || !seedArr || !tapsArr) return null;
    const iters = Math.min(iterNum, 1000);
    if (lfsrType === "galois") {
      return runGaloisLfsr(seedArr, tapsArr, iters);
    }
    return runFibonacciLfsr(seedArr, tapsArr, iters);
  }, [isValid, seedArr, tapsArr, lfsrType, iterNum]);

  function reset() {
    setRegisterLength("4");
    setSeed("1000");
    setTaps("4, 3");
    setLfsrType("fibonacci");
    setIterations("15");
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

  const showError = touched && !isValid;
  const displayStates = result ? result.states.slice(0, Math.min(result.states.length, 20)) : [];

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="lfsr-length">{t("field.registerLength")}</Label>
              <Input
                id="lfsr-length"
                type="number"
                inputMode="numeric"
                value={registerLength}
                placeholder={t("placeholder.registerLength")}
                onChange={(e) => {
                  setRegisterLength(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lfsr-seed">{t("field.seed")}</Label>
              <Input
                id="lfsr-seed"
                type="text"
                value={seed}
                placeholder={t("placeholder.seed")}
                onChange={(e) => {
                  setSeed(e.target.value);
                  setTouched(true);
                }}
              />
              <p className="text-xs text-zinc-500">{t("field.seedHint")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lfsr-taps">{t("field.taps")}</Label>
              <Input
                id="lfsr-taps"
                type="text"
                value={taps}
                placeholder={t("placeholder.taps")}
                onChange={(e) => {
                  setTaps(e.target.value);
                  setTouched(true);
                }}
              />
              <p className="text-xs text-zinc-500">{t("field.tapsHint")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lfsr-iterations">{t("field.iterations")}</Label>
              <Input
                id="lfsr-iterations"
                type="number"
                inputMode="numeric"
                value={iterations}
                placeholder={t("placeholder.iterations")}
                onChange={(e) => {
                  setIterations(e.target.value);
                  setTouched(true);
                }}
              />
              <p className="text-xs text-zinc-500">{t("field.iterationsHint")}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.type")}</Label>
            <div className="flex flex-wrap gap-2">
              {LFSR_TYPES.map((lt) => (
                <Button
                  key={lt}
                  type="button"
                  variant={lfsrType === lt ? "default" : "outline"}
                  onClick={() => {
                    setLfsrType(lt);
                    setTouched(false);
                  }}
                >
                  {t(`type.${lt}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.generate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalidSeed")}</p>
          )}

          {result !== null && !showError && (
            <div className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-zinc-700">
                    {t("result.outputBit")}:
                  </span>{" "}
                  <code className="rounded bg-zinc-100 px-1 font-mono">
                    {result.outputBits.join("")}
                  </code>
                </div>
                <div>
                  <span className="font-medium text-zinc-700">
                    {t("result.period")}:
                  </span>{" "}
                  {result.period}
                </div>
                <div>
                  <span className="font-medium text-zinc-700">
                    {t("result.isMaximal")}:
                  </span>{" "}
                  {result.isMaximal ? t("result.yes") : t("result.no")}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-zinc-700">
                  {t("result.states")}:
                </div>
                <div className="max-h-48 overflow-y-auto rounded border border-zinc-200 bg-white p-2">
                  {displayStates.map((s, i) => (
                    <div key={i} className="font-mono text-xs text-zinc-700">
                      {i}: {s}
                    </div>
                  ))}
                  {result.states.length > 20 && (
                    <div className="text-xs text-zinc-500">
                      … {result.states.length - 20} {t("result.moreStates")}
                    </div>
                  )}
                </div>
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
