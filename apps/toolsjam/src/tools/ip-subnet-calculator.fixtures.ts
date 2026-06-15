import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "192.168.1.100 /24 → network 192.168.1.0, 254 usable",
    actions: [
      { kind: "fill", label: "IP Address", value: "192.168.1.100" },
      { kind: "fill", label: "Subnet Mask", value: "255.255.255.0" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Network Details", "192.168.1.0", "192.168.1.255", "254"] },
  },
  {
    name: "10.0.0.5 /30 → network 10.0.0.4, 2 usable",
    actions: [
      { kind: "fill", label: "IP Address", value: "10.0.0.5" },
      { kind: "fill", label: "CIDR Prefix (Optional)", value: "30" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Network Details", "10.0.0.4", "10.0.0.7", "/30"] },
  },
];
