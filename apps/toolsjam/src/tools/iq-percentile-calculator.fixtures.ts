import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "IQ 100 – average, 50th percentile",
    actions: [
      { kind: "fill", label: "IQ Score", value: "100" },
      { kind: "click", label: "Calculate Percentile" },
    ],
    expect: { text: ["Your IQ Percentile", "Population Percentile", "Average (90–109)"] },
  },
  {
    name: "IQ 130 – very superior, ~98th percentile",
    actions: [
      { kind: "fill", label: "IQ Score", value: "130" },
      { kind: "click", label: "Calculate Percentile" },
    ],
    expect: { text: ["Your IQ Percentile", "Very Superior (130+)"] },
  },
  {
    name: "IQ 115 – high average, ~84th percentile",
    actions: [
      { kind: "fill", label: "IQ Score", value: "115" },
      { kind: "click", label: "Calculate Percentile" },
    ],
    expect: { text: ["Your IQ Percentile", "High Average (110–119)"] },
  },
];
