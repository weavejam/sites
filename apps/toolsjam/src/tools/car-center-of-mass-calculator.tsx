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

interface Component {
  id: number;
  mass: string;
  x: string;
  y: string;
  z: string;
}

interface ExampleRow {
  input: string;
  output: string;
  note?: string;
}

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toPrecision(5)).toString();
}

let nextId = 1;
function newComponent(): Component {
  return { id: nextId++, mass: "", x: "", y: "", z: "" };
}

export default function CarCenterOfMassCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.car-center-of-mass-calculator");

  const [components, setComponents] = React.useState<Component[]>([
    newComponent(),
    newComponent(),
  ]);
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo(() => {
    if (!touched) return null;
    const valid = components.filter((c) => {
      const m = parseFloat(c.mass);
      const x = parseFloat(c.x);
      const y = parseFloat(c.y);
      const z = parseFloat(c.z);
      return (
        Number.isFinite(m) && m > 0 &&
        Number.isFinite(x) &&
        Number.isFinite(y) &&
        Number.isFinite(z)
      );
    });
    if (valid.length < 1) return null;

    const totalMass = valid.reduce((sum, c) => sum + parseFloat(c.mass), 0);
    if (totalMass <= 0) return null;

    const cgX = valid.reduce((sum, c) => sum + parseFloat(c.mass) * parseFloat(c.x), 0) / totalMass;
    const cgY = valid.reduce((sum, c) => sum + parseFloat(c.mass) * parseFloat(c.y), 0) / totalMass;
    const cgZ = valid.reduce((sum, c) => sum + parseFloat(c.mass) * parseFloat(c.z), 0) / totalMass;

    return { totalMass, cgX, cgY, cgZ, count: valid.length };
  }, [touched, components]);

  const showError = touched && result === null;

  const examplesItems: ExampleRow[] = React.useMemo(() => {
    const raw = t.raw("examples.items") as ExampleRow[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps: string[] = React.useMemo(() => {
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

  function addComponent() {
    setComponents((prev) => [...prev, newComponent()]);
    setTouched(false);
  }

  function removeComponent(id: number) {
    setComponents((prev) => prev.filter((c) => c.id !== id));
    setTouched(false);
  }

  function updateComponent(id: number, field: keyof Omit<Component, "id">, value: string) {
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
    setTouched(false);
  }

  function loadExample(parts: { mass: string; x: string; y: string; z: string }[]) {
    const newComps: Component[] = parts.map((p) => ({ id: nextId++, ...p }));
    setComponents(newComps);
    setTouched(true);
  }

  function handleReset() {
    setComponents([newComponent(), newComponent()]);
    setTouched(false);
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
          <div className="space-y-1">
            <div className="grid grid-cols-5 gap-2 text-xs font-medium text-zinc-500 px-1">
              <span>{t("field.mass")}</span>
              <span>{t("field.x")}</span>
              <span>{t("field.y")}</span>
              <span>{t("field.z")}</span>
              <span></span>
            </div>
            {components.map((comp, idx) => (
              <div key={comp.id} className="grid grid-cols-5 gap-2 items-center">
                <div className="space-y-1">
                  <Label htmlFor={`ccm-m-${comp.id}`} className="sr-only">
                    {t("field.mass")} {idx + 1}
                  </Label>
                  <Input
                    id={`ccm-m-${comp.id}`}
                    type="number"
                    inputMode="decimal"
                    value={comp.mass}
                    placeholder={t("placeholder.mass")}
                    min="0"
                    step="any"
                    onChange={(e) => updateComponent(comp.id, "mass", e.target.value)}
                  />
                </div>
                <Input
                  type="number"
                  inputMode="decimal"
                  value={comp.x}
                  placeholder={t("placeholder.coord")}
                  step="any"
                  onChange={(e) => updateComponent(comp.id, "x", e.target.value)}
                  aria-label={`${t("field.x")} ${idx + 1}`}
                />
                <Input
                  type="number"
                  inputMode="decimal"
                  value={comp.y}
                  placeholder={t("placeholder.coord")}
                  step="any"
                  onChange={(e) => updateComponent(comp.id, "y", e.target.value)}
                  aria-label={`${t("field.y")} ${idx + 1}`}
                />
                <Input
                  type="number"
                  inputMode="decimal"
                  value={comp.z}
                  placeholder={t("placeholder.coord")}
                  step="any"
                  onChange={(e) => updateComponent(comp.id, "z", e.target.value)}
                  aria-label={`${t("field.z")} ${idx + 1}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeComponent(comp.id)}
                  disabled={components.length <= 1}
                >
                  {t("button.remove")}
                </Button>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={addComponent}>
              {t("button.addComponent")}
            </Button>
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.calculate")}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              {t("button.reset")}
            </Button>
          </div>

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.totalMass")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{formatNum(result.totalMass)} kg</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.components")}</div>
                  <div className="text-xl font-semibold text-zinc-900">{result.count}</div>
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-zinc-500 mb-2">{t("result.cgHeading")}</div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.cgX")}</div>
                    <div className="text-xl font-semibold text-zinc-900">{formatNum(result.cgX)} m</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.cgY")}</div>
                    <div className="text-xl font-semibold text-zinc-900">{formatNum(result.cgY)} m</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{t("result.cgZ")}</div>
                    <div className="text-xl font-semibold text-zinc-900">{formatNum(result.cgZ)} m</div>
                  </div>
                </div>
              </div>
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
            onClick={() => loadExample([
              { mass: "1200", x: "1.2", y: "0", z: "0.5" },
              { mass: "75", x: "1.5", y: "-0.4", z: "0.9" },
              { mass: "75", x: "1.5", y: "0.4", z: "0.9" },
              { mass: "25", x: "2.8", y: "0", z: "0.7" },
            ])}>
            {t("examples.loadSedan")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample([
              { mass: "500", x: "1.0", y: "0", z: "0.25" },
              { mass: "70", x: "1.3", y: "0.1", z: "0.6" },
              { mass: "50", x: "2.5", y: "0", z: "0.2" },
            ])}>
            {t("examples.loadRaceCar")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample([
              { mass: "2000", x: "1.5", y: "0", z: "1.0" },
              { mass: "80", x: "1.0", y: "-0.5", z: "1.5" },
              { mass: "1500", x: "4.0", y: "0.5", z: "1.2" },
            ])}>
            {t("examples.loadTruck")}
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
