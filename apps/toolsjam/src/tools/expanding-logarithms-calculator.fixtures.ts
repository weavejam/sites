import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Expand common logarithm product",
    actions: [
      { kind: "fill", label: "First value (m)", value: "2" },
      { kind: "fill", label: "Second value (n)", value: "8" },
      { kind: "click", label: "Calculate Expansion" },
    ],
    expect: {
      text: [
        "Result",
        "log(2 · 8) = log(2) + log(8)",
        "Numeric value: 1.2041199827",
      ],
    },
  },
  {
    name: "Expand natural logarithm quotient",
    actions: [
      { kind: "click", label: "Natural log (ln)" },
      { kind: "click", label: "Quotient Rule" },
      { kind: "fill", label: "Numerator (m)", value: "9" },
      { kind: "fill", label: "Denominator (n)", value: "3" },
      { kind: "click", label: "Calculate Expansion" },
    ],
    expect: {
      text: [
        "ln(9 / 3) = ln(9) - ln(3)",
        "Numeric value: 1.0986122887",
      ],
    },
  },
  {
    name: "Expand custom-base power rule",
    actions: [
      { kind: "click", label: "Custom base log" },
      { kind: "fill", label: "Base (b)", value: "2" },
      { kind: "click", label: "Power Rule" },
      { kind: "fill", label: "Argument (m)", value: "8" },
      { kind: "fill", label: "Exponent (n)", value: "3" },
      { kind: "click", label: "Calculate Expansion" },
    ],
    expect: {
      text: ["log_2(8^3) = 3 · log_2(8)", "Numeric value: 9"],
    },
  },
];
