import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "New York City antipode (Indian Ocean)",
    actions: [
      { kind: "fill", label: "Latitude", value: "40.7128" },
      { kind: "fill", label: "Longitude", value: "-74.006" },
      { kind: "click", label: "Calculate Antipode" },
    ],
    expect: { text: ["Antipodal Point", "S", "E"] },
  },
  {
    name: "London antipode (Pacific Ocean near NZ)",
    actions: [
      { kind: "fill", label: "Latitude", value: "51.5074" },
      { kind: "fill", label: "Longitude", value: "-0.1278" },
      { kind: "click", label: "Calculate Antipode" },
    ],
    expect: { text: ["Antipodal Point", "20,015"] },
  },
];
