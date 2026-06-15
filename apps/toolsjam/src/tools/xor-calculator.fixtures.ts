import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Boolean XOR: true XOR false = true",
    actions: [
      { kind: "click", label: "Boolean XOR" },
      { kind: "fill", label: "First Value", value: "true" },
      { kind: "fill", label: "Second Value", value: "false" },
      { kind: "click", label: "Calculate XOR" },
    ],
    expect: { text: ["Result", "true XOR false = true"] },
  },
  {
    name: "Boolean XOR: true XOR true = false",
    actions: [
      { kind: "click", label: "Boolean XOR" },
      { kind: "fill", label: "First Value", value: "true" },
      { kind: "fill", label: "Second Value", value: "true" },
      { kind: "click", label: "Calculate XOR" },
    ],
    expect: { text: ["Result", "true XOR true = false"] },
  },
  {
    name: "Binary XOR: 1010 XOR 1100 = 0110",
    actions: [
      { kind: "click", label: "Binary XOR" },
      { kind: "fill", label: "First Value", value: "1010" },
      { kind: "fill", label: "Second Value", value: "1100" },
      { kind: "click", label: "Calculate XOR" },
    ],
    expect: { text: ["Result", "1010 XOR 1100 = 0110"] },
  },
];
