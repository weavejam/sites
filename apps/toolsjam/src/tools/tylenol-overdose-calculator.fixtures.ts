import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Low risk: 70 kg, 2000 mg, 2 hours → 28.6 mg/kg",
    actions: [
      { kind: "fill", label: "Patient Weight", value: "70" },
      { kind: "click", label: "kg" },
      { kind: "fill", label: "Amount Ingested (mg)", value: "2000" },
      { kind: "fill", label: "Time Since Ingestion (hours)", value: "2" },
      { kind: "click", label: "Regular release" },
      { kind: "click", label: "Assess Overdose Risk" },
    ],
    expect: { text: ["Overdose Risk Assessment", "Low Risk"] },
  },
  {
    name: "Critical: 40 kg, 10000 mg, 2 hours → 250 mg/kg",
    actions: [
      { kind: "fill", label: "Patient Weight", value: "40" },
      { kind: "click", label: "kg" },
      { kind: "fill", label: "Amount Ingested (mg)", value: "10000" },
      { kind: "fill", label: "Time Since Ingestion (hours)", value: "2" },
      { kind: "click", label: "Regular release" },
      { kind: "click", label: "Assess Overdose Risk" },
    ],
    expect: { text: ["Overdose Risk Assessment", "Critical"] },
  },
  {
    name: "High risk: 55 kg, 10000 mg → 181.8 mg/kg",
    actions: [
      { kind: "fill", label: "Patient Weight", value: "55" },
      { kind: "click", label: "kg" },
      { kind: "fill", label: "Amount Ingested (mg)", value: "10000" },
      { kind: "fill", label: "Time Since Ingestion (hours)", value: "5" },
      { kind: "click", label: "Regular release" },
      { kind: "click", label: "Assess Overdose Risk" },
    ],
    expect: { text: ["Overdose Risk Assessment", "High Risk"] },
  },
];
