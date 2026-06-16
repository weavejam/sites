import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "PSA 4.0 ng/mL, volume 25 cc → density 0.160",
    actions: [
      { kind: "fill", label: "PSA Level (ng/mL)", value: "4.0" },
      { kind: "fill", label: "Prostate Volume (cc)", value: "25" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["PSA Density", "0.160 ng/mL/cc"] },
  },
  {
    name: "PSA 10.0 ng/mL, volume 30 cc → density 0.333 high risk",
    actions: [
      { kind: "fill", label: "PSA Level (ng/mL)", value: "10.0" },
      { kind: "fill", label: "Prostate Volume (cc)", value: "30" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["PSA Density", "0.333 ng/mL/cc"] },
  },
];
