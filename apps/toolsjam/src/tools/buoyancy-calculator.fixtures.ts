import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Wood block floats in water",
    actions: [
      { kind: "fill", label: "Object Mass (kg)", value: "1.2" },
      { kind: "fill", label: "Object Volume (m³)", value: "0.002" },
      { kind: "fill", label: "Fluid Density (kg/m³)", value: "1000" },
      { kind: "fill", label: "Gravitational Acceleration (m/s²)", value: "9.81" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Floats"] },
  },
  {
    name: "Metal sphere sinks in water",
    actions: [
      { kind: "fill", label: "Object Mass (kg)", value: "7.8" },
      { kind: "fill", label: "Object Volume (m³)", value: "0.001" },
      { kind: "fill", label: "Fluid Density (kg/m³)", value: "1000" },
      { kind: "fill", label: "Gravitational Acceleration (m/s²)", value: "9.81" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Sinks"] },
  },
  {
    name: "Ice cube floats in water",
    actions: [
      { kind: "fill", label: "Object Mass (kg)", value: "0.9" },
      { kind: "fill", label: "Object Volume (m³)", value: "0.001" },
      { kind: "fill", label: "Fluid Density (kg/m³)", value: "1000" },
      { kind: "fill", label: "Gravitational Acceleration (m/s²)", value: "9.81" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Floats"] },
  },
];
