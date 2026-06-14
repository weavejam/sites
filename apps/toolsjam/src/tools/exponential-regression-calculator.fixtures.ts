import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Bacterial growth regression",
    actions: [
      { kind: "fill", label: "Data Points (x, y)", value: "1 2\n2 4.1\n3 7.9\n4 16.2\n5 33.0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Coefficient 'a'", "Coefficient 'b'"] },
  },
  {
    name: "Compound interest regression with prediction",
    actions: [
      { kind: "fill", label: "Data Points (x, y)", value: "0 1000\n1 1050\n2 1102.5\n3 1157.6\n4 1215.5" },
      { kind: "fill", label: "Predict Y for a given X", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Predicted Y"] },
  },
];
