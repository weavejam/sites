import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Sum/Difference: z = 1*(10.5) + 1*(5.2)",
    actions: [
      { kind: "click", label: "Sum / Difference (z = ax + by)" },
      { kind: "fill", label: "Constant A", value: "1" },
      { kind: "fill", label: "Value of X", value: "10.5" },
      { kind: "fill", label: "Uncertainty in X (Δx)", value: "0.2" },
      { kind: "fill", label: "Constant B", value: "1" },
      { kind: "fill", label: "Value of Y", value: "5.2" },
      { kind: "fill", label: "Uncertainty in Y (Δy)", value: "0.1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "15.7"] },
  },
  {
    name: "Product/Power: z = 1 * 5^1 * 10^1",
    actions: [
      { kind: "click", label: "Product / Power (z = k · xᵃ · yᵇ)" },
      { kind: "fill", label: "Constant K", value: "1" },
      { kind: "fill", label: "Value of X", value: "5.0" },
      { kind: "fill", label: "Uncertainty in X (Δx)", value: "0.1" },
      { kind: "fill", label: "Exponent 'a'", value: "1" },
      { kind: "fill", label: "Value of Y", value: "10.0" },
      { kind: "fill", label: "Uncertainty in Y (Δy)", value: "0.2" },
      { kind: "fill", label: "Exponent 'b'", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "50"] },
  },
];
