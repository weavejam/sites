import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "RAID 5, 4 × 2000 GB → 6 TB usable",
    actions: [
      { kind: "click", label: "RAID 5 — Distributed Parity" },
      { kind: "fill", label: "Number of Disks", value: "4" },
      { kind: "fill", label: "Disk Size (GB)", value: "2000" },
      { kind: "fill", label: "Disk Speed (RPM)", value: "7200" },
      { kind: "fill", label: "Interface Speed (Gbps)", value: "6" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["RAID Configuration Results", "6.00 TB"] },
  },
  {
    name: "RAID 1, 2 × 2000 GB → 2 TB usable",
    actions: [
      { kind: "click", label: "RAID 1 — Mirroring" },
      { kind: "fill", label: "Number of Disks", value: "2" },
      { kind: "fill", label: "Disk Size (GB)", value: "2000" },
      { kind: "fill", label: "Disk Speed (RPM)", value: "7200" },
      { kind: "fill", label: "Interface Speed (Gbps)", value: "6" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["RAID Configuration Results", "2.00 TB"] },
  },
  {
    name: "RAID 10, 6 × 4000 GB → 12 TB usable",
    actions: [
      { kind: "click", label: "RAID 10 — Mirror + Stripe" },
      { kind: "fill", label: "Number of Disks", value: "6" },
      { kind: "fill", label: "Disk Size (GB)", value: "4000" },
      { kind: "fill", label: "Disk Speed (RPM)", value: "10000" },
      { kind: "fill", label: "Interface Speed (Gbps)", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["RAID Configuration Results", "12.00 TB"] },
  },
];
