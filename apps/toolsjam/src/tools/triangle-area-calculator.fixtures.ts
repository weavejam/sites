import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Base and height: 10 × 6 → area 30",
    actions: [
      { kind: "click", label: "Base & Height" },
      { kind: "fill", label: "Base", value: "10" },
      { kind: "fill", label: "Height", value: "6" },
      { kind: "click", label: "Calculate Area" },
    ],
    expect: { text: ["Area", "30"] },
  },
  {
    name: "Three sides 13-14-15 → area 84 (Heron's)",
    actions: [
      { kind: "click", label: "Three Sides (Heron's)" },
      { kind: "fill", label: "Side A", value: "13" },
      { kind: "fill", label: "Side B", value: "14" },
      { kind: "fill", label: "Side C", value: "15" },
      { kind: "click", label: "Calculate Area" },
    ],
    expect: { text: ["Area", "84"] },
  },
  {
    name: "SAS: sides 7 & 10, angle 90° → area 35",
    actions: [
      { kind: "click", label: "Two Sides & Angle (SAS)" },
      { kind: "fill", label: "Side A", value: "7" },
      { kind: "fill", label: "Side B", value: "10" },
      { kind: "fill", label: "Included Angle C (degrees)", value: "90" },
      { kind: "click", label: "Calculate Area" },
    ],
    expect: { text: ["Area", "35"] },
  },
];
