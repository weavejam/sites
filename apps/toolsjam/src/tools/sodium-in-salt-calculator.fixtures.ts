import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "5g Table Salt with 2300mg limit → 1965mg sodium",
    actions: [
      {
        kind: "fill",
        label: "Salt Amount (g)",
        value: "5",
      },
      {
        kind: "fill",
        label: "Daily Sodium Limit (Optional) (mg)",
        value: "2300",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Results", "Sodium Content", "1965"],
    },
  },
  {
    name: "10g Table Salt → 3930mg sodium",
    actions: [
      {
        kind: "fill",
        label: "Salt Amount (g)",
        value: "10",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Results", "Sodium Content", "3930"],
    },
  },
];
