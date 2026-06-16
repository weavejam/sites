import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Low fibrosis risk: FIB-4 = 0.64",
    actions: [
      { kind: "fill", label: "Age (years)", value: "35" },
      { kind: "fill", label: "AST Level (U/L)", value: "25" },
      { kind: "fill", label: "ALT Level (U/L)", value: "30" },
      { kind: "fill", label: "Platelet Count (×10⁹/L)", value: "250" },
      { kind: "click", label: "Calculate FIB-4 Score" },
    ],
    expect: { text: ["0.64", "Low"] },
  },
  {
    name: "High fibrosis risk: FIB-4 = 4.10",
    actions: [
      { kind: "fill", label: "Age (years)", value: "55" },
      { kind: "fill", label: "AST Level (U/L)", value: "60" },
      { kind: "fill", label: "ALT Level (U/L)", value: "45" },
      { kind: "fill", label: "Platelet Count (×10⁹/L)", value: "120" },
      { kind: "click", label: "Calculate FIB-4 Score" },
    ],
    expect: { text: ["4.10", "High"] },
  },
];
