import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Wi-Fi AP: 0.1W, 3dB loss, 3dBi gain → 20 dBm",
    actions: [
      { kind: "fill", label: "Transmitter Power", value: "0.1" },
      { kind: "fill", label: "Cable & Connector Loss (dB)", value: "3" },
      { kind: "fill", label: "Antenna Gain (dBi)", value: "3" },
      { kind: "click", label: "Calculate EIRP" },
    ],
    expect: { text: ["EIRP Result"] },
  },
  {
    name: "FM transmitter: 1000W, 2dB loss, 6dBi gain",
    actions: [
      { kind: "fill", label: "Transmitter Power", value: "1000" },
      { kind: "fill", label: "Cable & Connector Loss (dB)", value: "2" },
      { kind: "fill", label: "Antenna Gain (dBi)", value: "6" },
      { kind: "click", label: "Calculate EIRP" },
    ],
    expect: { text: ["EIRP Result"] },
  },
];
