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

type Config = "aas" | "asa" | "ssa";
const CONFIGS: Config[] = ["aas", "asa", "ssa"];

function fmt(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals)).toFixed(decimals);
}

function triangleTypeKey(a: number, b: number, c: number): "acute" | "right" | "obtuse" {
  const angles = [a, b, c].sort((x, y) => x - y);
  if (Math.abs(angles[2] - 90) < 0.001) return "right";
  return angles[2] > 90 ? "obtuse" : "acute";
}

interface TriangleSolution {
  a: number;
  b: number;
  c: number;
  A: number;
  B: number;
  C: number;
}

export default function LawOfSinesCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.law-of-sines-calculator");

  const [config, setConfig] = React.useState<Config | "">("");
  const [sideA, setSideA] = React.useState("");
  const [sideB, setSideB] = React.useState("");
  const [sideC, setSideC] = React.useState("");
  const [angleA, setAngleA] = React.useState("");
  const [angleB, setAngleB] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const an = parseFloat(sideA);
  const bn = parseFloat(sideB);
  const cn = parseFloat(sideC);
  const An = parseFloat(angleA);
  const Bn = parseFloat(angleB);

  type SolveResult =
    | { ok: true; solutions: TriangleSolution[] }
    | { ok: false; errorKey: string };

  const solveResult = React.useMemo<SolveResult>(() => {
    if (!config) return { ok: false, errorKey: "error.selectConfig" };

    if (config === "aas") {
      if (
        !sideA ||
        !angleA ||
        !angleB ||
        !Number.isFinite(an) ||
        !Number.isFinite(An) ||
        !Number.isFinite(Bn) ||
        an <= 0 ||
        An <= 0 ||
        Bn <= 0
      )
        return { ok: false, errorKey: "error.invalid" };
      if (An + Bn >= 180)
        return { ok: false, errorKey: "error.invalidAngle" };
      const Cn = 180 - An - Bn;
      const AnR = (An * Math.PI) / 180;
      const BnR = (Bn * Math.PI) / 180;
      const CnR = (Cn * Math.PI) / 180;
      const bn_ = (an * Math.sin(BnR)) / Math.sin(AnR);
      const cn_ = (an * Math.sin(CnR)) / Math.sin(AnR);
      return {
        ok: true,
        solutions: [{ a: an, b: bn_, c: cn_, A: An, B: Bn, C: Cn }],
      };
    }

    if (config === "asa") {
      // Given: angleA, sideC (included side between A and B), angleB
      if (
        !angleA ||
        !sideC ||
        !angleB ||
        !Number.isFinite(An) ||
        !Number.isFinite(cn) ||
        !Number.isFinite(Bn) ||
        An <= 0 ||
        cn <= 0 ||
        Bn <= 0
      )
        return { ok: false, errorKey: "error.invalid" };
      if (An + Bn >= 180)
        return { ok: false, errorKey: "error.invalidAngle" };
      const Cn = 180 - An - Bn;
      const AnR = (An * Math.PI) / 180;
      const BnR = (Bn * Math.PI) / 180;
      const CnR = (Cn * Math.PI) / 180;
      const an_ = (cn * Math.sin(AnR)) / Math.sin(CnR);
      const bn_ = (cn * Math.sin(BnR)) / Math.sin(CnR);
      return {
        ok: true,
        solutions: [{ a: an_, b: bn_, c: cn, A: An, B: Bn, C: Cn }],
      };
    }

    // SSA: given sideA (opposite to angleA), sideB (adjacent), angleA
    if (
      !sideA ||
      !sideB ||
      !angleA ||
      !Number.isFinite(an) ||
      !Number.isFinite(bn) ||
      !Number.isFinite(An) ||
      an <= 0 ||
      bn <= 0 ||
      An <= 0
    )
      return { ok: false, errorKey: "error.invalid" };
    if (An >= 180) return { ok: false, errorKey: "error.invalidAngle" };

    const AnR = (An * Math.PI) / 180;
    const sinB = (bn * Math.sin(AnR)) / an;
    if (sinB > 1) return { ok: false, errorKey: "error.noSolution" };

    const B1 = (Math.asin(sinB) * 180) / Math.PI;
    const B2 = 180 - B1;
    const solutions: TriangleSolution[] = [];

    const addSol = (B: number) => {
      const C = 180 - An - B;
      if (C <= 0) return;
      const AnR2 = (An * Math.PI) / 180;
      const BnR2 = (B * Math.PI) / 180;
      const CnR2 = (C * Math.PI) / 180;
      const cn_ = (an * Math.sin(CnR2)) / Math.sin(AnR2);
      void BnR2;
      solutions.push({ a: an, b: bn, c: cn_, A: An, B, C });
    };

    addSol(B1);
    if (An < 90 && B2 < 180 - An) addSol(B2);

    if (solutions.length === 0)
      return { ok: false, errorKey: "error.noSolution" };
    return { ok: true, solutions };
  }, [config, sideA, sideB, sideC, angleA, angleB, an, bn, cn, An, Bn]);

  function reset() {
    setConfig("");
    setSideA("");
    setSideB("");
    setSideC("");
    setAngleA("");
    setAngleB("");
    setTouched(false);
  }

  function loadExample(
    cfg: Config,
    a: string,
    b: string,
    c: string,
    A: string,
    B: string
  ) {
    setConfig(cfg);
    setSideA(a);
    setSideB(b);
    setSideC(c);
    setAngleA(A);
    setAngleB(B);
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
    const raw = t.raw("faq.items") as
      | { q: string; a: string }[]
      | undefined;
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

  const showError = touched && !solveResult.ok;
  const solutions = solveResult.ok ? solveResult.solutions : [];

  function SolutionPanel({
    sol,
    label,
  }: {
    sol: TriangleSolution;
    label?: string;
  }) {
    const typeKey = triangleTypeKey(sol.A, sol.B, sol.C);
    return (
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
        {label && (
          <div className="font-medium text-zinc-700">{label}</div>
        )}
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <span className="text-zinc-500">{t("result.sideA")}:</span>{" "}
            <span className="font-semibold">{fmt(sol.a)}</span>
          </div>
          <div>
            <span className="text-zinc-500">{t("result.sideB")}:</span>{" "}
            <span className="font-semibold">{fmt(sol.b)}</span>
          </div>
          <div>
            <span className="text-zinc-500">{t("result.sideC")}:</span>{" "}
            <span className="font-semibold">{fmt(sol.c)}</span>
          </div>
          <div>
            <span className="text-zinc-500">{t("result.angleA")}:</span>{" "}
            <span className="font-semibold">{fmt(sol.A)}°</span>
          </div>
          <div>
            <span className="text-zinc-500">{t("result.angleB")}:</span>{" "}
            <span className="font-semibold">{fmt(sol.B)}°</span>
          </div>
          <div>
            <span className="text-zinc-500">{t("result.angleC")}:</span>{" "}
            <span className="font-semibold">{fmt(sol.C)}°</span>
          </div>
        </div>
        <div className="text-xs text-zinc-400">{t(`triangleType.${typeKey}` as never)}</div>
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
          <div className="space-y-2">
            <Label>{t("field.configuration")}</Label>
            <div className="flex flex-wrap gap-2">
              {CONFIGS.map((cfg) => (
                <Button
                  key={cfg}
                  type="button"
                  variant={config === cfg ? "default" : "outline"}
                  onClick={() => {
                    setConfig(cfg);
                    setTouched(false);
                  }}
                >
                  {t(`type.${cfg}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {config === "aas" && (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="los-aas-A">{t("field.angleA")}</Label>
                <Input
                  id="los-aas-A"
                  type="number"
                  inputMode="decimal"
                  value={angleA}
                  placeholder={t("placeholder.angle")}
                  onChange={(e) => {
                    setAngleA(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="los-aas-B">{t("field.angleB")}</Label>
                <Input
                  id="los-aas-B"
                  type="number"
                  inputMode="decimal"
                  value={angleB}
                  placeholder={t("placeholder.angle")}
                  onChange={(e) => {
                    setAngleB(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="los-aas-a">{t("field.sideA")}</Label>
                <Input
                  id="los-aas-a"
                  type="number"
                  inputMode="decimal"
                  value={sideA}
                  placeholder={t("placeholder.side")}
                  onChange={(e) => {
                    setSideA(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            </div>
          )}

          {config === "asa" && (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="los-asa-A">{t("field.angleA")}</Label>
                <Input
                  id="los-asa-A"
                  type="number"
                  inputMode="decimal"
                  value={angleA}
                  placeholder={t("placeholder.angle")}
                  onChange={(e) => {
                    setAngleA(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="los-asa-c">{t("field.sideC")}</Label>
                <Input
                  id="los-asa-c"
                  type="number"
                  inputMode="decimal"
                  value={sideC}
                  placeholder={t("placeholder.side")}
                  onChange={(e) => {
                    setSideC(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="los-asa-B">{t("field.angleB")}</Label>
                <Input
                  id="los-asa-B"
                  type="number"
                  inputMode="decimal"
                  value={angleB}
                  placeholder={t("placeholder.angle")}
                  onChange={(e) => {
                    setAngleB(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            </div>
          )}

          {config === "ssa" && (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="los-ssa-a">{t("field.sideA")}</Label>
                <Input
                  id="los-ssa-a"
                  type="number"
                  inputMode="decimal"
                  value={sideA}
                  placeholder={t("placeholder.side")}
                  onChange={(e) => {
                    setSideA(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="los-ssa-b">{t("field.sideB")}</Label>
                <Input
                  id="los-ssa-b"
                  type="number"
                  inputMode="decimal"
                  value={sideB}
                  placeholder={t("placeholder.side")}
                  onChange={(e) => {
                    setSideB(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="los-ssa-A">{t("field.angleA")}</Label>
                <Input
                  id="los-ssa-A"
                  type="number"
                  inputMode="decimal"
                  value={angleA}
                  placeholder={t("placeholder.angle")}
                  onChange={(e) => {
                    setAngleA(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
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
            <p className="text-sm text-red-600">
              {t(
                (solveResult as { ok: false; errorKey: string })
                  .errorKey as never
              )}
            </p>
          )}

          {solutions.length > 0 && (
            <div className="space-y-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              {solutions.length === 1 ? (
                <SolutionPanel sol={solutions[0]} />
              ) : (
                <>
                  <p className="text-sm text-amber-600">
                    {t("result.ambiguousNote")}
                  </p>
                  <SolutionPanel
                    sol={solutions[0]}
                    label={t("result.solution1")}
                  />
                  <SolutionPanel
                    sol={solutions[1]}
                    label={t("result.solution2")}
                  />
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

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
            onClick={() => loadExample("aas", "10", "", "", "45", "60")}
          >
            {t("examples.loadAAS")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("asa", "", "", "12", "30", "50")}
          >
            {t("examples.loadASA")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("ssa", "8", "10", "", "40", "")}
          >
            {t("examples.loadSSA")}
          </Button>
        </div>
      </section>

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
