import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Sun surface 5778K → peak wavelength visible range",
    actions: [
      { kind: "fill", label: "Temperature (K)", value: "5778" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "501"] },
  },
  {
    name: "Human body 310K → mid infrared peak",
    actions: [
      { kind: "fill", label: "Temperature (K)", value: "310" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "μm"] },
  },
];
