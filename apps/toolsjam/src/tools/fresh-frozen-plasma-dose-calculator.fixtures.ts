import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Warfarin reversal (75 kg) → ~1500 mL (~6 units)",
    actions: [
      { kind: "fill", label: "Patient Weight (kg)", value: "75" },
      { kind: "click", label: "Warfarin Reversal" },
      { kind: "fill", label: "Current INR (optional)", value: "4.2" },
      { kind: "fill", label: "Target INR (optional)", value: "1.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["FFP Dose Recommendation", "mL"] },
  },
  {
    name: "Bleeding disorder (65 kg) → ~975 mL (~4 units)",
    actions: [
      { kind: "fill", label: "Patient Weight (kg)", value: "65" },
      { kind: "click", label: "Bleeding Disorder" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Recommended Dose", "units"] },
  },
];
