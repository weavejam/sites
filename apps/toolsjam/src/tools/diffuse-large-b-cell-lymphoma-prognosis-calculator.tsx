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

type EcogPS = "0" | "1" | "2" | "3" | "4";
type AnnArborStage = "I" | "II" | "III" | "IV";
type LDHLevel = "normal" | "elevated";
type BulkyDisease = "no" | "yes";
type CellOfOrigin = "gcb" | "abc" | "unclassified";
type DoubleHit = "negative" | "positive";
type IPIGroup = "low" | "lowIntermediate" | "highIntermediate" | "high";
type RIPIGroup = "veryGood" | "good" | "poor";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

const IPI_OS_5YR: Record<IPIGroup, string> = {
  low: "~73%",
  lowIntermediate: "~51%",
  highIntermediate: "~43%",
  high: "~26%",
};

const RIPI_OS_4YR: Record<RIPIGroup, string> = {
  veryGood: "~94%",
  good: "~79%",
  poor: "~55%",
};

function computeIPI(params: {
  age: number;
  ecog: EcogPS;
  stage: AnnArborStage;
  extranodal: number;
  ldh: LDHLevel;
}): {
  ipiScore: number;
  agePoint: number;
  ecogPoint: number;
  ldhPoint: number;
  extranodPoint: number;
  stagePoint: number;
  ipiGroup: IPIGroup;
  ripiGroup: RIPIGroup;
} {
  const agePoint = params.age > 60 ? 1 : 0;
  const ecogPoint = parseInt(params.ecog) >= 2 ? 1 : 0;
  const ldhPoint = params.ldh === "elevated" ? 1 : 0;
  const extranodPoint = params.extranodal > 1 ? 1 : 0;
  const stagePoint = (params.stage === "III" || params.stage === "IV") ? 1 : 0;

  const ipiScore = agePoint + ecogPoint + ldhPoint + extranodPoint + stagePoint;

  const ipiGroup: IPIGroup =
    ipiScore <= 1 ? "low"
    : ipiScore === 2 ? "lowIntermediate"
    : ipiScore === 3 ? "highIntermediate"
    : "high";

  const ripiGroup: RIPIGroup =
    ipiScore === 0 ? "veryGood"
    : ipiScore <= 2 ? "good"
    : "poor";

  return { ipiScore, agePoint, ecogPoint, ldhPoint, extranodPoint, stagePoint, ipiGroup, ripiGroup };
}

const ECOG_OPTIONS: EcogPS[] = ["0", "1", "2", "3", "4"];
const STAGE_OPTIONS: AnnArborStage[] = ["I", "II", "III", "IV"];

const GROUP_COLORS: Record<IPIGroup, string> = {
  low: "text-green-700 bg-green-50 border-green-200",
  lowIntermediate: "text-yellow-700 bg-yellow-50 border-yellow-200",
  highIntermediate: "text-orange-700 bg-orange-50 border-orange-200",
  high: "text-red-700 bg-red-50 border-red-200",
};

