import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Cessna 172 metric 1111kg 16.2m² → wing loading ~68.6 kg/m²",
    actions: [
      { kind: "click", label: "Metric (kg / m²)" },
      { kind: "fill", label: "Aircraft Weight", value: "1111" },
      { kind: "fill", label: "Wing Area", value: "16.2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Wing Loading Results", "Wing Loading"] },
  },
  {
    name: "Glider metric 600kg 12.5m² → wing loading 48 kg/m²",
    actions: [
      { kind: "click", label: "Metric (kg / m²)" },
      { kind: "fill", label: "Aircraft Weight", value: "600" },
      { kind: "fill", label: "Wing Area", value: "12.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Wing Loading Results", "Stall Speed"] },
  },
];
