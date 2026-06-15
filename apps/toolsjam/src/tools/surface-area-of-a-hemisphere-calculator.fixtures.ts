import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Hemisphere r=3: total ≈ 84.82",
    actions: [
      { kind: "fill", label: "Radius (r)", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Total Surface Area", "84.8"] },
  },
  {
    name: "Hemisphere r=10: total ≈ 942.48",
    actions: [
      { kind: "fill", label: "Radius (r)", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Total Surface Area", "942"] },
  },
];
