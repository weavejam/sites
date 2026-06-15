import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "DDR4-3200 CL16 → 10 ns",
    actions: [
      { kind: "fill", label: "CAS Latency (CL)", value: "16" },
      { kind: "fill", label: "Memory Frequency (MHz)", value: "3200" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["10", "CAS Latency (ns)"] },
  },
  {
    name: "DDR4-3600 CL16 with tRCD/tRP",
    actions: [
      { kind: "fill", label: "CAS Latency (CL)", value: "16" },
      { kind: "fill", label: "Memory Frequency (MHz)", value: "3600" },
      { kind: "fill", label: "RAS to CAS Delay (tRCD)", value: "16" },
      { kind: "fill", label: "RAS Precharge Time (tRP)", value: "16" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["8.89", "Total Access Latency (ns)"] },
  },
];
