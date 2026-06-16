import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Prerenal azotemia — FENa 0.13%",
    actions: [
      { kind: "fill", label: "Urine Sodium (mEq/L)", value: "15" },
      { kind: "fill", label: "Serum Sodium (mEq/L)", value: "140" },
      { kind: "fill", label: "Urine Creatinine (mg/dL)", value: "200" },
      { kind: "fill", label: "Serum Creatinine (mg/dL)", value: "2.5" },
      { kind: "click", label: "Calculate FENa" },
    ],
    expect: { text: ["0.13%", "Prerenal Azotemia"] },
  },
  {
    name: "Intrinsic renal injury — FENa 2.90%",
    actions: [
      { kind: "click", label: "Load intrinsic example" },
      { kind: "click", label: "Calculate FENa" },
    ],
    expect: { text: ["2.90%", "Intrinsic Renal Injury"] },
  },
];
