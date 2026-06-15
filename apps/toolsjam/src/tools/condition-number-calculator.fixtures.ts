import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Identity 2x2 has κ = 1 in 1-norm",
    actions: [
      { kind: "click", label: "2 × 2" },
      { kind: "click", label: "1-norm (max column sum)" },
      { kind: "fill", label: "(1,1)", value: "1" },
      { kind: "fill", label: "(1,2)", value: "0" },
      { kind: "fill", label: "(2,1)", value: "0" },
      { kind: "fill", label: "(2,2)", value: "1" },
      { kind: "click", label: "Calculate Condition Number" },
    ],
    expect: { text: ["Condition number", "κ(A) = 1"] },
  },
  {
    name: "Well-conditioned 2x2 symmetric matrix Frobenius norm",
    actions: [
      { kind: "click", label: "2 × 2" },
      { kind: "click", label: "Frobenius norm" },
      { kind: "fill", label: "(1,1)", value: "2" },
      { kind: "fill", label: "(1,2)", value: "1" },
      { kind: "fill", label: "(2,1)", value: "1" },
      { kind: "fill", label: "(2,2)", value: "3" },
      { kind: "click", label: "Calculate Condition Number" },
    ],
    expect: { text: ["Condition number", "κ(A)"] },
  },
  {
    name: "Singular 2x2 reports infinite condition number",
    actions: [
      { kind: "click", label: "2 × 2" },
      { kind: "click", label: "Frobenius norm" },
      { kind: "fill", label: "(1,1)", value: "1" },
      { kind: "fill", label: "(1,2)", value: "2" },
      { kind: "fill", label: "(2,1)", value: "2" },
      { kind: "fill", label: "(2,2)", value: "4" },
      { kind: "click", label: "Calculate Condition Number" },
    ],
    expect: { text: "singular" },
  },
];
