import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Single course 88% input → GPA shown",
    actions: [
      { kind: "fill", label: "Grade (% or Letter)", value: "88" },
      { kind: "fill", label: "Credit Hours", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Your GPA (4.0 Scale)"] },
  },
  {
    name: "Single course B+ letter grade → GPA shown",
    actions: [
      { kind: "fill", label: "Grade (% or Letter)", value: "B+" },
      { kind: "fill", label: "Credit Hours", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Your GPA (4.0 Scale)", "Total Credit Hours"] },
  },
];
