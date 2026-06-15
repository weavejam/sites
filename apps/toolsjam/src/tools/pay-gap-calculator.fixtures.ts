import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "$75,000 vs $60,000 → 20% pay gap",
    actions: [
      { kind: "fill", label: "Reference Group Salary", value: "75000" },
      { kind: "fill", label: "Comparison Group Salary", value: "60000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Pay Gap Analysis", "20.0%"] },
  },
  {
    name: "$50,000 vs $50,000 → 0% pay gap",
    actions: [
      { kind: "fill", label: "Reference Group Salary", value: "50000" },
      { kind: "fill", label: "Comparison Group Salary", value: "50000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Pay Gap Analysis", "0.0%"] },
  },
];
