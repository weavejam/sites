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

type ChronicHealthStatus =
  | "none"
  | "cardiovascular"
  | "immunocompromised"
  | "metastatic_cancer"
  | "hematologic_malignancy"
  | "AIDS";
type AdmissionType =
  | "scheduled_surgical"
  | "unscheduled_surgical"
  | "emergency_medical";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

const SELECT_CLASS_NAME =
  "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500";

function fmt(value: number, decimals = 0): string {
  if (!Number.isFinite(value)) return "—";
  return value.toFixed(decimals);
}

function scoreAge(value: number): number {
  if (value < 45) return 0;
  if (value <= 64) return 5;
  if (value <= 74) return 13;
  return 18;
}

function scoreTemperature(value: number): number {
  return value >= 39 ? 3 : 0;
}

function scoreSystolicBp(value: number): number {
  if (value < 70) return 13;
  if (value <= 99) return 5;
  if (value >= 200) return 2;
  return 0;
}

function scoreHeartRate(value: number): number {
  if (value < 40) return 11;
  if (value <= 69) return 2;
  if (value <= 119) return 0;
  if (value <= 159) return 4;
  return 7;
}

function scoreRespiratoryRate(value: number): number {
  if (value < 6) return 17;
  if (value <= 11) return 8;
  if (value <= 19) return 0;
  if (value <= 34) return 1;
  if (value <= 39) return 9;
  return 11;
}

function scoreSpo2(value: number): number {
  if (value < 88) return 11;
  if (value <= 93) return 6;
  return 0;
}

function scorePh(value: number): number {
  if (value < 7.25) return 6;
  if (value <= 7.34) return 3;
  return 0;
}

function scoreSodium(value: number): number {
  if (value < 125) return 5;
  if (value >= 145) return 1;
  return 0;
}

function scorePotassium(value: number): number {
  if (value < 3) return 3;
  if (value >= 5) return 3;
  return 0;
}

function scoreCreatinine(value: number): number {
  if (value < 1.2) return 0;
  if (value < 2) return 4;
  return 7;
}

function scoreBilirubin(value: number): number {
  if (value < 4) return 0;
  if (value < 6) return 4;
  return 9;
}

function scoreWbc(value: number): number {
  if (value < 1) return 12;
  if (value >= 20) return 3;
  return 0;
}

function scoreGcs(value: number): number {
  if (value >= 14) return 0;
  if (value >= 11) return 5;
  if (value >= 9) return 7;
  if (value >= 6) return 13;
  return 26;
}

function scoreChronic(value: ChronicHealthStatus): number {
  switch (value) {
    case "cardiovascular":
      return 2;
    case "immunocompromised":
      return 6;
    case "metastatic_cancer":
      return 9;
    case "hematologic_malignancy":
      return 10;
    case "AIDS":
      return 17;
    default:
      return 0;
  }
}

function scoreAdmission(value: AdmissionType): number {
  switch (value) {
    case "unscheduled_surgical":
      return 8;
    case "emergency_medical":
      return 6;
    default:
      return 0;
  }
}

