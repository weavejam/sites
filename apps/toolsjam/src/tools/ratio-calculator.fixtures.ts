import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Solve proportion 2:12 = x:30 (recipe scaling)",
    actions: [
      { kind: "click", label: "Solve Proportion (A:B = C:D)" },
      { kind: "fill", label: "Value A", value: "2" },
      { kind: "fill", label: "Value B", value: "12" },
      { kind: "fill", label: "Value C", value: "" },
      { kind: "fill", label: "Value D", value: "30" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "5"] },
  },
  {
    name: "Simplify ratio 18:24",
    actions: [
      { kind: "click", label: "Simplify Ratio (A:B)" },
      { kind: "fill", label: "Value A", value: "18" },
      { kind: "fill", label: "Value B", value: "24" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "3", "4"] },
  },
  {
    name: "Solve proportion 16:9 = 1920:x (screen resolution)",
    actions: [
      { kind: "click", label: "Solve Proportion (A:B = C:D)" },
      { kind: "fill", label: "Value A", value: "16" },
      { kind: "fill", label: "Value B", value: "9" },
      { kind: "fill", label: "Value C", value: "1920" },
      { kind: "fill", label: "Value D", value: "" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "1080"] },
  },
];
