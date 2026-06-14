import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "12V PSU: no-load 12.5V, full-load 11.8V → 5.93% load regulation",
    actions: [
      { kind: "fill", label: "No-Load Voltage (V)", value: "12.5" },
      { kind: "fill", label: "Full-Load Voltage (V)", value: "11.8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "5.9"] },
  },
  {
    name: "5V PSU: no-load 5.1V, full-load 4.85V → 5.15% load regulation",
    actions: [
      { kind: "fill", label: "No-Load Voltage (V)", value: "5.1" },
      { kind: "fill", label: "Full-Load Voltage (V)", value: "4.85" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "5.1"] },
  },
];
