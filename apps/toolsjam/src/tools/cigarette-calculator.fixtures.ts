import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Light smoker: 5/day, $8.50/pack, 2 years → annual $92.68",
    actions: [
      { kind: "fill", label: "Cigarettes per Day", value: "5" },
      { kind: "fill", label: "Price per Pack ($)", value: "8.50" },
      { kind: "fill", label: "Cigarettes per Pack", value: "20" },
      { kind: "fill", label: "Years Smoking", value: "2" },
      { kind: "fill", label: "Nicotine per Cigarette (mg)", value: "10" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Smoking Cost & Health Impact", "Daily Cost", "Annual Cost"] },
  },
  {
    name: "Moderate smoker: 20/day, $9.00/pack, 10 years",
    actions: [
      { kind: "fill", label: "Cigarettes per Day", value: "20" },
      { kind: "fill", label: "Price per Pack ($)", value: "9.00" },
      { kind: "fill", label: "Cigarettes per Pack", value: "20" },
      { kind: "fill", label: "Years Smoking", value: "10" },
      { kind: "fill", label: "Nicotine per Cigarette (mg)", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Smoking Cost & Health Impact", "Pack-Years", "10.00"] },
  },
  {
    name: "Heavy smoker: 30/day, $10.00/pack, 15 years",
    actions: [
      { kind: "fill", label: "Cigarettes per Day", value: "30" },
      { kind: "fill", label: "Price per Pack ($)", value: "10.00" },
      { kind: "fill", label: "Cigarettes per Pack", value: "20" },
      { kind: "fill", label: "Years Smoking", value: "15" },
      { kind: "fill", label: "Nicotine per Cigarette (mg)", value: "15" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Smoking Cost & Health Impact", "22.50"] },
  },
];
