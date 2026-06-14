import type { ToolEntry } from "@/data/tools";

export const tools: ToolEntry[] = [
  {
    id: "ph-calculator",
    category: "chemistry",
    slugs: {
      en: "ph-calculator",
      "zh-CN": "ph-jisuanqi-suanjian-huanchong-rongye",
      "zh-TW": "ph-jisuanqi-suanjian-huanchong-rongye",
      ja: "ph-keisanki-sansei-base-buffer",
      ko: "ph-gyeongsangi-san-base-beobeo",
      es: "calculadora-ph-acidos-bases-tampon",
      fr: "calculateur-ph-acides-bases-tampons",
      de: "ph-rechner-sauren-basen-pufferloesungen",
      pt: "calculadora-ph-acidos-bases-tampao",
      ru: "kalkulyator-ph-kisloty-osnovaniya-bufery"
    },
    titles: {
      en: "pH Calculator - Acids, Bases & Buffer Solutions",
      "zh-CN": "pH 计算器 - 酸碱与缓冲溶液",
      "zh-TW": "pH 計算器 - 酸鹼與緩衝溶液",
      ja: "pH計算機 - 酸・塩基・緩衝液",
      ko: "pH 계산기 - 산, 염기, 완충 용액",
      es: "Calculadora de pH - Ácidos, bases y tampones",
      fr: "Calculatrice de pH - Acides, bases et tampons",
      de: "pH-Rechner - Säuren, Basen und Puffer",
      pt: "Calculadora de pH - Ácidos, bases e tampões",
      ru: "Калькулятор pH - кислоты, основания и буферы"
    },
    descriptions: {
      en: "pH calculator for acids, bases, and buffer solutions. Find pH, pOH, [H+], and [OH-] with Henderson-Hasselbalch steps in seconds.",
      "zh-CN": "酸碱与缓冲溶液 pH 计算器。用 Henderson-Hasselbalch 公式，秒算 pH、pOH、[H+] 和 [OH-]。",
      "zh-TW": "酸鹼與緩衝溶液 pH 計算器。用 Henderson-Hasselbalch 公式，秒算 pH、pOH、[H+] 和 [OH-]。",
      ja: "酸・塩基・緩衝液の pH 計算機。Henderson-Hasselbalch 式で pH、pOH、[H+]、[OH-] をすばやく計算します。",
      ko: "산, 염기, 완충 용액 pH 계산기. Henderson-Hasselbalch 식으로 pH, pOH, [H+], [OH-]를 빠르게 계산합니다.",
      es: "Calculadora de pH para ácidos, bases y tampones. Calcula pH, pOH, [H+] y [OH-] con Henderson-Hasselbalch al instante.",
      fr: "Calculatrice de pH pour acides, bases et tampons. Calculez pH, pOH, [H+] et [OH-] avec Henderson-Hasselbalch en un instant.",
      de: "pH-Rechner für Säuren, Basen und Puffer. Berechnet pH, pOH, [H+] und [OH-] mit Henderson-Hasselbalch in Sekunden.",
      pt: "Calculadora de pH para ácidos, bases e tampões. Calcule pH, pOH, [H+] e [OH-] com Henderson-Hasselbalch em segundos.",
      ru: "Калькулятор pH для кислот, оснований и буферов. Быстро вычисляет pH, pOH, [H+] и [OH-] по формуле Хендерсона-Хассельбаха."
    }
  }
];
