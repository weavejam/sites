import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Athletic male: 80 kg / 178 cm / 12% → normalized FFMI ~22.3",
    actions: [
      { kind: "fill", label: "Weight", value: "80" },
      { kind: "fill", label: "Height", value: "178" },
      { kind: "fill", label: "Body Fat Percentage (%)", value: "12" },
      { kind: "click", label: "Calculate FFMI" },
    ],
    expect: { text: ["22.3", "Superior"] },
  },
  {
    name: "Fitness female: 60 kg / 165 cm / 22% → above-average",
    actions: [
      { kind: "fill", label: "Weight", value: "60" },
      { kind: "fill", label: "Height", value: "165" },
      { kind: "fill", label: "Body Fat Percentage (%)", value: "22" },
      { kind: "click", label: "Calculate FFMI" },
    ],
    expect: { text: ["18.1", "above"] },
  },
];
