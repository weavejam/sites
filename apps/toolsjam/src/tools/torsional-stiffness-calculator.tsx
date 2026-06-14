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

type SectionType = "circular";
const SECTION_TYPES: SectionType[] = ["circular"];

function formatNum(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(digits)).toString();
}

export default function TorsionalStiffnessCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.torsional-stiffness-calculator");

  const [sectionType, setSectionType] = React.useState<SectionType>("circular");
  const [torque, setTorque] = React.useState("");
  const [angle, setAngle] = React.useState("");
  const [shearModulus, setShearModulus] = React.useState("");
  const [length, setLength] = React.useState("");
  const [diameter, setDiameter] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const T = parseFloat(torque);
  const theta = parseFloat(angle);
  const G = parseFloat(shearModulus);
  const L = parseFloat(length);
  const d = parseFloat(diameter);

  const valid =
    torque !== "" && angle !== "" && shearModulus !== "" &&
    length !== "" && diameter !== "" &&
    Number.isFinite(T) && Number.isFinite(theta) && Number.isFinite(G) &&
    Number.isFinite(L) && Number.isFinite(d) &&
    T > 0 && theta > 0 && G > 0 && L > 0 && d > 0;

  const result = React.useMemo<{
    stiffness: number;
    stiffnessMeasured: number;
    shearStress: number;
    polarMoment: number;
    strainEnergy: number;
  } | null>(() => {
    if (!valid) return null;
    const G_Pa = G * 1e9;
    const J = (Math.PI * Math.pow(d, 4)) / 32;
    // Analytical torsional stiffness K = G·J/L (N·m/rad)
    const stiffness = (G_Pa * J) / L;
    // Measured torsional stiffness K = T/θ (N·m/rad)
    const stiffnessMeasured = T / theta;
    // Max shear stress τ = T·r/J (in MPa)
    const shearStress = (T * (d / 2)) / J / 1e6;
    // Strain energy U = T²·L/(2·G·J) (in J)
    const strainEnergy = (T * T * L) / (2 * G_Pa * J);
    return { stiffness, stiffnessMeasured, shearStress, polarMoment: J, strainEnergy };
  }, [valid, T, theta, G, L, d]);

  function loadExample(t_: string, a: string, g: string, l: string, di: string) {
    setTorque(t_); setAngle(a); setShearModulus(g); setLength(l); setDiameter(di);
    setTouched(true);
  }

  function reset() {
    setTorque(""); setAngle(""); setShearModulus("");
    setLength(""); setDiameter(""); setTouched(false);
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
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch { break; }
    }
    return arr;
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

  const showError = touched && !valid;

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
          <div className="space-y-2">
            <Label>{t("field.crossSectionType")}</Label>
            <div className="flex flex-wrap gap-2">
              {SECTION_TYPES.map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant={sectionType === s ? "default" : "outline"}
                  onClick={() => setSectionType(s)}
                >
                  {t(`type.${s}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="ts-torque">{t("field.torque")}</Label>
              <Input
                id="ts-torque"
                type="number"
                inputMode="decimal"
                value={torque}
                placeholder={t("placeholder.torque")}
                onChange={(e) => { setTorque(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ts-angle">{t("field.angle")}</Label>
              <Input
                id="ts-angle"
                type="number"
                inputMode="decimal"
                value={angle}
                placeholder={t("placeholder.angle")}
                onChange={(e) => { setAngle(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ts-g">{t("field.shearModulus")}</Label>
              <Input
                id="ts-g"
                type="number"
                inputMode="decimal"
                value={shearModulus}
                placeholder={t("placeholder.shearModulus")}
                onChange={(e) => { setShearModulus(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ts-l">{t("field.length")}</Label>
              <Input
                id="ts-l"
                type="number"
                inputMode="decimal"
                value={length}
                placeholder={t("placeholder.length")}
                onChange={(e) => { setLength(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ts-d">{t("field.diameter")}</Label>
              <Input
                id="ts-d"
                type="number"
                inputMode="decimal"
                value={diameter}
                placeholder={t("placeholder.diameter")}
                onChange={(e) => { setDiameter(e.target.value); setTouched(true); }}
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
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.stiffness", { value: formatNum(result.stiffness) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.stiffnessMeasured", { value: formatNum(result.stiffnessMeasured) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.shearStress", { value: formatNum(result.shearStress) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.polarMoment", { value: result.polarMoment.toExponential(4) })}
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.strainEnergy", { value: formatNum(result.strainEnergy) })}
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
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1500", "0.05", "80", "1.5", "0.03")}
          >
            {t("examples.loadSteel")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("800", "0.08", "26", "2.0", "0.04")}
          >
            {t("examples.loadAluminum")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("200", "0.02", "40", "0.5", "0.01")}
          >
            {t("examples.loadBrass")}
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
