import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Electron Compton wavelength ≈ 2.4263 pm",
    actions: [
      { kind: "click", label: "Electron" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Compton Wavelength"] },
  },
  {
    name: "Proton Compton wavelength ≈ 1.3214 fm",
    actions: [
      { kind: "click", label: "Proton" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Compton Wavelength", "Reduced Compton Wavelength"] },
  },
  {
    name: "Custom mass 1.67e-27 kg",
    actions: [
      { kind: "click", label: "Custom Mass" },
      { kind: "fill", label: "Custom Mass (kg)", value: "1.67e-27" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "Compton Wavelength"] },
  },
];
