import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Small ICH using ABC/2",
    actions: [
      { kind: "fill", label: "Diameter A (cm)", value: "2.5" },
      { kind: "fill", label: "Diameter B (cm)", value: "2" },
      { kind: "fill", label: "Diameter C (cm)", value: "2" },
      { kind: "click", label: "ABC/2" },
      { kind: "click", label: "Calculate" }
    ],
    expect: { text: ["Results", "5", "Mild"] }
  },
  {
    name: "Large ICH using ellipsoid",
    actions: [
      { kind: "fill", label: "Diameter A (cm)", value: "5" },
      { kind: "fill", label: "Diameter B (cm)", value: "4" },
      { kind: "fill", label: "Diameter C (cm)", value: "4" },
      { kind: "click", label: "Ellipsoid" },
      { kind: "click", label: "Calculate" }
    ],
    expect: { text: ["Results", "41.89", "Large"] }
  }
];
