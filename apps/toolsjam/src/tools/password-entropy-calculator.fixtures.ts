import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Auto-detect: mixed-case+digit+symbol password",
    actions: [
      { kind: "click", label: "Auto-detect from password" },
      { kind: "fill", label: "Password", value: "Tr0ub4dor&3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Entropy Analysis", "bits"] },
  },
  {
    name: "Manual: pool 94, length 12 → ~78.7 bits → Strong",
    actions: [
      { kind: "click", label: "Manual (pool size + length)" },
      { kind: "fill", label: "Character Pool Size", value: "94" },
      { kind: "fill", label: "Password Length", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Entropy Analysis", "Strong"] },
  },
];
