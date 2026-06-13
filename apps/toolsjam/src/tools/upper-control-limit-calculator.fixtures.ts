import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "From Data mode → UCL and LCL computed",
    actions: [
      { kind: "click", label: "From Data" },
      { kind: "fill", label: "Data (comma-separated)", value: "10, 11, 9, 12, 10, 11, 10, 9, 12, 11" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["UCL", "LCL", "Mean"] },
  },
  {
    name: "From Summary mode: mean=50, std=5 → UCL=65, LCL=35",
    actions: [
      { kind: "click", label: "From Summary" },
      { kind: "fill", label: /Process Mean/, value: "50" },
      { kind: "fill", label: /Standard Deviation/, value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["UCL", "LCL", "65"] },
  },
];
