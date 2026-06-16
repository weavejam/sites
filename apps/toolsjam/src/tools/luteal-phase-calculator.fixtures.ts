import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Standard 28-day cycle, default luteal phase",
    actions: [
      { kind: "fill", label: "Cycle Length (Days)", value: "28" },
      { kind: "fill", label: "Last Period Start Date", value: "2024-01-15" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Your Cycle Results", "2024-01-28", "14 days"] },
  },
  {
    name: "24-day cycle with custom 12-day luteal phase",
    actions: [
      { kind: "fill", label: "Cycle Length (Days)", value: "24" },
      { kind: "fill", label: "Last Period Start Date", value: "2024-01-10" },
      { kind: "fill", label: "Average Luteal Phase Length (Optional)", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Your Cycle Results", "2024-01-21", "12 days"] },
  },
];
