import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal male: Testosterone 650 ng/dL, Estradiol 25 pg/mL",
    actions: [
      { kind: "fill", label: "Testosterone Level", value: "650" },
      { kind: "fill", label: "Estradiol Level", value: "25" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "T:E2 Ratio"] },
  },
  {
    name: "Elevated estradiol male: Testosterone 420, Estradiol 58",
    actions: [
      { kind: "fill", label: "Testosterone Level", value: "420" },
      { kind: "fill", label: "Estradiol Level", value: "58" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Interpretation"] },
  },
];
