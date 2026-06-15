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

type MassUnit = "kg" | "lb";
type VelocityUnit = "ms" | "kmh" | "mph";

const MASS_UNITS: MassUnit[] = ["kg", "lb"];
const VEL_UNITS: VelocityUnit[] = ["ms", "kmh", "mph"];

function toKg(v: number, unit: MassUnit): number {
  return unit === "lb" ? v * 0.45359237 : v;
}
function toMs(v: number, unit: VelocityUnit): number {
  if (unit === "kmh") return v / 3.6;
  if (unit === "mph") return v * 0.44704;
  return v;
}
function fromMs(v: number, unit: VelocityUnit): number {
  if (unit === "kmh") return v * 3.6;
  if (unit === "mph") return v / 0.44704;
  return v;
}

interface ExampleRow {
  input: string;
  output: string;
  note?: string;
}

function formatNum(n: number, decimals = 3): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(decimals)).toString();
}

export default function CarCrashCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.car-crash-calculator");

  const [m1, setM1] = React.useState("");
  const [v1, setV1] = React.useState("");
  const [m1Unit, setM1Unit] = React.useState<MassUnit>("kg");
  const [v1Unit, setV1Unit] = React.useState<VelocityUnit>("ms");

  const [m2, setM2] = React.useState("");
  const [v2, setV2] = React.useState("");
  const [m2Unit, setM2Unit] = React.useState<MassUnit>("kg");
  const [v2Unit, setV2Unit] = React.useState<VelocityUnit>("ms");

  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    if (!touched) return null;
    const m1Kg = toKg(parseFloat(m1), m1Unit);
    const m2Kg = toKg(parseFloat(m2), m2Unit);
    const v1Ms = toMs(parseFloat(v1), v1Unit);
    const v2Ms = toMs(parseFloat(v2), v2Unit);

    if (!Number.isFinite(m1Kg) || m1Kg <= 0) return null;
    if (!Number.isFinite(m2Kg) || m2Kg <= 0) return null;
    if (!Number.isFinite(v1Ms)) return null;
    if (!Number.isFinite(v2Ms)) return null;

    // Conservation of momentum: perfectly inelastic collision
    const vFinalMs = (m1Kg * v1Ms + m2Kg * v2Ms) / (m1Kg + m2Kg);

    const ke1 = 0.5 * m1Kg * v1Ms * v1Ms;
    const ke2 = 0.5 * m2Kg * v2Ms * v2Ms;
    const keInitial = ke1 + ke2;
    const keFinal = 0.5 * (m1Kg + m2Kg) * vFinalMs * vFinalMs;
    const keLost = keInitial - keFinal;

    const impulse1 = m1Kg * (vFinalMs - v1Ms);
    const impulse2 = m2Kg * (vFinalMs - v2Ms);

    return {
      vFinalMs,
      vFinal: fromMs(vFinalMs, v1Unit),
      keInitial,
      keFinal,
      keLost,
      impulse1,
      impulse2,
      m1Kg,
      m2Kg,
    };
  }, [touched, m1, m2, v1, v2, m1Unit, m2Unit, v1Unit, v2Unit]);

  const showError = touched && result === null;

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

  function loadExample(
    m1v: string, v1v: string, m1u: MassUnit, v1u: VelocityUnit,
    m2v: string, v2v: string, m2u: MassUnit, v2u: VelocityUnit
  ) {
    setM1(m1v); setV1(v1v); setM1Unit(m1u); setV1Unit(v1u);
    setM2(m2v); setV2(v2v); setM2Unit(m2u); setV2Unit(v2u);
    setTouched(true);
  }

  function handleReset() {
    setM1(""); setV1(""); setM2(""); setV2("");
    setM1Unit("kg"); setV1Unit("ms"); setM2Unit("kg"); setV2Unit("ms");
    setTouched(false);
  }

  const velUnitLabel = v1Unit;

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
          {/* Vehicle 1 */}
          <div className="space-y-3 rounded-lg border border-zinc-100 p-4">
            <div className="text-sm font-semibold text-zinc-700">{t("label.vehicle1")}</div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cc-m1">{t("field.mass1")}</Label>
                <Input
                  id="cc-m1"
                  type="number"
                  inputMode="decimal"
                  value={m1}
                  placeholder={t("placeholder.mass")}
                  min="0"
                  step="any"
                  onChange={(e) => { setM1(e.target.value); setTouched(false); }}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("field.massUnit1")}</Label>
                <div className="flex flex-wrap gap-2">
                  {MASS_UNITS.map((u) => (
                    <Button
                      key={u}
                      type="button"
                      size="sm"
                      variant={m1Unit === u ? "default" : "outline"}
                      onClick={() => { setM1Unit(u); setTouched(false); }}
                    >
                      {t(`unit.${u}` as never)}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cc-v1">{t("field.velocity1")}</Label>
                <Input
                  id="cc-v1"
                  type="number"
                  inputMode="decimal"
                  value={v1}
                  placeholder={t("placeholder.velocity")}
                  step="any"
                  onChange={(e) => { setV1(e.target.value); setTouched(false); }}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("field.velocityUnit1")}</Label>
                <div className="flex flex-wrap gap-2">
                  {VEL_UNITS.map((u) => (
                    <Button
                      key={u}
                      type="button"
                      size="sm"
                      variant={v1Unit === u ? "default" : "outline"}
                      onClick={() => { setV1Unit(u); setTouched(false); }}
                    >
                      {t(`unit.${u}` as never)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle 2 */}
          <div className="space-y-3 rounded-lg border border-zinc-100 p-4">
            <div className="text-sm font-semibold text-zinc-700">{t("label.vehicle2")}</div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cc-m2">{t("field.mass2")}</Label>
                <Input
                  id="cc-m2"
                  type="number"
                  inputMode="decimal"
                  value={m2}
                  placeholder={t("placeholder.mass")}
                  min="0"
                  step="any"
                  onChange={(e) => { setM2(e.target.value); setTouched(false); }}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("field.massUnit2")}</Label>
                <div className="flex flex-wrap gap-2">
                  {MASS_UNITS.map((u) => (
                    <Button
                      key={u}
                      type="button"
                      size="sm"
                      variant={m2Unit === u ? "default" : "outline"}
                      onClick={() => { setM2Unit(u); setTouched(false); }}
                    >
                      {t(`unit.${u}` as never)}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cc-v2">{t("field.velocity2")}</Label>
                <Input
                  id="cc-v2"
                  type="number"
                  inputMode="decimal"
                  value={v2}
                  placeholder={t("placeholder.velocity")}
                  step="any"
                  onChange={(e) => { setV2(e.target.value); setTouched(false); }}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("field.velocityUnit2")}</Label>
                <div className="flex flex-wrap gap-2">
                  {VEL_UNITS.map((u) => (
                    <Button
                      key={u}
                      type="button"
                      size="sm"
                      variant={v2Unit === u ? "default" : "outline"}
                      onClick={() => { setV2Unit(u); setTouched(false); }}
                    >
                      {t(`unit.${u}` as never)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-zinc-500">{t("hint.negativeVelocity")}</p>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.finalVelocity")} ({t(`unit.${velUnitLabel}` as never)})</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.vFinal)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.keLost")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.keLost)} J</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.keInitial")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.keInitial)} J</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.keFinal")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.keFinal)} J</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.impulse1")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.impulse1)} N·s</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.impulse2")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.impulse2)} N·s</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
            onClick={() => loadExample("1000", "20", "kg", "ms", "1200", "-15", "kg", "ms")}>
            {t("examples.loadHeadOn")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("1500", "30", "kg", "ms", "1000", "10", "kg", "ms")}>
            {t("examples.loadRearEnd")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("2000", "25", "kg", "ms", "1500", "0", "kg", "ms")}>
            {t("examples.loadStationary")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
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
