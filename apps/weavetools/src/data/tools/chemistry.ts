import type { ToolEntry } from "@/data/tools";

export const tools: ToolEntry[] = [
  {
    id: "ph-calculator",
    category: "chemistry",
    slugs: {
      en: "ph-calculator",
      "zh-CN": "ph-jisuanqi-suan-jian-he-huanchong-rongye",
      "zh-TW": "ph-jisuanqi-suan-jian-he-huanchong-rongye",
      ja: "ph-keisan-ki-san-sen-ki-kanchoeki",
      ko: "ph-gyesangi-san-gang-gi-bufeo",
      es: "calculadora-ph-acidos-bases-tampones",
      fr: "calculateur-ph-acides-bases-tampons",
      de: "ph-rechner-sauren-basen-puffer",
      pt: "calculadora-ph-acidos-bases-tampos",
      ru: "kalkulyator-ph-kisloty-osnovaniya-bufery"
    },
    titles: {
      en: "pH Calculator - Acids, Bases & Buffer Solutions",
      "zh-CN": "pH计算器：酸、碱与缓冲液",
      "zh-TW": "pH計算器：酸、鹼與緩衝液",
      ja: "pH計算機 - 酸・塩基・緩衝液",
      ko: "pH 계산기 - 산·염기·완충용액",
      es: "Calculadora de pH: ácidos, bases y tampones",
      fr: "Calculateur de pH : acides, bases et tampons",
      de: "pH-Rechner: Säuren, Basen und Puffer",
      pt: "Calculadora de pH: ácidos, bases e tampões",
      ru: "Калькулятор pH: кислоты, основания и буферы"
    },
    descriptions: {
      en: "pH calculator for acids, bases, and buffer solutions. Find pH, pOH, [H+], and [OH-] with Henderson-Hasselbalch steps in seconds.",
      "zh-CN": "pH计算器用于酸、碱和缓冲液。几秒内即可根据Henderson-Hasselbalch步骤求出pH、pOH、[H+]和[OH-]。",
      "zh-TW": "pH計算器適用於酸、鹼與緩衝液。幾秒內即可依 Henderson-Hasselbalch 步驟求出 pH、pOH、[H+] 與 [OH-]。",
      ja: "酸、塩基、緩衝液のpH計算機。Henderson-Hasselbalch式の手順で、pH、pOH、[H+]、[OH-]をすぐに求められます。",
      ko: "산, 염기, 완충용액용 pH 계산기입니다. Henderson-Hasselbalch 단계로 pH, pOH, [H+], [OH-]를 몇 초 만에 구합니다.",
      es: "Calculadora de pH para ácidos, bases y tampones. Encuentra pH, pOH, [H+] y [OH-] con pasos de Henderson-Hasselbalch en segundos.",
      fr: "Calculateur de pH pour acides, bases et tampons. Trouvez pH, pOH, [H+] et [OH-] avec les étapes de Henderson-Hasselbalch en quelques secondes.",
      de: "pH-Rechner für Säuren, Basen und Pufferlösungen. Finden Sie pH, pOH, [H+] und [OH-] mit Henderson-Hasselbalch-Schritten in Sekunden.",
      pt: "Calculadora de pH para ácidos, bases e tampões. Encontre pH, pOH, [H+] e [OH-] com passos de Henderson-Hasselbalch em segundos.",
      ru: "Калькулятор pH для кислот, оснований и буферов. Найдите pH, pOH, [H+] и [OH-] с шагами по Хендерсону—Хассельбаху за секунды."
    }
  }
];
