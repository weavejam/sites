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

// Minimal polynomial parser supporting ax^n + bx^(n-1) + ... + c notation
function parsePolynomial(expr: string): number[] | null {
  // Returns coefficient array from highest degree to lowest, e.g. [1, -1, -2] for x^2-x-2
  const s = expr.replace(/\s/g, "").replace(/−/g, "-");
  if (!s) return null;

  const terms: { coeff: number; exp: number }[] = [];
  const termRegex = /([+-]?\d*\.?\d*)\*?x\^?(\d+)|([+-]?\d*\.?\d*)\*?x(?!\^)|([+-]?\d+\.?\d*)/g;
  let match;
  let lastIndex = 0;

  // Tokenize the polynomial
  const tokenRegex = /([+-]?(?:\d+\.?\d*|\.\d+)?x(?:\^(\d+))?|[+-]?\d+\.?\d*)/g;
  while ((match = tokenRegex.exec(s)) !== null) {
    lastIndex = match.index + match[0].length;
    const token = match[0];
    if (token.includes("x")) {
      const expMatch = token.match(/x\^?(\d+)/);
      const exp = expMatch ? parseInt(expMatch[1]) : 1;
      const coeffStr = token.replace(/x.*/, "");
      let coeff = 1;
      if (coeffStr === "" || coeffStr === "+") coeff = 1;
      else if (coeffStr === "-") coeff = -1;
      else coeff = parseFloat(coeffStr);
      if (!Number.isFinite(coeff)) return null;
      terms.push({ coeff, exp });
    } else {
      const c = parseFloat(token);
      if (!Number.isFinite(c)) return null;
      terms.push({ coeff: c, exp: 0 });
    }
  }
  if (terms.length === 0) return null;

  const maxDeg = Math.max(...terms.map((t) => t.exp));
  const coeffs = new Array(maxDeg + 1).fill(0);
  for (const { coeff, exp } of terms) {
    coeffs[maxDeg - exp] += coeff;
  }
  return coeffs;
}

function polyDegree(c: number[]): number {
  for (let i = 0; i < c.length; i++) if (c[i] !== 0) return c.length - 1 - i;
  return -1;
}

function polyToString(coeffs: number[]): string {
  const deg = coeffs.length - 1;
  let result = "";
  for (let i = 0; i < coeffs.length; i++) {
    const c = coeffs[i];
    if (c === 0) continue;
    const power = deg - i;
    const sign = result === "" ? (c < 0 ? "-" : "") : c < 0 ? " - " : " + ";
    const absC = Math.abs(c);
    const cStr =
      power === 0
        ? absC.toString()
        : absC === 1
        ? ""
        : absC.toString();
    const xStr =
      power === 0 ? "" : power === 1 ? "x" : `x^${power}`;
    result += sign + cStr + xStr;
  }
  return result || "0";
}

function formatCoeff(c: number): string {
  const r = Math.round(c * 1e8) / 1e8;
  // Try to express as a simple fraction
  for (let d = 1; d <= 100; d++) {
    const n = Math.round(r * d);
    if (Math.abs(n / d - r) < 1e-7) {
      if (d === 1) return n.toString();
      return `${n}/${d}`;
    }
  }
  return r.toFixed(4);
}

function termStr(A: number, root: number): string {
  const af = formatCoeff(A);
  if (root === 0) return `${af}/x`;
  if (root < 0) return `${af}/(x + ${Math.abs(root)})`;
  return `${af}/(x - ${root})`;
}

// Attempt partial fraction decomposition for common cases
type DecompResult =
  | { kind: "success"; terms: string[] }
  | { kind: "formOnly"; terms: string[]; errorKey: "repeatedOrQuadratic" }
  | { kind: "cannotFactor" }
  | { kind: "improper" };

