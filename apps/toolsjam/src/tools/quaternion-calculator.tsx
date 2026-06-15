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

type Operation =
  | "add"
  | "subtract"
  | "multiply"
  | "conjugate"
  | "norm"
  | "inverse";

const OPERATIONS: Operation[] = [
  "add",
  "subtract",
  "multiply",
  "conjugate",
  "norm",
  "inverse",
];

const BINARY_OPS: Operation[] = ["add", "subtract", "multiply"];

interface Quaternion {
  w: number;
  x: number;
  y: number;
  z: number;
}

function parseQ(w: string, x: string, y: string, z: string): Quaternion | null {
  const wn = parseFloat(w);
  const xn = parseFloat(x);
  const yn = parseFloat(y);
  const zn = parseFloat(z);
  if ([wn, xn, yn, zn].some((v) => !Number.isFinite(v))) return null;
  return { w: wn, x: xn, y: yn, z: zn };
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * 1e10) / 1e10).toLocaleString("en-US", {
    maximumFractionDigits: 10,
  });
}

function formatQ(q: Quaternion): string {
  const parts: string[] = [fmt(q.w)];
  const addPart = (v: number, unit: string) => {
    if (v >= 0) parts.push(`+ ${fmt(v)}${unit}`);
    else parts.push(`- ${fmt(Math.abs(v))}${unit}`);
  };
  addPart(q.x, "i");
  addPart(q.y, "j");
  addPart(q.z, "k");
  return parts.join(" ");
}

function qAdd(a: Quaternion, b: Quaternion): Quaternion {
  return { w: a.w + b.w, x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

function qSub(a: Quaternion, b: Quaternion): Quaternion {
  return { w: a.w - b.w, x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function qMul(a: Quaternion, b: Quaternion): Quaternion {
  return {
    w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
    x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
    y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
    z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
  };
}

function qConj(a: Quaternion): Quaternion {
  return { w: a.w, x: -a.x, y: -a.y, z: -a.z };
}

function qNorm(a: Quaternion): number {
  return Math.sqrt(a.w ** 2 + a.x ** 2 + a.y ** 2 + a.z ** 2);
}

function qInverse(a: Quaternion): Quaternion | null {
  const n2 = a.w ** 2 + a.x ** 2 + a.y ** 2 + a.z ** 2;
  if (n2 === 0) return null;
  const c = qConj(a);
  return { w: c.w / n2, x: c.x / n2, y: c.y / n2, z: c.z / n2 };
}

export default function QuaternionCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.quaternion-calculator");

  const [op, setOp] = React.useState<Operation>("add");
  const [w1, setW1] = React.useState("");
  const [x1, setX1] = React.useState("");
  const [y1, setY1] = React.useState("");
  const [z1, setZ1] = React.useState("");
  const [w2, setW2] = React.useState("");
  const [x2, setX2] = React.useState("");
  const [y2, setY2] = React.useState("");
  const [z2, setZ2] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const isBinary = BINARY_OPS.includes(op);

  const q1 = parseQ(w1, x1, y1, z1);
  const q2 = isBinary ? parseQ(w2, x2, y2, z2) : { w: 0, x: 0, y: 0, z: 0 };

  type CalcResult =
    | { kind: "quaternion"; value: Quaternion }
    | { kind: "scalar"; value: number }
    | { kind: "error"; msg: string }
    | null;

  const result = React.useMemo<CalcResult>(() => {
    if (!touched) return null;
    if (!q1) return { kind: "error", msg: t("error.invalidInput") };
    if (isBinary && !q2) return { kind: "error", msg: t("error.invalidInput") };
    switch (op) {
      case "add":
        return { kind: "quaternion", value: qAdd(q1, q2!) };
      case "subtract":
        return { kind: "quaternion", value: qSub(q1, q2!) };
      case "multiply":
        return { kind: "quaternion", value: qMul(q1, q2!) };
      case "conjugate":
        return { kind: "quaternion", value: qConj(q1) };
      case "norm":
        return { kind: "scalar", value: qNorm(q1) };
      case "inverse": {
        const inv = qInverse(q1);
        if (!inv) return { kind: "error", msg: t("error.zeroNorm") };
        return { kind: "quaternion", value: inv };
      }
    }
  }, [touched, q1, q2, op, isBinary, t]);

  function reset() {
    setW1(""); setX1(""); setY1(""); setZ1("");
    setW2(""); setX2(""); setY2(""); setZ2("");
    setTouched(false);
  }

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<{ q: string; a: string }[]>(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
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
            <Label>{t("field.operation")}</Label>
            <div className="flex flex-wrap gap-2">
              {OPERATIONS.map((o) => (
                <Button
                  key={o}
                  type="button"
                  variant={op === o ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setOp(o);
                    setTouched(false);
                  }}
                >
                  {t(`operation.${o}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <Label>{t("field.q1")}</Label>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    [t("field.w1"), w1, setW1],
                    [t("field.x1"), x1, setX1],
                    [t("field.y1"), y1, setY1],
                    [t("field.z1"), z1, setZ1],
                  ] as [string, string, (v: string) => void][]
                ).map(([label, val, setter]) => (
                  <div key={label} className="space-y-1">
                    <Label htmlFor={`q1-${label}`} className="text-xs">
                      {label}
                    </Label>
                    <Input
                      id={`q1-${label}`}
                      type="number"
                      inputMode="decimal"
                      value={val}
                      placeholder={t("placeholder.number")}
                      onChange={(e) => {
                        setter(e.target.value);
                        setTouched(true);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {isBinary && (
              <div className="space-y-3">
                <Label>{t("field.q2")}</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      [t("field.w2"), w2, setW2],
                      [t("field.x2"), x2, setX2],
                      [t("field.y2"), y2, setY2],
                      [t("field.z2"), z2, setZ2],
                    ] as [string, string, (v: string) => void][]
                  ).map(([label, val, setter]) => (
                    <div key={label} className="space-y-1">
                      <Label htmlFor={`q2-${label}`} className="text-xs">
                        {label}
                      </Label>
                      <Input
                        id={`q2-${label}`}
                        type="number"
                        inputMode="decimal"
                        value={val}
                        placeholder={t("placeholder.number")}
                        onChange={(e) => {
                          setter(e.target.value);
                          setTouched(true);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {result && result.kind === "error" && (
            <p className="text-sm text-red-600">{result.msg}</p>
          )}

          {result && result.kind !== "error" && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-1 text-xl font-semibold text-zinc-900 font-mono">
                {result.kind === "scalar"
                  ? fmt(result.value)
                  : formatQ(result.value)}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("about.heading")}
        </h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("examples.heading")}
        </h2>
        <p className="text-zinc-600">{t("examples.intro")}</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colInput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colOutput")}
                </th>
                <th className="px-3 py-2 font-semibold">
                  {t("examples.colNote")}
                </th>
              </tr>
            </thead>
            <tbody>
              {examplesItems.map((ex, i) => (
                <tr key={i} className="border-b border-zinc-100 align-top">
                  <td className="px-3 py-2 text-zinc-800">{ex.input}</td>
                  <td className="px-3 py-2 font-medium text-zinc-900 font-mono">
                    {ex.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
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
