import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Fiberglass insulation: 0.15m thick, k=0.04, 10m², ΔT=25K",
    actions: [
      { kind: "fill", label: "Material Thickness (m)", value: "0.15" },
      { kind: "fill", label: "Thermal Conductivity (W/m·K)", value: "0.04" },
      { kind: "fill", label: "Cross-sectional Area (m²)", value: "10.0" },
      { kind: "fill", label: "Temperature Difference (K)", value: "25" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "K/W"] },
  },
  {
    name: "Steel plate: 0.01m, k=50, 5m², ΔT=100K",
    actions: [
      { kind: "fill", label: "Material Thickness (m)", value: "0.01" },
      { kind: "fill", label: "Thermal Conductivity (W/m·K)", value: "50.0" },
      { kind: "fill", label: "Cross-sectional Area (m²)", value: "5.0" },
      { kind: "fill", label: "Temperature Difference (K)", value: "100" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "2,500,000"] },
  },
];
