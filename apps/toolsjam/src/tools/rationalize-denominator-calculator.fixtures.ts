import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Simple radical denominator",
    actions: [
      { kind: "click", label: "Simple (√b)" },
      { kind: "fill", label: "Numerator (a)", value: "3" },
      { kind: "fill", label: "Radicand (b)", value: "5" },
      { kind: "click", label: "Rationalize" },
    ],
    expect: { text: ["Result", "Rationalized form: (3√5)/5"] },
  },
  {
    name: "Binomial radical denominator",
    actions: [
      { kind: "click", label: "Binomial (c ± √b)" },
      { kind: "fill", label: "Numerator", value: "2" },
      { kind: "fill", label: "Rational part (c)", value: "3" },
      { kind: "fill", label: "Radical part (b)", value: "2" },
      { kind: "click", label: "Rationalize" },
    ],
    expect: { text: "Rationalized form: 2(3 - √2)/7" },
  },
];
