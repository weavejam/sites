import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Multiply two 2×2 matrices",
    actions: [
      { kind: "fill", label: "Matrix A", value: "1,2;3,4" },
      { kind: "fill", label: "Matrix B", value: "2,0;1,2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Product A × B", "4", "10", "8"] },
  },
  {
    name: "Multiply 1×3 row vector by 3×1 column vector (dot product)",
    actions: [
      { kind: "fill", label: "Matrix A", value: "1,2,3" },
      { kind: "fill", label: "Matrix B", value: "4;5;6" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Product A × B", "32"] },
  },
  {
    name: "Multiply by identity matrix",
    actions: [
      { kind: "fill", label: "Matrix A", value: "7,3;2,8" },
      { kind: "fill", label: "Matrix B", value: "1,0;0,1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Product A × B", "7", "3", "2", "8"] },
  },
];
