import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Easter 2024 → 31 March",
    actions: [
      { kind: "fill", label: "Year", value: "2024" },
      { kind: "click", label: "Calculate Easter Date" },
    ],
    expect: { text: ["Easter Dates", "31 March 2024"] },
  },
  {
    name: "Easter 2025 → 20 April",
    actions: [
      { kind: "fill", label: "Year", value: "2025" },
      { kind: "click", label: "Calculate Easter Date" },
    ],
    expect: { text: ["Easter Dates", "20 April 2025"] },
  },
  {
    name: "Easter 2026 → 5 April",
    actions: [
      { kind: "fill", label: "Year", value: "2026" },
      { kind: "click", label: "Calculate Easter Date" },
    ],
    expect: { text: ["Easter Dates", "5 April 2026"] },
  },
];
