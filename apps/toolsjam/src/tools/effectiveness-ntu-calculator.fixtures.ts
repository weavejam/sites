import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Shell-and-tube: hot 85→65°C, cold 25→41°C, flows 2.0/2.5, U=450, A=15",
    actions: [
      { kind: "fill", label: "Hot Fluid Inlet Temperature (°C)", value: "85" },
      { kind: "fill", label: "Hot Fluid Outlet Temperature (°C)", value: "65" },
      { kind: "fill", label: "Cold Fluid Inlet Temperature (°C)", value: "25" },
      { kind: "fill", label: "Cold Fluid Outlet Temperature (°C)", value: "41" },
      { kind: "fill", label: "Hot Fluid Mass Flow Rate (kg/s)", value: "2.0" },
      { kind: "fill", label: "Cold Fluid Mass Flow Rate (kg/s)", value: "2.5" },
      { kind: "fill", label: "Overall Heat Transfer Coefficient (W/m²K)", value: "450" },
      { kind: "fill", label: "Heat Transfer Area (m²)", value: "15" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "NTU"] },
  },
  {
    name: "Plate heat exchanger: hot 90→70°C, cold 20→35°C, flows 1.5/2.0, U=800, A=8",
    actions: [
      { kind: "fill", label: "Hot Fluid Inlet Temperature (°C)", value: "90" },
      { kind: "fill", label: "Hot Fluid Outlet Temperature (°C)", value: "70" },
      { kind: "fill", label: "Cold Fluid Inlet Temperature (°C)", value: "20" },
      { kind: "fill", label: "Cold Fluid Outlet Temperature (°C)", value: "35" },
      { kind: "fill", label: "Hot Fluid Mass Flow Rate (kg/s)", value: "1.5" },
      { kind: "fill", label: "Cold Fluid Mass Flow Rate (kg/s)", value: "2.0" },
      { kind: "fill", label: "Overall Heat Transfer Coefficient (W/m²K)", value: "800" },
      { kind: "fill", label: "Heat Transfer Area (m²)", value: "8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Effectiveness"] },
  },
];
