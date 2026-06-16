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

type Method = "vectors" | "points" | "slope";

function fmt(n: number, d = 4): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * 1e8) / 1e8).toLocaleString("en-US", {
    maximumFractionDigits: d,
  });
}

function angleBetweenVectors(
  ax: number, ay: number, bx: number, by: number
): { angleDeg: number; angleRad: number; dp: number; cosT: number } | string {
  const mA = Math.sqrt(ax * ax + ay * ay);
  const mB = Math.sqrt(bx * bx + by * by);
  if (mA < 1e-15 || mB < 1e-15) return "zeroVector";
  const dp = ax * bx + ay * by;
  const cosT = Math.max(-1, Math.min(1, dp / (mA * mB)));
  const angleRad = Math.acos(cosT);
  return { angleDeg: (angleRad * 180) / Math.PI, angleRad, dp, cosT };
}

export default function AngleCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.angle-calculator");

  const [method, setMethod] = React.useState<Method>("vectors");
  const [ax, setAx] = React.useState("");
  const [ay, setAy] = React.useState("");
  const [bx, setBx] = React.useState("");
  const [by, setBy] = React.useState("");
  const [x1, setX1] = React.useState("");
  const [y1, setY1] = React.useState("");
  const [x2, setX2] = React.useState("");
  const [y2, setY2] = React.useState("");
  const [x3, setX3] = React.useState("");
  const [y3, setY3] = React.useState("");
  const [cx, setCx] = React.useState("");
  const [cy, setCy] = React.useState("");
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState<{
    angleDeg: number;
    angleRad: number;
    dp?: number;
    cosT?: number;
  } | null>(null);

  function reset() {
    setAx(""); setAy(""); setBx(""); setBy("");
    setX1(""); setY1(""); setX2(""); setY2(""); setX3(""); setY3("");
    setCx(""); setCy(""); setError(""); setResult(null);
  }

  function calculate() {
    setError(""); setResult(null);

    if (method === "vectors") {
      const nums = [ax, ay, bx, by].map(parseFloat);
      if (nums.some((n) => !Number.isFinite(n))) {
        setError(t("error.fillAll")); return;
      }
      const r = angleBetweenVectors(nums[0], nums[1], nums[2], nums[3]);
      if (typeof r === "string") { setError(t("error.zeroVector")); return; }
      setResult(r);
    } else if (method === "points") {
      const nums = [x1, y1, x2, y2, x3, y3].map(parseFloat);
      if (nums.some((n) => !Number.isFinite(n))) {
        setError(t("error.fillAll")); return;
      }
      const [X1, Y1, X2, Y2, X3, Y3] = nums;
      const uAx = X1 - X2, uAy = Y1 - Y2;
      const uCx = X3 - X2, uCy = Y3 - Y2;
      const r = angleBetweenVectors(uAx, uAy, uCx, uCy);
      if (typeof r === "string") { setError(t("error.zeroVector")); return; }
      setResult(r);
    } else {
      const nx = parseFloat(cx), ny = parseFloat(cy);
      if (!Number.isFinite(nx) || !Number.isFinite(ny)) {
        setError(t("error.fillAll")); return;
      }
      if (nx === 0 && ny === 0) { setError(t("error.zeroCoord")); return; }
      const angleRad = Math.atan2(ny, nx);
      const angleDeg = (angleRad * 180) / Math.PI;
      setResult({ angleDeg, angleRad });
    }
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

  const METHODS: { key: Method; label: string }[] = [
    { key: "vectors", label: t("field.methodVectors") },
    { key: "points", label: t("field.methodPoints") },
    { key: "slope", label: t("field.methodSlope") },
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
            <Label>{t("field.method")}</Label>
            <div className="flex flex-wrap gap-2">
              {METHODS.map(({ key, label }) => (
                <Button
                  key={key}
                  type="button"
                  variant={method === key ? "default" : "outline"}
                  onClick={() => { setMethod(key); reset(); }}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {method === "vectors" && (
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <Label className="font-semibold">{t("field.vectorA")}</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="v-ax" className="w-6">{t("field.ax")}</Label>
                    <Input id="v-ax" type="number" inputMode="decimal"
                      placeholder={t("field.placeholder")} value={ax}
                      onChange={(e) => setAx(e.target.value)} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="v-ay" className="w-6">{t("field.ay")}</Label>
                    <Input id="v-ay" type="number" inputMode="decimal"
                      placeholder={t("field.placeholder")} value={ay}
                      onChange={(e) => setAy(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Label className="font-semibold">{t("field.vectorB")}</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="v-bx" className="w-6">{t("field.bx")}</Label>
                    <Input id="v-bx" type="number" inputMode="decimal"
                      placeholder={t("field.placeholder")} value={bx}
                      onChange={(e) => setBx(e.target.value)} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="v-by" className="w-6">{t("field.by")}</Label>
                    <Input id="v-by" type="number" inputMode="decimal"
                      placeholder={t("field.placeholder")} value={by}
                      onChange={(e) => setBy(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {method === "points" && (
            <div className="grid gap-4 sm:grid-cols-3">
              {([
                { label: t("field.pointA"), xId: "p-x1", yId: "p-y1", xV: x1, yV: y1, setX: setX1, setY: setY1, xL: t("field.x1"), yL: t("field.y1") },
                { label: t("field.pointB"), xId: "p-x2", yId: "p-y2", xV: x2, yV: y2, setX: setX2, setY: setY2, xL: t("field.x2"), yL: t("field.y2") },
                { label: t("field.pointC"), xId: "p-x3", yId: "p-y3", xV: x3, yV: y3, setX: setX3, setY: setY3, xL: t("field.x3"), yL: t("field.y3") },
              ] as const).map((pt) => (
                <div key={pt.xId} className="space-y-2">
                  <Label className="font-semibold">{pt.label}</Label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={pt.xId} className="w-5">{pt.xL}</Label>
                    <Input id={pt.xId} type="number" inputMode="decimal"
                      placeholder={t("field.placeholder")} value={pt.xV}
                      onChange={(e) => pt.setX(e.target.value)} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={pt.yId} className="w-5">{pt.yL}</Label>
                    <Input id={pt.yId} type="number" inputMode="decimal"
                      placeholder={t("field.placeholder")} value={pt.yV}
                      onChange={(e) => pt.setY(e.target.value)} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {method === "slope" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="s-x">{t("field.coordX")}</Label>
                <Input id="s-x" type="number" inputMode="decimal"
                  placeholder={t("field.placeholder")} value={cx}
                  onChange={(e) => setCx(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="s-y">{t("field.coordY")}</Label>
                <Input id="s-y" type="number" inputMode="decimal"
                  placeholder={t("field.placeholder")} value={cy}
                  onChange={(e) => setCy(e.target.value)} />
              </div>
            </div>
          )}

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
                    {fmt(result.angleDeg, 4)}°
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-400">{t("result.angleRad")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {fmt(result.angleRad, 6)} {t("result.unitRad")}
                  </div>
                </div>
                {result.dp !== undefined && (
                  <div>
                    <div className="text-xs text-zinc-400">{t("result.dotProduct")}</div>
                    <div className="text-lg font-semibold text-zinc-800">{fmt(result.dp)}</div>
                  </div>
                )}
                {result.cosT !== undefined && (
                  <div>
                    <div className="text-xs text-zinc-400">{t("result.cosTheta")}</div>
                    <div className="text-lg font-semibold text-zinc-800">{fmt(result.cosT)}</div>
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
