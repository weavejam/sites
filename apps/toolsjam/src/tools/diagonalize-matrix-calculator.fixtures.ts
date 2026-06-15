import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2x2 diagonalizable matrix [[3,1],[0,2]]",
    actions: [
      { kind: "fill", label: "Matrix (rows separated by semicolons)", value: "3,1;0,2" },
      { kind: "click", label: "Diagonalize" },
    ],
    expect: { text: ["Diagonalization Result", "Eigenvalues"] },
  },
  {
    name: "2x2 symmetric matrix [[2,1],[1,2]]",
    actions: [
      { kind: "fill", label: "Matrix (rows separated by semicolons)", value: "2,1;1,2" },
      { kind: "click", label: "Diagonalize" },
    ],
    expect: { text: ["Diagonalization Result", "Eigenvalues", "3"] },
  },
  {
    name: "2x2 defective matrix [[4,1],[0,4]] → not diagonalizable",
    actions: [
      { kind: "fill", label: "Matrix (rows separated by semicolons)", value: "4,1;0,4" },
      { kind: "click", label: "Diagonalize" },
    ],
    expect: { text: ["not diagonalizable"] },
  },
];
