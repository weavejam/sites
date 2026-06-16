import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Adult 70 kg sleep dose",
    actions: [
      { kind: "fill", label: "Body Weight", value: "70" },
      { kind: "fill", label: "Age (years)", value: "30" },
      { kind: "click", label: "Calculate Dose" },
    ],
    expect: { text: ["mg", "Recommended Starting Dose"] },
  },
  {
    name: "Child 35 kg sleep dose",
    actions: [
      { kind: "fill", label: "Body Weight", value: "35" },
      { kind: "fill", label: "Age (years)", value: "10" },
      { kind: "click", label: "Calculate Dose" },
    ],
    expect: { text: ["mg", "Recommended Starting Dose"] },
  },
];
