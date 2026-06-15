import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Cube roots of 8 include real root 2",
    actions: [
      { kind: "fill", label: "Real Part (a)", value: "8" },
      { kind: "fill", label: "Imaginary Part (b)", value: "0" },
      { kind: "fill", label: "Root Degree (n)", value: "3" },
      { kind: "click", label: "Calculate Roots" },
    ],
    expect: { text: ["Roots", "2"] },
  },
  {
    name: "Square roots of i show 0.7071068",
    actions: [
      { kind: "fill", label: "Real Part (a)", value: "0" },
      { kind: "fill", label: "Imaginary Part (b)", value: "1" },
      { kind: "fill", label: "Root Degree (n)", value: "2" },
      { kind: "click", label: "Calculate Roots" },
    ],
    expect: { text: ["Roots", "0.7071068"] },
  },
];
