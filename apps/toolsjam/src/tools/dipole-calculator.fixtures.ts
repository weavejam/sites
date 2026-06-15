import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2-metre VHF dipole: 146.52 MHz, vf=0.95, half-wave",
    actions: [
      { kind: "fill", label: "Frequency (MHz)", value: "146.52" },
      { kind: "fill", label: "Velocity Factor", value: "0.95" },
      { kind: "click", label: "Half-Wave" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0.972"] },
  },
  {
    name: "40-metre HF dipole: 7.074 MHz, vf=0.95, half-wave",
    actions: [
      { kind: "fill", label: "Frequency (MHz)", value: "7.074" },
      { kind: "fill", label: "Velocity Factor", value: "0.95" },
      { kind: "click", label: "Half-Wave" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "20.1"] },
  },
  {
    name: "70cm UHF dipole: 446.0 MHz, vf=0.95, half-wave",
    actions: [
      { kind: "fill", label: "Frequency (MHz)", value: "446.0" },
      { kind: "fill", label: "Velocity Factor", value: "0.95" },
      { kind: "click", label: "Half-Wave" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0.319"] },
  },
];
