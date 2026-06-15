import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Standard portal: Overworld X=1000, Z=500",
    actions: [
      { kind: "fill", label: "Overworld X Coordinate", value: "1000" },
      { kind: "fill", label: "Overworld Y Coordinate", value: "64" },
      { kind: "fill", label: "Overworld Z Coordinate", value: "500" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Portal Calculation Results", "Nether Coordinates", "Obsidian Required"],
    },
  },
  {
    name: "Large portal: Overworld X=800, Z=1600, 4x5 inner",
    actions: [
      { kind: "fill", label: "Overworld X Coordinate", value: "800" },
      { kind: "fill", label: "Overworld Y Coordinate", value: "64" },
      { kind: "fill", label: "Overworld Z Coordinate", value: "1600" },
      { kind: "fill", label: "Portal Width (Optional, inner blocks)", value: "4" },
      { kind: "fill", label: "Portal Height (Optional, inner blocks)", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Portal Calculation Results", "Obsidian Required", "4×5"],
    },
  },
];
