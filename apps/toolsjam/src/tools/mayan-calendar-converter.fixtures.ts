import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "December 21 2012 → 13.0.0.0.0",
    actions: [
      { kind: "click", label: "Gregorian → Mayan" },
      { kind: "fill", label: "Gregorian Date", value: "2012-12-21" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["13.0.0.0.0", "4 Ahau", "3 Kankin"] },
  },
  {
    name: "January 1 2000 CE → Long Count",
    actions: [
      { kind: "click", label: "Gregorian → Mayan" },
      { kind: "fill", label: "Gregorian Date", value: "2000-01-01" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["Conversion Result", "Long Count"] },
  },
  {
    name: "Mayan 13.0.0.0.0 → Gregorian 2012-12-21",
    actions: [
      { kind: "click", label: "Mayan → Gregorian" },
      { kind: "fill", label: "Baktun", value: "13" },
      { kind: "fill", label: "Katun", value: "0" },
      { kind: "fill", label: "Tun", value: "0" },
      { kind: "fill", label: "Uinal", value: "0" },
      { kind: "fill", label: "Kin", value: "0" },
      { kind: "click", label: "Convert" },
    ],
    expect: { text: ["2012-12-21", "4 Ahau"] },
  },
];
