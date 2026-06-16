import type { ToolFixture } from "@/tools/fixture";

// Hepatic defaults to "normal", pain defaults to "moderate", formulation defaults to "ir"
export const fixtures: ToolFixture[] = [
  {
    name: "Standard adult — 70 kg, age 45, CrCl 90, normal function, moderate pain",
    actions: [
      { kind: "fill", label: "Weight (kg)", value: "70" },
      { kind: "fill", label: "Age (years)", value: "45" },
      { kind: "fill", label: "Creatinine Clearance (mL/min)", value: "90" },
      { kind: "click", label: "Calculate Tramadol Dose" },
    ],
    expect: { text: ["mg", "400 mg"] },
  },
  {
    name: "Load elderly renal — age 78, CrCl 25, reduced dose and interval",
    actions: [
      { kind: "click", label: "Load Elderly Renal" },
    ],
    expect: { text: ["mg", "200 mg"] },
  },
];
