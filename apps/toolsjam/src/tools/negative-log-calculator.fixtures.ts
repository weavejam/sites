import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "pH of pure water: -log10(1e-7) = 7",
    actions: [
      { kind: "fill", label: "Value (x)", value: "0.0000001" },
      { kind: "fill", label: "Base", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "7"] },
  },
  {
    name: "Surprisal of 0.25 in bits: -log2(0.25) = 2",
    actions: [
      { kind: "fill", label: "Value (x)", value: "0.25" },
      { kind: "fill", label: "Base", value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "2"] },
  },
  {
    name: "Custom base: -log3(81) = -4",
    actions: [
      { kind: "fill", label: "Value (x)", value: "81" },
      { kind: "fill", label: "Base", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: "Result" },
  },
];
