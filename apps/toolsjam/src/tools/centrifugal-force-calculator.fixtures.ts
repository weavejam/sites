import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Car on curve: 1500 kg, 50 m radius, 16.67 m/s linear",
    actions: [
      { kind: "fill", label: "Mass", value: "1500" },
      { kind: "fill", label: "Radius", value: "50" },
      { kind: "click", label: "Linear Velocity" },
      { kind: "fill", label: "Linear Velocity", value: "16.67" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Centrifugal Force", "N"] },
  },
  {
    name: "Centrifuge: 0.1 kg, 0.2 m radius, 3000 RPM angular",
    actions: [
      { kind: "fill", label: "Mass", value: "0.1" },
      { kind: "fill", label: "Radius", value: "0.2" },
      { kind: "click", label: "Angular Velocity" },
      { kind: "fill", label: "Angular Velocity", value: "3000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Centrifugal Force", "N"] },
  },
];
