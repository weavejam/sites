import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Nature 2023: 45000 citations, 800+750 articles → IF 29.03",
    actions: [
      { kind: "fill", label: "Citations in Target Year", value: "45000" },
      { kind: "fill", label: "Publications in Year N-1", value: "800" },
      { kind: "fill", label: "Publications in Year N-2", value: "750" },
      { kind: "click", label: "Calculate Impact Factor" },
    ],
    expect: { text: ["Impact Factor", "29.03"] },
  },
  {
    name: "Applied Physics: 8500 citations, 1200+1150 articles → IF 3.62",
    actions: [
      { kind: "fill", label: "Citations in Target Year", value: "8500" },
      { kind: "fill", label: "Publications in Year N-1", value: "1200" },
      { kind: "fill", label: "Publications in Year N-2", value: "1150" },
      { kind: "click", label: "Calculate Impact Factor" },
    ],
    expect: { text: ["Impact Factor", "3.62"] },
  },
];
