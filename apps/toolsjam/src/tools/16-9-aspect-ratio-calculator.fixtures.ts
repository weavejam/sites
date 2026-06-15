import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "1920x1080 valid 16:9 ratio",
    actions: [
      { kind: "click", label: "pixels" },
      { kind: "fill", label: "Width", value: "1920" },
      { kind: "fill", label: "Height", value: "1080" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Valid 16:9 ratio"] },
  },
  {
    name: "3840x2160 with 55-inch diagonal → PPI",
    actions: [
      { kind: "click", label: "pixels" },
      { kind: "fill", label: "Width", value: "3840" },
      { kind: "fill", label: "Height", value: "2160" },
      { kind: "fill", label: "Diagonal Size (Optional)", value: "55" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "PPI", "Valid 16:9 ratio"] },
  },
];
