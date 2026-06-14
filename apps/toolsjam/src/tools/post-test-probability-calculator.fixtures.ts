import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Common disease: prior=20%, sens=85%, spec=80%",
    actions: [
      { kind: "fill", label: "Prior Probability (Pre-test) (%)", value: "20" },
      { kind: "fill", label: "Test Sensitivity (True Positive Rate) (%)", value: "85" },
      { kind: "fill", label: "Test Specificity (True Negative Rate) (%)", value: "80" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Post-test Probability"] },
  },
  {
    name: "Rare disease: prior=0.1%, sens=99%, spec=99%",
    actions: [
      { kind: "fill", label: "Prior Probability (Pre-test) (%)", value: "0.1" },
      { kind: "fill", label: "Test Sensitivity (True Positive Rate) (%)", value: "99" },
      { kind: "fill", label: "Test Specificity (True Negative Rate) (%)", value: "99" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "PPV"] },
  },
  {
    name: "High sensitivity scenario: prior=5%, sens=99.5%, spec=85%",
    actions: [
      { kind: "fill", label: "Prior Probability (Pre-test) (%)", value: "5" },
      { kind: "fill", label: "Test Sensitivity (True Positive Rate) (%)", value: "99.5" },
      { kind: "fill", label: "Test Specificity (True Negative Rate) (%)", value: "85" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "LR+"] },
  },
];
