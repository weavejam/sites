import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Steel shaft torsional stiffness",
    actions: [
      { kind: "click", label: "Circular" },
      { kind: "fill", label: "Applied Torque (N·m)", value: "1500" },
      { kind: "fill", label: "Twist Angle (rad)", value: "0.05" },
      { kind: "fill", label: "Shear Modulus G (GPa)", value: "80" },
      { kind: "fill", label: "Length (m)", value: "1.5" },
      { kind: "fill", label: "Diameter (m)", value: "0.03" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "N·m/rad", "MPa"] },
  },
  {
    name: "Aluminum shaft torsional stiffness",
    actions: [
      { kind: "click", label: "Circular" },
      { kind: "fill", label: "Applied Torque (N·m)", value: "800" },
      { kind: "fill", label: "Twist Angle (rad)", value: "0.08" },
      { kind: "fill", label: "Shear Modulus G (GPa)", value: "26" },
      { kind: "fill", label: "Length (m)", value: "2.0" },
      { kind: "fill", label: "Diameter (m)", value: "0.04" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "N·m/rad"] },
  },
];
