import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "LED circuit: V and I → R and P",
    actions: [
      { kind: "fill", label: "Voltage (V)", value: "5" },
      { kind: "fill", label: "Current (I)", value: "0.02" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "250", "0.1"] },
  },
  {
    name: "Resistor: V and R → I and P",
    actions: [
      { kind: "fill", label: "Voltage (V)", value: "12" },
      { kind: "fill", label: "Resistance (R)", value: "100" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["0.12", "1.44"] },
  },
];
