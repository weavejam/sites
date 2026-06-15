import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Simple scene — 50K polys, 1024px, 5 tex, 3 lights, Medium, 8 cores, 8GB, complexity 1.0",
    actions: [
      { kind: "fill", label: "Polygon Count", value: "50000" },
      { kind: "fill", label: "Texture Resolution (px)", value: "1024" },
      { kind: "fill", label: "Number of Textures", value: "5" },
      { kind: "fill", label: "Number of Lights", value: "3" },
      { kind: "click", label: "Medium" },
      { kind: "fill", label: "CPU Cores", value: "8" },
      { kind: "fill", label: "GPU Memory (GB)", value: "8" },
      { kind: "fill", label: "Scene Complexity Factor", value: "1.0" },
      { kind: "click", label: "Calculate Render Time" },
    ],
    expect: { text: "Estimated Render Time" },
  },
  {
    name: "High-quality scene — 2M polys, 4096px, 25 tex, 12 lights, High, 16 cores, 16GB, complexity 1.8",
    actions: [
      { kind: "fill", label: "Polygon Count", value: "2000000" },
      { kind: "fill", label: "Texture Resolution (px)", value: "4096" },
      { kind: "fill", label: "Number of Textures", value: "25" },
      { kind: "fill", label: "Number of Lights", value: "12" },
      { kind: "click", label: "High" },
      { kind: "fill", label: "CPU Cores", value: "16" },
      { kind: "fill", label: "GPU Memory (GB)", value: "16" },
      { kind: "fill", label: "Scene Complexity Factor", value: "1.8" },
      { kind: "click", label: "Calculate Render Time" },
    ],
    expect: { text: "Estimated Render Time" },
  },
];
