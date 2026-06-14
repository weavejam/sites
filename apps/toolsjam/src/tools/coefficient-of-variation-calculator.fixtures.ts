import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Stock prices CV ≈ 2.75%",
    actions: [
      { kind: "fill", label: "Data Set", value: "100, 102, 105, 98, 103" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "%"] },
  },
  {
    name: "Manufacturing weights CV < 2%",
    actions: [
      {
        kind: "fill",
        label: "Data Set",
        value: "10.2, 10.1, 9.9, 10.3, 9.8, 10.0",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "%"] },
  },
];
