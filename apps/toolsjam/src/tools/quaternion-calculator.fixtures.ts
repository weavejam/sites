import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Add two quaternions",
    actions: [
      { kind: "click", label: "Addition (q1 + q2)" },
      { kind: "fill", label: "w₁", value: "1" },
      { kind: "fill", label: "x₁", value: "2" },
      { kind: "fill", label: "y₁", value: "3" },
      { kind: "fill", label: "z₁", value: "4" },
      { kind: "fill", label: "w₂", value: "5" },
      { kind: "fill", label: "x₂", value: "6" },
      { kind: "fill", label: "y₂", value: "7" },
      { kind: "fill", label: "z₂", value: "8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "6"] },
  },
  {
    name: "Compute norm of quaternion",
    actions: [
      { kind: "click", label: "Norm (|q1|)" },
      { kind: "fill", label: "w₁", value: "1" },
      { kind: "fill", label: "x₁", value: "1" },
      { kind: "fill", label: "y₁", value: "1" },
      { kind: "fill", label: "z₁", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "2"] },
  },
  {
    name: "Conjugate of quaternion",
    actions: [
      { kind: "click", label: "Conjugate (q1*)" },
      { kind: "fill", label: "w₁", value: "3" },
      { kind: "fill", label: "x₁", value: "-1" },
      { kind: "fill", label: "y₁", value: "2" },
      { kind: "fill", label: "z₁", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: "Result" },
  },
];
