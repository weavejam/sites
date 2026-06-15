import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "e^x: n=3, a=0, x=0.5, M=1.6487 → ≤ 0.00429867...",
    actions: [
      {
        kind: "fill",
        label: "Max Value of |f^(n+1)(z)| (M)",
        value: "1.6487",
      },
      { kind: "fill", label: "Degree of Polynomial (n)", value: "3" },
      { kind: "fill", label: "Center of Expansion (a)", value: "0" },
      { kind: "fill", label: "Point of Approximation (x)", value: "0.5" },
      { kind: "click", label: "Calculate Error Bound" },
    ],
    expect: { text: ["Error Bound Result", "Error Bound ≤"] },
  },
  {
    name: "ln(x): n=3, a=1, x=1.2, M=6 → ≤ 0.0004",
    actions: [
      {
        kind: "fill",
        label: "Max Value of |f^(n+1)(z)| (M)",
        value: "6",
      },
      { kind: "fill", label: "Degree of Polynomial (n)", value: "3" },
      { kind: "fill", label: "Center of Expansion (a)", value: "1" },
      { kind: "fill", label: "Point of Approximation (x)", value: "1.2" },
      { kind: "click", label: "Calculate Error Bound" },
    ],
    expect: { text: ["Error Bound Result", "Error Bound ≤"] },
  },
];
