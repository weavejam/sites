import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Steel shaft: T=1500, L=1.5, G=80000, d=0.03",
    actions: [
      { kind: "fill", label: /Applied Torque/i, value: "1500" },
      { kind: "fill", label: /Shaft Length/i, value: "1.5" },
      { kind: "fill", label: /Shear Modulus/i, value: "80000" },
      { kind: "fill", label: /Shaft Diameter/i, value: "0.03" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "rad"] },
  },
  {
    name: "Aluminium shaft: T=500, L=1.0, G=26000, d=0.04",
    actions: [
      { kind: "fill", label: /Applied Torque/i, value: "500" },
      { kind: "fill", label: /Shaft Length/i, value: "1.0" },
      { kind: "fill", label: /Shear Modulus/i, value: "26000" },
      { kind: "fill", label: /Shaft Diameter/i, value: "0.04" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "rad"] },
  },
];
