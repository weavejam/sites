import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Carousel: velocity method α = 0.4 rad/s²",
    actions: [
      { kind: "fill", label: /Initial Angular Velocity/i, value: "0" },
      { kind: "fill", label: /Final Angular Velocity/i, value: "2.0" },
      { kind: "fill", label: /Time/i, value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0.4"] },
  },
  {
    name: "Flywheel: torque method α = 4 rad/s²",
    actions: [
      { kind: "click", label: /From Torque/i },
      { kind: "fill", label: /Torque/i, value: "100" },
      { kind: "fill", label: /Moment of Inertia/i, value: "25" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "4"] },
  },
];
