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

type YesNo = "yes" | "no";
type RiskLevel = "high" | "intermediate" | "low";

interface PecarnResult {
  riskLevel: RiskLevel;
  ageGroup: "under2" | "over2";
}

function assessPECARN(
  totalMonths: number,
  loc: YesNo,
  vomiting: YesNo,
  severeHeadache: YesNo,
  severeMechanism: YesNo,
  palpableSkullFracture: YesNo,
  scalpHematoma: YesNo,
  alteredMentalStatus: YesNo,
  actingAbnormally: YesNo,
  postTraumaticSeizure: YesNo
): PecarnResult {
  const isUnder2 = totalMonths < 24;

  if (isUnder2) {
    if (alteredMentalStatus === "yes" || palpableSkullFracture === "yes") {
      return { riskLevel: "high", ageGroup: "under2" };
    }
    if (
      scalpHematoma === "yes" ||
      loc === "yes" ||
      severeMechanism === "yes" ||
      actingAbnormally === "yes" ||
      postTraumaticSeizure === "yes"
    ) {
      return { riskLevel: "intermediate", ageGroup: "under2" };
    }
    return { riskLevel: "low", ageGroup: "under2" };
  } else {
    if (alteredMentalStatus === "yes") {
      return { riskLevel: "high", ageGroup: "over2" };
    }
    if (
      palpableSkullFracture === "yes" ||
      loc === "yes" ||
      vomiting === "yes" ||
      severeHeadache === "yes" ||
      severeMechanism === "yes" ||
      actingAbnormally === "yes" ||
      postTraumaticSeizure === "yes"
    ) {
      return { riskLevel: "intermediate", ageGroup: "over2" };
    }
    return { riskLevel: "low", ageGroup: "over2" };
  }
}

const RISK_COLORS: Record<RiskLevel, string> = {
  high: "border-red-200 bg-red-50",
  intermediate: "border-amber-200 bg-amber-50",
  low: "border-green-200 bg-green-50",
};

const RISK_TEXT_COLORS: Record<RiskLevel, string> = {
  high: "text-red-700",
  intermediate: "text-amber-700",
  low: "text-green-700",
};

