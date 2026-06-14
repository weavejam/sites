import type { ToolEntry } from "@/data/tools";

export const tools: ToolEntry[] = [
  {
    id: "ohms-law-calculator",
    category: "physic",
    slugs: {
      en: "ohms-law-calculator",
      "zh-CN": "ohm-dinglv-jisuanqi",
      "zh-TW": "ohm-dinglv-jisuanqi",
      ja: "ohm-no-hou-sanshiki",
      ko: "ohm-beobgye-sgye",
      es: "calculadora-ley-de-ohm",
      fr: "calculateur-loi-dohm",
      de: "ohmsches-gesetz-rechner",
      pt: "calculadora-lei-de-ohm",
      ru: "kalkulyator-zakona-oma"
    },
    titles: {
      en: "Ohm's Law Calculator for Voltage, Current, Resistance",
      "zh-CN": "欧姆定律计算器：电压、电流、电阻",
      "zh-TW": "歐姆定律計算器：電壓、電流、電阻",
      ja: "オームの法則計算機：電圧・電流・抵抗",
      ko: "옴의 법칙 계산기: 전압, 전류, 저항",
      es: "Calculadora de Ohm: voltaje, corriente, resistencia",
      fr: "Calculateur de la loi d’Ohm : tension, courant, résistance",
      de: "Ohmsches-Gesetz-Rechner: Spannung, Strom, Widerstand",
      pt: "Calculadora da lei de Ohm: tensão, corrente, resistência",
      ru: "Калькулятор закона Ома: напряжение, ток, сопротивление"
    },
    descriptions: {
      en: "Ohm's Law calculator: enter any two of voltage, current, resistance, or power to instantly solve the rest using V=IR and P=VI for circuit design.",
      "zh-CN": "欧姆定律计算器：输入电压、电流、电阻或功率中的任意两项，即可用 V=IR 和 P=VI 立即算出其余结果。",
      "zh-TW": "歐姆定律計算器：輸入電壓、電流、電阻或功率中的任兩項，即可用 V=IR 與 P=VI 立即算出其餘結果。",
      ja: "オームの法則計算機：電圧・電流・抵抗・電力のうち2つを入力すると、V=IR と P=VI で残りをすぐ計算します。",
      ko: "옴의 법칙 계산기: 전압, 전류, 저항, 전력 중 두 가지만 입력하면 V=IR과 P=VI로 나머지를 바로 계산합니다.",
      es: "Calculadora de la ley de Ohm: ingresa dos valores de voltaje, corriente, resistencia o potencia y resuelve el resto con V=IR y P=VI.",
      fr: "Calculateur de la loi d’Ohm : saisissez deux valeurs parmi tension, courant, résistance ou puissance pour résoudre le reste avec V=IR et P=VI.",
      de: "Ohmsches-Gesetz-Rechner: Gib zwei Werte aus Spannung, Strom, Widerstand oder Leistung ein und berechne den Rest mit V=IR und P=VI.",
      pt: "Calculadora da lei de Ohm: informe dois valores de tensão, corrente, resistência ou potência e resolva o restante com V=IR e P=VI.",
      ru: "Калькулятор закона Ома: введите любые два значения из напряжения, тока, сопротивления или мощности и сразу вычислите остальное по V=IR и P=VI."
    }
  }
];
