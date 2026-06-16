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

type TheoremType =
  | "inscribed"
  | "central"
  | "semicircle"
  | "cyclic"
  | "tangentChord";

type CalcMode = "findInscribed" | "findCentral" | "findArc" | "findOpposite" | "findTangentChord";

interface TheoremResult {
  value: number;
  label: string;
  explanation: string;
}

function fmtDeg(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * 1e6) / 1e6).toLocaleString("en-US", {
    maximumFractionDigits: 6,
  }) + "°";
}

export default function CircleTheoremsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.circle-theorems-calculator");

  const [theoremType, setTheoremType] =
    React.useState<TheoremType>("inscribed");
  const [calcMode, setCalcMode] = React.useState<CalcMode>("findInscribed");
  const [input1, setInput1] = React.useState("");
  const [input2, setInput2] = React.useState("");
  const [touched, setTouched] = React.useState(false);

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

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  // Modes available per theorem type
  const modesForTheorem: Record<TheoremType, CalcMode[]> = {
    inscribed: ["findInscribed", "findCentral"],
    central: ["findInscribed", "findCentral"],
    semicircle: ["findInscribed"],
    cyclic: ["findOpposite"],
    tangentChord: ["findTangentChord", "findArc"],
  };

  function handleTheoremChange(tt: TheoremType) {
    setTheoremType(tt);
    const modes = modesForTheorem[tt];
    if (!modes.includes(calcMode)) {
      setCalcMode(modes[0]);
    }
    setInput1("");
    setInput2("");
    setTouched(false);
  }

  const result = React.useMemo<TheoremResult | null>(() => {
    if (!touched) return null;
    const v1 = parseFloat(input1);
    const v2 = parseFloat(input2);

    switch (theoremType) {
      case "inscribed":
      case "central": {
        if (!Number.isFinite(v1) || v1 < 0 || v1 > 360)
          return null;
        if (calcMode === "findInscribed") {
          // inscribed = central / 2
          return {
            value: v1 / 2,
            label: t("result.inscribedAngle"),
            explanation: t("result.inscribedFromCentral"),
          };
        } else {
          // central = 2 × inscribed
          return {
            value: v1 * 2,
            label: t("result.centralAngle"),
            explanation: t("result.centralFromInscribed"),
          };
        }
      }
      case "semicircle": {
        // Angle in semicircle is always 90°
        return {
          value: 90,
          label: t("result.semicircleAngle"),
          explanation: t("result.semicircleExplanation"),
        };
      }
      case "cyclic": {
        // Opposite angles in cyclic quadrilateral sum to 180°
        if (!Number.isFinite(v1) || v1 < 0 || v1 > 180) return null;
        return {
          value: 180 - v1,
          label: t("result.oppositeAngle"),
          explanation: t("result.cyclicExplanation"),
        };
      }
      case "tangentChord": {
        if (!Number.isFinite(v1) || v1 < 0 || v1 > 360) return null;
        if (calcMode === "findTangentChord") {
          // tangent-chord angle = arc / 2
          return {
            value: v1 / 2,
            label: t("result.tangentChordAngle"),
            explanation: t("result.tangentChordFromArc"),
          };
        } else {
          // arc = 2 × tangent-chord angle
          return {
            value: v1 * 2,
            label: t("result.arcMeasure"),
            explanation: t("result.arcFromTangentChord"),
          };
        }
      }
    }
  }, [touched, theoremType, calcMode, input1, t]);

  function reset() {
    setInput1("");
    setInput2("");
    setTouched(false);
  }

  function loadExample(
    theorem: TheoremType,
    mode: CalcMode,
    v1: string,
    v2 = ""
  ) {
    setTheoremType(theorem);
    setCalcMode(mode);
    setInput1(v1);
    setInput2(v2);
    setTouched(true);
  }

  const THEOREM_TYPES: TheoremType[] = [
    "inscribed",
    "central",
    "semicircle",
    "cyclic",
    "tangentChord",
  ];

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

  const availableModes = modesForTheorem[theoremType];

  // Determine which input field label to show
  let input1Label = "";

  if (theoremType === "inscribed" || theoremType === "central") {
    input1Label =
      calcMode === "findInscribed"
        ? t("field.centralAngle")
        : t("field.inscribedAngle");
  } else if (theoremType === "semicircle") {
    input1Label = t("field.note");
  } else if (theoremType === "cyclic") {
    input1Label = t("field.knownAngle");
  } else if (theoremType === "tangentChord") {
    input1Label =
      calcMode === "findTangentChord"
        ? t("field.arcMeasure")
        : t("field.tangentChordAngle");
  }

  const needsInput = theoremType !== "semicircle";

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
            <Label>{t("field.theoremType")}</Label>
            <div className="flex flex-wrap gap-2">
              {THEOREM_TYPES.map((tt) => (
                <Button
                  key={tt}
                  type="button"
                  variant={theoremType === tt ? "default" : "outline"}
                  onClick={() => handleTheoremChange(tt)}
                >
                  {t(`theorem.${tt}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              {t(`theorem.${theoremType}_desc` as never)}
            </p>
          </div>

          {availableModes.length > 1 && (
            <div className="space-y-2">
              <Label>{t("field.calcMode")}</Label>
              <div className="flex flex-wrap gap-2">
                {availableModes.map((m) => (
                  <Button
                    key={m}
                    type="button"
                    variant={calcMode === m ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setCalcMode(m);
                      setTouched(false);
                    }}
                  >
                    {t(`mode.${m}` as never)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {needsInput && (
            <div className="space-y-2">
              <Label htmlFor="ct-input1">{input1Label}</Label>
              <Input
                id="ct-input1"
                type="number"
                inputMode="decimal"
                value={input1}
                placeholder={t("placeholder.degrees")}
                onChange={(e) => {
                  setInput1(e.target.value);
                  setTouched(true);
                }}
              />
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

          {touched && result === null && needsInput && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {result.label}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {fmtDeg(result.value)}
              </div>
              <div className="text-sm text-zinc-600">{result.explanation}</div>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-700">
              {t("examples.loadLabel")}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  loadExample("inscribed", "findInscribed", "80")
                }
              >
                {t("examples.loadInscribed")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => loadExample("cyclic", "findOpposite", "110")}
              >
                {t("examples.loadCyclic")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  loadExample("tangentChord", "findTangentChord", "120")
                }
              >
                {t("examples.loadTangent")}
              </Button>
            </div>
          </div>
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
