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

type Gender = "male" | "female";
type MarkerStatus = "normal" | "low" | "high";
type IronStatus = "normal" | "depleted" | "deficiency" | "anemia" | "overload";

interface MarkerResult {
  value: number;
  status: MarkerStatus;
}

interface IronAssessment {
  hemoglobin: MarkerResult;
  ferritin?: MarkerResult;
  transferrinSat?: MarkerResult;
  tibc?: MarkerResult;
  mcv?: MarkerResult;
  overallStatus: IronStatus;
}

function assessMarker(value: number, low: number, high: number): MarkerResult {
  const status: MarkerStatus = value < low ? "low" : value > high ? "high" : "normal";
  return { value, status };
}

function computeIronStatus(
  hemoglobin: number,
  ferritin: number | null,
  transferrinSat: number | null,
  tibc: number | null,
  mcv: number | null,
  gender: Gender,
): IronAssessment | null {
  if (!Number.isFinite(hemoglobin) || hemoglobin <= 0) return null;

  const hgbLow = gender === "male" ? 13.0 : 12.0;
  const hgbHigh = gender === "male" ? 17.5 : 15.5;
  const hgbResult = assessMarker(hemoglobin, hgbLow, hgbHigh);

  const ferritinResult = (ferritin !== null && Number.isFinite(ferritin) && ferritin > 0)
    ? assessMarker(ferritin, 12, 300) : undefined;
  const transferrinSatResult = (transferrinSat !== null && Number.isFinite(transferrinSat) && transferrinSat >= 0)
    ? assessMarker(transferrinSat, 20, 50) : undefined;
  const tibcResult = (tibc !== null && Number.isFinite(tibc) && tibc > 0)
    ? assessMarker(tibc, 240, 450) : undefined;
  const mcvResult = (mcv !== null && Number.isFinite(mcv) && mcv > 0)
    ? assessMarker(mcv, 80, 100) : undefined;

  let overallStatus: IronStatus = "normal";

  const ferritinLow = ferritinResult?.status === "low";
  const ferritinHigh = ferritinResult?.status === "high";
  const tSatLow = transferrinSatResult?.status === "low";
  const tSatHigh = transferrinSatResult?.status === "high";
  const tibcHigh = tibcResult?.status === "high";
  const tibcLow = tibcResult?.status === "low";
  const hgbLow2 = hgbResult.status === "low";

  if (ferritinHigh || tSatHigh || tibcLow) {
    overallStatus = "overload";
  } else if (hgbLow2 && (ferritinLow || tSatLow || tibcHigh)) {
    overallStatus = "anemia";
  } else if (!hgbLow2 && (ferritinLow || tSatLow) && tibcHigh) {
    overallStatus = "deficiency";
  } else if (ferritinLow && !tSatLow && !tibcHigh && !hgbLow2) {
    overallStatus = "depleted";
  }

  return {
    hemoglobin: hgbResult,
    ferritin: ferritinResult,
    transferrinSat: transferrinSatResult,
    tibc: tibcResult,
    mcv: mcvResult,
    overallStatus,
  };
}

function statusColor(s: MarkerStatus): string {
  if (s === "normal") return "text-green-700";
  if (s === "low") return "text-red-700";
  return "text-orange-700";
}

function overallColor(s: IronStatus): string {
  if (s === "normal") return "text-green-700 bg-green-50 border-green-200";
  if (s === "overload") return "text-orange-700 bg-orange-50 border-orange-200";
  return "text-red-700 bg-red-50 border-red-200";
}

const GENDERS: Gender[] = ["male", "female"];

