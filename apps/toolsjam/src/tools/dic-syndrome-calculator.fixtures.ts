import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Overt DIC – severe lab values → Score 8",
    actions: [
      { kind: "click", label: "Load Severe DIC" },
    ],
    expect: { text: ["Compatible with Overt DIC", "8"] },
  },
  {
    name: "Normal values – no DIC → Score 0",
    actions: [
      { kind: "click", label: "Load Normal Values" },
    ],
    expect: { text: ["No DIC Indicated", "0"] },
  },
  {
    name: "Manual moderate DIC entry",
    actions: [
      { kind: "fill", label: "Platelet Count (×10³/μL)", value: "80" },
      { kind: "fill", label: "Fibrinogen Level (mg/dL)", value: "120" },
      { kind: "fill", label: "Prothrombin Time — PT (seconds)", value: "18" },
      { kind: "fill", label: "D-dimer Level (μg/mL)", value: "8" },
      { kind: "click", label: "Calculate ISTH Score" },
    ],
    expect: { text: ["Compatible with Overt DIC", "5"] },
  },
];
