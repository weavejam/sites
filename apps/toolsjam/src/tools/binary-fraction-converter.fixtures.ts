import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Binary 101.101 → decimal 5.625",
    actions: [
      { kind: "click", label: "Binary → Decimal" },
      { kind: "fill", label: "Input value", value: "101.101" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Result", "5.625"] },
  },
  {
    name: "Decimal 5.625 → binary 101.101",
    actions: [
      { kind: "click", label: "Decimal → Binary" },
      { kind: "fill", label: "Input value", value: "5.625" },
      { kind: "fill", label: "Fractional precision (bits)", value: "8" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Result", "101.101"] },
  },
  {
    name: "Binary 1010.1101 → decimal 10.8125",
    actions: [
      { kind: "click", label: "Binary → Decimal" },
      { kind: "fill", label: "Input value", value: "1010.1101" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Result", "10.8125"] },
  },
];
