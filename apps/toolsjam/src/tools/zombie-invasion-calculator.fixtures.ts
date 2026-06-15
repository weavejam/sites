import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Slow outbreak: human victory expected",
    actions: [
      { kind: "fill", label: "Initial Zombie Count", value: "5" },
      { kind: "fill", label: "Initial Human Population", value: "100000" },
      { kind: "fill", label: "Infection Rate (0–1)", value: "0.1" },
      { kind: "fill", label: "Cure Rate (0–1)", value: "0.05" },
      { kind: "fill", label: "Human Death Rate (0–1)", value: "0.01" },
      { kind: "fill", label: "Time Period (Days)", value: "30" },
      { kind: "fill", label: "Resource Consumption Rate", value: "2.5" },
      { kind: "fill", label: "Geographic Spread Factor", value: "0.3" },
      { kind: "click", label: "Calculate Invasion Scenario" },
    ],
    expect: { text: ["Invasion Simulation Results", "Human Survival Rate"] },
  },
  {
    name: "Fast outbreak: zombie dominance",
    actions: [
      { kind: "fill", label: "Initial Zombie Count", value: "20" },
      { kind: "fill", label: "Initial Human Population", value: "50000" },
      { kind: "fill", label: "Infection Rate (0–1)", value: "0.8" },
      { kind: "fill", label: "Cure Rate (0–1)", value: "0.02" },
      { kind: "fill", label: "Human Death Rate (0–1)", value: "0.15" },
      { kind: "fill", label: "Time Period (Days)", value: "14" },
      { kind: "fill", label: "Resource Consumption Rate", value: "3.0" },
      { kind: "fill", label: "Geographic Spread Factor", value: "1.5" },
      { kind: "click", label: "Calculate Invasion Scenario" },
    ],
    expect: { text: ["Invasion Simulation Results", "Final Human Population"] },
  },
];
