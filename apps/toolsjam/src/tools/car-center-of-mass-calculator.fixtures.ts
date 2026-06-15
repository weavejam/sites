import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Family sedan example — total mass 1375 kg",
    actions: [
      { kind: "click", label: "Family Sedan" },
    ],
    expect: { text: ["Results", "Total Mass", "Center of Gravity"] },
  },
  {
    name: "Race car example — total mass 620 kg",
    actions: [
      { kind: "click", label: "Race Car" },
    ],
    expect: { text: ["Results", "Total Mass", "CG X"] },
  },
  {
    name: "Cargo truck example — total mass 3580 kg",
    actions: [
      { kind: "click", label: "Cargo Truck" },
    ],
    expect: { text: ["Results", "Total Mass", "CG Z"] },
  },
];
