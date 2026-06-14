import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "American -150 favourite → 60.00% implied probability",
    actions: [
      { kind: "click", label: "American" },
      { kind: "fill", label: "Odds", value: "-150" },
      { kind: "click", label: "Calculate Probability" },
    ],
    expect: { text: ["Implied Probability", "60.00%"] },
  },
  {
    name: "American +250 underdog → 28.57% implied probability",
    actions: [
      { kind: "click", label: "American" },
      { kind: "fill", label: "Odds", value: "250" },
      { kind: "click", label: "Calculate Probability" },
    ],
    expect: { text: ["Implied Probability", "28.57%"] },
  },
  {
    name: "Decimal 2.00 (evens) → 50.00% implied probability",
    actions: [
      { kind: "click", label: "Decimal" },
      { kind: "fill", label: "Odds", value: "2" },
      { kind: "click", label: "Calculate Probability" },
    ],
    expect: { text: ["Implied Probability", "50.00%"] },
  },
];
