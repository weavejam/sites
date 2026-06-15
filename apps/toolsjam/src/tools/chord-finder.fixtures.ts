import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Basic circle 60 degrees",
    actions: [
      { kind: "fill", label: "Radius", value: "10" },
      { kind: "fill", label: "Central Angle (degrees)", value: "60" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "10.0000"] },
  },
  {
    name: "Quarter circle 90 degrees",
    actions: [
      { kind: "fill", label: "Radius", value: "5" },
      { kind: "fill", label: "Central Angle (degrees)", value: "90" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "7.0711"] },
  },
];
