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

type Mode = "cartToCyl" | "cylToCart";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function fmt(n: number, dp = 6): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(dp)).toString();
}

export default function CylindricalCoordinatesCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.cylindrical-coordinates-calculator");

  const [mode, setMode] = React.useState<Mode>("cartToCyl");

  // Cartesian inputs
  const [cx, setCx] = React.useState<string>("");
  const [cy, setCy] = React.useState<string>("");
  const [cz, setCz] = React.useState<string>("");

  // Cylindrical inputs
  const [rho, setRho] = React.useState<string>("");
  const [phi, setPhi] = React.useState<string>("");
  const [cylZ, setCylZ] = React.useState<string>("");

  const [touched, setTouched] = React.useState(false);

  const xNum = parseFloat(cx);
  const yNum = parseFloat(cy);
  const zNum = parseFloat(cz);
  const rhoNum = parseFloat(rho);
  const phiNum = parseFloat(phi);
  const cylZNum = parseFloat(cylZ);

  const cartValid = cx !== "" && cy !== "" && cz !== "" &&
    Number.isFinite(xNum) && Number.isFinite(yNum) && Number.isFinite(zNum);
  const cylValid = rho !== "" && phi !== "" && cylZ !== "" &&
    Number.isFinite(rhoNum) && Number.isFinite(phiNum) && Number.isFinite(cylZNum) &&
    rhoNum >= 0;

  const result = React.useMemo(() => {
    if (mode === "cartToCyl" && cartValid) {
      const r = Math.sqrt(xNum * xNum + yNum * yNum);
      let angle = (Math.atan2(yNum, xNum) * 180) / Math.PI;
      if (angle < 0) angle += 360;
      return {
        label1: "ρ",
        val1: fmt(r),
        label2: "φ (°)",
        val2: fmt(angle),
        label3: "z",
        val3: fmt(zNum),
      };
    }
    if (mode === "cylToCart" && cylValid) {
      const phiRad = (phiNum * Math.PI) / 180;
      const xOut = rhoNum * Math.cos(phiRad);
      const yOut = rhoNum * Math.sin(phiRad);
      return {
        label1: "x",
        val1: fmt(xOut),
        label2: "y",
        val2: fmt(yOut),
        label3: "z",
        val3: fmt(cylZNum),
      };
    }
    return null;
  }, [mode, cartValid, cylValid, xNum, yNum, zNum, rhoNum, phiNum, cylZNum]);

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: { q: string; a: string }[] = React.useMemo(() => {
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

  function reset() {
    setCx(""); setCy(""); setCz("");
    setRho(""); setPhi(""); setCylZ("");
    setTouched(false);
  }

  const showError =
    touched &&
    ((mode === "cartToCyl" && !cartValid) ||
      (mode === "cylToCart" && !cylValid));

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
            <Label>{t("field.conversionType")}</Label>
            <div className="flex flex-wrap gap-2">
              {(["cartToCyl", "cylToCart"] as Mode[]).map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={mode === m ? "default" : "outline"}
                  onClick={() => {
                    setMode(m);
                    setTouched(false);
                  }}
                >
                  {t(`type.${m}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              {t(`type.${mode}_desc` as never)}
            </p>
          </div>

          {mode === "cartToCyl" ? (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="ccc-x">{t("field.x")}</Label>
                <Input id="ccc-x" type="number" inputMode="decimal" value={cx} placeholder="0"
                  onChange={(e) => { setCx(e.target.value); setTouched(true); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ccc-y">{t("field.y")}</Label>
                <Input id="ccc-y" type="number" inputMode="decimal" value={cy} placeholder="0"
                  onChange={(e) => { setCy(e.target.value); setTouched(true); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ccc-z">{t("field.z")}</Label>
                <Input id="ccc-z" type="number" inputMode="decimal" value={cz} placeholder="0"
                  onChange={(e) => { setCz(e.target.value); setTouched(true); }} />
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="ccc-rho">{t("field.rho")}</Label>
                <Input id="ccc-rho" type="number" inputMode="decimal" min="0" value={rho} placeholder="0"
                  onChange={(e) => { setRho(e.target.value); setTouched(true); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ccc-phi">{t("field.phi")}</Label>
                <Input id="ccc-phi" type="number" inputMode="decimal" value={phi} placeholder="0"
                  onChange={(e) => { setPhi(e.target.value); setTouched(true); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ccc-cylz">{t("field.z")}</Label>
                <Input id="ccc-cylz" type="number" inputMode="decimal" value={cylZ} placeholder="0"
                  onChange={(e) => { setCylZ(e.target.value); setTouched(true); }} />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.convert")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-3">
                <div>
                  <span className="text-sm text-zinc-500">{result.label1}: </span>
                  <span className="font-semibold text-zinc-900">{result.val1}</span>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{result.label2}: </span>
                  <span className="font-semibold text-zinc-900">{result.val2}</span>
                </div>
                <div>
                  <span className="text-sm text-zinc-500">{result.label3}: </span>
                  <span className="font-semibold text-zinc-900">{result.val3}</span>
                </div>
              </div>
              <div className="text-xs text-zinc-500">
                {mode === "cartToCyl" ? t("formula.cartToCyl") : t("formula.cylToCart")}
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
