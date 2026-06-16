import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal pattern: A/G ratio 1.93",
    actions: [
      { kind: "fill", label: "Albumin (g/dL)", value: "4.2" },
      { kind: "fill", label: "Alpha-1 Globulin (g/dL)", value: "0.3" },
      { kind: "fill", label: "Alpha-2 Globulin (g/dL)", value: "0.7" },
      { kind: "fill", label: "Beta Globulin (g/dL)", value: "0.9" },
      { kind: "fill", label: "Gamma Globulin (g/dL)", value: "1.2" },
      { kind: "click", label: "Calculate PF Ratio" },
    ],
    expect: { text: ["Protein Fraction Results", "A/G Ratio: 1.35"] },
  },
  {
    name: "Liver disease pattern: low A/G ratio 0.57",
    actions: [
      { kind: "fill", label: "Albumin (g/dL)", value: "2.1" },
      { kind: "fill", label: "Alpha-1 Globulin (g/dL)", value: "0.2" },
      { kind: "fill", label: "Alpha-2 Globulin (g/dL)", value: "0.6" },
      { kind: "fill", label: "Beta Globulin (g/dL)", value: "0.8" },
      { kind: "fill", label: "Gamma Globulin (g/dL)", value: "2.1" },
      { kind: "click", label: "Calculate PF Ratio" },
    ],
    expect: { text: ["A/G Ratio: 0.57"] },
  },
];
