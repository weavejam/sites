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

interface FaqItem {
  q: string;
  a: string;
}

function fmt(n: number, decimals = 1): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

export default function UrrCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.urr-calculator-urea-reduction-ratio");

  const [preBun, setPreBun] = React.useState("");
  const [postBun, setPostBun] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const preNum = parseFloat(preBun);
  const postNum = parseFloat(postBun);
  const preValid = preBun !== "" && Number.isFinite(preNum) && preNum > 0;
  const postValid = postBun !== "" && Number.isFinite(postNum) && postNum >= 0;
  const logicValid = preValid && postValid && postNum < preNum;

  const result = React.useMemo(() => {
    if (!preValid || !postValid) return null;
    if (postNum >= preNum) return null;
    const urr = ((preNum - postNum) / preNum) * 100;
    let category: string;
    if (urr >= 70) category = "excellent";
    else if (urr >= 65) category = "adequate";
    else if (urr >= 50) category = "borderline";
    else category = "inadequate";
    return { urr, category };
  }, [preNum, postNum, preValid, postValid]);

  const examplesItems: ExampleItem[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems: FaqItem[] = React.useMemo(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: t("title"),
        applicationCategory: "HealthApplication",
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

  function loadExample(pre: string, post: string) {
    setPreBun(pre);
    setPostBun(post);
    setTouched(true);
  }

  function reset() {
    setPreBun("");
    setPostBun("");
    setTouched(false);
  }

  const showError = touched && (!preValid || !postValid);
  const showLogicError = touched && preValid && postValid && !logicValid;

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="urr-pre">{t("field.preBun")}</Label>
              <Input
                id="urr-pre"
                type="number"
                inputMode="decimal"
                min="0"
                value={preBun}
                placeholder={t("placeholder.preBun")}
                onChange={(e) => { setPreBun(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="urr-post">{t("field.postBun")}</Label>
              <Input
                id="urr-post"
                type="number"
                inputMode="decimal"
                min="0"
                value={postBun}
                placeholder={t("placeholder.postBun")}
                onChange={(e) => { setPostBun(e.target.value); setTouched(true); }}
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
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}
          {showLogicError && (
            <p className="text-sm text-red-600">{t("error.logic")}</p>
          )}

          {result && !showError && !showLogicError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="text-2xl font-semibold text-zinc-900">
                {fmt(result.urr)}%
              </div>
              <div>
                <div className="text-xs text-zinc-500">{t("result.category")}</div>
                <div className="text-base font-semibold text-zinc-900">
                  {t(`category.${result.category}` as never)}
                </div>
              </div>
              <div className="mt-2 text-xs text-zinc-500">{t("formula")}</div>
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
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("40", "14")}>
            {t("examples.loadAdequate")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("60", "10")}>
            {t("examples.loadExcellent")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("50", "35")}>
            {t("examples.loadInadequate")}
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
