import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Add two 2×2 matrices",
    actions: [
      { kind: "click", label: "Add" },
      { kind: "fill", label: "Matrix A", value: "1,2;3,4" },
      { kind: "fill", label: "Matrix B", value: "5,6;7,8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "6", "8", "10", "12"] },
  },
  {
    name: "Multiply two 2×2 matrices",
    actions: [
      { kind: "click", label: "Multiply" },
      { kind: "fill", label: "Matrix A", value: "1,2;3,4" },
      { kind: "fill", label: "Matrix B", value: "2,0;1,2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "4", "10", "8"] },
  },
  {
    name: "Transpose a 2×3 matrix",
    actions: [
      { kind: "click", label: "Transpose" },
      { kind: "fill", label: "Matrix A", value: "1,2,3;4,5,6" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1", "4", "2", "5", "3", "6"] },
  },
  {
    name: "Determinant of 2×2 matrix",
    actions: [
      { kind: "click", label: "Determinant" },
      { kind: "fill", label: "Matrix A", value: "3,8;4,6" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "-14"] },
  },
];
