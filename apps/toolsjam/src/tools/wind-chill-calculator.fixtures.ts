import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Cold winter day: T=-10°C wind=25 km/h",
    actions: [
      { kind: "fill", label: "Air Temperature", value: "-10" },
      { kind: "fill", label: "Wind Speed", value: "25" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Wind Chill Results", "Wind Chill Temperature"] },
  },
  {
    name: "Severe cold: T=-25°C wind=40 km/h",
    actions: [
      { kind: "fill", label: "Air Temperature", value: "-25" },
      { kind: "fill", label: "Wind Speed", value: "40" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Wind Chill Results", "Wind Chill Temperature"] },
  },
  {
    name: "Warm day above threshold: T=15°C wind=20 km/h",
    actions: [
      { kind: "fill", label: "Air Temperature", value: "15" },
      { kind: "fill", label: "Wind Speed", value: "20" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Wind Chill Results"] },
  },
];
