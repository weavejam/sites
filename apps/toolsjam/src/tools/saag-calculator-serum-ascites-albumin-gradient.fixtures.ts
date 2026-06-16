import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Portal hypertension SAAG example",
    actions: [
      { kind: "fill", label: "Serum Albumin (g/dL)", value: "3.4" },
      { kind: "fill", label: "Ascites Albumin (g/dL)", value: "1.8" },
      { kind: "click", label: "Calculate SAAG" },
    ],
    expect: { text: ["1.6", "transudative pattern"] },
  },
  {
    name: "Non-portal SAAG example",
    actions: [
      { kind: "fill", label: "Serum Albumin (g/dL)", value: "2.8" },
      { kind: "fill", label: "Ascites Albumin (g/dL)", value: "2.2" },
      { kind: "click", label: "Calculate SAAG" },
    ],
    expect: { text: ["0.6", "exudative pattern"] },
  },
];
