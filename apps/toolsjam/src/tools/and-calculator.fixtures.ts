import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "AND(1,1) = 1",
    actions: [
      { kind: "click", label: "Binary AND Operation" },
      { kind: "fill", label: "Input A", value: "1" },
      { kind: "fill", label: "Input B", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["AND Result", "1"] },
  },
  {
    name: "AND(1,0) = 0",
    actions: [
      { kind: "click", label: "Binary AND Operation" },
      { kind: "fill", label: "Input A", value: "1" },
      { kind: "fill", label: "Input B", value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["AND Result", "0"] },
  },
  {
    name: "Truth table for 2 inputs",
    actions: [
      { kind: "click", label: "Truth Table Generation" },
      { kind: "click", label: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Truth Table", "Output"] },
  },
];
