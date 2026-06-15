import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Letter grade A with 3 credits → GPA 4.00",
    actions: [
      { kind: "fill", label: "Credit Hours", value: "3" },
      { kind: "click", label: "Calculate Grades" },
    ],
    expect: { text: ["Your GPA", "4.00", "A"] },
  },
  {
    name: "Letter grade B+ with 4 credits → GPA 3.30",
    actions: [
      { kind: "fill", label: "Credit Hours", value: "4" },
      { kind: "click", label: "Calculate Grades" },
    ],
    expect: { text: ["Your GPA", "Total Credit Hours"] },
  },
];
