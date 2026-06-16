import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Child 20kg liquid — 300mg / 9.38ml",
    actions: [
      { kind: "fill", label: "Weight (kg)", value: "20" },
      { kind: "fill", label: "Age (years, optional)", value: "7" },
      { kind: "fill", label: "Dosage (mg/kg)", value: "15" },
      { kind: "click", label: "Liquid" },
      { kind: "fill", label: "Liquid Concentration (mg/ml)", value: "32" },
      { kind: "fill", label: "Doses Per Day", value: "4" },
      { kind: "fill", label: "Dose Interval (hours)", value: "6" },
      { kind: "click", label: "Calculate Dosage" },
    ],
    expect: { text: ["Dosage Result", "300", "9.38"] },
  },
  {
    name: "Adult 70kg tablet — 1000mg / 2 tablets",
    actions: [
      { kind: "fill", label: "Weight (kg)", value: "70" },
      { kind: "fill", label: "Age (years, optional)", value: "25" },
      { kind: "fill", label: "Dosage (mg/kg)", value: "15" },
      { kind: "click", label: "Tablet" },
      { kind: "fill", label: "Tablet Strength (mg)", value: "500" },
      { kind: "fill", label: "Doses Per Day", value: "4" },
      { kind: "fill", label: "Dose Interval (hours)", value: "6" },
      { kind: "click", label: "Calculate Dosage" },
    ],
    expect: { text: ["Dosage Result", "1000", "2"] },
  },
];
