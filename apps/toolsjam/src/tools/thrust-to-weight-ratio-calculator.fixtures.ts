import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Saturn V: Thrust=34500000N, Mass=2300000kg → TWR≈1.53",
    actions: [
      { kind: "fill", label: "Thrust (N)", value: "34500000" },
      { kind: "fill", label: "Mass (kg)", value: "2300000" },
      { kind: "fill", label: "Gravitational Acceleration (m/s²)", value: "9.81" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Thrust-to-Weight Ratio (TWR)", "Can lift off"] },
  },
  {
    name: "Drone: Thrust=40N, Mass=2kg → TWR≈2.04, can lift off",
    actions: [
      { kind: "fill", label: "Thrust (N)", value: "40" },
      { kind: "fill", label: "Mass (kg)", value: "2" },
      { kind: "fill", label: "Gravitational Acceleration (m/s²)", value: "9.81" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Thrust-to-Weight Ratio (TWR)", "Can lift off"] },
  },
];
