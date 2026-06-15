import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "1010 → even parity bit 0, transmission 10100",
    actions: [
      { kind: "fill", label: "Binary Data", value: "1010" },
      { kind: "click", label: "Calculate Even Parity Bit" },
    ],
    expect: { text: ["Result", "10100"] },
  },
  {
    name: "1110 → even parity bit 1, transmission 11101",
    actions: [
      { kind: "fill", label: "Binary Data", value: "1110" },
      { kind: "click", label: "Calculate Even Parity Bit" },
    ],
    expect: { text: ["Result", "11101"] },
  },
  {
    name: "1010 with valid received 10100 → no error",
    actions: [
      { kind: "fill", label: "Binary Data", value: "1010" },
      { kind: "fill", label: "Received Data (for validation)", value: "10100" },
      { kind: "click", label: "Calculate Even Parity Bit" },
    ],
    expect: { text: ["Validation Result", "no error detected"] },
  },
];
