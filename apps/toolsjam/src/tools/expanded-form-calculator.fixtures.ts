import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Expand 2475 into place values",
    actions: [
      { kind: "fill", label: "Number", value: "2475" },
      { kind: "click", label: "Generate Expanded Form" },
    ],
    expect: { text: ["Result", "2,475 = 2,000 + 400 + 70 + 5"] },
  },
  {
    name: "Expand decimal 3.14",
    actions: [
      { kind: "fill", label: "Number", value: "3.14" },
      { kind: "click", label: "Generate Expanded Form" },
    ],
    expect: { text: ["Result", "3.14 = 3 + 0.1 + 0.04"] },
  },
  {
    name: "Expand negative number",
    actions: [
      { kind: "fill", label: "Number", value: "-105.2" },
      { kind: "click", label: "Generate Expanded Form" },
    ],
    expect: { text: "-105.2 = -(100 + 5 + 0.2)" },
  },
];
