import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Circumference from radius 7",
    actions: [
      { kind: "click", label: "Radius" },
      { kind: "fill", label: "Radius", value: "7" },
      { kind: "click", label: "Calculate Circumference" },
    ],
    expect: { text: ["Circumference", "43.9823"] },
  },
  {
    name: "Circumference from diameter 14",
    actions: [
      { kind: "click", label: "Diameter" },
      { kind: "fill", label: "Diameter", value: "14" },
      { kind: "click", label: "Calculate Circumference" },
    ],
    expect: { text: ["Circumference", "43.9823"] },
  },
];
