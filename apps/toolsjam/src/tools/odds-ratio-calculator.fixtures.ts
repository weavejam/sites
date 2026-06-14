import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Smoking/lung cancer OR ≈ 16.71",
    actions: [
      { kind: "fill", label: "Outcome Positive – Cases (a)", value: "650" },
      { kind: "fill", label: "Outcome Negative – Non-Cases (b)", value: "350" },
      { kind: "fill", label: "Outcome Positive – Cases (c)", value: "100" },
      { kind: "fill", label: "Outcome Negative – Non-Cases (d)", value: "900" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Odds Ratio (OR)"] },
  },
  {
    name: "Drug trial OR ≈ 0.318 (protective)",
    actions: [
      { kind: "fill", label: "Outcome Positive – Cases (a)", value: "38" },
      { kind: "fill", label: "Outcome Negative – Non-Cases (b)", value: "162" },
      { kind: "fill", label: "Outcome Positive – Cases (c)", value: "85" },
      { kind: "fill", label: "Outcome Negative – Non-Cases (d)", value: "115" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Confidence Interval"] },
  },
];
