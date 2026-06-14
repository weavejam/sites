import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Fuel efficiency: x=10, y=300 → k=30",
    actions: [
      { kind: "fill", label: "X Value 1", value: "10" },
      { kind: "fill", label: "Y Value 1", value: "300" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["k = 30"] },
  },
  {
    name: "Ohm's Law: x=3, y=12 → k=4",
    actions: [
      { kind: "fill", label: "X Value 1", value: "3" },
      { kind: "fill", label: "Y Value 1", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["k = 4"] },
  },
  {
    name: "Exchange rate: x=50, y=45 → k=0.9",
    actions: [
      { kind: "fill", label: "X Value 1", value: "50" },
      { kind: "fill", label: "Y Value 1", value: "45" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["k = 0.9"] },
  },
];
