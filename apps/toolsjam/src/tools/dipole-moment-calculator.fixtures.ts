import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Elementary charge dipole: 1.602e-19 C, 1e-10 m, 0° → ~4.803 D",
    actions: [
      { kind: "fill", label: "Charge Magnitude (C)", value: "1.602e-19" },
      { kind: "fill", label: "Separation Distance (m)", value: "1e-10" },
      { kind: "fill", label: "Orientation Angle (degrees)", value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "4.803"] },
  },
  {
    name: "Macroscopic dipole: 1e-6 C, 1e-3 m, 45°",
    actions: [
      { kind: "fill", label: "Charge Magnitude (C)", value: "1e-6" },
      { kind: "fill", label: "Separation Distance (m)", value: "1e-3" },
      { kind: "fill", label: "Orientation Angle (degrees)", value: "45" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result"] },
  },
  {
    name: "Water molecule model: 1.85e-19 C, 3.85e-11 m, 0°",
    actions: [
      { kind: "fill", label: "Charge Magnitude (C)", value: "1.85e-19" },
      { kind: "fill", label: "Separation Distance (m)", value: "3.85e-11" },
      { kind: "fill", label: "Orientation Angle (degrees)", value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result"] },
  },
];
