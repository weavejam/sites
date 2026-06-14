import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Room temperature water at 20C",
    actions: [
      { kind: "fill", label: "Temperature (°C)", value: "20" },
      { kind: "fill", label: "Pressure (bar)", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1.002", "1.003"] },
  },
  {
    name: "Flowing water with Reynolds number",
    actions: [
      { kind: "fill", label: "Temperature (°C)", value: "20" },
      { kind: "fill", label: "Pressure (bar)", value: "1" },
      { kind: "fill", label: "Flow Velocity (m/s)", value: "2" },
      { kind: "fill", label: "Pipe Diameter (m)", value: "0.05" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Reynolds Number", "99,749"] },
  },
];
