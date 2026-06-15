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

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * 1e8) / 1e8;
  if (Object.is(rounded, -0)) return "0";
  return rounded.toString();
}

interface Root {
  re: number;
  im: number;
}

export default function ComplexRootCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.complex-root-calculator");
  const [a, setA] = React.useState<string>("");
  const [b, setB] = React.useState<string>("");
  const [n, setN] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const aNum = parseFloat(a);
  const bNum = parseFloat(b);
  const nFloat = parseFloat(n);
  const nNum = Math.floor(nFloat);
  const aValid = a !== "" && Number.isFinite(aNum);
  const bValid = b !== "" && Number.isFinite(bNum);
  const nValid =
    n !== "" && Number.isFinite(nFloat) && Number.isInteger(nFloat) && nNum >= 1 && nNum <= 20;

  const result = React.useMemo<{
    roots: Root[];
    r: number;
    theta: number;
    isZero: boolean;
  } | null>(() => {
    if (!aValid || !bValid || !nValid) return null;
    const r = Math.sqrt(aNum * aNum + bNum * bNum);
    const theta = Math.atan2(bNum, aNum);
    if (r === 0) {
      return { roots: [{ re: 0, im: 0 }], r: 0, theta: 0, isZero: true };
    }
    const rRoot = Math.pow(r, 1 / nNum);
    const roots: Root[] = [];
    for (let k = 0; k < nNum; k++) {
      const angle = (theta + 2 * Math.PI * k) / nNum;
      roots.push({
        re: rRoot * Math.cos(angle),
        im: rRoot * Math.sin(angle),
      });
    }
    return { roots, r, theta, isZero: false };
  }, [aNum, bNum, nNum, aValid, bValid, nValid]);

  function reset() {
    setA("");
    setB("");
    setN("");
    setTouched(false);
  }

  function loadExample(va: string, vb: string, vn: string) {
    setA(va);
    setB(vb);
    setN(vn);
    setTouched(true);
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

  const showError = touched && (!aValid || !bValid || !nValid);
  const showDegreeError =
    touched && a !== "" && b !== "" && n !== "" && aValid && bValid && !nValid;

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
              <Label htmlFor="crc-a">{t("field.real")}</Label>
              <Input
                id="crc-a"
                type="number"
                inputMode="decimal"
                value={a}
                placeholder={t("placeholder.real")}
                onChange={(e) => {
                  setA(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="crc-b">{t("field.imag")}</Label>
              <Input
                id="crc-b"
                type="number"
                inputMode="decimal"
                value={b}
                placeholder={t("placeholder.imag")}
                onChange={(e) => {
                  setB(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="crc-n">{t("field.degree")}</Label>
              <Input
                id="crc-n"
                type="number"
                inputMode="numeric"
                min={1}
                max={20}
                step={1}
                value={n}
                placeholder={t("placeholder.degree")}
                onChange={(e) => {
                  setN(e.target.value);
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

          {showError && !showDegreeError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showDegreeError && (
            <p className="text-sm text-red-600">{t("error.degree")}</p>
          )}

          {result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              {result.isZero ? (
                <div className="text-zinc-900">{t("result.zero")}</div>
              ) : (
                <>
                  <div className="text-sm text-zinc-700">
                    {t("result.modulus", { value: formatNumber(result.r) })}
                  </div>
                  <div className="text-sm text-zinc-700">
                    {t("result.argument", { value: formatNumber(result.theta) })}
                  </div>
                  <ol className="mt-2 list-decimal space-y-1 pl-6 text-zinc-900">
                    {result.roots.map((root, k) => {
                      const sign = root.im >= 0 ? "+" : "−";
                      return (
                        <li key={k}>
                          <span className="text-xs text-zinc-500 mr-2">
                            {t("result.rootK", { k })}
                          </span>
                          <span className="font-mono">
                            {formatNumber(root.re)} {sign}{" "}
                            {formatNumber(Math.abs(root.im))}i
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </>
              )}
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
                  <td className="px-3 py-2 font-medium text-zinc-900">
                    {ex.output}
                  </td>
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
            onClick={() => loadExample("8", "0", "3")}
          >
            {t("examples.loadCubeRoots")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("0", "1", "2")}
          >
            {t("examples.loadSqrtI")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadExample("-16", "0", "4")}
          >
            {t("examples.loadFourthRoots")}
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
