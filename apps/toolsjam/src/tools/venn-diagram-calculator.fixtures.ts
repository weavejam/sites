import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "2-set: students basketball and tennis",
    actions: [
      { kind: "click", label: "2 Sets" },
      { kind: "fill", label: "Set A", value: "40" },
      { kind: "fill", label: "Set B", value: "30" },
      { kind: "fill", label: "A ∩ B", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "A ∩ B"] },
  },
  {
    name: "2-set: reading habits fiction and non-fiction",
    actions: [
      { kind: "click", label: "2 Sets" },
      { kind: "fill", label: "Set A", value: "150" },
      { kind: "fill", label: "Set B", value: "100" },
      { kind: "fill", label: "A ∩ B", value: "75" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Union"] },
  },
];
