import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Commercial office building transformer sizing",
    actions: [
      { kind: "fill", label: "Load Power (kW)", value: "150" },
      { kind: "fill", label: "Power Factor (0–1)", value: "0.85" },
      { kind: "fill", label: "Ambient Temperature (°C)", value: "25" },
      { kind: "fill", label: "Safety Factor (%)", value: "20" },
      { kind: "fill", label: "Transformer Efficiency (%)", value: "96" },
      { kind: "click", label: "Continuous" },
      { kind: "click", label: "Three Phase" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Transformer Sizing Results", "kVA"] },
  },
  {
    name: "Residential complex transformer sizing",
    actions: [
      { kind: "fill", label: "Load Power (kW)", value: "75" },
      { kind: "fill", label: "Power Factor (0–1)", value: "0.90" },
      { kind: "fill", label: "Ambient Temperature (°C)", value: "20" },
      { kind: "fill", label: "Safety Factor (%)", value: "15" },
      { kind: "fill", label: "Transformer Efficiency (%)", value: "97" },
      { kind: "click", label: "Non-Continuous" },
      { kind: "click", label: "Single Phase" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Transformer Sizing Results", "kVA"] },
  },
];
