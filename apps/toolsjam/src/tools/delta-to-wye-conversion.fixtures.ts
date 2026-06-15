import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Balanced Delta R1=R2=R3=10 → Wye Ra=Rb=Rc=3.333",
    actions: [
      { kind: "click", label: "Delta to Wye (Δ → Y)" },
      { kind: "fill", label: "Resistance R1 (Ω)", value: "10" },
      { kind: "fill", label: "Resistance R2 (Ω)", value: "10" },
      { kind: "fill", label: "Resistance R3 (Ω)", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Delta to Wye Results", "Ra", "Rb", "Rc"] },
  },
  {
    name: "Unbalanced Delta R1=5 R2=10 R3=15 → Wye Ra=2.5 Rb=1.667 Rc=5",
    actions: [
      { kind: "click", label: "Delta to Wye (Δ → Y)" },
      { kind: "fill", label: "Resistance R1 (Ω)", value: "5" },
      { kind: "fill", label: "Resistance R2 (Ω)", value: "10" },
      { kind: "fill", label: "Resistance R3 (Ω)", value: "15" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Delta to Wye Results", "2.5"] },
  },
  {
    name: "Wye R1=6 R2=8 R3=12 → Delta R12=18 R23=36 R31=27",
    actions: [
      { kind: "click", label: "Wye to Delta (Y → Δ)" },
      { kind: "fill", label: "Resistance R1 (Ω)", value: "6" },
      { kind: "fill", label: "Resistance R2 (Ω)", value: "8" },
      { kind: "fill", label: "Resistance R3 (Ω)", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Wye to Delta Results", "18", "36", "27"] },
  },
];
