import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Green laser 532 nm, 600 lines/mm, 1st order → angle ≈ 18.60°",
    actions: [
      { kind: "fill", label: "Lines per mm", value: "600" },
      { kind: "fill", label: "Order (m)", value: "1" },
      { kind: "fill", label: "Wavelength (nm)", value: "532" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "18.6"] },
  },
  {
    name: "Red light 650 nm, 1200 lines/mm, 1st order → angle ≈ 51.26°",
    actions: [
      { kind: "fill", label: "Lines per mm", value: "1200" },
      { kind: "fill", label: "Order (m)", value: "1" },
      { kind: "fill", label: "Wavelength (nm)", value: "650" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "51."] },
  },
  {
    name: "Reverse: 1000 lines/mm, 1st order, 40° → wavelength ≈ 642.8 nm",
    actions: [
      { kind: "fill", label: "Lines per mm", value: "1000" },
      { kind: "fill", label: "Order (m)", value: "1" },
      { kind: "fill", label: "Angle (°)", value: "40" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "642"] },
  },
];
