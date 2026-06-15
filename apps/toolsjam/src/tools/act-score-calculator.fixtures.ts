import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Strong performer — E30 M32 R31 S29 → composite 31",
    actions: [
      { kind: "fill", label: "English Score", value: "30" },
      { kind: "fill", label: "Math Score", value: "32" },
      { kind: "fill", label: "Reading Score", value: "31" },
      { kind: "fill", label: "Science Score", value: "29" },
      { kind: "click", label: "Calculate ACT Score" },
    ],
    expect: { text: ["ACT Score Results", "31/36"] },
  },
  {
    name: "Balanced scores — E25 M26 R25 S26 → composite 26",
    actions: [
      { kind: "fill", label: "English Score", value: "25" },
      { kind: "fill", label: "Math Score", value: "26" },
      { kind: "fill", label: "Reading Score", value: "25" },
      { kind: "fill", label: "Science Score", value: "26" },
      { kind: "click", label: "Calculate ACT Score" },
    ],
    expect: { text: ["ACT Score Results", "26/36"] },
  },
  {
    name: "With Writing — E25 M26 R25 S26 W8 → ELA score computed",
    actions: [
      { kind: "fill", label: "English Score", value: "25" },
      { kind: "fill", label: "Math Score", value: "26" },
      { kind: "fill", label: "Reading Score", value: "25" },
      { kind: "fill", label: "Science Score", value: "26" },
      { kind: "fill", label: "Writing Score (Optional)", value: "8" },
      { kind: "click", label: "Calculate ACT Score" },
    ],
    expect: { text: ["ACT Score Results", "ELA Score"] },
  },
];
