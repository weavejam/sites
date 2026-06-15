import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "RSA p=61, q=53, e=17 key generation",
    actions: [
      { kind: "fill", label: "Prime p", value: "61" },
      { kind: "fill", label: "Prime q", value: "53" },
      { kind: "fill", label: "Public Exponent e", value: "17" },
      { kind: "click", label: "Generate Keys & Encrypt" },
    ],
    expect: { text: ["RSA Key & Encryption Results", "3233", "2753"] },
  },
  {
    name: "RSA p=61, q=53, e=17, M=65 encrypt and decrypt",
    actions: [
      { kind: "fill", label: "Prime p", value: "61" },
      { kind: "fill", label: "Prime q", value: "53" },
      { kind: "fill", label: "Public Exponent e", value: "17" },
      { kind: "fill", label: "Message (integer to encrypt)", value: "65" },
      { kind: "click", label: "Generate Keys & Encrypt" },
    ],
    expect: { text: ["2790", "65"] },
  },
  {
    name: "RSA p=7, q=11, e=13, M=5",
    actions: [
      { kind: "fill", label: "Prime p", value: "7" },
      { kind: "fill", label: "Prime q", value: "11" },
      { kind: "fill", label: "Public Exponent e", value: "13" },
      { kind: "fill", label: "Message (integer to encrypt)", value: "5" },
      { kind: "click", label: "Generate Keys & Encrypt" },
    ],
    expect: { text: ["77", "37"] },
  },
];
