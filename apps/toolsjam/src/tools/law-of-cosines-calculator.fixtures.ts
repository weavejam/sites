import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "SAS: a=5, b=7, C=45° → c ≈ 4.9669",
    actions: [
      { kind: "click", label: "Find Side (SAS)" },
      { kind: "fill", label: "Side a", value: "5" },
      { kind: "fill", label: "Side b", value: "7" },
      { kind: "fill", label: "Angle C (°)", value: "45" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Calculated Side c ="] },
  },
  {
    name: "SSS: a=8, b=6, c=10 → C=90°",
    actions: [
      { kind: "click", label: "Find Angle (SSS)" },
      { kind: "fill", label: "Side a", value: "8" },
      { kind: "fill", label: "Side b", value: "6" },
      { kind: "fill", label: "Side c", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Calculated Angle C = 90"] },
  },
];
