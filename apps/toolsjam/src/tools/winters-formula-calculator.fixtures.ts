import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Quarterly forecast: 8 data points, period=4, h=4",
    actions: [
      {
        kind: "fill",
        label: "Time Series Data (comma-separated)",
        value: "50000,60000,70000,80000,55000,65000,75000,85000",
      },
      { kind: "fill", label: "Alpha — Level Smoothing (0–1)", value: "0.2" },
      { kind: "fill", label: "Beta — Trend Smoothing (0–1)", value: "0.05" },
      { kind: "fill", label: "Gamma — Seasonal Smoothing (0–1)", value: "0.15" },
      { kind: "fill", label: "Seasonal Period", value: "4" },
      { kind: "fill", label: "Forecast Periods", value: "4" },
      { kind: "click", label: "Calculate Forecast" },
    ],
    expect: { text: ["Forecast Results", "Period", "+1"] },
  },
  {
    name: "Monthly forecast: 24 data points, period=12, h=6",
    actions: [
      {
        kind: "fill",
        label: "Time Series Data (comma-separated)",
        value:
          "1200,1350,1500,1800,2000,2200,2400,2600,2800,3000,3200,3500,1400,1600,1750,2100,2300,2500,2700,2900,3100,3300,3500,3800",
      },
      { kind: "fill", label: "Alpha — Level Smoothing (0–1)", value: "0.3" },
      { kind: "fill", label: "Beta — Trend Smoothing (0–1)", value: "0.1" },
      { kind: "fill", label: "Gamma — Seasonal Smoothing (0–1)", value: "0.2" },
      { kind: "fill", label: "Seasonal Period", value: "12" },
      { kind: "fill", label: "Forecast Periods", value: "6" },
      { kind: "click", label: "Calculate Forecast" },
    ],
    expect: { text: ["Forecast Results", "+1", "+6"] },
  },
];
