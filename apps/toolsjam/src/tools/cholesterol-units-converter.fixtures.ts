import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Total Cholesterol 200 mg/dL → 5.17 mmol/L",
    actions: [
      { kind: "fill", label: "Value", value: "200" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Conversion Results", "5.17"] },
  },
  {
    name: "LDL 160 mg/dL → 4.14 mmol/L",
    actions: [
      { kind: "fill", label: "Value", value: "160" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Conversion Results", "4.1"] },
  },
  {
    name: "Total Cholesterol 180 mg/dL → 4.65 mmol/L",
    actions: [
      { kind: "fill", label: "Value", value: "180" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Conversion Results", "4.65"] },
  },
];
