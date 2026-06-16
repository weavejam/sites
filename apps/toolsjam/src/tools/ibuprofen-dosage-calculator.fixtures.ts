import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Child liquid dosing for 16 kg patient",
    actions: [
      { kind: "fill", label: "Weight (kg)", value: "16" },
      { kind: "fill", label: "Age (years, optional)", value: "5" },
      { kind: "click", label: "Child" },
      { kind: "click", label: "Liquid" },
      { kind: "fill", label: "Concentration (mg/mL)", value: "20" },
      { kind: "fill", label: "Doses per day", value: "4" },
      { kind: "fill", label: "Interval (hours)", value: "6" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "160", "8"] },
  },
  {
    name: "Adult tablet dosing with 250 mg tablets",
    actions: [
      { kind: "fill", label: "Weight (kg)", value: "72" },
      { kind: "click", label: "Adult" },
      { kind: "click", label: "Tablet" },
      { kind: "fill", label: "Tablet strength (mg)", value: "250" },
      { kind: "fill", label: "Doses per day", value: "3" },
      { kind: "fill", label: "Interval (hours)", value: "8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "400", "1.6"] },
  },
];
