import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Area & Time: 20 acres in 4 hours → 5 ac/hr",
    actions: [
      { kind: "click", label: "Area & Time" },
      { kind: "fill", label: "Field area", value: "20" },
      { kind: "fill", label: "Time spent (hours)", value: "4" },
      { kind: "click", label: "Calculate Work Rate" },
    ],
    expect: { text: ["Work Rate Result", "5"] },
  },
  {
    name: "Machine-based imperial: 12ft, 6mph, 85% → 7.42 ac/hr",
    actions: [
      { kind: "click", label: "Machine Specs" },
      { kind: "click", label: "Imperial (ft / mph)" },
      { kind: "fill", label: "Machine width (ft)", value: "12" },
      { kind: "fill", label: "Travel speed (mph)", value: "6" },
      { kind: "fill", label: "Field efficiency (%)", value: "85" },
      { kind: "click", label: "Calculate Work Rate" },
    ],
    expect: { text: ["Work Rate Result", "ac/hr"] },
  },
  {
    name: "Machine-based metric: 4m, 10km/h, 75% → 3 ha/hr",
    actions: [
      { kind: "click", label: "Machine Specs" },
      { kind: "click", label: "Metric (m / km/h)" },
      { kind: "fill", label: "Machine width (m)", value: "4" },
      { kind: "fill", label: "Travel speed (km/h)", value: "10" },
      { kind: "fill", label: "Field efficiency (%)", value: "75" },
      { kind: "click", label: "Calculate Work Rate" },
    ],
    expect: { text: ["Work Rate Result", "ha/hr"] },
  },
];