export default function SapsIICalculator(_props: { locale: Locale }) {
  const t = useTranslations(
    "tool.saps-ii-calculator-simplified-acute-physiology-ii-score-calculator"
  );

  const [age, setAge] = React.useState("");
  const [temperature, setTemperature] = React.useState("");
  const [systolicBloodPressure, setSystolicBloodPressure] = React.useState("");
  const [heartRate, setHeartRate] = React.useState("");
  const [respiratoryRate, setRespiratoryRate] = React.useState("");
  const [oxygenSaturation, setOxygenSaturation] = React.useState("");
  const [arterialPh, setArterialPh] = React.useState("");
  const [sodium, setSodium] = React.useState("");
  const [potassium, setPotassium] = React.useState("");
  const [creatinine, setCreatinine] = React.useState("");
  const [bilirubin, setBilirubin] = React.useState("");
  const [whiteBloodCellCount, setWhiteBloodCellCount] = React.useState("");
  const [glasgowComaScale, setGlasgowComaScale] = React.useState("");
  const [chronicHealthStatus, setChronicHealthStatus] =
    React.useState<ChronicHealthStatus>("none");
  const [admissionType, setAdmissionType] =
    React.useState<AdmissionType>("scheduled_surgical");
  const [touched, setTouched] = React.useState(false);

  const ageNum = parseFloat(age);
  const temperatureNum = parseFloat(temperature);
  const systolicBloodPressureNum = parseFloat(systolicBloodPressure);
  const heartRateNum = parseFloat(heartRate);
  const respiratoryRateNum = parseFloat(respiratoryRate);
  const oxygenSaturationNum = parseFloat(oxygenSaturation);
  const arterialPhNum = parseFloat(arterialPh);
  const sodiumNum = parseFloat(sodium);
  const potassiumNum = parseFloat(potassium);
  const creatinineNum = parseFloat(creatinine);
  const bilirubinNum = parseFloat(bilirubin);
  const whiteBloodCellCountNum = parseFloat(whiteBloodCellCount);
  const glasgowComaScaleNum = parseFloat(glasgowComaScale);

  const numberValues = [
    ageNum,
    temperatureNum,
    systolicBloodPressureNum,
    heartRateNum,
    respiratoryRateNum,
    oxygenSaturationNum,
    arterialPhNum,
    sodiumNum,
    potassiumNum,
    creatinineNum,
    bilirubinNum,
    whiteBloodCellCountNum,
    glasgowComaScaleNum,
  ];

  const allValid =
    numberValues.every((value) => Number.isFinite(value) && value >= 0) &&
    oxygenSaturationNum <= 100 &&
    glasgowComaScaleNum >= 3 &&
    glasgowComaScaleNum <= 15;

  const result = React.useMemo(() => {
    if (!allValid) return null;

    const components = {
      age: scoreAge(ageNum),
      temperature: scoreTemperature(temperatureNum),
      systolicBloodPressure: scoreSystolicBp(systolicBloodPressureNum),
      heartRate: scoreHeartRate(heartRateNum),
      respiratoryRate: scoreRespiratoryRate(respiratoryRateNum),
      oxygenSaturation: scoreSpo2(oxygenSaturationNum),
      arterialPh: scorePh(arterialPhNum),
      sodium: scoreSodium(sodiumNum),
      potassium: scorePotassium(potassiumNum),
      creatinine: scoreCreatinine(creatinineNum),
      bilirubin: scoreBilirubin(bilirubinNum),
      whiteBloodCellCount: scoreWbc(whiteBloodCellCountNum),
      glasgowComaScale: scoreGcs(glasgowComaScaleNum),
      chronicHealthStatus: scoreChronic(chronicHealthStatus),
      admissionType: scoreAdmission(admissionType),
    };

    const total = Object.values(components).reduce((sum, value) => sum + value, 0);
    const logit = -7.7631 + 0.0737 * total + 0.9971 * Math.log(total + 1);
    const predictedMortality = (Math.exp(logit) / (1 + Math.exp(logit))) * 100;

    let riskCategory: "low" | "moderate" | "high" | "very_high";
    if (predictedMortality < 10) riskCategory = "low";
    else if (predictedMortality < 30) riskCategory = "moderate";
    else if (predictedMortality < 60) riskCategory = "high";
    else riskCategory = "very_high";

    return { components, total, predictedMortality, riskCategory };
  }, [
    admissionType,
    ageNum,
    allValid,
    arterialPhNum,
    bilirubinNum,
    chronicHealthStatus,
    creatinineNum,
    glasgowComaScaleNum,
    heartRateNum,
    oxygenSaturationNum,
    potassiumNum,
    respiratoryRateNum,
    sodiumNum,
    systolicBloodPressureNum,
    temperatureNum,
    whiteBloodCellCountNum,
  ]);

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: FaqItem[] = React.useMemo(() => {
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

  function loadExample(example: {
    age: string;
    temperature: string;
    systolicBloodPressure: string;
    heartRate: string;
    respiratoryRate: string;
    oxygenSaturation: string;
    arterialPh: string;
    sodium: string;
    potassium: string;
    creatinine: string;
    bilirubin: string;
    whiteBloodCellCount: string;
    glasgowComaScale: string;
    chronicHealthStatus: ChronicHealthStatus;
    admissionType: AdmissionType;
  }) {
    setAge(example.age);
    setTemperature(example.temperature);
    setSystolicBloodPressure(example.systolicBloodPressure);
    setHeartRate(example.heartRate);
    setRespiratoryRate(example.respiratoryRate);
    setOxygenSaturation(example.oxygenSaturation);
    setArterialPh(example.arterialPh);
    setSodium(example.sodium);
    setPotassium(example.potassium);
    setCreatinine(example.creatinine);
    setBilirubin(example.bilirubin);
    setWhiteBloodCellCount(example.whiteBloodCellCount);
    setGlasgowComaScale(example.glasgowComaScale);
    setChronicHealthStatus(example.chronicHealthStatus);
    setAdmissionType(example.admissionType);
    setTouched(true);
  }

  function reset() {
    setAge("");
    setTemperature("");
    setSystolicBloodPressure("");
    setHeartRate("");
    setRespiratoryRate("");
    setOxygenSaturation("");
    setArterialPh("");
    setSodium("");
    setPotassium("");
    setCreatinine("");
    setBilirubin("");
    setWhiteBloodCellCount("");
    setGlasgowComaScale("");
    setChronicHealthStatus("none");
    setAdmissionType("scheduled_surgical");
    setTouched(false);
  }

  const showError = touched && !allValid;

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
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="saps-age">{t("field.age")}</Label>
              <Input id="saps-age" type="number" inputMode="decimal" value={age} placeholder={t("placeholder.age")} onChange={(e) => { setAge(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="saps-temperature">{t("field.temperature")}</Label>
              <Input id="saps-temperature" type="number" inputMode="decimal" value={temperature} placeholder={t("placeholder.temperature")} onChange={(e) => { setTemperature(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="saps-sbp">{t("field.systolicBloodPressure")}</Label>
              <Input id="saps-sbp" type="number" inputMode="decimal" value={systolicBloodPressure} placeholder={t("placeholder.systolicBloodPressure")} onChange={(e) => { setSystolicBloodPressure(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="saps-hr">{t("field.heartRate")}</Label>
              <Input id="saps-hr" type="number" inputMode="decimal" value={heartRate} placeholder={t("placeholder.heartRate")} onChange={(e) => { setHeartRate(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="saps-rr">{t("field.respiratoryRate")}</Label>
              <Input id="saps-rr" type="number" inputMode="decimal" value={respiratoryRate} placeholder={t("placeholder.respiratoryRate")} onChange={(e) => { setRespiratoryRate(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="saps-spo2">{t("field.oxygenSaturation")}</Label>
              <Input id="saps-spo2" type="number" inputMode="decimal" value={oxygenSaturation} placeholder={t("placeholder.oxygenSaturation")} onChange={(e) => { setOxygenSaturation(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="saps-ph">{t("field.arterialPh")}</Label>
              <Input id="saps-ph" type="number" inputMode="decimal" value={arterialPh} placeholder={t("placeholder.arterialPh")} onChange={(e) => { setArterialPh(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="saps-sodium">{t("field.sodium")}</Label>
              <Input id="saps-sodium" type="number" inputMode="decimal" value={sodium} placeholder={t("placeholder.sodium")} onChange={(e) => { setSodium(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="saps-potassium">{t("field.potassium")}</Label>
              <Input id="saps-potassium" type="number" inputMode="decimal" value={potassium} placeholder={t("placeholder.potassium")} onChange={(e) => { setPotassium(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="saps-creatinine">{t("field.creatinine")}</Label>
              <Input id="saps-creatinine" type="number" inputMode="decimal" value={creatinine} placeholder={t("placeholder.creatinine")} onChange={(e) => { setCreatinine(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="saps-bilirubin">{t("field.bilirubin")}</Label>
              <Input id="saps-bilirubin" type="number" inputMode="decimal" value={bilirubin} placeholder={t("placeholder.bilirubin")} onChange={(e) => { setBilirubin(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="saps-wbc">{t("field.whiteBloodCellCount")}</Label>
              <Input id="saps-wbc" type="number" inputMode="decimal" value={whiteBloodCellCount} placeholder={t("placeholder.whiteBloodCellCount")} onChange={(e) => { setWhiteBloodCellCount(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="saps-gcs">{t("field.glasgowComaScale")}</Label>
              <Input id="saps-gcs" type="number" inputMode="decimal" value={glasgowComaScale} placeholder={t("placeholder.glasgowComaScale")} onChange={(e) => { setGlasgowComaScale(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="saps-chronic">{t("field.chronicHealthStatus")}</Label>
              <div>
                <select
                  id="saps-chronic"
                  value={chronicHealthStatus}
                  onChange={(e) => {
                    setChronicHealthStatus(e.target.value as ChronicHealthStatus);
                    setTouched(true);
                  }}
                  className={SELECT_CLASS_NAME}
                >
                  <option value="none">{t("option.none")}</option>
                  <option value="cardiovascular">{t("option.cardiovascular")}</option>
                  <option value="immunocompromised">{t("option.immunocompromised")}</option>
                  <option value="metastatic_cancer">{t("option.metastatic_cancer")}</option>
                  <option value="hematologic_malignancy">{t("option.hematologic_malignancy")}</option>
                  <option value="AIDS">{t("option.AIDS")}</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="saps-admission">{t("field.admissionType")}</Label>
              <div>
                <select
                  id="saps-admission"
                  value={admissionType}
                  onChange={(e) => {
                    setAdmissionType(e.target.value as AdmissionType);
                    setTouched(true);
                  }}
                  className={SELECT_CLASS_NAME}
                >
                  <option value="scheduled_surgical">{t("option.scheduled_surgical")}</option>
                  <option value="unscheduled_surgical">{t("option.unscheduled_surgical")}</option>
                  <option value="emergency_medical">{t("option.emergency_medical")}</option>
                </select>
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

          {showError && <p className="text-sm text-red-600">{t("error.invalid")}</p>}

          {result && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-4">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-md border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.totalScore")}</div>
                  <div className="text-3xl font-semibold text-zinc-900">{result.total}</div>
                </div>
                <div className="rounded-md border border-zinc-200 bg-white p-3">
                  <div className="text-xs text-zinc-500">{t("result.predictedMortality")}</div>
                  <div className="text-3xl font-semibold text-zinc-900">
                    {fmt(result.predictedMortality, 1)}%
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-zinc-500">{t("result.riskCategory")}</div>
                <div className="text-base font-semibold text-zinc-900">
                  {t(`category.${result.riskCategory}` as never)}
                </div>
              </div>
              <div className="grid gap-2 text-sm sm:grid-cols-2 xl:grid-cols-3">
                {[
                  [t("result.age"), result.components.age],
                  [t("result.temperature"), result.components.temperature],
                  [t("result.systolicBloodPressure"), result.components.systolicBloodPressure],
                  [t("result.heartRate"), result.components.heartRate],
                  [t("result.respiratoryRate"), result.components.respiratoryRate],
                  [t("result.oxygenSaturation"), result.components.oxygenSaturation],
                  [t("result.arterialPh"), result.components.arterialPh],
                  [t("result.sodium"), result.components.sodium],
                  [t("result.potassium"), result.components.potassium],
                  [t("result.creatinine"), result.components.creatinine],
                  [t("result.bilirubin"), result.components.bilirubin],
                  [t("result.whiteBloodCellCount"), result.components.whiteBloodCellCount],
                  [t("result.glasgowComaScale"), result.components.glasgowComaScale],
                  [t("result.chronicHealthStatus"), result.components.chronicHealthStatus],
                  [t("result.admissionType"), result.components.admissionType],
                ].map(([label, score]) => (
                  <div key={String(label)} className="rounded border border-zinc-200 bg-white p-2">
                    <div className="text-xs text-zinc-500">{label}</div>
                    <div className="font-semibold text-zinc-900">{score}</div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
              {examplesItems.map((example, index) => (
                <tr key={index} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{example.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{example.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{example.note ?? ""}</td>
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
            onClick={() =>
              loadExample({
                age: "55",
                temperature: "37",
                systolicBloodPressure: "120",
                heartRate: "85",
                respiratoryRate: "18",
                oxygenSaturation: "97",
                arterialPh: "7.40",
                sodium: "140",
                potassium: "4.0",
                creatinine: "1.0",
                bilirubin: "0.8",
                whiteBloodCellCount: "9",
                glasgowComaScale: "15",
                chronicHealthStatus: "none",
                admissionType: "scheduled_surgical",
              })
            }
          >
            {t("examples.loadStable")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample({
                age: "72",
                temperature: "39.2",
                systolicBloodPressure: "85",
                heartRate: "132",
                respiratoryRate: "36",
                oxygenSaturation: "90",
                arterialPh: "7.30",
                sodium: "148",
                potassium: "5.3",
                creatinine: "2.4",
                bilirubin: "6.5",
                whiteBloodCellCount: "22",
                glasgowComaScale: "10",
                chronicHealthStatus: "none",
                admissionType: "emergency_medical",
              })
            }
          >
            {t("examples.loadCritical")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample({
                age: "68",
                temperature: "38.1",
                systolicBloodPressure: "96",
                heartRate: "118",
                respiratoryRate: "24",
                oxygenSaturation: "92",
                arterialPh: "7.33",
                sodium: "132",
                potassium: "4.8",
                creatinine: "1.6",
                bilirubin: "4.8",
                whiteBloodCellCount: "18",
                glasgowComaScale: "13",
                chronicHealthStatus: "metastatic_cancer",
                admissionType: "unscheduled_surgical",
              })
            }
          >
            {t("examples.loadOncology")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
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
