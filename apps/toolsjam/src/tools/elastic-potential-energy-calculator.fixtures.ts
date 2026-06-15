import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Compute U: k=100 N/m, x=0.5 m → U=12.5 J",
    actions: [
      { kind: "fill", label: "Spring Constant k (N/m)", value: "100" },
      { kind: "fill", label: "Displacement x (m)", value: "0.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "12.5"] },
  },
  {
    name: "Compute U: k=40000 N/m, x=0.05 m → U=50 J",
    actions: [
      { kind: "fill", label: "Spring Constant k (N/m)", value: "40000" },
      { kind: "fill", label: "Displacement x (m)", value: "0.05" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "50"] },
  },
];
