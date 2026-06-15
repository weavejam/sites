import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Cartesian (3,4,5) → cylindrical (ρ=5, φ≈53.13°, z=5)",
    actions: [
      { kind: "click", label: "Cartesian → Cylindrical" },
      { kind: "fill", label: "x", value: "3" },
      { kind: "fill", label: "y", value: "4" },
      { kind: "fill", label: "z", value: "5" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Result", "ρ", "5"] },
  },
  {
    name: "Cylindrical (5, 30°, 2) → Cartesian (x≈4.330, y=2.5, z=2)",
    actions: [
      { kind: "click", label: "Cylindrical → Cartesian" },
      { kind: "fill", label: "ρ (radial distance)", value: "5" },
      { kind: "fill", label: "φ (degrees)", value: "30" },
      { kind: "fill", label: "z", value: "2" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Result", "x"] },
  },
];
