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

type CalculationMethod = "lmp" | "conception" | "ultrasound";
type Trimester = "first" | "second" | "third";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface GestationalResult {
  gestationalDays: number;
  gestationalWeeks: number;
  gestationalRemainderDays: number;
  pregnancyWeek: number;
  dueDate: Date;
  daysRemaining: number;
  trimester: Trimester;
}

const SELECT_CLASS =
  "border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none";

function startOfDay(date: Date): Date {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function parseDateInput(value: string): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  const parsed = new Date(year, month - 1, day);
  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null;
  }
  return startOfDay(parsed);
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return startOfDay(next);
}

function diffDays(later: Date, earlier: Date): number {
  return Math.round(
    (startOfDay(later).getTime() - startOfDay(earlier).getTime()) /
      86_400_000,
  );
}

function formatDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getTrimester(gestationalDays: number): Trimester {
  if (gestationalDays <= 97) return "first";
  if (gestationalDays <= 195) return "second";
  return "third";
}

export default function GestationalAgeCalculator({ locale }: { locale: Locale }) {
  const t = useTranslations("tool.gestational-age-calculator");

  const today = React.useMemo(() => startOfDay(new Date()), []);
  const [method, setMethod] = React.useState<CalculationMethod>("lmp");
  const [lmpDate, setLmpDate] = React.useState("");
  const [conceptionDate, setConceptionDate] = React.useState("");
  const [ultrasoundDate, setUltrasoundDate] = React.useState("");
  const [gestWeeks, setGestWeeks] = React.useState("");
  const [gestDays, setGestDays] = React.useState("");
  const [cycleLength, setCycleLength] = React.useState("28");
  const [touched, setTouched] = React.useState(false);

  const lmpDateValue = parseDateInput(lmpDate);
  const conceptionDateValue = parseDateInput(conceptionDate);
  const ultrasoundDateValue = parseDateInput(ultrasoundDate);
  const cycleLengthNum = Number.parseFloat(cycleLength);
  const gestWeeksNum = Number.parseFloat(gestWeeks);
  const gestDaysNum = Number.parseFloat(gestDays);

  const cycleLengthValid =
    Number.isFinite(cycleLengthNum) && cycleLengthNum >= 21 && cycleLengthNum <= 45;
  const lmpDateValid =
    lmpDateValue !== null && diffDays(today, lmpDateValue) >= 0;
  const conceptionDateValid =
    conceptionDateValue !== null && diffDays(today, conceptionDateValue) >= 0;
  const ultrasoundDateValid =
    ultrasoundDateValue !== null && diffDays(today, ultrasoundDateValue) >= 0;
  const gestWeeksValid =
    Number.isFinite(gestWeeksNum) &&
    Number.isInteger(gestWeeksNum) &&
    gestWeeksNum >= 0 &&
    gestWeeksNum <= 42;
  const gestDaysValid =
    Number.isFinite(gestDaysNum) &&
    Number.isInteger(gestDaysNum) &&
    gestDaysNum >= 0 &&
    gestDaysNum <= 6;

  const result = React.useMemo<GestationalResult | null>(() => {
    if (method === "lmp") {
      if (!lmpDateValid || !cycleLengthValid || !lmpDateValue) return null;
      const cycleAdjustment = cycleLengthNum - 28;
      const gestationalDays = diffDays(today, lmpDateValue) - cycleAdjustment;
      const dueDate = addDays(lmpDateValue, 280 + cycleAdjustment);
      return {
        gestationalDays,
        gestationalWeeks: Math.floor(gestationalDays / 7),
        gestationalRemainderDays: ((gestationalDays % 7) + 7) % 7,
        pregnancyWeek: Math.floor(gestationalDays / 7) + 1,
        dueDate,
        daysRemaining: Math.max(0, diffDays(dueDate, today)),
        trimester: getTrimester(gestationalDays),
      };
    }

    if (method === "conception") {
      if (!conceptionDateValid || !conceptionDateValue) return null;
      const gestationalDays = diffDays(today, conceptionDateValue) + 14;
      const dueDate = addDays(conceptionDateValue, 266);
      return {
        gestationalDays,
        gestationalWeeks: Math.floor(gestationalDays / 7),
        gestationalRemainderDays: ((gestationalDays % 7) + 7) % 7,
        pregnancyWeek: Math.floor(gestationalDays / 7) + 1,
        dueDate,
        daysRemaining: Math.max(0, diffDays(dueDate, today)),
        trimester: getTrimester(gestationalDays),
      };
    }

    if (
      !ultrasoundDateValid ||
      !gestWeeksValid ||
      !gestDaysValid ||
      !ultrasoundDateValue
    ) {
      return null;
    }

    const gestationalDays =
      gestWeeksNum * 7 + gestDaysNum + diffDays(today, ultrasoundDateValue);
    const dueDate = addDays(today, 280 - gestationalDays);
    return {
      gestationalDays,
      gestationalWeeks: Math.floor(gestationalDays / 7),
      gestationalRemainderDays: ((gestationalDays % 7) + 7) % 7,
      pregnancyWeek: Math.floor(gestationalDays / 7) + 1,
      dueDate,
      daysRemaining: Math.max(0, diffDays(dueDate, today)),
      trimester: getTrimester(gestationalDays),
    };
  }, [
    conceptionDateValid,
    conceptionDateValue,
    cycleLengthNum,
    cycleLengthValid,
    gestDaysNum,
    gestDaysValid,
    gestWeeksNum,
    gestWeeksValid,
    lmpDateValid,
    lmpDateValue,
    method,
    today,
    ultrasoundDateValid,
    ultrasoundDateValue,
  ]);

  const errorMessage = React.useMemo(() => {
    if (!touched) return null;
    if (method === "lmp") {
      if (!lmpDateValid) return t("error.invalidLmpDate");
      if (!cycleLengthValid) return t("error.invalidCycleLength");
    }
    if (method === "conception" && !conceptionDateValid) {
      return t("error.invalidConceptionDate");
    }
    if (method === "ultrasound") {
      if (!ultrasoundDateValid) return t("error.invalidUltrasoundDate");
      if (!gestWeeksValid) return t("error.invalidUltrasoundWeeks");
      if (!gestDaysValid) return t("error.invalidUltrasoundDays");
    }
    if (result && (result.gestationalDays < 0 || result.gestationalDays > 308)) return t("error.invalidRange");
    return null;
  }, [
    conceptionDateValid,
    cycleLengthValid,
    lmpDateValid,
    method,
    result,
    t,
    touched,
    ultrasoundDateValid,
    gestWeeksValid,
    gestDaysValid,
  ]);

  function reset() {
    setMethod("lmp");
    setLmpDate("");
    setConceptionDate("");
    setUltrasoundDate("");
    setGestWeeks("");
    setGestDays("");
    setCycleLength("28");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: t("title"),
        applicationCategory: "HealthApplication",
        operatingSystem: "Any",
        description: t("tagline"),
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
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
            <Label htmlFor="ga-method">{t("field.method")}</Label>
            <select
              id="ga-method"
              value={method}
              onChange={(event) => {
                setMethod(event.target.value as CalculationMethod);
                setTouched(true);
              }}
              className={SELECT_CLASS}
            >
              <option value="lmp">{t("option.lmp")}</option>
              <option value="conception">{t("option.conception")}</option>
              <option value="ultrasound">{t("option.ultrasound")}</option>
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {method === "lmp" && (
              <div className="space-y-2">
                <Label htmlFor="ga-lmp-date">{t("field.lmpDate")}</Label>
                <Input
                  id="ga-lmp-date"
                  type="date"
                  value={lmpDate}
                  onChange={(event) => {
                    setLmpDate(event.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}

            {method === "conception" && (
              <div className="space-y-2">
                <Label htmlFor="ga-conception-date">
                  {t("field.conceptionDate")}
                </Label>
                <Input
                  id="ga-conception-date"
                  type="date"
                  value={conceptionDate}
                  onChange={(event) => {
                    setConceptionDate(event.target.value);
                    setTouched(true);
                  }}
                />
              </div>
            )}

            {method === "ultrasound" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="ga-ultrasound-date">
                    {t("field.ultrasoundDate")}
                  </Label>
                  <Input
                    id="ga-ultrasound-date"
                    type="date"
                    value={ultrasoundDate}
                    onChange={(event) => {
                      setUltrasoundDate(event.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ga-ultrasound-weeks">
                    {t("field.gestWeeks")}
                  </Label>
                  <Input
                    id="ga-ultrasound-weeks"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={42}
                    step="1"
                    value={gestWeeks}
                    placeholder={t("placeholder.gestWeeks")}
                    onChange={(event) => {
                      setGestWeeks(event.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ga-ultrasound-days">
                    {t("field.gestDays")}
                  </Label>
                  <Input
                    id="ga-ultrasound-days"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={6}
                    step="1"
                    value={gestDays}
                    placeholder={t("placeholder.gestDays")}
                    onChange={(event) => {
                      setGestDays(event.target.value);
                      setTouched(true);
                    }}
                  />
                </div>
              </>
            )}

            {method !== "conception" && (
              <div className="space-y-2">
                <Label htmlFor="ga-cycle-length">{t("field.cycleLength")}</Label>
                <Input
                  id="ga-cycle-length"
                  type="number"
                  inputMode="numeric"
                  min={21}
                  max={45}
                  step="1"
                  value={cycleLength}
                  placeholder={t("placeholder.cycleLength")}
                  onChange={(event) => {
                    setCycleLength(event.target.value);
                    setTouched(true);
                  }}
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

          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          {result && !errorMessage && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.currentGestationalAge")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {t("result.ageValue", {
                      weeks: result.gestationalWeeks,
                      days: result.gestationalRemainderDays,
                    })}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.pregnancyWeek")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {t("result.weekValue", { week: result.pregnancyWeek })}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.estimatedDueDate")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {formatDate(result.dueDate, locale)}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.daysRemaining")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {t("result.daysValue", { days: result.daysRemaining })}
                  </div>
                </div>
                <div className="rounded border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">
                    {t("result.trimester")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {t(`trimester.${result.trimester}` as never)}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-zinc-500">
                {t(`formula.${method}` as never)}
              </p>
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
              {examplesItems.map((item, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{item.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {item.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">{item.note ?? ""}</td>
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
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{item.q}</div>
              <div className="mt-1 text-zinc-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
