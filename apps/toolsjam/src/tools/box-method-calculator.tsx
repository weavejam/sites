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

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

function formatCoeff(n: number, isFirst: boolean): string {
  if (n === 0) return "0";
  if (isFirst) return n === 1 ? "" : n === -1 ? "-" : n.toString();
  if (n === 1) return "+";
  if (n === -1) return "-";
  return n > 0 ? `+${n}` : n.toString();
}

function buildPolynomial(ac: number, adbc: number, bd: number): string {
  const parts: string[] = [];
  if (ac !== 0) {
    const c = ac === 1 ? "x²" : ac === -1 ? "-x²" : `${ac}x²`;
    parts.push(c);
  }
  if (adbc !== 0) {
    if (parts.length === 0) {
      const c = adbc === 1 ? "x" : adbc === -1 ? "-x" : `${adbc}x`;
      parts.push(c);
    } else {
      const abs = Math.abs(adbc);
      const sign = adbc > 0 ? " + " : " - ";
      parts.push(`${sign}${abs === 1 ? "" : abs}x`);
    }
  }
  if (bd !== 0) {
    if (parts.length === 0) {
      parts.push(bd.toString());
    } else {
      const abs = Math.abs(bd);
      const sign = bd > 0 ? " + " : " - ";
      parts.push(`${sign}${abs}`);
    }
  }
  return parts.length === 0 ? "0" : parts.join("");
}

export default function BoxMethodCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.box-method-calculator");
  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("");
  const [c, setC] = React.useState("");
  const [d, setD] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const aNum = parseFloat(a);
  const bNum = parseFloat(b);
  const cNum = parseFloat(c);
  const dNum = parseFloat(d);

  const allValid =
    a !== "" && b !== "" && c !== "" && d !== "" &&
    Number.isFinite(aNum) && Number.isFinite(bNum) &&
    Number.isFinite(cNum) && Number.isFinite(dNum);

  const products = React.useMemo(() => {
    if (!allValid) return null;
    const ax_cx = aNum * cNum;   // ax * cx = ac·x²
    const ax_d  = aNum * dNum;   // ax * d  = ad·x
    const b_cx  = bNum * cNum;   // b  * cx = bc·x
    const b_d   = bNum * dNum;   // b  * d  = bd
    const linear = ax_d + b_cx;
    const poly = buildPolynomial(ax_cx, linear, b_d);
    return { ax_cx, ax_d, b_cx, b_d, linear, poly };
  }, [allValid, aNum, bNum, cNum, dNum]);

  function reset() {
    setA(""); setB(""); setC(""); setD("");
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

  const showError = touched && !allValid;

  function termStr(n: number, suffix: string): string {
    if (n === 0) return "0";
    if (suffix === "x²") {
      if (n === 1) return "x²";
      if (n === -1) return "-x²";
      return `${n}x²`;
    }
    if (suffix === "x") {
      if (n === 1) return "x";
      if (n === -1) return "-x";
      return `${n}x`;
    }
    return n.toString();
  }

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
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>{t("field.firstBinomial")}</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bm-a">{t("field.coeffA")}</Label>
                  <Input
                    id="bm-a"
                    type="number"
                    inputMode="decimal"
                    value={a}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => { setA(e.target.value); setTouched(true); }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bm-b">{t("field.constB")}</Label>
                  <Input
                    id="bm-b"
                    type="number"
                    inputMode="decimal"
                    value={b}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => { setB(e.target.value); setTouched(true); }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label>{t("field.secondBinomial")}</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bm-c">{t("field.coeffC")}</Label>
                  <Input
                    id="bm-c"
                    type="number"
                    inputMode="decimal"
                    value={c}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => { setC(e.target.value); setTouched(true); }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bm-d">{t("field.constD")}</Label>
                  <Input
                    id="bm-d"
                    type="number"
                    inputMode="decimal"
                    value={d}
                    placeholder={t("placeholder.number")}
                    onChange={(e) => { setD(e.target.value); setTouched(true); }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>{t("button.calculate")}</Button>
            <Button type="button" variant="outline" onClick={reset}>{t("button.reset")}</Button>
          </div>

          {showError && <p className="text-sm text-red-600">{t("error.invalid")}</p>}

          {products && !showError && (
            <div className="space-y-4">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-sm font-medium text-zinc-500 mb-3">{t("result.boxGrid")}</div>
                <div className="overflow-x-auto">
                  <table className="border-collapse text-sm font-mono mx-auto">
                    <thead>
                      <tr>
                        <th className="border border-zinc-300 bg-zinc-100 px-4 py-2 text-zinc-500"></th>
                        <th className="border border-zinc-300 bg-zinc-100 px-4 py-2 font-semibold text-zinc-700">
                          {`${aNum}x`}
                        </th>
                        <th className="border border-zinc-300 bg-zinc-100 px-4 py-2 font-semibold text-zinc-700">
                          {`${formatCoeff(bNum, false) === "+" ? "" : ""}${bNum}`}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-zinc-300 bg-zinc-100 px-4 py-2 font-semibold text-zinc-700">
                          {`${cNum}x`}
                        </td>
                        <td className="border border-zinc-300 bg-white px-4 py-2 text-center text-zinc-900">
                          {termStr(products.ax_cx, "x²")}
                        </td>
                        <td className="border border-zinc-300 bg-white px-4 py-2 text-center text-zinc-900">
                          {termStr(products.b_cx, "x")}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-zinc-300 bg-zinc-100 px-4 py-2 font-semibold text-zinc-700">
                          {dNum.toString()}
                        </td>
                        <td className="border border-zinc-300 bg-white px-4 py-2 text-center text-zinc-900">
                          {termStr(products.ax_d, "x")}
                        </td>
                        <td className="border border-zinc-300 bg-white px-4 py-2 text-center text-zinc-900">
                          {termStr(products.b_d, "")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
                <div className="mt-1 text-2xl font-semibold text-zinc-900 font-mono">{products.poly}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{t("about.heading")}</h2>
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">{t("about.body")}</div>
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
