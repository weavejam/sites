import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Ferris wheel: velocity method θ = 2.5 rad",
    actions: [
      { kind: "fill", label: /Initial Angular Velocity/i, value: "0" },
      { kind: "fill", label: /Final Angular Velocity/i, value: "0.5" },
      { kind: "fill", label: /Time/i, value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "2.5"] },
  },
  {
    name: "Turbine: acceleration method θ = 25 rad",
    actions: [
      { kind: "click", label: /From Initial Velocity & Acceleration/i },
      { kind: "fill", label: /Initial Angular Velocity/i, value: "0" },
      { kind: "fill", label: /Angular Acceleration/i, value: "2" },
      { kind: "fill", label: /Time/i, value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "25"] },
  },
];
