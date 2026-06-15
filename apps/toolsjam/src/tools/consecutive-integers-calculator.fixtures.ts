import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Generate 5..8 → sum 26",
    actions: [
      { kind: "click", label: "Generate Sequence" },
      { kind: "fill", label: "Starting Integer", value: "5" },
      { kind: "fill", label: "Count", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "5, 6, 7, 8", "26"] },
  },
  {
    name: "Find by sum: 33 across 3 → 10,11,12",
    actions: [
      { kind: "click", label: "Find by Target Sum" },
      { kind: "fill", label: "Target Sum", value: "33" },
      { kind: "fill", label: "Count", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "10, 11, 12"] },
  },
  {
    name: "Analyze 4 5 6 7 8 is consecutive",
    actions: [
      { kind: "click", label: "Analyze Sequence" },
      { kind: "fill", label: "Sequence (comma or space separated)", value: "4, 5, 6, 7, 8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "4, 5, 6, 7, 8", "30"] },
  },
];
