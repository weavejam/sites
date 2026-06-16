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

function computeFena(
  uNa: number,
  sNa: number,
  uCr: number,
  sCr: number
): number {
  return ((uNa * sCr) / (sNa * uCr)) * 100;
}

function interpret(fena: number): "prerenal" | "indeterminate" | "intrinsic" {
  if (fena < 1) return "prerenal";
  if (fena <= 2) return "indeterminate";
  return "intrinsic";
}

export default function FenaCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.fena-calculator-fractional-excretion-of-sodium");
  const [uNa, setUNa] = React.useState("");
  const [sNa, setSNa] = React.useState("");
  const [uCr, setUCr] = React.useState("");
  const [sCr, setSCr] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const parsed = React.useMemo(() => {
    return {
      uNa: parseFloat(uNa),
      sNa: parseFloat(sNa),
      uCr: parseFloat(uCr),
      sCr: parseFloat(sCr),
    };
  }, [uNa, sNa, uCr, sCr]);

  const allValid = React.useMemo(() => {
    const { uNa: u, sNa: s, uCr: uc, sCr: sc } = parsed;
    return (
      Number.isFinite(u) &&
      Number.isFinite(s) &&
      Number.isFinite(uc) &&
      Number.isFinite(sc) &&
      u > 0 &&
      s > 0 &&
      uc > 0 &&
      sc > 0
    );
  }, [parsed]);

  const fena = React.useMemo<number | null>(() => {
    if (!allValid) return null;
    return computeFena(parsed.uNa, parsed.sNa, parsed.uCr, parsed.sCr);
  }, [allValid, parsed]);

  const interp = fena !== null ? interpret(fena) : null;

  function loadPrerenal() {
    setUNa("15"); setSNa("140"); setUCr("200"); setSCr("2.5"); setTouched(true);
  }
  function loadIntrinsic() {
    setUNa("80"); setSNa("138"); setUCr("60"); setSCr("3.0"); setTouched(true);
  }
  function loadIndeterminate() {
    setUNa("50"); setSNa("135"); setUCr("80"); setSCr("2.5"); setTouched(true);
  }

  function reset() {
    setUNa(""); setSNa(""); setUCr(""); setSCr(""); setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[];
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fena-una">{t("field.urineSodium")}</Label>
              <Input
                id="fena-una"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.urineSodium")}
                value={uNa}
                onChange={(e) => { setUNa(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fena-sna">{t("field.serumSodium")}</Label>
              <Input
                id="fena-sna"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.serumSodium")}
                value={sNa}
                onChange={(e) => { setSNa(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fena-ucr">{t("field.urineCreatinine")}</Label>
              <Input
                id="fena-ucr"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.urineCreatinine")}
                value={uCr}
                onChange={(e) => { setUCr(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fena-scr">{t("field.serumCreatinine")}</Label>
              <Input
                id="fena-scr"
                type="number"
                inputMode="decimal"
                placeholder={t("placeholder.serumCreatinine")}
                value={sCr}
                onChange={(e) => { setSCr(e.target.value); setTouched(false); }}
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

          {fena !== null && interp !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.fena")}</div>
                  <div className="text-3xl font-bold text-zinc-900">{fena.toFixed(2)}%</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.interpretation")}</div>
                  <div className="text-lg font-semibold text-zinc-800">
                    {t(`interpretation.${interp}`)}
                  </div>
                </div>
              </div>
              <p className="text-sm text-zinc-700">{t(`interpretationDetail.${interp}`)}</p>
              <p className="text-xs text-zinc-500 mt-2">{t("result.formula")}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Examples */}
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={loadPrerenal}>
            {t("examples.loadPrerenal")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={loadIntrinsic}>
            {t("examples.loadIntrinsic")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={loadIndeterminate}>
            {t("examples.loadIndeterminate")}
          </Button>
        </div>
      </section>

      {/* About */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      {/* How to */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("howto.heading")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
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
