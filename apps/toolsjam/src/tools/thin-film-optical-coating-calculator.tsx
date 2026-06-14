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

interface ThinFilmResult {
  Rs: number;
  Rp: number;
  Ts: number;
  Tp: number;
  Ravg: number;
  Tavg: number;
  delta: number;
}

function calcThinFilm(
  n0: number,
  n1: number,
  n2: number,
  lambda: number,
  d: number,
  thetaDeg: number
): ThinFilmResult | null {
  if (lambda <= 0 || d < 0 || n0 <= 0 || n1 <= 0 || n2 <= 0) return null;
  const theta0 = (thetaDeg * Math.PI) / 180;
  const sinT1 = (n0 / n1) * Math.sin(theta0);
  const sinT2 = (n0 / n2) * Math.sin(theta0);
  if (Math.abs(sinT1) > 1 || Math.abs(sinT2) > 1) return null;
  const cosT0 = Math.cos(theta0);
  const cosT1 = Math.sqrt(1 - sinT1 * sinT1);
  const cosT2 = Math.sqrt(1 - sinT2 * sinT2);

  // Phase thickness
  const delta = ((2 * Math.PI) / lambda) * n1 * d * cosT1;
  const cos2d = Math.cos(2 * delta);

  // s-polarization Fresnel coefficients
  const r01s = (n0 * cosT0 - n1 * cosT1) / (n0 * cosT0 + n1 * cosT1);
  const r12s = (n1 * cosT1 - n2 * cosT2) / (n1 * cosT1 + n2 * cosT2);
  const Rs =
    (r01s * r01s + r12s * r12s + 2 * r01s * r12s * cos2d) /
    (1 + r01s * r01s * r12s * r12s + 2 * r01s * r12s * cos2d);

  // p-polarization Fresnel coefficients
  const r01p = (n1 * cosT0 - n0 * cosT1) / (n1 * cosT0 + n0 * cosT1);
  const r12p = (n2 * cosT1 - n1 * cosT2) / (n2 * cosT1 + n1 * cosT2);
  const Rp =
    (r01p * r01p + r12p * r12p + 2 * r01p * r12p * cos2d) /
    (1 + r01p * r01p * r12p * r12p + 2 * r01p * r12p * cos2d);

  return {
    Rs: Math.max(0, Math.min(1, Rs)),
    Rp: Math.max(0, Math.min(1, Rp)),
    Ts: Math.max(0, 1 - Math.max(0, Math.min(1, Rs))),
    Tp: Math.max(0, 1 - Math.max(0, Math.min(1, Rp))),
    Ravg: (Math.max(0, Math.min(1, Rs)) + Math.max(0, Math.min(1, Rp))) / 2,
    Tavg:
      1 -
      (Math.max(0, Math.min(1, Rs)) + Math.max(0, Math.min(1, Rp))) / 2,
    delta,
  };
}

function pct(v: number): string {
  return (v * 100).toFixed(4) + "%";
}

