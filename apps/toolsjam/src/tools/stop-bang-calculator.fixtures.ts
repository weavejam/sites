import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "All No answers → Low risk score 0",
    actions: [
      { kind: "click", label: /^No – S –/ },
      { kind: "click", label: /^No – T –/ },
      { kind: "click", label: /^No – O –/ },
      { kind: "click", label: /^No – P –/ },
      { kind: "click", label: /^No – B –/ },
      { kind: "click", label: /^No – A –/ },
      { kind: "click", label: /^No – N –/ },
      { kind: "click", label: /^No – G –/ },
      { kind: "click", label: "Calculate STOP-BANG Score" },
    ],
    expect: { text: ["Low Risk", "out of 8"] },
  },
  {
    name: "All Yes answers → High risk score 8",
    actions: [
      { kind: "click", label: /^Yes – S –/ },
      { kind: "click", label: /^Yes – T –/ },
      { kind: "click", label: /^Yes – O –/ },
      { kind: "click", label: /^Yes – P –/ },
      { kind: "click", label: /^Yes – B –/ },
      { kind: "click", label: /^Yes – A –/ },
      { kind: "click", label: /^Yes – N –/ },
      { kind: "click", label: /^Yes – G –/ },
      { kind: "click", label: "Calculate STOP-BANG Score" },
    ],
    expect: { text: ["High Risk", "out of 8"] },
  },
];
