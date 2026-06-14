import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Smoking/cancer: a=70,b=6930,c=3,d=2997 → RR≈9.56",
    actions: [
      { kind: "fill", label: "Exposed: Outcome Positive (a)", value: "70" },
      { kind: "fill", label: "Exposed: Outcome Negative (b)", value: "6930" },
      { kind: "fill", label: "Unexposed: Outcome Positive (c)", value: "3" },
      { kind: "fill", label: "Unexposed: Outcome Negative (d)", value: "2997" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Relative Risk (RR)", "95% CI for RR"] },
  },
  {
    name: "Vaccine trial: a=25,b=4975,c=80,d=4920 → RR≈0.31",
    actions: [
      { kind: "fill", label: "Exposed: Outcome Positive (a)", value: "25" },
      { kind: "fill", label: "Exposed: Outcome Negative (b)", value: "4975" },
      { kind: "fill", label: "Unexposed: Outcome Positive (c)", value: "80" },
      { kind: "fill", label: "Unexposed: Outcome Negative (d)", value: "4920" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Risk (Exposed)", "Attributable Risk"] },
  },
  {
    name: "High-fat diet: a=150,b=1850,c=100,d=2900 → RR≈2.36",
    actions: [
      { kind: "fill", label: "Exposed: Outcome Positive (a)", value: "150" },
      { kind: "fill", label: "Exposed: Outcome Negative (b)", value: "1850" },
      { kind: "fill", label: "Unexposed: Outcome Positive (c)", value: "100" },
      { kind: "fill", label: "Unexposed: Outcome Negative (d)", value: "2900" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Risk (Unexposed)"] },
  },
];
