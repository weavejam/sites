import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Pentagon side=10 → area≈172.05, perimeter=50",
    actions: [
      { kind: "click", label: "Side Length" },
      { kind: "fill", label: "Value (Side Length)", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Pentagon Properties", "50"] },
  },
  {
    name: "Pentagon perimeter=50 → side=10",
    actions: [
      { kind: "click", label: "Perimeter" },
      { kind: "fill", label: "Value (Perimeter)", value: "50" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Pentagon Properties", "10"] },
  },
];
