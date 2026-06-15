import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Electric motor: input 5000J output 4250J → 85%",
    actions: [
      { kind: "fill", label: "Input Energy (J)", value: "5000" },
      { kind: "fill", label: "Output Energy (J)", value: "4250" },
      { kind: "fill", label: "Input Power (W)", value: "1000" },
      { kind: "fill", label: "Output Power (W)", value: "850" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "85"] },
  },
  {
    name: "Heat engine: input 10000J output 3500J → 35%",
    actions: [
      { kind: "fill", label: "Input Energy (J)", value: "10000" },
      { kind: "fill", label: "Output Energy (J)", value: "3500" },
      { kind: "fill", label: "Input Power (W)", value: "2000" },
      { kind: "fill", label: "Output Power (W)", value: "700" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "35"] },
  },
];
