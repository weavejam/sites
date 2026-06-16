import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Mifflin example → RMR 1649 kcal/day",
    actions: [{ kind: "click", label: "Load Mifflin example" }],
    expect: { text: ["1649", "Mifflin-St Jeor"] },
  },
  {
    name: "Katch example → TDEE 3563 kcal/day",
    actions: [{ kind: "click", label: "Load Katch-McArdle example" }],
    expect: { text: ["3563", "Katch-McArdle"] },
  },
];
