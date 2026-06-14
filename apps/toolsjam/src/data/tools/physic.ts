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
  },
  {
    id: "wheatstone-bridge-calculator",
    category: "physic",
    slugs: {
      en: "wheatstone-bridge-calculator",
      "zh-CN": "huisitong-dianqiao-dianzu-jisuanqi",
      "zh-TW": "hu-si-tong-dian-qiao-dian-zu-ji-suan-qi",
      ja: "uisuton-burijji-fumei-teikou-keisanki",
      ko: "witeuseuteon-beuriji-mi-sang-jeohang-gyesan-gi",
      es: "calculadora-puente-wheatstone-resistencia",
      fr: "calculateur-pont-wheatstone-resistance",
      de: "wheatstone-brucke-widerstandsrechner",
      pt: "calculadora-ponte-wheatstone-resistencia",
      ru: "most-vitstona-kalkulyator-soprotivleniya"
    },
    titles: {
      en: "Wheatstone Bridge Calculator – Measure Unknown Resistance",
      "zh-CN": "惠斯通电桥电阻计算器",
      "zh-TW": "惠斯通電橋電阻計算器",
      ja: "ウィートストンブリッジ抵抗計算器",
      ko: "위트스톤 브리지 저항 계산기",
      es: "Calculadora de puente de Wheatstone",
      fr: "Calculateur de pont de Wheatstone",
      de: "Wheatstone-Brücke Widerstandsrechner",
      pt: "Calculadora de ponte de Wheatstone",
      ru: "Калькулятор моста Уитстона"
    },
    descriptions: {
      en: "Calculate unknown resistance using the Wheatstone bridge circuit. Enter R1, R2, R3, voltage ratio, and supply voltage for precise resistance measurement.",
      "zh-CN": "使用惠斯通电桥电路计算未知电阻。输入 R1、R2、R3、电压比和电源电压，精准求出电阻。",
      "zh-TW": "使用惠斯通電橋電路計算未知電阻。輸入 R1、R2、R3、電壓比與電源電壓，精準求出電阻。",
      ja: "ウィートストンブリッジ回路で未知抵抗を計算します。R1、R2、R3、電圧比、電源電圧を入力して高精度に求めます。",
      ko: "위트스톤 브리지 회로로 미지 저항을 계산합니다. R1, R2, R3, 전압비, 공급 전압을 입력해 정밀하게 구하세요.",
      es: "Calcula resistencia desconocida con el circuito de puente de Wheatstone. Ingresa R1, R2, R3, la razón de voltaje y la fuente.",
      fr: "Calculez une résistance inconnue avec le pont de Wheatstone. Saisissez R1, R2, R3, le rapport de tension et l’alimentation.",
      de: "Berechnen Sie einen unbekannten Widerstand mit der Wheatstone-Brücke. R1, R2, R3, Spannungsverhältnis und Versorgung eingeben.",
      pt: "Calcule resistência desconhecida com a ponte de Wheatstone. Informe R1, R2, R3, a razão de tensão e a alimentação.",
      ru: "Рассчитайте неизвестное сопротивление с мостом Уитстона. Введите R1, R2, R3, отношение напряжения и питание."
    }
  },
  {
    id: "wiens-law-calculator",
    category: "physic",
    slugs: {
      en: "wiens-law-calculator",
      "zh-CN": "weiensi-dinglv-bochang-jisuanqi",
      "zh-TW": "weiensi-dingli-bochang-jisuanqi",
      ja: "wain-hou-soku-keisan-ki",
      ko: "bien-beomnyul-paejang-gyesan-gi",
      es: "calculadora-ley-wien-longitud-onda",
      fr: "calculateur-loi-de-wien-longueur-donde",
      de: "wiensches-gesetz-wellenlaengen-rechner",
      pt: "calculadora-lei-de-wien-comprimento-de-onda",
      ru: "kalkulyator-zakona-viina-dlina-volny"
    },
    titles: {
      en: "Wien's Law Calculator – Peak Wavelength from Temperature",
      "zh-CN": "维恩定律波长计算器",
      "zh-TW": "維恩定律波長計算器",
      ja: "ウィーンの法則波長計算機",
      ko: "비엔 법칙 파장 계산기",
      es: "Calculadora de la ley de Wien",
      fr: "Calculateur de la loi de Wien",
      de: "Wiensches Gesetz Wellenlängenrechner",
      pt: "Calculadora da lei de Wien",
      ru: "Калькулятор закона Вина"
    },
    descriptions: {
      en: "Calculate the peak wavelength of blackbody radiation from temperature using Wien's displacement law. Perfect for physics, astronomy, and thermal analysis.",
      "zh-CN": "根据温度用维恩位移定律计算黑体辐射峰值波长，适用于物理、天文与热分析。",
      "zh-TW": "根據溫度用維恩位移定律計算黑體輻射峰值波長，適用於物理、天文與熱分析。",
      ja: "温度からウィーンの変位則で黒体放射のピーク波長を計算。物理・天文学・熱解析に最適です。",
      ko: "온도로부터 비엔 변위 법칙을 이용해 흑체 복사의 최대 파장을 계산합니다. 물리, 천문학, 열 분석에 적합합니다.",
      es: "Calcula la longitud de onda máxima de un cuerpo negro a partir de la temperatura con la ley de desplazamiento de Wien.",
      fr: "Calculez la longueur d’onde de pointe d’un corps noir à partir de la température avec la loi de déplacement de Wien.",
      de: "Berechnen Sie die Peak-Wellenlänge eines Schwarzkörpers aus der Temperatur mit dem Wienschen Verschiebungsgesetz.",
      pt: "Calcule o comprimento de onda de pico de um corpo negro pela temperatura usando a lei de deslocamento de Wien.",
      ru: "Рассчитайте пиковую длину волны абсолютно чёрного тела по температуре с помощью закона смещения Вина."
    }
  },
  {
    id: "wind-correction-angle-calculator",
    category: "physic",
    slugs: {
      en: "wind-correction-angle-calculator",
      "zh-CN": "feng-xiu-zheng-jiao-ji-suan-qi",
      "zh-TW": "feng-xiu-zheng-jiao-ji-suan-qi",
      ja: "kaze-hosei-kaku-keisan-ki",
      ko: "pung-bojeonggak-gyesangi",
      es: "calculadora-angulo-correccion-viento",
      fr: "calculateur-angle-correction-vent",
      de: "windkorrekturwinkel-rechner",
      pt: "calculadora-angulo-correcao-vento",
      ru: "kalkulyator-ugla-popravki-na-veter"
    },
    titles: {
      en: "Wind Correction Angle Calculator – Aviation Navigation",
      "zh-CN": "风修正角计算器",
      "zh-TW": "風修正角計算器",
      ja: "風補正角計算機",
      ko: "풍 보정각 계산기",
      es: "Calculadora de ángulo de corrección del viento",
      fr: "Calculateur d'angle de correction du vent",
      de: "Windkorrekturwinkel-Rechner",
      pt: "Calculadora de Ângulo de Correção do Vento",
      ru: "Калькулятор угла поправки на ветер"
    },
    descriptions: {
      en: "Calculate wind correction angle, true heading, and ground speed. Essential aviation tool for pilots to compensate for wind drift accurately.",
      "zh-CN": "计算风修正角、真航向和地速，帮助飞行员准确修正风偏。",
      "zh-TW": "計算風修正角、真航向與地速，幫助飛行員準確修正風偏。",
      ja: "風補正角、真方位、対地速度を計算し、風偏流を正確に補正します。",
      ko: "풍 보정각, 진방위, 지상속도를 계산해 바람 편류를 정확히 보정합니다.",
      es: "Calcula el ángulo de corrección del viento, el rumbo verdadero y la velocidad sobre el suelo.",
      fr: "Calculez l'angle de correction du vent, le cap vrai et la vitesse-sol.",
      de: "Berechnen Sie Windkorrekturwinkel, wahre Peilung und Bodengeschwindigkeit.",
      pt: "Calcule o ângulo de correção do vento, o rumo verdadeiro e a velocidade sobre o solo.",
      ru: "Рассчитайте угол поправки на ветер, истинный курс и путевую скорость."
    }
  },
  {
    id: "wind-load-calculator",
    category: "physic",
    slugs: {
      en: "wind-load-calculator",
      "zh-CN": "feng-zai-he-jisuanqi",
      "zh-TW": "feng-zai-he-jisuanqi",
      ja: "fuuatsu-keisan-ki",
      ko: "punghajung-gyeonsangi",
      es: "calculadora-carga-viento",
      fr: "calculateur-charge-vent",
      de: "windlast-rechner",
      pt: "calculadora-carga-vento",
      ru: "raschet-vetrovoy-nagruzki"
    },
    titles: {
      en: "Wind Load Calculator – Wind Pressure and Force on Structures",
      "zh-CN": "风荷载计算器：结构风压与风力",
      "zh-TW": "風荷載計算器：結構風壓與風力",
      ja: "風荷重計算機：構造物の風圧と風力",
      ko: "풍하중 계산기: 구조물 풍압과 풍력",
      es: "Calculadora de carga de viento y presión",
      fr: "Calculateur de charge de vent et pression",
      de: "Windlast-Rechner: Druck und Kraft",
      pt: "Calculadora de carga de vento e pressão",
      ru: "Калькулятор ветровой нагрузки и давления"
    },
    descriptions: {
      en: "Calculate wind load, dynamic pressure, and wind force on structures. Essential tool for structural engineers using wind speed, dimensions, and exposure factors.",
      "zh-CN": "计算结构风荷载、动压和风力，适用于使用风速、尺寸和暴露系数进行设计的结构工程师。",
      "zh-TW": "計算結構風荷載、動壓與風力，適用於使用風速、尺寸與暴露係數進行設計的結構工程師。",
      ja: "風速、寸法、暴露区分、抗力係数から、風荷重・動圧・風力を計算します。",
      ko: "풍속, 치수, 노출 범주, 항력계수로 풍하중, 동압, 풍력을 계산합니다.",
      es: "Calcula la carga de viento, la presión dinámica y la fuerza sobre estructuras usando velocidad, dimensiones y exposición.",
      fr: "Calculez la charge de vent, la pression dynamique et la force sur les structures à partir de la vitesse, des dimensions et de l'exposition.",
      de: "Berechnen Sie Windlast, dynamischen Druck und Windkraft auf Bauwerke anhand von Windgeschwindigkeit, Abmessungen und Exposition.",
      pt: "Calcule a carga de vento, a pressão dinâmica e a força em estruturas usando velocidade, dimensões e exposição.",
      ru: "Рассчитайте ветровую нагрузку, динамическое давление и силу на конструкции по скорости ветра, размерам и экспозиции."
    }
  },
  {
    id: "wing-loading-calculator",
    category: "physic",
    slugs: {
      en: "wing-loading-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Wing Loading Calculator – Stall Speed and Performance",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate aircraft wing loading and stall speed from weight and wing area. Supports metric and imperial units for aircraft, gliders, and RC models.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "water-viscosity-calculator",
    category: "physic",
    slugs: {
      en: "water-viscosity-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Water Viscosity Calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate water dynamic viscosity, kinematic viscosity, density, and Reynolds number from temperature, pressure, flow velocity, and pipe size fast.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "watt-calculator",
    category: "physic",
    slugs: {
      en: "watt-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Watt Calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate volts, amps, ohms, watts, and optional watt-hours by entering any two electrical values, then solve the rest for quick circuit checks.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "watt-converter",
    category: "physic",
    slugs: {
      en: "watt-converter",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Watt Converter",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Convert watts, kilowatts, megawatts, horsepower, BTU per hour, calories per second, and more with accurate power-unit factors.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "watt-hour-calculator",
    category: "physic",
    slugs: {
      en: "watt-hour-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Watt Hour Calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate daily watt-hours, monthly kilowatt-hours, and electricity cost from appliance wattage, usage time, monthly days, and utility rate.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "watts-to-amps-calculator",
    category: "physic",
    slugs: {
      en: "watts-to-amps-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Watts to Amps Calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Convert watts to amps from power, voltage, and optional power factor for DC or AC loads so you can size circuits and compare current draw.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "volt-to-electron-volt-calculator",
    category: "physic",
    slugs: {
      en: "volt-to-electron-volt-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Volt to Electron Volt Calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Convert voltage to electron volts (eV) and joules instantly. Essential for physics, electronics, and quantum mechanics calculations.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "voltage-divider-calculator",
    category: "physic",
    slugs: {
      en: "voltage-divider-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Voltage Divider Calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate output voltage, current, and power dissipation for resistor voltage divider circuits. Essential for electronics engineers and students.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "voltage-drop-calculator",
    category: "physic",
    slugs: {
      en: "voltage-drop-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Voltage Drop Calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate voltage drop in electrical wire runs from current, length, and resistance. Find voltage drop percentage and power loss for safe wiring.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "voltage-regulation-calculator",
    category: "physic",
    slugs: {
      en: "voltage-regulation-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Voltage Regulation Calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate load regulation and line regulation for power supplies. Determine voltage stability from no-load and full-load voltage values.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "volume-to-mass-calculator",
    category: "physic",
    slugs: {
      en: "volume-to-mass-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Volume to Mass Calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate mass from volume and density with unit selection. Perfect for engineering, chemistry, and material science applications.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "von-mises-stress-calculator",
    category: "physic",
    slugs: {
      en: "von-mises-stress-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Von Mises Stress Calculator – Yield & Safety Analysis",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate von Mises equivalent stress and factor of safety from normal and shear stress components. Essential for structural and FEA yield analysis.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "vswr-calculator-voltage-standing-wave-ratio-calculator",
    category: "physic",
    slugs: {
      en: "vswr-calculator-voltage-standing-wave-ratio-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "VSWR Calculator – Voltage Standing Wave Ratio",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate VSWR, return loss, mismatch loss, and transmission efficiency from power or impedance measurements for RF transmission line analysis.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "warp-speed-calculator",
    category: "physic",
    slugs: {
      en: "warp-speed-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Warp Speed Calculator – Star Trek Warp Factor",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate warp speed multiplier, travel time, and energy for any Star Trek warp factor. Fun physics tool for sci-fi fans and educators.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "water-density-calculator",
    category: "physic",
    slugs: {
      en: "water-density-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Water Density Calculator – Temperature, Salinity & Pressure",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate water density from temperature, salinity, and pressure using the UNESCO equation. Compare measured vs theoretical density for fresh and saltwater.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "water-heating-calculator",
    category: "physic",
    slugs: {
      en: "water-heating-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Water Heating Calculator – Energy, Time & Cost",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate energy, heating time, cost, and CO₂ emissions to heat water. Supports liters and gallons, electric and heat pump systems.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "torsional-stiffness-calculator",
    category: "physic",
    slugs: {
      en: "torsional-stiffness-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Torsional Stiffness Calculator – Shear Stress and Torque",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate torsional stiffness, maximum shear stress, polar moment of inertia, and strain energy for circular shafts using shear modulus and geometry.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "trajectory-calculator",
    category: "physic",
    slugs: {
      en: "trajectory-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Trajectory Calculator – Projectile Motion Range and Height",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate projectile range, maximum height, and time of flight from initial velocity, launch angle, and initial height. Metric and imperial supported.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "transformer-sizing-calculator",
    category: "physic",
    slugs: {
      en: "transformer-sizing-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Transformer Sizing Calculator – Required kVA Rating",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate the required transformer kVA rating from load power, power factor, efficiency, temperature, and safety factor for reliable electrical system design.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "transistor-biasing-calculator",
    category: "physic",
    slugs: {
      en: "transistor-biasing-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Transistor Biasing Calculator – DC Operating Point",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate transistor DC operating point, collector current, voltage gain, and stability factor for voltage divider bias circuits. Ideal for amplifier design.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "transmission-calculator",
    category: "physic",
    slugs: {
      en: "transmission-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Transmission Calculator – Signal Power and Data Rate",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate free-space path loss, received signal power, SNR, Shannon capacity, and bandwidth efficiency for wireless and satellite communication links.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "thin-film-optical-coating-calculator",
    category: "physic",
    slugs: {
      en: "thin-film-optical-coating-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Thin Film Optical Coating Calculator – AR & HR",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate reflectance and transmittance of single-layer thin film coatings using Fresnel equations. Analyze AR and HR coatings for s- and p-polarizations.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "thin-lens-equation-calculator",
    category: "physic",
    slugs: {
      en: "thin-lens-equation-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Thin Lens Equation Calculator – Focal Length",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Solve the thin lens equation for focal length, object, or image distance. Find magnification and identify real, virtual, upright, or inverted images.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "three-phase-calculator",
    category: "physic",
    slugs: {
      en: "three-phase-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Three Phase Power Calculator – Voltage & Current",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate three-phase apparent, active, and reactive power from voltage, current, and power factor. Essential tool for electrical engineers.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "thrust-to-weight-ratio-calculator",
    category: "physic",
    slugs: {
      en: "thrust-to-weight-ratio-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Thrust to Weight Ratio Calculator – Aerospace Performance",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate thrust-to-weight ratio (TWR), net force, and net acceleration for rockets, aircraft, and drones. Instantly determine if your vehicle can lift off.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "time-dilation-calculator",
    category: "physic",
    slugs: {
      en: "time-dilation-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Time Dilation Calculator – Einstein's Special Relativity",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate relativistic time dilation using Einstein's special relativity. Enter velocity and proper time to find dilated time and Lorentz factor.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "thermal-energy-calculator",
    category: "physic",
    slugs: {
      en: "thermal-energy-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Thermal Energy Calculator – Heat, Phase Change & Power",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate thermal energy using Q=mcΔT. Find heat for phase changes, heating time from power, and electrical energy. Free online physics tool.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "thermal-equilibrium-calculator",
    category: "physic",
    slugs: {
      en: "thermal-equilibrium-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Thermal Equilibrium Calculator – Final Temperature & Heat",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Find equilibrium temperature when two objects mix using Q=mcΔT. Calculate heat transferred and conduction heat flow for thermal balance problems.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "thermal-expansion-calculator",
    category: "physic",
    slugs: {
      en: "thermal-expansion-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Thermal Expansion Calculator – Linear, Area & Volume",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate thermal expansion for steel, aluminum, copper and more. Supports linear, area, and volume expansion using ΔL=αL₀ΔT. Essential for engineering.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "thermal-resistance-calculator",
    category: "physic",
    slugs: {
      en: "thermal-resistance-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Thermal Resistance Calculator – Heat Flow & R-Value",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate thermal resistance R=L/(kA), heat flow rate, temperature gradient, and R-value for insulation design and heat transfer engineering.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "thermal-stress-calculator",
    category: "physic",
    slugs: {
      en: "thermal-stress-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Thermal Stress Calculator – Strain & Constrained Expansion",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate thermal stress σ=EαΔT and biaxial stress for constrained materials. Supports steel, aluminum, copper. Essential for structural engineering.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  }
];
