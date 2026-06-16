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

type CalcMethod = "conception" | "lmp" | "milestones" | "";

interface ReverseDueDateResult {
  lmpDate: Date;
  ovulationDate: Date;
  conceptionDate: Date;
  implantationDate: Date;
  firstTrimesterEnd: Date;
  secondTrimesterEnd: Date;
  viabilityDate: Date;
  currentGestationalWeeks?: number;
  currentGestationalDays?: number;
  weeksRemaining?: number;
}


function addDays(d: Date, days: number): Date {
  const result = new Date(d);
  result.setDate(result.getDate() + days);
  return result;
}

function computeReverseDueDate(
  dueDate: Date,
  cycleLength: number,
  gestationalAgeWeeks?: number,
  gestationalAgeDays?: number,
): ReverseDueDateResult {
  // LMP = Due Date − (252 + cycleLength)
  const daysFromLmpToDue = 252 + cycleLength;
  const lmpDate = addDays(dueDate, -daysFromLmpToDue);
  // Ovulation = LMP + (cycleLength − 14)
  const ovulationDate = addDays(lmpDate, cycleLength - 14);
  // Conception ≈ Ovulation
  const conceptionDate = new Date(ovulationDate);
  // Implantation ≈ Conception + 8 days
  const implantationDate = addDays(conceptionDate, 8);
  // First trimester end = LMP + 91 days (13 weeks)
  const firstTrimesterEnd = addDays(lmpDate, 91);
  // Second trimester end = LMP + 196 days (28 weeks)
  const secondTrimesterEnd = addDays(lmpDate, 196);
  // Viability = LMP + 168 days (24 weeks)
  const viabilityDate = addDays(lmpDate, 168);

  let weeksRemaining: number | undefined;
  if (
    gestationalAgeWeeks !== undefined &&
    gestationalAgeDays !== undefined &&
    Number.isFinite(gestationalAgeWeeks) &&
    Number.isFinite(gestationalAgeDays)
  ) {
    const totalDaysAlong = gestationalAgeWeeks * 7 + gestationalAgeDays;
    const totalPregnancyDays = daysFromLmpToDue;
    const daysRemaining = totalPregnancyDays - totalDaysAlong;
    weeksRemaining = Math.max(0, Math.round(daysRemaining / 7));
  }

  return {
    lmpDate,
    ovulationDate,
    conceptionDate,
    implantationDate,
    firstTrimesterEnd,
    secondTrimesterEnd,
    viabilityDate,
    currentGestationalWeeks: gestationalAgeWeeks,
    currentGestationalDays: gestationalAgeDays,
    weeksRemaining,
  };
}

const SELECT_CLASS =
  "border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none";

