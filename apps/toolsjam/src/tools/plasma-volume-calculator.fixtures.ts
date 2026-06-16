import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Male 75kg, Hct 45% → ~2887 mL plasma volume",
    actions: [
      { kind: "fill", label: "Weight (kg)", value: "75" },
      { kind: "fill", label: "Height (cm)", value: "180" },
      { kind: "fill", label: "Age (years)", value: "35" },
      { kind: "fill", label: "Hematocrit (%)", value: "45" },
      { kind: "click", label: "Calculate Plasma Volume" },
    ],
    expect: { text: ["Plasma Volume Results", "mL"] },
  },
  {
    name: "Female 65kg, Hct 42% → ~2450 mL plasma volume",
    actions: [
      { kind: "fill", label: "Weight (kg)", value: "65" },
      { kind: "fill", label: "Height (cm)", value: "165" },
      { kind: "fill", label: "Age (years)", value: "28" },
      { kind: "fill", label: "Hematocrit (%)", value: "42" },
      { kind: "click", label: "Calculate Plasma Volume" },
    ],
    expect: { text: ["Plasma Volume Results", "mL"] },
  },
];
