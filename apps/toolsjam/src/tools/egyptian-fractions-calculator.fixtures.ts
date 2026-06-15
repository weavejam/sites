import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2/3 — two-term Egyptian fraction",
    actions: [
      { kind: "fill", label: "Numerator", value: "2" },
      { kind: "fill", label: "Denominator", value: "3" },
      { kind: "click", label: "Convert to Egyptian Fractions" },
    ],
    expect: { text: ["Egyptian Fractions Result", "1/2 + 1/6"] },
  },
  {
    name: "4/5 — three-term Egyptian fraction",
    actions: [
      { kind: "fill", label: "Numerator", value: "4" },
      { kind: "fill", label: "Denominator", value: "5" },
      { kind: "click", label: "Convert to Egyptian Fractions" },
    ],
    expect: { text: ["Egyptian Fractions Result", "1/2 + 1/4 + 1/20"] },
  },
];
