import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "APS-C sensor at 100m, 35mm focal, 6000px wide → ~1.12 cm/px",
    actions: [
      { kind: "fill", label: "Sensor Width (mm)", value: "23.5" },
      { kind: "fill", label: "Flying Height (m)", value: "100" },
      { kind: "fill", label: "Focal Length (mm)", value: "35" },
      { kind: "fill", label: "Image Width (px) — optional", value: "6000" },
      { kind: "click", label: "Calculate GSD" },
    ],
    expect: { text: ["GSD Results", "cm / pixel"] },
  },
  {
    name: "1-inch drone sensor at 120m, 24mm focal, 4000px wide → GSD shown",
    actions: [
      { kind: "fill", label: "Sensor Width (mm)", value: "13.2" },
      { kind: "fill", label: "Flying Height (m)", value: "120" },
      { kind: "fill", label: "Focal Length (mm)", value: "24" },
      { kind: "fill", label: "Image Width (px) — optional", value: "4000" },
      { kind: "fill", label: "Image Height (px) — optional", value: "3000" },
      { kind: "click", label: "Calculate GSD" },
    ],
    expect: { text: ["GSD Results", "Ground Coverage Width", "Coverage Area"] },
  },
];
