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

type PrecisionType = "single" | "double";
const PRECISIONS: PrecisionType[] = ["single", "double"];

interface IEEE754Result {
  sign: number;
  exponent: number;
  mantissa: string;
  exponentBits: string;
  fullBinary: string;
  storedValue: number;
  roundingError: number;
  isSpecial: boolean;
  specialLabel: string;
}

function toSingle(value: number): IEEE754Result {
  const buf = new ArrayBuffer(4);
  const view = new DataView(buf);
  view.setFloat32(0, value, false);
  const bits = view.getUint32(0, false);

  const sign = (bits >>> 31) & 1;
  const expBits = (bits >>> 23) & 0xff;
  const mantBits = bits & 0x7fffff;

  const signStr = sign.toString();
  const expStr = expBits.toString(2).padStart(8, "0");
  const mantStr = mantBits.toString(2).padStart(23, "0");
  const fullBinary = signStr + " " + expStr + " " + mantStr;

  const storedValue = view.getFloat32(0, false);
  const roundingError = Math.abs(value - storedValue);

  let isSpecial = false;
  let specialLabel = "";
  if (expBits === 0xff) {
    isSpecial = true;
    specialLabel = mantBits === 0 ? (sign ? "-Infinity" : "+Infinity") : "NaN";
  } else if (expBits === 0 && mantBits === 0) {
    isSpecial = true;
    specialLabel = sign ? "-0" : "+0";
  }

  return {
    sign,
    exponent: expBits - 127,
    mantissa: mantStr,
    exponentBits: expStr,
    fullBinary,
    storedValue,
    roundingError,
    isSpecial,
    specialLabel,
  };
}

function toDouble(value: number): IEEE754Result {
  const buf = new ArrayBuffer(8);
  const view = new DataView(buf);
  view.setFloat64(0, value, false);

  const hi = view.getUint32(0, false);
  const lo = view.getUint32(4, false);

  const sign = (hi >>> 31) & 1;
  const expBits = (hi >>> 20) & 0x7ff;
  const mantHi = hi & 0xfffff;

  const signStr = sign.toString();
  const expStr = expBits.toString(2).padStart(11, "0");
  const mantStr = mantHi.toString(2).padStart(20, "0") + lo.toString(2).padStart(32, "0");
  const fullBinary = signStr + " " + expStr + " " + mantStr;

  const storedValue = view.getFloat64(0, false);
  const roundingError = Math.abs(value - storedValue);

  let isSpecial = false;
  let specialLabel = "";
  if (expBits === 0x7ff) {
    const mantLo = lo;
    isSpecial = true;
    specialLabel = (mantHi === 0 && mantLo === 0) ? (sign ? "-Infinity" : "+Infinity") : "NaN";
  } else if (expBits === 0 && mantHi === 0 && lo === 0) {
    isSpecial = true;
    specialLabel = sign ? "-0" : "+0";
  }

  return {
    sign,
    exponent: expBits - 1023,
    mantissa: mantStr,
    exponentBits: expStr,
    fullBinary,
    storedValue,
    roundingError,
    isSpecial,
    specialLabel,
  };
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function FloatingPointCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.floating-point-calculator");

  const [decimal, setDecimal] = React.useState("");
  const [precision, setPrecision] = React.useState<PrecisionType>("double");
  const [touched, setTouched] = React.useState(false);

  const decimalNum = parseFloat(decimal);
  const valid = decimal !== "" && Number.isFinite(decimalNum);

  const result = React.useMemo<IEEE754Result | null>(() => {
    if (!valid) return null;
    return precision === "single" ? toSingle(decimalNum) : toDouble(decimalNum);
  }, [valid, decimalNum, precision]);

  function loadExample(d: string, p: PrecisionType) {
    setDecimal(d);
    setPrecision(p);
    setTouched(true);
  }

  function reset() {
    setDecimal("");
    setPrecision("double");
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
            <Label>{t("field.precision")}</Label>
            <div className="flex flex-wrap gap-2">
              {PRECISIONS.map((p) => (
                <Button
                  key={p}
                  type="button"
                  variant={precision === p ? "default" : "outline"}
                  onClick={() => { setPrecision(p); setTouched(false); }}
                >
                  {t(`type.${p}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fp-decimal">{t("field.decimal")}</Label>
            <Input
              id="fp-decimal"
              type="text"
              inputMode="decimal"
              value={decimal}
              placeholder={t("placeholder.decimal")}
              onChange={(e) => { setDecimal(e.target.value); setTouched(true); }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {touched && !valid && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>

              {result.isSpecial && (
                <div className="text-lg font-semibold text-amber-700">
                  {t("result.special")}: {result.specialLabel}
                </div>
              )}

              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-zinc-500">{t("result.sign")}:</span>{" "}
                  <span className="font-mono font-semibold text-zinc-900">{result.sign}</span>
                  <span className="ml-2 text-zinc-400">
                    ({result.sign === 0 ? t("result.positive") : t("result.negative")})
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.exponentBits")}:</span>{" "}
                  <span className="font-mono font-semibold text-zinc-900">{result.exponentBits}</span>
                  <span className="ml-2 text-zinc-400">
                    ({t("result.biasedExp")}: {result.exponent + (precision === "single" ? 127 : 1023)},
                    {t("result.actualExp")}: {result.exponent})
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.mantissaBits")}:</span>{" "}
                  <span className="font-mono text-xs break-all text-zinc-900">{result.mantissa}</span>
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <div className="font-semibold text-zinc-700">{t("result.fullBinary")}:</div>
                <div className="font-mono text-xs break-all rounded bg-white border border-zinc-200 px-2 py-1 text-zinc-900">
                  {result.fullBinary}
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-zinc-500">{t("result.storedValue")}:</span>{" "}
                  <span className="font-semibold text-zinc-900">
                    {result.storedValue.toPrecision(precision === "single" ? 9 : 17)}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">{t("result.roundingError")}:</span>{" "}
                  <span className="font-semibold text-zinc-900">
                    {result.roundingError === 0 ? t("result.exact") : result.roundingError.toExponential(4)}
                  </span>
                </div>
              </div>

              <div className="mt-2 text-xs text-zinc-500">{t("formula")}</div>
            </div>
          )}
        </CardContent>
      </Card>

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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("3.141592653589793", "double")}>
            {t("examples.loadPi")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("0.1", "single")}>
            {t("examples.loadOnetenth")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("2.718281828459045", "double")}>
            {t("examples.loadE")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {t("about.body")}
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
