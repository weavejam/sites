import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Beach day UV 7, 65 degrees, SPF 30",
    actions: [
      { kind: "fill", label: "UV Index", value: "7" },
      { kind: "fill", label: "Sun Angle (degrees)", value: "65" },
      { kind: "fill", label: "SPF Factor", value: "30" },
      { kind: "fill", label: "Current Exposure Time (minutes)", value: "60" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Sunbathing Results", "Safe Exposure Time", "minutes"] },
  },
  {
    name: "Low UV winter conditions, SPF 15",
    actions: [
      { kind: "fill", label: "UV Index", value: "3" },
      { kind: "fill", label: "Sun Angle (degrees)", value: "25" },
      { kind: "fill", label: "SPF Factor", value: "15" },
      { kind: "fill", label: "Current Exposure Time (minutes)", value: "45" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Sunbathing Results", "Vitamin D Production", "Sunburn Risk"] },
  },
];
