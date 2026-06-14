import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Classroom scores 85,92,78,88,90 → SEM displayed",
    actions: [
      {
        kind: "fill",
        label: "Sample Data (comma-separated)",
        value: "85, 92, 78, 88, 90",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Standard Error (SEM)", "Mean (x̄)", "Results"] },
  },
  {
    name: "Ball bearing diameters 5.01,4.98,5.03,4.99,5.00 → SEM displayed",
    actions: [
      {
        kind: "fill",
        label: "Sample Data (comma-separated)",
        value: "5.01, 4.98, 5.03, 4.99, 5.00",
      },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Standard Error (SEM)", "Mean (x̄)", "Results"] },
  },
];
