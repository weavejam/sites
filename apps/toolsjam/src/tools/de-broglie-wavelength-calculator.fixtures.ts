import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Electron in hydrogen atom ground state",
    actions: [
      { kind: "click", label: "Mass + Velocity" },
      { kind: "fill", label: "Mass (kg)", value: "9.1094e-31" },
      { kind: "fill", label: "Velocity (m/s)", value: "2.2e6" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Wavelength (m)"] },
  },
  {
    name: "Proton from kinetic energy",
    actions: [
      { kind: "click", label: "Mass + Kinetic Energy" },
      { kind: "fill", label: "Mass (kg)", value: "1.6726e-27" },
      { kind: "fill", label: "Kinetic Energy (J)", value: "1.6e-12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Wavelength (m)", "Momentum"] },
  },
];
