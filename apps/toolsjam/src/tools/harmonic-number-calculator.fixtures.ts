import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "computes H5 with approximation",
    actions: [
      { kind: "fill", label: "Term Number (n)", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Harmonic Number", "H_5 = 2.2833333333 (5 terms)", "Approximation: 2.2866535773"] },
  },
  {
    name: "computes H3 = 1 + 1/2 + 1/3",
    actions: [
      { kind: "fill", label: "Term Number (n)", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Harmonic Number", "H_3 = 1.8333333333 (3 terms)"] },
  },
];
