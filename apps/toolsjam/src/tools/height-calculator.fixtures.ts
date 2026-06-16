import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "175 cm male with weight → BMI and conversions",
    actions: [
      { kind: "fill", label: "Height", value: "175" },
      { kind: "fill", label: "Weight (kg) – Optional", value: "75" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Height Conversion & Analysis"] },
  },
  {
    name: "162 cm female → conversions shown",
    actions: [
      { kind: "fill", label: "Height", value: "162" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Height Conversion & Analysis"] },
  },
];
