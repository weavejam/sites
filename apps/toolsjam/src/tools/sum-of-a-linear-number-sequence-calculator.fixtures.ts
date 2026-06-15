import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Sum 1 to 100 = 5050",
    actions: [
      { kind: "fill", label: "First Term (a)", value: "1" },
      { kind: "fill", label: "Common Difference (d)", value: "1" },
      { kind: "fill", label: "Number of Terms (n)", value: "100" },
      { kind: "click", label: "Calculate Sum" },
    ],
    expect: { text: ["Result", "5,050"] },
  },
  {
    name: "Sum of 2,5,8,11,14 (a=2,d=3,n=5) = 40",
    actions: [
      { kind: "fill", label: "First Term (a)", value: "2" },
      { kind: "fill", label: "Common Difference (d)", value: "3" },
      { kind: "fill", label: "Number of Terms (n)", value: "5" },
      { kind: "click", label: "Calculate Sum" },
    ],
    expect: { text: ["Result", "40"] },
  },
  {
    name: "Decreasing sequence a=10 d=-3 n=4 = 22",
    actions: [
      { kind: "fill", label: "First Term (a)", value: "10" },
      { kind: "fill", label: "Common Difference (d)", value: "-3" },
      { kind: "fill", label: "Number of Terms (n)", value: "4" },
      { kind: "click", label: "Calculate Sum" },
    ],
    expect: { text: ["Result", "22"] },
  },
];
