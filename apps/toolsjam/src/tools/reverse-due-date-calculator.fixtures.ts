import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Due date 2024-09-15, 28-day cycle, conception method → shows conception date",
    actions: [
      { kind: "click", label: "Load Conception Example" },
    ],
    expect: { text: ["Reverse Due Date Results", "Estimated Conception Date"] },
  },
  {
    name: "Milestones method → shows first trimester end",
    actions: [
      { kind: "click", label: "Load Milestones Example" },
    ],
    expect: { text: ["Reverse Due Date Results", "First Trimester End"] },
  },
];
