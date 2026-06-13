import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "a=2, b=10 → PDF=0.125, Mean=6, Variance≈5.333",
    actions: [
      { kind: "fill", label: "Minimum Value (a)", value: "2" },
      { kind: "fill", label: "Maximum Value (b)", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["PDF", "Mean", "Variance"] },
  },
  {
    name: "a=0, b=1 → CDF(0.75)=0.75",
    actions: [
      { kind: "fill", label: "Minimum Value (a)", value: "0" },
      { kind: "fill", label: "Maximum Value (b)", value: "1" },
      { kind: "fill", label: "Point value (x) for CDF", value: "0.75" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["CDF", "0.75"] },
  },
];
