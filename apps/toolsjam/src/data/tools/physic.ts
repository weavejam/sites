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
      "zh-CN": "yi-zai-he-ji-suan-qi",
      "zh-TW": "yi-zai-he-ji-suan-qi",
      ja: "yokumen-kaju-keisan",
      ko: "yeokmyeon-hajung-gyesan",
      es: "calculadora-carga-alar",
      fr: "calculateur-charge-alaire",
      de: "flaechenbelastung-rechner",
      pt: "calculadora-carga-alar",
      ru: "nagruzka-na-krylo-kalkulyator"
    },
    titles: {
      en: "Wing Loading Calculator – Stall Speed and Performance",
      "zh-CN": "翼载荷计算器：失速速度与性能",
      "zh-TW": "翼載荷計算器：失速速度與性能",
      ja: "翼面荷重計算機：失速速度と性能",
      ko: "익면하중 계산기: 실속 속도와 성능",
      es: "Calculadora de carga alar: pérdida y rendimiento",
      fr: "Calculateur de charge alaire : décrochage et performance",
      de: "Flächenbelastung-Rechner: Abriss und Leistung",
      pt: "Calculadora de carga alar: estol e desempenho",
      ru: "Калькулятор нагрузки на крыло: сваливание и характеристики"
    },
    descriptions: {
      en: "Calculate aircraft wing loading and stall speed from weight and wing area. Supports metric and imperial units for aircraft, gliders, and RC models.",
      "zh-CN": "根据重量和翼面积计算飞机翼载荷与失速速度，支持公制和英制，适用于飞机、滑翔机和遥控模型。",
      "zh-TW": "根據重量和翼面積計算飛機翼載荷與失速速度，支援公制與英制，適用於飛機、滑翔機和遙控模型。",
      ja: "重量と翼面積から翼面荷重と失速速度を計算。航空機、グライダー、RC機に対応。",
      ko: "중량과 날개 면적로 항공기 익면하중과 실속 속도를 계산합니다. 항공기, 글라이더, RC 모델을 지원합니다.",
      es: "Calcula la carga alar y la velocidad de pérdida a partir del peso y el área alar. Compatible con unidades métricas e imperiales.",
      fr: "Calculez la charge alaire et la vitesse de décrochage à partir du poids et de la surface alaire. Systèmes métrique et impérial pris en charge.",
      de: "Berechne Flächenbelastung und Abrissgeschwindigkeit aus Gewicht und Flügelfläche. Für metrische und imperiale Einheiten.",
      pt: "Calcule a carga alar e a velocidade de estol a partir do peso e da área da asa. Suporta unidades métricas e imperiais.",
      ru: "Рассчитайте нагрузку на крыло и скорость сваливания по массе и площади крыла. Поддерживаются метрические и имперские единицы."
    }
  },
  {
    id: "water-viscosity-calculator",
    category: "physic",
    slugs: {
      en: "water-viscosity-calculator",
      "zh-CN": "shui-niandu-ji-suan-qi",
      "zh-TW": "shui-niandu-ji-suan-qi",
      ja: "sui-nendo-keisanki",
      ko: "mul-jamdo-gyesangi",
      es: "calculadora-viscosidad-agua",
      fr: "calculateur-viscosite-eau",
      de: "wasser-viskositaetsrechner",
      pt: "calculadora-viscosidade-agua",
      ru: "kalkulyator-vyazkosti-vody"
    },
    titles: {
      en: "Water Viscosity Calculator",
      "zh-CN": "水粘度计算器",
      "zh-TW": "水黏度計算機",
      ja: "水の粘度計算機",
      ko: "물 점도 계산기",
      es: "Calculadora de viscosidad del agua",
      fr: "Calculateur de viscosité de l’eau",
      de: "Wasser-Viskositätsrechner",
      pt: "Calculadora de viscosidade da água",
      ru: "Калькулятор вязкости воды"
    },
    descriptions: {
      en: "Calculate water dynamic viscosity, kinematic viscosity, density, and Reynolds number from temperature, pressure, flow velocity, and pipe size fast.",
      "zh-CN": "根据温度、压力、流速和管径，快速计算水的动力粘度、运动粘度、密度和雷诺数。",
      "zh-TW": "依溫度、壓力、流速與管徑，快速計算水的動力黏度、運動黏度、密度與雷諾數。",
      ja: "温度、圧力、流速、配管径から、水の動的粘度、動粘度、密度、レイノルズ数を素早く計算します。",
      ko: "온도, 압력, 유속, 배관 직경으로 물의 동적 점도, 운동 점도, 밀도, 레이놀즈 수를 빠르게 계산합니다.",
      es: "Calcula rápido la viscosidad dinámica y cinemática, la densidad y el número de Reynolds del agua según temperatura, presión y caudal.",
      fr: "Calculez rapidement la viscosité dynamique et cinématique, la masse volumique et le nombre de Reynolds de l’eau selon la température, la pression et le débit.",
      de: "Berechnen Sie dynamische und kinematische Viskosität, Dichte und Reynolds-Zahl von Wasser schnell aus Temperatur, Druck und Durchfluss.",
      pt: "Calcule rápido a viscosidade dinâmica e cinemática, a densidade e o número de Reynolds da água com temperatura, pressão e vazão.",
      ru: "Быстро рассчитывайте динамическую и кинематическую вязкость, плотность и число Рейнольдса воды по температуре, давлению и расходу."
    }
  },
  {
    id: "watt-calculator",
    category: "physic",
    slugs: {
      en: "watt-calculator",
      "zh-CN": "watt-gonglv-jisuanqi",
      "zh-TW": "watt-gonglv-jisuanqi",
      ja: "watt-keisan-ki",
      ko: "wateu-gyeonsangi",
      es: "calculadora-de-vatios",
      fr: "calculateur-de-watts",
      de: "watt-rechner",
      pt: "calculadora-de-watt",
      ru: "vatt-kalkulyator"
    },
    titles: {
      en: "Watt Calculator",
      "zh-CN": "瓦特计算器",
      "zh-TW": "瓦特計算器",
      ja: "ワット計算機",
      ko: "와트 계산기",
      es: "Calculadora de vatios",
      fr: "Calculateur de watts",
      de: "Watt-Rechner",
      pt: "Calculadora de watt",
      ru: "Калькулятор ватт"
    },
    descriptions: {
      en: "Calculate volts, amps, ohms, watts, and optional watt-hours by entering any two electrical values, then solve the rest for quick circuit checks.",
      "zh-CN": "输入任意两个电气值，即可计算电压、电流、电阻、功率和可选的瓦时。",
      "zh-TW": "輸入任意兩個電氣值，即可計算電壓、電流、電阻、功率與可選的瓦時。",
      ja: "2つの電気量を入力して、電圧・電流・抵抗・電力・ワット時を計算します。",
      ko: "두 개의 전기 값을 입력해 전압, 전류, 저항, 전력, 선택적 와트시를 계산합니다.",
      es: "Calcula voltios, amperios, ohmios, vatios y vatios-hora al introducir dos valores eléctricos.",
      fr: "Calculez volts, ampères, ohms, watts et watt-heures en saisissant deux valeurs électriques.",
      de: "Berechne Volt, Ampere, Ohm, Watt und optional Wattstunden aus zwei elektrischen Werten.",
      pt: "Calcule volts, amperes, ohms, watts e watt-hora ao inserir dois valores elétricos.",
      ru: "Рассчитывайте вольты, амперы, омы, ватты и ватт-часы по двум электрическим значениям."
    }
  },
  {
    id: "watt-converter",
    category: "physic",
    slugs: {
      en: "watt-converter",
      "zh-CN": "wa-te-huan-suan-qi",
      "zh-TW": "wa-te-huan-suan-qi",
      ja: "watto-henkan",
      ko: "wateu-byeonhwan",
      es: "conversor-vatios",
      fr: "convertisseur-watts",
      de: "watt-umrechner",
      pt: "conversor-watts",
      ru: "konverter-vatt"
    },
    titles: {
      en: "Watt Converter",
      "zh-CN": "瓦特换算器",
      "zh-TW": "瓦特換算器",
      ja: "ワット変換",
      ko: "와트 변환기",
      es: "Conversor de vatios",
      fr: "Convertisseur de watts",
      de: "Watt-Umrechner",
      pt: "Conversor de watts",
      ru: "Конвертер ватт"
    },
    descriptions: {
      en: "Convert watts, kilowatts, megawatts, horsepower, BTU per hour, calories per second, and more with accurate power-unit factors.",
      "zh-CN": "准确换算瓦特、千瓦、兆瓦、马力、BTU/小时、卡路里/秒等功率单位。",
      "zh-TW": "準確換算瓦特、千瓦、兆瓦、馬力、BTU/小時、卡路里/秒等功率單位。",
      ja: "ワット、キロワット、メガワット、馬力、BTU/時、カロリー/秒などの電力単位を正確に換算します。",
      ko: "와트, 킬로와트, 메가와트, 마력, 시간당 BTU, 초당 칼로리 등 전력 단위를 정확하게 변환하세요.",
      es: "Convierte vatios, kilovatios, megavatios, caballos de fuerza, BTU por hora, calorías por segundo y más con factores precisos.",
      fr: "Convertissez watts, kilowatts, mégawatts, chevaux-vapeur, BTU par heure, calories par seconde et plus avec des facteurs précis.",
      de: "Rechne Watt, Kilowatt, Megawatt, Pferdestärken, BTU pro Stunde, Kalorien pro Sekunde und mehr mit genauen Faktoren um.",
      pt: "Converta watts, quilowatts, megawatts, cavalos-vapor, BTU por hora, calorias por segundo e mais com fatores precisos.",
      ru: "Переводите ватты, киловатты, мегаватты, лошадиные силы, BTU в час, калории в секунду и другие единицы мощности."
    }
  },
  {
    id: "watt-hour-calculator",
    category: "physic",
    slugs: {
      en: "watt-hour-calculator",
      "zh-CN": "washi-jisuanqi",
      "zh-TW": "washi-jisuanqi",
      ja: "wattoji-keisanki",
      ko: "wateusi-gyesangi",
      es: "calculadora-vatio-hora",
      fr: "calculateur-wattheure",
      de: "wattstunden-rechner",
      pt: "calculadora-watt-hora",
      ru: "vatt-chas-kalkulyator"
    },
    titles: {
      en: "Watt Hour Calculator",
      "zh-CN": "瓦时计算器",
      "zh-TW": "瓦時計算器",
      ja: "ワット時計算機",
      ko: "와트시 계산기",
      es: "Calculadora de vatios-hora",
      fr: "Calculateur wattheure",
      de: "Wattstunden-Rechner",
      pt: "Calculadora de watt-hora",
      ru: "Калькулятор ватт-часов"
    },
    descriptions: {
      en: "Calculate daily watt-hours, monthly kilowatt-hours, and electricity cost from appliance wattage, usage time, monthly days, and utility rate.",
      "zh-CN": "根据电器功率、运行时间、每月天数和电价，计算每日瓦时、每月千瓦时和用电成本。",
      "zh-TW": "根據電器功率、運作時間、每月天數與電價，計算每日瓦時、每月千瓦時和用電成本。",
      ja: "家電の消費電力、使用時間、月の日数、電気料金から、1日あたりのWh、月間kWh、電気代を計算します。",
      ko: "가전의 소비전력, 사용 시간, 월별 일수, 전기 요금으로 일일 Wh, 월간 kWh, 전기 요금을 계산합니다.",
      es: "Calcula vatios-hora diarios, kilovatios-hora mensuales y el costo eléctrico a partir de potencia, tiempo de uso y tarifa.",
      fr: "Calcule les wattheures quotidiens, les kilowattheures mensuels et le coût de l’électricité à partir de la puissance, du temps d’usage et du tarif.",
      de: "Berechnet tägliche Wattstunden, monatliche Kilowattstunden und Stromkosten aus Leistung, Nutzungsdauer und Tarif.",
      pt: "Calcule watt-hora diários, quilowatt-hora mensais e custo de energia com base na potência, tempo de uso e tarifa.",
      ru: "Рассчитывает суточные ватт-часы, месячные киловатт-часы и стоимость электроэнергии по мощности, времени работы и тарифу."
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
      "zh-CN": "ti-ji-zhuan-zhi-liang-ji-suan-qi",
      "zh-TW": "ti-ji-zhuan-zhi-liang-ji-suan-qi",
      ja: "taiseki-shitsuryo-keisanki",
      ko: "bupi-jillyang-gyesangi",
      es: "calculadora-volumen-masa",
      fr: "calculateur-volume-masse",
      de: "volumen-zu-masse-rechner",
      pt: "calculadora-volume-para-massa",
      ru: "kalkulyator-obema-v-massu"
    },
    titles: {
      en: "Volume to Mass Calculator",
      "zh-CN": "体积转质量计算器",
      "zh-TW": "體積轉質量計算器",
      ja: "体積から質量計算機",
      ko: "부피에서 질량 계산기",
      es: "Calculadora de volumen a masa",
      fr: "Calculateur volume vers masse",
      de: "Volumen-zu-Masse-Rechner",
      pt: "Calculadora de volume para massa",
      ru: "Калькулятор объёма в массу"
    },
    descriptions: {
      en: "Calculate mass from volume and density with unit selection. Perfect for engineering, chemistry, and material science applications.",
      "zh-CN": "根据体积和密度计算质量，支持单位选择，适用于工程、化学和材料科学。",
      "zh-TW": "根據體積和密度計算質量，支援單位選擇，適用於工程、化學和材料科學。",
      ja: "体積と密度から質量を、単位を選んで計算できます。工学、化学、材料科学に最適です。",
      ko: "부피와 밀도로 질량을 계산하고 단위를 선택하세요. 공학, 화학, 재료 과학에 적합합니다.",
      es: "Calcula la masa a partir del volumen y la densidad con selección de unidades. Ideal para ingeniería, química y ciencia de materiales.",
      fr: "Calculez la masse à partir du volume et de la densité avec choix des unités. Idéal pour l’ingénierie, la chimie et les matériaux.",
      de: "Berechnen Sie die Masse aus Volumen und Dichte mit Einheitenwahl. Ideal für Ingenieurwesen, Chemie und Materialwissenschaft.",
      pt: "Calcule a massa a partir do volume e da densidade com seleção de unidades. Ideal para engenharia, química e ciência dos materiais.",
      ru: "Рассчитайте массу по объёму и плотности с выбором единиц. Подходит для инженерии, химии и материаловедения."
    }
  },
  {
    id: "von-mises-stress-calculator",
    category: "physic",
    slugs: {
      en: "von-mises-stress-calculator",
      "zh-CN": "von-mises-yingli-jisuanqi",
      "zh-TW": "von-mises-yingli-jisuanqi",
      ja: "von-mises-ouryoku-keisan",
      ko: "von-mises-ingeub-gyeonsan-gi",
      es: "calculadora-esfuerzo-von-mises",
      fr: "calculateur-contraintes-von-mises",
      de: "von-mises-spannungsrechner",
      pt: "calculadora-tensao-von-mises",
      ru: "kalkulyator-napryazheniya-von-mizesa"
    },
    titles: {
      en: "Von Mises Stress Calculator – Yield & Safety Analysis",
      "zh-CN": "冯·米塞斯应力计算器：屈服与安全分析",
      "zh-TW": "馮·米塞斯應力計算器：降伏與安全分析",
      ja: "フォンミーゼス応力計算機：降伏と安全解析",
      ko: "폰 미세스 응력 계산기: 항복과 안전 분석",
      es: "Calculadora de esfuerzo de Von Mises",
      fr: "Calculateur de contrainte de Von Mises",
      de: "Von-Mises-Spannungsrechner",
      pt: "Calculadora de tensão de Von Mises",
      ru: "Калькулятор напряжения Мизеса"
    },
    descriptions: {
      en: "Calculate von Mises equivalent stress and factor of safety from normal and shear stress components. Essential for structural and FEA yield analysis.",
      "zh-CN": "根据法向与剪应力分量计算冯·米塞斯等效应力和安全系数，适用于结构与有限元屈服分析。",
      "zh-TW": "根據法向與剪應力分量計算馮·米塞斯等效應力與安全係數，適用於結構與有限元素降伏分析。",
      ja: "法線応力とせん断応力からフォンミーゼス相当応力と安全率を計算。構造解析やFEAの降伏評価に必須です。",
      ko: "법선응력과 전단응력 성분으로 폰 미세스 등가응력과 안전율을 계산합니다. 구조 및 FEA 항복 해석에 필수입니다.",
      es: "Calcula el esfuerzo equivalente de Von Mises y el factor de seguridad a partir de esfuerzos normales y cortantes para análisis de fluencia.",
      fr: "Calcule la contrainte équivalente de Von Mises et le coefficient de sécurité à partir des contraintes normales et de cisaillement.",
      de: "Berechnet die von-Mises-Vergleichsspannung und den Sicherheitsfaktor aus Normal- und Schubspannungen für Fließnachweise.",
      pt: "Calcula a tensão equivalente de Von Mises e o fator de segurança a partir de tensões normais e de cisalhamento.",
      ru: "Рассчитывает эквивалентное напряжение Мизеса и коэффициент запаса по нормальным и касательным напряжениям."
    }
  },
  {
    id: "vswr-calculator-voltage-standing-wave-ratio-calculator",
    category: "physic",
    slugs: {
      en: "vswr-calculator-voltage-standing-wave-ratio-calculator",
      "zh-CN": "vswr-dianya-zhubo-bi-jisuanqi",
      "zh-TW": "vswr-dianya-zhubo-bi-jisuanqi",
      ja: "vswr-denatsuteizaiha-hi-keisanki",
      ko: "vswr-jeonja-jeongjaebi-gyeonsangi",
      es: "calculadora-vswr-relacion-onda-estacionaria",
      fr: "calculatrice-vswr-rapport-onde-stationnaire",
      de: "vswr-rechner-stehwellenverhaeltnis",
      pt: "calculadora-vswr-relacao-onda-estacionaria",
      ru: "kalkulyator-vswr-ksv"
    },
    titles: {
      en: "VSWR Calculator – Voltage Standing Wave Ratio",
      "zh-CN": "VSWR计算器：电压驻波比",
      "zh-TW": "VSWR計算器：電壓駐波比",
      ja: "VSWR計算機：電圧定在波比",
      ko: "VSWR 계산기: 전압 정재파비",
      es: "Calculadora VSWR: relación de onda estacionaria",
      fr: "Calculatrice VSWR : rapport d'onde stationnaire",
      de: "VSWR-Rechner: Stehwellenverhältnis",
      pt: "Calculadora VSWR: relação de onda estacionária",
      ru: "Калькулятор VSWR: КСВ"
    },
    descriptions: {
      en: "Calculate VSWR, return loss, mismatch loss, and transmission efficiency from power or impedance measurements for RF transmission line analysis.",
      "zh-CN": "根据功率或阻抗测量计算 VSWR、回波损耗、失配损耗和传输效率。",
      "zh-TW": "依功率或阻抗量測計算 VSWR、回波損耗、失配損耗與傳輸效率。",
      ja: "パワーまたはインピーダンス測定から、VSWR・反射損失・不整合損失・伝送効率を計算します。",
      ko: "전력 또는 임피던스 측정값으로 VSWR, 반사손실, 부정합손실, 전송 효율을 계산합니다.",
      es: "Calcula VSWR, pérdida de retorno, pérdida por desadaptación y eficiencia de transmisión a partir de potencia o impedancia.",
      fr: "Calculez le VSWR, la perte de retour, la perte d'adaptation et le rendement de transmission à partir de mesures de puissance ou d'impédance.",
      de: "Berechnen Sie VSWR, Rückflussdämpfung, Fehlanpassungsverlust und Übertragungseffizienz aus Leistungs- oder Impedanzmessungen.",
      pt: "Calcule VSWR, perda de retorno, perda por descasamento e eficiência de transmissão a partir de potência ou impedância.",
      ru: "Рассчитайте VSWR, потери на отражение, потери на рассогласование и эффективность передачи по измерениям мощности или импеданса."
    }
  },
  {
    id: "warp-speed-calculator",
    category: "physic",
    slugs: {
      en: "warp-speed-calculator",
      "zh-CN": "qu-su-ji-suan-qi",
      "zh-TW": "qu-su-ji-suan-qi",
      ja: "kyokusoku-keisanki",
      ko: "wapeu-sokdo-gyeonsangi",
      es: "calculadora-velocidad-warp",
      fr: "calculateur-vitesse-warp",
      de: "warp-geschwindigkeitsrechner",
      pt: "calculadora-velocidade-warp",
      ru: "kalkulyator-skorosti-varpa"
    },
    titles: {
      en: "Warp Speed Calculator – Star Trek Warp Factor",
      "zh-CN": "曲速计算器",
      "zh-TW": "曲速計算器",
      ja: "曲速計算機",
      ko: "워프 속도 계산기",
      es: "Calculadora de velocidad warp",
      fr: "Calculateur de vitesse warp",
      de: "Warp-Geschwindigkeitsrechner",
      pt: "Calculadora de velocidade warp",
      ru: "Калькулятор скорости варпа"
    },
    descriptions: {
      en: "Calculate warp speed multiplier, travel time, and energy for any Star Trek warp factor. Fun physics tool for sci-fi fans and educators.",
      "zh-CN": "计算任意曲速因子的倍速、航行时间和能量，适合科幻爱好者与教育用途。",
      "zh-TW": "計算任意曲速因子的倍數、航行時間與能量，適合科幻迷與教學使用。",
      ja: "任意の曲速係数の倍率、移動時間、エネルギーを計算。SF好きと教育向けのツール。",
      ko: "임의의 워프 계수에 대한 배율, 이동 시간, 에너지를 계산하는 SF용 도구입니다.",
      es: "Calcula el multiplicador, el tiempo de viaje y la energía para cualquier factor warp.",
      fr: "Calculez le multiplicateur, le temps de trajet et l’énergie pour n’importe quel facteur warp.",
      de: "Berechne Multiplikator, Reisezeit und Energie für jeden Warp-Faktor.",
      pt: "Calcule o multiplicador, o tempo de viagem e a energia para qualquer fator warp.",
      ru: "Рассчитайте множитель, время полёта и энергию для любого варп-фактора."
    }
  },
  {
    id: "water-density-calculator",
    category: "physic",
    slugs: {
      en: "water-density-calculator",
      "zh-CN": "shui-midu-jisuanqi",
      "zh-TW": "shui-midu-ji-suan-qi",
      ja: "mizu-mitsudo-keisanki",
      ko: "mul-mildo-gyesangi",
      es: "calculadora-densidad-agua",
      fr: "calculateur-densite-eau",
      de: "wasser-dichte-rechner",
      pt: "calculadora-densidade-agua",
      ru: "kalkulyator-plotnosti-vody"
    },
    titles: {
      en: "Water Density Calculator – Temperature, Salinity & Pressure",
      "zh-CN": "水密度计算器：温度、盐度和压力",
      "zh-TW": "水密度計算器：溫度、鹽度與壓力",
      ja: "水の密度計算機：温度・塩分・圧力",
      ko: "물 밀도 계산기: 온도·염분·압력",
      es: "Calculadora de densidad del agua: temperatura, salinidad y presión",
      fr: "Calculateur de densité de l’eau : température, salinité et pression",
      de: "Wasserdichte-Rechner: Temperatur, Salzgehalt und Druck",
      pt: "Calculadora de densidade da água: temperatura, salinidade e pressão",
      ru: "Калькулятор плотности воды: температура, солёность и давление"
    },
    descriptions: {
      en: "Calculate water density from temperature, salinity, and pressure using the UNESCO equation. Compare measured vs theoretical density for fresh and saltwater.",
      "zh-CN": "根据温度、盐度和压力，使用 UNESCO 状态方程计算水的密度，并比较淡水与海水的实测值和理论值。",
      "zh-TW": "根據溫度、鹽度與壓力，使用 UNESCO 狀態方程計算水的密度，並比較淡水與海水的實測值和理論值。",
      ja: "温度、塩分、圧力から UNESCO の状態方程式で水の密度を計算し、淡水と海水の実測値と理論値を比較します。",
      ko: "온도, 염분, 압력으로 UNESCO 상태방정식을 사용해 물의 밀도를 계산하고 담수와 해수의 실측값과 이론값을 비교합니다.",
      es: "Calcula la densidad del agua según temperatura, salinidad y presión con la ecuación UNESCO, y compara valores medidos y teóricos.",
      fr: "Calculez la densité de l’eau à partir de la température, de la salinité et de la pression avec l’équation UNESCO, puis comparez mesuré et théorique.",
      de: "Berechnen Sie die Wasserdichte aus Temperatur, Salzgehalt und Druck mit der UNESCO-Gleichung und vergleichen Sie Mess- und Theoriewerte.",
      pt: "Calcule a densidade da água pela temperatura, salinidade e pressão usando a equação UNESCO e compare valores medidos e teóricos.",
      ru: "Рассчитайте плотность воды по температуре, солёности и давлению по уравнению ЮНЕСКО и сравните измеренные и теоретические значения."
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
  },
  {
    id: "specific-gas-constant-calculator",
    category: "physic",
    slugs: {
      en: "specific-gas-constant-calculator",
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
      en: "Specific Gas Constant Calculator – R Value for Any Gas",
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
      en: "Calculate the specific gas constant (R) for any gas from its molar mass. Use the ideal gas law PV=mRT to solve for pressure, volume, temperature, or mass.",
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
    id: "specific-gravity-calculator",
    category: "physic",
    slugs: {
      en: "specific-gravity-calculator",
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
      en: "Specific Gravity Calculator – Density Ratio & Buoyancy",
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
      en: "Calculate specific gravity and density ratio relative to water. Enter substance mass and volume, or input density directly, to instantly find buoyancy force.",
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
    id: "specific-heat-calculator",
    category: "physic",
    slugs: {
      en: "specific-heat-calculator",
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
      en: "Specific Heat Calculator – Q = m × c × ΔT Formula",
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
      en: "Calculate heat energy Q, specific heat capacity, or temperature change using Q = m × c × ΔT. Perfect for thermodynamics, engineering, and lab applications.",
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
    id: "specific-impulse-calculator",
    category: "physic",
    slugs: {
      en: "specific-impulse-calculator",
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
      en: "Specific Impulse Calculator – Rocket Engine Efficiency",
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
      en: "Calculate specific impulse (Isp) and effective exhaust velocity for rocket engines. Enter thrust and mass flow rate to measure propulsion efficiency in seconds.",
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
    id: "speed-of-light-calculator",
    category: "physic",
    slugs: {
      en: "speed-of-light-calculator",
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
      en: "Speed of Light Calculator – Time, Distance & Speed in Media",
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
      en: "Calculate travel time, distance, or speed of light in any medium using refractive index. Supports vacuum, water, glass, and custom media for physics and optics.",
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
