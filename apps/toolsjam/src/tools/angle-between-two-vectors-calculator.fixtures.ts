import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2D perpendicular vectors (1,0) and (0,1) → 90°",
    actions: [
      { kind: "click", label: "2D Vectors" },
      { kind: "fill", label: "Ax", value: "1" },
      { kind: "fill", label: "Ay", value: "0" },
      { kind: "fill", label: "Bx", value: "0" },
      { kind: "fill", label: "By", value: "1" },
      { kind: "click", label: "Calculate Angle" },
    ],
    expect: { text: ["90", "Dot Product"] },
  },
  {
    name: "2D vectors (3,4) and (4,3) → ~16.26°",
    actions: [
      { kind: "click", label: "2D Vectors" },
      { kind: "fill", label: "Ax", value: "3" },
      { kind: "fill", label: "Ay", value: "4" },
      { kind: "fill", label: "Bx", value: "4" },
      { kind: "fill", label: "By", value: "3" },
      { kind: "click", label: "Calculate Angle" },
    ],
    expect: { text: ["Angle (Degrees)", "Dot Product"] },
  },
  {
    name: "3D perpendicular vectors → 90°",
    actions: [
      { kind: "click", label: "3D Vectors" },
      { kind: "fill", label: "Ax", value: "1" },
      { kind: "fill", label: "Ay", value: "0" },
      { kind: "fill", label: "Az", value: "0" },
      { kind: "fill", label: "Bx", value: "0" },
      { kind: "fill", label: "By", value: "1" },
      { kind: "fill", label: "Bz", value: "0" },
      { kind: "click", label: "Calculate Angle" },
    ],
    expect: { text: ["90", "Angle (Radians)"] },
  },
];
