import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2x2 matrix [[1,2],[3,4]] singular values",
    actions: [
      { kind: "fill", label: "Matrix Input", value: "1,2\n3,4" },
      { kind: "click", label: "Calculate Singular Values" },
    ],
    expect: { text: "SVD Results" },
  },
  {
    name: "Diagonal matrix [[1,0,0],[0,2,0],[0,0,3]]",
    actions: [
      { kind: "fill", label: "Matrix Input", value: "1,0,0\n0,2,0\n0,0,3" },
      { kind: "click", label: "Calculate Singular Values" },
    ],
    expect: { text: "SVD Results" },
  },
  {
    name: "2x3 matrix [[1,2,3],[4,5,6]]",
    actions: [
      { kind: "fill", label: "Matrix Input", value: "1,2,3\n4,5,6" },
      { kind: "click", label: "Calculate Singular Values" },
    ],
    expect: { text: "SVD Results" },
  },
];
