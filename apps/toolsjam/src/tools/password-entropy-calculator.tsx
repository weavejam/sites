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

type Mode = "auto" | "manual";

const GUESSES_PER_SECOND = 1e10; // GPU brute-force against fast hash

function getCrackTimeArgs(seconds: number): [string, Record<string, number> | undefined] {
  if (!isFinite(seconds) || seconds > 3.15e26) return ["crackTime.universe", undefined];
  if (seconds < 1) return ["crackTime.lessThan1s", undefined];
  if (seconds < 60) return ["crackTime.seconds", { n: Math.round(seconds) }];
  if (seconds < 3600) return ["crackTime.minutes", { n: Math.round(seconds / 60) }];
  if (seconds < 86400) return ["crackTime.hours", { n: Math.round(seconds / 3600) }];
  if (seconds < 365.25 * 86400) return ["crackTime.days", { n: Math.round(seconds / 86400) }];
  if (seconds < 365.25 * 86400 * 1000) return ["crackTime.years", { n: Math.round(seconds / (365.25 * 86400)) }];
  if (seconds < 365.25 * 86400 * 1e6) return ["crackTime.thousandYears", { n: Math.round(seconds / (365.25 * 86400 * 1000)) }];
  return ["crackTime.billionYears", { n: Math.round(seconds / (365.25 * 86400 * 1e9)) }];
}

function getStrengthKey(bits: number): string {
  if (bits < 28) return "veryWeak";
  if (bits < 36) return "weak";
  if (bits < 60) return "reasonable";
  if (bits < 128) return "strong";
  return "veryStrong";
}

function getPoolFromPassword(password: string): number {
  let pool = 0;
  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/[0-9]/.test(password)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(password)) pool += 32;
  return pool || 10;
}

export default function PasswordEntropyCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.password-entropy-calculator");
  const [mode, setMode] = React.useState<Mode>("auto");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [manualPool, setManualPool] = React.useState("");
  const [manualLength, setManualLength] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const MODES: Mode[] = ["auto", "manual"];

  const result = React.useMemo(() => {
    if (mode === "auto") {
      if (!password) return null;
      const pool = getPoolFromPassword(password);
      const length = password.length;
      const entropy = length * Math.log2(pool);
      const combinations = Math.pow(pool, length);
      const crackSeconds = combinations / GUESSES_PER_SECOND;
      const [crackKey, crackParams] = getCrackTimeArgs(crackSeconds);
      return {
        entropy,
        pool,
        length,
        strengthKey: getStrengthKey(entropy),
        crackKey,
        crackParams,
        hasLower: /[a-z]/.test(password),
        hasUpper: /[A-Z]/.test(password),
        hasDigit: /[0-9]/.test(password),
        hasSymbol: /[^a-zA-Z0-9]/.test(password),
      };
    } else {
      const pool = parseInt(manualPool, 10);
      const length = parseInt(manualLength, 10);
      if (!pool || !length || pool < 1 || length < 1) return null;
      const entropy = length * Math.log2(pool);
      const combinations = Math.pow(pool, length);
      const crackSeconds = combinations / GUESSES_PER_SECOND;
      const [crackKey, crackParams] = getCrackTimeArgs(crackSeconds);
      return {
        entropy,
        pool,
        length,
        strengthKey: getStrengthKey(entropy),
        crackKey,
        crackParams,
        hasLower: null,
        hasUpper: null,
        hasDigit: null,
        hasSymbol: null,
      };
    }
  }, [mode, password, manualPool, manualLength]);

  const isValid =
    mode === "auto"
      ? password.length > 0
      : parseInt(manualPool, 10) > 0 && parseInt(manualLength, 10) > 0;

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
    setPassword("");
    setManualPool("");
    setManualLength("");
    setTouched(false);
  }

  const strengthColors: Record<string, string> = {
    veryWeak: "text-red-600",
    weak: "text-orange-500",
    reasonable: "text-yellow-600",
    strong: "text-green-600",
    veryStrong: "text-emerald-700",
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
              {MODES.map((m) => (
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

          {mode === "auto" ? (
            <div className="space-y-2">
              <Label htmlFor="pec-password">{t("field.password")}</Label>
              <div className="flex gap-2">
                <Input
                  id="pec-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder={t("placeholder.password")}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setTouched(true);
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? t("button.hide") : t("button.show")}
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pec-pool">{t("field.charsetSize")}</Label>
                <Input
                  id="pec-pool"
                  type="number"
                  inputMode="numeric"
                  value={manualPool}
                  placeholder={t("placeholder.charsetSize")}
                  onChange={(e) => {
                    setManualPool(e.target.value);
                    setTouched(true);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pec-length">{t("field.passwordLength")}</Label>
                <Input
                  id="pec-length"
                  type="number"
                  inputMode="numeric"
                  value={manualLength}
                  placeholder={t("placeholder.length")}
                  onChange={(e) => {
                    setManualLength(e.target.value);
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

          {touched && !isValid && (
            <p className="text-sm text-red-600">
              {mode === "auto" ? t("error.empty") : t("error.invalidManual")}
            </p>
          )}

          {touched && isValid && result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.entropy")}
                  </div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {result.entropy.toFixed(1)}{" "}
                    <span className="text-base font-normal text-zinc-500">
                      {t("result.entropyUnit")}
                    </span>
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.strength")}
                  </div>
                  <div
                    className={`text-2xl font-bold ${strengthColors[result.strengthKey] ?? ""}`}
                  >
                    {t(`strength.${result.strengthKey}` as never)}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.poolSize")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.pool}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.length")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.length}
                  </div>
                </div>
              </div>
              <div className="rounded border border-zinc-200 bg-white p-3">
                <div className="text-xs text-zinc-500">
                  {t("result.crackTime")}
                </div>
                <div className="font-semibold text-zinc-900">
                  {t(result.crackKey as never, result.crackParams as never)}
                </div>
              </div>
              {mode === "auto" && (
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500 mb-2">
                    {t("result.charClasses")}
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span
                      className={result.hasLower ? "text-green-700" : "text-zinc-400"}
                    >
                      {t("label.lowercase")}
                    </span>
                    <span
                      className={result.hasUpper ? "text-green-700" : "text-zinc-400"}
                    >
                      {t("label.uppercase")}
                    </span>
                    <span
                      className={result.hasDigit ? "text-green-700" : "text-zinc-400"}
                    >
                      {t("label.digits")}
                    </span>
                    <span
                      className={result.hasSymbol ? "text-green-700" : "text-zinc-400"}
                    >
                      {t("label.symbols")}
                    </span>
                  </div>
                </div>
              )}
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
