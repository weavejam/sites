import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Hot water (90°C, 1kg) cooling in metal container (20°C, 0.5kg Al)",
    actions: [
      { kind: "fill", label: "Object 1 Temperature (°C)", value: "90" },
      { kind: "fill", label: "Object 1 Mass (kg)", value: "1.0" },
      { kind: "fill", label: "Object 1 Specific Heat (J/kg·K)", value: "4200" },
      { kind: "fill", label: "Object 2 Temperature (°C)", value: "20" },
      { kind: "fill", label: "Object 2 Mass (kg)", value: "0.5" },
      { kind: "fill", label: "Object 2 Specific Heat (J/kg·K)", value: "900" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "°C"] },
  },
  {
    name: "Equal masses same material reach average temperature",
    actions: [
      { kind: "fill", label: "Object 1 Temperature (°C)", value: "80" },
      { kind: "fill", label: "Object 1 Mass (kg)", value: "1" },
      { kind: "fill", label: "Object 1 Specific Heat (J/kg·K)", value: "4186" },
      { kind: "fill", label: "Object 2 Temperature (°C)", value: "20" },
      { kind: "fill", label: "Object 2 Mass (kg)", value: "1" },
      { kind: "fill", label: "Object 2 Specific Heat (J/kg·K)", value: "4186" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "50"] },
  },
];
