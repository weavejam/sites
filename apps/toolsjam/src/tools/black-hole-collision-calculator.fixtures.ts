import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "GW150914-like binary → valid merger results",
    actions: [
      { kind: "fill", label: "Black Hole 1 Mass (M☉)", value: "36" },
      { kind: "fill", label: "Black Hole 2 Mass (M☉)", value: "29" },
      { kind: "fill", label: "Initial Separation (km)", value: "10000000" },
      { kind: "fill", label: "Orbital Eccentricity (0–0.99)", value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Merger Results", "Chirp Mass", "Schwarzschild Radius"] },
  },
  {
    name: "Equal-mass binary, circular orbit",
    actions: [
      { kind: "fill", label: "Black Hole 1 Mass (M☉)", value: "20" },
      { kind: "fill", label: "Black Hole 2 Mass (M☉)", value: "20" },
      { kind: "fill", label: "Initial Separation (km)", value: "5000000" },
      { kind: "fill", label: "Orbital Eccentricity (0–0.99)", value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Merger Results", "Peak GW Frequency (ISCO)", "Final Black Hole Mass"] },
  },
];
