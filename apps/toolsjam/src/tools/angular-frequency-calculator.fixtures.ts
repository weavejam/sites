import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "AC mains 60 Hz → ω ≈ 376.99 rad/s",
    actions: [
      { kind: "fill", label: /Frequency/i, value: "60" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "rad/s"] },
  },
  {
    name: "Earth rotation T=24 h → small ω",
    actions: [
      { kind: "click", label: "From Period" },
      { kind: "fill", label: /Period/i, value: "24" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "rad/s"] },
  },
];
