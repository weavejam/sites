import type { ToolFixture } from "@/tools/fixture";

// The component defaults to: From Unit = kilowatt, To Unit = watt.
// Fixtures only fill the numeric input; no select interaction required.
export const fixtures: ToolFixture[] = [
  {
    name: "1 kW converts to 1000 W (defaults)",
    actions: [
      { kind: "fill", label: "Power Value", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1,000"] },
  },
  {
    name: "2.5 kW converts to 2500 W (defaults)",
    actions: [
      { kind: "fill", label: "Power Value", value: "2.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "2,500"] },
  },
];
