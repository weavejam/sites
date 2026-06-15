import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Cone: radius=3, height=4 → slant height=5",
    actions: [
      { kind: "click", label: "Cone" },
      { kind: "click", label: "Slant Height (s)" },
      { kind: "fill", label: "Radius (r)", value: "3" },
      { kind: "fill", label: "Height (h)", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "5"] },
  },
  {
    name: "Cone: radius=5, slant=13 → height=12",
    actions: [
      { kind: "click", label: "Cone" },
      { kind: "click", label: "Height (h)" },
      { kind: "fill", label: "Radius (r)", value: "5" },
      { kind: "fill", label: "Slant Height (s)", value: "13" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "12"] },
  },
  {
    name: "Pyramid: base=6, height=4 → slant=5",
    actions: [
      { kind: "click", label: "Square Pyramid" },
      { kind: "click", label: "Slant Height (s)" },
      { kind: "fill", label: "Base Edge (a)", value: "6" },
      { kind: "fill", label: "Height (h)", value: "4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "5"] },
  },
];
