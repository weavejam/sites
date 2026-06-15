import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Home theater: 3.5m, TR 1.2, 16:9, 3000lm → screen size shown",
    actions: [
      { kind: "click", label: "16:9 (Widescreen)" },
      { kind: "fill", label: "Projection Distance (m)", value: "3.5" },
      { kind: "fill", label: "Throw Ratio", value: "1.2" },
      { kind: "fill", label: "Lumen Output", value: "3000" },
      { kind: "fill", label: "Screen Gain", value: "1" },
      { kind: "click", label: "Calculate Projection" },
    ],
    expect: { text: ["Projector Setup Results", "Screen Width (m)", "Screen Diagonal (inches)"] },
  },
  {
    name: "Conference room: 2.8m, TR 1.1, 4:3, 3500lm → results shown",
    actions: [
      { kind: "click", label: "4:3 (Standard)" },
      { kind: "fill", label: "Projection Distance (m)", value: "2.8" },
      { kind: "fill", label: "Throw Ratio", value: "1.1" },
      { kind: "fill", label: "Lumen Output", value: "3500" },
      { kind: "fill", label: "Screen Gain", value: "1" },
      { kind: "click", label: "Calculate Projection" },
    ],
    expect: { text: ["Projector Setup Results", "Brightness (foot-lamberts)", "Illuminance (lux at screen)"] },
  },
];
