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

// GMT correlation constant
const GMT = 584283;

const TZOLKIN_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const TZOLKIN_DAYS = [
  "Imix", "Ik", "Akbal", "Kan", "Chicchan", "Cimi", "Manik", "Lamat",
  "Muluc", "Oc", "Chuen", "Eb", "Ben", "Ix", "Men", "Cib",
  "Caban", "Etznab", "Cauac", "Ahau",
];
const HAAB_MONTHS = [
  "Pop", "Uo", "Zip", "Zotz", "Tzec", "Xul", "Yaxkin", "Mol",
  "Chen", "Yax", "Zac", "Ceh", "Mac", "Kankin", "Muan", "Pax",
  "Kayab", "Cumku", "Wayeb",
];

function gregorianToJdn(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

function jdnToGregorian(jdn: number): { year: number; month: number; day: number } {
  const l = jdn + 68569;
  const n = Math.floor((4 * l) / 146097);
  const l2 = l - Math.floor((146097 * n + 3) / 4);
  const i = Math.floor((4000 * (l2 + 1)) / 1461001);
  const l3 = l2 - Math.floor((1461 * i) / 4) + 31;
  const j = Math.floor((80 * l3) / 2447);
  const d = l3 - Math.floor((2447 * j) / 80);
  const l4 = Math.floor(j / 11);
  const m = j + 2 - 12 * l4;
  const y = 100 * (n - 49) + i + l4;
  return { year: y, month: m, day: d };
}

interface MayanDate {
  baktun: number;
  katun: number;
  tun: number;
  uinal: number;
  kin: number;
  tzolkinNumber: number;
  tzolkinDay: string;
  haabDay: number;
  haabMonth: string;
}

function daysToMayan(days: number): MayanDate {
  const baktun = Math.floor(days / 144000);
  const r1 = days % 144000;
  const katun = Math.floor(r1 / 7200);
  const r2 = r1 % 7200;
  const tun = Math.floor(r2 / 360);
  const r3 = r2 % 360;
  const uinal = Math.floor(r3 / 20);
  const kin = r3 % 20;

  // Tzolkin: epoch 0.0.0.0.0 = 4 Ahau
  const tzolkinNumber = ((days + 3) % 13) + 1;
  const tzolkinDayIdx = (19 + days) % 20;
  const tzolkinDay = TZOLKIN_DAYS[tzolkinDayIdx];

  // Haab: epoch = 8 Cumku (month index 17, day 8)
  const haabPos = (17 * 20 + 8 + days) % 365;
  let haabDay: number;
  let haabMonthName: string;
  if (haabPos < 360) {
    haabDay = haabPos % 20;
    haabMonthName = HAAB_MONTHS[Math.floor(haabPos / 20)];
  } else {
    haabDay = haabPos - 360;
    haabMonthName = HAAB_MONTHS[18]; // Wayeb
  }

  return { baktun, katun, tun, uinal, kin, tzolkinNumber, tzolkinDay, haabDay, haabMonth: haabMonthName };
}

function gregorianToMayan(year: number, month: number, day: number): MayanDate | null {
  const jdn = gregorianToJdn(year, month, day);
  const days = jdn - GMT;
  if (days < 0) return null;
  return daysToMayan(days);
}

function mayanToGregorian(baktun: number, katun: number, tun: number, uinal: number, kin: number): {
  year: number; month: number; day: number;
} {
  const days = baktun * 144000 + katun * 7200 + tun * 360 + uinal * 20 + kin;
  const jdn = days + GMT;
  return jdnToGregorian(jdn);
}

function padTwo(n: number): string {
  return String(n).padStart(2, "0");
}

type InputType = "gregorian_to_mayan" | "mayan_to_gregorian";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function MayanCalendarConverter(_props: { locale: Locale }) {
  const t = useTranslations("tool.mayan-calendar-converter");

  const [inputType, setInputType] = React.useState<InputType>("gregorian_to_mayan");
  const [gregorianDate, setGregorianDate] = React.useState("2012-12-21");
  const [baktun, setBaktun] = React.useState("");
  const [katun, setKatun] = React.useState("");
  const [tun, setTun] = React.useState("");
  const [uinal, setUinal] = React.useState("");
  const [kin, setKin] = React.useState("");
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState<{
    longCount: string;
    tzolkin: string;
    haab: string;
    calendarRound: string;
    gregorianDate?: string;
    mayanDate?: MayanDate;
  } | null>(null);

  function handleConvert() {
    setError("");
    setResult(null);

    if (inputType === "gregorian_to_mayan") {
      if (!gregorianDate) { setError(t("error.invalidDate")); return; }
      const parts = gregorianDate.split("-");
      if (parts.length !== 3) { setError(t("error.invalidDate")); return; }
      const y = parseInt(parts[0], 10);
      const mo = parseInt(parts[1], 10);
      const d = parseInt(parts[2], 10);
      if (!Number.isFinite(y) || !Number.isFinite(mo) || !Number.isFinite(d)) {
        setError(t("error.invalidDate")); return;
      }
      const mayan = gregorianToMayan(y, mo, d);
      if (!mayan) { setError(t("error.beforeEpoch")); return; }
      const longCount = `${mayan.baktun}.${mayan.katun}.${mayan.tun}.${mayan.uinal}.${mayan.kin}`;
      const tzolkin = `${mayan.tzolkinNumber} ${mayan.tzolkinDay}`;
      const haab = `${mayan.haabDay} ${mayan.haabMonth}`;
      setResult({ longCount, tzolkin, haab, calendarRound: `${tzolkin} · ${haab}`, mayanDate: mayan });
    } else {
      const b = parseInt(baktun, 10);
      const k = parseInt(katun, 10);
      const tn = parseInt(tun, 10);
      const u = parseInt(uinal, 10);
      const kn = parseInt(kin, 10);
      if (
        !Number.isFinite(b) || !Number.isFinite(k) || !Number.isFinite(tn) ||
        !Number.isFinite(u) || !Number.isFinite(kn) ||
        b < 0 || k < 0 || k > 19 || tn < 0 || tn > 19 || u < 0 || u > 17 || kn < 0 || kn > 19
      ) {
        setError(t("error.invalidLongCount")); return;
      }
      const greg = mayanToGregorian(b, k, tn, u, kn);
      const mayan = daysToMayan(b * 144000 + k * 7200 + tn * 360 + u * 20 + kn);
      const longCount = `${b}.${k}.${tn}.${u}.${kn}`;
      const tzolkin = `${mayan.tzolkinNumber} ${mayan.tzolkinDay}`;
      const haab = `${mayan.haabDay} ${mayan.haabMonth}`;
      const gregStr = `${greg.year}-${padTwo(greg.month)}-${padTwo(greg.day)}`;
      setResult({ longCount, tzolkin, haab, calendarRound: `${tzolkin} · ${haab}`, gregorianDate: gregStr, mayanDate: mayan });
    }
  }

  function handleReset() {
    setGregorianDate("");
    setBaktun("");
    setKatun("");
    setTun("");
    setUinal("");
    setKin("");
    setError("");
    setResult(null);
  }

  function loadGregorianExample(date: string) {
    setInputType("gregorian_to_mayan");
    setGregorianDate(date);
    setError("");
    setResult(null);
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
            <Label>{t("field.inputType")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["gregorian_to_mayan", "mayan_to_gregorian"] as InputType[]).map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={inputType === type ? "default" : "outline"}
                  onClick={() => { setInputType(type); setError(""); setResult(null); }}
                >
                  {t(`type.${type}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {inputType === "gregorian_to_mayan" ? (
            <div className="space-y-2">
              <Label htmlFor="mcc-gdate">{t("field.gregorianDate")}</Label>
              <Input
                id="mcc-gdate"
                type="date"
                value={gregorianDate}
                onChange={(e) => { setGregorianDate(e.target.value); setResult(null); }}
              />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-5">
              {[
                { id: "mcc-bk", label: t("field.baktun"), val: baktun, set: setBaktun },
                { id: "mcc-kt", label: t("field.katun"), val: katun, set: setKatun },
                { id: "mcc-tn", label: t("field.tun"), val: tun, set: setTun },
                { id: "mcc-ui", label: t("field.uinal"), val: uinal, set: setUinal },
                { id: "mcc-ki", label: t("field.kin"), val: kin, set: setKin },
              ].map(({ id, label, val, set }) => (
                <div key={id} className="space-y-2">
                  <Label htmlFor={id}>{label}</Label>
                  <Input
                    id={id}
                    type="number"
                    inputMode="numeric"
                    value={val}
                    placeholder="0"
                    onChange={(e) => { set(e.target.value); setResult(null); }}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={handleConvert}>
              {t("button.convert")}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              {t("button.reset")}
            </Button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-semibold text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 text-sm">
                <div className="flex gap-3">
                  <span className="w-36 text-zinc-500">{t("result.longCount")}</span>
                  <span className="font-mono font-semibold text-zinc-900">{result.longCount}</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-36 text-zinc-500">{t("result.tzolkin")}</span>
                  <span className="font-semibold text-zinc-900">{result.tzolkin}</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-36 text-zinc-500">{t("result.haab")}</span>
                  <span className="font-semibold text-zinc-900">{result.haab}</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-36 text-zinc-500">{t("result.calendarRound")}</span>
                  <span className="font-semibold text-zinc-900">{result.calendarRound}</span>
                </div>
                {result.gregorianDate && (
                  <div className="flex gap-3">
                    <span className="w-36 text-zinc-500">{t("result.gregorianDate")}</span>
                    <span className="font-semibold text-zinc-900">{result.gregorianDate}</span>
                  </div>
                )}
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={() => loadGregorianExample("2012-12-21")}>
            {t("examples.loadEndOfBaktun")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadGregorianExample("2000-01-01")}>
            {t("examples.loadMillennium")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => {
            setInputType("mayan_to_gregorian");
            setBaktun("13"); setKatun("0"); setTun("0"); setUinal("0"); setKin("0");
            setError(""); setResult(null);
          }}>
            {t("examples.loadToday")}
          </Button>
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
