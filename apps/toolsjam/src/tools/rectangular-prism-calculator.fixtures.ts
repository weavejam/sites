import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2 by 3 by 4 prism",
    actions: [
      { kind: "fill", label: "Length (l)", value: "2" },
      { kind: "fill", label: "Width (w)", value: "3" },
      { kind: "fill", label: "Height (h)", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "24", "52", "5.3851648071"] },
  },
  {
    name: "Cube dimensions",
    actions: [
      { kind: "fill", label: "Length (l)", value: "5" },
      { kind: "fill", label: "Width (w)", value: "5" },
      { kind: "fill", label: "Height (h)", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["125", "150", "8.6602540378"] },
  },
];
