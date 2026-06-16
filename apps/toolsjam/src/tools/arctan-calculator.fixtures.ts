import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "arctan(1) = 45° in degrees",
    actions: [
      { kind: "fill", label: "Input Value (x)", value: "1" },
      { kind: "click", label: "Degrees" },
      { kind: "click", label: "Calculate Arctan" },
    ],
    expect: { text: ["Result", "arctan(1)"] },
  },
  {
    name: "arctan(0) = 0 in radians",
    actions: [
      { kind: "fill", label: "Input Value (x)", value: "0" },
      { kind: "click", label: "Radians" },
      { kind: "click", label: "Calculate Arctan" },
    ],
    expect: { text: ["Result", "arctan(0)"] },
  },
  {
    name: "arctan(-1) = -45° in degrees",
    actions: [
      { kind: "fill", label: "Input Value (x)", value: "-1" },
      { kind: "click", label: "Degrees" },
      { kind: "click", label: "Calculate Arctan" },
    ],
    expect: { text: ["Result", "arctan(-1)"] },
  },
];
