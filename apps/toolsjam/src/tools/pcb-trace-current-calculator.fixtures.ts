import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "External 10mil 1oz ΔT=10°C → ~1A",
    actions: [
      { kind: "click", label: "External (Outer Layer)" },
      { kind: "fill", label: "Trace Width", value: "10" },
      { kind: "fill", label: "Temperature Rise (ΔT)", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Current Capacity Result", "A"] },
  },
  {
    name: "Internal 50mil 1oz ΔT=20°C → ~2.2A",
    actions: [
      { kind: "click", label: "Internal (Inner Layer)" },
      { kind: "fill", label: "Trace Width", value: "50" },
      { kind: "fill", label: "Temperature Rise (ΔT)", value: "20" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Current Capacity Result", "A"] },
  },
];
