import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "x²-5x+6=0 → Δ=1, roots 3 and 2",
    actions: [
      { kind: "fill", label: "Coefficient a", value: "1" },
      { kind: "fill", label: "Coefficient b", value: "-5" },
      { kind: "fill", label: "Coefficient c", value: "6" },
      { kind: "click", label: "Calculate Discriminant" },
    ],
    expect: { text: ["Result", "Δ = 1"] },
  },
  {
    name: "x²-4x+4=0 → Δ=0, repeated root 2",
    actions: [
      { kind: "fill", label: "Coefficient a", value: "1" },
      { kind: "fill", label: "Coefficient b", value: "-4" },
      { kind: "fill", label: "Coefficient c", value: "4" },
      { kind: "click", label: "Calculate Discriminant" },
    ],
    expect: { text: ["Result", "Δ = 0"] },
  },
  {
    name: "x²+2x+5=0 → Δ=-16, complex roots",
    actions: [
      { kind: "fill", label: "Coefficient a", value: "1" },
      { kind: "fill", label: "Coefficient b", value: "2" },
      { kind: "fill", label: "Coefficient c", value: "5" },
      { kind: "click", label: "Calculate Discriminant" },
    ],
    expect: { text: ["Result", "Δ = -16"] },
  },
];
