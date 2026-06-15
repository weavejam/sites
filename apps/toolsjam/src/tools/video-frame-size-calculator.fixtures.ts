import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "1080p 8-bit RGB uncompressed → ~5.93 MB",
    actions: [
      { kind: "fill", label: "Frame Width (pixels)", value: "1920" },
      { kind: "fill", label: "Frame Height (pixels)", value: "1080" },
      { kind: "fill", label: "Bit Depth", value: "8" },
      { kind: "fill", label: "Color Channels", value: "3" },
      { kind: "fill", label: "Compression Ratio", value: "1" },
      { kind: "click", label: "Calculate Frame Size" },
    ],
    expect: { text: ["Frame Size Results", "1,920 × 1,080", "5.93 MB"] },
  },
  {
    name: "4K 10-bit RGB uncompressed → ~29.6 MB",
    actions: [
      { kind: "fill", label: "Frame Width (pixels)", value: "3840" },
      { kind: "fill", label: "Frame Height (pixels)", value: "2160" },
      { kind: "fill", label: "Bit Depth", value: "10" },
      { kind: "fill", label: "Color Channels", value: "3" },
      { kind: "fill", label: "Compression Ratio", value: "1" },
      { kind: "click", label: "Calculate Frame Size" },
    ],
    expect: { text: ["Frame Size Results", "3,840 × 2,160"] },
  },
  {
    name: "720p 8-bit RGB compressed at 10:1",
    actions: [
      { kind: "fill", label: "Frame Width (pixels)", value: "1280" },
      { kind: "fill", label: "Frame Height (pixels)", value: "720" },
      { kind: "fill", label: "Bit Depth", value: "8" },
      { kind: "fill", label: "Color Channels", value: "3" },
      { kind: "fill", label: "Compression Ratio", value: "10" },
      { kind: "click", label: "Calculate Frame Size" },
    ],
    expect: { text: ["Frame Size Results", "Compressed Frame Size"] },
  },
];
