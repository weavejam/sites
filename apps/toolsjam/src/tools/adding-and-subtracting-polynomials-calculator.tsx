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

type Operation = "add" | "subtract";

interface FaqItem {
  q: string;
  a: string;
}

// Parse a polynomial string into a map of degree -> coefficient
function parsePoly(expr: string): Map<number, number> | null {
  const terms = new Map<number, number>();
  // Normalize: remove spaces, handle implicit coefficients
  const s = expr.replace(/\s+/g, "").replace(/−/g, "-").replace(/\+−/g, "-");
  if (s === "") return null;

  // Split into terms by + or - (keeping the sign with the term)
  const termStrings = s.split(/(?=[+-])/).filter((t) => t !== "");
  if (termStrings.length === 0) return null;

  for (const raw of termStrings) {
    const term = raw.trim();
    if (term === "" || term === "+" || term === "-") continue;

    // Match patterns: coefficient only, x only, coefficient*x^n, x^n, coefficient*x
    const constMatch = /^([+-]?\d+(\.\d+)?)$/.exec(term);
    const xOnlyMatch = /^([+-]?)x$/.exec(term);
    const coeffXMatch = /^([+-]?\d+(\.\d+)?)x$/.exec(term);
    const xPowMatch = /^([+-]?)x\^(\d+)$/.exec(term);
    const coeffXPowMatch = /^([+-]?\d+(\.\d+)?)x\^(\d+)$/.exec(term);

    let coef = 0;
    let deg = 0;

    if (constMatch) {
      coef = parseFloat(constMatch[1]);
      deg = 0;
    } else if (xOnlyMatch) {
      coef = xOnlyMatch[1] === "-" ? -1 : 1;
      deg = 1;
    } else if (coeffXMatch) {
      coef = parseFloat(coeffXMatch[1]);
      deg = 1;
    } else if (xPowMatch) {
      coef = xPowMatch[1] === "-" ? -1 : 1;
      deg = parseInt(xPowMatch[2], 10);
    } else if (coeffXPowMatch) {
      coef = parseFloat(coeffXPowMatch[1]);
      deg = parseInt(coeffXPowMatch[3], 10);
    } else {
      return null; // unrecognized term
    }

    if (!Number.isFinite(coef)) return null;
    terms.set(deg, (terms.get(deg) ?? 0) + coef);
  }

  return terms;
}

function combinePoly(
  p1: Map<number, number>,
  p2: Map<number, number>,
  op: Operation
): Map<number, number> {
  const result = new Map(p1);
  for (const [deg, coef] of p2) {
    const existing = result.get(deg) ?? 0;
    result.set(deg, op === "add" ? existing + coef : existing - coef);
  }
  return result;
}

function formatPoly(terms: Map<number, number>): string {
  // Sort degrees descending
  const degrees = Array.from(terms.keys())
    .filter((d) => terms.get(d) !== 0)
    .sort((a, b) => b - a);

  if (degrees.length === 0) return "0";

  let result = "";
  for (let i = 0; i < degrees.length; i++) {
    const deg = degrees[i];
    const coef = terms.get(deg)!;
    const absCoef = Math.abs(coef);
    const sign = coef < 0 ? "−" : i === 0 ? "" : "+";
    const prefix = i === 0 ? (coef < 0 ? "−" : "") : ` ${sign} `;

    if (deg === 0) {
      result += `${prefix}${absCoef}`;
    } else if (deg === 1) {
      if (absCoef === 1) {
        result += `${prefix}x`;
      } else {
        result += `${prefix}${absCoef}x`;
      }
    } else {
      if (absCoef === 1) {
        result += `${prefix}x^${deg}`;
      } else {
        result += `${prefix}${absCoef}x^${deg}`;
      }
    }
  }
  return result || "0";
}

export default function AddingAndSubtractingPolynomialsCalculator(_props: {
  locale: Locale;
}) {
  const t = useTranslations(
    "tool.adding-and-subtracting-polynomials-calculator"
  );

  const [op, setOp] = React.useState<Operation>("add");
  const [poly1, setPoly1] = React.useState("");
  const [poly2, setPoly2] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const parsed1 = React.useMemo(
    () => (poly1.trim() !== "" ? parsePoly(poly1) : null),
    [poly1]
  );
  const parsed2 = React.useMemo(
    () => (poly2.trim() !== "" ? parsePoly(poly2) : null),
    [poly2]
  );

  const poly1Valid = poly1.trim() !== "" && parsed1 !== null;
  const poly2Valid = poly2.trim() !== "" && parsed2 !== null;

  const result = React.useMemo<string | null>(() => {
    if (!poly1Valid || !poly2Valid || !parsed1 || !parsed2) return null;
    const combined = combinePoly(parsed1, parsed2, op);
    return formatPoly(combined);
  }, [parsed1, parsed2, op, poly1Valid, poly2Valid]);

  function reset() {
    setPoly1("");
    setPoly2("");
    setOp("add");
    setTouched(false);
  }

  const faqItems: FaqItem[] = React.useMemo(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as {
      input: string;
      output: string;
      note: string;
    }[];
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

  const showError = touched && (!poly1Valid || !poly2Valid);

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
            <div className="flex gap-2">
              {(["add", "subtract"] as Operation[]).map((o) => (
                <Button
                  key={o}
                  type="button"
                  variant={op === o ? "default" : "outline"}
                  onClick={() => {
                    setOp(o);
                    setTouched(false);
                  }}
                >
                  {t(`type.${o}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="asp-p1">{t("field.poly1")}</Label>
              <Input
                id="asp-p1"
                type="text"
                value={poly1}
                placeholder={t("placeholder.poly1")}
                onChange={(e) => {
                  setPoly1(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="asp-p2">{t("field.poly2")}</Label>
              <Input
                id="asp-p2"
                type="text"
                value={poly2}
                placeholder={t("placeholder.poly2")}
                onChange={(e) => {
                  setPoly2(e.target.value);
                  setTouched(true);
                }}
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
            <div className="space-y-1 text-sm text-red-600">
              {!poly1Valid && <p>{t("error.invalidPoly1")}</p>}
              {poly1Valid && !poly2Valid && <p>{t("error.invalidPoly2")}</p>}
            </div>
          )}

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-1">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900 font-mono">
                {result}
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
                  <td className="px-3 py-2 text-zinc-800 font-mono text-xs">
                    {ex.input}
                  </td>
                  <td className="px-3 py-2 font-medium text-zinc-900 font-mono">
                    {ex.output}
                  </td>
                  <td className="px-3 py-2 text-zinc-600">{ex.note}</td>
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
