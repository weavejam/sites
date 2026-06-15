import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Heating 250g water from 25°C to 100°C → 78375 J",
    actions: [
      { kind: "fill", label: "Mass (g)", value: "250" },
      { kind: "fill", label: "Specific Heat Capacity (J/g°C)", value: "4.18" },
      { kind: "fill", label: "Initial Temperature (°C)", value: "25" },
      { kind: "fill", label: "Final Temperature (°C)", value: "100" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "78,375"] },
  },
  {
    name: "Melting 100g ice at 0°C (Q_latent only) → 33400 J",
    actions: [
      { kind: "fill", label: "Mass (g)", value: "100" },
      { kind: "fill", label: "Specific Heat Capacity (J/g°C)", value: "2.09" },
      { kind: "fill", label: "Initial Temperature (°C)", value: "0" },
      { kind: "fill", label: "Final Temperature (°C)", value: "0" },
      { kind: "fill", label: "Phase Change Heat (J/g) — optional", value: "334" },
      { kind: "fill", label: "Phase Change Mass (g) — optional", value: "100" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "33,400"] },
  },
  {
    name: "Cooling 50g metal from 200°C to 25°C → −3937.5 J",
    actions: [
      { kind: "fill", label: "Mass (g)", value: "50" },
      { kind: "fill", label: "Specific Heat Capacity (J/g°C)", value: "0.45" },
      { kind: "fill", label: "Initial Temperature (°C)", value: "200" },
      { kind: "fill", label: "Final Temperature (°C)", value: "25" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "-3,937.5"] },
  },
];
