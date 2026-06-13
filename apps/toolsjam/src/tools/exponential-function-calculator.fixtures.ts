import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Evaluate 2·3^4 + 1",
    actions: [
      { kind: "fill", label: "Coefficient (a)", value: "2" },
      { kind: "fill", label: "Base (b)", value: "3" },
      { kind: "fill", label: "Input value (x)", value: "4" },
      { kind: "fill", label: "Vertical shift (c)", value: "1" },
      { kind: "click", label: "Evaluate Function" },
    ],
    expect: { text: ["Result", "f(4) = 2 · 3^4 + 1 = 163"] },
  },
  {
    name: "Evaluate negative x input",
    actions: [
      { kind: "fill", label: "Coefficient (a)", value: "3" },
      { kind: "fill", label: "Base (b)", value: "2" },
      { kind: "fill", label: "Input value (x)", value: "-2" },
      { kind: "fill", label: "Vertical shift (c)", value: "5" },
      { kind: "click", label: "Evaluate Function" },
    ],
    expect: { text: "f(-2) = 3 · 2^-2 + 5 = 5.75" },
  },
];
