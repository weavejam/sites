import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "computes harmonic mean for three positive values",
    actions: [
      { kind: "fill", label: "Number Sequence", value: "1, 2, 4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Harmonic Mean", "1.714286", "Count: 3", "Sum of reciprocals: 1.750000"] },
  },
  {
    name: "computes harmonic mean of 2, 3, 6 which equals 3",
    actions: [
      { kind: "fill", label: "Number Sequence", value: "2, 3, 6" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Harmonic Mean", "3.000000", "Count: 3"] },
  },
];
