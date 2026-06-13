import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Sample test scores -> standard deviation 6.308724",
    actions: [
      { kind: "fill", label: "Data (comma or space separated numbers)", value: "85, 92, 78, 88, 94" },
      { kind: "click", label: "Sample" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Standard Deviation", "6.308724", "Variance", "39.8"] },
  },
  {
    name: "Population employee ages -> standard deviation 6.791351",
    actions: [
      { kind: "fill", label: "Data (comma or space separated numbers)", value: "25, 30, 32, 45, 28, 38, 41" },
      { kind: "click", label: "Population" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Standard Deviation", "6.791351", "Variance", "46.122449"] },
  },
];
