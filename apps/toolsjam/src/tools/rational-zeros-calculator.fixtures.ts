import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "x^2 - 7x + 6 candidates",
    actions: [
      { kind: "fill", label: "Polynomial Coefficients", value: "1, -7, 6" },
      { kind: "click", label: "Find Rational Zeros" },
    ],
    expect: {
      text: ["Result", "Possible rational zeros (8): -6, -3, -2, -1, 1, 2, 3, 6"],
    },
  },
  {
    name: "2x^2 - 3x - 2 candidates",
    actions: [
      { kind: "fill", label: "Polynomial Coefficients", value: "2, -3, -2" },
      { kind: "click", label: "Find Rational Zeros" },
    ],
    expect: {
      text: "Possible rational zeros (6): -2, -1, -1/2 (-0.5), 1/2 (0.5), 1, 2",
    },
  },
];
