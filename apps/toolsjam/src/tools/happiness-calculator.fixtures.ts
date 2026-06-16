import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "High happiness profile — score 8.4, excellent",
    actions: [
      { kind: "fill", label: "Overall Life Satisfaction (1–10)", value: "9" },
      { kind: "fill", label: "Relationship Quality (1–10)", value: "9" },
      { kind: "fill", label: "Career / Work Satisfaction (1–10)", value: "8" },
      { kind: "fill", label: "Physical Health & Wellness (1–10)", value: "8" },
      { kind: "fill", label: "Personal Growth & Learning (1–10)", value: "9" },
      { kind: "fill", label: "Financial Security (1–10)", value: "8" },
      { kind: "fill", label: "Work-Life Balance (1–10)", value: "7" },
      { kind: "fill", label: "Sense of Purpose & Meaning (1–10)", value: "9" },
      { kind: "click", label: "Calculate Happiness Score" },
    ],
    expect: { text: ["Your Happiness Score", "Excellent Well-Being"] },
  },
  {
    name: "Areas for improvement profile — score ~4.1, moderate",
    actions: [
      { kind: "fill", label: "Overall Life Satisfaction (1–10)", value: "4" },
      { kind: "fill", label: "Relationship Quality (1–10)", value: "6" },
      { kind: "fill", label: "Career / Work Satisfaction (1–10)", value: "4" },
      { kind: "fill", label: "Physical Health & Wellness (1–10)", value: "5" },
      { kind: "fill", label: "Personal Growth & Learning (1–10)", value: "3" },
      { kind: "fill", label: "Financial Security (1–10)", value: "3" },
      { kind: "fill", label: "Work-Life Balance (1–10)", value: "4" },
      { kind: "fill", label: "Sense of Purpose & Meaning (1–10)", value: "4" },
      { kind: "click", label: "Calculate Happiness Score" },
    ],
    expect: { text: ["Your Happiness Score", "Moderate Well-Being"] },
  },
  {
    name: "Balanced life profile — score ~7.1, good",
    actions: [
      { kind: "fill", label: "Overall Life Satisfaction (1–10)", value: "7" },
      { kind: "fill", label: "Relationship Quality (1–10)", value: "8" },
      { kind: "fill", label: "Career / Work Satisfaction (1–10)", value: "7" },
      { kind: "fill", label: "Physical Health & Wellness (1–10)", value: "7" },
      { kind: "fill", label: "Personal Growth & Learning (1–10)", value: "6" },
      { kind: "fill", label: "Financial Security (1–10)", value: "7" },
      { kind: "fill", label: "Work-Life Balance (1–10)", value: "8" },
      { kind: "fill", label: "Sense of Purpose & Meaning (1–10)", value: "7" },
      { kind: "click", label: "Calculate Happiness Score" },
    ],
    expect: { text: ["Your Happiness Score", "Good Well-Being"] },
  },
];
