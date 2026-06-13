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
      "zh-CN": "wilcoxon-rank-sum-test-calculator",
      "zh-TW": "wilcoxon-rank-sum-test-calculator",
      ja: "wilcoxon-rank-sum-test-calculator",
      ko: "wilcoxon-rank-sum-test-calculator",
      es: "wilcoxon-rank-sum-test-calculator",
      fr: "wilcoxon-rank-sum-test-calculator",
      de: "wilcoxon-rank-sum-test-calculator",
      pt: "wilcoxon-rank-sum-test-calculator",
      ru: "wilcoxon-rank-sum-test-calculator"
    },
    titles: {
      en: "Wilcoxon Rank Sum Test Calculator (Mann-Whitney U)",
      "zh-CN": "Wilcoxon Rank Sum Test Calculator (Mann-Whitney U)",
      "zh-TW": "Wilcoxon Rank Sum Test Calculator (Mann-Whitney U)",
      ja: "Wilcoxon Rank Sum Test Calculator (Mann-Whitney U)",
      ko: "Wilcoxon Rank Sum Test Calculator (Mann-Whitney U)",
      es: "Wilcoxon Rank Sum Test Calculator (Mann-Whitney U)",
      fr: "Wilcoxon Rank Sum Test Calculator (Mann-Whitney U)",
      de: "Wilcoxon Rank Sum Test Calculator (Mann-Whitney U)",
      pt: "Wilcoxon Rank Sum Test Calculator (Mann-Whitney U)",
      ru: "Wilcoxon Rank Sum Test Calculator (Mann-Whitney U)"
    },
    descriptions: {
      en: "Perform a Wilcoxon Rank Sum Test (Mann-Whitney U) for two independent samples. Get the U statistic, Z-score, and p-value instantly — no normality required.",
      "zh-CN": "Perform a Wilcoxon Rank Sum Test (Mann-Whitney U) for two independent samples. Get the U statistic, Z-score, and p-value instantly — no normality required.",
      "zh-TW": "Perform a Wilcoxon Rank Sum Test (Mann-Whitney U) for two independent samples. Get the U statistic, Z-score, and p-value instantly — no normality required.",
      ja: "Perform a Wilcoxon Rank Sum Test (Mann-Whitney U) for two independent samples. Get the U statistic, Z-score, and p-value instantly — no normality required.",
      ko: "Perform a Wilcoxon Rank Sum Test (Mann-Whitney U) for two independent samples. Get the U statistic, Z-score, and p-value instantly — no normality required.",
      es: "Perform a Wilcoxon Rank Sum Test (Mann-Whitney U) for two independent samples. Get the U statistic, Z-score, and p-value instantly — no normality required.",
      fr: "Perform a Wilcoxon Rank Sum Test (Mann-Whitney U) for two independent samples. Get the U statistic, Z-score, and p-value instantly — no normality required.",
      de: "Perform a Wilcoxon Rank Sum Test (Mann-Whitney U) for two independent samples. Get the U statistic, Z-score, and p-value instantly — no normality required.",
      pt: "Perform a Wilcoxon Rank Sum Test (Mann-Whitney U) for two independent samples. Get the U statistic, Z-score, and p-value instantly — no normality required.",
      ru: "Perform a Wilcoxon Rank Sum Test (Mann-Whitney U) for two independent samples. Get the U statistic, Z-score, and p-value instantly — no normality required."
    }
  },
  {
    id: "wilcoxon-signed-rank-test-calculator",
    category: "statistic",
    slugs: {
      en: "wilcoxon-signed-rank-test-calculator",
      "zh-CN": "wilcoxon-signed-rank-test-calculator",
      "zh-TW": "wilcoxon-signed-rank-test-calculator",
      ja: "wilcoxon-signed-rank-test-calculator",
      ko: "wilcoxon-signed-rank-test-calculator",
      es: "wilcoxon-signed-rank-test-calculator",
      fr: "wilcoxon-signed-rank-test-calculator",
      de: "wilcoxon-signed-rank-test-calculator",
      pt: "wilcoxon-signed-rank-test-calculator",
      ru: "wilcoxon-signed-rank-test-calculator"
    },
    titles: {
      en: "Wilcoxon Signed-Rank Test Calculator - Paired Samples",
      "zh-CN": "Wilcoxon Signed-Rank Test Calculator - Paired Samples",
      "zh-TW": "Wilcoxon Signed-Rank Test Calculator - Paired Samples",
      ja: "Wilcoxon Signed-Rank Test Calculator - Paired Samples",
      ko: "Wilcoxon Signed-Rank Test Calculator - Paired Samples",
      es: "Wilcoxon Signed-Rank Test Calculator - Paired Samples",
      fr: "Wilcoxon Signed-Rank Test Calculator - Paired Samples",
      de: "Wilcoxon Signed-Rank Test Calculator - Paired Samples",
      pt: "Wilcoxon Signed-Rank Test Calculator - Paired Samples",
      ru: "Wilcoxon Signed-Rank Test Calculator - Paired Samples"
    },
    descriptions: {
      en: "Wilcoxon signed-rank test calculator for paired samples. Compare before-and-after measurements with W statistic, Z-score, and p-value — no normality assumption.",
      "zh-CN": "Wilcoxon signed-rank test calculator for paired samples. Compare before-and-after measurements with W statistic, Z-score, and p-value — no normality assumption.",
      "zh-TW": "Wilcoxon signed-rank test calculator for paired samples. Compare before-and-after measurements with W statistic, Z-score, and p-value — no normality assumption.",
      ja: "Wilcoxon signed-rank test calculator for paired samples. Compare before-and-after measurements with W statistic, Z-score, and p-value — no normality assumption.",
      ko: "Wilcoxon signed-rank test calculator for paired samples. Compare before-and-after measurements with W statistic, Z-score, and p-value — no normality assumption.",
      es: "Wilcoxon signed-rank test calculator for paired samples. Compare before-and-after measurements with W statistic, Z-score, and p-value — no normality assumption.",
      fr: "Wilcoxon signed-rank test calculator for paired samples. Compare before-and-after measurements with W statistic, Z-score, and p-value — no normality assumption.",
      de: "Wilcoxon signed-rank test calculator for paired samples. Compare before-and-after measurements with W statistic, Z-score, and p-value — no normality assumption.",
      pt: "Wilcoxon signed-rank test calculator for paired samples. Compare before-and-after measurements with W statistic, Z-score, and p-value — no normality assumption.",
      ru: "Wilcoxon signed-rank test calculator for paired samples. Compare before-and-after measurements with W statistic, Z-score, and p-value — no normality assumption."
    }
  },
  {
    id: "yates-correction-for-continuity-calculator",
    category: "statistic",
    slugs: {
      en: "yates-correction-for-continuity-calculator",
      "zh-CN": "yates-correction-for-continuity-calculator",
      "zh-TW": "yates-correction-for-continuity-calculator",
      ja: "yates-correction-for-continuity-calculator",
      ko: "yates-correction-for-continuity-calculator",
      es: "yates-correction-for-continuity-calculator",
      fr: "yates-correction-for-continuity-calculator",
      de: "yates-correction-for-continuity-calculator",
      pt: "yates-correction-for-continuity-calculator",
      ru: "yates-correction-for-continuity-calculator"
    },
    titles: {
      en: "Yates Correction for Continuity Calculator - Chi-Square",
      "zh-CN": "Yates Correction for Continuity Calculator - Chi-Square",
      "zh-TW": "Yates Correction for Continuity Calculator - Chi-Square",
      ja: "Yates Correction for Continuity Calculator - Chi-Square",
      ko: "Yates Correction for Continuity Calculator - Chi-Square",
      es: "Yates Correction for Continuity Calculator - Chi-Square",
      fr: "Yates Correction for Continuity Calculator - Chi-Square",
      de: "Yates Correction for Continuity Calculator - Chi-Square",
      pt: "Yates Correction for Continuity Calculator - Chi-Square",
      ru: "Yates Correction for Continuity Calculator - Chi-Square"
    },
    descriptions: {
      en: "Calculate a Yates-corrected chi-square statistic for 2×2 contingency tables. Enter a, b, c, d cell counts and get the adjusted χ² value and p-value instantly.",
      "zh-CN": "Calculate a Yates-corrected chi-square statistic for 2×2 contingency tables. Enter a, b, c, d cell counts and get the adjusted χ² value and p-value instantly.",
      "zh-TW": "Calculate a Yates-corrected chi-square statistic for 2×2 contingency tables. Enter a, b, c, d cell counts and get the adjusted χ² value and p-value instantly.",
      ja: "Calculate a Yates-corrected chi-square statistic for 2×2 contingency tables. Enter a, b, c, d cell counts and get the adjusted χ² value and p-value instantly.",
      ko: "Calculate a Yates-corrected chi-square statistic for 2×2 contingency tables. Enter a, b, c, d cell counts and get the adjusted χ² value and p-value instantly.",
      es: "Calculate a Yates-corrected chi-square statistic for 2×2 contingency tables. Enter a, b, c, d cell counts and get the adjusted χ² value and p-value instantly.",
      fr: "Calculate a Yates-corrected chi-square statistic for 2×2 contingency tables. Enter a, b, c, d cell counts and get the adjusted χ² value and p-value instantly.",
      de: "Calculate a Yates-corrected chi-square statistic for 2×2 contingency tables. Enter a, b, c, d cell counts and get the adjusted χ² value and p-value instantly.",
      pt: "Calculate a Yates-corrected chi-square statistic for 2×2 contingency tables. Enter a, b, c, d cell counts and get the adjusted χ² value and p-value instantly.",
      ru: "Calculate a Yates-corrected chi-square statistic for 2×2 contingency tables. Enter a, b, c, d cell counts and get the adjusted χ² value and p-value instantly."
    }
  },
  {
    id: "z-score-calculator",
    category: "statistic",
    slugs: {
      en: "z-score-calculator",
      "zh-CN": "z-score-calculator",
      "zh-TW": "z-score-calculator",
      ja: "z-score-calculator",
      ko: "z-score-calculator",
      es: "z-score-calculator",
      fr: "z-score-calculator",
      de: "z-score-calculator",
      pt: "z-score-calculator",
      ru: "z-score-calculator"
    },
    titles: {
      en: "Z-Score Calculator - Calculate Standard Score Instantly",
      "zh-CN": "Z-Score Calculator - Calculate Standard Score Instantly",
      "zh-TW": "Z-Score Calculator - Calculate Standard Score Instantly",
      ja: "Z-Score Calculator - Calculate Standard Score Instantly",
      ko: "Z-Score Calculator - Calculate Standard Score Instantly",
      es: "Z-Score Calculator - Calculate Standard Score Instantly",
      fr: "Z-Score Calculator - Calculate Standard Score Instantly",
      de: "Z-Score Calculator - Calculate Standard Score Instantly",
      pt: "Z-Score Calculator - Calculate Standard Score Instantly",
      ru: "Z-Score Calculator - Calculate Standard Score Instantly"
    },
    descriptions: {
      en: "Z-score calculator: find how many standard deviations a value is from the mean. Enter raw score, mean, and standard deviation to get z-score and interpretation.",
      "zh-CN": "Z-score calculator: find how many standard deviations a value is from the mean. Enter raw score, mean, and standard deviation to get z-score and interpretation.",
      "zh-TW": "Z-score calculator: find how many standard deviations a value is from the mean. Enter raw score, mean, and standard deviation to get z-score and interpretation.",
      ja: "Z-score calculator: find how many standard deviations a value is from the mean. Enter raw score, mean, and standard deviation to get z-score and interpretation.",
      ko: "Z-score calculator: find how many standard deviations a value is from the mean. Enter raw score, mean, and standard deviation to get z-score and interpretation.",
      es: "Z-score calculator: find how many standard deviations a value is from the mean. Enter raw score, mean, and standard deviation to get z-score and interpretation.",
      fr: "Z-score calculator: find how many standard deviations a value is from the mean. Enter raw score, mean, and standard deviation to get z-score and interpretation.",
      de: "Z-score calculator: find how many standard deviations a value is from the mean. Enter raw score, mean, and standard deviation to get z-score and interpretation.",
      pt: "Z-score calculator: find how many standard deviations a value is from the mean. Enter raw score, mean, and standard deviation to get z-score and interpretation.",
      ru: "Z-score calculator: find how many standard deviations a value is from the mean. Enter raw score, mean, and standard deviation to get z-score and interpretation."
    }
  },
  {
    id: "z-test-calculator",
    category: "statistic",
    slugs: {
      en: "z-test-calculator",
      "zh-CN": "z-test-calculator",
      "zh-TW": "z-test-calculator",
      ja: "z-test-calculator",
      ko: "z-test-calculator",
      es: "z-test-calculator",
      fr: "z-test-calculator",
      de: "z-test-calculator",
      pt: "z-test-calculator",
      ru: "z-test-calculator"
    },
    titles: {
      en: "Z-Test Calculator for Hypothesis Testing",
      "zh-CN": "Z-Test Calculator for Hypothesis Testing",
      "zh-TW": "Z-Test Calculator for Hypothesis Testing",
      ja: "Z-Test Calculator for Hypothesis Testing",
      ko: "Z-Test Calculator for Hypothesis Testing",
      es: "Z-Test Calculator for Hypothesis Testing",
      fr: "Z-Test Calculator for Hypothesis Testing",
      de: "Z-Test Calculator for Hypothesis Testing",
      pt: "Z-Test Calculator for Hypothesis Testing",
      ru: "Z-Test Calculator for Hypothesis Testing"
    },
    descriptions: {
      en: "One-sample and two-sample Z-test calculator for hypothesis testing. Enter sample mean, population SD, and sample size to get the Z-statistic and p-value.",
      "zh-CN": "One-sample and two-sample Z-test calculator for hypothesis testing. Enter sample mean, population SD, and sample size to get the Z-statistic and p-value.",
      "zh-TW": "One-sample and two-sample Z-test calculator for hypothesis testing. Enter sample mean, population SD, and sample size to get the Z-statistic and p-value.",
      ja: "One-sample and two-sample Z-test calculator for hypothesis testing. Enter sample mean, population SD, and sample size to get the Z-statistic and p-value.",
      ko: "One-sample and two-sample Z-test calculator for hypothesis testing. Enter sample mean, population SD, and sample size to get the Z-statistic and p-value.",
      es: "One-sample and two-sample Z-test calculator for hypothesis testing. Enter sample mean, population SD, and sample size to get the Z-statistic and p-value.",
      fr: "One-sample and two-sample Z-test calculator for hypothesis testing. Enter sample mean, population SD, and sample size to get the Z-statistic and p-value.",
      de: "One-sample and two-sample Z-test calculator for hypothesis testing. Enter sample mean, population SD, and sample size to get the Z-statistic and p-value.",
      pt: "One-sample and two-sample Z-test calculator for hypothesis testing. Enter sample mean, population SD, and sample size to get the Z-statistic and p-value.",
      ru: "One-sample and two-sample Z-test calculator for hypothesis testing. Enter sample mean, population SD, and sample size to get the Z-statistic and p-value."
    }
  }
];
