import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal iron status – healthy male",
    actions: [
      { kind: "click", label: "Male" },
      { kind: "fill", label: "Hemoglobin (g/dL)", value: "15.0" },
      { kind: "fill", label: "Ferritin (ng/mL)", value: "80" },
      { kind: "fill", label: "Transferrin Saturation (%)", value: "30" },
      { kind: "fill", label: "TIBC – Total Iron-Binding Capacity (μg/dL)", value: "300" },
      { kind: "fill", label: "MCV – Mean Corpuscular Volume (fL)", value: "90" },
      { kind: "click", label: "Assess Iron Status" },
    ],
    expect: { text: ["Iron Status Assessment", "Normal Iron Status"] },
  },
  {
    name: "Iron deficiency anemia – female",
    actions: [
      { kind: "click", label: "Female" },
      { kind: "fill", label: "Hemoglobin (g/dL)", value: "10.5" },
      { kind: "fill", label: "Ferritin (ng/mL)", value: "6" },
      { kind: "fill", label: "Transferrin Saturation (%)", value: "10" },
      { kind: "fill", label: "TIBC – Total Iron-Binding Capacity (μg/dL)", value: "490" },
      { kind: "fill", label: "MCV – Mean Corpuscular Volume (fL)", value: "72" },
      { kind: "click", label: "Assess Iron Status" },
    ],
    expect: { text: ["Iron Status Assessment", "Iron Deficiency Anemia"] },
  },
  {
    name: "Iron depletion stage 1 – female low ferritin only",
    actions: [
      { kind: "click", label: "Female" },
      { kind: "fill", label: "Hemoglobin (g/dL)", value: "13.0" },
      { kind: "fill", label: "Ferritin (ng/mL)", value: "8" },
      { kind: "click", label: "Assess Iron Status" },
    ],
    expect: { text: ["Iron Status Assessment"] },
  },
];
