import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Standard topo map: 1:50000 horizontal / 1:10000 vertical = 5×",
    actions: [
      { kind: "fill", label: "Horizontal Scale (denominator, e.g. 50000 for 1:50000)", value: "50000" },
      { kind: "fill", label: "Vertical Scale (denominator, e.g. 10000 for 1:10000)", value: "10000" },
      { kind: "click", label: "Calculate Exaggeration" },
    ],
    expect: { text: ["Vertical Exaggeration Result", "5.00×"] },
  },
  {
    name: "Detailed survey: 1:10000 horizontal / 1:2000 vertical = 5×",
    actions: [
      { kind: "fill", label: "Horizontal Scale (denominator, e.g. 50000 for 1:50000)", value: "10000" },
      { kind: "fill", label: "Vertical Scale (denominator, e.g. 10000 for 1:10000)", value: "2000" },
      { kind: "click", label: "Calculate Exaggeration" },
    ],
    expect: { text: ["Vertical Exaggeration Result", "5.00×"] },
  },
  {
    name: "Regional map: 1:100000 horizontal / 1:25000 vertical = 4×",
    actions: [
      { kind: "fill", label: "Horizontal Scale (denominator, e.g. 50000 for 1:50000)", value: "100000" },
      { kind: "fill", label: "Vertical Scale (denominator, e.g. 10000 for 1:10000)", value: "25000" },
      { kind: "click", label: "Calculate Exaggeration" },
    ],
    expect: { text: ["Vertical Exaggeration Result", "4.00×"] },
  },
];
