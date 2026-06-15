import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "400 DPI × 2.0 sensitivity → 800 eDPI",
    actions: [
      { kind: "fill", label: "Mouse DPI", value: "400" },
      { kind: "fill", label: "In-Game Sensitivity", value: "2.0" },
      { kind: "click", label: "Calculate EDPI" },
    ],
    expect: { text: ["Result", "800"] },
  },
  {
    name: "800 DPI × 1.5 sensitivity → 1200 eDPI",
    actions: [
      { kind: "fill", label: "Mouse DPI", value: "800" },
      { kind: "fill", label: "In-Game Sensitivity", value: "1.5" },
      { kind: "click", label: "Calculate EDPI" },
    ],
    expect: { text: ["Result", "1200"] },
  },
  {
    name: "1600 DPI × 0.5 sensitivity → 800 eDPI",
    actions: [
      { kind: "fill", label: "Mouse DPI", value: "1600" },
      { kind: "fill", label: "In-Game Sensitivity", value: "0.5" },
      { kind: "click", label: "Calculate EDPI" },
    ],
    expect: { text: ["Result", "800"] },
  },
];
