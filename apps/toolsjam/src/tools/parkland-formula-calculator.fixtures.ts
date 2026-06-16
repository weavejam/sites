import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Adult 70kg 30% TBSA — 8400 mL total",
    actions: [
      { kind: "fill", label: "Body Weight (kg)", value: "70" },
      { kind: "fill", label: "Total Body Surface Area Burned (%)", value: "30" },
      { kind: "fill", label: "Time Since Burn Injury (hours)", value: "1" },
      { kind: "click", label: "Adult" },
      { kind: "click", label: "Full Thickness (3rd Degree)" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Fluid Resuscitation Plan", "8,400"] },
  },
  {
    name: "Pediatric 30kg 15% TBSA — 1800 mL total",
    actions: [
      { kind: "fill", label: "Body Weight (kg)", value: "30" },
      { kind: "fill", label: "Total Body Surface Area Burned (%)", value: "15" },
      { kind: "fill", label: "Time Since Burn Injury (hours)", value: "1" },
      { kind: "click", label: "Pediatric" },
      { kind: "click", label: "Partial Thickness (2nd Degree)" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Fluid Resuscitation Plan", "1,800"] },
  },
];
