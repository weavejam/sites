import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "RSD for 10,15,12,18,13 → ~20.74%",
    actions: [
      { kind: "fill", label: "Data Set", value: "10, 15, 12, 18, 13" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["RSD / CV"] },
  },
  {
    name: "RSD for identical values → 0%",
    actions: [
      { kind: "fill", label: "Data Set", value: "5, 5, 5, 5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["RSD / CV"] },
  },
];
