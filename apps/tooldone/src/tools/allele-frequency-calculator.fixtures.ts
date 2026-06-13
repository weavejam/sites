import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Genotype counts: 50 AA, 30 Aa, 20 aa → p=0.65, q=0.35",
    actions: [
      { kind: "click", label: "Genotype Counts" },
      { kind: "fill", label: "Number of AA (homozygous dominant)", value: "50" },
      { kind: "fill", label: "Number of Aa (heterozygous)", value: "30" },
      { kind: "fill", label: "Number of aa (homozygous recessive)", value: "20" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "0.65", "0.35"] },
  },
  {
    name: "Equal allele counts: 120 A, 80 a → p=0.6, q=0.4",
    actions: [
      { kind: "click", label: "Allele Counts" },
      { kind: "fill", label: "Number of A alleles", value: "120" },
      { kind: "fill", label: "Number of a alleles", value: "80" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "0.6", "0.4"] },
  },
  {
    name: "Even split genotypes: 10 AA, 80 Aa, 10 aa → p=0.5, q=0.5",
    actions: [
      { kind: "click", label: "Genotype Counts" },
      { kind: "fill", label: "Number of AA (homozygous dominant)", value: "10" },
      { kind: "fill", label: "Number of Aa (heterozygous)", value: "80" },
      { kind: "fill", label: "Number of aa (homozygous recessive)", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "0.5"] },
  },
];
