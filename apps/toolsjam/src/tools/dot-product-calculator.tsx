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

type Dimension = "2D" | "3D";

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const r = Math.round(n * 1e10) / 1e10;
  return r.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

export default function DotProductCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.dot-product-calculator");
  const [dim, setDim] = React.useState<Dimension>("2D");
  const [a1, setA1] = React.useState("");
  const [a2, setA2] = React.useState("");
  const [a3, setA3] = React.useState("");
  const [b1, setB1] = React.useState("");
  const [b2, setB2] = React.useState("");
  const [b3, setB3] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const nums = React.useMemo(() => {
    const parse = (s: string) => parseFloat(s);
    return {
      a1: parse(a1), a2: parse(a2), a3: parse(a3),
      b1: parse(b1), b2: parse(b2), b3: parse(b3),
    };
  }, [a1, a2, a3, b1, b2, b3]);

  const allFilled = React.useMemo(() => {
    if (dim === "2D") return [a1, a2, b1, b2].every(v => v !== "");
    return [a1, a2, a3, b1, b2, b3].every(v => v !== "");
  }, [dim, a1, a2, a3, b1, b2, b3]);

  const allValid = React.useMemo(() => {
    if (dim === "2D") return [nums.a1, nums.a2, nums.b1, nums.b2].every(Number.isFinite);
    return [nums.a1, nums.a2, nums.a3, nums.b1, nums.b2, nums.b3].every(Number.isFinite);
  }, [dim, nums]);

  const result = React.useMemo(() => {
    if (!allFilled || !allValid) return null;
    const { a1: A1, a2: A2, a3: A3, b1: B1, b2: B2, b3: B3 } = nums;
    const dot = dim === "2D"
      ? A1 * B1 + A2 * B2
      : A1 * B1 + A2 * B2 + A3 * B3;
    const magA = dim === "2D"
      ? Math.sqrt(A1 ** 2 + A2 ** 2)
      : Math.sqrt(A1 ** 2 + A2 ** 2 + A3 ** 2);
    const magB = dim === "2D"
      ? Math.sqrt(B1 ** 2 + B2 ** 2)
      : Math.sqrt(B1 ** 2 + B2 ** 2 + B3 ** 2);
    const zeroVec = magA === 0 || magB === 0;
    const cosTheta = zeroVec ? null : dot / (magA * magB);
    const angleDeg = cosTheta === null ? null : (Math.acos(Math.max(-1, Math.min(1, cosTheta))) * 180) / Math.PI;
    let relationship = "";
    if (angleDeg !== null) {
      const eps = 1e-9;
      if (Math.abs(angleDeg - 90) < eps * 100) relationship = t("result.perpendicular");
      else if (angleDeg < 0.0001 || Math.abs(angleDeg - 180) < 0.0001) relationship = t("result.parallel");
      else if (angleDeg < 90) relationship = t("result.acute");
      else relationship = t("result.obtuse");
    }
    return { dot, magA, magB, cosTheta, angleDeg, zeroVec, relationship };
  }, [allFilled, allValid, nums, dim, t]);

  function reset() {
    setA1(""); setA2(""); setA3("");
    setB1(""); setB2(""); setB3("");
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

  const showError = touched && allFilled && !allValid;
  const showZeroError = touched && allFilled && allValid && result?.zeroVec;

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
            <Label>{t("field.dimension")}</Label>
            <div className="flex gap-2">
              {(["2D", "3D"] as Dimension[]).map((d) => (
                <Button
                  key={d}
                  type="button"
                  variant={dim === d ? "default" : "outline"}
                  onClick={() => { setDim(d); setTouched(false); }}
                >
                  {t(`field.dim${d}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <Label className="text-base font-semibold">{t("field.vectorA")}</Label>
              <div className="space-y-2">
                <Label htmlFor="dp-a1">{t("field.ax")}</Label>
                <Input id="dp-a1" type="number" inputMode="decimal" value={a1}
                  placeholder={t("placeholder.component")}
                  onChange={(e) => { setA1(e.target.value); setTouched(true); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dp-a2">{t("field.ay")}</Label>
                <Input id="dp-a2" type="number" inputMode="decimal" value={a2}
                  placeholder={t("placeholder.component")}
                  onChange={(e) => { setA2(e.target.value); setTouched(true); }} />
              </div>
              {dim === "3D" && (
                <div className="space-y-2">
                  <Label htmlFor="dp-a3">{t("field.az")}</Label>
                  <Input id="dp-a3" type="number" inputMode="decimal" value={a3}
                    placeholder={t("placeholder.component")}
                    onChange={(e) => { setA3(e.target.value); setTouched(true); }} />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">{t("field.vectorB")}</Label>
              <div className="space-y-2">
                <Label htmlFor="dp-b1">{t("field.bx")}</Label>
                <Input id="dp-b1" type="number" inputMode="decimal" value={b1}
                  placeholder={t("placeholder.component")}
                  onChange={(e) => { setB1(e.target.value); setTouched(true); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dp-b2">{t("field.by")}</Label>
                <Input id="dp-b2" type="number" inputMode="decimal" value={b2}
                  placeholder={t("placeholder.component")}
                  onChange={(e) => { setB2(e.target.value); setTouched(true); }} />
              </div>
              {dim === "3D" && (
                <div className="space-y-2">
                  <Label htmlFor="dp-b3">{t("field.bz")}</Label>
                  <Input id="dp-b3" type="number" inputMode="decimal" value={b3}
                    placeholder={t("placeholder.component")}
                    onChange={(e) => { setB3(e.target.value); setTouched(true); }} />
                </div>
              )}
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
          {showZeroError && (
            <p className="text-sm text-red-600">{t("error.zeroVector")}</p>
          )}

          {result && !result.zeroVec && touched && allValid && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2 mt-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.dotProduct")}</div>
                  <div className="text-2xl font-semibold text-zinc-900">{fmt(result.dot)}</div>
                </div>
                {result.angleDeg !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.angle")}</div>
                    <div className="text-2xl font-semibold text-zinc-900">
                      {fmt(result.angleDeg)}° 
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-xs text-zinc-500">{t("result.magnitudeA")}</div>
                  <div className="text-lg font-medium text-zinc-900">{fmt(result.magA)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.magnitudeB")}</div>
                  <div className="text-lg font-medium text-zinc-900">{fmt(result.magB)}</div>
                </div>
                {result.cosTheta !== null && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.cosine")}</div>
                    <div className="text-lg font-medium text-zinc-900">{fmt(result.cosTheta)}</div>
                  </div>
                )}
                {result.relationship && (
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.relationship")}</div>
                    <div className="text-lg font-medium text-zinc-900">{result.relationship}</div>
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
