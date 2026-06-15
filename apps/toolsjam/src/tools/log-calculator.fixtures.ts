import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "log10(1000) → 3",
    actions: [
      { kind: "fill", label: "Number (x)", value: "1000" },
      { kind: "click", label: "Calculate" }
    ],
    expect: { text: ["Result", "log₁₀(1,000) = 3"] }
  },
  {
    name: "log10(0.01) → -2",
    actions: [
      { kind: "fill", label: "Number (x)", value: "0.01" },
      { kind: "click", label: "Calculate" }
    ],
    expect: { text: ["Result", "log₁₀(0.01) = -2"] }
  }
];
