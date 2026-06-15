import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "10 > 5 — positive integers",
    actions: [
      { kind: "fill", label: "First Number (A)", value: "10" },
      { kind: "fill", label: "Second Number (B)", value: "5" },
      { kind: "click", label: "Compare Numbers" },
    ],
    expect: { text: ["Comparison Result", "10 > 5"] },
  },
  {
    name: "-3 < 2 — negative vs positive",
    actions: [
      { kind: "fill", label: "First Number (A)", value: "-3" },
      { kind: "fill", label: "Second Number (B)", value: "2" },
      { kind: "click", label: "Compare Numbers" },
    ],
    expect: { text: ["Comparison Result", "-3 < 2"] },
  },
  {
    name: "7.5 = 7.5 — equal decimals",
    actions: [
      { kind: "fill", label: "First Number (A)", value: "7.5" },
      { kind: "fill", label: "Second Number (B)", value: "7.5" },
      { kind: "click", label: "Compare Numbers" },
    ],
    expect: { text: ["Comparison Result", "7.5 = 7.5"] },
  },
];
