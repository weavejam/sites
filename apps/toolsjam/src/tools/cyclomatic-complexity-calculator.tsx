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

type Method = "graph" | "decision";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function CyclomaticComplexityCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.cyclomatic-complexity-calculator");

  const [method, setMethod] = React.useState<Method>("graph");

  // graph method inputs
  const [edges, setEdges] = React.useState<string>("");
  const [nodes, setNodes] = React.useState<string>("");
  const [components, setComponents] = React.useState<string>("1");

  // decision method input
  const [decisions, setDecisions] = React.useState<string>("");

  const [touched, setTouched] = React.useState(false);

  const E = parseInt(edges, 10);
  const N = parseInt(nodes, 10);
  const P = parseInt(components, 10);
  const D = parseInt(decisions, 10);

  const isGraphValid =
    method === "graph" &&
    edges !== "" && Number.isInteger(E) && E >= 0 &&
    nodes !== "" && Number.isInteger(N) && N >= 1 &&
    components !== "" && Number.isInteger(P) && P >= 1;

  const isDecisionValid =
    method === "decision" &&
    decisions !== "" && Number.isInteger(D) && D >= 0;

  const result = React.useMemo(() => {
    if (method === "graph" && isGraphValid) {
      return E - N + 2 * P;
    }
    if (method === "decision" && isDecisionValid) {
      return D + 1;
    }
    return null;
  }, [method, isGraphValid, isDecisionValid, E, N, P, D]);

  function getRiskLabel(m: number): string {
    if (m <= 4) return t("risk.low");
    if (m <= 7) return t("risk.moderate");
    if (m <= 10) return t("risk.high");
    return t("risk.veryHigh");
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

  function reset() {
    setEdges("");
    setNodes("");
    setComponents("1");
    setDecisions("");
    setTouched(false);
  }

  const showError =
    touched &&
    ((method === "graph" && !isGraphValid) ||
      (method === "decision" && !isDecisionValid));

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
              {(["graph", "decision"] as Method[]).map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={method === m ? "default" : "outline"}
                  onClick={() => {
                    setMethod(m);
                    setTouched(false);
                  }}
                >
                  {t(`type.${m}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              {t(`type.${method}_desc` as never)}
            </p>
          </div>

          {method === "graph" ? (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="cc-edges">{t("field.edges")}</Label>
                <Input
                  id="cc-edges"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="1"
                  value={edges}
                  placeholder={t("placeholder.integer")}
                  onChange={(e) => { setEdges(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cc-nodes">{t("field.nodes")}</Label>
                <Input
                  id="cc-nodes"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  step="1"
                  value={nodes}
                  placeholder={t("placeholder.integer")}
                  onChange={(e) => { setNodes(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cc-comp">{t("field.components")}</Label>
                <Input
                  id="cc-comp"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  step="1"
                  value={components}
                  placeholder="1"
                  onChange={(e) => { setComponents(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="cc-decisions">{t("field.decisions")}</Label>
              <Input
                id="cc-decisions"
                type="number"
                inputMode="numeric"
                min="0"
                step="1"
                value={decisions}
                placeholder={t("placeholder.integer")}
                onChange={(e) => { setDecisions(e.target.value); setTouched(true); }}
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-3xl font-semibold text-zinc-900">
                M = {result}
              </div>
              <div className="text-sm text-zinc-700">
                {t("result.risk")}: <span className="font-medium">{getRiskLabel(result)}</span>
              </div>
              <div className="text-xs text-zinc-500">
                {method === "graph" ? t("formula.graph") : t("formula.decision")}
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
