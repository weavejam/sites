import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Apple glycemic load",
    actions: [
      { kind: "fill", label: "Food Name", value: "Apple" },
      { kind: "fill", label: "Glycemic Index", value: "38" },
      { kind: "fill", label: "Carbohydrate Content (g per serving)", value: "15" },
      { kind: "fill", label: "Serving Size (Optional)", value: "1 medium apple" },
      { kind: "click", label: "Calculate Glycemic Load" },
    ],
    expect: { text: ["Glycemic Load Results", "Minimal impact"] },
  },
  {
    name: "Potato high glycemic load",
    actions: [
      { kind: "fill", label: "Food Name", value: "Baked potato" },
      { kind: "fill", label: "Glycemic Index", value: "85" },
      { kind: "fill", label: "Carbohydrate Content (g per serving)", value: "30" },
      { kind: "fill", label: "Serving Size (Optional)", value: "1 medium potato" },
      { kind: "click", label: "Calculate Glycemic Load" },
    ],
    expect: { text: ["Glycemic Load Results", "High glycemic load (20 or more)"] },
  },
];
