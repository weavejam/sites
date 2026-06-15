import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "12-inch car subwoofer box",
    actions: [
      { kind: "fill", label: "Box Length — External (inches)", value: "20.5" },
      { kind: "fill", label: "Box Width — External (inches)", value: "14" },
      { kind: "fill", label: "Box Height — External (inches)", value: "12" },
      { kind: "fill", label: "Material Thickness (inches)", value: "0.75" },
      { kind: "fill", label: "Speaker Diameter (inches)", value: "12" },
      { kind: "fill", label: "Speaker Depth (inches)", value: "5.5" },
      { kind: "fill", label: "Port Diameter (inches)", value: "3" },
      { kind: "fill", label: "Desired Tuning Frequency (Hz)", value: "35" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Speaker Box Results", "Net Internal Volume", "Required Port Length"] },
  },
  {
    name: "6.5-inch bookshelf speaker",
    actions: [
      { kind: "fill", label: "Box Length — External (inches)", value: "8.5" },
      { kind: "fill", label: "Box Width — External (inches)", value: "6" },
      { kind: "fill", label: "Box Height — External (inches)", value: "10" },
      { kind: "fill", label: "Material Thickness (inches)", value: "0.5" },
      { kind: "fill", label: "Speaker Diameter (inches)", value: "6.5" },
      { kind: "fill", label: "Speaker Depth (inches)", value: "3" },
      { kind: "fill", label: "Port Diameter (inches)", value: "1.5" },
      { kind: "fill", label: "Desired Tuning Frequency (Hz)", value: "45" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Speaker Box Results", "Gross Internal Volume", "cubic feet"] },
  },
];
