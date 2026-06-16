import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "High effectiveness sanitizer — optimal method",
    actions: [
      { kind: "fill", label: "Alcohol Percentage (%)", value: "75" },
      { kind: "fill", label: "Volume (ml)", value: "500" },
      { kind: "fill", label: "Cost ($)", value: "12.99" },
      { kind: "fill", label: "Uses Per Day", value: "8" },
      { kind: "fill", label: "Contact Time (seconds)", value: "25" },
      { kind: "click", label: "Optimal" },
      { kind: "click", label: "Calculate Effectiveness" },
    ],
    expect: { text: ["Results", "Optimal Protection"] },
  },
  {
    name: "Standard daily use — adequate method",
    actions: [
      { kind: "fill", label: "Alcohol Percentage (%)", value: "70" },
      { kind: "fill", label: "Volume (ml)", value: "300" },
      { kind: "fill", label: "Cost ($)", value: "6.99" },
      { kind: "fill", label: "Uses Per Day", value: "12" },
      { kind: "fill", label: "Contact Time (seconds)", value: "20" },
      { kind: "click", label: "Adequate" },
      { kind: "click", label: "Calculate Effectiveness" },
    ],
    expect: { text: ["Results", "Standard Protection"] },
  },
  {
    name: "Below 60% alcohol — ineffective rating",
    actions: [
      { kind: "fill", label: "Alcohol Percentage (%)", value: "40" },
      { kind: "fill", label: "Volume (ml)", value: "200" },
      { kind: "fill", label: "Cost ($)", value: "3.00" },
      { kind: "fill", label: "Uses Per Day", value: "5" },
      { kind: "fill", label: "Contact Time (seconds)", value: "20" },
      { kind: "click", label: "Adequate" },
      { kind: "click", label: "Calculate Effectiveness" },
    ],
    expect: { text: ["Results", "Ineffective"] },
  },
];

