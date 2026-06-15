import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "1920x1200 valid 16:10 ratio",
    actions: [
      { kind: "click", label: "pixels" },
      { kind: "fill", label: "Width", value: "1920" },
      { kind: "fill", label: "Height", value: "1200" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Valid 16:10 ratio"] },
  },
  {
    name: "2560x1600 with 15.6-inch diagonal → PPI",
    actions: [
      { kind: "click", label: "pixels" },
      { kind: "fill", label: "Width", value: "2560" },
      { kind: "fill", label: "Height", value: "1600" },
      { kind: "fill", label: "Diagonal Size (Optional)", value: "15.6" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "PPI", "Valid 16:10 ratio"] },
  },
];
