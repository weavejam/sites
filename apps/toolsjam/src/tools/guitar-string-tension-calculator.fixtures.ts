import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Steel E4 string on 25.5\" Fender scale → tension shown",
    actions: [
      { kind: "fill", label: "Scale Length", value: "25.5" },
      { kind: "fill", label: "String Gauge (inches)", value: "0.009" },
      { kind: "fill", label: "Note Name", value: "E4" },
      { kind: "click", label: "Calculate String Tension" },
    ],
    expect: { text: ["String Tension Results", "Tension (lbs)"] },
  },
  {
    name: "Steel A2 string on 25.5\" scale via frequency → tension shown",
    actions: [
      { kind: "fill", label: "Scale Length", value: "25.5" },
      { kind: "fill", label: "String Gauge (inches)", value: "0.017" },
      { kind: "fill", label: "Frequency (Hz)", value: "110" },
      { kind: "click", label: "Calculate String Tension" },
    ],
    expect: { text: ["String Tension Results", "Tension (N)"] },
  },
];
