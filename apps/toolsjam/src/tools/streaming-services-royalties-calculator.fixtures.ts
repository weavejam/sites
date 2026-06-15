import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Spotify 500k streams independent artist",
    actions: [
      { kind: "fill", label: "Total Streams", value: "500000" },
      { kind: "fill", label: "Per-Stream Rate ($)", value: "0.004" },
      { kind: "fill", label: "Platform Fee (%)", value: "30" },
      { kind: "fill", label: "Artist Royalty Rate (%)", value: "70" },
      { kind: "fill", label: "Additional Fees ($)", value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Royalty Results", "Gross Earnings", "Artist Royalties"] },
  },
  {
    name: "Apple Music 300k streams with 85% royalty rate",
    actions: [
      { kind: "fill", label: "Total Streams", value: "300000" },
      { kind: "fill", label: "Per-Stream Rate ($)", value: "0.007" },
      { kind: "fill", label: "Platform Fee (%)", value: "30" },
      { kind: "fill", label: "Artist Royalty Rate (%)", value: "85" },
      { kind: "fill", label: "Additional Fees ($)", value: "0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Royalty Results", "Net Earnings", "Effective Rate per Stream"] },
  },
];
