import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "30-year mortgage monthly payment",
    actions: [
      { kind: "fill", label: "Loan Amount", value: "240000" },
      { kind: "fill", label: "Annual Interest Rate (%)", value: "6.5" },
      { kind: "fill", label: "Loan Term (Years)", value: "30" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Monthly Payment", "$1,516.96"] },
  },
  {
    name: "Auto loan with down payment",
    actions: [
      { kind: "fill", label: "Loan Amount", value: "25000" },
      { kind: "fill", label: "Annual Interest Rate (%)", value: "4.25" },
      { kind: "fill", label: "Loan Term (Years)", value: "5" },
      { kind: "fill", label: "Down Payment (Optional)", value: "5000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Monthly Payment", "$370.59", "Total Interest"] },
  },
];
