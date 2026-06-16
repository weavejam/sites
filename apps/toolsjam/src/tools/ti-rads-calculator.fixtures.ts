import type { ToolFixture } from "@/tools/fixture";

// Selects default to: composition=cystic(0), echogenicity=anechoic(0), shape=wider(0), margin=smooth(0), foci=none(0)
export const fixtures: ToolFixture[] = [
  {
    name: "All defaults (cystic, anechoic, wider, smooth, none) → TR1 score 0",
    actions: [
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["TI-RADS Assessment", "TR1"] },
  },
  {
    name: "Defaults with nodule size 1.5 cm",
    actions: [
      { kind: "fill", label: "Largest Dimension (cm)", value: "1.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["TI-RADS Assessment", "Total Score"] },
  },
];
