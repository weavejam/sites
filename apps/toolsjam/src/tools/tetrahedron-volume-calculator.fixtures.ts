import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Regular tetrahedron edge = 6 → ≈25.456",
    actions: [
      { kind: "click", label: "Regular Tetrahedron (from Edge Length)" },
      { kind: "fill", label: "Edge Length (a)", value: "6" },
      { kind: "click", label: "Calculate Volume" },
    ],
    expect: { text: ["Volume Result", "25"] },
  },
  {
    name: "Base area = 15 height = 7 → 35",
    actions: [
      { kind: "click", label: "From Base Area and Height" },
      { kind: "fill", label: "Base Area (A)", value: "15" },
      { kind: "fill", label: "Height (h)", value: "7" },
      { kind: "click", label: "Calculate Volume" },
    ],
    expect: { text: ["Volume Result", "35"] },
  },
  {
    name: "Regular tetrahedron edge = 2.5",
    actions: [
      { kind: "click", label: "Regular Tetrahedron (from Edge Length)" },
      { kind: "fill", label: "Edge Length (a)", value: "2.5" },
      { kind: "click", label: "Calculate Volume" },
    ],
    expect: { text: "Volume Result" },
  },
];
