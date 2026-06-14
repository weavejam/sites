import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Dice rolls: values 1-6 appear with frequency table",
    actions: [
      {
        kind: "fill",
        label: "Data Set",
        value: "1, 6, 2, 4, 3, 5, 2, 6, 4, 1, 3, 5, 4, 6, 2, 1, 5, 4, 3, 6",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Frequency Distribution", "Total observations"] },
  },
  {
    name: "Test scores: modal score 8 appears 5 times",
    actions: [
      {
        kind: "fill",
        label: "Data Set",
        value: "8, 7, 9, 8, 10, 7, 5, 8, 9, 7, 8, 6, 10, 8, 7",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Frequency Distribution", "Rel. Freq. (%)"] },
  },
  {
    name: "Simple data set: 1, 2, 2, 3",
    actions: [
      { kind: "fill", label: "Data Set", value: "1, 2, 2, 3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Frequency Distribution", "Cum. Freq."] },
  },
];
