import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Small retail store → Phase 4 via example button",
    actions: [
      { kind: "click", label: "Small Retail Business" },
    ],
    expect: { text: ["Reopening Strategy Assessment", "Phase 4"] },
  },
  {
    name: "High-risk venue → Phase 1 via example button",
    actions: [
      { kind: "click", label: "High-Risk Scenario" },
    ],
    expect: { text: ["Reopening Strategy Assessment", "Phase 1"] },
  },
];
