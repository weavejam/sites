import type { ToolFixture } from "@/tools/fixture";

// Killip defaults to "I", diabetes/anteriorSTE default to "no"
export const fixtures: ToolFixture[] = [
  {
    name: "Low risk STEMI — young patient, normal vitals, score 0",
    actions: [
      { kind: "fill", label: "Age (years)", value: "45" },
      { kind: "fill", label: "Systolic Blood Pressure (mmHg)", value: "140" },
      { kind: "fill", label: "Heart Rate (bpm)", value: "75" },
      { kind: "fill", label: "Weight (kg)", value: "70" },
      { kind: "fill", label: "Time to Treatment (hours)", value: "2" },
      { kind: "click", label: "Calculate TIMI STEMI Score" },
    ],
    expect: { text: ["0 / 14", "0.8%", "Low Risk"] },
  },
  {
    name: "High risk STEMI — elderly with cardiogenic shock via example button",
    actions: [
      { kind: "click", label: "Load High Risk" },
    ],
    expect: { text: ["/ 14", "%", "Risk"] },
  },
];
