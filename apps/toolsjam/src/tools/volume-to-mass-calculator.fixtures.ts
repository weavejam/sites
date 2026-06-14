import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "0.001 m³ of water at 1000 kg/m³ → 1 kg",
    actions: [
      { kind: "fill", label: "Volume", value: "0.001" },
      { kind: "fill", label: "Density", value: "1000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1"] },
  },
  {
    name: "0.1 m³ of aluminum at 2700 kg/m³ → 270 kg",
    actions: [
      { kind: "fill", label: "Volume", value: "0.1" },
      { kind: "fill", label: "Density", value: "2700" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "270"] },
  },
  {
    name: "1 m³ of steel at 7850 kg/m³ → 7850 kg",
    actions: [
      { kind: "fill", label: "Volume", value: "1" },
      { kind: "fill", label: "Density", value: "7850" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "7,850"] },
  },
];
