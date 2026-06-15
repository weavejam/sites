import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "LEO insertion m0=1000 mf=300 Ve=3000 → ΔV≈3611 m/s",
    actions: [
      { kind: "fill", label: "Initial Mass (kg)", value: "1000" },
      { kind: "fill", label: "Final Mass (kg)", value: "300" },
      { kind: "fill", label: "Exhaust Velocity (m/s)", value: "3000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Delta-V Results", "3,611"] },
  },
  {
    name: "Small satellite m0=100 mf=95 Ve=2800 → ΔV≈144 m/s",
    actions: [
      { kind: "fill", label: "Initial Mass (kg)", value: "100" },
      { kind: "fill", label: "Final Mass (kg)", value: "95" },
      { kind: "fill", label: "Exhaust Velocity (m/s)", value: "2800" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Delta-V Results", "m/s"] },
  },
  {
    name: "GEO transfer m0=500 mf=200 Ve=3200 → ΔV≈2929 m/s",
    actions: [
      { kind: "fill", label: "Initial Mass (kg)", value: "500" },
      { kind: "fill", label: "Final Mass (kg)", value: "200" },
      { kind: "fill", label: "Exhaust Velocity (m/s)", value: "3200" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Delta-V Results", "Fuel Mass", "Mass Ratio (m₀/mf)"] },
  },
];
