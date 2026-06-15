import type { ToolEntry } from "@/data/tools";

export const tools: ToolEntry[] = [
  {
    id: "ph-calculator",
    category: "chemistry",
    slugs: {
      en: "ph-calculator",
      "zh-CN": "ph-ji-suan-qi-suan-jian-he-huan-chong-ye",
      "zh-TW": "ph-ji-suan-qi-suan-jian-he-huan-chong-ye",
      ja: "ph-keisanki",
      ko: "ph-gyesan-gi",
      es: "calculadora-ph",
      fr: "calcul-ph",
      de: "ph-rechner",
      pt: "calculadora-ph",
      ru: "kalkulyator-ph"
    },
    titles: {
      en: "pH Calculator - Acids, Bases & Buffer Solutions",
      "zh-CN": "pH计算器：酸、碱与缓冲液",
      "zh-TW": "pH計算器：酸、鹼與緩衝液",
      ja: "pH計算機 - 酸・塩基・緩衝液",
      ko: "pH 계산기 - 산, 염기, 완충용액",
      es: "Calculadora de pH: ácidos, bases y tampones",
      fr: "Calculateur de pH : acides, bases et tampons",
      de: "pH-Rechner: Säuren, Basen und Puffer",
      pt: "Calculadora de pH: ácidos, bases e tampões",
      ru: "Калькулятор pH: кислоты, основания и буферы"
    },
    descriptions: {
      en: "pH calculator for acids, bases, and buffer solutions. Find pH, pOH, [H+], and [OH-] with Henderson-Hasselbalch steps in seconds.",
      "zh-CN": "酸、碱与缓冲液的 pH 计算器。几秒内可求 pH、pOH、[H+] 和 [OH-]，并查看亨德森-哈塞尔巴尔赫步骤。",
      "zh-TW": "酸、鹼與緩衝液的 pH 計算器。幾秒內可求 pH、pOH、[H+] 和 [OH-]，並查看亨德森-哈塞爾巴赫步驟。",
      ja: "酸、塩基、緩衝液の pH 計算機。数秒で pH、pOH、[H+]、[OH-] とヘンダーソン-ハッセルバルヒの手順を確認できます。",
      ko: "산, 염기, 완충용액의 pH 계산기입니다. pH, pOH, [H+], [OH-]와 헨더슨-하셀바흐 과정을 몇 초 안에 확인하세요.",
      es: "Calculadora de pH para ácidos, bases y tampones. Encuentra pH, pOH, [H+] y [OH-] con pasos de Henderson-Hasselbalch en segundos.",
      fr: "Calculateur de pH pour les acides, bases et solutions tampons. Trouvez pH, pOH, [H+] et [OH-] avec les étapes de Henderson-Hasselbalch en quelques secondes.",
      de: "pH-Rechner für Säuren, Basen und Pufferlösungen. Berechne pH, pOH, [H+] und [OH-] mit Henderson-Hasselbalch in Sekunden.",
      pt: "Calculadora de pH para ácidos, bases e soluções tampão. Encontre pH, pOH, [H+] e [OH-] com passos de Henderson-Hasselbalch em segundos.",
      ru: "Калькулятор pH для кислот, оснований и буферных растворов. За секунды найдите pH, pOH, [H+] и [OH-] с шагами по Хендерсону-Хассельбалху."
    }
  }
];
