import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Single throw from origin, angle 45°, distance 150",
    actions: [
      { kind: "fill", label: "Current X Coordinate", value: "0" },
      { kind: "fill", label: "Current Z Coordinate", value: "0" },
      { kind: "fill", label: "Eye of Ender Throw Angle (°)", value: "45" },
      { kind: "fill", label: "Eye of Ender Travel Distance (blocks)", value: "150" },
      { kind: "click", label: "Find Portal" },
    ],
    expect: { text: ["Estimated Stronghold Location", "Portal X", "Portal Z", "Single-throw estimate"] },
  },
  {
    name: "Two throws: position (100, 100), angle 30° and 60°",
    actions: [
      { kind: "fill", label: "Current X Coordinate", value: "100" },
      { kind: "fill", label: "Current Z Coordinate", value: "100" },
      { kind: "fill", label: "Eye of Ender Throw Angle (°)", value: "30" },
      { kind: "fill", label: "Eye of Ender Travel Distance (blocks)", value: "200" },
      { kind: "fill", label: "Second Throw Angle (°, optional)", value: "60" },
      { kind: "fill", label: "Second Throw Distance (blocks, optional)", value: "180" },
      { kind: "click", label: "Find Portal" },
    ],
    expect: { text: ["Second throw estimate", "Portal X", "Portal Z"] },
  },
  {
    name: "Distant portal from position (500, -300), angle 135°",
    actions: [
      { kind: "fill", label: "Current X Coordinate", value: "500" },
      { kind: "fill", label: "Current Z Coordinate", value: "-300" },
      { kind: "fill", label: "Eye of Ender Throw Angle (°)", value: "135" },
      { kind: "fill", label: "Eye of Ender Travel Distance (blocks)", value: "400" },
      { kind: "click", label: "Find Portal" },
    ],
    expect: { text: ["Estimated Stronghold Location", "Single-throw estimate"] },
  },
];
