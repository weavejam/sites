import type { ToolEntry } from "@/data/tools";

export const tools: ToolEntry[] = [
  {
    id: "acres-per-hour-calculator",
    category: "biology",
    slugs: {
      en: "acres-per-hour-calculator",
      "zh-CN": "yingmu-meixiaoshi-jisuanqi",
      "zh-TW": "yingmu-meixiaoshi-jisuanqi",
      ja: "1jikan-atari-ekaa-keisan",
      ko: "sigan-dang-eikeo-gyesangi",
      es: "calculadora-acres-por-hora",
      fr: "calculateur-acres-par-heure",
      de: "acres-pro-stunde-rechner",
      pt: "calculadora-acres-por-hora",
      ru: "kalkulyator-akrov-v-chas"
    },
    titles: {
      en: "Acres Per Hour Calculator - Field Work Rate",
      "zh-CN": "英亩每小时计算器 - 田间作业率",
      "zh-TW": "英畝每小時計算器 - 田間作業率",
      ja: "1時間あたりエーカー計算機 - 作業率",
      ko: "시간당 에이커 계산기 - 작업률",
      es: "Calculadora de acres por hora - ritmo de trabajo",
      fr: "Calculateur d'acres par heure - rendement de chantier",
      de: "Acres-pro-Stunde-Rechner - Arbeitsleistung",
      pt: "Calculadora de acres por hora - taxa de trabalho",
      ru: "Калькулятор акров в час - норма выработки"
    },
    descriptions: {
      en: "Calculate field work rate in acres or hectares per hour from area and time, or from machine width, speed, and efficiency. Free agricultural productivity tool.",
      "zh-CN": "根据面积和时间，或机器宽度、速度与作业效率，计算每小时英亩或公顷的田间作业率。",
      "zh-TW": "根據面積和時間，或機器寬度、速度與作業效率，計算每小時英畝或公頃的田間作業率。",
      ja: "面積と時間、または機械幅・速度・作業効率から、1時間あたりのエーカー数やヘクタール数を計算します。",
      ko: "면적과 시간, 또는 기계 폭·속도·작업 효율로 시간당 에이커나 헥타르 작업률을 계산합니다.",
      es: "Calcula el ritmo de trabajo en acres o hectáreas por hora a partir del área y el tiempo, o del ancho, la velocidad y la eficiencia.",
      fr: "Calculez le rendement de chantier en acres ou hectares par heure à partir de la surface et du temps, ou de la largeur, vitesse et efficacité.",
      de: "Berechnen Sie die Arbeitsleistung in Acres oder Hektar pro Stunde aus Fläche und Zeit oder aus Breite, Geschwindigkeit und Effizienz.",
      pt: "Calcule a taxa de trabalho em acres ou hectares por hora a partir da área e do tempo, ou da largura, velocidade e eficiência.",
      ru: "Рассчитайте норму выработки в акрах или гектарах в час по площади и времени либо по ширине, скорости и эффективности."
    }
  },
  {
    id: "allele-frequency-calculator",
    category: "biology",
    slugs: {
      en: "allele-frequency-calculator",
      "zh-CN": "dengweijiyinpinlvjisuanqi",
      "zh-TW": "dengweijiyinpinlvjisuanqi",
      ja: "tairitsu-idenshi-hindo-keisanki",
      ko: "daerip-yujeon-pinyul-gyesangi",
      es: "calculadora-frecuencia-alelica",
      fr: "calculateur-frequence-allelique",
      de: "allelfrequenz-rechner",
      pt: "calculadora-frequencia-alelica",
      ru: "kalkulyator-chastot-alleley"
    },
    titles: {
      en: "Allele Frequency Calculator - Hardy-Weinberg Tool",
      "zh-CN": "等位基因频率计算器 - 哈迪-温伯格工具",
      "zh-TW": "等位基因頻率計算器 - 哈迪-溫伯格工具",
      ja: "対立遺伝子頻度計算機 - ハーディ・ワインベルグ",
      ko: "대립유전자 빈도 계산기 - 하디바인베르크 도구",
      es: "Calculadora de frecuencia alélica",
      fr: "Calculateur de fréquence allélique",
      de: "Allelfrequenz-Rechner",
      pt: "Calculadora de frequência alélica",
      ru: "Калькулятор частот аллелей"
    },
    descriptions: {
      en: "Calculate allele frequencies (p, q), genotype frequencies, and Hardy-Weinberg equilibrium from genotype or allele counts. Free population genetics tool.",
      "zh-CN": "根据基因型或等位基因计数，计算 p、q、基因型频率和 Hardy-Weinberg 平衡。免费的群体遗传学工具。",
      "zh-TW": "根據基因型或等位基因計數，計算 p、q、基因型頻率和 Hardy-Weinberg 平衡。免費的族群遺傳學工具。",
      ja: "遺伝子型数または対立遺伝子数から p、q、遺伝子型頻度、Hardy-Weinberg 平衡を計算します。",
      ko: "유전자형 또는 대립유전자 수로 p, q, 유전자형 빈도와 Hardy-Weinberg 평형을 계산합니다.",
      es: "Calcula p, q, frecuencias genotípicas y equilibrio de Hardy-Weinberg a partir de genotipos o alelos.",
      fr: "Calcule p, q, les fréquences génotypiques et l’équilibre de Hardy-Weinberg à partir des génotypes ou des allèles.",
      de: "Berechnet p, q, Genotypfrequenzen und Hardy-Weinberg-Gleichgewicht aus Genotyp- oder Allelzählungen.",
      pt: "Calcula p, q, frequências genotípicas e equilíbrio de Hardy-Weinberg a partir de genótipos ou alelos.",
      ru: "Вычисляет p, q, частоты генотипов и равновесие Харди—Вайнберга по числам генотипов или аллелей."
    }
  },
  {
    id: "animal-mortality-rate-calculator",
    category: "biology",
    slugs: {
      en: "animal-mortality-rate-calculator",
      "zh-CN": "dongwu-siwanglv-jisuanqi",
      "zh-TW": "dongwu-siwanglv-jisuanqi",
      ja: "doubutsu-shibouritsu-keisanki",
      ko: "dongmul-pyesaryul-gyesan-gi",
      es: "calculadora-mortalidad-animal",
      fr: "calculateur-mortalite-animale",
      de: "tiersterblichkeitsrechner",
      pt: "calculadora-mortalidade-animal",
      ru: "kalkulyator-smertnosti-zhivotnykh"
    },
    titles: {
      en: "Animal Mortality Rate Calculator - Livestock Death Rate",
      "zh-CN": "动物死亡率计算器 - 畜禽死亡率",
      "zh-TW": "動物死亡率計算器 - 畜禽死亡率",
      ja: "動物死亡率計算機 - 家畜死亡率",
      ko: "동물 폐사율 계산기 - 가축 폐사율",
      es: "Calculadora de mortalidad animal - tasa de muerte",
      fr: "Calculateur de mortalité animale - taux de mortalité",
      de: "Tiersterblichkeitsrechner - Sterberate",
      pt: "Calculadora de mortalidade animal - taxa de morte",
      ru: "Калькулятор смертности животных - смертность скота"
    },
    descriptions: {
      en: "Calculate animal mortality rate and survival rate for livestock, poultry, or wildlife. Enter population and deaths for instant results and veterinary records.",
      "zh-CN": "计算畜禽、家禽或野生动物的死亡率和存活率。输入种群数量和死亡数即可立即得到结果并生成兽医记录。",
      "zh-TW": "計算畜禽、家禽或野生動物的死亡率與存活率。輸入族群數量與死亡數即可立即取得結果與獸醫紀錄。",
      ja: "家畜、家禽、野生動物の死亡率と生存率を計算します。頭数と死亡数を入力すると、すぐに結果と獣医記録用の情報が得られます。",
      ko: "가축, 가금류, 야생동물의 폐사율과 생존율을 계산합니다. 개체 수와 폐사 수를 입력하면 즉시 결과와 수의 기록을 얻을 수 있습니다.",
      es: "Calcula la mortalidad y la supervivencia de ganado, aves o fauna silvestre. Introduce población y muertes para ver resultados y registros veterinarios al instante.",
      fr: "Calculez la mortalité et le taux de survie du bétail, de la volaille ou de la faune sauvage. Saisissez la population et les décès pour des résultats instantanés.",
      de: "Berechnen Sie Sterblichkeit und Überlebensrate für Nutztiere, Geflügel oder Wildtiere. Population und Todesfälle eingeben für sofortige Ergebnisse.",
      pt: "Calcule a mortalidade e a taxa de sobrevivência de gado, aves ou fauna silvestre. Informe população e mortes para resultados e registros veterinários imediatos.",
      ru: "Рассчитайте смертность и выживаемость для скота, птицы или дикой природы. Введите численность и число смертей для мгновенного результата и ветеринарных записей."
    }
  },
  {
    id: "annealing-temperature-calculator",
    category: "biology",
    slugs: {
      en: "annealing-temperature-calculator",
      "zh-CN": "tuihuo-wendu-jisuanqi",
      "zh-TW": "tuohuo-wendu-jisuanqi",
      ja: "aniiringu-ondo-keisanki",
      ko: "eonilring-ondo-gyesangi",
      es: "calculadora-temperatura-anelamiento",
      fr: "calculateur-temperature-hybridation",
      de: "hybridisierungstemperatur-rechner",
      pt: "calculadora-temperatura-anelamento",
      ru: "kalkulyator-temperatury-otzhiga"
    },
    titles: {
      en: "Annealing Temperature Calculator - PCR Primer Tool",
      "zh-CN": "退火温度计算器",
      "zh-TW": "退火溫度計算器",
      ja: "アニーリング温度計算器",
      ko: "어닐링 온도 계산기",
      es: "Calculadora de temperatura de anillamiento",
      fr: "Calculateur de température d’hybridation",
      de: "Annealing-Temperatur-Rechner",
      pt: "Calculadora de temperatura de anelamento",
      ru: "Калькулятор температуры отжига"
    },
    descriptions: {
      en: "Calculate optimal PCR annealing temperature from primer sequences using Wallace rule, GC content, or nearest-neighbor method. Free online primer Tm calculator.",
      "zh-CN": "根据引物序列使用 Wallace 规则、GC 含量或最近邻法计算最佳 PCR 退火温度。",
      "zh-TW": "根據引子序列，使用 Wallace 規則、GC 含量或最近鄰法計算最佳 PCR 退火溫度。",
      ja: "プライマー配列から Wallace ルール、GC 含量、最近接法で最適な PCR アニーリング温度を計算します。",
      ko: "프라이머 서열로부터 Wallace 규칙, GC 함량, 최근접법으로 최적의 PCR 어닐링 온도를 계산합니다.",
      es: "Calcula la temperatura óptima de anillamiento PCR a partir de secuencias de cebadores con regla de Wallace, contenido GC o método vecino más cercano.",
      fr: "Calculez la température d’hybridation PCR optimale à partir de séquences d’amorces avec la règle de Wallace, le contenu GC ou la méthode du voisin le plus proche.",
      de: "Berechnen Sie die optimale PCR-Annealing-Temperatur aus Primersequenzen mit Wallace-Regel, GC-Gehalt oder Nachbarpaar-Methode.",
      pt: "Calcule a temperatura ideal de anelamento de PCR a partir de sequências de primers usando regra de Wallace, conteúdo GC ou método do vizinho mais próximo.",
      ru: "Рассчитайте оптимальную температуру отжига PCR по последовательности праймеров с помощью правила Уоллеса, GC-содержания или метода ближайших соседей."
    }
  },
  {
    id: "basal-area-calculator",
    category: "biology",
    slugs: {
      en: "basal-area-calculator",
      "zh-CN": "shumujixiongduanmianji-jisuanqi",
      "zh-TW": "shumu-xionggaoduanmianji-jisuanqi",
      ja: "kyokudan-menseki-keisanki",
      ko: "hyunggo-danmyeonjeok-gyesangi",
      es: "calculadora-area-basal",
      fr: "calculateur-surface-terriere",
      de: "grundflaechen-rechner",
      pt: "calculadora-area-basal",
      ru: "kalkulyator-bazalnoy-ploshchadi"
    },
    titles: {
      en: "Basal Area Calculator - Tree DBH to BA Forestry Tool",
      "zh-CN": "胸高直径转胸高断面积计算器",
      "zh-TW": "胸高直徑轉胸高斷面積計算器",
      ja: "胸高直径から胸高断面積を計算",
      ko: "흉고직경으로 흉고단면적 계산",
      es: "Calculadora de área basal desde DAP",
      fr: "Calculateur de surface terrière depuis le DHP",
      de: "Grundflächenrechner aus Brusthöhendurchmesser",
      pt: "Calculadora de área basal por DAP",
      ru: "Калькулятор базальной площади по DBH"
    },
    descriptions: {
      en: "Calculate tree basal area (BA) from DBH in cm or inches. Supports multiple trees and plot-based BA per hectare or acre for forestry and ecology surveys.",
      "zh-CN": "根据厘米或英寸 DBH 计算树木胸高断面积（BA），支持多株树及按样地换算每公顷或每英亩 BA。",
      "zh-TW": "依厘米或英寸 DBH 計算樹木胸高斷面積（BA），支援多株樹及按樣區換算每公頃或每英畝 BA。",
      ja: "cm またはインチの DBH から樹木の胸高断面積（BA）を計算。複数木とプロット単位の ha・acre 換算に対応。",
      ko: "cm 또는 inch 단위 DBH로 나무 흉고단면적(BA)을 계산합니다. 여러 나무와 조사구 기준 ha·acre당 BA를 지원합니다.",
      es: "Calcula el área basal (BA) de árboles desde DAP en cm o pulgadas. Admite varios árboles y BA por hectárea o acre en parcelas.",
      fr: "Calculez la surface terrière (BA) à partir du DHP en cm ou pouces. Plusieurs arbres et BA par hectare ou acre pour placettes.",
      de: "Berechnet die Baumgrundfläche (BA) aus BHD in cm oder Zoll. Für mehrere Bäume und BA je Hektar oder Acre auf Probeflächen.",
      pt: "Calcule a área basal (BA) de árvores a partir do DAP em cm ou polegadas. Suporta várias árvores e BA por hectare ou acre.",
      ru: "Рассчитайте базальную площадь (BA) дерева по DBH в см или дюймах. Поддерживает несколько деревьев и BA на гектар или акр."
    }
  }
];
