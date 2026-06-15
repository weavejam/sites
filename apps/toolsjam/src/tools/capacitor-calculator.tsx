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

type Mode = "qcv" | "plate";

const MODES: Mode[] = ["qcv", "plate"];
const EPSILON_0 = 8.854187817e-12; // F/m

function formatResult(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) >= 1e6 || (Math.abs(n) < 1e-4 && n !== 0)) {
    return n.toExponential(4);
  }
  return n.toPrecision(6).replace(/\.?0+$/, "");
}

interface ExampleRow {
  input: string;
  output: string;
  note?: string;
}

export default function CapacitorCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.capacitor-calculator");

  const [mode, setMode] = React.useState<Mode>("qcv");

  // QCV mode: enter any two, solve for third
  const [capValue, setCapValue] = React.useState("");
  const [voltage, setVoltage] = React.useState("");
  const [charge, setCharge] = React.useState("");

  // Plate mode
  const [area, setArea] = React.useState("");
  const [distance, setDistance] = React.useState("");
  const [dielectric, setDielectric] = React.useState("");

  const [touched, setTouched] = React.useState(false);

  function handleReset() {
    setCapValue(""); setVoltage(""); setCharge("");
    setArea(""); setDistance(""); setDielectric("");
    setTouched(false);
  }

  // QCV result
  const qcvResult = React.useMemo(() => {
    if (mode !== "qcv") return null;
    const c = parseFloat(capValue);
    const v = parseFloat(voltage);
    const q = parseFloat(charge);
    const cOk = capValue !== "" && Number.isFinite(c) && c > 0;
    const vOk = voltage !== "" && Number.isFinite(v) && v !== 0;
    const qOk = charge !== "" && Number.isFinite(q);
    const filledCount = (cOk ? 1 : 0) + (vOk ? 1 : 0) + (qOk ? 1 : 0);
    if (filledCount < 2) return null;
    if (cOk && vOk) return { C: c, V: v, Q: c * v, solved: "Q" };
    if (cOk && qOk) return { C: c, Q: q, V: q / c, solved: "V" };
    if (vOk && qOk) return { V: v, Q: q, C: q / v, solved: "C" };
    return null;
  }, [mode, capValue, voltage, charge]);

  // Plate result
  const plateResult = React.useMemo(() => {
    if (mode !== "plate") return null;
    const a = parseFloat(area);
    const d = parseFloat(distance);
    const er = parseFloat(dielectric);
    const aOk = area !== "" && Number.isFinite(a) && a > 0;
    const dOk = distance !== "" && Number.isFinite(d) && d > 0;
    const erOk = dielectric !== "" && Number.isFinite(er) && er >= 1;
    if (!aOk || !dOk || !erOk) return null;
    const C = (EPSILON_0 * er * a) / d;
    return { C, er, a, d };
  }, [mode, area, distance, dielectric]);

  const examplesItems: ExampleRow[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleRow[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
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

  const showQcvError = touched && mode === "qcv" && qcvResult === null;
  const showPlateError = touched && mode === "plate" && plateResult === null;

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
            <Label>{t("field.mode")}</Label>
            <div className="flex flex-wrap gap-2">
              {MODES.map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={mode === m ? "default" : "outline"}
                  onClick={() => { setMode(m); setTouched(false); }}
                >
                  {t(`type.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {mode === "qcv" && (
            <div className="space-y-4">
              <p className="text-sm text-zinc-500">{t("type.qcv_desc")}</p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="cap-C">{t("field.capacitance")}</Label>
                  <Input
                    id="cap-C"
                    type="number"
                    inputMode="decimal"
                    value={capValue}
                    placeholder={t("placeholder.capacitance")}
                    onChange={(e) => { setCapValue(e.target.value); setTouched(false); }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cap-V">{t("field.voltage")}</Label>
                  <Input
                    id="cap-V"
                    type="number"
                    inputMode="decimal"
                    value={voltage}
                    placeholder={t("placeholder.voltage")}
                    onChange={(e) => { setVoltage(e.target.value); setTouched(false); }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cap-Q">{t("field.charge")}</Label>
                  <Input
                    id="cap-Q"
                    type="number"
                    inputMode="decimal"
                    value={charge}
                    placeholder={t("placeholder.charge")}
                    onChange={(e) => { setCharge(e.target.value); setTouched(false); }}
                  />
                </div>
              </div>
            </div>
          )}

          {mode === "plate" && (
            <div className="space-y-4">
              <p className="text-sm text-zinc-500">{t("type.plate_desc")}</p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="cap-area">{t("field.area")}</Label>
                  <Input
                    id="cap-area"
                    type="number"
                    inputMode="decimal"
                    value={area}
                    placeholder={t("placeholder.area")}
                    onChange={(e) => { setArea(e.target.value); setTouched(false); }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cap-dist">{t("field.distance")}</Label>
                  <Input
                    id="cap-dist"
                    type="number"
                    inputMode="decimal"
                    value={distance}
                    placeholder={t("placeholder.distance")}
                    onChange={(e) => { setDistance(e.target.value); setTouched(false); }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cap-er">{t("field.dielectric")}</Label>
                  <Input
                    id="cap-er"
                    type="number"
                    inputMode="decimal"
                    value={dielectric}
                    placeholder={t("placeholder.dielectric")}
                    onChange={(e) => { setDielectric(e.target.value); setTouched(false); }}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              {t("button.reset")}
            </Button>
          </div>

          {(showQcvError || showPlateError) && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && mode === "qcv" && qcvResult !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-3">
                <div>
                  <span className="text-sm text-zinc-500">{t("field.capacitance")}: </span>
                  <span className={"font-semibold " + (qcvResult.solved === "C" ? "text-blue-700" : "text-zinc-900")}>
                    {formatResult(qcvResult.C)} F
                  </span>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{t("field.voltage")}: </span>
                  <span className={"font-semibold " + (qcvResult.solved === "V" ? "text-blue-700" : "text-zinc-900")}>
                    {formatResult(qcvResult.V)} V
                  </span>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{t("field.charge")}: </span>
                  <span className={"font-semibold " + (qcvResult.solved === "Q" ? "text-blue-700" : "text-zinc-900")}>
                    {formatResult(qcvResult.Q)} C
                  </span>
                </div>
              </div>
              <div className="text-xs text-zinc-500">{t("result.solvedNote", { field: qcvResult.solved })}</div>
              <div className="text-xs text-zinc-500">{t("formula.qcv")}</div>
            </div>
          )}

          {touched && mode === "plate" && plateResult !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div>
                <span className="text-sm text-zinc-500">{t("result.plateCapacitance")}: </span>
                <span className="font-semibold text-blue-700">{formatResult(plateResult.C)} F</span>
              </div>
              <div className="text-xs text-zinc-500">{t("formula.plate")}</div>
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
