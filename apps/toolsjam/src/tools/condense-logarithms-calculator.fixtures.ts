import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Addition base 10: log(2) + log(5) → log(2 · 5)",
    actions: [
      { kind: "click", label: "Addition (log a + log b)" },
      { kind: "click", label: "10 (common)" },
      { kind: "fill", label: "First Value (a)", value: "2" },
      { kind: "fill", label: "Second Value (b)", value: "5" },
      { kind: "click", label: "Condense Logarithms" },
    ],
    expect: { text: ["Condensed expression", "log(2 · 5)"] },
  },
  {
    name: "Power natural log: 3 · ln(x) → ln(x^3)",
    actions: [
      { kind: "click", label: "Power (k · log a)" },
      { kind: "click", label: "e (natural, ln)" },
      { kind: "fill", label: "First Value (a)", value: "x" },
      { kind: "fill", label: "Coefficient (k)", value: "3" },
      { kind: "click", label: "Condense Logarithms" },
    ],
    expect: { text: ["Condensed expression", "ln(x^3)"] },
  },
];
