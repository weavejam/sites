import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Light rain: 5 mm/h × 2 h → 10 mm",
    actions: [
      { kind: "fill", label: "Rainfall Intensity (mm/h)", value: "5" },
      { kind: "fill", label: "Duration (hours)", value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["10", "Total Rainfall"] },
  },
  {
    name: "Heavy rain: 40 mm/h × 1.5 h with area → volume",
    actions: [
      { kind: "fill", label: "Rainfall Intensity (mm/h)", value: "40" },
      { kind: "fill", label: "Duration (hours)", value: "1.5" },
      { kind: "fill", label: "Area (km², optional)", value: "75" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["60", "Volume"] },
  },
];
