import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "C(5, 2) = 10",
    actions: [
      { kind: "fill", label: "Total items (n)", value: "5" },
      { kind: "fill", label: "Items to choose (k)", value: "2" },
      { kind: "click", label: "Calculate C(n, k)" },
    ],
    expect: { text: ["Result", "10"] },
  },
  {
    name: "C(52, 5) = 2,598,960 (poker hands)",
    actions: [
      { kind: "fill", label: "Total items (n)", value: "52" },
      { kind: "fill", label: "Items to choose (k)", value: "5" },
      { kind: "click", label: "Calculate C(n, k)" },
    ],
    expect: { text: ["Result", "2,598,960"] },
  },
  {
    name: "C(12, 4) = 495",
    actions: [
      { kind: "fill", label: "Total items (n)", value: "12" },
      { kind: "fill", label: "Items to choose (k)", value: "4" },
      { kind: "click", label: "Calculate C(n, k)" },
    ],
    expect: { text: ["Result", "495"] },
  },
];
