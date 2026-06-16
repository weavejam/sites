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

interface FaqItem {
  q: string;
  a: string;
}

type TempUnit = "celsius" | "fahrenheit";
type SunlightLevel = "fullSun" | "partialSun" | "fullShade";
type CarColor = "dark" | "light";
type WindowTinting = "none" | "light" | "heavy";
type RiskLevel = "safe" | "caution" | "danger" | "extreme";

interface HotCarResult {
  interiorTempC: number;
  riseC: number;
  risk: RiskLevel;
}

const SUNLIGHT_FACTOR: Record<SunlightLevel, number> = {
  fullSun: 1.0,
  partialSun: 0.6,
  fullShade: 0.15,
};

const COLOR_FACTOR: Record<CarColor, number> = {
  dark: 1.1,
  light: 0.9,
};

const TINT_FACTOR: Record<WindowTinting, number> = {
  none: 1.0,
  light: 0.9,
  heavy: 0.75,
};

function computeHotCar(
  outsideTemp: number,
  unit: TempUnit,
  minutes: number,
  sunlight: SunlightLevel,
  carColor: CarColor,
  tinting: WindowTinting,
  humidity: number,
): HotCarResult | null {
  if (!Number.isFinite(outsideTemp) || !Number.isFinite(minutes) || minutes <= 0)
    return null;
  const outsideTempC = unit === "fahrenheit" ? (outsideTemp - 32) * (5 / 9) : outsideTemp;
  const humidityFactor = 1 + Math.max(0, (humidity - 50) / 100) * 0.05;
  const deltaT =
    25 *
    (1 - Math.exp(-minutes / 40)) *
    SUNLIGHT_FACTOR[sunlight] *
    COLOR_FACTOR[carColor] *
    TINT_FACTOR[tinting] *
    humidityFactor;
  const interiorTempC = outsideTempC + deltaT;
  let risk: RiskLevel;
  if (interiorTempC < 32) risk = "safe";
  else if (interiorTempC < 38) risk = "caution";
  else if (interiorTempC < 45) risk = "danger";
  else risk = "extreme";
  return { interiorTempC, riseC: deltaT, risk };
}

function toDisplay(tempC: number, unit: TempUnit): string {
  if (unit === "fahrenheit") {
    return `${((tempC * 9) / 5 + 32).toFixed(1)} °F`;
  }
  return `${tempC.toFixed(1)} °C`;
}

function toDeltaDisplay(deltaC: number, unit: TempUnit): string {
  if (unit === "fahrenheit") {
    return `+${((deltaC * 9) / 5).toFixed(1)} °F`;
  }
  return `+${deltaC.toFixed(1)} °C`;
}

