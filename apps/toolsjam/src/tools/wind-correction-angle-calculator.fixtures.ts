import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Pure headwind TC=180 WD=180 WS=20 TAS=120 → WCA=0 GS=100",
    actions: [
      { kind: "fill", label: "True Course (°)", value: "180" },
      { kind: "fill", label: "Wind Direction (°)", value: "180" },
      { kind: "fill", label: "Wind Speed (kts)", value: "20" },
      { kind: "fill", label: "True Airspeed (kts)", value: "120" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Navigation Results", "100"] },
  },
  {
    name: "Crosswind TC=90 WD=0 WS=15 TAS=80 → WCA≈-10.8° GS≈78.6 kts",
    actions: [
      { kind: "fill", label: "True Course (°)", value: "90" },
      { kind: "fill", label: "Wind Direction (°)", value: "0" },
      { kind: "fill", label: "Wind Speed (kts)", value: "15" },
      { kind: "fill", label: "True Airspeed (kts)", value: "80" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Navigation Results", "Wind Correction Angle"] },
  },
];
