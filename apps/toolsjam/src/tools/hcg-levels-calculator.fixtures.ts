import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal HCG doubling — 150 to 320 over 2 days",
    actions: [
      { kind: "fill", label: "First HCG Level (mIU/mL)", value: "150" },
      { kind: "fill", label: "First Test Date", value: "2024-01-15" },
      { kind: "fill", label: "Second HCG Level (mIU/mL)", value: "320" },
      { kind: "fill", label: "Second Test Date", value: "2024-01-17" },
      { kind: "fill", label: "Gestational Age (weeks)", value: "4" },
      { kind: "fill", label: "Gestational Age (days)", value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["HCG Results", "Rapid doubling"] },
  },
  {
    name: "Slow HCG doubling — 200 to 350 over 3 days",
    actions: [
      { kind: "fill", label: "First HCG Level (mIU/mL)", value: "200" },
      { kind: "fill", label: "First Test Date", value: "2024-01-15" },
      { kind: "fill", label: "Second HCG Level (mIU/mL)", value: "350" },
      { kind: "fill", label: "Second Test Date", value: "2024-01-18" },
      { kind: "fill", label: "Gestational Age (weeks)", value: "5" },
      { kind: "fill", label: "Gestational Age (days)", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["HCG Results", "Slow doubling"] },
  },
  {
    name: "Validation error when fields missing",
    actions: [
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: "Please enter both HCG levels and both test dates.",
    },
  },
];
