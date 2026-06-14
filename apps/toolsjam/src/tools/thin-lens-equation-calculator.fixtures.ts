import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Solve for image distance: do=30cm, f=10cm → di=15cm",
    actions: [
      { kind: "click", label: "Solve for dᵢ" },
      { kind: "fill", label: "Object Distance (dₒ)", value: "30" },
      { kind: "fill", label: "Focal Length (f)", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "15", "Real", "Inverted"] },
  },
  {
    name: "Solve for image distance: magnifying glass do=5cm, f=10cm → di=-10cm",
    actions: [
      { kind: "click", label: "Solve for dᵢ" },
      { kind: "fill", label: "Object Distance (dₒ)", value: "5" },
      { kind: "fill", label: "Focal Length (f)", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Virtual", "Upright"] },
  },
  {
    name: "Solve for focal length: do=20cm, di=20cm → f=10cm",
    actions: [
      { kind: "click", label: "Solve for f" },
      { kind: "fill", label: "Object Distance (dₒ)", value: "20" },
      { kind: "fill", label: "Image Distance (dᵢ)", value: "20" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "10"] },
  },
];
