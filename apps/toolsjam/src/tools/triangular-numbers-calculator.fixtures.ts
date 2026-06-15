import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Find 7th triangular number → 28",
    actions: [
      { kind: "click", label: "Find Nth Triangular Number" },
      { kind: "fill", label: "Position (n)", value: "7" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["T(7)", "28"] },
  },
  {
    name: "Check 36 is triangular → T(8)=36",
    actions: [
      { kind: "click", label: "Check If Number Is Triangular" },
      { kind: "fill", label: "Number to Check", value: "36" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["triangular", "36"] },
  },
  {
    name: "Generate first 5 triangular numbers",
    actions: [
      { kind: "click", label: "Generate Sequence" },
      { kind: "fill", label: "How Many Terms", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["1", "3", "6", "10", "15"] },
  },
];
