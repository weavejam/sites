import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "SpaceX Merlin → Isp ≈ 277 s",
    actions: [
      { kind: "fill", label: "Thrust (N)", value: "845000" },
      { kind: "fill", label: "Mass Flow Rate (kg/s)", value: "311" },
      { kind: "fill", label: "Gravitational Acceleration (m/s²)", value: "9.80665" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Specific Impulse"] },
  },
  {
    name: "Saturn V F-1 → Isp ≈ 267 s",
    actions: [
      { kind: "fill", label: "Thrust (N)", value: "6770000" },
      { kind: "fill", label: "Mass Flow Rate (kg/s)", value: "2578" },
      { kind: "fill", label: "Gravitational Acceleration (m/s²)", value: "9.80665" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Specific Impulse"] },
  },
  {
    name: "Ion thruster → Isp ≈ 3125 s",
    actions: [
      { kind: "fill", label: "Thrust (N)", value: "0.092" },
      { kind: "fill", label: "Mass Flow Rate (kg/s)", value: "0.000003" },
      { kind: "fill", label: "Gravitational Acceleration (m/s²)", value: "9.80665" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Effective Exhaust Velocity"] },
  },
];
