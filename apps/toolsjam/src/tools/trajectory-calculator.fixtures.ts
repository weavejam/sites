import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Cannonball at 30 degrees metric",
    actions: [
      { kind: "click", label: "Metric (m, m/s)" },
      { kind: "fill", label: "Initial Velocity (m/s)", value: "100" },
      { kind: "fill", label: "Launch Angle (°)", value: "30" },
      { kind: "fill", label: "Initial Height (m)", value: "0" },
      { kind: "click", label: "Calculate Trajectory" },
    ],
    expect: { text: ["Trajectory Results", "882", "s"] },
  },
  {
    name: "Golf drive at 15 degrees metric",
    actions: [
      { kind: "click", label: "Metric (m, m/s)" },
      { kind: "fill", label: "Initial Velocity (m/s)", value: "70" },
      { kind: "fill", label: "Launch Angle (°)", value: "15" },
      { kind: "fill", label: "Initial Height (m)", value: "0.05" },
      { kind: "click", label: "Calculate Trajectory" },
    ],
    expect: { text: ["Trajectory Results", "249"] },
  },
];
