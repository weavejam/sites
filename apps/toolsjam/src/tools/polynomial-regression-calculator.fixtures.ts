import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Quadratic fit degree 2",
    actions: [
      {
        kind: "fill",
        label: "Data Points (x, y)",
        value: "0,1\n1,2.5\n2,5\n3,8.5\n4,13",
      },
      { kind: "fill", label: "Polynomial Degree", value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "y ="] },
  },
  {
    name: "Linear fit degree 1",
    actions: [
      {
        kind: "fill",
        label: "Data Points (x, y)",
        value: "1,2\n2,4.1\n3,5.9\n4,8.2\n5,10",
      },
      { kind: "fill", label: "Polynomial Degree", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "R²"] },
  },
  {
    name: "Cubic fit degree 3",
    actions: [
      {
        kind: "fill",
        label: "Data Points (x, y)",
        value: "-2,-10\n-1,0\n0,2\n1,4\n2,18",
      },
      { kind: "fill", label: "Polynomial Degree", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "y ="] },
  },
];
