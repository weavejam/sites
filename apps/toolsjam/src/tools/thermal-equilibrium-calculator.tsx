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

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * Math.pow(10, d)) / Math.pow(10, d)).toLocaleString("en-US", {
    maximumFractionDigits: d,
  });
}

export default function ThermalEquilibriumCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.thermal-equilibrium-calculator");

  const [t1, setT1] = React.useState("");
  const [m1, setM1] = React.useState("");
  const [c1, setC1] = React.useState("");
  const [t2, setT2] = React.useState("");
  const [m2, setM2] = React.useState("");
  const [c2, setC2] = React.useState("");
  const [k, setK] = React.useState("");
  const [area, setArea] = React.useState("");
  const [contactLength, setContactLength] = React.useState("");
  const [timeS, setTimeS] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const T1 = parseFloat(t1);
  const M1 = parseFloat(m1);
  const C1 = parseFloat(c1);
  const T2 = parseFloat(t2);
  const M2 = parseFloat(m2);
  const C2 = parseFloat(c2);
  const K = k !== "" ? parseFloat(k) : null;
  const A = area !== "" ? parseFloat(area) : null;
  const CL = contactLength !== "" ? parseFloat(contactLength) : null;
  const TS = timeS !== "" ? parseFloat(timeS) : null;

  const valid =
    t1 !== "" && Number.isFinite(T1) &&
    m1 !== "" && Number.isFinite(M1) && M1 > 0 &&
    c1 !== "" && Number.isFinite(C1) && C1 > 0 &&
    t2 !== "" && Number.isFinite(T2) &&
    m2 !== "" && Number.isFinite(M2) && M2 > 0 &&
    c2 !== "" && Number.isFinite(C2) && C2 > 0;

  const result = React.useMemo(() => {
    if (!valid) return null;
    // Equilibrium temperature: T_eq = (m1*c1*T1 + m2*c2*T2) / (m1*c1 + m2*c2)
    const tEq = (M1 * C1 * T1 + M2 * C2 * T2) / (M1 * C1 + M2 * C2);
    // Heat transferred from hotter object
    const heatTransferred = M1 * C1 * Math.abs(T1 - tEq);
    // Conduction heat flow (Fourier's law): Q = k * A * ΔT * t / L
    let conductionHeat: number | null = null;
    if (K !== null && A !== null && CL !== null && TS !== null && Number.isFinite(K) && K > 0 && Number.isFinite(A) && A > 0 && Number.isFinite(CL) && CL > 0 && Number.isFinite(TS) && TS > 0) {
      conductionHeat = (K * A * Math.abs(T1 - T2) * TS) / CL;
    }
    return { tEq, heatTransferred, conductionHeat };
  }, [valid, T1, M1, C1, T2, M2, C2, K, A, CL, TS]);

  function loadExample(
    t1v: string, m1v: string, c1v: string,
    t2v: string, m2v: string, c2v: string,
    kv: string, av: string, clv: string, tv: string
  ) {
    setT1(t1v); setM1(m1v); setC1(c1v);
    setT2(t2v); setM2(m2v); setC2(c2v);
    setK(kv); setArea(av); setContactLength(clv); setTimeS(tv);
    setTouched(true);
  }

  function reset() {
    setT1(""); setM1(""); setC1("");
    setT2(""); setM2(""); setC2("");
    setK(""); setArea(""); setContactLength(""); setTimeS("");
    setTouched(false);
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
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch {
        break;
      }
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
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold text-zinc-800">{t("field.object1")}</h3>
              <div className="space-y-2">
                <Label htmlFor="teq-t1">{t("field.temp1")}</Label>
                <Input
                  id="teq-t1"
                  type="number"
                  inputMode="decimal"
                  value={t1}
                  placeholder={t("placeholder.temp")}
                  onChange={(e) => { setT1(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teq-m1">{t("field.mass1")}</Label>
                <Input
                  id="teq-m1"
                  type="number"
                  inputMode="decimal"
                  value={m1}
                  placeholder={t("placeholder.mass")}
                  onChange={(e) => { setM1(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teq-c1">{t("field.specificHeat1")}</Label>
                <Input
                  id="teq-c1"
                  type="number"
                  inputMode="decimal"
                  value={c1}
                  placeholder={t("placeholder.specificHeat")}
                  onChange={(e) => { setC1(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-zinc-800">{t("field.object2")}</h3>
              <div className="space-y-2">
                <Label htmlFor="teq-t2">{t("field.temp2")}</Label>
                <Input
                  id="teq-t2"
                  type="number"
                  inputMode="decimal"
                  value={t2}
                  placeholder={t("placeholder.temp")}
                  onChange={(e) => { setT2(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teq-m2">{t("field.mass2")}</Label>
                <Input
                  id="teq-m2"
                  type="number"
                  inputMode="decimal"
                  value={m2}
                  placeholder={t("placeholder.mass")}
                  onChange={(e) => { setM2(e.target.value); setTouched(true); }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teq-c2">{t("field.specificHeat2")}</Label>
                <Input
                  id="teq-c2"
                  type="number"
                  inputMode="decimal"
                  value={c2}
                  placeholder={t("placeholder.specificHeat")}
                  onChange={(e) => { setC2(e.target.value); setTouched(true); }}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="teq-k">{t("field.thermalConductivity")}</Label>
              <Input
                id="teq-k"
                type="number"
                inputMode="decimal"
                value={k}
                placeholder={t("placeholder.optional")}
                onChange={(e) => { setK(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teq-area">{t("field.contactArea")}</Label>
              <Input
                id="teq-area"
                type="number"
                inputMode="decimal"
                value={area}
                placeholder={t("placeholder.optional")}
                onChange={(e) => { setArea(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teq-cl">{t("field.contactLength")}</Label>
              <Input
                id="teq-cl"
                type="number"
                inputMode="decimal"
                value={contactLength}
                placeholder={t("placeholder.optional")}
                onChange={(e) => { setContactLength(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teq-time">{t("field.time")}</Label>
              <Input
                id="teq-time"
                type="number"
                inputMode="decimal"
                value={timeS}
                placeholder={t("placeholder.optional")}
                onChange={(e) => { setTimeS(e.target.value); setTouched(true); }}
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

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-xs text-zinc-500">{t("result.equilibriumTemp")}</span>
                  <div className="text-xl font-semibold text-zinc-900">{fmt(result.tEq, 4)} °C</div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.heatTransferred")}</span>
                  <div className="text-xl font-semibold text-zinc-900">{fmt(result.heatTransferred, 2)} J</div>
                </div>
                {result.conductionHeat !== null && (
                  <div>
                    <span className="text-xs text-zinc-500">{t("result.conductionHeat")}</span>
                    <div className="text-xl font-semibold text-zinc-900">{fmt(result.conductionHeat, 2)} J</div>
                  </div>
                )}
              </div>
              <div className="mt-2 text-xs text-zinc-500">{t("formula")}</div>
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
            onClick={() => loadExample("90", "1.0", "4200", "20", "0.5", "900", "50", "0.05", "0.1", "300")}
          >
            {t("examples.loadHotWater")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("500", "10.0", "450", "25", "2.0", "800", "200", "0.2", "0.05", "120")}
          >
            {t("examples.loadMetalHeating")}
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
