import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Power gain: 10W in, 20W out = 3.01 dB",
    actions: [
      { kind: "click", label: "Calculate dB Gain" },
      { kind: "click", label: "Power (W, mW, etc.)" },
      { kind: "fill", label: "Input Value", value: "10" },
      { kind: "fill", label: "Output Value", value: "20" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "3.0"] },
  },
  {
    name: "Calculate output voltage: 1V in, 6 dB gain = 2V out",
    actions: [
      { kind: "click", label: "Calculate Output Value" },
      { kind: "click", label: "Voltage (V, mV, etc.)" },
      { kind: "fill", label: "Input Value", value: "1" },
      { kind: "fill", label: "Gain (dB)", value: "6" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "2"] },
  },
  {
    name: "Find input power: 100W out, 20 dB gain = 1W in",
    actions: [
      { kind: "click", label: "Calculate Input Value" },
      { kind: "click", label: "Power (W, mW, etc.)" },
      { kind: "fill", label: "Output Value", value: "100" },
      { kind: "fill", label: "Gain (dB)", value: "20" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1"] },
  },
];
