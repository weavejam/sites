import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Convert 0.75 → 75%",
    actions: [
      { kind: "fill", label: "Decimal Number", value: "0.75" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Result", "0.75 = 75%"] },
  },
  {
    name: "Convert 1.25 → 125%",
    actions: [
      { kind: "fill", label: "Decimal Number", value: "1.25" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Result", "1.25 = 125%"] },
  },
  {
    name: "Convert 0.05 → 5%",
    actions: [
      { kind: "fill", label: "Decimal Number", value: "0.05" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Result", "0.05 = 5%"] },
  },
];
