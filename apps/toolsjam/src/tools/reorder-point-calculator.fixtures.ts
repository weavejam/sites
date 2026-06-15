import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Demand 100/day, lead time 7 days, safety stock 150 → ROP 850",
    actions: [
      { kind: "fill", label: "Average Daily Demand", value: "100" },
      { kind: "fill", label: "Lead Time (Days)", value: "7" },
      { kind: "fill", label: "Safety Stock", value: "150" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["850", "Reorder Point"] },
  },
  {
    name: "Demand 50/day, lead time 14 days, safety stock 100 → ROP 800",
    actions: [
      { kind: "fill", label: "Average Daily Demand", value: "50" },
      { kind: "fill", label: "Lead Time (Days)", value: "14" },
      { kind: "fill", label: "Safety Stock", value: "100" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["800", "Reorder Point"] },
  },
];
