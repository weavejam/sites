import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Proton in 50kV/m field: q=1.602e-19, E=50000, m=1.673e-27, v0=0, d=0.05 → positive acceleration",
    actions: [
      { kind: "fill", label: "Particle Charge (C)", value: "1.602e-19" },
      { kind: "fill", label: "Electric Field Strength (N/C)", value: "50000" },
      { kind: "fill", label: "Particle Mass (kg)", value: "1.673e-27" },
      { kind: "fill", label: "Initial Velocity (m/s)", value: "0" },
      { kind: "fill", label: "Distance Traveled (m)", value: "0.05" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Electric Force (F)", "Acceleration (a)"] },
  },
  {
    name: "Alpha particle: q=3.204e-19, E=5000, m=6.64e-27, v0=0, d=0.01",
    actions: [
      { kind: "fill", label: "Particle Charge (C)", value: "3.204e-19" },
      { kind: "fill", label: "Electric Field Strength (N/C)", value: "5000" },
      { kind: "fill", label: "Particle Mass (kg)", value: "6.64e-27" },
      { kind: "fill", label: "Initial Velocity (m/s)", value: "0" },
      { kind: "fill", label: "Distance Traveled (m)", value: "0.01" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Kinetic Energy Gained"] },
  },
];
