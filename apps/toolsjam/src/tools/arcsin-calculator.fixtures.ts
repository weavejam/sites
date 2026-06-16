import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "arcsin(0.5) = 30° in degrees",
    actions: [
      { kind: "fill", label: "Input Value", value: "0.5" },
      { kind: "click", label: "Degrees" },
      { kind: "click", label: "Calculate Arcsin" },
    ],
    expect: { text: ["Result", "arcsin(0.5)"] },
  },
  {
    name: "arcsin(0) = 0 in radians",
    actions: [
      { kind: "fill", label: "Input Value", value: "0" },
      { kind: "click", label: "Radians" },
      { kind: "click", label: "Calculate Arcsin" },
    ],
    expect: { text: ["Result", "arcsin(0)"] },
  },
  {
    name: "arcsin(1) = 90° in degrees",
    actions: [
      { kind: "fill", label: "Input Value", value: "1" },
      { kind: "click", label: "Degrees" },
      { kind: "click", label: "Calculate Arcsin" },
    ],
    expect: { text: ["Result", "arcsin(1)"] },
  },
];
