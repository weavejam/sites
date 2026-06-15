import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2x3 matrix with 1D null space",
    actions: [
      { kind: "click", label: "2x3" },
      { kind: "fill", label: "Row 1, Column 1", value: "1" },
      { kind: "fill", label: "Row 1, Column 2", value: "2" },
      { kind: "fill", label: "Row 1, Column 3", value: "3" },
      { kind: "fill", label: "Row 2, Column 1", value: "4" },
      { kind: "fill", label: "Row 2, Column 2", value: "5" },
      { kind: "fill", label: "Row 2, Column 3", value: "6" },
      { kind: "click", label: "Calculate Null Space" },
    ],
    expect: { text: ["Result", "Rank", "Nullity"] },
  },
  {
    name: "3x3 identity matrix has trivial null space",
    actions: [
      { kind: "click", label: "3x3" },
      { kind: "fill", label: "Row 1, Column 1", value: "1" },
      { kind: "fill", label: "Row 1, Column 2", value: "0" },
      { kind: "fill", label: "Row 1, Column 3", value: "0" },
      { kind: "fill", label: "Row 2, Column 1", value: "0" },
      { kind: "fill", label: "Row 2, Column 2", value: "1" },
      { kind: "fill", label: "Row 2, Column 3", value: "0" },
      { kind: "fill", label: "Row 3, Column 1", value: "0" },
      { kind: "fill", label: "Row 3, Column 2", value: "0" },
      { kind: "fill", label: "Row 3, Column 3", value: "1" },
      { kind: "click", label: "Calculate Null Space" },
    ],
    expect: { text: ["Result", "trivial"] },
  },
];
