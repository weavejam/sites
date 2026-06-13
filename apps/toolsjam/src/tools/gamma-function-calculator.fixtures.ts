import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Gamma(5) = 24",
    actions: [
      { kind: "fill", label: "Value (z)", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Gamma(5)"] },
  },
  {
    name: "Gamma(1) = 1",
    actions: [
      { kind: "fill", label: "Value (z)", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Gamma(1)"] },
  },
  {
    name: "Gamma(4) = 6",
    actions: [
      { kind: "fill", label: "Value (z)", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: "Result" },
  },
];
