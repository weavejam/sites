import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2D dot product (3,4)·(1,2)",
    actions: [
      { kind: "fill", label: "a — X", value: "3" },
      { kind: "fill", label: "a — Y", value: "4" },
      { kind: "fill", label: "b — X", value: "1" },
      { kind: "fill", label: "b — Y", value: "2" },
      { kind: "click", label: "Calculate Dot Product" },
    ],
    expect: { text: ["Dot Product Result", "11"] },
  },
  {
    name: "Perpendicular 2D vectors — dot product zero",
    actions: [
      { kind: "fill", label: "a — X", value: "1" },
      { kind: "fill", label: "a — Y", value: "0" },
      { kind: "fill", label: "b — X", value: "0" },
      { kind: "fill", label: "b — Y", value: "1" },
      { kind: "click", label: "Calculate Dot Product" },
    ],
    expect: { text: ["Dot Product Result", "0"] },
  },
];
