import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Dry sand preset → angle ≈ 34.6°",
    actions: [
      { kind: "click", label: "Load dry sand" },
    ],
    expect: { text: ["Angle of Repose", "°"] },
  },
  {
    name: "Custom: μ=0.55, size=25mm, moisture=8% → ≈30°",
    actions: [
      { kind: "fill", label: "Internal Friction Coefficient (μ)", value: "0.55" },
      { kind: "fill", label: "Average Particle Size (mm)", value: "25" },
      { kind: "fill", label: "Moisture Content (%)", value: "8" },
      { kind: "fill", label: "Bulk Density (kg/m³)", value: "1200" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Angle of Repose", "°"] },
  },
  {
    name: "Load limestone preset → angle ≈ 34.7°",
    actions: [
      { kind: "click", label: "Load limestone" },
    ],
    expect: { text: ["Angle of Repose", "°"] },
  },
];
