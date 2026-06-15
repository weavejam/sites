import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Stock price 150 → 180 = 20%",
    actions: [
      { kind: "fill", label: "Initial Value", value: "150" },
      { kind: "fill", label: "Final Value", value: "180" },
      { kind: "click", label: "Calculate Increase" },
    ],
    expect: { text: ["Result", "From 150 to 180 = 20%"] },
  },
  {
    name: "Salary 60000 → 63000 = 5%",
    actions: [
      { kind: "fill", label: "Initial Value", value: "60000" },
      { kind: "fill", label: "Final Value", value: "63000" },
      { kind: "click", label: "Calculate Increase" },
    ],
    expect: { text: ["Result", "From 60,000 to 63,000 = 5%"] },
  },
  {
    name: "Website traffic 12000 → 15000 = 25%",
    actions: [
      { kind: "fill", label: "Initial Value", value: "12000" },
      { kind: "fill", label: "Final Value", value: "15000" },
      { kind: "click", label: "Calculate Increase" },
    ],
    expect: { text: ["Result", "From 12,000 to 15,000 = 25%"] },
  },
];
