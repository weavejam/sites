import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "1080p 30fps 10min MP4 8-bit 128kbps audio",
    actions: [
      { kind: "fill", label: "Video Width (pixels)", value: "1920" },
      { kind: "fill", label: "Video Height (pixels)", value: "1080" },
      { kind: "fill", label: "Frame Rate (fps)", value: "30" },
      { kind: "fill", label: "Video Duration (minutes)", value: "10" },
      { kind: "fill", label: "Audio Bitrate (kbps) — Optional", value: "128" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Estimated File Size", "Video Data", "MB"] },
  },
  {
    name: "720p 30fps 15min MP4 8-bit no audio",
    actions: [
      { kind: "fill", label: "Video Width (pixels)", value: "1280" },
      { kind: "fill", label: "Video Height (pixels)", value: "720" },
      { kind: "fill", label: "Frame Rate (fps)", value: "30" },
      { kind: "fill", label: "Video Duration (minutes)", value: "15" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Estimated File Size", "Video Data"] },
  },
];
