import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Find torque from 15 kW at 1450 RPM",
    actions: [
      { kind: "click", label: "Torque (T)" },
      { kind: "click", label: "kW" },
      { kind: "fill", label: "Power (kW)", value: "15" },
      { kind: "fill", label: "Speed (RPM)", value: "1450" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Torque"] },
  },
  {
    name: "Find speed from 5 kW and 20 Nm",
    actions: [
      { kind: "click", label: "Speed (n)" },
      { kind: "click", label: "kW" },
      { kind: "fill", label: "Power (kW)", value: "5" },
      { kind: "fill", label: "Torque (Nm)", value: "20" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Speed"] },
  },
];
