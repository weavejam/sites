import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "RR=2.0 clinical trial scenario",
    actions: [
      { kind: "fill", label: "Exposed with Outcome (A)", value: "50" },
      { kind: "fill", label: "Exposed without Outcome (B)", value: "50" },
      { kind: "fill", label: "Unexposed with Outcome (C)", value: "25" },
      { kind: "fill", label: "Unexposed without Outcome (D)", value: "75" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Relative Risk (RR)"] },
  },
  {
    name: "Low risk difference scenario",
    actions: [
      { kind: "fill", label: "Exposed with Outcome (A)", value: "10" },
      { kind: "fill", label: "Exposed without Outcome (B)", value: "90" },
      { kind: "fill", label: "Unexposed with Outcome (C)", value: "8" },
      { kind: "fill", label: "Unexposed without Outcome (D)", value: "92" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Relative Risk (RR)"] },
  },
];
