import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2×2 identity matrix decomposes to itself",
    actions: [
      { kind: "click", label: "2×2" },
      { kind: "fill", label: "(1,1)", value: "1" },
      { kind: "fill", label: "(1,2)", value: "0" },
      { kind: "fill", label: "(2,1)", value: "0" },
      { kind: "fill", label: "(2,2)", value: "1" },
      { kind: "click", label: "Calculate Decomposition" },
    ],
    expect: { text: ["Cholesky Factor L", "1"] },
  },
  {
    name: "2×2 SPD matrix [[4,2],[2,3]]",
    actions: [
      { kind: "click", label: "2×2" },
      { kind: "fill", label: "(1,1)", value: "4" },
      { kind: "fill", label: "(1,2)", value: "2" },
      { kind: "fill", label: "(2,1)", value: "2" },
      { kind: "fill", label: "(2,2)", value: "3" },
      { kind: "click", label: "Calculate Decomposition" },
    ],
    expect: { text: ["Cholesky Factor L", "2", "1"] },
  },
];
