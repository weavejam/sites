import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "AA: 30° + 60° = 90° third angle",
    actions: [
      { kind: "click", label: "Two Known Angles (AA)" },
      { kind: "fill", label: "Angle A (°)", value: "30" },
      { kind: "fill", label: "Angle B (°)", value: "60" },
      { kind: "click", label: "Calculate Angles" },
    ],
    expect: { text: ["Angles", "90"] },
  },
  {
    name: "AA: isosceles 50° + 50° = 80° vertex",
    actions: [
      { kind: "click", label: "Two Known Angles (AA)" },
      { kind: "fill", label: "Angle A (°)", value: "50" },
      { kind: "fill", label: "Angle B (°)", value: "50" },
      { kind: "click", label: "Calculate Angles" },
    ],
    expect: { text: ["Angles", "80"] },
  },
  {
    name: "SSS: equilateral 10-10-10 → all 60°",
    actions: [
      { kind: "click", label: "Three Known Sides (SSS)" },
      { kind: "fill", label: "Side a", value: "10" },
      { kind: "fill", label: "Side b", value: "10" },
      { kind: "fill", label: "Side c", value: "10" },
      { kind: "click", label: "Calculate Angles" },
    ],
    expect: { text: ["Angles", "60"] },
  },
  {
    name: "SSS: 3-4-5 right triangle → 90°",
    actions: [
      { kind: "click", label: "Three Known Sides (SSS)" },
      { kind: "fill", label: "Side a", value: "3" },
      { kind: "fill", label: "Side b", value: "4" },
      { kind: "fill", label: "Side c", value: "5" },
      { kind: "click", label: "Calculate Angles" },
    ],
    expect: { text: ["Angles", "90"] },
  },
];
