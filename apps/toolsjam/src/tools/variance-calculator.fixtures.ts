import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Sample test scores -> variance 100.571",
    actions: [
      { kind: "fill", label: "Data (comma or space separated numbers)", value: "85, 92, 78, 88, 95, 81, 74" },
      { kind: "click", label: "Sample" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Variance"] },
  },
  {
    name: "Population ages -> variance 60.25",
    actions: [
      { kind: "fill", label: "Data (comma or space separated numbers)", value: "25, 32, 28, 45, 38, 29, 33, 51" },
      { kind: "click", label: "Population" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Variance", "Mean"] },
  },
];
