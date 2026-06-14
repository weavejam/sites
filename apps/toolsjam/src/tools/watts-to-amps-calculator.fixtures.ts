import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "1200W at 120V and 0.95 PF",
    actions: [
      { kind: "fill", label: "Power (Watts)", value: "1200" },
      { kind: "fill", label: "Voltage (Volts)", value: "120" },
      { kind: "fill", label: "Power Factor", value: "0.95" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "10.526316", "I = P ÷ (V × PF)"] },
  },
  {
    name: "2000W at 240V resistive load",
    actions: [
      { kind: "fill", label: "Power (Watts)", value: "2000" },
      { kind: "fill", label: "Voltage (Volts)", value: "240" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["8.333333", "I = P ÷ V"] },
  },
];
