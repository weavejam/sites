import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Standard 28-day cycle, Clomid day 3, 50 mg → ovulation Jan 15",
    actions: [
      { kind: "fill", label: "Last Period Start Date", value: "2024-01-01" },
      { kind: "fill", label: "Cycle Length (days)", value: "28" },
      { kind: "fill", label: "Clomid Start Day (cycle day)", value: "3" },
      { kind: "fill", label: "Clomid Dosage (mg)", value: "50" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Ovulation & Fertile Window Prediction", "2024-01-15"] },
  },
  {
    name: "32-day cycle, Clomid day 5, 100 mg → ovulation Jan 19",
    actions: [
      { kind: "fill", label: "Last Period Start Date", value: "2024-01-01" },
      { kind: "fill", label: "Cycle Length (days)", value: "32" },
      { kind: "fill", label: "Clomid Start Day (cycle day)", value: "5" },
      { kind: "fill", label: "Clomid Dosage (mg)", value: "100" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Ovulation & Fertile Window Prediction", "2024-01-19"] },
  },
  {
    name: "24-day cycle, Clomid day 3, 50 mg → ovulation Jan 11",
    actions: [
      { kind: "fill", label: "Last Period Start Date", value: "2024-01-01" },
      { kind: "fill", label: "Cycle Length (days)", value: "24" },
      { kind: "fill", label: "Clomid Start Day (cycle day)", value: "3" },
      { kind: "fill", label: "Clomid Dosage (mg)", value: "50" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Ovulation & Fertile Window Prediction", "2024-01-11"] },
  },
];
