import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Car on curve: 1500 kg, 15 m/s, 50 m radius → 6750 N",
    actions: [
      { kind: "fill", label: "Mass", value: "1500" },
      { kind: "fill", label: "Velocity", value: "15" },
      { kind: "fill", label: "Radius", value: "50" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Centripetal Force", "N"] },
  },
  {
    name: "Ball on string: 0.5 kg, 4 m/s, 1.2 m radius → ~6.67 N",
    actions: [
      { kind: "fill", label: "Mass", value: "0.5" },
      { kind: "fill", label: "Velocity", value: "4" },
      { kind: "fill", label: "Radius", value: "1.2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Centripetal Force", "N"] },
  },
];
