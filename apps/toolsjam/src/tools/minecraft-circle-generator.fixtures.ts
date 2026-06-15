import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Outline circle radius 5, midpoint algorithm",
    actions: [
      { kind: "fill", label: "Radius (blocks)", value: "5" },
      { kind: "fill", label: "Center X", value: "0" },
      { kind: "fill", label: "Center Y", value: "0" },
      { kind: "click", label: "Midpoint Circle" },
      { kind: "click", label: "Outline" },
      { kind: "click", label: "Generate Circle" },
    ],
    expect: { text: ["Total blocks", "Diameter"] },
  },
  {
    name: "Filled circle radius 10, bresenham algorithm",
    actions: [
      { kind: "fill", label: "Radius (blocks)", value: "10" },
      { kind: "fill", label: "Center X", value: "100" },
      { kind: "fill", label: "Center Y", value: "64" },
      { kind: "click", label: "Bresenham Circle" },
      { kind: "click", label: "Filled" },
      { kind: "click", label: "Generate Circle" },
    ],
    expect: { text: ["Total blocks", "Center"] },
  },
  {
    name: "Medium outline circle radius 15",
    actions: [
      { kind: "fill", label: "Radius (blocks)", value: "15" },
      { kind: "click", label: "Midpoint Circle" },
      { kind: "click", label: "Outline" },
      { kind: "click", label: "Generate Circle" },
    ],
    expect: { text: ["Total blocks", "31"] },
  },
];
