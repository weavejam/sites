import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Solve electric potential from charge and distance",
    actions: [
      { kind: "click", label: "Find potential (V)" },
      { kind: "fill", label: "Charge (Q) in coulombs", value: "2e-9" },
      { kind: "fill", label: "Distance (r) in meters", value: "0.25" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "71.900414", "Electric potential"] },
  },
  {
    name: "Solve distance from potential and charge",
    actions: [
      { kind: "click", label: "Find distance (r)" },
      { kind: "fill", label: "Electric potential (V)", value: "17.975104" },
      { kind: "fill", label: "Charge (Q) in coulombs", value: "1e-9" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0.5", "Distance"] },
  },
];
