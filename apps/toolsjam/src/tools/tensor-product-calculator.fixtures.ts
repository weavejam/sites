import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Tensor product u=[1,2] v=[3,4] matrix format",
    actions: [
      { kind: "fill", label: "First Vector (u)", value: "1, 2" },
      { kind: "fill", label: "Second Vector (v)", value: "3, 4" },
      { kind: "click", label: "Matrix Format" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Tensor Product Result", "2 × 2"] },
  },
  {
    name: "Tensor product u=[1,2,3] v=[4,5] flattened format",
    actions: [
      { kind: "fill", label: "First Vector (u)", value: "1, 2, 3" },
      { kind: "fill", label: "Second Vector (v)", value: "4, 5" },
      { kind: "click", label: "Flattened Vector" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Tensor Product Result", "3 × 2"] },
  },
  {
    name: "Tensor product u=[1,0] v=[0,1] unit vectors",
    actions: [
      { kind: "fill", label: "First Vector (u)", value: "1, 0" },
      { kind: "fill", label: "Second Vector (v)", value: "0, 1" },
      { kind: "click", label: "Matrix Format" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: "Tensor Product Result" },
  },
];
