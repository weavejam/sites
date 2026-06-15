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

type QueueModel = "mm1" | "mmc" | "mmck" | "mmcn";

const MODELS: QueueModel[] = ["mm1", "mmc", "mmck", "mmcn"];

function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

interface QueueMetrics {
  rho: number;
  p0: number;
  lq: number;
  l: number;
  wq: number;
  w: number;
  pBlock?: number;
}

function calcMM1(lambda: number, mu: number): QueueMetrics | string {
  const rho = lambda / mu;
  if (rho >= 1) return "unstable";
  const p0 = 1 - rho;
  const lq = rho ** 2 / (1 - rho);
  const l = rho / (1 - rho);
  const wq = lq / lambda;
  const w = l / lambda;
  return { rho, p0, lq, l, wq, w };
}

function calcMMC(lambda: number, mu: number, c: number): QueueMetrics | string {
  const rho = lambda / (c * mu);
  if (rho >= 1) return "unstable";
  const a = lambda / mu;
  // P0 computation
  let sum = 0;
  for (let n = 0; n < c; n++) {
    sum += a ** n / factorial(n);
  }
  sum += (a ** c / factorial(c)) * (1 / (1 - rho));
  const p0 = 1 / sum;
  const erlangC =
    (a ** c / (factorial(c) * (1 - rho))) * p0;
  const lq = erlangC * rho / (1 - rho);
  const wq = lq / lambda;
  const w = wq + 1 / mu;
  const l = lambda * w;
  return { rho, p0, lq, l, wq, w };
}

function calcMMCK(
  lambda: number,
  mu: number,
  c: number,
  K: number
): QueueMetrics | string {
  const a = lambda / mu;
  const rho = lambda / (c * mu);
  // Compute state probabilities
  const p: number[] = new Array(K + 1).fill(0);
  p[0] = 1;
  let total = 1;
  for (let n = 1; n <= K; n++) {
    if (n <= c) {
      p[n] = (a ** n / factorial(n)) * p[0];
    } else {
      p[n] = (a ** n / (factorial(c) * c ** (n - c))) * p[0];
    }
    total += p[n];
  }
  const p0 = 1 / total;
  // Normalize
  for (let n = 1; n <= K; n++) p[n] *= p0;
  const pBlock = p[K];
  const lambdaEff = lambda * (1 - pBlock);
  let l = 0;
  for (let n = 0; n <= K; n++) l += n * p[n];
  const w = lambdaEff > 0 ? l / lambdaEff : 0;
  let lq = 0;
  for (let n = c + 1; n <= K; n++) lq += (n - c) * p[n];
  const wq = lambdaEff > 0 ? lq / lambdaEff : 0;
  return { rho, p0, lq, l, wq, w, pBlock };
}

function calcMMCN(
  lambda: number,
  mu: number,
  c: number,
  N: number
): QueueMetrics | string {
  // State probabilities for finite-source queue
  const p: number[] = new Array(N + 1).fill(0);
  p[0] = 1;
  let total = 1;
  for (let n = 1; n <= N; n++) {
    if (n <= c) {
      p[n] =
        (factorial(N) / factorial(N - n)) *
        ((lambda / mu) ** n / factorial(n));
    } else {
      p[n] =
        (factorial(N) / factorial(N - n)) *
        ((lambda / mu) ** n / (factorial(c) * c ** (n - c)));
    }
    total += p[n];
  }
  const p0 = 1 / total;
  for (let n = 1; n <= N; n++) p[n] *= p0;
  let l = 0;
  for (let n = 0; n <= N; n++) l += n * p[n];
  let lq = 0;
  for (let n = c + 1; n <= N; n++) lq += (n - c) * p[n];
  const lambdaEff = lambda * (N - l);
  const w = lambdaEff > 0 ? l / lambdaEff : 0;
  const wq = lambdaEff > 0 ? lq / lambdaEff : 0;
  const rho = lambdaEff / (c * mu);
  return { rho, p0, lq, l, wq, w };
}

