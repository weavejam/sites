import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Solve mobility from drift velocity and field",
    actions: [
      { kind: "click", label: "Find mobility (μ)" },
      { kind: "fill", label: "Drift velocity (v_d) in m/s", value: "0.12" },
      { kind: "fill", label: "Electric field (E) in V/m", value: "40" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0.003", "Mobility"] },
  },
  {
    name: "Solve drift velocity from mobility and field",
    actions: [
      { kind: "click", label: "Find drift velocity (v_d)" },
      { kind: "fill", label: "Mobility (μ) in m²/V·s", value: "0.0015" },
      { kind: "fill", label: "Electric field (E) in V/m", value: "200" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0.3", "Drift velocity"] },
  },
];
