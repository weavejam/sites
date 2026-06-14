import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Sun to Earth travel time → ≈ 498.7 s",
    actions: [
      { kind: "click", label: "Travel Time" },
      { kind: "fill", label: "Distance", value: "149600000" },
      { kind: "fill", label: "Refractive Index (n)", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Travel time"] },
  },
  {
    name: "Distance light travels in 1 second → 299,792,458 m",
    actions: [
      { kind: "click", label: "Travel Distance" },
      { kind: "fill", label: "Time", value: "1" },
      { kind: "fill", label: "Refractive Index (n)", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Distance"] },
  },
  {
    name: "Speed in water (n=1.33) → ≈ 225,407,863 m/s",
    actions: [
      { kind: "click", label: "Speed in Medium" },
      { kind: "fill", label: "Refractive Index (n)", value: "1.33" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Speed in medium"] },
  },
];
