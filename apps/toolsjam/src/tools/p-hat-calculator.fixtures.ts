import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Political poll: 550/1000 → p̂ = 0.55",
    actions: [
      { kind: "fill", label: "Sample Size (n)", value: "1000" },
      { kind: "fill", label: "Number of Successes (x)", value: "550" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "p̂ (decimal)", "0.55"] },
  },
  {
    name: "Quality control: 15/200 → p̂ = 0.075",
    actions: [
      { kind: "fill", label: "Sample Size (n)", value: "200" },
      { kind: "fill", label: "Number of Successes (x)", value: "15" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "q̂ (decimal)"] },
  },
  {
    name: "Medical trial: 80/120 → p̂ ≈ 0.6667",
    actions: [
      { kind: "fill", label: "Sample Size (n)", value: "120" },
      { kind: "fill", label: "Number of Successes (x)", value: "80" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "p̂ (percent)"] },
  },
];
