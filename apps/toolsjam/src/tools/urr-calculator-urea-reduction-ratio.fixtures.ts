import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Adequate dialysis — URR 65.0%",
    actions: [
      { kind: "fill", label: "Pre-dialysis BUN (mg/dL)", value: "40" },
      { kind: "fill", label: "Post-dialysis BUN (mg/dL)", value: "14" },
      { kind: "click", label: "Calculate URR" },
    ],
    expect: { text: ["65.0", "Adequate"] },
  },
  {
    name: "Excellent dialysis — URR 83.3%",
    actions: [
      { kind: "fill", label: "Pre-dialysis BUN (mg/dL)", value: "60" },
      { kind: "fill", label: "Post-dialysis BUN (mg/dL)", value: "10" },
      { kind: "click", label: "Calculate URR" },
    ],
    expect: { text: ["83.3", "Excellent"] },
  },
];
