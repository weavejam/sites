import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Head-on collision example",
    actions: [
      { kind: "click", label: "Head-on Collision" },
    ],
    expect: { text: ["Results", "Final Velocity", "Kinetic Energy Lost"] },
  },
  {
    name: "Rear-end collision example",
    actions: [
      { kind: "click", label: "Rear-end Collision" },
    ],
    expect: { text: ["Results", "Final Velocity", "Initial Kinetic Energy"] },
  },
  {
    name: "Hit stationary car example",
    actions: [
      { kind: "click", label: "Hit Stationary Car" },
    ],
    expect: { text: ["Results", "Kinetic Energy Lost", "Impulse on Vehicle 1"] },
  },
];
