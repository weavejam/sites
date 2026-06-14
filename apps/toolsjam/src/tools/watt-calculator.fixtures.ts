import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "120V and 5A produce 600W",
    actions: [
      { kind: "fill", label: "Voltage (V)", value: "120" },
      { kind: "fill", label: "Current (A)", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "600", "24"] },
  },
  {
    name: "240V and 1500W solve current and resistance",
    actions: [
      { kind: "fill", label: "Voltage (V)", value: "240" },
      { kind: "fill", label: "Power (W)", value: "1500" },
      { kind: "fill", label: "Time (hours)", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["6.25", "38.4", "4,500"] },
  },
];
