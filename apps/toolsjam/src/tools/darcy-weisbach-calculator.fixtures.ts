import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Water in steel pipe — turbulent flow",
    actions: [
      { kind: "fill", label: "Pipe Diameter (m)", value: "0.1" },
      { kind: "fill", label: "Pipe Length (m)", value: "100" },
      { kind: "fill", label: "Flow Velocity (m/s)", value: "2.5" },
      { kind: "fill", label: "Kinematic Viscosity (m²/s)", value: "1.006e-6" },
      { kind: "fill", label: "Pipe Roughness (mm)", value: "0.045" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Turbulent"] },
  },
  {
    name: "Laminar flow — low velocity small pipe",
    actions: [
      { kind: "fill", label: "Pipe Diameter (m)", value: "0.01" },
      { kind: "fill", label: "Pipe Length (m)", value: "10" },
      { kind: "fill", label: "Flow Velocity (m/s)", value: "0.05" },
      { kind: "fill", label: "Kinematic Viscosity (m²/s)", value: "1.006e-6" },
      { kind: "fill", label: "Pipe Roughness (mm)", value: "0.045" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Laminar"] },
  },
];
