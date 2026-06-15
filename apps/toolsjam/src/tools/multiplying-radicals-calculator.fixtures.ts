import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2√3 × 3√3 = 18",
    actions: [
      { kind: "fill", label: "Coefficient (a)", value: "2" },
      { kind: "fill", label: "Radicand (x)", value: "3" },
      { kind: "fill", label: "Coefficient (b)", value: "3" },
      { kind: "fill", label: "Radicand (y)", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "18"] },
  },
  {
    name: "3√2 × 2√8 = 24",
    actions: [
      { kind: "fill", label: "Coefficient (a)", value: "3" },
      { kind: "fill", label: "Radicand (x)", value: "2" },
      { kind: "fill", label: "Coefficient (b)", value: "2" },
      { kind: "fill", label: "Radicand (y)", value: "8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "24"] },
  },
  {
    name: "2√3 × √12 = 12",
    actions: [
      { kind: "fill", label: "Coefficient (a)", value: "2" },
      { kind: "fill", label: "Radicand (x)", value: "3" },
      { kind: "fill", label: "Coefficient (b)", value: "1" },
      { kind: "fill", label: "Radicand (y)", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "12"] },
  },
];
