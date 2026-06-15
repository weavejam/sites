import type { ToolEntry } from "@/data/tools";

export const tools: ToolEntry[] = [
  {
    id: "acres-per-hour-calculator",
    category: "biology",
    slugs: {
      en: "acres-per-hour-calculator",
      "zh-CN": "mei-xiao-shi-ying-mu-ji-suan-qi",
      "zh-TW": "mei-xiao-shi-ying-mu-ji-suan-qi",
      ja: "ichijikan-atari-sagyouritsu-keisanki",
      ko: "sigan-dang-jag-eob-ryul-gyesangi",
      es: "calculadora-rendimiento-por-hora",
      fr: "calculateur-rendement-horaire",
      de: "flaechenleistung-pro-stunde-rechner",
      pt: "calculadora-produtividade-por-hora",
      ru: "kalkulyator-proizvoditelnosti-v-chas"
    },
    titles: {
      en: "Acres Per Hour Calculator - Field Work Rate",
      "zh-CN": "每小时英亩计算器 - 田间作业率",
      "zh-TW": "每小時英畝計算器 - 田間作業率",
      ja: "1時間あたり作業率計算機",
      ko: "시간당 작업률 계산기",
      es: "Calculadora de rendimiento por hora",
      fr: "Calculateur de rendement horaire",
      de: "Flächenleistung pro Stunde Rechner",
      pt: "Calculadora de produtividade por hora",
      ru: "Калькулятор производительности в час"
    },
    descriptions: {
      en: "Calculate field work rate in acres or hectares per hour from area and time, or from machine width, speed, and efficiency. Free agricultural productivity tool.",
      "zh-CN": "使用面积和时间，或机器宽度、速度和田间效率，计算每小时英亩或公顷作业率。",
      "zh-TW": "使用面積和時間，或機具寬度、速度與田間效率，計算每小時英畝或公頃作業率。",
      ja: "面積と時間、または機械幅・速度・作業効率から、1時間あたりの作業率を計算します。",
      ko: "면적과 시간, 또는 장비 폭·속도·작업 효율로 시간당 작업률을 계산합니다.",
      es: "Calcula el rendimiento de campo en acres o hectáreas por hora a partir del área y el tiempo, o del ancho, la velocidad y la eficiencia.",
      fr: "Calculez le rendement de chantier en acres ou hectares par heure à partir de la surface et du temps, ou de la largeur, vitesse et efficacité.",
      de: "Berechne die Feldarbeitsrate in Acres oder Hektar pro Stunde anhand von Fläche und Zeit oder Maschinenbreite, Geschwindigkeit und Effizienz.",
      pt: "Calcule a produtividade de campo em acres ou hectares por hora a partir da área e do tempo, ou da largura, velocidade e eficiência.",
      ru: "Рассчитайте полевую производительность в акрах или гектарах в час по площади и времени либо по ширине, скорости и эффективности машины."
    }
  },
  {
    id: "allele-frequency-calculator",
    category: "biology",
    slugs: {
      en: "allele-frequency-calculator",
      "zh-CN": "dengwei-jiyin-pinlv-jisuanqi",
      "zh-TW": "dengwei-jiyin-pinlv-jisuanqi",
      ja: "tairitsu-idenshi-hindo-keisanki",
      ko: "daerip-yujeonja-bindo-gyesangi",
      es: "calculadora-frecuencia-alelica",
      fr: "calculateur-frequence-allelique",
      de: "allelfrequenz-rechner",
      pt: "calculadora-frequencia-alelica",
      ru: "kalkulyator-chastoty-alleley"
    },
    titles: {
      en: "Allele Frequency Calculator - Hardy-Weinberg Tool",
      "zh-CN": "等位基因频率计算器",
      "zh-TW": "等位基因頻率計算器",
      ja: "対立遺伝子頻度計算器",
      ko: "대립유전자 빈도 계산기",
      es: "Calculadora de frecuencia alélica",
      fr: "Calculateur de fréquence allélique",
      de: "Allelfrequenz-Rechner",
      pt: "Calculadora de frequência alélica",
      ru: "Калькулятор частоты аллелей"
    },
    descriptions: {
      en: "Calculate allele frequencies (p, q), genotype frequencies, and Hardy-Weinberg equilibrium from genotype or allele counts. Free population genetics tool.",
      "zh-CN": "根据基因型或等位基因计数计算 p、q、基因型频率和 Hardy-Weinberg 平衡。免费的群体遗传学工具。",
      "zh-TW": "根據基因型或等位基因計數計算 p、q、基因型頻率與 Hardy-Weinberg 平衡。免費的族群遺傳學工具。",
      ja: "遺伝子型または対立遺伝子数から p、q、遺伝子型頻度、Hardy-Weinberg 平衡を計算します。無料の集団遺伝学ツール。",
      ko: "유전자형 또는 대립유전자 수로 p, q, 유전자형 빈도와 Hardy-Weinberg 평형을 계산합니다. 무료 집단유전학 도구.",
      es: "Calcula p, q, frecuencias genotípicas y equilibrio de Hardy-Weinberg a partir de genotipos o alelos. Herramienta gratuita de genética de poblaciones.",
      fr: "Calculez p, q, les fréquences génotypiques et l’équilibre de Hardy-Weinberg à partir des génotypes ou des allèles. Outil gratuit de génétique des populations.",
      de: "Berechnen Sie p, q, Genotypfrequenzen und das Hardy-Weinberg-Gleichgewicht aus Genotyp- oder Allelzahlen. Kostenloses Populationsgenetik-Tool.",
      pt: "Calcule p, q, frequências genotípicas e equilíbrio de Hardy-Weinberg a partir de genótipos ou alelos. Ferramenta grátis de genética de populações.",
      ru: "Рассчитайте p, q, частоты генотипов и равновесие Харди—Вайнберга по числу генотипов или аллелей. Бесплатный инструмент популяционной генетики."
    }
  },
  {
    id: "animal-mortality-rate-calculator",
    category: "biology",
    slugs: {
      en: "animal-mortality-rate-calculator",
      "zh-CN": "dongwu-siwanglv-jisuanqi",
      "zh-TW": "dongwu-siwanglv-jisuanqi",
      ja: "dobutsu-shiboritsu-keisanki",
      ko: "dongmul-samangnyul-gyesangi",
      es: "calculadora-tasa-mortalidad-animal",
      fr: "calculateur-taux-mortalite-animale",
      de: "tiersterblichkeitsrate-rechner",
      pt: "calculadora-taxa-mortalidade-animal",
      ru: "kalkulyator-smertnosti-zhivotnyh"
    },
    titles: {
      en: "Animal Mortality Rate Calculator - Livestock Death Rate",
      "zh-CN": "动物死亡率计算器 - 畜牧死亡率",
      "zh-TW": "動物死亡率計算器 - 牲畜死亡率",
      ja: "動物死亡率計算機 - 家畜の死亡率",
      ko: "동물 사망률 계산기 - 가축 폐사율",
      es: "Calculadora de mortalidad animal - Tasa ganadera",
      fr: "Calculateur de mortalité animale - Taux d'élevage",
      de: "Tiersterblichkeitsrate-Rechner - Nutztierverluste",
      pt: "Calculadora de mortalidade animal - Pecuária",
      ru: "Калькулятор смертности животных - Падёж скота"
    },
    descriptions: {
      en: "Calculate animal mortality rate and survival rate for livestock, poultry, or wildlife. Enter population and deaths for instant results and veterinary records.",
      "zh-CN": "计算畜禽或野生动物的死亡率和存活率。输入种群数量与死亡数，即时获得结果并生成兽医记录。",
      "zh-TW": "計算牲畜、家禽或野生動物的死亡率與存活率。輸入族群數量與死亡數，即時取得結果並建立獸醫紀錄。",
      ja: "家畜、家禽、野生動物の死亡率と生存率を計算。個体数と死亡数を入力すると、獣医記録向けの結果を即時表示します。",
      ko: "가축, 가금류, 야생동물의 사망률과 생존율을 계산하세요. 개체 수와 폐사 수를 입력하면 수의 기록용 결과를 즉시 확인할 수 있습니다.",
      es: "Calcula la mortalidad y supervivencia de ganado, aves o fauna silvestre. Ingresa población y muertes para obtener resultados y registros veterinarios.",
      fr: "Calculez la mortalité et la survie du bétail, des volailles ou de la faune. Entrez population et décès pour des résultats et dossiers vétérinaires.",
      de: "Berechnen Sie Mortalitäts- und Überlebensrate für Nutztiere, Geflügel oder Wildtiere. Population und Todesfälle eingeben, sofort Ergebnisse erhalten.",
      pt: "Calcule mortalidade e sobrevivência de rebanhos, aves ou fauna silvestre. Informe população e mortes para resultados e registros veterinários.",
      ru: "Рассчитайте смертность и выживаемость скота, птицы или диких животных. Введите численность и падёж для мгновенных ветеринарных записей."
    }
  },
  {
    id: "annealing-temperature-calculator",
    category: "biology",
    slugs: {
      en: "annealing-temperature-calculator",
      "zh-CN": "pcr-tuihuo-wendu-jisuanqi",
      "zh-TW": "pcr-tuihuo-wendu-jisuanqi",
      ja: "pcr-annealing-ondo-keisanki",
      ko: "pcr-eoniling-ondo-gyesangi",
      es: "calculadora-temperatura-annealing-pcr",
      fr: "calculateur-temperature-hybridation-pcr",
      de: "pcr-annealing-temperatur-rechner",
      pt: "calculadora-temperatura-anelamento-pcr",
      ru: "kalkulyator-temperatury-otzhiga-pcr"
    },
    titles: {
      en: "Annealing Temperature Calculator - PCR Primer Tool",
      "zh-CN": "PCR退火温度计算器",
      "zh-TW": "PCR退火溫度計算器",
      ja: "PCRアニーリング温度計算機",
      ko: "PCR 어닐링 온도 계산기",
      es: "Calculadora de temperatura de annealing PCR",
      fr: "Calculateur de température d’hybridation PCR",
      de: "PCR-Annealing-Temperatur-Rechner",
      pt: "Calculadora de temperatura de anelamento PCR",
      ru: "Калькулятор температуры отжига ПЦР"
    },
    descriptions: {
      en: "Calculate optimal PCR annealing temperature from primer sequences using Wallace rule, GC content, or nearest-neighbor method. Free online primer Tm calculator.",
      "zh-CN": "根据引物序列用Wallace规则、GC含量或最近邻法计算最佳PCR退火温度。免费的在线引物Tm计算器。",
      "zh-TW": "依引子序列用Wallace規則、GC含量或最近鄰法計算最佳PCR退火溫度。免費線上引子Tm計算器。",
      ja: "プライマー配列からWallace則、GC含量、最近接塩基対法で最適なPCRアニーリング温度を計算。無料のTm計算機。",
      ko: "프라이머 서열로 Wallace 법칙, GC 함량, 최근접 이웃법을 사용해 최적 PCR 어닐링 온도를 계산합니다. 무료 Tm 계산기.",
      es: "Calcula la temperatura óptima de annealing PCR desde secuencias de cebadores con Wallace, contenido GC o vecinos más cercanos.",
      fr: "Calculez la température d’hybridation PCR optimale depuis des amorces avec Wallace, teneur en GC ou méthode nearest-neighbor.",
      de: "Berechnen Sie die optimale PCR-Annealing-Temperatur aus Primersequenzen mit Wallace-Regel, GC-Gehalt oder Nearest-Neighbor-Methode.",
      pt: "Calcule a temperatura ideal de anelamento PCR a partir de primers com Wallace, teor de GC ou método de vizinhos mais próximos.",
      ru: "Рассчитайте оптимальную температуру отжига ПЦР по праймерам методом Wallace, GC-содержания или ближайших соседей."
    }
  },
  {
    id: "basal-area-calculator",
    category: "biology",
    slugs: {
      en: "basal-area-calculator",
      "zh-CN": "xionggao-duanmianji-jisuanqi",
      "zh-TW": "xionggao-duanmianji-jisuanqi",
      ja: "kyokodanmenseki-keisanki",
      ko: "hyunggo-danmyeonjeok-gyesangi",
      es: "calculadora-area-basal",
      fr: "calculateur-surface-terriere",
      de: "grundflaechen-rechner",
      pt: "calculadora-area-basal",
      ru: "kalkulyator-bazalnoy-ploshchadi"
    },
    titles: {
      en: "Basal Area Calculator - Tree DBH to BA Forestry Tool",
      "zh-CN": "胸高断面积计算器 - DBH转BA工具",
      "zh-TW": "胸高斷面積計算器 - DBH轉BA工具",
      ja: "胸高断面積計算機 - DBHからBAを算出",
      ko: "흉고단면적 계산기 - DBH로 BA 계산",
      es: "Calculadora de área basal - DBH a BA",
      fr: "Calculateur de surface terrière - DBH vers BA",
      de: "Grundflächenrechner - DBH zu BA",
      pt: "Calculadora de área basal - DBH para BA",
      ru: "Калькулятор базальной площади - DBH в BA"
    },
    descriptions: {
      en: "Calculate tree basal area (BA) from DBH in cm or inches. Supports multiple trees and plot-based BA per hectare or acre for forestry and ecology surveys.",
      "zh-CN": "根据厘米或英寸DBH计算树木胸高断面积（BA），支持多株树以及样地按公顷或英亩换算。",
      "zh-TW": "根據公分或英吋DBH計算樹木胸高斷面積（BA），支援多株樹以及樣地按公頃或英畝換算。",
      ja: "cmまたはインチのDBHから樹木の胸高断面積（BA）を計算。複数木やプロット単位のha・acre換算にも対応。",
      ko: "cm 또는 인치 DBH로 나무의 흉고단면적(BA)을 계산합니다. 여러 나무와 조사구 기준 ha·acre당 BA를 지원합니다.",
      es: "Calcula el área basal (BA) de árboles a partir del DBH en cm o pulgadas. Admite varios árboles y BA por hectárea o acre en parcelas.",
      fr: "Calculez la surface terrière (BA) des arbres à partir du DBH en cm ou en pouces. Plusieurs arbres et BA par hectare ou acre en placette pris en charge.",
      de: "Berechnen Sie die Baumgrundfläche (BA) aus DBH in cm oder Zoll. Für mehrere Bäume und BA je Hektar oder Acre auf Probeflächen.",
      pt: "Calcule a área basal (BA) de árvores a partir do DBH em cm ou polegadas. Suporta várias árvores e BA por hectare ou acre em parcelas.",
      ru: "Рассчитайте базальную площадь (BA) деревьев по DBH в см или дюймах. Поддерживаются несколько деревьев и BA на гектар или акр для пробных площадок."
    }
  }
];
