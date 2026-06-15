import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "3(4 + 5) = 27",
    actions: [
      { kind: "click", label: "Addition (+)" },
      { kind: "fill", label: "Coefficient (a)", value: "3" },
      { kind: "fill", label: "First Term (b)", value: "4" },
      { kind: "fill", label: "Second Term (c)", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "27"] },
  },
  {
    name: "2(6 + 3) = 18",
    actions: [
      { kind: "click", label: "Addition (+)" },
      { kind: "fill", label: "Coefficient (a)", value: "2" },
      { kind: "fill", label: "First Term (b)", value: "6" },
      { kind: "fill", label: "Second Term (c)", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "18"] },
  },
  {
    name: "5(10 − 4) = 30",
    actions: [
      { kind: "click", label: "Subtraction (−)" },
      { kind: "fill", label: "Coefficient (a)", value: "5" },
      { kind: "fill", label: "First Term (b)", value: "10" },
      { kind: "fill", label: "Second Term (c)", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "30"] },
  },
];
