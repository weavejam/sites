import type { ToolEntry } from "@/data/tools";

export const tools: ToolEntry[] = [
  {
    id: "standard-deviation-calculator",
    category: "statistic",
    slugs: {
      en: "standard-deviation-calculator",
      "zh-CN": "biaozhun-cha-jisuanqi-yangben-zongti",
      "zh-TW": "biaozhun-cha-jisuanqi-yangben-muti",
      ja: "hyoujun-hensa-keisanki-sanpuru-boshudan",
      ko: "pyojun-pyeoncha-gyesangi-pyobon-mojipdan",
      es: "calculadora-desviacion-estandar-muestra-poblacion",
      fr: "calcul-ecart-type-echantillon-population",
      de: "standardabweichungsrechner-stichprobe-grundgesamtheit",
      pt: "calculadora-desvio-padrao-amostra-populacao",
      ru: "kalkulyator-standartnogo-otkloneniya-vyborka-sovokupnost"
    },
    titles: {
      en: "Standard Deviation Calculator - Sample & Population",
      "zh-CN": "标准差计算器：样本与总体",
      "zh-TW": "標準差計算器：樣本與母體",
      ja: "標準偏差計算機：標本と母集団",
      ko: "표준편차 계산기: 표본과 모집단",
      es: "Calculadora de desviación estándar: muestra y población",
      fr: "Calcul de l'écart type : échantillon et population",
      de: "Standardabweichungsrechner: Stichprobe und Grundgesamtheit",
      pt: "Calculadora de desvio padrão: amostra e população",
      ru: "Калькулятор стандартного отклонения: выборка и совокупность"
    },
    descriptions: {
      en: "Standard deviation calculator for sample and population data. Find standard deviation, variance, mean, sum, and range from a list of numbers instantly.",
      "zh-CN": "计算样本和总体数据的标准差。输入数字列表，即可快速得到标准差、方差、平均值、总和和范围。",
      "zh-TW": "可計算樣本與母體資料的標準差。輸入數字清單，立即取得標準差、變異數、平均值、總和與範圍。",
      ja: "標本と母集団のデータの標準偏差を計算。数値一覧から標準偏差、分散、平均、合計、範囲をすぐに求めます。",
      ko: "표본과 모집단 데이터의 표준편차를 계산합니다. 숫자 목록에서 표준편차, 분산, 평균, 합계, 범위를 즉시 구하세요.",
      es: "Calcula la desviación estándar de muestras y poblaciones. Obtén al instante desviación, varianza, media, suma y rango a partir de una lista de números.",
      fr: "Calculez l'écart type d'un échantillon ou d'une population. Obtenez instantanément écart type, variance, moyenne, somme et étendue.",
      de: "Berechnen Sie die Standardabweichung für Stichproben und Grundgesamtheiten. Sofort Standardabweichung, Varianz, Mittelwert, Summe und Spannweite ermitteln.",
      pt: "Calcule o desvio padrão de amostras e populações. Obtenha na hora desvio padrão, variância, média, soma e faixa de uma lista de números.",
      ru: "Вычисляйте стандартное отклонение для выборок и совокупностей. Сразу получайте стандартное отклонение, дисперсию, среднее, сумму и размах."
    }
  },
  {
    id: "wilcoxon-rank-sum-test-calculator",
    category: "statistic",
    slugs: {
      en: "wilcoxon-rank-sum-test-calculator",
      "zh-CN": "wilcoxon-rank-sum-test-calculator",
      "zh-TW": "wilcoxon-rank-sum-test-calculator",
      ja: "wilcoxon-rank-sum-test-calculator",
      ko: "wilcoxon-rank-sum-test-calculator",
      es: "calculadora-prueba-suma-rangos-wilcoxon",
      fr: "calculateur-test-somme-des-rangs-wilcoxon",
      de: "wilcoxon-rangsummentest-rechner",
      pt: "calculadora-teste-soma-rangos-wilcoxon",
      ru: "kalkulyator-test-summy-rangov-vilkoksona"
    },
    titles: {
      en: "Wilcoxon Rank Sum Test Calculator (Mann-Whitney U)",
      "zh-CN": "Wilcoxon秩和检验计算器",
      "zh-TW": "Wilcoxon秩和檢定計算器",
      ja: "ウィルコクソン順位和検定計算機",
      ko: "윌콕슨 순위합 검정 계산기",
      es: "Calculadora de suma de rangos de Wilcoxon",
      fr: "Calculateur de somme des rangs de Wilcoxon",
      de: "Wilcoxon-Rangsummentest-Rechner",
      pt: "Calculadora de soma dos postos de Wilcoxon",
      ru: "Калькулятор критерия Вилкоксона"
    },
    descriptions: {
      en: "Perform a Wilcoxon Rank Sum Test (Mann-Whitney U) for two independent samples. Get the U statistic, Z-score, and p-value instantly — no normality required.",
      "zh-CN": "对两个独立样本进行Wilcoxon秩和检验（Mann-Whitney U），即时获取U统计量、Z分数和p值，无需正态性假设。",
      "zh-TW": "對兩個獨立樣本進行Wilcoxon秩和檢定（Mann-Whitney U），即時取得U統計量、Z分數與p值，無需常態性假設。",
      ja: "2つの独立した標本に対するウィルコクソン順位和検定（Mann-Whitney U）を実行し、U統計量、Zスコア、p値をすぐに取得できます。正規性は不要です。",
      ko: "두 독립 표본에 대해 윌콕슨 순위합 검정(Mann-Whitney U)을 수행하고 U 통계량, Z 점수, p값을 즉시 확인하세요. 정규성 가정이 필요 없습니다.",
      es: "Realiza la prueba de suma de rangos de Wilcoxon (Mann-Whitney U) para dos muestras independientes. Obtén U, Z y p al instante, sin suponer normalidad.",
      fr: "Réalisez un test de somme des rangs de Wilcoxon (Mann-Whitney U) pour deux échantillons indépendants. Obtenez U, Z et p instantanément, sans hypothèse de normalité.",
      de: "Führen Sie einen Wilcoxon-Rangsummentest (Mann-Whitney U) für zwei unabhängige Stichproben durch. U, Z und p-Wert sofort erhalten – ohne Normalverteilungsannahme.",
      pt: "Realize o teste de soma dos postos de Wilcoxon (Mann-Whitney U) para duas amostras independentes. Obtenha U, Z e p instantaneamente, sem exigir normalidade.",
      ru: "Выполните критерий суммы рангов Вилкоксона (Mann-Whitney U) для двух независимых выборок. Сразу получите U, Z и p-значение без предположения о нормальности."
    }
  },
  {
    id: "wilcoxon-signed-rank-test-calculator",
    category: "statistic",
    slugs: {
      en: "wilcoxon-signed-rank-test-calculator",
      "zh-CN": "wilcoxon-peidui-yangben-jisuanqi",
      "zh-TW": "wilcoxon-peidui-yangben-jisuanqi",
      ja: "wirukokuson-fugotsuki-juni-kentei-keisanki",
      ko: "wilkokseun-buhosunwi-geumjeong-gyesangi",
      es: "calculadora-prueba-rangos-con-signo-wilcoxon",
      fr: "calculateur-rangs-signes-wilcoxon",
      de: "wilcoxon-vorzeichen-rang-test-rechner",
      pt: "calculadora-teste-postos-sinalizados-wilcoxon",
      ru: "kalkulyator-kriteriya-znakovyh-rangov-vilkoksona"
    },
    titles: {
      en: "Wilcoxon Signed-Rank Test Calculator - Paired Samples",
      "zh-CN": "Wilcoxon符号秩检验计算器",
      "zh-TW": "Wilcoxon符號等級檢定計算器",
      ja: "ウィルコクソン符号付順位検定計算機",
      ko: "윌콕슨 부호순위 검정 계산기",
      es: "Calculadora de rangos con signo de Wilcoxon",
      fr: "Calculateur de rangs signés de Wilcoxon",
      de: "Wilcoxon-Vorzeichen-Rang-Test-Rechner",
      pt: "Calculadora do teste de postos sinalizados de Wilcoxon",
      ru: "Калькулятор критерия знаковых рангов Вилкоксона"
    },
    descriptions: {
      en: "Wilcoxon signed-rank test calculator for paired samples. Compare before-and-after measurements with W statistic, Z-score, and p-value — no normality assumption.",
      "zh-CN": "Wilcoxon符号秩检验计算器：比较配对前后测量，获取W统计量、Z分数和p值，无需正态性假设。",
      "zh-TW": "Wilcoxon符號等級檢定計算器：比較配對前後量測，取得W統計量、Z分數與p值，無需常態性假設。",
      ja: "対応する前後測定を比較するウィルコクソン符号付順位検定計算機。正規性を仮定せずにW統計量、Zスコア、p値を取得できます。",
      ko: "대응되는 전후 측정을 비교하는 윌콕슨 부호순위 검정 계산기입니다. 정규성 가정 없이 W 통계량, Z 점수, p값을 확인하세요.",
      es: "Calculadora de rangos con signo de Wilcoxon: compara mediciones pareadas antes y después y obtén W, Z y p sin suponer normalidad.",
      fr: "Calculateur de rangs signés de Wilcoxon : comparez des mesures appariées avant/après et obtenez W, Z et p sans supposer la normalité.",
      de: "Wilcoxon-Vorzeichen-Rang-Test-Rechner: Vergleichen Sie gepaarte Vorher-Nachher-Messungen und erhalten Sie W, Z und p ohne Normalverteilungsannahme.",
      pt: "Calculadora do teste de postos sinalizados de Wilcoxon: compare medidas pareadas antes e depois e obtenha W, Z e p sem assumir normalidade.",
      ru: "Калькулятор критерия знаковых рангов Вилкоксона: сравнивайте парные измерения до и после и получайте W, Z и p без предположения о нормальности."
    }
  },
  {
    id: "yates-correction-for-continuity-calculator",
    category: "statistic",
    slugs: {
      en: "yates-correction-for-continuity-calculator",
      "zh-CN": "yates-lianxu-xiuzheng-kafang-jisuanqi",
      "zh-TW": "yates-lianxu-xiuzheng-kafang-jisuanqi",
      ja: "yates-renzokusei-hosei-kafun-keisanki",
      ko: "yates-yeonsuseong-boseong-kajedung-gyeosan-gi",
      es: "calculadora-correccion-yates-chi-cuadrado",
      fr: "calculateur-correction-yates-khi-deux",
      de: "yates-kontinuitaetskorrektur-chi-quadrat-rechner",
      pt: "calculadora-correcao-yates-qui-quadrado",
      ru: "yates-korrekciya-nepreryvnosti-khi-kvadrat-kalkulyator"
    },
    titles: {
      en: "Yates Correction for Continuity Calculator - Chi-Square",
      "zh-CN": "Yates连续性校正卡方计算器",
      "zh-TW": "Yates連續性校正卡方計算器",
      ja: "Yates連続性補正カイ二乗計算機",
      ko: "Yates 연속성 보정 카이제곱 계산기",
      es: "Calculadora chi-cuadrado con corrección de Yates",
      fr: "Calculateur khi-deux avec correction de Yates",
      de: "Chi-Quadrat-Rechner mit Yates-Korrektur",
      pt: "Calculadora qui-quadrado com correção de Yates",
      ru: "Калькулятор хи‑квадрата с поправкой Йейтса"
    },
    descriptions: {
      en: "Calculate a Yates-corrected chi-square statistic for 2×2 contingency tables. Enter a, b, c, d cell counts and get the adjusted χ² value and p-value instantly.",
      "zh-CN": "计算2×2列联表的Yates校正卡方统计量，输入a、b、c、d即可立即获得调整后的χ²值和p值。",
      "zh-TW": "計算2×2列聯表的Yates校正卡方統計量，輸入a、b、c、d即可立即取得調整後的χ²值與p值。",
      ja: "2×2分割表のYates補正カイ二乗統計量を計算し、a、b、c、dを入力すると調整済みχ²値とp値を即座に表示します。",
      ko: "2×2 분할표의 Yates 보정 카이제곱 통계를 계산합니다. a, b, c, d를 입력하면 조정된 χ² 값과 p값을 바로 확인할 수 있습니다.",
      es: "Calcula una estadística chi-cuadrado con corrección de Yates para tablas de contingencia 2×2. Ingresa a, b, c y d y obtén χ² y p al instante.",
      fr: "Calculez un khi-deux corrigé de Yates pour les tableaux de contingence 2×2. Saisissez a, b, c et d pour obtenir immédiatement χ² et la p-value.",
      de: "Berechnen Sie eine Yates-korrigierte Chi-Quadrat-Statistik für 2×2-Kontingenztafeln. Geben Sie a, b, c, d ein und erhalten Sie sofort χ² und p-Wert.",
      pt: "Calcule uma estatística qui-quadrado com correção de Yates para tabelas de contingência 2×2. Informe a, b, c, d e obtenha χ² e p-valor na hora.",
      ru: "Рассчитайте хи-квадрат с поправкой Йейтса для таблиц сопряженности 2×2. Введите a, b, c, d и сразу получите χ² и p-значение."
    }
  },
  {
    id: "z-score-calculator",
    category: "statistic",
    slugs: {
      en: "z-score-calculator",
      "zh-CN": "z-fen-shu-ji-suan-qi",
      "zh-TW": "z-fen-shu-ji-suan-qi",
      ja: "z-score-keisanki",
      ko: "z-seukeo-gyesangi",
      es: "calculadora-z-score",
      fr: "calculateur-z-score",
      de: "z-score-rechner",
      pt: "calculadora-z-score",
      ru: "z-skor-kalkulyator"
    },
    titles: {
      en: "Z-Score Calculator - Calculate Standard Score Instantly",
      "zh-CN": "Z分数计算器 - 即时计算标准分数",
      "zh-TW": "Z分數計算器 - 即時計算標準分數",
      ja: "Zスコア計算機 - 標準化得点を即計算",
      ko: "Z-점수 계산기 - 표준점수 즉시 계산",
      es: "Calculadora Z-Score - Calcula la puntuación estándar",
      fr: "Calculateur Z-Score - Calculez le score standard",
      de: "Z-Score-Rechner - Standardwert sofort berechnen",
      pt: "Calculadora Z-Score - Calcule o escore padrão",
      ru: "Калькулятор Z-оценки - Стандартный балл мгновенно"
    },
    descriptions: {
      en: "Z-score calculator: find how many standard deviations a value is from the mean. Enter raw score, mean, and standard deviation to get z-score and interpretation.",
      "zh-CN": "Z分数计算器：计算数值距离均值多少个标准差。输入原始分数、均值和标准差，立即得到Z分数和解读。",
      "zh-TW": "Z分數計算器：計算數值距離平均值多少個標準差。輸入原始分數、平均值和標準差，立即得到Z分數與解讀。",
      ja: "Zスコア計算機：値が平均から標準偏差でどれだけ離れているかを計算。元の値、平均、標準偏差を入力してZスコアと解釈を表示。",
      ko: "Z-점수 계산기: 값이 평균에서 표준편차 기준으로 얼마나 떨어져 있는지 계산합니다. 원점수, 평균, 표준편차를 입력해 Z-점수와 해석을 확인하세요.",
      es: "Calculadora Z-score: descubre cuántas desviaciones estándar separan un valor de la media. Ingresa valor, media y desviación estándar para ver el z-score e interpretación.",
      fr: "Calculateur Z-score : découvrez combien d’écarts types séparent une valeur de la moyenne. Saisissez la valeur brute, la moyenne et l’écart type pour obtenir le z-score et son interprétation.",
      de: "Z-Score-Rechner: Ermitteln Sie, wie viele Standardabweichungen ein Wert vom Mittelwert entfernt ist. Rohwert, Mittelwert und Standardabweichung eingeben und Z-Score samt Interpretation erhalten.",
      pt: "Calculadora Z-score: descubra quantos desvios padrão um valor está da média. Digite valor bruto, média e desvio padrão para ver o z-score e a interpretação.",
      ru: "Калькулятор Z-score: узнайте, сколько стандартных отклонений отделяет значение от среднего. Введите исходное значение, среднее и стандартное отклонение, чтобы получить z-score и интерпретацию."
    }
  },
  {
    id: "z-test-calculator",
    category: "statistic",
    slugs: {
      en: "z-test-calculator",
      "zh-CN": "z-test-jianshi-jisuanqi",
      "zh-TW": "z-test-jianshi-jisuanqi",
      ja: "z-test-kenshou-keisanki",
      ko: "z-test-gajeonggeomjeung-gyesangi",
      es: "calculadora-z-test-hipotesis",
      fr: "calculatrice-z-test-hypothese",
      de: "z-test-rechner-hypothesentest",
      pt: "calculadora-z-test-teste-hipotese",
      ru: "kalkulyator-z-test-gipotez"
    },
    titles: {
      en: "Z-Test Calculator for Hypothesis Testing",
      "zh-CN": "Z检验计算器",
      "zh-TW": "Z檢定計算器",
      ja: "Z検定計算機",
      ko: "Z검정 계산기",
      es: "Calculadora Z-test de hipótesis",
      fr: "Calculatrice Z-test d’hypothèse",
      de: "Z-Test-Rechner für Hypothesentests",
      pt: "Calculadora Z-test para hipóteses",
      ru: "Калькулятор Z-теста"
    },
    descriptions: {
      en: "One-sample and two-sample Z-test calculator for hypothesis testing. Enter sample mean, population SD, and sample size to get the Z-statistic and p-value.",
      "zh-CN": "用于假设检验的单样本和双样本 Z 检验计算器。输入样本均值、总体标准差和样本量即可得到 Z 统计量和 p 值。",
      "zh-TW": "用於假設檢定的單樣本與雙樣本 Z 檢定計算器。輸入樣本平均數、母體標準差與樣本數即可得到 Z 統計量與 p 值。",
      ja: "仮説検定のための1標本・2標本Z検定計算機。標本平均、母標準偏差、標本サイズを入力するとZ統計量とp値を求められます。",
      ko: "가설 검정을 위한 단일 표본 및 두 표본 Z검정 계산기입니다. 표본 평균, 모집단 표준편차, 표본 크기를 입력하면 Z통계량과 p값을 구할 수 있습니다.",
      es: "Calculadora Z-test de una y dos muestras para pruebas de hipótesis. Ingresa la media muestral, la desviación estándar poblacional y el tamaño de muestra para obtener el estadístico Z y el valor p.",
      fr: "Calculatrice Z-test à un ou deux échantillons pour les tests d’hypothèse. Saisissez la moyenne d’échantillon, l’écart-type population et la taille d’échantillon pour obtenir la statistique Z et la p-value.",
      de: "Z-Test-Rechner für Ein- und Zwei-Stichproben zum Hypothesentest. Geben Sie Stichprobenmittelwert, Populations-Standardabweichung und Stichprobengröße ein, um Z-Wert und p-Wert zu erhalten.",
      pt: "Calculadora Z-test de uma e duas amostras para testes de hipótese. Insira a média amostral, o desvio padrão populacional e o tamanho da amostra para obter a estatística Z e o valor-p.",
      ru: "Калькулятор Z-теста для одной и двух выборок для проверки гипотез. Введите выборочное среднее, стандартное отклонение генеральной совокупности и размер выборки, чтобы получить Z-статистику и p-value."
    }
  },
  {
    id: "tukey-hsd-calculator",
    category: "statistic",
    slugs: {
      en: "tukey-hsd-calculator",
      "zh-CN": "tukey-hsd-jisuanqi",
      "zh-TW": "tukey-hsd-jisuanqi",
      ja: "tukey-hsd-keisanki",
      ko: "tukey-hsd-gyesangi",
      es: "calculadora-tukey-hsd",
      fr: "calculateur-tukey-hsd",
      de: "tukey-hsd-rechner",
      pt: "calculadora-tukey-hsd",
      ru: "kalkulyator-tukey-hsd"
    },
    titles: {
      en: "Tukey's HSD Calculator - Post-Hoc ANOVA Test",
      "zh-CN": "Tukey HSD 计算器",
      "zh-TW": "Tukey HSD 計算器",
      ja: "Tukey HSD 計算機",
      ko: "Tukey HSD 계산기",
      es: "Calculadora Tukey HSD",
      fr: "Calculateur Tukey HSD",
      de: "Tukey-HSD-Rechner",
      pt: "Calculadora Tukey HSD",
      ru: "Калькулятор Tukey HSD"
    },
    descriptions: {
      en: "Perform Tukey's HSD post-hoc test after ANOVA. Compare all group mean pairs to find statistically significant differences with one free online tool.",
      "zh-CN": "ANOVA 后进行 Tukey HSD 事后检验，比较各组均值对，找出具有统计显著性的差异。",
      "zh-TW": "在 ANOVA 後進行 Tukey HSD 事後檢定，比較各組平均數對，找出具統計顯著性的差異。",
      ja: "ANOVA の後に Tukey HSD 事後検定を行い、各群の平均の差から有意差を判定します。",
      ko: "ANOVA 후 Tukey HSD 사후검정을 수행해 각 그룹 평균쌍의 유의한 차이를 확인합니다.",
      es: "Aplica la prueba HSD de Tukey tras un ANOVA y compara pares de medias para detectar diferencias significativas.",
      fr: "Effectuez le test post hoc HSD de Tukey après une ANOVA et comparez les moyennes par paires pour détecter des différences significatives.",
      de: "Führen Sie nach einer ANOVA den Tukey-HSD-Post-hoc-Test durch und vergleichen Sie alle Mittelwertpaare auf signifikante Unterschiede.",
      pt: "Execute o teste post hoc HSD de Tukey após a ANOVA e compare pares de médias para identificar diferenças significativas.",
      ru: "Выполните пост-хок тест Tukey HSD после ANOVA и сравните пары средних, чтобы выявить значимые различия."
    }
  },
  {
    id: "two-envelopes-paradox-calculator",
    category: "statistic",
    slugs: {
      en: "two-envelopes-paradox-calculator",
      "zh-CN": "liang-ge-xin-feng-bei-ji-suan-qi",
      "zh-TW": "liang-ge-xin-feng-bei-ji-suan-qi",
      ja: "futatsu-no-fuutou-paradox-keisanki",
      ko: "du-geu-bongtu-paradoks-gyesangi",
      es: "paradoja-dos-sobres-calculadora",
      fr: "paradoxe-des-deux-enveloppes-calculateur",
      de: "zwei-umschlaege-paradoxon-rechner",
      pt: "paradoxo-dos-dois-envelopes-calculadora",
      ru: "paradoks-dvukh-konvertov-kalkulyator"
    },
    titles: {
      en: "Two Envelopes Paradox Calculator - Decision Theory",
      "zh-CN": "两封信封悖论计算器",
      "zh-TW": "兩封信封悖論計算器",
      ja: "二つの封筒パラドックス計算機",
      ko: "두 봉투 역설 계산기",
      es: "Calculadora de la paradoja de los dos sobres",
      fr: "Calculateur du paradoxe des deux enveloppes",
      de: "Rechner für das Zwei-Umschläge-Paradoxon",
      pt: "Calculadora do paradoxo dos dois envelopes",
      ru: "Калькулятор парадокса двух конвертов"
    },
    descriptions: {
      en: "Explore the Two Envelopes Paradox interactively. Calculate expected values for switching or keeping, and understand the probability math behind this puzzle.",
      "zh-CN": "互动探索两封信封悖论。计算切换或保留的期望值，并理解背后的概率数学。",
      "zh-TW": "互動探索兩封信封悖論。計算切換或保留的期望值，並理解背後的機率數學。",
      ja: "二つの封筒パラドックスを対話的に検証。交換・維持の期待値を計算し、確率の仕組みを理解できます。",
      ko: "두 봉투 역설을 인터랙티브하게 살펴보세요. 바꾸기와 유지의 기대값을 계산하고 확률의 수학을 이해할 수 있습니다.",
      es: "Explora la paradoja de los dos sobres de forma interactiva. Calcula el valor esperado al cambiar o quedarse y entiende la probabilidad detrás.",
      fr: "Explorez le paradoxe des deux enveloppes de façon interactive. Calculez la valeur espérée en changeant ou en gardant et comprenez la probabilité.",
      de: "Erkunden Sie das Zwei-Umschläge-Paradoxon interaktiv. Berechnen Sie Erwartungswerte für Wechseln oder Behalten und verstehen Sie die Wahrscheinlichkeit.",
      pt: "Explore o paradoxo dos dois envelopes de forma interativa. Calcule o valor esperado ao trocar ou manter e entenda a probabilidade por trás.",
      ru: "Интерактивно исследуйте парадокс двух конвертов. Считайте матожидание при смене или сохранении и поймите математику вероятностей."
    }
  },
  {
    id: "uniform-distribution-calculator",
    category: "statistic",
    slugs: {
      en: "uniform-distribution-calculator",
      "zh-CN": "junyun-fenbu-jisuanqi",
      "zh-TW": "junyun-fenbu-jisuanqi",
      ja: "itou-bunpu-keisanki",
      ko: "gyundeung-bunpo-gyesangi",
      es: "calculadora-distribucion-uniforme",
      fr: "calculatrice-distribution-uniforme",
      de: "gleichverteilungsrechner",
      pt: "calculadora-distribuicao-uniforme",
      ru: "kalkulyator-ravnomernogo-raspredeleniya"
    },
    titles: {
      en: "Uniform Distribution Calculator - PDF, CDF & Mean",
      "zh-CN": "均匀分布计算器 - PDF、CDF 和均值",
      "zh-TW": "均勻分布計算器 - PDF、CDF 和平均數",
      ja: "一様分布計算機 - PDF、CDF、平均値",
      ko: "균등분포 계산기 - PDF, CDF, 평균",
      es: "Calculadora de distribución uniforme - PDF, CDF y media",
      fr: "Calculatrice de loi uniforme - PDF, CDF et moyenne",
      de: "Gleichverteilungsrechner - PDF, CDF und Mittelwert",
      pt: "Calculadora de distribuição uniforme - PDF, CDF e média",
      ru: "Калькулятор равномерного распределения - PDF, CDF, среднее"
    },
    descriptions: {
      en: "Calculate PDF, CDF, mean, variance, and interval probability for any uniform distribution. Enter the range parameters a and b to get instant results.",
      "zh-CN": "计算任意连续均匀分布的 PDF、CDF、均值、方差和区间概率，输入 a 和 b 即可快速得到结果。",
      "zh-TW": "計算任意連續均勻分布的 PDF、CDF、平均數、變異數與區間機率，輸入 a 和 b 即可立即取得結果。",
      ja: "任意の連続一様分布について、PDF、CDF、平均値、分散、区間確率を計算します。a と b を入力するとすぐに結果が出ます。",
      ko: "임의의 연속 균등분포에 대해 PDF, CDF, 평균, 분산, 구간 확률을 계산합니다. a와 b를 입력하면 즉시 결과를 확인할 수 있습니다.",
      es: "Calcula la PDF, CDF, media, varianza y probabilidad de intervalo de cualquier distribución uniforme continua. Ingresa a y b para ver resultados al instante.",
      fr: "Calculez la PDF, la CDF, la moyenne, la variance et la probabilité d’intervalle pour toute loi uniforme continue. Entrez a et b pour obtenir le résultat.",
      de: "Berechnen Sie PDF, CDF, Mittelwert, Varianz und Intervallwahrscheinlichkeit für jede stetige Gleichverteilung. Geben Sie a und b ein, um sofort Ergebnisse zu sehen.",
      pt: "Calcule PDF, CDF, média, variância e probabilidade de intervalo para qualquer distribuição uniforme contínua. Informe a e b para obter resultados instantâneos.",
      ru: "Рассчитайте PDF, CDF, среднее, дисперсию и вероятность интервала для любого непрерывного равномерного распределения. Введите a и b, чтобы сразу получить результат."
    }
  },
  {
    id: "upper-and-lower-fence-calculator",
    category: "statistic",
    slugs: {
      en: "upper-and-lower-fence-calculator",
      "zh-CN": "si-fen-wei-ju-yi-chang-zhi-shang-xia-jie-ji-suan-qi",
      "zh-TW": "si-fen-wei-ju-yi-chang-zhi-shang-xia-jie-ji-suan-qi",
      ja: "iqr-hazurechi-jogen-kakeisan",
      ko: "iqr-isangchi-sang-hahan-gyesan-gi",
      es: "calculadora-limite-superior-inferior-iqr",
      fr: "calculateur-bornes-iqr-valeurs-aberrantes",
      de: "iqr-ausreisser-grenzen-rechner",
      pt: "calculadora-limites-iqr-outliers",
      ru: "kalkulyator-verkhney-i-nizhney-granits-iqr"
    },
    titles: {
      en: "Upper and Lower Fence Calculator - IQR Outliers",
      "zh-CN": "四分位距异常值上下界计算器",
      "zh-TW": "四分位距異常值上下界計算器",
      ja: "IQR外れ値の上限・下限計算機",
      ko: "IQR 이상치 상·하한 계산기",
      es: "Calculadora de límites IQR para outliers",
      fr: "Calculateur de bornes IQR pour outliers",
      de: "IQR-Ausreißer-Grenzen Rechner",
      pt: "Calculadora de limites IQR para outliers",
      ru: "Калькулятор верхней и нижней границ IQR"
    },
    descriptions: {
      en: "Calculate upper and lower fences using the IQR method to identify outliers in your dataset. Instantly find Q1, Q3, IQR, and all data points outside the fences.",
      "zh-CN": "使用 IQR 方法计算上下界，快速找出数据集中的 Q1、Q3、IQR 和所有异常值。",
      "zh-TW": "使用 IQR 方法計算上下界，快速找出資料集中的 Q1、Q3、IQR 與所有異常值。",
      ja: "IQR法で上限・下限を計算し、データ内のQ1、Q3、IQR、外れ値をすぐに確認できます。",
      ko: "IQR 방법으로 상·하한을 계산해 데이터의 Q1, Q3, IQR, 이상치를 바로 찾습니다.",
      es: "Calcula los límites superior e inferior con el método IQR para encontrar Q1, Q3, IQR y valores atípicos.",
      fr: "Calculez les bornes supérieure et inférieure avec la méthode IQR pour trouver Q1, Q3, l’IQR et les valeurs aberrantes.",
      de: "Berechnen Sie obere und untere Grenzen mit der IQR-Methode und finden Sie Q1, Q3, IQR und Ausreißer.",
      pt: "Calcule os limites superior e inferior com o método IQR e encontre Q1, Q3, IQR e outliers.",
      ru: "Рассчитайте верхнюю и нижнюю границы методом IQR и быстро найдите Q1, Q3, IQR и выбросы."
    }
  },
  {
    id: "upper-control-limit-calculator",
    category: "statistic",
    slugs: {
      en: "upper-control-limit-calculator",
      "zh-CN": "shang-kong-zhi-xian-ucl-ji-suan-qi",
      "zh-TW": "shang-kong-zhi-xian-ucl-ji-suan-qi",
      ja: "joko-seigen-ucl-keisan-ki",
      ko: "sanghan-gwanri-han-gye-ucl-gyesan-gi",
      es: "calculadora-limite-superior-control-ucl",
      fr: "calculateur-limite-superieure-controle-ucl",
      de: "oberer-kontrollgrenzwert-ucl-rechner",
      pt: "calculadora-limite-superior-controle-ucl",
      ru: "kalkulyator-verkhnego-kontrolnogo-predela-ucl"
    },
    titles: {
      en: "Upper Control Limit (UCL) Calculator - SPC Charts",
      "zh-CN": "上控制限（UCL）计算器",
      "zh-TW": "上管制限（UCL）計算機",
      ja: "上方管理限界（UCL）計算機",
      ko: "상한 관리 한계(UCL) 계산기",
      es: "Calculadora del límite superior de control (UCL)",
      fr: "Calculateur de limite supérieure de contrôle (UCL)",
      de: "Rechner für obere Kontrollgrenze (UCL)",
      pt: "Calculadora de limite superior de controle (UCL)",
      ru: "Калькулятор верхнего контрольного предела (UCL)"
    },
    descriptions: {
      en: "Calculate the Upper Control Limit (UCL) for statistical process control charts. Enter raw data or summary stats to monitor process variation and quality.",
      "zh-CN": "输入原始数据或汇总统计量，计算统计过程控制图的UCL和LCL，用于监控过程波动与质量。",
      "zh-TW": "輸入原始資料或彙總統計量，計算統計製程管制圖的UCL與LCL，用來監控流程波動與品質。",
      ja: "生データまたは要約統計量からSPC管理図のUCLとLCLを計算し、工程のばらつきと品質を監視します。",
      ko: "원시 데이터 또는 요약 통계로 SPC 관리도의 UCL과 LCL을 계산해 공정 변동과 품질을 모니터링합니다.",
      es: "Calcula el UCL y el LCL de cartas SPC con datos brutos o estadísticas resumidas para vigilar la variación y la calidad del proceso.",
      fr: "Calculez UCL et LCL des cartes SPC à partir de données brutes ou de statistiques résumées pour surveiller la variation et la qualité.",
      de: "Berechnen Sie UCL und LCL für SPC-Kontrollkarten mit Rohdaten oder zusammengefassten Statistiken, um Variation und Qualität zu überwachen.",
      pt: "Calcule o UCL e o LCL de cartas SPC com dados brutos ou estatísticas resumidas para acompanhar a variação e a qualidade do processo.",
      ru: "Рассчитайте UCL и LCL для контрольных карт SPC по исходным данным или сводной статистике, чтобы отслеживать вариацию и качество процесса."
    }
  },
  {
    id: "variance-calculator",
    category: "statistic",
    slugs: {
      en: "variance-calculator",
      "zh-CN": "fangcha-jisuanqi",
      "zh-TW": "fangcha-jisuanqi",
      ja: "bunsan-keisanki",
      ko: "bunsan-gyesangi",
      es: "calculadora-varianza",
      fr: "calculateur-variance",
      de: "varianz-rechner",
      pt: "calculadora-variancia",
      ru: "kalkulyator-dispersii"
    },
    titles: {
      en: "Variance Calculator - Sample & Population Variance",
      "zh-CN": "方差计算器",
      "zh-TW": "方差計算器",
      ja: "分散計算機",
      ko: "분산 계산기",
      es: "Calculadora de varianza",
      fr: "Calculateur de variance",
      de: "Varianzrechner",
      pt: "Calculadora de variância",
      ru: "Калькулятор дисперсии"
    },
    descriptions: {
      en: "Variance calculator for sample and population data. Computes variance, standard deviation, mean, median, mode, and IQR from any list of numbers instantly.",
      "zh-CN": "样本和总体方差计算器，可即时计算方差、标准差、均值、中位数、众数和四分位距。",
      "zh-TW": "樣本與母體方差計算器，可即時計算方差、標準差、平均數、中位數、眾數與四分位距。",
      ja: "標本と母集団の分散計算機。分散、標準偏差、平均値、中央値、最頻値、四分位範囲を即座に算出します。",
      ko: "표본과 모집단 분산 계산기. 분산, 표준편차, 평균, 중앙값, 최빈값, 사분위범위를 즉시 계산합니다.",
      es: "Calculadora de varianza muestral y poblacional. Calcula varianza, desviación estándar, media, mediana, moda e IQR al instante.",
      fr: "Calculateur de variance d’échantillon et de population. Calcule instantanément variance, écart type, moyenne, médiane, mode et IQR.",
      de: "Varianzrechner für Stichprobe und Grundgesamtheit. Berechnet Varianz, Standardabweichung, Mittelwert, Median, Modus und IQR sofort.",
      pt: "Calculadora de variância amostral e populacional. Calcula variância, desvio padrão, média, mediana, moda e IQR instantaneamente.",
      ru: "Калькулятор выборочной и генеральной дисперсии. Мгновенно считает дисперсию, стандартное отклонение, среднее, медиану, моду и IQR."
    }
  },
  {
    id: "venn-diagram-calculator",
    category: "statistic",
    slugs: {
      en: "venn-diagram-calculator",
      "zh-CN": "wen-shi-tu-ji-suan-qi",
      "zh-TW": "wen-shi-tu-ji-suan-qi",
      ja: "ben-zu-kei-keisan-ki",
      ko: "ben-daieogeuraem-gyesangi",
      es: "calculadora-diagrama-venn",
      fr: "calculateur-diagramme-venn",
      de: "venn-diagramm-rechner",
      pt: "calculadora-diagrama-venn",
      ru: "kalkulyator-diagrammy-venna"
    },
    titles: {
      en: "Venn Diagram Calculator - Union, Intersection & Difference",
      "zh-CN": "文氏图计算器 - 并集、交集与差集",
      "zh-TW": "文氏圖計算器 - 聯集、交集與差集",
      ja: "ベン図計算機 - 和集合・共通部分・差集合",
      ko: "벤 다이어그램 계산기 - 합집합, 교집합, 차집합",
      es: "Calculadora de diagramas de Venn - Unión e intersección",
      fr: "Calculateur de diagramme de Venn - Union et intersection",
      de: "Venn-Diagramm-Rechner - Vereinigung, Schnittmenge",
      pt: "Calculadora de diagrama de Venn - União e interseção",
      ru: "Калькулятор диаграммы Венна - объединение и пересечение"
    },
    descriptions: {
      en: "Venn diagram calculator for 2 and 3 sets. Find union, intersection, and exclusive regions instantly — ideal for set theory, probability, and survey analysis.",
      "zh-CN": "适用于2个和3个集合的文氏图计算器，可快速求并集、交集和独有区域，适合集合论、概率和调查分析。",
      "zh-TW": "適用於2個與3個集合的文氏圖計算器，可快速求聯集、交集與獨有區域，適合集合論、機率與問卷分析。",
      ja: "2集合・3集合対応のベン図計算機。和集合、共通部分、排他的領域をすばやく計算。集合論、確率、調査分析に最適です。",
      ko: "2개 및 3개 집합용 벤 다이어그램 계산기. 합집합, 교집합, 배타 영역을 즉시 계산해 집합론, 확률, 설문 분석에 적합합니다.",
      es: "Calculadora de diagramas de Venn para 2 y 3 conjuntos. Halla unión, intersección y regiones exclusivas al instante para teoría de conjuntos y encuestas.",
      fr: "Calculateur de diagramme de Venn pour 2 et 3 ensembles. Trouvez union, intersection et régions exclusives, idéal pour ensembles, probabilités et enquêtes.",
      de: "Venn-Diagramm-Rechner für 2 und 3 Mengen. Finden Sie Vereinigung, Schnittmenge und exklusive Bereiche sofort für Mengenlehre, Wahrscheinlichkeit und Umfragen.",
      pt: "Calculadora de diagrama de Venn para 2 e 3 conjuntos. Encontre união, interseção e regiões exclusivas na hora para conjuntos, probabilidade e pesquisas.",
      ru: "Калькулятор диаграмм Венна для 2 и 3 множеств. Быстро находите объединение, пересечение и исключительные области для теории множеств, вероятности и опросов."
    }
  },
  {
    id: "wald-test-calculator",
    category: "statistic",
    slugs: {
      en: "wald-test-calculator",
      "zh-CN": "wald-jianyan-jisuanqi",
      "zh-TW": "wald-jianyan-jisuanqi",
      ja: "wald-kentei-keisanki",
      ko: "wald-geomjeong-gyesangi",
      es: "calculadora-prueba-wald",
      fr: "calculateur-test-wald",
      de: "wald-test-rechner",
      pt: "calculadora-teste-wald",
      ru: "kalkulyator-kriteriya-valda"
    },
    titles: {
      en: "Wald Test Calculator - Statistical Significance",
      "zh-CN": "Wald检验计算器 - 统计显著性",
      "zh-TW": "Wald檢定計算器 - 統計顯著性",
      ja: "Wald検定計算機 - 統計的有意性",
      ko: "Wald 검정 계산기 - 통계적 유의성",
      es: "Calculadora de prueba de Wald - Significancia",
      fr: "Calculateur de test de Wald - Significativité",
      de: "Wald-Test-Rechner - Statistische Signifikanz",
      pt: "Calculadora de teste de Wald - Significância",
      ru: "Калькулятор критерия Вальда - Значимость"
    },
    descriptions: {
      en: "Wald test calculator for statistical significance. Enter parameter estimate, standard error, and alpha level to get the Wald statistic, z-score, and p-value.",
      "zh-CN": "用于统计显著性的Wald检验计算器。输入参数估计值、标准误和显著性水平，获取Wald统计量、z分数和p值。",
      "zh-TW": "用於統計顯著性的Wald檢定計算器。輸入參數估計值、標準誤與顯著水準，取得Wald統計量、z分數與p值。",
      ja: "統計的有意性を判定するWald検定計算機。パラメータ推定値、標準誤差、有意水準を入力してWald統計量、zスコア、p値を取得。",
      ko: "통계적 유의성을 위한 Wald 검정 계산기입니다. 모수 추정값, 표준오차, 유의수준을 입력해 Wald 통계량, z점수, p값을 확인하세요.",
      es: "Calculadora de prueba de Wald para significancia estadística. Introduce estimación, error estándar y alfa para obtener W, z y valor p.",
      fr: "Calculateur de test de Wald pour la significativité statistique. Saisissez estimation, erreur standard et alpha pour obtenir W, score z et valeur p.",
      de: "Wald-Test-Rechner für statistische Signifikanz. Schätzung, Standardfehler und Alpha eingeben und Wald-Statistik, z-Wert und p-Wert erhalten.",
      pt: "Calculadora de teste de Wald para significância estatística. Informe estimativa, erro padrão e alfa para obter W, escore z e valor p.",
      ru: "Калькулятор критерия Вальда для статистической значимости. Введите оценку, стандартную ошибку и альфа, чтобы получить W, z и p-значение."
    }
  },
  {
    id: "weibull-distribution-calculator",
    category: "statistic",
    slugs: {
      en: "weibull-distribution-calculator",
      "zh-CN": "weibuer-fenbu-jisuanqi",
      "zh-TW": "weibuer-fenbu-jisuanqi",
      ja: "waiburu-bunpu-keisanki",
      ko: "waibeul-bunpo-gyesan-gi",
      es: "calculadora-distribucion-weibull",
      fr: "calculateur-distribution-weibull",
      de: "weibull-verteilungsrechner",
      pt: "calculadora-distribuicao-weibull",
      ru: "kalkulyator-raspredeleniya-veibulla"
    },
    titles: {
      en: "Weibull Distribution Calculator - PDF, CDF & Reliability",
      "zh-CN": "韦布尔分布计算器 - PDF、CDF 与可靠性",
      "zh-TW": "韋布爾分布計算器 - PDF、CDF 與可靠度",
      ja: "ワイブル分布計算機 - PDF、CDF、信頼性",
      ko: "와이블 분포 계산기 - PDF, CDF 및 신뢰성",
      es: "Calculadora de distribución Weibull - PDF, CDF y fiabilidad",
      fr: "Calculateur de Weibull - PDF, CDF et fiabilité",
      de: "Weibull-Verteilungsrechner - PDF, CDF und Zuverlässigkeit",
      pt: "Calculadora Weibull - PDF, CDF e confiabilidade",
      ru: "Калькулятор распределения Вейбулла - PDF, CDF и надёжность"
    },
    descriptions: {
      en: "Weibull distribution calculator for reliability analysis. Compute PDF, CDF, hazard rate, mean, median, and variance from shape and scale parameters instantly.",
      "zh-CN": "韦布尔分布可靠性分析计算器。根据形状和尺度参数，立即计算 PDF、CDF、失效率、均值、中位数和方差。",
      "zh-TW": "韋布爾分布可靠度分析計算器。依形狀與尺度參數，立即計算 PDF、CDF、失效率、平均數、中位數與變異數。",
      ja: "信頼性解析向けのワイブル分布計算機。形状と尺度のパラメータから、PDF、CDF、ハザード率、平均、中央値、分散を即座に算出します。",
      ko: "신뢰성 분석용 와이블 분포 계산기입니다. 형상과 척도 매개변수로 PDF, CDF, 고장률, 평균, 중앙값, 분산을 즉시 계산합니다.",
      es: "Calculadora de distribución Weibull para análisis de fiabilidad. Calcula PDF, CDF, tasa de riesgo, media, mediana y varianza al instante.",
      fr: "Calculateur de distribution de Weibull pour l'analyse de fiabilité. Calculez instantanément PDF, CDF, taux de défaillance, moyenne, médiane et variance.",
      de: "Weibull-Verteilungsrechner für Zuverlässigkeitsanalysen. Berechnen Sie PDF, CDF, Hazard-Rate, Mittelwert, Median und Varianz sofort.",
      pt: "Calculadora da distribuição de Weibull para análise de confiabilidade. Calcule PDF, CDF, taxa de risco, média, mediana e variância instantaneamente.",
      ru: "Калькулятор распределения Вейбулла для анализа надёжности. Мгновенно вычисляет PDF, CDF, интенсивность отказов, среднее, медиану и дисперсию."
    }
  },
  {
    id: "weighted-mean-calculator",
    category: "statistic",
    slugs: {
      en: "weighted-mean-calculator",
      "zh-CN": "jiaquan-pingjun-jisuanqi",
      "zh-TW": "jiaquan-pingjun-jisuanqi",
      ja: "juka-heikin-keisanki",
      ko: "gajung-pyeonggyun-gyesan-gi",
      es: "calculadora-media-ponderada",
      fr: "calculateur-moyenne-ponderee",
      de: "gewichteter-mittelwert-rechner",
      pt: "calculadora-media-ponderada",
      ru: "vzveshennoye-sredneye-kalkulyator"
    },
    titles: {
      en: "Weighted Mean Calculator - Calculate Weighted Average",
      "zh-CN": "加权平均计算器 - 计算加权平均值",
      "zh-TW": "加權平均計算器 - 計算加權平均值",
      ja: "加重平均計算機 - 加重平均を計算",
      ko: "가중 평균 계산기 - 가중 평균 계산",
      es: "Calculadora de media ponderada - Calcula el promedio",
      fr: "Calculateur de moyenne pondérée - Calculer la moyenne",
      de: "Gewichteter Mittelwert Rechner - Mittelwert berechnen",
      pt: "Calculadora de média ponderada - Calcule a média",
      ru: "Калькулятор взвешенного среднего - Рассчитать среднее"
    },
    descriptions: {
      en: "Weighted mean calculator for grades, finance, and surveys. Enter values and weights to compute the weighted average — supports any number of data points.",
      "zh-CN": "适用于成绩、金融和调查的加权平均计算器。输入数值和权重即可计算加权平均值，支持任意数量的数据点。",
      "zh-TW": "適用於成績、金融與調查的加權平均計算器。輸入數值和權重即可計算加權平均值，支援任意數量的資料點。",
      ja: "成績、金融、調査に使える加重平均計算機。値と重みを入力して、任意のデータ数の加重平均を求められます。",
      ko: "성적, 금융, 설문에 사용할 수 있는 가중 평균 계산기입니다. 값과 가중치를 입력해 임의 개수의 데이터의 가중 평균을 구하세요.",
      es: "Calculadora de media ponderada para notas, finanzas y encuestas. Ingresa valores y pesos para calcular el promedio ponderado.",
      fr: "Calculateur de moyenne pondérée pour notes, finance et sondages. Saisissez des valeurs et des poids pour obtenir la moyenne pondérée.",
      de: "Gewichteter Mittelwert Rechner für Noten, Finanzen und Umfragen. Werte und Gewichte eingeben und den gewichteten Durchschnitt berechnen.",
      pt: "Calculadora de média ponderada para notas, finanças e pesquisas. Insira valores e pesos para calcular a média ponderada.",
      ru: "Калькулятор взвешенного среднего для оценок, финансов и опросов. Введите значения и веса, чтобы вычислить взвешенное среднее."
    }
  },
  {
    id: "smp-x-distribution-calculator",
    category: "statistic",
    slugs: {
      en: "smp-x-distribution-calculator",
      "zh-CN": "chouyang-pingjun-shu-fenbu-ji-suan-qi",
      "zh-TW": "chouyang-pingjun-shu-fenbu-ji-suan-qi",
      ja: "hyohon-heikin-hyohon-bunpu-keisan",
      ko: "pyobon-pyeonggyun-pyobon-bunpo-gyesangi",
      es: "calculadora-distribucion-media-muestral",
      fr: "calculateur-distribution-moyenne-echantillon",
      de: "stichprobenmittelwert-verteilung-rechner",
      pt: "calculadora-distribuicao-media-amostral",
      ru: "kalkulyator-raspredeleniya-vyborochnogo-srednego"
    },
    titles: {
      en: "Sampling Distribution of Sample Mean Calculator",
      "zh-CN": "样本均值抽样分布计算器",
      "zh-TW": "樣本平均數抽樣分布計算器",
      ja: "標本平均の標本分布計算機",
      ko: "표본평균 표본분포 계산기",
      es: "Calculadora de distribución de la media muestral",
      fr: "Calculateur de distribution de la moyenne d’échantillon",
      de: "Rechner für Verteilung des Stichprobenmittelwerts",
      pt: "Calculadora de distribuição da média amostral",
      ru: "Калькулятор распределения выборочного среднего"
    },
    descriptions: {
      en: "Sampling distribution of the sample mean calculator: find SE, z-score, and probability (less than, greater than, between) using the Central Limit Theorem.",
      "zh-CN": "样本均值抽样分布计算器：用中心极限定理求标准误、z 分数及小于、大于、区间概率。",
      "zh-TW": "樣本平均數抽樣分布計算器：用中央極限定理求標準誤、z 分數，以及小於、大於、區間機率。",
      ja: "標本平均の標本分布計算機：中心極限定理で標準誤差、zスコア、小さい・大きい・範囲内の確率を計算します。",
      ko: "표본평균의 표본분포 계산기: 중심극한정리로 표준오차, z-점수, 작음·큼·구간 확률을 계산합니다.",
      es: "Calculadora de distribución de la media muestral: calcula error estándar, z y probabilidades menor que, mayor que o entre valores.",
      fr: "Calculez la distribution de la moyenne d’échantillon : erreur standard, score z et probabilités inférieur, supérieur ou entre deux valeurs.",
      de: "Berechnen Sie Standardfehler, z-Wert und Wahrscheinlichkeiten für den Stichprobenmittelwert mit dem zentralen Grenzwertsatz.",
      pt: "Calculadora da distribuição da média amostral: encontre erro padrão, escore z e probabilidades menor que, maior que ou entre valores.",
      ru: "Калькулятор распределения выборочного среднего: стандартная ошибка, z-оценка и вероятности меньше, больше или между значениями."
    }
  },
  {
    id: "spearmans-correlation-calculator",
    category: "statistic",
    slugs: {
      en: "spearmans-correlation-calculator",
      "zh-CN": "spearman-dengji-xiangguan-ji-suanqi",
      "zh-TW": "spearman-dengji-xiangguan-ji-suanqi",
      ja: "spearman-junii-sokkan-keisanki",
      ko: "spearman-junwi-sanggwan-gyeonggye-calculator",
      es: "calculadora-correlacion-spearman",
      fr: "calculateur-correlation-spearman",
      de: "spearman-rangkorrelation-rechner",
      pt: "calculadora-correlacao-spearman",
      ru: "kalkulyator-korrelyatsii-spearmana"
    },
    titles: {
      en: "Spearman's Correlation Calculator - Rank Correlation",
      "zh-CN": "Spearman等级相关计算器",
      "zh-TW": "Spearman等級相關計算器",
      ja: "Spearman順位相関計算機",
      ko: "Spearman 순위상관 계산기",
      es: "Calculadora de correlación de Spearman",
      fr: "Calculateur de corrélation de Spearman",
      de: "Spearman-Rangkorrelationsrechner",
      pt: "Calculadora de correlação de Spearman",
      ru: "Калькулятор корреляции Спирмена"
    },
    descriptions: {
      en: "Spearman's rank correlation calculator: compute ρ for two datasets. Measures monotonic relationships without normality requirements — ideal for ordinal data.",
      "zh-CN": "Spearman等级相关计算器：计算两组数据的ρ，衡量单调关系强度，无需满足正态分布假设，适合顺序数据。",
      "zh-TW": "Spearman等級相關計算器：計算兩組資料的ρ，衡量單調關係強度，無需正態分布假設，適合順序資料。",
      ja: "Spearman順位相関計算機：2つのデータのρを計算し、正規性を仮定せずに単調関係の強さを測定します。",
      ko: "Spearman 순위상관 계산기: 두 데이터의 ρ를 계산해 정규성 가정 없이 단조 관계의 강도를 측정합니다.",
      es: "Calculadora de correlación de Spearman: calcula ρ para dos conjuntos y mide relaciones monótonas sin asumir normalidad.",
      fr: "Calculateur de corrélation de Spearman : calcule ρ pour deux jeux de données et mesure des relations monotones sans supposer la normalité.",
      de: "Spearman-Rangkorrelationsrechner: berechnet ρ für zwei Datensätze und misst monotone Zusammenhänge ohne Normalitätsannahme.",
      pt: "Calculadora de correlação de Spearman: calcule ρ para dois conjuntos e meça relações monótonas sem exigir normalidade.",
      ru: "Калькулятор корреляции Спирмена: вычисляйте ρ для двух наборов данных и оценивайте монотонные связи без предположения о нормальности."
    }
  },
  {
    id: "standard-deviation-index-calculator",
    category: "statistic",
    slugs: {
      en: "standard-deviation-index-calculator",
      "zh-CN": "biaozhun-chaiyi-jisuanqi",
      "zh-TW": "biaozhun-chaiyi-jisuanqi",
      ja: "hyojunsa-keisanki",
      ko: "pyojunpcha-gye-san-gi",
      es: "calculadora-desviacion-estandar",
      fr: "calculateur-ecart-type",
      de: "standardabweichungsrechner",
      pt: "calculadora-desvio-padrao",
      ru: "kalkulyator-standardnogo-otkloneniya"
    },
    titles: {
      en: "Standard Deviation Calculator - Sample & Population SD",
      "zh-CN": "标准差计算器：样本与总体",
      "zh-TW": "標準差計算器：樣本與母體",
      ja: "標準偏差計算機：標本と母集団",
      ko: "표준편차 계산기: 표본과 모집단",
      es: "Calculadora de desviación estándar: muestra y población",
      fr: "Calculateur d’écart type : échantillon et population",
      de: "Standardabweichungsrechner: Stichprobe und Grundgesamtheit",
      pt: "Calculadora de desvio padrão: amostra e população",
      ru: "Калькулятор стандартного отклонения: выборка и совокупность"
    },
    descriptions: {
      en: "Standard deviation calculator: compute sample SD, population SD, mean, variance, and CV from any dataset. Enter numbers and get results instantly.",
      "zh-CN": "标准差计算器：可从任意数据集计算样本标准差、总体标准差、均值、方差和变异系数。输入数字即可立即得到结果。",
      "zh-TW": "標準差計算器：可從任意資料集計算樣本標準差、母體標準差、平均數、變異數與變異係數。輸入數字即可立即得到結果。",
      ja: "標準偏差計算機：任意のデータから標本標準偏差、母集団標準偏差、平均、分散、変動係数を計算。数字を入力するとすぐ結果が表示されます。",
      ko: "표준편차 계산기: 어떤 데이터셋이든 표본 표준편차, 모집단 표준편차, 평균, 분산, 변동계수를 계산합니다. 숫자를 입력하면 즉시 결과를 볼 수 있습니다.",
      es: "Calculadora de desviación estándar: calcula la desviación muestral, poblacional, la media, la varianza y el CV de cualquier conjunto de datos.",
      fr: "Calculateur d’écart type : calcule l’écart type d’échantillon, de population, la moyenne, la variance et le CV pour n’importe quelles données.",
      de: "Standardabweichungsrechner: Berechnet Stichproben- und Populations-SD, Mittelwert, Varianz und CV aus beliebigen Daten.",
      pt: "Calculadora de desvio padrão: calcule o desvio amostral e populacional, a média, a variância e o CV de qualquer conjunto de dados.",
      ru: "Калькулятор стандартного отклонения: считает выборочное и генеральное SD, среднее, дисперсию и CV для любых данных."
    }
  },
  {
    id: "standard-deviation-of-sample-mean-calculator",
    category: "statistic",
    slugs: {
      en: "standard-deviation-of-sample-mean-calculator",
      "zh-CN": "yangben-junzhi-biaozhuncha-jisuanqi",
      "zh-TW": "yangben-junzhi-biaozhunwu-jisuanqi",
      ja: "hyojun-gosa-keisanki",
      ko: "pyobon-pyeonggyun-pyojun-oryu-gyesangi",
      es: "calculadora-error-estandar-media",
      fr: "calculateur-erreur-standard-moyenne",
      de: "standardfehler-mittelwert-rechner",
      pt: "calculadora-erro-padrao-media",
      ru: "kalkulyator-standartnoy-oshibki-srednego"
    },
    titles: {
      en: "Standard Deviation of Sample Mean Calculator (SEM)",
      "zh-CN": "样本均值标准误计算器（SEM）",
      "zh-TW": "樣本平均數標準誤計算器（SEM）",
      ja: "標本平均の標準誤差計算機（SEM）",
      ko: "표본평균 표준오차 계산기(SEM)",
      es: "Calculadora del error estándar de la media (SEM)",
      fr: "Calculateur d’erreur standard de la moyenne (SEM)",
      de: "Standardfehler-des-Mittelwerts-Rechner (SEM)",
      pt: "Calculadora do erro padrão da média (SEM)",
      ru: "Калькулятор стандартной ошибки среднего (SEM)"
    },
    descriptions: {
      en: "Standard deviation of sample mean (SEM) calculator: compute SEM, mean, variance, and SD from raw data. Enter comma-separated numbers to get results instantly.",
      "zh-CN": "样本均值标准误（SEM）计算器：从原始数据计算SEM、均值、方差和标准差。输入逗号分隔的数字即可得到结果。",
      "zh-TW": "樣本平均數標準誤（SEM）計算器：由原始資料計算SEM、平均數、變異數與標準差。輸入逗號分隔數字即可取得結果。",
      ja: "標本平均の標準誤差（SEM）計算機：生データからSEM、平均、分散、標準偏差を計算。カンマ区切りの数値で即時に結果を表示。",
      ko: "표본평균 표준오차(SEM) 계산기: 원자료에서 SEM, 평균, 분산, 표준편차를 계산합니다. 쉼표로 구분한 숫자를 입력하세요.",
      es: "Calculadora del error estándar de la media (SEM): calcula SEM, media, varianza y desviación estándar desde datos sin procesar.",
      fr: "Calculateur d’erreur standard de la moyenne (SEM) : calculez SEM, moyenne, variance et écart-type à partir de données brutes.",
      de: "Standardfehler-des-Mittelwerts-Rechner (SEM): SEM, Mittelwert, Varianz und Standardabweichung aus Rohdaten berechnen.",
      pt: "Calculadora do erro padrão da média (SEM): calcule SEM, média, variância e desvio padrão a partir de dados brutos.",
      ru: "Калькулятор стандартной ошибки среднего (SEM): вычисляйте SEM, среднее, дисперсию и стандартное отклонение по сырым данным."
    }
  },
  {
    id: "standard-error-calculator",
    category: "statistic",
    slugs: {
      en: "standard-error-calculator",
      "zh-CN": "biaozhun-wucha-jiisuanqi",
      "zh-TW": "biaozhun-wucha-jiisuanqi",
      ja: "hyojun-gosa-keisanki",
      ko: "pyojun-ocha-gyesan-gi",
      es: "calculadora-error-estandar",
      fr: "calculateur-erreur-standard",
      de: "standardfehler-rechner",
      pt: "calculadora-erro-padrao",
      ru: "kalkulyator-standartnoy-oshibki"
    },
    titles: {
      en: "Standard Error Calculator - SE from Raw Data or Summary",
      "zh-CN": "标准误差计算器：原始数据或汇总",
      "zh-TW": "標準誤計算機：原始資料或彙總",
      ja: "標準誤差計算機：生データと要約",
      ko: "표준오차 계산기: 원자료 또는 요약",
      es: "Calculadora de error estándar: datos o resumen",
      fr: "Calculateur d’erreur standard : données ou résumé",
      de: "Standardfehler-Rechner: Rohdaten oder Zusammenfassung",
      pt: "Calculadora de erro padrão: dados ou resumo",
      ru: "Калькулятор стандартной ошибки: данные или сводка"
    },
    descriptions: {
      en: "Standard error calculator: compute SE from raw data or summary statistics. Includes confidence intervals at 90%, 95%, and 99% — free and accurate.",
      "zh-CN": "标准误差计算器：可根据原始数据或汇总统计计算 SE，并提供 90%、95% 和 99% 置信区间，免费且准确。",
      "zh-TW": "標準誤計算機：可依原始資料或彙總統計計算 SE，並提供 90%、95% 與 99% 信賴區間，免費且準確。",
      ja: "生データまたは要約統計からSEを計算。90%、95%、99%の信頼区間に対応した、無料で正確な標準誤差計算機です。",
      ko: "원자료나 요약 통계로 SE를 계산합니다. 90%, 95%, 99% 신뢰구간을 지원하는 무료 정확한 표준오차 계산기입니다.",
      es: "Calcula el error estándar desde datos brutos o estadísticas resumidas. Incluye intervalos de confianza al 90%, 95% y 99%.",
      fr: "Calculez l’erreur standard à partir de données brutes ou de statistiques résumées. Intervalles de confiance à 90 %, 95 % et 99 % inclus.",
      de: "Standardfehler berechnen aus Rohdaten oder zusammengefassten Statistiken. Mit Konfidenzintervallen bei 90 %, 95 % und 99 %.",
      pt: "Calcule o erro padrão a partir de dados brutos ou estatísticas resumidas. Inclui intervalos de confiança de 90%, 95% e 99%.",
      ru: "Рассчитайте стандартную ошибку по сырым данным или сводным статистикам. Интервалы доверия 90%, 95% и 99%."
    }
  },
  {
    id: "relative-standard-deviation-calculator",
    category: "statistic",
    slugs: {
      en: "relative-standard-deviation-calculator",
      "zh-CN": "xiangdui-biaozhuncha-jisuanqi",
      "zh-TW": "xiangdui-biaozhuncha-jisuanqi",
      ja: "sotai-hyojun-hensa-keisanki",
      ko: "sangdae-pyojun-pyeoncha-gyesangi",
      es: "calculadora-desviacion-estandar-relativa",
      fr: "calculateur-ecart-type-relatif",
      de: "relative-standardabweichung-rechner",
      pt: "calculadora-desvio-padrao-relativo",
      ru: "kalkulyator-otnositelnogo-standartnogo-otkloneniya"
    },
    titles: {
      en: "Relative Standard Deviation Calculator - RSD & CV",
      "zh-CN": "相对标准偏差计算器 - RSD 与 CV",
      "zh-TW": "相對標準差計算器 - RSD 與 CV",
      ja: "相対標準偏差計算機 - RSD・CV",
      ko: "상대표준편차 계산기 - RSD 및 CV",
      es: "Calculadora de desviación estándar relativa - RSD y CV",
      fr: "Calculateur d'écart type relatif - RSD et CV",
      de: "Rechner für relative Standardabweichung - RSD und CV",
      pt: "Calculadora de desvio padrão relativo - RSD e CV",
      ru: "Калькулятор относительного стандартного отклонения - RSD и CV"
    },
    descriptions: {
      en: "Calculate Relative Standard Deviation (RSD) and Coefficient of Variation (CV) instantly. Free statistical analysis tool for data dispersion and precision.",
      "zh-CN": "即时计算相对标准偏差 (RSD) 和变异系数 (CV)。免费统计分析工具，用于评估数据离散度和精密度。",
      "zh-TW": "即時計算相對標準差 (RSD) 與變異係數 (CV)。免費統計分析工具，用於評估資料離散度與精密度。",
      ja: "相対標準偏差 (RSD) と変動係数 (CV) をすばやく計算。データのばらつきと精度を分析する無料の統計ツールです。",
      ko: "상대표준편차(RSD)와 변동계수(CV)를 즉시 계산하세요. 데이터 산포와 정밀도를 분석하는 무료 통계 도구입니다.",
      es: "Calcula al instante la desviación estándar relativa (RSD) y el coeficiente de variación (CV). Herramienta estadística gratis para dispersión y precisión.",
      fr: "Calculez instantanément l'écart type relatif (RSD) et le coefficient de variation (CV). Outil statistique gratuit pour dispersion et précision.",
      de: "Berechne relative Standardabweichung (RSD) und Variationskoeffizient (CV) sofort. Kostenloses Statistiktool für Streuung und Präzision.",
      pt: "Calcule instantaneamente o desvio padrão relativo (RSD) e o coeficiente de variação (CV). Ferramenta estatística grátis para dispersão e precisão.",
      ru: "Мгновенно рассчитайте относительное стандартное отклонение (RSD) и коэффициент вариации (CV). Бесплатный инструмент для анализа разброса и точности."
    }
  },
  {
    id: "repeated-measures-anova-calculator",
    category: "statistic",
    slugs: {
      en: "repeated-measures-anova-calculator",
      "zh-CN": "chongfu-ce-liang-fangcha-fenxi-jisuanqi",
      "zh-TW": "chongfu-ce-liang-bianyi-fenxi-jisuanqi",
      ja: "jufuku-sokutei-bunsan-bunseki-keisanki",
      ko: "gwangbok-cejeong-bun-san-bunseok-gye-san-gi",
      es: "calculadora-anova-medidas-repetidas",
      fr: "calculateur-anova-mesures-repetees",
      de: "anova-wiederholte-messungen-rechner",
      pt: "calculadora-anova-medidas-repetidas",
      ru: "anova-povtornykh-izmereniy-kalkulyator"
    },
    titles: {
      en: "Repeated Measures ANOVA Calculator - η² and F",
      "zh-CN": "重复测量方差分析计算器 - F值与效应量",
      "zh-TW": "重複量數變異數分析計算器 - F值與效果量",
      ja: "反復測定分散分析計算機 - F値と効果量",
      ko: "반복측정 분산분석 계산기 - F값과 효과크기",
      es: "ANOVA de medidas repetidas - F y tamaño de efecto",
      fr: "ANOVA à mesures répétées - F et taille d'effet",
      de: "ANOVA mit Messwiederholung - F und Effektstärke",
      pt: "ANOVA de medidas repetidas - F e tamanho de efeito",
      ru: "ANOVA повторных измерений - F и размер эффекта"
    },
    descriptions: {
      en: "Perform one-way repeated measures ANOVA analysis. Enter subject data to get F-statistic, effect size (eta squared), and complete ANOVA table instantly.",
      "zh-CN": "进行单因素重复测量方差分析，输入受试者数据即可快速得到F统计量、η²效应量和完整ANOVA表。",
      "zh-TW": "進行單因子重複量數變異數分析，輸入受試者資料即可快速取得F統計量、η²效果量與完整ANOVA表。",
      ja: "一要因の反復測定分散分析を実行し、被験者データからF値、η²効果量、完全なANOVA表を即座に算出します。",
      ko: "일원 반복측정 분산분석을 수행해 피험자 데이터로부터 F통계량, η² 효과크기, 완전한 ANOVA 표를 즉시 확인하세요.",
      es: "Realiza un ANOVA de medidas repetidas de un factor y obtiene F, η² y una tabla ANOVA completa al instante.",
      fr: "Réalisez une ANOVA à mesures répétées à un facteur et obtenez instantanément F, η² et un tableau ANOVA complet.",
      de: "Führen Sie eine einfaktorielle ANOVA mit Messwiederholung durch und erhalten Sie sofort F, η² und eine vollständige ANOVA-Tabelle.",
      pt: "Faça uma ANOVA de medidas repetidas de um fator e obtenha F, η² e uma tabela ANOVA completa instantaneamente.",
      ru: "Выполните однофакторный ANOVA повторных измерений и сразу получите F, η² и полную ANOVA-таблицу."
    }
  },
  {
    id: "residual-calculator",
    category: "statistic",
    slugs: {
      en: "residual-calculator",
      "zh-CN": "cancha-ji-suan-qi",
      "zh-TW": "cancha-ji-suan-qi",
      ja: "zannsai-keisan-ki",
      ko: "jansu-gyesan-gi",
      es: "calculadora-residuos-regresion-lineal",
      fr: "calculatrice-residus-regression-lineaire",
      de: "residuen-rechner-lineare-regression",
      pt: "calculadora-residuos-regressao-linear",
      ru: "kalkulyator-ostatkov-lineynoy-regressii"
    },
    titles: {
      en: "Residual Calculator - Linear Regression Residuals Online",
      "zh-CN": "残差计算器 - 线性回归残差",
      "zh-TW": "殘差計算器 - 線性迴歸殘差",
      ja: "残差計算機 - 線形回帰の残差",
      ko: "잔차 계산기 - 선형 회귀 잔차",
      es: "Calculadora de residuos - Regresión lineal",
      fr: "Calculateur de résidus - Régression linéaire",
      de: "Residuenrechner - Lineare Regression",
      pt: "Calculadora de resíduos - Regressão linear",
      ru: "Калькулятор остатков - линейная регрессия"
    },
    descriptions: {
      en: "Calculate linear regression residuals instantly. Enter X and Y values to get the regression line, predicted values, residuals, and R-squared for any dataset.",
      "zh-CN": "立即计算线性回归残差。输入 X 和 Y 值，查看回归方程、预测值、残差和 R²。",
      "zh-TW": "立即計算線性迴歸殘差。輸入 X 和 Y 值，查看迴歸方程、預測值、殘差與 R²。",
      ja: "線形回帰の残差をすぐに計算。X と Y を入力して、回帰式、予測値、残差、R² を確認できます。",
      ko: "선형 회귀 잔차를 즉시 계산하세요. X와 Y 값을 입력하면 회귀식, 예측값, 잔차, R²를 확인할 수 있습니다.",
      es: "Calcula al instante los residuos de una regresión lineal. Ingresa X e Y para ver la ecuación, valores predichos, residuos y R².",
      fr: "Calculez instantanément les résidus d’une régression linéaire. Saisissez X et Y pour obtenir l’équation, les valeurs prévues, les résidus et R².",
      de: "Residuen der linearen Regression sofort berechnen. X- und Y-Werte eingeben und Regressionsgleichung, Prognosen, Residuen und R² ansehen.",
      pt: "Calcule resíduos de regressão linear instantaneamente. Insira X e Y para ver a equação, valores previstos, resíduos e R².",
      ru: "Мгновенно вычисляйте остатки линейной регрессии. Введите X и Y, чтобы увидеть уравнение, прогнозы, остатки и R²."
    }
  },
  {
    id: "risk-calculator",
    category: "statistic",
    slugs: {
      en: "risk-calculator",
      "zh-CN": "feng-xian-ji-suan-qi-xiang-dui-feng-xian-jue-dui-feng-xian-nnt",
      "zh-TW": "feng-xian-ji-suan-qi-xiang-dui-feng-xian-jue-dui-feng-xian-nnt",
      ja: "risuku-keisanki-soutai-risuku-zettai-risuku-nnt",
      ko: "wiheom-gyesangi-sangdae-wiheom-jeoldae-wiheom-nnt",
      es: "calculadora-riesgo-riesgo-relativo-riesgo-absoluto-nnt",
      fr: "calculateur-risque-risque-relatif-risque-absolu-nnt",
      de: "risikorechner-relatives-risiko-absolutes-risiko-nnt",
      pt: "calculadora-risco-risco-relativo-risco-absoluto-nnt",
      ru: "kalkulyator-riska-otnositelnyy-risk-absolyutnyy-risk-nnt"
    },
    titles: {
      en: "Risk Calculator - Relative Risk, Absolute Risk & NNT",
      "zh-CN": "风险计算器：相对风险、绝对风险和 NNT",
      "zh-TW": "風險計算器：相對風險、絕對風險和 NNT",
      ja: "リスク計算機：相対リスク、絶対リスク、NNT",
      ko: "위험 계산기: 상대위험, 절대위험, NNT",
      es: "Calculadora de riesgo: RR, ARR y NNT",
      fr: "Calculateur de risque : RR, ARR et NNT",
      de: "Risikorechner: relatives Risiko, ARR und NNT",
      pt: "Calculadora de risco: RR, ARR e NNT",
      ru: "Калькулятор риска: RR, ARR и NNT"
    },
    descriptions: {
      en: "Calculate relative risk (RR), absolute risk reduction (ARR), and number needed to treat (NNT). Free online risk calculator for clinical trials and epidemiology.",
      "zh-CN": "计算相对风险（RR）、绝对风险降低（ARR）和需治疗人数（NNT）。适用于临床试验与流行病学。",
      "zh-TW": "計算相對風險（RR）、絕對風險降低（ARR）與需治療人數（NNT）。適用於臨床試驗與流行病學。",
      ja: "相対リスク（RR）、絶対リスク減少（ARR）、治療必要数（NNT）を計算。臨床試験と疫学向けの無料ツール。",
      ko: "상대위험(RR), 절대위험감소(ARR), 치료필요수(NNT)를 계산합니다. 임상시험과 역학에 적합한 무료 계산기입니다.",
      es: "Calcula el riesgo relativo (RR), la reducción absoluta del riesgo (ARR) y el número necesario a tratar (NNT).",
      fr: "Calcule le risque relatif (RR), la réduction absolue du risque (ARR) et le nombre de sujets à traiter (NNT).",
      de: "Berechne relatives Risiko (RR), absolute Risikoreduktion (ARR) und Number Needed to Treat (NNT).",
      pt: "Calcule risco relativo (RR), redução absoluta do risco (ARR) e número necessário para tratar (NNT).",
      ru: "Рассчитайте относительный риск (RR), абсолютное снижение риска (ARR) и число пациентов, которых нужно лечить (NNT)."
    }
  },
  {
    id: "roc-curve-calculator",
    category: "statistic",
    slugs: {
      en: "roc-curve-calculator",
      "zh-CN": "roc-quxian-auc-jisuanqi",
      "zh-TW": "roc-quxian-auc-jisuanqi",
      ja: "roc-kasen-auc-keisan-ki",
      ko: "roc-geomsun-auc-gyesangi",
      es: "calculadora-curva-roc-auc",
      fr: "calculateur-courbe-roc-auc",
      de: "roc-kurve-auc-rechner",
      pt: "calculadora-curva-roc-auc",
      ru: "kalkulyator-roc-krivoy-auc"
    },
    titles: {
      en: "ROC Curve & AUC Calculator - Binary Classifier Evaluation",
      "zh-CN": "ROC曲线与AUC计算器",
      "zh-TW": "ROC曲線與AUC計算器",
      ja: "ROC曲線とAUC計算機",
      ko: "ROC 곡선 및 AUC 계산기",
      es: "Calculadora de curva ROC y AUC",
      fr: "Calculateur de courbe ROC et AUC",
      de: "ROC-Kurve- und AUC-Rechner",
      pt: "Calculadora de curva ROC e AUC",
      ru: "Калькулятор ROC-кривой и AUC"
    },
    descriptions: {
      en: "Calculate AUC and plot ROC curves for binary classifiers. Input prediction scores and true labels to get sensitivity, specificity, and optimal threshold.",
      "zh-CN": "输入二分类模型的预测分数和真实标签，计算AUC、绘制ROC曲线，并查看灵敏度、特异度和最佳阈值。",
      "zh-TW": "輸入二元分類模型的預測分數與真實標籤，計算AUC、繪製ROC曲線，並查看靈敏度、特異度與最佳閾值。",
      ja: "二値分類モデルの予測スコアと正解ラベルを入力して、AUC、ROC曲線、感度、特異度、最適閾値を確認します。",
      ko: "이진 분류 모델의 예측 점수와 실제 레이블을 입력해 AUC, ROC 곡선, 민감도, 특이도, 최적 임계값을 확인하세요.",
      es: "Calcula el AUC y traza curvas ROC para clasificadores binarios. Ingresa puntajes de predicción y etiquetas reales para ver sensibilidad, especificidad y umbral óptimo.",
      fr: "Calculez l'AUC et tracez des courbes ROC pour des classifieurs binaires. Saisissez les scores de prédiction et les vraies étiquettes pour voir la sensibilité, la spécificité et le seuil optimal.",
      de: "Berechnen Sie AUC und zeichnen Sie ROC-Kurven für binäre Klassifikatoren. Geben Sie Vorhersagescores und wahre Labels ein, um Sensitivität, Spezifität und optimalen Schwellenwert zu sehen.",
      pt: "Calcule AUC e trace curvas ROC para classificadores binários. Insira pontuações de previsão e rótulos reais para ver sensibilidade, especificidade e limiar ideal.",
      ru: "Рассчитайте AUC и постройте ROC-кривые для бинарных классификаторов. Введите прогнозные оценки и истинные метки, чтобы увидеть чувствительность, специфичность и оптимальный порог."
    }
  },
  {
    id: "roulette-payout-calculator",
    category: "statistic",
    slugs: {
      en: "roulette-payout-calculator",
      "zh-CN": "luo-lan-pai-xiao-ji-suan-qi",
      "zh-TW": "luo-lan-pan-pei-xiao-ji-suan-qi",
      ja: "ruuretto-haifu-keisanki",
      ko: "rullet-peidob-gyesan-gi",
      es: "calculadora-pagos-ruleta",
      fr: "calculateur-gains-roulette",
      de: "roulette-auszahlungsrechner",
      pt: "calculadora-pagamentos-roleta",
      ru: "kalkulyator-vyplat-ruletki"
    },
    titles: {
      en: "Roulette Payout Calculator - Bet Winnings & Odds",
      "zh-CN": "轮盘赌赔付计算器",
      "zh-TW": "輪盤賭賠付計算器",
      ja: "ルーレット配当計算機",
      ko: "룰렛 배당 계산기",
      es: "Calculadora de pagos de ruleta",
      fr: "Calculateur de gains de la roulette",
      de: "Roulette-Auszahlungsrechner",
      pt: "Calculadora de pagamentos da roleta",
      ru: "Калькулятор выплат рулетки"
    },
    descriptions: {
      en: "Roulette payout calculator for American and European wheels. Enter bet type and wager to get net winnings, total payout, payout odds, and win probability.",
      "zh-CN": "适用于美式和欧式轮盘，输入下注类型和金额即可计算净赢利、总赔付、赔率与中奖概率。",
      "zh-TW": "適用美式與歐式輪盤，輸入下注類型與金額即可計算淨贏利、總賠付、賠率與中獎率。",
      ja: "欧州式と米国式のルーレットで、賭け方と賭け金を入力すると純利益、総払い戻し、配当倍率、勝率を計算します。",
      ko: "유럽식과 미국식 룰렛에서 베팅 종류와 금액을 입력하면 순수익, 총지급액, 배당 배수, 당첨 확률을 계산합니다.",
      es: "Para ruleta americana y europea: introduce el tipo de apuesta y el importe para ver ganancia neta, pago total, cuota y probabilidad de ganar.",
      fr: "Pour la roulette européenne ou américaine, saisissez le type de pari et la mise pour obtenir gain net, gain total, cote et probabilité de victoire.",
      de: "Für amerikanische und europäische Roulette-Räder: Einsatztyp und Betrag eingeben, um Nettogewinn, Gesamtauszahlung, Gewinnquote und Gewinnchance zu sehen.",
      pt: "Para roleta europeia ou americana, informe o tipo de aposta e o valor para ver lucro líquido, pagamento total, odds e probabilidade de vitória.",
      ru: "Для американской и европейской рулетки: выберите тип ставки и сумму, чтобы узнать чистый выигрыш, общую выплату, коэффициент и вероятность победы."
    }
  },
  {
    id: "rse-calculator-relative-standard-error",
    category: "statistic",
    slugs: {
      en: "rse-calculator-relative-standard-error",
      "zh-CN": "xiangdui-biaozhun-wucha-jisuanqi",
      "zh-TW": "xiangdui-biaozhun-wucha-jisuanqi",
      ja: "sosei-hyojun-gosa-keisanki",
      ko: "sangdae-pyojun-oryu-gyesangi",
      es: "calculadora-rse-error-estandar-relativo",
      fr: "calculateur-rse-erreur-standard-relative",
      de: "rse-rechner-relativer-standardfehler",
      pt: "calculadora-rse-erro-padrao-relativo",
      ru: "kalkulyator-rse-otnositelnaya-standartnaya-oshibka"
    },
    titles: {
      en: "RSE Calculator - Relative Standard Error",
      "zh-CN": "相对标准误差计算器 - RSE",
      "zh-TW": "相對標準誤差計算器 - RSE",
      ja: "相対標準誤差計算機 - RSE",
      ko: "상대 표준 오차 계산기 - RSE",
      es: "Calculadora de RSE - Error estándar relativo",
      fr: "Calculateur RSE - Erreur standard relative",
      de: "RSE-Rechner - Relativer Standardfehler",
      pt: "Calculadora de RSE - Erro padrão relativo",
      ru: "Калькулятор RSE - Относительная стандартная ошибка"
    },
    descriptions: {
      en: "Relative Standard Error (RSE) calculator — divide standard error by the estimate to get a unit-free precision percentage and a qualitative reliability rating.",
      "zh-CN": "相对标准误差（RSE）计算器：用标准误差除以估计值，得到无单位的精度百分比和定性可靠性评级。",
      "zh-TW": "相對標準誤差（RSE）計算器：以標準誤除以估計值，取得無單位的精度百分比與定性可靠性評級。",
      ja: "相対標準誤差（RSE）計算機。標準誤差を推定値で割り、単位に依存しない精度の割合と信頼性評価を求めます。",
      ko: "상대 표준 오차(RSE) 계산기입니다. 표준 오차를 추정값으로 나누어 단위 없는 정밀도 백분율과 신뢰도 평가를 구합니다.",
      es: "Calculadora de error estándar relativo (RSE): divide el error estándar por la estimación para obtener una precisión porcentual sin unidades.",
      fr: "Calculateur d’erreur standard relative (RSE) : divisez l’erreur standard par l’estimation pour obtenir une précision en % sans unité.",
      de: "Rechner für relativen Standardfehler (RSE): Standardfehler durch Schätzung teilen und eine einheitenfreie Präzision in Prozent erhalten.",
      pt: "Calculadora de erro padrão relativo (RSE): divida o erro padrão pela estimativa para obter precisão percentual sem unidade e confiabilidade.",
      ru: "Калькулятор относительной стандартной ошибки (RSE): разделите стандартную ошибку на оценку и получите безразмерный процент точности."
    }
  },
  {
    id: "sample-size-calculator",
    category: "statistic",
    slugs: {
      en: "sample-size-calculator",
      "zh-CN": "yangbenliang-jisuanqi-cochran-gongshi",
      "zh-TW": "yangben-shu-jisuanqi-cochran-gongshi",
      ja: "sanpuru-saizu-keisanki-cochran-no-shiki",
      ko: "pyobon-keuki-gyesangi-cochran-gongsik",
      es: "calculadora-tamano-muestra-formula-cochran",
      fr: "calculateur-taille-echantillon-formule-cochran",
      de: "stichprobengroessen-rechner-cochran-formel",
      pt: "calculadora-tamanho-amostra-formula-cochran",
      ru: "kalkulyator-vyborki-formula-kokhrena"
    },
    titles: {
      en: "Sample Size Calculator - Cochran's Formula",
      "zh-CN": "样本量计算器 - Cochran公式",
      "zh-TW": "樣本數計算器 - Cochran公式",
      ja: "サンプルサイズ計算機 - Cochranの式",
      ko: "표본 크기 계산기 - Cochran 공식",
      es: "Calculadora de tamaño de muestra - fórmula de Cochran",
      fr: "Calculateur de taille d’échantillon - formule de Cochran",
      de: "Stichprobengrößen-Rechner - Cochran-Formel",
      pt: "Calculadora de tamanho da amostra - fórmula de Cochran",
      ru: "Калькулятор выборки - формула Кохрена"
    },
    descriptions: {
      en: "Sample size calculator using Cochran's formula. Enter confidence level, margin of error, and proportion to get the minimum sample size for reliable surveys.",
      "zh-CN": "使用 Cochran 公式计算样本量。输入置信水平、误差范围和比例，获取可靠调查所需的最小样本量。",
      "zh-TW": "使用 Cochran 公式計算樣本數。輸入信賴水準、誤差範圍與比例，取得可靠調查所需的最小樣本數。",
      ja: "Cochranの式でサンプルサイズを計算。信頼水準、許容誤差、母比率を入力して、調査に必要な最小サンプル数を求めます。",
      ko: "Cochran 공식으로 표본 크기를 계산합니다. 신뢰 수준, 허용 오차, 모집단 비율을 입력해 조사에 필요한 최소 표본 수를 확인하세요.",
      es: "Calcula el tamaño de muestra con la fórmula de Cochran. Ingresa el nivel de confianza, margen de error y proporción para obtener el mínimo necesario.",
      fr: "Calculez la taille d’échantillon avec la formule de Cochran. Saisissez le niveau de confiance, la marge d’erreur et la proportion pour obtenir le minimum requis.",
      de: "Stichprobengröße mit der Cochran-Formel berechnen. Konfidenzniveau, Fehlermarge und Anteil eingeben, um die Mindeststichprobe zu erhalten.",
      pt: "Calcule o tamanho da amostra com a fórmula de Cochran. Informe nível de confiança, margem de erro e proporção para obter o mínimo necessário.",
      ru: "Расчет выборки по формуле Кохрена. Введите уровень доверия, погрешность и долю, чтобы получить минимальный размер выборки."
    }
  },
  {
    id: "sampling-distribution-of-the-sample-proportion-calculator",
    category: "statistic",
    slugs: {
      en: "sampling-distribution-of-the-sample-proportion-calculator",
      "zh-CN": "yangben-bili-fenbu-jisuanqi",
      "zh-TW": "yangben-bili-fenbu-jisuanqi",
      ja: "hombunri-hombunpu-keisan-ki",
      ko: "pyobon-biyul-pyobonbunpo-gyeolsan-gi",
      es: "distribucion-muestral-proporcion-calculadora",
      fr: "distribution-echantillonnage-proportion-calculateur",
      de: "stichprobenverteilung-anteil-rechner",
      pt: "distribuicao-amostral-proporcao-calculadora",
      ru: "vyborochnogo-raspredeleniya-doli-kalkulyator"
    },
    titles: {
      en: "Sampling Distribution of Sample Proportion Calculator",
      "zh-CN": "样本比例抽样分布计算器",
      "zh-TW": "樣本比例抽樣分布計算器",
      ja: "標本比率の抽出分布計算機",
      ko: "표본비율의 표본분포 계산기",
      es: "Calculadora de distribución muestral de proporción",
      fr: "Calculateur de distribution d'échantillonnage de proportion",
      de: "Stichprobenverteilung des Anteils Rechner",
      pt: "Calculadora da distribuição amostral da proporção",
      ru: "Калькулятор выборочного распределения доли"
    },
    descriptions: {
      en: "Sampling distribution of the sample proportion calculator. Find mean, standard error, normality check, Z-score, and cumulative probabilities instantly.",
      "zh-CN": "输入总体比例、样本量和样本比例，立即计算均值、标准误差、正态性检验、Z 分数和累积概率。",
      "zh-TW": "輸入母體比例、樣本數和樣本比例，立即計算平均數、標準誤差、常態性檢驗、Z 分數與累積機率。",
      ja: "標本比率の抽出分布を計算。平均、標準誤差、正規性判定、Z スコア、累積確率をすぐに求められます。",
      ko: "표본비율의 표본분포를 계산합니다. 평균, 표준오차, 정규성 검정, Z점수, 누적확률을 즉시 구하세요.",
      es: "Calcula al instante la media, el error estándar, la normalidad, la puntuación Z y las probabilidades acumuladas de una proporción muestral.",
      fr: "Calculez instantanément la moyenne, l'erreur type, la normalité, le score Z et les probabilités cumulées d'une proportion d'échantillon.",
      de: "Berechnen Sie sofort Mittelwert, Standardfehler, Normalitätsprüfung, Z-Wert und kumulative Wahrscheinlichkeiten eines Stichprobenanteils.",
      pt: "Calcule instantaneamente a média, o erro padrão, a normalidade, o escore Z e as probabilidades acumuladas de uma proporção amostral.",
      ru: "Мгновенно находите среднее, стандартную ошибку, проверку нормальности, Z-оценку и накопленные вероятности выборочной доли."
    }
  },
  {
    id: "sampling-error-calculator",
    category: "statistic",
    slugs: {
      en: "sampling-error-calculator",
      "zh-CN": "chouyang-wucha-jisuanqi",
      "zh-TW": "chouyang-wucha-jisuanqi",
      ja: "hyohon-gosa-keisanki",
      ko: "pyobon-oryu-gyesangi",
      es: "calculadora-error-muestreo",
      fr: "calculateur-erreur-echantillonnage",
      de: "stichprobenfehler-rechner",
      pt: "calculadora-erro-amostral",
      ru: "kalkulyator-oshibki-vyborki"
    },
    titles: {
      en: "Sampling Error Calculator - Margin of Error",
      "zh-CN": "抽样误差计算器 - 误差幅度",
      "zh-TW": "抽樣誤差計算器 - 誤差幅度",
      ja: "標本誤差計算機 - 誤差範囲",
      ko: "표본오차 계산기 - 오차한계",
      es: "Calculadora de error de muestreo - margen de error",
      fr: "Calculateur d'erreur d'échantillonnage - marge d'erreur",
      de: "Stichprobenfehler-Rechner - Fehlerspanne",
      pt: "Calculadora de erro amostral - margem de erro",
      ru: "Калькулятор ошибки выборки - предел погрешности"
    },
    descriptions: {
      en: "Sampling error calculator for proportions and means. Enter sample data and confidence level to get the standard error and margin of error with FPC support.",
      "zh-CN": "用于比例和均值的抽样误差计算器。输入样本数据和置信水平，计算标准误差和误差幅度，支持有限总体校正。",
      "zh-TW": "用於比例與平均數的抽樣誤差計算器。輸入樣本資料與信賴水準，計算標準誤與誤差幅度，支援有限母體校正。",
      ja: "比率と平均の標本誤差を計算。標本データと信頼水準を入力し、標準誤差と誤差範囲を算出。有限母集団補正に対応。",
      ko: "비율과 평균의 표본오차 계산기입니다. 표본 데이터와 신뢰수준을 입력해 표준오차와 오차한계를 계산하며 유한모집단 보정을 지원합니다.",
      es: "Calculadora de error de muestreo para proporciones y medias. Ingresa datos y nivel de confianza para obtener error estándar y margen de error con FPC.",
      fr: "Calculateur d'erreur d'échantillonnage pour proportions et moyennes. Saisissez données et confiance pour obtenir erreur standard et marge d'erreur avec FPC.",
      de: "Stichprobenfehler-Rechner für Anteile und Mittelwerte. Daten und Konfidenzniveau eingeben, Standardfehler und Fehlerspanne mit FPC erhalten.",
      pt: "Calculadora de erro amostral para proporções e médias. Insira dados e nível de confiança para obter erro padrão e margem de erro com FPC.",
      ru: "Калькулятор ошибки выборки для долей и средних. Введите данные и уровень доверия, чтобы получить стандартную ошибку и предел погрешности с FPC."
    }
  },
  {
    id: "poisson-distribution-calculator",
    category: "statistic",
    slugs: {
      en: "poisson-distribution-calculator",
      "zh-CN": "posong-fenbu-jisuanqi",
      "zh-TW": "posong-fenbu-jisuanqi",
      ja: "poson-bunpu-keisanki",
      ko: "poasong-bunpo-gyesangi",
      es: "calculadora-distribucion-poisson",
      fr: "calculatrice-distribution-poisson",
      de: "poisson-verteilung-rechner",
      pt: "calculadora-distribuicao-poisson",
      ru: "kalkulyator-raspredeleniya-puassona"
    },
    titles: {
      en: "Poisson Distribution Calculator - Probability",
      "zh-CN": "泊松分布计算器 - 概率计算",
      "zh-TW": "卜瓦松分布計算器 - 機率計算",
      ja: "ポアソン分布計算機 - 確率計算",
      ko: "포아송 분포 계산기 - 확률 계산",
      es: "Calculadora de distribución de Poisson",
      fr: "Calculatrice de distribution de Poisson",
      de: "Poisson-Verteilung Rechner",
      pt: "Calculadora de distribuição de Poisson",
      ru: "Калькулятор распределения Пуассона"
    },
    descriptions: {
      en: "Calculate exact and cumulative Poisson probabilities instantly. Find P(X=x), P(X≤x), P(X≥x) for any lambda and event count — free online statistics tool.",
      "zh-CN": "即时计算精确和累积泊松概率。输入任意 λ 和事件数，求 P(X=x)、P(X≤x)、P(X≥x)。",
      "zh-TW": "即時計算精確與累積卜瓦松機率。輸入任意 λ 與事件數，求 P(X=x)、P(X≤x)、P(X≥x)。",
      ja: "正確なポアソン確率と累積確率を即座に計算。任意の λ と事象数で P(X=x)、P(X≤x)、P(X≥x) を求めます。",
      ko: "정확 및 누적 포아송 확률을 즉시 계산하세요. 임의의 λ와 사건 수로 P(X=x), P(X≤x), P(X≥x)를 구합니다.",
      es: "Calcula al instante probabilidades de Poisson exactas y acumuladas. Obtén P(X=x), P(X≤x), P(X≥x) para cualquier λ y conteo.",
      fr: "Calculez instantanément les probabilités de Poisson exactes et cumulées. Trouvez P(X=x), P(X≤x), P(X≥x) pour tout λ et nombre d'événements.",
      de: "Berechne exakte und kumulative Poisson-Wahrscheinlichkeiten sofort. Finde P(X=x), P(X≤x), P(X≥x) für jedes λ und jede Ereigniszahl.",
      pt: "Calcule instantaneamente probabilidades de Poisson exatas e acumuladas. Encontre P(X=x), P(X≤x), P(X≥x) para qualquer λ e contagem.",
      ru: "Мгновенно рассчитывайте точные и накопленные вероятности Пуассона. Найдите P(X=x), P(X≤x), P(X≥x) для любого λ и числа событий."
    }
  },
  {
    id: "polynomial-regression-calculator",
    category: "statistic",
    slugs: {
      en: "polynomial-regression-calculator",
      "zh-CN": "duoxiangshi-huigui-jisuanqi",
      "zh-TW": "duoxiangshi-huigui-jisuanqi",
      ja: "tajikoshiki-kaiki-keisanki",
      ko: "dahangsig-hoegwi-gyesangi",
      es: "calculadora-regresion-polinomica",
      fr: "calculateur-regression-polynomiale",
      de: "polynomiale-regression-rechner",
      pt: "calculadora-regressao-polinomial",
      ru: "kalkulyator-polinomialnoi-regressii"
    },
    titles: {
      en: "Polynomial Regression Calculator - Curve Fitting",
      "zh-CN": "多项式回归计算器 - 曲线拟合",
      "zh-TW": "多項式迴歸計算器 - 曲線擬合",
      ja: "多項式回帰計算機 - 曲線フィッティング",
      ko: "다항식 회귀 계산기 - 곡선 맞춤",
      es: "Calculadora de regresión polinómica",
      fr: "Calculateur de régression polynomiale",
      de: "Rechner für polynomiale Regression",
      pt: "Calculadora de regressão polinomial",
      ru: "Калькулятор полиномиальной регрессии"
    },
    descriptions: {
      en: "Fit data to a polynomial equation with this free curve fitting tool. Get the best-fit polynomial equation, R-squared value, and predict new values instantly.",
      "zh-CN": "用免费曲线拟合工具将数据拟合为多项式方程，快速获得最佳拟合方程、R²值并预测新数值。",
      "zh-TW": "用免費曲線擬合工具將資料擬合為多項式方程，快速取得最佳擬合方程、R²值並預測新數值。",
      ja: "無料の曲線フィッティングツールでデータを多項式方程式に当てはめ、最適近似式、R²値、新しい値の予測をすばやく取得できます。",
      ko: "무료 곡선 맞춤 도구로 데이터를 다항식 방정식에 맞추고 최적 방정식, R² 값, 새 값 예측을 즉시 확인하세요.",
      es: "Ajusta datos a una ecuación polinómica con esta herramienta gratuita de ajuste de curvas. Obtén ecuación, R² y predicciones al instante.",
      fr: "Ajustez des données à une équation polynomiale avec cet outil de courbe gratuit. Obtenez l’équation, R² et des prédictions instantanément.",
      de: "Passe Daten mit diesem kostenlosen Kurvenanpassungs-Tool an eine Polynomgleichung an. Erhalte Gleichung, R² und Prognosen sofort.",
      pt: "Ajuste dados a uma equação polinomial com esta ferramenta gratuita de ajuste de curvas. Obtenha equação, R² e previsões na hora.",
      ru: "Аппроксимируйте данные полиномиальным уравнением: получите уравнение наилучшего приближения, R² и прогнозы новых значений."
    }
  },
  {
    id: "pooled-standard-deviation-calculator",
    category: "statistic",
    slugs: {
      en: "pooled-standard-deviation-calculator",
      "zh-CN": "hebing-biaozhuncha-jisuanqi",
      "zh-TW": "hebing-biaozhuncha-jisuanqi",
      ja: "pooled-standard-deviation-keisanki",
      ko: "habdong-pyojunpyeoncha-gyesangi",
      es: "calculadora-desviacion-estandar-combinada",
      fr: "calculateur-ecart-type-groupe",
      de: "gepoolte-standardabweichung-rechner",
      pt: "calculadora-desvio-padrao-combinado",
      ru: "kalkulyator-obedinennogo-standartnogo-otkloneniya"
    },
    titles: {
      en: "Pooled Standard Deviation Calculator - Two Samples",
      "zh-CN": "合并标准差计算器 - 两个样本",
      "zh-TW": "合併標準差計算器 - 兩個樣本",
      ja: "プール標準偏差計算機 - 2標本",
      ko: "합동 표준편차 계산기 - 두 표본",
      es: "Calculadora de desviación estándar combinada",
      fr: "Calculateur d'écart-type groupé",
      de: "Rechner für gepoolte Standardabweichung",
      pt: "Calculadora de desvio padrão combinado",
      ru: "Калькулятор объединенного стандартного отклонения"
    },
    descriptions: {
      en: "Calculate the pooled standard deviation for two samples using sizes, means, and standard deviations. Accurate results for t-tests and statistical analysis.",
      "zh-CN": "使用两个样本的样本量、均值和标准差计算合并标准差，为 t 检验和统计分析提供准确结果。",
      "zh-TW": "使用兩個樣本的樣本數、平均值和標準差計算合併標準差，為 t 檢定與統計分析提供準確結果。",
      ja: "2標本のサイズ、平均、標準偏差からプール標準偏差を計算。t検定や統計分析に使える正確な結果を得られます。",
      ko: "두 표본의 크기, 평균, 표준편차로 합동 표준편차를 계산합니다. t-검정과 통계 분석에 정확한 결과를 제공합니다.",
      es: "Calcula la desviación estándar combinada de dos muestras con tamaños, medias y desviaciones estándar. Resultados precisos para pruebas t.",
      fr: "Calculez l'écart-type groupé de deux échantillons avec leurs tailles, moyennes et écarts-types. Résultats fiables pour tests t.",
      de: "Berechne die gepoolte Standardabweichung zweier Stichproben aus Umfang, Mittelwert und Standardabweichung. Genau für t-Tests.",
      pt: "Calcule o desvio padrão combinado de duas amostras usando tamanhos, médias e desvios padrão. Resultados precisos para testes t.",
      ru: "Рассчитайте объединенное стандартное отклонение для двух выборок по размерам, средним и стандартным отклонениям. Для t-тестов."
    }
  },
  {
    id: "population-variance-calculator",
    category: "statistic",
    slugs: {
      en: "population-variance-calculator",
      "zh-CN": "zongti-fangcha-jisuanqi",
      "zh-TW": "zongti-bianyi-shu-jisuanqi",
      ja: "bunsan-keisanki",
      ko: "mopujipan-bun-san-gye-sangi",
      es: "calculadora-varianza-poblacional",
      fr: "calculateur-variance-population",
      de: "populationsvarianz-rechner",
      pt: "calculadora-varianza-populacional",
      ru: "kalkulyator-populyatsionnoy-dispersii"
    },
    titles: {
      en: "Population Variance Calculator - Dispersion Analysis",
      "zh-CN": "总体方差计算器",
      "zh-TW": "母體變異數計算器",
      ja: "母分散計算機",
      ko: "모집단 분산 계산기",
      es: "Calculadora de varianza poblacional",
      fr: "Calculateur de variance de population",
      de: "Populationsvarianz-Rechner",
      pt: "Calculadora de variância populacional",
      ru: "Калькулятор дисперсии совокупности"
    },
    descriptions: {
      en: "Calculate population variance, standard deviation, and mean for any data set. Free online statistical dispersion tool — paste numbers and get results instantly.",
      "zh-CN": "快速计算任意数据集的总体方差、标准差和均值。免费在线统计离散工具，粘贴数字即可立即查看结果。",
      "zh-TW": "快速計算任何資料集的母體變異數、標準差與平均數。免費線上統計離散工具，貼上數字即可立即查看結果。",
      ja: "任意のデータセットの母分散、標準偏差、平均をすばやく計算。無料のオンライン統計ツールで、数値を貼り付ければすぐ結果が出ます。",
      ko: "임의의 데이터 세트에 대한 모집단 분산, 표준편차, 평균을 빠르게 계산하세요. 무료 온라인 통계 도구로 숫자를 붙여 넣으면 즉시 결과가 나옵니다.",
      es: "Calcula la varianza poblacional, la desviación estándar y la media de cualquier conjunto de datos. Herramienta estadística gratis para pegar números y ver resultados al instante.",
      fr: "Calculez la variance de population, l’écart type et la moyenne de n’importe quel jeu de données. Outil statistique en ligne gratuit pour coller des nombres et obtenir les résultats instantanément.",
      de: "Berechnen Sie Populationsvarianz, Standardabweichung und Mittelwert für beliebige Datensätze. Kostenloses Online-Statistiktool: Zahlen einfügen und sofort Ergebnisse erhalten.",
      pt: "Calcule a variância populacional, o desvio padrão e a média de qualquer conjunto de dados. Ferramenta estatística online grátis para colar números e ver os resultados na hora.",
      ru: "Рассчитайте дисперсию совокупности, стандартное отклонение и среднее для любого набора данных. Бесплатный онлайн-инструмент: вставьте числа и сразу получите результат."
    }
  },
  {
    id: "post-test-probability-calculator",
    category: "statistic",
    slugs: {
      en: "post-test-probability-calculator",
      "zh-CN": "houce-gailv-jisuanqi",
      "zh-TW": "houce-gailv-jisuanqi",
      ja: "kensa-go-kakuritsu-keisan",
      ko: "geomsa-hu-hwakryul-gyesangi",
      es: "calculadora-probabilidad-posprueba",
      fr: "calculateur-probabilite-post-test",
      de: "post-test-wahrscheinlichkeitsrechner",
      pt: "calculadora-probabilidade-pos-teste",
      ru: "kalkulyator-posttestovoy-veroyatnosti"
    },
    titles: {
      en: "Post-Test Probability Calculator - Bayes Theorem",
      "zh-CN": "后测概率计算器",
      "zh-TW": "後測機率計算器",
      ja: "検査後確率計算機",
      ko: "검사 후 확률 계산기",
      es: "Calculadora de probabilidad posprueba",
      fr: "Calculateur de probabilité post-test",
      de: "Post-Test-Wahrscheinlichkeitsrechner",
      pt: "Calculadora de probabilidade pós-teste",
      ru: "Калькулятор посттестовой вероятности"
    },
    descriptions: {
      en: "Calculate post-test probability using Bayes' theorem. Enter prior probability, sensitivity, and specificity to find PPV, NPV, and likelihood ratios.",
      "zh-CN": "使用贝叶斯定理计算后测概率。输入先验概率、敏感度和特异度，得到 PPV、NPV 和似然比。",
      "zh-TW": "使用貝氏定理計算後測機率。輸入先驗機率、敏感度與特異度，取得 PPV、NPV 與似然比。",
      ja: "ベイズの定理で検査後確率を計算。事前確率、感度、特異度を入力して PPV、NPV、尤度比を求めます。",
      ko: "베이즈 정리로 검사 후 확률을 계산합니다. 사전 확률, 민감도, 특이도를 입력해 PPV, NPV, 우도비를 구하세요.",
      es: "Calcula la probabilidad posprueba con el teorema de Bayes. Ingresa probabilidad previa, sensibilidad y especificidad para obtener PPV, NPV y LR.",
      fr: "Calculez la probabilité post-test avec le théorème de Bayes. Saisissez probabilité préalable, sensibilité et spécificité pour obtenir PPV, NPV et LR.",
      de: "Berechnen Sie die Post-Test-Wahrscheinlichkeit mit dem Bayes-Theorem. Geben Sie Vortestwahrscheinlichkeit, Sensitivität und Spezifität ein.",
      pt: "Calcule a probabilidade pós-teste com o teorema de Bayes. Informe probabilidade prévia, sensibilidade e especificidade para obter PPV, NPV e LR.",
      ru: "Рассчитайте посттестовую вероятность по теореме Байеса. Введите априорную вероятность, чувствительность и специфичность, чтобы получить PPV, NPV и LR."
    }
  },
  {
    id: "f-statistic-calculator",
    category: "statistic",
    slugs: {
      en: "f-statistic-calculator",
      "zh-CN": "f-statistic-calculator",
      "zh-TW": "f-statistic-calculator",
      ja: "f-statistic-calculator",
      ko: "f-statistic-calculator",
      es: "f-statistic-calculator",
      fr: "f-statistic-calculator",
      de: "f-statistic-calculator",
      pt: "f-statistic-calculator",
      ru: "f-statistic-calculator"
    },
    titles: {
      en: "F-Statistic Calculator - ANOVA & Variance Ratio Test",
      "zh-CN": "F-Statistic Calculator - ANOVA & Variance Ratio Test",
      "zh-TW": "F-Statistic Calculator - ANOVA & Variance Ratio Test",
      ja: "F-Statistic Calculator - ANOVA & Variance Ratio Test",
      ko: "F-Statistic Calculator - ANOVA & Variance Ratio Test",
      es: "F-Statistic Calculator - ANOVA & Variance Ratio Test",
      fr: "F-Statistic Calculator - ANOVA & Variance Ratio Test",
      de: "F-Statistic Calculator - ANOVA & Variance Ratio Test",
      pt: "F-Statistic Calculator - ANOVA & Variance Ratio Test",
      ru: "F-Statistic Calculator - ANOVA & Variance Ratio Test"
    },
    descriptions: {
      en: "Calculate the F-statistic and p-value for comparing two sample variances. Enter group variances and sizes to run an ANOVA or F-ratio test instantly.",
      "zh-CN": "Calculate the F-statistic and p-value for comparing two sample variances. Enter group variances and sizes to run an ANOVA or F-ratio test instantly.",
      "zh-TW": "Calculate the F-statistic and p-value for comparing two sample variances. Enter group variances and sizes to run an ANOVA or F-ratio test instantly.",
      ja: "Calculate the F-statistic and p-value for comparing two sample variances. Enter group variances and sizes to run an ANOVA or F-ratio test instantly.",
      ko: "Calculate the F-statistic and p-value for comparing two sample variances. Enter group variances and sizes to run an ANOVA or F-ratio test instantly.",
      es: "Calculate the F-statistic and p-value for comparing two sample variances. Enter group variances and sizes to run an ANOVA or F-ratio test instantly.",
      fr: "Calculate the F-statistic and p-value for comparing two sample variances. Enter group variances and sizes to run an ANOVA or F-ratio test instantly.",
      de: "Calculate the F-statistic and p-value for comparing two sample variances. Enter group variances and sizes to run an ANOVA or F-ratio test instantly.",
      pt: "Calculate the F-statistic and p-value for comparing two sample variances. Enter group variances and sizes to run an ANOVA or F-ratio test instantly.",
      ru: "Calculate the F-statistic and p-value for comparing two sample variances. Enter group variances and sizes to run an ANOVA or F-ratio test instantly."
    }
  },
  {
    id: "f-test-for-equality-of-two-variances-calculator",
    category: "statistic",
    slugs: {
      en: "f-test-for-equality-of-two-variances-calculator",
      "zh-CN": "f-test-for-equality-of-two-variances-calculator",
      "zh-TW": "f-test-for-equality-of-two-variances-calculator",
      ja: "f-test-for-equality-of-two-variances-calculator",
      ko: "f-test-for-equality-of-two-variances-calculator",
      es: "f-test-for-equality-of-two-variances-calculator",
      fr: "f-test-for-equality-of-two-variances-calculator",
      de: "f-test-for-equality-of-two-variances-calculator",
      pt: "f-test-for-equality-of-two-variances-calculator",
      ru: "f-test-for-equality-of-two-variances-calculator"
    },
    titles: {
      en: "F-Test for Equality of Two Variances Calculator",
      "zh-CN": "F-Test for Equality of Two Variances Calculator",
      "zh-TW": "F-Test for Equality of Two Variances Calculator",
      ja: "F-Test for Equality of Two Variances Calculator",
      ko: "F-Test for Equality of Two Variances Calculator",
      es: "F-Test for Equality of Two Variances Calculator",
      fr: "F-Test for Equality of Two Variances Calculator",
      de: "F-Test for Equality of Two Variances Calculator",
      pt: "F-Test for Equality of Two Variances Calculator",
      ru: "F-Test for Equality of Two Variances Calculator"
    },
    descriptions: {
      en: "Perform an F-test for equality of two variances. Enter sample variances and sizes to get the F-statistic, p-value, and reject/fail-to-reject decision.",
      "zh-CN": "Perform an F-test for equality of two variances. Enter sample variances and sizes to get the F-statistic, p-value, and reject/fail-to-reject decision.",
      "zh-TW": "Perform an F-test for equality of two variances. Enter sample variances and sizes to get the F-statistic, p-value, and reject/fail-to-reject decision.",
      ja: "Perform an F-test for equality of two variances. Enter sample variances and sizes to get the F-statistic, p-value, and reject/fail-to-reject decision.",
      ko: "Perform an F-test for equality of two variances. Enter sample variances and sizes to get the F-statistic, p-value, and reject/fail-to-reject decision.",
      es: "Perform an F-test for equality of two variances. Enter sample variances and sizes to get the F-statistic, p-value, and reject/fail-to-reject decision.",
      fr: "Perform an F-test for equality of two variances. Enter sample variances and sizes to get the F-statistic, p-value, and reject/fail-to-reject decision.",
      de: "Perform an F-test for equality of two variances. Enter sample variances and sizes to get the F-statistic, p-value, and reject/fail-to-reject decision.",
      pt: "Perform an F-test for equality of two variances. Enter sample variances and sizes to get the F-statistic, p-value, and reject/fail-to-reject decision.",
      ru: "Perform an F-test for equality of two variances. Enter sample variances and sizes to get the F-statistic, p-value, and reject/fail-to-reject decision."
    }
  },
  {
    id: "false-positive-paradox-calculator",
    category: "statistic",
    slugs: {
      en: "false-positive-paradox-calculator",
      "zh-CN": "false-positive-paradox-calculator",
      "zh-TW": "false-positive-paradox-calculator",
      ja: "false-positive-paradox-calculator",
      ko: "false-positive-paradox-calculator",
      es: "false-positive-paradox-calculator",
      fr: "false-positive-paradox-calculator",
      de: "false-positive-paradox-calculator",
      pt: "false-positive-paradox-calculator",
      ru: "false-positive-paradox-calculator"
    },
    titles: {
      en: "False Positive Paradox Calculator - Bayes' Theorem",
      "zh-CN": "False Positive Paradox Calculator - Bayes' Theorem",
      "zh-TW": "False Positive Paradox Calculator - Bayes' Theorem",
      ja: "False Positive Paradox Calculator - Bayes' Theorem",
      ko: "False Positive Paradox Calculator - Bayes' Theorem",
      es: "False Positive Paradox Calculator - Bayes' Theorem",
      fr: "False Positive Paradox Calculator - Bayes' Theorem",
      de: "False Positive Paradox Calculator - Bayes' Theorem",
      pt: "False Positive Paradox Calculator - Bayes' Theorem",
      ru: "False Positive Paradox Calculator - Bayes' Theorem"
    },
    descriptions: {
      en: "Calculate the probability of truly having a condition after a positive test. Enter prevalence, sensitivity, and specificity to see the false positive paradox.",
      "zh-CN": "Calculate the probability of truly having a condition after a positive test. Enter prevalence, sensitivity, and specificity to see the false positive paradox.",
      "zh-TW": "Calculate the probability of truly having a condition after a positive test. Enter prevalence, sensitivity, and specificity to see the false positive paradox.",
      ja: "Calculate the probability of truly having a condition after a positive test. Enter prevalence, sensitivity, and specificity to see the false positive paradox.",
      ko: "Calculate the probability of truly having a condition after a positive test. Enter prevalence, sensitivity, and specificity to see the false positive paradox.",
      es: "Calculate the probability of truly having a condition after a positive test. Enter prevalence, sensitivity, and specificity to see the false positive paradox.",
      fr: "Calculate the probability of truly having a condition after a positive test. Enter prevalence, sensitivity, and specificity to see the false positive paradox.",
      de: "Calculate the probability of truly having a condition after a positive test. Enter prevalence, sensitivity, and specificity to see the false positive paradox.",
      pt: "Calculate the probability of truly having a condition after a positive test. Enter prevalence, sensitivity, and specificity to see the false positive paradox.",
      ru: "Calculate the probability of truly having a condition after a positive test. Enter prevalence, sensitivity, and specificity to see the false positive paradox."
    }
  },
  {
    id: "fishers-exact-test-calculator",
    category: "statistic",
    slugs: {
      en: "fishers-exact-test-calculator",
      "zh-CN": "fishers-exact-test-calculator",
      "zh-TW": "fishers-exact-test-calculator",
      ja: "fishers-exact-test-calculator",
      ko: "fishers-exact-test-calculator",
      es: "fishers-exact-test-calculator",
      fr: "fishers-exact-test-calculator",
      de: "fishers-exact-test-calculator",
      pt: "fishers-exact-test-calculator",
      ru: "fishers-exact-test-calculator"
    },
    titles: {
      en: "Fisher's Exact Test Calculator - 2x2 Contingency Table",
      "zh-CN": "Fisher's Exact Test Calculator - 2x2 Contingency Table",
      "zh-TW": "Fisher's Exact Test Calculator - 2x2 Contingency Table",
      ja: "Fisher's Exact Test Calculator - 2x2 Contingency Table",
      ko: "Fisher's Exact Test Calculator - 2x2 Contingency Table",
      es: "Fisher's Exact Test Calculator - 2x2 Contingency Table",
      fr: "Fisher's Exact Test Calculator - 2x2 Contingency Table",
      de: "Fisher's Exact Test Calculator - 2x2 Contingency Table",
      pt: "Fisher's Exact Test Calculator - 2x2 Contingency Table",
      ru: "Fisher's Exact Test Calculator - 2x2 Contingency Table"
    },
    descriptions: {
      en: "Run Fisher's Exact Test on a 2×2 contingency table. Get one-tailed and two-tailed p-values plus the odds ratio — ideal for small sample sizes in research.",
      "zh-CN": "Run Fisher's Exact Test on a 2×2 contingency table. Get one-tailed and two-tailed p-values plus the odds ratio — ideal for small sample sizes in research.",
      "zh-TW": "Run Fisher's Exact Test on a 2×2 contingency table. Get one-tailed and two-tailed p-values plus the odds ratio — ideal for small sample sizes in research.",
      ja: "Run Fisher's Exact Test on a 2×2 contingency table. Get one-tailed and two-tailed p-values plus the odds ratio — ideal for small sample sizes in research.",
      ko: "Run Fisher's Exact Test on a 2×2 contingency table. Get one-tailed and two-tailed p-values plus the odds ratio — ideal for small sample sizes in research.",
      es: "Run Fisher's Exact Test on a 2×2 contingency table. Get one-tailed and two-tailed p-values plus the odds ratio — ideal for small sample sizes in research.",
      fr: "Run Fisher's Exact Test on a 2×2 contingency table. Get one-tailed and two-tailed p-values plus the odds ratio — ideal for small sample sizes in research.",
      de: "Run Fisher's Exact Test on a 2×2 contingency table. Get one-tailed and two-tailed p-values plus the odds ratio — ideal for small sample sizes in research.",
      pt: "Run Fisher's Exact Test on a 2×2 contingency table. Get one-tailed and two-tailed p-values plus the odds ratio — ideal for small sample sizes in research.",
      ru: "Run Fisher's Exact Test on a 2×2 contingency table. Get one-tailed and two-tailed p-values plus the odds ratio — ideal for small sample sizes in research."
    }
  },
  {
    id: "frequency-distribution-calculator",
    category: "statistic",
    slugs: {
      en: "frequency-distribution-calculator",
      "zh-CN": "frequency-distribution-calculator",
      "zh-TW": "frequency-distribution-calculator",
      ja: "frequency-distribution-calculator",
      ko: "frequency-distribution-calculator",
      es: "frequency-distribution-calculator",
      fr: "frequency-distribution-calculator",
      de: "frequency-distribution-calculator",
      pt: "frequency-distribution-calculator",
      ru: "frequency-distribution-calculator"
    },
    titles: {
      en: "Frequency Distribution Calculator - Create Tables",
      "zh-CN": "Frequency Distribution Calculator - Create Tables",
      "zh-TW": "Frequency Distribution Calculator - Create Tables",
      ja: "Frequency Distribution Calculator - Create Tables",
      ko: "Frequency Distribution Calculator - Create Tables",
      es: "Frequency Distribution Calculator - Create Tables",
      fr: "Frequency Distribution Calculator - Create Tables",
      de: "Frequency Distribution Calculator - Create Tables",
      pt: "Frequency Distribution Calculator - Create Tables",
      ru: "Frequency Distribution Calculator - Create Tables"
    },
    descriptions: {
      en: "Create a frequency distribution table from any data set. Calculate frequency, relative frequency, cumulative frequency, mean, median, and standard deviation.",
      "zh-CN": "Create a frequency distribution table from any data set. Calculate frequency, relative frequency, cumulative frequency, mean, median, and standard deviation.",
      "zh-TW": "Create a frequency distribution table from any data set. Calculate frequency, relative frequency, cumulative frequency, mean, median, and standard deviation.",
      ja: "Create a frequency distribution table from any data set. Calculate frequency, relative frequency, cumulative frequency, mean, median, and standard deviation.",
      ko: "Create a frequency distribution table from any data set. Calculate frequency, relative frequency, cumulative frequency, mean, median, and standard deviation.",
      es: "Create a frequency distribution table from any data set. Calculate frequency, relative frequency, cumulative frequency, mean, median, and standard deviation.",
      fr: "Create a frequency distribution table from any data set. Calculate frequency, relative frequency, cumulative frequency, mean, median, and standard deviation.",
      de: "Create a frequency distribution table from any data set. Calculate frequency, relative frequency, cumulative frequency, mean, median, and standard deviation.",
      pt: "Create a frequency distribution table from any data set. Calculate frequency, relative frequency, cumulative frequency, mean, median, and standard deviation.",
      ru: "Create a frequency distribution table from any data set. Calculate frequency, relative frequency, cumulative frequency, mean, median, and standard deviation."
    }
  },
  {
    id: "error-propagation-calculator",
    category: "statistic",
    slugs: {
      en: "error-propagation-calculator",
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
      en: "Error Propagation Calculator - Uncertainty",
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
      en: "Calculate error propagation and measurement uncertainty for sum/difference and product/power formulas. Get absolute and relative uncertainty instantly.",
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
    id: "expected-value-calculator",
    category: "statistic",
    slugs: {
      en: "expected-value-calculator",
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
      en: "Expected Value Calculator - Probability Distribution",
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
      en: "Calculate expected value, variance, and standard deviation for discrete probability distributions. Enter outcomes and probabilities to get E[X] instantly.",
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
    id: "exponential-distribution-calculator",
    category: "statistic",
    slugs: {
      en: "exponential-distribution-calculator",
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
      en: "Exponential Distribution Calculator - PDF & CDF",
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
      en: "Compute exponential distribution PDF, CDF, mean, variance, and survival probability. Enter rate parameter λ and value x for instant statistical results.",
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
    id: "exponential-growth-prediction-calculator",
    category: "statistic",
    slugs: {
      en: "exponential-growth-prediction-calculator",
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
      en: "Exponential Growth Prediction Calculator",
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
      en: "Predict future values with exponential growth. Use initial value and rate, or two data points to forecast population, investment, or bacterial growth.",
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
    id: "exponential-regression-calculator",
    category: "statistic",
    slugs: {
      en: "exponential-regression-calculator",
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
      en: "Exponential Regression Calculator - y = ab^x",
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
      en: "Fit an exponential regression model y = ab^x to your data. Get coefficients a and b, R-squared, correlation, and predicted values from paired data points.",
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
    id: "rayleigh-distribution-calculator",
    category: "statistic",
    slugs: {
      en: "rayleigh-distribution-calculator",
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
      en: "Rayleigh Distribution Calculator - PDF, CDF & Stats",
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
      en: "Rayleigh distribution calculator: compute PDF, CDF, complementary CDF, mean, median, mode, and variance from scale parameter σ and value x instantly.",
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
    id: "relative-error-calculator",
    category: "statistic",
    slugs: {
      en: "relative-error-calculator",
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
      en: "Relative Error Calculator - Percentage Error Formula",
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
      en: "Relative error calculator: find absolute error, relative error, and percentage error by comparing an observed value to the true value in any measurement.",
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
    id: "relative-frequency-calculator",
    category: "statistic",
    slugs: {
      en: "relative-frequency-calculator",
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
      en: "Relative Frequency Calculator - Frequency Distribution",
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
      en: "Relative frequency calculator: enter a comma-separated data set and instantly get frequency counts, relative frequency, and cumulative frequency for each value.",
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
    id: "relative-risk-calculator",
    category: "statistic",
    slugs: {
      en: "relative-risk-calculator",
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
      en: "Relative Risk Calculator - Risk Ratio for Cohort Studies",
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
      en: "Relative risk calculator for 2×2 contingency tables: compute risk ratio, 95% confidence interval, and attributable risk for exposed vs. unexposed cohort data.",
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
    id: "relative-risk-reduction-calculator",
    category: "statistic",
    slugs: {
      en: "relative-risk-reduction-calculator",
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
      en: "Relative Risk Reduction Calculator - RRR, ARR & NNT",
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
      en: "Relative risk reduction calculator: compute RRR, ARR, NNT, and relative risk from treatment and control group data to evaluate any intervention's effectiveness.",
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
    id: "odds-ratio-calculator",
    category: "statistic",
    slugs: {
      en: "odds-ratio-calculator",
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
      en: "Odds Ratio Calculator - OR, CI & P-Value from 2×2 Table",
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
      en: "Odds ratio calculator for 2×2 contingency tables: compute OR, confidence interval, Z-score, and p-value for case-control and epidemiological research studies.",
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
    id: "outlier-calculator",
    category: "statistic",
    slugs: {
      en: "outlier-calculator",
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
      en: "Outlier Calculator - Detect Outliers Using IQR Method",
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
      en: "Outlier calculator using the IQR method: enter a data set to find mild outliers (1.5×IQR) or extreme outliers (3×IQR) with Q1, Q3, and fence values instantly.",
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
    id: "p-hat-calculator",
    category: "statistic",
    slugs: {
      en: "p-hat-calculator",
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
      en: "P-Hat Calculator - Sample Proportion (p̂) and q̂",
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
      en: "P-hat calculator: enter sample size (n) and successes (x) to compute the sample proportion p̂ and its complement q̂ as decimals and percentages in one click.",
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
    id: "p-value-calculator",
    category: "statistic",
    slugs: {
      en: "p-value-calculator",
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
      en: "P-Value Calculator - Z, T, F & Chi-Square Tests",
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
      en: "P-value calculator for Z, T, F, and Chi-square tests: enter a test statistic and degrees of freedom to get the exact p-value and significance verdict.",
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
    id: "paired-samples-t-test-calculator",
    category: "statistic",
    slugs: {
      en: "paired-samples-t-test-calculator",
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
      en: "Paired Samples t-Test Calculator - Before & After Data",
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
      en: "Paired samples t-test calculator: enter two matched data groups to get the t-statistic, degrees of freedom, p-value, and 95% confidence interval.",
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
