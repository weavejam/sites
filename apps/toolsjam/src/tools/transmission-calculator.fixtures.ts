import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "WiFi router 2.4GHz at 10m",
    actions: [
      { kind: "fill", label: "Transmission Power (W)", value: "0.1" },
      { kind: "fill", label: "Distance (m)", value: "10" },
      { kind: "fill", label: "Frequency (Hz)", value: "2400000000" },
      { kind: "fill", label: "Bandwidth (Hz)", value: "20000000" },
      { kind: "fill", label: "Data Rate (bps)", value: "54000000" },
      { kind: "fill", label: "Antenna Gain (dB)", value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Transmission Results", "dB", "dBm"] },
  },
  {
    name: "Cellular tower 900MHz at 1km",
    actions: [
      { kind: "fill", label: "Transmission Power (W)", value: "50" },
      { kind: "fill", label: "Distance (m)", value: "1000" },
      { kind: "fill", label: "Frequency (Hz)", value: "900000000" },
      { kind: "fill", label: "Bandwidth (Hz)", value: "5000000" },
      { kind: "fill", label: "Data Rate (bps)", value: "10000000" },
      { kind: "fill", label: "Antenna Gain (dB)", value: "15" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Transmission Results", "dB", "Mbit/s"] },
  },
];
