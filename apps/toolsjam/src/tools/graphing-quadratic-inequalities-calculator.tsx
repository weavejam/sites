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

type IneqSign = "gt" | "gte" | "lt" | "lte";

const SIGNS: IneqSign[] = ["gt", "gte", "lt", "lte"];

interface QResult {
  expr: string;
  delta: number;
  roots: number[];
  vertex: [number, number];
  solutionKey: string;
  solutionParams: Record<string, string>;
  opensUp: boolean;
}

function fmt(n: number, digits = 4): string {
  const r = Math.round(n * Math.pow(10, digits)) / Math.pow(10, digits);
  return r.toString();
}

function solveQI(a: number, b: number, c: number, sign: IneqSign): QResult {
  const delta = b * b - 4 * a * c;
  const vx = -b / (2 * a);
  const vy = a * vx * vx + b * vx + c;
  const opensUp = a > 0;

  let roots: number[] = [];
  if (delta > 0) {
    const sq = Math.sqrt(delta);
    roots = [(-b - sq) / (2 * a), (-b + sq) / (2 * a)].sort((x, y) => x - y);
  } else if (Math.abs(delta) < 1e-10) {
    roots = [-b / (2 * a)];
  }

  const strict = sign === "gt" || sign === "lt";
  const wantPositive = sign === "gt" || sign === "gte";
  const lb = strict ? "(" : "[";
  const rb = strict ? ")" : "]";

  let solutionKey = "";
  let solutionParams: Record<string, string> = {};

  if (roots.length === 0) {
    const exprIsAlwaysPos = opensUp;
    if ((wantPositive && exprIsAlwaysPos) || (!wantPositive && !exprIsAlwaysPos)) {
      solutionKey = "solution.allReals";
    } else {
      solutionKey = "solution.noSolution";
    }
  } else if (roots.length === 1) {
    const r = fmt(roots[0]);
    if (wantPositive && opensUp) {
      solutionKey = strict ? "solution.allRealsExcept" : "solution.allReals";
      solutionParams = { r };
    } else if (!wantPositive && opensUp) {
      solutionKey = strict ? "solution.noSolution" : "solution.singlePoint";
      solutionParams = { r };
    } else if (wantPositive && !opensUp) {
      solutionKey = strict ? "solution.noSolution" : "solution.singlePoint";
      solutionParams = { r };
    } else {
      solutionKey = strict ? "solution.allRealsExcept" : "solution.allReals";
      solutionParams = { r };
    }
  } else {
    const r1 = fmt(roots[0]);
    const r2 = fmt(roots[1]);
    if (opensUp) {
      if (wantPositive) {
        solutionKey = "solution.outsideRoots";
        solutionParams = { lb, rb, r1, r2 };
      } else {
        solutionKey = "solution.betweenRoots";
        solutionParams = { lb, rb, r1, r2 };
      }
    } else {
      if (wantPositive) {
        solutionKey = "solution.betweenRoots";
        solutionParams = { lb, rb, r1, r2 };
      } else {
        solutionKey = "solution.outsideRoots";
        solutionParams = { lb, rb, r1, r2 };
      }
    }
  }

  const signStr = sign === "gt" ? ">" : sign === "gte" ? "≥" : sign === "lt" ? "<" : "≤";
  const expr = `${a}x² + (${b})x + (${c}) ${signStr} 0`;

  return {
    expr,
    delta,
    roots,
    vertex: [vx, vy],
    solutionKey,
    solutionParams,
    opensUp,
  };
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function GraphingQuadraticInequalitiesCalculator(
  _props: { locale: Locale }
) {
  const t = useTranslations("tool.graphing-quadratic-inequalities-calculator");

  const [aVal, setAVal] = React.useState("");
  const [bVal, setBVal] = React.useState("");
  const [cVal, setCVal] = React.useState("");
  const [sign, setSign] = React.useState<IneqSign>("gt");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    if (!touched) return null;
    const a = parseFloat(aVal);
    const b = parseFloat(bVal);
    const c = parseFloat(cVal);
    if ([a, b, c].some(Number.isNaN)) return { error: "invalid" as const };
    if (a === 0) return { error: "aZero" as const };
    return solveQI(a, b, c, sign);
  }, [touched, aVal, bVal, cVal, sign]);

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

  function loadExample(a: string, b: string, c: string, s: IneqSign) {
    setAVal(a);
    setBVal(b);
    setCVal(c);
    setSign(s);
    setTouched(true);
  }

  function reset() {
    setAVal("");
    setBVal("");
    setCVal("");
    setSign("gt");
    setTouched(false);
  }

  const goodResult = result && !("error" in result) ? result : null;
  const errorKey = result && "error" in result ? result.error : null;

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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="qi-a">{t("field.a")}</Label>
              <Input
                id="qi-a"
                type="number"
                inputMode="decimal"
                placeholder={t("field.aPlaceholder")}
                value={aVal}
                onChange={(e) => { setAVal(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qi-b">{t("field.b")}</Label>
              <Input
                id="qi-b"
                type="number"
                inputMode="decimal"
                placeholder={t("field.bPlaceholder")}
                value={bVal}
                onChange={(e) => { setBVal(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qi-c">{t("field.c")}</Label>
              <Input
                id="qi-c"
                type="number"
                inputMode="decimal"
                placeholder={t("field.cPlaceholder")}
                value={cVal}
                onChange={(e) => { setCVal(e.target.value); setTouched(true); }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="qi-sign">{t("field.sign")}</Label>
            <div className="flex flex-wrap gap-2">
              {SIGNS.map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant={sign === s ? "default" : "outline"}
                  onClick={() => setSign(s)}
                >
                  {t(`sign.${s}` as never)}
                </Button>
              ))}
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

          {errorKey && (
            <p className="text-sm text-red-600">{t(`error.${errorKey}` as never)}</p>
          )}

          {goodResult && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <p className="text-sm font-mono text-zinc-800">
                {t("result.expression", { expr: goodResult.expr })}
              </p>
              <p className="text-sm text-zinc-600">
                {t("result.discriminant", { delta: fmt(goodResult.delta) })}
              </p>
              {goodResult.roots.length === 2 && (
                <p className="text-sm text-zinc-600">
                  {t("result.roots", {
                    r1: fmt(goodResult.roots[0]),
                    r2: fmt(goodResult.roots[1]),
                  })}
                </p>
              )}
              {goodResult.roots.length === 1 && (
                <p className="text-sm text-zinc-600">
                  {t("result.doubleRoot", { r: fmt(goodResult.roots[0]) })}
                </p>
              )}
              {goodResult.roots.length === 0 && (
                <p className="text-sm text-zinc-600">{t("result.noRealRoots")}</p>
              )}
              <p className="text-sm text-zinc-600">
                {t("result.vertex", {
                  vx: fmt(goodResult.vertex[0]),
                  vy: fmt(goodResult.vertex[1]),
                })}
              </p>
              <p className="text-sm text-zinc-600">
                {t("result.parabola", {
                  dir: goodResult.opensUp ? t("opens.up") : t("opens.down"),
                })}
              </p>
              <div className="mt-2 text-lg font-semibold text-zinc-900 font-mono">
                {t("result.solution", {
                  set: t(goodResult.solutionKey as never, goodResult.solutionParams as never),
                })}
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("1", "-4", "3", "gt")}
          >
            {t("examples.loadUpward")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("-1", "2", "3", "lte")}
          >
            {t("examples.loadDownward")}
          </Button>
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
