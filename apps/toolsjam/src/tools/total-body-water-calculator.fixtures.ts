import type { ToolFixture } from "@/tools/fixture";

// Gender defaults to "male"
export const fixtures: ToolFixture[] = [
  {
    name: "Adult male — age 28, height 180 cm, weight 75 kg",
    actions: [
      { kind: "fill", label: "Age (years)", value: "28" },
      { kind: "fill", label: "Height (cm)", value: "180" },
      { kind: "fill", label: "Weight (kg)", value: "75" },
      { kind: "click", label: "Calculate Total Body Water" },
    ],
    expect: { text: ["liters", "%", "Normal"] },
  },
  {
    name: "Adult male with body fat — age 35, height 175 cm, weight 80 kg, 20% body fat",
    actions: [
      { kind: "fill", label: "Age (years)", value: "35" },
      { kind: "fill", label: "Height (cm)", value: "175" },
      { kind: "fill", label: "Weight (kg)", value: "80" },
      { kind: "fill", label: "Body Fat Percentage (optional)", value: "20" },
      { kind: "click", label: "Calculate Total Body Water" },
    ],
    expect: { text: ["liters", "%"] },
  },
];
