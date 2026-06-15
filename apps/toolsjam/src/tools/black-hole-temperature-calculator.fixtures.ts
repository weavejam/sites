import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "10 solar-mass stellar black hole",
    actions: [
      { kind: "fill", label: "Black Hole Mass", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Hawking Radiation Results", "Hawking Temperature", "Schwarzschild Radius"] },
  },
  {
    name: "Primordial black hole in kilograms",
    actions: [
      { kind: "fill", label: "Black Hole Mass", value: "1e15" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Hawking Radiation Results", "Radiation Power", "Evaporation Time"] },
  },
];
