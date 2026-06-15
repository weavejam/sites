import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Mild steel F=3000 D=10 d=3.2 → ~363 HB",
    actions: [
      { kind: "fill", label: "Load (kgf)", value: "3000" },
      { kind: "fill", label: "Ball Diameter (mm)", value: "10" },
      { kind: "fill", label: "Indentation Diameter (mm)", value: "3.2" },
      { kind: "click", label: "Calculate Hardness" },
    ],
    expect: { text: ["Results", "HB"] },
  },
  {
    name: "Aluminum alloy F=1000 D=10 d=4.8 → ~108 HB",
    actions: [
      { kind: "fill", label: "Load (kgf)", value: "1000" },
      { kind: "fill", label: "Ball Diameter (mm)", value: "10" },
      { kind: "fill", label: "Indentation Diameter (mm)", value: "4.8" },
      { kind: "click", label: "Calculate Hardness" },
    ],
    expect: { text: ["Results", "HB"] },
  },
  {
    name: "Brass F=250 D=5 d=1.8 → ~186 HB",
    actions: [
      { kind: "fill", label: "Load (kgf)", value: "250" },
      { kind: "fill", label: "Ball Diameter (mm)", value: "5" },
      { kind: "fill", label: "Indentation Diameter (mm)", value: "1.8" },
      { kind: "click", label: "Calculate Hardness" },
    ],
    expect: { text: ["Results", "HB"] },
  },
];
