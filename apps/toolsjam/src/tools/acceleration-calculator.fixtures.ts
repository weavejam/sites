import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Free fall: v0=0 m/s, v=39.2 m/s, t=4s → a=9.8 m/s²",
    actions: [
      { kind: "fill", label: "Initial Velocity (v₀)", value: "0" },
      { kind: "fill", label: "Final Velocity (v)", value: "39.2" },
      { kind: "fill", label: "Time (t)", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "9.8"] },
  },
  {
    name: "Sports car: v0=0 m/s, v=26.82 m/s (60mph), t=3s → a≈8.94 m/s²",
    actions: [
      { kind: "fill", label: "Initial Velocity (v₀)", value: "0" },
      { kind: "fill", label: "Final Velocity (v)", value: "26.82" },
      { kind: "fill", label: "Time (t)", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Acceleration (m/s²)", "8.94"] },
  },
];
