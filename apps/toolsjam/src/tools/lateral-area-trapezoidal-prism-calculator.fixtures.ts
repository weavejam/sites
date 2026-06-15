import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Isosceles trapezoid prism: b1=10, b2=6, s1=5, s2=5, H=12 → 312",
    actions: [
      { kind: "fill", label: "Trapezoid Base 1 (b1)", value: "10" },
      { kind: "fill", label: "Trapezoid Base 2 (b2)", value: "6" },
      { kind: "fill", label: "Trapezoid Side 1 (s1)", value: "5" },
      { kind: "fill", label: "Trapezoid Side 2 (s2)", value: "5" },
      { kind: "fill", label: "Prism Height (H)", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Lateral Area Result", "312"] },
  },
  {
    name: "Scalene trapezoid prism: b1=15, b2=10, s1=7, s2=8, H=20 → 800",
    actions: [
      { kind: "fill", label: "Trapezoid Base 1 (b1)", value: "15" },
      { kind: "fill", label: "Trapezoid Base 2 (b2)", value: "10" },
      { kind: "fill", label: "Trapezoid Side 1 (s1)", value: "7" },
      { kind: "fill", label: "Trapezoid Side 2 (s2)", value: "8" },
      { kind: "fill", label: "Prism Height (H)", value: "20" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Lateral Area Result", "800"] },
  },
];
