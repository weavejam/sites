import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "30 degrees — all formulas",
    actions: [
      { kind: "fill", label: "Angle (x)", value: "30" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Double Angle Formula Results", "sin(2x)", "cos(2x)"] },
  },
  {
    name: "45 degrees — tan undefined",
    actions: [
      { kind: "fill", label: "Angle (x)", value: "45" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Double Angle Formula Results", "Undefined"] },
  },
];
