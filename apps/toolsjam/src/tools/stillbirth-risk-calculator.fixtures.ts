import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Healthy young mother – Low risk",
    actions: [
      { kind: "fill", label: "Maternal Age (years)", value: "26" },
      { kind: "fill", label: "Gestational Age (weeks)", value: "28" },
      { kind: "click", label: "Calculate Risk" },
    ],
    expect: { text: ["Low Risk", "Risk Category"] },
  },
  {
    name: "Older mother with multiple risk factors – High/Very High risk",
    actions: [
      { kind: "fill", label: "Maternal Age (years)", value: "38" },
      { kind: "fill", label: "Gestational Age (weeks)", value: "36" },
      { kind: "click", label: "Calculate Risk" },
    ],
    expect: { text: ["Risk Category", "Risk Score"] },
  },
];
