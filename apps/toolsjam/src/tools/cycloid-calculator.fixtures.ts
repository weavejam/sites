import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "r=1 t=π → highest point x≈3.1416 y=2",
    actions: [
      { kind: "fill", label: "Radius (r)", value: "1" },
      { kind: "fill", label: "Parameter (t) in radians", value: "3.14159265" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "3.14159", "2"] },
  },
  {
    name: "r=2 t=π/2 → x≈1.7168 y=2",
    actions: [
      { kind: "fill", label: "Radius (r)", value: "2" },
      { kind: "fill", label: "Parameter (t) in radians", value: "1.5707963" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Arc length"] },
  },
];
