import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal adult male (TT=650 ng/dL, SHBG=35) → Free T ~144 pg/mL",
    actions: [
      { kind: "click", label: "ng/dL" },
      { kind: "fill", label: "Total Testosterone", value: "650" },
      { kind: "fill", label: "SHBG (nmol/L)", value: "35" },
      { kind: "fill", label: "Albumin (g/dL)", value: "4.3" },
      { kind: "click", label: "Calculate Levels" },
    ],
    expect: { text: ["Free Testosterone", "pg/mL"] },
  },
  {
    name: "High SHBG case (TT=500 ng/dL, SHBG=80) → reduced free T",
    actions: [
      { kind: "click", label: "ng/dL" },
      { kind: "fill", label: "Total Testosterone", value: "500" },
      { kind: "fill", label: "SHBG (nmol/L)", value: "80" },
      { kind: "fill", label: "Albumin (g/dL)", value: "4.0" },
      { kind: "click", label: "Calculate Levels" },
    ],
    expect: { text: ["Testosterone Levels", "Bioavailable Testosterone"] },
  },
];
