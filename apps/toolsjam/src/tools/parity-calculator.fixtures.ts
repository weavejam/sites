import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Decimal 42 → Even",
    actions: [
      { kind: "fill", label: "Number Input", value: "42" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Even"] },
  },
  {
    name: "Binary 0b1011 → Odd",
    actions: [
      { kind: "fill", label: "Number Input", value: "0b1011" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Odd"] },
  },
];
