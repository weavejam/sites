import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Rare disease: prevalence=0.1%, sensitivity=99%, specificity=99%",
    actions: [
      { kind: "fill", label: "Prevalence of Condition (%)", value: "0.1" },
      { kind: "fill", label: "Test Sensitivity (%)", value: "99" },
      { kind: "fill", label: "Test Specificity (%)", value: "99" },
      { kind: "click", label: "Calculate Probability" },
    ],
    expect: { text: ["Probability of Having Condition (PPV)", "True Positives"] },
  },
  {
    name: "Common condition: prevalence=10%, sensitivity=95%, specificity=90%",
    actions: [
      { kind: "fill", label: "Prevalence of Condition (%)", value: "10" },
      { kind: "fill", label: "Test Sensitivity (%)", value: "95" },
      { kind: "fill", label: "Test Specificity (%)", value: "90" },
      { kind: "click", label: "Calculate Probability" },
    ],
    expect: { text: ["Probability of Not Having Condition (NPV)", "False Positives"] },
  },
];
