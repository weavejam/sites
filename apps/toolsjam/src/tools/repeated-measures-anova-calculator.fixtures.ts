import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "3 subjects, 3 conditions — valid F result",
    actions: [
      {
        kind: "fill",
        label: "Data Input",
        value: "8, 9, 7\n10, 11, 9\n6, 8, 5",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["F"] },
  },
  {
    name: "4 subjects, 4 conditions with irregular patterns",
    actions: [
      {
        kind: "fill",
        label: "Data Input",
        value: "4, 7, 6, 9\n3, 5, 4, 8\n6, 8, 9, 11\n2, 5, 3, 7",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["F"] },
  },
];
