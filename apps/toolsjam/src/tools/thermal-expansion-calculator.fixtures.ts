import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Steel bridge: 10m, +30°C linear expansion",
    actions: [
      { kind: "click", label: "Linear (1D)" },
      { kind: "click", label: "Steel (11.7×10⁻⁶/°C)" },
      { kind: "fill", label: "Initial Length (m)", value: "10" },
      { kind: "fill", label: "Temperature Change (°C)", value: "30" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "0.00351"] },
  },
  {
    name: "Aluminum plate: 0.5m, +150°C area expansion",
    actions: [
      { kind: "click", label: "Area (2D)" },
      { kind: "click", label: "Aluminum (23.1×10⁻⁶/°C)" },
      { kind: "fill", label: "Initial Length (m)", value: "0.5" },
      { kind: "fill", label: "Temperature Change (°C)", value: "150" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results"] },
  },
];
