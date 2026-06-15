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

// Pakistan HEC 4.0 GPA scale (letter → grade point)
const PK_LETTER_TO_POINT: Record<string, number> = {
  A: 4.0, "A-": 3.7,
  "B+": 3.3, B: 3.0, "B-": 2.7,
  "C+": 2.3, C: 2.0, "C-": 1.7,
  D: 1.0,
  F: 0.0,
};

// Pakistan HEC percentage → letter grade conversion
function percentToLetter(pct: number): string {
  if (pct >= 85) return "A";
  if (pct >= 80) return "A-";
  if (pct >= 75) return "B+";
  if (pct >= 70) return "B";
  if (pct >= 65) return "B-";
  if (pct >= 61) return "C+";
  if (pct >= 58) return "C";
  if (pct >= 55) return "C-";
  if (pct >= 50) return "D";
  return "F";
}

function gradeToPoint(grade: string): number | null {
  const trimmed = grade.trim();
  // Try as percentage first
  const pct = parseFloat(trimmed);
  if (!isNaN(pct) && pct >= 0 && pct <= 100) {
    const letter = percentToLetter(pct);
    return PK_LETTER_TO_POINT[letter] ?? 0;
  }
  // Try as letter grade (uppercase)
  const upper = trimmed.toUpperCase().replace(/\s+/g, "");
  // handle A- -> A-
  const normalized = upper.replace(/([A-D])([+-])/, "$1$2");
  const direct = PK_LETTER_TO_POINT[normalized];
  if (direct !== undefined) return direct;
  return null;
}

function gradeToLetter(grade: string): string {
  const trimmed = grade.trim();
  const pct = parseFloat(trimmed);
  if (!isNaN(pct) && pct >= 0 && pct <= 100) return percentToLetter(pct);
  const upper = trimmed.toUpperCase().replace(/\s+/g, "");
  if (PK_LETTER_TO_POINT[upper] !== undefined) return upper;
  return "—";
}

interface CourseRow {
  id: number;
  name: string;
  grade: string;
  credits: string;
}

let nextId = 1;
function makeRow(): CourseRow {
  return { id: nextId++, name: "", grade: "", credits: "" };
}

interface CalcResult {
  gpa: number | null;
  totalCredits: number;
  courses: { letter: string; point: number | null; credits: number }[];
}

function calcGPA(rows: CourseRow[]): CalcResult {
  let totalCredits = 0;
  let qualityPoints = 0;
  const courses: CalcResult["courses"] = [];
  for (const r of rows) {
    const cr = parseFloat(r.credits);
    if (!Number.isFinite(cr) || cr <= 0 || r.grade.trim() === "") continue;
    const point = gradeToPoint(r.grade);
    const letter = gradeToLetter(r.grade);
    if (point === null) continue;
    totalCredits += cr;
    qualityPoints += point * cr;
    courses.push({ letter, point, credits: cr });
  }
  if (totalCredits === 0) return { gpa: null, totalCredits: 0, courses };
  return { gpa: qualityPoints / totalCredits, totalCredits, courses };
}

export default function GpaCalculatorPakistan(_props: { locale: Locale }) {
  const t = useTranslations("tool.gpa-calculator-pakistan");

  const [courses, setCourses] = React.useState<CourseRow[]>(() => [makeRow()]);
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => calcGPA(courses), [courses]);

  function updateCourse(id: number, field: keyof CourseRow, value: string) {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
    setTouched(true);
  }

  function addCourse() {
    setCourses((prev) => [...prev, makeRow()]);
  }

  function removeCourse(id: number) {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }

  function reset() {
    nextId = 1;
    setCourses([makeRow()]);
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
          <div className="space-y-3">
            <div className="grid grid-cols-[1fr_160px_90px_32px] gap-2 text-xs font-semibold text-zinc-500 px-1">
              <span>{t("field.courseName")}</span>
              <span>{t("field.grade")}</span>
              <span>{t("field.creditHours")}</span>
              <span />
            </div>
            {courses.map((c) => (
              <div
                key={c.id}
                className="grid grid-cols-[1fr_160px_90px_32px] gap-2 items-center"
              >
                <Input
                  type="text"
                  placeholder={t("field.courseNamePlaceholder")}
                  value={c.name}
                  aria-label={t("field.courseName")}
                  onChange={(e) => updateCourse(c.id, "name", e.target.value)}
                />
                <Input
                  type="text"
                  placeholder={t("field.gradePlaceholder")}
                  value={c.grade}
                  aria-label={t("field.grade")}
                  onChange={(e) => updateCourse(c.id, "grade", e.target.value)}
                />
                <Input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.5"
                  placeholder="3"
                  aria-label={t("field.creditHours")}
                  value={c.credits}
                  onChange={(e) => updateCourse(c.id, "credits", e.target.value)}
                />
                <button
                  type="button"
                  aria-label={t("button.removeCourse")}
                  className="text-zinc-400 hover:text-red-500 text-lg leading-none disabled:opacity-30"
                  disabled={courses.length <= 1}
                  onClick={() => removeCourse(c.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={addCourse}>
              {t("button.addCourse")}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {touched && result.gpa !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-3xl font-bold text-zinc-900">
                {result.gpa.toFixed(2)}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.totalCredits")}: <span className="font-medium">{result.totalCredits}</span>
              </div>
              {result.courses.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-zinc-200">
                        <th className="px-2 py-1 text-left text-zinc-500">{t("result.colCourse")}</th>
                        <th className="px-2 py-1 text-left text-zinc-500">{t("result.colLetter")}</th>
                        <th className="px-2 py-1 text-left text-zinc-500">{t("result.colPoint")}</th>
                        <th className="px-2 py-1 text-left text-zinc-500">{t("result.colCredits")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.courses.map((row, i) => (
                        <tr key={i} className="border-b border-zinc-100">
                          <td className="px-2 py-1">{courses[i]?.name || t("result.courseLabel", { n: i + 1 } as never)}</td>
                          <td className="px-2 py-1 font-medium">{row.letter}</td>
                          <td className="px-2 py-1">{row.point?.toFixed(1)}</td>
                          <td className="px-2 py-1">{row.credits}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          {touched && result.gpa === null && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
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
