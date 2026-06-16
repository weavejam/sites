import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "200→185 lbs over 12 weeks = 7.5%",
    actions: [
      { kind: "fill", label: "Initial Weight", value: "200" },
      { kind: "fill", label: "Current Weight", value: "185" },
      { kind: "fill", label: "Time Period in Weeks (Optional)", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["7.5", "Weight Loss Percentage"] },
  },
  {
    name: "250→200 lbs significant loss = 20%",
    actions: [
      { kind: "fill", label: "Initial Weight", value: "250" },
      { kind: "fill", label: "Current Weight", value: "200" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["20.0", "Weight Loss Percentage"] },
  },
];
