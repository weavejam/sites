import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Find P(A|B): P(A∩B)=0.18, P(B)=0.6 → 0.3",
    actions: [
      { kind: "click", label: "Find P(A|B)" },
      { kind: "fill", label: "P(A ∩ B) — Joint Probability", value: "0.18" },
      { kind: "fill", label: "P(B) — Probability of Event B", value: "0.6" },
      { kind: "click", label: "Calculate Probability" },
    ],
    expect: { text: ["Result", "P(A|B) = 0.3"] },
  },
  {
    name: "Find P(A∩B): P(A|B)=0.02, P(B)=0.15 → 0.003",
    actions: [
      { kind: "click", label: "Find P(A∩B)" },
      { kind: "fill", label: "P(A|B) — Conditional Probability", value: "0.02" },
      { kind: "fill", label: "P(B) — Probability of Event B", value: "0.15" },
      { kind: "click", label: "Calculate Probability" },
    ],
    expect: { text: ["Result", "P(A∩B) = 0.003"] },
  },
  {
    name: "Find P(B): P(A|B)=0.4, P(A∩B)=0.12 → 0.3",
    actions: [
      { kind: "click", label: "Find P(B)" },
      { kind: "fill", label: "P(A|B) — Conditional Probability", value: "0.4" },
      { kind: "fill", label: "P(A ∩ B) — Joint Probability", value: "0.12" },
      { kind: "click", label: "Calculate Probability" },
    ],
    expect: { text: ["Result", "P(B) = 0.3"] },
  },
];
