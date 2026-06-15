import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Multiply 2×2 matrix by scalar 3",
    actions: [
      { kind: "fill", label: "Scalar", value: "3" },
      { kind: "fill", label: "Matrix", value: "1,2;3,4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "3", "6", "9", "12"] },
  },
  {
    name: "Multiply 2×2 matrix by scalar −1 (negation)",
    actions: [
      { kind: "fill", label: "Scalar", value: "-1" },
      { kind: "fill", label: "Matrix", value: "5,3;2,8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "-5", "-3", "-2", "-8"] },
  },
  {
    name: "Multiply identity matrix by scalar 2",
    actions: [
      { kind: "fill", label: "Scalar", value: "2" },
      { kind: "fill", label: "Matrix", value: "1,0;0,1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "2", "0"] },
  },
];
