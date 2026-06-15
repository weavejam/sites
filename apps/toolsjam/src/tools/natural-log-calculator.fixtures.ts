import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "ln(1) = 0",
    actions: [
      { kind: "fill", label: "Number (x)", value: "1" },
      { kind: "click", label: "Calculate ln" },
    ],
    expect: { text: ["Result", "ln(1) = 0"] },
  },
  {
    name: "ln(e) ≈ 1",
    actions: [
      { kind: "fill", label: "Number (x)", value: "2.71828" },
      { kind: "click", label: "Calculate ln" },
    ],
    expect: { text: "Result" },
  },
  {
    name: "ln(1000) ≈ 6.9078",
    actions: [
      { kind: "fill", label: "Number (x)", value: "1000" },
      { kind: "click", label: "Calculate ln" },
    ],
    expect: { text: ["Result", "ln(1,000)"] },
  },
];
