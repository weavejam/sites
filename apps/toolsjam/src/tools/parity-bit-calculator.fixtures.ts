import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Even parity: 1010 (2 ones) → parity bit 0, transmission 10100",
    actions: [
      { kind: "click", label: "Even Parity" },
      { kind: "fill", label: "Binary Data", value: "1010" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["10100"] },
  },
  {
    name: "Odd parity: 1010 (2 ones) → parity bit 1, transmission 10101",
    actions: [
      { kind: "click", label: "Odd Parity" },
      { kind: "fill", label: "Binary Data", value: "1010" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["10101"] },
  },
  {
    name: "Even parity: 1110 (3 ones) → parity bit 1, transmission 11101",
    actions: [
      { kind: "click", label: "Even Parity" },
      { kind: "fill", label: "Binary Data", value: "1110" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["11101"] },
  },
];
