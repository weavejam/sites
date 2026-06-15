import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Simplify √50 → 5√2",
    actions: [
      { kind: "fill", label: "Radicand (a)", value: "50" },
      { kind: "fill", label: "Index (n)", value: "2" },
      { kind: "click", label: "Simplify Radical" },
    ],
    expect: { text: ["Simplified Result", "5√2"] },
  },
  {
    name: "Simplify ∛54 → 3∛2",
    actions: [
      { kind: "fill", label: "Radicand (a)", value: "54" },
      { kind: "fill", label: "Index (n)", value: "3" },
      { kind: "click", label: "Simplify Radical" },
    ],
    expect: { text: ["Simplified Result", "3∛2"] },
  },
  {
    name: "Simplify ⁴√81 → 3 (perfect power)",
    actions: [
      { kind: "fill", label: "Radicand (a)", value: "81" },
      { kind: "fill", label: "Index (n)", value: "4" },
      { kind: "click", label: "Simplify Radical" },
    ],
    expect: { text: ["Simplified Result", "3"] },
  },
];
