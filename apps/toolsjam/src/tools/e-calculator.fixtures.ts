import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "e^2 — exponential function",
    actions: [
      { kind: "fill", label: "Input Value (x)", value: "2" },
      { kind: "click", label: "Calculate Result" },
    ],
    expect: { text: ["Calculation Result", "7.38"] },
  },
  {
    name: "ln(10) — natural logarithm",
    actions: [
      { kind: "click", label: "ln(x) (Natural Log)" },
      { kind: "fill", label: "Input Value (x)", value: "10" },
      { kind: "click", label: "Calculate Result" },
    ],
    expect: { text: ["Calculation Result", "2.302"] },
  },
];
