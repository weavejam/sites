import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Ruby example returns a 0.4000 carat estimate",
    actions: [
      { kind: "click", label: "Load ruby example" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0.4000", "100.00"] },
  },
  {
    name: "Emerald example returns the expected range",
    actions: [
      { kind: "click", label: "Load emerald example" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0.2835", "0.2552", "0.3119"] },
  },
];
