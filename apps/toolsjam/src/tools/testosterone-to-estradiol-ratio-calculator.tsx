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

type Sex = "male" | "female";
type Units = "ngdl" | "nmoll";
type Timing = "follicular" | "ovulatory" | "luteal" | "postmenopausal";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function fmt(n: number, d = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(d);
}

export default function TestosteroneToEstradiolRatioCalculator(
  _props: { locale: Locale }
) {
  const t = useTranslations("tool.testosterone-to-estradiol-ratio-calculator");

  const [testosterone, setTestosterone] = React.useState("");
  const [estradiol, setEstradiol] = React.useState("");
  const [sex, setSex] = React.useState<Sex>("male");
  const [age, setAge] = React.useState("");
  const [timing, setTiming] = React.useState<Timing>("follicular");
  const [units, setUnits] = React.useState<Units>("ngdl");
  const [touched, setTouched] = React.useState(false);

  const testosteronen = parseFloat(testosterone);
  const estradioln = parseFloat(estradiol);

  const tValid =
    testosterone !== "" && Number.isFinite(testosteronen) && testosteronen > 0;
  const eValid =
    estradiol !== "" && Number.isFinite(estradioln) && estradioln > 0;

  const result = React.useMemo(() => {
    if (!tValid || !eValid) return null;
    const tNgDl =
      units === "nmoll" ? testosteronen * 28.84 : testosteronen;
    const ratio = tNgDl / estradioln;
    return { ratio, tNgDl };
  }, [tValid, eValid, testosteronen, estradioln, units]);

  function interpretationKey(): string {
    if (!result) return "";
    const r = result.ratio;
    if (sex === "male") {
      if (r < 10) return "result.male.low";
      if (r <= 40) return "result.male.normal";
      return "result.male.high";
    } else {
      if (r < 0.2) return "result.female.low";
      if (r <= 3) return "result.female.normal";
      return "result.female.high";
    }
  }

  function reset() {
    setTestosterone("");
    setEstradiol("");
    setAge("");
    setTouched(false);
    setSex("male");
    setUnits("ngdl");
    setTiming("follicular");
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

  const showError = touched && (!tValid || !eValid);
  const timingKeys: Timing[] = ["follicular", "ovulatory", "luteal", "postmenopausal"];

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ter-testosterone">{t("field.testosteroneLevel")}</Label>
              <Input
                id="ter-testosterone"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.testosterone")}
                value={testosterone}
                onChange={(e) => { setTestosterone(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ter-tunits">{t("field.units")}</Label>
              <select
                id="ter-tunits"
                value={units}
                onChange={(e) => { setUnits(e.target.value as Units); setTouched(true); }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                <option value="ngdl">{t("units.ngdl")}</option>
                <option value="nmoll">{t("units.nmoll")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ter-estradiol">{t("field.estradiolLevel")}</Label>
              <Input
                id="ter-estradiol"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.estradiol")}
                value={estradiol}
                onChange={(e) => { setEstradiol(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ter-sex">{t("field.sex")}</Label>
              <select
                id="ter-sex"
                value={sex}
                onChange={(e) => { setSex(e.target.value as Sex); setTouched(true); }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                <option value="male">{t("sex.male")}</option>
                <option value="female">{t("sex.female")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ter-age">{t("field.age")}</Label>
              <Input
                id="ter-age"
                type="number"
                inputMode="numeric"
                placeholder={t("placeholder.age")}
                value={age}
                onChange={(e) => { setAge(e.target.value); setTouched(true); }}
              />
            </div>
            {sex === "female" && (
              <div className="space-y-2">
                <Label htmlFor="ter-timing">{t("field.measurementTiming")}</Label>
                <select
                  id="ter-timing"
                  value={timing}
                  onChange={(e) => { setTiming(e.target.value as Timing); setTouched(true); }}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  {timingKeys.map((k) => (
                    <option key={k} value={k}>{t(`timing.${k}` as never)}</option>
                  ))}
                </select>
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-semibold text-zinc-600">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="flex flex-col rounded bg-white px-3 py-2 text-sm border border-zinc-100">
                  <span className="text-zinc-500 text-xs">{t("result.ratio")}</span>
                  <span className="font-semibold text-2xl text-green-700">{fmt(result.ratio)}</span>
                </div>
                <div className="flex flex-col rounded bg-white px-3 py-2 text-sm border border-zinc-100">
                  <span className="text-zinc-500 text-xs">{t("result.testosterone")} ({t("result.testosteroneUnit")})</span>
                  <span className="font-semibold">{fmt(result.tNgDl, 1)}</span>
                </div>
              </div>
              <div className="rounded bg-white px-3 py-2 text-sm border border-zinc-100">
                <span className="font-medium text-zinc-700">{t("result.interpretation")}: </span>
                <span className="text-zinc-600">{t(interpretationKey() as never)}</span>
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
