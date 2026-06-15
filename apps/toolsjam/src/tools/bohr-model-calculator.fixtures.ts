import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Hydrogen ground state Z=1 n=1",
    actions: [
      { kind: "fill", label: "Atomic Number (Z)", value: "1" },
      { kind: "fill", label: "Principal Quantum Number (n)", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "-13.6"] },
  },
  {
    name: "Helium Z=2 n=1",
    actions: [
      { kind: "fill", label: "Atomic Number (Z)", value: "2" },
      { kind: "fill", label: "Principal Quantum Number (n)", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "-54.4"] },
  },
  {
    name: "Hydrogen excited state Z=1 n=2",
    actions: [
      { kind: "fill", label: "Atomic Number (Z)", value: "1" },
      { kind: "fill", label: "Principal Quantum Number (n)", value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "-3.4"] },
  },
];