export default function QueueingTheoryCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.queueing-theory-calculator");

  const [model, setModel] = React.useState<QueueModel>("mm1");
  const [lambdaStr, setLambdaStr] = React.useState("");
  const [muStr, setMuStr] = React.useState("");
  const [serversStr, setServersStr] = React.useState("1");
  const [capacityStr, setCapacityStr] = React.useState("10");
  const [populationStr, setPopulationStr] = React.useState("10");
  const [touched, setTouched] = React.useState(false);

  function reset() {
    setLambdaStr(""); setMuStr(""); setServersStr("1");
    setCapacityStr("10"); setPopulationStr("10");
    setTouched(false);
  }

  const metrics = React.useMemo<QueueMetrics | string | null>(() => {
    if (!touched) return null;
    const lambda = parseFloat(lambdaStr);
    const mu = parseFloat(muStr);
    if (!Number.isFinite(lambda) || lambda <= 0) return t("error.invalidInput");
    if (!Number.isFinite(mu) || mu <= 0) return t("error.zeroMu");
    const c = Math.max(1, Math.round(parseFloat(serversStr) || 1));
    const K = Math.max(c, Math.round(parseFloat(capacityStr) || 10));
    const N = Math.max(1, Math.round(parseFloat(populationStr) || 10));
    switch (model) {
      case "mm1":
        return calcMM1(lambda, mu);
      case "mmc":
        return calcMMC(lambda, mu, c);
      case "mmck":
        return calcMMCK(lambda, mu, c, K);
      case "mmcn":
        return calcMMCN(lambda, mu, c, N);
    }
  }, [touched, lambdaStr, muStr, serversStr, capacityStr, populationStr, model, t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<{ q: string; a: string }[]>(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
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

  const errorMsg =
    typeof metrics === "string"
      ? metrics === "unstable"
        ? t("error.unstable")
        : metrics
      : null;
  const metricsData =
    metrics && typeof metrics !== "string" ? (metrics as QueueMetrics) : null;

  const needsServers = model !== "mm1";
  const needsCapacity = model === "mmck";
  const needsPopulation = model === "mmcn";

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
            <Label>{t("field.model")}</Label>
            <div className="flex flex-wrap gap-2">
              {MODELS.map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={model === m ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setModel(m);
                    setTouched(false);
                  }}
                >
                  {t(`model.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="qt-lambda">{t("field.lambda")}</Label>
              <Input
                id="qt-lambda"
                type="number"
                inputMode="decimal"
                value={lambdaStr}
                placeholder={t("placeholder.rate")}
                onChange={(e) => { setLambdaStr(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qt-mu">{t("field.mu")}</Label>
              <Input
                id="qt-mu"
                type="number"
                inputMode="decimal"
                value={muStr}
                placeholder={t("placeholder.rate")}
                onChange={(e) => { setMuStr(e.target.value); setTouched(true); }}
              />
            </div>
            {needsServers && (
              <div className="space-y-2">
                <Label htmlFor="qt-servers">{t("field.servers")}</Label>
                <Input
                  id="qt-servers"
                  type="number"
                  inputMode="numeric"
                  value={serversStr}
                  placeholder={t("placeholder.integer")}
                  onChange={(e) => { setServersStr(e.target.value); setTouched(true); }}
                />
              </div>
            )}
            {needsCapacity && (
              <div className="space-y-2">
                <Label htmlFor="qt-capacity">{t("field.capacity")}</Label>
                <Input
                  id="qt-capacity"
                  type="number"
                  inputMode="numeric"
                  value={capacityStr}
                  placeholder={t("placeholder.integer")}
                  onChange={(e) => { setCapacityStr(e.target.value); setTouched(true); }}
                />
              </div>
            )}
            {needsPopulation && (
              <div className="space-y-2">
                <Label htmlFor="qt-population">{t("field.population")}</Label>
                <Input
                  id="qt-population"
                  type="number"
                  inputMode="numeric"
                  value={populationStr}
                  placeholder={t("placeholder.integer")}
                  onChange={(e) => { setPopulationStr(e.target.value); setTouched(true); }}
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

          {errorMsg && (
            <p className="text-sm text-red-600">{errorMsg}</p>
          )}

          {metricsData && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2 text-sm">
                {[
                  ["result.utilization", fmt(metricsData.rho * 100, 2) + "%"],
                  ["result.p0", fmt(metricsData.p0, 4)],
                  ["result.lq", fmt(metricsData.lq, 4)],
                  ["result.l", fmt(metricsData.l, 4)],
                  ["result.wq", fmt(metricsData.wq, 4)],
                  ["result.w", fmt(metricsData.w, 4)],
                  ...(metricsData.pBlock !== undefined
                    ? [["result.pBlock", fmt(metricsData.pBlock * 100, 2) + "%"]]
                    : []),
                ].map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-zinc-100 pb-1">
                    <span className="text-zinc-600">{t(key as never)}</span>
                    <span className="font-semibold text-zinc-900 font-mono">{value}</span>
                  </div>
                ))}
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
