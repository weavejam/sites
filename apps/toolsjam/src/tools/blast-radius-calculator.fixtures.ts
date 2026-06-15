import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Military surface burst 100 kg TNT at 50 m",
    actions: [
      { kind: "fill", label: "Explosive Yield (kg TNT)", value: "100" },
      { kind: "fill", label: "Detonation Height (m)", value: "0" },
      { kind: "fill", label: "Distance from Blast (m)", value: "50" },
      { kind: "fill", label: "Safety Factor", value: "1.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Blast Analysis Results", "Peak Overpressure", "Danger Radius (> 34.5 kPa)"] },
  },
  {
    name: "Industrial demolition 500 kg TNT at 100 m",
    actions: [
      { kind: "fill", label: "Explosive Yield (kg TNT)", value: "500" },
      { kind: "fill", label: "Detonation Height (m)", value: "0" },
      { kind: "fill", label: "Distance from Blast (m)", value: "100" },
      { kind: "fill", label: "Safety Factor", value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Blast Analysis Results", "Fireball Radius", "Safe Distance (< 7 kPa)"] },
  },
];
