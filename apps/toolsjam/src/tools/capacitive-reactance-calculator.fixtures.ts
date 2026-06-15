import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "f=60Hz, C=100μF → Xc≈26.53Ω",
    actions: [
      { kind: "fill", label: "Frequency (Hz)", value: "60" },
      { kind: "fill", label: "Capacitance", value: "100" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "26.53"] },
  },
  {
    name: "f=1000Hz, C=10μF → Xc≈15.92Ω",
    actions: [
      { kind: "fill", label: "Frequency (Hz)", value: "1000" },
      { kind: "fill", label: "Capacitance", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "15.92"] },
  },
];
