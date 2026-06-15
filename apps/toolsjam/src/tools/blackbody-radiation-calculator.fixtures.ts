import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Sun's surface blackbody radiation",
    actions: [
      { kind: "fill", label: "Temperature (K)", value: "5778" },
      { kind: "fill", label: "Surface Area (m²)", value: "1" },
      { kind: "fill", label: "Wavelength λ (nm)", value: "500" },
      { kind: "fill", label: "Emissivity ε (0–1)", value: "1" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Blackbody Radiation Results", "Peak Wavelength (Wien's Law)", "Total Emitted Power"] },
  },
  {
    name: "Earth surface thermal emission",
    actions: [
      { kind: "fill", label: "Temperature (K)", value: "288" },
      { kind: "fill", label: "Surface Area (m²)", value: "1" },
      { kind: "fill", label: "Wavelength λ (nm)", value: "10000" },
      { kind: "fill", label: "Emissivity ε (0–1)", value: "0.98" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Blackbody Radiation Results", "Spectral Radiance at λ", "Radiant Exitance"] },
  },
];
