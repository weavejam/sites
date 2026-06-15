import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Right triangle 3-4-5 prism L=15 → total=192",
    actions: [
      { kind: "fill", label: "Triangle Side a", value: "3" },
      { kind: "fill", label: "Triangle Side b", value: "4" },
      { kind: "fill", label: "Triangle Side c", value: "5" },
      { kind: "fill", label: "Prism Length (L)", value: "15" },
      { kind: "click", label: "Calculate Surface Area" },
    ],
    expect: { text: ["Total Surface Area", "192"] },
  },
  {
    name: "Equilateral triangle 10-10-10 prism L=20 → total≈686.6",
    actions: [
      { kind: "fill", label: "Triangle Side a", value: "10" },
      { kind: "fill", label: "Triangle Side b", value: "10" },
      { kind: "fill", label: "Triangle Side c", value: "10" },
      { kind: "fill", label: "Prism Length (L)", value: "20" },
      { kind: "click", label: "Calculate Surface Area" },
    ],
    expect: { text: ["Total Surface Area", "686"] },
  },
];