export default function HotCarCalculator(_props: { locale: Locale }) {
  const t = useTranslations("tool.hot-car-calculator");
  const [outsideTemp, setOutsideTemp] = React.useState("");
  const [tempUnit, setTempUnit] = React.useState<TempUnit>("celsius");
  const [parkingTime, setParkingTime] = React.useState("");
  const [sunlight, setSunlight] = React.useState<SunlightLevel>("fullSun");
  const [carColor, setCarColor] = React.useState<CarColor>("dark");
  const [tinting, setTinting] = React.useState<WindowTinting>("none");
  const [humidity, setHumidity] = React.useState("50");
  const [touched, setTouched] = React.useState(false);

  const result = React.useMemo<HotCarResult | null>(() => {
    const hum = humidity === "" ? 50 : parseFloat(humidity);
    return computeHotCar(
      parseFloat(outsideTemp),
      tempUnit,
      parseFloat(parkingTime),
      sunlight,
      carColor,
      tinting,
      Number.isFinite(hum) ? hum : 50,
    );
  }, [outsideTemp, tempUnit, parkingTime, sunlight, carColor, tinting, humidity]);

  function reset() {
    setOutsideTemp("");
    setParkingTime("");
    setTempUnit("celsius");
    setSunlight("fullSun");
    setCarColor("dark");
    setTinting("none");
    setHumidity("50");
    setTouched(false);
  }

  function loadExample(
    temp: string,
    unit: TempUnit,
    time: string,
    sun: SunlightLevel,
    color: CarColor,
    tint: WindowTinting,
    hum: string,
  ) {
    setOutsideTemp(temp);
    setTempUnit(unit);
    setParkingTime(time);
    setSunlight(sun);
    setCarColor(color);
    setTinting(tint);
    setHumidity(hum);
    setTouched(true);
  }

  const examplesItems = React.useMemo<ExampleItem[]>(() => {
    const raw = t.raw("examples.items") as ExampleItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const howtoSteps = React.useMemo<string[]>(() => {
    const raw = t.raw("howto.steps") as string[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const faqItems = React.useMemo<FaqItem[]>(() => {
    const raw = t.raw("faq.items") as FaqItem[] | undefined;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: t("title"),
        applicationCategory: "HealthApplication",
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

  const showError =
    touched &&
    (outsideTemp === "" ||
      parkingTime === "" ||
      !Number.isFinite(parseFloat(outsideTemp)) ||
      !Number.isFinite(parseFloat(parkingTime)) ||
      parseFloat(parkingTime) <= 0);

  const selectClass =
    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm";

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
              <Label htmlFor="hc-outside-temp">{t("field.outsideTemp")}</Label>
              <Input
                id="hc-outside-temp"
                type="number"
                inputMode="decimal"
                value={outsideTemp}
                placeholder={t("placeholder.outsideTemp")}
                onChange={(e) => {
                  setOutsideTemp(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hc-temp-unit">{t("field.tempUnit")}</Label>
              <select
                id="hc-temp-unit"
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value as TempUnit)}
                className={selectClass}
              >
                <option value="celsius">{t("tempUnit.celsius")}</option>
                <option value="fahrenheit">{t("tempUnit.fahrenheit")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hc-parking-time">{t("field.parkingTime")}</Label>
              <Input
                id="hc-parking-time"
                type="number"
                inputMode="numeric"
                value={parkingTime}
                placeholder={t("placeholder.parkingTime")}
                onChange={(e) => {
                  setParkingTime(e.target.value);
                  setTouched(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hc-sunlight">{t("field.sunlight")}</Label>
              <select
                id="hc-sunlight"
                value={sunlight}
                onChange={(e) => setSunlight(e.target.value as SunlightLevel)}
                className={selectClass}
              >
                <option value="fullSun">{t("sunlight.fullSun")}</option>
                <option value="partialSun">{t("sunlight.partialSun")}</option>
                <option value="fullShade">{t("sunlight.fullShade")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hc-car-color">{t("field.carColor")}</Label>
              <select
                id="hc-car-color"
                value={carColor}
                onChange={(e) => setCarColor(e.target.value as CarColor)}
                className={selectClass}
              >
                <option value="dark">{t("carColor.dark")}</option>
                <option value="light">{t("carColor.light")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hc-tinting">{t("field.windowTinting")}</Label>
              <select
                id="hc-tinting"
                value={tinting}
                onChange={(e) => setTinting(e.target.value as WindowTinting)}
                className={selectClass}
              >
                <option value="none">{t("windowTinting.none")}</option>
                <option value="light">{t("windowTinting.light")}</option>
                <option value="heavy">{t("windowTinting.heavy")}</option>
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="hc-humidity">{t("field.humidity")}</Label>
              <Input
                id="hc-humidity"
                type="number"
                inputMode="numeric"
                value={humidity}
                placeholder={t("placeholder.humidity")}
                onChange={(e) => setHumidity(e.target.value)}
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

          {result !== null && touched && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-medium text-zinc-500">
                {t("result.heading")}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.interior")}
                  </div>
                  <div className="text-2xl font-semibold text-zinc-900">
                    {toDisplay(result.interiorTempC, tempUnit)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.rise")}
                  </div>
                  <div className="text-xl font-semibold text-zinc-900">
                    {toDeltaDisplay(result.riseC, tempUnit)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">
                    {t("result.risk")}
                  </div>
                  <div className="text-base font-medium text-zinc-900">
                    {t(`risk.${result.risk}` as never)}
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500">{t("formula")}</div>
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
              {examplesItems.map((ex, idx) => (
                <tr key={idx} className="border-b border-zinc-100 align-top">
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
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample("35", "celsius", "30", "fullSun", "dark", "none", "60")
            }
          >
            {t("examples.loadExtreme")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample(
                "25",
                "celsius",
                "20",
                "partialSun",
                "dark",
                "none",
                "50",
              )
            }
          >
            {t("examples.loadModerate")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              loadExample(
                "30",
                "celsius",
                "60",
                "fullShade",
                "light",
                "heavy",
                "40",
              )
            }
          >
            {t("examples.loadShade")}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howto.heading")}
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {howtoSteps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("faq.heading")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((f, idx) => (
            <div key={idx} className="rounded-lg border border-zinc-200 p-4">
              <div className="font-semibold text-zinc-900">{f.q}</div>
              <div className="mt-1 text-zinc-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
