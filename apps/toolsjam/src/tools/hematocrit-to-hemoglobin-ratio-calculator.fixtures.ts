import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal adult male: Hct 45%, Hgb 15.5 → ratio 2.90",
    actions: [
      { kind: "fill", label: "Hematocrit (%)", value: "45" },
      { kind: "fill", label: "Hemoglobin (g/dL)", value: "15.5" },
      { kind: "click", label: "Calculate Ratio" },
    ],
    expect: { text: ["Hct/Hgb Ratio Result", "2.90"] },
  },
  {
    name: "Iron deficiency anemia: Hct 32%, Hgb 10.2 → ratio 3.14",
    actions: [
      { kind: "fill", label: "Hematocrit (%)", value: "32" },
      { kind: "fill", label: "Hemoglobin (g/dL)", value: "10.2" },
      { kind: "click", label: "Calculate Ratio" },
    ],
    expect: { text: ["Hct/Hgb Ratio Result", "3.14"] },
  },
];
