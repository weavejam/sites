import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Short side = 5 → long ≈ 8.660, hyp = 10",
    actions: [
      { kind: "click", label: "Short Side (opposite 30°)" },
      { kind: "fill", label: "Side Length", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Triangle Sides", "10"] },
  },
  {
    name: "Hypotenuse = 20 → short = 10, long ≈ 17.321",
    actions: [
      { kind: "click", label: "Hypotenuse (opposite 90°)" },
      { kind: "fill", label: "Side Length", value: "20" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Triangle Sides", "10"] },
  },
  {
    name: "Long side = 9 → short ≈ 5.196, hyp ≈ 10.392",
    actions: [
      { kind: "click", label: "Long Side (opposite 60°)" },
      { kind: "fill", label: "Side Length", value: "9" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Triangle Sides", "9"] },
  },
];
