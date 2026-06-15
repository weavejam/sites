import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Standard circle at origin: center (0,0) r=5 point (3,4)",
    actions: [
      { kind: "fill", label: "Circle Center X (h)", value: "0" },
      { kind: "fill", label: "Circle Center Y (k)", value: "0" },
      { kind: "fill", label: "Radius (r)", value: "5" },
      { kind: "fill", label: "Point on Circle X (x₁)", value: "3" },
      { kind: "fill", label: "Point on Circle Y (y₁)", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Calculation Results", "3x"] },
  },
  {
    name: "Offset circle: center (2,-1) r=10 point (8,7)",
    actions: [
      { kind: "fill", label: "Circle Center X (h)", value: "2" },
      { kind: "fill", label: "Circle Center Y (k)", value: "-1" },
      { kind: "fill", label: "Radius (r)", value: "10" },
      { kind: "fill", label: "Point on Circle X (x₁)", value: "8" },
      { kind: "fill", label: "Point on Circle Y (y₁)", value: "7" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: "Calculation Results" },
  },
  {
    name: "Horizontal tangent: center (1,1) r=3 top point (1,4)",
    actions: [
      { kind: "fill", label: "Circle Center X (h)", value: "1" },
      { kind: "fill", label: "Circle Center Y (k)", value: "1" },
      { kind: "fill", label: "Radius (r)", value: "3" },
      { kind: "fill", label: "Point on Circle X (x₁)", value: "1" },
      { kind: "fill", label: "Point on Circle Y (y₁)", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Calculation Results", "y = 4"] },
  },
];
