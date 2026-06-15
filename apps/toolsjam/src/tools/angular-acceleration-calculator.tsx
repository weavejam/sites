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

type Method = "velocity" | "torque" | "linear";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * 1e8) / 1e8).toLocaleString("en-US", {
    maximumFractionDigits: 8,
  });
}

export default function AngularAccelerationCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.angular-acceleration-calculator");

  const [method, setMethod] = React.useState<Method>("velocity");
  const [omega0, setOmega0] = React.useState("");
  const [omega, setOmega] = React.useState("");
  const [time, setTime] = React.useState("");
  const [torque, setTorque] = React.useState("");
  const [inertia, setInertia] = React.useState("");
  const [linearAcc, setLinearAcc] = React.useState("");
  const [radius, setRadius] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<number | null>(() => {
    if (method === "velocity") {
      const w0 = parseFloat(omega0);
      const w = parseFloat(omega);
      const t = parseFloat(time);
      if (!Number.isFinite(w0) || !Number.isFinite(w) || !Number.isFinite(t) || t === 0) return null;
      return (w - w0) / t;
    }
    if (method === "torque") {
      const tau = parseFloat(torque);
      const I = parseFloat(inertia);
      if (!Number.isFinite(tau) || !Number.isFinite(I) || I === 0) return null;
      return tau / I;
    }
    // linear
    const a = parseFloat(linearAcc);
    const r = parseFloat(radius);
    if (!Number.isFinite(a) || !Number.isFinite(r) || r === 0) return null;
    return a / r;
  }, [method, omega0, omega, time, torque, inertia, linearAcc, radius]);

  function reset() {
    setOmega0(""); setOmega(""); setTime("");
    setTorque(""); setInertia("");
    setLinearAcc(""); setRadius("");
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

  const isValid = result !== null;
  const showError = touched && !isValid;

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
            <Label>{t("field.method")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["velocity", "torque", "linear"] as Method[]).map((m) => (
                <Button key={m} type="button" variant={method === m ? "default" : "outline"}
                  onClick={() => { setMethod(m); setTouched(false); }}>
                  {t(`type.${m}` as never)}
                </Button>
              ))}
            </div>
          </div>

          {method === "velocity" && (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="aac-omega0">{t("field.initialOmega")}</Label>
                <Input id="aac-omega0" type="number" inputMode="decimal" value={omega0} placeholder={t("placeholder.omega0")}
                  onChange={(e) => { setOmega0(e.target.value); setTouched(true); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aac-omega">{t("field.finalOmega")}</Label>
                <Input id="aac-omega" type="number" inputMode="decimal" value={omega} placeholder={t("placeholder.omega")}
                  onChange={(e) => { setOmega(e.target.value); setTouched(true); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aac-time">{t("field.time")}</Label>
                <Input id="aac-time" type="number" inputMode="decimal" value={time} placeholder={t("placeholder.time")}
                  onChange={(e) => { setTime(e.target.value); setTouched(true); }} />
              </div>
            </div>
          )}

          {method === "torque" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="aac-torque">{t("field.torque")}</Label>
                <Input id="aac-torque" type="number" inputMode="decimal" value={torque} placeholder={t("placeholder.torque")}
                  onChange={(e) => { setTorque(e.target.value); setTouched(true); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aac-inertia">{t("field.inertia")}</Label>
                <Input id="aac-inertia" type="number" inputMode="decimal" value={inertia} placeholder={t("placeholder.inertia")}
                  onChange={(e) => { setInertia(e.target.value); setTouched(true); }} />
              </div>
            </div>
          )}

          {method === "linear" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="aac-linear">{t("field.linearAcc")}</Label>
                <Input id="aac-linear" type="number" inputMode="decimal" value={linearAcc} placeholder={t("placeholder.linearAcc")}
                  onChange={(e) => { setLinearAcc(e.target.value); setTouched(true); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aac-radius">{t("field.radius")}</Label>
                <Input id="aac-radius" type="number" inputMode="decimal" value={radius} placeholder={t("placeholder.radius")}
                  onChange={(e) => { setRadius(e.target.value); setTouched(true); }} />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {showError && <p className="text-sm text-red-600">{t("error.invalid")}</p>}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="text-2xl font-semibold text-zinc-900">
                {t("result.value", { result: formatNum(result) })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">{t("about.body")}</div>
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
          {howtoSteps.map((s, i) => <li key={i}>{s}</li>)}
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
