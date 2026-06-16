import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Adult male Devine formula",
    actions: [
      { kind: "fill", label: "Height (cm)", value: "178" },
      { kind: "fill", label: "Age (years)", value: "35" },
      { kind: "click", label: "Male" },
      { kind: "click", label: "Medium" },
      { kind: "click", label: "Devine" },
      { kind: "click", label: "Calculate" }
    ],
    expect: { text: ["Results", "73.2"] }
  },
  {
    name: "Adult female Robinson formula",
    actions: [
      { kind: "fill", label: "Height (cm)", value: "167" },
      { kind: "fill", label: "Age (years)", value: "30" },
      { kind: "click", label: "Female" },
      { kind: "click", label: "Medium" },
      { kind: "click", label: "Robinson" },
      { kind: "click", label: "Calculate" }
    ],
    expect: { text: ["Results", "58.8"] }
  }
];
