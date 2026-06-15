import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Countdown to Jan 1 2030 in UTC",
    actions: [
      { kind: "fill", label: "Target Date", value: "2030-01-01" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Countdown to New Year", "Days", "Hours"],
    },
  },
  {
    name: "Countdown to Jan 1 2028 — start live countdown",
    actions: [
      { kind: "fill", label: "Target Date", value: "2028-01-01" },
      { kind: "click", label: "Start Live Countdown" },
    ],
    expect: {
      text: ["Countdown to New Year", "Minutes", "Seconds"],
    },
  },
];
