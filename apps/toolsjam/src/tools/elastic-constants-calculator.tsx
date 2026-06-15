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

interface ElasticResults {
  E: number;
  G: number;
  K: number;
  nu: number;
  lambda: number;
  shearWaveSpeed: number | null;
}

function fmt(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals, minimumFractionDigits: 0 });
}

type ConstKey = "E" | "G" | "K" | "nu";

function deriveAllFrom(
  a: ConstKey, aV: number,
  b: ConstKey, bV: number
): Record<ConstKey, number> | null {
  let E: number | null = null, G: number | null = null, K: number | null = null, nu: number | null = null;
  const set = (k: ConstKey, v: number) => {
    if (k === "E") E = v; else if (k === "G") G = v; else if (k === "K") K = v; else nu = v;
  };
  set(a, aV); set(b, bV);

  if (E !== null && nu !== null) { G = E / (2*(1+nu)); K = E / (3*(1-2*nu)); }
  else if (E !== null && G !== null) { nu = E/(2*G)-1; K = (E*G)/(3*(3*G-E)); }
  else if (E !== null && K !== null) { nu = (3*K-E)/(6*K); G = (3*E*K)/(9*K-E); }
  else if (G !== null && nu !== null) { E = 2*G*(1+nu); K = (2*G*(1+nu))/(3*(1-2*nu)); }
  else if (G !== null && K !== null) { E = (9*K*G)/(3*K+G); nu = (3*K-2*G)/(2*(3*K+G)); }
  else if (K !== null && nu !== null) { E = 3*K*(1-2*nu); G = (3*K*(1-2*nu))/(2*(1+nu)); }

  if (E === null || G === null || K === null || nu === null) return null;
  if (!Number.isFinite(E) || !Number.isFinite(G) || !Number.isFinite(K) || !Number.isFinite(nu)) return null;
  if (E <= 0 || G <= 0 || K <= 0 || nu <= -1 || nu >= 0.5) return null;
  return { E, G, K, nu };
}

function solveElastic(
  E: number | null,
  G: number | null,
  K: number | null,
  nu: number | null
): ElasticResults | null {
  const inputs: Record<ConstKey, number | null> = { E, G, K, nu };
  const keys: ConstKey[] = ["E", "G", "K", "nu"];
  const supplied = keys.filter((k) => inputs[k] !== null && Number.isFinite(inputs[k]!));
  if (supplied.length < 2) return null;

  // Try each pair; derive all 4 from the first successful pair
  let derived: Record<ConstKey, number> | null = null;
  outer:
  for (let i = 0; i < supplied.length - 1; i++) {
    for (let j = i + 1; j < supplied.length; j++) {
      const d = deriveAllFrom(supplied[i], inputs[supplied[i]]!, supplied[j], inputs[supplied[j]]!);
      if (d) { derived = d; break outer; }
    }
  }
  if (!derived) return null;

  // Consistency check: every originally supplied constant must agree within 1%
  const tol = 0.01;
  for (const k of supplied) {
    const orig = inputs[k]!;
    const der = derived[k];
    if (Math.abs(orig - der) / Math.abs(der) > tol) return null;
  }

  const { E: eV, G: gV, K: kV, nu: nuV } = derived;
  const lambda = kV - (2 / 3) * gV;
  return { E: eV, G: gV, K: kV, nu: nuV, lambda, shearWaveSpeed: null };
}

export default function ElasticConstantsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.elastic-constants-calculator");

  const [youngsModulus, setYoungsModulus] = React.useState("");
  const [shearModulus, setShearModulus] = React.useState("");
  const [bulkModulus, setBulkModulus] = React.useState("");
  const [poissonsRatio, setPoissonsRatio] = React.useState("");
  const [density, setDensity] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const eRaw = youngsModulus !== "" ? parseFloat(youngsModulus) : null;
  const gRaw = shearModulus !== "" ? parseFloat(shearModulus) : null;
  const kRaw = bulkModulus !== "" ? parseFloat(bulkModulus) : null;
  const nuRaw = poissonsRatio !== "" ? parseFloat(poissonsRatio) : null;
  const rhoRaw = density !== "" ? parseFloat(density) : null;

  const filledCount = [eRaw, gRaw, kRaw, nuRaw].filter(
    (v) => v !== null && Number.isFinite(v)
  ).length;

  const results = React.useMemo<ElasticResults | null>(() => {
    if (!touched) return null;
    const res = solveElastic(eRaw, gRaw, kRaw, nuRaw);
    if (res && rhoRaw !== null && rhoRaw > 0 && Number.isFinite(rhoRaw)) {
      res.shearWaveSpeed = Math.sqrt(res.G * 1e6 / rhoRaw);
    }
    return res;
  }, [touched, eRaw, gRaw, kRaw, nuRaw, rhoRaw]);

  const showInvalidError = touched && filledCount < 2;
  const showInconsistentError = touched && filledCount >= 2 && results === null;

  function reset() {
    setYoungsModulus("");
    setShearModulus("");
    setBulkModulus("");
    setPoissonsRatio("");
    setDensity("");
    setTouched(false);
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
              <Label htmlFor="ec-youngsModulus">{t("field.youngsModulus")}</Label>
              <Input
                id="ec-youngsModulus"
                type="number"
                inputMode="decimal"
                value={youngsModulus}
                placeholder={t("placeholder.youngsModulus")}
                onChange={(e) => { setYoungsModulus(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ec-shearModulus">{t("field.shearModulus")}</Label>
              <Input
                id="ec-shearModulus"
                type="number"
                inputMode="decimal"
                value={shearModulus}
                placeholder={t("placeholder.shearModulus")}
                onChange={(e) => { setShearModulus(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ec-bulkModulus">{t("field.bulkModulus")}</Label>
              <Input
                id="ec-bulkModulus"
                type="number"
                inputMode="decimal"
                value={bulkModulus}
                placeholder={t("placeholder.bulkModulus")}
                onChange={(e) => { setBulkModulus(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ec-poissonsRatio">{t("field.poissonsRatio")}</Label>
              <Input
                id="ec-poissonsRatio"
                type="number"
                inputMode="decimal"
                value={poissonsRatio}
                placeholder={t("placeholder.poissonsRatio")}
                onChange={(e) => { setPoissonsRatio(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ec-density">{t("field.density")}</Label>
              <Input
                id="ec-density"
                type="number"
                inputMode="decimal"
                value={density}
                placeholder={t("placeholder.density")}
                onChange={(e) => { setDensity(e.target.value); setTouched(false); }}
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

          {showInvalidError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showInconsistentError && (
            <p className="text-sm text-red-600">{t("error.inconsistent")}</p>
          )}

          {results !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-xs text-zinc-500">{t("result.youngsModulus")}: </span>
                  <span className="font-semibold">{fmt(results.E, 2)} MPa</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.shearModulus")}: </span>
                  <span className="font-semibold">{fmt(results.G, 2)} MPa</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.bulkModulus")}: </span>
                  <span className="font-semibold">{fmt(results.K, 2)} MPa</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.poissonsRatio")}: </span>
                  <span className="font-semibold">{fmt(results.nu, 4)}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">{t("result.lameFirst")}: </span>
                  <span className="font-semibold">{fmt(results.lambda, 2)} MPa</span>
                </div>
                {results.shearWaveSpeed !== null && (
                  <div>
                    <span className="text-xs text-zinc-500">{t("result.shearWaveSpeed")}: </span>
                    <span className="font-semibold">{fmt(results.shearWaveSpeed, 1)} m/s</span>
                  </div>
                )}
              </div>
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
