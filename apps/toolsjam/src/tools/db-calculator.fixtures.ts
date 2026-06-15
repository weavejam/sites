import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Amplifier power gain: 10W → 20W = 3.01 dB",
    actions: [
      { kind: "click", label: "Ratio to dB" },
      { kind: "click", label: "Power (e.g., Watts)" },
      { kind: "fill", label: "Reference Value (X1)", value: "10" },
      { kind: "fill", label: "Measured Value (X2)", value: "20" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "3.0"] },
  },
  {
    name: "Combine two sound sources: 80 dB + 85 dB",
    actions: [
      { kind: "click", label: "Combine dB Values" },
      { kind: "fill", label: "dB Values (comma-separated)", value: "80, 85" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "86"] },
  },
  {
    name: "dB to ratio: −6 dB amplitude",
    actions: [
      { kind: "click", label: "dB to Ratio" },
      { kind: "click", label: "Amplitude (e.g., Volts)" },
      { kind: "fill", label: "dB Value", value: "-6" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0.5"] },
  },
];
