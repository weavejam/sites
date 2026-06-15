import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Single course A grade → GPA 4.00",
    actions: [
      { kind: "fill", label: "Credit Hours", value: "3" },
      { kind: "click", label: "Calculate GPA" },
    ],
    expect: { text: ["Your GPA", "4.00"] },
  },
  {
    name: "Single course B grade → GPA 3.00",
    actions: [
      { kind: "fill", label: "Credit Hours", value: "4" },
      { kind: "click", label: "Calculate GPA" },
    ],
    expect: { text: ["Your GPA", "Total Credit Hours"] },
  },
];
