import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Standard voltage divider bias NPN",
    actions: [
      { kind: "fill", label: "Supply Voltage Vcc (V)", value: "12" },
      { kind: "fill", label: "Base Resistor R1 (Ω)", value: "22000" },
      { kind: "fill", label: "Base Resistor R2 (Ω)", value: "4700" },
      { kind: "fill", label: "Collector Resistor Rc (Ω)", value: "2200" },
      { kind: "fill", label: "Emitter Resistor Re (Ω)", value: "1000" },
      { kind: "fill", label: "Load Resistor RL (Ω)", value: "10000" },
      { kind: "fill", label: "Current Gain β (hFE)", value: "100" },
      { kind: "fill", label: "Base-Emitter Voltage Vbe (V)", value: "0.7" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["DC Operating Point", "mA", "Voltage Gain"] },
  },
  {
    name: "High-gain amplifier NPN at 15V",
    actions: [
      { kind: "fill", label: "Supply Voltage Vcc (V)", value: "15" },
      { kind: "fill", label: "Base Resistor R1 (Ω)", value: "15000" },
      { kind: "fill", label: "Base Resistor R2 (Ω)", value: "3000" },
      { kind: "fill", label: "Collector Resistor Rc (Ω)", value: "3300" },
      { kind: "fill", label: "Emitter Resistor Re (Ω)", value: "500" },
      { kind: "fill", label: "Load Resistor RL (Ω)", value: "15000" },
      { kind: "fill", label: "Current Gain β (hFE)", value: "150" },
      { kind: "fill", label: "Base-Emitter Voltage Vbe (V)", value: "0.7" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["DC Operating Point", "mA", "μA"] },
  },
];
