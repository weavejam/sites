import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Solve for angle: v=25 m/s, r=300 m → θ≈11.9°",
    actions: [
      { kind: "click", label: "Banking Angle (θ)" },
      { kind: "fill", label: "Velocity (v)", value: "25" },
      { kind: "fill", label: "Radius of Curve (r)", value: "300" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "°"] },
  },
  {
    name: "Solve for velocity: r=150 m, θ=15° → v≈19.9 m/s",
    actions: [
      { kind: "click", label: "Velocity (v)" },
      { kind: "fill", label: "Radius of Curve (r)", value: "150" },
      { kind: "fill", label: "Banking Angle (θ)", value: "15" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Safe Speed"] },
  },
  {
    name: "Solve for radius: v=50 km/h, θ=12° → r",
    actions: [
      { kind: "click", label: "Radius (r)" },
      { kind: "fill", label: "Velocity (v)", value: "50" },
      { kind: "fill", label: "Banking Angle (θ)", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Curve Radius"] },
  },
];
