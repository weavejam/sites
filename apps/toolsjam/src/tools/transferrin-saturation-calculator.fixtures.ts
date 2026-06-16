import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal: serum iron 85, TIBC 330 → 25.76%",
    actions: [
      { kind: "fill", label: "Serum Iron (µg/dL)", value: "85" },
      { kind: "fill", label: "Total Iron Binding Capacity — TIBC (µg/dL)", value: "330" },
      { kind: "click", label: "Calculate Transferrin Saturation" },
    ],
    expect: { text: ["Transferrin Saturation", "25.76"] },
  },
  {
    name: "Iron deficiency: serum iron 40, TIBC 420 → 9.52%",
    actions: [
      { kind: "fill", label: "Serum Iron (µg/dL)", value: "40" },
      { kind: "fill", label: "Total Iron Binding Capacity — TIBC (µg/dL)", value: "420" },
      { kind: "click", label: "Calculate Transferrin Saturation" },
    ],
    expect: { text: ["Transferrin Saturation", "9.52"] },
  },
  {
    name: "Iron overload: serum iron 210, TIBC 280 → 75.00%",
    actions: [
      { kind: "fill", label: "Serum Iron (µg/dL)", value: "210" },
      { kind: "fill", label: "Total Iron Binding Capacity — TIBC (µg/dL)", value: "280" },
      { kind: "click", label: "Calculate Transferrin Saturation" },
    ],
    expect: { text: ["Transferrin Saturation", "75"] },
  },
];
