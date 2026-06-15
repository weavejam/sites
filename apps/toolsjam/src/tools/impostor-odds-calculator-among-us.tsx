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

// Combinatorial: C(n, k)
function comb(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  const kk = Math.min(k, n - k);
  for (let i = 0; i < kk; i++) {
    result = (result * (n - i)) / (i + 1);
  }
  return result;
}

// P(at least 1 impostor in suspicious group) using hypergeometric distribution
function probAtLeastOneImpostor(
  population: number,
  impostors: number,
  suspiciousCount: number
): number {
  if (suspiciousCount <= 0 || impostors <= 0) return 0;
  const crewmates = population - impostors;
  // P(0 impostors) = C(crewmates, suspicious) / C(population, suspicious)
  const pZero = comb(crewmates, suspiciousCount) / comb(population, suspiciousCount);
  return 1 - pZero;
}

export default function ImpostorOddsCalculatorAmongUs(_props: { locale: Locale }) {
  const t = useTranslations("tool.impostor-odds-calculator-among-us");
  const [totalPlayers, setTotalPlayers] = React.useState<string>("");
  const [numImpostors, setNumImpostors] = React.useState<string>("");
  const [alivePlayers, setAlivePlayers] = React.useState<string>("");
  const [suspiciousPlayers, setSuspiciousPlayers] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const total = parseInt(totalPlayers, 10);
  const impostors = parseInt(numImpostors, 10);
  const alive = parseInt(alivePlayers, 10);
  const suspicious = parseInt(suspiciousPlayers, 10);

  const isValidTotal =
    totalPlayers !== "" && Number.isInteger(total) && total >= 2;
  const isValidImpostors =
    numImpostors !== "" &&
    Number.isInteger(impostors) &&
    impostors >= 1 &&
    impostors < total;
  const isValidAlive =
    alivePlayers !== "" &&
    Number.isInteger(alive) &&
    alive >= 1 &&
    alive <= total;
  const isValidSuspicious =
    suspiciousPlayers !== "" &&
    Number.isInteger(suspicious) &&
    suspicious >= 0 &&
    suspicious <= alive;
  const impostorsNotExceedAlive =
    isValidImpostors && isValidAlive && impostors <= alive;

  const isValid =
    isValidTotal &&
    isValidImpostors &&
    isValidAlive &&
    isValidSuspicious &&
    impostorsNotExceedAlive;

  const aliveImpostors = React.useMemo(() => {
    if (!isValid) return 0;
    return impostors;
  }, [isValid, impostors]);

  const baseOddsPct = isValid ? (aliveImpostors / alive) * 100 : null;
  const crewOddsPct = isValid ? ((alive - aliveImpostors) / alive) * 100 : null;
  const suspOddsPct =
    isValid && suspicious > 0
      ? probAtLeastOneImpostor(alive, aliveImpostors, suspicious) * 100
      : null;

  function getStatusLabel(): string {
    if (!isValid || baseOddsPct === null) return "";
    if (aliveImpostors >= alive - aliveImpostors) return t("result.endGame");
    if (suspOddsPct !== null && suspOddsPct >= 50) return t("result.safeToVote");
    return t("result.cautious");
  }

  function reset() {
    setTotalPlayers("");
    setNumImpostors("");
    setAlivePlayers("");
    setSuspiciousPlayers("");
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

  const showError = touched && !isValid;

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
              <Label htmlFor="ioa-total">{t("field.totalPlayers")}</Label>
              <Input
                id="ioa-total"
                type="number"
                inputMode="numeric"
                value={totalPlayers}
                placeholder={t("placeholder.totalPlayers")}
                onChange={(e) => {
                  setTotalPlayers(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ioa-impostors">{t("field.numImpostors")}</Label>
              <Input
                id="ioa-impostors"
                type="number"
                inputMode="numeric"
                value={numImpostors}
                placeholder={t("placeholder.numImpostors")}
                onChange={(e) => {
                  setNumImpostors(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ioa-alive">{t("field.alivePlayers")}</Label>
              <Input
                id="ioa-alive"
                type="number"
                inputMode="numeric"
                value={alivePlayers}
                placeholder={t("placeholder.alivePlayers")}
                onChange={(e) => {
                  setAlivePlayers(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ioa-suspicious">{t("field.suspiciousPlayers")}</Label>
              <Input
                id="ioa-suspicious"
                type="number"
                inputMode="numeric"
                value={suspiciousPlayers}
                placeholder={t("placeholder.suspiciousPlayers")}
                onChange={(e) => {
                  setSuspiciousPlayers(e.target.value);
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

          {showError && (
            <p className="text-sm text-red-600">{t("error.invalid")}</p>
          )}

          {baseOddsPct !== null && !showError && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">{t("result.baseOdds")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {baseOddsPct.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{t("result.crewOdds")}</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {crewOddsPct?.toFixed(1)}%
                  </div>
                </div>
                {suspOddsPct !== null && (
                  <div className="sm:col-span-2">
                    <div className="text-xs text-zinc-500">
                      {t("result.suspiciousOdds")}
                    </div>
                    <div className="text-2xl font-bold text-zinc-900">
                      {suspOddsPct.toFixed(1)}%
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-xs text-zinc-500">{t("result.impostorRatio")}</div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {aliveImpostors}/{alive}
                  </div>
                </div>
              </div>
              <div className="text-sm text-zinc-600">{getStatusLabel()}</div>
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
