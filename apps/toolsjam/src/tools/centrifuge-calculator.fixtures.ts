import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Solve RCF: 3000 RPM, 85 mm radius → ~862 × g",
    actions: [
      { kind: "click", label: "RCF (g-force)" },
      { kind: "fill", label: "Speed (RPM)", value: "3000" },
      { kind: "fill", label: "Rotor Radius (mm)", value: "85" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Relative Centrifugal Force", "× g"] },
  },
  {
    name: "Solve RPM: 12000 × g, 85 mm radius → ~11241 RPM",
    actions: [
      { kind: "click", label: "RPM" },
      { kind: "fill", label: "RCF (× g)", value: "12000" },
      { kind: "fill", label: "Rotor Radius (mm)", value: "85" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Speed", "RPM"] },
  },
];
