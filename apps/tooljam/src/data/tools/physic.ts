import type { ToolEntry } from "@/data/tools";

export const tools: ToolEntry[] = [
  {
    id: "ohms-law-calculator",
    category: "physic",
    slugs: {
      en: "ohms-law-calculator",
      "zh-CN": "oumu-dinglv-jisuanqi",
      "zh-TW": "oumu-dinglv-jisuanqi",
      ja: "oomu-no-housoku-keisanki",
      ko: "omui-beopgye-san-gi",
      es: "calculadora-ley-ohm",
      fr: "calculateur-loi-ohm",
      de: "ohmsches-gesetz-rechner",
      pt: "calculadora-lei-de-ohm",
      ru: "kalkulyator-zakona-oma"
    },
    titles: {
      en: "Ohm's Law Calculator for Voltage, Current, Resistance",
      "zh-CN": "欧姆定律计算器：电压、电流、电阻",
      "zh-TW": "歐姆定律計算器：電壓、電流、電阻",
      ja: "オームの法則計算機：電圧・電流・抵抗",
      ko: "옴의 법칙 계산기: 전압·전류·저항",
      es: "Calculadora de la Ley de Ohm: voltaje, corriente y resistencia",
      fr: "Calculateur de loi d’Ohm : tension, courant, résistance",
      de: "Ohmsches-Gesetz-Rechner: Spannung, Strom, Widerstand",
      pt: "Calculadora da Lei de Ohm: tensão, corrente e resistência",
      ru: "Калькулятор закона Ома: напряжение, ток, сопротивление"
    },
    descriptions: {
      en: "Ohm's Law calculator: enter any two of voltage, current, resistance, or power to instantly solve the rest using V=IR and P=VI for circuit design.",
      "zh-CN": "欧姆定律计算器：输入电压、电流、电阻或功率中的任意两个，即可用 V=IR 和 P=VI 立即求出其余值。",
      "zh-TW": "歐姆定律計算器：輸入電壓、電流、電阻或功率中的任兩項，即可用 V=IR 和 P=VI 立即求出其餘值。",
      ja: "オームの法則計算機：電圧・電流・抵抗・電力のうち2つを入力すると、V=IR と P=VI で残りをすぐ求めます。",
      ko: "옴의 법칙 계산기: 전압, 전류, 저항, 전력 중 두 개를 입력하면 V=IR과 P=VI로 나머지를 바로 계산합니다.",
      es: "Calculadora de la Ley de Ohm: ingresa dos valores entre voltaje, corriente, resistencia o potencia y obtiene el resto al instante con V=IR y P=VI.",
      fr: "Calculateur de loi d’Ohm : saisissez deux valeurs parmi tension, courant, résistance ou puissance pour obtenir instantanément le reste avec V=IR et P=VI.",
      de: "Ohmsches-Gesetz-Rechner: Geben Sie zwei Werte aus Spannung, Strom, Widerstand oder Leistung ein und berechnen Sie den Rest sofort mit V=IR und P=VI.",
      pt: "Calculadora da Lei de Ohm: informe dois valores entre tensão, corrente, resistência ou potência e obtenha o resto na hora com V=IR e P=VI.",
      ru: "Калькулятор закона Ома: введите любые два значения из напряжения, тока, сопротивления или мощности и сразу получите остальные по V=IR и P=VI."
    }
  }
];
