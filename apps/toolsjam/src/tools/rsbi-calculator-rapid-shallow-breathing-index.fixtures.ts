import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Favorable RSBI example",
    actions: [
      { kind: "fill", label: "Respiratory Rate (breaths/min)", value: "20" },
      { kind: "fill", label: "Tidal Volume (mL)", value: "500" },
      { kind: "click", label: "Calculate RSBI" },
    ],
    expect: { text: ["40.0", "RSBI below 80"] },
  },
  {
    name: "Borderline RSBI example",
    actions: [
      { kind: "fill", label: "Respiratory Rate (breaths/min)", value: "28" },
      { kind: "fill", label: "Tidal Volume (mL)", value: "300" },
      { kind: "click", label: "Calculate RSBI" },
    ],
    expect: { text: ["93.3", "RSBI 80 to 105"] },
  },
];
