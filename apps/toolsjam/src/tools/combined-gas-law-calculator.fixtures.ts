import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Solve for final pressure P₂ ≈ 1.465 atm",
    actions: [
      { kind: "fill", label: "Initial Pressure (P₁)", value: "1.0" },
      { kind: "fill", label: "Initial Volume (V₁)", value: "2.0" },
      { kind: "fill", label: "Initial Temperature (T₁, K)", value: "273" },
      { kind: "fill", label: "Final Volume (V₂)", value: "1.5" },
      { kind: "fill", label: "Final Temperature (T₂, K)", value: "300" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "P₂"] },
  },
  {
    name: "Solve for final volume V₂ = 1.6 L",
    actions: [
      { kind: "fill", label: "Initial Pressure (P₁)", value: "2.0" },
      { kind: "fill", label: "Initial Volume (V₁)", value: "1.0" },
      { kind: "fill", label: "Initial Temperature (T₁, K)", value: "250" },
      { kind: "fill", label: "Final Pressure (P₂)", value: "1.5" },
      { kind: "fill", label: "Final Temperature (T₂, K)", value: "300" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "V₂"] },
  },
  {
    name: "Solve for final temperature T₂",
    actions: [
      { kind: "fill", label: "Initial Pressure (P₁)", value: "1.5" },
      { kind: "fill", label: "Initial Volume (V₁)", value: "3.0" },
      { kind: "fill", label: "Initial Temperature (T₁, K)", value: "280" },
      { kind: "fill", label: "Final Pressure (P₂)", value: "2.0" },
      { kind: "fill", label: "Final Volume (V₂)", value: "2.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "T₂"] },
  },
];