function decomposePartialFractions(
  numCoeffs: number[],
  denCoeffs: number[]
): DecompResult {
  const numDeg = polyDegree(numCoeffs);
  const denDeg = polyDegree(denCoeffs);

  if (numDeg >= denDeg) return { kind: "improper" };

  function evalPoly(coeffs: number[], x: number): number {
    return coeffs.reduce((acc, c) => acc * x + c, 0);
  }

  function syntheticDiv(coeffs: number[], root: number): number[] {
    const q: number[] = [];
    let carry = 0;
    for (const c of coeffs) {
      carry = carry * root + c;
      q.push(carry);
    }
    q.pop();
    return q;
  }

  let remaining = [...denCoeffs];
  const roots: number[] = [];

  // Extract up to denDeg rational roots using integer candidates
  for (let attempt = 0; attempt < denDeg && polyDegree(remaining) > 0; attempt++) {
    let found = false;
    for (let r = -20; r <= 20 && !found; r++) {
      if (Math.abs(evalPoly(remaining, r)) < 1e-9) {
        remaining = syntheticDiv(remaining, r);
        roots.push(r);
        found = true;
      }
    }
    if (!found) break;
  }

  if (roots.length === 0) return { kind: "cannotFactor" };

  const remainDeg = polyDegree(remaining);
  const uniqueRoots = [...new Set(roots)];

  // All distinct linear factors → use Heaviside cover-up to find exact constants
  if (remainDeg <= 0 && uniqueRoots.length === roots.length) {
    // remaining[0] is the leading coeff of the original denominator after all extractions
    const leadingK = remaining.length > 0 ? remaining[0] : 1;
    const terms: string[] = [];
    for (const r of roots) {
      let denom = leadingK;
      for (const other of roots) {
        if (other !== r) denom *= r - other;
      }
      const A = evalPoly(numCoeffs, r) / denom;
      terms.push(termStr(A, r));
    }
    return { kind: "success", terms };
  }

  // Mixed / repeated → show form only
  const formTerms: string[] = [];
  const seen: Record<number, number> = {};
  for (const r of roots) {
    seen[r] = (seen[r] ?? 0) + 1;
    const label = seen[r] === 1 ? "A" : seen[r] === 2 ? "B" : "C";
    if (r === 0) formTerms.push(`${label}/x`);
    else if (r < 0) formTerms.push(`${label}/(x + ${Math.abs(r)})`);
    else formTerms.push(`${label}/(x - ${r})`);
  }
  if (remainDeg > 0) {
    formTerms.push(`(Bx + C)/(${polyToString(remaining)})`);
  }
  return { kind: "formOnly", terms: formTerms, errorKey: "repeatedOrQuadratic" };
}

export default function PartialFractionDecompositionCalculator(
  _props: { locale: Locale }
) {
  const t = useTranslations("tool.partial-fraction-decomposition-calculator");

  const [numerator, setNumerator] = React.useState("");
  const [denominator, setDenominator] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  function reset() {
    setNumerator("");
    setDenominator("");
    setTouched(false);
  }

  const result = React.useMemo(() => {
    if (!touched) return null;
    const numC = parsePolynomial(numerator);
    const denC = parsePolynomial(denominator);
    if (!numC || !denC) return { kind: "error" as const, key: "invalidInput" };
    if (denC.every((c) => c === 0)) return { kind: "error" as const, key: "zeroDenominator" };
    const numDeg = polyDegree(numC);
    const denDeg = polyDegree(denC);
    if (numDeg >= denDeg) return { kind: "error" as const, key: "improper" };
    return decomposePartialFractions(numC, denC);
  }, [touched, numerator, denominator]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
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
            <Label htmlFor="pfd-num">{t("field.numerator")}</Label>
            <Input
              id="pfd-num"
              type="text"
              value={numerator}
              placeholder={t("placeholder.numerator")}
              onChange={(e) => { setNumerator(e.target.value); setTouched(true); }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pfd-den">{t("field.denominator")}</Label>
            <Input
              id="pfd-den"
              type="text"
              value={denominator}
              placeholder={t("placeholder.denominator")}
              onChange={(e) => { setDenominator(e.target.value); setTouched(true); }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {result && result.kind === "error" && (
            <p className="text-sm text-red-600">{t(`error.${result.key}` as never)}</p>
          )}

          {result && result.kind === "cannotFactor" && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="text-sm font-medium text-amber-800">{t("result.heading")}</div>
              <div className="mt-1 text-sm text-amber-700">{t("error.cannotFactor")}</div>
            </div>
          )}

          {result && result.kind === "formOnly" && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 space-y-2">
              <div className="text-sm font-medium text-amber-800">{t("result.heading")}</div>
              <div className="font-mono text-lg font-semibold text-amber-900">
                {result.terms.join(" + ")}
              </div>
              <div className="text-sm text-amber-700">{t("error.repeatedOrQuadratic")}</div>
            </div>
          )}

          {result && result.kind === "success" && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="font-mono text-xl font-semibold text-zinc-900">
                {result.terms.join(" + ")}
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
