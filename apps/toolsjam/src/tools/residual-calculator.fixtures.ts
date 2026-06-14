import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Simple linear regression x=1-5, y=2,4,5,4,5",
    actions: [
      { kind: "fill", label: "Independent Values (X)", value: "1, 2, 3, 4, 5" },
      { kind: "fill", label: "Observed Values (Y)", value: "2, 4, 5, 4, 5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Regression Equation"] },
  },
  {
    name: "Perfect linear data x=1-4, y=2,4,6,8",
    actions: [
      { kind: "fill", label: "Independent Values (X)", value: "1, 2, 3, 4" },
      { kind: "fill", label: "Observed Values (Y)", value: "2, 4, 6, 8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Regression Equation"] },
  },
];
