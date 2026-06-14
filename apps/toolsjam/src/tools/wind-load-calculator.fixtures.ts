import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Residential v=20 h=8 w=12 Cd=1.3 Suburban → wind force shown",
    actions: [
      { kind: "fill", label: "Wind Speed (m/s)", value: "20" },
      { kind: "fill", label: "Building Height (m)", value: "8" },
      { kind: "fill", label: "Building Width (m)", value: "12" },
      { kind: "fill", label: "Building Length (m)", value: "15" },
      { kind: "fill", label: "Drag Coefficient (Cd)", value: "1.3" },
      { kind: "click", label: "2 – Suburban" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Wind Load Results", "Total Wind Force"] },
  },
  {
    name: "Industrial v=25 h=15 w=60 Cd=1.2 Open terrain → large force",
    actions: [
      { kind: "fill", label: "Wind Speed (m/s)", value: "25" },
      { kind: "fill", label: "Building Height (m)", value: "15" },
      { kind: "fill", label: "Building Width (m)", value: "60" },
      { kind: "fill", label: "Building Length (m)", value: "100" },
      { kind: "fill", label: "Drag Coefficient (Cd)", value: "1.2" },
      { kind: "click", label: "1 – Open Terrain" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Wind Load Results", "Dynamic Pressure"] },
  },
];
