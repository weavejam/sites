import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2³ × 2² = 32 (same base)",
    actions: [
      { kind: "fill", label: "Base 1", value: "2" },
      { kind: "fill", label: "Exponent 1", value: "3" },
      { kind: "fill", label: "Base 2", value: "2" },
      { kind: "fill", label: "Exponent 2", value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "32"] },
  },
  {
    name: "3² × 4² = 144 (different bases)",
    actions: [
      { kind: "fill", label: "Base 1", value: "3" },
      { kind: "fill", label: "Exponent 1", value: "2" },
      { kind: "fill", label: "Base 2", value: "4" },
      { kind: "fill", label: "Exponent 2", value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "144"] },
  },
  {
    name: "10⁵ × 10⁻² = 1000 (same base, negative exponent)",
    actions: [
      { kind: "fill", label: "Base 1", value: "10" },
      { kind: "fill", label: "Exponent 1", value: "5" },
      { kind: "fill", label: "Base 2", value: "10" },
      { kind: "fill", label: "Exponent 2", value: "-2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1000"] },
  },
];
