import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "√12 ÷ √3 = 2",
    actions: [
      { kind: "fill", label: "First Radicand (a)", value: "12" },
      { kind: "fill", label: "Second Radicand (b)", value: "3" },
      { kind: "fill", label: "Index (n)", value: "2" },
      { kind: "click", label: "Calculate Division" },
    ],
    expect: { text: ["Result", "2"] },
  },
  {
    name: "√50 ÷ √2 = 5",
    actions: [
      { kind: "fill", label: "First Radicand (a)", value: "50" },
      { kind: "fill", label: "Second Radicand (b)", value: "2" },
      { kind: "fill", label: "Index (n)", value: "2" },
      { kind: "click", label: "Calculate Division" },
    ],
    expect: { text: ["Result", "5"] },
  },
  {
    name: "³√16 ÷ ³√2 = 2",
    actions: [
      { kind: "fill", label: "First Radicand (a)", value: "16" },
      { kind: "fill", label: "Second Radicand (b)", value: "2" },
      { kind: "fill", label: "Index (n)", value: "3" },
      { kind: "click", label: "Calculate Division" },
    ],
    expect: { text: ["Result", "2"] },
  },
];
