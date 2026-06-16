import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "120 mmHg → PSI with default settings (3 decimal places)",
    actions: [
      { kind: "fill", label: "Pressure Value", value: "120" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Conversion Result", "PSI"] },
  },
  {
    name: "1000 mmHg → PSI shows result",
    actions: [
      { kind: "fill", label: "Pressure Value", value: "1000" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Conversion Result", "PSI"] },
  },
];
