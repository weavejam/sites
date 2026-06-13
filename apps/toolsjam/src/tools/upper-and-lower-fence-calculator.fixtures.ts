import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Dataset with outlier 100 → Upper Fence ~30.5",
    actions: [
      { kind: "fill", label: "Data Set", value: "4, 8, 15, 16, 23, 42, 100" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Upper Fence", "Lower Fence", "IQR"] },
  },
  {
    name: "Clean dataset no outliers",
    actions: [
      { kind: "fill", label: "Data Set", value: "10, 12, 14, 16, 18, 20, 22, 24" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["No outliers"] },
  },
];
