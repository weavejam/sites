import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Low risk patient – IPI 0 → Low risk group",
    actions: [
      { kind: "click", label: "Load Low Risk Patient" },
    ],
    expect: { text: ["Low (IPI 0–1)", "~73%"] },
  },
  {
    name: "High risk patient – IPI 5 → High risk group",
    actions: [
      { kind: "click", label: "Load High Risk Patient" },
    ],
    expect: { text: ["High (IPI 4–5)", "~26%"] },
  },
  {
    name: "Manual entry – age 70, ECOG 2, Stage IV, elevated LDH → High",
    actions: [
      { kind: "fill", label: "Age (years)", value: "70" },
      { kind: "fill", label: "Number of Extranodal Sites", value: "2" },
      { kind: "click", label: "ECOG 2" },
      { kind: "click", label: "Stage IV" },
      { kind: "click", label: "Elevated LDH" },
      { kind: "click", label: "Calculate Prognosis" },
    ],
    expect: { text: ["IPI Score", "High (IPI 4–5)"] },
  },
];
