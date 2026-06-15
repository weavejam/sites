import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "27 is a perfect cube (root = 3)",
    actions: [
      { kind: "fill", label: "Number", value: "27" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["27 is a perfect cube", "Integer cube root: 3"] },
  },
  {
    name: "-64 is a perfect cube (root = -4)",
    actions: [
      { kind: "fill", label: "Number", value: "-64" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["-64 is a perfect cube", "Integer cube root: -4"] },
  },
  {
    name: "30 is not a perfect cube — nearest are 27 and 64",
    actions: [
      { kind: "fill", label: "Number", value: "30" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: [
        "30 is not a perfect cube",
        "Previous perfect cube: 27",
        "Next perfect cube: 64",
      ],
    },
  },
];
