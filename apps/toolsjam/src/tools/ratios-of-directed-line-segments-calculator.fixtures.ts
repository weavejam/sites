import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Internal division point",
    actions: [
      { kind: "click", label: "Internal Division" },
      { kind: "fill", label: "x₁ (Point A x-coordinate)", value: "1" },
      { kind: "fill", label: "y₁ (Point A y-coordinate)", value: "2" },
      { kind: "fill", label: "x₂ (Point B x-coordinate)", value: "7" },
      { kind: "fill", label: "y₂ (Point B y-coordinate)", value: "8" },
      { kind: "fill", label: "m (first ratio part)", value: "1" },
      { kind: "fill", label: "n (second ratio part)", value: "2" },
      { kind: "click", label: "Calculate Point" },
    ],
    expect: { text: ["Result", "Point P = (3, 4)"] },
  },
  {
    name: "External division point",
    actions: [
      { kind: "click", label: "External Division" },
      { kind: "fill", label: "x₁ (Point A x-coordinate)", value: "1" },
      { kind: "fill", label: "y₁ (Point A y-coordinate)", value: "1" },
      { kind: "fill", label: "x₂ (Point B x-coordinate)", value: "7" },
      { kind: "fill", label: "y₂ (Point B y-coordinate)", value: "4" },
      { kind: "fill", label: "m (first ratio part)", value: "2" },
      { kind: "fill", label: "n (second ratio part)", value: "1" },
      { kind: "click", label: "Calculate Point" },
    ],
    expect: { text: "Point P = (13, 7)" },
  },
];
