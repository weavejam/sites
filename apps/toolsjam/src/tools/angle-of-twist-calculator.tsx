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

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) < 0.001 && n !== 0) {
    return n.toExponential(4);
  }
  return (Math.round(n * 1e8) / 1e8).toLocaleString("en-US", {
    maximumFractionDigits: 8,
  });
}

export default function AngleOfTwistCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.angle-of-twist-calculator");

  const [torque, setTorque] = React.useState("");
  const [length, setLength] = React.useState("");
  const [shearModulus, setShearModulus] = React.useState("");
  const [diameter, setDiameter] = React.useState("");
  const [polarMoment, setPolarMoment] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const T = parseFloat(torque);
  const L = parseFloat(length);
  const G = parseFloat(shearModulus);
  const d = parseFloat(diameter);
  const J_manual = parseFloat(polarMoment);

  const result = React.useMemo<{ rad: number; deg: number } | null>(() => {
    if (!Number.isFinite(T) || !Number.isFinite(L) || !Number.isFinite(G)) return null;
    if (G <= 0) return null;

    let J: number;
    if (polarMoment !== "" && Number.isFinite(J_manual) && J_manual > 0) {
      J = J_manual;
    } else if (diameter !== "" && Number.isFinite(d) && d > 0) {
      J = (Math.PI * Math.pow(d, 4)) / 32;
    } else {
      return null;
    }

    const G_pa = G * 1e6; // MPa → Pa
    const rad = (T * L) / (G_pa * J);
    const deg = rad * (180 / Math.PI);
    return { rad, deg };
  }, [T, L, G, d, J_manual, diameter, polarMoment]);

  function reset() {
    setTorque("");
    setLength("");
    setShearModulus("");
    setDiameter("");
    setPolarMoment("");
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

  const allFieldsValid =
    torque !== "" && Number.isFinite(T) &&
    length !== "" && Number.isFinite(L) &&
    shearModulus !== "" && Number.isFinite(G) && G > 0 &&
    ((diameter !== "" && Number.isFinite(d) && d > 0) ||
      (polarMoment !== "" && Number.isFinite(J_manual) && J_manual > 0));

  const showError = touched && !allFieldsValid;

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
              <Label htmlFor="aot-torque">{t("field.torque")}</Label>
              <Input
                id="aot-torque"
                type="number"
                inputMode="decimal"
                value={torque}
                placeholder={t("placeholder.torque")}
                onChange={(e) => { setTorque(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aot-length">{t("field.length")}</Label>
              <Input
                id="aot-length"
                type="number"
                inputMode="decimal"
                value={length}
                placeholder={t("placeholder.length")}
                onChange={(e) => { setLength(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aot-shear">{t("field.shearModulus")}</Label>
              <Input
                id="aot-shear"
                type="number"
                inputMode="decimal"
                value={shearModulus}
                placeholder={t("placeholder.shearModulus")}
                onChange={(e) => { setShearModulus(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aot-diameter">{t("field.diameter")}</Label>
              <Input
                id="aot-diameter"
                type="number"
                inputMode="decimal"
                value={diameter}
                placeholder={t("placeholder.diameter")}
                onChange={(e) => { setDiameter(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="aot-polar">{t("field.polarMoment")}</Label>
              <Input
                id="aot-polar"
                type="number"
                inputMode="decimal"
                value={polarMoment}
                placeholder={t("placeholder.polarMoment")}
                onChange={(e) => { setPolarMoment(e.target.value); setTouched(true); }}
              />
              <p className="text-xs text-zinc-500">{t("field.polarMomentHint")}</p>
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
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.radians", { value: formatNum(result.rad) })}
              </div>
              <div className="text-lg font-medium text-zinc-700">
                {t("result.degrees", { value: formatNum(result.deg) })}
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
