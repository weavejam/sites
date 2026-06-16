import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Severe hypernatremia (Na 165→140, 70kg male) → deficit ~12.5 L",
    actions: [
      { kind: "click", label: "Adult Male" },
      { kind: "fill", label: "Current Serum Na⁺ (mEq/L)", value: "165" },
      { kind: "fill", label: "Desired Serum Na⁺ (mEq/L)", value: "140" },
      { kind: "fill", label: "Body Weight (kg)", value: "70" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Free Water Deficit", "L"] },
  },
  {
    name: "Moderate hypernatremia (Na 155→140, 65kg female) → deficit ~4.9 L",
    actions: [
      { kind: "click", label: "Adult Female" },
      { kind: "fill", label: "Current Serum Na⁺ (mEq/L)", value: "155" },
      { kind: "fill", label: "Desired Serum Na⁺ (mEq/L)", value: "140" },
      { kind: "fill", label: "Body Weight (kg)", value: "65" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Free Water Deficit", "Total Body Water"] },
  },
];
