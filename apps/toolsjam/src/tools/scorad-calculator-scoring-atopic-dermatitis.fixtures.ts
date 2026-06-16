import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Moderate SCORAD example",
    actions: [{ kind: "click", label: "Load moderate example" }],
    expect: { text: ["43.0", "moderate atopic dermatitis"] },
  },
  {
    name: "Severe SCORAD example",
    actions: [{ kind: "click", label: "Load severe example" }],
    expect: { text: ["83.5", "severe atopic dermatitis"] },
  },
];