export default function ReverseDueDateCalculator({ locale }: { locale: Locale }) {
  const t = useTranslations("tool.reverse-due-date-calculator");

  const formatDate = React.useCallback(
    (d: Date) => d.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" }),
    [locale],
  );

  const [dueDate, setDueDate] = React.useState("");
  const [method, setMethod] = React.useState<CalcMethod>("");
  const [cycleLength, setCycleLength] = React.useState("28");
  const [gestWeeks, setGestWeeks] = React.useState("");
  const [gestDays, setGestDays] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const dueDateObj = dueDate ? new Date(dueDate) : null;
  const cycleLengthNum = parseFloat(cycleLength);
  const gestWeeksNum = gestWeeks !== "" ? parseFloat(gestWeeks) : undefined;
  const gestDaysNum = gestDays !== "" ? parseFloat(gestDays) : undefined;

  const isValidDueDate = dueDateObj !== null && !isNaN(dueDateObj.getTime());
  const isValidCycle =
    Number.isFinite(cycleLengthNum) && cycleLengthNum >= 21 && cycleLengthNum <= 45;
  const isValid = isValidDueDate && isValidCycle && method !== "";

  const result = React.useMemo<ReverseDueDateResult | null>(() => {
    if (!isValid || !dueDateObj) return null;
    return computeReverseDueDate(
      dueDateObj,
      cycleLengthNum,
      gestWeeksNum,
      gestDaysNum ?? 0,
    );
  }, [isValid, dueDateObj, cycleLengthNum, gestWeeksNum, gestDaysNum]);

  function loadExample(
    due: string,
    meth: CalcMethod,
    cycle: string,
    gw: string,
    gd: string,
  ) {
    setDueDate(due);
    setMethod(meth);
    setCycleLength(cycle);
    setGestWeeks(gw);
    setGestDays(gd);
    setTouched(true);
  }

  function reset() {
    setDueDate("");
    setMethod("");
    setCycleLength("28");
    setGestWeeks("");
    setGestDays("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[];
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
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
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
              <Label htmlFor="rdd-due-date">{t("field.dueDate")}</Label>
              <Input
                id="rdd-due-date"
                type="date"
                value={dueDate}
                onChange={(e) => { setDueDate(e.target.value); setTouched(true); }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rdd-method">{t("field.calculationMethod")}</Label>
              <select
                id="rdd-method"
                value={method}
                onChange={(e) => { setMethod(e.target.value as CalcMethod); setTouched(true); }}
                className={SELECT_CLASS}
              >
                <option value="">{t("placeholder.calculationMethod")}</option>
                <option value="conception">{t("option.method_conception")}</option>
                <option value="lmp">{t("option.method_lmp")}</option>
                <option value="milestones">{t("option.method_milestones")}</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rdd-cycle">{t("field.cycleLength")}</Label>
              <Input
                id="rdd-cycle"
                type="number"
                inputMode="numeric"
                value={cycleLength}
                placeholder={t("placeholder.cycleLength")}
                onChange={(e) => { setCycleLength(e.target.value); setTouched(true); }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rdd-gest-weeks">{t("field.gestationalAgeWeeks")}</Label>
              <Input
                id="rdd-gest-weeks"
                type="number"
                inputMode="numeric"
                value={gestWeeks}
                placeholder={t("placeholder.gestationalAgeWeeks")}
                onChange={(e) => { setGestWeeks(e.target.value); setTouched(true); }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rdd-gest-days">{t("field.gestationalAgeDays")}</Label>
              <Input
                id="rdd-gest-days"
                type="number"
                inputMode="numeric"
                value={gestDays}
                placeholder={t("placeholder.gestationalAgeDays")}
                onChange={(e) => { setGestDays(e.target.value); setTouched(true); }}
              />
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

          {touched && !isValid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                {(method === "conception" || method === "milestones") && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.conceptionDate")}</div>
                    <div className="font-semibold text-zinc-900">
                      {formatDate(result.conceptionDate)}
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-xs text-zinc-500">{t("result.lmpDate")}</div>
                  <div className="font-semibold text-zinc-900">{formatDate(result.lmpDate)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.ovulationDate")}</div>
                  <div className="font-semibold text-zinc-900">
                    {formatDate(result.ovulationDate)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.implantationDate")}</div>
                  <div className="font-semibold text-zinc-900">
                    {formatDate(result.implantationDate)}
                  </div>
                </div>
                {method === "milestones" && (
                  <>
                    <div>
                      <div className="text-xs text-zinc-500">{t("result.firstTrimesterEnd")}</div>
                      <div className="font-semibold text-zinc-900">
                        {formatDate(result.firstTrimesterEnd)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500">{t("result.viabilityDate")}</div>
                      <div className="font-semibold text-zinc-900">
                        {formatDate(result.viabilityDate)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500">{t("result.secondTrimesterEnd")}</div>
                      <div className="font-semibold text-zinc-900">
                        {formatDate(result.secondTrimesterEnd)}
                      </div>
                    </div>
                  </>
                )}
                {result.weeksRemaining !== undefined && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.weeksRemaining")}</div>
                    <div className="font-semibold text-zinc-900">
                      {result.weeksRemaining} {t("result.weeks")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => loadExample("2024-09-15", "conception", "28", "", "")}
        >
          {t("examples.loadConception")}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => loadExample("2024-10-20", "lmp", "28", "", "")}
        >
          {t("examples.loadLMP")}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => loadExample("2024-11-10", "milestones", "30", "24", "2")}
        >
          {t("examples.loadMilestones")}
        </Button>
      </div>

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
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
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
