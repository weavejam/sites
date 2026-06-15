import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "First 5 rows triangular format",
    actions: [
      { kind: "fill", label: "Number of Rows", value: "5" },
      { kind: "click", label: "Triangular" },
      { kind: "click", label: "Generate Triangle" },
    ],
    expect: { text: ["Pascal's Triangle", "1"] },
  },
  {
    name: "Row 4 linear format",
    actions: [
      { kind: "fill", label: "Number of Rows", value: "10" },
      { kind: "fill", label: "Specific Row (Optional)", value: "4" },
      { kind: "click", label: "Linear (flat list)" },
      { kind: "click", label: "Generate Triangle" },
    ],
    expect: { text: ["Pascal's Triangle"] },
  },
];
