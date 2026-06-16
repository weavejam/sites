import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Male moderate gain: 60→70 kg, 175 cm, 25 y (defaults: male, moderate, 0.5kg/wk)",
    actions: [
      { kind: "fill", label: "Current Weight (kg)", value: "60" },
      { kind: "fill", label: "Target Weight (kg)", value: "70" },
      { kind: "fill", label: "Height (cm)", value: "175" },
      { kind: "fill", label: "Age (years)", value: "25" },
      { kind: "click", label: "Calculate Weight Gain Plan" },
    ],
    expect: { text: ["Daily Calorie Target", "Daily Calorie Surplus"] },
  },
  {
    name: "Male muscle gain: 70→80 kg, 180 cm, 28 y (defaults: male, moderate)",
    actions: [
      { kind: "fill", label: "Current Weight (kg)", value: "70" },
      { kind: "fill", label: "Target Weight (kg)", value: "80" },
      { kind: "fill", label: "Height (cm)", value: "180" },
      { kind: "fill", label: "Age (years)", value: "28" },
      { kind: "click", label: "Calculate Weight Gain Plan" },
    ],
    expect: { text: ["Daily Calorie Target", "Weeks to Target"] },
  },
];
