import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Standard 60-inch wide flag with 50 stars",
    actions: [
      { kind: "click", label: "Inches" },
      { kind: "fill", label: "Flag Width (Inches)", value: "60" },
      { kind: "fill", label: "Number of Stars", value: "50" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Flag Dimensions", "1.9:1"] },
  },
  {
    name: "Historical 48-inch wide flag with 48 stars",
    actions: [
      { kind: "click", label: "Inches" },
      { kind: "fill", label: "Flag Width (Inches)", value: "48" },
      { kind: "fill", label: "Number of Stars", value: "48" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Flag Dimensions", "Stripe Width"] },
  },
];
