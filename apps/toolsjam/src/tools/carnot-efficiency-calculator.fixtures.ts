import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Steam plant: 773K hot, 303K cold → 60.8%",
    actions: [
      { kind: "fill", label: "Hot Reservoir Temperature (K)", value: "773" },
      { kind: "fill", label: "Cold Reservoir Temperature (K)", value: "303" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Carnot Efficiency", "%"] },
  },
  {
    name: "Combustion engine: 2000K hot, 300K cold → 85%",
    actions: [
      { kind: "fill", label: "Hot Reservoir Temperature (K)", value: "2000" },
      { kind: "fill", label: "Cold Reservoir Temperature (K)", value: "300" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Carnot Efficiency", "%"] },
  },
];
