import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: ".308 Win 150 gr @ 2820 fps → ~2648 ft-lb",
    actions: [
      { kind: "fill", label: "Bullet Weight (grains)", value: "150" },
      { kind: "fill", label: "Bullet Velocity (fps)", value: "2820" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "2,648"] },
  },
  {
    name: "9mm 115 gr @ 1180 fps → ~356 ft-lb",
    actions: [
      { kind: "fill", label: "Bullet Weight (grains)", value: "115" },
      { kind: "fill", label: "Bullet Velocity (fps)", value: "1180" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "355.49"] },
  },
  {
    name: ".22 LR 40 gr @ 1200 fps → ~127.88 ft-lb",
    actions: [
      { kind: "fill", label: "Bullet Weight (grains)", value: "40" },
      { kind: "fill", label: "Bullet Velocity (fps)", value: "1200" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Results", "127.88"] },
  },
];
