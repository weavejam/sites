import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Stable ICU example",
    actions: [{ kind: "click", label: "Load stable ICU example" }],
    expect: { text: ["0.4%", "Low predicted mortality"] },
  },
  {
    name: "Critical medical example",
    actions: [{ kind: "click", label: "Load critical medical example" }],
    expect: { text: ["91.9%", "Very high predicted mortality"] },
  },
];
