import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal fertility parameters → Good grade",
    actions: [
      { kind: "fill", label: "Sperm Count (Million/mL)", value: "45" },
      { kind: "fill", label: "Semen Volume (mL)", value: "3.5" },
      { kind: "fill", label: "Progressive Motility (%)", value: "55" },
      { kind: "fill", label: "Normal Morphology (%)", value: "8" },
      { kind: "fill", label: "Sperm Vitality (%)", value: "75" },
      { kind: "fill", label: "pH Level", value: "7.4" },
      { kind: "fill", label: "Liquefaction Time (minutes)", value: "25" },
      { kind: "click", label: "Calculate Sperm Analysis" },
    ],
    expect: { text: ["Good", "/ 100"] },
  },
  {
    name: "Excellent fertility parameters",
    actions: [
      { kind: "fill", label: "Sperm Count (Million/mL)", value: "120" },
      { kind: "fill", label: "Semen Volume (mL)", value: "4.5" },
      { kind: "fill", label: "Progressive Motility (%)", value: "75" },
      { kind: "fill", label: "Normal Morphology (%)", value: "15" },
      { kind: "fill", label: "Sperm Vitality (%)", value: "85" },
      { kind: "fill", label: "pH Level", value: "7.6" },
      { kind: "fill", label: "Liquefaction Time (minutes)", value: "15" },
      { kind: "click", label: "Calculate Sperm Analysis" },
    ],
    expect: { text: ["Excellent", "/ 100"] },
  },
];
