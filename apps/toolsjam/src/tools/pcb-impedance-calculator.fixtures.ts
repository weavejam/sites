import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Microstrip 50 Ω: W=7, T=1.378, H=4, εr=4.5",
    actions: [
      { kind: "click", label: "Microstrip" },
      { kind: "fill", label: "Trace Width (W)", value: "7" },
      { kind: "fill", label: "Trace Thickness (T)", value: "1.378" },
      { kind: "fill", label: "Dielectric Height (H)", value: "4" },
      { kind: "fill", label: "Dielectric Constant (εr)", value: "4.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Impedance Result", "Ω"] },
  },
  {
    name: "Stripline: W=5, T=1.378, B=20, εr=4.5",
    actions: [
      { kind: "click", label: "Stripline" },
      { kind: "fill", label: "Trace Width (W)", value: "5" },
      { kind: "fill", label: "Trace Thickness (T)", value: "1.378" },
      { kind: "fill", label: "Plane-to-Plane Spacing (B)", value: "20" },
      { kind: "fill", label: "Dielectric Constant (εr)", value: "4.5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Impedance Result", "Ω"] },
  },
];
