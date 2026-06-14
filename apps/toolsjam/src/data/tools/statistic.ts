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
    id: "variance-calculator",
    category: "statistic",
    slugs: {
      en: "variance-calculator",
      "zh-CN": "variance-calculator",
      "zh-TW": "variance-calculator",
      ja: "variance-calculator",
      ko: "variance-calculator",
      es: "variance-calculator",
      fr: "variance-calculator",
      de: "variance-calculator",
      pt: "variance-calculator",
      ru: "variance-calculator"
    },
    titles: {
      en: "Variance Calculator - Sample & Population Variance",
      "zh-CN": "Variance Calculator - Sample & Population Variance",
      "zh-TW": "Variance Calculator - Sample & Population Variance",
      ja: "Variance Calculator - Sample & Population Variance",
      ko: "Variance Calculator - Sample & Population Variance",
      es: "Variance Calculator - Sample & Population Variance",
      fr: "Variance Calculator - Sample & Population Variance",
      de: "Variance Calculator - Sample & Population Variance",
      pt: "Variance Calculator - Sample & Population Variance",
      ru: "Variance Calculator - Sample & Population Variance"
    },
    descriptions: {
      en: "Variance calculator for sample and population data. Computes variance, standard deviation, mean, median, mode, and IQR from any list of numbers instantly.",
      "zh-CN": "Variance calculator for sample and population data. Computes variance, standard deviation, mean, median, mode, and IQR from any list of numbers instantly.",
      "zh-TW": "Variance calculator for sample and population data. Computes variance, standard deviation, mean, median, mode, and IQR from any list of numbers instantly.",
      ja: "Variance calculator for sample and population data. Computes variance, standard deviation, mean, median, mode, and IQR from any list of numbers instantly.",
      ko: "Variance calculator for sample and population data. Computes variance, standard deviation, mean, median, mode, and IQR from any list of numbers instantly.",
      es: "Variance calculator for sample and population data. Computes variance, standard deviation, mean, median, mode, and IQR from any list of numbers instantly.",
      fr: "Variance calculator for sample and population data. Computes variance, standard deviation, mean, median, mode, and IQR from any list of numbers instantly.",
      de: "Variance calculator for sample and population data. Computes variance, standard deviation, mean, median, mode, and IQR from any list of numbers instantly.",
      pt: "Variance calculator for sample and population data. Computes variance, standard deviation, mean, median, mode, and IQR from any list of numbers instantly.",
      ru: "Variance calculator for sample and population data. Computes variance, standard deviation, mean, median, mode, and IQR from any list of numbers instantly."
    }
  },
  {
    id: "venn-diagram-calculator",
    category: "statistic",
    slugs: {
      en: "venn-diagram-calculator",
      "zh-CN": "venn-diagram-calculator",
      "zh-TW": "venn-diagram-calculator",
      ja: "venn-diagram-calculator",
      ko: "venn-diagram-calculator",
      es: "venn-diagram-calculator",
      fr: "venn-diagram-calculator",
      de: "venn-diagram-calculator",
      pt: "venn-diagram-calculator",
      ru: "venn-diagram-calculator"
    },
    titles: {
      en: "Venn Diagram Calculator - Union, Intersection & Difference",
      "zh-CN": "Venn Diagram Calculator - Union, Intersection & Difference",
      "zh-TW": "Venn Diagram Calculator - Union, Intersection & Difference",
      ja: "Venn Diagram Calculator - Union, Intersection & Difference",
      ko: "Venn Diagram Calculator - Union, Intersection & Difference",
      es: "Venn Diagram Calculator - Union, Intersection & Difference",
      fr: "Venn Diagram Calculator - Union, Intersection & Difference",
      de: "Venn Diagram Calculator - Union, Intersection & Difference",
      pt: "Venn Diagram Calculator - Union, Intersection & Difference",
      ru: "Venn Diagram Calculator - Union, Intersection & Difference"
    },
    descriptions: {
      en: "Venn diagram calculator for 2 and 3 sets. Find union, intersection, and exclusive regions instantly — ideal for set theory, probability, and survey analysis.",
      "zh-CN": "Venn diagram calculator for 2 and 3 sets. Find union, intersection, and exclusive regions instantly — ideal for set theory, probability, and survey analysis.",
      "zh-TW": "Venn diagram calculator for 2 and 3 sets. Find union, intersection, and exclusive regions instantly — ideal for set theory, probability, and survey analysis.",
      ja: "Venn diagram calculator for 2 and 3 sets. Find union, intersection, and exclusive regions instantly — ideal for set theory, probability, and survey analysis.",
      ko: "Venn diagram calculator for 2 and 3 sets. Find union, intersection, and exclusive regions instantly — ideal for set theory, probability, and survey analysis.",
      es: "Venn diagram calculator for 2 and 3 sets. Find union, intersection, and exclusive regions instantly — ideal for set theory, probability, and survey analysis.",
      fr: "Venn diagram calculator for 2 and 3 sets. Find union, intersection, and exclusive regions instantly — ideal for set theory, probability, and survey analysis.",
      de: "Venn diagram calculator for 2 and 3 sets. Find union, intersection, and exclusive regions instantly — ideal for set theory, probability, and survey analysis.",
      pt: "Venn diagram calculator for 2 and 3 sets. Find union, intersection, and exclusive regions instantly — ideal for set theory, probability, and survey analysis.",
      ru: "Venn diagram calculator for 2 and 3 sets. Find union, intersection, and exclusive regions instantly — ideal for set theory, probability, and survey analysis."
    }
  },
  {
    id: "wald-test-calculator",
    category: "statistic",
    slugs: {
      en: "wald-test-calculator",
      "zh-CN": "wald-test-calculator",
      "zh-TW": "wald-test-calculator",
      ja: "wald-test-calculator",
      ko: "wald-test-calculator",
      es: "wald-test-calculator",
      fr: "wald-test-calculator",
      de: "wald-test-calculator",
      pt: "wald-test-calculator",
      ru: "wald-test-calculator"
    },
    titles: {
      en: "Wald Test Calculator - Statistical Significance",
      "zh-CN": "Wald Test Calculator - Statistical Significance",
      "zh-TW": "Wald Test Calculator - Statistical Significance",
      ja: "Wald Test Calculator - Statistical Significance",
      ko: "Wald Test Calculator - Statistical Significance",
      es: "Wald Test Calculator - Statistical Significance",
      fr: "Wald Test Calculator - Statistical Significance",
      de: "Wald Test Calculator - Statistical Significance",
      pt: "Wald Test Calculator - Statistical Significance",
      ru: "Wald Test Calculator - Statistical Significance"
    },
    descriptions: {
      en: "Wald test calculator for statistical significance. Enter parameter estimate, standard error, and alpha level to get the Wald statistic, z-score, and p-value.",
      "zh-CN": "Wald test calculator for statistical significance. Enter parameter estimate, standard error, and alpha level to get the Wald statistic, z-score, and p-value.",
      "zh-TW": "Wald test calculator for statistical significance. Enter parameter estimate, standard error, and alpha level to get the Wald statistic, z-score, and p-value.",
      ja: "Wald test calculator for statistical significance. Enter parameter estimate, standard error, and alpha level to get the Wald statistic, z-score, and p-value.",
      ko: "Wald test calculator for statistical significance. Enter parameter estimate, standard error, and alpha level to get the Wald statistic, z-score, and p-value.",
      es: "Wald test calculator for statistical significance. Enter parameter estimate, standard error, and alpha level to get the Wald statistic, z-score, and p-value.",
      fr: "Wald test calculator for statistical significance. Enter parameter estimate, standard error, and alpha level to get the Wald statistic, z-score, and p-value.",
      de: "Wald test calculator for statistical significance. Enter parameter estimate, standard error, and alpha level to get the Wald statistic, z-score, and p-value.",
      pt: "Wald test calculator for statistical significance. Enter parameter estimate, standard error, and alpha level to get the Wald statistic, z-score, and p-value.",
      ru: "Wald test calculator for statistical significance. Enter parameter estimate, standard error, and alpha level to get the Wald statistic, z-score, and p-value."
    }
  },
  {
    id: "weibull-distribution-calculator",
    category: "statistic",
    slugs: {
      en: "weibull-distribution-calculator",
      "zh-CN": "weibull-distribution-calculator",
      "zh-TW": "weibull-distribution-calculator",
      ja: "weibull-distribution-calculator",
      ko: "weibull-distribution-calculator",
      es: "weibull-distribution-calculator",
      fr: "weibull-distribution-calculator",
      de: "weibull-distribution-calculator",
      pt: "weibull-distribution-calculator",
      ru: "weibull-distribution-calculator"
    },
    titles: {
      en: "Weibull Distribution Calculator - PDF, CDF & Reliability",
      "zh-CN": "Weibull Distribution Calculator - PDF, CDF & Reliability",
      "zh-TW": "Weibull Distribution Calculator - PDF, CDF & Reliability",
      ja: "Weibull Distribution Calculator - PDF, CDF & Reliability",
      ko: "Weibull Distribution Calculator - PDF, CDF & Reliability",
      es: "Weibull Distribution Calculator - PDF, CDF & Reliability",
      fr: "Weibull Distribution Calculator - PDF, CDF & Reliability",
      de: "Weibull Distribution Calculator - PDF, CDF & Reliability",
      pt: "Weibull Distribution Calculator - PDF, CDF & Reliability",
      ru: "Weibull Distribution Calculator - PDF, CDF & Reliability"
    },
    descriptions: {
      en: "Weibull distribution calculator for reliability analysis. Compute PDF, CDF, hazard rate, mean, median, and variance from shape and scale parameters instantly.",
      "zh-CN": "Weibull distribution calculator for reliability analysis. Compute PDF, CDF, hazard rate, mean, median, and variance from shape and scale parameters instantly.",
      "zh-TW": "Weibull distribution calculator for reliability analysis. Compute PDF, CDF, hazard rate, mean, median, and variance from shape and scale parameters instantly.",
      ja: "Weibull distribution calculator for reliability analysis. Compute PDF, CDF, hazard rate, mean, median, and variance from shape and scale parameters instantly.",
      ko: "Weibull distribution calculator for reliability analysis. Compute PDF, CDF, hazard rate, mean, median, and variance from shape and scale parameters instantly.",
      es: "Weibull distribution calculator for reliability analysis. Compute PDF, CDF, hazard rate, mean, median, and variance from shape and scale parameters instantly.",
      fr: "Weibull distribution calculator for reliability analysis. Compute PDF, CDF, hazard rate, mean, median, and variance from shape and scale parameters instantly.",
      de: "Weibull distribution calculator for reliability analysis. Compute PDF, CDF, hazard rate, mean, median, and variance from shape and scale parameters instantly.",
      pt: "Weibull distribution calculator for reliability analysis. Compute PDF, CDF, hazard rate, mean, median, and variance from shape and scale parameters instantly.",
      ru: "Weibull distribution calculator for reliability analysis. Compute PDF, CDF, hazard rate, mean, median, and variance from shape and scale parameters instantly."
    }
  },
  {
    id: "weighted-mean-calculator",
    category: "statistic",
    slugs: {
      en: "weighted-mean-calculator",
      "zh-CN": "weighted-mean-calculator",
      "zh-TW": "weighted-mean-calculator",
      ja: "weighted-mean-calculator",
      ko: "weighted-mean-calculator",
      es: "weighted-mean-calculator",
      fr: "weighted-mean-calculator",
      de: "weighted-mean-calculator",
      pt: "weighted-mean-calculator",
      ru: "weighted-mean-calculator"
    },
    titles: {
      en: "Weighted Mean Calculator - Calculate Weighted Average",
      "zh-CN": "Weighted Mean Calculator - Calculate Weighted Average",
      "zh-TW": "Weighted Mean Calculator - Calculate Weighted Average",
      ja: "Weighted Mean Calculator - Calculate Weighted Average",
      ko: "Weighted Mean Calculator - Calculate Weighted Average",
      es: "Weighted Mean Calculator - Calculate Weighted Average",
      fr: "Weighted Mean Calculator - Calculate Weighted Average",
      de: "Weighted Mean Calculator - Calculate Weighted Average",
      pt: "Weighted Mean Calculator - Calculate Weighted Average",
      ru: "Weighted Mean Calculator - Calculate Weighted Average"
    },
    descriptions: {
      en: "Weighted mean calculator for grades, finance, and surveys. Enter values and weights to compute the weighted average — supports any number of data points.",
      "zh-CN": "Weighted mean calculator for grades, finance, and surveys. Enter values and weights to compute the weighted average — supports any number of data points.",
      "zh-TW": "Weighted mean calculator for grades, finance, and surveys. Enter values and weights to compute the weighted average — supports any number of data points.",
      ja: "Weighted mean calculator for grades, finance, and surveys. Enter values and weights to compute the weighted average — supports any number of data points.",
      ko: "Weighted mean calculator for grades, finance, and surveys. Enter values and weights to compute the weighted average — supports any number of data points.",
      es: "Weighted mean calculator for grades, finance, and surveys. Enter values and weights to compute the weighted average — supports any number of data points.",
      fr: "Weighted mean calculator for grades, finance, and surveys. Enter values and weights to compute the weighted average — supports any number of data points.",
      de: "Weighted mean calculator for grades, finance, and surveys. Enter values and weights to compute the weighted average — supports any number of data points.",
      pt: "Weighted mean calculator for grades, finance, and surveys. Enter values and weights to compute the weighted average — supports any number of data points.",
      ru: "Weighted mean calculator for grades, finance, and surveys. Enter values and weights to compute the weighted average — supports any number of data points."
    }
  },
  {
    id: "smp-x-distribution-calculator",
    category: "statistic",
    slugs: {
      en: "smp-x-distribution-calculator",
      "zh-CN": "smp-x-distribution-calculator",
      "zh-TW": "smp-x-distribution-calculator",
      ja: "smp-x-distribution-calculator",
      ko: "smp-x-distribution-calculator",
      es: "smp-x-distribution-calculator",
      fr: "smp-x-distribution-calculator",
      de: "smp-x-distribution-calculator",
      pt: "smp-x-distribution-calculator",
      ru: "smp-x-distribution-calculator"
    },
    titles: {
      en: "Sampling Distribution of Sample Mean Calculator",
      "zh-CN": "Sampling Distribution of Sample Mean Calculator",
      "zh-TW": "Sampling Distribution of Sample Mean Calculator",
      ja: "Sampling Distribution of Sample Mean Calculator",
      ko: "Sampling Distribution of Sample Mean Calculator",
      es: "Sampling Distribution of Sample Mean Calculator",
      fr: "Sampling Distribution of Sample Mean Calculator",
      de: "Sampling Distribution of Sample Mean Calculator",
      pt: "Sampling Distribution of Sample Mean Calculator",
      ru: "Sampling Distribution of Sample Mean Calculator"
    },
    descriptions: {
      en: "Sampling distribution of the sample mean calculator: find SE, z-score, and probability (less than, greater than, between) using the Central Limit Theorem.",
      "zh-CN": "Sampling distribution of the sample mean calculator: find SE, z-score, and probability (less than, greater than, between) using the Central Limit Theorem.",
      "zh-TW": "Sampling distribution of the sample mean calculator: find SE, z-score, and probability (less than, greater than, between) using the Central Limit Theorem.",
      ja: "Sampling distribution of the sample mean calculator: find SE, z-score, and probability (less than, greater than, between) using the Central Limit Theorem.",
      ko: "Sampling distribution of the sample mean calculator: find SE, z-score, and probability (less than, greater than, between) using the Central Limit Theorem.",
      es: "Sampling distribution of the sample mean calculator: find SE, z-score, and probability (less than, greater than, between) using the Central Limit Theorem.",
      fr: "Sampling distribution of the sample mean calculator: find SE, z-score, and probability (less than, greater than, between) using the Central Limit Theorem.",
      de: "Sampling distribution of the sample mean calculator: find SE, z-score, and probability (less than, greater than, between) using the Central Limit Theorem.",
      pt: "Sampling distribution of the sample mean calculator: find SE, z-score, and probability (less than, greater than, between) using the Central Limit Theorem.",
      ru: "Sampling distribution of the sample mean calculator: find SE, z-score, and probability (less than, greater than, between) using the Central Limit Theorem."
    }
  },
  {
    id: "spearmans-correlation-calculator",
    category: "statistic",
    slugs: {
      en: "spearmans-correlation-calculator",
      "zh-CN": "spearmans-correlation-calculator",
      "zh-TW": "spearmans-correlation-calculator",
      ja: "spearmans-correlation-calculator",
      ko: "spearmans-correlation-calculator",
      es: "spearmans-correlation-calculator",
      fr: "spearmans-correlation-calculator",
      de: "spearmans-correlation-calculator",
      pt: "spearmans-correlation-calculator",
      ru: "spearmans-correlation-calculator"
    },
    titles: {
      en: "Spearman's Correlation Calculator - Rank Correlation",
      "zh-CN": "Spearman's Correlation Calculator - Rank Correlation",
      "zh-TW": "Spearman's Correlation Calculator - Rank Correlation",
      ja: "Spearman's Correlation Calculator - Rank Correlation",
      ko: "Spearman's Correlation Calculator - Rank Correlation",
      es: "Spearman's Correlation Calculator - Rank Correlation",
      fr: "Spearman's Correlation Calculator - Rank Correlation",
      de: "Spearman's Correlation Calculator - Rank Correlation",
      pt: "Spearman's Correlation Calculator - Rank Correlation",
      ru: "Spearman's Correlation Calculator - Rank Correlation"
    },
    descriptions: {
      en: "Spearman's rank correlation calculator: compute ρ for two datasets. Measures monotonic relationships without normality requirements — ideal for ordinal data.",
      "zh-CN": "Spearman's rank correlation calculator: compute ρ for two datasets. Measures monotonic relationships without normality requirements — ideal for ordinal data.",
      "zh-TW": "Spearman's rank correlation calculator: compute ρ for two datasets. Measures monotonic relationships without normality requirements — ideal for ordinal data.",
      ja: "Spearman's rank correlation calculator: compute ρ for two datasets. Measures monotonic relationships without normality requirements — ideal for ordinal data.",
      ko: "Spearman's rank correlation calculator: compute ρ for two datasets. Measures monotonic relationships without normality requirements — ideal for ordinal data.",
      es: "Spearman's rank correlation calculator: compute ρ for two datasets. Measures monotonic relationships without normality requirements — ideal for ordinal data.",
      fr: "Spearman's rank correlation calculator: compute ρ for two datasets. Measures monotonic relationships without normality requirements — ideal for ordinal data.",
      de: "Spearman's rank correlation calculator: compute ρ for two datasets. Measures monotonic relationships without normality requirements — ideal for ordinal data.",
      pt: "Spearman's rank correlation calculator: compute ρ for two datasets. Measures monotonic relationships without normality requirements — ideal for ordinal data.",
      ru: "Spearman's rank correlation calculator: compute ρ for two datasets. Measures monotonic relationships without normality requirements — ideal for ordinal data."
    }
  },
  {
    id: "standard-deviation-index-calculator",
    category: "statistic",
    slugs: {
      en: "standard-deviation-index-calculator",
      "zh-CN": "standard-deviation-index-calculator",
      "zh-TW": "standard-deviation-index-calculator",
      ja: "standard-deviation-index-calculator",
      ko: "standard-deviation-index-calculator",
      es: "standard-deviation-index-calculator",
      fr: "standard-deviation-index-calculator",
      de: "standard-deviation-index-calculator",
      pt: "standard-deviation-index-calculator",
      ru: "standard-deviation-index-calculator"
    },
    titles: {
      en: "Standard Deviation Calculator - Sample & Population SD",
      "zh-CN": "Standard Deviation Calculator - Sample & Population SD",
      "zh-TW": "Standard Deviation Calculator - Sample & Population SD",
      ja: "Standard Deviation Calculator - Sample & Population SD",
      ko: "Standard Deviation Calculator - Sample & Population SD",
      es: "Standard Deviation Calculator - Sample & Population SD",
      fr: "Standard Deviation Calculator - Sample & Population SD",
      de: "Standard Deviation Calculator - Sample & Population SD",
      pt: "Standard Deviation Calculator - Sample & Population SD",
      ru: "Standard Deviation Calculator - Sample & Population SD"
    },
    descriptions: {
      en: "Standard deviation calculator: compute sample SD, population SD, mean, variance, and CV from any dataset. Enter numbers and get results instantly.",
      "zh-CN": "Standard deviation calculator: compute sample SD, population SD, mean, variance, and CV from any dataset. Enter numbers and get results instantly.",
      "zh-TW": "Standard deviation calculator: compute sample SD, population SD, mean, variance, and CV from any dataset. Enter numbers and get results instantly.",
      ja: "Standard deviation calculator: compute sample SD, population SD, mean, variance, and CV from any dataset. Enter numbers and get results instantly.",
      ko: "Standard deviation calculator: compute sample SD, population SD, mean, variance, and CV from any dataset. Enter numbers and get results instantly.",
      es: "Standard deviation calculator: compute sample SD, population SD, mean, variance, and CV from any dataset. Enter numbers and get results instantly.",
      fr: "Standard deviation calculator: compute sample SD, population SD, mean, variance, and CV from any dataset. Enter numbers and get results instantly.",
      de: "Standard deviation calculator: compute sample SD, population SD, mean, variance, and CV from any dataset. Enter numbers and get results instantly.",
      pt: "Standard deviation calculator: compute sample SD, population SD, mean, variance, and CV from any dataset. Enter numbers and get results instantly.",
      ru: "Standard deviation calculator: compute sample SD, population SD, mean, variance, and CV from any dataset. Enter numbers and get results instantly."
    }
  },
  {
    id: "standard-deviation-of-sample-mean-calculator",
    category: "statistic",
    slugs: {
      en: "standard-deviation-of-sample-mean-calculator",
      "zh-CN": "standard-deviation-of-sample-mean-calculator",
      "zh-TW": "standard-deviation-of-sample-mean-calculator",
      ja: "standard-deviation-of-sample-mean-calculator",
      ko: "standard-deviation-of-sample-mean-calculator",
      es: "standard-deviation-of-sample-mean-calculator",
      fr: "standard-deviation-of-sample-mean-calculator",
      de: "standard-deviation-of-sample-mean-calculator",
      pt: "standard-deviation-of-sample-mean-calculator",
      ru: "standard-deviation-of-sample-mean-calculator"
    },
    titles: {
      en: "Standard Deviation of Sample Mean Calculator (SEM)",
      "zh-CN": "Standard Deviation of Sample Mean Calculator (SEM)",
      "zh-TW": "Standard Deviation of Sample Mean Calculator (SEM)",
      ja: "Standard Deviation of Sample Mean Calculator (SEM)",
      ko: "Standard Deviation of Sample Mean Calculator (SEM)",
      es: "Standard Deviation of Sample Mean Calculator (SEM)",
      fr: "Standard Deviation of Sample Mean Calculator (SEM)",
      de: "Standard Deviation of Sample Mean Calculator (SEM)",
      pt: "Standard Deviation of Sample Mean Calculator (SEM)",
      ru: "Standard Deviation of Sample Mean Calculator (SEM)"
    },
    descriptions: {
      en: "Standard deviation of sample mean (SEM) calculator: compute SEM, mean, variance, and SD from raw data. Enter comma-separated numbers to get results instantly.",
      "zh-CN": "Standard deviation of sample mean (SEM) calculator: compute SEM, mean, variance, and SD from raw data. Enter comma-separated numbers to get results instantly.",
      "zh-TW": "Standard deviation of sample mean (SEM) calculator: compute SEM, mean, variance, and SD from raw data. Enter comma-separated numbers to get results instantly.",
      ja: "Standard deviation of sample mean (SEM) calculator: compute SEM, mean, variance, and SD from raw data. Enter comma-separated numbers to get results instantly.",
      ko: "Standard deviation of sample mean (SEM) calculator: compute SEM, mean, variance, and SD from raw data. Enter comma-separated numbers to get results instantly.",
      es: "Standard deviation of sample mean (SEM) calculator: compute SEM, mean, variance, and SD from raw data. Enter comma-separated numbers to get results instantly.",
      fr: "Standard deviation of sample mean (SEM) calculator: compute SEM, mean, variance, and SD from raw data. Enter comma-separated numbers to get results instantly.",
      de: "Standard deviation of sample mean (SEM) calculator: compute SEM, mean, variance, and SD from raw data. Enter comma-separated numbers to get results instantly.",
      pt: "Standard deviation of sample mean (SEM) calculator: compute SEM, mean, variance, and SD from raw data. Enter comma-separated numbers to get results instantly.",
      ru: "Standard deviation of sample mean (SEM) calculator: compute SEM, mean, variance, and SD from raw data. Enter comma-separated numbers to get results instantly."
    }
  },
  {
    id: "standard-error-calculator",
    category: "statistic",
    slugs: {
      en: "standard-error-calculator",
      "zh-CN": "standard-error-calculator",
      "zh-TW": "standard-error-calculator",
      ja: "standard-error-calculator",
      ko: "standard-error-calculator",
      es: "standard-error-calculator",
      fr: "standard-error-calculator",
      de: "standard-error-calculator",
      pt: "standard-error-calculator",
      ru: "standard-error-calculator"
    },
    titles: {
      en: "Standard Error Calculator - SE from Raw Data or Summary",
      "zh-CN": "Standard Error Calculator - SE from Raw Data or Summary",
      "zh-TW": "Standard Error Calculator - SE from Raw Data or Summary",
      ja: "Standard Error Calculator - SE from Raw Data or Summary",
      ko: "Standard Error Calculator - SE from Raw Data or Summary",
      es: "Standard Error Calculator - SE from Raw Data or Summary",
      fr: "Standard Error Calculator - SE from Raw Data or Summary",
      de: "Standard Error Calculator - SE from Raw Data or Summary",
      pt: "Standard Error Calculator - SE from Raw Data or Summary",
      ru: "Standard Error Calculator - SE from Raw Data or Summary"
    },
    descriptions: {
      en: "Standard error calculator: compute SE from raw data or summary statistics. Includes confidence intervals at 90%, 95%, and 99% — free and accurate.",
      "zh-CN": "Standard error calculator: compute SE from raw data or summary statistics. Includes confidence intervals at 90%, 95%, and 99% — free and accurate.",
      "zh-TW": "Standard error calculator: compute SE from raw data or summary statistics. Includes confidence intervals at 90%, 95%, and 99% — free and accurate.",
      ja: "Standard error calculator: compute SE from raw data or summary statistics. Includes confidence intervals at 90%, 95%, and 99% — free and accurate.",
      ko: "Standard error calculator: compute SE from raw data or summary statistics. Includes confidence intervals at 90%, 95%, and 99% — free and accurate.",
      es: "Standard error calculator: compute SE from raw data or summary statistics. Includes confidence intervals at 90%, 95%, and 99% — free and accurate.",
      fr: "Standard error calculator: compute SE from raw data or summary statistics. Includes confidence intervals at 90%, 95%, and 99% — free and accurate.",
      de: "Standard error calculator: compute SE from raw data or summary statistics. Includes confidence intervals at 90%, 95%, and 99% — free and accurate.",
      pt: "Standard error calculator: compute SE from raw data or summary statistics. Includes confidence intervals at 90%, 95%, and 99% — free and accurate.",
      ru: "Standard error calculator: compute SE from raw data or summary statistics. Includes confidence intervals at 90%, 95%, and 99% — free and accurate."
    }
  },
  {
    id: "relative-standard-deviation-calculator",
    category: "statistic",
    slugs: {
      en: "relative-standard-deviation-calculator",
      "zh-CN": "relative-standard-deviation-calculator",
      "zh-TW": "relative-standard-deviation-calculator",
      ja: "relative-standard-deviation-calculator",
      ko: "relative-standard-deviation-calculator",
      es: "relative-standard-deviation-calculator",
      fr: "relative-standard-deviation-calculator",
      de: "relative-standard-deviation-calculator",
      pt: "relative-standard-deviation-calculator",
      ru: "relative-standard-deviation-calculator"
    },
    titles: {
      en: "Relative Standard Deviation Calculator - RSD & CV",
      "zh-CN": "Relative Standard Deviation Calculator - RSD & CV",
      "zh-TW": "Relative Standard Deviation Calculator - RSD & CV",
      ja: "Relative Standard Deviation Calculator - RSD & CV",
      ko: "Relative Standard Deviation Calculator - RSD & CV",
      es: "Relative Standard Deviation Calculator - RSD & CV",
      fr: "Relative Standard Deviation Calculator - RSD & CV",
      de: "Relative Standard Deviation Calculator - RSD & CV",
      pt: "Relative Standard Deviation Calculator - RSD & CV",
      ru: "Relative Standard Deviation Calculator - RSD & CV"
    },
    descriptions: {
      en: "Calculate Relative Standard Deviation (RSD) and Coefficient of Variation (CV) instantly. Free statistical analysis tool for data dispersion and precision.",
      "zh-CN": "Calculate Relative Standard Deviation (RSD) and Coefficient of Variation (CV) instantly. Free statistical analysis tool for data dispersion and precision.",
      "zh-TW": "Calculate Relative Standard Deviation (RSD) and Coefficient of Variation (CV) instantly. Free statistical analysis tool for data dispersion and precision.",
      ja: "Calculate Relative Standard Deviation (RSD) and Coefficient of Variation (CV) instantly. Free statistical analysis tool for data dispersion and precision.",
      ko: "Calculate Relative Standard Deviation (RSD) and Coefficient of Variation (CV) instantly. Free statistical analysis tool for data dispersion and precision.",
      es: "Calculate Relative Standard Deviation (RSD) and Coefficient of Variation (CV) instantly. Free statistical analysis tool for data dispersion and precision.",
      fr: "Calculate Relative Standard Deviation (RSD) and Coefficient of Variation (CV) instantly. Free statistical analysis tool for data dispersion and precision.",
      de: "Calculate Relative Standard Deviation (RSD) and Coefficient of Variation (CV) instantly. Free statistical analysis tool for data dispersion and precision.",
      pt: "Calculate Relative Standard Deviation (RSD) and Coefficient of Variation (CV) instantly. Free statistical analysis tool for data dispersion and precision.",
      ru: "Calculate Relative Standard Deviation (RSD) and Coefficient of Variation (CV) instantly. Free statistical analysis tool for data dispersion and precision."
    }
  },
  {
    id: "repeated-measures-anova-calculator",
    category: "statistic",
    slugs: {
      en: "repeated-measures-anova-calculator",
      "zh-CN": "repeated-measures-anova-calculator",
      "zh-TW": "repeated-measures-anova-calculator",
      ja: "repeated-measures-anova-calculator",
      ko: "repeated-measures-anova-calculator",
      es: "repeated-measures-anova-calculator",
      fr: "repeated-measures-anova-calculator",
      de: "repeated-measures-anova-calculator",
      pt: "repeated-measures-anova-calculator",
      ru: "repeated-measures-anova-calculator"
    },
    titles: {
      en: "Repeated Measures ANOVA Calculator - η² and F",
      "zh-CN": "Repeated Measures ANOVA Calculator - η² and F",
      "zh-TW": "Repeated Measures ANOVA Calculator - η² and F",
      ja: "Repeated Measures ANOVA Calculator - η² and F",
      ko: "Repeated Measures ANOVA Calculator - η² and F",
      es: "Repeated Measures ANOVA Calculator - η² and F",
      fr: "Repeated Measures ANOVA Calculator - η² and F",
      de: "Repeated Measures ANOVA Calculator - η² and F",
      pt: "Repeated Measures ANOVA Calculator - η² and F",
      ru: "Repeated Measures ANOVA Calculator - η² and F"
    },
    descriptions: {
      en: "Perform one-way repeated measures ANOVA analysis. Enter subject data to get F-statistic, effect size (eta squared), and complete ANOVA table instantly.",
      "zh-CN": "Perform one-way repeated measures ANOVA analysis. Enter subject data to get F-statistic, effect size (eta squared), and complete ANOVA table instantly.",
      "zh-TW": "Perform one-way repeated measures ANOVA analysis. Enter subject data to get F-statistic, effect size (eta squared), and complete ANOVA table instantly.",
      ja: "Perform one-way repeated measures ANOVA analysis. Enter subject data to get F-statistic, effect size (eta squared), and complete ANOVA table instantly.",
      ko: "Perform one-way repeated measures ANOVA analysis. Enter subject data to get F-statistic, effect size (eta squared), and complete ANOVA table instantly.",
      es: "Perform one-way repeated measures ANOVA analysis. Enter subject data to get F-statistic, effect size (eta squared), and complete ANOVA table instantly.",
      fr: "Perform one-way repeated measures ANOVA analysis. Enter subject data to get F-statistic, effect size (eta squared), and complete ANOVA table instantly.",
      de: "Perform one-way repeated measures ANOVA analysis. Enter subject data to get F-statistic, effect size (eta squared), and complete ANOVA table instantly.",
      pt: "Perform one-way repeated measures ANOVA analysis. Enter subject data to get F-statistic, effect size (eta squared), and complete ANOVA table instantly.",
      ru: "Perform one-way repeated measures ANOVA analysis. Enter subject data to get F-statistic, effect size (eta squared), and complete ANOVA table instantly."
    }
  },
  {
    id: "residual-calculator",
    category: "statistic",
    slugs: {
      en: "residual-calculator",
      "zh-CN": "residual-calculator",
      "zh-TW": "residual-calculator",
      ja: "residual-calculator",
      ko: "residual-calculator",
      es: "residual-calculator",
      fr: "residual-calculator",
      de: "residual-calculator",
      pt: "residual-calculator",
      ru: "residual-calculator"
    },
    titles: {
      en: "Residual Calculator - Linear Regression Residuals Online",
      "zh-CN": "Residual Calculator - Linear Regression Residuals Online",
      "zh-TW": "Residual Calculator - Linear Regression Residuals Online",
      ja: "Residual Calculator - Linear Regression Residuals Online",
      ko: "Residual Calculator - Linear Regression Residuals Online",
      es: "Residual Calculator - Linear Regression Residuals Online",
      fr: "Residual Calculator - Linear Regression Residuals Online",
      de: "Residual Calculator - Linear Regression Residuals Online",
      pt: "Residual Calculator - Linear Regression Residuals Online",
      ru: "Residual Calculator - Linear Regression Residuals Online"
    },
    descriptions: {
      en: "Calculate linear regression residuals instantly. Enter X and Y values to get the regression line, predicted values, residuals, and R-squared for any dataset.",
      "zh-CN": "Calculate linear regression residuals instantly. Enter X and Y values to get the regression line, predicted values, residuals, and R-squared for any dataset.",
      "zh-TW": "Calculate linear regression residuals instantly. Enter X and Y values to get the regression line, predicted values, residuals, and R-squared for any dataset.",
      ja: "Calculate linear regression residuals instantly. Enter X and Y values to get the regression line, predicted values, residuals, and R-squared for any dataset.",
      ko: "Calculate linear regression residuals instantly. Enter X and Y values to get the regression line, predicted values, residuals, and R-squared for any dataset.",
      es: "Calculate linear regression residuals instantly. Enter X and Y values to get the regression line, predicted values, residuals, and R-squared for any dataset.",
      fr: "Calculate linear regression residuals instantly. Enter X and Y values to get the regression line, predicted values, residuals, and R-squared for any dataset.",
      de: "Calculate linear regression residuals instantly. Enter X and Y values to get the regression line, predicted values, residuals, and R-squared for any dataset.",
      pt: "Calculate linear regression residuals instantly. Enter X and Y values to get the regression line, predicted values, residuals, and R-squared for any dataset.",
      ru: "Calculate linear regression residuals instantly. Enter X and Y values to get the regression line, predicted values, residuals, and R-squared for any dataset."
    }
  },
  {
    id: "risk-calculator",
    category: "statistic",
    slugs: {
      en: "risk-calculator",
      "zh-CN": "risk-calculator",
      "zh-TW": "risk-calculator",
      ja: "risk-calculator",
      ko: "risk-calculator",
      es: "risk-calculator",
      fr: "risk-calculator",
      de: "risk-calculator",
      pt: "risk-calculator",
      ru: "risk-calculator"
    },
    titles: {
      en: "Risk Calculator - Relative Risk, Absolute Risk & NNT",
      "zh-CN": "Risk Calculator - Relative Risk, Absolute Risk & NNT",
      "zh-TW": "Risk Calculator - Relative Risk, Absolute Risk & NNT",
      ja: "Risk Calculator - Relative Risk, Absolute Risk & NNT",
      ko: "Risk Calculator - Relative Risk, Absolute Risk & NNT",
      es: "Risk Calculator - Relative Risk, Absolute Risk & NNT",
      fr: "Risk Calculator - Relative Risk, Absolute Risk & NNT",
      de: "Risk Calculator - Relative Risk, Absolute Risk & NNT",
      pt: "Risk Calculator - Relative Risk, Absolute Risk & NNT",
      ru: "Risk Calculator - Relative Risk, Absolute Risk & NNT"
    },
    descriptions: {
      en: "Calculate relative risk (RR), absolute risk reduction (ARR), and number needed to treat (NNT). Free online risk calculator for clinical trials and epidemiology.",
      "zh-CN": "Calculate relative risk (RR), absolute risk reduction (ARR), and number needed to treat (NNT). Free online risk calculator for clinical trials and epidemiology.",
      "zh-TW": "Calculate relative risk (RR), absolute risk reduction (ARR), and number needed to treat (NNT). Free online risk calculator for clinical trials and epidemiology.",
      ja: "Calculate relative risk (RR), absolute risk reduction (ARR), and number needed to treat (NNT). Free online risk calculator for clinical trials and epidemiology.",
      ko: "Calculate relative risk (RR), absolute risk reduction (ARR), and number needed to treat (NNT). Free online risk calculator for clinical trials and epidemiology.",
      es: "Calculate relative risk (RR), absolute risk reduction (ARR), and number needed to treat (NNT). Free online risk calculator for clinical trials and epidemiology.",
      fr: "Calculate relative risk (RR), absolute risk reduction (ARR), and number needed to treat (NNT). Free online risk calculator for clinical trials and epidemiology.",
      de: "Calculate relative risk (RR), absolute risk reduction (ARR), and number needed to treat (NNT). Free online risk calculator for clinical trials and epidemiology.",
      pt: "Calculate relative risk (RR), absolute risk reduction (ARR), and number needed to treat (NNT). Free online risk calculator for clinical trials and epidemiology.",
      ru: "Calculate relative risk (RR), absolute risk reduction (ARR), and number needed to treat (NNT). Free online risk calculator for clinical trials and epidemiology."
    }
  },
  {
    id: "roc-curve-calculator",
    category: "statistic",
    slugs: {
      en: "roc-curve-calculator",
      "zh-CN": "roc-curve-calculator",
      "zh-TW": "roc-curve-calculator",
      ja: "roc-curve-calculator",
      ko: "roc-curve-calculator",
      es: "roc-curve-calculator",
      fr: "roc-curve-calculator",
      de: "roc-curve-calculator",
      pt: "roc-curve-calculator",
      ru: "roc-curve-calculator"
    },
    titles: {
      en: "ROC Curve & AUC Calculator - Binary Classifier Evaluation",
      "zh-CN": "ROC Curve & AUC Calculator - Binary Classifier Evaluation",
      "zh-TW": "ROC Curve & AUC Calculator - Binary Classifier Evaluation",
      ja: "ROC Curve & AUC Calculator - Binary Classifier Evaluation",
      ko: "ROC Curve & AUC Calculator - Binary Classifier Evaluation",
      es: "ROC Curve & AUC Calculator - Binary Classifier Evaluation",
      fr: "ROC Curve & AUC Calculator - Binary Classifier Evaluation",
      de: "ROC Curve & AUC Calculator - Binary Classifier Evaluation",
      pt: "ROC Curve & AUC Calculator - Binary Classifier Evaluation",
      ru: "ROC Curve & AUC Calculator - Binary Classifier Evaluation"
    },
    descriptions: {
      en: "Calculate AUC and plot ROC curves for binary classifiers. Input prediction scores and true labels to get sensitivity, specificity, and optimal threshold.",
      "zh-CN": "Calculate AUC and plot ROC curves for binary classifiers. Input prediction scores and true labels to get sensitivity, specificity, and optimal threshold.",
      "zh-TW": "Calculate AUC and plot ROC curves for binary classifiers. Input prediction scores and true labels to get sensitivity, specificity, and optimal threshold.",
      ja: "Calculate AUC and plot ROC curves for binary classifiers. Input prediction scores and true labels to get sensitivity, specificity, and optimal threshold.",
      ko: "Calculate AUC and plot ROC curves for binary classifiers. Input prediction scores and true labels to get sensitivity, specificity, and optimal threshold.",
      es: "Calculate AUC and plot ROC curves for binary classifiers. Input prediction scores and true labels to get sensitivity, specificity, and optimal threshold.",
      fr: "Calculate AUC and plot ROC curves for binary classifiers. Input prediction scores and true labels to get sensitivity, specificity, and optimal threshold.",
      de: "Calculate AUC and plot ROC curves for binary classifiers. Input prediction scores and true labels to get sensitivity, specificity, and optimal threshold.",
      pt: "Calculate AUC and plot ROC curves for binary classifiers. Input prediction scores and true labels to get sensitivity, specificity, and optimal threshold.",
      ru: "Calculate AUC and plot ROC curves for binary classifiers. Input prediction scores and true labels to get sensitivity, specificity, and optimal threshold."
    }
  },
  {
    id: "poisson-distribution-calculator",
    category: "statistic",
    slugs: {
      en: "poisson-distribution-calculator",
      "zh-CN": "poisson-distribution-calculator",
      "zh-TW": "poisson-distribution-calculator",
      ja: "poisson-distribution-calculator",
      ko: "poisson-distribution-calculator",
      es: "poisson-distribution-calculator",
      fr: "poisson-distribution-calculator",
      de: "poisson-distribution-calculator",
      pt: "poisson-distribution-calculator",
      ru: "poisson-distribution-calculator"
    },
    titles: {
      en: "Poisson Distribution Calculator - Probability",
      "zh-CN": "Poisson Distribution Calculator - Probability",
      "zh-TW": "Poisson Distribution Calculator - Probability",
      ja: "Poisson Distribution Calculator - Probability",
      ko: "Poisson Distribution Calculator - Probability",
      es: "Poisson Distribution Calculator - Probability",
      fr: "Poisson Distribution Calculator - Probability",
      de: "Poisson Distribution Calculator - Probability",
      pt: "Poisson Distribution Calculator - Probability",
      ru: "Poisson Distribution Calculator - Probability"
    },
    descriptions: {
      en: "Calculate exact and cumulative Poisson probabilities instantly. Find P(X=x), P(X≤x), P(X≥x) for any lambda and event count — free online statistics tool.",
      "zh-CN": "Calculate exact and cumulative Poisson probabilities instantly. Find P(X=x), P(X≤x), P(X≥x) for any lambda and event count — free online statistics tool.",
      "zh-TW": "Calculate exact and cumulative Poisson probabilities instantly. Find P(X=x), P(X≤x), P(X≥x) for any lambda and event count — free online statistics tool.",
      ja: "Calculate exact and cumulative Poisson probabilities instantly. Find P(X=x), P(X≤x), P(X≥x) for any lambda and event count — free online statistics tool.",
      ko: "Calculate exact and cumulative Poisson probabilities instantly. Find P(X=x), P(X≤x), P(X≥x) for any lambda and event count — free online statistics tool.",
      es: "Calculate exact and cumulative Poisson probabilities instantly. Find P(X=x), P(X≤x), P(X≥x) for any lambda and event count — free online statistics tool.",
      fr: "Calculate exact and cumulative Poisson probabilities instantly. Find P(X=x), P(X≤x), P(X≥x) for any lambda and event count — free online statistics tool.",
      de: "Calculate exact and cumulative Poisson probabilities instantly. Find P(X=x), P(X≤x), P(X≥x) for any lambda and event count — free online statistics tool.",
      pt: "Calculate exact and cumulative Poisson probabilities instantly. Find P(X=x), P(X≤x), P(X≥x) for any lambda and event count — free online statistics tool.",
      ru: "Calculate exact and cumulative Poisson probabilities instantly. Find P(X=x), P(X≤x), P(X≥x) for any lambda and event count — free online statistics tool."
    }
  },
  {
    id: "polynomial-regression-calculator",
    category: "statistic",
    slugs: {
      en: "polynomial-regression-calculator",
      "zh-CN": "polynomial-regression-calculator",
      "zh-TW": "polynomial-regression-calculator",
      ja: "polynomial-regression-calculator",
      ko: "polynomial-regression-calculator",
      es: "polynomial-regression-calculator",
      fr: "polynomial-regression-calculator",
      de: "polynomial-regression-calculator",
      pt: "polynomial-regression-calculator",
      ru: "polynomial-regression-calculator"
    },
    titles: {
      en: "Polynomial Regression Calculator - Curve Fitting",
      "zh-CN": "Polynomial Regression Calculator - Curve Fitting",
      "zh-TW": "Polynomial Regression Calculator - Curve Fitting",
      ja: "Polynomial Regression Calculator - Curve Fitting",
      ko: "Polynomial Regression Calculator - Curve Fitting",
      es: "Polynomial Regression Calculator - Curve Fitting",
      fr: "Polynomial Regression Calculator - Curve Fitting",
      de: "Polynomial Regression Calculator - Curve Fitting",
      pt: "Polynomial Regression Calculator - Curve Fitting",
      ru: "Polynomial Regression Calculator - Curve Fitting"
    },
    descriptions: {
      en: "Fit data to a polynomial equation with this free curve fitting tool. Get the best-fit polynomial equation, R-squared value, and predict new values instantly.",
      "zh-CN": "Fit data to a polynomial equation with this free curve fitting tool. Get the best-fit polynomial equation, R-squared value, and predict new values instantly.",
      "zh-TW": "Fit data to a polynomial equation with this free curve fitting tool. Get the best-fit polynomial equation, R-squared value, and predict new values instantly.",
      ja: "Fit data to a polynomial equation with this free curve fitting tool. Get the best-fit polynomial equation, R-squared value, and predict new values instantly.",
      ko: "Fit data to a polynomial equation with this free curve fitting tool. Get the best-fit polynomial equation, R-squared value, and predict new values instantly.",
      es: "Fit data to a polynomial equation with this free curve fitting tool. Get the best-fit polynomial equation, R-squared value, and predict new values instantly.",
      fr: "Fit data to a polynomial equation with this free curve fitting tool. Get the best-fit polynomial equation, R-squared value, and predict new values instantly.",
      de: "Fit data to a polynomial equation with this free curve fitting tool. Get the best-fit polynomial equation, R-squared value, and predict new values instantly.",
      pt: "Fit data to a polynomial equation with this free curve fitting tool. Get the best-fit polynomial equation, R-squared value, and predict new values instantly.",
      ru: "Fit data to a polynomial equation with this free curve fitting tool. Get the best-fit polynomial equation, R-squared value, and predict new values instantly."
    }
  },
  {
    id: "pooled-standard-deviation-calculator",
    category: "statistic",
    slugs: {
      en: "pooled-standard-deviation-calculator",
      "zh-CN": "pooled-standard-deviation-calculator",
      "zh-TW": "pooled-standard-deviation-calculator",
      ja: "pooled-standard-deviation-calculator",
      ko: "pooled-standard-deviation-calculator",
      es: "pooled-standard-deviation-calculator",
      fr: "pooled-standard-deviation-calculator",
      de: "pooled-standard-deviation-calculator",
      pt: "pooled-standard-deviation-calculator",
      ru: "pooled-standard-deviation-calculator"
    },
    titles: {
      en: "Pooled Standard Deviation Calculator - Two Samples",
      "zh-CN": "Pooled Standard Deviation Calculator - Two Samples",
      "zh-TW": "Pooled Standard Deviation Calculator - Two Samples",
      ja: "Pooled Standard Deviation Calculator - Two Samples",
      ko: "Pooled Standard Deviation Calculator - Two Samples",
      es: "Pooled Standard Deviation Calculator - Two Samples",
      fr: "Pooled Standard Deviation Calculator - Two Samples",
      de: "Pooled Standard Deviation Calculator - Two Samples",
      pt: "Pooled Standard Deviation Calculator - Two Samples",
      ru: "Pooled Standard Deviation Calculator - Two Samples"
    },
    descriptions: {
      en: "Calculate the pooled standard deviation for two samples using sizes, means, and standard deviations. Accurate results for t-tests and statistical analysis.",
      "zh-CN": "Calculate the pooled standard deviation for two samples using sizes, means, and standard deviations. Accurate results for t-tests and statistical analysis.",
      "zh-TW": "Calculate the pooled standard deviation for two samples using sizes, means, and standard deviations. Accurate results for t-tests and statistical analysis.",
      ja: "Calculate the pooled standard deviation for two samples using sizes, means, and standard deviations. Accurate results for t-tests and statistical analysis.",
      ko: "Calculate the pooled standard deviation for two samples using sizes, means, and standard deviations. Accurate results for t-tests and statistical analysis.",
      es: "Calculate the pooled standard deviation for two samples using sizes, means, and standard deviations. Accurate results for t-tests and statistical analysis.",
      fr: "Calculate the pooled standard deviation for two samples using sizes, means, and standard deviations. Accurate results for t-tests and statistical analysis.",
      de: "Calculate the pooled standard deviation for two samples using sizes, means, and standard deviations. Accurate results for t-tests and statistical analysis.",
      pt: "Calculate the pooled standard deviation for two samples using sizes, means, and standard deviations. Accurate results for t-tests and statistical analysis.",
      ru: "Calculate the pooled standard deviation for two samples using sizes, means, and standard deviations. Accurate results for t-tests and statistical analysis."
    }
  },
  {
    id: "population-variance-calculator",
    category: "statistic",
    slugs: {
      en: "population-variance-calculator",
      "zh-CN": "population-variance-calculator",
      "zh-TW": "population-variance-calculator",
      ja: "population-variance-calculator",
      ko: "population-variance-calculator",
      es: "population-variance-calculator",
      fr: "population-variance-calculator",
      de: "population-variance-calculator",
      pt: "population-variance-calculator",
      ru: "population-variance-calculator"
    },
    titles: {
      en: "Population Variance Calculator - Dispersion Analysis",
      "zh-CN": "Population Variance Calculator - Dispersion Analysis",
      "zh-TW": "Population Variance Calculator - Dispersion Analysis",
      ja: "Population Variance Calculator - Dispersion Analysis",
      ko: "Population Variance Calculator - Dispersion Analysis",
      es: "Population Variance Calculator - Dispersion Analysis",
      fr: "Population Variance Calculator - Dispersion Analysis",
      de: "Population Variance Calculator - Dispersion Analysis",
      pt: "Population Variance Calculator - Dispersion Analysis",
      ru: "Population Variance Calculator - Dispersion Analysis"
    },
    descriptions: {
      en: "Calculate population variance, standard deviation, and mean for any data set. Free online statistical dispersion tool — paste numbers and get results instantly.",
      "zh-CN": "Calculate population variance, standard deviation, and mean for any data set. Free online statistical dispersion tool — paste numbers and get results instantly.",
      "zh-TW": "Calculate population variance, standard deviation, and mean for any data set. Free online statistical dispersion tool — paste numbers and get results instantly.",
      ja: "Calculate population variance, standard deviation, and mean for any data set. Free online statistical dispersion tool — paste numbers and get results instantly.",
      ko: "Calculate population variance, standard deviation, and mean for any data set. Free online statistical dispersion tool — paste numbers and get results instantly.",
      es: "Calculate population variance, standard deviation, and mean for any data set. Free online statistical dispersion tool — paste numbers and get results instantly.",
      fr: "Calculate population variance, standard deviation, and mean for any data set. Free online statistical dispersion tool — paste numbers and get results instantly.",
      de: "Calculate population variance, standard deviation, and mean for any data set. Free online statistical dispersion tool — paste numbers and get results instantly.",
      pt: "Calculate population variance, standard deviation, and mean for any data set. Free online statistical dispersion tool — paste numbers and get results instantly.",
      ru: "Calculate population variance, standard deviation, and mean for any data set. Free online statistical dispersion tool — paste numbers and get results instantly."
    }
  },
  {
    id: "post-test-probability-calculator",
    category: "statistic",
    slugs: {
      en: "post-test-probability-calculator",
      "zh-CN": "post-test-probability-calculator",
      "zh-TW": "post-test-probability-calculator",
      ja: "post-test-probability-calculator",
      ko: "post-test-probability-calculator",
      es: "post-test-probability-calculator",
      fr: "post-test-probability-calculator",
      de: "post-test-probability-calculator",
      pt: "post-test-probability-calculator",
      ru: "post-test-probability-calculator"
    },
    titles: {
      en: "Post-Test Probability Calculator - Bayes Theorem",
      "zh-CN": "Post-Test Probability Calculator - Bayes Theorem",
      "zh-TW": "Post-Test Probability Calculator - Bayes Theorem",
      ja: "Post-Test Probability Calculator - Bayes Theorem",
      ko: "Post-Test Probability Calculator - Bayes Theorem",
      es: "Post-Test Probability Calculator - Bayes Theorem",
      fr: "Post-Test Probability Calculator - Bayes Theorem",
      de: "Post-Test Probability Calculator - Bayes Theorem",
      pt: "Post-Test Probability Calculator - Bayes Theorem",
      ru: "Post-Test Probability Calculator - Bayes Theorem"
    },
    descriptions: {
      en: "Calculate post-test probability using Bayes' theorem. Enter prior probability, sensitivity, and specificity to find PPV, NPV, and likelihood ratios.",
      "zh-CN": "Calculate post-test probability using Bayes' theorem. Enter prior probability, sensitivity, and specificity to find PPV, NPV, and likelihood ratios.",
      "zh-TW": "Calculate post-test probability using Bayes' theorem. Enter prior probability, sensitivity, and specificity to find PPV, NPV, and likelihood ratios.",
      ja: "Calculate post-test probability using Bayes' theorem. Enter prior probability, sensitivity, and specificity to find PPV, NPV, and likelihood ratios.",
      ko: "Calculate post-test probability using Bayes' theorem. Enter prior probability, sensitivity, and specificity to find PPV, NPV, and likelihood ratios.",
      es: "Calculate post-test probability using Bayes' theorem. Enter prior probability, sensitivity, and specificity to find PPV, NPV, and likelihood ratios.",
      fr: "Calculate post-test probability using Bayes' theorem. Enter prior probability, sensitivity, and specificity to find PPV, NPV, and likelihood ratios.",
      de: "Calculate post-test probability using Bayes' theorem. Enter prior probability, sensitivity, and specificity to find PPV, NPV, and likelihood ratios.",
      pt: "Calculate post-test probability using Bayes' theorem. Enter prior probability, sensitivity, and specificity to find PPV, NPV, and likelihood ratios.",
      ru: "Calculate post-test probability using Bayes' theorem. Enter prior probability, sensitivity, and specificity to find PPV, NPV, and likelihood ratios."
    }
  }
];
