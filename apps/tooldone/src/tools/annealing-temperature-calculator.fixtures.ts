import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Standard 22bp primer with nearest-neighbor method",
    actions: [
      { kind: "fill", label: "Forward Primer Sequence", value: "ATGGAGCTGAAGCAGCAGATCC" },
      { kind: "fill", label: "Salt Concentration (mM)", value: "50" },
      { kind: "fill", label: "DNA Concentration (nM)", value: "250" },
      { kind: "click", label: "Calculate Temperature" },
    ],
    expect: { text: ["Temperature Results", "°C"] },
  },
  {
    name: "Short primer with Wallace Rule",
    actions: [
      { kind: "fill", label: "Forward Primer Sequence", value: "ATCGATCGATCG" },
      { kind: "fill", label: "Salt Concentration (mM)", value: "50" },
      { kind: "fill", label: "DNA Concentration (nM)", value: "250" },
      { kind: "click", label: "Calculate Temperature" },
    ],
    expect: { text: ["Temperature Results", "°C"] },
  },
  {
    name: "Primer pair: forward and reverse both provided",
    actions: [
      { kind: "fill", label: "Forward Primer Sequence", value: "ATGGAGCTGAAGCAGCAGATCC" },
      { kind: "fill", label: "Reverse Primer Sequence (Optional)", value: "CTCGAGTTTGCCACGCTCTGG" },
      { kind: "fill", label: "Salt Concentration (mM)", value: "50" },
      { kind: "fill", label: "DNA Concentration (nM)", value: "250" },
      { kind: "click", label: "Calculate Temperature" },
    ],
    expect: { text: ["Temperature Results", "Tm — Forward Primer", "Tm — Reverse Primer"] },
  },
];
