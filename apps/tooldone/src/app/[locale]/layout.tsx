import "../globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { AdSenseLoader } from "@/components/analytics/adsense";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { hreflang, isLocale, locales, type Locale } from "@/i18n/locales";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: SITE_NAME, template: `%s` },
    description: SITE_TAGLINE,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}`]),
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const typedLocale = locale as Locale;
  return (
    <html lang={hreflang[typedLocale]}>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages} locale={typedLocale}>
          <SiteHeader locale={typedLocale} />
          <main className="flex-1">
            <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
              {children}
            </div>
          </main>
          <SiteFooter locale={typedLocale} />
        </NextIntlClientProvider>
        <GoogleAnalytics />
        <AdSenseLoader />
      </body>
    </html>
  );
}
