import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Cube side=1.5 → SA=13.5",
    actions: [
      { kind: "click", label: "Cube" },
      { kind: "fill", label: "Side Length (a)", value: "1.5" },
      { kind: "click", label: "Calculate Surface Area" },
    ],
    expect: { text: ["Surface Area", "13.5"] },
  },
  {
    name: "Sphere radius=12 → SA≈1809.56",
    actions: [
      { kind: "click", label: "Sphere" },
      { kind: "fill", label: "Radius (r)", value: "12" },
      { kind: "click", label: "Calculate Surface Area" },
    ],
    expect: { text: ["Surface Area", "1,809"] },
  },
  {
    name: "Cylinder r=3.5 h=11 → SA≈318.86",
    actions: [
      { kind: "click", label: "Cylinder" },
      { kind: "fill", label: "Radius (r)", value: "3.5" },
      { kind: "fill", label: "Height (h)", value: "11" },
      { kind: "click", label: "Calculate Surface Area" },
    ],
    expect: { text: ["Surface Area", "318"] },
  },
];
