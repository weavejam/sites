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

type GleasonGroup = "2-6" | "7" | "8-10";
type EcogGroup = "0" | "1" | "2";

function calcProstate(
  psa: number,
  gleason: GleasonGroup,
  ecog: EcogGroup,
  visceralMets: boolean,
  hemoglobin: number,
  ldh: number,
  alkPhos: number
): { score: number; risk: string; survival: string } | null {
  if (
    !Number.isFinite(psa) || psa < 0 ||
    !Number.isFinite(hemoglobin) || hemoglobin <= 0 ||
    !Number.isFinite(ldh) || ldh < 0 ||
    !Number.isFinite(alkPhos) || alkPhos < 0
  ) return null;

  // PSA score (log scale simplified: 0 if ≤4, 1 if 4-20, 2 if >20)
  let psaPoints = 0;
  if (psa > 20) psaPoints = 2;
  else if (psa > 4) psaPoints = 1;

  const gleasonPoints: Record<GleasonGroup, number> = { "2-6": 0, "7": 1, "8-10": 2 };
  const ecogPoints: Record<EcogGroup, number> = { "0": 0, "1": 1, "2": 2 };

  let hgbPoints = 0;
  if (hemoglobin < 10) hgbPoints = 2;
  else if (hemoglobin < 13) hgbPoints = 1;

  const ldhPoints = ldh > 200 ? 1 : 0;
  const alkPhosPoints = alkPhos > 120 ? 1 : 0;
  const visceralPoints = visceralMets ? 2 : 0;

  const score =
    psaPoints + gleasonPoints[gleason] + ecogPoints[ecog] +
    hgbPoints + ldhPoints + alkPhosPoints + visceralPoints;

  let risk: string;
  let survival: string;
  if (score <= 2) { risk = "low"; survival = "~26 months"; }
  else if (score <= 5) { risk = "intermediate"; survival = "~14 months"; }
  else { risk = "high"; survival = "~7 months"; }

  return { score, risk, survival };
}

export default function MetastaticProstateCancerCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.metastatic-prostate-cancer-prognosis-calculator");

  const [psa, setPsa] = React.useState("");
  const [gleason, setGleason] = React.useState<GleasonGroup>("7");
  const [ecog, setEcog] = React.useState<EcogGroup>("0");
  const [visceralMets, setVisceralMets] = React.useState(false);
  const [hemoglobin, setHemoglobin] = React.useState("");
  const [ldh, setLdh] = React.useState("");
  const [alkPhos, setAlkPhos] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const psaNum = parseFloat(psa);
  const hgbNum = parseFloat(hemoglobin);
  const ldhNum = parseFloat(ldh);
  const alkNum = parseFloat(alkPhos);

  const allValid =
    psa !== "" && Number.isFinite(psaNum) && psaNum >= 0 &&
    hemoglobin !== "" && Number.isFinite(hgbNum) && hgbNum > 0 &&
    ldh !== "" && Number.isFinite(ldhNum) && ldhNum >= 0 &&
    alkPhos !== "" && Number.isFinite(alkNum) && alkNum >= 0;

  const result = React.useMemo(() => {
    if (!allValid) return null;
    return calcProstate(psaNum, gleason, ecog, visceralMets, hgbNum, ldhNum, alkNum);
  }, [allValid, psaNum, gleason, ecog, visceralMets, hgbNum, ldhNum, alkNum]);

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
    setPsa(""); setGleason("7"); setEcog("0"); setVisceralMets(false);
    setHemoglobin(""); setLdh(""); setAlkPhos(""); setTouched(false);
  }

  const showError = touched && !allValid;

  const riskColors: Record<string, string> = {
    low: "text-green-700",
    intermediate: "text-yellow-700",
    high: "text-red-700",
  };

  const GLEASONS: GleasonGroup[] = ["2-6", "7", "8-10"];
  const ECOGS: EcogGroup[] = ["0", "1", "2"];

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
              <Label htmlFor="mpc-psa">{t("field.psa")}</Label>
              <Input id="mpc-psa" type="number" inputMode="decimal" value={psa} placeholder="10"
                onChange={(e) => { setPsa(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mpc-hgb">{t("field.hemoglobin")}</Label>
              <Input id="mpc-hgb" type="number" inputMode="decimal" value={hemoglobin} placeholder="13"
                onChange={(e) => { setHemoglobin(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mpc-ldh">{t("field.ldh")}</Label>
              <Input id="mpc-ldh" type="number" inputMode="decimal" value={ldh} placeholder="180"
                onChange={(e) => { setLdh(e.target.value); setTouched(true); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mpc-alkphos">{t("field.alkPhos")}</Label>
              <Input id="mpc-alkphos" type="number" inputMode="decimal" value={alkPhos} placeholder="100"
                onChange={(e) => { setAlkPhos(e.target.value); setTouched(true); }} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mpc-gleason">{t("field.gleason")}</Label>
            <select id="mpc-gleason" value={gleason}
              onChange={(e) => { setGleason(e.target.value as GleasonGroup); setTouched(true); }}
              className="border rounded-md px-3 py-2 text-sm w-full">
              {GLEASONS.map((g) => (
                <option key={g} value={g}>{t(`type.gleason${g.replace("-", "_")}` as never)}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mpc-ecog">{t("field.ecog")}</Label>
            <select id="mpc-ecog" value={ecog}
              onChange={(e) => { setEcog(e.target.value as EcogGroup); setTouched(true); }}
              className="border rounded-md px-3 py-2 text-sm w-full">
              {ECOGS.map((e) => (
                <option key={e} value={e}>{t(`type.ecog${e}` as never)}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input id="mpc-visceral" type="checkbox" checked={visceralMets}
              onChange={(e) => { setVisceralMets(e.target.checked); setTouched(true); }}
              className="h-4 w-4 rounded border-zinc-300" />
            <Label htmlFor="mpc-visceral">{t("field.visceralMets")}</Label>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {showError && <p className="text-sm text-red-600">{t("error.invalid")}</p>}

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="flex gap-8 items-baseline">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.score")}</div>
                  <div className="text-3xl font-bold text-zinc-900">{result.score}</div>
                </div>
                <div className={`text-lg font-semibold ${riskColors[result.risk] ?? "text-zinc-700"}`}>
                  {t(`result.${result.risk}` as never)}
                </div>
              </div>
              <div className="text-sm text-zinc-600">
                {t("result.survival")}: <span className="font-medium">{result.survival}</span>
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
