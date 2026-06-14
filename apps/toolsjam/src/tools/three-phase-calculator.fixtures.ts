import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Industrial motor: V=400V, I=50A, PF=0.85 → S≈34641VA",
    actions: [
      { kind: "fill", label: "Line Voltage (V)", value: "400" },
      { kind: "fill", label: "Line Current (A)", value: "50" },
      { kind: "fill", label: "Power Factor (cos φ)", value: "0.85" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Apparent Power", "Active Power", "Reactive Power"] },
  },
  {
    name: "75kW motor: V=480V, P=75000W, PF=0.95 → I≈94.9A",
    actions: [
      { kind: "fill", label: "Line Voltage (V)", value: "480" },
      { kind: "fill", label: "Active Power (W)", value: "75000" },
      { kind: "fill", label: "Power Factor (cos φ)", value: "0.95" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Apparent Power", "Power Factor"] },
  },
];
