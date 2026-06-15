import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Standard NaNoWriMo: 50000 words, Nov 1–30, 0 written",
    actions: [
      { kind: "fill", label: "Total Word Goal", value: "50000" },
      { kind: "fill", label: "Current Word Count", value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Your NaNoWriMo Progress", "Words Remaining", "Required Daily Target"],
    },
  },
  {
    name: "NaNoWriMo mid-challenge: 50000 goal, 20000 written",
    actions: [
      { kind: "fill", label: "Total Word Goal", value: "50000" },
      { kind: "fill", label: "Current Word Count", value: "20000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Your NaNoWriMo Progress", "Words Remaining", "Progress"],
    },
  },
  {
    name: "Camp NaNoWriMo: 80000 words with writing speed",
    actions: [
      { kind: "fill", label: "Total Word Goal", value: "80000" },
      { kind: "fill", label: "Current Word Count", value: "30000" },
      { kind: "fill", label: "Writing Speed (Optional, words/hour)", value: "500" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Your NaNoWriMo Progress", "Required Daily Target"],
    },
  },
];
