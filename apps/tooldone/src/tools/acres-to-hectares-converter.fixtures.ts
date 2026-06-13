import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "1 acre → 0.404686 hectares",
    actions: [
      { kind: "click", label: /^Acres → Hectares$/i },
      { kind: "fill", label: "Area in acres", value: "1" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Result", /1 acres = 0\.404686/] },
  },
  {
    name: "10 acres → ~4.046856 hectares",
    actions: [
      { kind: "click", label: /^Acres → Hectares$/i },
      { kind: "fill", label: "Area in acres", value: "10" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: /10 acres = 4\.046856/ },
  },
  {
    name: "1 hectare → ~2.471054 acres",
    actions: [
      { kind: "click", label: /^Hectares → Acres$/i },
      { kind: "fill", label: "Area in hectares", value: "1" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: /1 hectares = 2\.471054/ },
  },
];
