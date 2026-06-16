import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Weight-based: 70 kg × 5 mg/kg/day, max 400 mg → 350 mg/day",
    actions: [
      { kind: "click", label: "Weight-based" },
      { kind: "fill", label: "Body Weight (kg)", value: "70" },
      { kind: "fill", label: "Dose per kg (mg/kg/day)", value: "5" },
      { kind: "fill", label: "Maximum Daily Dose (mg/day)", value: "400" },
      { kind: "click", label: "Calculate Dose" },
    ],
    expect: { text: ["Hydroxychloroquine Dose Result", "350.0"] },
  },
  {
    name: "Weight-based capped: 90 kg × 5 mg/kg/day, max 400 → capped at 400",
    actions: [
      { kind: "click", label: "Weight-based" },
      { kind: "fill", label: "Body Weight (kg)", value: "90" },
      { kind: "fill", label: "Dose per kg (mg/kg/day)", value: "5" },
      { kind: "fill", label: "Maximum Daily Dose (mg/day)", value: "400" },
      { kind: "click", label: "Calculate Dose" },
    ],
    expect: { text: ["Hydroxychloroquine Dose Result", "400.0"] },
  },
];
