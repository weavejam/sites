import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "4-bit Fibonacci LFSR, seed=1000, taps=4,3, 15 iterations",
    actions: [
      { kind: "fill", label: "Register Length", value: "4" },
      { kind: "fill", label: "Initial Seed", value: "1000" },
      { kind: "fill", label: "Feedback Taps", value: "4, 3" },
      { kind: "fill", label: "Iterations", value: "15" },
      { kind: "click", label: "Fibonacci LFSR" },
      { kind: "click", label: "Generate Sequence" },
    ],
    expect: { text: ["Generated Sequence", "Output Bits"] },
  },
  {
    name: "3-bit Fibonacci LFSR, seed=110, taps=3,2, 7 iterations",
    actions: [
      { kind: "fill", label: "Register Length", value: "3" },
      { kind: "fill", label: "Initial Seed", value: "110" },
      { kind: "fill", label: "Feedback Taps", value: "3, 2" },
      { kind: "fill", label: "Iterations", value: "7" },
      { kind: "click", label: "Fibonacci LFSR" },
      { kind: "click", label: "Generate Sequence" },
    ],
    expect: { text: ["Generated Sequence", "Period"] },
  },
];
