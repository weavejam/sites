import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Healthy young adult QP 82",
    actions: [
      { kind: "fill", label: "Physical Health Rating (1–10)", value: "8" },
      { kind: "fill", label: "Mental Health Rating (1–10)", value: "9" },
      { kind: "fill", label: "Social Functioning Rating (1–10)", value: "8" },
      { kind: "fill", label: "Pain Level (0–10)", value: "2" },
      { kind: "fill", label: "Energy Level (1–10)", value: "8" },
      { kind: "fill", label: "Sleep Quality (1–10)", value: "7" },
      { kind: "fill", label: "Daily Activities Rating (1–10)", value: "9" },
      { kind: "fill", label: "Life Satisfaction (1–10)", value: "8" },
      { kind: "click", label: "Calculate QP-QS Score" },
    ],
    expect: { text: ["82", "Very Good"] },
  },
  {
    name: "Chronic condition QP 59",
    actions: [
      { kind: "fill", label: "Physical Health Rating (1–10)", value: "5" },
      { kind: "fill", label: "Mental Health Rating (1–10)", value: "6" },
      { kind: "fill", label: "Social Functioning Rating (1–10)", value: "7" },
      { kind: "fill", label: "Pain Level (0–10)", value: "6" },
      { kind: "fill", label: "Energy Level (1–10)", value: "4" },
      { kind: "fill", label: "Sleep Quality (1–10)", value: "5" },
      { kind: "fill", label: "Daily Activities Rating (1–10)", value: "6" },
      { kind: "fill", label: "Life Satisfaction (1–10)", value: "6" },
      { kind: "click", label: "Calculate QP-QS Score" },
    ],
    expect: { text: ["59", "Fair"] },
  },
];
