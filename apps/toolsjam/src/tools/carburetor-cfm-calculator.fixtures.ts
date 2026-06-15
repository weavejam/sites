import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "350 cu in, 5500 RPM, 80% efficiency → 444.44 CFM",
    actions: [
      { kind: "fill", label: "Engine Displacement (cubic inches)", value: "350" },
      { kind: "fill", label: "Maximum RPM", value: "5500" },
      { kind: "fill", label: "Volumetric Efficiency (%)", value: "80" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Required CFM", "CFM"] },
  },
  {
    name: "454 cu in, 6500 RPM, 90% efficiency → 768 CFM",
    actions: [
      { kind: "fill", label: "Engine Displacement (cubic inches)", value: "454" },
      { kind: "fill", label: "Maximum RPM", value: "6500" },
      { kind: "fill", label: "Volumetric Efficiency (%)", value: "90" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Required CFM", "CFM"] },
  },
];
