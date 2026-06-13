import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Single tree DBH 30 cm → BA ≈ 0.0707 m²",
    actions: [
      { kind: "fill", label: "Diameter at Breast Height (DBH)", value: "30" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Basal Area Results", "0.0707"] },
  },
  {
    name: "Multiple trees DBH 25, 30, 40 cm → total BA",
    actions: [
      { kind: "fill", label: "Diameter at Breast Height (DBH)", value: "25, 30, 40" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Basal Area Results", "3 trees"] },
  },
  {
    name: "Multiple trees with 500 m² plot → BA per hectare",
    actions: [
      { kind: "fill", label: "Diameter at Breast Height (DBH)", value: "25, 30, 40" },
      { kind: "fill", label: "Plot Area (Optional)", value: "500" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Basal Area Results", "BA per Hectare"] },
  },
];
