import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Air molar mass → R ≈ 287.1 J/(kg·K)",
    actions: [
      { kind: "fill", label: "Molar Mass (g/mol)", value: "28.97" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "287"] },
  },
  {
    name: "Nitrogen molar mass → R ≈ 296.8 J/(kg·K)",
    actions: [
      { kind: "fill", label: "Molar Mass (g/mol)", value: "28.014" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "296"] },
  },
  {
    name: "CO2 molar mass → R ≈ 188.9 J/(kg·K)",
    actions: [
      { kind: "fill", label: "Molar Mass (g/mol)", value: "44.01" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "188"] },
  },
];
