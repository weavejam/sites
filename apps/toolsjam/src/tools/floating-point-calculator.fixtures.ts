import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Pi (π) in double precision",
    actions: [
      { kind: "click", label: "Double Precision (64-bit)" },
      { kind: "fill", label: "Decimal Number", value: "3.141592653589793" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["IEEE 754 Representation", "Sign Bit", "Mantissa Bits"] },
  },
  {
    name: "0.1 in single precision shows rounding error",
    actions: [
      { kind: "click", label: "Single Precision (32-bit)" },
      { kind: "fill", label: "Decimal Number", value: "0.1" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["IEEE 754 Representation", "Rounding Error", "Stored Value"] },
  },
];
