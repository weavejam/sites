import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Classic snowman 180cm tall, density 150",
    actions: [
      { kind: "fill", label: "Desired Snowman Height (cm)", value: "180" },
      { kind: "fill", label: "Snow Density (kg/m³)", value: "150" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Snowman Results", "Base section", "Body section", "Head section"] },
  },
  {
    name: "Mini snowman 75cm tall, density 120",
    actions: [
      { kind: "fill", label: "Desired Snowman Height (cm)", value: "75" },
      { kind: "fill", label: "Snow Density (kg/m³)", value: "120" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Snowman Results", "Total Snow Volume", "Estimated Total Weight"] },
  },
  {
    name: "Giant snowman base 100cm, density 200",
    actions: [
      { kind: "fill", label: "Base Snowball Diameter (cm)", value: "100" },
      { kind: "fill", label: "Snow Density (kg/m³)", value: "200" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Snowman Results", "Base section"] },
  },
];
