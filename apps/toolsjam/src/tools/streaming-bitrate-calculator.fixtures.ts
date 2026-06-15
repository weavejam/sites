import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "YouTube 1080p/30fps stream",
    actions: [
      { kind: "fill", label: "Resolution Width (pixels)", value: "1920" },
      { kind: "fill", label: "Resolution Height (pixels)", value: "1080" },
      { kind: "fill", label: "Frame Rate (fps)", value: "30" },
      { kind: "fill", label: "Color Depth (bits per pixel)", value: "24" },
      { kind: "fill", label: "Duration (minutes)", value: "60" },
      { kind: "fill", label: "Number of Streams", value: "1" },
      { kind: "fill", label: "Compression Factor", value: "0.005" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Streaming Results", "Required Bitrate", "Mbps"] },
  },
  {
    name: "4K/24fps recording",
    actions: [
      { kind: "fill", label: "Resolution Width (pixels)", value: "3840" },
      { kind: "fill", label: "Resolution Height (pixels)", value: "2160" },
      { kind: "fill", label: "Frame Rate (fps)", value: "24" },
      { kind: "fill", label: "Color Depth (bits per pixel)", value: "32" },
      { kind: "fill", label: "Duration (minutes)", value: "90" },
      { kind: "fill", label: "Number of Streams", value: "1" },
      { kind: "fill", label: "Compression Factor", value: "0.008" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Streaming Results", "Estimated File Size", "Total Bandwidth"] },
  },
];
