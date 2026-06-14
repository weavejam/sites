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
  },
  {
    id: "tukey-hsd-calculator",
    category: "statistic",
    slugs: {
      en: "tukey-hsd-calculator",
      "zh-CN": "tukey-hsd-calculator",
      "zh-TW": "tukey-hsd-calculator",
      ja: "tukey-hsd-calculator",
      ko: "tukey-hsd-calculator",
      es: "tukey-hsd-calculator",
      fr: "tukey-hsd-calculator",
      de: "tukey-hsd-calculator",
      pt: "tukey-hsd-calculator",
      ru: "tukey-hsd-calculator"
    },
    titles: {
      en: "Tukey's HSD Calculator - Post-Hoc ANOVA Test",
      "zh-CN": "Tukey's HSD Calculator - Post-Hoc ANOVA Test",
      "zh-TW": "Tukey's HSD Calculator - Post-Hoc ANOVA Test",
      ja: "Tukey's HSD Calculator - Post-Hoc ANOVA Test",
      ko: "Tukey's HSD Calculator - Post-Hoc ANOVA Test",
      es: "Tukey's HSD Calculator - Post-Hoc ANOVA Test",
      fr: "Tukey's HSD Calculator - Post-Hoc ANOVA Test",
      de: "Tukey's HSD Calculator - Post-Hoc ANOVA Test",
      pt: "Tukey's HSD Calculator - Post-Hoc ANOVA Test",
      ru: "Tukey's HSD Calculator - Post-Hoc ANOVA Test"
    },
    descriptions: {
      en: "Perform Tukey's HSD post-hoc test after ANOVA. Compare all group mean pairs to find statistically significant differences with one free online tool.",
      "zh-CN": "Perform Tukey's HSD post-hoc test after ANOVA. Compare all group mean pairs to find statistically significant differences with one free online tool.",
      "zh-TW": "Perform Tukey's HSD post-hoc test after ANOVA. Compare all group mean pairs to find statistically significant differences with one free online tool.",
      ja: "Perform Tukey's HSD post-hoc test after ANOVA. Compare all group mean pairs to find statistically significant differences with one free online tool.",
      ko: "Perform Tukey's HSD post-hoc test after ANOVA. Compare all group mean pairs to find statistically significant differences with one free online tool.",
      es: "Perform Tukey's HSD post-hoc test after ANOVA. Compare all group mean pairs to find statistically significant differences with one free online tool.",
      fr: "Perform Tukey's HSD post-hoc test after ANOVA. Compare all group mean pairs to find statistically significant differences with one free online tool.",
      de: "Perform Tukey's HSD post-hoc test after ANOVA. Compare all group mean pairs to find statistically significant differences with one free online tool.",
      pt: "Perform Tukey's HSD post-hoc test after ANOVA. Compare all group mean pairs to find statistically significant differences with one free online tool.",
      ru: "Perform Tukey's HSD post-hoc test after ANOVA. Compare all group mean pairs to find statistically significant differences with one free online tool."
    }
  },
  {
    id: "two-envelopes-paradox-calculator",
    category: "statistic",
    slugs: {
      en: "two-envelopes-paradox-calculator",
      "zh-CN": "two-envelopes-paradox-calculator",
      "zh-TW": "two-envelopes-paradox-calculator",
      ja: "two-envelopes-paradox-calculator",
      ko: "two-envelopes-paradox-calculator",
      es: "two-envelopes-paradox-calculator",
      fr: "two-envelopes-paradox-calculator",
      de: "two-envelopes-paradox-calculator",
      pt: "two-envelopes-paradox-calculator",
      ru: "two-envelopes-paradox-calculator"
    },
    titles: {
      en: "Two Envelopes Paradox Calculator - Decision Theory",
      "zh-CN": "Two Envelopes Paradox Calculator - Decision Theory",
      "zh-TW": "Two Envelopes Paradox Calculator - Decision Theory",
      ja: "Two Envelopes Paradox Calculator - Decision Theory",
      ko: "Two Envelopes Paradox Calculator - Decision Theory",
      es: "Two Envelopes Paradox Calculator - Decision Theory",
      fr: "Two Envelopes Paradox Calculator - Decision Theory",
      de: "Two Envelopes Paradox Calculator - Decision Theory",
      pt: "Two Envelopes Paradox Calculator - Decision Theory",
      ru: "Two Envelopes Paradox Calculator - Decision Theory"
    },
    descriptions: {
      en: "Explore the Two Envelopes Paradox interactively. Calculate expected values for switching or keeping, and understand the probability math behind this puzzle.",
      "zh-CN": "Explore the Two Envelopes Paradox interactively. Calculate expected values for switching or keeping, and understand the probability math behind this puzzle.",
      "zh-TW": "Explore the Two Envelopes Paradox interactively. Calculate expected values for switching or keeping, and understand the probability math behind this puzzle.",
      ja: "Explore the Two Envelopes Paradox interactively. Calculate expected values for switching or keeping, and understand the probability math behind this puzzle.",
      ko: "Explore the Two Envelopes Paradox interactively. Calculate expected values for switching or keeping, and understand the probability math behind this puzzle.",
      es: "Explore the Two Envelopes Paradox interactively. Calculate expected values for switching or keeping, and understand the probability math behind this puzzle.",
      fr: "Explore the Two Envelopes Paradox interactively. Calculate expected values for switching or keeping, and understand the probability math behind this puzzle.",
      de: "Explore the Two Envelopes Paradox interactively. Calculate expected values for switching or keeping, and understand the probability math behind this puzzle.",
      pt: "Explore the Two Envelopes Paradox interactively. Calculate expected values for switching or keeping, and understand the probability math behind this puzzle.",
      ru: "Explore the Two Envelopes Paradox interactively. Calculate expected values for switching or keeping, and understand the probability math behind this puzzle."
    }
  },
  {
    id: "uniform-distribution-calculator",
    category: "statistic",
    slugs: {
      en: "uniform-distribution-calculator",
      "zh-CN": "uniform-distribution-calculator",
      "zh-TW": "uniform-distribution-calculator",
      ja: "uniform-distribution-calculator",
      ko: "uniform-distribution-calculator",
      es: "uniform-distribution-calculator",
      fr: "uniform-distribution-calculator",
      de: "uniform-distribution-calculator",
      pt: "uniform-distribution-calculator",
      ru: "uniform-distribution-calculator"
    },
    titles: {
      en: "Uniform Distribution Calculator - PDF, CDF & Mean",
      "zh-CN": "Uniform Distribution Calculator - PDF, CDF & Mean",
      "zh-TW": "Uniform Distribution Calculator - PDF, CDF & Mean",
      ja: "Uniform Distribution Calculator - PDF, CDF & Mean",
      ko: "Uniform Distribution Calculator - PDF, CDF & Mean",
      es: "Uniform Distribution Calculator - PDF, CDF & Mean",
      fr: "Uniform Distribution Calculator - PDF, CDF & Mean",
      de: "Uniform Distribution Calculator - PDF, CDF & Mean",
      pt: "Uniform Distribution Calculator - PDF, CDF & Mean",
      ru: "Uniform Distribution Calculator - PDF, CDF & Mean"
    },
    descriptions: {
      en: "Calculate PDF, CDF, mean, variance, and interval probability for any uniform distribution. Enter the range parameters a and b to get instant results.",
      "zh-CN": "Calculate PDF, CDF, mean, variance, and interval probability for any uniform distribution. Enter the range parameters a and b to get instant results.",
      "zh-TW": "Calculate PDF, CDF, mean, variance, and interval probability for any uniform distribution. Enter the range parameters a and b to get instant results.",
      ja: "Calculate PDF, CDF, mean, variance, and interval probability for any uniform distribution. Enter the range parameters a and b to get instant results.",
      ko: "Calculate PDF, CDF, mean, variance, and interval probability for any uniform distribution. Enter the range parameters a and b to get instant results.",
      es: "Calculate PDF, CDF, mean, variance, and interval probability for any uniform distribution. Enter the range parameters a and b to get instant results.",
      fr: "Calculate PDF, CDF, mean, variance, and interval probability for any uniform distribution. Enter the range parameters a and b to get instant results.",
      de: "Calculate PDF, CDF, mean, variance, and interval probability for any uniform distribution. Enter the range parameters a and b to get instant results.",
      pt: "Calculate PDF, CDF, mean, variance, and interval probability for any uniform distribution. Enter the range parameters a and b to get instant results.",
      ru: "Calculate PDF, CDF, mean, variance, and interval probability for any uniform distribution. Enter the range parameters a and b to get instant results."
    }
  },
  {
    id: "upper-and-lower-fence-calculator",
    category: "statistic",
    slugs: {
      en: "upper-and-lower-fence-calculator",
      "zh-CN": "upper-and-lower-fence-calculator",
      "zh-TW": "upper-and-lower-fence-calculator",
      ja: "upper-and-lower-fence-calculator",
      ko: "upper-and-lower-fence-calculator",
      es: "upper-and-lower-fence-calculator",
      fr: "upper-and-lower-fence-calculator",
      de: "upper-and-lower-fence-calculator",
      pt: "upper-and-lower-fence-calculator",
      ru: "upper-and-lower-fence-calculator"
    },
    titles: {
      en: "Upper and Lower Fence Calculator - IQR Outliers",
      "zh-CN": "Upper and Lower Fence Calculator - IQR Outliers",
      "zh-TW": "Upper and Lower Fence Calculator - IQR Outliers",
      ja: "Upper and Lower Fence Calculator - IQR Outliers",
      ko: "Upper and Lower Fence Calculator - IQR Outliers",
      es: "Upper and Lower Fence Calculator - IQR Outliers",
      fr: "Upper and Lower Fence Calculator - IQR Outliers",
      de: "Upper and Lower Fence Calculator - IQR Outliers",
      pt: "Upper and Lower Fence Calculator - IQR Outliers",
      ru: "Upper and Lower Fence Calculator - IQR Outliers"
    },
    descriptions: {
      en: "Calculate upper and lower fences using the IQR method to identify outliers in your dataset. Instantly find Q1, Q3, IQR, and all data points outside the fences.",
      "zh-CN": "Calculate upper and lower fences using the IQR method to identify outliers in your dataset. Instantly find Q1, Q3, IQR, and all data points outside the fences.",
      "zh-TW": "Calculate upper and lower fences using the IQR method to identify outliers in your dataset. Instantly find Q1, Q3, IQR, and all data points outside the fences.",
      ja: "Calculate upper and lower fences using the IQR method to identify outliers in your dataset. Instantly find Q1, Q3, IQR, and all data points outside the fences.",
      ko: "Calculate upper and lower fences using the IQR method to identify outliers in your dataset. Instantly find Q1, Q3, IQR, and all data points outside the fences.",
      es: "Calculate upper and lower fences using the IQR method to identify outliers in your dataset. Instantly find Q1, Q3, IQR, and all data points outside the fences.",
      fr: "Calculate upper and lower fences using the IQR method to identify outliers in your dataset. Instantly find Q1, Q3, IQR, and all data points outside the fences.",
      de: "Calculate upper and lower fences using the IQR method to identify outliers in your dataset. Instantly find Q1, Q3, IQR, and all data points outside the fences.",
      pt: "Calculate upper and lower fences using the IQR method to identify outliers in your dataset. Instantly find Q1, Q3, IQR, and all data points outside the fences.",
      ru: "Calculate upper and lower fences using the IQR method to identify outliers in your dataset. Instantly find Q1, Q3, IQR, and all data points outside the fences."
    }
  },
  {
    id: "upper-control-limit-calculator",
    category: "statistic",
    slugs: {
      en: "upper-control-limit-calculator",
      "zh-CN": "upper-control-limit-calculator",
      "zh-TW": "upper-control-limit-calculator",
      ja: "upper-control-limit-calculator",
      ko: "upper-control-limit-calculator",
      es: "upper-control-limit-calculator",
      fr: "upper-control-limit-calculator",
      de: "upper-control-limit-calculator",
      pt: "upper-control-limit-calculator",
      ru: "upper-control-limit-calculator"
    },
    titles: {
      en: "Upper Control Limit (UCL) Calculator - SPC Charts",
      "zh-CN": "Upper Control Limit (UCL) Calculator - SPC Charts",
      "zh-TW": "Upper Control Limit (UCL) Calculator - SPC Charts",
      ja: "Upper Control Limit (UCL) Calculator - SPC Charts",
      ko: "Upper Control Limit (UCL) Calculator - SPC Charts",
      es: "Upper Control Limit (UCL) Calculator - SPC Charts",
      fr: "Upper Control Limit (UCL) Calculator - SPC Charts",
      de: "Upper Control Limit (UCL) Calculator - SPC Charts",
      pt: "Upper Control Limit (UCL) Calculator - SPC Charts",
      ru: "Upper Control Limit (UCL) Calculator - SPC Charts"
    },
    descriptions: {
      en: "Calculate the Upper Control Limit (UCL) for statistical process control charts. Enter raw data or summary stats to monitor process variation and quality.",
      "zh-CN": "Calculate the Upper Control Limit (UCL) for statistical process control charts. Enter raw data or summary stats to monitor process variation and quality.",
      "zh-TW": "Calculate the Upper Control Limit (UCL) for statistical process control charts. Enter raw data or summary stats to monitor process variation and quality.",
      ja: "Calculate the Upper Control Limit (UCL) for statistical process control charts. Enter raw data or summary stats to monitor process variation and quality.",
      ko: "Calculate the Upper Control Limit (UCL) for statistical process control charts. Enter raw data or summary stats to monitor process variation and quality.",
      es: "Calculate the Upper Control Limit (UCL) for statistical process control charts. Enter raw data or summary stats to monitor process variation and quality.",
      fr: "Calculate the Upper Control Limit (UCL) for statistical process control charts. Enter raw data or summary stats to monitor process variation and quality.",
      de: "Calculate the Upper Control Limit (UCL) for statistical process control charts. Enter raw data or summary stats to monitor process variation and quality.",
      pt: "Calculate the Upper Control Limit (UCL) for statistical process control charts. Enter raw data or summary stats to monitor process variation and quality.",
      ru: "Calculate the Upper Control Limit (UCL) for statistical process control charts. Enter raw data or summary stats to monitor process variation and quality."
    }
  },
  {
    id: "roulette-payout-calculator",
    category: "statistic",
    slugs: {
      en: "roulette-payout-calculator",
      "zh-CN": "roulette-payout-calculator",
      "zh-TW": "roulette-payout-calculator",
      ja: "roulette-payout-calculator",
      ko: "roulette-payout-calculator",
      es: "roulette-payout-calculator",
      fr: "roulette-payout-calculator",
      de: "roulette-payout-calculator",
      pt: "roulette-payout-calculator",
      ru: "roulette-payout-calculator"
    },
    titles: {
      en: "Roulette Payout Calculator - Bet Winnings & Odds",
      "zh-CN": "Roulette Payout Calculator - Bet Winnings & Odds",
      "zh-TW": "Roulette Payout Calculator - Bet Winnings & Odds",
      ja: "Roulette Payout Calculator - Bet Winnings & Odds",
      ko: "Roulette Payout Calculator - Bet Winnings & Odds",
      es: "Roulette Payout Calculator - Bet Winnings & Odds",
      fr: "Roulette Payout Calculator - Bet Winnings & Odds",
      de: "Roulette Payout Calculator - Bet Winnings & Odds",
      pt: "Roulette Payout Calculator - Bet Winnings & Odds",
      ru: "Roulette Payout Calculator - Bet Winnings & Odds"
    },
    descriptions: {
      en: "Roulette payout calculator for American and European wheels. Enter bet type and wager to get net winnings, total payout, payout odds, and win probability.",
      "zh-CN": "Roulette payout calculator for American and European wheels. Enter bet type and wager to get net winnings, total payout, payout odds, and win probability.",
      "zh-TW": "Roulette payout calculator for American and European wheels. Enter bet type and wager to get net winnings, total payout, payout odds, and win probability.",
      ja: "Roulette payout calculator for American and European wheels. Enter bet type and wager to get net winnings, total payout, payout odds, and win probability.",
      ko: "Roulette payout calculator for American and European wheels. Enter bet type and wager to get net winnings, total payout, payout odds, and win probability.",
      es: "Roulette payout calculator for American and European wheels. Enter bet type and wager to get net winnings, total payout, payout odds, and win probability.",
      fr: "Roulette payout calculator for American and European wheels. Enter bet type and wager to get net winnings, total payout, payout odds, and win probability.",
      de: "Roulette payout calculator for American and European wheels. Enter bet type and wager to get net winnings, total payout, payout odds, and win probability.",
      pt: "Roulette payout calculator for American and European wheels. Enter bet type and wager to get net winnings, total payout, payout odds, and win probability.",
      ru: "Roulette payout calculator for American and European wheels. Enter bet type and wager to get net winnings, total payout, payout odds, and win probability."
    }
  },
  {
    id: "rse-calculator-relative-standard-error",
    category: "statistic",
    slugs: {
      en: "rse-calculator-relative-standard-error",
      "zh-CN": "rse-calculator-relative-standard-error",
      "zh-TW": "rse-calculator-relative-standard-error",
      ja: "rse-calculator-relative-standard-error",
      ko: "rse-calculator-relative-standard-error",
      es: "rse-calculator-relative-standard-error",
      fr: "rse-calculator-relative-standard-error",
      de: "rse-calculator-relative-standard-error",
      pt: "rse-calculator-relative-standard-error",
      ru: "rse-calculator-relative-standard-error"
    },
    titles: {
      en: "RSE Calculator - Relative Standard Error",
      "zh-CN": "RSE Calculator - Relative Standard Error",
      "zh-TW": "RSE Calculator - Relative Standard Error",
      ja: "RSE Calculator - Relative Standard Error",
      ko: "RSE Calculator - Relative Standard Error",
      es: "RSE Calculator - Relative Standard Error",
      fr: "RSE Calculator - Relative Standard Error",
      de: "RSE Calculator - Relative Standard Error",
      pt: "RSE Calculator - Relative Standard Error",
      ru: "RSE Calculator - Relative Standard Error"
    },
    descriptions: {
      en: "Relative Standard Error (RSE) calculator — divide standard error by the estimate to get a unit-free precision percentage and a qualitative reliability rating.",
      "zh-CN": "Relative Standard Error (RSE) calculator — divide standard error by the estimate to get a unit-free precision percentage and a qualitative reliability rating.",
      "zh-TW": "Relative Standard Error (RSE) calculator — divide standard error by the estimate to get a unit-free precision percentage and a qualitative reliability rating.",
      ja: "Relative Standard Error (RSE) calculator — divide standard error by the estimate to get a unit-free precision percentage and a qualitative reliability rating.",
      ko: "Relative Standard Error (RSE) calculator — divide standard error by the estimate to get a unit-free precision percentage and a qualitative reliability rating.",
      es: "Relative Standard Error (RSE) calculator — divide standard error by the estimate to get a unit-free precision percentage and a qualitative reliability rating.",
      fr: "Relative Standard Error (RSE) calculator — divide standard error by the estimate to get a unit-free precision percentage and a qualitative reliability rating.",
      de: "Relative Standard Error (RSE) calculator — divide standard error by the estimate to get a unit-free precision percentage and a qualitative reliability rating.",
      pt: "Relative Standard Error (RSE) calculator — divide standard error by the estimate to get a unit-free precision percentage and a qualitative reliability rating.",
      ru: "Relative Standard Error (RSE) calculator — divide standard error by the estimate to get a unit-free precision percentage and a qualitative reliability rating."
    }
  },
  {
    id: "sample-size-calculator",
    category: "statistic",
    slugs: {
      en: "sample-size-calculator",
      "zh-CN": "sample-size-calculator",
      "zh-TW": "sample-size-calculator",
      ja: "sample-size-calculator",
      ko: "sample-size-calculator",
      es: "sample-size-calculator",
      fr: "sample-size-calculator",
      de: "sample-size-calculator",
      pt: "sample-size-calculator",
      ru: "sample-size-calculator"
    },
    titles: {
      en: "Sample Size Calculator - Cochran's Formula",
      "zh-CN": "Sample Size Calculator - Cochran's Formula",
      "zh-TW": "Sample Size Calculator - Cochran's Formula",
      ja: "Sample Size Calculator - Cochran's Formula",
      ko: "Sample Size Calculator - Cochran's Formula",
      es: "Sample Size Calculator - Cochran's Formula",
      fr: "Sample Size Calculator - Cochran's Formula",
      de: "Sample Size Calculator - Cochran's Formula",
      pt: "Sample Size Calculator - Cochran's Formula",
      ru: "Sample Size Calculator - Cochran's Formula"
    },
    descriptions: {
      en: "Sample size calculator using Cochran's formula. Enter confidence level, margin of error, and proportion to get the minimum sample size for reliable surveys.",
      "zh-CN": "Sample size calculator using Cochran's formula. Enter confidence level, margin of error, and proportion to get the minimum sample size for reliable surveys.",
      "zh-TW": "Sample size calculator using Cochran's formula. Enter confidence level, margin of error, and proportion to get the minimum sample size for reliable surveys.",
      ja: "Sample size calculator using Cochran's formula. Enter confidence level, margin of error, and proportion to get the minimum sample size for reliable surveys.",
      ko: "Sample size calculator using Cochran's formula. Enter confidence level, margin of error, and proportion to get the minimum sample size for reliable surveys.",
      es: "Sample size calculator using Cochran's formula. Enter confidence level, margin of error, and proportion to get the minimum sample size for reliable surveys.",
      fr: "Sample size calculator using Cochran's formula. Enter confidence level, margin of error, and proportion to get the minimum sample size for reliable surveys.",
      de: "Sample size calculator using Cochran's formula. Enter confidence level, margin of error, and proportion to get the minimum sample size for reliable surveys.",
      pt: "Sample size calculator using Cochran's formula. Enter confidence level, margin of error, and proportion to get the minimum sample size for reliable surveys.",
      ru: "Sample size calculator using Cochran's formula. Enter confidence level, margin of error, and proportion to get the minimum sample size for reliable surveys."
    }
  },
  {
    id: "sampling-distribution-of-the-sample-proportion-calculator",
    category: "statistic",
    slugs: {
      en: "sampling-distribution-of-the-sample-proportion-calculator",
      "zh-CN": "sampling-distribution-of-the-sample-proportion-calculator",
      "zh-TW": "sampling-distribution-of-the-sample-proportion-calculator",
      ja: "sampling-distribution-of-the-sample-proportion-calculator",
      ko: "sampling-distribution-of-the-sample-proportion-calculator",
      es: "sampling-distribution-of-the-sample-proportion-calculator",
      fr: "sampling-distribution-of-the-sample-proportion-calculator",
      de: "sampling-distribution-of-the-sample-proportion-calculator",
      pt: "sampling-distribution-of-the-sample-proportion-calculator",
      ru: "sampling-distribution-of-the-sample-proportion-calculator"
    },
    titles: {
      en: "Sampling Distribution of Sample Proportion Calculator",
      "zh-CN": "Sampling Distribution of Sample Proportion Calculator",
      "zh-TW": "Sampling Distribution of Sample Proportion Calculator",
      ja: "Sampling Distribution of Sample Proportion Calculator",
      ko: "Sampling Distribution of Sample Proportion Calculator",
      es: "Sampling Distribution of Sample Proportion Calculator",
      fr: "Sampling Distribution of Sample Proportion Calculator",
      de: "Sampling Distribution of Sample Proportion Calculator",
      pt: "Sampling Distribution of Sample Proportion Calculator",
      ru: "Sampling Distribution of Sample Proportion Calculator"
    },
    descriptions: {
      en: "Sampling distribution of the sample proportion calculator. Find mean, standard error, normality check, Z-score, and cumulative probabilities instantly.",
      "zh-CN": "Sampling distribution of the sample proportion calculator. Find mean, standard error, normality check, Z-score, and cumulative probabilities instantly.",
      "zh-TW": "Sampling distribution of the sample proportion calculator. Find mean, standard error, normality check, Z-score, and cumulative probabilities instantly.",
      ja: "Sampling distribution of the sample proportion calculator. Find mean, standard error, normality check, Z-score, and cumulative probabilities instantly.",
      ko: "Sampling distribution of the sample proportion calculator. Find mean, standard error, normality check, Z-score, and cumulative probabilities instantly.",
      es: "Sampling distribution of the sample proportion calculator. Find mean, standard error, normality check, Z-score, and cumulative probabilities instantly.",
      fr: "Sampling distribution of the sample proportion calculator. Find mean, standard error, normality check, Z-score, and cumulative probabilities instantly.",
      de: "Sampling distribution of the sample proportion calculator. Find mean, standard error, normality check, Z-score, and cumulative probabilities instantly.",
      pt: "Sampling distribution of the sample proportion calculator. Find mean, standard error, normality check, Z-score, and cumulative probabilities instantly.",
      ru: "Sampling distribution of the sample proportion calculator. Find mean, standard error, normality check, Z-score, and cumulative probabilities instantly."
    }
  },
  {
    id: "sampling-error-calculator",
    category: "statistic",
    slugs: {
      en: "sampling-error-calculator",
      "zh-CN": "sampling-error-calculator",
      "zh-TW": "sampling-error-calculator",
      ja: "sampling-error-calculator",
      ko: "sampling-error-calculator",
      es: "sampling-error-calculator",
      fr: "sampling-error-calculator",
      de: "sampling-error-calculator",
      pt: "sampling-error-calculator",
      ru: "sampling-error-calculator"
    },
    titles: {
      en: "Sampling Error Calculator - Margin of Error",
      "zh-CN": "Sampling Error Calculator - Margin of Error",
      "zh-TW": "Sampling Error Calculator - Margin of Error",
      ja: "Sampling Error Calculator - Margin of Error",
      ko: "Sampling Error Calculator - Margin of Error",
      es: "Sampling Error Calculator - Margin of Error",
      fr: "Sampling Error Calculator - Margin of Error",
      de: "Sampling Error Calculator - Margin of Error",
      pt: "Sampling Error Calculator - Margin of Error",
      ru: "Sampling Error Calculator - Margin of Error"
    },
    descriptions: {
      en: "Sampling error calculator for proportions and means. Enter sample data and confidence level to get the standard error and margin of error with FPC support.",
      "zh-CN": "Sampling error calculator for proportions and means. Enter sample data and confidence level to get the standard error and margin of error with FPC support.",
      "zh-TW": "Sampling error calculator for proportions and means. Enter sample data and confidence level to get the standard error and margin of error with FPC support.",
      ja: "Sampling error calculator for proportions and means. Enter sample data and confidence level to get the standard error and margin of error with FPC support.",
      ko: "Sampling error calculator for proportions and means. Enter sample data and confidence level to get the standard error and margin of error with FPC support.",
      es: "Sampling error calculator for proportions and means. Enter sample data and confidence level to get the standard error and margin of error with FPC support.",
      fr: "Sampling error calculator for proportions and means. Enter sample data and confidence level to get the standard error and margin of error with FPC support.",
      de: "Sampling error calculator for proportions and means. Enter sample data and confidence level to get the standard error and margin of error with FPC support.",
      pt: "Sampling error calculator for proportions and means. Enter sample data and confidence level to get the standard error and margin of error with FPC support.",
      ru: "Sampling error calculator for proportions and means. Enter sample data and confidence level to get the standard error and margin of error with FPC support."
    }
  }
];
