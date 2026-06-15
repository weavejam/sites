import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Reach 10,000 | Likes 400 Comments 30 Shares 15 Saves 25 Clicks 80 → 5.5%",
    actions: [
      { kind: "fill", label: "Total Reach", value: "10000" },
      { kind: "fill", label: "Likes / Reactions", value: "400" },
      { kind: "fill", label: "Comments", value: "30" },
      { kind: "fill", label: "Shares / Retweets", value: "15" },
      { kind: "fill", label: "Saves / Bookmarks", value: "25" },
      { kind: "fill", label: "Clicks / Link Clicks", value: "80" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "5.50%"] },
  },
  {
    name: "Reach 50,000 | Likes 2500 Comments 300 Shares 150 Saves 200 Clicks 500 → 7.3%",
    actions: [
      { kind: "fill", label: "Total Reach", value: "50000" },
      { kind: "fill", label: "Likes / Reactions", value: "2500" },
      { kind: "fill", label: "Comments", value: "300" },
      { kind: "fill", label: "Shares / Retweets", value: "150" },
      { kind: "fill", label: "Saves / Bookmarks", value: "200" },
      { kind: "fill", label: "Clicks / Link Clicks", value: "500" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "7.30%"] },
  },
];
