import type { ToolEntry } from "@/data/tools";

export const tools: ToolEntry[] = [
  {
    id: "ph-calculator",
    category: "chemistry",
    slugs: {
      en: "ph-calculator",
      "zh-CN": "ph-suanqi-suanxing-jingsuan-he-huanchong-rongye",
      "zh-TW": "ph-ji-suan-qi-suan-jian-yu-huan-chong-rong-ye",
      ja: "ph-keisan-ki-san-sei-san-sei-yobuffer",
      ko: "ph-gyesan-gi-san-seong-san-seong-bu-cheong-yongyeok",
      es: "calculadora-ph-acidos-bases-soluciones-tampón",
      fr: "calculateur-ph-acides-bases-tampons",
      de: "ph-rechner-sauren-basen-pufferloesungen",
      pt: "calculadora-ph-acidos-bases-solucao-tampao",
      ru: "kalkulyator-ph-kisloty-osnovaniya-bufernye-rastvory"
    },
    titles: {
      en: "pH Calculator - Acids, Bases & Buffer Solutions",
      "zh-CN": "pH计算器：酸、碱与缓冲溶液",
      "zh-TW": "pH計算器：酸、鹼與緩衝溶液",
      ja: "pH計算機：酸・塩基・緩衝液",
      ko: "pH 계산기: 산, 염기, 완충용액",
      es: "Calculadora de pH: ácidos, bases y tampones",
      fr: "Calculateur de pH : acides, bases et tampons",
      de: "pH-Rechner: Säuren, Basen und Puffer",
      pt: "Calculadora de pH: ácidos, bases e tampões",
      ru: "Калькулятор pH: кислоты, основания и буферы"
    },
    descriptions: {
      en: "pH calculator for acids, bases, and buffer solutions. Find pH, pOH, [H+], and [OH-] with Henderson-Hasselbalch steps in seconds.",
      "zh-CN": "用于酸、碱和缓冲溶液的pH计算器。几秒内即可通过亨德森-哈塞尔巴尔赫步骤求出pH、pOH、[H+]和[OH-]。",
      "zh-TW": "酸、鹼與緩衝溶液的 pH 計算器。幾秒內用亨德森-哈塞爾巴赫步驟求出 pH、pOH、[H+] 與 [OH-]。",
      ja: "酸、塩基、緩衝液のpH計算機。ヘンダーソン・ハッセルバルヒ法でpH、pOH、[H+]、[OH-]をすばやく求めます。",
      ko: "산, 염기, 완충용액의 pH 계산기입니다. 헨더슨-하셀바흐 단계로 pH, pOH, [H+], [OH-]를 몇 초 만에 구하세요.",
      es: "Calculadora de pH para ácidos, bases y soluciones tampón. Obtén pH, pOH, [H+] y [OH-] en segundos con pasos de Henderson-Hasselbalch.",
      fr: "Calculateur de pH pour acides, bases et solutions tampons. Trouvez pH, pOH, [H+] et [OH-] en quelques secondes avec Henderson-Hasselbalch.",
      de: "pH-Rechner für Säuren, Basen und Pufferlösungen. Bestimme pH, pOH, [H+] und [OH-] in Sekunden mit Henderson-Hasselbalch.",
      pt: "Calculadora de pH para ácidos, bases e soluções tampão. Encontre pH, pOH, [H+] e [OH-] em segundos com Henderson-Hasselbalch.",
      ru: "Калькулятор pH для кислот, оснований и буферных растворов. Найдите pH, pOH, [H+] и [OH-] за секунды по шагам Хендерсона-Хассельбаха."
    }
  }
];
