import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "GCF and LCM of 12, 18, 30",
    actions: [
      { kind: "fill", label: "Numbers", value: "12, 18, 30" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["GCF", "LCM"] },
  },
  {
    name: "GCF and LCM of 24, 36",
    actions: [
      { kind: "fill", label: "Numbers", value: "24, 36" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["GCF", "LCM", "12"] },
  },
  {
    name: "GCF and LCM via example button",
    actions: [
      { kind: "click", label: "12, 18, 30" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["GCF", "LCM"] },
  },
];
