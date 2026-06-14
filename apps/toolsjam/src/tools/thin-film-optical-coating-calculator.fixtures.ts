import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "AR coating on glass at normal incidence",
    actions: [
      { kind: "fill", label: "Refractive Index (Incident Medium)", value: "1.0" },
      { kind: "fill", label: "Refractive Index (Thin Film)", value: "1.38" },
      { kind: "fill", label: "Refractive Index (Substrate)", value: "1.52" },
      { kind: "fill", label: "Wavelength of Light (nm)", value: "550" },
      { kind: "fill", label: "Film Thickness (nm)", value: "99.64" },
      { kind: "fill", label: "Angle of Incidence (°)", value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Reflectance", "Transmittance"] },
  },
  {
    name: "HR coating ZnS on glass at normal incidence",
    actions: [
      { kind: "fill", label: "Refractive Index (Incident Medium)", value: "1.0" },
      { kind: "fill", label: "Refractive Index (Thin Film)", value: "2.35" },
      { kind: "fill", label: "Refractive Index (Substrate)", value: "1.52" },
      { kind: "fill", label: "Wavelength of Light (nm)", value: "633" },
      { kind: "fill", label: "Film Thickness (nm)", value: "67.34" },
      { kind: "fill", label: "Angle of Incidence (°)", value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "s-Polarization", "p-Polarization", "Average Reflectance"] },
  },
];
