import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Circle from radius 5",
    actions: [
      { kind: "click", label: "Radius" },
      { kind: "fill", label: "Radius", value: "5" },
      { kind: "click", label: "Calculate Circle Properties" },
    ],
    expect: {
      text: ["Circle Properties", "10", "78.5"],
    },
  },
  {
    name: "Circle from diameter 20",
    actions: [
      { kind: "click", label: "Diameter" },
      { kind: "fill", label: "Diameter", value: "20" },
      { kind: "click", label: "Calculate Circle Properties" },
    ],
    expect: {
      text: ["Circle Properties", "10", "314"],
    },
  },
];
