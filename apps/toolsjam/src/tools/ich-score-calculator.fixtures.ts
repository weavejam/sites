import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Mild ICH score example",
    actions: [
      { kind: "fill", label: "Age (years)", value: "66" },
      { kind: "fill", label: "Glasgow Coma Scale (3–15)", value: "13" },
      { kind: "fill", label: "ICH volume (cm³)", value: "29" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "0", "0%"] },
  },
  {
    name: "Severe ICH score example",
    actions: [
      { kind: "fill", label: "Age (years)", value: "81" },
      { kind: "fill", label: "Glasgow Coma Scale (3–15)", value: "5" },
      { kind: "fill", label: "ICH volume (cm³)", value: "31" },
      { kind: "click", label: "Intraventricular hemorrhage: Yes" },
      { kind: "click", label: "Infratentorial origin: No" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "4", "97%"] },
  },
];
