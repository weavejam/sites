import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Movie stunt: 120 km/h, 20°, 5 m height → ~148 m distance",
    actions: [
      { kind: "click", label: "Movie Stunt Jump" },
    ],
    expect: { text: ["Results", "Jump Distance", "Time of Flight"] },
  },
  {
    name: "Textbook: 30 m/s, 60°, 0 m height → ~79 m range",
    actions: [
      { kind: "click", label: "Textbook Problem" },
    ],
    expect: { text: ["Results", "Jump Distance", "Maximum Height"] },
  },
  {
    name: "Motocross: 80 km/h, 45°, 2 m height",
    actions: [
      { kind: "fill", label: "Initial Velocity", value: "22.22" },
      { kind: "fill", label: "Launch Angle (°)", value: "45" },
      { kind: "fill", label: "Initial Ramp Height", value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Jump Distance", "Time of Flight"] },
  },
];
