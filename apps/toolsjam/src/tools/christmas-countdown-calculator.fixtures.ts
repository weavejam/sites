import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Countdown from 2025-01-01 to 2025-12-25 days only",
    actions: [
      { kind: "fill", label: "Start Date", value: "2025-01-01" },
      { kind: "fill", label: "Target Date", value: "2025-12-25" },
      { kind: "click", label: "Calculate Countdown" },
    ],
    expect: { text: ["Countdown Result", "Days"] },
  },
  {
    name: "Countdown with same start and target",
    actions: [
      { kind: "fill", label: "Start Date", value: "2025-12-24" },
      { kind: "fill", label: "Target Date", value: "2025-12-25" },
      { kind: "click", label: "Calculate Countdown" },
    ],
    expect: { text: ["Countdown Result", "1"] },
  },
];
