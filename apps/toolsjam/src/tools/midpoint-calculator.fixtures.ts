import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Midpoint of (2,4) and (8,10) → (5, 7)",
    actions: [
      { kind: "click", label: "2D (x, y)" },
      { kind: "fill", label: "X₁", value: "2" },
      { kind: "fill", label: "Y₁", value: "4" },
      { kind: "fill", label: "X₂", value: "8" },
      { kind: "fill", label: "Y₂", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Midpoint", "(5, 7)"] },
  },
  {
    name: "Midpoint of (-4,2) and (6,-8) → (1, -3)",
    actions: [
      { kind: "click", label: "2D (x, y)" },
      { kind: "fill", label: "X₁", value: "-4" },
      { kind: "fill", label: "Y₁", value: "2" },
      { kind: "fill", label: "X₂", value: "6" },
      { kind: "fill", label: "Y₂", value: "-8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Midpoint", "(1, -3)"] },
  },
  {
    name: "3D midpoint of (1,2,3) and (5,8,7) → (3, 5, 5)",
    actions: [
      { kind: "click", label: "3D (x, y, z)" },
      { kind: "fill", label: "X₁", value: "1" },
      { kind: "fill", label: "Y₁", value: "2" },
      { kind: "fill", label: "Z₁", value: "3" },
      { kind: "fill", label: "X₂", value: "5" },
      { kind: "fill", label: "Y₂", value: "8" },
      { kind: "fill", label: "Z₂", value: "7" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Midpoint", "(3, 5, 5)"] },
  },
];
