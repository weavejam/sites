import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "WF5, 4.3 ly, 1000t, 85% → ~214c, ~7.3 days",
    actions: [
      { kind: "fill", label: "Warp Factor", value: "5" },
      { kind: "fill", label: "Distance (Light Years)", value: "4.3" },
      { kind: "fill", label: "Ship Mass (Metric Tons)", value: "1000" },
      { kind: "fill", label: "Energy Efficiency (%)", value: "85" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Warp Speed Results", "Travel Time"] },
  },
  {
    name: "WF9, 100 ly, 500t, 90%",
    actions: [
      { kind: "fill", label: "Warp Factor", value: "9" },
      { kind: "fill", label: "Distance (Light Years)", value: "100" },
      { kind: "fill", label: "Ship Mass (Metric Tons)", value: "500" },
      { kind: "fill", label: "Energy Efficiency (%)", value: "90" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Warp Speed Results", "Energy Required"] },
  },
];

