import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Mild hepatitis - MDF 11.7 (Low Risk)",
    actions: [
      { kind: "fill", label: "Prothrombin Time (PT) (seconds)", value: "14.0" },
      { kind: "fill", label: "Control PT (seconds)", value: "12.0" },
      { kind: "fill", label: "Total Bilirubin (mg/dL)", value: "2.5" },
      { kind: "click", label: "Calculate Score" },
    ],
    expect: { text: ["Maddrey's Discriminant Function Score", "11.7", "Low Risk"] },
  },
  {
    name: "Severe hepatitis - MDF 51.8 (Severe Disease)",
    actions: [
      { kind: "fill", label: "Prothrombin Time (PT) (seconds)", value: "20.0" },
      { kind: "fill", label: "Control PT (seconds)", value: "12.0" },
      { kind: "fill", label: "Total Bilirubin (mg/dL)", value: "15.0" },
      { kind: "click", label: "Calculate Score" },
    ],
    expect: { text: ["Maddrey's Discriminant Function Score", "51.8", "Severe Disease"] },
  },
];
