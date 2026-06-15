import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "8 resolutions: 2 complete, 3 in progress, strong motivation",
    actions: [
      { kind: "fill", label: "Total Resolutions Made", value: "8" },
      { kind: "fill", label: "Completed Resolutions", value: "2" },
      { kind: "fill", label: "In Progress Resolutions", value: "3" },
      { kind: "fill", label: "Motivation Level (1–10)", value: "8" },
      { kind: "fill", label: "Time Management Score (1–10)", value: "7" },
      { kind: "fill", label: "Support System Score (1–10)", value: "9" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Your Resolution Success Analysis", "Current Success Rate", "Success Probability Score"],
    },
  },
  {
    name: "3 resolutions all complete, with category breakdown",
    actions: [
      { kind: "fill", label: "Total Resolutions Made", value: "3" },
      { kind: "fill", label: "Completed Resolutions", value: "3" },
      { kind: "fill", label: "In Progress Resolutions", value: "0" },
      { kind: "fill", label: "Fitness Goals (Optional)", value: "2" },
      { kind: "fill", label: "Lifestyle Goals (Optional)", value: "1" },
      { kind: "fill", label: "Motivation Level (1–10)", value: "9" },
      { kind: "fill", label: "Time Management Score (1–10)", value: "8" },
      { kind: "fill", label: "Support System Score (1–10)", value: "7" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Your Resolution Success Analysis", "100.0%", "Strongest Goal Category"],
    },
  },
];
