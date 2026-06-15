import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2D orthonormalization: (1,0) and (1,1)",
    actions: [
      { kind: "fill", label: "Input Vectors", value: "1, 0\n1, 1" },
      { kind: "click", label: "Calculate Basis" },
    ],
    expect: { text: ["Results", "Orthonormal Basis"] },
  },
  {
    name: "3D orthonormalization: three independent vectors",
    actions: [
      { kind: "fill", label: "Input Vectors", value: "1, 1, 0\n1, 0, 1\n0, 1, 1" },
      { kind: "click", label: "Calculate Basis" },
    ],
    expect: { text: ["Results", "Orthogonal Basis", "Orthonormal Basis"] },
  },
];
