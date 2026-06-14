import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Domestic: 200L, 10→60°C, 3kW, 90%, $0.15 → ~4h 18m, $1.94",
    actions: [
      { kind: "fill", label: "Water Volume", value: "200" },
      { kind: "click", label: "L" },
      { kind: "fill", label: "Initial Temperature (°C)", value: "10" },
      { kind: "fill", label: "Target Temperature (°C)", value: "60" },
      { kind: "fill", label: "Heater Power (kW)", value: "3" },
      { kind: "fill", label: "Efficiency (%)", value: "90" },
      { kind: "fill", label: "Energy Cost ($/kWh)", value: "0.15" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Water Heating Results", "Heating Time"] },
  },
  {
    name: "US gallons: 50gal, 15→55°C, 4kW, 95%, $0.12",
    actions: [
      { kind: "fill", label: "Water Volume", value: "50" },
      { kind: "click", label: "gal" },
      { kind: "fill", label: "Initial Temperature (°C)", value: "15" },
      { kind: "fill", label: "Target Temperature (°C)", value: "55" },
      { kind: "fill", label: "Heater Power (kW)", value: "4" },
      { kind: "fill", label: "Efficiency (%)", value: "95" },
      { kind: "fill", label: "Energy Cost ($/kWh)", value: "0.12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Water Heating Results", "Total Cost"] },
  },
];

