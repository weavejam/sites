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
      "zh-CN": "wate-zhuan-anpei-jisuanqi",
      "zh-TW": "wate-zhuan-anpei-jisuanqi",
      ja: "watto-anpea-keisanki",
      ko: "wateu-aempeeo-gyesangi",
      es: "calculadora-vatios-amperios",
      fr: "calculateur-watts-amperes",
      de: "watt-ampere-rechner",
      pt: "calculadora-watts-amperes",
      ru: "kalkulyator-vatt-v-ampery"
    },
    titles: {
      en: "Watts to Amps Calculator",
      "zh-CN": "瓦特转安培计算器",
      "zh-TW": "瓦特轉安培計算器",
      ja: "ワットからアンペア計算機",
      ko: "와트를 암페어로 변환 계산기",
      es: "Calculadora de vatios a amperios",
      fr: "Calculateur watts en ampères",
      de: "Watt in Ampere Rechner",
      pt: "Calculadora de watts para amperes",
      ru: "Калькулятор ватт в амперы"
    },
    descriptions: {
      en: "Convert watts to amps from power, voltage, and optional power factor for DC or AC loads so you can size circuits and compare current draw.",
      "zh-CN": "根据功率、电压和可选功率因数，将瓦特换算为安培，适用于直流或交流负载，便于估算电路容量和电流。",
      "zh-TW": "依功率、電壓與可選功率因數，將瓦特換算為安培，適用於直流或交流負載，便於估算電路容量與電流。",
      ja: "電力、電圧、任意の力率からワットをアンペアに変換し、DCやAC負荷の回路容量と電流比較に役立てます。",
      ko: "전력, 전압, 선택적 역률로 와트를 암페어로 변환해 DC 또는 AC 부하의 회로 용량과 전류 소비를 비교하세요.",
      es: "Convierte vatios a amperios con potencia, voltaje y factor de potencia opcional para cargas DC o AC y dimensionar circuitos.",
      fr: "Convertissez les watts en ampères avec puissance, tension et facteur de puissance optionnel pour charges DC ou AC et dimensionnement.",
      de: "Watt in Ampere umrechnen mit Leistung, Spannung und optionalem Leistungsfaktor für DC- oder AC-Lasten und Stromvergleich.",
      pt: "Converta watts em amperes com potência, tensão e fator de potência opcional para cargas CC ou CA e dimensionamento elétrico.",
      ru: "Переводите ватты в амперы по мощности, напряжению и коэффициенту мощности для DC или AC нагрузок и подбора цепей."
    }
  },
  {
    id: "volt-to-electron-volt-calculator",
    category: "physic",
    slugs: {
      en: "volt-to-electron-volt-calculator",
      "zh-CN": "fute-zhuan-dianzi-fute-jisuanqi",
      "zh-TW": "fute-zhuan-dianzi-fute-jisuanqi",
      ja: "boruto-kara-denshi-boruto-keisanki",
      ko: "beolteueseo-jeonja-beolteu-gyesangi",
      es: "calculadora-voltio-a-electronvoltio",
      fr: "calculateur-volt-en-electronvolt",
      de: "volt-zu-elektronenvolt-rechner",
      pt: "calculadora-volt-para-eletron-volt",
      ru: "konverter-volt-v-elektronvolt"
    },
    titles: {
      en: "Volt to Electron Volt Calculator",
      "zh-CN": "伏特转电子伏特计算器",
      "zh-TW": "伏特轉電子伏特計算器",
      ja: "ボルトから電子ボルト計算機",
      ko: "볼트에서 전자볼트 계산기",
      es: "Calculadora de voltios a electronvoltios",
      fr: "Calculateur de volts en électronvolts",
      de: "Volt-zu-Elektronenvolt-Rechner",
      pt: "Calculadora de volt para elétron-volts",
      ru: "Калькулятор из вольт в электронвольты"
    },
    descriptions: {
      en: "Convert voltage to electron volts (eV) and joules instantly. Essential for physics, electronics, and quantum mechanics calculations.",
      "zh-CN": "立即将电压转换为电子伏特（eV）和焦耳。适用于物理、电子学和量子力学计算。",
      "zh-TW": "立即將電壓轉換為電子伏特（eV）與焦耳。適用於物理、電子學與量子力學計算。",
      ja: "電圧を電子ボルト（eV）とジュールに即変換。物理、電子工学、量子力学の計算に最適です。",
      ko: "전압을 전자볼트(eV)와 줄로 즉시 변환하세요. 물리, 전자공학, 양자역학 계산에 유용합니다.",
      es: "Convierte voltaje a electronvoltios (eV) y julios al instante. Ideal para física, electrónica y mecánica cuántica.",
      fr: "Convertissez instantanément la tension en électronvolts (eV) et en joules. Idéal pour la physique, l’électronique et la mécanique quantique.",
      de: "Spannung sofort in Elektronenvolt (eV) und Joule umrechnen. Ideal für Physik, Elektronik und Quantenmechanik.",
      pt: "Converta tensão em elétron-volts (eV) e joules instantaneamente. Ideal para física, eletrônica e mecânica quântica.",
      ru: "Мгновенно переводите напряжение в электронвольты (eV) и джоули. Подходит для физики, электроники и квантовой механики."
    }
  },
  {
    id: "voltage-divider-calculator",
    category: "physic",
    slugs: {
      en: "voltage-divider-calculator",
      "zh-CN": "dianya-fenyaqi-jisuanqi",
      "zh-TW": "dianya-fenyaqi-jisuanqi",
      ja: "denatsu-bunatsu-keisanki",
      ko: "jeonap-bunbaegi-gesangi",
      es: "calculadora-divisor-voltaje",
      fr: "calculateur-diviseur-tension",
      de: "spannungsteiler-rechner",
      pt: "calculadora-divisor-tensao",
      ru: "kalkulyator-delitelya-napryazheniya"
    },
    titles: {
      en: "Voltage Divider Calculator",
      "zh-CN": "电压分压器计算器",
      "zh-TW": "電壓分壓器計算器",
      ja: "電圧分圧計算機",
      ko: "전압 분배기 계산기",
      es: "Calculadora de divisor de voltaje",
      fr: "Calculateur de diviseur de tension",
      de: "Spannungsteiler-Rechner",
      pt: "Calculadora de divisor de tensão",
      ru: "Калькулятор делителя напряжения"
    },
    descriptions: {
      en: "Calculate output voltage, current, and power dissipation for resistor voltage divider circuits. Essential for electronics engineers and students.",
      "zh-CN": "计算电阻分压电路的输出电压、电流和功率损耗，适合电子工程师和学生。",
      "zh-TW": "計算電阻分壓電路的輸出電壓、電流與功率損耗，適合電子工程師與學生。",
      ja: "抵抗分圧回路の出力電圧、電流、消費電力を計算。電子工学の学習や設計に便利です。",
      ko: "저항 분압 회로의 출력 전압, 전류, 전력 손실을 계산합니다. 전자공학 학습과 설계에 유용합니다.",
      es: "Calcula voltaje de salida, corriente y disipación de potencia en divisores resistivos. Ideal para ingenieros y estudiantes de electrónica.",
      fr: "Calcule la tension de sortie, le courant et la dissipation dans les diviseurs résistifs. Idéal pour les ingénieurs et étudiants en électronique.",
      de: "Berechnet Ausgangsspannung, Strom und Verlustleistung für Widerstands-Spannungsteiler. Ideal für Elektronikingenieure und Studierende.",
      pt: "Calcule tensão de saída, corrente e dissipação em divisores resistivos. Essencial para engenheiros e estudantes de eletrônica.",
      ru: "Рассчитайте выходное напряжение, ток и рассеиваемую мощность резистивного делителя. Полезно для инженеров и студентов электроники."
    }
  },
  {
    id: "voltage-drop-calculator",
    category: "physic",
    slugs: {
      en: "voltage-drop-calculator",
      "zh-CN": "dianya-jiang-jisuanqi",
      "zh-TW": "dianya-jiang-jisuanqi",
      ja: "denatsu-koka-keisanki",
      ko: "jeonap-gangha-gyesangi",
      es: "calculadora-caida-tension",
      fr: "calculateur-chute-tension",
      de: "spannungsfall-rechner",
      pt: "calculadora-queda-tensao",
      ru: "kalkulyator-padeniya-napryazheniya"
    },
    titles: {
      en: "Voltage Drop Calculator",
      "zh-CN": "电压降计算器",
      "zh-TW": "電壓降計算器",
      ja: "電圧降下計算機",
      ko: "전압 강하 계산기",
      es: "Calculadora de caída de tensión",
      fr: "Calculateur de chute de tension",
      de: "Spannungsfall-Rechner",
      pt: "Calculadora de queda de tensão",
      ru: "Калькулятор падения напряжения"
    },
    descriptions: {
      en: "Calculate voltage drop in electrical wire runs from current, length, and resistance. Find voltage drop percentage and power loss for safe wiring.",
      "zh-CN": "根据电流、长度和电阻计算电线线路的电压降，得出电压降百分比和功率损耗，帮助安全布线。",
      "zh-TW": "依電流、長度與電阻計算電線線路的電壓降，求出電壓降百分比與功率損耗，協助安全配線。",
      ja: "電流、配線長、抵抗から電線路の電圧降下を計算し、安全な配線のための電圧降下率と電力損失を求めます。",
      ko: "전류, 길이, 저항으로 전선 구간의 전압 강하를 계산하고 안전 배선을 위한 전압 강하율과 전력 손실을 확인하세요.",
      es: "Calcula la caída de tensión en cables eléctricos a partir de corriente, longitud y resistencia. Obtén porcentaje de caída y pérdida de potencia.",
      fr: "Calculez la chute de tension dans un câble à partir du courant, de la longueur et de la résistance. Obtenez le pourcentage et les pertes.",
      de: "Berechnen Sie den Spannungsfall in Leitungen aus Strom, Länge und Widerstand. Ermitteln Sie Prozentwert und Verlustleistung für sichere Verdrahtung.",
      pt: "Calcule a queda de tensão em cabos elétricos pela corrente, comprimento e resistência. Veja percentual de queda e perda de potência.",
      ru: "Рассчитайте падение напряжения в проводе по току, длине и сопротивлению. Узнайте процент падения и потери мощности."
    }
  },
  {
    id: "voltage-regulation-calculator",
    category: "physic",
    slugs: {
      en: "voltage-regulation-calculator",
      "zh-CN": "dianya-tiaojie-jisuanqi",
      "zh-TW": "dianya-tiaozheng-jisuanqi",
      ja: "denatsu-regyureeshon-keisanki",
      ko: "jeonya-gyujeong-gyesangi",
      es: "calculadora-regulacion-voltaje",
      fr: "calculateur-regulation-tension",
      de: "spannungsregelung-rechner",
      pt: "calculadora-regulacao-tensao",
      ru: "kalkulyator-regulirovki-napryazheniya"
    },
    titles: {
      en: "Voltage Regulation Calculator",
      "zh-CN": "电压调整计算器",
      "zh-TW": "電壓調整計算器",
      ja: "電圧レギュレーション計算機",
      ko: "전압 규정 계산기",
      es: "Calculadora de regulación de voltaje",
      fr: "Calculateur de régulation de tension",
      de: "Spannungsregelungsrechner",
      pt: "Calculadora de regulação de tensão",
      ru: "Калькулятор регулировки напряжения"
    },
    descriptions: {
      en: "Calculate load regulation and line regulation for power supplies. Determine voltage stability from no-load and full-load voltage values.",
      "zh-CN": "根据空载和满载电压计算电源的负载调整率和线性调整率，评估电压稳定性。",
      "zh-TW": "根據空載與滿載電壓計算電源的負載調整率與線性調整率，評估電壓穩定性。",
      ja: "無負荷電圧と全負荷電圧から電源の負荷変動率と線形変動率を計算し、電圧の安定性を評価します。",
      ko: "무부하 전압과 전부하 전압으로 전원공급기의 부하 조정률과 선 조정률을 계산해 전압 안정성을 평가합니다.",
      es: "Calcula la regulación de carga y de línea para fuentes de alimentación con voltajes en vacío y a plena carga.",
      fr: "Calculez la régulation de charge et de ligne des alimentations à partir des tensions à vide et en pleine charge.",
      de: "Berechnen Sie Last- und Leitungsregelung für Netzteile anhand von Leerlauf- und Volllastspannungen.",
      pt: "Calcule a regulação de carga e de linha para fontes de alimentação com tensões em vazio e em plena carga.",
      ru: "Рассчитайте регулировку нагрузки и по линии для блоков питания по напряжениям без нагрузки и при полной нагрузке."
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
      "zh-CN": "reshui-jiare-jisuanqi",
      "zh-TW": "reshui-jiare-jisuanqi",
      ja: "mizu-kasnetsu-keisanki",
      ko: "mul-gayeol-gyesangi",
      es: "calculadora-calentamiento-agua",
      fr: "calculateur-chauffage-eau",
      de: "wasser-erhitzen-rechner",
      pt: "calculadora-aquecimento-agua",
      ru: "kalkulyator-nagreva-vody"
    },
    titles: {
      en: "Water Heating Calculator – Energy, Time & Cost",
      "zh-CN": "水加热计算器 - 能耗、时间与成本",
      "zh-TW": "水加熱計算器 - 能耗、時間與成本",
      ja: "水加熱計算機 - エネルギー・時間・コスト",
      ko: "물 가열 계산기 - 에너지, 시간, 비용",
      es: "Calculadora de calentamiento de agua",
      fr: "Calculateur de chauffage de l'eau",
      de: "Wassererwärmungs-Rechner: Energie, Zeit, Kosten",
      pt: "Calculadora de aquecimento de água",
      ru: "Калькулятор нагрева воды: энергия, время, стоимость"
    },
    descriptions: {
      en: "Calculate energy, heating time, cost, and CO₂ emissions to heat water. Supports liters and gallons, electric and heat pump systems.",
      "zh-CN": "计算加热水所需能量、加热时间、费用和 CO₂ 排放。支持升和加仑、电加热器与热泵系统。",
      "zh-TW": "計算加熱水所需能量、加熱時間、費用與 CO₂ 排放。支援公升與加侖、電熱與熱泵系統。",
      ja: "水を加熱するためのエネルギー、加熱時間、費用、CO₂排出量を計算。リットル・ガロン、電気式・ヒートポンプに対応。",
      ko: "물을 데우는 데 필요한 에너지, 가열 시간, 비용, CO₂ 배출량을 계산합니다. 리터·갤런, 전기·히트펌프 시스템 지원.",
      es: "Calcula energía, tiempo de calentamiento, coste y emisiones de CO₂ para calentar agua. Admite litros, galones, sistemas eléctricos y bombas de calor.",
      fr: "Calculez l'énergie, le temps de chauffe, le coût et les émissions de CO₂ pour chauffer l'eau. Litres, gallons, systèmes électriques et pompes à chaleur.",
      de: "Berechnen Sie Energie, Aufheizzeit, Kosten und CO₂-Emissionen zum Erwärmen von Wasser. Unterstützt Liter, Gallonen, Elektro- und Wärmepumpensysteme.",
      pt: "Calcule energia, tempo de aquecimento, custo e emissões de CO₂ para aquecer água. Suporta litros, galões, sistemas elétricos e bombas de calor.",
      ru: "Рассчитайте энергию, время нагрева, стоимость и выбросы CO₂ для нагрева воды. Поддерживаются литры, галлоны, электрические системы и тепловые насосы."
    }
  },
  {
    id: "torsional-stiffness-calculator",
    category: "physic",
    slugs: {
      en: "torsional-stiffness-calculator",
      "zh-CN": "xuan-zhuan-gang-du-ji-suan-qi",
      "zh-TW": "xuan-zhuan-gang-du-ji-suan-qi",
      ja: "senkai-gosei-keisan",
      ko: "biteullim-gangseong-gyesangi",
      es: "calculadora-rigidez-torsional",
      fr: "calculatrice-rigidite-en-torsion",
      de: "torsionssteifigkeit-rechner",
      pt: "calculadora-rigidez-torcional",
      ru: "kalkulyator-krutilnoy-zhestkosti"
    },
    titles: {
      en: "Torsional Stiffness Calculator – Shear Stress and Torque",
      "zh-CN": "扭转刚度计算器——剪应力和扭矩",
      "zh-TW": "扭轉剛度計算器——剪應力和扭矩",
      ja: "ねじり剛性計算機―せん断応力とトルク",
      ko: "비틀림 강성 계산기 - 전단응력과 토크",
      es: "Calculadora de rigidez torsional",
      fr: "Calculatrice de rigidité en torsion",
      de: "Torsionssteifigkeit Rechner",
      pt: "Calculadora de rigidez torsional",
      ru: "Калькулятор крутильной жесткости"
    },
    descriptions: {
      en: "Calculate torsional stiffness, maximum shear stress, polar moment of inertia, and strain energy for circular shafts using shear modulus and geometry.",
      "zh-CN": "使用剪切模量和几何尺寸计算圆轴的扭转刚度、最大剪应力、极惯性矩和应变能。",
      "zh-TW": "使用剪切模數與幾何尺寸計算圓軸的扭轉剛度、最大剪應力、極慣性矩與應變能。",
      ja: "せん断弾性率と形状から、円形軸のねじり剛性、最大せん断応力、極断面二次モーメント、ひずみエネルギーを計算します。",
      ko: "전단 계수와 형상으로 원형 축의 비틀림 강성, 최대 전단응력, 극관성모멘트, 변형에너지를 계산합니다.",
      es: "Calcula la rigidez torsional, el esfuerzo cortante máximo, el momento polar de inercia y la energía de deformación en ejes circulares.",
      fr: "Calculez la rigidité en torsion, la contrainte de cisaillement maximale, le moment quadratique polaire et l’énergie de déformation pour des arbres circulaires.",
      de: "Berechnen Sie Torsionssteifigkeit, maximale Schubspannung, polares Flächenträgheitsmoment und Verformungsenergie für runde Wellen.",
      pt: "Calcule rigidez torsional, tensão de cisalhamento máxima, momento polar de inércia e energia de deformação em eixos circulares.",
      ru: "Рассчитайте крутильную жесткость, максимальное касательное напряжение, полярный момент инерции и энергию деформации для круглых валов."
    }
  },
  {
    id: "trajectory-calculator",
    category: "physic",
    slugs: {
      en: "trajectory-calculator",
      "zh-CN": "dan-dao-gui-ji-ji-suan-qi",
      "zh-TW": "dan-dao-gui-ji-ji-suan-qi",
      ja: "dandou-kidou-keisanki",
      ko: "baldo-gidong-gyesangi",
      es: "calculadora-trayectoria",
      fr: "calculateur-trajectoire",
      de: "flugbahn-rechner",
      pt: "calculadora-trajetoria",
      ru: "kalkulyator-traektorii"
    },
    titles: {
      en: "Trajectory Calculator – Projectile Motion Range and Height",
      "zh-CN": "弹道轨迹计算器：射程和高度",
      "zh-TW": "彈道軌跡計算器：射程與高度",
      ja: "弾道軌道計算機：射程と高さ",
      ko: "탄도 궤적 계산기: 사거리와 높이",
      es: "Calculadora de trayectoria: alcance y altura",
      fr: "Calculateur de trajectoire : portée et hauteur",
      de: "Flugbahn-Rechner: Weite und Höhe",
      pt: "Calculadora de trajetória: alcance e altura",
      ru: "Калькулятор траектории: дальность и высота"
    },
    descriptions: {
      en: "Calculate projectile range, maximum height, and time of flight from initial velocity, launch angle, and initial height. Metric and imperial supported.",
      "zh-CN": "根据初速度、发射角和初始高度，计算抛体射程、最大高度和飞行时间。支持公制与英制。",
      "zh-TW": "根據初速度、發射角與初始高度，計算拋體射程、最大高度與飛行時間。支援公制與英制。",
      ja: "初速度、発射角、初期高さから、投射体の射程・最大高さ・飛行時間を計算します。メートル法とヤード・ポンド法に対応。",
      ko: "초기 속도, 발사 각도, 초기 높이로 발사체의 사거리, 최대 높이, 비행 시간을 계산합니다. 미터법과 야드파운드법 지원.",
      es: "Calcula el alcance, la altura máxima y el tiempo de vuelo de un proyectil a partir de la velocidad inicial, el ángulo y la altura inicial. Admite sistema métrico e imperial.",
      fr: "Calculez la portée, la hauteur maximale et le temps de vol d’un projectile à partir de la vitesse initiale, de l’angle et de la hauteur initiale. Système métrique et impérial pris en charge.",
      de: "Berechnen Sie Wurfweite, maximale Höhe und Flugzeit eines Projektils aus Anfangsgeschwindigkeit, Abwurfwinkel und Starthöhe. Mit metrischen und imperialen Einheiten.",
      pt: "Calcule o alcance, a altura máxima e o tempo de voo de um projétil a partir da velocidade inicial, ângulo de lançamento e altura inicial. Suporta sistema métrico e imperial.",
      ru: "Рассчитайте дальность, максимальную высоту и время полёта снаряда по начальной скорости, углу запуска и начальной высоте. Поддерживаются метрические и имперские единицы."
    }
  },
  {
    id: "transformer-sizing-calculator",
    category: "physic",
    slugs: {
      en: "transformer-sizing-calculator",
      "zh-CN": "bianyaqi-rongliang-jisuanqi",
      "zh-TW": "bianyaqi-rongliang-jisuanqi",
      ja: "henatsuki-yoryo-keisanki",
      ko: "byeonapgi-yongnyang-gyesangi",
      es: "calculadora-dimensionamiento-transformador",
      fr: "calculateur-dimensionnement-transformateur",
      de: "transformator-dimensionierung-rechner",
      pt: "calculadora-dimensionamento-transformador",
      ru: "raschet-moshchnosti-transformatora"
    },
    titles: {
      en: "Transformer Sizing Calculator – Required kVA Rating",
      "zh-CN": "变压器容量计算器 - 所需 kVA 额定值",
      "zh-TW": "變壓器容量計算器 - 所需 kVA 額定值",
      ja: "変圧器容量計算機 - 必要 kVA 定格",
      ko: "변압기 용량 계산기 - 필요한 kVA 정격",
      es: "Calculadora de transformador - kVA requeridos",
      fr: "Calculateur de transformateur - kVA requis",
      de: "Transformator-Rechner - erforderliche kVA",
      pt: "Calculadora de transformador - kVA necessário",
      ru: "Расчет трансформатора - требуемые kVA"
    },
    descriptions: {
      en: "Calculate the required transformer kVA rating from load power, power factor, efficiency, temperature, and safety factor for reliable electrical system design.",
      "zh-CN": "根据负载功率、功率因数、效率、温度和安全系数计算所需变压器 kVA 额定值，支持可靠的电气系统设计。",
      "zh-TW": "依負載功率、功率因數、效率、溫度與安全係數計算所需變壓器 kVA 額定值，協助可靠的電力系統設計。",
      ja: "負荷電力、力率、効率、温度、安全率から必要な変圧器 kVA 定格を計算し、信頼性の高い電気設備設計を支援します。",
      ko: "부하 전력, 역률, 효율, 온도, 안전율로 필요한 변압기 kVA 정격을 계산해 신뢰성 있는 전기 시스템 설계를 지원합니다.",
      es: "Calcula la potencia nominal kVA requerida del transformador según carga, factor de potencia, eficiencia, temperatura y margen de seguridad.",
      fr: "Calculez la puissance kVA requise d'un transformateur selon la charge, le facteur de puissance, le rendement, la température et la marge de sécurité.",
      de: "Berechnen Sie die erforderliche kVA-Leistung eines Transformators aus Lastleistung, Leistungsfaktor, Wirkungsgrad, Temperatur und Sicherheitsfaktor.",
      pt: "Calcule a potência kVA necessária do transformador com base em carga, fator de potência, eficiência, temperatura e fator de segurança.",
      ru: "Рассчитайте требуемую мощность трансформатора в kVA по нагрузке, коэффициенту мощности, КПД, температуре и запасу надежности."
    }
  },
  {
    id: "transistor-biasing-calculator",
    category: "physic",
    slugs: {
      en: "transistor-biasing-calculator",
      "zh-CN": "jingti-guan-pianzhi-jisuanqi",
      "zh-TW": "jingtiguan-pianzhi-jisuanqi",
      ja: "toranjisuta-baia-su-keisan-ki",
      ko: "tranjeiseuteo-baieoseu-gyesangi",
      es: "calculadora-polarizacion-transistores-punto-dc",
      fr: "calculateur-polarisation-transistor-point-dc",
      de: "transistor-bias-rechner-dc-arbeitspunkt",
      pt: "calculadora-polarizacao-transistores-ponto-cc",
      ru: "kalkulyator-smeshcheniya-tranzistora-rabochaya-tochka-dc"
    },
    titles: {
      en: "Transistor Biasing Calculator – DC Operating Point",
      "zh-CN": "晶体管偏置计算器 – 直流工作点",
      "zh-TW": "電晶體偏壓計算器 – 直流工作點",
      ja: "トランジスタバイアス計算機 – DC動作点",
      ko: "트랜지스터 바이어스 계산기 – DC 동작점",
      es: "Calculadora de polarización de transistores – punto DC",
      fr: "Calculateur de polarisation du transistor – point DC",
      de: "Transistor-Bias-Rechner – DC-Arbeitspunkt",
      pt: "Calculadora de polarização de transistores – ponto CC",
      ru: "Калькулятор смещения транзистора – рабочая точка DC"
    },
    descriptions: {
      en: "Calculate transistor DC operating point, collector current, voltage gain, and stability factor for voltage divider bias circuits. Ideal for amplifier design.",
      "zh-CN": "计算分压偏置晶体管电路的直流工作点、集电极电流、电压增益和稳定系数，适用于放大器设计。",
      "zh-TW": "計算分壓偏壓電晶體電路的直流工作點、集極電流、電壓增益與穩定係數，適用於放大器設計。",
      ja: "分圧バイアス回路のDC動作点、コレクタ電流、電圧利得、安定係数を計算します。増幅器設計に最適です。",
      ko: "분압 바이어스 트랜지스터 회로의 DC 동작점, 컬렉터 전류, 전압 이득, 안정 계수를 계산합니다. 증폭기 설계에 적합합니다.",
      es: "Calcula el punto de operación DC, la corriente de colector, la ganancia de voltaje y el factor de estabilidad en circuitos con divisor de tensión.",
      fr: "Calculez le point de fonctionnement DC, le courant collecteur, le gain en tension et le facteur de stabilité des circuits à pont diviseur.",
      de: "Berechnen Sie den DC-Arbeitspunkt, den Kollektorstrom, die Spannungsverstärkung und den Stabilitätsfaktor von Spannungsteiler-Bias-Schaltungen.",
      pt: "Calcule o ponto de operação CC, a corrente de coletor, o ganho de tensão e o fator de estabilidade em circuitos com divisor de tensão.",
      ru: "Рассчитайте рабочую точку DC, ток коллектора, коэффициент усиления по напряжению и коэффициент стабильности для схем с делителем напряжения."
    }
  },
  {
    id: "transmission-calculator",
    category: "physic",
    slugs: {
      en: "transmission-calculator",
      "zh-CN": "xinhao-chuanshu-jisuanqi",
      "zh-TW": "xinhao-chuanshu-jisuanqi",
      ja: "soshin-keisan-ki",
      ko: "jeonsong-gyesan-gi",
      es: "calculadora-transmision-senal",
      fr: "calculateur-transmission-puissance-signal",
      de: "uebertragung-rechner-signalleistung-datenrate",
      pt: "calculadora-transmissao-potencia-sinal",
      ru: "kalkulyator-peredachi-signala"
    },
    titles: {
      en: "Transmission Calculator – Signal Power and Data Rate",
      "zh-CN": "传输计算器：信号功率与数据速率",
      "zh-TW": "傳輸計算器：信號功率與資料速率",
      ja: "伝送計算機: 信号電力とデータレート",
      ko: "전송 계산기: 신호 전력과 데이터 속도",
      es: "Calculadora de transmisión: potencia y tasa",
      fr: "Calculateur de transmission : puissance et débit",
      de: "Übertragungsrechner: Signalleistung und Datenrate",
      pt: "Calculadora de transmissão: potência e taxa",
      ru: "Калькулятор передачи: мощность и скорость"
    },
    descriptions: {
      en: "Calculate free-space path loss, received signal power, SNR, Shannon capacity, and bandwidth efficiency for wireless and satellite communication links.",
      "zh-CN": "计算无线和卫星链路的自由空间路径损耗、接收信号功率、SNR、香农容量和带宽效率。",
      "zh-TW": "計算無線與衛星鏈路的自由空間路徑損耗、接收信號功率、SNR、香農容量與頻寬效率。",
      ja: "無線・衛星リンクの自由空間伝搬損失、受信電力、SNR、シャノン容量、帯域効率を計算します。",
      ko: "무선 및 위성 링크의 자유공간 경로 손실, 수신 전력, SNR, 샤논 용량, 대역폭 효율을 계산합니다.",
      es: "Calcula pérdida en espacio libre, potencia recibida, SNR, capacidad de Shannon y eficiencia de banda para enlaces inalámbricos y satelitales.",
      fr: "Calculez la perte en espace libre, la puissance reçue, le SNR, la capacité de Shannon et l'efficacité de bande pour les liaisons sans fil et satellite.",
      de: "Berechnen Sie Freiraumdämpfung, Empfangsleistung, SNR, Shannon-Kapazität und Bandbreiteneffizienz für Funk- und Satellitenverbindungen.",
      pt: "Calcule perda em espaço livre, potência recebida, SNR, capacidade de Shannon e eficiência de banda para enlaces sem fio e satelitais.",
      ru: "Рассчитайте потери в свободном пространстве, мощность на приёме, SNR, ёмкость Шеннона и эффективность полосы для беспроводных и спутниковых линий."
    }
  },
  {
    id: "thin-film-optical-coating-calculator",
    category: "physic",
    slugs: {
      en: "thin-film-optical-coating-calculator",
      "zh-CN": "bo-mo-guang-xue-du-mo-ji-suan-qi",
      "zh-TW": "bo-mo-guang-xue-du-mo-ji-suan-qi",
      ja: "hakumaku-kogaku-koto-keisanki",
      ko: "bakmak-gwanghak-koting-gyesangi",
      es: "calculadora-recubrimiento-optico-pelicula-delgada",
      fr: "calculateur-revetement-optique-couche-mince",
      de: "duennschicht-optik-beschichtung-rechner",
      pt: "calculadora-revestimento-optico-filme-fino",
      ru: "kalkulyator-tonkoplenochnogo-opticheskogo-pokrytiya"
    },
    titles: {
      en: "Thin Film Optical Coating Calculator – AR & HR",
      "zh-CN": "薄膜光学镀膜计算器 - AR 与 HR",
      "zh-TW": "薄膜光學鍍膜計算器 - AR 與 HR",
      ja: "薄膜光学コーティング計算機 - AR・HR",
      ko: "박막 광학 코팅 계산기 - AR 및 HR",
      es: "Calculadora de recubrimientos ópticos de película fina",
      fr: "Calculateur de revêtement optique en couche mince",
      de: "Dünnschicht-Optikbeschichtung Rechner",
      pt: "Calculadora de revestimento óptico de filme fino",
      ru: "Калькулятор тонкопленочных оптических покрытий"
    },
    descriptions: {
      en: "Calculate reflectance and transmittance of single-layer thin film coatings using Fresnel equations. Analyze AR and HR coatings for s- and p-polarizations.",
      "zh-CN": "用菲涅耳方程计算单层薄膜镀膜的反射率和透射率，分析 s、p 偏振下的 AR 与 HR 镀膜。",
      "zh-TW": "用菲涅耳方程計算單層薄膜鍍膜的反射率與透射率，分析 s、p 偏振下的 AR 與 HR 鍍膜。",
      ja: "フレネル方程式で単層薄膜コーティングの反射率と透過率を計算し、s・p偏光のAR/HRコーティングを解析します。",
      ko: "프레넬 방정식으로 단층 박막 코팅의 반사율과 투과율을 계산하고 s, p 편광의 AR/HR 코팅을 분석합니다.",
      es: "Calcula reflectancia y transmitancia de recubrimientos ópticos monocapa con ecuaciones de Fresnel para polarizaciones s y p.",
      fr: "Calculez réflectance et transmittance de revêtements monocouches avec les équations de Fresnel pour les polarisations s et p.",
      de: "Berechne Reflexion und Transmission von einschichtigen Dünnschicht-Beschichtungen mit Fresnel-Gleichungen für s- und p-Polarisation.",
      pt: "Calcule refletância e transmitância de revestimentos monocamada com equações de Fresnel para polarizações s e p.",
      ru: "Рассчитайте отражение и пропускание однослойных тонких пленок по уравнениям Френеля для s- и p-поляризаций."
    }
  },
  {
    id: "thin-lens-equation-calculator",
    category: "physic",
    slugs: {
      en: "thin-lens-equation-calculator",
      "zh-CN": "bao-shu-jing-gong-shi-ji-suan-qi",
      "zh-TW": "bao-shu-jing-gong-shi-ji-suan-qi",
      ja: "usui-renshiki-keisan-ki",
      ko: "bop-jeom-naengseu-gongshik-gyesan-gi",
      es: "calculadora-ecuacion-lente-delgada",
      fr: "calculatrice-equation-lentille-mince",
      de: "duenne-linse-gleichung-rechner",
      pt: "calculadora-equacao-lente-delgada",
      ru: "raschet-tonkoi-linzy"
    },
    titles: {
      en: "Thin Lens Equation Calculator – Focal Length",
      "zh-CN": "薄透镜公式计算器",
      "zh-TW": "薄透鏡公式計算器",
      ja: "薄レンズ式計算機",
      ko: "얇은 렌즈 공식 계산기",
      es: "Calculadora de ecuación de lente delgada",
      fr: "Calculatrice de l’équation des lentilles minces",
      de: "Rechner für die Dünnlinsengleichung",
      pt: "Calculadora da equação da lente delgada",
      ru: "Калькулятор формулы тонкой линзы"
    },
    descriptions: {
      en: "Solve the thin lens equation for focal length, object, or image distance. Find magnification and identify real, virtual, upright, or inverted images.",
      "zh-CN": "求解薄透镜公式中的焦距、物距或像距，并自动计算放大率和像的性质。",
      "zh-TW": "求解薄透鏡公式中的焦距、物距或像距，並自動計算放大率與像的性質。",
      ja: "焦点距離・物体距離・像距離を求め、倍率と像の種類も自動計算します。",
      ko: "초점거리, 물체거리, 상거리를 구하고 배율과 상의 성질도 자동 계산합니다.",
      es: "Resuelve la ecuación de la lente delgada para distancia focal, objeto o imagen, y calcula el aumento y el tipo de imagen.",
      fr: "Résolvez l’équation des lentilles minces pour la focale, l’objet ou l’image, et calculez le grandissement et le type d’image.",
      de: "Löst die Dünnlinsengleichung für Brennweite, Gegenstands- oder Bildweite und berechnet Vergrößerung und Bildart.",
      pt: "Resolva a equação da lente delgada para distância focal, objeto ou imagem, e calcule o aumento e o tipo de imagem.",
      ru: "Решайте уравнение тонкой линзы для фокусного расстояния, предметного или изображений расстояния, с вычислением увеличения и типа изображения."
    }
  },
  {
    id: "three-phase-calculator",
    category: "physic",
    slugs: {
      en: "three-phase-calculator",
      "zh-CN": "sanxiang-gonglv-jisuanqi",
      "zh-TW": "sanxiang-gonglu-jisuanqi",
      ja: "sansou-denryoku-keisanki",
      ko: "samsang-jeollyeok-gyesangi",
      es: "calculadora-potencia-trifasica",
      fr: "calculateur-puissance-triphasee",
      de: "drehstrom-leistungsrechner",
      pt: "calculadora-potencia-trifasica",
      ru: "kalkulyator-trehfaznoy-moshchnosti"
    },
    titles: {
      en: "Three Phase Power Calculator – Voltage & Current",
      "zh-CN": "三相功率计算器 - 电压与电流",
      "zh-TW": "三相功率計算器 - 電壓與電流",
      ja: "三相電力計算機 - 電圧と電流",
      ko: "3상 전력 계산기 - 전압 및 전류",
      es: "Calculadora de potencia trifásica",
      fr: "Calculateur de puissance triphasée",
      de: "Drehstrom-Leistungsrechner",
      pt: "Calculadora de potência trifásica",
      ru: "Калькулятор трехфазной мощности"
    },
    descriptions: {
      en: "Calculate three-phase apparent, active, and reactive power from voltage, current, and power factor. Essential tool for electrical engineers.",
      "zh-CN": "根据电压、电流和功率因数计算三相视在功率、有功功率和无功功率，是电气工程师必备工具。",
      "zh-TW": "依據電壓、電流和功率因數計算三相視在功率、有功功率與無功功率，是電機工程師必備工具。",
      ja: "電圧、電流、力率から三相の皮相電力、有効電力、無効電力を計算。電気技術者に不可欠なツールです。",
      ko: "전압, 전류, 역률로 3상 피상전력, 유효전력, 무효전력을 계산합니다. 전기 엔지니어를 위한 필수 도구입니다.",
      es: "Calcula potencia aparente, activa y reactiva trifásica a partir de tensión, corriente y factor de potencia. Herramienta esencial para ingenieros eléctricos.",
      fr: "Calculez les puissances apparente, active et réactive triphasées à partir de la tension, du courant et du facteur de puissance.",
      de: "Berechnen Sie Schein-, Wirk- und Blindleistung im Drehstrom aus Spannung, Strom und Leistungsfaktor. Ein wichtiges Tool für Elektroingenieure.",
      pt: "Calcule potência aparente, ativa e reativa trifásica a partir de tensão, corrente e fator de potência. Ferramenta essencial para engenheiros elétricos.",
      ru: "Рассчитайте полную, активную и реактивную трехфазную мощность по напряжению, току и коэффициенту мощности."
    }
  },
  {
    id: "thrust-to-weight-ratio-calculator",
    category: "physic",
    slugs: {
      en: "thrust-to-weight-ratio-calculator",
      "zh-CN": "tui-zhong-bi-ji-suan-qi",
      "zh-TW": "tui-zhong-bi-ji-suan-qi",
      ja: "suijuryokuhi-keisanki",
      ko: "chujungbi-gyesangi",
      es: "calculadora-relacion-empuje-peso",
      fr: "calculateur-rapport-poussee-poids",
      de: "schub-gewicht-verhaeltnis-rechner",
      pt: "calculadora-razao-empuxo-peso",
      ru: "kalkulyator-tyagovooruzhennosti"
    },
    titles: {
      en: "Thrust to Weight Ratio Calculator – Aerospace Performance",
      "zh-CN": "推重比计算器 - 航空航天性能",
      "zh-TW": "推重比計算器 - 航太性能",
      ja: "推力重量比計算機 - 航空宇宙性能",
      ko: "추중비 계산기 - 항공우주 성능",
      es: "Calculadora de relación empuje-peso",
      fr: "Calculateur de rapport poussée-poids",
      de: "Schub-Gewicht-Verhältnis-Rechner",
      pt: "Calculadora de razão empuxo-peso",
      ru: "Калькулятор тяговооружённости"
    },
    descriptions: {
      en: "Calculate thrust-to-weight ratio (TWR), net force, and net acceleration for rockets, aircraft, and drones. Instantly determine if your vehicle can lift off.",
      "zh-CN": "计算火箭、飞机和无人机的推重比、净力与净加速度，快速判断载具能否起飞。",
      "zh-TW": "計算火箭、飛機與無人機的推重比、淨力和淨加速度，立即判斷載具能否起飛。",
      ja: "ロケット、航空機、ドローンの推力重量比、正味力、正味加速度を計算し、離陸可能かすぐに判定します。",
      ko: "로켓, 항공기, 드론의 추중비, 순힘, 순가속도를 계산하고 이륙 가능 여부를 즉시 확인하세요.",
      es: "Calcula la relación empuje-peso, fuerza neta y aceleración neta de cohetes, aviones y drones para saber si pueden despegar.",
      fr: "Calculez le rapport poussée-poids, la force nette et l’accélération nette des fusées, avions et drones, et vérifiez le décollage.",
      de: "Berechnen Sie Schub-Gewicht-Verhältnis, Nettokraft und Nettobeschleunigung für Raketen, Flugzeuge und Drohnen.",
      pt: "Calcule a razão empuxo-peso, força líquida e aceleração líquida de foguetes, aeronaves e drones para saber se decolam.",
      ru: "Рассчитайте тяговооружённость, чистую силу и чистое ускорение ракет, самолётов и дронов и проверьте возможность взлёта."
    }
  },
  {
    id: "time-dilation-calculator",
    category: "physic",
    slugs: {
      en: "time-dilation-calculator",
      "zh-CN": "shijian-pengzhang-jisuanqi",
      "zh-TW": "shijian-pengzhang-jisuanqi",
      ja: "jikan-hiroga-ri-keisanki",
      ko: "sigan-jiyeon-gye-san-gi",
      es: "calculadora-dilatacion-tiempo",
      fr: "calculateur-dilatation-temps",
      de: "zeitdilatation-rechner",
      pt: "calculadora-dilatacao-tempo",
      ru: "kalkulyator-zamedleniya-vremeni"
    },
    titles: {
      en: "Time Dilation Calculator – Einstein's Special Relativity",
      "zh-CN": "时间膨胀计算器",
      "zh-TW": "時間膨脹計算器",
      ja: "時間の遅れ計算機",
      ko: "시간 지연 계산기",
      es: "Calculadora de dilatación del tiempo",
      fr: "Calculateur de dilatation du temps",
      de: "Zeitdilatationsrechner",
      pt: "Calculadora de dilatação do tempo",
      ru: "Калькулятор замедления времени"
    },
    descriptions: {
      en: "Calculate relativistic time dilation using Einstein's special relativity. Enter velocity and proper time to find dilated time and Lorentz factor.",
      "zh-CN": "使用爱因斯坦狭义相对论计算相对论时间膨胀。输入速度和固有时间，求出膨胀后的时间与洛伦兹因子。",
      "zh-TW": "使用愛因斯坦狹義相對論計算相對論時間膨脹。輸入速度與固有時間，求出膨脹後的時間與洛侖茲因子。",
      ja: "アインシュタインの特殊相対性理論で相対論的な時間の遅れを計算します。速度と固有時を入力して、遅れた時間とローレンツ因子を求めます。",
      ko: "아인슈타인의 특수상대성이론으로 상대론적 시간 지연을 계산합니다. 속도와 고유 시간을 입력해 늘어난 시간과 로렌츠 인자를 구하세요.",
      es: "Calcula la dilatación temporal relativista con la relatividad especial de Einstein. Introduce velocidad y tiempo propio para obtener el tiempo dilatado y el factor de Lorentz.",
      fr: "Calculez la dilatation temporelle relativiste avec la relativité restreinte d'Einstein. Saisissez la vitesse et le temps propre pour obtenir le temps dilaté et le facteur de Lorentz.",
      de: "Berechnen Sie die relativistische Zeitdilatation mit Einsteins spezieller Relativitätstheorie. Geben Sie Geschwindigkeit und Eigenzeit ein, um dilatierte Zeit und Lorentzfaktor zu erhalten.",
      pt: "Calcule a dilatação temporal relativística com a relatividade especial de Einstein. Informe a velocidade e o tempo próprio para obter o tempo dilatado e o fator de Lorentz.",
      ru: "Рассчитайте релятивистское замедление времени по специальной теории относительности Эйнштейна. Введите скорость и собственное время, чтобы получить дилатированное время и фактор Лоренца."
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
  },
  {
    id: "differential-pressure-calculator",
    category: "physic",
    slugs: {
      en: "differential-pressure-calculator",
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
      en: "Differential Pressure Calculator",
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
      en: "Calculate differential pressure across valves, filters, and pipes. Includes dynamic pressure from fluid density and flow velocity for HVAC and engineering.",
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
    id: "diffraction-grating-calculator",
    category: "physic",
    slugs: {
      en: "diffraction-grating-calculator",
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
      en: "Diffraction Grating Calculator – Angle, Wavelength & Spacing",
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
      en: "Calculate diffraction angle, wavelength, or grating spacing using d·sin(θ)=mλ. Supports any order and groove density for optics, spectroscopy, and physics.",
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
    id: "diopter-calculator",
    category: "physic",
    slugs: {
      en: "diopter-calculator",
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
      en: "Diopter Calculator – Lens Power & Focal Length Converter",
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
      en: "Convert focal length to diopters or diopters to focal length instantly. Supports m, cm, mm, inches and multi-lens combinations for optics and eyewear.",
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
    id: "dipole-calculator",
    category: "physic",
    slugs: {
      en: "dipole-calculator",
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
      en: "Dipole Antenna Calculator – Length, Wavelength & Impedance",
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
      en: "Calculate dipole antenna total length, arm size, and impedance for any frequency. Supports half-wave and quarter-wave designs with customisable velocity factor.",
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
    id: "dipole-moment-calculator",
    category: "physic",
    slugs: {
      en: "dipole-moment-calculator",
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
      en: "Dipole Moment Calculator – Electric Dipole Moment Online",
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
      en: "Calculate electric dipole moment from charge and separation in C·m and Debye. Shows x/y vector components for molecular polarity and electric field interaction.",
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
    id: "electric-field-calculator",
    category: "physic",
    slugs: {
      en: "electric-field-calculator",
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
      en: "Electric Field Calculator – E, Force & Potential",
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
      en: "Calculate electric field strength, electrostatic force, and electric potential with Coulomb's law. Useful for physics study, labs, and engineering checks.",
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
    id: "electric-motor-torque-calculator",
    category: "physic",
    slugs: {
      en: "electric-motor-torque-calculator",
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
      en: "Electric Motor Torque Calculator – Power, RPM & Torque",
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
      en: "Calculate electric motor torque from power and speed, or solve for power or RPM. Supports kW/Nm and HP/ft·lb for industrial and engineering applications.",
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
    id: "electric-potential-calculator",
    category: "physic",
    slugs: {
      en: "electric-potential-calculator",
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
      en: "Electric Potential Calculator – Charge & Distance",
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
      en: "Calculate electric potential, charge, or distance using V = kQ/r. Ideal for electrostatics, physics homework, and circuit voltage estimation.",
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
    id: "electrical-mobility-calculator",
    category: "physic",
    slugs: {
      en: "electrical-mobility-calculator",
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
      en: "Electrical Mobility Calculator – Drift Velocity & Field",
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
      en: "Calculate carrier mobility, drift velocity, or electric field using μ = v_d/E. Essential for semiconductor physics, device design, and materials research.",
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
    id: "electrical-power-calculator",
    category: "physic",
    slugs: {
      en: "electrical-power-calculator",
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
      en: "Electrical Power Calculator – P = VI, I²R, V²/R",
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
      en: "Calculate electrical power from voltage and current, voltage and resistance, or current and resistance. Covers all three power formulas for circuit design.",
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
    id: "effectiveness-ntu-calculator",
    category: "physic",
    slugs: {
      en: "effectiveness-ntu-calculator",
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
      en: "NTU Effectiveness Calculator – Heat Exchanger Analysis",
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
      en: "Calculate NTU and heat exchanger effectiveness from temperatures, flow rates, and UA. Analyze thermal performance and identify fouling in industrial systems.",
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
    id: "efficiency-calculator",
    category: "physic",
    slugs: {
      en: "efficiency-calculator",
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
      en: "Efficiency Calculator – Energy, Power & System Efficiency",
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
      en: "Calculate efficiency ratios, energy losses, and power conversion rates for motors, heat engines, and electrical systems. Compare results against design specs.",
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
    id: "eirp-calculator-effective-isotropic-radiated-power",
    category: "physic",
    slugs: {
      en: "eirp-calculator-effective-isotropic-radiated-power",
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
      en: "EIRP Calculator – Effective Isotropic Radiated Power",
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
      en: "Calculate EIRP from transmitter power, cable loss, and antenna gain for RF and satellite links. Returns dBm, dBW, and watts for regulatory and link-budget work.",
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
    id: "elastic-constants-calculator",
    category: "physic",
    slugs: {
      en: "elastic-constants-calculator",
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
      en: "Elastic Constants Calculator – Young's, Shear & Bulk Modulus",
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
      en: "Derive Young's modulus, shear modulus, bulk modulus and Poisson's ratio from any two elastic constants. Essential for material science and engineering.",
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
    id: "elastic-potential-energy-calculator",
    category: "physic",
    slugs: {
      en: "elastic-potential-energy-calculator",
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
      en: "Elastic Potential Energy Calculator – Spring Energy Formula",
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
      en: "Calculate elastic potential energy, spring constant, or displacement using U = ½kx². Solve any Hooke's Law spring variable for physics and engineering problems.",
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
    id: "delta-to-wye-conversion",
    category: "physic",
    slugs: {
      en: "delta-to-wye-conversion",
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
      en: "Delta to Wye Conversion Calculator – Resistor Network",
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
      en: "Convert Delta (Δ) and Wye (Y) resistor networks instantly. Enter three resistance values and get the equivalent configuration for circuit analysis and design.",
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
    id: "delta-v-calculator",
    category: "physic",
    slugs: {
      en: "delta-v-calculator",
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
      en: "Delta-V Calculator – Tsiolkovsky Rocket Equation",
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
      en: "Calculate delta-v using the Tsiolkovsky rocket equation. Enter initial mass, final mass, and exhaust velocity for orbital maneuver and mission planning.",
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
    id: "density-altitude-calculator",
    category: "physic",
    slugs: {
      en: "density-altitude-calculator",
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
      en: "Density Altitude Calculator – Aviation Performance Tool",
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
      en: "Calculate density altitude and air density from pressure altitude, temperature, and humidity. Essential aviation tool for aircraft performance planning.",
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
    id: "density-calculator",
    category: "physic",
    slugs: {
      en: "density-calculator",
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
      en: "Density Calculator – Mass, Volume and Density Formula",
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
      en: "Calculate density, mass, or volume using ρ = m/V. Supports multiple units for physics, chemistry, engineering, and material science applications.",
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
    id: "dew-point-calculator",
    category: "physic",
    slugs: {
      en: "dew-point-calculator",
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
      en: "Dew Point Calculator – Condensation & Humidity",
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
      en: "Calculate dew point temperature from air temperature and relative humidity using the Magnus formula. Essential for weather, HVAC, and condensation analysis.",
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
    id: "darcy-weisbach-calculator",
    category: "physic",
    slugs: {
      en: "darcy-weisbach-calculator",
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
      en: "Darcy-Weisbach Friction Loss Calculator for Pipe Flow",
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
      en: "Calculate pipe friction head loss, Reynolds number, and friction factor using the Darcy-Weisbach equation for hydraulic engineering and fluid mechanics.",
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
    id: "darcys-law-calculator",
    category: "physic",
    slugs: {
      en: "darcys-law-calculator",
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
      en: "Darcy's Law Calculator for Porous Media Flow Rate",
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
      en: "Calculate volumetric flow rate, Darcy velocity, and seepage velocity through porous media using Darcy's Law for groundwater and reservoir engineering.",
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
    id: "db-calculator",
    category: "physic",
    slugs: {
      en: "db-calculator",
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
      en: "Decibel (dB) Calculator – Convert Ratios and Combine Sources",
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
      en: "Convert power or amplitude ratios to dB, dB back to ratios, or combine multiple decibel sources. Covers acoustics, electronics, and signal processing formulas.",
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
    id: "db-gain-calculator",
    category: "physic",
    slugs: {
      en: "db-gain-calculator",
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
      en: "dB Gain Calculator for Power and Voltage Amplification",
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
      en: "Calculate dB gain between input and output, or find the unknown output or input from a specified gain. Supports power and voltage for RF design.",
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
    id: "de-broglie-wavelength-calculator",
    category: "physic",
    slugs: {
      en: "de-broglie-wavelength-calculator",
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
      en: "De Broglie Wavelength Calculator – Wave-Particle Duality",
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
      en: "Calculate the De Broglie wavelength from mass and velocity, kinetic energy, or momentum. Reveals wave-particle duality in nanometres and picometres.",
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
