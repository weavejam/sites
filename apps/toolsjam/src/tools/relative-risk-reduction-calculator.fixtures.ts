import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Cholesterol drug: treat=80/1000, control=120/1000 → RRR=33.3%",
    actions: [
      { kind: "fill", label: "Treatment: Patients with Event", value: "80" },
      { kind: "fill", label: "Treatment: Total Patients", value: "1000" },
      { kind: "fill", label: "Control: Patients with Event", value: "120" },
      { kind: "fill", label: "Control: Total Patients", value: "1000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: [
        "Results",
        "RRR (Relative Risk Reduction)",
        "NNT (Number Needed to Treat)",
      ],
    },
  },
  {
    name: "Flu vaccine: treat=25/5000, control=85/5000 → RRR≈70.6%",
    actions: [
      { kind: "fill", label: "Treatment: Patients with Event", value: "25" },
      { kind: "fill", label: "Treatment: Total Patients", value: "5000" },
      { kind: "fill", label: "Control: Patients with Event", value: "85" },
      { kind: "fill", label: "Control: Total Patients", value: "5000" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: [
        "Results",
        "CER (Control Event Rate)",
        "ARR (Absolute Risk Reduction)",
      ],
    },
  },
  {
    name: "New surgical technique: treat=10/250, control=25/250 → NNT≈16.7",
    actions: [
      { kind: "fill", label: "Treatment: Patients with Event", value: "10" },
      { kind: "fill", label: "Treatment: Total Patients", value: "250" },
      { kind: "fill", label: "Control: Patients with Event", value: "25" },
      { kind: "fill", label: "Control: Total Patients", value: "250" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Relative Risk (RR)", "EER (Treatment Event Rate)"] },
  },
];
