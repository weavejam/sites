import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2x2 system: 2x+3y=13, x-y=0 → x=y=2.6",
    actions: [
      { kind: "click", label: "2x2" },
      { kind: "fill", label: "Coefficients Matrix (A)", value: "2,3;1,-1" },
      { kind: "fill", label: "Constants Vector (b)", value: "13,0" },
      { kind: "click", label: "Solve System" },
    ],
    expect: { text: ["Solution", "2.6"] },
  },
  {
    name: "2x2 system: 2x+y=5, x+3y=4 → x=2.2, y=0.6",
    actions: [
      { kind: "click", label: "2x2" },
      { kind: "fill", label: "Coefficients Matrix (A)", value: "2,1;1,3" },
      { kind: "fill", label: "Constants Vector (b)", value: "5,4" },
      { kind: "click", label: "Solve System" },
    ],
    expect: { text: ["Solution", "2.2"] },
  },
  {
    name: "3x3 system: x=1, y=2, z=3",
    actions: [
      { kind: "click", label: "3x3" },
      {
        kind: "fill",
        label: "Coefficients Matrix (A)",
        value: "1,2,3;2,1,2;3,2,1",
      },
      { kind: "fill", label: "Constants Vector (b)", value: "14,10,10" },
      { kind: "click", label: "Solve System" },
    ],
    expect: { text: ["Solution", "1", "2", "3"] },
  },
];
