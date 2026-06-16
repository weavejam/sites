import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Sag: a=10, x=5 → ~1.276",
    actions: [
      { kind: "click", label: "Sag Height" },
      { kind: "fill", label: "Parameter a", value: "10" },
      { kind: "fill", label: "Position x", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1.276"] },
  },
  {
    name: "Arc length: a=10, x=10 → ~11.752",
    actions: [
      { kind: "click", label: "Arc Length" },
      { kind: "fill", label: "Parameter a", value: "10" },
      { kind: "fill", label: "Position x", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "11.75"] },
  },
  {
    name: "Slope: a=10, x=0 → 0",
    actions: [
      { kind: "click", label: "Slope" },
      { kind: "fill", label: "Parameter a", value: "10" },
      { kind: "fill", label: "Position x", value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0"] },
  },
];
