import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Low risk patient — all No, score 0",
    actions: [
      { kind: "click", label: "Low Risk Patient" },
      { kind: "click", label: "Calculate Risk" },
    ],
    expect: { text: ["HAS-BLED Score", "Low Risk"] },
  },
  {
    name: "High risk patient — 7 criteria present, very high risk",
    actions: [
      { kind: "click", label: "High Risk Patient" },
      { kind: "click", label: "Calculate Risk" },
    ],
    expect: { text: ["HAS-BLED Score", "Very High Risk"] },
  },
  {
    name: "Validation error when no criteria answered",
    actions: [
      { kind: "click", label: "Calculate Risk" },
    ],
    expect: { text: "Please select Yes or No for all eight criteria." },
  },
];
