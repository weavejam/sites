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

type Mode = "findArea" | "findPerimeter" | "findHeight" | "findBase";

const MODES: Mode[] = ["findArea", "findPerimeter", "findHeight", "findBase"];

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * 1e8) / 1e8).toLocaleString("en-US", {
    maximumFractionDigits: 8,
  });
}

export default function TrapezoidCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.trapezoid-calculator");
  const [mode, setMode] = React.useState<Mode>("findArea");
  const [baseA, setBaseA] = React.useState("");
  const [baseB, setBaseB] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [legC, setLegC] = React.useState("");
  const [legD, setLegD] = React.useState("");
  const [area, setArea] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  function resetState() {
    setBaseA(""); setBaseB(""); setHeight("");
    setLegC(""); setLegD(""); setArea("");
    setTouched(false);
  }

  function switchMode(m: Mode) {
    setMode(m);
    setTouched(false);
  }

  const aNum = parseFloat(baseA);
  const bNum = parseFloat(baseB);
  const hNum = parseFloat(height);
  const cNum = parseFloat(legC);
  const dNum = parseFloat(legD);
  const areaNum = parseFloat(area);

  function pos(v: number) { return Number.isFinite(v) && v > 0; }

  const result = React.useMemo<number | null>(() => {
    if (!touched) return null;
    switch (mode) {
      case "findArea":
        if (!pos(aNum) || !pos(bNum) || !pos(hNum)) return null;
        return ((aNum + bNum) * hNum) / 2;
      case "findPerimeter":
        if (!pos(aNum) || !pos(bNum) || !pos(cNum) || !pos(dNum)) return null;
        return aNum + bNum + cNum + dNum;
      case "findHeight": {
        if (!pos(areaNum) || !pos(aNum) || !pos(bNum)) return null;
        const sum = aNum + bNum;
        if (sum === 0) return null;
        return (2 * areaNum) / sum;
      }
      case "findBase": {
        if (!pos(areaNum) || !pos(hNum) || !pos(bNum)) return null;
        const base = (2 * areaNum) / hNum - bNum;
        if (base <= 0) return null;
        return base;
      }
    }
  }, [touched, mode, aNum, bNum, hNum, cNum, dNum, areaNum]);

  const showError = React.useMemo(() => {
    if (!touched) return false;
    switch (mode) {
      case "findArea": return !pos(aNum) || !pos(bNum) || !pos(hNum);
      case "findPerimeter": return !pos(aNum) || !pos(bNum) || !pos(cNum) || !pos(dNum);
      case "findHeight": return !pos(areaNum) || !pos(aNum) || !pos(bNum);
      case "findBase": return !pos(areaNum) || !pos(hNum) || !pos(bNum);
    }
  }, [touched, mode, aNum, bNum, hNum, cNum, dNum, areaNum]);

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[] | undefined;
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

  function Field({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (v: string) => void }) {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          placeholder={t("placeholder.value")}
          value={value}
          onChange={(e) => { onChange(e.target.value); setTouched(true); }}
        />
      </div>
    );
  }

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
            <Label>{t("field.type")}</Label>
            <div className="flex flex-wrap gap-2">
              {MODES.map((m) => (
                <Button
                  key={m}
                  type="button"
                  variant={mode === m ? "default" : "outline"}
                  onClick={() => switchMode(m)}
                >
                  {t(`type.${m}` as never)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              {t(`type.${mode}_desc` as never)}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {mode === "findArea" && (
              <>
                <Field id="trap-a" label={t("field.baseA")} value={baseA} onChange={setBaseA} />
                <Field id="trap-b" label={t("field.baseB")} value={baseB} onChange={setBaseB} />
                <Field id="trap-h" label={t("field.height")} value={height} onChange={setHeight} />
              </>
            )}
            {mode === "findPerimeter" && (
              <>
                <Field id="trap-a" label={t("field.baseA")} value={baseA} onChange={setBaseA} />
                <Field id="trap-b" label={t("field.baseB")} value={baseB} onChange={setBaseB} />
                <Field id="trap-c" label={t("field.legC")} value={legC} onChange={setLegC} />
                <Field id="trap-d" label={t("field.legD")} value={legD} onChange={setLegD} />
              </>
            )}
            {mode === "findHeight" && (
              <>
                <Field id="trap-area" label={t("field.area")} value={area} onChange={setArea} />
                <Field id="trap-a" label={t("field.baseA")} value={baseA} onChange={setBaseA} />
                <Field id="trap-b" label={t("field.baseB")} value={baseB} onChange={setBaseB} />
              </>
            )}
            {mode === "findBase" && (
              <>
                <Field id="trap-area" label={t("field.area")} value={area} onChange={setArea} />
                <Field id="trap-h" label={t("field.height")} value={height} onChange={setHeight} />
                <Field id="trap-b" label={t("field.baseB")} value={baseB} onChange={setBaseB} />
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={resetState}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="mt-1 text-2xl font-semibold text-zinc-900">
                {t(`result.${mode}` as never, { result: formatNum(result) })}
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
