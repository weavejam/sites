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

// RSA helpers using BigInt for correctness with small primes
function gcd(a: bigint, b: bigint): bigint {
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a;
}

function modpow(base: bigint, exp: bigint, mod: bigint): bigint {
  let result = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) result = (result * base) % mod;
    exp = exp / 2n;
    base = (base * base) % mod;
  }
  return result;
}

function modInverse(a: bigint, m: bigint): bigint | null {
  let [old_r, r] = [a, m];
  let [old_s, s] = [1n, 0n];
  while (r !== 0n) {
    const q = old_r / r;
    [old_r, r] = [r, old_r - q * r];
    [old_s, s] = [s, old_s - q * s];
  }
  if (old_r !== 1n) return null;
  return ((old_s % m) + m) % m;
}

function isPrime(n: bigint): boolean {
  if (n < 2n) return false;
  if (n === 2n) return true;
  if (n % 2n === 0n) return false;
  for (let i = 3n; i * i <= n; i += 2n) {
    if (n % i === 0n) return false;
  }
  return true;
}

interface RsaResult {
  n: bigint;
  phi: bigint;
  e: bigint;
  d: bigint;
  encrypted?: bigint;
  decrypted?: bigint;
  error?: string;
}

function computeRsa(
  pStr: string,
  qStr: string,
  eStr: string,
  messageStr: string,
  t: (key: string) => string
): RsaResult | null {
  const p = BigInt(pStr);
  const q = BigInt(qStr);
  const e = BigInt(eStr);

  if (!isPrime(p)) return { n: 0n, phi: 0n, e, d: 0n, error: t("error.notPrime") + ": p" };
  if (!isPrime(q)) return { n: 0n, phi: 0n, e, d: 0n, error: t("error.notPrime") + ": q" };
  if (p === q) return { n: 0n, phi: 0n, e, d: 0n, error: t("error.sameFactors") };

  const n = p * q;
  const phi = (p - 1n) * (q - 1n);

  if (gcd(e, phi) !== 1n) return { n, phi, e, d: 0n, error: t("error.eNotCoprime") };
  if (e <= 1n || e >= phi) return { n, phi, e, d: 0n, error: t("error.eRange") };

  const d = modInverse(e, phi);
  if (d === null) return { n, phi, e, d: 0n, error: t("error.noInverse") };

  let encrypted: bigint | undefined;
  let decrypted: bigint | undefined;

  if (messageStr.trim() !== "") {
    const m = BigInt(messageStr);
    if (m >= n) return { n, phi, e, d, error: t("error.messageTooLarge") };
    encrypted = modpow(m, e, n);
    decrypted = modpow(encrypted, d, n);
  }

  return { n, phi, e, d, encrypted, decrypted };
}

export default function RsaCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.rsa-calculator");
  const [p, setP] = React.useState<string>("61");
  const [q, setQ] = React.useState<string>("53");
  const [e, setE] = React.useState<string>("17");
  const [message, setMessage] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<RsaResult | null>(() => {
    if (!touched) return null;
    try {
      if (!p || !q || !e) return null;
      return computeRsa(p, q, e, message, (k) => t(k as never));
    } catch {
      return { n: 0n, phi: 0n, e: 0n, d: 0n, error: t("error.invalid") };
    }
  }, [touched, p, q, e, message, t]);

  function reset() {
    setP("61");
    setQ("53");
    setE("17");
    setMessage("");
    setTouched(false);
  }

  const examplesItems = React.useMemo(() => {
    const raw = t.raw("examples.items") as { input: string; output: string; note?: string }[] | undefined;
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
        const q2 = t(`faq.q${i}` as never);
        const a = t(`faq.q${i}_a` as never);
        if (q2 && a && !q2.startsWith("tool.")) arr.push({ q: q2, a });
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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="rsa-p">{t("field.p")}</Label>
              <Input
                id="rsa-p"
                type="number"
                inputMode="numeric"
                value={p}
                placeholder={t("placeholder.prime")}
                onChange={(e) => { setP(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rsa-q">{t("field.q")}</Label>
              <Input
                id="rsa-q"
                type="number"
                inputMode="numeric"
                value={q}
                placeholder={t("placeholder.prime")}
                onChange={(e) => { setQ(e.target.value); setTouched(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rsa-e">{t("field.e")}</Label>
              <Input
                id="rsa-e"
                type="number"
                inputMode="numeric"
                value={e}
                placeholder={t("placeholder.exponent")}
                onChange={(ev) => { setE(ev.target.value); setTouched(false); }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rsa-msg">{t("field.message")}</Label>
            <Input
              id="rsa-msg"
              type="number"
              inputMode="numeric"
              value={message}
              placeholder={t("placeholder.message")}
              onChange={(e) => { setMessage(e.target.value); setTouched(false); }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setTouched(true)}>
              {t("button.generate")}
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              {t("button.reset")}
            </Button>
          </div>

          {result !== null && (
            result.error ? (
              <p className="text-sm text-red-600">{result.error}</p>
            ) : (
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2 text-sm">
                <div className="font-semibold text-zinc-700">{t("result.heading")}</div>
                <div className="grid gap-1 sm:grid-cols-2">
                  <span className="text-zinc-500">{t("result.n")}:</span>
                  <span className="font-mono font-semibold">{result.n.toString()}</span>
                  <span className="text-zinc-500">{t("result.phi")}:</span>
                  <span className="font-mono">{result.phi.toString()}</span>
                  <span className="text-zinc-500">{t("result.e")}:</span>
                  <span className="font-mono">{result.e.toString()}</span>
                  <span className="text-zinc-500">{t("result.d")}:</span>
                  <span className="font-mono font-semibold">{result.d.toString()}</span>
                  {result.encrypted !== undefined && (
                    <>
                      <span className="text-zinc-500">{t("result.encrypted")}:</span>
                      <span className="font-mono font-semibold">{result.encrypted.toString()}</span>
                      <span className="text-zinc-500">{t("result.decrypted")}:</span>
                      <span className="font-mono">{result.decrypted?.toString()}</span>
                    </>
                  )}
                </div>
              </div>
            )
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
