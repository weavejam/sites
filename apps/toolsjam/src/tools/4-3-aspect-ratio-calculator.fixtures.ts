import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Width 1024 pixels → height 768, diagonal 1280",
    actions: [
      { kind: "click", label: "Pixels" },
      { kind: "fill", label: "Width", value: "1024" },
      { kind: "fill", label: "Diagonal Size (Optional)", value: "17" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["4:3 Dimensions", "768", "1280"] },
  },
  {
    name: "Width 800 pixels → height 600",
    actions: [
      { kind: "click", label: "Pixels" },
      { kind: "fill", label: "Width", value: "800" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["4:3 Dimensions", "600"] },
  },
  {
    name: "Height 768 pixels → width 1024",
    actions: [
      { kind: "click", label: "Pixels" },
      { kind: "fill", label: "Height", value: "768" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["4:3 Dimensions", "1,024"] },
  },
];
