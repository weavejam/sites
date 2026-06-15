import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Distance P1(1,2,3) to P2(4,6,8) ≈ 7.071",
    actions: [
      { kind: "fill", label: "x₁", value: "1" },
      { kind: "fill", label: "y₁", value: "2" },
      { kind: "fill", label: "z₁", value: "3" },
      { kind: "fill", label: "x₂", value: "4" },
      { kind: "fill", label: "y₂", value: "6" },
      { kind: "fill", label: "z₂", value: "8" },
      { kind: "click", label: "Calculate Distance" },
    ],
    expect: { text: ["Distance Result", "7.0"] },
  },
  {
    name: "Distance P1(0,0,0) to P2(3,4,0) = 5",
    actions: [
      { kind: "fill", label: "x₁", value: "0" },
      { kind: "fill", label: "y₁", value: "0" },
      { kind: "fill", label: "z₁", value: "0" },
      { kind: "fill", label: "x₂", value: "3" },
      { kind: "fill", label: "y₂", value: "4" },
      { kind: "fill", label: "z₂", value: "0" },
      { kind: "click", label: "Calculate Distance" },
    ],
    expect: { text: ["Distance Result", "5"] },
  },
  {
    name: "Distance P1(2,3,5) to P2(8,7,1) ≈ 8.246",
    actions: [
      { kind: "fill", label: "x₁", value: "2" },
      { kind: "fill", label: "y₁", value: "3" },
      { kind: "fill", label: "z₁", value: "5" },
      { kind: "fill", label: "x₂", value: "8" },
      { kind: "fill", label: "y₂", value: "7" },
      { kind: "fill", label: "z₂", value: "1" },
      { kind: "click", label: "Calculate Distance" },
    ],
    expect: { text: "Distance Result" },
  },
];
