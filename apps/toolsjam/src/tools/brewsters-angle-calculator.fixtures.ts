import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Air to glass n1=1.00 n2=1.50 → 56.31°",
    actions: [
      { kind: "fill", label: "Refractive Index of Medium 1 (n₁)", value: "1.00" },
      { kind: "fill", label: "Refractive Index of Medium 2 (n₂)", value: "1.50" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "56.31"] },
  },
  {
    name: "Air to water n1=1.00 n2=1.33 → 53.06°",
    actions: [
      { kind: "fill", label: "Refractive Index of Medium 1 (n₁)", value: "1.00" },
      { kind: "fill", label: "Refractive Index of Medium 2 (n₂)", value: "1.33" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "53.06"] },
  },
  {
    name: "Air to diamond n1=1.00 n2=2.42 → 67.51°",
    actions: [
      { kind: "fill", label: "Refractive Index of Medium 1 (n₁)", value: "1.00" },
      { kind: "fill", label: "Refractive Index of Medium 2 (n₂)", value: "2.42" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "67.51"] },
  },
];
