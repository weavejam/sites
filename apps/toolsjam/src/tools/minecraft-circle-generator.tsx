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

type Algorithm = "midpoint" | "bresenham";
type FillType = "outline" | "filled";

function midpointCircle(r: number): Set<string> {
  const pts = new Set<string>();
  let x = 0;
  let y = r;
  let d = 1 - r;
  while (x <= y) {
    for (const [px, py] of [
      [x, y], [y, x], [-x, y], [-y, x],
      [x, -y], [y, -x], [-x, -y], [-y, -x],
    ] as [number, number][]) {
      pts.add(`${px},${py}`);
    }
    if (d < 0) {
      d += 2 * x + 3;
    } else {
      d += 2 * (x - y) + 5;
      y--;
    }
    x++;
  }
  return pts;
}

function bresenhamCircle(r: number): Set<string> {
  const pts = new Set<string>();
  let x = 0;
  let y = r;
  let d = 3 - 2 * r;
  while (x <= y) {
    for (const [px, py] of [
      [x, y], [y, x], [-x, y], [-y, x],
      [x, -y], [y, -x], [-x, -y], [-y, -x],
    ] as [number, number][]) {
      pts.add(`${px},${py}`);
    }
    if (d <= 0) {
      d += 4 * x + 6;
    } else {
      d += 4 * (x - y) + 10;
      y--;
    }
    x++;
  }
  return pts;
}

function filledCircle(r: number): Set<string> {
  const pts = new Set<string>();
  for (let dy = -r; dy <= r; dy++) {
    const dxMax = Math.floor(Math.sqrt(r * r - dy * dy));
    for (let dx = -dxMax; dx <= dxMax; dx++) {
      pts.add(`${dx},${dy}`);
    }
  }
  return pts;
}

function generateCircle(r: number, algo: Algorithm, fill: FillType): Set<string> {
  if (fill === "filled") return filledCircle(r);
  return algo === "midpoint" ? midpointCircle(r) : bresenhamCircle(r);
}

interface ExampleItem {
  input: string;
  output: string;
  note?: string;
}

const MAX_RADIUS = 60;

export default function MinecraftCircleGenerator(_props: { locale: Locale }) {
  const t = useTranslations("tool.minecraft-circle-generator");

  const [radius, setRadius] = React.useState("10");
  const [centerX, setCenterX] = React.useState("0");
  const [centerY, setCenterY] = React.useState("0");
  const [algorithm, setAlgorithm] = React.useState<Algorithm>("midpoint");
  const [fillType, setFillType] = React.useState<FillType>("outline");
  const [error, setError] = React.useState("");
  const [circleData, setCircleData] = React.useState<{
    points: Set<string>;
    r: number;
    cx: number;
    cy: number;
  } | null>(null);
  const [copied, setCopied] = React.useState(false);

  function handleGenerate() {
    setError("");
    const r = parseInt(radius, 10);
    const cx = centerX === "" ? 0 : parseInt(centerX, 10);
    const cy = centerY === "" ? 0 : parseInt(centerY, 10);
    if (!Number.isFinite(r) || r < 1 || r > MAX_RADIUS) {
      setError(t("error.invalidRadius"));
      return;
    }
    if (!Number.isFinite(cx) || !Number.isFinite(cy)) {
      setError(t("error.invalidCoords"));
      return;
    }
    const points = generateCircle(r, algorithm, fillType);
    setCircleData({ points, r, cx, cy });
  }

  function handleReset() {
    setRadius("");
    setCenterX("0");
    setCenterY("0");
    setError("");
    setCircleData(null);
    setCopied(false);
  }

  function handleCopy() {
    if (!circleData) return;
    const lines: string[] = [];
    for (const p of circleData.points) {
      const [dx, dy] = p.split(",").map(Number);
      lines.push(`${dx + circleData.cx}, ${dy + circleData.cy}`);
    }
    lines.sort();
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function loadExample(r: number, algo: Algorithm, fill: FillType) {
    setRadius(String(r));
    setAlgorithm(algo);
    setFillType(fill);
    setError("");
    setCircleData(null);
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

  // Render circle grid
  const circleGrid = React.useMemo(() => {
    if (!circleData) return null;
    const { points, r } = circleData;
    const size = 2 * r + 1;
    const cellPx = Math.max(4, Math.min(12, Math.floor(480 / size)));
    const rows: React.ReactNode[] = [];
    for (let row = -r; row <= r; row++) {
      const cells: React.ReactNode[] = [];
      for (let col = -r; col <= r; col++) {
        const filled = points.has(`${col},${row}`);
        cells.push(
          <div
            key={`${col},${row}`}
            style={{ width: cellPx, height: cellPx }}
            className={filled ? "bg-zinc-900" : "bg-zinc-100"}
          />
        );
      }
      rows.push(
        <div key={row} className="flex">
          {cells}
        </div>
      );
    }
    return { rows, size, blockCount: points.size };
  }, [circleData]);

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
              <Label htmlFor="mcg-r">{t("field.radius")}</Label>
              <Input
                id="mcg-r"
                type="number"
                inputMode="numeric"
                value={radius}
                placeholder={t("placeholder.radius")}
                min={1}
                max={MAX_RADIUS}
                onChange={(e) => { setRadius(e.target.value); setCircleData(null); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mcg-cx">{t("field.centerX")}</Label>
              <Input
                id="mcg-cx"
                type="number"
                inputMode="numeric"
                value={centerX}
                placeholder={t("placeholder.coord")}
                onChange={(e) => { setCenterX(e.target.value); setCircleData(null); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mcg-cy">{t("field.centerY")}</Label>
              <Input
                id="mcg-cy"
                type="number"
                inputMode="numeric"
                value={centerY}
                placeholder={t("placeholder.coord")}
                onChange={(e) => { setCenterY(e.target.value); setCircleData(null); }}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t("field.algorithm")}</Label>
              <div className="flex gap-2">
                {(["midpoint", "bresenham"] as Algorithm[]).map((a) => (
                  <Button
                    key={a}
                    type="button"
                    variant={algorithm === a ? "default" : "outline"}
                    onClick={() => { setAlgorithm(a); setCircleData(null); }}
                  >
                    {t(`algorithm.${a}` as never)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("field.fillType")}</Label>
              <div className="flex gap-2">
                {(["outline", "filled"] as FillType[]).map((f) => (
                  <Button
                    key={f}
                    type="button"
                    variant={fillType === f ? "default" : "outline"}
                    onClick={() => { setFillType(f); setCircleData(null); }}
                  >
                    {t(`fillType.${f}` as never)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={handleGenerate}>
              {t("button.generate")}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              {t("button.reset")}
            </Button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {circleGrid && circleData && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600">
                <span>{t("result.blockCount")}: <strong className="text-zinc-900">{circleGrid.blockCount}</strong></span>
                <span>{t("result.diameter")}: <strong className="text-zinc-900">{circleGrid.size}</strong></span>
                <span>{t("result.centerLabel")}: <strong className="text-zinc-900">({circleData.cx}, {circleData.cy})</strong></span>
              </div>
              <div className="overflow-auto rounded border border-zinc-200 bg-zinc-50 p-2">
                <div className="inline-block">
                  {circleGrid.rows}
                </div>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
                {copied ? t("result.copied") : t("result.copyCoords")}
              </Button>
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
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample(5, "midpoint", "outline")}>
            {t("examples.loadSmall")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample(15, "midpoint", "outline")}>
            {t("examples.loadMedium")}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => loadExample(30, "bresenham", "outline")}>
            {t("examples.loadLarge")}
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
