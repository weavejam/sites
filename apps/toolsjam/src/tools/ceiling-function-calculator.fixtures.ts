import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "ceil(2.3) = 3",
    actions: [
      { kind: "fill", label: "Input Number", value: "2.3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "3"] },
  },
  {
    name: "ceil(-1.7) = -1",
    actions: [
      { kind: "fill", label: "Input Number", value: "-1.7" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "-1"] },
  },
  {
    name: "ceil(5) = 5",
    actions: [
      { kind: "fill", label: "Input Number", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "5"] },
  },
];
