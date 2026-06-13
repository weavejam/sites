import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "GCF of 24, 36, 48 = 12",
    actions: [
      { kind: "fill", label: "Numbers", value: "24, 36, 48" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["GCF", "12"] },
  },
  {
    name: "GCF of 15, 25 = 5",
    actions: [
      { kind: "fill", label: "Numbers", value: "15, 25" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["GCF", "5"] },
  },
  {
    name: "GCF with prime factorization algorithm",
    actions: [
      { kind: "fill", label: "Numbers", value: "12, 18" },
      { kind: "click", label: "Prime Factorization" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["GCF", "Steps", "6"] },
  },
];
