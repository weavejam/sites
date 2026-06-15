import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "30 years on Earth → Mars ≈ 15.95 Mars years",
    actions: [
      { kind: "fill", label: "Your Age on Earth", value: "30" },
      { kind: "click", label: "Mars" },
      { kind: "click", label: "Calculate Planetary Age" },
    ],
    expect: { text: ["Your Planetary Age", "Mars"] },
  },
  {
    name: "25 years on Earth → Venus (faster orbit, higher age)",
    actions: [
      { kind: "fill", label: "Your Age on Earth", value: "25" },
      { kind: "click", label: "Venus" },
      { kind: "click", label: "Calculate Planetary Age" },
    ],
    expect: { text: ["Your Planetary Age", "Venus"] },
  },
  {
    name: "40 years on Earth → Jupiter ≈ 3.37 Jupiter years",
    actions: [
      { kind: "fill", label: "Your Age on Earth", value: "40" },
      { kind: "click", label: "Jupiter" },
      { kind: "click", label: "Calculate Planetary Age" },
    ],
    expect: { text: ["Your Planetary Age", "Jupiter"] },
  },
];
