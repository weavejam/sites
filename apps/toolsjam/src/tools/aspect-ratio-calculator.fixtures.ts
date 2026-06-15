import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "1920×1080 → 16:9",
    actions: [
      { kind: "fill", label: "Width", value: "1920" },
      { kind: "fill", label: "Height", value: "1080" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Aspect Ratio Results", "16:9"] },
  },
  {
    name: "1024×768 → 4:3",
    actions: [
      { kind: "fill", label: "Width", value: "1024" },
      { kind: "fill", label: "Height", value: "768" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Aspect Ratio Results", "4:3"] },
  },
  {
    name: "1080×1080 → 1:1",
    actions: [
      { kind: "fill", label: "Width", value: "1080" },
      { kind: "fill", label: "Height", value: "1080" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["1:1"] },
  },
];
