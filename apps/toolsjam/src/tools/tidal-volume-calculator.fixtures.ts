import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Male 175 cm, 80 kg – IBW and TV targets",
    actions: [
      { kind: "fill", label: "Patient Weight (kg)", value: "80" },
      { kind: "fill", label: "Patient Height (cm)", value: "175" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Ideal Body Weight (IBW)", "Tidal Volume at 6 mL/kg IBW"] },
  },
  {
    name: "Female 160 cm, 55 kg with RR and MV",
    actions: [
      { kind: "fill", label: "Patient Weight (kg)", value: "55" },
      { kind: "fill", label: "Patient Height (cm)", value: "160" },
      { kind: "fill", label: "Respiratory Rate (breaths/min)", value: "14" },
      { kind: "fill", label: "Minute Ventilation (L/min)", value: "7.0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Tidal Volume from RR & MV"] },
  },
];
