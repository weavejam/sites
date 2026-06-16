import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal growth (FH 24 cm at 24 weeks)",
    actions: [
      { kind: "fill", label: "Fundal Height (cm)", value: "24" },
      { kind: "fill", label: "Gestational Age (weeks)", value: "24" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Normal Growth", "22–26"] },
  },
  {
    name: "Small for gestational age (FH 20 cm at 24 weeks)",
    actions: [
      { kind: "fill", label: "Fundal Height (cm)", value: "20" },
      { kind: "fill", label: "Gestational Age (weeks)", value: "24" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Small for Gestational Age"] },
  },
];
