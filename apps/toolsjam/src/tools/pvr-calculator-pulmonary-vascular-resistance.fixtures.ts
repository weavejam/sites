import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal PVR — mPAP 15, PCWP 8, CO 5",
    actions: [
      { kind: "fill", label: "Mean Pulmonary Artery Pressure (mPAP)", value: "15" },
      { kind: "fill", label: "Pulmonary Capillary Wedge Pressure (PCWP)", value: "8" },
      { kind: "fill", label: "Cardiac Output (CO)", value: "5" },
      { kind: "click", label: "Calculate PVR" },
    ],
    expect: { text: ["1.40", "112"] },
  },
  {
    name: "Severe PVR — mPAP 60, PCWP 15, CO 2.5",
    actions: [
      { kind: "fill", label: "Mean Pulmonary Artery Pressure (mPAP)", value: "60" },
      { kind: "fill", label: "Pulmonary Capillary Wedge Pressure (PCWP)", value: "15" },
      { kind: "fill", label: "Cardiac Output (CO)", value: "2.5" },
      { kind: "click", label: "Calculate PVR" },
    ],
    expect: { text: ["18.00", "1440"] },
  },
];
