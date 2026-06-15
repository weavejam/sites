import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "3-4-5 right triangle prism, height=10: volume=60",
    actions: [
      { kind: "fill", label: "Base Side A", value: "3" },
      { kind: "fill", label: "Base Side B", value: "4" },
      { kind: "fill", label: "Base Side C", value: "5" },
      { kind: "fill", label: "Prism Height (h)", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Volume", "60", "Base Area", "6"] },
  },
  {
    name: "Equilateral base 6-6-6, height=8",
    actions: [
      { kind: "fill", label: "Base Side A", value: "6" },
      { kind: "fill", label: "Base Side B", value: "6" },
      { kind: "fill", label: "Base Side C", value: "6" },
      { kind: "fill", label: "Prism Height (h)", value: "8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Volume", "Base Area", "Lateral Surface Area", "Total Surface Area"] },
  },
  {
    name: "5-12-13 right triangle prism, height=6: volume=180",
    actions: [
      { kind: "fill", label: "Base Side A", value: "5" },
      { kind: "fill", label: "Base Side B", value: "12" },
      { kind: "fill", label: "Base Side C", value: "13" },
      { kind: "fill", label: "Prism Height (h)", value: "6" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Volume", "180", "Base Area", "30"] },
  },
];
