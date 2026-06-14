import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "LED light monthly energy and cost",
    actions: [
      { kind: "fill", label: "Power Rating (Watts)", value: "9" },
      { kind: "fill", label: "Usage Time (Hours)", value: "4" },
      { kind: "fill", label: "Days per Month", value: "30" },
      { kind: "fill", label: "Electricity Rate ($/kWh)", value: "0.12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1.08", "0.1296"] },
  },
  {
    name: "Heater monthly energy and cost",
    actions: [
      { kind: "fill", label: "Power Rating (Watts)", value: "1500" },
      { kind: "fill", label: "Usage Time (Hours)", value: "2" },
      { kind: "fill", label: "Days per Month", value: "30" },
      { kind: "fill", label: "Electricity Rate ($/kWh)", value: "0.12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["90", "10.8"] },
  },
];
