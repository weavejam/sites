import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Small PLA print: 50g, $25/kg, 2h, 250W, $0.13/kWh",
    actions: [
      { kind: "click", label: "PLA" },
      { kind: "fill", label: "Filament Weight (grams)", value: "50" },
      { kind: "fill", label: "Filament Price per kg ($)", value: "25" },
      { kind: "fill", label: "Print Time (hours)", value: "2" },
      { kind: "fill", label: "Printer Power Consumption (W)", value: "250" },
      { kind: "fill", label: "Electricity Rate ($/kWh)", value: "0.13" },
      { kind: "click", label: "Calculate Cost" },
    ],
    expect: { text: ["Cost Breakdown", "Total Cost"] },
  },
  {
    name: "Large ABS print: 500g, $30/kg, 15h, 350W, $0.12/kWh with labor",
    actions: [
      { kind: "click", label: "ABS" },
      { kind: "fill", label: "Filament Weight (grams)", value: "500" },
      { kind: "fill", label: "Filament Price per kg ($)", value: "30" },
      { kind: "fill", label: "Print Time (hours)", value: "15" },
      { kind: "fill", label: "Printer Power Consumption (W)", value: "350" },
      { kind: "fill", label: "Electricity Rate ($/kWh)", value: "0.12" },
      { kind: "fill", label: "Labor Rate ($/hour)", value: "20" },
      { kind: "fill", label: "Setup Time (hours)", value: "1" },
      { kind: "click", label: "Calculate Cost" },
    ],
    expect: { text: ["Cost Breakdown", "Total Cost", "Labor Cost"] },
  },
];
