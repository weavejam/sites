import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Electric field from charge and distance",
    actions: [
      { kind: "click", label: "Electric field (E)" },
      { kind: "fill", label: "Charge (Q) in coulombs", value: "1e-9" },
      { kind: "fill", label: "Distance (r) in meters", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "8.987552", "Electric potential"] },
  },
  {
    name: "Force between two point charges",
    actions: [
      { kind: "click", label: "Force between charges (F)" },
      { kind: "fill", label: "Charge 1 (Q1) in coulombs", value: "2e-6" },
      { kind: "fill", label: "Charge 2 (Q2) in coulombs", value: "3e-6" },
      { kind: "fill", label: "Distance (r) in meters", value: "0.2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1.348133", "Electrostatic force"] },
  },
];