export default function IronDeficiencyCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.iron-deficiency-calculator");

  const [gender, setGender] = React.useState<Gender>("female");
  const [hemoglobin, setHemoglobin] = React.useState("");
  const [ferritin, setFerritin] = React.useState("");
  const [transferrinSat, setTransferrinSat] = React.useState("");
  const [tibc, setTibc] = React.useState("");
  const [mcv, setMcv] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<IronAssessment | null>(() => {
    if (!touched) return null;
    return computeIronStatus(
      parseFloat(hemoglobin),
      ferritin !== "" ? parseFloat(ferritin) : null,
      transferrinSat !== "" ? parseFloat(transferrinSat) : null,
      tibc !== "" ? parseFloat(tibc) : null,
      mcv !== "" ? parseFloat(mcv) : null,
      gender,
    );
  }, [touched, gender, hemoglobin, ferritin, transferrinSat, tibc, mcv]);

  function reset() {
    setGender("female");
    setHemoglobin("");
    setFerritin("");
    setTransferrinSat("");
    setTibc("");
    setMcv("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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

  const showError = touched && result === null;

  const markerRows: { key: string; label: string; result: MarkerResult | undefined }[] = result ? [
    { key: "hemoglobin", label: t("result.hemoglobinLabel"), result: result.hemoglobin },
    { key: "ferritin", label: t("result.ferritinLabel"), result: result.ferritin },
    { key: "transferrinSat", label: t("result.transferrinSatLabel"), result: result.transferrinSat },
    { key: "tibc", label: t("result.tibcLabel"), result: result.tibc },
    { key: "mcv", label: t("result.mcvLabel"), result: result.mcv },
  ] : [];

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
            <Label>{t("field.gender")}</Label>
            <div className="flex flex-wrap gap-2">
              {GENDERS.map((g) => (
                <Button
                  key={g}
                  type="button"
                  variant={gender === g ? "default" : "outline"}
                  onClick={() => setGender(g)}
                >
                  {t(`gender.${g}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="iron-hgb">{t("field.hemoglobin")}</Label>
              <Input
                id="iron-hgb"
                type="number"
                inputMode="decimal"
                value={hemoglobin}
                placeholder={t("placeholder.hemoglobin")}
                onChange={(e) => { setHemoglobin(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iron-ferritin">{t("field.ferritin")}</Label>
              <Input
                id="iron-ferritin"
                type="number"
                inputMode="decimal"
                value={ferritin}
                placeholder={t("placeholder.ferritin")}
                onChange={(e) => { setFerritin(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iron-tsat">{t("field.transferrinSat")}</Label>
              <Input
                id="iron-tsat"
                type="number"
                inputMode="decimal"
                value={transferrinSat}
                placeholder={t("placeholder.transferrinSat")}
                onChange={(e) => { setTransferrinSat(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iron-tibc">{t("field.tibc")}</Label>
              <Input
                id="iron-tibc"
                type="number"
                inputMode="decimal"
                value={tibc}
                placeholder={t("placeholder.tibc")}
                onChange={(e) => { setTibc(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iron-mcv">{t("field.mcv")}</Label>
              <Input
                id="iron-mcv"
                type="number"
                inputMode="decimal"
                value={mcv}
                placeholder={t("placeholder.mcv")}
                onChange={(e) => { setMcv(e.target.value); setTouched(true); }}
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="space-y-4">
              <div className={`rounded-lg border p-4 ${overallColor(result.overallStatus)}`}>
                <div className="text-sm font-medium opacity-70">{t("result.status")}</div>
                <div className="text-xl font-bold mt-1">
                  {t(`status.${result.overallStatus}` as never)}
                </div>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-sm font-medium text-zinc-500 mb-3">{t("result.heading")}</div>
                <div className="space-y-2">
                  {markerRows.filter((r) => r.result !== undefined).map((row) => (
                    <div key={row.key} className="flex items-center justify-between text-sm">
                      <span className="text-zinc-700">{row.label}</span>
                      <span className={`font-medium ${statusColor(row.result!.status)}`}>
                        {row.result!.value} — {t(`result.${row.result!.status}` as never)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-zinc-500">{t("result.note")}</p>
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
