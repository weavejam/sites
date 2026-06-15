import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "24000 BTU/hr → 2 tons",
    actions: [
      { kind: "click", label: "BTU per Hour" },
      { kind: "fill", label: "BTU Value", value: "24000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Conversion Result", "2"] },
  },
  {
    name: "60000 BTU/hr → 5 tons",
    actions: [
      { kind: "click", label: "BTU per Hour" },
      { kind: "fill", label: "BTU Value", value: "60000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Conversion Result", "5"] },
  },
  {
    name: "36000 Total BTU → 3 ton-hours",
    actions: [
      { kind: "click", label: "Total BTU" },
      { kind: "fill", label: "BTU Value", value: "36000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Conversion Result", "3"] },
  },
];
