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
      "zh-CN": "yangben-bili-chouyang-fenbu-jisuanqi",
      "zh-TW": "yangben-bili-chouyang-fenbu-jisuanqi",
      ja: "hyoohon-hi-no-hyohon-bunpu-keisanki",
      ko: "pyobon-biyul-pyobon-bunpo-gyesangi",
      es: "calculadora-distribucion-muestral-proporcion",
      fr: "calculateur-distribution-echantillonnage-proportion",
      de: "stichprobenverteilung-anteil-rechner",
      pt: "calculadora-distribuicao-amostral-proporcao",
      ru: "kalkulyator-raspredeleniya-vyborochnoi-doli"
    },
    titles: {
      en: "Sampling Distribution of Sample Proportion Calculator",
      "zh-CN": "样本比例抽样分布计算器",
      "zh-TW": "樣本比例抽樣分布計算器",
      ja: "標本比率の標本分布計算機",
      ko: "표본비율의 표본분포 계산기",
      es: "Calculadora de distribución muestral de proporción",
      fr: "Calculateur de distribution d’échantillonnage d’une proportion",
      de: "Rechner für Stichprobenverteilung eines Anteils",
      pt: "Calculadora de distribuição amostral da proporção",
      ru: "Калькулятор распределения выборочной доли"
    },
    descriptions: {
      en: "Sampling distribution of the sample proportion calculator. Find mean, standard error, normality check, Z-score, and cumulative probabilities instantly.",
      "zh-CN": "样本比例抽样分布计算器。即时求均值、标准误、正态性检查、Z 分数和累计概率。",
      "zh-TW": "樣本比例抽樣分布計算器。即時計算平均數、標準誤、常態性檢查、Z 分數與累積機率。",
      ja: "標本比率の標本分布計算機。平均、標準誤差、正規性判定、Z スコア、累積確率をすばやく計算します。",
      ko: "표본비율의 표본분포 계산기. 평균, 표준오차, 정규성 확인, Z 점수, 누적확률을 즉시 계산합니다.",
      es: "Calcula la distribución muestral de una proporción: media, error estándar, normalidad, puntuación Z y probabilidades acumuladas.",
      fr: "Calculez la distribution d’échantillonnage d’une proportion : moyenne, erreur standard, normalité, score Z et probabilités cumulées.",
      de: "Berechnen Sie die Stichprobenverteilung eines Anteils: Mittelwert, Standardfehler, Normalitätsprüfung, Z-Wert und kumulative Wahrscheinlichkeiten.",
      pt: "Calcule a distribuição amostral da proporção: média, erro padrão, normalidade, escore Z e probabilidades acumuladas.",
      ru: "Рассчитайте распределение выборочной доли: среднее, стандартную ошибку, проверку нормальности, Z-оценку и накопленные вероятности."
    }
  },
  {
    id: "sampling-error-calculator",
    category: "statistic",
    slugs: {
      en: "sampling-error-calculator",
      "zh-CN": "chouyang-wucha-jisuanqi",
      "zh-TW": "chouyang-wucha-jisuanqi",
      ja: "sampling-error-keisanki",
      ko: "pyobon-oryu-gyesangi",
      es: "calculadora-error-muestral",
      fr: "calculateur-erreur-echantillonnage",
      de: "stichprobenfehler-rechner",
      pt: "calculadora-erro-amostral",
      ru: "kalkulyator-oshibki-vyborki"
    },
    titles: {
      en: "Sampling Error Calculator - Margin of Error",
      "zh-CN": "抽样误差计算器 - 误差范围",
      "zh-TW": "抽樣誤差計算器 - 誤差範圍",
      ja: "標本誤差計算機 - 誤差範囲",
      ko: "표본오차 계산기 - 오차범위",
      es: "Calculadora de error muestral - Margen de error",
      fr: "Calculateur d'erreur d'échantillonnage",
      de: "Stichprobenfehler-Rechner - Fehlermarge",
      pt: "Calculadora de erro amostral - Margem de erro",
      ru: "Калькулятор ошибки выборки - Погрешность"
    },
    descriptions: {
      en: "Sampling error calculator for proportions and means. Enter sample data and confidence level to get the standard error and margin of error with FPC support.",
      "zh-CN": "用于比例和均值的抽样误差计算器。输入样本数据和置信水平，获取标准误差和支持有限总体校正的误差范围。",
      "zh-TW": "用於比例與平均數的抽樣誤差計算器。輸入樣本資料與信心水準，取得標準誤差與支援有限母體校正的誤差範圍。",
      ja: "比率と平均の標本誤差を計算。標本データと信頼水準を入力し、有限母集団補正対応の標準誤差と誤差範囲を取得します。",
      ko: "비율과 평균의 표본오차 계산기입니다. 표본 데이터와 신뢰수준을 입력해 FPC 지원 표준오차와 오차범위를 확인하세요.",
      es: "Calculadora de error muestral para proporciones y medias. Introduce datos y nivel de confianza para obtener error estándar y margen con FPC.",
      fr: "Calculez l'erreur d'échantillonnage pour proportions et moyennes. Saisissez vos données et le niveau de confiance pour obtenir SE et marge.",
      de: "Stichprobenfehler-Rechner für Anteile und Mittelwerte. Daten und Konfidenzniveau eingeben, Standardfehler und Fehlermarge mit FPC erhalten.",
      pt: "Calculadora de erro amostral para proporções e médias. Informe dados e nível de confiança para obter erro padrão e margem com FPC.",
      ru: "Калькулятор ошибки выборки для долей и средних. Введите данные и уровень доверия, чтобы получить стандартную ошибку и погрешность с FPC."
    }
  },
  {
    id: "poisson-distribution-calculator",
    category: "statistic",
    slugs: {
      en: "poisson-distribution-calculator",
      "zh-CN": "posong-fenbu-jisuanqi",
      "zh-TW": "bosong-fenbu-jisuanqi",
      ja: "poason-bunpu-keisanki",
      ko: "puasong-bunpo-gyesangi",
      es: "calculadora-distribucion-poisson",
      fr: "calculateur-distribution-poisson",
      de: "poisson-verteilung-rechner",
      pt: "calculadora-distribuicao-poisson",
      ru: "kalkulyator-raspredeleniya-puassona"
    },
    titles: {
      en: "Poisson Distribution Calculator - Probability",
      "zh-CN": "泊松分布计算器 - 概率",
      "zh-TW": "卜瓦松分布計算器 - 機率",
      ja: "ポアソン分布計算機 - 確率",
      ko: "푸아송 분포 계산기 - 확률",
      es: "Calculadora de distribución de Poisson",
      fr: "Calculateur de loi de Poisson",
      de: "Poisson-Verteilung Rechner",
      pt: "Calculadora de distribuição de Poisson",
      ru: "Калькулятор распределения Пуассона"
    },
    descriptions: {
      en: "Calculate exact and cumulative Poisson probabilities instantly. Find P(X=x), P(X≤x), P(X≥x) for any lambda and event count — free online statistics tool.",
      "zh-CN": "即时计算精确和累计泊松概率。输入任意 lambda 和事件数，求 P(X=x)、P(X≤x)、P(X≥x) 等结果。",
      "zh-TW": "立即計算精確與累積卜瓦松機率。輸入任意 lambda 與事件數，求 P(X=x)、P(X≤x)、P(X≥x) 等結果。",
      ja: "正確確率と累積ポアソン確率をすぐに計算。任意の lambda とイベント数で P(X=x)、P(X≤x)、P(X≥x) を求めます。",
      ko: "정확 및 누적 푸아송 확률을 즉시 계산하세요. 임의의 lambda와 사건 수로 P(X=x), P(X≤x), P(X≥x)를 구합니다.",
      es: "Calcula al instante probabilidades de Poisson exactas y acumuladas. Obtén P(X=x), P(X≤x) y P(X≥x) para cualquier lambda y conteo.",
      fr: "Calculez instantanément les probabilités de Poisson exactes et cumulées. Trouvez P(X=x), P(X≤x), P(X≥x) pour tout lambda.",
      de: "Berechnen Sie exakte und kumulative Poisson-Wahrscheinlichkeiten sofort. Finden Sie P(X=x), P(X≤x), P(X≥x) für beliebiges Lambda.",
      pt: "Calcule probabilidades de Poisson exatas e acumuladas na hora. Encontre P(X=x), P(X≤x), P(X≥x) para qualquer lambda e contagem.",
      ru: "Мгновенно рассчитывайте точные и накопленные вероятности Пуассона. Найдите P(X=x), P(X≤x), P(X≥x) для любого lambda."
    }
  },
  {
    id: "polynomial-regression-calculator",
    category: "statistic",
    slugs: {
      en: "polynomial-regression-calculator",
      "zh-CN": "duoxiangshi-huigui-jisuanqi",
      "zh-TW": "duoxiangshi-huigui-jisuanqi",
      ja: "takoushiki-kaiki-keisanki",
      ko: "dahang-hoegwi-gyesangi",
      es: "calculadora-regresion-polinomica",
      fr: "calculateur-regression-polynomiale",
      de: "polynomiale-regression-rechner",
      pt: "calculadora-regressao-polinomial",
      ru: "kalkulyator-polinomialnoy-regressii"
    },
    titles: {
      en: "Polynomial Regression Calculator - Curve Fitting",
      "zh-CN": "多项式回归计算器",
      "zh-TW": "多項式回歸計算器",
      ja: "多項式回帰計算機",
      ko: "다항 회귀 계산기",
      es: "Calculadora de regresión polinómica",
      fr: "Calculateur de régression polynomiale",
      de: "Polynomiale Regression Rechner",
      pt: "Calculadora de regressão polinomial",
      ru: "Калькулятор полиномиальной регрессии"
    },
    descriptions: {
      en: "Fit data to a polynomial equation with this free curve fitting tool. Get the best-fit polynomial equation, R-squared value, and predict new values instantly.",
      "zh-CN": "使用这款免费曲线拟合工具，将数据拟合为多项式方程。立即获取最佳拟合方程、R²值并预测新值。",
      "zh-TW": "使用這款免費曲線擬合工具，將資料擬合為多項式方程。立即取得最佳擬合方程、R²值並預測新值。",
      ja: "この無料の曲線フィッティングツールでデータを多項式方程式に当てはめます。最適式、R²値、予測値をすぐに取得できます。",
      ko: "이 무료 곡선 맞춤 도구로 데이터를 다항식 방정식에 맞추세요. 최적식, R² 값, 새 값 예측을 바로 확인할 수 있습니다.",
      es: "Ajusta datos a una ecuación polinómica con esta herramienta gratis de ajuste de curvas. Obtén la mejor ecuación, R² y predice valores al instante.",
      fr: "Ajustez des données à une équation polynomiale avec cet outil gratuit de courbe. Obtenez l’équation optimale, le R² et des prédictions instantanées.",
      de: "Daten mit diesem kostenlosen Kurvenanpassungs-Tool an eine Polynomgleichung anpassen. Beste Gleichung, R² und Prognosen sofort erhalten.",
      pt: "Ajuste dados a uma equação polinomial com esta ferramenta grátis de ajuste de curvas. Veja a melhor equação, o R² e preveja valores instantaneamente.",
      ru: "Подгоняйте данные под полиномиальное уравнение с этим бесплатным инструментом. Получайте лучшую формулу, R² и прогнозы мгновенно."
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
      ko: "hapdong-pyojunpyeoncha-gyesangi",
      es: "calculadora-desviacion-estandar-combinada",
      fr: "calculateur-ecart-type-groupe",
      de: "rechner-gepoolte-standardabweichung",
      pt: "calculadora-desvio-padrao-combinado",
      ru: "kalkulyator-obedinyonnogo-standartnogo-otkloneniya"
    },
    titles: {
      en: "Pooled Standard Deviation Calculator - Two Samples",
      "zh-CN": "合并标准差计算器 - 两个样本",
      "zh-TW": "合併標準差計算器 - 兩個樣本",
      ja: "プール標準偏差計算機 - 2標本",
      ko: "합동 표준편차 계산기 - 두 표본",
      es: "Calculadora de desviación estándar combinada",
      fr: "Calculateur d'écart-type groupé - deux échantillons",
      de: "Rechner für gepoolte Standardabweichung",
      pt: "Calculadora de desvio padrão combinado",
      ru: "Калькулятор объединенного стандартного отклонения"
    },
    descriptions: {
      en: "Calculate the pooled standard deviation for two samples using sizes, means, and standard deviations. Accurate results for t-tests and statistical analysis.",
      "zh-CN": "使用两个样本的样本量、均值和标准差计算合并标准差，为 t 检验和统计分析提供准确结果。",
      "zh-TW": "使用兩個樣本的樣本數、平均數和標準差計算合併標準差，提供 t 檢定與統計分析的準確結果。",
      ja: "2標本のサイズ、平均、標準偏差からプール標準偏差を計算。t検定や統計分析に使える正確な結果を得られます。",
      ko: "두 표본의 크기, 평균, 표준편차로 합동 표준편차를 계산해 t-검정과 통계 분석에 정확한 결과를 제공합니다.",
      es: "Calcula la desviación estándar combinada de dos muestras con tamaños, medias y desviaciones estándar. Resultados precisos para pruebas t.",
      fr: "Calculez l'écart-type groupé de deux échantillons avec tailles, moyennes et écarts-types. Résultats précis pour tests t et analyses.",
      de: "Berechnen Sie die gepoolte Standardabweichung für zwei Stichproben aus Größen, Mittelwerten und Standardabweichungen.",
      pt: "Calcule o desvio padrão combinado de duas amostras usando tamanhos, médias e desvios padrão. Resultados precisos para testes t.",
      ru: "Рассчитайте объединенное стандартное отклонение для двух выборок по размерам, средним и стандартным отклонениям."
    }
  },
  {
    id: "population-variance-calculator",
    category: "statistic",
    slugs: {
      en: "population-variance-calculator",
      "zh-CN": "zongti-fangcha-jisuanqi",
      "zh-TW": "muti-bianyishu-jisuanqi",
      ja: "boshudan-bunsan-keisanki",
      ko: "mojipdan-bunsan-gyesangi",
      es: "calculadora-varianza-poblacional",
      fr: "calculateur-variance-population",
      de: "populationsvarianz-rechner",
      pt: "calculadora-variancia-populacional",
      ru: "kalkulyator-dispersii-generalnoi-sovokupnosti"
    },
    titles: {
      en: "Population Variance Calculator - Dispersion Analysis",
      "zh-CN": "总体方差计算器",
      "zh-TW": "母體變異數計算器",
      ja: "母集団分散計算機",
      ko: "모집단 분산 계산기",
      es: "Calculadora de varianza poblacional",
      fr: "Calculateur de variance de population",
      de: "Populationsvarianz-Rechner",
      pt: "Calculadora de variância populacional",
      ru: "Калькулятор дисперсии генеральной совокупности"
    },
    descriptions: {
      en: "Calculate population variance, standard deviation, and mean for any data set. Free online statistical dispersion tool — paste numbers and get results instantly.",
      "zh-CN": "即时计算总体方差、标准差和均值；粘贴数据即可快速得到完整统计结果。",
      "zh-TW": "可即時計算母體變異數、標準差與平均數；貼上資料即可快速取得完整統計結果。",
      ja: "データを貼り付けるだけで、母集団分散・標準偏差・平均値をすぐに計算できます。",
      ko: "데이터를 붙여넣기만 하면 모집단 분산, 표준편차, 평균을 즉시 계산합니다.",
      es: "Calcula al instante la varianza poblacional, la desviación estándar y la media; pega datos y obtén resultados rápidos.",
      fr: "Calculez instantanément la variance de population, l’écart type et la moyenne ; collez vos données et obtenez des résultats rapides.",
      de: "Berechnen Sie sofort Populationsvarianz, Standardabweichung und Mittelwert; Daten einfügen und schnell Ergebnisse erhalten.",
      pt: "Calcule instantaneamente a variância populacional, o desvio padrão e a média; cole os dados e obtenha resultados rápidos.",
      ru: "Мгновенно вычисляйте дисперсию генеральной совокупности, стандартное отклонение и среднее; вставьте данные и быстро получите результат."
    }
  },
  {
    id: "post-test-probability-calculator",
    category: "statistic",
    slugs: {
      en: "post-test-probability-calculator",
      "zh-CN": "hou-ceshi-gailv-jisuanqi",
      "zh-TW": "hou-ceshi-gailv-jisuanqi",
      ja: "kensa-go-kakuritsu-keisan",
      ko: "geomsa-hu-gwallyul-gyesan-gi",
      es: "calculadora-probabilidad-posprueba",
      fr: "calculateur-probabilite-post-test",
      de: "post-test-wahrscheinlichkeit-rechner",
      pt: "calculadora-probabilidade-pos-teste",
      ru: "kalkulyator-post-test-veroyatnosti"
    },
    titles: {
      en: "Post-Test Probability Calculator - Bayes Theorem",
      "zh-CN": "检后概率计算器",
      "zh-TW": "檢後機率計算器",
      ja: "検査後確率計算機",
      ko: "검사 후 확률 계산기",
      es: "Calculadora de probabilidad posprueba",
      fr: "Calculateur de probabilité post-test",
      de: "Rechner für Post-Test-Wahrscheinlichkeit",
      pt: "Calculadora de probabilidade pós-teste",
      ru: "Калькулятор посттестовой вероятности"
    },
    descriptions: {
      en: "Calculate post-test probability using Bayes' theorem. Enter prior probability, sensitivity, and specificity to find PPV, NPV, and likelihood ratios.",
      "zh-CN": "使用贝叶斯定理计算检后概率，输入先验概率、敏感度和特异度，得到 PPV、NPV 和似然比。",
      "zh-TW": "使用貝葉斯定理計算檢後機率，輸入先驗機率、敏感度與特異度，即可得到 PPV、NPV 與似然比。",
      ja: "ベイズの定理で検査後確率を計算。事前確率、感度、特異度を入力して PPV、NPV、尤度比を求めます。",
      ko: "베이즈 정리로 검사 후 확률을 계산합니다. 사전확률, 민감도, 특이도를 입력해 PPV, NPV, 가능도비를 구하세요.",
      es: "Calcula la probabilidad posprueba con el teorema de Bayes. Ingresa probabilidad previa, sensibilidad y especificidad para obtener PPV, NPV y razones de verosimilitud.",
      fr: "Calculez la probabilité post-test avec le théorème de Bayes. Saisissez probabilité prétest, sensibilité et spécificité pour obtenir VPP, VPN et rapports de vraisemblance.",
      de: "Berechnen Sie die Post-Test-Wahrscheinlichkeit mit dem Satz von Bayes. Geben Sie Vortestwahrscheinlichkeit, Sensitivität und Spezifität ein, um PPV, NPV und Likelihood-Ratios zu erhalten.",
      pt: "Calcule a probabilidade pós-teste com o teorema de Bayes. Informe probabilidade pré-teste, sensibilidade e especificidade para obter VPP, VPN e razões de verossimilhança.",
      ru: "Рассчитайте посттестовую вероятность по теореме Байеса. Введите априорную вероятность, чувствительность и специфичность, чтобы получить PPV, NPV и отношения правдоподобия."
    }
  },
  {
    id: "f-statistic-calculator",
    category: "statistic",
    slugs: {
      en: "f-statistic-calculator",
      "zh-CN": "f-tongjiliang-jisuanqi",
      "zh-TW": "f-tongjiliang-jisuanqi",
      ja: "f-tokeiryo-keisanki",
      ko: "f-tonggyeryang-gyesangi",
      es: "calculadora-estadistico-f",
      fr: "calculateur-statistique-f",
      de: "f-statistik-rechner",
      pt: "calculadora-estatistica-f",
      ru: "kalkulyator-f-statistiki"
    },
    titles: {
      en: "F-Statistic Calculator - ANOVA & Variance Ratio Test",
      "zh-CN": "F统计量计算器 - ANOVA与方差比检验",
      "zh-TW": "F統計量計算器 - ANOVA與變異數比檢定",
      ja: "F統計量計算機 - ANOVAと分散比検定",
      ko: "F 통계량 계산기 - ANOVA 및 분산비 검정",
      es: "Calculadora de estadístico F - ANOVA y prueba de varianzas",
      fr: "Calculateur de statistique F - ANOVA et test de variance",
      de: "F-Statistik-Rechner - ANOVA und Varianzquotiententest",
      pt: "Calculadora de estatística F - ANOVA e teste de variância",
      ru: "Калькулятор F-статистики - ANOVA и тест отношения дисперсий"
    },
    descriptions: {
      en: "Calculate the F-statistic and p-value for comparing two sample variances. Enter group variances and sizes to run an ANOVA or F-ratio test instantly.",
      "zh-CN": "计算用于比较两个样本方差的F统计量和p值。输入各组方差和样本量，即可快速执行ANOVA或F比率检验。",
      "zh-TW": "計算用於比較兩個樣本變異數的F統計量與p值。輸入各組變異數和樣本數，即可快速執行ANOVA或F比率檢定。",
      ja: "2つの標本分散を比較するF統計量とp値を計算。各群の分散と標本サイズを入力してANOVAやF比検定をすぐ実行できます。",
      ko: "두 표본분산 비교를 위한 F 통계량과 p값을 계산하세요. 각 그룹의 분산과 표본 크기를 입력해 ANOVA 또는 F비 검정을 즉시 실행합니다.",
      es: "Calcula el estadístico F y el valor p para comparar dos varianzas muestrales. Introduce varianzas y tamaños para ANOVA o prueba F al instante.",
      fr: "Calculez la statistique F et la valeur p pour comparer deux variances d'échantillon. Saisissez variances et tailles pour lancer ANOVA ou test F.",
      de: "Berechne F-Statistik und p-Wert zum Vergleich zweier Stichprobenvarianzen. Varianzen und Stichprobengrößen eingeben und F-Test starten.",
      pt: "Calcule a estatística F e o valor p para comparar duas variâncias amostrais. Insira variâncias e tamanhos para ANOVA ou teste F instantâneo.",
      ru: "Рассчитайте F-статистику и p-значение для сравнения двух выборочных дисперсий. Введите дисперсии и размеры групп для ANOVA или F-теста."
    }
  },
  {
    id: "f-test-for-equality-of-two-variances-calculator",
    category: "statistic",
    slugs: {
      en: "f-test-for-equality-of-two-variances-calculator",
      "zh-CN": "f-jianyan-liangge-fangcha-xiangdeng-jisuanqi",
      "zh-TW": "f-jianyan-liangge-fangcha-xiangdeng-jisuanqi",
      ja: "f-kentei-bunsan-todo-keisanki",
      ko: "f-geomjeong-du-bunsan-dongdeung-gyesangi",
      es: "calculadora-prueba-f-igualdad-varianzas",
      fr: "calculateur-test-f-egalite-variances",
      de: "f-test-gleichheit-varianzen-rechner",
      pt: "calculadora-teste-f-igualdade-variancias",
      ru: "f-test-ravenstvo-dvuh-dispersiy-kalkulyator"
    },
    titles: {
      en: "F-Test for Equality of Two Variances Calculator",
      "zh-CN": "两方差相等 F 检验计算器",
      "zh-TW": "兩方差相等 F 檢定計算器",
      ja: "2つの分散の等質性 F検定計算機",
      ko: "두 분산 동등성 F-검정 계산기",
      es: "Calculadora de prueba F para igualdad de varianzas",
      fr: "Calculateur de test F d’égalité des variances",
      de: "F-Test-Rechner für Gleichheit von Varianzen",
      pt: "Calculadora de teste F para igualdade de variâncias",
      ru: "Калькулятор F-теста равенства дисперсий"
    },
    descriptions: {
      en: "Perform an F-test for equality of two variances. Enter sample variances and sizes to get the F-statistic, p-value, and reject/fail-to-reject decision.",
      "zh-CN": "执行两方差相等的 F 检验。输入样本方差和样本量，获得 F 统计量、p 值以及拒绝或不拒绝的判断。",
      "zh-TW": "執行兩方差相等的 F 檢定。輸入樣本方差與樣本數，取得 F 統計量、p 值以及拒絕或不拒絕的判斷。",
      ja: "2つの分散の等質性を F 検定で判定。標本分散と標本サイズを入力し、F統計量、p値、棄却判断を取得します。",
      ko: "두 분산의 동등성을 F-검정으로 확인하세요. 표본분산과 표본크기를 입력해 F통계량, p값, 기각 여부를 얻습니다.",
      es: "Realiza una prueba F de igualdad de varianzas. Ingresa varianzas y tamaños muestrales para obtener F, p-valor y decisión estadística.",
      fr: "Réalisez un test F d’égalité des variances. Entrez variances et tailles d’échantillon pour obtenir F, p-valeur et décision.",
      de: "F-Test auf Gleichheit zweier Varianzen durchführen. Stichprobenvarianzen und Größen eingeben, F-Wert, p-Wert und Entscheidung erhalten.",
      pt: "Faça um teste F de igualdade de variâncias. Informe variâncias e tamanhos amostrais para obter F, valor-p e decisão estatística.",
      ru: "Выполните F-тест равенства двух дисперсий. Введите выборочные дисперсии и размеры, чтобы получить F-статистику, p-значение и решение."
    }
  },
  {
    id: "false-positive-paradox-calculator",
    category: "statistic",
    slugs: {
      en: "false-positive-paradox-calculator",
      "zh-CN": "wu-yan-lu-qi-fen-xi-ji-suan-qi",
      "zh-TW": "jia-yang-xing-bei-lun-ji-suan-qi",
      ja: "gisei-yousei-paradox-calculator",
      ko: "gajangseong-yangseong-paradoxeu-gyesangi",
      es: "calculadora-paradoja-falso-positivo",
      fr: "calculateur-paradoxe-faux-positif",
      de: "falschpositiv-paradoxon-rechner",
      pt: "calculadora-paradoxo-falso-positivo",
      ru: "paradoks-lzhepozitivnogo-rezultata-kalkulyator"
    },
    titles: {
      en: "False Positive Paradox Calculator - Bayes' Theorem",
      "zh-CN": "假阳性悖论计算器",
      "zh-TW": "假陽性悖論計算器",
      ja: "偽陽性パラドックス計算機",
      ko: "위양성 역설 계산기",
      es: "Calculadora de paradoja del falso positivo",
      fr: "Calculateur de paradoxe du faux positif",
      de: "Falschpositiv-Paradoxon Rechner",
      pt: "Calculadora de paradoxo do falso positivo",
      ru: "Калькулятор парадокса ложноположительного"
    },
    descriptions: {
      en: "Calculate the probability of truly having a condition after a positive test. Enter prevalence, sensitivity, and specificity to see the false positive paradox.",
      "zh-CN": "计算阳性检测后真正患病的概率。输入患病率、灵敏度和特异度，了解假阳性悖论。",
      "zh-TW": "計算陽性檢測後真正患病的機率。輸入盛行率、靈敏度與特異度，了解假陽性悖論。",
      ja: "陽性結果の後に本当に病気である確率を計算。有病率、感度、特異度を入力して偽陽性パラドックスを確認。",
      ko: "양성 검사 후 실제로 질환이 있을 확률을 계산하세요. 유병률, 민감도, 특이도를 입력해 위양성 역설을 확인합니다.",
      es: "Calcula la probabilidad real de tener una condición tras un resultado positivo. Introduce prevalencia, sensibilidad y especificidad.",
      fr: "Calculez la probabilité réelle d’avoir une condition après un test positif. Entrez prévalence, sensibilité et spécificité.",
      de: "Berechnen Sie die wahre Wahrscheinlichkeit für eine Erkrankung nach einem positiven Test. Prävalenz, Sensitivität und Spezifität eingeben.",
      pt: "Calcule a probabilidade real de ter uma condição após um teste positivo. Informe prevalência, sensibilidade e especificidade.",
      ru: "Рассчитайте реальную вероятность заболевания после положительного теста. Введите распространённость, чувствительность и специфичность."
    }
  },
  {
    id: "fishers-exact-test-calculator",
    category: "statistic",
    slugs: {
      en: "fishers-exact-test-calculator",
      "zh-CN": "fisher-jingque-ceshi-2x2-lianbiao-jisuanqi",
      "zh-TW": "fisher-jingque-ceshi-2x2-lianbiao-jisuanqi",
      ja: "fissheru-seikaku-kentei-2x2-kakuritsuhyo-jisuanki",
      ko: "piseo-jeonghwak-gamjeong-2x2-hoebupyo-gyeolsangi",
      es: "prueba-exacta-fisher-tabla-2x2",
      fr: "test-exact-fisher-tableau-2x2",
      de: "fisher-exakter-test-2x2-kontingenztabelle",
      pt: "teste-exato-fisher-tabela-2x2",
      ru: "tochnyy-kriteriy-fishera-kalkulyator-2x2-tablica"
    },
    titles: {
      en: "Fisher's Exact Test Calculator - 2x2 Contingency Table",
      "zh-CN": "Fisher精确检验：2×2列联表",
      "zh-TW": "Fisher確切檢定：2×2列聯表",
      ja: "Fisherの正確検定：2×2分割表",
      ko: "피셔의 정확 검정: 2×2 분할표",
      es: "Prueba exacta de Fisher: tabla 2x2",
      fr: "Test exact de Fisher : tableau 2x2",
      de: "Fisher-Exakter Test: 2×2-Kontingenztabelle",
      pt: "Teste exato de Fisher: tabela 2x2",
      ru: "Точный критерий Фишера: таблица 2×2"
    },
    descriptions: {
      en: "Run Fisher's Exact Test on a 2×2 contingency table. Get one-tailed and two-tailed p-values plus the odds ratio — ideal for small sample sizes in research.",
      "zh-CN": "对2×2列联表进行Fisher精确检验，获取单尾和双尾p值以及优势比，适合小样本研究。",
      "zh-TW": "對2×2列聯表進行Fisher確切檢定，取得單尾與雙尾 p 值及勝算比，適合小樣本研究。",
      ja: "2×2分割表にFisherの正確検定を実行し、両側・片側p値とオッズ比を取得できます。小標本研究に最適です。",
      ko: "2×2 분할표에 Fisher의 정확 검정을 적용해 단측·양측 p값과 오즈비를 확인하세요. 소표본 연구에 적합합니다.",
      es: "Aplica la prueba exacta de Fisher a una tabla de contingencia 2×2 y obtén p bilaterales, unilaterales y la razón de momios.",
      fr: "Appliquez le test exact de Fisher à un tableau de contingence 2×2 et obtenez les p unilatéraux, bilatéraux et l’odds ratio.",
      de: "Führe den exakten Fisher-Test auf einer 2×2-Kontingenztabelle aus und erhalte ein- und zweiseitige p-Werte sowie die Odds Ratio.",
      pt: "Aplique o teste exato de Fisher a uma tabela de contingência 2×2 e obtenha p unilaterais, bilaterais e a razão de chances.",
      ru: "Примените точный критерий Фишера к таблице сопряжённости 2×2 и получите односторонние, двусторонние p-значения и отношение шансов."
    }
  },
  {
    id: "frequency-distribution-calculator",
    category: "statistic",
    slugs: {
      en: "frequency-distribution-calculator",
      "zh-CN": "pinlv-fenbu-jisuanqi",
      "zh-TW": "pinlv-fenbu-jisuanqi",
      ja: "dosu-bunpu-keisanki",
      ko: "dosu-bunpo-gyesan-gi",
      es: "calculadora-distribucion-frecuencias",
      fr: "calculateur-distribution-frequences",
      de: "frequenzverteilung-rechner",
      pt: "calculadora-distribuicao-frequencias",
      ru: "kalkulyator-raspredeleniya-chastot"
    },
    titles: {
      en: "Frequency Distribution Calculator - Create Tables",
      "zh-CN": "频率分布计算器",
      "zh-TW": "頻率分布計算器",
      ja: "度数分布計算機",
      ko: "도수분포 계산기",
      es: "Calculadora de distribución de frecuencias",
      fr: "Calculateur de distribution de fréquences",
      de: "Frequenzverteilungsrechner",
      pt: "Calculadora de distribuição de frequências",
      ru: "Калькулятор распределения частот"
    },
    descriptions: {
      en: "Create a frequency distribution table from any data set. Calculate frequency, relative frequency, cumulative frequency, mean, median, and standard deviation.",
      "zh-CN": "从任意数据集创建频率分布表，计算频率、相对频率、累计频率、均值、中位数和标准差。",
      "zh-TW": "從任意資料集建立頻率分布表，計算頻率、相對頻率、累積頻率、平均數、中位數與標準差。",
      ja: "任意のデータから度数分布表を作成し、度数、相対度数、累積度数、平均、中央値、標準偏差を計算します。",
      ko: "임의의 데이터에서 도수분포표를 만들고 도수, 상대도수, 누적도수, 평균, 중앙값, 표준편차를 계산합니다.",
      es: "Crea tablas de distribución de frecuencias a partir de cualquier conjunto de datos y calcula frecuencia, frecuencia relativa, acumulada, media, mediana y desviación estándar.",
      fr: "Créez un tableau de distribution de fréquences à partir de n'importe quel jeu de données et calculez fréquence, fréquence relative, fréquence cumulée, moyenne, médiane et écart type.",
      de: "Erstellen Sie eine Häufigkeitsverteilungstabelle aus beliebigen Daten und berechnen Sie Häufigkeit, relative Häufigkeit, kumulierte Häufigkeit, Mittelwert, Median und Standardabweichung.",
      pt: "Crie tabelas de distribuição de frequências a partir de qualquer conjunto de dados e calcule frequência, frequência relativa, frequência acumulada, média, mediana e desvio padrão.",
      ru: "Создавайте таблицы распределения частот из любых данных и вычисляйте частоту, относительную частоту, накопленную частоту, среднее, медиану и стандартное отклонение."
    }
  },
  {
    id: "error-propagation-calculator",
    category: "statistic",
    slugs: {
      en: "error-propagation-calculator",
      "zh-CN": "wucha-chuanbo-jisuanqi",
      "zh-TW": "wucha-chuanbo-jisuanqi",
      ja: "gosa-denpa-keisanki",
      ko: "ocha-jeonpa-gyesangi",
      es: "calculadora-propagacion-errores",
      fr: "calculateur-propagation-erreurs",
      de: "fehlerfortpflanzung-rechner",
      pt: "calculadora-propagacao-erros",
      ru: "kalkulyator-rasprostraneniya-pogreshnostey"
    },
    titles: {
      en: "Error Propagation Calculator - Uncertainty",
      "zh-CN": "误差传播计算器 - 不确定度",
      "zh-TW": "誤差傳播計算器 - 不確定度",
      ja: "誤差伝播計算機 - 不確かさ",
      ko: "오차 전파 계산기 - 불확도",
      es: "Calculadora de propagación de errores",
      fr: "Calculateur de propagation des erreurs",
      de: "Fehlerfortpflanzung Rechner",
      pt: "Calculadora de propagação de erros",
      ru: "Калькулятор распространения погрешностей"
    },
    descriptions: {
      en: "Calculate error propagation and measurement uncertainty for sum/difference and product/power formulas. Get absolute and relative uncertainty instantly.",
      "zh-CN": "计算和差、乘积及幂公式中的误差传播与测量不确定度，立即获得绝对不确定度和相对不确定度。",
      "zh-TW": "計算和差、乘積與冪公式中的誤差傳播與測量不確定度，立即取得絕對不確定度和相對不確定度。",
      ja: "和・差、積・べき乗の式における誤差伝播と測定不確かさを計算し、絶対不確かさと相対不確かさをすぐに確認できます。",
      ko: "합/차 및 곱/거듭제곱 공식의 오차 전파와 측정 불확도를 계산하고 절대·상대 불확도를 즉시 확인하세요.",
      es: "Calcula la propagación de errores y la incertidumbre de medición en sumas, diferencias, productos y potencias al instante.",
      fr: "Calculez la propagation des erreurs et l’incertitude de mesure pour sommes, différences, produits et puissances, instantanément.",
      de: "Berechne Fehlerfortpflanzung und Messunsicherheit für Summen, Differenzen, Produkte und Potenzen sofort.",
      pt: "Calcule propagação de erros e incerteza de medição em somas, diferenças, produtos e potências instantaneamente.",
      ru: "Рассчитайте распространение погрешностей и неопределенность измерений для сумм, разностей, произведений и степеней."
    }
  },
  {
    id: "expected-value-calculator",
    category: "statistic",
    slugs: {
      en: "expected-value-calculator",
      "zh-CN": "qiwangzhi-jisuanqi",
      "zh-TW": "qiwangzhi-jisuanqi",
      ja: "kitai-chi-keisanki",
      ko: "gidae-gabs-gyesangi",
      es: "valor-esperado",
      fr: "esperance-mathematique",
      de: "erwartungswert-rechner",
      pt: "valor-esperado",
      ru: "matozhidanie-kalkulyator"
    },
    titles: {
      en: "Expected Value Calculator - Probability Distribution",
      "zh-CN": "期望值计算器",
      "zh-TW": "期望值計算機",
      ja: "期待値計算機",
      ko: "기댓값 계산기",
      es: "Calculadora de valor esperado",
      fr: "Calculateur d'espérance",
      de: "Erwartungswert-Rechner",
      pt: "Calculadora de valor esperado",
      ru: "Калькулятор матожидания"
    },
    descriptions: {
      en: "Calculate expected value, variance, and standard deviation for discrete probability distributions. Enter outcomes and probabilities to get E[X] instantly.",
      "zh-CN": "计算离散概率分布的期望值、方差和标准差，输入结果与概率即可立即得到 E[X]。",
      "zh-TW": "計算離散機率分布的期望值、變異數與標準差，輸入結果與機率即可立即得到 E[X]。",
      ja: "離散確率分布の期待値・分散・標準偏差を計算。結果と確率を入力すると E[X] をすぐ求められます。",
      ko: "이산 확률분포의 기댓값, 분산, 표준편차를 계산합니다. 결과와 확률을 입력하면 E[X]를 바로 확인할 수 있습니다.",
      es: "Calcula el valor esperado, la varianza y la desviación estándar de distribuciones discretas. Ingresa resultados y probabilidades para obtener E[X].",
      fr: "Calculez l'espérance, la variance et l'écart-type de distributions discrètes. Saisissez les issues et probabilités pour obtenir E[X].",
      de: "Berechnen Sie Erwartungswert, Varianz und Standardabweichung diskreter Verteilungen. Werte und Wahrscheinlichkeiten eingeben für E[X].",
      pt: "Calcule valor esperado, variância e desvio padrão de distribuições discretas. Insira resultados e probabilidades para obter E[X].",
      ru: "Рассчитайте матожидание, дисперсию и стандартное отклонение дискретных распределений. Введите исходы и вероятности для E[X]."
    }
  },
  {
    id: "exponential-distribution-calculator",
    category: "statistic",
    slugs: {
      en: "exponential-distribution-calculator",
      "zh-CN": "zhi-shu-fen-bu-ji-suan-qi",
      "zh-TW": "zhi-shu-fen-bu-ji-suan-qi",
      ja: "shisuu-bunpu-keisanki",
      ko: "jisu-bunpo-gyesangi",
      es: "calculadora-distribucion-exponencial",
      fr: "calculatrice-distribution-exponentielle",
      de: "exponentialverteilung-rechner",
      pt: "calculadora-distribuicao-exponencial",
      ru: "eksponentsialnoe-raspredelenie-kalkulyator"
    },
    titles: {
      en: "Exponential Distribution Calculator - PDF & CDF",
      "zh-CN": "指数分布计算器",
      "zh-TW": "指數分布計算器",
      ja: "指数分布計算器",
      ko: "지수분포 계산기",
      es: "Calculadora de distribución exponencial",
      fr: "Calculatrice de loi exponentielle",
      de: "Exponentialverteilung Rechner",
      pt: "Calculadora de distribuição exponencial",
      ru: "Калькулятор экспоненциального распределения"
    },
    descriptions: {
      en: "Compute exponential distribution PDF, CDF, mean, variance, and survival probability. Enter rate parameter λ and value x for instant statistical results.",
      "zh-CN": "计算指数分布的 PDF、CDF、均值、方差和生存概率。输入速率参数 λ 和数值 x，立即得到统计结果。",
      "zh-TW": "計算指數分布的 PDF、CDF、平均數、變異數與存活機率。輸入速率參數 λ 與數值 x，立即得到統計結果。",
      ja: "指数分布の PDF、CDF、平均、分散、存続確率を計算。速度パラメータ λ と x を入力して即座に結果を表示。",
      ko: "지수분포의 PDF, CDF, 평균, 분산, 생존확률을 계산합니다. 속도 매개변수 λ와 x를 입력해 즉시 결과를 확인하세요.",
      es: "Calcula la PDF, CDF, media, varianza y probabilidad de supervivencia de la distribución exponencial. Ingresa λ y x para ver resultados al instante.",
      fr: "Calculez la PDF, la CDF, la moyenne, la variance et la probabilité de survie de la loi exponentielle. Saisissez λ et x pour des résultats instantanés.",
      de: "Berechnen Sie PDF, CDF, Mittelwert, Varianz und Überlebenswahrscheinlichkeit der Exponentialverteilung. Geben Sie λ und x ein für Sofortergebnisse.",
      pt: "Calcule a PDF, CDF, média, variância e probabilidade de sobrevivência da distribuição exponencial. Informe λ e x para resultados instantâneos.",
      ru: "Рассчитайте PDF, CDF, среднее, дисперсию и вероятность выживания экспоненциального распределения. Введите λ и x для мгновенного результата."
    }
  },
  {
    id: "exponential-growth-prediction-calculator",
    category: "statistic",
    slugs: {
      en: "exponential-growth-prediction-calculator",
      "zh-CN": "zhishu-zengzhang-yuce-ji-suan-qi",
      "zh-TW": "zhishu-zengzhang-yuce-ji-suan-qi",
      ja: "shisuu-seicho-yosoku-keitanki",
      ko: "jisoo-seongjang-yecheuk-gyesangi",
      es: "calculadora-prediccion-crecimiento-exponencial",
      fr: "calculateur-prediction-croissance-exponentielle",
      de: "exponentielles-wachstum-prognose-rechner",
      pt: "calculadora-previsao-crescimento-exponencial",
      ru: "prognoz-ehksponentsialnogo-rosta-kalkulyator"
    },
    titles: {
      en: "Exponential Growth Prediction Calculator",
      "zh-CN": "指数增长预测计算器",
      "zh-TW": "指數增長預測計算器",
      ja: "指数成長予測計算機",
      ko: "지수 성장 예측 계산기",
      es: "Calculadora de crecimiento exponencial",
      fr: "Calculateur de croissance exponentielle",
      de: "Exponentieller Wachstumsrechner",
      pt: "Calculadora de crescimento exponencial",
      ru: "Калькулятор экспоненциального роста"
    },
    descriptions: {
      en: "Predict future values with exponential growth. Use initial value and rate, or two data points to forecast population, investment, or bacterial growth.",
      "zh-CN": "使用指数增长预测未来值。可输入初始值和增长率，或用两个数据点预测人口、投资或细菌增长。",
      "zh-TW": "使用指數增長預測未來值。可輸入初始值和增長率，或用兩個資料點預測人口、投資或細菌增長。",
      ja: "指数成長で将来値を予測。初期値と成長率、または2点のデータから人口・投資・細菌増殖を予測します。",
      ko: "지수 성장을 사용해 미래 값을 예측하세요. 초기값과 성장률 또는 두 데이터로 인구, 투자, 세균 증식을 예측합니다.",
      es: "Predice valores futuros con crecimiento exponencial. Usa un valor inicial y una tasa, o dos puntos de datos para estimar población, inversión o bacterias.",
      fr: "Prédisez des valeurs futures avec une croissance exponentielle. Utilisez une valeur initiale et un taux, ou deux points de données pour estimer population, investissement ou bactéries.",
      de: "Prognostiziere zukünftige Werte mit exponentiellem Wachstum. Nutze Anfangswert und Rate oder zwei Datenpunkte für Bevölkerung, Investition oder Bakterienwachstum.",
      pt: "Preveja valores futuros com crescimento exponencial. Use valor inicial e taxa ou dois pontos de dados para estimar população, investimento ou bactérias.",
      ru: "Прогнозируйте будущие значения с экспоненциальным ростом. Используйте начальное значение и темп или две точки данных для населения, инвестиций или бактерий."
    }
  },
  {
    id: "exponential-regression-calculator",
    category: "statistic",
    slugs: {
      en: "exponential-regression-calculator",
      "zh-CN": "zhishu-huigui-jisuanqi",
      "zh-TW": "zhishu-huigui-jisuanqi",
      ja: "shisuu-kaiki-keisanki",
      ko: "jisu-hoegwi-gyesangi",
      es: "calculadora-regresion-exponencial",
      fr: "calculatrice-regression-exponentielle",
      de: "exponentialregression-rechner",
      pt: "calculadora-regressao-exponencial",
      ru: "kalkulyator-eksponentsialnoy-regressii"
    },
    titles: {
      en: "Exponential Regression Calculator - y = ab^x",
      "zh-CN": "指数回归计算器",
      "zh-TW": "指數回歸計算器",
      ja: "指数回帰計算機",
      ko: "지수 회귀 계산기",
      es: "Calculadora de regresión exponencial",
      fr: "Calculatrice de régression exponentielle",
      de: "Exponentialregression-Rechner",
      pt: "Calculadora de regressão exponencial",
      ru: "Калькулятор экспоненциальной регрессии"
    },
    descriptions: {
      en: "Fit an exponential regression model y = ab^x to your data. Get coefficients a and b, R-squared, correlation, and predicted values from paired data points.",
      "zh-CN": "将数据拟合为 y = ab^x 指数模型，并计算系数、R²、相关系数和预测值。",
      "zh-TW": "將資料擬合為 y = ab^x 指數模型，並計算係數、R²、相關係數與預測值。",
      ja: "データを y = ab^x の指数モデルに当てはめ、係数、R²、相関係数、予測値を求めます。",
      ko: "데이터를 y = ab^x 지수 모델에 맞추고 계수, R², 상관계수, 예측값을 계산합니다.",
      es: "Ajusta un modelo exponencial y = ab^x a tus datos y calcula coeficientes, R², correlación y predicciones.",
      fr: "Ajustez un modèle exponentiel y = ab^x à vos données et calculez coefficients, R², corrélation et prédictions.",
      de: "Passe ein exponentielles Modell y = ab^x an deine Daten an und berechne Koeffizienten, R², Korrelation und Prognosen.",
      pt: "Ajuste um modelo exponencial y = ab^x aos seus dados e calcule coeficientes, R², correlação e previsões.",
      ru: "Подгоните экспоненциальную модель y = ab^x к данным и получите коэффициенты, R², корреляцию и прогнозы."
    }
  },
  {
    id: "rayleigh-distribution-calculator",
    category: "statistic",
    slugs: {
      en: "rayleigh-distribution-calculator",
      "zh-CN": "rayleigh-fenbu-jisuanqi",
      "zh-TW": "rayleigh-fenbu-jisuanqi",
      ja: "rayleigh-bunpu-keisanki",
      ko: "reillei-bunpo-gyesangi",
      es: "calculadora-distribucion-rayleigh",
      fr: "calculateur-distribution-rayleigh",
      de: "rayleigh-verteilungsrechner",
      pt: "calculadora-distribuicao-rayleigh",
      ru: "kalkulyator-raspredeleniya-reyleya"
    },
    titles: {
      en: "Rayleigh Distribution Calculator - PDF, CDF & Stats",
      "zh-CN": "Rayleigh分布计算器",
      "zh-TW": "Rayleigh分布計算器",
      ja: "Rayleigh分布計算機",
      ko: "레이리 분포 계산기",
      es: "Calculadora de distribución de Rayleigh",
      fr: "Calculateur de loi de Rayleigh",
      de: "Rayleigh-Verteilungsrechner",
      pt: "Calculadora da distribuição de Rayleigh",
      ru: "Калькулятор распределения Райли"
    },
    descriptions: {
      en: "Rayleigh distribution calculator: compute PDF, CDF, complementary CDF, mean, median, mode, and variance from scale parameter σ and value x instantly.",
      "zh-CN": "Rayleigh分布计算器：根据尺度参数σ和x值，立即计算PDF、CDF、互补CDF、均值、中位数、众数和方差。",
      "zh-TW": "Rayleigh分布計算器：根據尺度參數σ和x值，立即計算PDF、CDF、互補CDF、平均數、中位數、眾數與變異數。",
      ja: "Rayleigh分布計算器：尺度パラメータσとxの値から、PDF、CDF、補完CDF、平均、中央値、最頻値、分散を即座に計算します。",
      ko: "레이리 분포 계산기: σ와 x 값으로 PDF, CDF, 보완 CDF, 평균, 중앙값, 최빈값, 분산을 즉시 계산합니다.",
      es: "Calculadora de distribución de Rayleigh: calcula al instante la PDF, la CDF, la CDF complementaria, la media, la mediana, la moda y la varianza.",
      fr: "Calculateur de loi de Rayleigh : calcule instantanément la PDF, la CDF, la CDF complémentaire, la moyenne, la médiane, le mode et la variance.",
      de: "Rayleigh-Verteilungsrechner: berechnet sofort PDF, CDF, ergänzende CDF, Mittelwert, Median, Modus und Varianz aus σ und x.",
      pt: "Calculadora da distribuição de Rayleigh: calcule instantaneamente PDF, CDF, CDF complementar, média, mediana, moda e variância a partir de σ e x.",
      ru: "Калькулятор распределения Райли: мгновенно вычисляет PDF, CDF, дополненную CDF, среднее, медиану, моду и дисперсию по σ и x."
    }
  },
  {
    id: "relative-error-calculator",
    category: "statistic",
    slugs: {
      en: "relative-error-calculator",
      "zh-CN": "xiangdui-wucha-jisuanqi",
      "zh-TW": "xiangdui-wucha-jisuanqi",
      ja: "sotai-go-sankei-sanshiki",
      ko: "sangdae-ocha-gyesangi",
      es: "calculadora-error-relativo",
      fr: "calculateur-erreur-relative",
      de: "relativer-fehler-rechner",
      pt: "calculadora-erro-relativo",
      ru: "kalkulyator-otnositelnoi-oshibki"
    },
    titles: {
      en: "Relative Error Calculator - Percentage Error Formula",
      "zh-CN": "相对误差计算器 - 百分误差公式",
      "zh-TW": "相對誤差計算器 - 百分誤差公式",
      ja: "相対誤差計算機 - 百分誤差の式",
      ko: "상대 오차 계산기 - 백분율 오차 공식",
      es: "Calculadora de error relativo - Fórmula porcentual",
      fr: "Calculateur d'erreur relative - Formule en %",
      de: "Relativer Fehler Rechner - Prozentfehler Formel",
      pt: "Calculadora de erro relativo - Fórmula percentual",
      ru: "Калькулятор относительной ошибки - формула %"
    },
    descriptions: {
      en: "Relative error calculator: find absolute error, relative error, and percentage error by comparing an observed value to the true value in any measurement.",
      "zh-CN": "通过比较观测值与真实值，计算绝对误差、相对误差和百分误差。",
      "zh-TW": "透過比較觀測值與真實值，計算絕對誤差、相對誤差與百分誤差。",
      ja: "観測値と真値を比較して、絶対誤差・相対誤差・百分誤差を計算します。",
      ko: "관측값과 참값을 비교해 절대 오차, 상대 오차, 백분율 오차를 계산합니다.",
      es: "Calcula el error absoluto, relativo y porcentual comparando el valor observado con el valor verdadero.",
      fr: "Calculez l'erreur absolue, relative et en pourcentage en comparant une valeur observée à la valeur vraie.",
      de: "Berechnen Sie absoluten Fehler, relativen Fehler und Prozentfehler durch Vergleich eines Messwerts mit dem wahren Wert.",
      pt: "Calcule erro absoluto, erro relativo e erro percentual comparando o valor observado com o valor verdadeiro.",
      ru: "Рассчитайте абсолютную, относительную и процентную ошибку, сравнив наблюдаемое значение с истинным."
    }
  },
  {
    id: "relative-frequency-calculator",
    category: "statistic",
    slugs: {
      en: "relative-frequency-calculator",
      "zh-CN": "xiangdui-pinlv-jisuanqi",
      "zh-TW": "xiangdui-pinlu-jisuanqi",
      ja: "soutai-hindo-keisanki",
      ko: "sangdae-bindo-gyesangi",
      es: "calculadora-frecuencia-relativa",
      fr: "calculateur-frequence-relative",
      de: "relative-haeufigkeit-rechner",
      pt: "calculadora-frequencia-relativa",
      ru: "kalkulyator-otnositelnoy-chastoty"
    },
    titles: {
      en: "Relative Frequency Calculator - Frequency Distribution",
      "zh-CN": "相对频率计算器 - 频率分布",
      "zh-TW": "相對頻率計算器 - 頻率分布",
      ja: "相対度数計算機 - 度数分布",
      ko: "상대 빈도 계산기 - 빈도 분포",
      es: "Calculadora de frecuencia relativa - Distribución",
      fr: "Calculateur de fréquence relative - Distribution",
      de: "Rechner für relative Häufigkeit - Verteilung",
      pt: "Calculadora de frequência relativa - Distribuição",
      ru: "Калькулятор относительной частоты - Распределение"
    },
    descriptions: {
      en: "Relative frequency calculator: enter a comma-separated data set and instantly get frequency counts, relative frequency, and cumulative frequency for each value.",
      "zh-CN": "相对频率计算器：输入逗号分隔的数据集，即可获取每个数值的频数、相对频率和累计频率。",
      "zh-TW": "相對頻率計算器：輸入逗號分隔的資料集，立即取得每個數值的頻數、相對頻率與累積頻率。",
      ja: "相対度数計算機：カンマ区切りのデータを入力すると、各値の度数、相対度数、累積度数をすぐに表示します。",
      ko: "상대 빈도 계산기: 쉼표로 구분한 데이터 세트를 입력하면 각 값의 빈도, 상대 빈도, 누적 빈도를 즉시 확인할 수 있습니다.",
      es: "Calculadora de frecuencia relativa: ingresa datos separados por comas y obtén frecuencias, frecuencia relativa y acumulada por valor.",
      fr: "Calculateur de fréquence relative : saisissez des données séparées par des virgules et obtenez fréquences, fréquences relatives et cumulées.",
      de: "Rechner für relative Häufigkeit: Kommagetrennte Daten eingeben und Häufigkeit, relative sowie kumulative Häufigkeit je Wert erhalten.",
      pt: "Calculadora de frequência relativa: insira dados separados por vírgulas e obtenha frequência, frequência relativa e acumulada por valor.",
      ru: "Калькулятор относительной частоты: введите данные через запятую и получите частоты, относительные и накопленные частоты для каждого значения."
    }
  },
  {
    id: "relative-risk-calculator",
    category: "statistic",
    slugs: {
      en: "relative-risk-calculator",
      "zh-CN": "xiangdui-fengxian-jisuanqi",
      "zh-TW": "xiangdui-fengxian-jisuanqi",
      ja: "soutai-risuku-keisanki",
      ko: "sangdae-wiheomdo-gyesangi",
      es: "riesgo-relativo-calculadora",
      fr: "risque-relatif-calculateur",
      de: "relatives-risiko-rechner",
      pt: "risco-relativo-calculadora",
      ru: "otnositelnyj-risk-kalkulyator"
    },
    titles: {
      en: "Relative Risk Calculator - Risk Ratio for Cohort Studies",
      "zh-CN": "相对危险度计算器 - 队列研究风险比",
      "zh-TW": "相對危險度計算器 - 隊列研究風險比",
      ja: "相対リスク計算機 - コホート研究のリスク比",
      ko: "상대위험도 계산기 - 코호트 연구 위험비",
      es: "Riesgo relativo: calculadora para cohortes",
      fr: "Risque relatif : calculatrice pour cohortes",
      de: "Relatives Risiko: Rechner für Kohortenstudien",
      pt: "Risco relativo: calculadora para coortes",
      ru: "Относительный риск: калькулятор для когорт"
    },
    descriptions: {
      en: "Relative risk calculator for 2×2 contingency tables: compute risk ratio, 95% confidence interval, and attributable risk for exposed vs. unexposed cohort data.",
      "zh-CN": "2×2列联表相对危险度计算器：计算暴露组与未暴露组的风险比、95%置信区间和归因风险。",
      "zh-TW": "2×2 列聯表相對危險度計算器：計算暴露組與未暴露組的風險比、95%信賴區間與歸因風險。",
      ja: "2×2分割表の相対リスク計算機：曝露群と非曝露群のリスク比、95%信頼区間、寄与リスクを計算します。",
      ko: "2×2 분할표 상대위험도 계산기: 노출군과 비노출군의 위험비, 95% 신뢰구간, 귀속위험을 계산합니다.",
      es: "Calculadora de riesgo relativo para tablas 2×2: calcula la razón de riesgos, el intervalo de confianza del 95% y el riesgo atribuible.",
      fr: "Calculateur de risque relatif pour tableaux 2×2 : calculez le rapport de risques, l’intervalle de confiance à 95 % et le risque attribuable.",
      de: "Rechner für relatives Risiko bei 2×2-Tabellen: berechnet das Risikoverhältnis, das 95%-Konfidenzintervall und das zurechenbare Risiko.",
      pt: "Calculadora de risco relativo para tabelas 2×2: calcule a razão de riscos, o intervalo de confiança de 95% e o risco atribuível.",
      ru: "Калькулятор относительного риска для таблиц 2×2: вычисляет отношение рисков, 95% ДИ и атрибутивный риск."
    }
  },
  {
    id: "relative-risk-reduction-calculator",
    category: "statistic",
    slugs: {
      en: "relative-risk-reduction-calculator",
      "zh-CN": "xiangdui-fengxian-jianshao-jisuanqi",
      "zh-TW": "xiangdui-fengxian-jiangdi-jisuanqi",
      ja: "soutai-risuku-teigen-keisan",
      ko: "sangdae-wiheom-jungsok-gyesan",
      es: "calculadora-reduccion-riesgo-relativo",
      fr: "calculateur-reduction-risque-relatif",
      de: "relative-risiko-reduktion-rechner",
      pt: "calculadora-reducao-risco-relativo",
      ru: "snizhenie-otnositelnogo-riska-kalkulyator"
    },
    titles: {
      en: "Relative Risk Reduction Calculator - RRR, ARR & NNT",
      "zh-CN": "相对风险降低计算器 - RRR、ARR 与 NNT",
      "zh-TW": "相對風險降低計算器 - RRR、ARR 與 NNT",
      ja: "相対リスク減少計算機 - RRR、ARR、NNT",
      ko: "상대위험 감소 계산기 - RRR, ARR, NNT",
      es: "Calculadora de reducción del riesgo relativo",
      fr: "Calculateur de réduction du risque relatif",
      de: "Relative Risikoreduktion Rechner",
      pt: "Calculadora de redução do risco relativo",
      ru: "Калькулятор снижения относительного риска"
    },
    descriptions: {
      en: "Relative risk reduction calculator: compute RRR, ARR, NNT, and relative risk from treatment and control group data to evaluate any intervention's effectiveness.",
      "zh-CN": "根据治疗组和对照组数据计算 RRR、ARR、NNT 与相对风险，快速评估干预效果。",
      "zh-TW": "依治療組與對照組資料計算 RRR、ARR、NNT 與相對風險，快速評估介入成效。",
      ja: "治療群と対照群のデータから RRR、ARR、NNT、相対リスクを計算し、介入効果を素早く評価します。",
      ko: "치료군과 대조군 데이터로 RRR, ARR, NNT, 상대위험을 계산해 중재 효과를 빠르게 평가합니다.",
      es: "Calcula RRR, ARR, NNT y riesgo relativo con datos de tratamiento y control para evaluar la eficacia de una intervención.",
      fr: "Calculez RRR, ARR, NNT et risque relatif à partir des groupes traitement et témoin pour évaluer l’efficacité d’une intervention.",
      de: "Berechnen Sie RRR, ARR, NNT und relatives Risiko aus Behandlungs- und Kontrollgruppendaten, um die Wirksamkeit einer Intervention zu bewerten.",
      pt: "Calcule RRR, ARR, NNT e risco relativo com dados de tratamento e controle para avaliar a eficácia de uma intervenção.",
      ru: "Рассчитайте RRR, ARR, NNT и относительный риск по данным лечения и контроля, чтобы оценить эффективность вмешательства."
    }
  },
  {
    id: "odds-ratio-calculator",
    category: "statistic",
    slugs: {
      en: "odds-ratio-calculator",
      "zh-CN": "sheng-suan-bi-ji-suan-qi",
      "zh-TW": "sheng-suan-bi-ji-suan-qi",
      ja: "oddsuhi-keisanki",
      ko: "ojeubi-gyesangi",
      es: "calculadora-razon-de-momios",
      fr: "calculateur-rapport-de-cotes",
      de: "odds-ratio-rechner",
      pt: "calculadora-razao-de-chances",
      ru: "kalkulyator-otnosheniya-shansov"
    },
    titles: {
      en: "Odds Ratio Calculator - OR, CI & P-Value from 2×2 Table",
      "zh-CN": "胜算比计算器 - 2×2表的OR、CI和P值",
      "zh-TW": "勝算比計算器 - 2×2表的OR、CI和P值",
      ja: "オッズ比計算機 - 2×2表のOR、CI、P値",
      ko: "오즈비 계산기 - 2×2표의 OR, CI, P값",
      es: "Calculadora de razón de momios - OR, IC y valor P",
      fr: "Calculateur de rapport de cotes - OR, IC et valeur p",
      de: "Odds-Ratio-Rechner - OR, KI und p-Wert",
      pt: "Calculadora de razão de chances - OR, IC e valor p",
      ru: "Калькулятор отношения шансов - OR, ДИ и p-значение"
    },
    descriptions: {
      en: "Odds ratio calculator for 2×2 contingency tables: compute OR, confidence interval, Z-score, and p-value for case-control and epidemiological research studies.",
      "zh-CN": "2×2列联表胜算比计算器：快速计算OR、置信区间、Z值和P值，适用于病例对照和流行病学研究。",
      "zh-TW": "2×2列聯表勝算比計算器：快速計算OR、信賴區間、Z值和P值，適用於病例對照與流行病學研究。",
      ja: "2×2分割表からOR、信頼区間、Zスコア、P値を算出するオッズ比計算機。症例対照研究や疫学研究に対応。",
      ko: "2×2 분할표에서 OR, 신뢰구간, Z점수, P값을 계산하는 오즈비 계산기. 환자-대조군 및 역학 연구에 적합합니다.",
      es: "Calculadora de razón de momios para tablas 2×2: calcula OR, intervalo de confianza, Z y valor P para estudios caso-control y epidemiológicos.",
      fr: "Calculateur de rapport de cotes pour tableaux 2×2 : OR, intervalle de confiance, score Z et valeur p pour études cas-témoins et épidémiologiques.",
      de: "Odds-Ratio-Rechner für 2×2-Kontingenztafeln: OR, Konfidenzintervall, Z-Wert und p-Wert für Fall-Kontroll- und epidemiologische Studien.",
      pt: "Calculadora de razão de chances para tabelas 2×2: calcule OR, intervalo de confiança, Z e valor p em estudos caso-controle e epidemiológicos.",
      ru: "Калькулятор отношения шансов для таблиц сопряженности 2×2: OR, доверительный интервал, Z-оценка и p-значение для исследований."
    }
  },
  {
    id: "outlier-calculator",
    category: "statistic",
    slugs: {
      en: "outlier-calculator",
      "zh-CN": "liangzhenji-suanqi",
      "zh-TW": "yichang-zhi-jisuanqi",
      ja: "waizochi-keisanki",
      ko: "hullyeojji-gyesangi",
      es: "calculadora-valores-atipicos",
      fr: "calculateur-valeurs-aberrantes",
      de: "ausreisser-rechner",
      pt: "calculadora-outliers",
      ru: "kalkulyator-vybrosov"
    },
    titles: {
      en: "Outlier Calculator - Detect Outliers Using IQR Method",
      "zh-CN": "离群值计算器：IQR法检测离群值",
      "zh-TW": "離群值計算器：IQR法偵測離群值",
      ja: "外れ値計算機：IQR法で検出",
      ko: "이상치 계산기: IQR 방법",
      es: "Calculadora de valores atípicos con IQR",
      fr: "Calculateur de valeurs aberrantes avec l’IQR",
      de: "Ausreißer-Rechner mit IQR",
      pt: "Calculadora de outliers com IQR",
      ru: "Калькулятор выбросов по IQR"
    },
    descriptions: {
      en: "Outlier calculator using the IQR method: enter a data set to find mild outliers (1.5×IQR) or extreme outliers (3×IQR) with Q1, Q3, and fence values instantly.",
      "zh-CN": "使用IQR法的离群值计算器：输入数据集即可快速找出轻度离群值（1.5×IQR）或极端离群值（3×IQR），并显示Q1、Q3和边界值。",
      "zh-TW": "使用IQR法的離群值計算器：輸入資料集即可快速找出輕度離群值（1.5×IQR）或極端離群值（3×IQR），並顯示Q1、Q3與邊界值。",
      ja: "IQR法の外れ値計算機。データを入力すると、軽度外れ値（1.5×IQR）や極端外れ値（3×IQR）をQ1、Q3、境界値とともに即座に表示します。",
      ko: "IQR 방법을 사용하는 이상치 계산기입니다. 데이터 집합을 입력하면 경미한 이상치(1.5×IQR)와 극단 이상치(3×IQR)를 Q1, Q3, 경계값과 함께 즉시 찾습니다.",
      es: "Calculadora de valores atípicos con el método IQR: introduce un conjunto de datos para detectar atípicos leves (1.5×IQR) o extremos (3×IQR) al instante.",
      fr: "Calculateur de valeurs aberrantes avec la méthode IQR : saisissez un jeu de données pour détecter instantanément les valeurs aberrantes légères (1,5×IQR) ou extrêmes (3×IQR).",
      de: "Ausreißer-Rechner mit der IQR-Methode: Geben Sie einen Datensatz ein, um milde Ausreißer (1,5×IQR) oder extreme Ausreißer (3×IQR) sofort zu finden.",
      pt: "Calculadora de outliers usando o método IQR: insira um conjunto de dados para encontrar outliers leves (1,5×IQR) ou extremos (3×IQR) instantaneamente.",
      ru: "Калькулятор выбросов по методу IQR: введите набор данных, чтобы мгновенно найти слабые выбросы (1,5×IQR) или экстремальные (3×IQR)."
    }
  },
  {
    id: "p-hat-calculator",
    category: "statistic",
    slugs: {
      en: "p-hat-calculator",
      "zh-CN": "p-mao-yangben-bili-jisuanqi",
      "zh-TW": "p-mao-yangben-bili-jisuanqi",
      ja: "p-hatto-keisanki-hyohon-wariai",
      ko: "p-haet-gyesangi-pyobon-biyul",
      es: "calculadora-p-hat-proporcion-muestral",
      fr: "calculateur-p-hat-proportion-echantillon",
      de: "p-hat-rechner-stichprobenanteil",
      pt: "calculadora-p-hat-proporcao-amostral",
      ru: "kalkulyator-p-hat-vyborochnaya-dolya"
    },
    titles: {
      en: "P-Hat Calculator - Sample Proportion (p̂) and q̂",
      "zh-CN": "P帽计算器 - 样本比例 p̂ 与 q̂",
      "zh-TW": "P帽計算器 - 樣本比例 p̂ 與 q̂",
      ja: "Pハット計算機 - 標本比率 p̂ と q̂",
      ko: "P-햇 계산기 - 표본비율 p̂ 및 q̂",
      es: "Calculadora p-hat - Proporción muestral p̂ y q̂",
      fr: "Calculateur p-hat - Proportion d’échantillon p̂ et q̂",
      de: "P-Hat-Rechner - Stichprobenanteil p̂ und q̂",
      pt: "Calculadora p-hat - Proporção amostral p̂ e q̂",
      ru: "Калькулятор p-hat - выборочная доля p̂ и q̂"
    },
    descriptions: {
      en: "P-hat calculator: enter sample size (n) and successes (x) to compute the sample proportion p̂ and its complement q̂ as decimals and percentages in one click.",
      "zh-CN": "P帽计算器：输入样本量 n 和成功次数 x，一键计算样本比例 p̂ 及其补数 q̂，并显示小数和百分比。",
      "zh-TW": "P帽計算器：輸入樣本數 n 與成功次數 x，一鍵計算樣本比例 p̂ 及其補數 q̂，並顯示小數與百分比。",
      ja: "Pハット計算機：標本サイズ n と成功数 x を入力し、標本比率 p̂ と補数 q̂ を小数・百分率で一括計算します。",
      ko: "P-햇 계산기: 표본 크기 n과 성공 수 x를 입력해 표본비율 p̂와 보수 q̂를 소수와 백분율로 바로 계산합니다.",
      es: "Calculadora p-hat: ingresa n y éxitos x para obtener la proporción muestral p̂ y su complemento q̂ en decimal y porcentaje.",
      fr: "Calculateur p-hat : saisissez n et les succès x pour obtenir la proportion d’échantillon p̂ et son complément q̂ en décimal et pourcentage.",
      de: "P-Hat-Rechner: n und Erfolge x eingeben, um den Stichprobenanteil p̂ und sein Komplement q̂ als Dezimalzahl und Prozentwert zu berechnen.",
      pt: "Calculadora p-hat: informe n e sucessos x para calcular a proporção amostral p̂ e seu complemento q̂ em decimal e porcentagem.",
      ru: "Калькулятор p-hat: введите n и число успехов x, чтобы рассчитать выборочную долю p̂ и дополнение q̂ в десятичном виде и процентах."
    }
  },
  {
    id: "p-value-calculator",
    category: "statistic",
    slugs: {
      en: "p-value-calculator",
      "zh-CN": "p-zhi-ji-suan-qi",
      "zh-TW": "p-zhi-ji-suan-qi",
      ja: "p-chi-ji-suan-ki",
      ko: "p-gabsu-gyesan-gi",
      es: "calculadora-p-valor",
      fr: "calculateur-p-valeur",
      de: "p-wert-rechner",
      pt: "calculadora-p-valor",
      ru: "kalkulyator-p-znacheniya"
    },
    titles: {
      en: "P-Value Calculator - Z, T, F & Chi-Square Tests",
      "zh-CN": "P值计算器 - Z、t、F和卡方检验",
      "zh-TW": "P值計算器 - Z、t、F和卡方檢定",
      ja: "P値計算器 - Z・t・F・カイ二乗検定",
      ko: "P값 계산기 - Z, t, F, 카이제곱 검정",
      es: "Calculadora de p-valor - pruebas Z, t, F y chi-cuadrado",
      fr: "Calculateur de p-value - tests Z, t, F et khi-deux",
      de: "p-Wert-Rechner - Z-, t-, F- und Chi-Quadrat-Tests",
      pt: "Calculadora de p-valor - testes Z, t, F e qui-quadrado",
      ru: "Калькулятор p-значения - Z, t, F и хи-квадрат"
    },
    descriptions: {
      en: "P-value calculator for Z, T, F, and Chi-square tests: enter a test statistic and degrees of freedom to get the exact p-value and significance verdict.",
      "zh-CN": "输入检验统计量和自由度，快速计算 Z、t、F 和卡方检验的精确 p 值与显著性结论。",
      "zh-TW": "輸入檢定統計量與自由度，快速計算 Z、t、F 與卡方檢定的精確 p 值和顯著性結論。",
      ja: "検定統計量と自由度を入力して、Z・t・F・カイ二乗検定の正確なp値と有意判定を即座に取得します。",
      ko: "검정 통계량과 자유도를 입력해 Z, t, F, 카이제곱 검정의 정확한 p값과 유의성 판단을 바로 확인하세요.",
      es: "Calcula el p-valor exacto y el veredicto de significancia para pruebas Z, t, F y chi-cuadrado al introducir el estadístico y los grados de libertad.",
      fr: "Calculez la p-value exacte et le verdict de significativité pour les tests Z, t, F et khi-deux en saisissant la statistique et les degrés de liberté.",
      de: "Berechnen Sie den exakten p-Wert und das Signifikanzurteil für Z-, t-, F- und Chi-Quadrat-Tests, indem Sie Teststatistik und Freiheitsgrade eingeben.",
      pt: "Calcule o p-valor exato e o veredito de significância para testes Z, t, F e qui-quadrado ao informar a estatística de teste e os graus de liberdade.",
      ru: "Введите статистику теста и степени свободы, чтобы получить точное p-значение и вывод о значимости для Z, t, F и хи-квадрат тестов."
    }
  },
  {
    id: "paired-samples-t-test-calculator",
    category: "statistic",
    slugs: {
      en: "paired-samples-t-test-calculator",
      "zh-CN": "peidui-yangben-t-jianyan-qianhou-shuju",
      "zh-TW": "peidui-yangben-t-jianyan-qianhou-shuju",
      ja: "pairudo-samupuru-t-kentei-maeato-data",
      ko: "peoideu-seompeul-t-geumjeung-jeonhu-deiteo",
      es: "prueba-t-muestras-pareadas-antes-despues",
      fr: "test-t-echantillons-paires-avant-apres",
      de: "t-test-gepaarte-stichproben-vorher-nachher",
      pt: "teste-t-amostras-pareadas-antes-depois",
      ru: "parnye-vyborki-t-test-do-posle"
    },
    titles: {
      en: "Paired Samples t-Test Calculator - Before & After Data",
      "zh-CN": "配对样本 t 检验计算器 - 前后数据",
      "zh-TW": "配對樣本 t 檢定計算器 - 前後資料",
      ja: "対応のある t 検定計算機 - 前後データ",
      ko: "대응표본 t 검정 계산기 - 전후 데이터",
      es: "Calculadora t de muestras pareadas - antes y después",
      fr: "Calculatrice t d'échantillons appariés - avant/après",
      de: "t-Test für gepaarte Stichproben - Vorher/Nachher",
      pt: "Calculadora t de amostras pareadas - antes e depois",
      ru: "Калькулятор t-критерия для парных выборок - до и после"
    },
    descriptions: {
      en: "Paired samples t-test calculator: enter two matched data groups to get the t-statistic, degrees of freedom, p-value, and 95% confidence interval.",
      "zh-CN": "输入两组配对数据，立即得到 t 统计量、自由度、p 值和 95% 置信区间。",
      "zh-TW": "輸入兩組配對資料，立即得到 t 統計量、自由度、p 值與 95% 信賴區間。",
      ja: "2つの対応データを入力して、t 値、自由度、p 値、95%信頼区間をすぐに算出します。",
      ko: "두 쌍의 데이터를 입력해 t 통계량, 자유도, p값, 95% 신뢰구간을 바로 확인하세요.",
      es: "Introduce dos grupos pareados y obtén enseguida el estadístico t, los grados de libertad, el valor p y el IC del 95%.",
      fr: "Saisissez deux groupes appariés pour obtenir le t, les degrés de liberté, la valeur p et l'IC à 95 %.",
      de: "Geben Sie zwei gepaarte Datensätze ein und erhalten Sie sofort t-Wert, Freiheitsgrade, p-Wert und 95%-KI.",
      pt: "Digite dois grupos pareados e veja na hora o t, os graus de liberdade, o valor-p e o IC de 95%.",
      ru: "Введите две парные группы данных и сразу получите t-статистику, степени свободы, p-value и 95% ДИ."
    }
  },
  {
    id: "combination-calculator",
    category: "statistic",
    slugs: {
      en: "combination-calculator",
      "zh-CN": "zuhe-pailie-jisuanqi",
      "zh-TW": "zuhe-pailie-jisuanqi",
      ja: "kumiawase-junretsu-keisanki",
      ko: "johap-sunyeol-gyesangi",
      es: "calculadora-combinaciones-permutaciones",
      fr: "calculatrice-combinaisons-permutations",
      de: "kombinationen-permutationen-rechner",
      pt: "calculadora-combinacoes-permutacoes",
      ru: "kalkulyator-sochetaniy-perestanovok"
    },
    titles: {
      en: "Combination & Permutation Calculator (nCr nPr)",
      "zh-CN": "组合与排列计算器（nCr nPr）",
      "zh-TW": "組合與排列計算器（nCr nPr）",
      ja: "組み合わせ・順列計算機（nCr nPr）",
      ko: "조합 및 순열 계산기 (nCr nPr)",
      es: "Calculadora de combinaciones y permutaciones",
      fr: "Calculatrice de combinaisons et permutations",
      de: "Kombinationen- und Permutationen-Rechner",
      pt: "Calculadora de combinações e permutações",
      ru: "Калькулятор сочетаний и размещений"
    },
    descriptions: {
      en: "Free nCr nPr calculator: enter n and r to compute combinations and permutations instantly for probability, lottery, and combinatorics.",
      "zh-CN": "免费 nCr nPr 计算器：输入 n 和 r，即时计算概率、彩票和组合数学中的组合数与排列数。",
      "zh-TW": "免費 nCr nPr 計算器：輸入 n 與 r，立即計算機率、彩券和組合數學中的組合數與排列數。",
      ja: "無料の nCr nPr 計算機。n と r を入力すると、確率・宝くじ・組合せ数学の組み合わせ数と順列数を即座に計算できます。",
      ko: "무료 nCr nPr 계산기: n과 r을 입력해 확률, 복권, 조합론 문제의 조합과 순열을 즉시 계산하세요.",
      es: "Calculadora nCr nPr gratis: introduce n y r para calcular combinaciones y permutaciones al instante en probabilidad, lotería y combinatoria.",
      fr: "Calculatrice nCr nPr gratuite : saisissez n et r pour calculer instantanément combinaisons et permutations en probabilité, loterie et combinatoire.",
      de: "Kostenloser nCr nPr Rechner: Gib n und r ein und berechne Kombinationen und Permutationen sofort für Wahrscheinlichkeit, Lotto und Kombinatorik.",
      pt: "Calculadora nCr nPr grátis: informe n e r para calcular combinações e permutações instantaneamente em probabilidade, loteria e combinatória.",
      ru: "Бесплатный калькулятор nCr nPr: введите n и r, чтобы мгновенно рассчитать сочетания и размещения для вероятностей, лотерей и комбинаторики."
    }
  },
  {
    id: "conditional-probability-calculator",
    category: "statistic",
    slugs: {
      en: "conditional-probability-calculator",
      "zh-CN": "tiao-jian-gai-lv-ji-suan-qi-pab",
      "zh-TW": "tiao-jian-gai-lv-ji-suan-qi-pab",
      ja: "joken-kakuritsu-keisanki-pab",
      ko: "jogeon-gwalryul-gyesangi-pab",
      es: "calculadora-probabilidad-condicional",
      fr: "calculateur-probabilite-conditionnelle",
      de: "bedingte-wahrscheinlichkeitsrechner",
      pt: "calculadora-probabilidade-condicional",
      ru: "kalkulyator-uslovnoy-veroyatnosti"
    },
    titles: {
      en: "Conditional Probability Calculator P(A|B)",
      "zh-CN": "P(A|B) 条件概率计算器",
      "zh-TW": "P(A|B) 條件機率計算器",
      ja: "P(A|B) 条件確率計算機",
      ko: "P(A|B) 조건부 확률 계산기",
      es: "Calculadora de probabilidad condicional P(A|B)",
      fr: "Calculateur de probabilité conditionnelle P(A|B)",
      de: "Bedingte Wahrscheinlichkeit Rechner P(A|B)",
      pt: "Calculadora de probabilidade condicional P(A|B)",
      ru: "Калькулятор условной вероятности P(A|B)"
    },
    descriptions: {
      en: "Find P(A|B), joint P(A∩B), or marginal P(B) with this conditional probability calculator. Covers Bayes' theorem and real-world probability problems.",
      "zh-CN": "使用此条件概率计算器求 P(A|B)、联合概率 P(A∩B) 或边际概率 P(B)，涵盖贝叶斯定理与实际概率问题。",
      "zh-TW": "使用此條件機率計算器求 P(A|B)、聯合機率 P(A∩B) 或邊際機率 P(B)，涵蓋貝氏定理與實際機率問題。",
      ja: "この条件確率計算機で P(A|B)、同時確率 P(A∩B)、周辺確率 P(B) を求め、ベイズの定理や実務の確率問題に対応できます。",
      ko: "이 조건부 확률 계산기로 P(A|B), 결합확률 P(A∩B), 주변확률 P(B)를 구하고, 베이즈 정리와 실제 확률 문제를 다룹니다.",
      es: "Calcula P(A|B), la probabilidad conjunta P(A∩B) o la marginal P(B) con esta calculadora, con teorema de Bayes y casos reales.",
      fr: "Calculez P(A|B), la probabilité conjointe P(A∩B) ou la marginale P(B) avec ce calculateur, le théorème de Bayes et des cas réels.",
      de: "Berechnen Sie mit diesem Rechner P(A|B), die gemeinsame Wahrscheinlichkeit P(A∩B) oder die Randwahrscheinlichkeit P(B).",
      pt: "Calcule P(A|B), a probabilidade conjunta P(A∩B) ou a marginal P(B) com esta calculadora, cobrindo o teorema de Bayes e casos reais.",
      ru: "С помощью этого калькулятора можно найти P(A|B), совместную вероятность P(A∩B) или маргинальную P(B), включая теорему Байеса."
    }
  },
  {
    id: "confidence-interval-calculator",
    category: "statistic",
    slugs: {
      en: "confidence-interval-calculator",
      "zh-CN": "zhi-xin-jian-jisuanqi-yangben-junzhi",
      "zh-TW": "zhi-xin-jian-jisuanqi-yangben-junzhi",
      ja: "shinrai-kukan-keisanki-sanpuru-heikin",
      ko: "sinroe-gugan-gyesangi-samgyeon-pyeonggyun",
      es: "calculadora-intervalo-confianza-media-muestral",
      fr: "calculateur-intervalle-confiance-moyenne-echantillon",
      de: "konfidenzintervall-rechner-stichprobenmittelwert",
      pt: "calculadora-intervalo-confianca-media-amostral",
      ru: "kalkulyator-doveritelnogo-intervala-vyborki-srednego"
    },
    titles: {
      en: "Confidence Interval Calculator - Sample Mean",
      "zh-CN": "置信区间计算器 - 样本均值",
      "zh-TW": "信賴區間計算器 - 樣本平均數",
      ja: "信頼区間計算機 - 標本平均",
      ko: "신뢰구간 계산기 - 표본 평균",
      es: "Calculadora de intervalo de confianza - media muestral",
      fr: "Intervalle de confiance - moyenne d'échantillon",
      de: "Konfidenzintervall-Rechner - Stichprobenmittelwert",
      pt: "Calculadora de intervalo de confiança - média amostral",
      ru: "Калькулятор доверительного интервала - выборочное среднее"
    },
    descriptions: {
      en: "Confidence interval calculator for sample means. Enter summary stats or raw data to get CI bounds, margin of error, and SE at 90%, 95%, or 99%.",
      "zh-CN": "样本均值置信区间计算器。输入汇总统计量或原始数据，即可在90%、95%或99%置信水平下得到区间、误差范围和标准误。",
      "zh-TW": "樣本平均數信賴區間計算器。輸入彙總統計量或原始資料，即可在90%、95%或99%信賴水準下取得區間、誤差範圍與標準誤。",
      ja: "標本平均の信頼区間を計算します。要約統計量または生データを入力すると、90%、95%、99%の区間、誤差幅、標準誤差を取得できます。",
      ko: "표본 평균의 신뢰구간을 계산합니다. 요약 통계 또는 원자료를 입력하면 90%, 95%, 99% 수준의 구간, 오차범위, 표준오차를 얻습니다.",
      es: "Calcula intervalos de confianza para la media muestral con estadísticos resumidos o datos crudos. Obtén límites, margen de error y EE al 90%, 95% o 99%.",
      fr: "Calculez des intervalles de confiance pour la moyenne d'échantillon à partir de statistiques résumées ou de données brutes. Obtenez bornes, marge d'erreur et ES à 90 %, 95 % ou 99 %.",
      de: "Konfidenzintervalle für den Stichprobenmittelwert aus Kennzahlen oder Rohdaten. Erhalten Sie Grenzen, Fehlerspanne und Standardfehler bei 90 %, 95 % oder 99 %.",
      pt: "Calcule intervalos de confiança para a média amostral com estatísticas resumidas ou dados brutos. Obtenha limites, margem de erro e EP em 90%, 95% ou 99%.",
      ru: "Рассчитайте доверительные интервалы для выборочного среднего по сводным данным или сырым данным. Получите границы, погрешность и стандартную ошибку при 90%, 95% или 99%."
    }
  },
  {
    id: "confusion-matrix-calculator",
    category: "statistic",
    slugs: {
      en: "confusion-matrix-calculator",
      "zh-CN": "hunxiao-juzhen-jisuanqi",
      "zh-TW": "hunxiao-juzhen-jisuanqi",
      ja: "konfyushon-matrix-keisan",
      ko: "hongdong-haengnyeol-gyesan",
      es: "calculadora-matriz-confusion",
      fr: "calculatrice-matrice-confusion",
      de: "konfusionsmatrix-rechner",
      pt: "calculadora-matriz-confusao",
      ru: "matritsa-oshibok-kalkulyator"
    },
    titles: {
      en: "Confusion Matrix Calculator - Classification Metrics",
      "zh-CN": "混淆矩阵计算器 - 分类指标",
      "zh-TW": "混淆矩陣計算器 - 分類指標",
      ja: "混同行列計算ツール - 分類指標",
      ko: "혼동 행렬 계산기 - 분류 지표",
      es: "Calculadora de matriz de confusión",
      fr: "Calculatrice de matrice de confusion",
      de: "Konfusionsmatrix-Rechner",
      pt: "Calculadora de matriz de confusão",
      ru: "Калькулятор матрицы ошибок"
    },
    descriptions: {
      en: "Confusion matrix calculator: enter TP, FP, TN, FN to compute accuracy, precision, recall, F1-score, specificity, and MCC for binary classification models.",
      "zh-CN": "混淆矩阵计算器：输入 TP、FP、TN、FN，快速计算准确率、精确率、召回率、F1、特异度和 MCC。",
      "zh-TW": "混淆矩陣計算器：輸入 TP、FP、TN、FN，快速計算準確率、精確率、召回率、F1、特異度與 MCC。",
      ja: "TP、FP、TN、FNを入力して、正確率、適合率、再現率、F1、特異度、MCCを計算します。",
      ko: "TP, FP, TN, FN을 입력해 정확도, 정밀도, 재현율, F1, 특이도, MCC를 계산하세요.",
      es: "Introduce TP, FP, TN y FN para calcular accuracy, precision, recall, F1, specificity y MCC en clasificación binaria.",
      fr: "Saisissez TP, FP, TN et FN pour calculer accuracy, precision, recall, F1, specificity et MCC en classification binaire.",
      de: "TP, FP, TN und FN eingeben, um Accuracy, Precision, Recall, F1, Specificity und MCC für binäre Klassifikation zu berechnen.",
      pt: "Insira TP, FP, TN e FN para calcular accuracy, precision, recall, F1, specificity e MCC em classificação binária.",
      ru: "Введите TP, FP, TN и FN, чтобы вычислить accuracy, precision, recall, F1, specificity и MCC для бинарной классификации."
    }
  },
  {
    id: "constant-of-proportionality-calculator",
    category: "statistic",
    slugs: {
      en: "constant-of-proportionality-calculator",
      "zh-CN": "bili-changshu-jisuanqi",
      "zh-TW": "bili-changshu-jisuanqi",
      ja: "hirei-kosu-keisanki",
      ko: "biryesangsu-gyesangi",
      es: "calculadora-constante-proporcionalidad",
      fr: "calculateur-constante-proportionnalite",
      de: "proportionalitatskonstante-rechner",
      pt: "calculadora-constante-proporcionalidade",
      ru: "konstanta-proportsionalnosti-kalkulyator"
    },
    titles: {
      en: "Constant of Proportionality Calculator (y = kx)",
      "zh-CN": "比例常数计算器（y = kx）",
      "zh-TW": "比例常數計算器（y = kx）",
      ja: "比例定数計算機（y = kx）",
      ko: "비례상수 계산기 (y = kx)",
      es: "Constante de proporcionalidad y = kx",
      fr: "Constante de proportionnalité y = kx",
      de: "Proportionalitätskonstante y = kx",
      pt: "Constante de proporcionalidade y = kx",
      ru: "Константа пропорциональности y = kx"
    },
    descriptions: {
      en: "Find k in y = kx with this proportionality calculator. Enter one or more (x, y) pairs to compute the constant and verify direct proportion.",
      "zh-CN": "输入一组或多组 (x, y) 值，快速求出 y = kx 中的 k 并验证是否成正比例。",
      "zh-TW": "輸入一組或多組 (x, y) 值，快速求出 y = kx 中的 k，並驗證是否為正比例。",
      ja: "1組以上の (x, y) から y = kx の比例定数 k を求め、正比例かどうか確認できます。",
      ko: "하나 이상의 (x, y) 값을 입력해 y = kx의 비례상수 k를 구하고 정비례인지 확인하세요.",
      es: "Encuentra k en y = kx con esta calculadora. Ingresa uno o más pares (x, y) para calcular la constante y verificar la proporcionalidad directa.",
      fr: "Trouvez k dans y = kx avec ce calculateur. Saisissez un ou plusieurs couples (x, y) pour calculer la constante et vérifier la proportionnalité directe.",
      de: "Finde k in y = kx mit diesem Rechner. Gib ein oder mehrere (x, y)-Paare ein, um die Konstante zu berechnen und direkte Proportionalität zu prüfen.",
      pt: "Encontre k em y = kx com esta calculadora. Insira um ou mais pares (x, y) para calcular a constante e verificar a proporcionalidade direta.",
      ru: "Найдите k в y = kx с этим калькулятором. Введите одну или несколько пар (x, y), чтобы вычислить константу и проверить прямую пропорциональность."
    }
  },
  {
    id: "hypothesis-testing-calculator",
    category: "statistic",
    slugs: {
      en: "hypothesis-testing-calculator",
      "zh-CN": "jia-she-jian-yan-ji-suan-qi",
      "zh-TW": "jia-she-jian-ding-ji-suan-qi",
      ja: "kasetsu-kentei-keisanki",
      ko: "gajyeong-gyeonjeong-gyeonsangi",
      es: "calculadora-prueba-hipotesis",
      fr: "calculateur-test-hypothese",
      de: "hypothesentest-rechner",
      pt: "calculadora-teste-hipotese",
      ru: "kalkulyator-gipotez"
    },
    titles: {
      en: "Hypothesis Testing Calculator - Z-Test, T-Test & P-Value",
      "zh-CN": "假设检验计算器 - Z检验、T检验与P值",
      "zh-TW": "假設檢定計算器 - Z檢定、T檢定與P值",
      ja: "仮説検定計算機 - Z検定、T検定、P値",
      ko: "가설 검정 계산기 - Z검정, T검정, P값",
      es: "Calculadora de hipótesis - Z, T y p-valor",
      fr: "Calculateur de test d'hypothèse - Z, T et p-valeur",
      de: "Hypothesentest-Rechner - Z-, T-Test und p-Wert",
      pt: "Calculadora de hipótese - Z, T e p-valor",
      ru: "Калькулятор проверки гипотез - Z, T и p-value"
    },
    descriptions: {
      en: "Hypothesis testing calculator for Z-tests and T-tests. Compute test statistic, p-value, and critical value to determine statistical significance.",
      "zh-CN": "用于 Z 检验和 T 检验的假设检验计算器。计算检验统计量、p 值和临界值，判断统计显著性。",
      "zh-TW": "用於 Z 檢定與 T 檢定的假設檢定計算器。可計算檢定統計量、p 值與臨界值，判斷統計顯著性。",
      ja: "Z検定とT検定に対応した仮説検定計算機。検定統計量、p値、臨界値を計算し、統計的有意性を判定します。",
      ko: "Z검정과 T검정을 위한 가설 검정 계산기입니다. 검정통계량, p값, 임계값을 계산해 통계적 유의성을 판단합니다.",
      es: "Calculadora de hipótesis para pruebas Z y T. Calcula estadístico, p-valor y valor crítico para evaluar significancia estadística.",
      fr: "Calculateur de test d'hypothèse pour les tests Z et T. Calculez la statistique, la p-valeur et la valeur critique pour juger la significativité.",
      de: "Hypothesentest-Rechner für Z- und T-Tests. Berechnen Sie Teststatistik, p-Wert und kritischen Wert zur Bestimmung der Signifikanz.",
      pt: "Calculadora de hipótese para testes Z e T. Calcule estatística, p-valor e valor crítico para determinar significância estatística.",
      ru: "Калькулятор проверки гипотез для Z- и T-тестов. Рассчитывает статистику, p-value и критическое значение для оценки значимости."
    }
  },
  {
    id: "implied-probability-calculator",
    category: "statistic",
    slugs: {
      en: "implied-probability-calculator",
      "zh-CN": "yinghan-gailv-jisuanqi",
      "zh-TW": "yinhan-gailv-ji-suan-qi",
      ja: "hansho-gairitsu-keisan",
      ko: "gammak-gwallyul-gyesan-gi",
      es: "calculadora-probabilidad-implícita",
      fr: "calculateur-probabilite-implicite",
      de: "implizierte-wahrscheinlichkeit-rechner",
      pt: "calculadora-probabilidade-imlicita",
      ru: "kalkulyator-neiavnoy-veroyatnosti"
    },
    titles: {
      en: "Implied Probability Calculator - Convert Betting Odds",
      "zh-CN": "隐含概率计算器",
      "zh-TW": "隱含機率計算器",
      ja: "暗黙確率計算ツール",
      ko: "암시 확률 계산기",
      es: "Calculadora de probabilidad implícita",
      fr: "Calculateur de probabilité implicite",
      de: "Rechner für implizite Wahrscheinlichkeit",
      pt: "Calculadora de probabilidade implícita",
      ru: "Калькулятор имплицитной вероятности"
    },
    descriptions: {
      en: "Implied probability calculator: convert American, Decimal, or Fractional betting odds to a winning probability percentage for sports betting value analysis.",
      "zh-CN": "将美式、十进制或分数投注赔率转换为中奖概率百分比，用于体育博彩价值分析。",
      "zh-TW": "將美式、十進制或分數賠率轉換為勝率百分比，用於體育博彩價值分析。",
      ja: "アメリカ式、デシマル式、フラクショナル式のオッズを勝率に変換し、スポーツベッティングの価値分析に役立てます。",
      ko: "미국식, 소수식, 분수식 배당을 승률 퍼센트로 변환해 스포츠 베팅 가치 분석에 활용하세요.",
      es: "Convierte cuotas americanas, decimales o fraccionarias en porcentaje de probabilidad para analizar valor en apuestas deportivas.",
      fr: "Convertissez les cotes américaines, décimales ou fractionnaires en pourcentage de probabilité pour analyser la valeur des paris sportifs.",
      de: "Wandelt amerikanische, Dezimal- oder Bruchquoten in eine Gewinnwahrscheinlichkeit um – für die Analyse von Wettwerten.",
      pt: "Converta odds americanas, decimais ou fracionárias em porcentagem de probabilidade para análise de valor em apostas esportivas.",
      ru: "Переводит американские, десятичные и дробные коэффициенты в процент вероятности для анализа ценности ставок."
    }
  },
  {
    id: "index-of-qualitative-variation-calculator",
    category: "statistic",
    slugs: {
      en: "index-of-qualitative-variation-calculator",
      "zh-CN": "dingxing-bianyi-zhishu-jiqisuanqi",
      "zh-TW": "dingxing-bianyi-zhishu-jiqisuanqi",
      ja: "teisei-hendo-shisu-keisanki",
      ko: "jeongseong-byeoni-jisu-gyesangi",
      es: "calculadora-indice-variacion-cualitativa",
      fr: "calculateur-indice-variation-qualitative",
      de: "index-qualitativer-variation-rechner",
      pt: "calculadora-indice-variacao-qualitativa",
      ru: "kalkulyator-indeksa-kachestvennoy-variatsii"
    },
    titles: {
      en: "Index of Qualitative Variation (IQV) Calculator",
      "zh-CN": "定性变异指数（IQV）计算器",
      "zh-TW": "定性變異指數（IQV）計算器",
      ja: "質的変動指数（IQV）計算機",
      ko: "정성 변이 지수(IQV) 계산기",
      es: "Calculadora del índice de variación cualitativa",
      fr: "Calculateur d’indice de variation qualitative",
      de: "Rechner für den Index qualitativer Variation",
      pt: "Calculadora do índice de variação qualitativa",
      ru: "Калькулятор индекса качественной вариации"
    },
    descriptions: {
      en: "Index of Qualitative Variation calculator: measure categorical data diversity from frequency counts. Compute IQV, observed and possible pairs instantly.",
      "zh-CN": "定性变异指数计算器：根据频数衡量分类数据多样性，快速计算 IQV、观测配对和可能配对。",
      "zh-TW": "定性變異指數計算器：依頻數衡量類別資料多樣性，快速計算 IQV、觀測配對與可能配對。",
      ja: "質的変動指数計算機：度数からカテゴリデータの多様性を測定。IQV、観測ペア、可能ペアをすばやく計算します。",
      ko: "정성 변이 지수 계산기: 빈도수로 범주형 데이터 다양성을 측정하고 IQV, 관측 쌍, 가능한 쌍을 즉시 계산합니다.",
      es: "Calcula el índice de variación cualitativa desde frecuencias categóricas: IQV, pares observados y pares posibles al instante.",
      fr: "Calculez l’indice de variation qualitative à partir de fréquences catégorielles : IQV, paires observées et possibles instantanément.",
      de: "Index qualitativer Variation berechnen: Vielfalt kategorialer Daten aus Häufigkeiten messen, inklusive IQV, beobachteten und möglichen Paaren.",
      pt: "Calcule o índice de variação qualitativa por frequências categóricas: IQV, pares observados e pares possíveis instantaneamente.",
      ru: "Калькулятор индекса качественной вариации: измеряйте разнообразие категориальных данных по частотам, IQV и пары."
    }
  },
  {
    id: "inverse-normal-distribution-calculator",
    category: "statistic",
    slugs: {
      en: "inverse-normal-distribution-calculator",
      "zh-CN": "zheng-tai-fen-bu-ni-han-shu-ji-suan-qi",
      "zh-TW": "chang-tai-fen-bu-ni-han-shu-ji-suan-qi",
      ja: "gyaku-seikibu-bunpu-keisan-ki",
      ko: "gyeok-jeong-gyun-bunpo-gyesangi",
      es: "calculadora-distribucion-normal-inversa",
      fr: "calculateur-loi-normale-inverse",
      de: "inverse-normalverteilung-rechner",
      pt: "calculadora-distribuicao-normal-inversa",
      ru: "obratnyy-normalnyy-raspredelenie-kalkulyator"
    },
    titles: {
      en: "Inverse Normal Distribution Calculator - Find X from P",
      "zh-CN": "正态分布反函数计算器 - 由P求X",
      "zh-TW": "常態分布反函數計算機 - 由P求X",
      ja: "逆正規分布計算機 - PからXを求める",
      ko: "역정규분포 계산기 - P로 X 찾기",
      es: "Calculadora de distribución normal inversa - hallar X",
      fr: "Calculateur de loi normale inverse - trouver X",
      de: "Inverse Normalverteilung Rechner - X aus P",
      pt: "Calculadora de distribuição normal inversa - achar X",
      ru: "Калькулятор обратного нормального распределения - X по P"
    },
    descriptions: {
      en: "Inverse normal distribution calculator: find the x-value for a given probability. Supports left-tailed, right-tailed, and two-tailed modes with custom μ and σ.",
      "zh-CN": "正态分布反函数计算器：根据给定概率求对应的 x 值，支持左尾、右尾和双尾模式，可自定义 μ 和 σ。",
      "zh-TW": "常態分布反函數計算機：依給定機率求對應的 x 值，支援左尾、右尾與雙尾模式，可自訂 μ 和 σ。",
      ja: "逆正規分布計算機：与えられた確率から x 値を求めます。左側・右側・両側モードと任意の μ、σ に対応。",
      ko: "역정규분포 계산기: 주어진 확률에서 x 값을 찾습니다. 좌측, 우측, 양측(중앙) 모드와 사용자 지정 μ, σ를 지원합니다.",
      es: "Calculadora de distribución normal inversa: encuentra el valor x para una probabilidad dada. Soporta colas izquierda, derecha y dos colas.",
      fr: "Calculateur de loi normale inverse : trouvez la valeur x pour une probabilité donnée. Modes queue gauche, queue droite et deux queues.",
      de: "Inverse Normalverteilung Rechner: Ermittelt den x-Wert für eine gegebene Wahrscheinlichkeit. Unterstützt links-, rechts- und zweiseitige Modi.",
      pt: "Calculadora de distribuição normal inversa: encontre o valor x para uma probabilidade dada. Suporta cauda esquerda, direita e dois lados.",
      ru: "Калькулятор обратного нормального распределения: находит значение x по заданной вероятности. Поддерживает левый, правый и двусторонний режимы."
    }
  },
  {
    id: "iqr-calculator-interquartile-range",
    category: "statistic",
    slugs: {
      en: "iqr-calculator-interquartile-range",
      "zh-CN": "iqr-ji-suan-qi-si-fen-wei-ju",
      "zh-TW": "iqr-ji-suan-qi-si-fen-wei-ju",
      ja: "iqr-keisanki-shibun-i-hani",
      ko: "iqr-gyesangi-sabunwi-beomwi",
      es: "calculadora-iqr-rango-intercuartil",
      fr: "calculateur-iqr-ecart-interquartile",
      de: "iqr-rechner-interquartilsabstand",
      pt: "calculadora-iqr-intervalo-interquartil",
      ru: "iqr-kalkulyator-mezhkvartilnyy-razmah"
    },
    titles: {
      en: "IQR Calculator - Interquartile Range, Q1, Q3 & Outliers",
      "zh-CN": "IQR计算器 - 四分位距、Q1、Q3与离群值",
      "zh-TW": "IQR計算器 - 四分位距、Q1、Q3與離群值",
      ja: "IQR計算機 - 四分位範囲、Q1、Q3、外れ値",
      ko: "IQR 계산기 - 사분위 범위, Q1, Q3, 이상값",
      es: "Calculadora IQR - rango intercuartílico y atípicos",
      fr: "Calculateur IQR - écart interquartile et valeurs aberrantes",
      de: "IQR-Rechner - Interquartilsabstand und Ausreißer",
      pt: "Calculadora IQR - intervalo interquartil e outliers",
      ru: "IQR-калькулятор - межквартильный размах и выбросы"
    },
    descriptions: {
      en: "IQR calculator: compute interquartile range, Q1, Q3, and identify outliers from any dataset. Enter comma-separated numbers and get instant quartile analysis.",
      "zh-CN": "IQR计算器：从任意数据集计算四分位距、Q1、Q3，并识别离群值。输入逗号分隔数字，立即获得四分位分析。",
      "zh-TW": "IQR計算器：從任意資料集計算四分位距、Q1、Q3，並識別離群值。輸入逗號分隔數字，立即取得四分位分析。",
      ja: "IQR計算機で任意のデータセットから四分位範囲、Q1、Q3、外れ値を算出。カンマ区切りの数値で即時分析。",
      ko: "IQR 계산기로 데이터셋의 사분위 범위, Q1, Q3, 이상값을 계산하세요. 쉼표로 구분한 숫자를 입력하면 즉시 분석됩니다.",
      es: "Calculadora IQR: calcula el rango intercuartílico, Q1, Q3 e identifica valores atípicos en cualquier conjunto de datos.",
      fr: "Calculateur IQR : calculez l'écart interquartile, Q1, Q3 et détectez les valeurs aberrantes dans n'importe quel jeu de données.",
      de: "IQR-Rechner: Berechnen Sie Interquartilsabstand, Q1, Q3 und erkennen Sie Ausreißer in jedem Datensatz.",
      pt: "Calculadora IQR: calcule intervalo interquartil, Q1, Q3 e identifique outliers em qualquer conjunto de dados.",
      ru: "IQR-калькулятор: рассчитайте межквартильный размах, Q1, Q3 и найдите выбросы в любом наборе данных."
    }
  },
  {
    id: "coefficient-of-variation-calculator",
    category: "statistic",
    slugs: {
      en: "coefficient-of-variation-calculator",
      "zh-CN": "bianyi-xishu-jisuanqi",
      "zh-TW": "bianyi-xishu-jisuanqi",
      ja: "henidosu-keisanki",
      ko: "byeon-i-gyesu-gyesangi",
      es: "calculadora-coeficiente-variacion",
      fr: "calculateur-coefficient-variation",
      de: "variationskoeffizient-rechner",
      pt: "calculadora-coeficiente-variacao",
      ru: "kalkulyator-koeffitsienta-variatsii"
    },
    titles: {
      en: "Coefficient of Variation Calculator (CV)",
      "zh-CN": "变异系数计算器（CV）",
      "zh-TW": "變異係數計算器（CV）",
      ja: "変動係数計算機（CV）",
      ko: "변이계수 계산기(CV)",
      es: "Calculadora de coeficiente de variación (CV)",
      fr: "Calculateur de coefficient de variation (CV)",
      de: "Variationskoeffizient-Rechner (CV)",
      pt: "Calculadora de coeficiente de variação (CV)",
      ru: "Калькулятор коэффициента вариации (CV)"
    },
    descriptions: {
      en: "Coefficient of variation calculator: enter comma-separated numbers to get mean, sample standard deviation, and CV% for instant relative variability comparison.",
      "zh-CN": "变异系数计算器：输入逗号分隔的数字，即可获得均值、样本标准差和 CV%，快速比较相对变异性。",
      "zh-TW": "變異係數計算器：輸入以逗號分隔的數字，即可取得平均值、樣本標準差與 CV%，快速比較相對變異性。",
      ja: "変動係数計算機：カンマ区切りの数値を入力して、平均、標本標準偏差、CV%をすばやく算出し、相対的なばらつきを比較できます。",
      ko: "변이계수 계산기: 쉼표로 구분한 숫자를 입력해 평균, 표본 표준편차, CV%를 즉시 구하고 상대 변동성을 비교하세요.",
      es: "Calculadora de coeficiente de variación: ingresa números separados por comas y obtén media, desviación estándar muestral y CV% al instante.",
      fr: "Calculateur de coefficient de variation : saisissez des nombres séparés par des virgules pour obtenir moyenne, écart type d’échantillon et CV%.",
      de: "Variationskoeffizient-Rechner: kommagetrennte Zahlen eingeben und Mittelwert, Stichproben-Standardabweichung und CV% sofort erhalten.",
      pt: "Calculadora de coeficiente de variação: insira números separados por vírgulas e obtenha média, desvio padrão amostral e CV% instantaneamente.",
      ru: "Калькулятор коэффициента вариации: введите числа через запятую и сразу получите среднее, выборочное стандартное отклонение и CV%."
    }
  },
  {
    id: "cohens-d-calculator",
    category: "statistic",
    slugs: {
      en: "cohens-d-calculator",
      "zh-CN": "cohens-d-liangzu-xiaoyingliang-jisuanqi",
      "zh-TW": "cohens-d-liangzu-xiaoyingliang-jisuanqi",
      ja: "cohens-d-koukaryou-keisanki",
      ko: "cohens-d-hyogwallyang-gyesangi",
      es: "calculadora-d-cohen",
      fr: "calculatrice-d-cohen",
      de: "cohens-d-rechner",
      pt: "calculadora-d-cohen",
      ru: "kalkulyator-d-koena"
    },
    titles: {
      en: "Cohen's d Calculator - Effect Size for Two Groups",
      "zh-CN": "Cohen's d效应量计算器",
      "zh-TW": "Cohen's d效應量計算器",
      ja: "Cohen's d効果量計算機",
      ko: "Cohen's d 효과크기 계산기",
      es: "Calculadora d de Cohen",
      fr: "Calculatrice du d de Cohen",
      de: "Cohens-d-Rechner",
      pt: "Calculadora d de Cohen",
      ru: "Калькулятор d Коэна"
    },
    descriptions: {
      en: "Calculate Cohen's d effect size from two group means, standard deviations, and sample sizes. Ideal for psychology, education, and medical research analysis.",
      "zh-CN": "根据两组均值、标准差和样本量计算 Cohen's d，适用于心理学、教育和医学研究分析。",
      "zh-TW": "根據兩組平均數、標準差和樣本數計算 Cohen's d，適合心理學、教育與醫學研究分析。",
      ja: "2群の平均・標準偏差・サンプルサイズからCohen's dを計算。心理学、教育、医療研究に最適です。",
      ko: "두 집단의 평균, 표준편차, 표본수로 Cohen's d를 계산합니다. 심리학, 교육, 의학 연구에 적합합니다.",
      es: "Calcula el tamaño del efecto d de Cohen a partir de las medias, desviaciones estándar y tamaños muestrales de dos grupos.",
      fr: "Calculez la taille d’effet d de Cohen à partir des moyennes, écarts-types et tailles d’échantillon de deux groupes.",
      de: "Berechnen Sie Cohens d als Effektstärke aus Mittelwerten, Standardabweichungen und Stichprobengrößen zweier Gruppen.",
      pt: "Calcule o tamanho de efeito d de Cohen a partir das médias, desvios padrão e tamanhos amostrais de dois grupos.",
      ru: "Рассчитайте размер эффекта d Коэна по средним, стандартным отклонениям и размерам выборок двух групп."
    }
  },
  {
    id: "coin-flip-probability-calculator",
    category: "statistic",
    slugs: {
      en: "coin-flip-probability-calculator",
      "zh-CN": "yingbi-touying-gailv-jisuanqi",
      "zh-TW": "yingbi-touying-gailv-jisuanqi",
      ja: "koin-furippu-kakuritsu-keisanshi",
      ko: "dongjeon-ddeugi-gwalryeok-gyesangi",
      es: "calculadora-probabilidad-lanzamiento-moneda",
      fr: "calculateur-probabilite-pile-ou-face",
      de: "muenzwurf-wahrscheinlichkeitsrechner",
      pt: "calculadora-probabilidade-lancamento-moeda",
      ru: "kalkulyator-veroyatnosti-broska-monety"
    },
    titles: {
      en: "Coin Flip Probability Calculator - Binomial Distribution",
      "zh-CN": "硬币投掷概率计算器",
      "zh-TW": "硬幣擲出機率計算器",
      ja: "コイントス確率計算機",
      ko: "동전 던지기 확률 계산기",
      es: "Calculadora de probabilidad de moneda",
      fr: "Calculateur de probabilité pile ou face",
      de: "Münzwurf-Wahrscheinlichkeitsrechner",
      pt: "Calculadora de probabilidade de moeda",
      ru: "Калькулятор вероятности броска монеты"
    },
    descriptions: {
      en: "Binomial coin flip probability calculator: find the chance of N heads in any number of flips — compute exactly, at least, or at most outcomes instantly.",
      "zh-CN": "二项分布硬币投掷概率计算器：可精确计算 N 次正面出现恰好、至少或至多的概率。",
      "zh-TW": "二項分布硬幣擲出機率計算器：可精確計算 N 次正面出現恰好、至少或至多的機率。",
      ja: "二項分布によるコイントス確率計算機。N回中の表がちょうど、以上、以下の確率を正確に求めます。",
      ko: "이항분포 동전 던지기 확률 계산기: N번 중 앞면이 정확히, 최소, 최대 몇 번 나올 확률을 계산합니다.",
      es: "Calculadora de moneda con distribución binomial: calcula la probabilidad exacta, al menos o como máximo de N caras.",
      fr: "Calculateur de pile ou face en loi binomiale : calcule la probabilité exacte, au moins ou au plus de N faces.",
      de: "Wahrscheinlichkeitsrechner für Münzwürfe mit Binomialverteilung: exakt, mindestens oder höchstens N Köpfe berechnen.",
      pt: "Calculadora de moeda com distribuição binomial: calcule a chance exata, pelo menos ou no máximo de N caras.",
      ru: "Калькулятор вероятности броска монеты по биномиальному распределению: точно, не меньше или не больше N орлов."
    }
  },
  {
    id: "coin-flipper",
    category: "statistic",
    slugs: {
      en: "coin-flipper",
      "zh-CN": "pao-yingbi",
      "zh-TW": "zhi-yingbi",
      ja: "koin-furippa",
      ko: "dongjeon-deonjigi",
      es: "simulador-lanzamiento-moneda",
      fr: "simulateur-pile-ou-face",
      de: "muenzwurf-simulator",
      pt: "simulador-cara-ou-coroa",
      ru: "podbrasyvanie-monety"
    },
    titles: {
      en: "Coin Flipper - Online Random Coin Toss Simulator",
      "zh-CN": "抛硬币模拟器 - 在线随机抛硬币",
      "zh-TW": "擲硬幣模擬器 - 線上隨機擲幣",
      ja: "コイン投げシミュレーター - ランダム抽選",
      ko: "동전 던지기 시뮬레이터 - 랜덤 추첨",
      es: "Simulador de lanzamiento de moneda",
      fr: "Simulateur de pile ou face",
      de: "Münzwurf-Simulator",
      pt: "Simulador de cara ou coroa",
      ru: "Симулятор подбрасывания монеты"
    },
    descriptions: {
      en: "Online coin flipper: simulate one or thousands of random coin tosses, choose fair or biased coins, and track real-time heads/tails counts and percentages.",
      "zh-CN": "在线抛硬币：模拟1次或上千次随机抛掷，支持公平或偏置硬币，并实时统计正反面次数和占比。",
      "zh-TW": "線上擲硬幣：可模擬1次或上千次隨機擲幣，選擇公平或偏置硬幣，並即時查看正反面次數與比例。",
      ja: "1回から大量までコイン投げをシミュレーション。公平・偏りありを選べ、表裏の回数と割合をリアルタイム表示。",
      ko: "1회부터 수천 회까지 동전 던지기를 시뮬레이션. 공정/편향 동전을 선택하고 앞뒤 비율과 횟수를 실시간으로 확인하세요.",
      es: "Simula 1 o miles de lanzamientos de moneda, elige monedas justas o sesgadas y sigue al instante caras/cruces y sus porcentajes.",
      fr: "Simulez 1 ou des milliers de lancers, choisissez une pièce équilibrée ou biaisée et suivez en temps réel piles, faces et pourcentages.",
      de: "Simuliere 1 oder Tausende Münzwürfe, wähle faire oder verzerrte Münzen und verfolge Kopf/Zahl und Prozentwerte in Echtzeit.",
      pt: "Simule 1 ou milhares de lançamentos, escolha moeda justa ou viciada e acompanhe em tempo real caras, coroas e percentuais.",
      ru: "Симулируйте 1 или тысячи подбрасываний, выберите честную или смещённую монету и следите за орлом, решкой и процентами в реальном времени."
    }
  },
  {
    id: "coin-toss-streak-calculator",
    category: "statistic",
    slugs: {
      en: "coin-toss-streak-calculator",
      "zh-CN": "yingbi-lian-tou-lian-sheng-jisuanqi",
      "zh-TW": "yingbi-lian-tou-lian-sheng-jisuanqi",
      ja: "kozeni-renzoku-shisu-keisan-ki",
      ko: "dongjeon-yeonsok-seunglyeok-gyesan-gi",
      es: "calculadora-racha-monedas",
      fr: "calculateur-serie-piece",
      de: "muenzwurf-serienrechner",
      pt: "calculadora-rachas-moeda",
      ru: "kalkulyator-serii-monety"
    },
    titles: {
      en: "Coin Toss Streak Calculator - Consecutive Heads & Tails",
      "zh-CN": "硬币连掷连胜计算器：连续正反面",
      "zh-TW": "硬幣連擲連勝計算機：連續正反面",
      ja: "コイントス連勝計算機：連続表裏",
      ko: "동전 연속 승 계산기: 연속 앞뒤",
      es: "Calculadora de rachas de monedas: caras y cruces",
      fr: "Calculateur de séries de pièces : faces et piles",
      de: "Münzwurf-Serienrechner: Kopf und Zahl",
      pt: "Calculadora de rachas de moeda: caras e coroas",
      ru: "Калькулятор серий монеты: орёл и решка"
    },
    descriptions: {
      en: "Coin streak probability: find the chance of consecutive heads or tails in N tosses, or compute the expected tosses needed to achieve any streak length.",
      "zh-CN": "计算抛硬币时连续正面或反面的概率，也可估算实现任意连胜长度所需的期望抛掷次数。",
      "zh-TW": "計算擲硬幣時連續正面或反面的機率，也可估算達成任一連勝長度所需的期望擲次。",
      ja: "コイントスで表または裏が連続する確率を計算し、任意の連勝長の期待トス回数も求めます。",
      ko: "동전 던지기에서 연속 앞면이나 뒷면이 나올 확률을 계산하고, 원하는 연속 길이의 기대 던지기 횟수도 구합니다.",
      es: "Calcula la probabilidad de rachas consecutivas de caras o cruces y el número esperado de lanzamientos para lograr cualquier longitud.",
      fr: "Calculez la probabilité d’obtenir des faces ou des piles consécutifs et le nombre attendu de lancers pour toute longueur de série.",
      de: "Berechne die Wahrscheinlichkeit aufeinanderfolgender Köpfe oder Zahlen und die erwartete Zahl an Würfen für jede Serienlänge.",
      pt: "Calcule a probabilidade de caras ou coroas consecutivas e o número esperado de lançamentos para qualquer tamanho de racha.",
      ru: "Рассчитайте вероятность подряд идущих орлов или решек и ожидаемое число бросков для любой длины серии."
    }
  },
  {
    id: "dice-probability-calculator",
    category: "statistic",
    slugs: {
      en: "dice-probability-calculator",
      "zh-CN": "touzi-gailv-jisuanqi",
      "zh-TW": "touzi-gailv-jisuanqi",
      ja: "saikoro-kakuritsu-keisanki",
      ko: "jusewi-hwallyul-gyesangi",
      es: "calculadora-probabilidad-dados",
      fr: "calculateur-probabilite-des",
      de: "wuerfel-wahrscheinlichkeit-rechner",
      pt: "calculadora-probabilidade-dados",
      ru: "kalkulyator-veroyatnosti-kostey"
    },
    titles: {
      en: "Dice Probability Calculator - Exact & At Least Odds",
      "zh-CN": "骰子概率计算器 - 精确与至少概率",
      "zh-TW": "骰子機率計算器 - 精確與至少機率",
      ja: "サイコロ確率計算機 - ちょうど・以上の確率",
      ko: "주사위 확률 계산기 - 정확·이상 확률",
      es: "Calculadora de probabilidad de dados - exacta y al menos",
      fr: "Calculateur de probabilité de dés - exact et au moins",
      de: "Würfel-Wahrscheinlichkeitsrechner - exakt und mindestens",
      pt: "Calculadora de probabilidade de dados - exata e ao menos",
      ru: "Калькулятор вероятности костей - точно и не меньше"
    },
    descriptions: {
      en: "Dice probability calculator: find exact, at-least, or at-most probabilities for any combination of dice with up to 10 dice and 20 sides per die.",
      "zh-CN": "骰子概率计算器：计算最多10枚、每枚最多20面的任意骰子组合的精确、至少或至多概率。",
      "zh-TW": "骰子機率計算器：計算最多10顆、每顆最多20面的任意骰子組合的精確、至少或至多機率。",
      ja: "サイコロ確率計算機：最大10個、各20面までの任意の組み合わせで、ちょうど・以上・以下の確率を計算します。",
      ko: "주사위 확률 계산기: 최대 10개, 주사위당 최대 20면 조합의 정확히, 이상, 이하 확률을 계산합니다.",
      es: "Calculadora de probabilidad de dados: halla probabilidades exactas, de al menos o de como máximo para hasta 10 dados y 20 caras por dado.",
      fr: "Calculateur de probabilité de dés : trouvez les probabilités exactes, au moins ou au plus pour jusqu’à 10 dés et 20 faces par dé.",
      de: "Würfel-Wahrscheinlichkeitsrechner: Berechne exakte, mindestens- oder höchstens-Wahrscheinlichkeiten für bis zu 10 Würfel mit 20 Seiten.",
      pt: "Calculadora de probabilidade de dados: encontre probabilidades exatas, ao menos ou no máximo para até 10 dados e 20 faces por dado.",
      ru: "Калькулятор вероятности костей: точные вероятности, не меньше или не больше для любых сочетаний до 10 костей и 20 граней."
    }
  },
  {
    id: "dice-roller-calculator",
    category: "statistic",
    slugs: {
      en: "dice-roller-calculator",
      "zh-CN": "touzi-jisuanqi",
      "zh-TW": "touzi-jisuanqi",
      ja: "saikoro-keisan-ki",
      ko: "jusawi-gyeongsan-gi",
      es: "calculadora-tiradas-dados",
      fr: "calculateur-lancer-des",
      de: "wurfel-rechner",
      pt: "calculadora-lancamento-dados",
      ru: "kalkulyator-broska-kostei"
    },
    titles: {
      en: "Dice Roller Calculator - Roll Dice & Analyze Statistics",
      "zh-CN": "骰子投掷计算器：统计分析",
      "zh-TW": "骰子投擲計算器：統計分析",
      ja: "サイコロ計算機：統計分析",
      ko: "주사위 계산기: 통계 분석",
      es: "Calculadora de dados: análisis estadístico",
      fr: "Calculateur de dés : analyse statistique",
      de: "Würfelrechner: Statistik analysieren",
      pt: "Calculadora de dados: análise estatística",
      ru: "Калькулятор кубиков: статистический анализ"
    },
    descriptions: {
      en: "Dice roller calculator: simulate rolling multiple dice and get instant statistics — mean, median, mode, standard deviation, and full frequency distribution.",
      "zh-CN": "骰子投掷计算器：模拟多颗骰子投掷，即时查看平均值、中位数、众数、标准差和完整频率分布。",
      "zh-TW": "骰子投擲計算器：模擬多顆骰子投擲，即時查看平均數、中位數、眾數、標準差與完整頻率分布。",
      ja: "複数のサイコロをシミュレーションし、平均・中央値・最頻値・標準偏差・頻度分布をすぐに確認できます。",
      ko: "여러 주사위를 시뮬레이션해 평균, 중앙값, 최빈값, 표준편차, 빈도 분포를 즉시 확인하세요.",
      es: "Simula tiradas de varios dados y consulta al instante media, mediana, moda, desviación estándar y distribución de frecuencias.",
      fr: "Simulez plusieurs lancers de dés et consultez instantanément la moyenne, la médiane, le mode, l’écart type et la distribution des fréquences.",
      de: "Simuliere mehrere Würfe und sieh sofort Mittelwert, Median, Modus, Standardabweichung und die vollständige Häufigkeitsverteilung.",
      pt: "Simule lançamentos de vários dados e veja na hora média, mediana, moda, desvio padrão e distribuição de frequência.",
      ru: "Симулируйте броски нескольких кубиков и сразу получайте среднее, медиану, моду, стандартное отклонение и распределение частот."
    }
  },
  {
    id: "dispersion-calculator",
    category: "statistic",
    slugs: {
      en: "dispersion-calculator",
      "zh-CN": "lisandu-jisuanqi",
      "zh-TW": "lisandu-jisuanqi",
      ja: "sansodo-keisanki",
      ko: "sanpodo-gyesangi",
      es: "calculadora-dispersion",
      fr: "calculateur-dispersion",
      de: "streuungsrechner",
      pt: "calculadora-dispersao",
      ru: "kalkulyator-razbrosa"
    },
    titles: {
      en: "Dispersion Calculator - Variance, Std Dev & IQR",
      "zh-CN": "离散度计算器：方差、标准差与四分位距",
      "zh-TW": "離散度計算器：變異數、標準差與四分位距",
      ja: "散布度計算機：分散・標準偏差・IQR",
      ko: "산포도 계산기: 분산, 표준편차, IQR",
      es: "Calculadora de dispersión: varianza, DE e IQR",
      fr: "Calculateur de dispersion : variance, écart-type et IQR",
      de: "Streuungsrechner: Varianz, Std.-Abw. & IQR",
      pt: "Calculadora de dispersão: variância, desvio padrão e IQR",
      ru: "Калькулятор разброса: дисперсия, СКО и IQR"
    },
    descriptions: {
      en: "Dispersion calculator: enter comma-separated numbers to get range, variance, standard deviation, IQR, coefficient of variation, and MAD in one click.",
      "zh-CN": "离散度计算器：输入逗号分隔的数字，一键获取极差、方差、标准差、四分位距、变异系数和 MAD。",
      "zh-TW": "離散度計算器：輸入以逗號分隔的數字，一鍵取得範圍、變異數、標準差、四分位距、變異係數與 MAD。",
      ja: "散布度計算機：カンマ区切りの数値を入力すると、範囲、分散、標準偏差、IQR、変動係数、MAD を一度に算出します。",
      ko: "산포도 계산기: 쉼표로 구분한 숫자를 입력하면 범위, 분산, 표준편차, IQR, 변동계수, MAD를 한 번에 계산합니다.",
      es: "Calculadora de dispersión: introduce números separados por comas para obtener rango, varianza, desviación estándar, IQR, CV y MAD en un clic.",
      fr: "Calculateur de dispersion : saisissez des nombres séparés par des virgules pour obtenir l’étendue, la variance, l’écart-type, l’IQR, le CV et la MAD.",
      de: "Streuungsrechner: Zahlen durch Kommas getrennt eingeben und in einem Klick Spannweite, Varianz, Standardabweichung, IQR, VK und MAD erhalten.",
      pt: "Calculadora de dispersão: digite números separados por vírgulas para obter amplitude, variância, desvio padrão, IQR, coeficiente de variação e MAD.",
      ru: "Калькулятор разброса: введите числа через запятую и за один клик получите размах, дисперсию, стандартное отклонение, IQR, CV и MAD."
    }
  },
  {
    id: "dot-plot-calculator",
    category: "statistic",
    slugs: {
      en: "dot-plot-calculator",
      "zh-CN": "dian-tu-ji-suan-qi",
      "zh-TW": "dian-tu-ji-suan-qi",
      ja: "dotto-puropotto-keisanki",
      ko: "doteu-peulloteu-gyesangi",
      es: "calculadora-diagrama-puntos",
      fr: "calculateur-diagramme-points",
      de: "punktdiagramm-rechner",
      pt: "calculadora-grafico-pontos",
      ru: "kalkulyator-tochechnoj-diagrammy"
    },
    titles: {
      en: "Dot Plot Calculator - Create Dot Plots Online Free",
      "zh-CN": "点图计算器 - 在线创建点图",
      "zh-TW": "點圖計算器 - 線上建立點圖",
      ja: "ドットプロット計算機 - オンラインで作成",
      ko: "도트 플롯 계산기 - 온라인 생성",
      es: "Calculadora de gráficos de puntos",
      fr: "Calculateur de diagramme en points",
      de: "Punktdiagramm-Rechner",
      pt: "Calculadora de gráfico de pontos",
      ru: "Калькулятор точечной диаграммы"
    },
    descriptions: {
      en: "Dot plot calculator: enter a data set to generate a visual dot plot with mean, median, mode, and range — perfect for classrooms and quick data exploration.",
      "zh-CN": "点图计算器：输入数据集即可生成可视化点图，并即时计算平均数、中位数、众数和极差，适合课堂与快速探索。",
      "zh-TW": "點圖計算器：輸入資料集即可生成視覺化點圖，並即時計算平均數、中位數、眾數與極差，適合課堂與快速探索。",
      ja: "ドットプロット計算機: データを入力すると、平均・中央値・最頻値・範囲をすぐに求めながら点図を表示します。",
      ko: "도트 플롯 계산기: 데이터 집합을 입력하면 점도로를 표시하고 평균, 중앙값, 최빈값, 범위를 즉시 계산합니다.",
      es: "Calculadora de gráficos de puntos: introduce un conjunto de datos y genera un diagrama visual con media, mediana, moda y rango al instante.",
      fr: "Calculateur de diagramme en points : saisissez des données pour générer un graphique visuel avec moyenne, médiane, mode et étendue.",
      de: "Punktdiagramm-Rechner: Daten eingeben und sofort ein visuelles Punktdiagramm mit Mittelwert, Median, Modus und Spannweite erhalten.",
      pt: "Calculadora de gráfico de pontos: insira um conjunto de dados e gere um gráfico visual com média, mediana, moda e amplitude instantaneamente.",
      ru: "Калькулятор точечной диаграммы: введите набор данных и мгновенно получите график с средним, медианой, модой и размахом."
    }
  },
  {
    id: "empirical-rule-calculator",
    category: "statistic",
    slugs: {
      en: "empirical-rule-calculator",
      "zh-CN": "jingyan-guize-jisuanqi",
      "zh-TW": "jingyan-guize-jisuanqi",
      ja: "keiken-soku-keisanki",
      ko: "gyeongheom-beopchik-gyesangi",
      es: "calculadora-regla-empirica",
      fr: "calculateur-regle-empirique",
      de: "empirische-regel-rechner",
      pt: "calculadora-regra-empirica",
      ru: "kalkulyator-empiricheskogo-pravila"
    },
    titles: {
      en: "Empirical Rule Calculator - 68-95-99.7 Rule for Normal",
      "zh-CN": "经验法则计算器 - 正态分布 68-95-99.7",
      "zh-TW": "經驗法則計算器 - 常態分布 68-95-99.7",
      ja: "経験則計算機 - 正規分布の 68-95-99.7",
      ko: "경험 법칙 계산기 - 정규분포 68-95-99.7",
      es: "Calculadora de regla empírica 68-95-99,7",
      fr: "Calculateur de règle empirique 68-95-99,7",
      de: "Rechner für die empirische Regel 68-95-99,7",
      pt: "Calculadora da regra empírica 68-95-99,7",
      ru: "Калькулятор эмпирического правила 68-95-99,7"
    },
    descriptions: {
      en: "Empirical rule calculator: enter mean and standard deviation to get the 68%, 95%, and 99.7% ranges for any normal distribution instantly.",
      "zh-CN": "经验法则计算器：输入均值和标准差，即可快速得到任意正态分布的 68%、95% 和 99.7% 区间。",
      "zh-TW": "經驗法則計算器：輸入平均值與標準差，立即取得任意常態分布的 68%、95% 與 99.7% 區間。",
      ja: "経験則計算機：平均と標準偏差を入力すると、任意の正規分布の 68%、95%、99.7% 区間をすぐに求められます。",
      ko: "경험 법칙 계산기: 평균과 표준편차를 입력하면 모든 정규분포의 68%, 95%, 99.7% 구간을 즉시 계산합니다.",
      es: "Calculadora de regla empírica: introduce media y desviación estándar para obtener al instante rangos del 68%, 95% y 99,7%.",
      fr: "Calculateur de règle empirique : saisissez moyenne et écart type pour obtenir les intervalles 68%, 95% et 99,7% d’une loi normale.",
      de: "Rechner für die empirische Regel: Mittelwert und Standardabweichung eingeben und sofort 68%-, 95%- und 99,7%-Bereiche erhalten.",
      pt: "Calculadora da regra empírica: insira média e desvio padrão para obter na hora os intervalos de 68%, 95% e 99,7%.",
      ru: "Калькулятор эмпирического правила: введите среднее и стандартное отклонение, чтобы сразу получить интервалы 68%, 95% и 99,7%."
    }
  }
];
