import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Divide 100 by 8",
    actions: [
      { kind: "fill", label: "Dividend", value: "100" },
      { kind: "fill", label: "Divisor", value: "8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "12", "4"] },
  },
  {
    name: "Divide 64 by 4 (perfect division)",
    actions: [
      { kind: "fill", label: "Dividend", value: "64" },
      { kind: "fill", label: "Divisor", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "16"] },
  },
  {
    name: "Divide 52 by 5",
    actions: [
      { kind: "fill", label: "Dividend", value: "52" },
      { kind: "fill", label: "Divisor", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "10", "2"] },
  },
];
