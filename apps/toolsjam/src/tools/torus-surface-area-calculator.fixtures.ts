import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Standard ring R=10 r=2 → ≈789.57",
    actions: [
      { kind: "fill", label: "Major Radius (R)", value: "10" },
      { kind: "fill", label: "Minor Radius (r)", value: "2" },
      { kind: "click", label: "Calculate Surface Area" },
    ],
    expect: { text: ["Surface Area", "789"] },
  },
  {
    name: "Vehicle inner tube R=25 r=8 → ≈7896",
    actions: [
      { kind: "fill", label: "Major Radius (R)", value: "25" },
      { kind: "fill", label: "Minor Radius (r)", value: "8" },
      { kind: "click", label: "Calculate Surface Area" },
    ],
    expect: { text: ["Surface Area", "7,896"] },
  },
  {
    name: "Small O-ring R=4 r=1.5 → ≈236.87",
    actions: [
      { kind: "fill", label: "Major Radius (R)", value: "4" },
      { kind: "fill", label: "Minor Radius (r)", value: "1.5" },
      { kind: "click", label: "Calculate Surface Area" },
    ],
    expect: { text: ["Surface Area", "236"] },
  },
];
