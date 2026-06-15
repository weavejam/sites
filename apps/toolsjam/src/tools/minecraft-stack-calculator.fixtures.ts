import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "1000 dirt blocks (stack 64) → 15 full stacks + 40 remainder",
    actions: [
      { kind: "fill", label: "Total Item Count", value: "1000" },
      { kind: "fill", label: "Items per Stack", value: "64" },
      { kind: "click", label: "Calculate Stacks" },
    ],
    expect: { text: ["Storage Results", "Full stacks", "15", "Remaining items", "40"] },
  },
  {
    name: "500 Ender Pearls (stack 16) with 3 shulker boxes",
    actions: [
      { kind: "fill", label: "Total Item Count", value: "500" },
      { kind: "fill", label: "Items per Stack", value: "16" },
      { kind: "fill", label: "Number of Shulker Boxes (optional)", value: "3" },
      { kind: "click", label: "Calculate Stacks" },
    ],
    expect: { text: ["Storage Results", "Items per shulker box", "Full shulker boxes"] },
  },
  {
    name: "10000 cobblestone with 10 shulkers and 36 inventory slots",
    actions: [
      { kind: "fill", label: "Total Item Count", value: "10000" },
      { kind: "fill", label: "Items per Stack", value: "64" },
      { kind: "fill", label: "Number of Shulker Boxes (optional)", value: "10" },
      { kind: "fill", label: "Inventory Slots (optional)", value: "36" },
      { kind: "click", label: "Calculate Stacks" },
    ],
    expect: { text: ["Storage Results", "Items per shulker box", "Inventory slot utilisation", "Total inventory capacity (items)"] },
  },
];
