import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Billiard ball impact: 30° angle, e=0.9",
    actions: [
      { kind: "fill", label: "Initial Velocity (m/s)", value: "3" },
      { kind: "fill", label: "Velocity Angle (°)", value: "30" },
      { kind: "fill", label: "Surface Angle (°)", value: "0" },
      { kind: "fill", label: "Coefficient of Restitution", value: "0.9" },
      { kind: "fill", label: "Object Mass (kg)", value: "0.17" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Collision Results", "30°", "m/s"] },
  },
  {
    name: "Tennis ball: 15° impact, e=0.75",
    actions: [
      { kind: "fill", label: "Initial Velocity (m/s)", value: "25" },
      { kind: "fill", label: "Velocity Angle (°)", value: "15" },
      { kind: "fill", label: "Surface Angle (°)", value: "0" },
      { kind: "fill", label: "Coefficient of Restitution", value: "0.75" },
      { kind: "fill", label: "Object Mass (kg)", value: "0.057" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Collision Results", "15°"] },
  },
];
