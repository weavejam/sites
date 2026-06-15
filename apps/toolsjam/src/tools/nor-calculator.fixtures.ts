import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "NOR(0,0) = 1 (binary)",
    actions: [
      { kind: "click", label: "Binary (0/1)" },
      { kind: "click", label: "2 Inputs" },
      { kind: "fill", label: "Input A", value: "0" },
      { kind: "fill", label: "Input B", value: "0" },
      { kind: "click", label: "Calculate NOR" },
    ],
    expect: { text: ["Result", "TRUE"] },
  },
  {
    name: "NOR(0,1) = 0 (binary)",
    actions: [
      { kind: "click", label: "Binary (0/1)" },
      { kind: "click", label: "2 Inputs" },
      { kind: "fill", label: "Input A", value: "0" },
      { kind: "fill", label: "Input B", value: "1" },
      { kind: "click", label: "Calculate NOR" },
    ],
    expect: { text: ["Result", "FALSE"] },
  },
  {
    name: "NOR(0,0,0) = 1 (3-input binary)",
    actions: [
      { kind: "click", label: "Binary (0/1)" },
      { kind: "click", label: "3 Inputs" },
      { kind: "fill", label: "Input A", value: "0" },
      { kind: "fill", label: "Input B", value: "0" },
      { kind: "fill", label: "Input C", value: "0" },
      { kind: "click", label: "Calculate NOR" },
    ],
    expect: { text: ["Result", "TRUE"] },
  },
];
