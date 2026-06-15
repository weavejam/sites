import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Molecular energy at room temperature",
    actions: [
      { kind: "fill", label: "Energy (E)", value: "2.5e-20" },
      { kind: "fill", label: "Temperature (T)", value: "298" },
      { kind: "fill", label: "Boltzmann Constant (k)", value: "1.381e-23" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Boltzmann Factor"] },
  },
  {
    name: "Vibrational mode at 100 K",
    actions: [
      { kind: "fill", label: "Energy (E)", value: "1.0e-21" },
      { kind: "fill", label: "Temperature (T)", value: "100" },
      { kind: "fill", label: "Boltzmann Constant (k)", value: "1.381e-23" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Boltzmann Factor"] },
  },
  {
    name: "Rotational level at 1000 K",
    actions: [
      { kind: "fill", label: "Energy (E)", value: "5.0e-22" },
      { kind: "fill", label: "Temperature (T)", value: "1000" },
      { kind: "fill", label: "Boltzmann Constant (k)", value: "1.381e-23" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Boltzmann Factor"] },
  },
];
