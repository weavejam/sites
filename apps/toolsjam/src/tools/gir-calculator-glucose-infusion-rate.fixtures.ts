import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Default GIR calculation in mg per kg per minute",
    actions: [
      { kind: "fill", label: "Glucose Concentration", value: "100" },
      { kind: "fill", label: "Flow Rate", value: "120" },
      { kind: "fill", label: "Patient Weight", value: "70" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["GIR Results", "GIR (mg/kg/min)"] },
  },
  {
    name: "Neonatal GIR with low flow and small weight",
    actions: [
      { kind: "fill", label: "Glucose Concentration", value: "100" },
      { kind: "fill", label: "Flow Rate", value: "6" },
      { kind: "fill", label: "Patient Weight", value: "3.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["GIR Results", "GIR (g/kg/min)"] },
  },
];
