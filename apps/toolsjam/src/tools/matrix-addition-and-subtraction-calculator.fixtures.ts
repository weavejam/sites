import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Add two 2×2 matrices",
    actions: [
      { kind: "click", label: "Addition" },
      { kind: "fill", label: "Matrix A", value: "1,2;3,4" },
      { kind: "fill", label: "Matrix B", value: "5,6;7,8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "6", "8", "10", "12"] },
  },
  {
    name: "Subtract two 2×2 matrices",
    actions: [
      { kind: "click", label: "Subtraction" },
      { kind: "fill", label: "Matrix A", value: "5,6;7,8" },
      { kind: "fill", label: "Matrix B", value: "1,2;3,4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "4"] },
  },
  {
    name: "Add 3×3 matrices",
    actions: [
      { kind: "click", label: "Addition" },
      { kind: "fill", label: "Matrix A", value: "1,0,0;0,1,0;0,0,1" },
      { kind: "fill", label: "Matrix B", value: "0,1,2;3,4,5;6,7,8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1"] },
  },
];
