import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Inner magnetosphere: B=5e-5 T, n=5e11 /m³, proton → ~1,543 km/s",
    actions: [
      { kind: "fill", label: "Magnetic Field Strength (B)", value: "0.00005" },
      { kind: "fill", label: "Plasma Density (n)", value: "5e11" },
      { kind: "fill", label: "Ion Mass (m)", value: "1.6726e-27" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Alfvén Velocity", "m/s"] },
  },
  {
    name: "Solar corona: B=1e-3 T, n=1e15 /m³, proton → ~690 km/s",
    actions: [
      { kind: "fill", label: "Magnetic Field Strength (B)", value: "0.001" },
      { kind: "fill", label: "Plasma Density (n)", value: "1e15" },
      { kind: "fill", label: "Ion Mass (m)", value: "1.6726e-27" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Alfvén Velocity", "km/s"] },
  },
];
