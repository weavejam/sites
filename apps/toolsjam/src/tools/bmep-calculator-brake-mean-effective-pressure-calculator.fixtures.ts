import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Economy car engine BMEP",
    actions: [
      { kind: "fill", label: "Torque (Nm)", value: "150" },
      { kind: "fill", label: "Engine Speed (rpm)", value: "4000" },
      { kind: "fill", label: "Engine Displacement (L)", value: "1.6" },
      { kind: "fill", label: "Number of Cylinders", value: "4" },
      { kind: "click", label: "Calculate BMEP" },
    ],
    expect: { text: ["BMEP Results", "BMEP", "Engine Power"] },
  },
  {
    name: "Turbocharged diesel engine BMEP",
    actions: [
      { kind: "fill", label: "Torque (Nm)", value: "450" },
      { kind: "fill", label: "Engine Speed (rpm)", value: "2000" },
      { kind: "fill", label: "Engine Displacement (L)", value: "2.0" },
      { kind: "fill", label: "Number of Cylinders", value: "4" },
      { kind: "click", label: "Calculate BMEP" },
    ],
    expect: { text: ["BMEP Results", "Engine Assessment", "Specific Power Output"] },
  },
];
