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

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface LogRankResult {
  chiSquared: number;
  pValue: number;
  O1: number;
  E1: number;
  O2: number;
  E2: number;
  n: number;
}

function parseNumbers(text: string): number[] {
  return text
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map((s) => parseFloat(s))
    .filter((n) => Number.isFinite(n));
}

// Error function approximation
function erf(x: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const p = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const r = 1 - p * Math.exp(-x * x);
  return x >= 0 ? r : -r;
}

function normalCDF(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

// Chi-squared p-value (1 df) via normal approximation
function chiSquaredPValue1df(x: number): number {
  if (x <= 0) return 1;
  // P(chi2(1) > x) = P(|Z| > sqrt(x)) = 2*(1 - Phi(sqrt(x)))
  return 2 * (1 - normalCDF(Math.sqrt(x)));
}

interface SurvObs {
  time: number;
  event: number; // 1 = event, 0 = censored
}

function computeLogRank(
  group1: SurvObs[],
  group2: SurvObs[]
): LogRankResult | null {
  if (group1.length < 1 || group2.length < 1) return null;

  // Collect all unique event times
  const eventTimes = new Set<number>();
  for (const obs of [...group1, ...group2]) {
    if (obs.event === 1) eventTimes.add(obs.time);
  }

  if (eventTimes.size === 0) return null;

  const sortedTimes = [...eventTimes].sort((a, b) => a - b);

  let O1 = 0, E1 = 0, O2 = 0, E2 = 0;
  let V = 0;

  for (const t of sortedTimes) {
    // At-risk counts (subjects with time >= t)
    const n1t = group1.filter((o) => o.time >= t).length;
    const n2t = group2.filter((o) => o.time >= t).length;
    const nt = n1t + n2t;
    if (nt === 0) continue;

    // Observed events at time t
    const o1t = group1.filter((o) => o.time === t && o.event === 1).length;
    const o2t = group2.filter((o) => o.time === t && o.event === 1).length;
    const ot = o1t + o2t;

    // Expected events
    const e1t = (ot * n1t) / nt;
    const e2t = (ot * n2t) / nt;

    O1 += o1t;
    O2 += o2t;
    E1 += e1t;
    E2 += e2t;

    // Variance contribution
    if (nt > 1) {
      V += (ot * n1t * n2t * (nt - ot)) / (nt * nt * (nt - 1));
    }
  }

  if (V === 0) return null;

  const chiSquared = (O1 - E1) ** 2 / V;
  const pValue = chiSquaredPValue1df(chiSquared);
  const n = group1.length + group2.length;

  return { chiSquared, pValue, O1, E1, O2, E2, n };
}

function parseSurvData(timeText: string, eventText: string): SurvObs[] | null {
  const times = parseNumbers(timeText);
  const events = parseNumbers(eventText);
  if (times.length === 0 || times.length !== events.length) return null;
  return times.map((t, i) => ({ time: t, event: events[i] === 1 ? 1 : 0 }));
}

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

export default function LogRankTestCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.log-rank-test-calculator");

  const [g1Time, setG1Time] = React.useState("");
  const [g1Event, setG1Event] = React.useState("");
  const [g2Time, setG2Time] = React.useState("");
  const [g2Event, setG2Event] = React.useState("");
  const [alpha, setAlpha] = React.useState("0.05");
  const [touched, setTouched] = React.useState(false);

  const group1 = React.useMemo(() => parseSurvData(g1Time, g1Event), [g1Time, g1Event]);
  const group2 = React.useMemo(() => parseSurvData(g2Time, g2Event), [g2Time, g2Event]);

  const result = React.useMemo<LogRankResult | null>(() => {
    if (!group1 || !group2) return null;
    return computeLogRank(group1, group2);
  }, [group1, group2]);

  function reset() {
    setG1Time(""); setG1Event(""); setG2Time(""); setG2Event("");
    setAlpha("0.05"); setTouched(false);
  }

  const alphaNum = parseFloat(alpha);
  const reject = result !== null && result.pValue < alphaNum;

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<{ q: string; a: string }[]>(() => {
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

  const ALPHAS = ["0.01", "0.05", "0.10"];

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
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold text-zinc-700">{t("field.group1")}</h3>
              <div className="space-y-2">
                <Label htmlFor="lr-g1t">{t("field.group1")} — {t("field.times")}</Label>
                <Input
                  id="lr-g1t"
                  value={g1Time}
                  placeholder={t("placeholder.times")}
                  onChange={(e) => { setG1Time(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lr-g1e">{t("field.group1")} — {t("field.events")}</Label>
                <Input
                  id="lr-g1e"
                  value={g1Event}
                  placeholder={t("placeholder.events")}
                  onChange={(e) => { setG1Event(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-zinc-700">{t("field.group2")}</h3>
              <div className="space-y-2">
                <Label htmlFor="lr-g2t">{t("field.group2")} — {t("field.times")}</Label>
                <Input
                  id="lr-g2t"
                  value={g2Time}
                  placeholder={t("placeholder.times")}
                  onChange={(e) => { setG2Time(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lr-g2e">{t("field.group2")} — {t("field.events")}</Label>
                <Input
                  id="lr-g2e"
                  value={g2Event}
                  placeholder={t("placeholder.events")}
                  onChange={(e) => { setG2Event(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.alpha")}</Label>
            <div className="flex flex-wrap gap-2">
              {ALPHAS.map((a) => (
                <Button
                  key={a}
                  type="button"
                  variant={alpha === a ? "default" : "outline"}
                  onClick={() => setAlpha(a)}
                >
                  {a}
                </Button>
              ))}
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

          {touched && result === null && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.chiSquared")}</div>
                  <div className="text-xl font-semibold">{fmt(result.chiSquared)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.pValue")}</div>
                  <div className="text-xl font-semibold">{fmt(result.pValue)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.n")}</div>
                  <div className="text-xl font-semibold">{result.n}</div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200">
                      <th className="px-2 py-1 font-semibold">{t("result.groupCol")}</th>
                      <th className="px-2 py-1 font-semibold">{t("result.observedCol")}</th>
                      <th className="px-2 py-1 font-semibold">{t("result.expectedCol")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-100">
                      <td className="px-2 py-1">{t("field.group1")}</td>
                      <td className="px-2 py-1">{fmt(result.O1)}</td>
                      <td className="px-2 py-1">{fmt(result.E1)}</td>
                    </tr>
                    <tr className="border-b border-zinc-100">
                      <td className="px-2 py-1">{t("field.group2")}</td>
                      <td className="px-2 py-1">{fmt(result.O2)}</td>
                      <td className="px-2 py-1">{fmt(result.E2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={`text-sm font-medium ${reject ? "text-red-600" : "text-green-600"}`}>
                {reject ? t("result.reject") : t("result.failReject")}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("examples.heading")}</h2>
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
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
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
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
        <div className="space-y-4">
          {faqItems.map((f, idx) => (
            <div key={idx} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{f.q}</div>
              <div className="mt-1 text-zinc-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
