import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Basic qualifying bet: £100 @ 2.00, lay 2.10, 5% commission",
    actions: [
      { kind: "fill", label: "Back Stake (£)", value: "100" },
      { kind: "fill", label: "Back Odds", value: "2.00" },
      { kind: "fill", label: "Lay Odds", value: "2.10" },
      { kind: "fill", label: "Exchange Commission (%)", value: "5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Optimal Lay Stake", "£97.56"] },
  },
  {
    name: "Qualifying + bonus: £100 @ 1.80, lay 1.85, 3%, £50 bonus @ 1.50",
    actions: [
      { kind: "fill", label: "Back Stake (£)", value: "100" },
      { kind: "fill", label: "Back Odds", value: "1.80" },
      { kind: "fill", label: "Lay Odds", value: "1.85" },
      { kind: "fill", label: "Exchange Commission (%)", value: "3" },
      { kind: "fill", label: "Bonus Amount (£, optional)", value: "50" },
      { kind: "fill", label: "Bonus Bet Odds (optional)", value: "1.50" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Bonus Lay Stake", "Bonus Profit", "Total Expected Profit"] },
  },
  {
    name: "Low commission exchange: £200 @ 1.90, lay 1.95, 2%",
    actions: [
      { kind: "fill", label: "Back Stake (£)", value: "200" },
      { kind: "fill", label: "Back Odds", value: "1.90" },
      { kind: "fill", label: "Lay Odds", value: "1.95" },
      { kind: "fill", label: "Exchange Commission (%)", value: "2" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "Optimal Lay Stake", "Qualifying Profit / Loss"] },
  },
];
