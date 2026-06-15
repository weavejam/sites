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

type RaidLevel = "RAID 0" | "RAID 1" | "RAID 5" | "RAID 6" | "RAID 10";

const RAID_LEVELS: RaidLevel[] = ["RAID 0", "RAID 1", "RAID 5", "RAID 6", "RAID 10"];

interface RaidResult {
  usableGB: number;
  rawGB: number;
  efficiency: number;
  faultTolerance: number;
  readMBs: number;
  writeMBs: number;
}

function getDiskThroughputMBs(rpm: number): number {
  if (rpm >= 15000) return 150;
  if (rpm >= 10000) return 120;
  if (rpm >= 7200) return 80;
  return 60;
}

function calcRaid(
  level: RaidLevel,
  n: number,
  diskGB: number,
  rpm: number,
  interfaceGbps: number
): { result: RaidResult | null; error: string | null } {
  if (n < 1 || diskGB <= 0 || rpm <= 0 || interfaceGbps <= 0) {
    return { result: null, error: "invalid" };
  }

  const interfaceMBs = (interfaceGbps * 1000) / 8;
  const diskMBs = Math.min(getDiskThroughputMBs(rpm), interfaceMBs);
  const rawGB = n * diskGB;

  let usableGB: number;
  let faultTolerance: number;
  let readMBs: number;
  let writeMBs: number;

  switch (level) {
    case "RAID 0":
      if (n < 2) return { result: null, error: "minDisks" };
      usableGB = rawGB;
      faultTolerance = 0;
      readMBs = Math.min(n * diskMBs, interfaceMBs);
      writeMBs = Math.min(n * diskMBs, interfaceMBs);
      break;
    case "RAID 1":
      if (n < 2) return { result: null, error: "minDisksRAID1" };
      usableGB = diskGB;
      faultTolerance = n - 1;
      readMBs = Math.min(n * diskMBs, interfaceMBs);
      writeMBs = Math.min(diskMBs, interfaceMBs);
      break;
    case "RAID 5":
      if (n < 3) return { result: null, error: "minDisksRAID5" };
      usableGB = (n - 1) * diskGB;
      faultTolerance = 1;
      readMBs = Math.min((n - 1) * diskMBs, interfaceMBs);
      writeMBs = Math.min(((n - 1) / 4) * diskMBs, interfaceMBs);
      break;
    case "RAID 6":
      if (n < 4) return { result: null, error: "minDisksRAID6" };
      usableGB = (n - 2) * diskGB;
      faultTolerance = 2;
      readMBs = Math.min((n - 2) * diskMBs, interfaceMBs);
      writeMBs = Math.min(((n - 2) / 6) * diskMBs, interfaceMBs);
      break;
    case "RAID 10":
      if (n < 4) return { result: null, error: "minDisksRAID10" };
      if (n % 2 !== 0) return { result: null, error: "oddRAID10" };
      usableGB = (n / 2) * diskGB;
      faultTolerance = 1;
      readMBs = Math.min(n * diskMBs, interfaceMBs);
      writeMBs = Math.min((n / 2) * diskMBs, interfaceMBs);
      break;
  }

  const efficiency = (usableGB / rawGB) * 100;

  return {
    result: {
      usableGB,
      rawGB,
      efficiency,
      faultTolerance,
      readMBs,
      writeMBs,
    },
    error: null,
  };
}

function fmtCapacity(gb: number): string {
  if (gb >= 1000) return (gb / 1000).toFixed(2) + " TB";
  return gb.toFixed(0) + " GB";
}

export default function RaidCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.raid-calculator");

  const [raidLevel, setRaidLevel] = React.useState<RaidLevel>("RAID 5");
  const [numDisks, setNumDisks] = React.useState("4");
  const [diskSize, setDiskSize] = React.useState("2000");
  const [diskSpeed, setDiskSpeed] = React.useState("7200");
  const [interfaceSpeed, setInterfaceSpeed] = React.useState("6");
  const [touched, setTouched] = React.useState(false);

  const n = parseInt(numDisks, 10);
  const diskGB = parseFloat(diskSize);
  const rpm = parseFloat(diskSpeed);
  const ifGbps = parseFloat(interfaceSpeed);

  const { result, error } = React.useMemo(() => {
    if (!touched) return { result: null, error: null };
    return calcRaid(raidLevel, n, diskGB, rpm, ifGbps);
  }, [raidLevel, n, diskGB, rpm, ifGbps, touched]);

  function reset() {
    setNumDisks("4");
    setDiskSize("2000");
    setDiskSpeed("7200");
    setInterfaceSpeed("6");
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
            <Label>{t("field.raidLevel")}</Label>
            <div className="flex flex-wrap gap-2">
              {RAID_LEVELS.map((level) => (
                <Button
                  key={level}
                  type="button"
                  variant={raidLevel === level ? "default" : "outline"}
                  onClick={() => {
                    setRaidLevel(level);
                    setTouched(false);
                  }}
                >
                  {t(`raidLevel.${level}` as never)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="raid-disks">{t("field.numDisks")}</Label>
              <Input
                id="raid-disks"
                type="number"
                inputMode="numeric"
                min={2}
                value={numDisks}
                onChange={(e) => {
                  setNumDisks(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="raid-size">{t("field.diskSize")}</Label>
              <Input
                id="raid-size"
                type="number"
                inputMode="decimal"
                value={diskSize}
                onChange={(e) => {
                  setDiskSize(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="raid-rpm">{t("field.diskSpeed")}</Label>
              <Input
                id="raid-rpm"
                type="number"
                inputMode="numeric"
                value={diskSpeed}
                onChange={(e) => {
                  setDiskSpeed(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="raid-interface">{t("field.interfaceSpeed")}</Label>
              <Input
                id="raid-interface"
                type="number"
                inputMode="decimal"
                value={interfaceSpeed}
                onChange={(e) => {
                  setInterfaceSpeed(e.target.value);
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

          {touched && error && (
            <p className="text-sm text-red-600">
              {t(`error.${error}` as never)}
            </p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="font-semibold text-zinc-700">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.usableCapacity")}
                  </div>
                  <div className="text-3xl font-bold text-zinc-900">
                    {fmtCapacity(result.usableGB)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.rawCapacity")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-800">
                    {fmtCapacity(result.rawGB)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.efficiency")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.efficiency.toFixed(1)} %
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.faultTolerance")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {result.faultTolerance} {t("result.drives")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.readSpeed")}
                  </div>
                  <div className="text-lg font-medium text-zinc-800">
                    {result.readMBs.toFixed(0)} {t("result.mbs")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.writeSpeed")}
                  </div>
                  <div className="text-lg font-medium text-zinc-800">
                    {result.writeMBs.toFixed(0)} {t("result.mbs")}
                  </div>
                </div>
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
