import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "28 weeks 1187 g → ~50th percentile",
    actions: [
      { kind: "fill", label: "Gestational Age (weeks)", value: "28" },
      { kind: "fill", label: "Estimated Fetal Weight", value: "1187" },
      { kind: "click", label: "Calculate Percentile" },
    ],
    expect: { text: ["percentile"] },
  },
  {
    name: "38 weeks 3311 g → ~50th percentile",
    actions: [
      { kind: "fill", label: "Gestational Age (weeks)", value: "38" },
      { kind: "fill", label: "Estimated Fetal Weight", value: "3311" },
      { kind: "click", label: "Calculate Percentile" },
    ],
    expect: { text: ["percentile"] },
  },
];
