import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "New York to London great-circle distance",
    actions: [
      { kind: "fill", label: "Latitude (Point 1)", value: "40.7128" },
      { kind: "fill", label: "Longitude (Point 1)", value: "-74.0060" },
      { kind: "fill", label: "Latitude (Point 2)", value: "51.5074" },
      { kind: "fill", label: "Longitude (Point 2)", value: "-0.1278" },
      { kind: "click", label: "Kilometers (km)" },
      { kind: "click", label: "Calculate Distance" },
    ],
    expect: { text: ["Great-Circle Distance"] },
  },
  {
    name: "Sydney to Tokyo great-circle distance in miles",
    actions: [
      { kind: "fill", label: "Latitude (Point 1)", value: "-33.8688" },
      { kind: "fill", label: "Longitude (Point 1)", value: "151.2093" },
      { kind: "fill", label: "Latitude (Point 2)", value: "35.6895" },
      { kind: "fill", label: "Longitude (Point 2)", value: "139.6917" },
      { kind: "click", label: "Miles (mi)" },
      { kind: "click", label: "Calculate Distance" },
    ],
    expect: { text: ["Great-Circle Distance"] },
  },
];
