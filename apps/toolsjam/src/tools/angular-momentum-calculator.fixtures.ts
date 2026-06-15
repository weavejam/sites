import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Ball on string: L = 1.8 kg·m²/s",
    actions: [
      { kind: "fill", label: /Mass/i, value: "0.5" },
      { kind: "fill", label: /Velocity/i, value: "3" },
      { kind: "fill", label: /Radius/i, value: "1.2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1.8"] },
  },
  {
    name: "Flywheel rigid body: L = 25 kg·m²/s",
    actions: [
      { kind: "click", label: /Rigid Body/i },
      { kind: "fill", label: /Moment of Inertia/i, value: "2.5" },
      { kind: "fill", label: /Angular Velocity/i, value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "25"] },
  },
];
