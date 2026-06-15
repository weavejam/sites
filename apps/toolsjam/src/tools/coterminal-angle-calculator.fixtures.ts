import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "45° → positive coterminal 405°",
    actions: [
      { kind: "fill", label: "Initial Angle", value: "45" },
      { kind: "click", label: "Degrees" },
      { kind: "click", label: "Calculate Coterminal Angles" },
    ],
    expect: { text: ["Positive coterminals", "405"] },
  },
  {
    name: "-30° → standard position 330°",
    actions: [
      { kind: "fill", label: "Initial Angle", value: "-30" },
      { kind: "click", label: "Degrees" },
      { kind: "click", label: "Calculate Coterminal Angles" },
    ],
    expect: { text: ["Standard position angle", "330"] },
  },
  {
    name: "45° → negative coterminal -315°",
    actions: [
      { kind: "fill", label: "Initial Angle", value: "45" },
      { kind: "click", label: "Degrees" },
      { kind: "click", label: "Calculate Coterminal Angles" },
    ],
    expect: { text: ["Negative coterminals", "-315"] },
  },
];
