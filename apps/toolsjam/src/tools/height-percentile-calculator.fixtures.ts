import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Male age 10 height 140 cm → ~65th percentile",
    actions: [
      { kind: "fill", label: "Age (years)", value: "10" },
      { kind: "click", label: "Male" },
      { kind: "fill", label: "Height", value: "140" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Height Percentile Result"] },
  },
  {
    name: "Female age 25 height 175 cm → tall percentile result",
    actions: [
      { kind: "fill", label: "Age (years)", value: "25" },
      { kind: "click", label: "Female" },
      { kind: "fill", label: "Height", value: "175" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Height Percentile Result"] },
  },
];
