import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "1010 (2 ones) → odd parity bit 1, transmission 10101",
    actions: [
      { kind: "fill", label: "Binary Data", value: "1010" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["10101"] },
  },
  {
    name: "1110 (3 ones) → odd parity bit 0, transmission 11100",
    actions: [
      { kind: "fill", label: "Binary Data", value: "1110" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["11100"] },
  },
  {
    name: "Validate received 10101 (3 ones) → valid",
    actions: [
      { kind: "fill", label: "Binary Data", value: "1010" },
      { kind: "fill", label: "Received Data (for validation)", value: "10101" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: "Valid" },
  },
];
