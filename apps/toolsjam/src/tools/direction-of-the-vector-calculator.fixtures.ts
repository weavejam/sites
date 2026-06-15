import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2D vector (3,4) → magnitude 5, angle ~53.13°",
    actions: [
      { kind: "click", label: "2D Vector" },
      { kind: "fill", label: "X component", value: "3" },
      { kind: "fill", label: "Y component", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "5"] },
  },
  {
    name: "3D vector (2,3,6) → magnitude 7",
    actions: [
      { kind: "click", label: "3D Vector" },
      { kind: "fill", label: "X component", value: "2" },
      { kind: "fill", label: "Y component", value: "3" },
      { kind: "fill", label: "Z component", value: "6" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "7"] },
  },
];
