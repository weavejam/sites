import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "C(10,3) = 120 combinations",
    actions: [
      { kind: "fill", label: "Total Items (n)", value: "10" },
      { kind: "fill", label: "Selected Items (r)", value: "3" },
      { kind: "click", label: "Combinations Only (nCr)" },
      { kind: "click", label: "Calculate Results" },
    ],
    expect: { text: ["Result", "120"] },
  },
  {
    name: "P(10,3) = 720 permutations",
    actions: [
      { kind: "fill", label: "Total Items (n)", value: "10" },
      { kind: "fill", label: "Selected Items (r)", value: "3" },
      { kind: "click", label: "Permutations Only (nPr)" },
      { kind: "click", label: "Calculate Results" },
    ],
    expect: { text: ["Result", "720"] },
  },
  {
    name: "C(52,5) = 2,598,960 poker hands",
    actions: [
      { kind: "fill", label: "Total Items (n)", value: "52" },
      { kind: "fill", label: "Selected Items (r)", value: "5" },
      { kind: "click", label: "Combinations Only (nCr)" },
      { kind: "click", label: "Calculate Results" },
    ],
    expect: { text: ["Result", "2,598,960"] },
  },
];
