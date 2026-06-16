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

type Dim = "2d" | "3d";

function dot2(ax: number, ay: number, bx: number, by: number) {
  return ax * bx + ay * by;
}

function dot3(ax: number, ay: number, az: number, bx: number, by: number, bz: number) {
  return ax * bx + ay * by + az * bz;
}

function mag2(x: number, y: number) {
  return Math.sqrt(x * x + y * y);
}

function mag3(x: number, y: number, z: number) {
  return Math.sqrt(x * x + y * y + z * z);
}

function formatNum(n: number, digits = 6): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * 1e8) / 1e8).toLocaleString("en-US", {
    maximumFractionDigits: digits,
  });
}

export default function AngleBetweenTwoVectorsCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.angle-between-two-vectors-calculator");

  const [dim, setDim] = React.useState<Dim>("2d");
  const [ax, setAx] = React.useState("");
  const [ay, setAy] = React.useState("");
  const [az, setAz] = React.useState("");
  const [bx, setBx] = React.useState("");
  const [by, setBy] = React.useState("");
  const [bz, setBz] = React.useState("");
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState<{
    angleDeg: number;
    angleRad: number;
    dp: number;
    magA: number;
    magB: number;
    cosT: number;
  } | null>(null);

  function reset() {
    setAx(""); setAy(""); setAz("");
    setBx(""); setBy(""); setBz("");
    setError(""); setResult(null);
  }

  function changeDim(d: Dim) {
    setDim(d);
    reset();
  }

  function calculate() {
    setError(""); setResult(null);

    const fields = dim === "2d"
      ? [ax, ay, bx, by]
      : [ax, ay, az, bx, by, bz];

    const nums = fields.map(parseFloat);
    if (nums.some((n) => !Number.isFinite(n))) {
      setError(t("error.fillAll"));
      return;
    }

    let dp: number, mA: number, mB: number;
    if (dim === "2d") {
      const [Ax, Ay, Bx, By] = nums;
      dp = dot2(Ax, Ay, Bx, By);
      mA = mag2(Ax, Ay);
      mB = mag2(Bx, By);
    } else {
      const [Ax, Ay, Az, Bx, By, Bz] = nums;
      dp = dot3(Ax, Ay, Az, Bx, By, Bz);
      mA = mag3(Ax, Ay, Az);
      mB = mag3(Bx, By, Bz);
    }

    if (mA < 1e-15 || mB < 1e-15) {
      setError(t("error.zeroVector"));
      return;
    }

    const cosT = Math.max(-1, Math.min(1, dp / (mA * mB)));
    const angleRad = Math.acos(cosT);
    const angleDeg = (angleRad * 180) / Math.PI;

    setResult({ angleDeg, angleRad, dp, magA: mA, magB: mB, cosT });
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note: string }[]
      | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
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

  const DIMS: { key: Dim; label: string }[] = [
    { key: "2d", label: t("field.dim2d") },
    { key: "3d", label: t("field.dim3d") },
  ];

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
            <Label>{t("field.dimension")}</Label>
            <div className="flex gap-2">
              {DIMS.map(({ key, label }) => (
                <Button
                  key={key}
                  type="button"
                  variant={dim === key ? "default" : "outline"}
                  onClick={() => changeDim(key)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <Label className="text-base font-semibold">{t("field.vectorA")}</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="ax" className="w-6">{t("field.ax")}</Label>
                  <Input id="ax" type="number" inputMode="decimal"
                    placeholder={t("field.placeholder")} value={ax}
                    onChange={(e) => setAx(e.target.value)} />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="ay" className="w-6">{t("field.ay")}</Label>
                  <Input id="ay" type="number" inputMode="decimal"
                    placeholder={t("field.placeholder")} value={ay}
                    onChange={(e) => setAy(e.target.value)} />
                </div>
                {dim === "3d" && (
                  <div className="flex items-center gap-2">
                    <Label htmlFor="az" className="w-6">{t("field.az")}</Label>
                    <Input id="az" type="number" inputMode="decimal"
                      placeholder={t("field.placeholder")} value={az}
                      onChange={(e) => setAz(e.target.value)} />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">{t("field.vectorB")}</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="bx" className="w-6">{t("field.bx")}</Label>
                  <Input id="bx" type="number" inputMode="decimal"
                    placeholder={t("field.placeholder")} value={bx}
                    onChange={(e) => setBx(e.target.value)} />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="by_" className="w-6">{t("field.by")}</Label>
                  <Input id="by_" type="number" inputMode="decimal"
                    placeholder={t("field.placeholder")} value={by}
                    onChange={(e) => setBy(e.target.value)} />
                </div>
                {dim === "3d" && (
                  <div className="flex items-center gap-2">
                    <Label htmlFor="bz" className="w-6">{t("field.bz")}</Label>
                    <Input id="bz" type="number" inputMode="decimal"
                      placeholder={t("field.placeholder")} value={bz}
                      onChange={(e) => setBz(e.target.value)} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={calculate}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-400">{t("result.angleDeg")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {formatNum(result.angleDeg, 4)}°
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-400">{t("result.angleRad")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {formatNum(result.angleRad, 6)} {t("result.unitRad")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-400">{t("result.dotProduct")}</div>
                  <div className="text-lg font-semibold text-zinc-800">
                    {formatNum(result.dp)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-400">{t("result.cosTheta")}</div>
                  <div className="text-lg font-semibold text-zinc-800">
                    {formatNum(result.cosT)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-400">{t("result.magA")}</div>
                  <div className="text-lg font-semibold text-zinc-800">
                    {formatNum(result.magA)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-400">{t("result.magB")}</div>
                  <div className="text-lg font-semibold text-zinc-800">
                    {formatNum(result.magB)}
                  </div>
                </div>
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
                  <td className="px-3 py-2 font-mono text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900">{ex.output}</td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
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
