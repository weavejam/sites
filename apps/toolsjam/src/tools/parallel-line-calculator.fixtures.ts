import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Slope-intercept y=2x+3 through (1,7) → y=2x+5",
    actions: [
      { kind: "click", label: "Slope-Intercept (y = mx + b)" },
      { kind: "fill", label: "Slope (m)", value: "2" },
      { kind: "fill", label: "Y-Intercept (b)", value: "3" },
      { kind: "fill", label: "Point P (x)", value: "1" },
      { kind: "fill", label: "Point P (y)", value: "7" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "y = 2x + 5"] },
  },
  {
    name: "Standard form 4x+2y=6 through (-2,5) → y=-2x+1",
    actions: [
      { kind: "click", label: "Standard Form (Ax + By = C)" },
      { kind: "fill", label: "Coefficient A", value: "4" },
      { kind: "fill", label: "Coefficient B", value: "2" },
      { kind: "fill", label: "Coefficient C", value: "6" },
      { kind: "fill", label: "Point P (x)", value: "-2" },
      { kind: "fill", label: "Point P (y)", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "y = -2x + 1"] },
  },
];
