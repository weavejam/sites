import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Unit sphere at origin",
    actions: [
      { kind: "fill", label: "Center X (h)", value: "0" },
      { kind: "fill", label: "Center Y (k)", value: "0" },
      { kind: "fill", label: "Center Z (l)", value: "0" },
      { kind: "fill", label: "Radius (r)", value: "1" },
      { kind: "click", label: "Generate Equation" },
    ],
    expect: { text: ["Result", "x² + y² + z² = 1"] },
  },
  {
    name: "Sphere with positive center (2, 3, 1) radius 5",
    actions: [
      { kind: "fill", label: "Center X (h)", value: "2" },
      { kind: "fill", label: "Center Y (k)", value: "3" },
      { kind: "fill", label: "Center Z (l)", value: "1" },
      { kind: "fill", label: "Radius (r)", value: "5" },
      { kind: "click", label: "Generate Equation" },
    ],
    expect: { text: ["Result", "Sphere Equation"] },
  },
  {
    name: "Sphere with mixed coordinates (-1, 2, -3) radius 4",
    actions: [
      { kind: "fill", label: "Center X (h)", value: "-1" },
      { kind: "fill", label: "Center Y (k)", value: "2" },
      { kind: "fill", label: "Center Z (l)", value: "-3" },
      { kind: "fill", label: "Radius (r)", value: "4" },
      { kind: "click", label: "Generate Equation" },
    ],
    expect: { text: ["Result", "Expanded Form"] },
  },
];
