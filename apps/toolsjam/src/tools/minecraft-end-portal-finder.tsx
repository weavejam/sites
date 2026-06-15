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

// Angle convention: 0° = North (−Z), 90° = East (+X), 180° = South (+Z), 270° = West (−X)
function angleToVector(deg: number): { dx: number; dz: number } {
  const rad = (deg * Math.PI) / 180;
  return { dx: Math.sin(rad), dz: -Math.cos(rad) };
}

function singleThrowEstimate(x: number, z: number, angle: number, distance: number): { x: number; z: number } {
  const { dx, dz } = angleToVector(angle);
  return { x: x + dx * distance, z: z + dz * distance };
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

function fmtDist(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

export default function MinecraftEndPortalFinder(_props: { locale: Locale }) {
  const t = useTranslations("tool.minecraft-end-portal-finder");

  const [currentX, setCurrentX] = React.useState("");
  const [currentZ, setCurrentZ] = React.useState("");
  const [throwAngle, setThrowAngle] = React.useState("");
  const [throwDistance, setThrowDistance] = React.useState("");
  const [secondAngle, setSecondAngle] = React.useState("");
  const [secondDistance, setSecondDistance] = React.useState("");
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState<{
    single: { x: number; z: number; dist: number };
    triangulated?: { x: number; z: number; dist: number } | null;
  } | null>(null);

  function handleFind() {
    setError("");
    setResult(null);

    const cx = parseFloat(currentX);
    const cz = parseFloat(currentZ);
    const ta = parseFloat(throwAngle);
    const td = parseFloat(throwDistance);

    if (!Number.isFinite(cx) || !Number.isFinite(cz)) {
      setError(t("error.invalidCoords")); return;
    }
    if (!Number.isFinite(ta) || ta < 0 || ta > 360) {
      setError(t("error.invalidAngle")); return;
    }
    if (!Number.isFinite(td) || td <= 0) {
      setError(t("error.invalidDistance")); return;
    }

    const single = singleThrowEstimate(cx, cz, ta, td);
    const singleDist = Math.sqrt((single.x - cx) ** 2 + (single.z - cz) ** 2);

    let triangulated: { x: number; z: number; dist: number } | null = null;

    if (secondAngle !== "" && secondDistance !== "") {
      const sa = parseFloat(secondAngle);
      const sd = parseFloat(secondDistance);
      if (!Number.isFinite(sa) || !Number.isFinite(sd) || sd <= 0) {
        setError(t("error.invalidDistance")); return;
      }
      // Use the second throw as a separate independent estimate
      const est2 = singleThrowEstimate(cx, cz, sa, sd);
      triangulated = {
        x: est2.x,
        z: est2.z,
        dist: Math.sqrt((est2.x - cx) ** 2 + (est2.z - cz) ** 2),
      };
    }

    setResult({
      single: { x: single.x, z: single.z, dist: singleDist },
      triangulated,
    });
  }

  function handleReset() {
    setCurrentX(""); setCurrentZ(""); setThrowAngle(""); setThrowDistance("");
    setSecondAngle(""); setSecondDistance(""); setError(""); setResult(null);
  }

  function loadExample(
    cx: string, cz: string, ta: string, td: string,
    sa?: string, sd?: string
  ) {
    setCurrentX(cx); setCurrentZ(cz); setThrowAngle(ta); setThrowDistance(td);
    setSecondAngle(sa ?? ""); setSecondDistance(sd ?? "");
    setError(""); setResult(null);
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
        applicationCategory: "GameApplication",
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="epf-cx">{t("field.currentX")}</Label>
              <Input
                id="epf-cx"
                type="number"
                inputMode="numeric"
                value={currentX}
                placeholder={t("placeholder.coord")}
                onChange={(e) => { setCurrentX(e.target.value); setResult(null); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="epf-cz">{t("field.currentZ")}</Label>
              <Input
                id="epf-cz"
                type="number"
                inputMode="numeric"
                value={currentZ}
                placeholder={t("placeholder.coord")}
                onChange={(e) => { setCurrentZ(e.target.value); setResult(null); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="epf-ta">{t("field.throwAngle")}</Label>
              <Input
                id="epf-ta"
                type="number"
                inputMode="decimal"
                value={throwAngle}
                placeholder={t("placeholder.angle")}
                onChange={(e) => { setThrowAngle(e.target.value); setResult(null); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="epf-td">{t("field.throwDistance")}</Label>
              <Input
                id="epf-td"
                type="number"
                inputMode="decimal"
                value={throwDistance}
                placeholder={t("placeholder.distance")}
                onChange={(e) => { setThrowDistance(e.target.value); setResult(null); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="epf-sa">{t("field.secondAngle")}</Label>
              <Input
                id="epf-sa"
                type="number"
                inputMode="decimal"
                value={secondAngle}
                placeholder={t("placeholder.angle")}
                onChange={(e) => { setSecondAngle(e.target.value); setResult(null); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="epf-sd">{t("field.secondDistance")}</Label>
              <Input
                id="epf-sd"
                type="number"
                inputMode="decimal"
                value={secondDistance}
                placeholder={t("placeholder.distance")}
                onChange={(e) => { setSecondDistance(e.target.value); setResult(null); }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={handleFind}>
              {t("button.find")}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              {t("button.reset")}
            </Button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {result && (
            <div className="space-y-3">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
                <div className="text-sm font-semibold text-zinc-500">{t("result.heading")}</div>
                <div>
                  <div className="text-xs text-zinc-500 mb-1">{t("result.estimateOne")}</div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-zinc-500">{t("result.portalX")}: </span>
                      <span className="font-semibold text-zinc-900">{fmt(result.single.x)}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500">{t("result.portalZ")}: </span>
                      <span className="font-semibold text-zinc-900">{fmt(result.single.z)}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500">{t("result.distanceAway")}: </span>
                      <span className="font-semibold text-zinc-900">{fmtDist(result.single.dist)} {t("result.blocks")}</span>
                    </div>
                  </div>
                </div>
                {result.triangulated && (
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">{t("result.estimateTwo")}</div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-zinc-500">{t("result.portalX")}: </span>
                        <span className="font-semibold text-green-700">{fmt(result.triangulated.x)}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500">{t("result.portalZ")}: </span>
                        <span className="font-semibold text-green-700">{fmt(result.triangulated.z)}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500">{t("result.distanceAway")}: </span>
                        <span className="font-semibold text-green-700">{fmtDist(result.triangulated.dist)} {t("result.blocks")}</span>
                      </div>
                    </div>
                  </div>
                )}
                <p className="text-xs text-zinc-500 italic">{t("result.note")}</p>
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
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("0", "0", "45", "150")}>
            {t("examples.loadSingle")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("100", "100", "30", "200", "60", "180")}>
            {t("examples.loadTriangulate")}
          </Button>
          <Button type="button" variant="outline" size="sm"
            onClick={() => loadExample("500", "-300", "135", "400")}>
            {t("examples.loadDistant")}
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
