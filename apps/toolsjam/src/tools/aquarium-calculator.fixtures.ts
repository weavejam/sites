import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "60 L starter tank (50×30×40 cm)",
    actions: [
      { kind: "fill", label: "Length (cm)", value: "50" },
      { kind: "fill", label: "Width (cm)", value: "30" },
      { kind: "fill", label: "Height (cm)", value: "40" },
      { kind: "fill", label: "Water Level (%)", value: "90" },
      { kind: "fill", label: "Number of Fish", value: "10" },
      { kind: "fill", label: "Average Fish Size (cm)", value: "3" },
      { kind: "fill", label: "Heater Power (W)", value: "75" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Aquarium Results", "L", "fish"] },
  },
  {
    name: "200 L community tank (100×40×50 cm)",
    actions: [
      { kind: "fill", label: "Length (cm)", value: "100" },
      { kind: "fill", label: "Width (cm)", value: "40" },
      { kind: "fill", label: "Height (cm)", value: "50" },
      { kind: "fill", label: "Water Level (%)", value: "90" },
      { kind: "fill", label: "Number of Fish", value: "15" },
      { kind: "fill", label: "Average Fish Size (cm)", value: "8" },
      { kind: "fill", label: "Heater Power (W)", value: "200" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Aquarium Results", "L/hr"] },
  },
];
