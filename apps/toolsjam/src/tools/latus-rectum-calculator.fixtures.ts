import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Parabola p=2 → latus rectum = 8",
    actions: [
      { kind: "click", label: "Parabola" },
      { kind: "fill", label: "Parameter (p)", value: "2" },
      { kind: "click", label: "Calculate Latus Rectum" },
    ],
    expect: { text: ["Latus Rectum Result", "8"] },
  },
  {
    name: "Ellipse a=5, b=3 → latus rectum = 3.6",
    actions: [
      { kind: "click", label: "Ellipse" },
      { kind: "fill", label: "Semi-major Axis (a)", value: "5" },
      { kind: "fill", label: "Semi-minor Axis (b)", value: "3" },
      { kind: "click", label: "Calculate Latus Rectum" },
    ],
    expect: { text: ["Latus Rectum Result", "3.6"] },
  },
  {
    name: "Hyperbola a=4, b=2 → latus rectum = 2",
    actions: [
      { kind: "click", label: "Hyperbola" },
      { kind: "fill", label: "Semi-major Axis (a)", value: "4" },
      { kind: "fill", label: "Semi-minor Axis (b)", value: "2" },
      { kind: "click", label: "Calculate Latus Rectum" },
    ],
    expect: { text: ["Latus Rectum Result", "2"] },
  },
];
