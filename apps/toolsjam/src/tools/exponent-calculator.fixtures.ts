import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Raise 2 to the 10th power",
    actions: [
      { kind: "fill", label: "Base", value: "2" },
      { kind: "fill", label: "Exponent", value: "10" },
      { kind: "click", label: "Calculate Power" },
    ],
    expect: { text: ["Result", "2^10 = 1,024"] },
  },
  {
    name: "Square root via exponent 0.5",
    actions: [
      { kind: "fill", label: "Base", value: "9" },
      { kind: "fill", label: "Exponent", value: "0.5" },
      { kind: "click", label: "Calculate Power" },
    ],
    expect: { text: "9^0.5 = 3" },
  },
  {
    name: "Treat 0^0 as 1",
    actions: [
      { kind: "fill", label: "Base", value: "0" },
      { kind: "fill", label: "Exponent", value: "0" },
      { kind: "click", label: "Calculate Power" },
    ],
    expect: { text: "0^0 = 1" },
  },
];
