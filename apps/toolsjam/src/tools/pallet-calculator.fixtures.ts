import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "48×40 pallet, 12×10×8 boxes, 60 in height, 25 lb, 2000 lb max → 80 boxes",
    actions: [
      { kind: "fill", label: "Pallet Length (in)", value: "48" },
      { kind: "fill", label: "Pallet Width (in)", value: "40" },
      { kind: "fill", label: "Box Length (in)", value: "12" },
      { kind: "fill", label: "Box Width (in)", value: "10" },
      { kind: "fill", label: "Box Height (in)", value: "8" },
      { kind: "fill", label: "Max Stack Height (in)", value: "60" },
      { kind: "fill", label: "Box Weight (lbs)", value: "25" },
      { kind: "fill", label: "Max Pallet Weight (lbs)", value: "2000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["80"] },
  },
  {
    name: "48×40 pallet, 12×8×10 boxes, 60 in height, 30 lb, 1800 lb max → 60 boxes",
    actions: [
      { kind: "fill", label: "Pallet Length (in)", value: "48" },
      { kind: "fill", label: "Pallet Width (in)", value: "40" },
      { kind: "fill", label: "Box Length (in)", value: "12" },
      { kind: "fill", label: "Box Width (in)", value: "8" },
      { kind: "fill", label: "Box Height (in)", value: "10" },
      { kind: "fill", label: "Max Stack Height (in)", value: "60" },
      { kind: "fill", label: "Box Weight (lbs)", value: "30" },
      { kind: "fill", label: "Max Pallet Weight (lbs)", value: "1800" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["60"] },
  },
];
