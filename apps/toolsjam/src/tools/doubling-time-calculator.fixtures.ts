import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "5% annual growth rate — conservative investment",
    actions: [
      { kind: "fill", label: "Growth Rate (%)", value: "5" },
      { kind: "click", label: "Calculate Doubling Time" },
    ],
    expect: { text: ["Doubling Time Results", "Exact Doubling Time", "14"] },
  },
  {
    name: "8% annual growth rate — stock market average",
    actions: [
      { kind: "fill", label: "Growth Rate (%)", value: "8" },
      { kind: "click", label: "Calculate Doubling Time" },
    ],
    expect: { text: ["Doubling Time Results", "Rule of 72 Approximation", "9"] },
  },
];
