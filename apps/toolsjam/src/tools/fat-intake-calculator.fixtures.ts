import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Male 30 yrs moderately active maintenance — 71 g fat",
    actions: [
      { kind: "click", label: "Load male example" },
      { kind: "click", label: "Calculate Fat Intake" },
    ],
    expect: { text: ["71", "2556"] },
  },
  {
    name: "Female 28 yrs lightly active weight loss — 41 g fat",
    actions: [
      { kind: "click", label: "Load female example" },
      { kind: "click", label: "Calculate Fat Intake" },
    ],
    expect: { text: ["41", "1829"] },
  },
];
