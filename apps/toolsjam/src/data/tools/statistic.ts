import type { ToolEntry } from "@/data/tools";

export const tools: ToolEntry[] = [
  {
    id: "standard-deviation-calculator",
    category: "statistic",
    slugs: {
      en: "standard-deviation-calculator",
      "zh-CN": "biaozhuncha-jisuanqi-yangben-zongti",
      "zh-TW": "biaozhuncha-jisuanqi-yangben-muti",
      ja: "hyoujunhensa-keisanki-hyohon-boshudan",
      ko: "pyojunpyeoncha-gyesangi-pyobon-mojipdan",
      es: "calculadora-desviacion-estandar-muestra-poblacion",
      fr: "ecart-type-calculatrice-echantillon-population",
      de: "standardabweichung-berechnen-stichprobe-grundgesamtheit",
      pt: "desvio-padrao-calculadora-amostra-populacao",
      ru: "standartnogo-otkloneniya-kalkulyator-vyborka-populyatsiya"
    },
    titles: {
      en: "Standard Deviation Calculator - Sample & Population",
      "zh-CN": "标准差计算器 - 样本与总体",
      "zh-TW": "標準差計算器 - 樣本與母體",
      ja: "標準偏差計算機 - 標本と母集団",
      ko: "표준편차 계산기 - 표본 및 모집단",
      es: "Desviación estándar: calculadora de muestra y población",
      fr: "Écart type : calculatrice échantillon et population",
      de: "Standardabweichung Rechner - Stichprobe und Grundgesamtheit",
      pt: "Desvio padrão: calculadora de amostra e população",
      ru: "Стандартное отклонение калькулятор - выборка и совокупность"
    },
    descriptions: {
      en: "Standard deviation calculator for sample and population data. Find standard deviation, variance, mean, sum, and range from a list of numbers instantly.",
      "zh-CN": "用于样本和总体数据的标准差计算器。可快速计算标准差、方差、均值、总和和极差。",
      "zh-TW": "適用於樣本與母體資料的標準差計算器。可快速算出標準差、變異數、平均數、總和與範圍。",
      ja: "標本データと母集団データに対応した標準偏差計算機。標準偏差、分散、平均、合計、範囲をすぐに算出できます。",
      ko: "표본과 모집단 데이터의 표준편차 계산기입니다. 표준편차, 분산, 평균, 합계, 범위를 빠르게 구하세요.",
      es: "Calculadora de desviación estándar para datos de muestra y población. Calcula al instante desviación, varianza, media, suma y rango.",
      fr: "Calculatrice d'écart type pour données d'échantillon et de population. Trouvez instantanément l'écart type, la variance, la moyenne, la somme et l'étendue.",
      de: "Standardabweichungsrechner für Stichproben- und Grundgesamtheitsdaten. Standardabweichung, Varianz, Mittelwert, Summe und Spanne sofort finden.",
      pt: "Calculadora de desvio padrão para dados de amostra e população. Encontre desvio padrão, variância, média, soma e faixa instantaneamente.",
      ru: "Калькулятор стандартного отклонения для данных выборки и совокупности. Мгновенно найдите стандартное отклонение, дисперсию, среднее, сумму и диапазон."
    }
  },
  {
    id: "wilcoxon-rank-sum-test-calculator",
    category: "statistic",
    slugs: {
      en: "wilcoxon-rank-sum-test-calculator",
      "zh-CN": "wilcoxon-zhixuhe-jianyan-ji-suan-qi",
      "zh-TW": "wilcoxon-zhixuhe-jianyan-ji-suan-qi",
      ja: "wilcoxon-juniiwa-kensa-keisan",
      ko: "wilokson-sunwi-hap-geomsa-gyeonsan-gi",
      es: "wilcoxon-suma-de-rangos-calculadora",
      fr: "wilcoxon-somme-des-rangs-calculateur",
      de: "wilcoxon-rangsummentest-rechner",
      pt: "wilcoxon-soma-dos-rangos-calculadora",
      ru: "wilcoxon-summa-rangov-kalkulyator"
    },
    titles: {
      en: "Wilcoxon Rank Sum Test Calculator (Mann-Whitney U)",
      "zh-CN": "Wilcoxon秩和检验计算器（Mann-Whitney U）",
      "zh-TW": "Wilcoxon秩和檢定計算器（Mann-Whitney U）",
      ja: "Wilcoxon順位和検定計算器",
      ko: "Wilcoxon 순위합 검정 계산기",
      es: "Calculadora de Wilcoxon de Suma de Rangos",
      fr: "Calculateur Wilcoxon Somme des Rangs",
      de: "Wilcoxon-Rangsummentest Rechner",
      pt: "Calculadora de Wilcoxon Soma dos Rangos",
      ru: "Калькулятор критерия Уилкоксона суммы рангов"
    },
    descriptions: {
      en: "Perform a Wilcoxon Rank Sum Test (Mann-Whitney U) for two independent samples. Get the U statistic, Z-score, and p-value instantly — no normality required.",
      "zh-CN": "对两组独立样本进行Wilcoxon秩和检验，快速得到U统计量、Z分数和p值，无需正态性假设。",
      "zh-TW": "對兩組獨立樣本進行Wilcoxon秩和檢定，快速取得U統計量、Z分數與p值，無需常態性假設。",
      ja: "2つの独立標本にWilcoxon順位和検定を適用し、U統計量、Zスコア、p値をすぐに算出します。正規性は不要です。",
      ko: "두 독립 표본에 Wilcoxon 순위합 검정을 적용해 U 통계량, Z 점수, p값을 바로 구합니다. 정규성 가정이 필요 없습니다.",
      es: "Aplica la prueba de Wilcoxon de suma de rangos a dos muestras independientes y obtiene U, Z y p al instante, sin suponer normalidad.",
      fr: "Appliquez le test de Wilcoxon sur deux échantillons indépendants et obtenez instantanément U, Z et la p-value, sans supposer la normalité.",
      de: "Führe den Wilcoxon-Rangsummentest für zwei unabhängige Stichproben durch und erhalte U, Z und p sofort, ohne Normalverteilungsannahme.",
      pt: "Aplique o teste de Wilcoxon de soma dos rangos a duas amostras independentes e obtenha U, Z e p na hora, sem assumir normalidade.",
      ru: "Примените критерий Уилкоксона суммы рангов к двум независимым выборкам и мгновенно получите U, Z и p без предположения о нормальности."
    }
  },
  {
    id: "wilcoxon-signed-rank-test-calculator",
    category: "statistic",
    slugs: {
      en: "wilcoxon-signed-rank-test-calculator",
      "zh-CN": "wilcoxon-signed-rank-yi-dui-yang-ben-jisuanqi",
      "zh-TW": "wilcoxon-signed-rank-paired-samples",
      ja: "uirukoson-saindo-ranku-pea-samupuru",
      ko: "wilkeukoseon-sainjeong-rang-paeeo-seompeul",
      es: "wilcoxon-signed-rank-test-muestras-pareadas",
      fr: "wilcoxon-signed-rank-test-echantillons-paires",
      de: "wilcoxon-vorzeichen-rangtest-gepaarte-stichproben",
      pt: "wilcoxon-signed-rank-test-amostras-pareadas",
      ru: "kriteriy-uilkoksona-svyazannye-vyborki"
    },
    titles: {
      en: "Wilcoxon Signed-Rank Test Calculator - Paired Samples",
      "zh-CN": "Wilcoxon符号秩检验计算器：配对样本",
      "zh-TW": "Wilcoxon符號等級檢定計算器：配對樣本",
      ja: "ウィルコクソン符号順位検定計算機：対応のある標本",
      ko: "윌콕슨 부호순위검정 계산기: 대응 표본",
      es: "Calculadora de Wilcoxon para muestras pareadas",
      fr: "Calculateur du test de Wilcoxon pour échantillons appariés",
      de: "Wilcoxon-Vorzeichen-Rangtest Rechner für gepaarte Stichproben",
      pt: "Calculadora de Wilcoxon para amostras pareadas",
      ru: "Калькулятор критерия Уилкоксона для парных выборок"
    },
    descriptions: {
      en: "Wilcoxon signed-rank test calculator for paired samples. Compare before-and-after measurements with W statistic, Z-score, and p-value — no normality assumption.",
      "zh-CN": "Wilcoxon符号秩检验配对样本计算器。比较前后测量，输出W统计量、Z分数和p值，无需正态性假设。",
      "zh-TW": "Wilcoxon符號等級檢定配對樣本計算器。比較前後測量，輸出W統計量、Z分數與p值，無需常態性假設。",
      ja: "対応のある標本向けのウィルコクソン符号順位検定計算機。W統計量、Zスコア、p値を正規性仮定なしで算出します。",
      ko: "대응 표본용 윌콕슨 부호순위검정 계산기입니다. 정규성 가정 없이 W 통계량, Z 점수, p값을 계산합니다.",
      es: "Calculadora de la prueba de rangos con signo de Wilcoxon para muestras pareadas. Compara antes y después con W, Z y p sin asumir normalidad.",
      fr: "Calculateur du test des rangs signés de Wilcoxon pour échantillons appariés. Comparez avant/après avec W, Z et p sans supposer la normalité.",
      de: "Wilcoxon-Vorzeichen-Rangtest-Rechner für gepaarte Stichproben. Vergleichen Sie Vorher/Nachher mit W, Z und p ohne Normalverteilungsannahme.",
      pt: "Calculadora do teste de Wilcoxon para amostras pareadas. Compare antes e depois com estatística W, Z e valor-p sem assumir normalidade.",
      ru: "Калькулятор критерия знаковых рангов Уилкоксона для парных выборок. Сравнивайте до и после по W, Z и p без предположения о нормальности."
    }
  },
  {
    id: "yates-correction-for-continuity-calculator",
    category: "statistic",
    slugs: {
      en: "yates-correction-for-continuity-calculator",
      "zh-CN": "yates-lianxu-xiaozheng-jisuanqi",
      "zh-TW": "yates-lianxu-xiaozheng-jisuanqi",
      ja: "yates-renzokusei-hosei-keisanki",
      ko: "yiteu-yeonsokseong-bojeong-gyeonsangi",
      es: "calculadora-chi-cuadrado-correccion-yates",
      fr: "chi-carre-correction-yates",
      de: "chi-quadrat-yates-korrektur",
      pt: "qui-quadrado-correcao-yates",
      ru: "khi-kvadrat-popravka-yeitsa"
    },
    titles: {
      en: "Yates Correction for Continuity Calculator - Chi-Square",
      "zh-CN": "Yates连续性校正卡方计算器",
      "zh-TW": "Yates連續性校正卡方計算器",
      ja: "Yates連続性補正カイ二乗計算機",
      ko: "Yates 연속성 보정 카이제곱 계산기",
      es: "Chi-cuadrado con corrección de Yates",
      fr: "Chi carré avec correction de Yates",
      de: "Chi-Quadrat mit Yates-Korrektur",
      pt: "Qui-quadrado com correção de Yates",
      ru: "Калькулятор хи-квадрат с поправкой Йейтса"
    },
    descriptions: {
      en: "Calculate a Yates-corrected chi-square statistic for 2×2 contingency tables. Enter a, b, c, d cell counts and get the adjusted χ² value and p-value instantly.",
      "zh-CN": "计算 2×2 列联表的 Yates 校正卡方统计量。输入 a、b、c、d 计数即可立即得到调整后的 χ² 值和 p 值。",
      "zh-TW": "計算 2×2 列聯表的 Yates 校正卡方統計量。輸入 a、b、c、d 計數即可立即得到調整後的 χ² 值與 p 值。",
      ja: "2×2分割表のYates補正付きカイ二乗統計量を計算します。a、b、c、dの度数を入力すると、調整後のχ²値とp値を即時に表示します。",
      ko: "2×2 분할표의 Yates 보정 카이제곱 통계량을 계산합니다. a, b, c, d 셀 값을 입력하면 조정된 χ² 값과 p값을 즉시 확인할 수 있습니다.",
      es: "Calcula el estadístico chi-cuadrado corregido de Yates para tablas de contingencia 2×2. Introduce a, b, c y d y obtén χ² y el valor p al instante.",
      fr: "Calculez le chi carré corrigé de Yates pour les tableaux de contingence 2×2. Saisissez a, b, c et d pour obtenir immédiatement χ² et la valeur p.",
      de: "Berechnet die Yates-korrigierte Chi-Quadrat-Statistik für 2×2-Kontingenztafeln. Geben Sie a, b, c und d ein und erhalten Sie χ² und p-Wert sofort.",
      pt: "Calcule o qui-quadrado corrigido de Yates para tabelas de contingência 2×2. Digite a, b, c e d e obtenha χ² e o valor de p na hora.",
      ru: "Вычисляет хи-квадрат со поправкой Йейтса для таблиц сопряжённости 2×2. Введите a, b, c и d и сразу получите χ² и p-значение."
    }
  },
  {
    id: "z-score-calculator",
    category: "statistic",
    slugs: {
      en: "z-score-calculator",
      "zh-CN": "z-score-ji-suan-qi",
      "zh-TW": "z-score-ji-suan-qi",
      ja: "z-score-keisan-ki",
      ko: "z-score-gyesangi",
      es: "z-score-calculadora",
      fr: "z-score-calculateur",
      de: "z-score-rechner",
      pt: "z-score-calculadora",
      ru: "z-score-kalkulyator"
    },
    titles: {
      en: "Z-Score Calculator - Calculate Standard Score Instantly",
      "zh-CN": "Z分数计算器 - 即时计算标准分",
      "zh-TW": "Z分數計算器 - 即時計算標準分",
      ja: "Zスコア計算機 - 標準得点を即時計算",
      ko: "Z-점수 계산기 - 표준점수 즉시 계산",
      es: "Calculadora Z-Score - Calcula la puntuación estándar",
      fr: "Calculateur Z-Score - Calculez le score standard",
      de: "Z-Score-Rechner - Standardwert sofort berechnen",
      pt: "Calculadora Z-Score - Calcule a pontuação padrão",
      ru: "Калькулятор Z-Score - Быстрый расчёт стандартного балла"
    },
    descriptions: {
      en: "Z-score calculator: find how many standard deviations a value is from the mean. Enter raw score, mean, and standard deviation to get z-score and interpretation.",
      "zh-CN": "Z分数计算器：快速查看数值距离均值有多少个标准差。输入原始分、均值和标准差即可得到 Z 分数与解读。",
      "zh-TW": "Z分數計算器：快速看出數值距離平均值有幾個標準差。輸入原始分、平均值與標準差即可得到 Z 分數與解讀。",
      ja: "Zスコア計算機：値が平均から何標準偏差離れているかをすぐに確認。元の得点、平均、標準偏差を入力して Z スコアと解釈を表示します。",
      ko: "Z-점수 계산기: 값이 평균에서 몇 표준편차 떨어져 있는지 빠르게 확인하세요. 원점수, 평균, 표준편차를 입력해 Z-점수와 해석을 얻을 수 있습니다.",
      es: "Calculadora Z-score: descubre cuántas desviaciones estándar está un valor de la media. Ingresa la puntuación, la media y la desviación estándar.",
      fr: "Calculateur de z-score : découvrez combien d’écarts-types une valeur se situe de la moyenne. Saisissez la valeur, la moyenne et l’écart-type.",
      de: "Z-Score-Rechner: Ermitteln Sie, wie viele Standardabweichungen ein Wert vom Mittelwert entfernt ist. Geben Sie Wert, Mittelwert und Standardabweichung ein.",
      pt: "Calculadora de z-score: descubra quantos desvios-padrão um valor está da média. Informe o valor, a média e o desvio-padrão.",
      ru: "Калькулятор z-score: узнайте, на сколько стандартных отклонений значение отличается от среднего. Введите значение, среднее и стандартное отклонение."
    }
  },
  {
    id: "z-test-calculator",
    category: "statistic",
    slugs: {
      en: "z-test-calculator",
      "zh-CN": "z-jiansuan-ji-jiashe-jiance",
      "zh-TW": "z-jiansuan-ji-jiashuo-jiance",
      ja: "z-kentei-keisanki-kasetsu-kentei",
      ko: "z-geomjeong-gyesangi-gaseol-geomjeong",
      es: "calculadora-prueba-z-hipotesis",
      fr: "calculateur-test-z-hypothese",
      de: "z-test-rechner-hypothesentest",
      pt: "calculadora-teste-z-hipoteses",
      ru: "z-test-kalkulyator-proverka-gipotez"
    },
    titles: {
      en: "Z-Test Calculator for Hypothesis Testing",
      "zh-CN": "Z 检验计算器：假设检验",
      "zh-TW": "Z 檢定計算器：假設檢定",
      ja: "Z検定計算機：仮説検定",
      ko: "Z 검정 계산기: 가설 검정",
      es: "Calculadora de prueba Z para hipótesis",
      fr: "Calculateur de test Z pour hypothèses",
      de: "Z-Test-Rechner für Hypothesentests",
      pt: "Calculadora de teste Z para hipóteses",
      ru: "Z-тест калькулятор для проверки гипотез"
    },
    descriptions: {
      en: "One-sample and two-sample Z-test calculator for hypothesis testing. Enter sample mean, population SD, and sample size to get the Z-statistic and p-value.",
      "zh-CN": "用于假设检验的单样本和双样本 Z 检验计算器。输入样本均值、总体标准差和样本量，得到 Z 统计量和 p 值。",
      "zh-TW": "用於假設檢定的單樣本與雙樣本 Z 檢定計算器。輸入樣本平均數、母體標準差與樣本數，取得 Z 統計量與 p 值。",
      ja: "仮説検定向けの1標本・2標本Z検定計算機。標本平均、母標準偏差、標本サイズを入力してZ統計量とp値を算出します。",
      ko: "가설 검정을 위한 단일 표본 및 두 표본 Z 검정 계산기입니다. 표본 평균, 모집단 표준편차, 표본 크기를 입력해 Z 통계량과 p값을 구하세요.",
      es: "Calculadora de prueba Z de una y dos muestras para hipótesis. Introduce media muestral, DE poblacional y tamaño para obtener Z y valor p.",
      fr: "Calculateur de test Z à un ou deux échantillons pour tests d’hypothèse. Saisissez moyenne, écart-type populationnel et taille pour obtenir Z et p.",
      de: "Z-Test-Rechner für Ein- und Zwei-Stichproben-Hypothesentests. Stichprobenmittel, Populations-SD und n eingeben, Z-Statistik und p-Wert erhalten.",
      pt: "Calculadora de teste Z de uma e duas amostras para hipóteses. Informe média amostral, DP populacional e tamanho para obter Z e valor-p.",
      ru: "Калькулятор Z-теста для одной и двух выборок. Введите среднее, СКО генеральной совокупности и размер выборки, чтобы получить Z и p-значение."
    }
  },
  {
    id: "tukey-hsd-calculator",
    category: "statistic",
    slugs: {
      en: "tukey-hsd-calculator",
      "zh-CN": "tukey-hsd-jisuanqi",
      "zh-TW": "tukey-hsd-ji-suan-qi",
      ja: "tukey-hsd-keisan-ki",
      ko: "tukey-hsd-gyeolsan-gi",
      es: "calculadora-tukey-hsd",
      fr: "calculateur-tukey-hsd",
      de: "tukey-hsd-rechner",
      pt: "calculadora-tukey-hsd",
      ru: "kalkulyator-tukei-hsd"
    },
    titles: {
      en: "Tukey's HSD Calculator - Post-Hoc ANOVA Test",
      "zh-CN": "Tukey HSD计算器",
      "zh-TW": "Tukey HSD計算器",
      ja: "Tukey HSD計算機",
      ko: "Tukey HSD 계산기",
      es: "Calculadora Tukey HSD",
      fr: "Calculateur Tukey HSD",
      de: "Tukey HSD Rechner",
      pt: "Calculadora Tukey HSD",
      ru: "Калькулятор Tukey HSD"
    },
    descriptions: {
      en: "Perform Tukey's HSD post-hoc test after ANOVA. Compare all group mean pairs to find statistically significant differences with one free online tool.",
      "zh-CN": "ANOVA后执行Tukey HSD事后检验，比较各组均值，快速找出具有统计显著差异的配对。",
      "zh-TW": "在ANOVA後執行Tukey HSD事後檢定，比較各組平均數，快速找出具有統計顯著差異的配對。",
      ja: "ANOVA後にTukey HSD事後検定を行い、各群の平均差を比較して有意差のある組み合わせを見つけます。",
      ko: "ANOVA 후 Tukey HSD 사후검정을 수행해 각 그룹 평균을 비교하고 유의한 차이가 있는 조합을 찾습니다.",
      es: "Realiza la prueba post hoc Tukey HSD después del ANOVA y compara medias de grupos para encontrar diferencias significativas.",
      fr: "Effectuez le test post hoc Tukey HSD après une ANOVA et comparez les moyennes des groupes pour trouver des différences significatives.",
      de: "Führen Sie den Tukey-HSD-Post-hoc-Test nach ANOVA durch und vergleichen Sie Gruppenmittelwerte, um signifikante Unterschiede zu finden.",
      pt: "Faça o teste post hoc Tukey HSD após a ANOVA e compare médias dos grupos para encontrar diferenças significativas.",
      ru: "Проведите пост-хок тест Tukey HSD после ANOVA и сравните средние групп, чтобы найти значимые различия."
    }
  },
  {
    id: "two-envelopes-paradox-calculator",
    category: "statistic",
    slugs: {
      en: "two-envelopes-paradox-calculator",
      "zh-CN": "liang-ge-xin-feng-bei-lun-ji-suan-qi",
      "zh-TW": "liang-ge-xin-feng-bei-lun-ji-suan-qi",
      ja: "futatsu-no-futo-paradox-keisanki",
      ko: "du-gae-ui-bongtu-yeokseol-gyesangi",
      es: "calculadora-paradoja-dos-sobres",
      fr: "calculateur-paradoxe-deux-enveloppes",
      de: "zwei-umschlaege-paradoxon-rechner",
      pt: "calculadora-paradoxo-dois-envelopes",
      ru: "kalkulyator-paradoksa-dvukh-konvertov"
    },
    titles: {
      en: "Two Envelopes Paradox Calculator - Decision Theory",
      "zh-CN": "两个信封悖论计算器 - 决策理论",
      "zh-TW": "兩個信封悖論計算器 - 決策理論",
      ja: "2つの封筒パラドックス計算機 - 意思決定理論",
      ko: "두 봉투 역설 계산기 - 의사결정 이론",
      es: "Calculadora de la paradoja de los dos sobres",
      fr: "Calculateur du paradoxe des deux enveloppes",
      de: "Zwei-Umschläge-Paradoxon-Rechner",
      pt: "Calculadora do paradoxo dos dois envelopes",
      ru: "Калькулятор парадокса двух конвертов"
    },
    descriptions: {
      en: "Explore the Two Envelopes Paradox interactively. Calculate expected values for switching or keeping, and understand the probability math behind this puzzle.",
      "zh-CN": "交互式探索两个信封悖论。计算交换或保留的期望值，并理解这道谜题背后的概率数学。",
      "zh-TW": "互動式探索兩個信封悖論。計算交換或保留的期望值，理解這道謎題背後的機率數學。",
      ja: "2つの封筒パラドックスを対話的に探索。交換と保持の期待値を計算し、この問題の確率数学を理解します。",
      ko: "두 봉투 역설을 대화형으로 살펴보세요. 바꾸기와 유지하기의 기대값을 계산하고 퍼즐 뒤의 확률 수학을 이해합니다.",
      es: "Explora la paradoja de los dos sobres de forma interactiva. Calcula valores esperados al cambiar o conservar y entiende la probabilidad.",
      fr: "Explorez le paradoxe des deux enveloppes. Calculez les valeurs attendues en changeant ou en gardant, et comprenez les probabilités.",
      de: "Erkunde das Zwei-Umschläge-Paradoxon interaktiv. Berechne Erwartungswerte fürs Wechseln oder Behalten und verstehe die Mathematik.",
      pt: "Explore o paradoxo dos dois envelopes de forma interativa. Calcule valores esperados ao trocar ou manter e entenda a probabilidade.",
      ru: "Изучите парадокс двух конвертов интерактивно. Рассчитайте матожидание при обмене или сохранении и поймите вероятности."
    }
  },
  {
    id: "uniform-distribution-calculator",
    category: "statistic",
    slugs: {
      en: "uniform-distribution-calculator",
      "zh-CN": "junyun-fenbu-jisuanqi",
      "zh-TW": "junyun-fenbu-jisuanqi",
      ja: "ichiyo-bunpu-keisanki",
      ko: "illyang-bunpo-gyeonsangi",
      es: "calculadora-distribucion-uniforme",
      fr: "calculatrice-distribution-uniforme",
      de: "gleichverteilung-rechner",
      pt: "calculadora-distribuicao-uniforme",
      ru: "kalkulyator-ravnomernogo-raspredeleniya"
    },
    titles: {
      en: "Uniform Distribution Calculator - PDF, CDF & Mean",
      "zh-CN": "均匀分布计算器 - PDF、CDF 与均值",
      "zh-TW": "均勻分布計算器 - PDF、CDF 與平均數",
      ja: "一様分布計算機 - PDF、CDF、平均",
      ko: "일양분포 계산기 - PDF, CDF, 평균",
      es: "Calculadora de distribución uniforme - PDF, CDF y media",
      fr: "Calculatrice de distribution uniforme - PDF, CDF et moyenne",
      de: "Gleichverteilungsrechner - PDF, CDF und Mittelwert",
      pt: "Calculadora de distribuição uniforme - PDF, CDF e média",
      ru: "Калькулятор равномерного распределения - PDF, CDF и среднее"
    },
    descriptions: {
      en: "Calculate PDF, CDF, mean, variance, and interval probability for any uniform distribution. Enter the range parameters a and b to get instant results.",
      "zh-CN": "计算任意均匀分布的 PDF、CDF、均值、方差和区间概率。输入参数 a 和 b 即可立即查看结果。",
      "zh-TW": "計算任意均勻分布的 PDF、CDF、平均數、變異數與區間機率。輸入參數 a 和 b 即可立即查看結果。",
      ja: "任意の一様分布の PDF、CDF、平均、分散、区間確率を計算します。a と b を入力するとすぐに結果を確認できます。",
      ko: "임의의 일양분포에 대한 PDF, CDF, 평균, 분산, 구간 확률을 계산합니다. a와 b를 입력하면 즉시 결과를 볼 수 있습니다.",
      es: "Calcula la PDF, CDF, media, varianza y probabilidad de intervalo de cualquier distribución uniforme. Ingresa a y b para ver resultados al instante.",
      fr: "Calculez la PDF, la CDF, la moyenne, la variance et la probabilité d’intervalle pour toute distribution uniforme. Entrez a et b pour un résultat instantané.",
      de: "Berechnen Sie PDF, CDF, Mittelwert, Varianz und Intervallwahrscheinlichkeit für jede Gleichverteilung. a und b eingeben und sofort Ergebnisse erhalten.",
      pt: "Calcule a PDF, CDF, média, variância e probabilidade de intervalo para qualquer distribuição uniforme. Digite a e b para ver os resultados na hora.",
      ru: "Вычисляйте PDF, CDF, среднее, дисперсию и вероятность интервала для любого равномерного распределения. Введите a и b, чтобы сразу получить результат."
    }
  },
  {
    id: "upper-and-lower-fence-calculator",
    category: "statistic",
    slugs: {
      en: "upper-and-lower-fence-calculator",
      "zh-CN": "shang-xia-jie-iqr-yi-chang-zhi-ji-suan-qi",
      "zh-TW": "shang-xia-jie-iqr-yi-chang-zhi-ji-suan-qi",
      ja: "jogen-kagen-fensu-iqr-hazurechi-keisanki",
      ko: "sanghan-hahan-penseu-iqr-isangchi-gyesangi",
      es: "calculadora-vallas-superior-inferior-iqr-atipicos",
      fr: "calculateur-bornes-superieure-inferieure-iqr-valeurs-aberrantes",
      de: "oberer-unterer-zaun-rechner-iqr-ausreisser",
      pt: "calculadora-cercas-superior-inferior-iqr-outliers",
      ru: "kalkulyator-verhnej-nizhnej-granicy-iqr-vybrosy"
    },
    titles: {
      en: "Upper and Lower Fence Calculator - IQR Outliers",
      "zh-CN": "上下界计算器 - IQR 异常值",
      "zh-TW": "上下界計算器 - IQR 離群值",
      ja: "上限・下限フェンス計算機 - IQR外れ値",
      ko: "상한·하한 펜스 계산기 - IQR 이상치",
      es: "Calculadora de vallas superior e inferior IQR",
      fr: "Calculateur de bornes IQR et valeurs aberrantes",
      de: "Oberer und unterer Zaun Rechner - IQR-Ausreißer",
      pt: "Calculadora de cercas IQR e outliers",
      ru: "Калькулятор верхней и нижней границы IQR"
    },
    descriptions: {
      en: "Calculate upper and lower fences using the IQR method to identify outliers in your dataset. Instantly find Q1, Q3, IQR, and all data points outside the fences.",
      "zh-CN": "使用 IQR 方法计算上下界，识别数据集中的异常值。即时求出 Q1、Q3、IQR 以及界限外的所有数据点。",
      "zh-TW": "使用 IQR 方法計算上下界，識別資料集中的離群值。立即找出 Q1、Q3、IQR 以及界限外的所有資料點。",
      ja: "IQR法で上限・下限フェンスを計算し、データセットの外れ値を特定。Q1、Q3、IQR、フェンス外の値をすぐに確認できます。",
      ko: "IQR 방법으로 상한·하한 펜스를 계산해 데이터셋의 이상치를 찾습니다. Q1, Q3, IQR, 펜스 밖 데이터점을 즉시 확인하세요.",
      es: "Calcula vallas superior e inferior con el método IQR para identificar valores atípicos. Obtén Q1, Q3, IQR y puntos fuera de las vallas.",
      fr: "Calculez les bornes supérieure et inférieure avec la méthode IQR pour repérer les valeurs aberrantes. Obtenez Q1, Q3, IQR et les points hors bornes.",
      de: "Berechnen Sie obere und untere Zäune mit der IQR-Methode, um Ausreißer zu erkennen. Finden Sie Q1, Q3, IQR und Punkte außerhalb der Zäune.",
      pt: "Calcule cercas superior e inferior pelo método IQR para identificar outliers. Veja Q1, Q3, IQR e todos os pontos fora das cercas.",
      ru: "Рассчитайте верхнюю и нижнюю границы методом IQR, чтобы найти выбросы. Мгновенно получите Q1, Q3, IQR и точки вне границ."
    }
  },
  {
    id: "upper-control-limit-calculator",
    category: "statistic",
    slugs: {
      en: "upper-control-limit-calculator",
      "zh-CN": "shang-kong-zhi-xian-ji-suan-qi",
      "zh-TW": "shang-kong-zhi-xian-ji-suan-qi",
      ja: "jogen-kanri-genkai-keisanki",
      ko: "sanghan-gwanri-hangye-gyesangi",
      es: "calculadora-limite-control-superior",
      fr: "calculateur-limite-controle-superieure",
      de: "oberer-eingriffsgrenze-rechner",
      pt: "calculadora-limite-controle-superior",
      ru: "kalkulyator-verhnego-kontrolnogo-predela"
    },
    titles: {
      en: "Upper Control Limit (UCL) Calculator - SPC Charts",
      "zh-CN": "上控制限（UCL）计算器 - SPC控制图",
      "zh-TW": "上管制限（UCL）計算器 - SPC管制圖",
      ja: "上方管理限界（UCL）計算機 - SPC管理図",
      ko: "상한 관리 한계(UCL) 계산기 - SPC 관리도",
      es: "Calculadora de límite de control superior (UCL)",
      fr: "Calculateur de limite de contrôle supérieure (UCL)",
      de: "Rechner für obere Eingriffsgrenze (UCL)",
      pt: "Calculadora de limite superior de controle (UCL)",
      ru: "Калькулятор верхнего контрольного предела (UCL)"
    },
    descriptions: {
      en: "Calculate the Upper Control Limit (UCL) for statistical process control charts. Enter raw data or summary stats to monitor process variation and quality.",
      "zh-CN": "计算统计过程控制图的上控制限（UCL）。输入原始数据或汇总统计量，监控过程波动和质量。",
      "zh-TW": "計算統計製程管制圖的上管制限（UCL）。輸入原始資料或彙總統計量，監控製程變異與品質。",
      ja: "統計的工程管理図の上方管理限界（UCL）を計算。生データまたは要約統計量を入力して工程変動と品質を監視します。",
      ko: "통계적 공정 관리도의 상한 관리 한계(UCL)를 계산합니다. 원자료 또는 요약 통계로 공정 변동과 품질을 모니터링하세요.",
      es: "Calcula el límite de control superior (UCL) para gráficos SPC. Usa datos sin procesar o estadísticas resumidas para monitorear variación y calidad.",
      fr: "Calculez la limite de contrôle supérieure (UCL) des cartes SPC. Saisissez des données brutes ou des statistiques résumées pour suivre variation et qualité.",
      de: "Berechnen Sie die obere Eingriffsgrenze (UCL) für SPC-Regelkarten. Nutzen Sie Rohdaten oder Kennzahlen zur Überwachung von Streuung und Qualität.",
      pt: "Calcule o limite superior de controle (UCL) para gráficos SPC. Use dados brutos ou estatísticas resumidas para monitorar variação e qualidade.",
      ru: "Рассчитайте верхний контрольный предел (UCL) для SPC-карт. Введите исходные данные или сводную статистику для контроля вариации и качества."
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
      ko: "bunsan-gyeonsangi",
      es: "calculadora-varianza",
      fr: "calculateur-variance",
      de: "varianzrechner",
      pt: "calculadora-variancia",
      ru: "kalkulyator-dispersii"
    },
    titles: {
      en: "Variance Calculator - Sample & Population Variance",
      "zh-CN": "方差计算器 - 样本与总体方差",
      "zh-TW": "方差計算器 - 樣本與母體方差",
      ja: "分散計算ツール - 標本・母集団分散",
      ko: "분산 계산기 - 표본 및 모집단 분산",
      es: "Calculadora de varianza - muestra y población",
      fr: "Calculateur de variance - échantillon et population",
      de: "Varianzrechner - Stichprobe und Grundgesamtheit",
      pt: "Calculadora de variância - amostra e população",
      ru: "Калькулятор дисперсии - выборка и генеральная совокупность"
    },
    descriptions: {
      en: "Variance calculator for sample and population data. Computes variance, standard deviation, mean, median, mode, and IQR from any list of numbers instantly.",
      "zh-CN": "样本和总体数据方差计算器。可立即计算方差、标准差、均值、中位数、众数和四分位距。",
      "zh-TW": "樣本與母體資料方差計算器，可立即計算方差、標準差、平均數、中位數、眾數與四分位距。",
      ja: "標本と母集団の分散計算ツール。分散、標準偏差、平均値、中央値、最頻値、IQRをすぐに算出します。",
      ko: "표본과 모집단 데이터의 분산 계산기입니다. 분산, 표준편차, 평균, 중앙값, 최빈값, IQR을 즉시 계산합니다.",
      es: "Calculadora de varianza para datos de muestra y población. Calcula al instante varianza, desviación estándar, media, mediana, moda e IQR.",
      fr: "Calculateur de variance pour données d’échantillon et de population. Calcule instantanément la variance, l’écart-type, la moyenne, la médiane, le mode et l’IQR.",
      de: "Varianzrechner für Stichproben- und Grundgesamtheitsdaten. Berechnet Varianz, Standardabweichung, Mittelwert, Median, Modus und IQR sofort.",
      pt: "Calculadora de variância para dados de amostra e população. Calcula instantaneamente variância, desvio padrão, média, mediana, moda e IQR.",
      ru: "Калькулятор дисперсии для выборки и генеральной совокупности. Мгновенно вычисляет дисперсию, стандартное отклонение, среднее, медиану, моду и IQR."
    }
  },
  {
    id: "venn-diagram-calculator",
    category: "statistic",
    slugs: {
      en: "venn-diagram-calculator",
      "zh-CN": "weientu-jisuanqi-bingji-jiaoji-chaji",
      "zh-TW": "weien-tu-ji-suan-qi-bing-ji-jiao-ji-cha-ji",
      ja: "benzu-keisanki-wa-kyotsu-sa",
      ko: "ben-daieogeuraem-gyesangi-hapjiphab-gyojibhap-chajiphab",
      es: "calculadora-diagramas-venn-union-interseccion-diferencia",
      fr: "calculateur-diagrammes-venn-union-intersection-difference",
      de: "venn-diagramm-rechner-vereinigung-schnittmenge-differenz",
      pt: "calculadora-diagrama-venn-uniao-intersecao-diferenca",
      ru: "kalkulyator-diagramm-venna-obedinenie-peresechenie-raznost"
    },
    titles: {
      en: "Venn Diagram Calculator - Union, Intersection & Difference",
      "zh-CN": "维恩图计算器：并集、交集与差集",
      "zh-TW": "維恩圖計算器：聯集、交集與差集",
      ja: "ベン図計算機：和・共通・差",
      ko: "벤 다이어그램 계산기: 합집합·교집합·차집합",
      es: "Calculadora de diagramas de Venn: unión e intersección",
      fr: "Calculateur de diagrammes de Venn : union et intersection",
      de: "Venn-Diagramm-Rechner: Vereinigung und Schnittmenge",
      pt: "Calculadora de diagrama de Venn: união e interseção",
      ru: "Калькулятор диаграмм Венна: объединение и пересечение"
    },
    descriptions: {
      en: "Venn diagram calculator for 2 and 3 sets. Find union, intersection, and exclusive regions instantly — ideal for set theory, probability, and survey analysis.",
      "zh-CN": "维恩图计算器，支持 2 集合和 3 集合。快速求并集、交集与各独占区域，适用于集合论、概率和问卷分析。",
      "zh-TW": "維恩圖計算器，支援 2 集合與 3 集合。立即求出聯集、交集與各獨佔區域，適用於集合論、機率與問卷分析。",
      ja: "2集合と3集合のベン図をすばやく計算。和集合、共通部分、排他的領域を求め、集合論や確率に最適です。",
      ko: "2개와 3개 집합의 벤 다이어그램을 빠르게 계산합니다. 합집합, 교집합, 배타 영역을 찾아 집합론과 확률 분석에 유용합니다.",
      es: "Calculadora de diagramas de Venn para 2 y 3 conjuntos. Calcula al instante la unión, la intersección y las regiones exclusivas.",
      fr: "Calculateur de diagrammes de Venn pour 2 et 3 ensembles. Trouvez instantanément l’union, l’intersection et les régions exclusives.",
      de: "Venn-Diagramm-Rechner für 2 und 3 Mengen. Vereinigung, Schnittmenge und exklusive Bereiche sofort berechnen.",
      pt: "Calculadora de diagrama de Venn para 2 e 3 conjuntos. Encontre união, interseção e regiões exclusivas instantaneamente.",
      ru: "Калькулятор диаграмм Венна для 2 и 3 множеств. Мгновенно находите объединение, пересечение и эксклюзивные области."
    }
  },
  {
    id: "wald-test-calculator",
    category: "statistic",
    slugs: {
      en: "wald-test-calculator",
      "zh-CN": "wald-jianyan-ji-suanqi",
      "zh-TW": "wald-jianyan-ji-suanqi",
      ja: "wald-kentei-keisanki",
      ko: "wald-geomjeung-gyesangi",
      es: "calculadora-prueba-wald",
      fr: "calculatrice-test-wald",
      de: "wald-test-rechner",
      pt: "calculadora-teste-wald",
      ru: "kalkulyator-testa-valda"
    },
    titles: {
      en: "Wald Test Calculator - Statistical Significance",
      "zh-CN": "Wald检验计算器",
      "zh-TW": "Wald檢定計算器",
      ja: "Wald検定計算機",
      ko: "Wald 검정 계산기",
      es: "Calculadora de prueba de Wald",
      fr: "Calculateur du test de Wald",
      de: "Wald-Test-Rechner",
      pt: "Calculadora do teste de Wald",
      ru: "Калькулятор теста Вальда"
    },
    descriptions: {
      en: "Wald test calculator for statistical significance. Enter parameter estimate, standard error, and alpha level to get the Wald statistic, z-score, and p-value.",
      "zh-CN": "Wald检验计算器，用于统计显著性分析。输入参数估计、标准误和alpha，即可得到Wald统计量、z值和p值。",
      "zh-TW": "Wald檢定計算器，用於統計顯著性分析。輸入參數估計、標準誤和alpha，即可得到Wald統計量、z值和p值。",
      ja: "Wald検定計算機で統計的有意性を判定。推定値、標準誤差、alphaを入力するとWald統計量、z値、p値を算出します。",
      ko: "Wald 검정 계산기로 통계적 유의성을 판단하세요. 추정치, 표준오차, alpha를 입력하면 Wald 통계량, z값, p값을 계산합니다.",
      es: "Calculadora de prueba de Wald para significancia estadística. Ingresa la estimación, el error estándar y alpha para obtener W, z y p.",
      fr: "Calculateur du test de Wald pour la significativité statistique. Entrez l’estimation, l’erreur standard et alpha pour obtenir W, z et p.",
      de: "Wald-Test-Rechner für statistische Signifikanz. Geben Sie Schätzwert, Standardfehler und Alpha ein, um W, z und p zu erhalten.",
      pt: "Calculadora do teste de Wald para significância estatística. Informe a estimativa, o erro padrão e alpha para obter W, z e p.",
      ru: "Калькулятор теста Вальда для статистической значимости. Введите оценку, стандартную ошибку и alpha, чтобы получить W, z и p."
    }
  },
  {
    id: "weibull-distribution-calculator",
    category: "statistic",
    slugs: {
      en: "weibull-distribution-calculator",
      "zh-CN": "weibull-fenbu-ji-suanqi",
      "zh-TW": "weibull-fenbu-ji-suanqi",
      ja: "weibull-bunpu-keisanki",
      ko: "weibull-bunpo-gyesan-gi",
      es: "calculadora-distribucion-weibull",
      fr: "calculateur-distribution-weibull",
      de: "weibull-verteilung-rechner",
      pt: "calculadora-distribuicao-weibull",
      ru: "raschet-weibull-raspredeleniya"
    },
    titles: {
      en: "Weibull Distribution Calculator - PDF, CDF & Reliability",
      "zh-CN": "Weibull分布计算器",
      "zh-TW": "Weibull分布計算器",
      ja: "Weibull分布計算ツール",
      ko: "Weibull 분포 계산기",
      es: "Calculadora de distribución de Weibull",
      fr: "Calculateur de distribution de Weibull",
      de: "Weibull-Verteilungsrechner",
      pt: "Calculadora da distribuição de Weibull",
      ru: "Калькулятор распределения Вейбулла"
    },
    descriptions: {
      en: "Weibull distribution calculator for reliability analysis. Compute PDF, CDF, hazard rate, mean, median, and variance from shape and scale parameters instantly.",
      "zh-CN": "用于可靠性分析的Weibull分布计算器。可根据形状参数和尺度参数即时计算PDF、CDF、危险率、均值、中位数和方差。",
      "zh-TW": "用於可靠度分析的Weibull分布計算器。可依形狀與尺度參數即時計算PDF、CDF、危險率、平均數、中位數與變異數。",
      ja: "信頼性解析向けのWeibull分布計算ツール。形状・尺度パラメータからPDF、CDF、危険率、平均、中央値、分散を即時計算。",
      ko: "신뢰성 분석용 Weibull 분포 계산기. 형태와 척도 매개변수로 PDF, CDF, 위험률, 평균, 중앙값, 분산을 즉시 계산합니다.",
      es: "Calculadora de distribución de Weibull para análisis de confiabilidad. Calcula PDF, CDF, tasa de riesgo, media, mediana y varianza al instante.",
      fr: "Calculateur de distribution de Weibull pour l'analyse de fiabilité. Calcule instantanément la PDF, la CDF, le taux de risque, la moyenne, la médiane et la variance.",
      de: "Weibull-Verteilungsrechner für Zuverlässigkeitsanalysen. Berechnet PDF, CDF, Ausfallrate, Mittelwert, Median und Varianz sofort.",
      pt: "Calculadora da distribuição de Weibull para análise de confiabilidade. Calcule PDF, CDF, taxa de risco, média, mediana e variância instantaneamente.",
      ru: "Калькулятор распределения Вейбулла для анализа надежности. Мгновенно вычисляет PDF, CDF, интенсивность отказов, среднее, медиану и дисперсию."
    }
  },
  {
    id: "weighted-mean-calculator",
    category: "statistic",
    slugs: {
      en: "weighted-mean-calculator",
      "zh-CN": "jia-quan-ping-jun-shu-ji-suan-qi",
      "zh-TW": "jia-quan-ping-jun-shu-ji-suan-qi",
      ja: "kajuu-heikin-keisanki",
      ko: "gajung-pyeonggyun-gyesangi",
      es: "calculadora-media-ponderada",
      fr: "calculatrice-moyenne-ponderee",
      de: "gewichteter-durchschnitt-rechner",
      pt: "calculadora-media-ponderada",
      ru: "kalkulyator-vzveshennogo-srednego"
    },
    titles: {
      en: "Weighted Mean Calculator - Calculate Weighted Average",
      "zh-CN": "加权平均数计算器",
      "zh-TW": "加權平均數計算器",
      ja: "加重平均計算ツール",
      ko: "가중평균 계산기",
      es: "Calculadora de media ponderada",
      fr: "Calculatrice de moyenne pondérée",
      de: "Gewichteter Durchschnittsrechner",
      pt: "Calculadora de média ponderada",
      ru: "Калькулятор взвешенного среднего"
    },
    descriptions: {
      en: "Weighted mean calculator for grades, finance, and surveys. Enter values and weights to compute the weighted average — supports any number of data points.",
      "zh-CN": "加权平均数计算器，适用于成绩、理财和问卷。输入数值与权重即可计算加权平均，支持任意数量的数据点。",
      "zh-TW": "加權平均數計算器，適用於成績、理財與問卷。輸入數值與權重即可計算加權平均，支援任意數量資料點。",
      ja: "成績、資産運用、アンケートに使える加重平均計算ツール。値と重みを入力して、任意の件数の加重平均を計算します。",
      ko: "성적, 재무, 설문에 유용한 가중평균 계산기입니다. 값과 가중치를 입력해任意 개수의 가중평균을 계산하세요.",
      es: "Calculadora de media ponderada para notas, finanzas y encuestas. Ingresa valores y pesos para calcular el promedio ponderado.",
      fr: "Calculatrice de moyenne pondérée pour les notes, la finance et les sondages. Saisissez valeurs et poids pour calculer la moyenne.",
      de: "Gewichteter Durchschnittsrechner für Noten, Finanzen und Umfragen. Werte und Gewichte eingeben und den gewichteten Mittelwert berechnen.",
      pt: "Calculadora de média ponderada para notas, finanças e pesquisas. Insira valores e pesos para calcular a média ponderada.",
      ru: "Калькулятор взвешенного среднего для оценок, финансов и опросов. Введите значения и веса, чтобы вычислить средневзвешенное."
    }
  },
  {
    id: "smp-x-distribution-calculator",
    category: "statistic",
    slugs: {
      en: "smp-x-distribution-calculator",
      "zh-CN": "yangben-junzhi-chouyang-fenbu-jisuanqi",
      "zh-TW": "yangben-junzhi-chouyang-fenbu-jisuanqi",
      ja: "sampuringu-bunpu-heikin-keisanki",
      ko: "pyobon-pyeonggyun-bunpo-gyesangi",
      es: "distribucion-muestral-media-calculadora",
      fr: "distribution-echantillonnale-moyenne-calculatrice",
      de: "stichprobenverteilung-mittelwert-rechner",
      pt: "distribuicao-amostral-media-calculadora",
      ru: "raspredelenie-vyborochnogo-srednego-kalkulyator"
    },
    titles: {
      en: "Sampling Distribution of Sample Mean Calculator",
      "zh-CN": "样本均值抽样分布计算器",
      "zh-TW": "樣本平均抽樣分配計算機",
      ja: "標本平均のサンプリング分布計算機",
      ko: "표본평균의 표본분포 계산기",
      es: "Calculadora de distribución muestral de la media",
      fr: "Calculatrice de la distribution de la moyenne",
      de: "Rechner für die Stichprobenverteilung des Mittelwerts",
      pt: "Calculadora da distribuição amostral da média",
      ru: "Калькулятор распределения выборочного среднего"
    },
    descriptions: {
      en: "Sampling distribution of the sample mean calculator: find SE, z-score, and probability (less than, greater than, between) using the Central Limit Theorem.",
      "zh-CN": "样本均值抽样分布计算器：用中心极限定理快速求标准误、z 分数和概率（小于、大于、区间）。",
      "zh-TW": "樣本平均抽樣分配計算機：用中央極限定理快速求標準誤、z 分數與機率（小於、大於、區間）。",
      ja: "中心極限定理で標本平均のSE、zスコア、確率（未満・超過・範囲）を計算します。",
      ko: "중심극한정리로 표본평균의 SE, z점수, 확률(미만·초과·구간)을 계산합니다.",
      es: "Calcula SE, z y probabilidad (menor, mayor o entre) de la media muestral con el teorema central del límite.",
      fr: "Calculez SE, score z et probabilité (inférieure, supérieure ou entre) de la moyenne d’échantillon avec le TCL.",
      de: "Berechnen Sie mit dem zentralen Grenzwertsatz SE, z-Wert und Wahrscheinlichkeit (kleiner, größer, dazwischen) für den Stichprobenmittelwert.",
      pt: "Calcule SE, escore z e probabilidade (menor, maior ou entre) da média amostral com o Teorema Central do Limite.",
      ru: "По ЦПТ вычисляет SE, z-оценку и вероятность (меньше, больше, между) для выборочного среднего."
    }
  },
  {
    id: "spearmans-correlation-calculator",
    category: "statistic",
    slugs: {
      en: "spearmans-correlation-calculator",
      "zh-CN": "siman-dengji-xiangguan-jisuanqi",
      "zh-TW": "siman-dengji-xiangguan-jisuanqi",
      ja: "supiaman-juni-sokan-keisanki",
      ko: "seupieomeon-sunwi-sanggwan-gyesangi",
      es: "calculadora-correlacion-spearman",
      fr: "calculateur-correlation-spearman",
      de: "spearman-korrelation-rechner",
      pt: "calculadora-correlacao-spearman",
      ru: "kalkulyator-korrelyacii-spirmena"
    },
    titles: {
      en: "Spearman's Correlation Calculator - Rank Correlation",
      "zh-CN": "斯皮尔曼相关系数计算器 - 等级相关",
      "zh-TW": "斯皮爾曼相關係數計算器 - 等級相關",
      ja: "スピアマン相関係数計算機 - 順位相関",
      ko: "스피어만 상관계수 계산기 - 순위 상관",
      es: "Calculadora de correlación de Spearman",
      fr: "Calculateur de corrélation de Spearman",
      de: "Spearman-Korrelation Rechner",
      pt: "Calculadora de correlação de Spearman",
      ru: "Калькулятор корреляции Спирмена"
    },
    descriptions: {
      en: "Spearman's rank correlation calculator: compute ρ for two datasets. Measures monotonic relationships without normality requirements — ideal for ordinal data.",
      "zh-CN": "斯皮尔曼等级相关计算器：为两组数据计算 ρ。无需正态性假设，衡量单调关系，适合有序数据。",
      "zh-TW": "斯皮爾曼等級相關計算器：為兩組資料計算 ρ。無需常態性假設，衡量單調關係，適合序位資料。",
      ja: "スピアマンの順位相関を計算し、2つのデータセットのρを求めます。正規性を仮定せず単調関係を測定でき、順序データに最適です。",
      ko: "스피어만 순위 상관 계산기: 두 데이터셋의 ρ를 계산합니다. 정규성 가정 없이 단조 관계를 측정해 순서형 데이터에 적합합니다.",
      es: "Calcula la correlación de rangos de Spearman ρ para dos conjuntos de datos. Mide relaciones monótonas sin exigir normalidad, ideal para datos ordinales.",
      fr: "Calculez la corrélation de rangs de Spearman ρ pour deux jeux de données. Mesure les relations monotones sans normalité, idéal pour données ordinales.",
      de: "Berechnen Sie Spearmans Rangkorrelation ρ für zwei Datensätze. Misst monotone Zusammenhänge ohne Normalverteilung, ideal für ordinale Daten.",
      pt: "Calcule a correlação de postos de Spearman ρ para dois conjuntos de dados. Mede relações monotônicas sem exigir normalidade, ideal para dados ordinais.",
      ru: "Калькулятор ранговой корреляции Спирмена: вычисляет ρ для двух наборов данных. Оценивает монотонные связи без требования нормальности."
    }
  },
  {
    id: "standard-deviation-index-calculator",
    category: "statistic",
    slugs: {
      en: "standard-deviation-index-calculator",
      "zh-CN": "biaozhun-chaixu-jisuanqi",
      "zh-TW": "biaozhun-chaixu-jisuanqi",
      ja: "hyojun-hensa-keisanki",
      ko: "pyojun-pyeoncha-gyesangi",
      es: "calculadora-desviacion-estandar",
      fr: "calculateur-ecart-type",
      de: "standardabweichung-rechner",
      pt: "calculadora-desvio-padrao",
      ru: "kalkulyator-standartnogo-otkloneniya"
    },
    titles: {
      en: "Standard Deviation Calculator - Sample & Population SD",
      "zh-CN": "标准差计算器 - 样本与总体",
      "zh-TW": "標準差計算器 - 樣本與總體",
      ja: "標準偏差計算機 - 標本と母集団",
      ko: "표준편차 계산기 - 표본과 모집단",
      es: "Calculadora de desviación estándar - Muestra y población",
      fr: "Calculateur d'écart type - Échantillon et population",
      de: "Standardabweichung-Rechner - Stichprobe und Grundgesamtheit",
      pt: "Calculadora de desvio padrão - Amostra e população",
      ru: "Калькулятор стандартного отклонения - выборка и совокупность"
    },
    descriptions: {
      en: "Standard deviation calculator: compute sample SD, population SD, mean, variance, and CV from any dataset. Enter numbers and get results instantly.",
      "zh-CN": "标准差计算器：从任意数据集中计算样本标准差、总体标准差、均值、方差和变异系数，输入数字即可立即得到结果。",
      "zh-TW": "標準差計算器：從任意資料集計算樣本標準差、總體標準差、平均數、變異數與變異係數，輸入數字即可立即取得結果。",
      ja: "標準偏差計算機：任意のデータセットから標本標準偏差・母標準偏差・平均・分散・変動係数を計算し、入力後すぐ結果を表示します。",
      ko: "표준편차 계산기: 어떤 데이터셋이든 표본·모집단 표준편차, 평균, 분산, 변동계수를 계산하고 숫자를 넣으면 바로 결과를 보여줍니다.",
      es: "Calculadora de desviación estándar: calcula desviación estándar muestral y poblacional, media, varianza y CV de cualquier conjunto de datos al instante.",
      fr: "Calculateur d'écart type : calculez l’écart type d’échantillon et de population, la moyenne, la variance et le coefficient de variation de tout jeu de données.",
      de: "Standardabweichung-Rechner: Berechnet Stichproben- und Populations-Standardabweichung, Mittelwert, Varianz und CV aus jedem Datensatz sofort.",
      pt: "Calculadora de desvio padrão: calcule desvio padrão amostral e populacional, média, variância e CV de qualquer conjunto de dados na hora.",
      ru: "Калькулятор стандартного отклонения: рассчитывает выборочное и генеральное стандартное отклонение, среднее, дисперсию и CV по любому набору данных."
    }
  },
  {
    id: "standard-deviation-of-sample-mean-calculator",
    category: "statistic",
    slugs: {
      en: "standard-deviation-of-sample-mean-calculator",
      "zh-CN": "yangben-junzhi-biaozhunwucha-jisuanqi",
      "zh-TW": "yangben-junzhi-biaozhunwucha-jisuanqi",
      ja: "hyohon-heikin-hyojun-gosa-keisanki",
      ko: "pyobon-pyeonggyun-pyojun-ocha-gyesangi",
      es: "calculadora-error-estandar-media",
      fr: "calculateur-erreur-standard-moyenne",
      de: "standardfehler-mittelwert-rechner",
      pt: "calculadora-erro-padrao-media",
      ru: "kalkulyator-standartnoy-oshibki-srednego"
    },
    titles: {
      en: "Standard Deviation of Sample Mean Calculator (SEM)",
      "zh-CN": "样本均值标准误计算器",
      "zh-TW": "樣本均值標準誤計算器",
      ja: "標本平均の標準誤差計算機",
      ko: "표본평균 표준오차 계산기",
      es: "Calculadora de error estándar de la media",
      fr: "Calculateur d’erreur standard de la moyenne",
      de: "Standardfehler des Mittelwerts Rechner",
      pt: "Calculadora de erro padrão da média",
      ru: "Калькулятор стандартной ошибки среднего"
    },
    descriptions: {
      en: "Standard deviation of sample mean (SEM) calculator: compute SEM, mean, variance, and SD from raw data. Enter comma-separated numbers to get results instantly.",
      "zh-CN": "样本均值标准误（SEM）计算器：从原始数据计算SEM、均值、方差和标准差。输入逗号分隔的数字即可立即查看结果。",
      "zh-TW": "樣本均值標準誤（SEM）計算器：從原始資料計算SEM、平均數、變異數和標準差。輸入以逗號分隔的數字即可立即查看結果。",
      ja: "標本平均の標準誤差（SEM）計算機。生データからSEM、平均、分散、標準偏差を計算。カンマ区切りの数値を入力するとすぐ結果が出ます。",
      ko: "표본평균의 표준오차(SEM) 계산기: 원시 데이터로 SEM, 평균, 분산, 표준편차를 계산합니다. 쉼표로 구분한 숫자를 입력하세요.",
      es: "Calculadora del error estándar de la media (SEM): calcula SEM, media, varianza y desviación estándar a partir de datos en bruto.",
      fr: "Calculateur de l’erreur standard de la moyenne (SEM) : calculez SEM, moyenne, variance et écart-type à partir de données brutes.",
      de: "Standardfehler-des-Mittelwerts-Rechner: SEM, Mittelwert, Varianz und Standardabweichung aus Rohdaten berechnen.",
      pt: "Calculadora do erro padrão da média (SEM): calcule SEM, média, variância e desvio padrão a partir de dados brutos.",
      ru: "Калькулятор стандартной ошибки среднего (SEM): рассчитывает SEM, среднее, дисперсию и стандартное отклонение по исходным данным."
    }
  },
  {
    id: "standard-error-calculator",
    category: "statistic",
    slugs: {
      en: "standard-error-calculator",
      "zh-CN": "biaozhun-wucha-jisuanqi",
      "zh-TW": "biaozhun-wucha-jisuanqi",
      ja: "hyojun-gosa-keisanki",
      ko: "bunjun-ochae-gyesan-gi",
      es: "calculadora-error-estandar",
      fr: "calculateur-erreur-standard",
      de: "standardfehler-rechner",
      pt: "calculadora-erro-padrao",
      ru: "kalkulyator-standartnoy-oshibki"
    },
    titles: {
      en: "Standard Error Calculator - SE from Raw Data or Summary",
      "zh-CN": "标准误差计算器",
      "zh-TW": "標準誤差計算機",
      ja: "標準誤差計算機",
      ko: "표준오차 계산기",
      es: "Calculadora de error estándar",
      fr: "Calculateur d'erreur standard",
      de: "Standardfehler-Rechner",
      pt: "Calculadora de erro padrão",
      ru: "Калькулятор стандартной ошибки"
    },
    descriptions: {
      en: "Standard error calculator: compute SE from raw data or summary statistics. Includes confidence intervals at 90%, 95%, and 99% — free and accurate.",
      "zh-CN": "标准误差计算器：可根据原始数据或汇总统计计算SE，并包含90%、95%和99%置信区间，免费且准确。",
      "zh-TW": "標準誤差計算機：可依原始資料或彙總統計計算 SE，並包含 90%、95% 與 99% 信賴區間，免費又準確。",
      ja: "標準誤差計算機：元データまたは要約統計からSEを算出。90%、95%、99%の信頼区間つきで無料かつ正確です。",
      ko: "표준오차 계산기: 원자료 또는 요약 통계에서 SE를 계산합니다. 90%, 95%, 99% 신뢰구간을 포함하며 무료로 정확합니다.",
      es: "Calculadora de error estándar: calcula el EE desde datos crudos o estadísticas resumidas. Incluye intervalos de confianza del 90%, 95% y 99%.",
      fr: "Calculateur d'erreur standard : calcule l'ES à partir de données brutes ou de statistiques résumées. IC à 90 %, 95 % et 99 % inclus.",
      de: "Standardfehler-Rechner: Berechne den SE aus Rohdaten oder zusammengefassten Statistiken. Mit 90-, 95- und 99-%-Konfidenzintervallen.",
      pt: "Calculadora de erro padrão: calcule o EP a partir de dados brutos ou estatísticas resumidas. Inclui ICs de 90%, 95% e 99%.",
      ru: "Калькулятор стандартной ошибки: вычисляйте SE по сырым данным или сводной статистике. Включает ДИ 90%, 95% и 99%."
    }
  },
  {
    id: "relative-standard-deviation-calculator",
    category: "statistic",
    slugs: {
      en: "relative-standard-deviation-calculator",
      "zh-CN": "xiangdui-biaozhun-piancha-jisuanqi-rsd-cv",
      "zh-TW": "xiangdui-biaozhun-piancha-jisuanqi-rsd-cv",
      ja: "soutai-hyobun-hensa-keisanki-rsd-cv",
      ko: "sangdae-pyojun-pyeoncha-keisanki-rsd-cv",
      es: "calculadora-desviacion-estandar-relativa-rsd-cv",
      fr: "ecart-type-relatif-rsd-cv",
      de: "relative-standardabweichung-rsd-cv",
      pt: "calculadora-desvio-padrao-relativo-rsd-cv",
      ru: "kalkulyator-otnositelnogo-standartnogo-otkloneniya-rsd-cv"
    },
    titles: {
      en: "Relative Standard Deviation Calculator - RSD & CV",
      "zh-CN": "相对标准偏差计算器 - RSD 与 CV",
      "zh-TW": "相對標準偏差計算器 - RSD 與 CV",
      ja: "相対標準偏差計算ツール - RSD と CV",
      ko: "상대 표준 편차 계산기 - RSD 및 CV",
      es: "Calculadora de desviación estándar relativa - RSD y CV",
      fr: "Calculatrice d'écart-type relatif - RSD et CV",
      de: "Relative Standardabweichung Rechner - RSD und CV",
      pt: "Calculadora de desvio-padrão relativo - RSD e CV",
      ru: "Калькулятор RSD и CV"
    },
    descriptions: {
      en: "Calculate Relative Standard Deviation (RSD) and Coefficient of Variation (CV) instantly. Free statistical analysis tool for data dispersion and precision.",
      "zh-CN": "即时计算相对标准偏差（RSD）和变异系数（CV）。用于数据离散度和精密度分析的免费统计工具。",
      "zh-TW": "立即計算相對標準偏差（RSD）與變異係數（CV）。免費統計分析工具，用於資料離散度與精密度。",
      ja: "相対標準偏差（RSD）と変動係数（CV）を瞬時に計算。データのばらつきと精度を調べる無料の統計ツール。",
      ko: "상대 표준 편차(RSD)와 변동 계수(CV)를 즉시 계산합니다. 데이터 분산과 정밀도를 분석하는 무료 통계 도구입니다.",
      es: "Calcula al instante la desviación estándar relativa (RSD) y el coeficiente de variación (CV). Herramienta estadística gratis para dispersión y precisión.",
      fr: "Calculez instantanément l'écart-type relatif (RSD) et le coefficient de variation (CV). Outil statistique gratuit pour la dispersion et la précision.",
      de: "Berechnen Sie sofort die relative Standardabweichung (RSD) und den Variationskoeffizienten (CV). Kostenloses Statistik-Tool für Streuung und Präzision.",
      pt: "Calcule instantaneamente o desvio-padrão relativo (RSD) e o coeficiente de variação (CV). Ferramenta estatística grátis para dispersão e precisão.",
      ru: "Мгновенно вычисляйте относительное стандартное отклонение (RSD) и коэффициент вариации (CV). Бесплатный статистический инструмент для разброса и точности."
    }
  },
  {
    id: "repeated-measures-anova-calculator",
    category: "statistic",
    slugs: {
      en: "repeated-measures-anova-calculator",
      "zh-CN": "repeated-measures-anova-calculator",
      "zh-TW": "chongfu-liangce-bianyi-fenxi-ji-suanqi",
      ja: "hanpuku-sokutei-bunseki-keisanki",
      ko: "bokhab-seongjoga-seok-gye-san-gi",
      es: "calculadora-anova-medidas-repetidas",
      fr: "calculateur-anova-mesures-repetees",
      de: "anova-wiederholte-messungen-rechner",
      pt: "calculadora-anova-medidas-repetidas",
      ru: "kalkulyator-dispersionnogo-analiza-povtornyh-izmereniy"
    },
    titles: {
      en: "Repeated Measures ANOVA Calculator - η² and F",
      "zh-CN": "重复测量方差分析计算器 - F值与效应量",
      "zh-TW": "重複量測變異數分析計算器 - F值與效果量",
      ja: "反復測定分散分析計算機 - F値と効果量",
      ko: "반복측정 분산분석 계산기 - F값과 효과크기",
      es: "Calculadora ANOVA de medidas repetidas - F y efecto",
      fr: "Calculateur d’ANOVA à mesures répétées - F et effet",
      de: "ANOVA-Rechner für Messwiederholungen - F und Effekt",
      pt: "Calculadora ANOVA de medidas repetidas - F e efeito",
      ru: "ANOVA для повторных измерений - F и эффект"
    },
    descriptions: {
      en: "Perform one-way repeated measures ANOVA analysis. Enter subject data to get F-statistic, effect size (eta squared), and complete ANOVA table instantly.",
      "zh-CN": "进行单因素重复测量方差分析，输入被试数据即可立即得到 F 统计量、效应量（η²）和完整 ANOVA 表。",
      "zh-TW": "進行單因子重複量測變異數分析，輸入受試者資料即可立即取得 F 統計量、效果量（η²）與完整 ANOVA 表。",
      ja: "単一要因の反復測定分散分析を実行し、被験者データからF値、効果量（η²）、完全なANOVA表を即座に取得できます。",
      ko: "단일 요인 반복측정 분산분석을 수행해 F통계량, 효과크기(η²), 전체 ANOVA 표를 즉시 확인하세요.",
      es: "Realiza un ANOVA de medidas repetidas de un factor y obtiene al instante el estadístico F, el tamaño del efecto (η²) y la tabla ANOVA completa.",
      fr: "Réalisez une ANOVA à mesures répétées à un facteur et obtenez instantanément la statistique F, la taille d’effet (η²) et le tableau ANOVA complet.",
      de: "Führen Sie eine einfaktorielle ANOVA mit Messwiederholungen durch und erhalten Sie sofort F-Wert, Effektgröße (η²) und die vollständige ANOVA-Tabelle.",
      pt: "Realize uma ANOVA de medidas repetidas de um fator e obtenha instantaneamente o estatístico F, o tamanho do efeito (η²) e a tabela ANOVA completa.",
      ru: "Выполните однофакторный дисперсионный анализ повторных измерений и мгновенно получите F-статистику, размер эффекта (η²) и полную ANOVA-таблицу."
    }
  },
  {
    id: "residual-calculator",
    category: "statistic",
    slugs: {
      en: "residual-calculator",
      "zh-CN": "cancha-jisuanqi-xianxing-huigui",
      "zh-TW": "cancha-jisuanqi-xianxing-huigui",
      ja: "zansa-keisanki-senkei-kairo-zansa",
      ko: "jansa-gyesangi-seonhyeong-hoegwi-jansa",
      es: "calculadora-residuos-regresion-lineal",
      fr: "calculateur-residus-regression-lineaire",
      de: "residuen-rechner-lineare-regression",
      pt: "calculadora-residuos-regressao-linear",
      ru: "kalkulyator-ostatkov-lineynaya-regressiya"
    },
    titles: {
      en: "Residual Calculator - Linear Regression Residuals Online",
      "zh-CN": "残差计算器 - 线性回归残差",
      "zh-TW": "殘差計算器 - 線性迴歸殘差",
      ja: "残差計算機 - 線形回帰残差",
      ko: "잔차 계산기 - 선형 회귀 잔차",
      es: "Calculadora de residuos - regresión lineal",
      fr: "Calculateur de résidus - régression linéaire",
      de: "Residuen-Rechner - lineare Regression",
      pt: "Calculadora de resíduos - regressão linear",
      ru: "Калькулятор остатков - линейная регрессия"
    },
    descriptions: {
      en: "Calculate linear regression residuals instantly. Enter X and Y values to get the regression line, predicted values, residuals, and R-squared for any dataset.",
      "zh-CN": "立即计算线性回归残差。输入 X 和 Y 值，获取任意数据集的回归直线、预测值、残差和 R²。",
      "zh-TW": "立即計算線性迴歸殘差。輸入 X 和 Y 值，即可取得任意資料集的迴歸直線、預測值、殘差和 R²。",
      ja: "線形回帰の残差を即時計算。X と Y の値を入力すると、回帰直線、予測値、残差、R² を確認できます。",
      ko: "선형 회귀 잔차를 즉시 계산합니다. X와 Y 값을 입력하면 회귀선, 예측값, 잔차, R²를 확인할 수 있습니다.",
      es: "Calcula al instante los residuos de una regresión lineal. Ingresa valores X e Y y obtén la recta, predicciones, residuos y R².",
      fr: "Calculez instantanément les résidus d'une régression linéaire. Saisissez X et Y pour obtenir la droite, les valeurs prédites, les résidus et R².",
      de: "Berechnen Sie Residuen der linearen Regression sofort. Geben Sie X- und Y-Werte ein und erhalten Sie Regressionsgerade, Prognosen, Residuen und R².",
      pt: "Calcule resíduos de regressão linear na hora. Informe os valores de X e Y para obter a reta, valores previstos, resíduos e R².",
      ru: "Мгновенно рассчитывайте остатки линейной регрессии. Введите значения X и Y, чтобы получить линию регрессии, прогнозы, остатки и R²."
    }
  },
  {
    id: "risk-calculator",
    category: "statistic",
    slugs: {
      en: "risk-calculator",
      "zh-CN": "fengxian-jisuanqi",
      "zh-TW": "fengxian-jisuanqi",
      ja: "risuku-keisanki",
      ko: "wiheom-gyesangi",
      es: "calculadora-riesgo",
      fr: "calculateur-risque",
      de: "risikorechner",
      pt: "calculadora-risco",
      ru: "kalkulyator-riska"
    },
    titles: {
      en: "Risk Calculator - Relative Risk, Absolute Risk & NNT",
      "zh-CN": "风险计算器 - 相对风险、绝对风险与 NNT",
      "zh-TW": "風險計算器 - 相對風險、絕對風險與 NNT",
      ja: "リスク計算機 - 相対リスク、絶対リスクとNNT",
      ko: "위험 계산기 - 상대위험, 절대위험과 NNT",
      es: "Calculadora de riesgo - Riesgo relativo, absoluto y NNT",
      fr: "Calculateur de risque - Risque relatif, absolu et NNT",
      de: "Risikorechner - Relatives, absolutes Risiko und NNT",
      pt: "Calculadora de risco - Risco relativo, absoluto e NNT",
      ru: "Калькулятор риска - Относительный, абсолютный риск и NNT"
    },
    descriptions: {
      en: "Calculate relative risk (RR), absolute risk reduction (ARR), and number needed to treat (NNT). Free online risk calculator for clinical trials and epidemiology.",
      "zh-CN": "计算相对风险（RR）、绝对风险降低（ARR）和需治疗人数（NNT）。面向临床试验和流行病学的免费在线风险计算器。",
      "zh-TW": "計算相對風險（RR）、絕對風險降低（ARR）與需治療人數（NNT）。適用於臨床試驗與流行病學的免費線上風險計算器。",
      ja: "相対リスク（RR）、絶対リスク減少（ARR）、治療必要数（NNT）を計算。臨床試験と疫学向けの無料オンラインリスク計算機。",
      ko: "상대위험(RR), 절대위험감소(ARR), 치료 필요수(NNT)를 계산합니다. 임상시험과 역학용 무료 온라인 위험 계산기입니다.",
      es: "Calcula el riesgo relativo (RR), la reducción absoluta del riesgo (ARR) y el número necesario a tratar (NNT). Calculadora gratuita para ensayos clínicos y epidemiología.",
      fr: "Calculez le risque relatif (RR), la réduction absolue du risque (ARR) et le nombre de sujets à traiter (NNT). Calculateur gratuit pour essais cliniques et épidémiologie.",
      de: "Berechnen Sie relatives Risiko (RR), absolute Risikoreduktion (ARR) und Number Needed to Treat (NNT). Kostenloser Online-Risikorechner für klinische Studien und Epidemiologie.",
      pt: "Calcule o risco relativo (RR), a redução absoluta do risco (ARR) e o número necessário para tratar (NNT). Calculadora gratuita para ensaios clínicos e epidemiologia.",
      ru: "Рассчитайте относительный риск (RR), абсолютное снижение риска (ARR) и число пациентов, которых нужно лечить (NNT). Бесплатный онлайн-калькулятор риска для клинических исследований и эпидемиологии."
    }
  },
  {
    id: "roc-curve-calculator",
    category: "statistic",
    slugs: {
      en: "roc-curve-calculator",
      "zh-CN": "roc-quxian-yauc-jisuanqi",
      "zh-TW": "roc-quxian-yauc-ji-suan-qi",
      ja: "roc-kyokusen-auc-keisanki",
      ko: "roc-gwiseon-auc-gyesan-gi",
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
      ja: "ROC曲線とAUC計算器",
      ko: "ROC 곡선과 AUC 계산기",
      es: "Curva ROC y calculadora AUC",
      fr: "Courbe ROC et calculateur AUC",
      de: "ROC-Kurve und AUC-Rechner",
      pt: "Curva ROC e calculadora AUC",
      ru: "ROC-кривая и калькулятор AUC"
    },
    descriptions: {
      en: "Calculate AUC and plot ROC curves for binary classifiers. Input prediction scores and true labels to get sensitivity, specificity, and optimal threshold.",
      "zh-CN": "计算二分类器的AUC并绘制ROC曲线，输入预测分数和真实标签即可得到灵敏度、特异度和最佳阈值。",
      "zh-TW": "計算二元分類器的AUC並繪製ROC曲線，輸入預測分數和真實標籤即可得到靈敏度、特異度與最佳閾值。",
      ja: "二値分類器のAUCを計算しROC曲線を描画します。予測スコアと真のラベルを入力して、感度・特異度・最適しきい値を取得します。",
      ko: "이진 분류기의 AUC를 계산하고 ROC 곡선을 그립니다. 예측 점수와 실제 레이블을 입력해 민감도, 특이도, 최적 임계값을 확인하세요.",
      es: "Calcula el AUC y grafica curvas ROC para clasificadores binarios. Ingresa puntuaciones y etiquetas reales para obtener sensibilidad, especificidad y umbral óptimo.",
      fr: "Calculez l’AUC et tracez des courbes ROC pour des classifieurs binaires. Saisissez les scores de prédiction et les étiquettes réelles pour obtenir sensibilité, spécificité et seuil optimal.",
      de: "Berechnen Sie AUC und zeichnen Sie ROC-Kurven für binäre Klassifikatoren. Geben Sie Vorhersagescores und echte Labels ein, um Sensitivität, Spezifität und optimalen Schwellenwert zu erhalten.",
      pt: "Calcule AUC e plote curvas ROC para classificadores binários. Insira escores de previsão e rótulos verdadeiros para obter sensibilidade, especificidade e limiar ideal.",
      ru: "Рассчитайте AUC и постройте ROC-кривые для бинарных классификаторов. Введите прогнозные оценки и истинные метки, чтобы получить чувствительность, специфичность и оптимальный порог."
    }
  },
  {
    id: "roulette-payout-calculator",
    category: "statistic",
    slugs: {
      en: "roulette-payout-calculator",
      "zh-CN": "luo-pan-zhu-chu-fu-ji-suan-qi",
      "zh-TW": "luo-pan-zhu-chu-fu-ji-suan-qi",
      ja: "rupan-haikyuu-keisanki",
      ko: "rollet-peiaut-gyesangi",
      es: "calculadora-pagos-ruleta",
      fr: "calculateur-gains-roulette",
      de: "roulette-auszahlung-rechner",
      pt: "calculadora-pagamentos-roleta",
      ru: "ruletka-vyplaty-kalkulyator"
    },
    titles: {
      en: "Roulette Payout Calculator - Bet Winnings & Odds",
      "zh-CN": "轮盘下注赔付计算器",
      "zh-TW": "輪盤下注賠付計算器",
      ja: "ルーレット配当計算機",
      ko: "룰렛 배당 계산기",
      es: "Calculadora de pagos de ruleta",
      fr: "Calculateur de gains de roulette",
      de: "Roulette-Auszahlungsrechner",
      pt: "Calculadora de pagamentos da roleta",
      ru: "Калькулятор выплат рулетки"
    },
    descriptions: {
      en: "Roulette payout calculator for American and European wheels. Enter bet type and wager to get net winnings, total payout, payout odds, and win probability.",
      "zh-CN": "美式与欧式轮盘赔付计算器。输入下注类型和金额，即可查看净赢利、总赔付、赔付赔率和中奖概率。",
      "zh-TW": "美式與歐式輪盤賠付計算器。輸入下注類型和金額，即可查看淨贏利、總賠付、賠付賠率和中獎機率。",
      ja: "米国式とヨーロッパ式のルーレット配当計算機。ベット種類と金額を入力すると、純利益、総配当、配当倍率、勝率を確認できます。",
      ko: "미국식과 유럽식 룰렛 배당 계산기입니다. 베팅 유형과 금액을 입력하면 순이익, 총 배당, 배당 배수, 승률을 확인할 수 있습니다.",
      es: "Calculadora de pagos de ruleta para ruedas americanas y europeas. Ingresa el tipo de apuesta y el monto para ver ganancia neta, pago total y probabilidad.",
      fr: "Calculateur de gains de roulette pour roues américaines et européennes. Saisissez le type de pari et la mise pour voir le gain net, le gain total et la probabilité.",
      de: "Roulette-Auszahlungsrechner für amerikanische und europäische Kessel. Einsatzart und Betrag eingeben, um Nettogewinn, Gesamtauszahlung und Gewinnchance zu sehen.",
      pt: "Calculadora de pagamentos da roleta para rodas americanas e europeias. Informe o tipo de aposta e o valor para ver ganho líquido, pagamento total e probabilidade.",
      ru: "Калькулятор выплат рулетки для американского и европейского колеса. Введите тип ставки и сумму, чтобы увидеть чистый выигрыш, общую выплату и вероятность."
    }
  },
  {
    id: "rse-calculator-relative-standard-error",
    category: "statistic",
    slugs: {
      en: "rse-calculator-relative-standard-error",
      "zh-CN": "rse-ji-suan-qi-xiang-du-biao-zhun-wu-cha",
      "zh-TW": "rse-ji-suan-qi-xiang-du-biao-zhun-wu-cha",
      ja: "rse-keisan-ki-soutai-hyoujun-gosa",
      ko: "rse-gyesan-gi-sangdae-pyojun-ocha",
      es: "calculadora-rse-error-estandar-relativo",
      fr: "calculateur-rse-erreur-standard-relative",
      de: "rse-rechner-relativer-standardfehler",
      pt: "calculadora-rse-erro-padrao-relativo",
      ru: "kalkulyator-rse-otnositelnaya-standartnaya-oshibka"
    },
    titles: {
      en: "RSE Calculator - Relative Standard Error",
      "zh-CN": "RSE计算器 - 相对标准误差",
      "zh-TW": "RSE計算器 - 相對標準誤差",
      ja: "RSE計算ツール - 相対標準誤差",
      ko: "RSE 계산기 - 상대 표준오차",
      es: "Calculadora RSE - Error estándar relativo",
      fr: "Calculateur RSE - Erreur standard relative",
      de: "RSE-Rechner - Relativer Standardfehler",
      pt: "Calculadora RSE - Erro padrão relativo",
      ru: "Калькулятор RSE - Относительная стандартная ошибка"
    },
    descriptions: {
      en: "Relative Standard Error (RSE) calculator — divide standard error by the estimate to get a unit-free precision percentage and a qualitative reliability rating.",
      "zh-CN": "相对标准误差（RSE）计算器——用标准误差除以估计值，快速得到无量纲的精度百分比和可靠性评估。",
      "zh-TW": "相對標準誤差（RSE）計算器——以標準誤差除以估計值，快速得到無單位的精度百分比與可靠性評估。",
      ja: "相対標準誤差（RSE）計算ツール。標準誤差を推定値で割って、単位に依存しない精度割合と信頼性を確認します。",
      ko: "상대 표준오차(RSE) 계산기입니다. 표준오차를 추정값으로 나눠 단위 없는 정확도 비율과 신뢰도를 확인하세요.",
      es: "Calculadora de error estándar relativo (RSE): divide el error estándar entre la estimación para obtener precisión porcentual sin unidades y una valoración de fiabilidad.",
      fr: "Calculateur d’erreur standard relative (RSE) : divisez l’erreur standard par l’estimation pour obtenir un pourcentage de précision sans unité et un niveau de fiabilité.",
      de: "RSE-Rechner für den relativen Standardfehler: Teilen Sie den Standardfehler durch die Schätzung für einen einheitenfreien Präzisionswert und eine Zuverlässigkeitsbewertung.",
      pt: "Calculadora de erro padrão relativo (RSE): divida o erro padrão pela estimativa para obter uma precisão percentual sem unidade e uma avaliação de confiabilidade.",
      ru: "Калькулятор относительной стандартной ошибки (RSE): разделите стандартную ошибку на оценку, чтобы получить безразмерный процент точности и оценку надежности."
    }
  },
  {
    id: "sample-size-calculator",
    category: "statistic",
    slugs: {
      en: "sample-size-calculator",
      "zh-CN": "yangbenliang-jisuanqi-cochran-gongshi",
      "zh-TW": "yangbenliang-jisuanqi-kekelun-gongshi",
      ja: "sanpuru-saizu-keisanki-kokuran-houshiki",
      ko: "saempul-keugi-gyesangi-kokeuran-beobchik",
      es: "calculadora-tamano-muestra-cochran",
      fr: "calculateur-taille-echantillon-cochran",
      de: "stichprobengroessen-rechner-cochran-formel",
      pt: "calculadora-tamanho-amostra-cochran",
      ru: "kalkulyator-razmera-vyborki-formula-kokrana"
    },
    titles: {
      en: "Sample Size Calculator - Cochran's Formula",
      "zh-CN": "样本量计算器 - 科克伦公式",
      "zh-TW": "樣本數計算器 - 柯克倫公式",
      ja: "サンプルサイズ計算ツール - コクランの公式",
      ko: "표본 크기 계산기 - 코크런 공식",
      es: "Calculadora de tamaño de muestra - Cochran",
      fr: "Calculateur de taille d'échantillon - Cochran",
      de: "Stichprobengrößen-Rechner - Cochran-Formel",
      pt: "Calculadora de tamanho de amostra - Cochran",
      ru: "Калькулятор размера выборки - формула Кокрана"
    },
    descriptions: {
      en: "Sample size calculator using Cochran's formula. Enter confidence level, margin of error, and proportion to get the minimum sample size for reliable surveys.",
      "zh-CN": "使用科克伦公式计算样本量。输入置信水平、误差范围和比例，快速得出可靠调研所需的最小样本数。",
      "zh-TW": "使用柯克倫公式計算樣本數。輸入信賴水準、誤差範圍與比例，快速得出可靠調查所需的最小樣本數。",
      ja: "コクランの公式でサンプルサイズを計算。信頼水準、許容誤差、比率を入力して、調査に必要な最小標本数をすぐに算出します。",
      ko: "코크런 공식으로 표본 크기를 계산합니다. 신뢰수준, 허용오차, 비율을 입력해 설문에 필요한 최소 표본 수를 바로 확인하세요.",
      es: "Calcula el tamaño de muestra con la fórmula de Cochran. Introduce nivel de confianza, margen de error y proporción para obtener el mínimo necesario.",
      fr: "Calculez la taille d'échantillon avec la formule de Cochran. Saisissez le niveau de confiance, la marge d'erreur et la proportion pour obtenir le minimum requis.",
      de: "Berechnen Sie die Stichprobengröße mit der Cochran-Formel. Geben Sie Konfidenzniveau, Fehlerspanne und Anteil ein, um das Minimum zu erhalten.",
      pt: "Calcule o tamanho da amostra com a fórmula de Cochran. Informe nível de confiança, margem de erro e proporção para obter o mínimo necessário.",
      ru: "Рассчитайте размер выборки по формуле Кокрана. Укажите уровень доверия, погрешность и долю, чтобы получить минимально необходимый объём."
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
  }
];
