import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "1.5 V AA battery → 1.5 eV",
    actions: [
      { kind: "fill", label: "Voltage (V)", value: "1.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1.5"] },
  },
  {
    name: "12 V car battery → 12 eV",
    actions: [
      { kind: "fill", label: "Voltage (V)", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "12"] },
  },
  {
    name: "120 V household outlet → 120 eV",
    actions: [
      { kind: "fill", label: "Voltage (V)", value: "120" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "120"] },
  },
];
