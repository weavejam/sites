import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Load sin 30° example → 0.5",
    actions: [
      { kind: "click", label: "Load sin 30° example" },
      { kind: "click", label: "Calculate Cofunction" }
    ],
    expect: { text: ["Cofunction Results", "sin(30°) = cos(60°)", "0.5"] }
  },
  {
    name: "Load tan 45° example → 1",
    actions: [
      { kind: "click", label: "Load tan 45° example" },
      { kind: "click", label: "Calculate Cofunction" }
    ],
    expect: { text: ["tan(45°) = cot(45°)", "1"] }
  },
  {
    name: "Load sec 60° example → 2",
    actions: [
      { kind: "click", label: "Load sec 60° example" },
      { kind: "click", label: "Calculate Cofunction" }
    ],
    expect: { text: ["sec(60°) = csc(30°)", "2"] }
  },
  {
    name: "Load cos 1.047 rad example",
    actions: [
      { kind: "click", label: "Load cos 1.047 rad example" },
      { kind: "click", label: "Calculate Cofunction" }
    ],
    expect: { text: ["cos(1.047 rad) = sin(0.5237963268 rad)", "0.5001710746"] }
  }
];
