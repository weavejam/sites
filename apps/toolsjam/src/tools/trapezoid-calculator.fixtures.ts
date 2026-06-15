import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Find Area: a=10, b=15, h=8 → 100",
    actions: [
      { kind: "click", label: "Find Area" },
      { kind: "fill", label: "Base a", value: "10" },
      { kind: "fill", label: "Base b", value: "15" },
      { kind: "fill", label: "Height", value: "8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Area = 100"] },
  },
  {
    name: "Find Perimeter: a=10, b=15, c=9, d=9 → 43",
    actions: [
      { kind: "click", label: "Find Perimeter" },
      { kind: "fill", label: "Base a", value: "10" },
      { kind: "fill", label: "Base b", value: "15" },
      { kind: "fill", label: "Leg c", value: "9" },
      { kind: "fill", label: "Leg d", value: "9" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Perimeter = 43"] },
  },
  {
    name: "Find Height: A=100, a=10, b=15 → 8",
    actions: [
      { kind: "click", label: "Find Height" },
      { kind: "fill", label: "Area", value: "100" },
      { kind: "fill", label: "Base a", value: "10" },
      { kind: "fill", label: "Base b", value: "15" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Height = 8"] },
  },
  {
    name: "Find Base a: A=120, h=10, b=14 → 10",
    actions: [
      { kind: "click", label: "Find a Base" },
      { kind: "fill", label: "Area", value: "120" },
      { kind: "fill", label: "Height", value: "10" },
      { kind: "fill", label: "Base b", value: "14" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Base a = 10"] },
  },
];
