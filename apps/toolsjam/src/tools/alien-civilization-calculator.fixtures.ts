import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Scientific consensus parameters → N ≈ 0.45",
    actions: [
      { kind: "fill", label: "Star Formation Rate (R★)", value: "1.5" },
      { kind: "fill", label: "Fraction of Stars with Planets (fp)", value: "0.6" },
      { kind: "fill", label: "Average Planets per Star (ne)", value: "2.5" },
      { kind: "fill", label: "Fraction of Habitable Planets (fl)", value: "0.2" },
      { kind: "fill", label: "Fraction Where Life Develops (fi)", value: "0.1" },
      { kind: "fill", label: "Fraction That Become Intelligent (fc)", value: "0.1" },
      { kind: "fill", label: "Fraction That Develop Technology (L_fraction)", value: "0.2" },
      { kind: "fill", label: "Average Civilization Lifetime (L)", value: "1000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Estimated Civilizations", "N ="] },
  },
  {
    name: "Load optimistic preset → large N",
    actions: [
      { kind: "click", label: "Load optimistic estimate" },
    ],
    expect: { text: ["N ="] },
  },
  {
    name: "Load conservative preset → small N",
    actions: [
      { kind: "click", label: "Load conservative estimate" },
    ],
    expect: { text: ["N ="] },
  },
];
