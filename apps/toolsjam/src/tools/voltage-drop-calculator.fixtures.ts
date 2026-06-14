import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Residential 15A, 120V, 50m, 1.83Ω/km, PF=1",
    actions: [
      { kind: "fill", label: "Current (A)", value: "15" },
      { kind: "fill", label: "Source Voltage (V)", value: "120" },
      { kind: "fill", label: "Wire Length (m)", value: "50" },
      { kind: "fill", label: "Wire Resistance (Ω/km)", value: "1.83" },
      { kind: "fill", label: "Power Factor", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "2.745"] },
  },
  {
    name: "Industrial 30A, 480V, 100m, 0.727Ω/km, PF=0.85",
    actions: [
      { kind: "fill", label: "Current (A)", value: "30" },
      { kind: "fill", label: "Source Voltage (V)", value: "480" },
      { kind: "fill", label: "Wire Length (m)", value: "100" },
      { kind: "fill", label: "Wire Resistance (Ω/km)", value: "0.727" },
      { kind: "fill", label: "Power Factor", value: "0.85" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "3.7"] },
  },
];
