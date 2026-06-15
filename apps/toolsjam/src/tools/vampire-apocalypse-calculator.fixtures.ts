import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Slow outbreak: 5 vampires, 10000 humans, 30 days → partial survival",
    actions: [
      { kind: "fill", label: "Initial Vampire Count", value: "5" },
      { kind: "fill", label: "Initial Human Population", value: "10000" },
      { kind: "fill", label: "Vampire Reproduction Rate (per day)", value: "0.05" },
      { kind: "fill", label: "Human Death Rate (per day)", value: "0.02" },
      { kind: "fill", label: "Time Period (Days)", value: "30" },
      { kind: "fill", label: "Resource Consumption Rate", value: "0.5" },
      { kind: "click", label: "Calculate Survival Odds" },
    ],
    expect: { text: ["Simulation Results", "Remaining Human Population", "Human Survival Rate"] },
  },
  {
    name: "Moderate outbreak: 10 vampires, 50000 humans, 30 days → partial survival",
    actions: [
      { kind: "fill", label: "Initial Vampire Count", value: "10" },
      { kind: "fill", label: "Initial Human Population", value: "50000" },
      { kind: "fill", label: "Vampire Reproduction Rate (per day)", value: "0.10" },
      { kind: "fill", label: "Human Death Rate (per day)", value: "0.03" },
      { kind: "fill", label: "Time Period (Days)", value: "30" },
      { kind: "fill", label: "Resource Consumption Rate", value: "0.5" },
      { kind: "click", label: "Calculate Survival Odds" },
    ],
    expect: { text: ["Simulation Results", "Final Vampire Population", "Human Survival Rate"] },
  },
];
