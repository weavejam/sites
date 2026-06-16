import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "arccos(0) = 90° in degrees",
    actions: [
      { kind: "fill", label: "Input Value", value: "0" },
      { kind: "click", label: "Degrees" },
      { kind: "click", label: "Calculate Arccos" },
    ],
    expect: { text: ["Result", "arccos(0)"] },
  },
  {
    name: "arccos(0.5) = 60° in degrees",
    actions: [
      { kind: "fill", label: "Input Value", value: "0.5" },
      { kind: "click", label: "Degrees" },
      { kind: "click", label: "Calculate Arccos" },
    ],
    expect: { text: ["Result", "arccos(0.5)"] },
  },
  {
    name: "arccos(-1) in radians ≈ 3.1416",
    actions: [
      { kind: "fill", label: "Input Value", value: "-1" },
      { kind: "click", label: "Radians" },
      { kind: "click", label: "Calculate Arccos" },
    ],
    expect: { text: ["Result", "arccos(-1)"] },
  },
];
