import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "7 reaches 1 in 16 steps",
    actions: [
      { kind: "fill", label: "Starting number", value: "7" },
      { kind: "fill", label: "Maximum steps", value: "10000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: [
        "Result",
        "Starting from 7, the sequence reaches 1 in 16 steps.",
        "7, 22, 11, 34, 17"
      ],
    },
  },
  {
    name: "27 shows the classic long chain",
    actions: [
      { kind: "fill", label: "Starting number", value: "27" },
      { kind: "fill", label: "Maximum steps", value: "10000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: [
        "Starting from 27, the sequence reaches 1 in 111 steps.",
        "9,232",
        "62 more numbers"
      ],
    },
  },
  {
    name: "64 halves down quickly",
    actions: [
      { kind: "fill", label: "Starting number", value: "64" },
      { kind: "fill", label: "Maximum steps", value: "10000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Starting from 64, the sequence reaches 1 in 6 steps.", "64, 32, 16, 8, 4, 2, 1"],
    },
  },
];
