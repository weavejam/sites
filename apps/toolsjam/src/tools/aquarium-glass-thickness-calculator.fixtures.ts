import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "60 L freshwater tank with standard glass",
    actions: [
      { kind: "fill", label: "Length (cm)", value: "60" },
      { kind: "fill", label: "Width (cm)", value: "40" },
      { kind: "fill", label: "Height (cm)", value: "40" },
      { kind: "fill", label: "Water Level (%)", value: "90" },
      { kind: "fill", label: "Safety Factor", value: "3.8" },
      { kind: "fill", label: "Water Density (kg/m³)", value: "1000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Glass Thickness Results", "mm"] },
  },
  {
    name: "200 L saltwater tank with tempered glass",
    actions: [
      { kind: "fill", label: "Length (cm)", value: "100" },
      { kind: "fill", label: "Width (cm)", value: "50" },
      { kind: "fill", label: "Height (cm)", value: "50" },
      { kind: "fill", label: "Water Level (%)", value: "90" },
      { kind: "fill", label: "Safety Factor", value: "3.8" },
      { kind: "fill", label: "Water Density (kg/m³)", value: "1025" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Glass Thickness Results", "Pa"] },
  },
];
