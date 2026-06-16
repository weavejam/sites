import type { ToolFixture } from "@/tools/fixture";

// Gender defaults to "male", ethnicity to "caucasian", smoking to "never"
export const fixtures: ToolFixture[] = [
  {
    name: "Healthy adult male — age 35, height 175 cm",
    actions: [
      { kind: "fill", label: "Patient Age (years)", value: "35" },
      { kind: "fill", label: "Patient Height (cm)", value: "175" },
      { kind: "click", label: "Calculate Vital Capacity" },
    ],
    expect: { text: ["Predicted vital capacity", "4."] },
  },
  {
    name: "Elderly patient — age 75, height 160 cm",
    actions: [
      { kind: "fill", label: "Patient Age (years)", value: "75" },
      { kind: "fill", label: "Patient Height (cm)", value: "160" },
      { kind: "click", label: "Calculate Vital Capacity" },
    ],
    expect: { text: ["Predicted vital capacity"] },
  },
];
