import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Point (1,2,3) on plane x+y+z-6=0 → distance 0",
    actions: [
      { kind: "fill", label: "X₀", value: "1" },
      { kind: "fill", label: "Y₀", value: "2" },
      { kind: "fill", label: "Z₀", value: "3" },
      { kind: "fill", label: "a", value: "1" },
      { kind: "fill", label: "b", value: "1" },
      { kind: "fill", label: "c", value: "1" },
      { kind: "fill", label: "d", value: "-6" },
      { kind: "click", label: "Calculate Distance" },
    ],
    expect: { text: ["Result", "Distance", "0"] },
  },
  {
    name: "Origin to plane x+y+z-3=0 → distance √3",
    actions: [
      { kind: "fill", label: "X₀", value: "0" },
      { kind: "fill", label: "Y₀", value: "0" },
      { kind: "fill", label: "Z₀", value: "0" },
      { kind: "fill", label: "a", value: "1" },
      { kind: "fill", label: "b", value: "1" },
      { kind: "fill", label: "c", value: "1" },
      { kind: "fill", label: "d", value: "-3" },
      { kind: "click", label: "Calculate Distance" },
    ],
    expect: { text: ["Result", "Distance"] },
  },
];
