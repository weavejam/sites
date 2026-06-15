import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "[1,2,3] · [4,5,6] = 32",
    actions: [
      { kind: "fill", label: "Vector A", value: "1, 2, 3" },
      { kind: "fill", label: "Vector B", value: "4, 5, 6" },
      { kind: "click", label: "Calculate Sum of Products" },
    ],
    expect: { text: ["Result", "32"] },
  },
  {
    name: "Orthogonal vectors [1,0,-1] · [1,1,1] = 0",
    actions: [
      { kind: "fill", label: "Vector A", value: "1, 0, -1" },
      { kind: "fill", label: "Vector B", value: "1, 1, 1" },
      { kind: "click", label: "Calculate Sum of Products" },
    ],
    expect: { text: ["Result", "0"] },
  },
  {
    name: "Cost example [5,2,10] · [1.5,4,0.75] = 23",
    actions: [
      { kind: "fill", label: "Vector A", value: "5, 2, 10" },
      { kind: "fill", label: "Vector B", value: "1.5, 4, 0.75" },
      { kind: "click", label: "Calculate Sum of Products" },
    ],
    expect: { text: ["Result", "23"] },
  },
];
