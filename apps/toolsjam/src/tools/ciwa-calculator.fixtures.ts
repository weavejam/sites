import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Default all-zero scores → 0/67, Absent/Minimal",
    actions: [
      { kind: "click", label: "Calculate Score" },
    ],
    expect: { text: ["CIWA-Ar Total Score", "0 / 67"] },
  },
  {
    name: "Moderate withdrawal: scores summing to 15 → Moderate Withdrawal",
    actions: [
      { kind: "click", label: "Load moderate withdrawal" },
    ],
    expect: { text: ["CIWA-Ar Total Score", "Moderate Withdrawal"] },
  },
  {
    name: "Severe withdrawal: scores summing to 46 → Severe Withdrawal",
    actions: [
      { kind: "click", label: "Load severe withdrawal" },
    ],
    expect: { text: ["CIWA-Ar Total Score", "Severe Withdrawal"] },
  },
];
