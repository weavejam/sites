import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "M/M/1 bank teller queue",
    actions: [
      { kind: "click", label: "M/M/1 (Single Server)" },
      { kind: "fill", label: "Arrival Rate (λ) — customers per unit time", value: "10" },
      { kind: "fill", label: "Service Rate (μ) — customers per server per unit time", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Queue Performance Metrics"] },
  },
  {
    name: "M/M/c call center with 3 servers",
    actions: [
      { kind: "click", label: "M/M/c (Multiple Servers)" },
      { kind: "fill", label: "Arrival Rate (λ) — customers per unit time", value: "25" },
      { kind: "fill", label: "Service Rate (μ) — customers per server per unit time", value: "10" },
      { kind: "fill", label: "Number of Servers (c)", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: "Queue Performance Metrics" },
  },
];
