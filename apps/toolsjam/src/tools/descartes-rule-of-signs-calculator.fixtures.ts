import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "x²-3x+2 → 2 sign changes, 0 negative",
    actions: [
      { kind: "fill", label: "Coefficients (descending order)", value: "1,-3,2" },
      { kind: "click", label: "Analyze Signs" },
    ],
    expect: { text: ["Sign Analysis", "Sign changes: 2", "Sign changes: 0"] },
  },
  {
    name: "x³-2x²+5x-3 → 3 sign changes",
    actions: [
      { kind: "fill", label: "Coefficients (descending order)", value: "1,-2,5,-3" },
      { kind: "click", label: "Analyze Signs" },
    ],
    expect: { text: ["Sign Analysis", "Sign changes: 3"] },
  },
  {
    name: "x²+x+1 → 0 positive roots",
    actions: [
      { kind: "fill", label: "Coefficients (descending order)", value: "1,1,1" },
      { kind: "click", label: "Analyze Signs" },
    ],
    expect: { text: ["Sign Analysis", "Sign changes: 0"] },
  },
];
