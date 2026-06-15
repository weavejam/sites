import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "1920x1080 @ 24 inches → ~91.8 PPI",
    actions: [
      { kind: "fill", label: "Pixel Width", value: "1920" },
      { kind: "fill", label: "Pixel Height", value: "1080" },
      { kind: "fill", label: "Diagonal Size (inches)", value: "24" },
      { kind: "click", label: "Calculate PPI" },
    ],
    expect: { text: ["PPI Results", "Pixels Per Inch (PPI)", "Display Quality"] },
  },
  {
    name: "3840x2160 @ 27 inches → ~163 PPI",
    actions: [
      { kind: "fill", label: "Pixel Width", value: "3840" },
      { kind: "fill", label: "Pixel Height", value: "2160" },
      { kind: "fill", label: "Diagonal Size (inches)", value: "27" },
      { kind: "click", label: "Calculate PPI" },
    ],
    expect: { text: ["PPI Results", "Pixels Per Inch (PPI)", "Dot Pitch (mm)"] },
  },
];
