import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Standard lognormal: μ=0, σ=1, x=1",
    actions: [
      { kind: "fill", label: "μ (log-scale mean)", value: "0" },
      { kind: "fill", label: "σ (log-scale std dev, > 0)", value: "1" },
      { kind: "fill", label: "x value (x > 0)", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Results", "PDF f(x)", "CDF F(x) = P(X ≤ x)", "Mean", "Median", "Variance"],
    },
  },
  {
    name: "Lognormal with μ=2, σ=0.5, x=10",
    actions: [
      { kind: "fill", label: "μ (log-scale mean)", value: "2" },
      { kind: "fill", label: "σ (log-scale std dev, > 0)", value: "0.5" },
      { kind: "fill", label: "x value (x > 0)", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Results", "PDF f(x)", "CDF F(x) = P(X ≤ x)", "Survival S(x) = P(X > x)", "Std Dev"],
    },
  },
];
