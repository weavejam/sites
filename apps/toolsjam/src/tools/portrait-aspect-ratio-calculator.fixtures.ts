import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "1080x1350 pixels → 4:5 ratio",
    actions: [
      { kind: "click", label: "Pixels" },
      { kind: "fill", label: "Width (Pixels)", value: "1080" },
      { kind: "fill", label: "Height (Pixels)", value: "1350" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Aspect Ratio Results", "4:5", "Portrait"] },
  },
  {
    name: "1080x1920 pixels → 9:16 ratio",
    actions: [
      { kind: "click", label: "Pixels" },
      { kind: "fill", label: "Width (Pixels)", value: "1080" },
      { kind: "fill", label: "Height (Pixels)", value: "1920" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Aspect Ratio Results", "9:16", "Portrait"] },
  },
];
