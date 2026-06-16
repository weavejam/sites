import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "High-risk infant — palpable skull fracture",
    actions: [
      { kind: "click", label: "High-Risk Infant" },
      { kind: "click", label: "Assess Risk" },
    ],
    expect: { text: ["PECARN Risk Assessment", "HIGH RISK"] },
  },
  {
    name: "Low-risk 7-year-old — no symptoms",
    actions: [
      { kind: "click", label: "Low-Risk Child" },
      { kind: "click", label: "Assess Risk" },
    ],
    expect: { text: ["PECARN Risk Assessment", "LOW RISK"] },
  },
];

