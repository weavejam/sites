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

type TestMode = "one-sample" | "two-sample";
type TailType = "two-tailed" | "left-tailed" | "right-tailed";

interface ZTestResult {
  Z: number;
  pValue: number;
  criticalZ: number;
  reject: boolean;
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

function erf(x: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const p =
    t *
    (0.254829592 +
      t *
        (-0.284496736 +
          t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const r = 1 - p * Math.exp(-x * x);
  return x >= 0 ? r : -r;
}

function normalCDF(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

function invNormalCDF(p: number): number {
  let lo = -10,
    hi = 10;
  for (let i = 0; i < 64; i++) {
    const mid = (lo + hi) / 2;
    if (normalCDF(mid) < p) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

function computeOneSample(
  xbar: number,
  mu: number,
  sigma: number,
  n: number,
  alpha: number,
  tail: TailType
): ZTestResult | null {
  if (sigma <= 0 || n < 1 || !Number.isFinite(xbar) || !Number.isFinite(mu))
    return null;
  const se = sigma / Math.sqrt(n);
  const Z = (xbar - mu) / se;
  let pValue: number;
  if (tail === "two-tailed") {
    pValue = 2 * (1 - normalCDF(Math.abs(Z)));
  } else if (tail === "right-tailed") {
    pValue = 1 - normalCDF(Z);
  } else {
    pValue = normalCDF(Z);
  }
  const criticalZ =
    tail === "two-tailed"
      ? invNormalCDF(1 - alpha / 2)
      : invNormalCDF(1 - alpha);
  const reject = pValue < alpha;
  return { Z, pValue, criticalZ, reject };
}

function computeTwoSample(
  xbar1: number,
  sigma1: number,
  n1: number,
  xbar2: number,
  sigma2: number,
  n2: number,
  alpha: number,
  tail: TailType
): ZTestResult | null {
  if (
    sigma1 <= 0 ||
    sigma2 <= 0 ||
    n1 < 1 ||
    n2 < 1 ||
    !Number.isFinite(xbar1) ||
    !Number.isFinite(xbar2)
  )
    return null;
  const se = Math.sqrt((sigma1 * sigma1) / n1 + (sigma2 * sigma2) / n2);
  const Z = (xbar1 - xbar2) / se;
  let pValue: number;
  if (tail === "two-tailed") {
    pValue = 2 * (1 - normalCDF(Math.abs(Z)));
  } else if (tail === "right-tailed") {
    pValue = 1 - normalCDF(Z);
  } else {
    pValue = normalCDF(Z);
  }
  const criticalZ =
    tail === "two-tailed"
      ? invNormalCDF(1 - alpha / 2)
      : invNormalCDF(1 - alpha);
  const reject = pValue < alpha;
  return { Z, pValue, criticalZ, reject };
}

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

export default function ZTestCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.z-test-calculator");

  const [mode, setMode] = React.useState<TestMode>("one-sample");
  const [xbar, setXbar] = React.useState("");
  const [mu, setMu] = React.useState("");
  const [sigma, setSigma] = React.useState("");
  const [n, setN] = React.useState("");
  const [xbar2, setXbar2] = React.useState("");
  const [sigma2, setSigma2] = React.useState("");
  const [n2, setN2] = React.useState("");
  const [alpha, setAlpha] = React.useState("0.05");
  const [tail, setTail] = React.useState<TailType>("two-tailed");
  const [touched, setTouched] = React.useState(false);

  const alphaNum = parseFloat(alpha) || 0.05;
  const TAILS: TailType[] = ["two-tailed", "left-tailed", "right-tailed"];
  const ALPHAS = ["0.01", "0.05", "0.10"];

  const result = React.useMemo<ZTestResult | null>(() => {
    if (mode === "one-sample") {
      return computeOneSample(
        parseFloat(xbar),
        parseFloat(mu),
        parseFloat(sigma),
        parseFloat(n),
        alphaNum,
        tail
      );
    } else {
      return computeTwoSample(
        parseFloat(xbar),
        parseFloat(sigma),
        parseFloat(n),
        parseFloat(xbar2),
        parseFloat(sigma2),
        parseFloat(n2),
        alphaNum,
        tail
      );
    }
  }, [mode, xbar, mu, sigma, n, xbar2, sigma2, n2, alphaNum, tail]);

  function reset() {
    setXbar("");
    setMu("");
    setSigma("");
    setN("");
    setXbar2("");
    setSigma2("");
    setN2("");
    setAlpha("0.05");
    setTail("two-tailed");
    setTouched(false);
  }

  const showError = touched && result === null;

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<FaqItem[]>(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
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
            <Label>{t("field.mode")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["one-sample", "two-sample"] as TestMode[]).map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={mode === m ? "default" : "outline"}
                  onClick={() => {
                    setMode(m);
                    setTouched(false);
                  }}
                >
                  {t(`type.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="zt-xbar">{t("field.xbar")}</Label>
              <Input
                id="zt-xbar"
                type="number"
                inputMode="decimal"
                value={xbar}
                placeholder={t("placeholder.number")}
                onChange={(e) => {
                  setXbar(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            {mode === "one-sample" && (
              <div className="space-y-2">
                <Label htmlFor="zt-mu">{t("field.mu")}</Label>
                <Input
                  id="zt-mu"
                  type="number"
                  inputMode="decimal"
                  value={mu}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => {
                    setMu(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="zt-sigma">{t("field.sigma")}</Label>
              <Input
                id="zt-sigma"
                type="number"
                inputMode="decimal"
                min={0}
                value={sigma}
                placeholder={t("placeholder.positive")}
                onChange={(e) => {
                  setSigma(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zt-n">{t("field.n")}</Label>
              <Input
                id="zt-n"
                type="number"
                inputMode="numeric"
                min={1}
                value={n}
                placeholder={t("placeholder.n")}
                onChange={(e) => {
                  setN(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
          </div>

          {mode === "two-sample" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="zt-xbar2">{t("field.xbar2")}</Label>
                <Input
                  id="zt-xbar2"
                  type="number"
                  inputMode="decimal"
                  value={xbar2}
                  placeholder={t("placeholder.number")}
                  onChange={(e) => {
                    setXbar2(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zt-sigma2">{t("field.sigma2")}</Label>
                <Input
                  id="zt-sigma2"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  value={sigma2}
                  placeholder={t("placeholder.positive")}
                  onChange={(e) => {
                    setSigma2(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zt-n2">{t("field.n2")}</Label>
                <Input
                  id="zt-n2"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  value={n2}
                  placeholder={t("placeholder.n")}
                  onChange={(e) => {
                    setN2(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
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
            <div className="space-y-2">
              <Label>{t("field.tail")}</Label>
              <div className="flex flex-wrap gap-2">
                {TAILS.map((tt) => (
                  <Button
                    key={tt}
                    type="button"
                    variant={tail === tt ? "default" : "outline"}
                    onClick={() => setTail(tt)}
                  >
                    {t(`type.${tt}` as never)}
                  </Button>
                ))}
              </div>
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
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.Z")}</div>
                  <div className="text-xl font-semibold">{fmt(result.Z)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.pValue")}
                  </div>
                  <div className="text-xl font-semibold">
                    {fmt(result.pValue)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.criticalZ")}
                  </div>
                  <div className="text-xl font-semibold">
                    {fmt(result.criticalZ)}
                  </div>
                </div>
              </div>
              <div
                className={`text-sm font-medium ${
                  result.reject ? "text-red-600" : "text-green-600"
                }`}
              >
                {result.reject ? t("result.reject") : t("result.failReject")}
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
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
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
            onClick={() => {
              setMode("one-sample");
              setXbar("105");
              setMu("100");
              setSigma("15");
              setN("30");
              setAlpha("0.05");
              setTail("two-tailed");
              setTouched(true);
            }}
          >
            {t("examples.loadIQ")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setMode("two-sample");
              setXbar("15");
              setSigma("3");
              setN("35");
              setXbar2("16");
              setSigma2("3.2");
              setN2("40");
              setAlpha("0.05");
              setTail("left-tailed");
              setTouched(true);
            }}
          >
            {t("examples.loadDrug")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setMode("two-sample");
              setXbar("85");
              setSigma("10");
              setN("100");
              setXbar2("82");
              setSigma2("9");
              setN2("90");
              setAlpha("0.01");
              setTail("two-tailed");
              setTouched(true);
            }}
          >
            {t("examples.loadSchools")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
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
