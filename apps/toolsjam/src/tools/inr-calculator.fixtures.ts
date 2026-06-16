import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal INR – PT 12s, Control 12s, ISI 1.0",
    actions: [
      { kind: "click", label: "Patient PT + Control PT (seconds)" },
      { kind: "fill", label: "Prothrombin Time – Patient PT (seconds)", value: "12" },
      { kind: "fill", label: "Control PT (seconds)", value: "12" },
      { kind: "fill", label: "International Sensitivity Index (ISI)", value: "1.0" },
      { kind: "click", label: "Calculate INR" },
    ],
    expect: { text: ["Your INR Result", "1.00", "Normal (not on anticoagulants)"] },
  },
  {
    name: "Therapeutic INR – PT 24s, Control 12s, ISI 1.0",
    actions: [
      { kind: "click", label: "Patient PT + Control PT (seconds)" },
      { kind: "fill", label: "Prothrombin Time – Patient PT (seconds)", value: "24" },
      { kind: "fill", label: "Control PT (seconds)", value: "12" },
      { kind: "fill", label: "International Sensitivity Index (ISI)", value: "1.0" },
      { kind: "click", label: "Calculate INR" },
    ],
    expect: { text: ["Your INR Result", "2.00", "Therapeutic – standard warfarin range"] },
  },
  {
    name: "Pre-calculated PT ratio 2.5, ISI 1.2",
    actions: [
      { kind: "click", label: "PT Ratio (pre-calculated)" },
      { kind: "fill", label: "PT Ratio (pre-calculated)", value: "2.5" },
      { kind: "fill", label: "International Sensitivity Index (ISI)", value: "1.2" },
      { kind: "click", label: "Calculate INR" },
    ],
    expect: { text: ["Your INR Result", "INR"] },
  },
];
