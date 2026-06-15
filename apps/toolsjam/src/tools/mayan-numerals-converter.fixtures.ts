import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Convert decimal 0 to Mayan",
    actions: [
      { kind: "click", label: "Decimal → Mayan" },
      { kind: "fill", label: "Decimal Number", value: "0" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Result", "0 × 1"] },
  },
  {
    name: "Convert decimal 20 to Mayan",
    actions: [
      { kind: "click", label: "Decimal → Mayan" },
      { kind: "fill", label: "Decimal Number", value: "20" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Result", "1 × 20"] },
  },
  {
    name: "Convert Mayan 1.5.3 to decimal",
    actions: [
      { kind: "click", label: "Mayan → Decimal" },
      { kind: "fill", label: "Mayan Position Values (e.g. 1.5.3)", value: "1.5.3" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Result", "503"] },
  },
];
