import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Unit circle at origin → x² + y² = 1",
    actions: [
      { kind: "fill", label: "Center X-coordinate (h)", value: "0" },
      { kind: "fill", label: "Center Y-coordinate (k)", value: "0" },
      { kind: "fill", label: "Radius (r)", value: "1" },
      { kind: "click", label: "Calculate Equation" },
    ],
    expect: { text: ["Result", "x² + y² = 1"] },
  },
  {
    name: "Center (3, 4) radius 5",
    actions: [
      { kind: "fill", label: "Center X-coordinate (h)", value: "3" },
      { kind: "fill", label: "Center Y-coordinate (k)", value: "4" },
      { kind: "fill", label: "Radius (r)", value: "5" },
      { kind: "click", label: "Calculate Equation" },
    ],
    expect: { text: ["Result", "Standard Form"] },
  },
  {
    name: "Negative center (-2, -3) radius 6",
    actions: [
      { kind: "fill", label: "Center X-coordinate (h)", value: "-2" },
      { kind: "fill", label: "Center Y-coordinate (k)", value: "-3" },
      { kind: "fill", label: "Radius (r)", value: "6" },
      { kind: "click", label: "Calculate Equation" },
    ],
    expect: { text: ["Result", "General Form"] },
  },
];
