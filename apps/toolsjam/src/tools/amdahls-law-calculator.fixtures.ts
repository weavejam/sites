import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Low serial fraction p=0.05, n=8, T=1000s → ~7× speedup",
    actions: [
      { kind: "fill", label: "Serial Fraction (p)", value: "0.05" },
      { kind: "fill", label: "Number of Processors (n)", value: "8" },
      { kind: "fill", label: "Original Execution Time (seconds)", value: "1000" },
      { kind: "click", label: "Calculate Speedup" },
    ],
    expect: { text: ["Amdahl's Law Results", "Speedup"] },
  },
  {
    name: "Moderate parallelism p=0.2, n=16, T=3600s → 4× speedup",
    actions: [
      { kind: "fill", label: "Serial Fraction (p)", value: "0.2" },
      { kind: "fill", label: "Number of Processors (n)", value: "16" },
      { kind: "fill", label: "Original Execution Time (seconds)", value: "3600" },
      { kind: "click", label: "Calculate Speedup" },
    ],
    expect: { text: ["Amdahl's Law Results", "Parallel Execution Time"] },
  },
];
