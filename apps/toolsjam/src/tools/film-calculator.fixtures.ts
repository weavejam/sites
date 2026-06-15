import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Feature film 35mm 90min → ~8100 ft, 9 reels",
    actions: [
      { kind: "click", label: "35mm" },
      { kind: "fill", label: "Film Speed (fps)", value: "24" },
      { kind: "fill", label: "Shooting Duration (minutes)", value: "90" },
      { kind: "fill", label: "Film Reel Length (feet)", value: "1000" },
      { kind: "fill", label: "Reel Cost ($)", value: "150" },
      { kind: "fill", label: "Processing Cost per Foot ($)", value: "0.25" },
      { kind: "click", label: "Calculate Film" },
    ],
    expect: { text: ["Results", "9 reels"] },
  },
  {
    name: "Short film 16mm 15min → ~540 ft, 2 reels",
    actions: [
      { kind: "click", label: "16mm" },
      { kind: "fill", label: "Film Speed (fps)", value: "24" },
      { kind: "fill", label: "Shooting Duration (minutes)", value: "15" },
      { kind: "fill", label: "Film Reel Length (feet)", value: "400" },
      { kind: "fill", label: "Reel Cost ($)", value: "80" },
      { kind: "fill", label: "Processing Cost per Foot ($)", value: "0.15" },
      { kind: "click", label: "Calculate Film" },
    ],
    expect: { text: ["Results", "2 reels"] },
  },
];
