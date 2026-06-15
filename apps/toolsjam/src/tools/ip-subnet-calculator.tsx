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

interface SubnetInfo {
  networkAddress: string;
  broadcastAddress: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
  usableHosts: number;
  subnetMask: string;
  wildcardMask: string;
  cidr: number;
  binaryMask: string;
  ipClassKey: string;
}

function ipToNum(ip: string): number | null {
  const parts = ip.trim().split(".");
  if (parts.length !== 4) return null;
  let num = 0;
  for (const part of parts) {
    if (!/^\d+$/.test(part)) return null;
    const n = parseInt(part, 10);
    if (isNaN(n) || n < 0 || n > 255) return null;
    num = (num << 8) | n;
  }
  return num >>> 0;
}

function numToIp(num: number): string {
  return [
    (num >>> 24) & 0xff,
    (num >>> 16) & 0xff,
    (num >>> 8) & 0xff,
    num & 0xff,
  ].join(".");
}

function maskFromCidr(cidr: number): number {
  if (cidr === 0) return 0;
  return (0xffffffff << (32 - cidr)) >>> 0;
}

function isValidMask(mask: number): boolean {
  // A valid subnet mask has all 1-bits before all 0-bits
  const inverted = (~mask) >>> 0;
  return (inverted & (inverted + 1)) === 0;
}

function getIpClassKey(firstOctet: number): string {
  if (firstOctet < 128) return "classA";
  if (firstOctet < 192) return "classB";
  if (firstOctet < 224) return "classC";
  if (firstOctet < 240) return "classD";
  return "classE";
}

function toBinaryMask(mask: number): string {
  return [
    ((mask >>> 24) & 0xff).toString(2).padStart(8, "0"),
    ((mask >>> 16) & 0xff).toString(2).padStart(8, "0"),
    ((mask >>> 8) & 0xff).toString(2).padStart(8, "0"),
    (mask & 0xff).toString(2).padStart(8, "0"),
  ].join(".");
}

function cidrFromMask(mask: number): number {
  let count = 0;
  let m = mask >>> 0;
  while (m & 0x80000000) {
    count++;
    m = (m << 1) >>> 0;
  }
  return count;
}

function calcSubnet(ip: string, maskOrCidr: string, cidrStr: string): SubnetInfo | null {
  const ipNum = ipToNum(ip);
  if (ipNum === null) return null;

  let maskNum: number | null = null;

  // If CIDR provided, use it
  if (cidrStr.trim() !== "") {
    const cidr = parseInt(cidrStr, 10);
    if (isNaN(cidr) || cidr < 0 || cidr > 32) return null;
    maskNum = maskFromCidr(cidr);
  } else if (maskOrCidr.trim() !== "") {
    // Try as dotted decimal mask
    const m = ipToNum(maskOrCidr);
    if (m !== null && isValidMask(m)) {
      maskNum = m;
    } else {
      // Try as plain CIDR number
      const cidr = parseInt(maskOrCidr, 10);
      if (!isNaN(cidr) && cidr >= 0 && cidr <= 32) {
        maskNum = maskFromCidr(cidr);
      }
    }
  }

  if (maskNum === null) return null;

  const cidr = cidrFromMask(maskNum);
  const wildcard = (~maskNum) >>> 0;
  const networkNum = (ipNum & maskNum) >>> 0;
  const broadcastNum = (networkNum | wildcard) >>> 0;
  const firstHostNum = cidr < 31 ? networkNum + 1 : networkNum;
  const lastHostNum = cidr < 31 ? broadcastNum - 1 : broadcastNum;
  const totalHosts = Math.pow(2, 32 - cidr);
  const usableHosts = cidr <= 30 ? totalHosts - 2 : cidr === 31 ? 2 : 1;

  return {
    networkAddress: numToIp(networkNum),
    broadcastAddress: numToIp(broadcastNum),
    firstHost: numToIp(firstHostNum),
    lastHost: numToIp(lastHostNum),
    totalHosts,
    usableHosts,
    subnetMask: numToIp(maskNum),
    wildcardMask: numToIp(wildcard),
    cidr,
    binaryMask: toBinaryMask(maskNum),
    ipClassKey: getIpClassKey((ipNum >>> 24) & 0xff),
  };
}

export default function IpSubnetCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.ip-subnet-calculator");
  const [ipAddress, setIpAddress] = React.useState<string>("");
  const [subnetMask, setSubnetMask] = React.useState<string>("");
  const [cidrPrefix, setCidrPrefix] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<SubnetInfo | null>(() => {
    if (!touched) return null;
    if (ipAddress.trim() === "") return null;
    if (subnetMask.trim() === "" && cidrPrefix.trim() === "") return null;
    return calcSubnet(ipAddress, subnetMask, cidrPrefix);
  }, [touched, ipAddress, subnetMask, cidrPrefix]);

  const hasInput = ipAddress.trim() !== "" && (subnetMask.trim() !== "" || cidrPrefix.trim() !== "");
  const showError = touched && hasInput && result === null;

  function reset() {
    setIpAddress("");
    setSubnetMask("");
    setCidrPrefix("");
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
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="isc-ip">{t("field.ipAddress")}</Label>
              <Input
                id="isc-ip"
                type="text"
                inputMode="decimal"
                value={ipAddress}
                placeholder={t("placeholder.ipAddress")}
                onChange={(e) => {
                  setIpAddress(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="isc-mask">{t("field.subnetMask")}</Label>
              <Input
                id="isc-mask"
                type="text"
                inputMode="decimal"
                value={subnetMask}
                placeholder={t("placeholder.subnetMask")}
                onChange={(e) => {
                  setSubnetMask(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="isc-cidr">{t("field.cidrPrefix")}</Label>
              <Input
                id="isc-cidr"
                type="number"
                inputMode="numeric"
                min={0}
                max={32}
                value={cidrPrefix}
                placeholder={t("placeholder.cidrPrefix")}
                onChange={(e) => {
                  setCidrPrefix(e.target.value);
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
            <p className="text-sm text-red-600">{t("error.bothRequired")}</p>
          )}

          {result !== null && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-2 sm:grid-cols-2 text-sm">
                <ResultRow label={t("result.networkAddress")} value={result.networkAddress} />
                <ResultRow label={t("result.subnetMask")} value={result.subnetMask} />
                <ResultRow label={t("result.cidr")} value={`/${result.cidr}`} />
                <ResultRow label={t("result.wildcardMask")} value={result.wildcardMask} />
                <ResultRow label={t("result.broadcastAddress")} value={result.broadcastAddress} />
                <ResultRow label={t("result.ipClass")} value={t(`result.${result.ipClassKey}` as never)} />
                <ResultRow label={t("result.firstHost")} value={result.firstHost} />
                <ResultRow label={t("result.lastHost")} value={result.lastHost} />
                <ResultRow label={t("result.totalHosts")} value={result.totalHosts.toLocaleString()} />
                <ResultRow
                  label={t("result.usableHosts")}
                  value={result.usableHosts <= 0 ? t("result.noUsableHosts") : result.usableHosts.toLocaleString()}
                />
                <div className="sm:col-span-2">
                  <span className="text-zinc-500 font-medium">{t("result.binaryMask")}: </span>
                  <span className="font-mono text-zinc-900">{result.binaryMask}</span>
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

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-zinc-500">{label}</span>
      <span className="font-mono font-semibold text-zinc-900">{value}</span>
    </div>
  );
}
