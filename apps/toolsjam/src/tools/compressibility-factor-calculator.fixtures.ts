import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Methane at standard conditions Z ≈ 0.998",
    actions: [
      { kind: "fill", label: "Pressure (P)", value: "1.0" },
      { kind: "fill", label: "Temperature (T, K)", value: "298.15" },
      { kind: "fill", label: "Critical Pressure (Pc)", value: "45.99" },
      { kind: "fill", label: "Critical Temperature (Tc, K)", value: "190.56" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Compressibility Factor Z"] },
  },
  {
    name: "Nitrogen at high pressure Z ≈ 0.976",
    actions: [
      { kind: "fill", label: "Pressure (P)", value: "100.0" },
      { kind: "fill", label: "Temperature (T, K)", value: "300.0" },
      { kind: "fill", label: "Critical Pressure (Pc)", value: "33.6" },
      { kind: "fill", label: "Critical Temperature (Tc, K)", value: "126.2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Compressibility Factor Z", "Reduced Pressure"] },
  },
];
