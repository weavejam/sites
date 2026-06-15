import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "1920×1080 scaled to 75% → 1440×810",
    actions: [
      { kind: "fill", label: "Original Width", value: "1920" },
      { kind: "fill", label: "Original Height", value: "1080" },
      { kind: "fill", label: "Scale Factor", value: "0.75" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["1,440", "810"] },
  },
  {
    name: "3840×2160 → target width 1920 → 1920×1080",
    actions: [
      { kind: "fill", label: "Original Width", value: "3840" },
      { kind: "fill", label: "Original Height", value: "2160" },
      { kind: "fill", label: "Target Width (Optional)", value: "1920" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["1,920", "1,080"] },
  },
];
