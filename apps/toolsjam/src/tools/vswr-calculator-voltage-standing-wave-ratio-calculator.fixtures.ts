import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Power mode: Pf=100W, Pr=25W → Γ=0.5, VSWR=3.0",
    actions: [
      { kind: "click", label: "Power Measurement" },
      { kind: "fill", label: "Forward Power (W)", value: "100" },
      { kind: "fill", label: "Reflected Power (W)", value: "25" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["VSWR Results", "VSWR"] },
  },
  {
    name: "Impedance mode: ZL=75Ω, Z0=50Ω → Γ=0.2, VSWR=1.5",
    actions: [
      { kind: "click", label: "Impedance Measurement" },
      { kind: "fill", label: "Load Impedance (Ω)", value: "75" },
      { kind: "fill", label: "Characteristic Impedance (Ω)", value: "50" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["VSWR Results", "1.5"] },
  },
];