export default function DiffuseLargeBCellLymphomaPrognosisCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.diffuse-large-b-cell-lymphoma-prognosis-calculator");

  const [age, setAge] = React.useState("");
  const [ecog, setEcog] = React.useState<EcogPS | "">("");
  const [stage, setStage] = React.useState<AnnArborStage | "">("");
  const [extranodal, setExtranodal] = React.useState("");
  const [ldh, setLdh] = React.useState<LDHLevel | "">("");
  const [bulky, setBulky] = React.useState<BulkyDisease>("no");
  const [cellOfOrigin, setCellOfOrigin] = React.useState<CellOfOrigin | "">("");
  const [doubleHit, setDoubleHit] = React.useState<DoubleHit | "">("");
  const [cci, setCci] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const ageNum = parseFloat(age);
  const extranodNum = parseFloat(extranodal);

  const valid = {
    age: age !== "" && Number.isFinite(ageNum) && ageNum >= 1 && ageNum <= 120,
    ecog: ecog !== "",
    stage: stage !== "",
    extranodal: extranodal !== "" && Number.isFinite(extranodNum) && extranodNum >= 0,
    ldh: ldh !== "",
  };
  const allValid = Object.values(valid).every(Boolean);

  const result = React.useMemo(() => {
    if (!allValid) return null;
    return computeIPI({
      age: ageNum,
      ecog: ecog as EcogPS,
      stage: stage as AnnArborStage,
      extranodal: extranodNum,
      ldh: ldh as LDHLevel,
    });
  }, [allValid, ageNum, ecog, stage, extranodNum, ldh]);

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<{ q: string; a: string }[]>(() => {
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

  function reset() {
    setAge(""); setEcog(""); setStage(""); setExtranodal(""); setLdh("");
    setBulky("no"); setCellOfOrigin(""); setDoubleHit(""); setCci("");
    setTouched(false);
  }

  function loadProfile(
    a: string, ec: EcogPS, st: AnnArborStage, exn: string,
    l: LDHLevel, bk: BulkyDisease, co: CellOfOrigin | "", dh: DoubleHit | "", c: string,
  ) {
    setAge(a); setEcog(ec); setStage(st); setExtranodal(exn); setLdh(l);
    setBulky(bk); setCellOfOrigin(co); setDoubleHit(dh); setCci(c);
    setTouched(true);
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
              <Label htmlFor="dlbcl-age">{t("field.age")}</Label>
              <Input
                id="dlbcl-age"
                type="number"
                inputMode="decimal"
                value={age}
                placeholder={t("placeholder.age")}
                onChange={(e) => { setAge(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dlbcl-extranodal">{t("field.extranodal")}</Label>
              <Input
                id="dlbcl-extranodal"
                type="number"
                inputMode="numeric"
                value={extranodal}
                placeholder={t("placeholder.extranodal")}
                onChange={(e) => { setExtranodal(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.ecog")}</Label>
            <div className="flex flex-wrap gap-2">
              {ECOG_OPTIONS.map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant={ecog === v ? "default" : "outline"}
                  onClick={() => { setEcog(v); setTouched(true); }}
                >
                  {t(`option.ecog.${v}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("field.stage")}</Label>
            <div className="flex flex-wrap gap-2">
              {STAGE_OPTIONS.map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant={stage === v ? "default" : "outline"}
                  onClick={() => { setStage(v); setTouched(true); }}
                >
                  {t(`option.stage.${v}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t("field.ldh")}</Label>
              <div className="flex flex-wrap gap-2">
                {(["normal", "elevated"] as LDHLevel[]).map((v) => (
                  <Button
                    key={v}
                    type="button"
                    variant={ldh === v ? "default" : "outline"}
                    onClick={() => { setLdh(v); setTouched(true); }}
                  >
                    {t(`option.ldh.${v}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("field.bulky")}</Label>
              <div className="flex flex-wrap gap-2">
                {(["no", "yes"] as BulkyDisease[]).map((v) => (
                  <Button
                    key={v}
                    type="button"
                    variant={bulky === v ? "default" : "outline"}
                    onClick={() => { setBulky(v); setTouched(true); }}
                  >
                    {t(`option.bulky.${v}` as never)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>{t("field.cellOfOrigin")}</Label>
              <div className="flex flex-wrap gap-2">
                {(["gcb", "abc", "unclassified"] as CellOfOrigin[]).map((v) => (
                  <Button
                    key={v}
                    type="button"
                    size="sm"
                    variant={cellOfOrigin === v ? "default" : "outline"}
                    onClick={() => { setCellOfOrigin(v); setTouched(true); }}
                  >
                    {t(`option.cellOfOrigin.${v}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("field.doubleHit")}</Label>
              <div className="flex flex-wrap gap-2">
                {(["negative", "positive"] as DoubleHit[]).map((v) => (
                  <Button
                    key={v}
                    type="button"
                    size="sm"
                    variant={doubleHit === v ? "default" : "outline"}
                    onClick={() => { setDoubleHit(v); setTouched(true); }}
                  >
                    {t(`option.doubleHit.${v}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dlbcl-cci">{t("field.cci")}</Label>
              <Input
                id="dlbcl-cci"
                type="number"
                inputMode="numeric"
                value={cci}
                placeholder={t("placeholder.cci")}
                onChange={(e) => { setCci(e.target.value); setTouched(true); }}
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

          {touched && !allValid && (
            <div className="space-y-1">
              {!valid.age && <p className="text-sm text-red-600">{t("error.invalidAge")}</p>}
              {!valid.ecog && <p className="text-sm text-red-600">{t("error.selectEcog")}</p>}
              {!valid.stage && <p className="text-sm text-red-600">{t("error.selectStage")}</p>}
              {!valid.extranodal && <p className="text-sm text-red-600">{t("error.invalidExtranodal")}</p>}
              {!valid.ldh && <p className="text-sm text-red-600">{t("error.selectLdh")}</p>}
            </div>
          )}

          {result !== null && (
            <div className={`rounded-lg border p-4 space-y-3 ${GROUP_COLORS[result.ipiGroup]}`}>
              <div className="text-sm font-medium">{t("result.heading")}</div>
              <div className="text-3xl font-bold">
                {t("result.ipiScore")}: {result.ipiScore} / 5
              </div>
              <div className="text-lg font-semibold">
                {t("result.ipiGroup")}: {t(`ipiGroup.${result.ipiGroup}` as never)}
              </div>
              <div className="text-sm">
                {t("result.ripiGroup")}: {t(`ripiGroup.${result.ripiGroup}` as never)}
              </div>
              <div className="grid gap-1 text-sm sm:grid-cols-2">
                <div>{t("result.os5yr")}: {IPI_OS_5YR[result.ipiGroup]}</div>
                <div>{t("result.os4yr")}: {RIPI_OS_4YR[result.ripiGroup]}</div>
              </div>
              <div className="border-t pt-2">
                <div className="text-xs font-medium mb-1">{t("result.breakdown")}</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
                  <span>{t("result.agePoints")}: {result.agePoint}</span>
                  <span>{t("result.ecogPoints")}: {result.ecogPoint}</span>
                  <span>{t("result.ldhPoints")}: {result.ldhPoint}</span>
                  <span>{t("result.extranodPoints")}: {result.extranodPoint}</span>
                  <span>{t("result.stagePoints")}: {result.stagePoint}</span>
                </div>
              </div>
              {doubleHit === "positive" && (
                <p className="text-xs font-medium border-t pt-2">
                  ⚠ {t("result.doubleHitNote")}
                </p>
              )}
              <p className="text-xs opacity-75">{t("result.note")}</p>
            </div>
          )}
        </CardContent>
      </Card>

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
            onClick={() => loadProfile("45", "0", "I", "0", "normal", "no", "gcb", "negative", "1")}>
            {t("examples.loadLow")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadProfile("68", "1", "III", "1", "elevated", "no", "abc", "negative", "3")}>
            {t("examples.loadIntermediate")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadProfile("72", "2", "IV", "2", "elevated", "yes", "abc", "negative", "5")}>
            {t("examples.loadHigh")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadProfile("58", "1", "IV", "3", "elevated", "yes", "unclassified", "positive", "2")}>
            {t("examples.loadDoubleHit")}
          </Button>
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
