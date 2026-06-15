import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "E-cylinder 680L at 1500/2000 PSI, 2 L/min → 255 min",
    actions: [
      { kind: "fill", label: "Tank Capacity (L)", value: "680" },
      { kind: "fill", label: "Current Pressure (PSI)", value: "1500" },
      { kind: "fill", label: "Rated / Full Pressure (PSI)", value: "2000" },
      { kind: "fill", label: "Flow Rate (L/min)", value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["255"] },
  },
  {
    name: "Full E-cylinder 680L at 2000 PSI, 4 L/min → 170 min",
    actions: [
      { kind: "fill", label: "Tank Capacity (L)", value: "680" },
      { kind: "fill", label: "Current Pressure (PSI)", value: "2000" },
      { kind: "fill", label: "Rated / Full Pressure (PSI)", value: "2000" },
      { kind: "fill", label: "Flow Rate (L/min)", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["170"] },
  },
];
