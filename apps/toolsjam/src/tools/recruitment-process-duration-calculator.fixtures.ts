import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Standard tech hire: 14+7+10+5+3+7 = 46 days",
    actions: [
      { kind: "fill", label: "Job Posting Duration (Days)", value: "14" },
      { kind: "fill", label: "Application Review Time (Days)", value: "7" },
      { kind: "fill", label: "Interview Process Time (Days)", value: "10" },
      { kind: "fill", label: "Reference Check Time (Days)", value: "5" },
      { kind: "fill", label: "Offer Negotiation Time (Days)", value: "3" },
      { kind: "fill", label: "Onboarding Preparation Time (Days)", value: "7" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["46", "Total Recruitment Duration"] },
  },
  {
    name: "Fast-track hire: 7+3+5 = 15 days",
    actions: [
      { kind: "fill", label: "Job Posting Duration (Days)", value: "7" },
      { kind: "fill", label: "Application Review Time (Days)", value: "3" },
      { kind: "fill", label: "Interview Process Time (Days)", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["15", "Total Recruitment Duration"] },
  },
];
