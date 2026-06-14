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
      "zh-CN": "dengwei-jiyin-pinlu-jisuanqi",
      "zh-TW": "dengwei-jiyin-pinlu-jisuanqi",
      ja: "areru-hindo-keisanki",
      ko: "daerip-yujeonja-bindo-gyesangi",
      es: "calculadora-frecuencia-alelica",
      fr: "calculateur-frequence-allelique",
      de: "allelfrequenz-rechner",
      pt: "calculadora-frequencia-alelica",
      ru: "kalkulyator-chastoty-alleley"
    },
    titles: {
      en: "Allele Frequency Calculator - Hardy-Weinberg Tool",
      "zh-CN": "等位基因频率计算器 - 哈迪-温伯格工具",
      "zh-TW": "等位基因頻率計算器 - 哈溫平衡工具",
      ja: "アレル頻度計算機 - ハーディー・ワインベルグ",
      ko: "대립유전자 빈도 계산기 - 하디-바인베르크",
      es: "Calculadora de frecuencia alélica Hardy-Weinberg",
      fr: "Calculateur de fréquence allélique Hardy-Weinberg",
      de: "Allelfrequenz-Rechner für Hardy-Weinberg",
      pt: "Calculadora de frequência alélica Hardy-Weinberg",
      ru: "Калькулятор частоты аллелей Харди-Вайнберга"
    },
    descriptions: {
      en: "Calculate allele frequencies (p, q), genotype frequencies, and Hardy-Weinberg equilibrium from genotype or allele counts. Free population genetics tool.",
      "zh-CN": "根据基因型或等位基因计数计算等位基因频率(p、q)、基因型频率和哈迪-温伯格平衡。",
      "zh-TW": "依基因型或等位基因計數計算等位基因頻率(p、q)、基因型頻率與哈溫平衡。",
      ja: "遺伝子型またはアレル数からアレル頻度(p、q)、遺伝子型頻度、ハーディー・ワインベルグ平衡を計算します。",
      ko: "유전자형 또는 대립유전자 수로 p, q 빈도, 유전자형 빈도와 하디-바인베르크 평형을 계산하세요.",
      es: "Calcula frecuencias alélicas (p, q), genotípicas y equilibrio de Hardy-Weinberg desde conteos de genotipos o alelos.",
      fr: "Calculez fréquences alléliques (p, q), génotypiques et équilibre de Hardy-Weinberg depuis des effectifs de génotypes ou d’allèles.",
      de: "Berechne Allelfrequenzen (p, q), Genotypfrequenzen und Hardy-Weinberg-Gleichgewicht aus Genotyp- oder Allelzahlen.",
      pt: "Calcule frequências alélicas (p, q), genotípicas e equilíbrio de Hardy-Weinberg a partir de contagens de genótipos ou alelos.",
      ru: "Рассчитайте частоты аллелей (p, q), генотипов и равновесие Харди-Вайнберга по числу генотипов или аллелей."
    }
  },
  {
    id: "animal-mortality-rate-calculator",
    category: "biology",
    slugs: {
      en: "animal-mortality-rate-calculator",
      "zh-CN": "dong-wu-si-wang-lu-ji-suan-qi",
      "zh-TW": "dong-wu-si-wang-lu-ji-suan-qi",
      ja: "dobutsu-shiboritsu-keisanki",
      ko: "dongmul-samangnyul-gyesangi",
      es: "calculadora-mortalidad-animal",
      fr: "calculateur-mortalite-animale",
      de: "tiersterblichkeit-rechner",
      pt: "calculadora-mortalidade-animal",
      ru: "kalkulyator-smertnosti-zhivotnyh"
    },
    titles: {
      en: "Animal Mortality Rate Calculator - Livestock Death Rate",
      "zh-CN": "动物死亡率计算器 - 畜禽死亡率",
      "zh-TW": "動物死亡率計算器 - 畜禽死亡率",
      ja: "動物死亡率計算機 - 家畜の死亡率",
      ko: "동물 사망률 계산기 - 가축 폐사율",
      es: "Calculadora de mortalidad animal - Tasa ganadera",
      fr: "Calculateur de mortalité animale - Taux d’élevage",
      de: "Tiersterblichkeit Rechner - Mortalität bei Nutztieren",
      pt: "Calculadora de mortalidade animal - Taxa pecuária",
      ru: "Калькулятор смертности животных - Падеж скота"
    },
    descriptions: {
      en: "Calculate animal mortality rate and survival rate for livestock, poultry, or wildlife. Enter population and deaths for instant results and veterinary records.",
      "zh-CN": "计算畜牧、家禽或野生动物的死亡率和存活率。输入种群数量和死亡数，即可获得结果并用于兽医记录。",
      "zh-TW": "計算畜牧、家禽或野生動物的死亡率與存活率。輸入族群數量和死亡數，即可取得結果並用於獸醫紀錄。",
      ja: "家畜、家禽、野生動物の死亡率と生存率を計算。個体数と死亡数を入力すると、獣医記録に使える結果を即時表示します。",
      ko: "가축, 가금류, 야생동물의 사망률과 생존율을 계산하세요. 개체수와 사망 수를 입력하면 수의 기록용 결과가 즉시 표시됩니다.",
      es: "Calcula la mortalidad y supervivencia de ganado, aves o fauna silvestre. Ingresa población y muertes para resultados y registros veterinarios.",
      fr: "Calculez la mortalité et la survie du bétail, des volailles ou de la faune. Saisissez population et décès pour des résultats vétérinaires.",
      de: "Berechnen Sie Sterblichkeits- und Überlebensrate für Nutztiere, Geflügel oder Wildtiere. Population und Todesfälle eingeben.",
      pt: "Calcule mortalidade e sobrevivência de rebanhos, aves ou fauna. Informe população e mortes para resultados e registros veterinários.",
      ru: "Рассчитайте смертность и выживаемость скота, птицы или диких животных. Введите популяцию и падеж для ветеринарных записей."
    }
  },
  {
    id: "annealing-temperature-calculator",
    category: "biology",
    slugs: {
      en: "annealing-temperature-calculator",
      "zh-CN": "tuihuo-wendu-jisuanqi-pcr-yinwu-gongju",
      "zh-TW": "tuihuo-wendu-jisuanqi-pcr-yinwu-gongju",
      ja: "pcr-puraima-aneiringu-ondo-keisanki",
      ko: "pcr-peurimaeo-annealing-ondo-gyesangi",
      es: "calculadora-temperatura-apareamiento-pcr",
      fr: "calculateur-temperature-hybridation-pcr",
      de: "annealing-temperatur-rechner-pcr-primer",
      pt: "calculadora-temperatura-anelamento-pcr",
      ru: "kalkulyator-temperatury-otzhiga-pcr-praymerov"
    },
    titles: {
      en: "Annealing Temperature Calculator - PCR Primer Tool",
      "zh-CN": "退火温度计算器 - PCR引物工具",
      "zh-TW": "退火溫度計算器 - PCR引子工具",
      ja: "アニーリング温度計算器 - PCRプライマー",
      ko: "어닐링 온도 계산기 - PCR 프라이머",
      es: "Calculadora de temperatura de alineamiento PCR",
      fr: "Calculateur de température d’hybridation PCR",
      de: "Annealing-Temperatur-Rechner für PCR-Primer",
      pt: "Calculadora de temperatura de anelamento PCR",
      ru: "Калькулятор температуры отжига PCR"
    },
    descriptions: {
      en: "Calculate optimal PCR annealing temperature from primer sequences using Wallace rule, GC content, or nearest-neighbor method. Free online primer Tm calculator.",
      "zh-CN": "根据引物序列和盐/DNA浓度，用 Wallace、GC 含量或最近邻法计算最佳 PCR 退火温度。",
      "zh-TW": "根據引子序列與鹽/DNA濃度，使用 Wallace、GC 含量或最近鄰法計算最佳 PCR 退火溫度。",
      ja: "Wallace則、GC含量、最近接法でPCRプライマーの最適アニーリング温度を計算します。",
      ko: "Wallace 규칙, GC 함량, 최근접법으로 PCR 프라이머의 최적 어닐링 온도를 계산합니다.",
      es: "Calcula la temperatura óptima de alineamiento PCR con Wallace, contenido GC o el método vecino más cercano.",
      fr: "Calculez la température d’hybridation PCR optimale avec Wallace, le contenu GC ou la méthode du voisin le plus proche.",
      de: "Berechnen Sie die optimale PCR-Annealing-Temperatur mit Wallace, GC-Gehalt oder Nachbarpaar-Methode.",
      pt: "Calcule a temperatura ideal de anelamento PCR com Wallace, conteúdo GC ou método vizinho mais próximo.",
      ru: "Рассчитайте оптимальную температуру отжига PCR по Wallace, GC-содержанию или методу ближайшего соседа."
    }
  },
  {
    id: "basal-area-calculator",
    category: "biology",
    slugs: {
      en: "basal-area-calculator",
      "zh-CN": "xiong-gao-duan-mian-ji-ji-suan-qi",
      "zh-TW": "xiong-gao-duan-mian-ji-ji-suan-qi",
      ja: "kyoko-danmenseki-keisanki",
      ko: "hyunggo-danmyeonjeok-gyesangi",
      es: "calculadora-area-basal",
      fr: "calculateur-surface-terriere",
      de: "grundflaechen-rechner",
      pt: "calculadora-area-basal",
      ru: "kalkulyator-ploshchadi-secheniya"
    },
    titles: {
      en: "Basal Area Calculator - Tree DBH to BA Forestry Tool",
      "zh-CN": "胸高断面积计算器 - 树木DBH转BA林业工具",
      "zh-TW": "胸高斷面積計算器 - 樹木DBH轉BA林業工具",
      ja: "胸高断面積計算機 - 樹木DBHからBAを算出",
      ko: "흉고단면적 계산기 - 나무 DBH를 BA로 변환",
      es: "Calculadora de área basal - DBH a BA forestal",
      fr: "Calculateur de surface terrière - DBH vers BA",
      de: "Grundflächenrechner - BHD in BA umrechnen",
      pt: "Calculadora de área basal - DAP para BA",
      ru: "Калькулятор площади сечения - DBH в BA"
    },
    descriptions: {
      en: "Calculate tree basal area (BA) from DBH in cm or inches. Supports multiple trees and plot-based BA per hectare or acre for forestry and ecology surveys.",
      "zh-CN": "根据厘米或英寸DBH计算树木胸高断面积（BA），支持多株树及按样地换算每公顷或每英亩BA。",
      "zh-TW": "依厘米或英寸DBH計算樹木胸高斷面積（BA），支援多株樹與依樣區換算每公頃或每英畝BA。",
      ja: "cmまたはインチのDBHから樹木の胸高断面積（BA）を計算。複数木とプロット別のha・acre当たりBAに対応。",
      ko: "cm 또는 inch DBH로 나무 흉고단면적(BA)을 계산합니다. 여러 나무와 표본구 기준 ha·acre당 BA를 지원합니다.",
      es: "Calcula el área basal (BA) de árboles desde el DBH en cm o pulgadas. Admite varios árboles y BA por hectárea o acre.",
      fr: "Calculez la surface terrière (BA) à partir du DBH en cm ou pouces. Prend en charge plusieurs arbres et la BA par hectare ou acre.",
      de: "Berechnen Sie die Baum-Grundfläche (BA) aus BHD in cm oder Zoll. Unterstützt mehrere Bäume und BA pro Hektar oder Acre.",
      pt: "Calcule a área basal (BA) de árvores pelo DAP em cm ou polegadas. Suporta várias árvores e BA por hectare ou acre.",
      ru: "Рассчитайте базальную площадь (BA) дерева по DBH в см или дюймах. Поддерживает несколько деревьев и BA на гектар или акр."
    }
  }
];
