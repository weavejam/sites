import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2.5 ft³, 35 Hz, 4 inch, 1 port → positive length",
    actions: [
      { kind: "fill", label: "Box Volume (ft³)", value: "2.5" },
      { kind: "fill", label: "Tuning Frequency (Hz)", value: "35" },
      { kind: "fill", label: "Port Diameter (inches)", value: "4" },
      { kind: "fill", label: "Number of Ports", value: "1" },
      { kind: "fill", label: "End Correction Factor", value: "0.732" },
      { kind: "click", label: "Calculate Port Length" },
    ],
    expect: { text: ["Port Length Results", "Port Length (inches)", "Port Length (cm)"] },
  },
  {
    name: "4.0 ft³, 28 Hz, 6 inch, 2 ports → positive length",
    actions: [
      { kind: "fill", label: "Box Volume (ft³)", value: "4" },
      { kind: "fill", label: "Tuning Frequency (Hz)", value: "28" },
      { kind: "fill", label: "Port Diameter (inches)", value: "6" },
      { kind: "fill", label: "Number of Ports", value: "2" },
      { kind: "fill", label: "End Correction Factor", value: "0.732" },
      { kind: "click", label: "Calculate Port Length" },
    ],
    expect: { text: ["Port Length Results", "Port Length (inches)", "Port Cross-Section Area"] },
  },
];
