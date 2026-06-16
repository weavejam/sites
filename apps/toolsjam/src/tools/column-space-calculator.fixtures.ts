import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Identity matrix spans R3",
    actions: [
      { kind: "fill", label: "A11", value: "1" },
      { kind: "fill", label: "A12", value: "0" },
      { kind: "fill", label: "A13", value: "0" },
      { kind: "fill", label: "A21", value: "0" },
      { kind: "fill", label: "A22", value: "1" },
      { kind: "fill", label: "A23", value: "0" },
      { kind: "fill", label: "A31", value: "0" },
      { kind: "fill", label: "A32", value: "0" },
      { kind: "fill", label: "A33", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Result", "Rank", "3", "1, 2, 3", "[1, 0, 0]"],
    },
  },
  {
    name: "Dependent columns give rank 2",
    actions: [
      { kind: "fill", label: "A11", value: "1" },
      { kind: "fill", label: "A12", value: "2" },
      { kind: "fill", label: "A13", value: "3" },
      { kind: "fill", label: "A21", value: "2" },
      { kind: "fill", label: "A22", value: "4" },
      { kind: "fill", label: "A23", value: "6" },
      { kind: "fill", label: "A31", value: "0" },
      { kind: "fill", label: "A32", value: "1" },
      { kind: "fill", label: "A33", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Dimension of the column space", "2", "Pivot columns", "1, 2"],
    },
  },
  {
    name: "Vector membership is detected",
    actions: [
      { kind: "fill", label: "A11", value: "1" },
      { kind: "fill", label: "A12", value: "0" },
      { kind: "fill", label: "A13", value: "0" },
      { kind: "fill", label: "A21", value: "0" },
      { kind: "fill", label: "A22", value: "1" },
      { kind: "fill", label: "A23", value: "0" },
      { kind: "fill", label: "A31", value: "0" },
      { kind: "fill", label: "A32", value: "0" },
      { kind: "fill", label: "A33", value: "1" },
      { kind: "fill", label: "b1", value: "4" },
      { kind: "fill", label: "b2", value: "5" },
      { kind: "fill", label: "b3", value: "6" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Vector membership", "The test vector is in the column space."],
    },
  },
];
