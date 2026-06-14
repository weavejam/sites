import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Balanced bridge R1=1000 R2=1000 R3=500 Vout=0 Vs=5 → Rx=500",
    actions: [
      { kind: "fill", label: "Resistance R1 (Ω)", value: "1000" },
      { kind: "fill", label: "Resistance R2 (Ω)", value: "1000" },
      { kind: "fill", label: "Resistance R3 (Ω)", value: "500" },
      { kind: "fill", label: "Voltage Ratio (V)", value: "0" },
      { kind: "fill", label: "Supply Voltage (V)", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "500"] },
  },
  {
    name: "Strain gauge R1=120 R2=120 R3=120 Vout=0.05 Vs=5 → Rx≈122",
    actions: [
      { kind: "fill", label: "Resistance R1 (Ω)", value: "120" },
      { kind: "fill", label: "Resistance R2 (Ω)", value: "120" },
      { kind: "fill", label: "Resistance R3 (Ω)", value: "120" },
      { kind: "fill", label: "Voltage Ratio (V)", value: "0.05" },
      { kind: "fill", label: "Supply Voltage (V)", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Rx"] },
  },
];
