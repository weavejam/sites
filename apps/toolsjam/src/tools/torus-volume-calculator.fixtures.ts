import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Standard torus R=10 r=3 → ≈5583",
    actions: [
      { kind: "fill", label: "Major Radius (R)", value: "10" },
      { kind: "fill", label: "Minor Radius (r)", value: "3" },
      { kind: "click", label: "Calculate Volume" },
    ],
    expect: { text: ["Volume", "5,583"] },
  },
  {
    name: "O-ring R=5 r=2 → ≈394.8",
    actions: [
      { kind: "fill", label: "Major Radius (R)", value: "5" },
      { kind: "fill", label: "Minor Radius (r)", value: "2" },
      { kind: "click", label: "Calculate Volume" },
    ],
    expect: { text: ["Volume", "394"] },
  },
  {
    name: "Decorative ring R=4 r=1.5 → ≈177.7",
    actions: [
      { kind: "fill", label: "Major Radius (R)", value: "4" },
      { kind: "fill", label: "Minor Radius (r)", value: "1.5" },
      { kind: "click", label: "Calculate Volume" },
    ],
    expect: { text: ["Volume", "177"] },
  },
];
