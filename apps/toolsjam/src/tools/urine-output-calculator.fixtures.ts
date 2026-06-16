import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal urine output — 1500 mL / 24 hr / 70 kg",
    actions: [
      { kind: "fill", label: "Urine Volume (mL)", value: "1500" },
      { kind: "fill", label: "Collection Time (hours)", value: "24" },
      { kind: "fill", label: "Body Weight (kg)", value: "70" },
      { kind: "click", label: "Calculate Urine Output" },
    ],
    expect: { text: ["0.89", "Normal"] },
  },
  {
    name: "Oliguria — 400 mL / 24 hr / 65 kg",
    actions: [
      { kind: "fill", label: "Urine Volume (mL)", value: "400" },
      { kind: "fill", label: "Collection Time (hours)", value: "24" },
      { kind: "fill", label: "Body Weight (kg)", value: "65" },
      { kind: "click", label: "Calculate Urine Output" },
    ],
    expect: { text: ["0.26", "Oliguria"] },
  },
];
