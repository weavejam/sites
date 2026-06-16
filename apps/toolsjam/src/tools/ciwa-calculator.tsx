"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/locales";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FaqItem {
  q: string;
  a: string;
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

type SeverityKey = "minimal" | "mild" | "moderate" | "severe";

function getSeverity(score: number): SeverityKey {
  if (score <= 8) return score === 0 ? "minimal" : "mild";
  if (score <= 15) return "moderate";
  return "severe";
}

const SELECT_CLASS =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";

export default function CiwaCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.ciwa-calculator");

  const [nausea, setNausea] = React.useState("0");
  const [tremor, setTremor] = React.useState("0");
  const [sweats, setSweats] = React.useState("0");
  const [anxiety, setAnxiety] = React.useState("0");
  const [agitation, setAgitation] = React.useState("0");
  const [tactile, setTactile] = React.useState("0");
  const [auditory, setAuditory] = React.useState("0");
  const [visual, setVisual] = React.useState("0");
  const [headache, setHeadache] = React.useState("0");
  const [orientation, setOrientation] = React.useState("0");
  const [touched, setTouched] = React.useState(false);

  const scores = [
    parseInt(nausea),
    parseInt(tremor),
    parseInt(sweats),
    parseInt(anxiety),
    parseInt(agitation),
    parseInt(tactile),
    parseInt(auditory),
    parseInt(visual),
    parseInt(headache),
    parseInt(orientation),
  ];

  const total = scores.reduce((a, b) => a + b, 0);
  const severity = getSeverity(total);

  function reset() {
    setNausea("0"); setTremor("0"); setSweats("0"); setAnxiety("0");
    setAgitation("0"); setTactile("0"); setAuditory("0"); setVisual("0");
    setHeadache("0"); setOrientation("0"); setTouched(false);
  }

  function loadExample(values: string[]) {
    setNausea(values[0]); setTremor(values[1]); setSweats(values[2]);
    setAnxiety(values[3]); setAgitation(values[4]); setTactile(values[5]);
    setAuditory(values[6]); setVisual(values[7]); setHeadache(values[8]);
    setOrientation(values[9]); setTouched(true);
  }

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

  const severityColorClass = {
    minimal: "text-green-700",
    mild: "text-yellow-700",
    moderate: "text-orange-700",
    severe: "text-red-700",
  }[severity];

  const scale07 = ["0", "1", "2", "3", "4", "5", "6", "7"];
  const scale04 = ["0", "1", "2", "3", "4"];

  type FieldDef = {
    id: string;
    labelKey: string;
    value: string;
    setter: (v: string) => void;
    scale: string[];
  };

  const fields: FieldDef[] = [
    { id: "nausea", labelKey: "field.nausea", value: nausea, setter: setNausea, scale: scale07 },
    { id: "tremor", labelKey: "field.tremor", value: tremor, setter: setTremor, scale: scale07 },
    { id: "sweats", labelKey: "field.sweats", value: sweats, setter: setSweats, scale: scale07 },
    { id: "anxiety", labelKey: "field.anxiety", value: anxiety, setter: setAnxiety, scale: scale07 },
    { id: "agitation", labelKey: "field.agitation", value: agitation, setter: setAgitation, scale: scale07 },
    { id: "tactile", labelKey: "field.tactile", value: tactile, setter: setTactile, scale: scale07 },
    { id: "auditory", labelKey: "field.auditory", value: auditory, setter: setAuditory, scale: scale07 },
    { id: "visual", labelKey: "field.visual", value: visual, setter: setVisual, scale: scale07 },
    { id: "headache", labelKey: "field.headache", value: headache, setter: setHeadache, scale: scale07 },
    { id: "orientation", labelKey: "field.orientation", value: orientation, setter: setOrientation, scale: scale04 },
  ];

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
            {fields.map((f) => (
              <div key={f.id} className="space-y-2">
                <Label htmlFor={`ciwa-${f.id}`}>{t(f.labelKey as never)}</Label>
                <select
                  id={`ciwa-${f.id}`}
                  className={SELECT_CLASS}
                  value={f.value}
                  onChange={(e) => { f.setter(e.target.value); setTouched(true); }}
                >
                  {f.scale.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {touched && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-3xl font-bold text-zinc-900">
                {total} / 67
              </div>
              <div className={`text-lg font-semibold ${severityColorClass}`}>
                {t(`severity.${severity}` as never)}
              </div>
              <div className="text-sm text-zinc-600">
                {t(`severity.${severity}_desc` as never)}
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
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample(["1","2","1","2","1","0","0","0","1","0"])}>
            {t("examples.loadMild")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample(["2","3","2","3","2","0","0","0","2","1"])}>
            {t("examples.loadModerate")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample(["5","6","5","6","5","4","4","4","5","2"])}>
            {t("examples.loadSevere")}
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
