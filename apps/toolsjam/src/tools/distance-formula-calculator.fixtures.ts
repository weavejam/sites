import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2D: (0,0) to (3,4) → distance 5",
    actions: [
      { kind: "click", label: "2D (Two Dimensions)" },
      { kind: "fill", label: "X₁", value: "0" },
      { kind: "fill", label: "Y₁", value: "0" },
      { kind: "fill", label: "X₂", value: "3" },
      { kind: "fill", label: "Y₂", value: "4" },
      { kind: "click", label: "Calculate Distance" },
    ],
    expect: { text: ["Result", "Distance", "5"] },
  },
  {
    name: "3D: (0,0,0) to (1,1,1) → distance √3",
    actions: [
      { kind: "click", label: "3D (Three Dimensions)" },
      { kind: "fill", label: "X₁", value: "0" },
      { kind: "fill", label: "Y₁", value: "0" },
      { kind: "fill", label: "Z₁", value: "0" },
      { kind: "fill", label: "X₂", value: "1" },
      { kind: "fill", label: "Y₂", value: "1" },
      { kind: "fill", label: "Z₂", value: "1" },
      { kind: "click", label: "Calculate Distance" },
    ],
    expect: { text: ["Result", "Distance"] },
  },
];
