import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "100 keV X-ray at 90° — Δλ = 2.426 pm",
    actions: [
      { kind: "fill", label: "Incident Photon Energy", value: "100" },
      { kind: "fill", label: "Scattering Angle (°)", value: "90" },
      { kind: "click", label: "keV" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Wavelength Shift"] },
  },
  {
    name: "662 keV Cs-137 at 180° backscatter",
    actions: [
      { kind: "fill", label: "Incident Photon Energy", value: "662" },
      { kind: "fill", label: "Scattering Angle (°)", value: "180" },
      { kind: "click", label: "keV" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Scattered Photon Energy", "Energy Transferred"] },
  },
  {
    name: "1.17 MeV Co-60 gamma at 90°",
    actions: [
      { kind: "fill", label: "Incident Photon Energy", value: "1.17" },
      { kind: "fill", label: "Scattering Angle (°)", value: "90" },
      { kind: "click", label: "MeV" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Wavelength Shift"] },
  },
];
