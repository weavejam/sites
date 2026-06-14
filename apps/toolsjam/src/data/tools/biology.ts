import type { ToolEntry } from "@/data/tools";

export const tools: ToolEntry[] = [
  {
    id: "acres-per-hour-calculator",
    category: "biology",
    slugs: {
      en: "acres-per-hour-calculator",
      "zh-CN": "tian-zuo-ye-su-lv-ji-suan-qi",
      "zh-TW": "tian-zuo-ye-su-lv-ji-suan-qi",
      ja: "hojo-sagyo-ritsu-keisan-ki",
      ko: "nong-jageob-sigandang-jageopryul-gyesangi",
      es: "calculadora-rendimiento-horario-campo",
      fr: "calculatrice-rendement-horaire-champ",
      de: "feldarbeitsrate-rechner",
      pt: "calculadora-rendimento-horario-campo",
      ru: "kalkulyator-ploshchadi-v-chas"
    },
    titles: {
      en: "Acres Per Hour Calculator - Field Work Rate",
      "zh-CN": "亩每小时计算器 - 田间作业效率",
      "zh-TW": "英畝每小時計算器 - 田間作業效率",
      ja: "アール毎時計算機 - 圃場作業率",
      ko: "에이커/시간 계산기 - 작업률",
      es: "Calculadora de acres por hora - rendimiento de campo",
      fr: "Calculateur d’acres par heure - rendement de chantier",
      de: "Acres-pro-Stunde-Rechner - Feldarbeitsrate",
      pt: "Calculadora de acres por hora - taxa de trabalho",
      ru: "Калькулятор акров в час - производительность поля"
    },
    descriptions: {
      en: "Calculate field work rate in acres or hectares per hour from area and time, or from machine width, speed, and efficiency. Free agricultural productivity tool.",
      "zh-CN": "根据面积和时间，或按机具宽度、速度与作业效率，计算每小时亩数或公顷数。免费的农业生产率工具。",
      "zh-TW": "根據面積與時間，或依機具寬度、速度與作業效率，計算每小時英畝或公頃。免費農業生產力工具。",
      ja: "面積と時間、または機幅・速度・作業効率から、1時間あたりの面積を計算。無料の農業生産性ツール。",
      ko: "면적과 시간, 또는 기계 폭·속도·효율로 시간당 에이커나 헥타르를 계산합니다. 무료 농업 생산성 도구.",
      es: "Calcula el rendimiento de campo en acres o hectáreas por hora, por área y tiempo, o por ancho, velocidad y eficiencia. Herramienta gratis.",
      fr: "Calculez le rendement de chantier en acres ou hectares par heure, à partir de la surface et du temps, ou de la largeur, vitesse et efficacité. Outil gratuit.",
      de: "Berechnen Sie die Feldarbeitsrate in Acres oder Hektar pro Stunde aus Fläche und Zeit oder aus Breite, Geschwindigkeit und Effizienz. Kostenloses Tool.",
      pt: "Calcule a taxa de trabalho em acres ou hectares por hora a partir da área e do tempo, ou da largura, velocidade e eficiência. Ferramenta agrícola grátis.",
      ru: "Рассчитайте производительность поля в акрах или гектарах в час по площади и времени или по ширине, скорости и эффективности. Бесплатный инструмент."
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
      ko: "daerip-yujeonja-pindo-gyesangi",
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
      ja: "対立遺伝子頻度計算機",
      ko: "대립유전자 빈도 계산기",
      es: "Calculadora de frecuencia alélica",
      fr: "Calculateur de fréquence allélique",
      de: "Allelfrequenz-Rechner",
      pt: "Calculadora de frequência alélica",
      ru: "Калькулятор частоты аллелей"
    },
    descriptions: {
      en: "Calculate allele frequencies (p, q), genotype frequencies, and Hardy-Weinberg equilibrium from genotype or allele counts. Free population genetics tool.",
      "zh-CN": "根据基因型或等位基因计数计算 p、q、基因型频率，并进行 Hardy-Weinberg 平衡检验。",
      "zh-TW": "依基因型或等位基因計數計算 p、q、基因型頻率，並進行 Hardy-Weinberg 平衡檢定。",
      ja: "遺伝子型数または対立遺伝子数から p、q、遺伝子型頻度、Hardy-Weinberg 平衡を計算します。",
      ko: "유전자형 또는 대립유전자 수로 p, q, 유전자형 빈도와 Hardy-Weinberg 평형을 계산합니다.",
      es: "Calcula p, q, frecuencias genotípicas y equilibrio de Hardy-Weinberg a partir de genotipos o alelos.",
      fr: "Calculez p, q, les fréquences génotypiques et l’équilibre de Hardy-Weinberg à partir des génotypes ou des allèles.",
      de: "Berechnen Sie p, q, Genotypfrequenzen und das Hardy-Weinberg-Gleichgewicht aus Genotyp- oder Allelzählern.",
      pt: "Calcule p, q, frequências genotípicas e equilíbrio de Hardy-Weinberg a partir de genótipos ou alelos.",
      ru: "Рассчитайте p, q, частоты генотипов и равновесие Харди—Вайнберга по генотипам или числу аллелей."
    }
  },
  {
    id: "animal-mortality-rate-calculator",
    category: "biology",
    slugs: {
      en: "animal-mortality-rate-calculator",
      "zh-CN": "dongwu-siwanglu-jiqi",
      "zh-TW": "dongwu-siwanglu-jiqi",
      ja: "dobutsu-shibouritsu-keisan",
      ko: "dongmul-siwangryul-gyesan-gi",
      es: "calculadora-tasa-mortalidad-animal",
      fr: "calculateur-taux-mortalite-animale",
      de: "tier-sterblichkeitsrechner",
      pt: "calculadora-taxa-mortalidade-animal",
      ru: "kalkulyator-smertnosti-zhivotnykh"
    },
    titles: {
      en: "Animal Mortality Rate Calculator - Livestock Death Rate",
      "zh-CN": "动物死亡率计算器",
      "zh-TW": "動物死亡率計算機",
      ja: "動物死亡率計算機",
      ko: "동물 사망률 계산기",
      es: "Calculadora de tasa de mortalidad animal",
      fr: "Calculateur de taux de mortalité animale",
      de: "Tier-Sterblichkeitsrechner",
      pt: "Calculadora de taxa de mortalidade animal",
      ru: "Калькулятор смертности животных"
    },
    descriptions: {
      en: "Calculate animal mortality rate and survival rate for livestock, poultry, or wildlife. Enter population and deaths for instant results and veterinary records.",
      "zh-CN": "计算畜禽或野生动物的死亡率和存活率。输入总数量与死亡数，即可获得结果并记录兽医档案。",
      "zh-TW": "計算畜禽或野生動物的死亡率與存活率。輸入總數與死亡數，即可取得結果並建立獸醫紀錄。",
      ja: "家畜・家禽・野生動物の死亡率と生存率を計算。総数と死亡数を入力すると、結果と獣医記録をすぐに確認できます。",
      ko: "가축·가금·야생동물의 사망률과 생존율을 계산하세요. 총 개체수와 사망 수를 입력하면 결과와 수의 기록을 바로 확인할 수 있습니다.",
      es: "Calcula la tasa de mortalidad y supervivencia de ganado, aves o fauna silvestre. Ingresa población y muertes para ver resultados y registros.",
      fr: "Calculez le taux de mortalité et de survie du bétail, de la volaille ou de la faune. Saisissez la population et les décès pour des résultats instantanés.",
      de: "Berechnen Sie Sterblichkeits- und Überlebensrate für Nutztiere, Geflügel oder Wildtiere. Population und Todesfälle eingeben für sofortige Ergebnisse.",
      pt: "Calcule a taxa de mortalidade e de sobrevivência para rebanhos, aves ou fauna silvestre. Insira população e mortes para resultados instantâneos.",
      ru: "Рассчитайте смертность и выживаемость для скота, птицы или диких животных. Введите поголовье и число падежа для мгновенного результата."
    }
  },
  {
    id: "annealing-temperature-calculator",
    category: "biology",
    slugs: {
      en: "annealing-temperature-calculator",
      "zh-CN": "pcr-tuorai-wendu-jisuanqi",
      "zh-TW": "pcr-tuorai-wendu-ji-suan-qi",
      ja: "pcr-primer-shijo-ondo-keisanki",
      ko: "pcr-peurimai-ondo-gye-sangi",
      es: "calculadora-temperatura-annealing-pcr",
      fr: "calculateur-temperature-annealing-pcr",
      de: "pcr-annealing-temperatur-rechner",
      pt: "calculadora-temperatura-anelamento-pcr",
      ru: "kalkulyator-temperatury-otzhiga-pcr-primera"
    },
    titles: {
      en: "Annealing Temperature Calculator - PCR Primer Tool",
      "zh-CN": "PCR退火温度计算器",
      "zh-TW": "PCR退火溫度計算器",
      ja: "PCRアニーリング温度計算機",
      ko: "PCR 어닐링 온도 계산기",
      es: "Calculadora de temperatura de alineamiento PCR",
      fr: "Calculateur de température d’hybridation PCR",
      de: "PCR-Annealing-Temperatur-Rechner",
      pt: "Calculadora de temperatura de anelamento PCR",
      ru: "Калькулятор температуры отжига ПЦР"
    },
    descriptions: {
      en: "Calculate optimal PCR annealing temperature from primer sequences using Wallace rule, GC content, or nearest-neighbor method. Free online primer Tm calculator.",
      "zh-CN": "根据引物序列计算最佳PCR退火温度，支持Wallace规则、GC含量和最近邻方法。",
      "zh-TW": "根據引子序列計算最佳PCR退火溫度，支援Wallace規則、GC含量與最近鄰方法。",
      ja: "プライマー配列から最適なPCRアニーリング温度を、Wallace則、GC含量、最近接法で計算します。",
      ko: "프라이머 서열로 최적 PCR 어닐링 온도를 Wallace 규칙, GC 함량, 최근접법으로 계산합니다.",
      es: "Calcula la temperatura óptima de alineamiento PCR desde secuencias de cebadores con Wallace, contenido GC o vecino más cercano.",
      fr: "Calculez la température d’hybridation PCR optimale à partir des séquences d’amorces avec Wallace, GC ou voisin le plus proche.",
      de: "Berechnen Sie die optimale PCR-Annealing-Temperatur aus Primersequenzen mit Wallace-Regel, GC-Gehalt oder Nachbarpaar-Methode.",
      pt: "Calcule a temperatura ideal de anelamento PCR a partir de sequências de primers com Wallace, conteúdo GC ou vizinho mais próximo.",
      ru: "Рассчитайте оптимальную температуру отжига ПЦР по последовательностям праймеров с помощью правила Уоллеса, GC или метода ближайших соседей."
    }
  },
  {
    id: "basal-area-calculator",
    category: "biology",
    slugs: {
      en: "basal-area-calculator",
      "zh-CN": "xiong-gao-duan-mian-ji-ji-suan-qi",
      "zh-TW": "xiong-gao-duan-mian-ji-ji-suan-qi",
      ja: "xionggao-danmensekisakuteiki",
      ko: "hyunggo-danmyeonjeok-gyesangi",
      es: "calculadora-area-basal-arboles",
      fr: "calculateur-surface-terriere-arbres",
      de: "basalflaechenrechner-baum-dbh",
      pt: "calculadora-area-basal-arvores",
      ru: "kalkulyator-ploshchadi-secheniya-dbh-derevev"
    },
    titles: {
      en: "Basal Area Calculator - Tree DBH to BA Forestry Tool",
      "zh-CN": "胸高断面积计算器 - 树木胸径转BA",
      "zh-TW": "胸高斷面積計算器 - 樹木胸徑轉BA",
      ja: "胸高断面積計算機 - 樹木DBHからBA",
      ko: "흉고단면적 계산기 - 수목 DBH를 BA로",
      es: "Calculadora de área basal - DBH de árboles",
      fr: "Calculateur de surface terrière - DBH d’arbre",
      de: "Basalflächen-Rechner - Baum-DBH zu BA",
      pt: "Calculadora de área basal - DAP de árvores",
      ru: "Калькулятор площади сечения - DBH деревьев"
    },
    descriptions: {
      en: "Calculate tree basal area (BA) from DBH in cm or inches. Supports multiple trees and plot-based BA per hectare or acre for forestry and ecology surveys.",
      "zh-CN": "根据胸径（厘米或英寸）计算树木胸高断面积（BA），支持多棵树以及按样地换算每公顷或每英亩。",
      "zh-TW": "根據胸徑（公分或英吋）計算樹木胸高斷面積（BA），支援多棵樹與樣地換算每公頃或每英畝。",
      ja: "胸径（cm/インチ）から樹木の胸高断面積（BA）を計算。複数本や区画面積からha・acre換算にも対応。",
      ko: "가슴높이직경(DBH)으로 수목 흉고단면적(BA)을 계산합니다. 여러 나무와 면적 기준 ha/acre 환산을 지원합니다.",
      es: "Calcula el área basal (BA) de árboles desde el DBH en cm o pulgadas. Admite varios árboles y BA por hectárea o acre.",
      fr: "Calcule la surface terrière (BA) d’un arbre à partir du DBH en cm ou en pouces. Prend en charge plusieurs arbres et le BA/ha ou /acre.",
      de: "Berechnet die Basalfläche (BA) aus dem BHD in cm oder Zoll. Unterstützt mehrere Bäume sowie BA pro Hektar oder Acre.",
      pt: "Calcule a área basal (BA) de árvores a partir do DAP em cm ou polegadas. Suporta várias árvores e BA por hectare ou acre.",
      ru: "Рассчитайте площадь сечения дерева (BA) по DBH в см или дюймах. Поддерживаются несколько деревьев и BA/га или /acre."
    }
  }
];
