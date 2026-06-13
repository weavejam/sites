import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Convert small decimal to scientific notation",
    actions: [
      { kind: "fill", label: "Number", value: "0.00047" },
      { kind: "click", label: "Convert Notation" },
    ],
    expect: { text: ["Result", "0.00047 = 4.7 × 10^-4"] },
  },
  {
    name: "Convert scientific notation back to standard",
    actions: [
      { kind: "click", label: "Exponential → Standard" },
      { kind: "fill", label: "Coefficient", value: "1.234" },
      { kind: "fill", label: "Exponent", value: "6" },
      { kind: "click", label: "Convert Notation" },
    ],
    expect: { text: "1.234 × 10^6 = 1,234,000" },
  },
];
