import type { ToolFixture } from "@/tools/fixture";

// Indication defaults to "Breech Presentation", diabetes/hypertension default to "No",
// induction defaults to "Spontaneous Labor".
export const fixtures: ToolFixture[] = [
  {
    name: "Favorable VBAC candidate — young, prior vaginal delivery",
    actions: [
      { kind: "fill", label: "Maternal Age (years)", value: "26" },
      { kind: "fill", label: "Current Gestational Age (weeks)", value: "39" },
      { kind: "fill", label: "Previous Vaginal Deliveries", value: "1" },
      { kind: "fill", label: "Previous Cesarean Sections", value: "1" },
      { kind: "fill", label: "Pre-pregnancy BMI", value: "24" },
      { kind: "click", label: "Calculate VBAC Probability" },
    ],
    expect: { text: ["Favorable", "%"] },
  },
  {
    name: "Moderate VBAC candidate — no prior vaginal delivery",
    actions: [
      { kind: "fill", label: "Maternal Age (years)", value: "32" },
      { kind: "fill", label: "Current Gestational Age (weeks)", value: "38" },
      { kind: "fill", label: "Previous Vaginal Deliveries", value: "0" },
      { kind: "fill", label: "Previous Cesarean Sections", value: "1" },
      { kind: "fill", label: "Pre-pregnancy BMI", value: "28" },
      { kind: "click", label: "Calculate VBAC Probability" },
    ],
    expect: { text: ["%"] },
  },
];