export default function PecarnCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.pecarn-calculator");

  const [ageYears, setAgeYears] = React.useState("");
  const [ageMonths, setAgeMonths] = React.useState("");
  const [loc, setLoc] = React.useState<YesNo | "">("");
  const [vomiting, setVomiting] = React.useState<YesNo | "">("");
  const [severeHeadache, setSevereHeadache] = React.useState<YesNo | "">("");
  const [severeMechanism, setSevereMechanism] = React.useState<YesNo | "">("");
  const [palpableSkullFracture, setPalpableSkullFracture] = React.useState<YesNo | "">("");
  const [scalpHematoma, setScalpHematoma] = React.useState<YesNo | "">("");
  const [alteredMentalStatus, setAlteredMentalStatus] = React.useState<YesNo | "">("");
  const [actingAbnormally, setActingAbnormally] = React.useState<YesNo | "">("");
  const [postTraumaticSeizure, setPostTraumaticSeizure] = React.useState<YesNo | "">("");
  const [result, setResult] = React.useState<PecarnResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [touched, setTouched] = React.useState(false);

  function calculate() {
    setTouched(true);
    const years = parseFloat(ageYears) || 0;
    const months = parseFloat(ageMonths) || 0;
    const totalMonths = years * 12 + months;

    if (totalMonths <= 0 || years > 18) {
      setError(t("error.invalid"));
      setResult(null);
      return;
    }

    const fields: (YesNo | "")[] = [
      loc, vomiting, severeHeadache, severeMechanism,
      palpableSkullFracture, scalpHematoma, alteredMentalStatus,
      actingAbnormally, postTraumaticSeizure,
    ];
    if (fields.some((f) => f === "")) {
      setError(t("error.allFields"));
      setResult(null);
      return;
    }

    setResult(assessPECARN(
      totalMonths,
      loc as YesNo, vomiting as YesNo, severeHeadache as YesNo,
      severeMechanism as YesNo, palpableSkullFracture as YesNo,
      scalpHematoma as YesNo, alteredMentalStatus as YesNo,
      actingAbnormally as YesNo, postTraumaticSeizure as YesNo
    ));
    setError(null);
  }

  function reset() {
    setAgeYears(""); setAgeMonths(""); setLoc(""); setVomiting("");
    setSevereHeadache(""); setSevereMechanism(""); setPalpableSkullFracture("");
    setScalpHematoma(""); setAlteredMentalStatus(""); setActingAbnormally("");
    setPostTraumaticSeizure(""); setResult(null); setError(null); setTouched(false);
  }

  function loadExample(
    ay: string, am: string,
    locVal: YesNo, vom: YesNo, sh: YesNo, sm: YesNo,
    psf: YesNo, sca: YesNo, ams: YesNo, aa: YesNo, pts: YesNo
  ) {
    setAgeYears(ay); setAgeMonths(am); setLoc(locVal); setVomiting(vom);
    setSevereHeadache(sh); setSevereMechanism(sm); setPalpableSkullFracture(psf);
    setScalpHematoma(sca); setAlteredMentalStatus(ams); setActingAbnormally(aa);
    setPostTraumaticSeizure(pts); setResult(null); setError(null); setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[];
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

  function YesNoField({ label, value, onChange }: { label: string; value: YesNo | ""; onChange: (v: YesNo) => void }) {
    return (
      <div className="space-y-1">
        <Label className="text-sm">{label}</Label>
        <div className="flex gap-2">
          {(["yes", "no"] as YesNo[]).map((v) => (
            <Button
              key={v}
              type="button"
              size="sm"
              variant={value === v ? "default" : "outline"}
              onClick={() => onChange(v)}
            >
              {t(`yesNo.${v}` as never)}
            </Button>
          ))}
        </div>
      </div>
    );
  }

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
              <Label htmlFor="pec-years">{t("field.ageYears")}</Label>
              <Input
                id="pec-years"
                type="number"
                inputMode="numeric"
                value={ageYears}
                placeholder={t("placeholder.ageYears")}
                onChange={(e) => setAgeYears(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pec-months">{t("field.ageMonths")}</Label>
              <Input
                id="pec-months"
                type="number"
                inputMode="numeric"
                value={ageMonths}
                placeholder={t("placeholder.ageMonths")}
                onChange={(e) => setAgeMonths(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <YesNoField label={t("field.alteredMentalStatus")} value={alteredMentalStatus} onChange={setAlteredMentalStatus} />
            <YesNoField label={t("field.palpableSkullFracture")} value={palpableSkullFracture} onChange={setPalpableSkullFracture} />
            <YesNoField label={t("field.scalpHematoma")} value={scalpHematoma} onChange={setScalpHematoma} />
            <YesNoField label={t("field.lossOfConsciousness")} value={loc} onChange={setLoc} />
            <YesNoField label={t("field.vomiting")} value={vomiting} onChange={setVomiting} />
            <YesNoField label={t("field.severeHeadache")} value={severeHeadache} onChange={setSevereHeadache} />
            <YesNoField label={t("field.severeMechanism")} value={severeMechanism} onChange={setSevereMechanism} />
            <YesNoField label={t("field.actingAbnormally")} value={actingAbnormally} onChange={setActingAbnormally} />
            <YesNoField label={t("field.postTraumaticSeizure")} value={postTraumaticSeizure} onChange={setPostTraumaticSeizure} />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={calculate}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {error && touched && <p className="text-sm text-red-600">{error}</p>}

          {result && !error && (
            <div className={`rounded-lg border p-4 space-y-3 ${RISK_COLORS[result.riskLevel]}`}>
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className={`text-2xl font-bold ${RISK_TEXT_COLORS[result.riskLevel]}`}>
                {t(`result.levels.${result.riskLevel}` as never)}
              </div>
              <div className={`text-sm font-medium ${RISK_TEXT_COLORS[result.riskLevel]}`}>
                {t(`result.riskPercents.${result.riskLevel}` as never)}
              </div>
              <div className="text-sm text-zinc-700">
                {t(`result.recommendations.${result.riskLevel}` as never)}
              </div>
              <div className="text-xs text-zinc-500">
                {t("result.ageGroup")}: {result.ageGroup === "under2" ? t("result.ageGroupUnder2") : t("result.ageGroupOver2")}
              </div>
              <p className="text-xs text-zinc-500">{t("result.note")}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-3">
        <p className="text-sm font-medium text-zinc-600">{t("examples.intro")}</p>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1", "2", "no", "no", "no", "yes", "yes", "yes", "no", "no", "no")}
          >
            {t("examples.loadHighRisk")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1", "8", "no", "no", "no", "no", "no", "yes", "no", "yes", "no")}
          >
            {t("examples.loadIntermediate")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("7", "0", "no", "no", "no", "no", "no", "no", "no", "no", "no")}
          >
            {t("examples.loadLowRisk")}
          </Button>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("examples.heading")}</h2>
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
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
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
