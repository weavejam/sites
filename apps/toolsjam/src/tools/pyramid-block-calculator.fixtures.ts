import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Square pyramid L=10 H=15 → volume 500 cm³",
    actions: [
      { kind: "click", label: "Square" },
      { kind: "fill", label: "Base Length", value: "10" },
      { kind: "fill", label: "Height", value: "15" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "500.00"] },
  },
  {
    name: "Triangular pyramid L=8 H=12 → volume 110.85 cm³",
    actions: [
      { kind: "click", label: "Triangular" },
      { kind: "fill", label: "Base Length", value: "8" },
      { kind: "fill", label: "Height", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "110.85"] },
  },
  {
    name: "Hexagonal pyramid L=7 H=13 → volume shown",
    actions: [
      { kind: "click", label: "Hexagonal" },
      { kind: "fill", label: "Base Length", value: "7" },
      { kind: "fill", label: "Height", value: "13" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Volume"] },
  },
];
