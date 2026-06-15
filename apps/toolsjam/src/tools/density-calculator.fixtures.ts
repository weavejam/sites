import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Aluminium block m=270g V=100cm³ → density=2.7 g/cm³",
    actions: [
      { kind: "click", label: "Density" },
      { kind: "fill", label: "Mass", value: "270" },
      { kind: "fill", label: "Volume", value: "100" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Density", "2.7"] },
  },
  {
    name: "Water: m=1000g density=1.0 g/cm³ → Volume=1000 cm³",
    actions: [
      { kind: "click", label: "Volume" },
      { kind: "fill", label: "Mass", value: "1000" },
      { kind: "fill", label: "Density", value: "1.0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Volume"] },
  },
  {
    name: "Lead: V=50cm³ density=11.34 g/cm³ → mass=567 g",
    actions: [
      { kind: "click", label: "Mass" },
      { kind: "fill", label: "Volume", value: "50" },
      { kind: "fill", label: "Density", value: "11.34" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Mass", "567"] },
  },
];
