import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Light in vacuum 1000 m → ~3.336 µs",
    actions: [
      { kind: "click", label: "Vacuum (Light)" },
      { kind: "fill", label: "Distance (m)", value: "1000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "µs"] },
  },
  {
    name: "Sound in air at 20 °C, 1000 m → delay in seconds",
    actions: [
      { kind: "click", label: "Air (Sound)" },
      { kind: "fill", label: "Distance (m)", value: "1000" },
      { kind: "fill", label: "Temperature (°C)", value: "20" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "s"] },
  },
  {
    name: "Optical fibre 50000 m → ~0.250 ms",
    actions: [
      { kind: "click", label: "Optical Fiber" },
      { kind: "fill", label: "Distance (m)", value: "50000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "ms"] },
  },
];
