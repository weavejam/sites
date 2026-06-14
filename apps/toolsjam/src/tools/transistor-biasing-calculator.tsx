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

function formatNum(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(digits)).toString();
}

export default function TransistorBiasingCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.transistor-biasing-calculator");

  const [vcc, setVcc] = React.useState("");
  const [r1, setR1] = React.useState("");
  const [r2, setR2] = React.useState("");
  const [rc, setRc] = React.useState("");
  const [re, setRe] = React.useState("");
  const [rl, setRl] = React.useState("");
  const [beta, setBeta] = React.useState("");
  const [vbe, setVbe] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const Vcc = parseFloat(vcc);
  const R1 = parseFloat(r1);
  const R2 = parseFloat(r2);
  const Rc = parseFloat(rc);
  const Re = parseFloat(re);
  const Rl = parseFloat(rl);
  const Beta = parseFloat(beta);
  const Vbe = parseFloat(vbe);

  const valid =
    vcc !== "" && r1 !== "" && r2 !== "" && rc !== "" && re !== "" &&
    rl !== "" && beta !== "" && vbe !== "" &&
    Number.isFinite(Vcc) && Number.isFinite(R1) && Number.isFinite(R2) &&
    Number.isFinite(Rc) && Number.isFinite(Re) && Number.isFinite(Rl) &&
    Number.isFinite(Beta) && Number.isFinite(Vbe) &&
    Vcc > 0 && R1 > 0 && R2 > 0 && Rc > 0 && Re > 0 && Rl > 0 &&
    Beta > 0 && Vbe > 0;

  const result = React.useMemo<{
    vb: number;
    ve: number;
    vc: number;
    ic: number;
    ib: number;
    vce: number;
    voltageGain: number;
    stabilityFactor: number;
  } | null>(() => {
    if (!valid) return null;
    // Voltage divider bias: Thevenin equivalent
    const Vth = Vcc * R2 / (R1 + R2);
    const Rth = (R1 * R2) / (R1 + R2);
    // Base current from Thevenin circuit
    const Ib = (Vth - Vbe) / (Rth + (Beta + 1) * Re);
    if (Ib <= 0) return null;
    const Ic = Beta * Ib;
    const Ie = (Beta + 1) * Ib;
    const Vb = Vth - Ib * Rth;
    const Ve = Ie * Re;
    const Vc = Vcc - Ic * Rc;
    const Vce = Vc - Ve;
    // AC load: Rc parallel RL
    const RcAc = (Rc * Rl) / (Rc + Rl);
    // Intrinsic emitter resistance re = VT/Ic where VT ≈ 26mV at room temp
    const re_ohm = 0.026 / Ic;
    // Voltage gain (magnitude, common-emitter without bypass capacitor)
    const voltageGain = RcAc / (Re + re_ohm);
    // Stability factor S = (1 + Rth/Re) — lower is better
    const stabilityFactor = (1 + Beta) / (1 + Beta * Re / (Rth + Re));
    return { vb: Vb, ve: Ve, vc: Vc, ic: Ic, ib: Ib, vce: Vce, voltageGain, stabilityFactor };
  }, [valid, Vcc, R1, R2, Rc, Re, Rl, Beta, Vbe]);

  function loadExample(
    vcc_: string, r1_: string, r2_: string, rc_: string,
    re_: string, rl_: string, beta_: string, vbe_: string
  ) {
    setVcc(vcc_); setR1(r1_); setR2(r2_); setRc(rc_);
    setRe(re_); setRl(rl_); setBeta(beta_); setVbe(vbe_);
    setTouched(true);
  }

  function reset() {
    setVcc(""); setR1(""); setR2(""); setRc("");
    setRe(""); setRl(""); setBeta(""); setVbe(""); setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo(() => {
    const raw = t.raw("howto.steps") as string[];
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo(() => {
    const arr: { q: string; a: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      try {
        const q = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q && a && !q.startsWith("tool.")) arr.push({ q, a });
      } catch { break; }
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

  const showError = touched && !valid;

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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="tb-vcc">{t("field.vcc")}</Label>
              <Input
                id="tb-vcc"
                type="number"
                inputMode="decimal"
                value={vcc}
                placeholder={t("placeholder.vcc")}
                onChange={(e) => { setVcc(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tb-r1">{t("field.r1")}</Label>
              <Input
                id="tb-r1"
                type="number"
                inputMode="decimal"
                value={r1}
                placeholder={t("placeholder.r1")}
                onChange={(e) => { setR1(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tb-r2">{t("field.r2")}</Label>
              <Input
                id="tb-r2"
                type="number"
                inputMode="decimal"
                value={r2}
                placeholder={t("placeholder.r2")}
                onChange={(e) => { setR2(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tb-rc">{t("field.rc")}</Label>
              <Input
                id="tb-rc"
                type="number"
                inputMode="decimal"
                value={rc}
                placeholder={t("placeholder.rc")}
                onChange={(e) => { setRc(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tb-re">{t("field.re")}</Label>
              <Input
                id="tb-re"
                type="number"
                inputMode="decimal"
                value={re}
                placeholder={t("placeholder.re")}
                onChange={(e) => { setRe(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tb-rl">{t("field.rl")}</Label>
              <Input
                id="tb-rl"
                type="number"
                inputMode="decimal"
                value={rl}
                placeholder={t("placeholder.rl")}
                onChange={(e) => { setRl(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tb-beta">{t("field.beta")}</Label>
              <Input
                id="tb-beta"
                type="number"
                inputMode="decimal"
                value={beta}
                placeholder={t("placeholder.beta")}
                onChange={(e) => { setBeta(e.target.value); setTouched(true); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tb-vbe">{t("field.vbe")}</Label>
              <Input
                id="tb-vbe"
                type="number"
                inputMode="decimal"
                value={vbe}
                placeholder={t("placeholder.vbe")}
                onChange={(e) => { setVbe(e.target.value); setTouched(true); }}
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

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2">
              <div className="text-sm font-medium text-zinc-500">{t("result.heading")}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="text-sm text-zinc-600">{t("result.vb", { value: formatNum(result.vb, 3) })}</div>
                <div className="text-sm text-zinc-600">{t("result.ve", { value: formatNum(result.ve, 3) })}</div>
                <div className="text-sm text-zinc-600">{t("result.vc", { value: formatNum(result.vc, 3) })}</div>
                <div className="text-sm text-zinc-600">{t("result.vce", { value: formatNum(result.vce, 3) })}</div>
                <div className="text-sm text-zinc-600">{t("result.ic", { value: (result.ic * 1000).toFixed(3) })}</div>
                <div className="text-sm text-zinc-600">{t("result.ib", { value: (result.ib * 1e6).toFixed(2) })}</div>
                <div className="text-2xl font-semibold text-zinc-900 sm:col-span-2">
                  {t("result.voltageGain", { value: formatNum(result.voltageGain, 2) })}
                </div>
                <div className="text-sm text-zinc-600">{t("result.stabilityFactor", { value: formatNum(result.stabilityFactor, 2) })}</div>
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
                  <td className="px-3 py-2 text-zinc-600">{ex.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => loadExample("12", "22000", "4700", "2200", "1000", "10000", "100", "0.7")}
          >
            {t("examples.loadStandard")}
          </Button>
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => loadExample("15", "15000", "3000", "3300", "500", "15000", "150", "0.7")}
          >
            {t("examples.loadHighGain")}
          </Button>
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => loadExample("18", "18000", "3900", "1800", "820", "8200", "120", "0.7")}
          >
            {t("examples.loadAudio")}
          </Button>
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
