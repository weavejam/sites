import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Spaceship at 10% c for 1 hour: dilated time ≈ 3618s",
    actions: [
      { kind: "fill", label: "Velocity (m/s)", value: "29979245.8" },
      { kind: "fill", label: "Proper Time t₀ (s)", value: "3600" },
      { kind: "fill", label: "Speed of Light c (m/s)", value: "299792458" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Lorentz Factor (γ)", "Dilated Time (t′)"] },
  },
  {
    name: "GPS satellite one day: v=3874m/s, t0=86400s",
    actions: [
      { kind: "fill", label: "Velocity (m/s)", value: "3874" },
      { kind: "fill", label: "Proper Time t₀ (s)", value: "86400" },
      { kind: "fill", label: "Speed of Light c (m/s)", value: "299792458" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Lorentz Factor (γ)", "Dilated Time (t′)", "Time Difference"] },
  },
];
