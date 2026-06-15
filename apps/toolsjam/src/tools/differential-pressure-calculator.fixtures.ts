import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Control valve pressure drop: 150000 Pa upstream, 120000 Pa downstream",
    actions: [
      { kind: "fill", label: "Upstream Pressure (Pa)", value: "150000" },
      { kind: "fill", label: "Downstream Pressure (Pa)", value: "120000" },
      { kind: "fill", label: "Fluid Density (kg/m³)", value: "1000" },
      { kind: "fill", label: "Flow Velocity (m/s)", value: "3.0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "30,000"] },
  },
  {
    name: "HVAC air filter: 101325 Pa upstream, 100000 Pa downstream",
    actions: [
      { kind: "fill", label: "Upstream Pressure (Pa)", value: "101325" },
      { kind: "fill", label: "Downstream Pressure (Pa)", value: "100000" },
      { kind: "fill", label: "Fluid Density (kg/m³)", value: "1.225" },
      { kind: "fill", label: "Flow Velocity (m/s)", value: "5.0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1,325"] },
  },
  {
    name: "Pipe friction loss: 200000 Pa upstream, 180000 Pa downstream",
    actions: [
      { kind: "fill", label: "Upstream Pressure (Pa)", value: "200000" },
      { kind: "fill", label: "Downstream Pressure (Pa)", value: "180000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "20,000"] },
  },
];
