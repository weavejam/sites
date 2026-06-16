import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Find chord length: radius=10, angle=60°",
    actions: [
      { kind: "click", label: "Find Chord Length" },
      { kind: "click", label: "Degrees" },
      { kind: "fill", label: "Radius", value: "10" },
      { kind: "fill", label: "Central Angle", value: "60" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Chord Length", "10"] },
  },
  {
    name: "Find radius: chord=10, angle=90°",
    actions: [
      { kind: "click", label: "Find Radius" },
      { kind: "click", label: "Degrees" },
      { kind: "fill", label: "Chord Length", value: "10" },
      { kind: "fill", label: "Central Angle", value: "90" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Radius", "7.07"] },
  },
  {
    name: "Find angle: radius=5, chord=5",
    actions: [
      { kind: "click", label: "Find Central Angle" },
      { kind: "click", label: "Degrees" },
      { kind: "fill", label: "Radius", value: "5" },
      { kind: "fill", label: "Chord Length", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Central Angle", "60"] },
  },
];
