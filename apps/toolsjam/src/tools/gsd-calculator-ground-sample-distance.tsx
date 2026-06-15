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

// GSD [cm/px] = (sensor_width_mm × flying_height_m × 100) / (focal_length_mm × image_width_px)
// Ground coverage width [m] = GSD_cm/100 × image_width_px
// Ground coverage area [m²] = coverage_w × coverage_h (when image height provided)

function calcGSD(
  sensorWidth: number,  // mm
  flyingHeight: number, // m
  focalLength: number,  // mm
  imageWidth: number | null,  // px (optional)
  imageHeight: number | null, // px (optional)
): {
  gsd: number | null;        // cm/px (null without image width)
  coverageW: number | null;  // m
  coverageH: number | null;  // m
  coverageArea: number | null; // m²
  scale: number;             // SW×H/FL (without px) useful as ground coverage of full sensor in m
} {
  if (sensorWidth <= 0 || flyingHeight <= 0 || focalLength <= 0) {
    return { gsd: null, coverageW: null, coverageH: null, coverageArea: null, scale: 0 };
  }
  const scale = (sensorWidth * flyingHeight) / focalLength; // m of ground per sensor width

  if (!imageWidth || imageWidth <= 0) {
    return { gsd: null, coverageW: scale, coverageH: null, coverageArea: null, scale };
  }

  const gsd = (sensorWidth * flyingHeight * 100) / (focalLength * imageWidth); // cm/px
  const coverageW = (gsd / 100) * imageWidth; // m

  let coverageH: number | null = null;
  let coverageArea: number | null = null;
  if (imageHeight && imageHeight > 0) {
    coverageH = (gsd / 100) * imageHeight;
    coverageArea = coverageW * coverageH;
  }

  return { gsd, coverageW, coverageH, coverageArea, scale };
}

export default function GsdCalculatorGroundSampleDistance(_props: { locale: Locale }) {
  const t = useTranslations("tool.gsd-calculator-ground-sample-distance");

  const [sensorWidth, setSensorWidth] = React.useState("");
  const [flyingHeight, setFlyingHeight] = React.useState("");
  const [focalLength, setFocalLength] = React.useState("");
  const [imageWidth, setImageWidth] = React.useState("");
  const [imageHeight, setImageHeight] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const sw = parseFloat(sensorWidth);
  const fh = parseFloat(flyingHeight);
  const fl = parseFloat(focalLength);
  const iw = imageWidth !== "" ? parseFloat(imageWidth) : null;
  const ih = imageHeight !== "" ? parseFloat(imageHeight) : null;

  const swValid = sensorWidth !== "" && Number.isFinite(sw) && sw > 0;
  const fhValid = flyingHeight !== "" && Number.isFinite(fh) && fh > 0;
  const flValid = focalLength !== "" && Number.isFinite(fl) && fl > 0;
  const hasRequired = swValid && fhValid && flValid;

  const result = React.useMemo(() => {
    if (!hasRequired) return null;
    const iwVal = iw !== null && Number.isFinite(iw) && iw > 0 ? iw : null;
    const ihVal = ih !== null && Number.isFinite(ih) && ih > 0 ? ih : null;
    return calcGSD(sw, fh, fl, iwVal, ihVal);
  }, [hasRequired, sw, fh, fl, iw, ih]);

  function reset() {
    setSensorWidth("");
    setFlyingHeight("");
    setFocalLength("");
    setImageWidth("");
    setImageHeight("");
    setTouched(false);
  }

  function handleChange(setter: React.Dispatch<React.SetStateAction<string>>) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setTouched(true);
    };
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as { q: string; a: string }[];
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
              <Label htmlFor="gsd-sw">{t("field.sensorWidth")}</Label>
              <Input
                id="gsd-sw"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.1"
                placeholder="23.5"
                value={sensorWidth}
                onChange={handleChange(setSensorWidth)}
              />
              <p className="text-xs text-zinc-500">{t("field.sensorWidthHint")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gsd-fh">{t("field.flyingHeight")}</Label>
              <Input
                id="gsd-fh"
                type="number"
                inputMode="decimal"
                min="0"
                step="1"
                placeholder="100"
                value={flyingHeight}
                onChange={handleChange(setFlyingHeight)}
              />
              <p className="text-xs text-zinc-500">{t("field.flyingHeightHint")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gsd-fl">{t("field.focalLength")}</Label>
              <Input
                id="gsd-fl"
                type="number"
                inputMode="decimal"
                min="0"
                step="1"
                placeholder="35"
                value={focalLength}
                onChange={handleChange(setFocalLength)}
              />
              <p className="text-xs text-zinc-500">{t("field.focalLengthHint")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gsd-iw">{t("field.imageWidth")}</Label>
              <Input
                id="gsd-iw"
                type="number"
                inputMode="numeric"
                min="0"
                step="1"
                placeholder="6000"
                value={imageWidth}
                onChange={handleChange(setImageWidth)}
              />
              <p className="text-xs text-zinc-500">{t("field.imageWidthHint")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gsd-ih">{t("field.imageHeight")}</Label>
              <Input
                id="gsd-ih"
                type="number"
                inputMode="numeric"
                min="0"
                step="1"
                placeholder="4000"
                value={imageHeight}
                onChange={handleChange(setImageHeight)}
              />
              <p className="text-xs text-zinc-500">{t("field.imageHeightHint")}</p>
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

          {touched && !hasRequired && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {touched && hasRequired && result && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              {result.gsd !== null ? (
                <>
                  <div>
                    <span className="text-2xl font-bold text-zinc-900">
                      {result.gsd.toFixed(2)}
                    </span>
                    <span className="ml-2 text-zinc-600 text-sm">{t("result.unitGsd")}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-zinc-600 max-w-sm">
                    {result.coverageW !== null && (
                      <>
                        <span>{t("result.coverageW")}:</span>
                        <span className="font-medium">{result.coverageW.toFixed(1)} m</span>
                      </>
                    )}
                    {result.coverageH !== null && (
                      <>
                        <span>{t("result.coverageH")}:</span>
                        <span className="font-medium">{result.coverageH.toFixed(1)} m</span>
                      </>
                    )}
                    {result.coverageArea !== null && (
                      <>
                        <span>{t("result.coverageArea")}:</span>
                        <span className="font-medium">
                          {result.coverageArea >= 10000
                            ? `${(result.coverageArea / 10000).toFixed(4)} ha`
                            : `${result.coverageArea.toFixed(1)} m²`}
                        </span>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm text-zinc-600">{t("result.noImageWidth")}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-zinc-900">
                      {result.scale.toFixed(2)} m
                    </span>
                    <span className="text-sm text-zinc-500">{t("result.groundCoverageWidth")}</span>
                  </div>
                </div>
              )}
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
