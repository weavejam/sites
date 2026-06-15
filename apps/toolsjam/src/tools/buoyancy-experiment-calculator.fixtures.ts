import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Wood block floats in water (density ratio < 1)",
    actions: [
      { kind: "fill", label: "Object Mass (kg)", value: "0.3" },
      { kind: "fill", label: "Object Volume (m³)", value: "0.0005" },
      { kind: "fill", label: "Fluid Density (kg/m³)", value: "1000" },
      { kind: "fill", label: "Gravitational Acceleration (m/s²)", value: "9.81" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Experiment Results", "Floats"] },
  },
  {
    name: "Metal sphere sinks in water (density ratio > 1)",
    actions: [
      { kind: "fill", label: "Object Mass (kg)", value: "0.5" },
      { kind: "fill", label: "Object Volume (m³)", value: "0.00005" },
      { kind: "fill", label: "Fluid Density (kg/m³)", value: "1000" },
      { kind: "fill", label: "Gravitational Acceleration (m/s²)", value: "9.81" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Experiment Results", "Sinks"] },
  },
  {
    name: "Object in seawater floats",
    actions: [
      { kind: "fill", label: "Object Mass (kg)", value: "0.4" },
      { kind: "fill", label: "Object Volume (m³)", value: "0.0004" },
      { kind: "fill", label: "Fluid Density (kg/m³)", value: "1025" },
      { kind: "fill", label: "Gravitational Acceleration (m/s²)", value: "9.81" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Experiment Results", "Floats"] },
  },
];
