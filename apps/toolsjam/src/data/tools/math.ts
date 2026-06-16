import type { ToolEntry } from "@/data/tools";

export const tools: ToolEntry[] = [
  {
    id: "percentage-calculator",
    category: "math",
    slugs: {
      en: "percentage-calculator",
      "zh-CN": "baifenbi-jisuanqi",
      "zh-TW": "baifenbi-jisuanqi",
      ja: "pasento-keisan",
      ko: "baekbun-yul-gyesangi",
      es: "calculadora-porcentajes",
      fr: "calculateur-pourcentage",
      de: "prozentrechner",
      pt: "calculadora-porcentagem",
      ru: "kalkulyator-protsentov"
    },
    titles: {
      en: "Percentage Calculator - Calculate Percent of a Number",
      "zh-CN": "百分比计算器 - 计算数字的百分比",
      "zh-TW": "百分比計算器 - 計算數字的百分比",
      ja: "パーセント計算機 - 数値の割合を計算",
      ko: "백분율 계산기 - 숫자의 퍼센트 계산",
      es: "Calculadora de porcentajes - calcula porcentajes",
      fr: "Calculateur de pourcentage - calculer un pourcentage",
      de: "Prozentrechner - Prozente eines Werts berechnen",
      pt: "Calculadora de porcentagem - calcule percentuais",
      ru: "Калькулятор процентов - расчет процента от числа"
    },
    descriptions: {
      en: "Percentage calculator for X% of Y, percent change, discounts, tips, tax, and reverse percentages. Get clear answers with formulas instantly.",
      "zh-CN": "百分比计算器可计算 X% 的 Y、百分比变化、折扣、小费、税费和反向百分比，并即时给出公式和清晰结果。",
      "zh-TW": "百分比計算器可計算 X% 的 Y、百分比變化、折扣、小費、稅金與反向百分比，立即提供清楚答案與公式。",
      ja: "X% of Y、増減率、割引、チップ、税金、逆算に対応するパーセント計算機。式付きで結果をすぐ確認できます。",
      ko: "X% of Y, 증감률, 할인, 팁, 세금, 역백분율을 계산하는 백분율 계산기입니다. 공식과 명확한 답을 즉시 확인하세요.",
      es: "Calculadora de porcentajes para X% de Y, cambios, descuentos, propinas, impuestos y porcentajes inversos. Resultados claros con fórmulas al instante.",
      fr: "Calculateur de pourcentage pour X% de Y, variation, remises, pourboires, taxes et pourcentages inverses. Résultats clairs avec formules.",
      de: "Prozentrechner für X% von Y, prozentuale Änderung, Rabatte, Trinkgeld, Steuern und Rückwärtsrechnung. Sofort klare Ergebnisse mit Formel.",
      pt: "Calculadora de porcentagem para X% de Y, variação percentual, descontos, gorjetas, impostos e porcentagens inversas. Respostas com fórmulas.",
      ru: "Калькулятор процентов для X% от Y, изменения, скидок, чаевых, налогов и обратных процентов. Мгновенные ответы с формулами."
    }
  },
  {
    id: "expanded-form-calculator",
    category: "math",
    slugs: {
      en: "expanded-form-calculator",
      "zh-CN": "zhan-kai-shi-ji-suan-qi",
      "zh-TW": "zhan-kai-shi-ji-suan-qi",
      ja: "tenkaikei-keisanki",
      ko: "jeongae-hyeongsik-gyesangi",
      es: "calculadora-forma-desarrollada",
      fr: "calculatrice-forme-developpee",
      de: "erweiterte-form-rechner",
      pt: "calculadora-forma-expandida",
      ru: "kalkulyator-razvernutoy-formy"
    },
    titles: {
      en: "Expanded Form Calculator - Break Numbers by Place Value",
      "zh-CN": "展开式计算器 - 按位值分解数字",
      "zh-TW": "展開式計算器 - 依位值分解數字",
      ja: "展開形計算機 - 位取りで数を分解",
      ko: "전개형 계산기 - 자릿값으로 숫자 분해",
      es: "Calculadora de forma desarrollada por valor posicional",
      fr: "Calculatrice de forme développée par valeur de position",
      de: "Erweiterte-Form-Rechner nach Stellenwert",
      pt: "Calculadora de forma expandida por valor posicional",
      ru: "Калькулятор развернутой формы по разрядам"
    },
    descriptions: {
      en: "Expanded form calculator that breaks whole numbers, decimals, and negatives into place value parts. Learn number decomposition with instant results.",
      "zh-CN": "展开式计算器可将整数、小数和负数拆分为位值部分，即时显示数字分解结果，帮助理解数位结构。",
      "zh-TW": "展開式計算器可將整數、小數與負數拆成位值部分，即時顯示數字分解結果，幫助理解數位結構。",
      ja: "展開形計算機で整数・小数・負の数を位の値に分解。数の構成を即時に表示し、位取りの理解を助けます。",
      ko: "전개형 계산기로 정수, 소수, 음수를 자릿값별로 분해하고 숫자 구성을 즉시 확인해 자릿값 개념을 익히세요.",
      es: "Calculadora de forma desarrollada para descomponer enteros, decimales y negativos por valor posicional con resultados instantáneos.",
      fr: "Calculatrice de forme développée pour décomposer entiers, décimaux et nombres négatifs par valeur de position, avec résultats instantanés.",
      de: "Rechner für die erweiterte Form: Zerlegt ganze Zahlen, Dezimalzahlen und negative Zahlen nach Stellenwert mit sofortigem Ergebnis.",
      pt: "Calculadora de forma expandida para decompor inteiros, decimais e negativos por valor posicional, com resultados instantâneos.",
      ru: "Калькулятор развернутой формы раскладывает целые, десятичные и отрицательные числа по разрядам и сразу показывает результат."
    }
  },
  {
    id: "expanding-logarithms-calculator",
    category: "math",
    slugs: {
      en: "expanding-logarithms-calculator",
      "zh-CN": "duishu-zengzhang-jisuanqi",
      "zh-TW": "duishu-zengzhang-jisuanqi",
      ja: "taisuu-tenkai-keisan",
      ko: "logeu-jeongae-gyesangi",
      es: "calculadora-expansion-logaritmos",
      fr: "calculateur-developpement-logarithmes",
      de: "logarithmen-entwickeln-rechner",
      pt: "calculadora-expansao-logaritmos",
      ru: "rasshirenie-logarifmov-kalkulyator"
    },
    titles: {
      en: "Expanding Logarithms Calculator - Product Quotient Power",
      "zh-CN": "对数展开计算器",
      "zh-TW": "對數展開計算器",
      ja: "対数展開計算機",
      ko: "로그 전개 계산기",
      es: "Calculadora de expansión de logaritmos",
      fr: "Calculateur de développement de logarithmes",
      de: "Rechner zum Entwickeln von Logarithmen",
      pt: "Calculadora de expansão de logaritmos",
      ru: "Калькулятор раскрытия логарифмов"
    },
    descriptions: {
      en: "Expanding logarithms calculator for product, quotient, and power rules with ln, common log, or custom bases. See symbolic steps and numeric values.",
      "zh-CN": "用于乘积、商和幂法则的对数展开计算器，支持 ln、常用对数或自定义底数，并显示符号步骤和数值。",
      "zh-TW": "用於乘積、商與冪法則的對數展開計算器，支援 ln、常用對數或自訂底數，並顯示符號步驟與數值。",
      ja: "積・商・累乗の法則に対応した対数展開計算機。ln、常用対数、任意の底に対応し、式変形と数値も表示。",
      ko: "곱·나눗셈·거듭제곱 법칙을 적용하는 로그 전개 계산기. ln, 상용로그, 사용자 정의 밑을 지원하고 기호식과 값을 보여줍니다.",
      es: "Calculadora de expansión de logaritmos para las reglas del producto, cociente y potencia, con ln, log común o base personalizada.",
      fr: "Calculateur de développement de logarithmes pour les règles du produit, du quotient et de la puissance, avec ln, log commun ou base personnalisée.",
      de: "Rechner zum Entwickeln von Logarithmen für Produkt-, Quotienten- und Potenzregel mit ln, Zehnerlogarithmus oder eigener Basis.",
      pt: "Calculadora de expansão de logaritmos para as regras do produto, quociente e potência, com ln, log comum ou base personalizada.",
      ru: "Калькулятор раскрытия логарифмов по правилам произведения, частного и степени с ln, десятичным или произвольным основанием."
    }
  },
  {
    id: "exponent-calculator",
    category: "math",
    slugs: {
      en: "exponent-calculator",
      "zh-CN": "zhishu-jisuanqi",
      "zh-TW": "zhishu-jisuanqi",
      ja: "shisuu-keisanki",
      ko: "jisu-gyesangi",
      es: "calculadora-exponentes",
      fr: "calculatrice-exposants",
      de: "exponentenrechner",
      pt: "calculadora-de-expoentes",
      ru: "kalkulyator-stepeney"
    },
    titles: {
      en: "Exponent Calculator - Raise a Base to a Power",
      "zh-CN": "指数计算器",
      "zh-TW": "指數計算器",
      ja: "指数計算機",
      ko: "지수 계산기",
      es: "Calculadora de exponentes",
      fr: "Calculatrice d’exposants",
      de: "Exponentenrechner",
      pt: "Calculadora de expoentes",
      ru: "Калькулятор степеней"
    },
    descriptions: {
      en: "Exponent calculator for powers such as b^n with real bases and exponents. Get instant results, including 0^0 by convention and overflow handling.",
      "zh-CN": "指数计算器，支持实数底数和指数，立即计算 b^n，并处理 0^0 约定与溢出。",
      "zh-TW": "指數計算器，支援實數底數與指數，立即計算 b^n，並處理 0^0 約定與溢位。",
      ja: "実数の底と指数に対応した指数計算機。b^n をすぐ計算し、0^0 の慣例やオーバーフローも扱います。",
      ko: "실수 밑과 지수에 대응하는 지수 계산기입니다. b^n을 즉시 계산하고 0^0 관례와 오버플로도 처리합니다.",
      es: "Calculadora de exponentes para bases y exponentes reales. Calcula b^n al instante, con 0^0 por convención y control de desbordamiento.",
      fr: "Calculatrice d’exposants pour bases et exposants réels. Calcule b^n instantanément, avec 0^0 par convention et gestion du dépassement.",
      de: "Exponentenrechner für reelle Basen und Exponenten. Berechnet b^n sofort, inklusive 0^0 per Konvention und Overflow-Behandlung.",
      pt: "Calculadora de expoentes para bases e expoentes reais. Calcula b^n na hora, com 0^0 por convenção e tratamento de overflow.",
      ru: "Калькулятор степеней для вещественных оснований и показателей. Мгновенно вычисляет b^n, учитывая 0^0 по соглашению и переполнение."
    }
  },
  {
    id: "exponential-form-calculator",
    category: "math",
    slugs: {
      en: "exponential-form-calculator",
      "zh-CN": "zhishu-xingshi-jisuanqi",
      "zh-TW": "zhishu-xingshi-jisuanqi",
      ja: "shisu-keishiki-calculator",
      ko: "jisoo-hyeongsig-gyesangi",
      es: "calculadora-forma-exponencial",
      fr: "calculateur-forme-exponentielle",
      de: "exponentialform-rechner",
      pt: "calculadora-forma-exponencial",
      ru: "kalkulyator-pokazatelnoi-formy"
    },
    titles: {
      en: "Exponential Form Calculator - Scientific Notation Converter",
      "zh-CN": "指数形式计算器",
      "zh-TW": "指數形式計算器",
      ja: "指数形式計算機",
      ko: "지수 형식 계산기",
      es: "Calculadora de forma exponencial",
      fr: "Calculateur de forme exponentielle",
      de: "Rechner für Exponentialform",
      pt: "Calculadora de forma exponencial",
      ru: "Калькулятор показательной формы"
    },
    descriptions: {
      en: "Exponential form calculator for standard and scientific notation. Convert numbers to exponential form or back to ordinary notation instantly.",
      "zh-CN": "标准数与科学计数法转换计算器。可立即将数字转换为指数形式，或还原为普通写法。",
      "zh-TW": "標準數與科學記號轉換計算器。可立即將數字轉為指數形式，或還原為一般寫法。",
      ja: "標準表記と科学記数法を変換する計算機。数値を指数形式にしたり、通常表記に戻したりできます。",
      ko: "표준 표기와 과학적 표기를 변환하는 계산기입니다. 숫자를 지수 형식으로 바꾸거나 일반 표기로 되돌릴 수 있습니다.",
      es: "Calculadora para convertir entre notación estándar y científica. Convierte números a forma exponencial o de vuelta al instante.",
      fr: "Calculateur de notation standard et scientifique. Convertissez instantanément les nombres en forme exponentielle ou en écriture ordinaire.",
      de: "Rechner für Standard- und wissenschaftliche Schreibweise. Zahlen sofort in Exponentialform umwandeln oder zurück in die Dezimalschreibweise.",
      pt: "Calculadora de notação padrão e científica. Converta números para forma exponencial ou volte para a notação comum instantaneamente.",
      ru: "Калькулятор стандартной и научной записи. Мгновенно переводите числа в показательную форму или обратно в обычную запись."
    }
  },
  {
    id: "exponential-function-calculator",
    category: "math",
    slugs: {
      en: "exponential-function-calculator",
      "zh-CN": "zhishu-hanshu-jisuanqi",
      "zh-TW": "zhishu-hanshu-jisuanqi",
      ja: "shisu-kansu-keisan",
      ko: "jisu-hamsu-gye-san-gi",
      es: "calculadora-funcion-exponencial",
      fr: "calculateur-fonction-exponentielle",
      de: "exponentialfunktion-rechner",
      pt: "calculadora-funcao-exponencial",
      ru: "eksponentsialnaya-funktsiya-kalkulyator"
    },
    titles: {
      en: "Exponential Function Calculator - Evaluate a·b^x + c",
      "zh-CN": "指数函数计算器",
      "zh-TW": "指數函數計算機",
      ja: "指数関数計算機",
      ko: "지수 함수 계산기",
      es: "Calculadora de función exponencial",
      fr: "Calculateur de fonction exponentielle",
      de: "Exponentialfunktion-Rechner",
      pt: "Calculadora de função exponencial",
      ru: "Калькулятор экспоненциальной функции"
    },
    descriptions: {
      en: "Exponential function calculator for f(x)=a·b^x+c. Evaluate growth or decay with coefficient, base, input value, and vertical shift instantly.",
      "zh-CN": "指数函数计算器，用于计算 f(x)=a·b^x+c。输入系数、底数、x 值和竖直平移，立即查看增长或衰减结果。",
      "zh-TW": "指數函數計算機，計算 f(x)=a·b^x+c。輸入係數、底數、x 值與垂直位移，立即查看成長或衰減結果。",
      ja: "f(x)=a·b^x+c の指数関数を計算。係数、底、x、縦の移動量を入れるだけで、成長や減衰の結果をすぐ確認できます。",
      ko: "f(x)=a·b^x+c 지수함수를 계산합니다. 계수, 밑, x 값, 세로 이동을 입력하면 성장·감소 결과를 바로 확인할 수 있습니다.",
      es: "Calculadora de función exponencial para f(x)=a·b^x+c. Calcula crecimiento o decrecimiento al instante con coeficiente, base, x y desplazamiento vertical.",
      fr: "Calculateur de fonction exponentielle pour f(x)=a·b^x+c. Calculez instantanément croissance ou décroissance avec coefficient, base, x et translation verticale.",
      de: "Rechner für Exponentialfunktionen f(x)=a·b^x+c. Bestimmen Sie Wachstum oder Zerfall sofort mit Koeffizient, Basis, x und vertikalem Versatz.",
      pt: "Calculadora de função exponencial para f(x)=a·b^x+c. Veja crescimento ou decaimento instantaneamente com coeficiente, base, x e deslocamento vertical.",
      ru: "Калькулятор экспоненциальной функции f(x)=a·b^x+c. Мгновенно вычисляйте рост или спад по коэффициенту, основанию, x и вертикальному сдвигу."
    }
  },
  {
    id: "generic-rectangle-calculator",
    category: "math",
    slugs: {
      en: "generic-rectangle-calculator",
      "zh-CN": "tongyong-juxing-duoxiangshi-ji",
      "zh-TW": "tongyong-juxing-duoxiangshi-ji",
      ja: "ippan-chohokei-takoshiki-keisan",
      ko: "ilban-sagak-hangdasik-gyesangi",
      es: "calculadora-rectangulo-generico-polinomios",
      fr: "calculatrice-rectangle-generique-polynomes",
      de: "generischer-rechteck-rechner-polynome",
      pt: "calculadora-retangulo-generico-polinomios",
      ru: "kalkulyator-obobshchennogo-pryamougolnika-mnogochleny"
    },
    titles: {
      en: "Generic Rectangle Calculator - Box Method Polynomials",
      "zh-CN": "通用矩形计算器 - 多项式盒式方法",
      "zh-TW": "通用矩形計算器 - 多項式盒式方法",
      ja: "一般長方形計算機 - 多項式のボックス法",
      ko: "일반 직사각형 계산기 - 다항식 박스 방법",
      es: "Calculadora de rectángulo genérico para polinomios",
      fr: "Calculatrice de rectangle générique pour polynômes",
      de: "Generischer Rechteck-Rechner für Polynome",
      pt: "Calculadora de retângulo genérico para polinômios",
      ru: "Калькулятор обобщённого прямоугольника"
    },
    descriptions: {
      en: "Multiply polynomials visually using the generic rectangle box method. See the full multiplication table and simplified product instantly.",
      "zh-CN": "使用通用矩形盒式方法直观地乘多项式。即时查看完整乘法表和化简后的乘积。",
      "zh-TW": "使用通用矩形盒式方法直觀相乘多項式。立即查看完整乘法表與化簡後的乘積。",
      ja: "一般長方形のボックス法で多項式の積を視覚的に計算。完全な乗法表と簡約した積をすぐ確認できます。",
      ko: "일반 직사각형 박스 방법으로 다항식을 시각적으로 곱하세요. 전체 곱셈 표와 간단히 정리한 곱을 즉시 확인합니다.",
      es: "Multiplica polinomios visualmente con el método de caja del rectángulo genérico. Ve la tabla completa y el producto simplificado al instante.",
      fr: "Multipliez des polynômes visuellement avec la méthode de la boîte. Affichez aussitôt le tableau complet et le produit simplifié.",
      de: "Multipliziere Polynome visuell mit der Boxmethode des generischen Rechtecks. Sieh sofort Tabelle und vereinfachtes Produkt.",
      pt: "Multiplique polinômios visualmente com o método da caixa do retângulo genérico. Veja a tabela completa e o produto simplificado.",
      ru: "Умножайте многочлены наглядно методом коробки. Сразу смотрите полную таблицу умножения и упрощённое произведение."
    }
  },
  {
    id: "gcf-calculator-greatest-common-factor",
    category: "math",
    slugs: {
      en: "gcf-calculator-greatest-common-factor",
      "zh-CN": "zui-da-gong-yin-shu-ji-suan-qi",
      "zh-TW": "zui-da-gong-yin-shu-ji-suan-qi",
      ja: "saidaikoyakusu-keisanki",
      ko: "choedae-gongyaksu-gyesangi",
      es: "calculadora-mcd-maximo-comun-divisor",
      fr: "calculateur-pgcd-plus-grand-commun-diviseur",
      de: "ggt-rechner-groesster-gemeinsamer-teiler",
      pt: "calculadora-mdc-maximo-divisor-comum",
      ru: "kalkulyator-nod-naibolshiy-obshchiy-delitel"
    },
    titles: {
      en: "GCF Calculator - Greatest Common Factor of Numbers",
      "zh-CN": "最大公因数计算器 - 数字的 GCF",
      "zh-TW": "最大公因數計算器 - 數字的 GCF",
      ja: "最大公約数計算機 - 数値の GCF",
      ko: "최대공약수 계산기 - 숫자의 GCF",
      es: "Calculadora de MCD - Máximo común divisor",
      fr: "Calculateur de PGCD - Plus grand commun diviseur",
      de: "GGT-Rechner - Größter gemeinsamer Teiler",
      pt: "Calculadora de MDC - Máximo divisor comum",
      ru: "Калькулятор НОД - наибольший общий делитель"
    },
    descriptions: {
      en: "Calculate the Greatest Common Factor (GCF) of two or more integers using the Euclidean algorithm or prime factorization. Shows step-by-step work for learning.",
      "zh-CN": "使用欧几里得算法或质因数分解计算两个或多个整数的最大公因数（GCF），并显示学习用的分步过程。",
      "zh-TW": "使用歐幾里得演算法或質因數分解計算兩個或多個整數的最大公因數（GCF），並顯示學習用的逐步過程。",
      ja: "ユークリッドの互除法または素因数分解で、2つ以上の整数の最大公約数（GCF）を計算し、学習向けの手順も表示します。",
      ko: "유클리드 알고리즘 또는 소인수분해로 두 개 이상의 정수의 최대공약수(GCF)를 계산하고 학습용 풀이 과정을 보여줍니다.",
      es: "Calcula el máximo común divisor (MCD) de dos o más enteros con el algoritmo de Euclides o factorización prima, con pasos explicados.",
      fr: "Calculez le plus grand commun diviseur (PGCD) de deux entiers ou plus avec l’algorithme d’Euclide ou la factorisation première, étapes incluses.",
      de: "Berechne den größten gemeinsamen Teiler (GGT) von zwei oder mehr ganzen Zahlen mit dem euklidischen Algorithmus oder Primfaktorzerlegung.",
      pt: "Calcule o máximo divisor comum (MDC) de dois ou mais inteiros com o algoritmo de Euclides ou fatoração em primos, com passos.",
      ru: "Вычисляйте наибольший общий делитель (НОД) двух и более целых чисел алгоритмом Евклида или разложением на простые множители."
    }
  },
  {
    id: "gcf-and-lcm-calculator",
    category: "math",
    slugs: {
      en: "gcf-and-lcm-calculator",
      "zh-CN": "zui-da-gong-yin-shu-zui-xiao-gong-bei-shu-ji-suan-qi",
      "zh-TW": "zui-da-gong-yin-shu-zui-xiao-gong-bei-shu-ji-suan-qi",
      ja: "saidaikoyakusu-saishokobaisu-keisanki",
      ko: "choedae-gongyaksu-choeso-gongbaesu-gyesangi",
      es: "calculadora-mcd-mcm",
      fr: "calculateur-pgcd-ppcm",
      de: "ggt-kgv-rechner",
      pt: "calculadora-mdc-mmc",
      ru: "kalkulyator-nod-nok"
    },
    titles: {
      en: "GCF and LCM Calculator - Greatest Common Factor & LCM",
      "zh-CN": "最大公因数和最小公倍数计算器",
      "zh-TW": "最大公因數和最小公倍數計算器",
      ja: "最大公約数と最小公倍数の計算機",
      ko: "최대공약수와 최소공배수 계산기",
      es: "Calculadora de MCD y MCM",
      fr: "Calculateur de PGCD et PPCM",
      de: "GGT- und KGV-Rechner",
      pt: "Calculadora de MDC e MMC",
      ru: "Калькулятор НОД и НОК"
    },
    descriptions: {
      en: "Calculate the GCF and LCM of any set of numbers instantly. Uses the Euclidean algorithm and supports two or more positive integers.",
      "zh-CN": "即时计算任意一组数字的最大公因数和最小公倍数。使用欧几里得算法，支持两个或更多正整数。",
      "zh-TW": "即時計算任意一組數字的最大公因數和最小公倍數。使用歐幾里得演算法，支援兩個或更多正整數。",
      ja: "任意の数の集合の最大公約数と最小公倍数を瞬時に計算。ユークリッドの互除法を使用し、2つ以上の正の整数に対応します。",
      ko: "어떤 숫자 집합이든 최대공약수와 최소공배수를 즉시 계산합니다. 유클리드 알고리즘을 사용하며 두 개 이상의 양의 정수를 지원합니다.",
      es: "Calcula al instante el MCD y el MCM de cualquier conjunto de números. Usa el algoritmo de Euclides y admite dos o más enteros positivos.",
      fr: "Calculez instantanément le PGCD et le PPCM de n'importe quel ensemble de nombres. Utilise l'algorithme d'Euclide et accepte deux entiers positifs ou plus.",
      de: "Berechne sofort den GGT und das KGV beliebiger Zahlen. Nutzt den euklidischen Algorithmus und unterstützt zwei oder mehr positive ganze Zahlen.",
      pt: "Calcule instantaneamente o MDC e o MMC de qualquer conjunto de números. Usa o algoritmo de Euclides e aceita dois ou mais inteiros positivos.",
      ru: "Мгновенно вычисляйте НОД и НОК для любого набора чисел. Использует алгоритм Евклида и поддерживает два и более положительных целых числа."
    }
  },
  {
    id: "gauss-jordan-elimination-calculator",
    category: "math",
    slugs: {
      en: "gauss-jordan-elimination-calculator",
      "zh-CN": "gauss-jordan-xiaoyuan-jisuanqi",
      "zh-TW": "gauss-jordan-xiaoyuan-jisuanqi",
      ja: "gauss-jordan-renritsu-keisan",
      ko: "gaiseu-jodeon-yeonlip-jisangi",
      es: "calculadora-gauss-jordan-sistemas-lineales",
      fr: "calculateur-elimination-gauss-jordan-systemes-lineaires",
      de: "gauss-jordan-eliminierung-rechner-lineare-gleichungssysteme",
      pt: "calculadora-eliminacao-gauss-jordan-sistemas-lineares",
      ru: "kalkulyator-isklyucheniya-gaussa-dzhordana-sistemy-lineynykh-uravneniy"
    },
    titles: {
      en: "Gauss-Jordan Elimination Calculator - Solve Linear Systems",
      "zh-CN": "高斯-约当消元计算器",
      "zh-TW": "高斯-喬丹消元計算器",
      ja: "ガウス・ジョルダン消去計算機",
      ko: "가우스-조던 소거 계산기",
      es: "Calculadora de eliminación Gauss-Jordan",
      fr: "Calculateur d’élimination de Gauss-Jordan",
      de: "Gauss-Jordan-Eliminierungsrechner",
      pt: "Calculadora de eliminação Gauss-Jordan",
      ru: "Калькулятор исключения Гаусса-Жордана"
    },
    descriptions: {
      en: "Solve systems of linear equations using Gauss-Jordan elimination. Enter your augmented matrix to get the RREF and exact solution.",
      "zh-CN": "使用高斯-约当消元法求解线性方程组，输入增广矩阵即可得到 RREF 和精确解。",
      "zh-TW": "使用高斯-喬丹消元法求解線性方程組，輸入增廣矩陣即可得到 RREF 與精確解。",
      ja: "ガウス・ジョルダン消去法で連立一次方程式を解きます。拡大係数行列を入力すると RREF と厳密解を表示します。",
      ko: "가우스-조던 소거법으로 연립 선형방정식을 풉니다. 확장행렬을 입력하면 RREF와 정확한 해를 표시합니다.",
      es: "Resuelve sistemas lineales con eliminación Gauss-Jordan. Ingresa tu matriz aumentada para obtener la RREF y la solución exacta.",
      fr: "Résolvez des systèmes linéaires avec l’élimination de Gauss-Jordan. Saisissez votre matrice augmentée pour obtenir la RREF et la solution exacte.",
      de: "Löse lineare Gleichungssysteme mit der Gauss-Jordan-Elimination. Gib deine erweiterte Matrix ein, um die RREF und die exakte Lösung zu erhalten.",
      pt: "Resolva sistemas lineares com eliminação Gauss-Jordan. Insira sua matriz aumentada para obter a RREF e a solução exata.",
      ru: "Решайте системы линейных уравнений методом Гаусса-Жордана. Введите расширенную матрицу, чтобы получить RREF и точное решение."
    }
  },
  {
    id: "gamma-function-calculator",
    category: "math",
    slugs: {
      en: "gamma-function-calculator",
      "zh-CN": "gamma-hanshu-jisuanqi",
      "zh-TW": "gamma-hanshu-jisuanqi",
      ja: "gamma-kansu-keisanki",
      ko: "gamma-hamsu-gyesangi",
      es: "calculadora-funcion-gamma",
      fr: "calculateur-fonction-gamma",
      de: "gamma-funktion-rechner",
      pt: "calculadora-funcao-gama",
      ru: "gamma-funktsiya-kalkulyator"
    },
    titles: {
      en: "Gamma Function Calculator - Compute Γ(z) Online",
      "zh-CN": "Gamma函数计算器",
      "zh-TW": "Gamma函數計算器",
      ja: "ガンマ関数計算機",
      ko: "감마 함수 계산기",
      es: "Calculadora de la función gamma",
      fr: "Calculateur de la fonction gamma",
      de: "Gamma-Funktionsrechner",
      pt: "Calculadora da função gama",
      ru: "Калькулятор гамма-функции"
    },
    descriptions: {
      en: "Calculate the Gamma function Γ(z) for any real number using the Lanczos approximation. Instant results for factorials, integrals, and special functions.",
      "zh-CN": "使用 Lanczos 近似计算任意实数的 Gamma 函数 Γ(z)，快速得到阶乘、积分与特殊函数结果。",
      "zh-TW": "使用 Lanczos 近似計算任意實數的 Gamma 函數 Γ(z)，快速取得階乘、積分與特殊函數結果。",
      ja: "Lanczos 近似で任意の実数のガンマ関数 Γ(z) を計算し、階乗や積分、特殊関数の値をすぐに求められます。",
      ko: "Lanczos 근사로 임의의 실수에 대한 감마 함수 Γ(z)를 계산해 계수, 적분, 특수함수 값을 빠르게 확인하세요.",
      es: "Calcula la función gamma Γ(z) para cualquier número real con la aproximación de Lanczos. Resultados rápidos para factoriales e integrales.",
      fr: "Calculez la fonction gamma Γ(z) pour tout nombre réel avec l'approximation de Lanczos. Résultats rapides pour les factorielles et les intégrales.",
      de: "Berechnen Sie die Gamma-Funktion Γ(z) für jede reelle Zahl mit der Lanczos-Approximation. Schnelle Ergebnisse für Fakultäten und Integrale.",
      pt: "Calcule a função gama Γ(z) para qualquer número real com a aproximação de Lanczos. Resultados rápidos para fatoriais e integrais.",
      ru: "Вычисляйте гамма-функцию Γ(z) для любого действительного числа с помощью аппроксимации Ланцоша. Быстрые результаты для факториалов и интегралов."
    }
  },
  {
    id: "xor-calculator",
    category: "math",
    slugs: {
      en: "xor-calculator",
      "zh-CN": "xor-ji-suan-qi",
      "zh-TW": "xor-ji-suan-qi",
      ja: "xor-keisanki",
      ko: "xor-gyesangi",
      es: "calculadora-xor",
      fr: "calculatrice-xor",
      de: "xor-rechner",
      pt: "calculadora-xor",
      ru: "kalkulyator-xor"
    },
    titles: {
      en: "XOR Calculator - Exclusive OR Logic & Bitwise Operations",
      "zh-CN": "XOR计算器：异或逻辑与位运算",
      "zh-TW": "XOR計算器：異或邏輯與位元運算",
      ja: "XOR計算機：排他的論理とビット演算",
      ko: "XOR 계산기: 배타적 논리와 비트 연산",
      es: "Calculadora XOR: lógica exclusiva y bit a bit",
      fr: "Calculatrice XOR : logique exclusive et bits",
      de: "XOR-Rechner: Exklusiv-ODER und Bitoperationen",
      pt: "Calculadora XOR: lógica exclusiva e bits",
      ru: "Калькулятор XOR: исключающее ИЛИ и биты"
    },
    descriptions: {
      en: "Calculate XOR (Exclusive OR) for boolean values, binary sequences, and decimal integers with step-by-step explanations and truth tables.",
      "zh-CN": "计算布尔值、二进制序列和十进制整数的异或，并提供逐步说明与真值表。",
      "zh-TW": "計算布林值、二進位序列與十進位整數的異或，並提供逐步說明與真值表。",
      ja: "真偽値、2進数列、10進整数のXORを、真理値表と手順付きで計算します。",
      ko: "불리언 값, 이진수열, 10진 정수의 XOR를 단계별 설명과 진리표로 계산합니다.",
      es: "Calcula XOR para valores booleanos, secuencias binarias e enteros decimales con explicaciones paso a paso y tablas de verdad.",
      fr: "Calculez le XOR de valeurs booléennes, de séquences binaires et d'entiers décimaux avec explications pas à pas et table de vérité.",
      de: "Berechnen Sie XOR für boolesche Werte, Binärfolgen und Dezimalzahlen mit Schritt-für-Schritt-Erklärungen und Wahrheitstabelle.",
      pt: "Calcule XOR para valores booleanos, sequências binárias e inteiros decimais com explicações passo a passo e tabela verdade.",
      ru: "Вычисляйте XOR для булевых значений, двоичных последовательностей и десятичных целых с пошаговыми пояснениями и таблицей истинности."
    }
  },
  {
    id: "y-intercept-calculator",
    category: "math",
    slugs: {
      en: "y-intercept-calculator",
      "zh-CN": "y-jiejv-jisuanqi",
      "zh-TW": "y-jieju-jisuanqi",
      ja: "y-seppen-keisanki",
      ko: "y-jeolpyeon-gyesangi",
      es: "calculadora-interseccion-y",
      fr: "calculateur-ordonnee-origine",
      de: "y-achsenabschnitt-rechner",
      pt: "calculadora-intercepto-y",
      ru: "kalkulyator-y-peresecheniya"
    },
    titles: {
      en: "Y-Intercept Calculator - Find Y-Intercept of a Line",
      "zh-CN": "Y 截距计算器 - 求直线的 Y 截距",
      "zh-TW": "Y 截距計算器 - 求直線的 Y 截距",
      ja: "Y切片計算機 - 直線のY切片を求める",
      ko: "Y절편 계산기 - 직선의 Y절편 구하기",
      es: "Calculadora de intersección Y - hallar el corte",
      fr: "Calculateur d’ordonnée à l’origine",
      de: "Y-Achsenabschnitt-Rechner für Geraden",
      pt: "Calculadora de intercepto em Y",
      ru: "Калькулятор Y-пересечения прямой"
    },
    descriptions: {
      en: "Calculate the y-intercept and slope-intercept equation of a line from slope and point, or from two points. Instant results with the full equation.",
      "zh-CN": "根据斜率和一点，或两点，计算直线的 y 截距和斜截式方程。即时得到完整方程。",
      "zh-TW": "根據斜率和一點，或兩點，計算直線的 y 截距與斜截式方程式。即時取得完整方程式。",
      ja: "傾きと1点、または2点から直線の y 切片と傾き切片形の方程式を計算。完全な方程式をすぐに表示します。",
      ko: "기울기와 한 점 또는 두 점으로 직선의 y절편과 기울기-절편 방정식을 계산합니다. 전체 방정식을 즉시 확인하세요.",
      es: "Calcula la intersección con el eje y y la ecuación pendiente-intersección de una recta desde pendiente y punto, o desde dos puntos.",
      fr: "Calculez l’ordonnée à l’origine et l’équation réduite d’une droite à partir d’une pente et d’un point, ou de deux points.",
      de: "Berechne den y-Achsenabschnitt und die Geradengleichung in Steigungsform aus Steigung und Punkt oder aus zwei Punkten.",
      pt: "Calcule o intercepto em y e a equação da reta na forma inclinação-intercepto a partir de inclinação e ponto, ou de dois pontos.",
      ru: "Рассчитайте y-пересечение и уравнение прямой в виде y = mx + b по наклону и точке или по двум точкам."
    }
  },
  {
    id: "triangle-area-calculator",
    category: "math",
    slugs: {
      en: "triangle-area-calculator",
      "zh-CN": "sanjiao-mianji-jisuanqi",
      "zh-TW": "sanjiao-mianji-jisuanqi",
      ja: "sankakkei-menseki-keisan",
      ko: "samgak-hyeong-myeon-jeok-gyesan-gi",
      es: "calculadora-area-triangulo",
      fr: "calculatrice-aire-triangle",
      de: "dreiecksflaechen-rechner",
      pt: "calculadora-area-triangulo",
      ru: "kalkulyator-ploshchadi-treugolnika"
    },
    titles: {
      en: "Triangle Area Calculator - Base Height, Heron's, SAS",
      "zh-CN": "三角形面积计算器",
      "zh-TW": "三角形面積計算器",
      ja: "三角形の面積計算機",
      ko: "삼각형 면적 계산기",
      es: "Calculadora de área de triángulo",
      fr: "Calculatrice d’aire de triangle",
      de: "Dreiecksflächenrechner",
      pt: "Calculadora de área de triângulo",
      ru: "Калькулятор площади треугольника"
    },
    descriptions: {
      en: "Calculate triangle area using base and height, three sides (Heron's formula), or two sides and an angle (SAS). Instant results with formulas shown.",
      "zh-CN": "使用底和高、三边海伦公式或两边一角快速计算三角形面积，并显示公式。",
      "zh-TW": "使用底和高、三邊海龍公式或兩邊一角快速計算三角形面積，並顯示公式。",
      ja: "底辺と高さ、3辺のヘロンの公式、2辺と角度で三角形の面積をすばやく計算し、式も表示します。",
      ko: "밑변과 높이, 세 변의 헤론 공식, 두 변과 각도로 삼각형 면적을 빠르게 계산하고 공식을 표시합니다.",
      es: "Calcula al instante el área de un triángulo con base y altura, tres lados o dos lados y el ángulo incluido; muestra la fórmula.",
      fr: "Calculez instantanément l’aire d’un triangle avec base et hauteur, trois côtés ou deux côtés et l’angle compris, avec la formule.",
      de: "Berechnen Sie die Dreiecksfläche sofort mit Grundseite und Höhe, drei Seiten oder zwei Seiten und eingeschlossenem Winkel; Formel angezeigt.",
      pt: "Calcule a área de um triângulo pela base e altura, três lados ou dois lados e o ângulo incluído, com a fórmula exibida.",
      ru: "Быстро вычисляйте площадь треугольника по основанию и высоте, трём сторонам или двум сторонам и углу; формула показана."
    }
  },
  {
    id: "triangle-height-calculator",
    category: "math",
    slugs: {
      en: "triangle-height-calculator",
      "zh-CN": "sanjiao-gaodu-jisuanqi",
      "zh-TW": "sanjiao-xing-gaodu-ji-suan-qi",
      ja: "sankakkei-takasa-keisanki",
      ko: "samgak-hyeong-nop-i-kalkulyeotor",
      es: "calculadora-altura-triangulo",
      fr: "calculateur-hauteur-triangle",
      de: "dreieck-hoehen-rechner",
      pt: "calculadora-altura-triangulo",
      ru: "kalkulyator-vysoty-treugolnika"
    },
    titles: {
      en: "Triangle Height Calculator - Find Altitude Instantly",
      "zh-CN": "三角形高度计算器",
      "zh-TW": "三角形高度計算器",
      ja: "三角形の高さ計算器",
      ko: "삼각형 높이 계산기",
      es: "Calculadora de altura de triángulos",
      fr: "Calculateur de hauteur de triangle",
      de: "Dreieck-Höhenrechner",
      pt: "Calculadora de altura de triângulo",
      ru: "Калькулятор высоты треугольника"
    },
    descriptions: {
      en: "Find the altitude of any triangle from area and base, three side lengths, or two sides and an angle. All three heights returned for the three-sides method.",
      "zh-CN": "从面积和底边、三边或两边夹角快速求三角形高。三边法可一次返回三个高。",
      "zh-TW": "從面積和底邊、三邊或兩邊夾角快速求三角形高。三邊法可一次回傳三個高。",
      ja: "面積と底辺、3辺、2辺と角度から三角形の高さを即算。3辺法では3つの高さを一度に表示。",
      ko: "넓이와 밑변, 세 변, 또는 두 변과 끼인각으로 삼각형 높이를 계산합니다. 세 변 방식은 세 높이를 모두 보여줍니다.",
      es: "Calcula la altura de cualquier triángulo con área y base, tres lados o dos lados y un ángulo. Con tres lados devuelve las tres alturas.",
      fr: "Trouvez la hauteur d’un triangle à partir de l’aire et de la base, de trois côtés ou de deux côtés et d’un angle. Trois hauteurs en mode 3 côtés.",
      de: "Berechne die Höhe jedes Dreiecks aus Fläche und Basis, drei Seiten oder zwei Seiten und Winkel. Bei drei Seiten werden alle drei Höhen angezeigt.",
      pt: "Calcule a altura de qualquer triângulo a partir da área e da base, de três lados ou de dois lados e um ângulo. No método de três lados, mostra as três alturas.",
      ru: "Найдите высоту любого треугольника по площади и основанию, трём сторонам или двум сторонам и углу. При трёх сторонах показываются все высоты."
    }
  },
  {
    id: "triangle-inequality-theorem-calculator",
    category: "math",
    slugs: {
      en: "triangle-inequality-theorem-calculator",
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
      en: "Triangle Inequality Theorem Calculator - Validate Sides",
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
      en: "Check if three side lengths satisfy the triangle inequality theorem and form a valid triangle. Classifies result as equilateral, isosceles, or scalene.",
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
    id: "triangular-numbers-calculator",
    category: "math",
    slugs: {
      en: "triangular-numbers-calculator",
      "zh-CN": "san-jiao-shu-ji-suan-qi",
      "zh-TW": "san-jiao-shu-ji-suan-qi",
      ja: "sankakusu-keisanki",
      ko: "samgaksu-gyesangi",
      es: "calculadora-numeros-triangulares",
      fr: "calculatrice-nombres-triangulaires",
      de: "dreieckszahlen-rechner",
      pt: "calculadora-numeros-triangulares",
      ru: "kalkulyator-treugolnyh-chisel"
    },
    titles: {
      en: "Triangular Numbers Calculator - Find, Check & Generate",
      "zh-CN": "三角数计算器 - 查找、判断与生成",
      "zh-TW": "三角數計算器 - 查找、檢查與產生",
      ja: "三角数計算機 - 検索・判定・生成",
      ko: "삼각수 계산기 - 찾기, 판별, 생성",
      es: "Calculadora de números triangulares",
      fr: "Calculatrice de nombres triangulaires",
      de: "Dreieckszahlen-Rechner",
      pt: "Calculadora de números triangulares",
      ru: "Калькулятор треугольных чисел"
    },
    descriptions: {
      en: "Find the nth triangular number, check if any integer is triangular, or generate a sequence. Uses the formula T(n)=n(n+1)/2 with instant step-by-step results.",
      "zh-CN": "查找第 n 个三角数、判断任意整数是否为三角数，或生成序列。使用 T(n)=n(n+1)/2，立即显示分步结果。",
      "zh-TW": "查找第 n 個三角數、檢查任意整數是否為三角數，或產生序列。使用 T(n)=n(n+1)/2，立即顯示分步結果。",
      ja: "第 n 三角数の計算、整数が三角数かの判定、数列の生成ができます。T(n)=n(n+1)/2 を使い、手順付きの結果を即表示。",
      ko: "n번째 삼각수를 찾고, 정수가 삼각수인지 확인하거나 수열을 생성하세요. T(n)=n(n+1)/2 공식으로 단계별 결과를 즉시 표시합니다.",
      es: "Encuentra el número triangular n, comprueba si un entero es triangular o genera una secuencia con T(n)=n(n+1)/2 y resultados paso a paso.",
      fr: "Trouvez le n-ième nombre triangulaire, vérifiez si un entier est triangulaire ou générez une suite avec T(n)=n(n+1)/2 et étapes instantanées.",
      de: "Berechne die n-te Dreieckszahl, prüfe ganze Zahlen oder erzeuge eine Folge. Mit T(n)=n(n+1)/2 und sofortigen Schritt-für-Schritt-Ergebnissen.",
      pt: "Encontre o n-ésimo número triangular, confira se um inteiro é triangular ou gere uma sequência com T(n)=n(n+1)/2 e passos instantâneos.",
      ru: "Найдите n-е треугольное число, проверьте целое число или создайте последовательность по T(n)=n(n+1)/2 с мгновенными пошаговыми результатами."
    }
  },
  {
    id: "triangular-prism-calculator",
    category: "math",
    slugs: {
      en: "triangular-prism-calculator",
      "zh-CN": "sanjiao-zhu-jisuanqi",
      "zh-TW": "sanjiao-zhu-jisuanqi",
      ja: "sankaku-prism-keisanki",
      ko: "samgak-gidung-gyesangi",
      es: "calculadora-prisma-triangular",
      fr: "calculateur-prisme-triangulaire",
      de: "dreiecksprisma-rechner",
      pt: "calculadora-prisma-triangular",
      ru: "kalkulyator-treugolnoy-prizmy"
    },
    titles: {
      en: "Triangular Prism Calculator - Volume & Surface Area",
      "zh-CN": "三角棱柱计算器 - 体积与表面积",
      "zh-TW": "三角柱計算器 - 體積與表面積",
      ja: "三角柱計算機 - 体積と表面積",
      ko: "삼각기둥 계산기 - 부피와 표면적",
      es: "Calculadora de prisma triangular - Volumen y área",
      fr: "Calculateur de prisme triangulaire - Volume et aire",
      de: "Dreiecksprisma-Rechner - Volumen und Fläche",
      pt: "Calculadora de prisma triangular - Volume e área",
      ru: "Калькулятор треугольной призмы - объем и площадь"
    },
    descriptions: {
      en: "Calculate volume, base area, lateral surface area, and total surface area of any triangular prism. Enter three base sides and prism height for instant results.",
      "zh-CN": "计算任意三角棱柱的体积、底面积、侧面积和总表面积。输入三个底边和棱柱高度即可即时得出结果。",
      "zh-TW": "計算任意三角柱的體積、底面積、側表面積與總表面積。輸入三個底邊和柱高即可立即取得結果。",
      ja: "三角柱の体積、底面積、側面積、全表面積を計算します。底面の3辺と高さを入力するとすぐに結果が得られます。",
      ko: "삼각기둥의 부피, 밑면적, 옆면적, 전체 표면적을 계산합니다. 밑면 세 변과 높이를 입력하면 즉시 결과를 확인할 수 있습니다.",
      es: "Calcula volumen, área de base, área lateral y área total de cualquier prisma triangular. Ingresa tres lados de base y altura.",
      fr: "Calculez volume, aire de base, aire latérale et aire totale d’un prisme triangulaire avec les trois côtés et la hauteur.",
      de: "Berechnen Sie Volumen, Grundfläche, Mantelfläche und Oberfläche eines Dreiecksprismas mit drei Grundseiten und Höhe.",
      pt: "Calcule volume, área da base, área lateral e área total de qualquer prisma triangular com três lados e altura.",
      ru: "Рассчитайте объем, площадь основания, боковую и полную поверхность треугольной призмы по трем сторонам и высоте."
    }
  },
  {
    id: "time-percentage-calculator",
    category: "math",
    slugs: {
      en: "time-percentage-calculator",
      "zh-CN": "shijian-bili-jisuanqi",
      "zh-TW": "shijian-bili-jisuanqi",
      ja: "jikan-wariai-keisanki",
      ko: "sigan-biryul-gyesangi",
      es: "calculadora-porcentaje-tiempo",
      fr: "calculatrice-pourcentage-temps",
      de: "zeit-prozent-rechner",
      pt: "calculadora-porcentagem-tempo",
      ru: "kalkulyator-protsenta-vremeni"
    },
    titles: {
      en: "Time Percentage Calculator - Calculate % of Time",
      "zh-CN": "时间百分比计算器",
      "zh-TW": "時間百分比計算器",
      ja: "時間割合計算機",
      ko: "시간 백분율 계산기",
      es: "Calculadora de porcentaje de tiempo",
      fr: "Calculatrice de pourcentage de temps",
      de: "Zeit-Prozent-Rechner",
      pt: "Calculadora de porcentagem de tempo",
      ru: "Калькулятор процента времени"
    },
    descriptions: {
      en: "Calculate what percentage a time duration is of a total, find partial time from a percentage, or reverse-engineer the total time. Instant results.",
      "zh-CN": "计算时间占比、按百分比求部分时间，或反推总时长，立即得到结果。",
      "zh-TW": "計算時間占比、依百分比求部分時間，或反推總時長，立即得到結果。",
      ja: "時間の割合を計算し、割合から部分時間や合計時間もすぐ求めます。",
      ko: "시간의 비율을 계산하고, 비율로 부분 시간과 전체 시간을 바로 구합니다.",
      es: "Calcula qué porcentaje representa una duración, o halla el tiempo parcial o total al instante.",
      fr: "Calculez le pourcentage d’une durée, ou trouvez un temps partiel ou total en un instant.",
      de: "Berechnen Sie, wie viel Prozent eine Dauer ausmacht, oder ermitteln Sie Teil- und Gesamtzeit sofort.",
      pt: "Descubra a porcentagem de uma duração ou calcule o tempo parcial e o total na hora.",
      ru: "Узнайте, какой процент составляет длительность, или мгновенно найдите частичное и общее время."
    }
  },
  {
    id: "torus-surface-area-calculator",
    category: "math",
    slugs: {
      en: "torus-surface-area-calculator",
      "zh-CN": "tuorusimianji-jisuanqi",
      "zh-TW": "huanmian-biaomianji-jisuanqi",
      ja: "torasu-hyomenseki-keisanki",
      ko: "toreoseu-pyomyeonjeok-gyesangi",
      es: "calculadora-area-superficie-toro",
      fr: "calculateur-surface-tore",
      de: "torus-oberflaeche-rechner",
      pt: "calculadora-area-superficie-toro",
      ru: "kalkulyator-ploshchadi-poverhnosti-tora"
    },
    titles: {
      en: "Torus Surface Area Calculator - Donut Shape",
      "zh-CN": "环面表面积计算器 - 甜甜圈形状",
      "zh-TW": "環面表面積計算器 - 甜甜圈形狀",
      ja: "トーラス表面積計算機 - ドーナツ形状",
      ko: "토러스 표면적 계산기 - 도넛 모양",
      es: "Calculadora de área de superficie de toro",
      fr: "Calculateur de surface d’un tore",
      de: "Torus-Oberflächenrechner",
      pt: "Calculadora de área de superfície do toro",
      ru: "Калькулятор площади поверхности тора"
    },
    descriptions: {
      en: "Calculate the surface area of a torus using major and minor radii. Formula: 4π²Rr. Instant results for rings, tubes, O-rings, and design applications.",
      "zh-CN": "用大半径和小半径计算环面表面积。公式：4π²Rr。适用于圆环、管状件、O形圈和设计应用。",
      "zh-TW": "使用大半徑與小半徑計算環面表面積。公式：4π²Rr。適用於圓環、管件、O形環與設計應用。",
      ja: "大半径と小半径からトーラスの表面積を計算。公式：4π²Rr。リング、チューブ、Oリング、設計用途に対応。",
      ko: "큰반지름과 작은반지름으로 토러스 표면적을 계산하세요. 공식: 4π²Rr. 링, 튜브, O링, 설계 용도에 적합합니다.",
      es: "Calcula el área de superficie de un toro con radios mayor y menor. Fórmula: 4π²Rr. Resultados para anillos, tubos y juntas tóricas.",
      fr: "Calculez la surface d’un tore avec les rayons majeur et mineur. Formule : 4π²Rr. Résultats pour anneaux, tubes et joints toriques.",
      de: "Berechne die Oberfläche eines Torus mit großem und kleinem Radius. Formel: 4π²Rr. Für Ringe, Rohre, O-Ringe und Design.",
      pt: "Calcule a área de superfície de um toro com raios maior e menor. Fórmula: 4π²Rr. Para anéis, tubos, O-rings e projetos.",
      ru: "Рассчитайте площадь поверхности тора по большому и малому радиусам. Формула: 4π²Rr. Для колец, трубок, O-колец и проектирования."
    }
  },
  {
    id: "torus-volume-calculator",
    category: "math",
    slugs: {
      en: "torus-volume-calculator",
      "zh-CN": "yuanhuan-ti-ji-suanqi",
      "zh-TW": "yuanhuan-ti-ji-suanqi",
      ja: "toroido-taiseki-keisanki",
      ko: "toruseu-bupi-kalkulreiteo",
      es: "calculadora-volumen-toro",
      fr: "calculateur-volume-tore",
      de: "torus-volumen-rechner",
      pt: "calculadora-volume-toro",
      ru: "kalkulyator-obema-tora"
    },
    titles: {
      en: "Torus Volume Calculator - Donut Shape Volume",
      "zh-CN": "圆环体积计算器",
      "zh-TW": "圓環體積計算器",
      ja: "トーラス体積計算機",
      ko: "토러스 부피 계산기",
      es: "Calculadora de volumen de toro",
      fr: "Calculateur de volume de tore",
      de: "Torus-Volumen-Rechner",
      pt: "Calculadora de volume de toro",
      ru: "Калькулятор объёма тора"
    },
    descriptions: {
      en: "Calculate the volume of a torus using major and minor radii. Formula: 2π²Rr². Instant results for engineering, design, and geometry applications.",
      "zh-CN": "使用主半径和副半径计算圆环体积，公式为 2π²Rr²。适用于工程、设计和几何应用。",
      "zh-TW": "使用主半徑和副半徑計算圓環體積，公式為 2π²Rr²。適用於工程、設計與幾何應用。",
      ja: "主半径と小半径からトーラスの体積を計算します。式は 2π²Rr²。工学・設計・幾何で即利用できます。",
      ko: "대반지름과 소반지름으로 토러스의 부피를 계산합니다. 공식은 2π²Rr²이며 공학, 설계, 기하에 유용합니다.",
      es: "Calcula el volumen de un toro usando los radios mayor y menor. Fórmula: 2π²Rr². Útil para ingeniería, diseño y geometría.",
      fr: "Calcule le volume d’un tore à partir des rayons majeur et mineur. Formule : 2π²Rr². Idéal pour l’ingénierie, la conception et la géométrie.",
      de: "Berechnet das Volumen eines Torus mit Haupt- und Nebenradius. Formel: 2π²Rr². Für Technik, Design und Geometrie.",
      pt: "Calcula o volume de um toro usando os raios maior e menor. Fórmula: 2π²Rr². Útil para engenharia, design e geometria.",
      ru: "Вычисляет объём тора по большому и малому радиусам. Формула: 2π²Rr². Подходит для инженерии, дизайна и геометрии."
    }
  },
  {
    id: "trapezoid-calculator",
    category: "math",
    slugs: {
      en: "trapezoid-calculator",
      "zh-CN": "ti-xing-ji-suan-qi",
      "zh-TW": "ti-xing-ji-suan-qi",
      ja: "daikei-keisanki",
      ko: "sadarikkol-gyesangi",
      es: "calculadora-trapecio",
      fr: "calculateur-trapeze",
      de: "trapez-rechner",
      pt: "calculadora-trapezio",
      ru: "kalkulyator-trapetsii"
    },
    titles: {
      en: "Trapezoid Calculator - Area, Perimeter, Height",
      "zh-CN": "梯形计算器 - 面积、周长、高度",
      "zh-TW": "梯形計算器 - 面積、周長、高度",
      ja: "台形計算機 - 面積・周長・高さ",
      ko: "사다리꼴 계산기 - 넓이, 둘레, 높이",
      es: "Calculadora de trapecio - área, perímetro y altura",
      fr: "Calculateur de trapèze - aire, périmètre, hauteur",
      de: "Trapez-Rechner - Fläche, Umfang, Höhe",
      pt: "Calculadora de trapézio - área, perímetro e altura",
      ru: "Калькулятор трапеции - площадь, периметр, высота"
    },
    descriptions: {
      en: "Calculate the area, perimeter, height, or base of a trapezoid. Enter known values and choose what to find. Instant results with clear formulas.",
      "zh-CN": "计算梯形的面积、周长、高度或底边。输入已知值并选择要求的项目，即可获得清晰公式和即时结果。",
      "zh-TW": "計算梯形的面積、周長、高度或底邊。輸入已知值並選擇要求項目，即可取得清楚公式與即時結果。",
      ja: "台形の面積、周長、高さ、底辺を計算します。既知の値と求めたい項目を入力すれば、公式付きで結果をすぐに表示します。",
      ko: "사다리꼴의 넓이, 둘레, 높이 또는 밑변을 계산하세요. 알려진 값을 입력하고 구할 항목을 선택하면 공식과 결과가 즉시 표시됩니다.",
      es: "Calcula el área, perímetro, altura o base de un trapecio. Ingresa los valores conocidos, elige qué hallar y obtén resultados al instante con fórmulas claras.",
      fr: "Calculez l’aire, le périmètre, la hauteur ou une base d’un trapèze. Saisissez les valeurs connues et obtenez un résultat instantané avec les formules.",
      de: "Berechnen Sie Fläche, Umfang, Höhe oder Grundseite eines Trapezes. Bekannte Werte eingeben, Ziel wählen und sofort Ergebnisse mit klaren Formeln erhalten.",
      pt: "Calcule área, perímetro, altura ou base de um trapézio. Informe os valores conhecidos, escolha o que encontrar e veja resultados instantâneos com fórmulas claras.",
      ru: "Рассчитайте площадь, периметр, высоту или основание трапеции. Введите известные значения и получите мгновенный результат с понятными формулами."
    }
  },
  {
    id: "triangle-angle-calculator",
    category: "math",
    slugs: {
      en: "triangle-angle-calculator",
      "zh-CN": "san-jiao-xing-jiao-du-ji-suan-qi",
      "zh-TW": "san-jiao-xing-jiao-du-ji-suan-qi",
      ja: "sankakkei-kakudo-keisanki",
      ko: "samgak-hyeong-gakdo-gyesangi",
      es: "calculadora-angulos-triangulo",
      fr: "calculatrice-angles-triangle",
      de: "dreieck-winkel-rechner",
      pt: "calculadora-angulo-triangulo",
      ru: "kalkulyator-uglov-treugolnika"
    },
    titles: {
      en: "Triangle Angle Calculator - SSS and AA Methods",
      "zh-CN": "三角形角度计算器",
      "zh-TW": "三角形角度計算器",
      ja: "三角形角度計算機",
      ko: "삼각형 각도 계산기",
      es: "Calculadora de ángulos de triángulo",
      fr: "Calculatrice d’angles de triangle",
      de: "Dreieck-Winkelrechner",
      pt: "Calculadora de ângulos do triângulo",
      ru: "Калькулятор углов треугольника"
    },
    descriptions: {
      en: "Find missing triangle angles from two known angles or three side lengths using SSS and AA methods. All angles in degrees with instant results.",
      "zh-CN": "使用 AA 或 SSS 方法，根据已知两角或三边快速求出三角形缺失角度，结果以度显示。",
      "zh-TW": "使用 AA 或 SSS 方法，依已知兩角或三邊快速求出三角形缺少的角度，結果以度顯示。",
      ja: "AA または SSS で、既知の2角または3辺から三角形の不足角をすばやく求めます。結果はすべて度表示です。",
      ko: "AA 또는 SSS 방식으로, 두 각이나 세 변을 이용해 삼각형의 빠진 각을 구합니다. 모든 결과는 도 단위입니다.",
      es: "Calcula ángulos faltantes de un triángulo a partir de dos ángulos o tres lados con los métodos AA y SSS. Resultados en grados.",
      fr: "Trouvez les angles manquants d’un triangle à partir de deux angles ou de trois côtés avec les méthodes AA et SSS. Résultats en degrés.",
      de: "Fehlende Dreieckswinkel aus zwei Winkeln oder drei Seiten mit AA- und SSS-Methode berechnen. Alle Ergebnisse in Grad.",
      pt: "Encontre ângulos faltantes de um triângulo a partir de dois ângulos ou três lados com os métodos AA e SSS. Resultados em graus.",
      ru: "Найдите неизвестные углы треугольника по двум углам или трём сторонам с методами AA и SSS. Все результаты в градусах."
    }
  },
  {
    id: "sum-of-series-calculator",
    category: "math",
    slugs: {
      en: "sum-of-series-calculator",
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
      en: "Sum of Series Calculator - Arithmetic, Geometric & More",
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
      en: "Calculate sums of arithmetic sequences, geometric series, harmonic series, and sum of squares instantly. Enter parameters and get results with formulas.",
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
    id: "supplementary-angles-calculator",
    category: "math",
    slugs: {
      en: "supplementary-angles-calculator",
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
      en: "Supplementary Angles Calculator - Find the Missing Angle",
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
      en: "Find the supplementary angle instantly: enter any angle and get its supplement that adds up to 180°. Perfect for geometry homework and design work.",
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
    id: "surface-area-calculator",
    category: "math",
    slugs: {
      en: "surface-area-calculator",
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
      en: "Surface Area Calculator - Cube, Sphere, Cylinder & Cone",
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
      en: "Calculate surface area for cube, sphere, cylinder, and cone. Enter dimensions and get total surface area with the formula applied. Free geometry tool.",
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
    id: "surface-area-of-a-hemisphere-calculator",
    category: "math",
    slugs: {
      en: "surface-area-of-a-hemisphere-calculator",
      "zh-CN": "banqiu-biaomianji-jisuanqi",
      "zh-TW": "banqiu-biaomianji-jisuanqi",
      ja: "hankyu-hyomenseki-keisanki",
      ko: "ban-gu-pyomyeonjeok-gyesangi",
      es: "calculadora-area-superficie-hemisferio",
      fr: "calculateur-surface-hemisphere",
      de: "oberflaeche-halbkugel-rechner",
      pt: "calculadora-area-superficie-hemisferio",
      ru: "kalkulyator-ploshchadi-poverhnosti-polusfery"
    },
    titles: {
      en: "Surface Area of a Hemisphere Calculator",
      "zh-CN": "半球表面积计算器",
      "zh-TW": "半球表面積計算器",
      ja: "半球の表面積計算機",
      ko: "반구 표면적 계산기",
      es: "Calculadora de área superficial de un hemisferio",
      fr: "Calculateur de surface d’un hémisphère",
      de: "Oberfläche einer Halbkugel berechnen",
      pt: "Calculadora de área da superfície do hemisfério",
      ru: "Калькулятор площади поверхности полусферы"
    },
    descriptions: {
      en: "Calculate curved surface area, base area, and total surface area of a hemisphere from its radius. Instant results with formulas for geometry and engineering.",
      "zh-CN": "根据半径计算半球的曲面面积、底面积和总表面积。即时给出结果，并附几何与工程常用公式。",
      "zh-TW": "依半徑計算半球的曲面積、底面積與總表面積。即時顯示結果，並提供幾何與工程常用公式。",
      ja: "半径から半球の曲面積、底面積、総表面積を計算。幾何学や工学で使う公式とともに結果をすぐ表示します。",
      ko: "반지름으로 반구의 곡면적, 밑면적, 전체 표면적을 계산합니다. 기하와 공학 공식으로 결과를 즉시 확인하세요.",
      es: "Calcula el área curva, el área de la base y el área total de un hemisferio a partir del radio, con resultados y fórmulas al instante.",
      fr: "Calculez l’aire courbe, l’aire de base et la surface totale d’un hémisphère à partir du rayon, avec formules et résultats instantanés.",
      de: "Berechnen Sie Mantelfläche, Grundfläche und Gesamtoberfläche einer Halbkugel aus dem Radius – mit sofortigen Ergebnissen und Formeln.",
      pt: "Calcule área curva, área da base e área total de um hemisfério pelo raio, com resultados instantâneos e fórmulas.",
      ru: "Рассчитайте боковую, базовую и полную площадь поверхности полусферы по радиусу с мгновенными результатами и формулами."
    }
  },
  {
    id: "surface-area-of-a-triangular-prism-calculator",
    category: "math",
    slugs: {
      en: "surface-area-of-a-triangular-prism-calculator",
      "zh-CN": "sanjiaozhu-biaomianji-jisuanqi",
      "zh-TW": "sanjiaozhu-biaomianji-jisuanqi",
      ja: "sankakuchu-hyomenseki-keisanki",
      ko: "samgakgidung-pyomyeonjeok-gyesangi",
      es: "calculadora-area-superficial-prisma-triangular",
      fr: "calculateur-aire-surface-prisme-triangulaire",
      de: "dreiecksprisma-oberflaeche-rechner",
      pt: "calculadora-area-superficie-prisma-triangular",
      ru: "kalkulyator-ploshchadi-poverkhnosti-treugolnoy-prizmy"
    },
    titles: {
      en: "Surface Area of a Triangular Prism Calculator",
      "zh-CN": "三角柱表面积计算器",
      "zh-TW": "三角柱表面積計算器",
      ja: "三角柱の表面積計算機",
      ko: "삼각기둥 표면적 계산기",
      es: "Calculadora de área superficial de prisma triangular",
      fr: "Calculateur d’aire d’un prisme triangulaire",
      de: "Dreiecksprisma-Oberflächenrechner",
      pt: "Calculadora de área de prisma triangular",
      ru: "Калькулятор площади поверхности треугольной призмы"
    },
    descriptions: {
      en: "Calculate the total surface area of a triangular prism from its three side lengths and prism length. Uses Heron's formula for the base area instantly.",
      "zh-CN": "根据三角柱底面三边长和柱长计算总表面积，并用海伦公式即时求出底面面积。",
      "zh-TW": "依三角柱底面三邊長與柱長計算總表面積，並用海龍公式即時計算底面面積。",
      ja: "三角柱の底面3辺と柱の長さから総表面積を計算。底面積はヘロンの公式で即座に求めます。",
      ko: "삼각기둥 밑면의 세 변 길이와 기둥 길이로 총 표면적을 계산합니다. 밑면적은 헤론 공식으로 즉시 구합니다.",
      es: "Calcula el área superficial total de un prisma triangular con sus tres lados y la longitud del prisma. Usa la fórmula de Herón al instante.",
      fr: "Calculez l’aire totale d’un prisme triangulaire avec les trois côtés et la longueur du prisme. Aire de base via la formule de Héron.",
      de: "Berechne die Gesamtoberfläche eines Dreiecksprismas aus drei Seitenlängen und Prismenlänge. Grundfläche per Heron-Formel.",
      pt: "Calcule a área total de um prisma triangular com os três lados e o comprimento do prisma. Usa a fórmula de Heron para a base.",
      ru: "Рассчитайте полную площадь поверхности треугольной призмы по трём сторонам основания и длине призмы. Площадь основания — по Герону."
    }
  },
  {
    id: "tangent-of-a-circle-calculator",
    category: "math",
    slugs: {
      en: "tangent-of-a-circle-calculator",
      "zh-CN": "yuan-de-qiexian-jisuanqi",
      "zh-TW": "yuan-de-qiexian-jisuanqi",
      ja: "en-no-setsen-keisanki",
      ko: "won-ui-jeopseon-gyesan-gi",
      es: "calculadora-recta-tangente-circulo",
      fr: "calculatrice-tangente-cercle",
      de: "kreis-tangente-rechner",
      pt: "calculadora-reta-tangente-circulo",
      ru: "kalkulyator-kasatelnoy-pryamoy-okruzhnosti"
    },
    titles: {
      en: "Tangent Line to a Circle Calculator",
      "zh-CN": "圆的切线计算器",
      "zh-TW": "圓的切線計算器",
      ja: "円の接線計算機",
      ko: "원의 접선 계산기",
      es: "Calculadora de recta tangente al círculo",
      fr: "Calculatrice de tangente au cercle",
      de: "Kreis-Tangente-Rechner",
      pt: "Calculadora de reta tangente ao círculo",
      ru: "Калькулятор касательной к окружности"
    },
    descriptions: {
      en: "Find the tangent line equation for a circle at any point on its circumference. Returns general and slope-intercept forms with step-by-step results.",
      "zh-CN": "快速求出圆在任一点的切线方程，支持一般式和斜截式，并给出详细步骤。",
      "zh-TW": "快速求出圓在任一點的切線方程，支援一般式與斜截式，並提供詳細步驟。",
      ja: "円周上の任意の点での接線方程式を求めます。一般形と傾き切片形、途中計算も表示。",
      ko: "원의 임의의 점에서 접선의 방정식을 구합니다. 일반형과 기울기-절편형, 풀이 과정을 함께 제공합니다.",
      es: "Encuentra la ecuación de la recta tangente a un círculo en cualquier punto. Muestra forma general y pendiente-intersección.",
      fr: "Trouvez l’équation de la tangente à un cercle en n’importe quel point. Forme générale et forme pente-interception.",
      de: "Bestimme die Tangentengleichung eines Kreises an jedem Punkt. Mit allgemeiner Form und Steigungsform.",
      pt: "Encontre a equação da reta tangente a um círculo em qualquer ponto. Mostra forma geral e forma reduzida.",
      ru: "Найдите уравнение касательной к окружности в любой точке. Показывает общий вид и вид с угловым коэффициентом."
    }
  },
  {
    id: "tensor-product-calculator",
    category: "math",
    slugs: {
      en: "tensor-product-calculator",
      "zh-CN": "zhangli-ji-suan-qi",
      "zh-TW": "zhangli-ji-suan-qi",
      ja: "tenzoruseki-keisanki",
      ko: "tensoe-gop-gye-san-gi",
      es: "calculadora-producto-tensorial",
      fr: "calculatrice-produit-tensoriel",
      de: "tensorprodukt-rechner",
      pt: "calculadora-produto-tensorial",
      ru: "tenzornyj-kalkulyator"
    },
    titles: {
      en: "Tensor Product Calculator - Compute Outer Product of Vectors",
      "zh-CN": "张量积计算器",
      "zh-TW": "張量積計算器",
      ja: "テンソル積計算機",
      ko: "텐서곱 계산기",
      es: "Calculadora de producto tensorial",
      fr: "Calculatrice de produit tensoriel",
      de: "Tensorprodukt-Rechner",
      pt: "Calculadora de produto tensorial",
      ru: "Калькулятор тензорного произведения"
    },
    descriptions: {
      en: "Calculate the tensor (outer) product of two vectors instantly. Displays results as a matrix or flattened vector. Free online tool for linear algebra.",
      "zh-CN": "立即计算两个向量的张量积（外积），并以矩阵或扁平向量形式显示结果。",
      "zh-TW": "立即計算兩個向量的張量積（外積），並以矩陣或扁平向量形式顯示結果。",
      ja: "2つのベクトルのテンソル積（外積）を即座に計算し、行列または平坦化ベクトルで表示します。",
      ko: "두 벡터의 텐서곱(외적)을 즉시 계산하고, 행렬 또는 평탄화 벡터로 결과를 보여줍니다.",
      es: "Calcula al instante el producto tensorial (externo) de dos vectores y muéstralo como matriz o vector aplanado.",
      fr: "Calculez instantanément le produit tensoriel (extérieur) de deux vecteurs et affichez-le sous forme de matrice ou de vecteur aplati.",
      de: "Berechne sofort das Tensorprodukt (Außenprodukt) zweier Vektoren und zeige das Ergebnis als Matrix oder abgeflachten Vektor an.",
      pt: "Calcule instantaneamente o produto tensorial (externo) de dois vetores e exiba o resultado como matriz ou vetor achatado.",
      ru: "Мгновенно вычисляйте тензорное (внешнее) произведение двух векторов и показывайте результат в виде матрицы или развернутого вектора."
    }
  },
  {
    id: "terminating-decimals-calculator",
    category: "math",
    slugs: {
      en: "terminating-decimals-calculator",
      "zh-CN": "youxian-xiaoshu-jisuanqi",
      "zh-TW": "youxian-xiaoshu-jisuanqi",
      ja: "yugen-shosu-keisanki",
      ko: "yuhan-sosu-gyesangi",
      es: "calculadora-decimales-terminantes",
      fr: "calculateur-decimales-finies",
      de: "endliche-dezimalzahlen-rechner",
      pt: "calculadora-decimais-finitos",
      ru: "kalkulyator-konechnyh-desyatichnyh-drobej"
    },
    titles: {
      en: "Terminating Decimals Calculator - Check Fractions",
      "zh-CN": "有限小数计算器 - 检查分数",
      "zh-TW": "有限小數計算器 - 檢查分數",
      ja: "有限小数計算機 - 分数を判定",
      ko: "유한소수 계산기 - 분수 판별",
      es: "Calculadora de decimales terminantes",
      fr: "Calculateur de décimales finies",
      de: "Rechner für endliche Dezimalzahlen",
      pt: "Calculadora de decimais finitos",
      ru: "Калькулятор конечных десятичных дробей"
    },
    descriptions: {
      en: "Determine if a fraction produces a terminating or repeating decimal. Shows prime factorization of the denominator and the simplified fraction instantly.",
      "zh-CN": "判断一个分数会化为有限小数还是循环小数。即时显示分母的质因数分解和化简后的分数。",
      "zh-TW": "判斷分數會化為有限小數還是循環小數。即時顯示分母的質因數分解與化簡後的分數。",
      ja: "分数が有限小数になるか循環小数になるかを判定。分母の素因数分解と約分後の分数をすぐに表示します。",
      ko: "분수가 유한소수인지 순환소수인지 판별합니다. 분모의 소인수분해와 기약분수를 즉시 보여줍니다.",
      es: "Determina si una fracción produce un decimal terminante o periódico. Muestra la factorización prima del denominador y la fracción simplificada.",
      fr: "Déterminez si une fraction donne un décimal fini ou périodique. Affiche instantanément la factorisation première du dénominateur.",
      de: "Prüfe, ob ein Bruch eine endliche oder periodische Dezimalzahl ergibt. Zeigt Primfaktorzerlegung des Nenners und gekürzten Bruch.",
      pt: "Determine se uma fração gera decimal finito ou periódico. Mostra a fatoração prima do denominador e a fração simplificada na hora.",
      ru: "Определите, дает ли дробь конечную или периодическую десятичную запись. Мгновенно показывает разложение знаменателя на простые множители."
    }
  },
  {
    id: "tetrahedron-volume-calculator",
    category: "math",
    slugs: {
      en: "tetrahedron-volume-calculator",
      "zh-CN": "si-mian-ti-ti-ji-ji-suan-qi",
      "zh-TW": "si-mian-ti-ti-ji-ji-suan-qi",
      ja: "shimentai-taiseki-keisanki",
      ko: "samyeonche-bupi-gyesangi",
      es: "calculadora-volumen-tetraedro",
      fr: "calculateur-volume-tetraedre",
      de: "tetraeder-volumen-rechner",
      pt: "calculadora-volume-tetraedro",
      ru: "kalkulyator-obema-tetraedra"
    },
    titles: {
      en: "Tetrahedron Volume Calculator - Regular & Irregular Shapes",
      "zh-CN": "四面体体积计算器 - 正四面体与不规则形状",
      "zh-TW": "四面體體積計算器 - 正四面體與不規則形狀",
      ja: "四面体の体積計算機 - 正四面体と不規則形状",
      ko: "사면체 부피 계산기 - 정사면체와 불규칙 도형",
      es: "Calculadora de volumen de tetraedro",
      fr: "Calculateur de volume de tétraèdre",
      de: "Tetraeder-Volumen-Rechner",
      pt: "Calculadora de volume do tetraedro",
      ru: "Калькулятор объема тетраэдра"
    },
    descriptions: {
      en: "Calculate tetrahedron volume from edge length (regular) or base area and height (any shape). Fast, accurate, and free online geometry calculator.",
      "zh-CN": "根据棱长（正四面体）或底面积和高度（任意形状）计算四面体体积。快速、准确、免费的在线几何计算器。",
      "zh-TW": "依棱長（正四面體）或底面積與高度（任意形狀）計算四面體體積。快速、準確、免費的線上幾何計算器。",
      ja: "辺の長さ（正四面体）または底面積と高さ（任意形状）から四面体の体積を計算。高速で正確な無料オンライン幾何計算機です。",
      ko: "모서리 길이(정사면체) 또는 밑면적과 높이(모든 형태)로 사면체 부피를 계산하세요. 빠르고 정확한 무료 온라인 기하 계산기입니다.",
      es: "Calcula el volumen de un tetraedro por arista (regular) o por área de base y altura. Calculadora geométrica online rápida y precisa.",
      fr: "Calculez le volume d’un tétraèdre par arête (régulier) ou par aire de base et hauteur. Calculateur géométrique en ligne rapide et précis.",
      de: "Berechnen Sie das Tetraeder-Volumen aus Kantenlänge (regelmäßig) oder Grundfläche und Höhe. Schneller, genauer Online-Geometrierechner.",
      pt: "Calcule o volume do tetraedro pela aresta (regular) ou pela área da base e altura. Calculadora geométrica online rápida e precisa.",
      ru: "Рассчитайте объем тетраэдра по ребру (правильный) или по площади основания и высоте. Быстрый и точный онлайн-калькулятор геометрии."
    }
  },
  {
    id: "three-dimensional-distance-calculator",
    category: "math",
    slugs: {
      en: "three-dimensional-distance-calculator",
      "zh-CN": "3d-juli-jisuanqi",
      "zh-TW": "3d-ju-li-ji-suan-qi",
      ja: "3d-kyori-keisanki",
      ko: "3d-geori-gyeolsan-gi",
      es: "calculadora-distancia-3d",
      fr: "calculateur-distance-3d",
      de: "3d-entfernung-rechner",
      pt: "calculadora-distancia-3d",
      ru: "kalkulyator-rasstoyaniya-3d"
    },
    titles: {
      en: "3D Distance Calculator - Two Points in 3D Space",
      "zh-CN": "3D距离计算器",
      "zh-TW": "3D距離計算器",
      ja: "3D距離計算機",
      ko: "3D 거리 계산기",
      es: "Calculadora de distancia 3D",
      fr: "Calculateur de distance 3D",
      de: "3D-Entfernungsrechner",
      pt: "Calculadora de distância 3D",
      ru: "Калькулятор расстояния 3D"
    },
    descriptions: {
      en: "Calculate the Euclidean distance between two points in 3D space using the 3D distance formula. Handles negative coordinates. Free, fast, and accurate.",
      "zh-CN": "使用3D距离公式计算三维空间中两点的欧氏距离，支持负坐标，免费、快速、准确。",
      "zh-TW": "使用3D距離公式計算三維空間中兩點的歐氏距離，支援負座標，免費、快速、準確。",
      ja: "3D距離の公式で3次元空間の2点間のユークリッド距離を計算。負の座標にも対応。無料、高速で正確です。",
      ko: "3D 거리 공식으로 3차원 공간의 두 점 사이 유클리드 거리를 계산합니다. 음수 좌표도 지원하며 무료, 빠르고 정확합니다.",
      es: "Calcula la distancia euclidiana entre dos puntos en 3D con la fórmula de distancia 3D. Admite coordenadas negativas.",
      fr: "Calculez la distance euclidienne entre deux points dans l’espace 3D avec la formule 3D. Coordonnées négatives prises en charge.",
      de: "Berechnen Sie die euklidische Distanz zwischen zwei Punkten im 3D-Raum mit der 3D-Entfernung. Negative Koordinaten werden unterstützt.",
      pt: "Calcule a distância euclidiana entre dois pontos no espaço 3D com a fórmula de distância 3D. Aceita coordenadas negativas.",
      ru: "Рассчитайте евклидово расстояние между двумя точками в 3D по формуле 3D-расстояния. Поддерживаются отрицательные координаты."
    }
  },
  {
    id: "subtracting-fractions-calculator",
    category: "math",
    slugs: {
      en: "subtracting-fractions-calculator",
      "zh-CN": "xiangjian-fenshu-jisuanqi",
      "zh-TW": "xiangjian-fenshu-jisuanqi",
      ja: "bunshu-hikizan-keisan",
      ko: "bunso-samgak-gyesangi",
      es: "calculadora-resta-fracciones",
      fr: "calculatrice-soustraction-fractions",
      de: "bruch-subtrahieren-rechner",
      pt: "calculadora-subtracao-fracoes",
      ru: "kalkulyator-vychitaniya-drobei"
    },
    titles: {
      en: "Subtracting Fractions Calculator",
      "zh-CN": "分数减法计算器",
      "zh-TW": "分數減法計算器",
      ja: "分数引き算計算機",
      ko: "분수 빼기 계산기",
      es: "Calculadora de resta de fracciones",
      fr: "Calculatrice de soustraction de fractions",
      de: "Bruchsubtraktionsrechner",
      pt: "Calculadora de subtração de frações",
      ru: "Калькулятор вычитания дробей"
    },
    descriptions: {
      en: "Subtract proper, improper, or mixed fractions instantly. Finds the common denominator, simplifies, and shows fraction, mixed number, and decimal results.",
      "zh-CN": "立即计算真分数、假分数或带分数的减法。自动找公分母、化简，并显示分数、带分数和小数结果。",
      "zh-TW": "立即計算真分數、假分數或帶分數的減法。自動找公分母、化簡，並顯示分數、帶分數和小數結果。",
      ja: "真分数、仮分数、帯分数の引き算を即計算。通分し、約分して、分数・帯分数・小数の結果を表示します。",
      ko: "진분수, 가분수, 대분수의 뺄셈을 즉시 계산합니다. 공통분모를 찾고 약분하며, 분수·대분수·소수 결과를 보여줍니다.",
      es: "Resta fracciones propias, impropias o mixtas al instante. Encuentra el denominador común, simplifica y muestra fracción, mixto y decimal.",
      fr: "Soustrayez instantanément des fractions propres, impropres ou mixtes. Trouve le dénominateur commun, simplifie et affiche fraction, nombre mixte et décimal.",
      de: "Subtrahieren Sie echte, unechte oder gemischte Brüche sofort. Findet den gemeinsamen Nenner, kürzt und zeigt Bruch, gemischte Zahl und Dezimalzahl.",
      pt: "Subtraia frações próprias, impróprias ou mistas instantaneamente. Encontra o denominador comum, simplifica e mostra fração, número misto e decimal.",
      ru: "Мгновенно вычитает правильные, неправильные и смешанные дроби. Находит общий знаменатель, сокращает и показывает дробь, смешанное число и десятичный результат."
    }
  },
  {
    id: "subtraction-calculator",
    category: "math",
    slugs: {
      en: "subtraction-calculator",
      "zh-CN": "jianfa-jisuanqi",
      "zh-TW": "jianfa-jisuanqi",
      ja: "hikizan-keisanki",
      ko: "ppaegisem-gyesangi",
      es: "calculadora-resta",
      fr: "calculatrice-soustraction",
      de: "subtraktionsrechner",
      pt: "calculadora-subtracao",
      ru: "kalkulyator-vychitaniya"
    },
    titles: {
      en: "Subtraction Calculator - Find Difference of Two Numbers",
      "zh-CN": "减法计算器 - 计算两个数的差",
      "zh-TW": "減法計算器 - 計算兩個數的差",
      ja: "引き算計算機 - 2つの数の差を計算",
      ko: "뺄셈 계산기 - 두 수의 차 구하기",
      es: "Calculadora de resta - Diferencia entre dos números",
      fr: "Calculatrice de soustraction - Différence entre deux nombres",
      de: "Subtraktionsrechner - Differenz zweier Zahlen berechnen",
      pt: "Calculadora de subtração - Diferença entre dois números",
      ru: "Калькулятор вычитания - разность двух чисел"
    },
    descriptions: {
      en: "Subtraction calculator for any two real numbers — integers, decimals, and negatives. Enter minuend and subtrahend to get the difference instantly.",
      "zh-CN": "适用于任意两个实数的减法计算器，支持整数、小数和负数。输入被减数和减数，立即得到差值。",
      "zh-TW": "適用於任意兩個實數的減法計算器，支援整數、小數與負數。輸入被減數和減數，立即取得差值。",
      ja: "任意の2つの実数に対応する引き算計算機。整数、小数、負の数を入力し、被減数と減数から差をすぐに求めます。",
      ko: "정수, 소수, 음수를 포함한 임의의 두 실수를 빼는 계산기입니다. 피감수와 감수를 입력하면 차를 즉시 확인할 수 있습니다.",
      es: "Calculadora de resta para dos números reales: enteros, decimales y negativos. Ingresa minuendo y sustraendo para obtener la diferencia al instante.",
      fr: "Calculatrice de soustraction pour deux nombres réels : entiers, décimaux et négatifs. Saisissez le diminuende et le soustracteur pour obtenir la différence.",
      de: "Subtraktionsrechner für zwei reelle Zahlen: ganze Zahlen, Dezimalzahlen und negative Zahlen. Minuend und Subtrahend eingeben, Differenz sofort erhalten.",
      pt: "Calculadora de subtração para dois números reais: inteiros, decimais e negativos. Informe minuendo e subtraendo para obter a diferença na hora.",
      ru: "Калькулятор вычитания для любых двух действительных чисел: целых, десятичных и отрицательных. Введите уменьшаемое и вычитаемое, чтобы получить разность."
    }
  },
  {
    id: "sum-and-difference-identities-calculator",
    category: "math",
    slugs: {
      en: "sum-and-difference-identities-calculator",
      "zh-CN": "he-cha-san-jiao-heng-deng-shi-ji-suan-qi",
      "zh-TW": "he-cha-san-jiao-heng-deng-shi-ji-suan-qi",
      ja: "wa-sa-koutou-shiki-keisanki",
      ko: "hapcha-samgak-hangdeungsik-gyesangi",
      es: "calculadora-identidades-suma-diferencia",
      fr: "calculateur-identites-somme-difference",
      de: "summen-differenzen-identitaeten-rechner",
      pt: "calculadora-identidades-soma-diferenca",
      ru: "kalkulyator-formul-summy-raznosti"
    },
    titles: {
      en: "Sum and Difference Identities Calculator",
      "zh-CN": "和差三角恒等式计算器",
      "zh-TW": "和差三角恆等式計算器",
      ja: "和と差の三角恒等式計算機",
      ko: "합차 삼각 항등식 계산기",
      es: "Calculadora de identidades de suma y diferencia",
      fr: "Calculateur d’identités de somme et différence",
      de: "Rechner für Summen- und Differenzidentitäten",
      pt: "Calculadora de identidades de soma e diferença",
      ru: "Калькулятор формул суммы и разности"
    },
    descriptions: {
      en: "Calculate trig values using sum and difference identities for sin, cos, and tan. Supports degrees and radians with step-by-step formula display.",
      "zh-CN": "使用和差恒等式计算 sin、cos、tan 的三角函数值。支持角度和弧度，并显示分步公式。",
      "zh-TW": "使用和差恆等式計算 sin、cos、tan 的三角函數值。支援角度與弧度，並顯示逐步公式。",
      ja: "sin、cos、tan の値を和と差の恒等式で計算。度数法とラジアンに対応し、公式を手順付きで表示します。",
      ko: "합차 항등식으로 sin, cos, tan 값을 계산합니다. 도와 라디안을 지원하며 단계별 공식을 표시합니다.",
      es: "Calcula valores trigonométricos con identidades de suma y diferencia para sin, cos y tan. Admite grados y radianes con fórmulas paso a paso.",
      fr: "Calculez sin, cos et tan avec les identités de somme et différence. Degrés et radians pris en charge, avec affichage des formules.",
      de: "Berechne trigonometrische Werte mit Summen- und Differenzidentitäten für sin, cos und tan. Mit Grad, Radiant und Formelschritten.",
      pt: "Calcule valores trigonométricos com identidades de soma e diferença para sin, cos e tan. Suporta graus e radianos com fórmulas passo a passo.",
      ru: "Вычисляйте значения sin, cos и tan по формулам суммы и разности. Поддерживаются градусы и радианы с пошаговым показом формул."
    }
  },
  {
    id: "sum-of-a-linear-number-sequence-calculator",
    category: "math",
    slugs: {
      en: "sum-of-a-linear-number-sequence-calculator",
      "zh-CN": "dengcha-shulie-qiuhe-jisuanqi",
      "zh-TW": "dengcha-shulie-qiuhe-jisuanqi",
      ja: "tousa-suuretsu-wa-keisanki",
      ko: "dungcha-suyeol-hap-gyeonsangi",
      es: "suma-sucesion-aritmetica",
      fr: "somme-suite-arithmetique",
      de: "arithmetische-folge-summe",
      pt: "soma-progressao-aritmetica",
      ru: "summa-arifmeticheskoi-progressii"
    },
    titles: {
      en: "Sum of a Linear Number Sequence Calculator",
      "zh-CN": "等差数列求和计算器",
      "zh-TW": "等差數列求和計算機",
      ja: "等差数列の和計算機",
      ko: "등차수열 합 계산기",
      es: "Calculadora de suma de sucesión aritmética",
      fr: "Calculateur de somme de suite arithmétique",
      de: "Rechner für arithmetische Folgen",
      pt: "Calculadora de soma de progressão aritmética",
      ru: "Калькулятор суммы арифметической прогрессии"
    },
    descriptions: {
      en: "Find the sum of any arithmetic sequence. Enter first term, common difference, and number of terms for an instant sum, last term, and formula.",
      "zh-CN": "输入首项、公差和项数，立即计算等差数列的和、末项和公式。",
      "zh-TW": "輸入首項、公差和項數，立即計算等差數列的和、末項和公式。",
      ja: "初項、公差、項数を入力して、等差数列の和・末項・公式をすぐに計算します。",
      ko: "첫째항, 공차, 항 수를 입력하면 등차수열의 합, 마지막 항, 공식을 바로 계산합니다.",
      es: "Calcula la suma, el último término y la fórmula de cualquier sucesión aritmética con el primer término, la diferencia y n.",
      fr: "Calculez la somme, le dernier terme et la formule de toute suite arithmétique à partir du premier terme, de la raison et de n.",
      de: "Berechnen Sie Summe, letztes Glied und Formel jeder arithmetischen Folge mit Anfangsglied, Differenz und n.",
      pt: "Calcule a soma, o último termo e a fórmula de qualquer progressão aritmética com o primeiro termo, a razão e n.",
      ru: "Найдите сумму, последний член и формулу любой арифметической прогрессии по первому члену, разности и n."
    }
  },
  {
    id: "sum-of-products-calculator",
    category: "math",
    slugs: {
      en: "sum-of-products-calculator",
      "zh-CN": "chengjihe-jisuanqi-dianji",
      "zh-TW": "chengjihe-jisuanqi-dianji",
      ja: "sekino-wa-keisanki-naiseki",
      ko: "gob-ui-hap-gyesangi-jeomgob",
      es: "calculadora-suma-productos-producto-punto",
      fr: "calculateur-somme-produits-produit-scalaire",
      de: "summe-der-produkte-rechner-skalarprodukt",
      pt: "calculadora-soma-produtos-produto-escalar",
      ru: "kalkulyator-summy-proizvedeniy-skalyarnoe-proizvedenie"
    },
    titles: {
      en: "Sum of Products Calculator - Dot Product of Two Vectors",
      "zh-CN": "乘积和计算器 - 两个向量的点积",
      "zh-TW": "乘積和計算器 - 兩個向量的點積",
      ja: "積和計算機 - 2つのベクトルの内積",
      ko: "곱의 합 계산기 - 두 벡터의 점곱",
      es: "Calculadora de suma de productos - Producto punto",
      fr: "Calculateur de somme de produits - Produit scalaire",
      de: "Summe-der-Produkte-Rechner - Skalarprodukt",
      pt: "Calculadora de soma de produtos - Produto escalar",
      ru: "Калькулятор суммы произведений - Скалярное произведение"
    },
    descriptions: {
      en: "Sum of products (dot product) calculator for vectors of any length. Enter comma-separated numbers and get the scalar result with full calculation shown.",
      "zh-CN": "适用于任意长度向量的乘积和（点积）计算器。输入逗号分隔的数字，获得标量结果并查看完整计算过程。",
      "zh-TW": "適用於任意長度向量的乘積和（點積）計算器。輸入逗號分隔的數字，取得純量結果並查看完整計算過程。",
      ja: "任意の長さのベクトルに対応した積和（内積）計算機。カンマ区切りの数値を入力すると、スカラー結果と詳しい計算過程を表示します。",
      ko: "임의 길이 벡터의 곱의 합(점곱)을 계산합니다. 쉼표로 구분한 숫자를 입력하면 스칼라 결과와 전체 계산 과정을 볼 수 있습니다.",
      es: "Calculadora de suma de productos (producto punto) para vectores de cualquier longitud. Introduce números separados por comas y obtén el resultado escalar.",
      fr: "Calculateur de somme de produits (produit scalaire) pour vecteurs de toute longueur. Saisissez des nombres séparés par des virgules et obtenez le résultat.",
      de: "Rechner für Summe der Produkte (Skalarprodukt) für Vektoren beliebiger Länge. Zahlen kommagetrennt eingeben und skalares Ergebnis erhalten.",
      pt: "Calculadora de soma de produtos (produto escalar) para vetores de qualquer tamanho. Insira números separados por vírgulas e veja o resultado.",
      ru: "Калькулятор суммы произведений (скалярного произведения) для векторов любой длины. Введите числа через запятую и получите результат."
    }
  },
  {
    id: "round-to-the-nearest-thousand-calculator",
    category: "math",
    slugs: {
      en: "round-to-the-nearest-thousand-calculator",
      "zh-CN": "qianwei-shewu-jisuanqi",
      "zh-TW": "qianwei-sheru-jisuanqi",
      ja: "sen-no-kurai-shishagonyu-keisanki",
      ko: "cheon-danwi-banollim-gyesangi",
      es: "calculadora-redondear-millar",
      fr: "calculatrice-arrondir-millier",
      de: "rechner-runden-auf-tausender",
      pt: "calculadora-arredondar-milhar",
      ru: "kalkulyator-okrugleniya-do-tysyach"
    },
    titles: {
      en: "Round to the Nearest Thousand Calculator",
      "zh-CN": "四舍五入到最接近千位计算器",
      "zh-TW": "四捨五入到最接近千位計算器",
      ja: "千の位に四捨五入する計算機",
      ko: "천 단위 반올림 계산기",
      es: "Calculadora para redondear al millar",
      fr: "Calculatrice d’arrondi au millier",
      de: "Rechner zum Runden auf Tausender",
      pt: "Calculadora para arredondar ao milhar",
      ru: "Калькулятор округления до тысяч"
    },
    descriptions: {
      en: "Round any number to the nearest thousand instantly. Free online rounding tool for financial estimates, math homework, data analysis, and quick approximations.",
      "zh-CN": "即时将任意数字四舍五入到最接近的千位。适用于财务估算、数学作业、数据分析和快速近似。",
      "zh-TW": "立即將任何數字四捨五入到最接近的千位。適合財務估算、數學作業、資料分析與快速近似。",
      ja: "任意の数値を最も近い千の位へすぐに丸めます。財務見積もり、数学の宿題、データ分析、概算に便利です。",
      ko: "어떤 숫자든 가장 가까운 천 단위로 즉시 반올림하세요. 재무 추정, 수학 숙제, 데이터 분석, 빠른 근사에 유용합니다.",
      es: "Redondea cualquier número al millar más cercano al instante. Útil para estimaciones financieras, tareas de matemáticas y análisis de datos.",
      fr: "Arrondissez instantanément tout nombre au millier le plus proche. Idéal pour estimations financières, devoirs de maths et analyse de données.",
      de: "Runde jede Zahl sofort auf den nächsten Tausender. Ideal für Finanzschätzungen, Matheaufgaben, Datenanalysen und schnelle Näherungen.",
      pt: "Arredonde qualquer número ao milhar mais próximo instantaneamente. Ideal para estimativas financeiras, tarefas de matemática e análise de dados.",
      ru: "Мгновенно округляйте любое число до ближайшей тысячи. Подходит для финансовых оценок, задач по математике, анализа данных и быстрых прикидок."
    }
  },
  {
    id: "rounding-calculator",
    category: "math",
    slugs: {
      en: "rounding-calculator",
      "zh-CN": "si-she-wu-ru-ji-suan-qi",
      "zh-TW": "si-she-wu-ru-ji-suan-qi",
      ja: "shishagonyu-keisanki",
      ko: "banollim-gyesangi",
      es: "calculadora-redondeo",
      fr: "calculateur-arrondi",
      de: "rundungsrechner",
      pt: "calculadora-arredondamento",
      ru: "kalkulyator-okrugleniya"
    },
    titles: {
      en: "Rounding Calculator - Round Numbers to Any Precision",
      "zh-CN": "四舍五入计算器 - 按任意精度取整",
      "zh-TW": "四捨五入計算器 - 依任意精度取整",
      ja: "四捨五入計算機 - 任意の精度で丸め",
      ko: "반올림 계산기 - 원하는 정밀도로 숫자 반올림",
      es: "Calculadora de redondeo - Redondea a cualquier precisión",
      fr: "Calculateur d'arrondi - Arrondir à toute précision",
      de: "Rundungsrechner - Zahlen auf jede Genauigkeit runden",
      pt: "Calculadora de arredondamento - Qualquer precisão",
      ru: "Калькулятор округления - Любая точность"
    },
    descriptions: {
      en: "Rounding calculator supporting floor, ceiling, half-up, and decimal-place modes. Round numbers to any precision for math, finance, science, and everyday use.",
      "zh-CN": "四舍五入计算器支持向下取整、向上取整、半入和小数位模式，可按任意精度处理数学、金融、科学和日常数字。",
      "zh-TW": "四捨五入計算器支援無條件捨去、無條件進位、半進位與小數位模式，可依任意精度處理數學、金融、科學與日常數字。",
      ja: "切り捨て、切り上げ、四捨五入、小数桁指定に対応。数学、金融、科学、日常用途の数値を任意の精度で丸められます。",
      ko: "내림, 올림, 일반 반올림, 소수 자릿수 모드를 지원하는 반올림 계산기. 수학, 금융, 과학, 일상 숫자를 원하는 정밀도로 처리하세요.",
      es: "Calculadora de redondeo con piso, techo, mitad hacia arriba y decimales. Redondea números con cualquier precisión para matemáticas, finanzas y ciencia.",
      fr: "Calculateur d'arrondi avec plancher, plafond, demi-supérieur et décimales. Arrondissez des nombres à toute précision pour maths, finance et science.",
      de: "Rundungsrechner mit Abrunden, Aufrunden, kaufmännischem Runden und Dezimalstellen. Zahlen präzise für Mathe, Finanzen und Wissenschaft runden.",
      pt: "Calculadora de arredondamento com piso, teto, meio para cima e casas decimais. Arredonde números para matemática, finanças, ciência e uso diário.",
      ru: "Калькулятор округления с полом, потолком, половиной вверх и десятичными разрядами. Округляйте числа для математики, финансов, науки и быта."
    }
  },
  {
    id: "rsa-calculator",
    category: "math",
    slugs: {
      en: "rsa-calculator",
      "zh-CN": "rsa-ji-suan-qi",
      "zh-TW": "rsa-ji-suan-qi",
      ja: "rsa-keisan-ki",
      ko: "rsa-gyesangi",
      es: "calculadora-rsa",
      fr: "calculatrice-rsa",
      de: "rsa-rechner",
      pt: "calculadora-rsa",
      ru: "rsa-kalkulyator"
    },
    titles: {
      en: "RSA Calculator - Public Key Encryption & Decryption Tool",
      "zh-CN": "RSA计算器 - 公钥加密与解密工具",
      "zh-TW": "RSA計算器 - 公開金鑰加密與解密工具",
      ja: "RSA計算機 - 公開鍵暗号の暗号化・復号ツール",
      ko: "RSA 계산기 - 공개 키 암호화 및 복호화 도구",
      es: "Calculadora RSA - Cifrado y descifrado de clave pública",
      fr: "Calculatrice RSA - Chiffrement à clé publique",
      de: "RSA-Rechner - Verschlüsselung mit öffentlichem Schlüssel",
      pt: "Calculadora RSA - Criptografia de chave pública",
      ru: "RSA-калькулятор - шифрование с открытым ключом"
    },
    descriptions: {
      en: "RSA encryption calculator for learning public key cryptography. Generate key pairs, encrypt and decrypt numbers — ideal for number theory study.",
      "zh-CN": "用于学习公钥密码学的RSA加密计算器。生成密钥对、加密和解密数字，适合数论学习。",
      "zh-TW": "用於學習公開金鑰密碼學的RSA加密計算器。產生金鑰對、加密與解密數字，適合數論學習。",
      ja: "公開鍵暗号を学ぶためのRSA暗号化計算機。鍵ペアを生成し、数値を暗号化・復号。数論の学習に最適です。",
      ko: "공개 키 암호학 학습용 RSA 암호화 계산기입니다. 키 쌍을 생성하고 숫자를 암호화·복호화하며 수론 공부에 적합합니다.",
      es: "Calculadora de cifrado RSA para aprender criptografía de clave pública. Genera pares de claves, cifra y descifra números; ideal para estudiar teoría de números.",
      fr: "Calculatrice RSA pour apprendre la cryptographie à clé publique. Générez des clés, chiffrez et déchiffrez des nombres, idéale pour la théorie des nombres.",
      de: "RSA-Verschlüsselungsrechner zum Lernen von Public-Key-Kryptografie. Schlüsselpaare erzeugen, Zahlen ver- und entschlüsseln; ideal für Zahlentheorie.",
      pt: "Calculadora RSA para aprender criptografia de chave pública. Gere chaves, criptografe e descriptografe números; ideal para teoria dos números.",
      ru: "Калькулятор RSA для изучения криптографии с открытым ключом. Генерируйте пары ключей, шифруйте и расшифровывайте числа; удобно для теории чисел."
    }
  },
  {
    id: "scatter-plot-calculator",
    category: "math",
    slugs: {
      en: "scatter-plot-calculator",
      "zh-CN": "san-dian-tu-ji-suan-qi-guan-lian-he-xian-xing-gui-gui",
      "zh-TW": "san-dian-tu-ji-suan-qi-guan-lian-he-xian-xing-gui-gui",
      ja: "sansutenzu-keisanki-sokan-keisu-senkei-kaiki",
      ko: "sanjeomdo-gyesangi-sang-gwan-gyesu-seonhyeong-hoegwi",
      es: "calculadora-diagrama-dispersion-correlacion-regresion-lineal",
      fr: "calculateur-nuage-points-correlation-regression-lineaire",
      de: "streudiagramm-rechner-korrelation-lineare-regression",
      pt: "calculadora-diagrama-dispersao-correlacao-regressao-linear",
      ru: "kalkulyator-diagrammy-rasseyaniya-korrelyaciya-lineynaya-regressiya"
    },
    titles: {
      en: "Scatter Plot Calculator - Correlation & Linear Regression",
      "zh-CN": "散点图计算器 - 相关系数与线性回归",
      "zh-TW": "散點圖計算器 - 相關係數與線性回歸",
      ja: "散布図計算機 - 相関係数と線形回帰",
      ko: "산점도 계산기 - 상관계수와 선형회귀",
      es: "Calculadora de dispersión - correlación y regresión lineal",
      fr: "Calculateur de nuage de points - corrélation et régression",
      de: "Streudiagramm-Rechner - Korrelation und lineare Regression",
      pt: "Calculadora de dispersão - correlação e regressão linear",
      ru: "Калькулятор диаграммы рассеяния - корреляция и регрессия"
    },
    descriptions: {
      en: "Scatter plot calculator for linear regression and Pearson correlation. Enter X and Y data to get slope, intercept, r, and R² — free regression analysis.",
      "zh-CN": "散点图计算器可求线性回归和皮尔逊相关系数。输入 X、Y 数据即可得到斜率、截距、r 和 R²。",
      "zh-TW": "散點圖計算器可求線性回歸與皮爾森相關係數。輸入 X、Y 資料即可得到斜率、截距、r 與 R²。",
      ja: "散布図計算機で線形回帰とピアソン相関係数を算出。X・Y データを入力すると、傾き、切片、r、R² がわかります。",
      ko: "산점도 계산기로 선형 회귀와 피어슨 상관계수를 구하세요. X, Y 데이터를 입력하면 기울기, 절편, r, R²를 확인할 수 있습니다.",
      es: "Calculadora de dispersión para regresión lineal y correlación de Pearson. Introduce datos X e Y para obtener pendiente, intercepto, r y R².",
      fr: "Calculateur de nuage de points pour la régression linéaire et la corrélation de Pearson. Saisissez X et Y pour obtenir pente, intercept, r et R².",
      de: "Streudiagramm-Rechner für lineare Regression und Pearson-Korrelation. X- und Y-Daten eingeben und Steigung, Achsenabschnitt, r und R² erhalten.",
      pt: "Calculadora de dispersão para regressão linear e correlação de Pearson. Insira dados X e Y para obter inclinação, intercepto, r e R².",
      ru: "Калькулятор диаграммы рассеяния для линейной регрессии и корреляции Пирсона. Введите X и Y, чтобы получить наклон, сдвиг, r и R²."
    }
  },
  {
    id: "scientific-notation-calculator",
    category: "math",
    slugs: {
      en: "scientific-notation-calculator",
      "zh-CN": "ke-xue-ji-shu-fa-ji-suan-qi",
      "zh-TW": "ke-xue-ji-shu-fa-ji-suan-qi",
      ja: "kagakutekisuho-keisan-ki",
      ko: "gwahak-gisubbeop-gyesangi",
      es: "calculadora-notacion-cientifica",
      fr: "calculatrice-notation-scientifique",
      de: "wissenschaftliche-schreibweise-rechner",
      pt: "calculadora-notacao-cientifica",
      ru: "kalkulyator-nauchnoy-notatsii"
    },
    titles: {
      en: "Scientific Notation Calculator - Convert to Standard Form",
      "zh-CN": "科学计数法计算器 - 转换为标准形式",
      "zh-TW": "科學記號計算機 - 轉換為標準形式",
      ja: "科学記数法計算機 - 標準形に変換",
      ko: "과학적 표기법 계산기 - 표준형 변환",
      es: "Calculadora de notación científica - Forma estándar",
      fr: "Calculatrice de notation scientifique - Forme standard",
      de: "Rechner für wissenschaftliche Schreibweise - Standardform",
      pt: "Calculadora de notação científica - Forma padrão",
      ru: "Калькулятор научной нотации - стандартная форма"
    },
    descriptions: {
      en: "Scientific notation calculator to convert numbers to standard form or expand scientific notation to decimals. Handles large and small numbers instantly.",
      "zh-CN": "科学计数法计算器可将数字转换为标准形式，或将科学计数法展开为十进制。快速处理大数和小数。",
      "zh-TW": "科學記號計算機可將數字轉換為標準形式，或將科學記號展開為十進位。快速處理大數與小數。",
      ja: "科学記数法計算機は、数値を標準形に変換したり、科学記数法を小数に展開したりできます。大きな数も小さな数も即座に処理。",
      ko: "과학적 표기법 계산기는 숫자를 표준형으로 바꾸거나 과학적 표기법을 소수로 펼칩니다. 큰 수와 작은 수를 즉시 처리합니다.",
      es: "Calculadora de notación científica para convertir números a forma estándar o expandir notación científica a decimales. Maneja números grandes y pequeños al instante.",
      fr: "Calculatrice de notation scientifique pour convertir des nombres en forme standard ou développer la notation scientifique en décimal. Gère instantanément les grands et petits nombres.",
      de: "Rechner für wissenschaftliche Schreibweise zur Umwandlung von Zahlen in Standardform oder zum Auflösen in Dezimalzahlen. Verarbeitet große und kleine Zahlen sofort.",
      pt: "Calculadora de notação científica para converter números para a forma padrão ou expandir a notação científica em decimais. Lida com números grandes e pequenos instantaneamente.",
      ru: "Калькулятор научной нотации для перевода чисел в стандартную форму или развёртывания в десятичный вид. Мгновенно обрабатывает большие и маленькие числа."
    }
  },
  {
    id: "simplifying-radicals-calculator",
    category: "math",
    slugs: {
      en: "simplifying-radicals-calculator",
      "zh-CN": "genshi-huajian-jisuanqi",
      "zh-TW": "genshi-huajian-jisuanqi",
      ja: "kanno-kanyo-keisanki",
      ko: "gangeho-ganbun-gye-san-gi",
      es: "calculadora-radicales-simplificar",
      fr: "calculatrice-radicaux-simplifier",
      de: "wurzelrechner-radikale-vereinfachen",
      pt: "calculadora-radicais-simplificar",
      ru: "kalkulyator-radikalov-uproshchenie-korney"
    },
    titles: {
      en: "Simplifying Radicals Calculator - Simplify Square Roots",
      "zh-CN": "根式化简计算器 - 化简平方根与n次根",
      "zh-TW": "根式化簡計算器 - 化簡平方根與n次根",
      ja: "根号簡約計算機 - 平方根とn乗根",
      ko: "근호 간단화 계산기 - 제곱근과 n제곱근",
      es: "Calculadora de radicales - simplifica raíces",
      fr: "Calculatrice de radicaux - simplifier les racines",
      de: "Wurzelrechner - Radikale vereinfachen",
      pt: "Calculadora de radicais - simplificar raízes",
      ru: "Калькулятор радикалов - упрощение корней"
    },
    descriptions: {
      en: "Simplify any radical expression instantly. Enter the radicand and root index to get the fully reduced form with coefficient, perfect for algebra and geometry.",
      "zh-CN": "一键化简任意根式。输入被开方数和根指数，即可得到带系数的最简形式，适合代数与几何。",
      "zh-TW": "一鍵化簡任意根式。輸入被開方數和根指數，即可得到帶係數的最簡形式，適合代數與幾何。",
      ja: "任意の根号をすばやく簡約。被開平数と指数を入力すると、係数付きの最簡形を表示します。",
      ko: "임의의 근호를 즉시 간단화하세요. 피제수와 근의 차수를 입력하면 계수가 포함된 최종형을 보여줍니다.",
      es: "Simplifica cualquier radical al instante. Ingresa el radicando y el índice para obtener la forma reducida con coeficiente.",
      fr: "Simplifiez instantanément n’importe quel radical. Saisissez le radicande et l’indice pour obtenir la forme réduite avec coefficient.",
      de: "Jeden Radikalterm sofort vereinfachen. Radikand und Wurzelexponent eingeben und die reduzierte Form mit Koeffizient erhalten.",
      pt: "Simplifique qualquer radical instantaneamente. Digite o radicando e o índice para obter a forma reduzida com coeficiente.",
      ru: "Мгновенно упростите любой радикал. Введите подкоренное выражение и индекс, чтобы получить сокращённый вид с коэффициентом."
    }
  },
  {
    id: "sine-calculator",
    category: "math",
    slugs: {
      en: "sine-calculator",
      "zh-CN": "zhengxian-jisuanqi",
      "zh-TW": "zhengxian-jisuanqi",
      ja: "seigen-keisanki",
      ko: "sain-gyesangi",
      es: "calculadora-seno",
      fr: "calculatrice-sinus",
      de: "sinusrechner",
      pt: "calculadora-seno",
      ru: "kalkulyator-sinusa"
    },
    titles: {
      en: "Sine Calculator - Calculate Sin of Any Angle",
      "zh-CN": "正弦计算器 - 计算任意角的正弦",
      "zh-TW": "正弦計算機 - 計算任意角的正弦",
      ja: "正弦計算機 - 任意の角度の正弦を計算",
      ko: "사인 계산기 - 모든 각도의 사인 계산",
      es: "Calculadora de seno - calcula el seno de cualquier ángulo",
      fr: "Calculatrice de sinus - calculez le sinus de n’importe quel angle",
      de: "Sinusrechner - Sinus beliebiger Winkel berechnen",
      pt: "Calculadora de seno - calcule o seno de qualquer ângulo",
      ru: "Калькулятор синуса - вычислить синус любого угла"
    },
    descriptions: {
      en: "Calculate sine of any angle in degrees or radians instantly. Supports negative angles and values over 360°. Ideal for trigonometry, physics, and engineering.",
      "zh-CN": "即时计算任意角度的正弦值，支持负角和大于 360° 的角度，适用于三角学、物理和工程。",
      "zh-TW": "即時計算任意角度的正弦值，支援負角與大於 360° 的角度，適用於三角學、物理與工程。",
      ja: "度またはラジアンの任意の角度の正弦を即座に計算。負の角度や360°超にも対応し、三角法・物理・工学に最適。",
      ko: "도와 라디안의 모든 각도에 대한 사인값을 즉시 계산합니다. 음수 각도와 360° 초과 값도 지원하며, 삼각법·물리·공학에 적합합니다.",
      es: "Calcula al instante el seno de cualquier ángulo en grados o radianes. Admite ángulos negativos y mayores de 360°. Ideal para trigonometría, física e ingeniería.",
      fr: "Calcule instantanément le sinus de n’importe quel angle en degrés ou en radians. Gère les angles négatifs et supérieurs à 360°. Idéal pour la trigo, la physique et l’ingénierie.",
      de: "Berechnen Sie den Sinus beliebiger Winkel sofort in Grad oder Radiant. Unterstützt negative Winkel und Werte über 360°. Ideal für Trigonometrie, Physik und Technik.",
      pt: "Calcule instantaneamente o seno de qualquer ângulo em graus ou radianos. Aceita ângulos negativos e valores acima de 360°. Ideal para trigonometria, física e engenharia.",
      ru: "Мгновенно вычисляйте синус любого угла в градусах или радианах. Поддерживает отрицательные углы и значения больше 360°. Подходит для тригонометрии, физики и инженерии."
    }
  },
  {
    id: "singular-values-calculator",
    category: "math",
    slugs: {
      en: "singular-values-calculator",
      "zh-CN": "qiyizhi-jisuanqi",
      "zh-TW": "qiyi-zhi-jisuanqi",
      ja: "tokui-chi-keisan-ki",
      ko: "teugigap-gyesangi",
      es: "calculadora-valores-singulares",
      fr: "calculateur-valeurs-singulieres",
      de: "singularwert-rechner",
      pt: "calculadora-valores-singulares",
      ru: "kalkulyator-singulyarnykh-znacheniy"
    },
    titles: {
      en: "Singular Values Calculator - SVD Matrix Decomposition",
      "zh-CN": "奇异值计算器 - SVD矩阵分解",
      "zh-TW": "奇異值計算機 - SVD矩陣分解",
      ja: "特異値計算機 - SVD行列分解",
      ko: "특이값 계산기 - SVD 행렬 분해",
      es: "Calculadora de valores singulares - SVD",
      fr: "Calculateur de valeurs singulières - SVD",
      de: "Singularwert-Rechner - SVD-Matrixzerlegung",
      pt: "Calculadora de valores singulares - SVD",
      ru: "Калькулятор сингулярных значений - SVD"
    },
    descriptions: {
      en: "Compute singular values of any matrix via SVD decomposition. Find rank, condition number, and matrix norms. Ideal for data science and linear algebra.",
      "zh-CN": "通过SVD分解计算任意矩阵的奇异值，查看秩、条件数和矩阵范数，适用于数据科学与线性代数。",
      "zh-TW": "透過SVD分解計算任意矩陣的奇異值，查看秩、條件數與矩陣範數，適合資料科學與線性代數。",
      ja: "SVD分解で任意の行列の特異値を計算し、ランク、条件数、行列ノルムを確認できます。データサイエンスや線形代数に最適です。",
      ko: "SVD 분해로 임의의 행렬 특이값을 계산하고, 랭크·조건수·행렬 노름을 확인하세요. 데이터 과학과 선형대수에 적합합니다.",
      es: "Calcula los valores singulares de cualquier matriz con SVD. Consulta rango, número de condición y normas de la matriz.",
      fr: "Calculez les valeurs singulières de n’importe quelle matrice via la décomposition SVD. Récupérez rang, nombre de condition et normes.",
      de: "Berechnen Sie die Singularwerte beliebiger Matrizen per SVD. Bestimmen Sie Rang, Konditionszahl und Matrixnormen.",
      pt: "Calcule os valores singulares de qualquer matriz via decomposição SVD. Veja posto, número de condição e normas da matriz.",
      ru: "Вычисляйте сингулярные значения любой матрицы через SVD. Находите ранг, число обусловленности и нормы матрицы."
    }
  },
  {
    id: "slant-height-calculator",
    category: "math",
    slugs: {
      en: "slant-height-calculator",
      "zh-CN": "xie-gao-ji-suan-qi",
      "zh-TW": "xie-gao-ji-suan-qi",
      ja: "shakko-keisanki",
      ko: "sagyeong-nopi-gyesangi",
      es: "calculadora-altura-inclinada",
      fr: "calculateur-hauteur-oblique",
      de: "mantellinien-rechner",
      pt: "calculadora-altura-inclinada",
      ru: "kalkulyator-naklonnoy-vysoty"
    },
    titles: {
      en: "Slant Height Calculator - Cones and Square Pyramids",
      "zh-CN": "斜高计算器 - 圆锥和正方锥",
      "zh-TW": "斜高計算器 - 圓錐與正四角錐",
      ja: "斜高計算機 - 円錐と正四角錐",
      ko: "사경 높이 계산기 - 원뿔과 정사각뿔",
      es: "Calculadora de altura inclinada - conos y pirámides",
      fr: "Calculateur de hauteur oblique - cônes et pyramides",
      de: "Mantellinien-Rechner - Kegel und quadratische Pyramiden",
      pt: "Calculadora de altura inclinada - cones e pirâmides",
      ru: "Калькулятор наклонной высоты - конусы и пирамиды"
    },
    descriptions: {
      en: "Calculate slant height, vertical height, or base dimensions for cones and square pyramids using the Pythagorean theorem. Fast and accurate geometry tool.",
      "zh-CN": "用勾股定理计算圆锥和正方锥的斜高、垂直高度或底面尺寸。快速准确的几何工具。",
      "zh-TW": "用畢氏定理計算圓錐與正四角錐的斜高、垂直高度或底面尺寸。快速且準確的幾何工具。",
      ja: "ピタゴラスの定理で円錐と正四角錐の斜高、垂直高さ、底面寸法を計算。すばやく正確な幾何ツールです。",
      ko: "피타고라스 정리로 원뿔과 정사각뿔의 사경 높이, 수직 높이 또는 밑면 치수를 빠르고 정확하게 계산하세요.",
      es: "Calcula la altura inclinada, la altura vertical o dimensiones de base de conos y pirámides cuadradas con el teorema de Pitágoras.",
      fr: "Calculez la hauteur oblique, la hauteur verticale ou les dimensions de base de cônes et pyramides carrées avec le théorème de Pythagore.",
      de: "Berechnen Sie Mantellinie, senkrechte Höhe oder Basismaße von Kegeln und quadratischen Pyramiden mit dem Satz des Pythagoras.",
      pt: "Calcule altura inclinada, altura vertical ou dimensões da base de cones e pirâmides quadradas com o teorema de Pitágoras.",
      ru: "Вычисляйте наклонную высоту, вертикальную высоту или размеры основания конусов и квадратных пирамид по теореме Пифагора."
    }
  },
  {
    id: "slope-calculator",
    category: "math",
    slugs: {
      en: "slope-calculator",
      "zh-CN": "xielv-jisuanqi",
      "zh-TW": "xielv-jisuanqi",
      ja: "sokuritsu-keisanki",
      ko: "peulleui-gye-san-gi",
      es: "calculadora-de-pendiente",
      fr: "calculateur-de-pente",
      de: "steigungsrechner",
      pt: "calculadora-de-inclinacao",
      ru: "kalkulyator-naklona"
    },
    titles: {
      en: "Slope Calculator - Find Slope from Two Points or Equation",
      "zh-CN": "斜率计算器：两点或方程求斜率",
      "zh-TW": "斜率計算機：兩點或方程求斜率",
      ja: "傾き計算機：2点または式から求める",
      ko: "기울기 계산기: 두 점 또는 식으로 계산",
      es: "Calculadora de pendiente: dos puntos o ecuación",
      fr: "Calculateur de pente : deux points ou équation",
      de: "Steigungsrechner: zwei Punkte oder Gleichung",
      pt: "Calculadora de inclinação: dois pontos ou equação",
      ru: "Калькулятор наклона: по двум точкам или уравнению"
    },
    descriptions: {
      en: "Calculate slope from two coordinate points or a line equation. Get slope, angle, distance, and line equation. Perfect for algebra and coordinate geometry.",
      "zh-CN": "根据两个坐标点或直线方程计算斜率，并获取角度、距离和直线方程。适合代数和解析几何。",
      "zh-TW": "根據兩個座標點或直線方程計算斜率，並取得角度、距離與直線方程。適合代數與解析幾何。",
      ja: "2つの座標点または直線の式から傾きを計算し、角度、距離、直線の式も取得できます。代数と座標幾何に最適です。",
      ko: "두 좌표점이나 직선 방정식으로 기울기를 계산하고, 각도, 거리, 직선 방정식도 확인하세요. 대수와 좌표기하에 적합합니다.",
      es: "Calcula la pendiente a partir de dos puntos o de una ecuación de recta. Obtén pendiente, ángulo, distancia y ecuación. Ideal para álgebra y geometría.",
      fr: "Calculez la pente à partir de deux points ou d’une équation de droite. Obtenez pente, angle, distance et équation. Idéal pour l’algèbre et la géométrie.",
      de: "Berechne die Steigung aus zwei Punkten oder einer Geradengleichung. Erhalte Steigung, Winkel, Abstand und Gleichung. Ideal für Algebra und Geometrie.",
      pt: "Calcule a inclinação a partir de dois pontos ou de uma equação da reta. Obtenha inclinação, ângulo, distância e equação. Ideal para álgebra e geometria.",
      ru: "Вычисляйте наклон по двум точкам или уравнению прямой. Получайте наклон, угол, расстояние и уравнение. Подходит для алгебры и координатной геометрии."
    }
  },
  {
    id: "rational-zeros-calculator",
    category: "math",
    slugs: {
      en: "rational-zeros-calculator",
      "zh-CN": "youli-lingdian-jisuanqi",
      "zh-TW": "youli-lingdian-jisuanqi",
      ja: "yuri-reiten-keisan-ki",
      ko: "yuri-0jeom-gyeonsagi",
      es: "calculadora-ceros-racionales",
      fr: "calculatrice-racines-rationnelles",
      de: "rationale-nullstellen-rechner",
      pt: "calculadora-zeros-racionais",
      ru: "kalkulyator-ratsionalnykh-nuley"
    },
    titles: {
      en: "Rational Zeros Calculator - Possible Polynomial Roots",
      "zh-CN": "有理零点计算器：多项式可能根",
      "zh-TW": "有理零點計算器：多項式可能根",
      ja: "有理零点計算機：多項式の候補根",
      ko: "유리 영점 계산기: 다항식 후보 근",
      es: "Calculadora de ceros racionales: raíces posibles",
      fr: "Calculatrice de zéros rationnels : racines possibles",
      de: "Rechner für rationale Nullstellen: mögliche Wurzeln",
      pt: "Calculadora de zeros racionais: raízes possíveis",
      ru: "Калькулятор рациональных нулей: возможные корни"
    },
    descriptions: {
      en: "Rational zeros calculator that lists every possible rational root from polynomial coefficients using the Rational Root Theorem, so you can test factors faster.",
      "zh-CN": "有理零点计算器：根据多项式系数和有理根定理列出所有可能的有理根，帮助你更快检验候选根。",
      "zh-TW": "有理零點計算器：依多項式係數與有理根定理列出所有可能的有理根，幫你更快檢驗候選根。",
      ja: "多項式係数から有理根定理で可能な有理根を一覧する計算機。候補根の確認をすばやく行えます。",
      ko: "다항식 계수로 유리근 정리를 적용해 가능한 유리근을 모두 나열하는 계산기입니다. 후보 근을 더 빨리 확인할 수 있습니다.",
      es: "Calculadora de ceros racionales que enumera todas las raíces racionales posibles a partir de los coeficientes usando el teorema de la raíz racional.",
      fr: "Calculatrice de zéros rationnels qui liste toutes les racines rationnelles possibles à partir des coefficients grâce au théorème des racines rationnelles.",
      de: "Rechner für rationale Nullstellen, der mithilfe des Rationalen-Nullstellen-Satzes alle möglichen rationalen Nullstellen aus den Koeffizienten auflistet.",
      pt: "Calculadora de zeros racionais que lista todas as raízes racionais possíveis a partir dos coeficientes usando o Teorema da Raiz Racional.",
      ru: "Калькулятор рациональных нулей, который по коэффициентам перечисляет все возможные рациональные корни с помощью теоремы о рациональных корнях."
    }
  },
  {
    id: "rationalize-denominator-calculator",
    category: "math",
    slugs: {
      en: "rationalize-denominator-calculator",
      "zh-CN": "fenzu-huayi-huaji-suanqi",
      "zh-TW": "fenmu-youlihua-jisuanqi",
      ja: "bunbo-yuurika-keisanki",
      ko: "bunmo-yurihwa-gyesangi",
      es: "calculadora-racionalizar-denominador",
      fr: "calculateur-rationaliser-denominateur",
      de: "nenner-rationalisieren-rechner",
      pt: "calculadora-racionalizar-denominador",
      ru: "racionalizovat-znamenatel-kalkulyator"
    },
    titles: {
      en: "Rationalize Denominator Calculator - Radical Fractions",
      "zh-CN": "分母有理化计算器",
      "zh-TW": "分母有理化計算器",
      ja: "分母有理化計算機",
      ko: "분모 유리화 계산기",
      es: "Calculadora de racionalizar denominador",
      fr: "Calculateur de rationalisation du dénominateur",
      de: "Nenner rationalisieren Rechner",
      pt: "Calculadora de racionalizar denominador",
      ru: "Калькулятор рационализации знаменателя"
    },
    descriptions: {
      en: "Rationalize denominator calculator for simple radicals and binomial surds. See the conjugate method and get an equivalent exact fraction fast.",
      "zh-CN": "用于简单根式和二项无理式的分母有理化计算器，快速展示共轭法并得到等价的精确分数。",
      "zh-TW": "適用於簡單根式與二項無理式的分母有理化計算器，快速展示共軛法並得到等價的精確分數。",
      ja: "単純な根号分母と二項無理式に対応した分母有理化計算機。共役の使い方をすばやく確認し、正確な分数を求めます。",
      ko: "단순 근호와 이항 무리식의 분모 유리화를 빠르게 계산하고, 공액법으로 정확한 분수를 확인하세요.",
      es: "Calculadora para racionalizar denominadores con radicales simples y binomios. Muestra el conjugado y una fracción exacta equivalente.",
      fr: "Calculateur pour rationaliser les dénominateurs avec radicaux simples ou binômes. Affiche le conjugué et une fraction exacte équivalente.",
      de: "Rechner zum Rationalisieren von Nennern mit einfachen Wurzeln und Binomen. Zeigt das Konjugierte und einen exakten Bruch.",
      pt: "Calculadora para racionalizar denominadores com radicais simples e binômios. Mostra o conjugado e uma fração exata equivalente.",
      ru: "Калькулятор для рационализации знаменателей с простыми радикалами и биномиальными иррациональностями. Показывает сопряжённое и точную дробь."
    }
  },
  {
    id: "ratios-of-directed-line-segments-calculator",
    category: "math",
    slugs: {
      en: "ratios-of-directed-line-segments-calculator",
      "zh-CN": "duanbaigongshi-youxiangxianduan",
      "zh-TW": "duanbiangongshi-youxiangxianduan",
      ja: "yuukousenbun-houbun-keisan",
      ko: "yuhyang-seonbun-bi-gongsi",
      es: "formula-seccion-segmentos-dirigidos",
      fr: "calculatrice-formule-section-segments-orientes",
      de: "teilungsformel-gerade-segmente",
      pt: "formula-secao-segmentos-direcionados",
      ru: "formula-secheniya-napravlennye-otrezki"
    },
    titles: {
      en: "Section Formula Calculator - Directed Line Segments",
      "zh-CN": "线段定比分点计算器",
      "zh-TW": "線段定比分點計算器",
      ja: "線分公式計算ツール",
      ko: "선분 공식 계산기",
      es: "Calculadora de fórmula de sección",
      fr: "Calculatrice de formule de section",
      de: "Teilungsformel-Rechner",
      pt: "Calculadora da fórmula da seção",
      ru: "Калькулятор формулы деления отрезка"
    },
    descriptions: {
      en: "Section formula calculator for internal or external division of directed line segments. Find the exact point from endpoints and ratio values fast.",
      "zh-CN": "用于线段内分或外分的定比分点计算器，快速求出端点与比例对应的精确坐标。",
      "zh-TW": "用於線段內分或外分的定比分點計算器，快速求出端點與比例對應的精確座標。",
      ja: "線分の内分・外分に対応した定比分点計算。端点と比から正確な座標をすばやく求めます。",
      ko: "선분의 내분과 외분을 위한 계산기입니다. 끝점과 비로 정확한 점의 좌표를 빠르게 구하세요.",
      es: "Calculadora de fórmula de sección para división interna o externa de segmentos dirigidos. Obtén el punto exacto al instante.",
      fr: "Calculatrice de formule de section pour la division interne ou externe de segments orientés. Trouvez le point exact rapidement.",
      de: "Teilungsformel-Rechner für innere oder äußere Teilung gerichteter Strecken. Bestimmen Sie schnell den exakten Punkt.",
      pt: "Calculadora da fórmula da seção para divisão interna ou externa de segmentos dirigidos. Encontre o ponto exato rapidamente.",
      ru: "Калькулятор формулы деления для внутреннего и внешнего деления направленных отрезков. Быстро найдите точную точку."
    }
  },
  {
    id: "reciprocal-calculator",
    category: "math",
    slugs: {
      en: "reciprocal-calculator",
      "zh-CN": "dao-shu-ji-suan-qi",
      "zh-TW": "dao-shu-ji-suan-qi",
      ja: "gyakusu-keisanki",
      ko: "yeoksu-gyesangi",
      es: "calculadora-reciprocos",
      fr: "calculatrice-reciproque",
      de: "kehrwert-rechner",
      pt: "calculadora-reciproco",
      ru: "kalkulyator-obratnogo-chisla"
    },
    titles: {
      en: "Reciprocal Calculator - Multiplicative Inverse",
      "zh-CN": "倒数计算器 - 乘法逆元",
      "zh-TW": "倒數計算機 - 乘法逆元",
      ja: "逆数計算機 - 乗法逆元",
      ko: "역수 계산기 - 곱셈 역원",
      es: "Calculadora de recíprocos - inversa multiplicativa",
      fr: "Calculatrice de réciproque - inverse multiplicative",
      de: "Kehrwert-Rechner - multiplikatives Inverses",
      pt: "Calculadora de recíproco - inverso multiplicativo",
      ru: "Калькулятор обратного числа - мультипликативная обратная"
    },
    descriptions: {
      en: "Reciprocal calculator for integers, decimals, and fractions. Convert any nonzero value to its simplified multiplicative inverse instantly.",
      "zh-CN": "倒数计算器可处理整数、小数和分数，立即将任何非零值转换为约分后的乘法逆元。",
      "zh-TW": "倒數計算機可處理整數、小數和分數，立即將任何非零值轉換為化簡後的乘法逆元。",
      ja: "整数、小数、分数の逆数をすばやく計算し、約分した分数と小数で表示します。",
      ko: "정수, 소수, 분수의 역수를 빠르게 계산해, 약분된 곱셈 역원을 분수와 소수로 보여줍니다.",
      es: "Calcula recíprocos de enteros, decimales y fracciones. Convierte cualquier valor no nulo en su inversa simplificada al instante.",
      fr: "Calculez des réciproques pour les entiers, décimaux et fractions. Convertissez instantanément toute valeur non nulle en inverse simplifié.",
      de: "Kehrwert-Rechner für ganze Zahlen, Dezimalzahlen und Brüche. Wandeln Sie jeden von null verschiedenen Wert sofort in seinen gekürzten Kehrwert um.",
      pt: "Calculadora de recíproco para inteiros, decimais e frações. Converta qualquer valor diferente de zero em seu inverso simplificado instantaneamente.",
      ru: "Калькулятор обратного числа для целых, десятичных и дробей. Мгновенно превращает любое ненулевое значение в упрощённую обратную величину."
    }
  },
  {
    id: "rectangular-prism-calculator",
    category: "math",
    slugs: {
      en: "rectangular-prism-calculator",
      "zh-CN": "changfangti-jisuanqi",
      "zh-TW": "changfangti-jisuanqi",
      ja: "chohokei-prism-keisanki",
      ko: "jiknyukmyeonche-gyesangi",
      es: "calculadora-prisma-rectangular",
      fr: "calculateur-prisme-rectangulaire",
      de: "quader-rechner",
      pt: "calculadora-prisma-retangular",
      ru: "kalkulyator-pryamougolnoy-prizmy"
    },
    titles: {
      en: "Rectangular Prism Calculator - Volume, Area, Diagonal",
      "zh-CN": "长方体计算器 - 体积、表面积、对角线",
      "zh-TW": "長方體計算器 - 體積、表面積、對角線",
      ja: "直方体計算機 - 体積、表面積、対角線",
      ko: "직육면체 계산기 - 부피, 겉넓이, 대각선",
      es: "Calculadora de prisma rectangular - Volumen, área y diagonal",
      fr: "Prisme rectangulaire - Volume, aire, diagonale",
      de: "Quader-Rechner - Volumen, Oberfläche, Diagonale",
      pt: "Calculadora de prisma retangular - Volume, área e diagonal",
      ru: "Калькулятор прямоугольной призмы - Объем, площадь, диагональ"
    },
    descriptions: {
      en: "Rectangular prism calculator for volume, surface area, space diagonal, and face diagonals. Get every key cuboid measurement from three dimensions fast.",
      "zh-CN": "长方体计算器可快速计算体积、表面积、空间对角线和面对角线。输入三个尺寸即可获得关键测量结果。",
      "zh-TW": "長方體計算器可快速計算體積、表面積、空間對角線與面對角線。輸入三個尺寸即可取得關鍵量測結果。",
      ja: "直方体の体積、表面積、空間対角線、面の対角線をすばやく計算。3つの寸法から主要な測定値を取得できます。",
      ko: "직육면체의 부피, 겉넓이, 공간 대각선, 면 대각선을 빠르게 계산합니다. 세 치수로 핵심 측정값을 확인하세요.",
      es: "Calcula volumen, área superficial, diagonal espacial y diagonales de las caras de un prisma rectangular a partir de tres dimensiones.",
      fr: "Calculez le volume, l'aire de surface, la diagonale de l'espace et les diagonales des faces d'un prisme rectangulaire.",
      de: "Berechnen Sie Volumen, Oberfläche, Raumdiagonale und Flächendiagonalen eines Quaders schnell aus drei Abmessungen.",
      pt: "Calcule volume, área de superfície, diagonal espacial e diagonais das faces de um prisma retangular a partir de três dimensões.",
      ru: "Рассчитайте объем, площадь поверхности, пространственную диагональ и диагонали граней прямоугольной призмы по трем размерам."
    }
  },
  {
    id: "quaternion-calculator",
    category: "math",
    slugs: {
      en: "quaternion-calculator",
      "zh-CN": "si-yuan-shu-ji-suan-qi",
      "zh-TW": "si-yuan-shu-ji-suan-qi",
      ja: "shigensu-keisanki",
      ko: "sawon-su-gyesangi",
      es: "calculadora-de-cuaterniones",
      fr: "calculateur-de-quaternions",
      de: "quaternionen-rechner",
      pt: "calculadora-de-quaternions",
      ru: "kalkulyator-kvaternionov"
    },
    titles: {
      en: "Quaternion Calculator - 4D Math & 3D Rotations",
      "zh-CN": "四元数计算器 - 4D 数学与 3D 旋转",
      "zh-TW": "四元數計算器 - 4D 數學與 3D 旋轉",
      ja: "四元数計算機 - 4D数学と3D回転",
      ko: "사원수 계산기 - 4D 수학과 3D 회전",
      es: "Calculadora de cuaterniones - Matemáticas 4D y rotaciones 3D",
      fr: "Calculateur de quaternions - Maths 4D et rotations 3D",
      de: "Quaternionen-Rechner - 4D-Mathematik und 3D-Rotationen",
      pt: "Calculadora de quaternions - Matemática 4D e rotações 3D",
      ru: "Калькулятор кватернионов - 4D-математика и 3D-вращения"
    },
    descriptions: {
      en: "Quaternion calculator for addition, subtraction, multiplication, conjugate, norm, and inverse. Essential for 3D graphics, robotics, and aerospace rotation math.",
      "zh-CN": "四元数计算器，支持加法、减法、乘法、共轭、范数和逆元。适用于 3D 图形、机器人和航空航天旋转数学。",
      "zh-TW": "四元數計算器，支援加法、減法、乘法、共軛、範數與反元素。適用於 3D 圖形、機器人與航太旋轉數學。",
      ja: "加算、減算、乗算、共役、ノルム、逆元に対応する四元数計算機。3Dグラフィックス、ロボット工学、航空宇宙の回転計算に最適です。",
      ko: "덧셈, 뺄셈, 곱셈, 켤레, 노름, 역원을 계산하는 사원수 계산기. 3D 그래픽, 로봇공학, 항공우주 회전 수학에 유용합니다.",
      es: "Calculadora de cuaterniones para suma, resta, multiplicación, conjugado, norma e inverso. Ideal para gráficos 3D, robótica y rotaciones aeroespaciales.",
      fr: "Calculateur de quaternions pour addition, soustraction, multiplication, conjugué, norme et inverse. Idéal pour graphisme 3D, robotique et rotations aéronautiques.",
      de: "Quaternionen-Rechner für Addition, Subtraktion, Multiplikation, Konjugation, Norm und Inverse. Für 3D-Grafik, Robotik und Luft- und Raumfahrt.",
      pt: "Calculadora de quaternions para adição, subtração, multiplicação, conjugado, norma e inverso. Essencial para gráficos 3D, robótica e rotações aeroespaciais.",
      ru: "Калькулятор кватернионов для сложения, вычитания, умножения, сопряжения, нормы и обратного. Для 3D-графики, робототехники и аэрокосмических вращений."
    }
  },
  {
    id: "queueing-theory-calculator",
    category: "math",
    slugs: {
      en: "queueing-theory-calculator",
      "zh-CN": "paiduilun-jisuanqi-mm-c-paidui-fenxi",
      "zh-TW": "paiduilun-jisuanqi-mm-c-paidui-fenxi",
      ja: "machigyouretsu-keisanki-mm-c-machigyouretsu-kaiseki",
      ko: "daegihangnyeol-gyesangi-mm-c-daegihangnyeol-bunseok",
      es: "calculadora-teoria-colas-analisis-mm-c",
      fr: "calculateur-files-attente-analyse-mm-c",
      de: "warteschlangentheorie-rechner-analyse-mm-c",
      pt: "calculadora-teoria-filas-analise-mm-c",
      ru: "kalkulyator-teorii-ocheredei-analiz-mm-c"
    },
    titles: {
      en: "Queueing Theory Calculator - M/M/c Queue Analysis",
      "zh-CN": "排队论计算器 - M/M/c 排队分析",
      "zh-TW": "排隊論計算器 - M/M/c 排隊分析",
      ja: "待ち行列計算機 - M/M/c 待ち行列解析",
      ko: "대기행렬 계산기 - M/M/c 대기행렬 분석",
      es: "Calculadora de teoría de colas - análisis M/M/c",
      fr: "Calculateur de files d’attente - analyse M/M/c",
      de: "Warteschlangentheorie-Rechner - M/M/c Analyse",
      pt: "Calculadora de teoria das filas - análise M/M/c",
      ru: "Калькулятор теории очередей - анализ M/M/c"
    },
    descriptions: {
      en: "Queueing theory calculator for M/M/1, M/M/c, M/M/c/K, and M/M/c/N models. Compute utilization, queue length, wait times, and system probabilities instantly.",
      "zh-CN": "排队论计算器，支持 M/M/1、M/M/c、M/M/c/K 和 M/M/c/N 模型。可即时计算利用率、队列长度、等待时间和系统概率。",
      "zh-TW": "排隊論計算器，支援 M/M/1、M/M/c、M/M/c/K 與 M/M/c/N 模型。可即時計算利用率、隊列長度、等待時間與系統機率。",
      ja: "M/M/1、M/M/c、M/M/c/K、M/M/c/N モデルに対応した待ち行列計算機。利用率、待ち行列長、待ち時間、系内確率を即座に算出します。",
      ko: "M/M/1, M/M/c, M/M/c/K, M/M/c/N 모델을 지원하는 대기행렬 계산기입니다. 이용률, 대기행렬 길이, 대기시간, 시스템 확률을 즉시 계산합니다.",
      es: "Calculadora de teoría de colas para modelos M/M/1, M/M/c, M/M/c/K y M/M/c/N. Calcula al instante utilización, colas, tiempos de espera y probabilidades.",
      fr: "Calculateur de files d’attente pour les modèles M/M/1, M/M/c, M/M/c/K et M/M/c/N. Calcule instantanément l’utilisation, les files, les temps d’attente et les probabilités.",
      de: "Warteschlangentheorie-Rechner für die Modelle M/M/1, M/M/c, M/M/c/K und M/M/c/N. Berechnet Auslastung, Warteschlangenlänge, Wartezeiten und Wahrscheinlichkeiten sofort.",
      pt: "Calculadora de teoria das filas para os modelos M/M/1, M/M/c, M/M/c/K e M/M/c/N. Calcula instantaneamente utilização, tamanho da fila, tempos de espera e probabilidades.",
      ru: "Калькулятор теории очередей для моделей M/M/1, M/M/c, M/M/c/K и M/M/c/N. Мгновенно вычисляет загрузку, длину очереди, время ожидания и вероятности."
    }
  },
  {
    id: "quotient-calculator",
    category: "math",
    slugs: {
      en: "quotient-calculator",
      "zh-CN": "shang-shu-ji-suan-qi",
      "zh-TW": "shang-shu-ji-suan-qi",
      ja: "shou-to-amari-keisanki",
      ko: "mok-gyeong-san-gi",
      es: "calculadora-de-cociente",
      fr: "calculateur-de-quotient",
      de: "quotientenrechner",
      pt: "calculadora-de-quociente",
      ru: "kalkulyator-chastnogo"
    },
    titles: {
      en: "Quotient Calculator - Find Quotient and Remainder",
      "zh-CN": "商数计算器 - 求商与余数",
      "zh-TW": "商數計算器 - 求商與餘數",
      ja: "商と余り計算機 - 商と余りを求める",
      ko: "몫 계산기 - 몫과 나머지 찾기",
      es: "Calculadora de cociente - hallar cociente y resto",
      fr: "Calculatrice de quotient - trouver quotient et reste",
      de: "Quotientenrechner - Quotient und Rest finden",
      pt: "Calculadora de quociente - encontre quociente e resto",
      ru: "Калькулятор частного - найти частное и остаток"
    },
    descriptions: {
      en: "Quotient calculator that instantly finds the integer quotient and remainder for any division. Supports positive, negative, and large integers with verification.",
      "zh-CN": "商数计算器可即时计算任意除法的整数商和余数，支持正数、负数和大整数，并可验证结果。",
      "zh-TW": "商數計算器可即時算出任何除法的整數商與餘數，支援正數、負數與大整數，並可驗證結果。",
      ja: "任意の割り算の整数の商と余りを即座に求める計算機。正の数、負の数、大きな整数に対応し、検算もできます。",
      ko: "어떤 나눗셈이든 정수 몫과 나머지를 즉시 구하는 계산기입니다. 양수, 음수, 큰 정수를 지원하며 검산도 가능합니다.",
      es: "Calculadora de cociente que encuentra al instante el cociente entero y el resto de cualquier división. Admite enteros positivos, negativos y grandes.",
      fr: "Calculatrice de quotient qui trouve instantanément le quotient entier et le reste de toute division. Prend en charge les entiers positifs, négatifs et grands.",
      de: "Quotientenrechner, der für jede Division sofort den ganzzahligen Quotienten und Rest findet. Unterstützt positive, negative und große Ganzzahlen.",
      pt: "Calculadora de quociente que encontra instantaneamente o quociente inteiro e o resto de qualquer divisão. Suporta inteiros positivos, negativos e grandes.",
      ru: "Калькулятор частного мгновенно находит целую частную и остаток для любого деления. Поддерживает положительные, отрицательные и большие целые числа."
    }
  },
  {
    id: "radical-calculator",
    category: "math",
    slugs: {
      en: "radical-calculator",
      "zh-CN": "genshi-jisuanqi",
      "zh-TW": "genshi-jisuanqi",
      ja: "kongo-keisanki",
      ko: "geunho-gyesangi",
      es: "calculadora-radicales",
      fr: "calculatrice-radicaux",
      de: "radikalrechner",
      pt: "calculadora-radicais",
      ru: "kalkulyator-radikalov"
    },
    titles: {
      en: "Radical Calculator - Simplify Square, Cube & Nth Roots",
      "zh-CN": "根式计算器 - 化简平方根、立方根和 n 次根",
      "zh-TW": "根式計算器 - 化簡平方根、立方根和 n 次根",
      ja: "根号計算機 - 平方根・立方根・n乗根の簡約",
      ko: "근호 계산기 - 제곱근·세제곱근·n제곱근 간단화",
      es: "Calculadora de radicales - simplifica raíces",
      fr: "Calculatrice de radicaux - simplifiez les racines",
      de: "Radikalrechner - Quadrat-, Kubik- und n-te Wurzeln",
      pt: "Calculadora de radicais - simplifique raízes",
      ru: "Калькулятор радикалов - квадратные и n-е корни"
    },
    descriptions: {
      en: "Radical calculator simplifies square roots, cube roots, and nth roots by factoring out perfect powers. Get simplified radical form and decimal value instantly.",
      "zh-CN": "通过因式分解提取完全幂，快速化简平方根、立方根和 n 次根，并立即得到根式和小数值。",
      "zh-TW": "透過因式分解提取完全冪，快速化簡平方根、立方根和 n 次根，並立即得到根式與小數值。",
      ja: "完全冪をくくり出して、平方根・立方根・n乗根を素早く簡約し、根号の形と小数値をすぐ表示します。",
      ko: "완전 거듭제곱 인수를 분해해 제곱근·세제곱근·n제곱근을 빠르게 간단화하고, 근호와 소수값을 바로 보여줍니다.",
      es: "Simplifica raíces cuadradas, cúbicas y n-ésimas extrayendo potencias perfectas y obtén el radical y el decimal al instante.",
      fr: "Simplifiez les racines carrées, cubiques et n-ièmes en extrayant les puissances parfaites et obtenez le radical et la valeur décimale.",
      de: "Vereinfacht Quadrat-, Kubik- und n-te Wurzeln durch Ausklammern perfekter Potenzen und zeigt sofort Radikand und Dezimalwert.",
      pt: "Simplifique raízes quadradas, cúbicas e n-ésimas extraindo potências perfeitas e obtenha o radical e o valor decimal na hora.",
      ru: "Упрощайте квадратные, кубические и n-е корни, выделяя полные степени, и сразу получайте радикал и десятичное значение."
    }
  },
  {
    id: "ratio-calculator",
    category: "math",
    slugs: {
      en: "ratio-calculator",
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
      en: "Ratio Calculator - Solve Proportions & Simplify Ratios",
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
      en: "Ratio calculator to solve for a missing value in A:B = C:D proportions or simplify a ratio to lowest terms. Perfect for recipes, maps, and scale problems.",
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
    id: "percentage-increase-calculator",
    category: "math",
    slugs: {
      en: "percentage-increase-calculator",
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
      en: "Percentage Increase Calculator - Calculate Percent Growth",
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
      en: "Percentage increase calculator to find percent growth or decline between any two values. Ideal for stock prices, salaries, and website traffic.",
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
    id: "percentage-of-a-percentage-calculator",
    category: "math",
    slugs: {
      en: "percentage-of-a-percentage-calculator",
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
      en: "Percentage of a Percentage Calculator - Nested Percentages",
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
      en: "Percentage of a percentage calculator for nested discounts, layered fees, and statistical sub-groups. Find what P1% of P2% equals instantly.",
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
    id: "percentage-point-calculator",
    category: "math",
    slugs: {
      en: "percentage-point-calculator",
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
      en: "Percentage Point Calculator - Percentage Point Difference",
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
      en: "Percentage point calculator to measure the arithmetic difference between two percentages. Essential for interest rates, polls, and market share reports.",
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
    id: "perfect-cube-calculator",
    category: "math",
    slugs: {
      en: "perfect-cube-calculator",
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
      en: "Perfect Cube Calculator - Check Numbers and Find Cube Roots",
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
      en: "Perfect cube calculator to check if any integer is a perfect cube, find its cube root, or locate the nearest perfect cubes. Works with negative numbers.",
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
    id: "perfect-square-calculator",
    category: "math",
    slugs: {
      en: "perfect-square-calculator",
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
      en: "Perfect Square Calculator - Find Square Roots Instantly",
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
      en: "Perfect square calculator to check if any non-negative integer is a perfect square, find its integer square root, or show the nearest perfect squares.",
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
    id: "natural-log-calculator",
    category: "math",
    slugs: {
      en: "natural-log-calculator",
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
      en: "Natural Log Calculator - Calculate ln(x) Instantly",
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
      en: "Natural log calculator that computes ln(x) for any positive number. See the result, symbolic equation, and formula side by side — free and instant.",
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
    id: "negative-log-calculator",
    category: "math",
    slugs: {
      en: "negative-log-calculator",
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
      en: "Negative Log Calculator - Compute -log(x) for Any Base",
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
      en: "Negative log calculator for pH, surprisal, and custom-base −log_b(x) computations. Supports base 10, base 2, base e, and any positive base ≠ 1.",
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
    id: "nor-calculator",
    category: "math",
    slugs: {
      en: "nor-calculator",
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
      en: "NOR Logic Calculator - Boolean NOR Gate & Truth Table",
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
      en: "NOR logic calculator for 2–4 inputs with full truth table generator. Supports binary and Boolean input formats for digital logic design and coursework.",
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
    id: "null-space-calculator",
    category: "math",
    slugs: {
      en: "null-space-calculator",
      "zh-CN": "ling-kong-jian-ji-suan-qi",
      "zh-TW": "ling-kong-jian-ji-suan-qi",
      ja: "rei-kukan-keisanki",
      ko: "yeong-gonggan-gye-sangi",
      es: "calculadora-espacio-nulo-matriz",
      fr: "calculateur-espace-nul-matrice",
      de: "nullraum-rechner-matrix",
      pt: "calculadora-espaco-nulo-matriz",
      ru: "kalkulyator-nulevogo-prostranstva"
    },
    titles: {
      en: "Null Space Calculator - Find Matrix Kernel & Basis Vectors",
      "zh-CN": "零空间计算器 - 求矩阵核与基向量",
      "zh-TW": "零空間計算器 - 求矩陣核與基向量",
      ja: "零空間計算機 - 行列の核と基底ベクトル",
      ko: "영공간 계산기 - 행렬의 핵과 기저벡터",
      es: "Calculadora de espacio nulo - núcleo y base",
      fr: "Calculateur d’espace nul - noyau et base",
      de: "Nullraum-Rechner - Kern und Basisvektoren",
      pt: "Calculadora de espaço nulo - núcleo e base",
      ru: "Калькулятор нулевого пространства - ядро и базис"
    },
    descriptions: {
      en: "Null space calculator using Gauss-Jordan RREF for matrices up to 4×4. Shows basis vectors, rank, and nullity — essential for linear algebra coursework.",
      "zh-CN": "使用高斯-约当消元计算4×4以内矩阵的零空间，显示基向量、秩和零度，适合线性代数作业。",
      "zh-TW": "使用高斯-喬丹消去計算 4×4 內矩陣的零空間，顯示基向量、秩與零度，適合線性代數作業。",
      ja: "ガウス・ジョルダン消去で 4×4 までの行列の零空間を求め、基底ベクトル・階数・零化度を表示します。",
      ko: "가우스-조던 소거로 4×4 이하 행렬의 영공간을 구하고, 기저벡터·랭크·널리티를 보여줍니다.",
      es: "Calcula el espacio nulo de matrices de hasta 4×4 con Gauss-Jordan y muestra base, rango y nulidad.",
      fr: "Calcule l’espace nul de matrices jusqu’à 4×4 avec Gauss-Jordan et affiche base, rang et nullité.",
      de: "Berechnet den Nullraum von Matrizen bis 4×4 mit Gauss-Jordan und zeigt Basisvektoren, Rang und Nullität.",
      pt: "Calcula o espaço nulo de matrizes até 4×4 com Gauss-Jordan e mostra base, posto e nulidade.",
      ru: "Находит нулевое пространство матриц до 4×4 методом Гаусса–Жордана и показывает базис, ранг и дефект."
    }
  },
  {
    id: "octagon-calculator",
    category: "math",
    slugs: {
      en: "octagon-calculator",
      "zh-CN": "bajiaoxing-jisuanqi",
      "zh-TW": "bajiaoxing-jisuanqi",
      ja: "hachikakkei-keisan",
      ko: "palgakhyeong-gyesangi",
      es: "calculadora-octagono",
      fr: "calculatrice-octogone",
      de: "achteck-rechner",
      pt: "calculadora-octogono",
      ru: "vosmiyugolnik-kalkulyator"
    },
    titles: {
      en: "Octagon Calculator: Area, Perimeter, Apothem & More",
      "zh-CN": "八边形计算器：面积、周长、内切圆半径等",
      "zh-TW": "八邊形計算器：面積、周長、內切圓半徑等",
      ja: "八角形計算機：面積、周長、内接円半径など",
      ko: "팔각형 계산기: 넓이, 둘레, 내접반지름 등",
      es: "Calculadora de octágonos: área, perímetro y más",
      fr: "Calculatrice d'octogone : aire, périmètre et plus",
      de: "Achteck-Rechner: Fläche, Umfang, Apothem und mehr",
      pt: "Calculadora de octógono: área, perímetro e mais",
      ru: "Калькулятор восьмиугольника: площадь и периметр"
    },
    descriptions: {
      en: "Octagon calculator that computes area, perimeter, apothem, circumradius, and diagonals of any regular octagon from its side length with instant results.",
      "zh-CN": "八边形计算器可根据边长即时计算面积、周长、内切圆半径、外接圆半径和对角线。",
      "zh-TW": "八邊形計算器可依邊長即時計算面積、周長、內切圓半徑、外接圓半徑與對角線。",
      ja: "八角形計算機は、辺の長さから面積、周長、内接円半径、外接円半径、対角線を即時計算します。",
      ko: "변의 길이로 정팔각형의 넓이, 둘레, 내접반지름, 외접반지름, 대각선을 즉시 계산합니다.",
      es: "Calcula al instante el área, perímetro, apotema, circunradio y diagonales de cualquier octágono regular.",
      fr: "Calcule instantanément l’aire, le périmètre, l’apothème, le rayon circonscrit et les diagonales d’un octogone régulier.",
      de: "Berechnet Fläche, Umfang, Apothem, Umkreisradius und Diagonalen eines regelmäßigen Achtecks sofort aus der Seitenlänge.",
      pt: "Calcula instantaneamente área, perímetro, apótema, circunrádio e diagonais de qualquer octógono regular a partir do lado.",
      ru: "Мгновенно вычисляет площадь, периметр, апофему, радиус описанной окружности и диагонали правильного восьмиугольника."
    }
  },
  {
    id: "multiplying-binomials-calculator",
    category: "math",
    slugs: {
      en: "multiplying-binomials-calculator",
      "zh-CN": "erxiangshi-xiangcheng-jisuanqi",
      "zh-TW": "erxiangshi-xiangcheng-jisuanqi",
      ja: "nijoushiki-kakezan-keisanki",
      ko: "ihangsik-gobsem-gyesangi",
      es: "calculadora-multiplicar-binomios",
      fr: "calculatrice-multiplication-binomes",
      de: "binome-multiplizieren-rechner",
      pt: "calculadora-multiplicar-binomios",
      ru: "kalkulyator-umnozheniya-binomov"
    },
    titles: {
      en: "Multiplying Binomials Calculator - FOIL Method",
      "zh-CN": "二项式相乘计算器 - FOIL 方法",
      "zh-TW": "二項式相乘計算器 - FOIL 方法",
      ja: "二項式の掛け算計算機 - FOIL 法",
      ko: "이항식 곱셈 계산기 - FOIL 방법",
      es: "Calculadora de multiplicar binomios - método FOIL",
      fr: "Calculatrice de multiplication de binômes - méthode FOIL",
      de: "Binome multiplizieren Rechner - FOIL-Methode",
      pt: "Calculadora de multiplicação de binômios - método FOIL",
      ru: "Калькулятор умножения биномов - метод FOIL"
    },
    descriptions: {
      en: "Multiply two binomials using the FOIL method. Enter coefficients to expand (ax+b)(cx+d) and get step-by-step solutions instantly.",
      "zh-CN": "使用 FOIL 方法相乘两个二项式。输入系数展开 (ax+b)(cx+d)，立即获得分步解答。",
      "zh-TW": "使用 FOIL 方法相乘兩個二項式。輸入係數展開 (ax+b)(cx+d)，立即取得逐步解答。",
      ja: "FOIL 法で2つの二項式を掛け算。係数を入力して (ax+b)(cx+d) を展開し、手順付きの解答をすぐに表示します。",
      ko: "FOIL 방법으로 두 이항식을 곱하세요. 계수를 입력해 (ax+b)(cx+d)를 전개하고 단계별 풀이를 즉시 확인합니다.",
      es: "Multiplica dos binomios con el método FOIL. Introduce coeficientes para expandir (ax+b)(cx+d) y obtener pasos al instante.",
      fr: "Multipliez deux binômes avec la méthode FOIL. Entrez les coefficients pour développer (ax+b)(cx+d) et obtenir les étapes instantanément.",
      de: "Multipliziere zwei Binome mit der FOIL-Methode. Gib Koeffizienten ein, entwickle (ax+b)(cx+d) und erhalte sofort Lösungsschritte.",
      pt: "Multiplique dois binômios pelo método FOIL. Insira coeficientes para expandir (ax+b)(cx+d) e ver a solução passo a passo.",
      ru: "Умножайте два бинома методом FOIL. Введите коэффициенты, чтобы разложить (ax+b)(cx+d) и сразу получить пошаговое решение."
    }
  },
  {
    id: "multiplying-exponents-calculator",
    category: "math",
    slugs: {
      en: "multiplying-exponents-calculator",
      "zh-CN": "zhishu-chengfa-jisuanqi",
      "zh-TW": "zhishu-chengfa-jisuanqi",
      ja: "shisuu-kakezan-keisanki",
      ko: "jisu-gopgye-san-gyesan-gi",
      es: "calculadora-multiplicacion-exponentes",
      fr: "calculatrice-multiplication-exposants",
      de: "exponenten-multiplikationsrechner",
      pt: "calculadora-multiplicacao-expoentes",
      ru: "kalkulyator-umnozheniya-stepeney"
    },
    titles: {
      en: "Multiplying Exponents Calculator - Multiply Powers",
      "zh-CN": "指数相乘计算器",
      "zh-TW": "指數相乘計算器",
      ja: "指数乗算計算機",
      ko: "지수 곱셈 계산기",
      es: "Calculadora de exponentes multiplicados",
      fr: "Calculatrice de multiplication des exposants",
      de: "Exponenten-Multiplikationsrechner",
      pt: "Calculadora de multiplicação de expoentes",
      ru: "Калькулятор умножения степеней"
    },
    descriptions: {
      en: "Multiply exponents with the same or different bases. Applies the product-of-powers rule automatically and computes the numerical result instantly.",
      "zh-CN": "输入两个幂的底数和指数，自动套用同底数幂相乘法则并即时计算数值结果。",
      "zh-TW": "輸入兩個冪的底數和指數，會自動套用同底數冪相乘法則並即時計算數值結果。",
      ja: "2つの指数の底と指数を入力すると、同じ底の法則を自動適用し、数値結果を即座に計算します。",
      ko: "두 거듭제곱의 밑과 지수를 입력하면 같은 밑 법칙을 자동으로 적용해 수치 결과를 바로 계산합니다.",
      es: "Ingresa la base y el exponente de dos potencias; aplica la regla de producto de potencias y calcula el resultado al instante.",
      fr: "Saisissez la base et l’exposant de deux puissances ; la règle du produit de puissances est appliquée automatiquement et le résultat s’affiche aussitôt.",
      de: "Gib Basis und Exponent zweier Potenzen ein; die Potenzgesetze werden automatisch angewendet und das Ergebnis sofort berechnet.",
      pt: "Digite a base e o expoente de duas potências; a regra do produto de potências é aplicada automaticamente e o resultado sai na hora.",
      ru: "Введите основание и показатель двух степеней; правило произведения степеней применяется автоматически, и результат считается сразу."
    }
  },
  {
    id: "multiplying-fractions-calculator",
    category: "math",
    slugs: {
      en: "multiplying-fractions-calculator",
      "zh-CN": "fen-shu-cheng-fa-ji-suan-qi",
      "zh-TW": "fen-shu-cheng-fa-ji-suan-qi",
      ja: "bunsu-kakezan-keisanki",
      ko: "bunsu-gopsem-gyesangi",
      es: "calculadora-multiplicar-fracciones",
      fr: "calculatrice-multiplication-fractions",
      de: "bruch-multiplikation-rechner",
      pt: "calculadora-multiplicar-fracoes",
      ru: "kalkulyator-umnozheniya-drobey"
    },
    titles: {
      en: "Multiplying Fractions Calculator - Fraction Math",
      "zh-CN": "分数乘法计算器",
      "zh-TW": "分數乘法計算器",
      ja: "分数の掛け算計算機",
      ko: "분수 곱셈 계산기",
      es: "Calculadora para multiplicar fracciones",
      fr: "Calculatrice de multiplication de fractions",
      de: "Brüche multiplizieren Rechner",
      pt: "Calculadora de multiplicar frações",
      ru: "Калькулятор умножения дробей"
    },
    descriptions: {
      en: "Multiply two fractions and get the fully simplified result. Handles proper and improper fractions with automatic GCD simplification instantly.",
      "zh-CN": "输入两个分数，立即得到完全化简的乘积。支持真分数、假分数，并自动用最大公因数化简。",
      "zh-TW": "輸入兩個分數，立即取得完全化簡的乘積。支援真分數、假分數，並自動用最大公因數化簡。",
      ja: "2つの分数を掛け合わせ、完全に約分した結果をすぐに表示。真分数・仮分数に対応し、GCDで自動約分します。",
      ko: "두 분수를 곱하고 완전히 약분된 결과를 즉시 확인하세요. 진분수와 가분수를 지원하며 GCD로 자동 약분합니다.",
      es: "Multiplica dos fracciones y obtén el resultado totalmente simplificado. Admite fracciones propias e impropias con simplificación GCD automática.",
      fr: "Multipliez deux fractions et obtenez le résultat entièrement simplifié. Prend en charge fractions propres et impropres avec simplification GCD automatique.",
      de: "Multipliziere zwei Brüche und erhalte das vollständig gekürzte Ergebnis. Unterstützt echte und unechte Brüche mit automatischer GCD-Kürzung.",
      pt: "Multiplique duas frações e obtenha o resultado totalmente simplificado. Aceita frações próprias e impróprias com simplificação GCD automática.",
      ru: "Умножайте две дроби и сразу получайте полностью сокращенный результат. Поддерживает правильные и неправильные дроби с автоматическим GCD."
    }
  },
  {
    id: "multiplying-polynomials-calculator",
    category: "math",
    slugs: {
      en: "multiplying-polynomials-calculator",
      "zh-CN": "chengfa-duoxiangshi-jisuanqi",
      "zh-TW": "chengfa-duoxiangshi-jisuanqi",
      ja: "takoushiki-kakezan-keisanki",
      ko: "dahangsik-gopsem-gyesangi",
      es: "calculadora-multiplicar-polinomios",
      fr: "calculatrice-multiplication-polynomes",
      de: "polynom-multiplikationsrechner",
      pt: "calculadora-multiplicar-polinomios",
      ru: "kalkulyator-umnozheniya-mnogochlenov"
    },
    titles: {
      en: "Multiplying Polynomials Calculator - Algebra Tool",
      "zh-CN": "多项式乘法计算器",
      "zh-TW": "多項式乘法計算器",
      ja: "多項式の乗算計算機",
      ko: "다항식 곱셈 계산기",
      es: "Calculadora de multiplicación de polinomios",
      fr: "Calculatrice de multiplication de polynômes",
      de: "Polynom-Multiplikationsrechner",
      pt: "Calculadora de multiplicação de polinômios",
      ru: "Калькулятор умножения многочленов"
    },
    descriptions: {
      en: "Multiply any two polynomials by entering comma-separated coefficients. Get the fully expanded product polynomial with complete calculation instantly.",
      "zh-CN": "输入以逗号分隔的系数，快速计算任意两个多项式的乘积并展开成标准形式。",
      "zh-TW": "輸入以逗號分隔的係數，快速計算任意兩個多項式的乘積並展開成標準形式。",
      ja: "カンマ区切りの係数を入力して、多項式どうしの積をすばやく展開します。",
      ko: "쉼표로 구분한 계수를 입력해 두 다항식의 곱을 빠르게 전개합니다.",
      es: "Ingresa coeficientes separados por comas y calcula al instante el producto expandido de dos polinomios.",
      fr: "Saisissez des coefficients séparés par des virgules et calculez instantanément le produit développé de deux polynômes.",
      de: "Gib durch Kommas getrennte Koeffizienten ein und berechne sofort das vollständig ausmultiplizierte Produkt.",
      pt: "Digite coeficientes separados por vírgulas e calcule instantaneamente o produto expandido de dois polinômios.",
      ru: "Введите коэффициенты через запятую и мгновенно получите развернутое произведение двух многочленов."
    }
  },
  {
    id: "multiplying-radicals-calculator",
    category: "math",
    slugs: {
      en: "multiplying-radicals-calculator",
      "zh-CN": "gen-shi-xiang-cheng-ji-suan-qi",
      "zh-TW": "gen-shi-xiang-cheng-ji-suan-qi",
      ja: "konshiki-kakezan-keisanki",
      ko: "geomhog-gopseum-gyeolsan-gi",
      es: "calculadora-multiplicar-radicales",
      fr: "calculatrice-multiplier-radicaux",
      de: "radikale-multiplizieren-rechner",
      pt: "calculadora-multiplicar-radicais",
      ru: "umnozhenie-radikalov-kalkulyator"
    },
    titles: {
      en: "Multiplying Radicals Calculator - Simplify Radicals",
      "zh-CN": "根式乘法计算器",
      "zh-TW": "根式乘法計算器",
      ja: "根号の掛け算計算機",
      ko: "근호 곱셈 계산기",
      es: "Calculadora de multiplicar radicales",
      fr: "Calculatrice de multiplication de radicaux",
      de: "Radikale multiplizieren Rechner",
      pt: "Calculadora de multiplicar radicais",
      ru: "Калькулятор умножения радикалов"
    },
    descriptions: {
      en: "Multiply radical expressions a√x and b√y and simplify the result. Factors out perfect squares automatically to return the simplest radical form.",
      "zh-CN": "输入两个形如 a√x 和 b√y 的根式，自动相乘并化简为最简根式。",
      "zh-TW": "輸入兩個形如 a√x 和 b√y 的根式，會自動相乘並化簡為最簡根式。",
      ja: "a√x と b√y の2つの根号式を入力すると、自動で掛け算して最簡形にします。",
      ko: "a√x와 b√y 형태의 두 근호식을 입력하면 자동으로 곱하고 가장 단순한 형태로 정리합니다.",
      es: "Multiplica expresiones radicales a√x y b√y y simplifica el resultado automáticamente.",
      fr: "Multipliez les expressions radicales a√x et b√y et simplifiez automatiquement le résultat.",
      de: "Multipliziere die Radikalterme a√x und b√y und vereinfache das Ergebnis automatisch.",
      pt: "Multiplique expressões radicais a√x e b√y e simplifique o resultado automaticamente.",
      ru: "Перемножайте радикальные выражения a√x и b√y и автоматически получайте упрощённый результат."
    }
  },
  {
    id: "mayan-numerals-converter",
    category: "math",
    slugs: {
      en: "mayan-numerals-converter",
      "zh-CN": "maya-shuzi-zhuanhuanqi",
      "zh-TW": "maya-shuzi-zhuanhuanqi",
      ja: "maya-suji-henkan",
      ko: "maya-sujeu-byeonhwan",
      es: "convertidor-numeros-maya",
      fr: "convertisseur-nombres-maya",
      de: "maya-zahlen-konverter",
      pt: "conversor-numeros-maias",
      ru: "maya-tsifry-konverter"
    },
    titles: {
      en: "Mayan Numerals Converter - Decimal to Maya Numbers",
      "zh-CN": "玛雅数字转换器：十进制转玛雅数",
      "zh-TW": "瑪雅數字轉換器：十進制轉瑪雅數",
      ja: "マヤ数字変換器：10進数をマヤ数へ",
      ko: "마야 숫자 변환기: 10진수에서 마야 수로",
      es: "Convertidor de números mayas: decimal a maya",
      fr: "Convertisseur de nombres mayas : décimal vers maya",
      de: "Maya-Zahlen-Konverter: Dezimal zu Maya",
      pt: "Conversor de números maias: decimal para maia",
      ru: "Конвертер чисел майя: десятичные в майя"
    },
    descriptions: {
      en: "Convert decimal numbers to ancient Mayan vigesimal (base-20) notation with dots, bars, and shell symbols, or decode Mayan positions back to decimal.",
      "zh-CN": "在十进制与古玛雅二十进制数字系统之间转换，使用点、横条和贝壳符号，或将玛雅位值解码为十进制。",
      "zh-TW": "在十進制與古瑪雅二十進制數字系統之間轉換，使用點、橫條和貝殼符號，或將瑪雅位值解碼為十進制。",
      ja: "10進数と古代マヤの20進表記を点・棒・貝殻記号で相互変換し、マヤの位値を10進数へも復号できます。",
      ko: "십진수와 고대 마야 20진수 표기를 점, 막대, 조개 기호로 상호 변환하고 마야 자리값을 10진수로 해독합니다.",
      es: "Convierte entre decimales y la antigua numeración maya vigesimal con puntos, barras y conchas, o decodifica posiciones mayas a decimal.",
      fr: "Convertissez les décimaux et l’ancien système maya vigésimal avec points, barres et coquilles, ou décodez les positions mayas en décimal.",
      de: "Wandle zwischen Dezimalzahlen und dem alten Maya-Vigesimalsystem mit Punkten, Balken und Muschelzeichen um oder decodiere Maya-Stellenwerte.",
      pt: "Converta entre decimais e a antiga numeração maia vigesimal com pontos, barras e conchas, ou decodifique posições maias para decimal.",
      ru: "Преобразуйте десятичные числа в древнюю двадцатеричную систему майя с точками, чертами и раковинами или расшифруйте позиции майя в десятичные."
    }
  },
  {
    id: "mean-calculator",
    category: "math",
    slugs: {
      en: "mean-calculator",
      "zh-CN": "pingjunshu-jisuanqi",
      "zh-TW": "pingjunshu-jisuanqi",
      ja: "heikinchi-keisanki",
      ko: "pyeonggyun-gyesangi",
      es: "calculadora-media",
      fr: "calculateur-moyenne",
      de: "mittelwert-rechner",
      pt: "calculadora-media",
      ru: "kalkulyator-srednego"
    },
    titles: {
      en: "Mean Calculator - Calculate the Average of Any Number Set",
      "zh-CN": "平均数计算器 - 计算任意数字集的平均值",
      "zh-TW": "平均數計算器 - 計算任意數字集的平均值",
      ja: "平均値計算機 - 任意の数値セットの平均を計算",
      ko: "평균 계산기 - 모든 숫자 집합의 평균 계산",
      es: "Calculadora de media - Calcula cualquier promedio",
      fr: "Calculateur de moyenne - Calculez toute moyenne",
      de: "Mittelwert-Rechner - Durchschnitt berechnen",
      pt: "Calculadora de média - Calcule qualquer média",
      ru: "Калькулятор среднего - расчет среднего значения"
    },
    descriptions: {
      en: "Mean calculator finds the arithmetic average of any set of numbers. Enter your data to get the mean, sum, and count with the formula shown.",
      "zh-CN": "平均数计算器可求任意数字集的算术平均值。输入数据即可获得平均数、总和、数量，并显示计算公式。",
      "zh-TW": "平均數計算器可求任意數字集的算術平均值。輸入資料即可取得平均數、總和、數量，並顯示公式。",
      ja: "平均値計算機で任意の数値セットの算術平均を求めます。データを入力すると、平均、合計、個数と計算式を表示します。",
      ko: "평균 계산기로 숫자 집합의 산술 평균을 구하세요. 데이터를 입력하면 평균, 합계, 개수와 계산식을 확인할 수 있습니다.",
      es: "Calcula la media aritmética de cualquier conjunto de números. Ingresa tus datos para ver la media, la suma, el recuento y la fórmula.",
      fr: "Calculez la moyenne arithmétique de n'importe quel ensemble de nombres. Entrez vos données pour obtenir moyenne, somme, nombre et formule.",
      de: "Berechnen Sie den arithmetischen Mittelwert beliebiger Zahlen. Daten eingeben und Mittelwert, Summe, Anzahl sowie Formel anzeigen.",
      pt: "Calcule a média aritmética de qualquer conjunto de números. Insira os dados para ver média, soma, contagem e fórmula.",
      ru: "Калькулятор среднего находит арифметическое среднее любого набора чисел. Введите данные и получите среднее, сумму, количество и формулу."
    }
  },
  {
    id: "midpoint-calculator",
    category: "math",
    slugs: {
      en: "midpoint-calculator",
      "zh-CN": "zhongdian-jisuanqi",
      "zh-TW": "zhongdian-jisuanqi",
      ja: "chuten-keisanki",
      ko: "jungjeom-gyesan-gi",
      es: "calculadora-punto-medio",
      fr: "calculateur-point-milieu",
      de: "mittelpunkt-rechner",
      pt: "calculadora-ponto-medio",
      ru: "kalkulyator-serediny-otrezka"
    },
    titles: {
      en: "Midpoint Calculator - Find Midpoint Between Two Points",
      "zh-CN": "中点计算器：求两点中点",
      "zh-TW": "中點計算器：求兩點中點",
      ja: "中点計算機｜2点の中点を求める",
      ko: "중점 계산기 | 두 점의 중점 찾기",
      es: "Calculadora de punto medio | Dos puntos",
      fr: "Calculateur de point milieu | Deux points",
      de: "Mittelpunkt-Rechner | Zwei Punkte",
      pt: "Calculadora de ponto médio | Dois pontos",
      ru: "Калькулятор середины | Две точки"
    },
    descriptions: {
      en: "Midpoint calculator finds the exact midpoint of a line segment in 2D or 3D space. Enter two point coordinates for instant results with the midpoint formula.",
      "zh-CN": "中点计算器可快速求出二维或三维线段的精确中点，输入两点坐标即可立即得到结果。",
      "zh-TW": "中點計算器可快速求出二維或三維線段的精確中點，輸入兩點座標即可立即得到結果。",
      ja: "2次元または3次元の線分の正確な中点を求める中点計算機です。2点の座標を入力するとすぐに結果が表示されます。",
      ko: "2D 또는 3D 선분의 정확한 중점을 구하는 중점 계산기입니다. 두 점의 좌표를 입력하면 즉시 결과가 표시됩니다.",
      es: "Calcula el punto medio exacto de un segmento en 2D o 3D. Ingresa dos coordenadas y obtén el resultado al instante.",
      fr: "Calculez le point milieu exact d’un segment en 2D ou 3D. Saisissez deux coordonnées pour obtenir le résultat instantanément.",
      de: "Berechnen Sie den exakten Mittelpunkt einer Strecke in 2D oder 3D. Zwei Koordinaten eingeben und sofort das Ergebnis erhalten.",
      pt: "Calcule o ponto médio exato de um segmento em 2D ou 3D. Digite duas coordenadas e veja o resultado na hora.",
      ru: "Калькулятор находит точную середину отрезка в 2D или 3D. Введите координаты двух точек и сразу получите результат."
    }
  },
  {
    id: "mixed-number-calculator",
    category: "math",
    slugs: {
      en: "mixed-number-calculator",
      "zh-CN": "dai-fen-shu-ji-suan-qi",
      "zh-TW": "dai-fen-shu-ji-suan-qi",
      ja: "tai-bunsu-keisanki",
      ko: "daebunsu-gyesangi",
      es: "calculadora-numeros-mixtos",
      fr: "calculatrice-nombres-mixtes",
      de: "gemischte-zahlen-rechner",
      pt: "calculadora-numeros-mistos",
      ru: "kalkulyator-smeshannyh-chisel"
    },
    titles: {
      en: "Mixed Number Calculator - Add, Subtract, Multiply, Divide",
      "zh-CN": "带分数计算器 - 加减乘除",
      "zh-TW": "帶分數計算器 - 加減乘除",
      ja: "帯分数計算機 - 足し算・引き算・掛け算・割り算",
      ko: "대분수 계산기 - 덧셈, 뺄셈, 곱셈, 나눗셈",
      es: "Calculadora de números mixtos - cuatro operaciones",
      fr: "Calculatrice de nombres mixtes - 4 opérations",
      de: "Gemischte-Zahlen-Rechner - vier Rechenarten",
      pt: "Calculadora de números mistos - quatro operações",
      ru: "Калькулятор смешанных чисел - 4 действия"
    },
    descriptions: {
      en: "Mixed number calculator performs addition, subtraction, multiplication, and division on mixed fractions. Get simplified results with step-by-step working.",
      "zh-CN": "带分数计算器可对带分数进行加、减、乘、除运算，并给出化简结果和分步计算过程。",
      "zh-TW": "帶分數計算器可對帶分數進行加、減、乘、除運算，並提供化簡結果與逐步計算過程。",
      ja: "帯分数計算機で帯分数の加算、減算、乗算、除算を実行。簡約結果と途中式を確認できます。",
      ko: "대분수 계산기로 대분수의 덧셈, 뺄셈, 곱셈, 나눗셈을 계산하고, 약분된 결과와 풀이 과정을 확인하세요.",
      es: "Calcula suma, resta, multiplicación y división de fracciones mixtas. Obtén resultados simplificados con pasos detallados.",
      fr: "Calculez additions, soustractions, multiplications et divisions de fractions mixtes avec résultats simplifiés et étapes détaillées.",
      de: "Rechnen Sie mit gemischten Zahlen: Addition, Subtraktion, Multiplikation und Division mit gekürztem Ergebnis und Rechenschritten.",
      pt: "Calcule soma, subtração, multiplicação e divisão de frações mistas com resultados simplificados e passo a passo.",
      ru: "Калькулятор смешанных чисел выполняет сложение, вычитание, умножение и деление с упрощённым результатом и пошаговым решением."
    }
  },
  {
    id: "mixed-number-to-improper-fraction-calculator",
    category: "math",
    slugs: {
      en: "mixed-number-to-improper-fraction-calculator",
      "zh-CN": "dai-fen-shu-zhuan-jia-fen-shu-ji-suan-qi",
      "zh-TW": "dai-fen-shu-zhuan-jia-fen-shu-ji-suan-qi",
      ja: "taibunsu-kaseibunsu-keisanki",
      ko: "daebunsu-gabunsu-gyesangi",
      es: "calculadora-numero-mixto-fraccion-impropia",
      fr: "calculatrice-nombre-mixte-fraction-impropre",
      de: "gemischte-zahl-unechter-bruch-rechner",
      pt: "calculadora-numero-misto-fracao-impropria",
      ru: "kalkulyator-smeshannoe-chislo-nepravilnaya-drob"
    },
    titles: {
      en: "Mixed Number to Improper Fraction Calculator",
      "zh-CN": "带分数转假分数计算器",
      "zh-TW": "帶分數轉假分數計算器",
      ja: "帯分数を仮分数に変換する計算機",
      ko: "대분수를 가분수로 바꾸는 계산기",
      es: "Calculadora de número mixto a fracción impropia",
      fr: "Calculatrice nombre mixte en fraction impropre",
      de: "Gemischte Zahl in unechten Bruch Rechner",
      pt: "Calculadora de número misto para fração imprópria",
      ru: "Калькулятор смешанного числа в неправильную дробь"
    },
    descriptions: {
      en: "Convert any mixed number to an improper fraction instantly with step-by-step solutions. Enter the whole number, numerator, and denominator for the answer.",
      "zh-CN": "立即将任意带分数转换为假分数，并提供分步解答。输入整数、分子和分母即可得到答案。",
      "zh-TW": "立即將任意帶分數轉換為假分數，並提供分步解答。輸入整數、分子和分母即可得到答案。",
      ja: "任意の帯分数をすぐに仮分数へ変換し、手順付きで解説します。整数、分子、分母を入力するだけで答えが得られます。",
      ko: "어떤 대분수든 즉시 가분수로 변환하고 단계별 풀이를 확인하세요. 정수, 분자, 분모를 입력하면 답을 제공합니다.",
      es: "Convierte cualquier número mixto en fracción impropia al instante con soluciones paso a paso. Ingresa entero, numerador y denominador.",
      fr: "Convertissez instantanément tout nombre mixte en fraction impropre avec les étapes détaillées. Saisissez entier, numérateur et dénominateur.",
      de: "Wandle jede gemischte Zahl sofort in einen unechten Bruch um, mit Schritt-für-Schritt-Lösung. Gib Ganzzahl, Zähler und Nenner ein.",
      pt: "Converta qualquer número misto em fração imprópria instantaneamente com passos detalhados. Informe inteiro, numerador e denominador.",
      ru: "Мгновенно переводите смешанные числа в неправильные дроби с пошаговым решением. Введите целую часть, числитель и знаменатель."
    }
  },
  {
    id: "parallel-line-calculator",
    category: "math",
    slugs: {
      en: "parallel-line-calculator",
      "zh-CN": "pingxingxian-jisuanqi",
      "zh-TW": "pingxingxian-jisuanqi",
      ja: "heikou-sen-keisanki",
      ko: "byeonghaeng-seon-gyesangi",
      es: "calculadora-linea-paralela",
      fr: "calculatrice-droite-parallele",
      de: "parallele-gerade-rechner",
      pt: "calculadora-reta-paralela",
      ru: "kalkulyator-parallelnoy-pryamoy"
    },
    titles: {
      en: "Parallel Line Calculator - Find Equation of a Parallel Line",
      "zh-CN": "平行线计算器：求平行线方程",
      "zh-TW": "平行線計算器：求平行線方程",
      ja: "平行線計算機：平行線の式を求める",
      ko: "평행선 계산기: 평행선 방정식 구하기",
      es: "Calculadora de recta paralela: ecuación",
      fr: "Calculateur de droite parallèle : équation",
      de: "Rechner für Parallele Geraden: Gleichung",
      pt: "Calculadora de reta paralela: equação",
      ru: "Калькулятор параллельной прямой: уравнение"
    },
    descriptions: {
      en: "Find the equation of a line parallel to any given line through a specified point. Supports slope-intercept, two-point, and standard form — instant results.",
      "zh-CN": "输入已知直线和指定点，立即求出平行线方程。支持斜截式、两点式和一般式。",
      "zh-TW": "輸入已知直線與指定點，立即求出平行線方程。支援斜截式、兩點式與一般式。",
      ja: "既知の直線と指定点を入力して、平行な直線の式を即座に計算。傾き切片形、2点式、標準形に対応。",
      ko: "기준 직선과 지정한 점을 입력해 평행선 방정식을 즉시 계산하세요. 기울기-절편형, 두 점식, 일반형을 지원합니다.",
      es: "Ingresa una recta y un punto para obtener al instante la ecuación de una paralela. Admite forma pendiente-intersección, dos puntos y general.",
      fr: "Saisissez une droite et un point pour obtenir instantanément l’équation d’une parallèle. Prend en charge la forme pente‑ordonnée, deux points et la forme générale.",
      de: "Gib eine Gerade und einen Punkt ein, um sofort die Gleichung einer parallelen Geraden zu erhalten. Unterstützt Steigungsform, Zwei-Punkte-Form und Normalform.",
      pt: "Digite uma reta e um ponto para obter instantaneamente a equação de uma paralela. Suporta forma inclinação-intercepto, dois pontos e forma geral.",
      ru: "Введите прямую и точку, чтобы мгновенно получить уравнение параллельной прямой. Поддерживаются вид y = mx + b, две точки и общая форма."
    }
  },
  {
    id: "partial-fraction-decomposition-calculator",
    category: "math",
    slugs: {
      en: "partial-fraction-decomposition-calculator",
      "zh-CN": "bufen-fenshu-fenjie-jisuanqi",
      "zh-TW": "bufen-fenshu-fenjie-jisuanqi",
      ja: "bubun-bunsu-bunkai-keisanki",
      ko: "bubun-bunso-bunhae-gyesangi",
      es: "descomposicion-fracciones-parciales",
      fr: "decomposition-fractions-partielles",
      de: "partialbruchzerlegung",
      pt: "decomposicao-fracoes-parciais",
      ru: "razlozhenie-na-prostye-drobi"
    },
    titles: {
      en: "Partial Fraction Decomposition Calculator",
      "zh-CN": "部分分式分解计算器",
      "zh-TW": "部分分式分解計算器",
      ja: "部分分数分解計算機",
      ko: "부분 분수 분해 계산기",
      es: "Calculadora de descomposición en fracciones parciales",
      fr: "Calculateur de décomposition en fractions partielles",
      de: "Partialbruchzerlegung Rechner",
      pt: "Calculadora de frações parciais",
      ru: "Калькулятор разложения на простые дроби"
    },
    descriptions: {
      en: "Partial fraction decomposition calculator — break rational expressions into simpler fractions. Enter polynomials to get the full expansion instantly.",
      "zh-CN": "部分分式分解计算器——将有理式拆成更简单的分式。输入多项式，立即得到完整分解。",
      "zh-TW": "部分分式分解計算器——將有理式拆成更簡單的分式。輸入多項式，立即得到完整分解。",
      ja: "部分分数分解計算機 — 有理式をより簡単な分数に分解。多項式を入力すると、完全な展開をすぐに表示します。",
      ko: "부분 분수 분해 계산기 — 유리식을 더 단순한 분수로 분해합니다. 다항식을 입력하면 전체 전개를 즉시 확인하세요.",
      es: "Calculadora de descomposición en fracciones parciales: descompone expresiones racionales en fracciones más simples. Ingresa polinomios y obtén la expansión al instante.",
      fr: "Calculateur de décomposition en fractions partielles — décompose les expressions rationnelles en fractions plus simples. Saisissez des polynômes et obtenez l’expansion instantanément.",
      de: "Partialbruchzerlegung Rechner — zerlegt rationale Ausdrücke in einfachere Brüche. Polynome eingeben und die vollständige Zerlegung sofort erhalten.",
      pt: "Calculadora de frações parciais — decompõe expressões racionais em frações mais simples. Insira polinômios e veja a expansão completa na hora.",
      ru: "Калькулятор разложения на простые дроби — разложите рациональные выражения на более простые дроби. Введите многочлены и мгновенно получите полное разложение."
    }
  },
  {
    id: "partial-products-calculator",
    category: "math",
    slugs: {
      en: "partial-products-calculator",
      "zh-CN": "bufen-ji-calculator",
      "zh-TW": "bufen-ji-calculator",
      ja: "bubunseki-keisanki",
      ko: "bubun-gop-calculator",
      es: "calculadora-productos-parciales",
      fr: "calculatrice-produits-partiels",
      de: "teilprodukte-rechner",
      pt: "calculadora-produtos-parciais",
      ru: "kalkulyator-chastichnykh-proizvedeniy"
    },
    titles: {
      en: "Partial Products Calculator - Step-by-Step Multiplication",
      "zh-CN": "部分积计算器 - 分步乘法",
      "zh-TW": "部分積計算器 - 分步乘法",
      ja: "部分積計算機 - 手順付きの掛け算",
      ko: "부분곱 계산기 - 단계별 곱셈",
      es: "Calculadora de productos parciales",
      fr: "Calculatrice de produits partiels",
      de: "Teilprodukte-Rechner für schriftliche Multiplikation",
      pt: "Calculadora de produtos parciais",
      ru: "Калькулятор частичных произведений"
    },
    descriptions: {
      en: "Partial products calculator breaks multiplication into place value steps. Great for learning multi-digit arithmetic visually with instant results.",
      "zh-CN": "部分积计算器按位值拆解乘法步骤。适合直观学习多位数运算，并即时获得结果。",
      "zh-TW": "部分積計算器依位值拆解乘法步驟。適合直觀學習多位數運算，並立即取得結果。",
      ja: "部分積計算機は掛け算を位取りごとの手順に分解します。多桁計算を視覚的に学び、すぐに結果を確認できます。",
      ko: "부분곱 계산기는 곱셈을 자릿값 단계로 나눕니다. 여러 자리 연산을 시각적으로 배우고 즉시 결과를 확인하세요.",
      es: "Descompone la multiplicación por valor posicional. Ideal para aprender aritmética de varias cifras visualmente con resultados instantáneos.",
      fr: "Décompose la multiplication par valeur de position. Idéal pour apprendre visuellement le calcul à plusieurs chiffres avec résultats instantanés.",
      de: "Zerlegt Multiplikationen in Stellenwert-Schritte. Ideal, um mehrstellige Arithmetik visuell zu lernen und sofort Ergebnisse zu sehen.",
      pt: "Decompõe multiplicações por valor posicional. Ideal para aprender aritmética com vários dígitos visualmente e ver resultados instantâneos.",
      ru: "Разбивает умножение на шаги по разрядам. Удобно для наглядного изучения многозначной арифметики с мгновенным результатом."
    }
  },
  {
    id: "pascals-triangle-calculator",
    category: "math",
    slugs: {
      en: "pascals-triangle-calculator",
      "zh-CN": "pa-si-ka-sanjiao-jisuanqi",
      "zh-TW": "pa-si-ka-sanjiao-jisuanqi",
      ja: "pasukaru-no-sankakkei-keisanki",
      ko: "paskeol-samgakgye-gyesangi",
      es: "calculadora-triangulo-pascal",
      fr: "calculatrice-triangle-pascal",
      de: "pascal-dreieck-rechner",
      pt: "calculadora-triangulo-pascal",
      ru: "kalkulyator-treugolnika-paskalya"
    },
    titles: {
      en: "Pascal's Triangle Calculator - Binomial Coefficients",
      "zh-CN": "帕斯卡三角形计算器：二项式系数",
      "zh-TW": "帕斯卡三角形計算器：二項式係數",
      ja: "パスカルの三角形計算機：二項係数",
      ko: "파스칼의 삼각형 계산기: 이항계수",
      es: "Triángulo de Pascal: coeficientes binomiales",
      fr: "Triangle de Pascal : coefficients binomiaux",
      de: "Pascal-Dreieck: Binomialkoeffizienten",
      pt: "Triângulo de Pascal: coeficientes binomiais",
      ru: "Треугольник Паскаля: биномиальные коэффициенты"
    },
    descriptions: {
      en: "Pascal's triangle calculator generates rows of binomial coefficients. Choose row count, specific row, and display format to explore combinatorial patterns.",
      "zh-CN": "生成帕斯卡三角形的各行二项式系数，可选择行数、指定行和显示格式，快速查看组合规律。",
      "zh-TW": "產生帕斯卡三角形的各行二項式係數，可選擇行數、指定行與顯示格式，快速查看組合規律。",
      ja: "パスカルの三角形の各行の二項係数を生成し、行数・特定の行・表示形式を選んで組合せの規則を調べられます。",
      ko: "파스칼의 삼각형 각 행의 이항계수를 생성하고 행 수, 특정 행, 표시 형식을 선택해 조합 패턴을 살펴보세요.",
      es: "Genera filas del triángulo de Pascal, calcula coeficientes binomiales y explora patrones combinatorios con filas y formato personalizables.",
      fr: "Générez les lignes du triangle de Pascal, calculez des coefficients binomiaux et explorez des motifs combinatoires avec des lignes et un format au choix.",
      de: "Erzeuge Pascal-Dreieck-Zeilen, berechne Binomialkoeffizienten und erkunde kombinatorische Muster mit frei wählbarer Zeilenanzahl und Anzeigeform.",
      pt: "Gere linhas do triângulo de Pascal, calcule coeficientes binomiais e explore padrões combinatórios com linhas e formato personalizáveis.",
      ru: "Генерируйте строки треугольника Паскаля, вычисляйте биномиальные коэффициенты и исследуйте комбинаторные закономерности с настраиваемыми строками и форматом."
    }
  },
  {
    id: "pentagon-calculator",
    category: "math",
    slugs: {
      en: "pentagon-calculator",
      "zh-CN": "wubianxing-jisuanqi",
      "zh-TW": "wubianxing-jisuanqi",
      ja: "seigokakkei-keisanki",
      ko: "ojeonghyeong-gyesangi",
      es: "calculadora-pentagono",
      fr: "calculateur-pentagone",
      de: "fuenfeck-rechner",
      pt: "calculadora-pentagono",
      ru: "kalkulyator-pyatiugolnika"
    },
    titles: {
      en: "Pentagon Calculator - Area, Perimeter & Apothem",
      "zh-CN": "五边形计算器 - 面积、周长和边心距",
      "zh-TW": "五邊形計算器 - 面積、周長與邊心距",
      ja: "正五角形計算機 - 面積・周長・辺心距離",
      ko: "정오각형 계산기 - 넓이, 둘레, 변심거리",
      es: "Calculadora de pentágono - Área, perímetro y apotema",
      fr: "Calculateur de pentagone - Aire, périmètre et apothème",
      de: "Fünfeck-Rechner - Fläche, Umfang und Apothem",
      pt: "Calculadora de pentágono - Área, perímetro e apótema",
      ru: "Калькулятор пятиугольника - площадь, периметр и апофема"
    },
    descriptions: {
      en: "Pentagon calculator finds area, perimeter, apothem, and diagonal from any one known value — side, apothem, area, or perimeter. Instant results.",
      "zh-CN": "五边形计算器可根据边长、边心距、面积、周长或对角线任一已知值，快速求出面积、周长、边心距和对角线。",
      "zh-TW": "五邊形計算器可由邊長、邊心距、面積、周長或對角線任一已知值，快速求出面積、周長、邊心距與對角線。",
      ja: "辺、辺心距離、面積、周長、対角線のいずれか1つから、正五角形の面積・周長・辺心距離・対角線を即座に計算します。",
      ko: "변, 변심거리, 넓이, 둘레, 대각선 중 하나만 알면 정오각형의 넓이, 둘레, 변심거리와 대각선을 즉시 계산합니다.",
      es: "Calcula área, perímetro, apotema y diagonal de un pentágono regular desde un valor conocido: lado, apotema, área, perímetro o diagonal.",
      fr: "Calculez l’aire, le périmètre, l’apothème et la diagonale d’un pentagone régulier depuis un côté, une aire, un périmètre ou une diagonale.",
      de: "Berechnet Fläche, Umfang, Apothem und Diagonale eines regelmäßigen Fünfecks aus Seite, Apothem, Fläche, Umfang oder Diagonale.",
      pt: "Calcule área, perímetro, apótema e diagonal de um pentágono regular a partir de lado, apótema, área, perímetro ou diagonal.",
      ru: "Рассчитайте площадь, периметр, апофему и диагональ правильного пятиугольника по стороне, апофеме, площади, периметру или диагонали."
    }
  },
  {
    id: "matrix-addition-and-subtraction-calculator",
    category: "math",
    slugs: {
      en: "matrix-addition-and-subtraction-calculator",
      "zh-CN": "juzhen-jiafa-jianfa-jisuanqi",
      "zh-TW": "juzhen-jiafa-jianfa-jisuanqi",
      ja: "gyoretsu-kasan-genzan-keisan",
      ko: "haengnyeol-gabsan-gamjeon-gyesangi",
      es: "calculadora-suma-resta-matrices",
      fr: "calculatrice-addition-soustraction-matrices",
      de: "matrix-addition-subtraktion-rechner",
      pt: "calculadora-adicao-subtracao-matrizes",
      ru: "kalkulyator-slozheniya-vychitaniya-matrits"
    },
    titles: {
      en: "Matrix Addition and Subtraction Calculator",
      "zh-CN": "矩阵加减计算器",
      "zh-TW": "矩陣加減計算器",
      ja: "行列の加減算計算機",
      ko: "행렬 덧셈 뺄셈 계산기",
      es: "Calculadora de suma y resta de matrices",
      fr: "Calculatrice d’addition et de soustraction de matrices",
      de: "Matrix-Additions- und Subtraktionsrechner",
      pt: "Calculadora de adição e subtração de matrizes",
      ru: "Калькулятор сложения и вычитания матриц"
    },
    descriptions: {
      en: "Add or subtract two matrices instantly with this free online calculator. Compute element-wise sums and differences for linear algebra.",
      "zh-CN": "使用这款免费在线计算器即时对两个矩阵进行加法或减法，轻松求出线性代数中的逐元素和与差。",
      "zh-TW": "使用這款免費線上計算器即時對兩個矩陣進行加法或減法，快速求出線性代數中的逐元素和與差。",
      ja: "2つの行列を即座に加算・減算できる無料のオンライン計算機。線形代数の要素ごとの和差を求めます。",
      ko: "두 행렬을 즉시 더하거나 뺄 수 있는 무료 온라인 계산기입니다. 선형대수의 원소별 합과 차를 계산합니다.",
      es: "Suma o resta dos matrices al instante con esta calculadora online gratuita. Calcula sumas y diferencias elemento a elemento para álgebra lineal.",
      fr: "Additionnez ou soustrayez instantanément deux matrices avec cette calculatrice en ligne gratuite. Calculez les sommes et différences élément par élément.",
      de: "Addiere oder subtrahiere zwei Matrizen sofort mit diesem kostenlosen Online-Rechner. Berechne elementweise Summen und Differenzen für Lineare Algebra.",
      pt: "Some ou subtraia duas matrizes instantaneamente com esta calculadora online gratuita. Calcule somas e diferenças elemento a elemento.",
      ru: "Складывайте или вычитайте две матрицы мгновенно с помощью этого бесплатного онлайн-калькулятора. Считайте поэлементные суммы и разности для линейной алгебры."
    }
  },
  {
    id: "matrix-by-scalar-calculator",
    category: "math",
    slugs: {
      en: "matrix-by-scalar-calculator",
      "zh-CN": "juzhen-shuliang-chengfa-jisuanqi",
      "zh-TW": "juzhen-shuliang-chengfa-jisuanqi",
      ja: "gyoretsu-sukara-baikeisan",
      ko: "haengnyeol-seukala-gopseum-gye-san-gi",
      es: "calculadora-multiplicacion-escalar-matrices",
      fr: "calculatrice-multiplication-scalaire-matrices",
      de: "matrix-skalarmultiplikation-rechner",
      pt: "calculadora-multiplicacao-escalar-matrizes",
      ru: "skaljarnoe-umnozhenie-matric-kalkulyator"
    },
    titles: {
      en: "Matrix Scalar Multiplication Calculator",
      "zh-CN": "矩阵数乘计算器",
      "zh-TW": "矩陣數乘計算器",
      ja: "行列のスカラー倍計算機",
      ko: "행렬 스칼라 곱셈 계산기",
      es: "Calculadora de multiplicación escalar de matrices",
      fr: "Calculatrice de multiplication scalaire de matrices",
      de: "Matrizen-Skalarmultiplikation Rechner",
      pt: "Calculadora de multiplicação escalar de matrizes",
      ru: "Скалярное умножение матриц"
    },
    descriptions: {
      en: "Multiply any matrix by a scalar value with this free online calculator. Scale every element uniformly for linear algebra and machine learning applications.",
      "zh-CN": "输入任意矩阵和标量，一键计算每个元素的数乘结果。适用于线性代数、物理和机器学习。",
      "zh-TW": "輸入任意矩陣與純量，一鍵算出每個元素的數乘結果。適用於線性代數、物理與資料科學。",
      ja: "任意の行列をスカラー値で掛け、各要素を一様に拡大・縮小する無料計算機。線形代数や機械学習に便利です。",
      ko: "임의의 행렬에 스칼라 값을 곱해 각 원소를 균일하게 조정하는 무료 계산기입니다. 선형대수와 머신러닝에 유용합니다.",
      es: "Multiplica cualquier matriz por un valor escalar al instante. Escala cada elemento de forma uniforme para álgebra lineal y ciencia de datos.",
      fr: "Multipliez instantanément n’importe quelle matrice par un scalaire. Chaque élément est mis à l’échelle pour l’algèbre linéaire et la science des données.",
      de: "Multiplizieren Sie jede Matrix sofort mit einem Skalar. Alle Elemente werden gleichmäßig skaliert – ideal für lineare Algebra und Data Science.",
      pt: "Multiplique qualquer matriz por um valor escalar na hora. Escale cada elemento uniformemente para álgebra linear e ciência de dados.",
      ru: "Мгновенно умножайте любую матрицу на скаляр. Каждый элемент масштабируется одинаково — для линейной алгебры и машинного обучения."
    }
  },
  {
    id: "matrix-calculator",
    category: "math",
    slugs: {
      en: "matrix-calculator",
      "zh-CN": "juzhen-jisuanqi",
      "zh-TW": "juzhen-jisuanqi",
      ja: "gyoretsu-keisanki",
      ko: "hangryeol-gyesangi",
      es: "calculadora-matrices",
      fr: "calculatrice-matrices",
      de: "matrix-rechner",
      pt: "calculadora-matrizes",
      ru: "matrits-kalkulyator"
    },
    titles: {
      en: "Matrix Calculator - Add, Multiply, Transpose, Determinant",
      "zh-CN": "矩阵计算器",
      "zh-TW": "矩陣計算器",
      ja: "行列計算機",
      ko: "행렬 계산기",
      es: "Calculadora de matrices",
      fr: "Calculatrice de matrices",
      de: "Matrix-Rechner",
      pt: "Calculadora de matrizes",
      ru: "Калькулятор матриц"
    },
    descriptions: {
      en: "Perform matrix addition, subtraction, multiplication, transpose, and determinant in one free online tool. Supports any matrix size for linear algebra problems.",
      "zh-CN": "免费在线矩阵计算器，可进行加法、减法、乘法、转置和行列式运算，支持任意大小的线性代数问题。",
      "zh-TW": "免費線上矩陣計算器，可進行加法、減法、乘法、轉置和行列式運算，支援任意大小的線性代數問題。",
      ja: "無料で使えるオンライン行列計算機。加算、減算、乗算、転置、行列式を任意のサイズで計算できます。",
      ko: "무료 온라인 행렬 계산기입니다. 덧셈, 뺄셈, 곱셈, 전치, 행렬식을 어떤 크기의 행렬이든 계산할 수 있습니다.",
      es: "Calcula suma, resta, multiplicación, transpuesta y determinante de matrices en una herramienta gratuita en línea para álgebra lineal.",
      fr: "Calculez l’addition, la soustraction, la multiplication, la transposition et le déterminant de matrices dans un outil en ligne gratuit.",
      de: "Berechnen Sie Matrizenaddition, -subtraktion, -multiplikation, -transposition und Determinante kostenlos online.",
      pt: "Calcule soma, subtração, multiplicação, transposição e determinante de matrizes em uma ferramenta online gratuita de álgebra linear.",
      ru: "Бесплатный онлайн-калькулятор матриц: сложение, вычитание, умножение, транспонирование и определитель для любых размеров."
    }
  },
  {
    id: "matrix-determinant-calculator",
    category: "math",
    slugs: {
      en: "matrix-determinant-calculator",
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
      en: "Matrix Determinant Calculator - Any Square Matrix",
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
      en: "Calculate the determinant of any square matrix online for free. Supports 2×2, 3×3, 4×4, and larger matrices with instant results for linear algebra.",
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
    id: "matrix-multiplication-calculator",
    category: "math",
    slugs: {
      en: "matrix-multiplication-calculator",
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
      en: "Matrix Multiplication Calculator",
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
      en: "Multiply two matrices of compatible dimensions with this free online calculator. Get the product matrix instantly with automatic dimension validation.",
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
    id: "log-calculator",
    category: "math",
    slugs: {
      en: "log-calculator",
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
      en: "Log Calculator - Base 10, e, 2, and Custom Logs",
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
      en: "Log calculator for common, natural, binary, and custom-base logarithms. Get instant results and clear examples for any positive input.",
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
    id: "long-addition-calculator",
    category: "math",
    slugs: {
      en: "long-addition-calculator",
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
      en: "Long Addition Calculator - Column Addition Steps",
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
      en: "Long addition calculator for adding whole numbers with carries, aligned columns, and step-by-step explanations you can follow at a glance.",
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
    id: "long-division-calculator",
    category: "math",
    slugs: {
      en: "long-division-calculator",
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
      en: "Long Division Calculator - Quotient, Remainder, Steps",
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
      en: "Long division calculator for whole numbers with quotient, remainder, decimal output, and step-by-step division reasoning for each stage.",
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
    id: "long-multiplication-calculator",
    category: "math",
    slugs: {
      en: "long-multiplication-calculator",
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
      en: "Long Multiplication Calculator - Partial Products",
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
      en: "Long multiplication calculator with partial products, place-value shifts, and step-by-step working for multiplying whole numbers clearly.",
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
    id: "long-subtraction-calculator",
    category: "math",
    slugs: {
      en: "long-subtraction-calculator",
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
      en: "Long Subtraction Calculator - Borrowing Steps",
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
      en: "Long subtraction calculator with borrowing, regrouping, aligned columns, and step-by-step explanations for whole-number subtraction.",
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
    id: "lcd-calculator",
    category: "math",
    slugs: {
      en: "lcd-calculator",
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
      en: "LCD Calculator - Least Common Denominator",
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
      en: "LCD calculator finds the Least Common Denominator of any set of integers instantly. Essential for adding and subtracting fractions with unlike denominators.",
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
    id: "lcm-calculator-least-common-multiple",
    category: "math",
    slugs: {
      en: "lcm-calculator-least-common-multiple",
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
      en: "LCM Calculator - Least Common Multiple",
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
      en: "LCM calculator finds the Least Common Multiple of two or more integers using GCF and prime factorization. Essential for fraction arithmetic and scheduling.",
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
    id: "least-squares-regression-line-calculator",
    category: "math",
    slugs: {
      en: "least-squares-regression-line-calculator",
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
      en: "Least Squares Regression Line Calculator",
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
      en: "Least squares regression line calculator finds the best-fit line, slope, y-intercept, and correlation coefficient for any paired dataset instantly.",
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
    id: "lfsr-calculator",
    category: "math",
    slugs: {
      en: "lfsr-calculator",
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
      en: "LFSR Calculator - Linear Feedback Shift Register",
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
      en: "LFSR calculator generates pseudo-random binary sequences using Fibonacci or Galois Linear Feedback Shift Registers with custom seed, taps, and iterations.",
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
    id: "line-equation-from-two-points-calculator",
    category: "math",
    slugs: {
      en: "line-equation-from-two-points-calculator",
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
      en: "Line Equation from Two Points Calculator",
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
      en: "Line equation calculator finds slope, y-intercept, and line equation in slope-intercept, point-slope, and standard form from any two coordinate points.",
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
    id: "lagrange-error-bound-calculator",
    category: "math",
    slugs: {
      en: "lagrange-error-bound-calculator",
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
      en: "Lagrange Error Bound Calculator - Taylor Polynomial Error",
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
      en: "Calculate the Lagrange error bound for Taylor polynomial approximations. Instantly find the maximum truncation error with M, n, a, and x.",
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
    id: "lateral-area-trapezoidal-prism-calculator",
    category: "math",
    slugs: {
      en: "lateral-area-trapezoidal-prism-calculator",
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
      en: "Lateral Area of Trapezoidal Prism Calculator",
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
      en: "Calculate the lateral surface area of a trapezoidal prism. Enter bases, non-parallel sides, and prism height for instant results with formula.",
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
    id: "latus-rectum-calculator",
    category: "math",
    slugs: {
      en: "latus-rectum-calculator",
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
      en: "Latus Rectum Calculator - Parabola, Ellipse, Hyperbola",
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
      en: "Find the latus rectum length for any conic section. Supports parabola (4p), ellipse, and hyperbola (2b²/a) with instant formula results.",
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
    id: "law-of-cosines-calculator",
    category: "math",
    slugs: {
      en: "law-of-cosines-calculator",
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
      en: "Law of Cosines Calculator - Solve Any Triangle (SAS/SSS)",
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
      en: "Solve any triangle using the law of cosines. Find a missing side (SAS) or a missing angle (SSS) instantly with formula verification.",
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
    id: "law-of-sines-calculator",
    category: "math",
    slugs: {
      en: "law-of-sines-calculator",
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
      en: "Law of Sines Calculator - Solve Triangles (AAS, ASA, SSA)",
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
      en: "Solve triangles with the law of sines for AAS, ASA, and SSA cases. Handles the ambiguous SSA case automatically. Get all sides and angles.",
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
    id: "gram-schmidt-calculator",
    category: "math",
    slugs: {
      en: "gram-schmidt-calculator",
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
      en: "Gram-Schmidt Orthogonalization Calculator",
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
      en: "Gram-Schmidt calculator converts linearly independent vectors into an orthogonal and orthonormal basis. Handles any dimension and dependent vectors.",
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
    id: "graphing-inequalities-on-a-number-line-calculator",
    category: "math",
    slugs: {
      en: "graphing-inequalities-on-a-number-line-calculator",
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
      en: "Graphing Inequalities on a Number Line Calculator",
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
      en: "Number line inequality calculator that graphs simple and compound inequalities with open/closed circles, shading direction, and interval notation instantly.",
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
    id: "graphing-quadratic-inequalities-calculator",
    category: "math",
    slugs: {
      en: "graphing-quadratic-inequalities-calculator",
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
      en: "Graphing Quadratic Inequalities Calculator",
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
      en: "Quadratic inequalities calculator: enter a, b, c and sign to get roots, discriminant, vertex, parabola direction, and solution set in interval notation.",
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
    id: "great-circle-calculator",
    category: "math",
    slugs: {
      en: "great-circle-calculator",
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
      en: "Great Circle Calculator - Shortest Earth Distance",
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
      en: "Great circle distance calculator using the Haversine formula. Enter two lat/lon coordinates to get surface distance in km, miles, or nautical miles.",
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
    id: "greater-than-or-less-than-calculator",
    category: "math",
    slugs: {
      en: "greater-than-or-less-than-calculator",
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
      en: "Greater Than or Less Than Calculator",
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
      en: "Greater than or less than calculator to compare any two numbers — integers, decimals, or negatives — and instantly display the correct symbol >, <, or =.",
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
    id: "equation-of-a-circle-calculator",
    category: "math",
    slugs: {
      en: "equation-of-a-circle-calculator",
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
      en: "Equation of a Circle Calculator",
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
      en: "Generate circle equations in standard and general forms from center and radius. Calculate area and circumference instantly.",
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
    id: "equation-of-a-sphere-calculator",
    category: "math",
    slugs: {
      en: "equation-of-a-sphere-calculator",
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
      en: "Equation of a Sphere Calculator",
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
      en: "Generate 3D sphere equations in standard form from center coordinates and radius with correct sign handling and expanded form.",
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
    id: "equilateral-triangle-calculator",
    category: "math",
    slugs: {
      en: "equilateral-triangle-calculator",
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
      en: "Equilateral Triangle Calculator - Area, Perimeter & Height",
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
      en: "Calculate area, perimeter, height, inradius, and circumradius of any equilateral triangle from side length using exact formulas.",
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
    id: "equivalent-fractions-calculator",
    category: "math",
    slugs: {
      en: "equivalent-fractions-calculator",
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
      en: "Equivalent Fractions Calculator - Find Equal Fractions",
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
      en: "Find equivalent fractions, simplified form, and decimal value for any fraction. Supports target denominator for specific conversions.",
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
    id: "error-function-calculator",
    category: "math",
    slugs: {
      en: "error-function-calculator",
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
      en: "Error Function Calculator - Compute erf(x) & erfc(x)",
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
      en: "Calculate erf(x), erfc(x), and inverse error functions with high precision for statistics, physics, and engineering applications.",
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
    id: "hadamard-product-calculator",
    category: "math",
    slugs: {
      en: "hadamard-product-calculator",
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
      en: "Hadamard Product Calculator - Element-Wise Multiplication",
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
      en: "Hadamard product calculator multiplies two vectors element by element, validates matching lengths, and shows results instantly for algebra, data science, and ML",
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
    id: "half-angle-calculator",
    category: "math",
    slugs: {
      en: "half-angle-calculator",
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
      en: "Half-Angle Calculator",
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
      en: "Half-angle calculator finds sin(θ/2), cos(θ/2), and tan(θ/2) from any angle in degrees or radians with automatic or manual quadrant signs.",
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
    id: "harmonic-mean-calculator",
    category: "math",
    slugs: {
      en: "harmonic-mean-calculator",
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
      en: "Harmonic Mean Calculator",
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
      en: "Harmonic mean calculator computes the reciprocal-based average for positive sequences, showing the mean, count, and reciprocal sum for rates and ratios.",
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
    id: "harmonic-number-calculator",
    category: "math",
    slugs: {
      en: "harmonic-number-calculator",
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
      en: "Harmonic Number Calculator",
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
      en: "Harmonic number calculator sums H_n term by term, with optional series breakdown and logarithmic approximation for analysis, number theory, and bounds.",
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
    id: "herons-formula-calculator",
    category: "math",
    slugs: {
      en: "herons-formula-calculator",
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
      en: "Heron's Formula Calculator",
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
      en: "Heron's formula calculator finds triangle area from three side lengths, checks triangle validity, and returns area, perimeter, and semi-perimeter.",
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
    id: "distributive-property-calculator",
    category: "math",
    slugs: {
      en: "distributive-property-calculator",
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
      en: "Distributive Property Calculator - Expand Expressions",
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
      en: "Expand algebraic expressions using the distributive property a(b+c)=ab+ac. Enter coefficient and terms to get instant step-by-step expansion results.",
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
    id: "dividing-exponents-calculator",
    category: "math",
    slugs: {
      en: "dividing-exponents-calculator",
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
      en: "Dividing Exponents Calculator - Quotient Rule a^m÷a^n",
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
      en: "Apply the quotient rule to divide exponential expressions. Enter bases and exponents to get a^m÷a^n=a^(m-n) with step-by-step solutions and numeric results.",
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
    id: "dividing-fractions-calculator",
    category: "math",
    slugs: {
      en: "dividing-fractions-calculator",
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
      en: "Dividing Fractions Calculator - Step-by-Step Solutions",
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
      en: "Divide fractions step by step using the keep-change-flip method. Enter two fractions to get simplified results with decimal equivalents and worked solutions.",
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
    id: "dividing-radicals-calculator",
    category: "math",
    slugs: {
      en: "dividing-radicals-calculator",
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
      en: "Dividing Radicals Calculator - ⁿ√a ÷ ⁿ√b Quotient Property",
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
      en: "Divide radical expressions using the quotient property ⁿ√a÷ⁿ√b=ⁿ√(a÷b). Supports square roots, cube roots, and nth roots with simplified step-by-step results.",
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
    id: "divisibility-test-calculator",
    category: "math",
    slugs: {
      en: "divisibility-test-calculator",
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
      en: "Divisibility Test Calculator - Check Divisibility Rules",
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
      en: "Test any integer for divisibility by 2–12 or custom divisors. Get instant results with remainders and built-in divisibility rules for every number.",
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
    id: "dot-product-calculator",
    category: "math",
    slugs: {
      en: "dot-product-calculator",
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
      en: "Dot Product Calculator - 2D & 3D Vector Dot Product",
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
      en: "Dot product calculator for 2D and 3D vectors. Computes scalar product, angle between vectors, and magnitudes — essential for linear algebra and physics.",
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
    id: "double-angle-formula-calculator",
    category: "math",
    slugs: {
      en: "double-angle-formula-calculator",
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
      en: "Double Angle Formula Calculator - sin cos tan 2x",
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
      en: "Double angle formula calculator for sin(2x), cos(2x), and tan(2x) in degrees or radians. Instant trig identity results for students and engineers.",
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
    id: "doubling-time-calculator",
    category: "math",
    slugs: {
      en: "doubling-time-calculator",
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
      en: "Doubling Time Calculator - Investment & Population Growth",
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
      en: "Doubling time calculator using exact logarithm formula and Rule of 72. Find how long investments, populations, or any growth rate takes to double.",
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
    id: "e-calculator",
    category: "math",
    slugs: {
      en: "e-calculator",
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
      en: "e Calculator - Euler's Number, e^x & ln(x)",
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
      en: "e calculator for Euler's number, e^x exponential functions, and natural logarithms ln(x). Get precise results with Taylor series and step-by-step solutions.",
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
    id: "egyptian-fractions-calculator",
    category: "math",
    slugs: {
      en: "egyptian-fractions-calculator",
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
      en: "Egyptian Fractions Calculator - Unit Fraction Decomposition",
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
      en: "Egyptian fractions calculator converts any fraction into a sum of distinct unit fractions using the greedy algorithm — with step-by-step greedy decomposition.",
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
    id: "direct-variation-calculator",
    category: "math",
    slugs: {
      en: "direct-variation-calculator",
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
      en: "Direct Variation Calculator - Solve y = kx Problems",
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
      en: "Calculate the constant of variation k, find unknown x or y values in direct variation equations y = kx, and explore proportional relationships.",
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
    id: "direction-of-the-vector-calculator",
    category: "math",
    slugs: {
      en: "direction-of-the-vector-calculator",
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
      en: "Direction of a Vector Calculator - Angles & Cosines",
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
      en: "Calculate direction angles, direction cosines, and unit vectors for 2D and 3D vectors. Find the angle a vector makes with each coordinate axis instantly.",
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
    id: "discriminant-calculator",
    category: "math",
    slugs: {
      en: "discriminant-calculator",
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
      en: "Discriminant Calculator - Quadratic Root Analysis",
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
      en: "Calculate the discriminant b² − 4ac of any quadratic equation ax² + bx + c = 0. Determine root nature — real, repeated, or complex — instantly.",
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
    id: "distance-formula-calculator",
    category: "math",
    slugs: {
      en: "distance-formula-calculator",
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
      en: "Distance Formula Calculator - 2D and 3D Distance",
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
      en: "Calculate Euclidean distance between two points in 2D or 3D space using the distance formula. Fast, accurate results with the formula shown.",
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
    id: "distance-from-point-to-plane-calculator",
    category: "math",
    slugs: {
      en: "distance-from-point-to-plane-calculator",
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
      en: "Distance from Point to Plane Calculator - 3D Geometry",
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
      en: "Calculate the perpendicular distance from a point to a plane in 3D space using the formula |ax₀+by₀+cz₀+d|/√(a²+b²+c²). Step-by-step results.",
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
    id: "decimal-to-percent-converter",
    category: "math",
    slugs: {
      en: "decimal-to-percent-converter",
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
      en: "Decimal to Percent Converter",
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
      en: "Convert any decimal to a percentage instantly by multiplying by 100. Handles positive, negative, and decimals greater than 1. Free online converter.",
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
    id: "descartes-rule-of-signs-calculator",
    category: "math",
    slugs: {
      en: "descartes-rule-of-signs-calculator",
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
      en: "Descartes Rule of Signs Calculator",
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
      en: "Apply Descartes' Rule of Signs to any polynomial: count coefficient sign changes to predict positive and negative real root counts instantly.",
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
    id: "diagonalize-matrix-calculator",
    category: "math",
    slugs: {
      en: "diagonalize-matrix-calculator",
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
      en: "Diagonalize Matrix Calculator",
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
      en: "Diagonalize 2×2 and 3×3 matrices online. Finds eigenvalues, eigenvectors, transformation matrix P, and diagonal matrix D with step-by-step output.",
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
    id: "diamond-problem-calculator",
    category: "math",
    slugs: {
      en: "diamond-problem-calculator",
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
      en: "Diamond Problem Calculator",
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
      en: "Diamond problem calculator finds two numbers from their sum and product. Essential for factoring quadratics and algebra practice with instant results.",
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
    id: "digit-sum-calculator",
    category: "math",
    slugs: {
      en: "digit-sum-calculator",
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
      en: "Digit Sum Calculator",
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
      en: "Calculate digit sum and digital root of any integer instantly. Useful for divisibility checks, number theory, and checksum verification. Free tool.",
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
    id: "cycloid-calculator",
    category: "math",
    slugs: {
      en: "cycloid-calculator",
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
      en: "Cycloid Calculator - Parametric Curve Properties",
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
      en: "Cycloid calculator computes x,y coordinates, one-arch arc length, and area under the curve from radius and parameter. Free parametric curve tool.",
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
    id: "cyclomatic-complexity-calculator",
    category: "math",
    slugs: {
      en: "cyclomatic-complexity-calculator",
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
      en: "Cyclomatic Complexity Calculator - McCabe Metric Tool",
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
      en: "Cyclomatic complexity calculator using McCabe's formula M = E − N + 2P or decision count. Measure code complexity and software quality instantly.",
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
    id: "cylindrical-coordinates-calculator",
    category: "math",
    slugs: {
      en: "cylindrical-coordinates-calculator",
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
      en: "Cylindrical Coordinates Calculator - 3D Conversion Tool",
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
      en: "Cylindrical coordinates calculator converts Cartesian (x,y,z) to cylindrical (ρ,φ,z) and back. Instant 3D coordinate transformation with formulas.",
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
    id: "decimal-calculator",
    category: "math",
    slugs: {
      en: "decimal-calculator",
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
      en: "Decimal Calculator - Add, Subtract, Multiply, Divide",
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
      en: "Decimal calculator performs precise addition, subtraction, multiplication, and division on decimal numbers. Get exact results with step-by-step formulas.",
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
    id: "decimal-to-fraction-calculator",
    category: "math",
    slugs: {
      en: "decimal-to-fraction-calculator",
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
      en: "Decimal to Fraction Calculator - Simplify Instantly",
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
      en: "Decimal to fraction calculator converts any decimal to its simplified fraction form using GCD. Handles terminating decimals and mixed numbers instantly.",
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
    id: "cosine-similarity-calculator",
    category: "math",
    slugs: {
      en: "cosine-similarity-calculator",
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
      en: "Cosine Similarity Calculator - Vector Similarity Analysis",
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
      en: "Cosine similarity calculator for vectors in machine learning, NLP, and data analysis. Compute similarity score, dot product, and magnitudes instantly.",
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
    id: "cotangent-calculator",
    category: "math",
    slugs: {
      en: "cotangent-calculator",
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
      en: "Cotangent Calculator - cot(x) Degrees Radians Gradians",
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
      en: "Cotangent calculator for angle and coordinate inputs in degrees, radians, or gradians. Get precise cot(x) values with the reciprocal tangent formula instantly.",
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
    id: "coterminal-angle-calculator",
    category: "math",
    slugs: {
      en: "coterminal-angle-calculator",
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
      en: "Coterminal Angle Calculator - Find Coterminal Angles",
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
      en: "Coterminal angle calculator for degrees, radians, and gradians. Find multiple positive and negative coterminals and the standard position angle in seconds.",
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
    id: "cramers-rule-calculator",
    category: "math",
    slugs: {
      en: "cramers-rule-calculator",
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
      en: "Cramer's Rule Calculator - Linear Systems & Determinants",
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
      en: "Cramer's Rule calculator for 2×2 and 3×3 linear systems. Solve using determinants with step-by-step results showing D, Dx, Dy, and Dz values instantly.",
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
    id: "cross-multiplication-calculator",
    category: "math",
    slugs: {
      en: "cross-multiplication-calculator",
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
      en: "Cross Multiplication Calculator - Solve Proportions & Ratios",
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
      en: "Cross multiplication calculator to solve proportions a/b = c/x for the unknown x. Perfect for recipe scaling, unit conversion, and ratio problems instantly.",
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
    id: "complex-root-calculator",
    category: "math",
    slugs: {
      en: "complex-root-calculator",
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
      en: "Complex Root Calculator - N-th Roots via De Moivre",
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
      en: "Calculate all n-th roots of any complex number with De Moivre's Theorem. Polar form, principal root, and every conjugate root in one click.",
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
    id: "condense-logarithms-calculator",
    category: "math",
    slugs: {
      en: "condense-logarithms-calculator",
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
      en: "Condense Logarithms Calculator - Combine Log Expressions",
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
      en: "Condense logarithm sums, differences, and scalar multiples into a single logarithm using product, quotient, and power rules. Supports any base.",
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
    id: "condition-number-calculator",
    category: "math",
    slugs: {
      en: "condition-number-calculator",
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
      en: "Condition Number Calculator - Matrix Stability",
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
      en: "Compute the condition number of 2x2 or 3x3 matrices in the 1-norm, infinity-norm, or Frobenius norm. Diagnose numerical stability instantly.",
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
    id: "conic-sections-calculator",
    category: "math",
    slugs: {
      en: "conic-sections-calculator",
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
      en: "Conic Sections Calculator - Identify Conics by Discriminant",
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
      en: "Identify circle, ellipse, parabola, or hyperbola from the general equation Ax^2+Bxy+Cy^2+Dx+Ey+F=0 using the discriminant. Step-by-step result.",
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
    id: "consecutive-integers-calculator",
    category: "math",
    slugs: {
      en: "consecutive-integers-calculator",
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
      en: "Consecutive Integers Calculator - Sequences and Sums",
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
      en: "Generate consecutive integer sequences, find a sequence with a target sum, or analyze a list. Returns sequence, sum, average, and count instantly.",
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
    id: "cholesky-decomposition-calculator",
    category: "math",
    slugs: {
      en: "cholesky-decomposition-calculator",
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
      en: "Cholesky Decomposition Calculator - Matrix Factorization",
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
      en: "Compute Cholesky decomposition A = LLᵀ for symmetric positive definite matrices. Supports 2×2, 3×3, 4×4 inputs for linear algebra and statistics.",
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
    id: "chord-length-calculator",
    category: "math",
    slugs: {
      en: "chord-length-calculator",
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
      en: "Chord Length Calculator - Chord, Radius & Central Angle",
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
      en: "Calculate chord length from radius and central angle, or find radius and angle with the formula c = 2r·sin(θ/2). Free online tool for circle geometry problems.",
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
    id: "circle-calculator",
    category: "math",
    slugs: {
      en: "circle-calculator",
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
      en: "Circle Calculator - Area, Circumference, Radius & Diameter",
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
      en: "Calculate circle area, circumference, radius, and diameter from any known measurement. Enter radius, diameter, circumference, or area to get all properties.",
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
    id: "circle-theorems-calculator",
    category: "math",
    slugs: {
      en: "circle-theorems-calculator",
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
      en: "Circle Theorems Calculator - Angle & Arc Problems",
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
      en: "Apply circle theorems to solve inscribed angle, central angle, cyclic quadrilateral, and tangent-chord problems. Includes theorem explanations with results.",
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
    id: "circumference-calculator",
    category: "math",
    slugs: {
      en: "circumference-calculator",
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
      en: "Circumference Calculator - Radius or Diameter to Perimeter",
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
      en: "Calculate circle circumference from radius or diameter using C = 2πr and C = πd. Free online circumference calculator with instant results.",
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
    id: "cofunction-calculator",
    category: "math",
    slugs: {
      en: "cofunction-calculator",
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
      en: "Cofunction Calculator - Trigonometric Cofunction Identities",
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
      en: "Cofunction calculator finds sin/cos, tan/cot, sec/csc relationships for complementary angles. Explore trigonometric cofunction identities instantly.",
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
    id: "coin-rotation-paradox",
    category: "math",
    slugs: {
      en: "coin-rotation-paradox",
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
      en: "Coin Rotation Paradox Calculator - Rolling Coin Rotations",
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
      en: "Coin rotation paradox calculator shows how many times a rolling coin rotates around a fixed coin. Visualize this surprising geometry result instantly.",
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
    id: "collatz-conjecture-calculator",
    category: "math",
    slugs: {
      en: "collatz-conjecture-calculator",
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
      en: "Collatz Conjecture Calculator - 3n+1 Sequence Generator",
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
      en: "Collatz conjecture calculator generates the 3n+1 sequence for any positive integer. Explore steps, max value, and stopping time for this unsolved problem.",
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
    id: "column-space-calculator",
    category: "math",
    slugs: {
      en: "column-space-calculator",
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
      en: "Column Space Calculator - Find Matrix Basis Vectors",
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
      en: "Column space calculator finds basis vectors and dimension of a matrix using row reduction. Check if a vector is in the column space with step-by-step solutions.",
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
    id: "comparing-fractions-calculator",
    category: "math",
    slugs: {
      en: "comparing-fractions-calculator",
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
      en: "Comparing Fractions Calculator - Which Fraction is Larger",
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
      en: "Comparing fractions calculator determines which fraction is greater using decimal, common denominator, or cross multiplication methods with clear explanations.",
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
    id: "binary-fraction-converter",
    category: "math",
    slugs: {
      en: "binary-fraction-converter",
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
      en: "Binary Fraction Converter - Binary to Decimal Fractions",
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
      en: "Convert binary fractions to decimal and decimal fractions to binary with step-by-step explanations. Supports configurable fractional precision up to 32 bits.",
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
    id: "binary-multiplication-calculator",
    category: "math",
    slugs: {
      en: "binary-multiplication-calculator",
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
      en: "Binary Multiplication Calculator - Multiply Binary Numbers",
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
      en: "Multiply binary numbers with step-by-step partial products and decimal conversion. Ideal for learning binary arithmetic and digital electronics.",
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
    id: "binary-subtraction-calculator",
    category: "math",
    slugs: {
      en: "binary-subtraction-calculator",
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
      en: "Binary Subtraction Calculator - Borrowing & Two's Complement",
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
      en: "Subtract binary numbers using standard borrowing or two's complement with step-by-step solutions and decimal equivalents. Free online binary arithmetic tool.",
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
    id: "binomial-coefficient-calculator",
    category: "math",
    slugs: {
      en: "binomial-coefficient-calculator",
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
      en: "Binomial Coefficient Calculator - C(n,k) Combinations",
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
      en: "Calculate binomial coefficients C(n,k) for combinatorics, probability, and Pascal's triangle. Enter n and k to get the exact combination count with formula.",
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
    id: "bit-shift-calculator",
    category: "math",
    slugs: {
      en: "bit-shift-calculator",
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
      en: "Bit Shift Calculator - Binary Left & Right Shift Operations",
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
      en: "Perform left shift, logical right shift, and arithmetic right shift on integers. Results shown in binary, decimal, and hexadecimal with instant calculations.",
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
    id: "bitwise-calculator",
    category: "math",
    slugs: {
      en: "bitwise-calculator",
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
      en: "Bitwise Calculator - AND, OR, XOR, NOT, Shift Operations",
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
      en: "Free bitwise calculator for AND, OR, XOR, NOT, left shift, and right shift. Supports decimal, binary, and hex input with instant multi-format results.",
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
    id: "box-method-calculator",
    category: "math",
    slugs: {
      en: "box-method-calculator",
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
      en: "Box Method Calculator - Visualize Polynomial Multiplication",
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
      en: "Multiply binomials visually using the box method. See every partial product in a grid and the fully expanded polynomial expression instantly.",
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
    id: "catenary-curve-calculator",
    category: "math",
    slugs: {
      en: "catenary-curve-calculator",
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
      en: "Catenary Curve Calculator - Hanging Chain and Cable Sag",
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
      en: "Calculate catenary curve sag height, slope, arc length, and tension for hanging cables. Uses the hyperbolic cosine formula with step-by-step results.",
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
    id: "ceiling-function-calculator",
    category: "math",
    slugs: {
      en: "ceiling-function-calculator",
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
      en: "Ceiling Function Calculator - Round Up to Nearest Integer",
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
      en: "Ceiling function calculator finds the smallest integer greater than or equal to x. Handles positive, negative, and decimal inputs with instant results.",
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
    id: "center-of-mass-calculator",
    category: "math",
    slugs: {
      en: "center-of-mass-calculator",
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
      en: "Center of Mass Calculator - Multi-Point Mass System",
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
      en: "Calculate center of mass for point masses in 2D. Enter mass and x,y coordinates, get centroid position using the weighted average formula instantly.",
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
    id: "arc-length-calculator",
    category: "math",
    slugs: {
      en: "arc-length-calculator",
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
      en: "Arc Length Calculator - Circle Arc Formula Tool",
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
      en: "Arc length calculator finds the length of a circle arc from radius and central angle in degrees or radians. Instant results with the formula shown.",
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
    id: "arccos-calculator",
    category: "math",
    slugs: {
      en: "arccos-calculator",
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
      en: "Arccos Calculator - Inverse Cosine Function",
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
      en: "Arccos calculator computes the inverse cosine of any value in [-1, 1] in degrees or radians. Set decimal precision for exact results with the arccos formula.",
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
    id: "arcsin-calculator",
    category: "math",
    slugs: {
      en: "arcsin-calculator",
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
      en: "Arcsin Calculator - Inverse Sine Function",
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
      en: "Arcsin calculator finds the inverse sine of values in [-1, 1], returning the angle in degrees or radians. Includes domain hints and the arcsin formula.",
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
    id: "arctan-calculator",
    category: "math",
    slugs: {
      en: "arctan-calculator",
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
      en: "Arctan Calculator - Inverse Tangent Function",
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
      en: "Arctan calculator computes the inverse tangent of any real number in degrees or radians. Domain is all real numbers; results in (-90°, 90°) with the formula.",
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
    id: "area-calculator",
    category: "math",
    slugs: {
      en: "area-calculator",
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
      en: "Area Calculator - Shapes Area Formula Tool",
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
      en: "Area calculator for squares, rectangles, circles, triangles, parallelograms, and trapezoids. Enter dimensions and get the correct formula with instant results.",
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
    id: "adjoint-matrix-calculator",
    category: "math",
    slugs: {
      en: "adjoint-matrix-calculator",
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
      en: "Adjoint Matrix Calculator - Adjugate & Inverse",
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
      en: "Adjoint matrix calculator for 2×2, 3×3, and 4×4 matrices. Compute the adjugate, determinant, and inverse matrix instantly with step-by-step results.",
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
    id: "and-calculator",
    category: "math",
    slugs: {
      en: "and-calculator",
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
      en: "Boolean AND Calculator - Logic Gate & Truth Table",
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
      en: "Boolean AND calculator for binary operations, truth tables, and sequence processing. Explore AND logic gates with instant results and clear explanations.",
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
    id: "angle-between-two-vectors-calculator",
    category: "math",
    slugs: {
      en: "angle-between-two-vectors-calculator",
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
      en: "Angle Between Two Vectors Calculator - 2D & 3D",
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
      en: "Angle between two vectors calculator using the dot product formula. Supports 2D and 3D vectors with results in degrees and radians plus vector magnitudes.",
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
    id: "angle-calculator",
    category: "math",
    slugs: {
      en: "angle-calculator",
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
      en: "Angle Calculator - Vectors, Points & Slope",
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
      en: "Angle calculator for vectors, three-point angles, and coordinate slope angles. Get results in degrees and radians using dot product and arctangent formulas.",
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
    id: "antilog-calculator",
    category: "math",
    slugs: {
      en: "antilog-calculator",
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
      en: "Antilog Calculator - Inverse Logarithm Any Base",
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
      en: "Antilog calculator that computes the inverse logarithm for any base including base 10, natural log (e), and base 2. Ideal for pH, decibels, and science.",
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
    id: "30-60-90-triangle-calculator",
    category: "math",
    slugs: {
      en: "30-60-90-triangle-calculator",
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
      en: "30-60-90 Triangle Calculator - Special Right Triangle",
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
      en: "30-60-90 triangle calculator finds all sides from one known side using the exact 1 : √3 : 2 ratio. Fast, accurate results for geometry and engineering.",
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
    id: "45-45-90-triangle-calculator",
    category: "math",
    slugs: {
      en: "45-45-90-triangle-calculator",
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
      en: "45-45-90 Triangle Calculator - Isosceles Right Triangle",
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
      en: "45-45-90 triangle calculator finds all sides from one known side using the exact 1 : 1 : √2 ratio. Instant results for geometry, design, and woodworking.",
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
    id: "absolute-change-calculator",
    category: "math",
    slugs: {
      en: "absolute-change-calculator",
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
      en: "Absolute Change Calculator - Calculate the Difference",
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
      en: "Absolute change calculator computes the difference between any two values. Enter initial and final values to see how much a quantity increased or decreased.",
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
    id: "absolute-value-calculator",
    category: "math",
    slugs: {
      en: "absolute-value-calculator",
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
      en: "Absolute Value Calculator - Find |x| Instantly",
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
      en: "Absolute value calculator finds |x| for any number instantly. Understand distance from zero on the number line with clear formula and worked examples.",
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
    id: "absolute-value-equation-calculator",
    category: "math",
    slugs: {
      en: "absolute-value-equation-calculator",
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
      en: "Absolute Value Equation Calculator - Solve |ax+b|=c",
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
      en: "Solve absolute value equations |ax+b|=c instantly. Find no solution, one solution, or two solutions with clear step-by-step results.",
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
    id: "absolute-value-inequalities-calculator",
    category: "math",
    slugs: {
      en: "absolute-value-inequalities-calculator",
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
      en: "Absolute Value Inequalities Calculator - Solve |ax+b|<c",
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
      en: "Solve absolute value inequalities like |ax+b|<c and |ax+b|>c online. Get bounded or unbounded solution sets instantly with correct interval notation.",
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
    id: "adding-and-subtracting-fractions-calculator",
    category: "math",
    slugs: {
      en: "adding-and-subtracting-fractions-calculator",
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
      en: "Adding and Subtracting Fractions Calculator",
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
      en: "Add or subtract any two fractions with automatic simplification to lowest terms. Finds the LCD and shows step-by-step solutions for any fraction problem.",
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
    id: "adding-and-subtracting-polynomials-calculator",
    category: "math",
    slugs: {
      en: "adding-and-subtracting-polynomials-calculator",
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
      en: "Adding and Subtracting Polynomials Calculator",
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
      en: "Add or subtract polynomial expressions with like terms combined automatically. Get results in simplified standard form for algebra students and professionals.",
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
    id: "addition-calculator",
    category: "math",
    slugs: {
      en: "addition-calculator",
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
      en: "Addition Calculator - Add Multiple Numbers Instantly",
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
      en: "Calculate the sum of up to four numbers instantly. Supports integers, decimals, and negatives. Shows total, average, and count for quick multi-number addition.",
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
