import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Determinant of 2×2 matrix — non-zero",
    actions: [
      { kind: "fill", label: "Matrix", value: "1,2;3,4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Determinant", "-2"] },
  },
  {
    name: "Determinant of 3×3 identity matrix — 1",
    actions: [
      { kind: "fill", label: "Matrix", value: "1,0,0;0,1,0;0,0,1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Determinant", "1"] },
  },
  {
    name: "Determinant of 3×3 matrix — singular",
    actions: [
      { kind: "fill", label: "Matrix", value: "1,2,3;4,5,6;7,8,9" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Determinant", "0"] },
  },
];
