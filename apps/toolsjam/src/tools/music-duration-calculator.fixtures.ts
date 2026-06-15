import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "32 measures at 120 BPM in 4/4 lasts 64 seconds",
    actions: [
      { kind: "fill", label: "BPM (Beats Per Minute)", value: "120" },
      { kind: "fill", label: "Number of Measures", value: "32" },
      { kind: "fill", label: "Time Signature", value: "4/4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1:04", "64"] },
  },
  {
    name: "16 measures at 90 BPM in 3/4 lasts 32 seconds",
    actions: [
      { kind: "fill", label: "BPM (Beats Per Minute)", value: "90" },
      { kind: "fill", label: "Number of Measures", value: "16" },
      { kind: "fill", label: "Time Signature", value: "3/4" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "0:32", "32"] },
  },
];