export default function ThinFilmOpticalCoatingCalculator(
  _props: { locale: Locale }
) {
  const t = useTranslations("tool.thin-film-optical-coating-calculator");

  const [nIncident, setNIncident] = React.useState("1.0");
  const [nFilm, setNFilm] = React.useState("1.38");
  const [nSubstrate, setNSubstrate] = React.useState("1.52");
  const [wavelength, setWavelength] = React.useState("550");
  const [thickness, setThickness] = React.useState("100");
  const [angle, setAngle] = React.useState("0");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<ThinFilmResult | null>(() => {
    if (!touched) return null;
    const n0 = parseFloat(nIncident);
    const n1 = parseFloat(nFilm);
    const n2 = parseFloat(nSubstrate);
    const lam = parseFloat(wavelength);
    const d = parseFloat(thickness);
    const ang = parseFloat(angle);
    if (
      !Number.isFinite(n0) ||
      !Number.isFinite(n1) ||
      !Number.isFinite(n2) ||
      !Number.isFinite(lam) ||
      !Number.isFinite(d) ||
      !Number.isFinite(ang)
    )
      return null;
    return calcThinFilm(n0, n1, n2, lam, d, ang);
  }, [touched, nIncident, nFilm, nSubstrate, wavelength, thickness, angle]);

  function loadExample(
    n0: string,
    n1: string,
    n2: string,
    lam: string,
    d: string,
    ang: string
  ) {
    setNIncident(n0);
    setNFilm(n1);
    setNSubstrate(n2);
    setWavelength(lam);
    setThickness(d);
    setAngle(ang);
    setTouched(true);
  }

  function reset() {
    setNIncident("1.0");
    setNFilm("1.38");
    setNSubstrate("1.52");
    setWavelength("550");
    setThickness("100");
    setAngle("0");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as
      | { input: string; output: string; note?: string }[]
      | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const raw = t.raw("faq.items") as
      | { q: string; a: string }[]
      | undefined;
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="tf-n0">{t("field.nIncident")}</Label>
              <Input
                id="tf-n0"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                  placeholder={t("field.placeholder.nIncident")}
                value={nIncident}
                onChange={(e) => { setNIncident(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tf-n1">{t("field.nFilm")}</Label>
              <Input
                id="tf-n1"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                  placeholder={t("field.placeholder.nFilm")}
                value={nFilm}
                onChange={(e) => { setNFilm(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tf-n2">{t("field.nSubstrate")}</Label>
              <Input
                id="tf-n2"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                  placeholder={t("field.placeholder.nSubstrate")}
                value={nSubstrate}
                onChange={(e) => { setNSubstrate(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tf-wl">{t("field.wavelength")}</Label>
              <Input
                id="tf-wl"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                  placeholder={t("field.placeholder.wavelength")}
                value={wavelength}
                onChange={(e) => { setWavelength(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tf-d">{t("field.thickness")}</Label>
              <Input
                id="tf-d"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                  placeholder={t("field.placeholder.thickness")}
                value={thickness}
                onChange={(e) => { setThickness(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tf-ang">{t("field.angle")}</Label>
              <Input
                id="tf-ang"
                type="number"
                inputMode="decimal"
                min={0}
                max={89}
                step="any"
                  placeholder={t("field.placeholder.angle")}
                value={angle}
                onChange={(e) => { setAngle(e.target.value); setTouched(true); }}
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

          {touched && result === null && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-zinc-700">
                    {t("result.sPol")}
                  </p>
                  <p className="text-zinc-800">
                    {t("result.reflectance")}: <span className="font-mono font-semibold">{pct(result.Rs)}</span>
                  </p>
                  <p className="text-zinc-800">
                    {t("result.transmittance")}: <span className="font-mono font-semibold">{pct(result.Ts)}</span>
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-zinc-700">
                    {t("result.pPol")}
                  </p>
                  <p className="text-zinc-800">
                    {t("result.reflectance")}: <span className="font-mono font-semibold">{pct(result.Rp)}</span>
                  </p>
                  <p className="text-zinc-800">
                    {t("result.transmittance")}: <span className="font-mono font-semibold">{pct(result.Tp)}</span>
                  </p>
                </div>
              </div>
              <div className="border-t border-zinc-200 pt-2">
                <p className="text-zinc-800">
                  {t("result.avgReflectance")}: <span className="font-mono font-semibold text-lg">{pct(result.Ravg)}</span>
                </p>
                <p className="text-zinc-800">
                  {t("result.avgTransmittance")}: <span className="font-mono font-semibold text-lg">{pct(result.Tavg)}</span>
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("1.0", "1.38", "1.52", "550", "99.64", "0")}
            >
              {t("examples.loadAR")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("1.0", "2.35", "1.52", "633", "67.34", "0")}
            >
              {t("examples.loadHR")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadExample("1.0", "1.33", "1.0", "600", "300", "20")}
            >
              {t("examples.loadSoap")}
            </Button>
          </div>
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
