import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "200 cattle, 8 deaths → 4% mortality",
    actions: [
      { kind: "fill", label: "Total Population", value: "200" },
      { kind: "fill", label: "Number of Deaths", value: "8" },
      { kind: "click", label: "Calculate Mortality Rate" },
    ],
    expect: { text: ["Mortality Analysis", "4"] },
  },
  {
    name: "1000 chicks, 25 deaths → 2.5% mortality",
    actions: [
      { kind: "fill", label: "Total Population", value: "1000" },
      { kind: "fill", label: "Number of Deaths", value: "25" },
      { kind: "click", label: "Calculate Mortality Rate" },
    ],
    expect: { text: ["Mortality Analysis", "2.5"] },
  },
  {
    name: "150 deer, 12 deaths → 8% mortality with period context",
    actions: [
      { kind: "fill", label: "Total Population", value: "150" },
      { kind: "fill", label: "Number of Deaths", value: "12" },
      { kind: "fill", label: "Period (Optional)", value: "Winter" },
      { kind: "click", label: "Calculate Mortality Rate" },
    ],
    expect: { text: ["Mortality Analysis", "8", "Winter"] },
  },
];
