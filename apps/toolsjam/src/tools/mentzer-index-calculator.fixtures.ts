import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Thalassemia trait (index < 13)",
    actions: [
      { kind: "fill", label: "MCV – Mean Corpuscular Volume (fL)", value: "65" },
      { kind: "fill", label: "RBC Count (×10⁶/μL)", value: "5.8" },
      { kind: "click", label: "Calculate Index" },
    ],
    expect: { text: ["11.2", "Thalassemia trait likely"] },
  },
  {
    name: "Iron deficiency anemia (index ≥ 13)",
    actions: [
      { kind: "fill", label: "MCV – Mean Corpuscular Volume (fL)", value: "72" },
      { kind: "fill", label: "RBC Count (×10⁶/μL)", value: "3.8" },
      { kind: "click", label: "Calculate Index" },
    ],
    expect: { text: ["18.95", "Iron deficiency anemia likely"] },
  },
];
