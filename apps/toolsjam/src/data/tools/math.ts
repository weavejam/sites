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
      "zh-CN": "",
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
      en: "Triangle Area Calculator - Base Height, Heron's, SAS",
      "zh-CN": "",
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
      en: "Calculate triangle area using base and height, three sides (Heron's formula), or two sides and an angle (SAS). Instant results with formulas shown.",
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
    id: "triangle-height-calculator",
    category: "math",
    slugs: {
      en: "triangle-height-calculator",
      "zh-CN": "",
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
      en: "Triangle Height Calculator - Find Altitude Instantly",
      "zh-CN": "",
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
      en: "Find the altitude of any triangle from area and base, three side lengths, or two sides and an angle. All three heights returned for the three-sides method.",
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
      "zh-CN": "",
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
      en: "Triangular Numbers Calculator - Find, Check & Generate",
      "zh-CN": "",
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
      en: "Find the nth triangular number, check if any integer is triangular, or generate a sequence. Uses the formula T(n)=n(n+1)/2 with instant step-by-step results.",
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
    id: "triangular-prism-calculator",
    category: "math",
    slugs: {
      en: "triangular-prism-calculator",
      "zh-CN": "",
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
      en: "Triangular Prism Calculator - Volume & Surface Area",
      "zh-CN": "",
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
      en: "Calculate volume, base area, lateral surface area, and total surface area of any triangular prism. Enter three base sides and prism height for instant results.",
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
    id: "time-percentage-calculator",
    category: "math",
    slugs: {
      en: "time-percentage-calculator",
      "zh-CN": "",
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
      en: "Time Percentage Calculator - Calculate % of Time",
      "zh-CN": "",
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
      en: "Calculate what percentage a time duration is of a total, find partial time from a percentage, or reverse-engineer the total time. Instant results.",
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
    id: "torus-surface-area-calculator",
    category: "math",
    slugs: {
      en: "torus-surface-area-calculator",
      "zh-CN": "",
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
      en: "Torus Surface Area Calculator - Donut Shape",
      "zh-CN": "",
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
      en: "Calculate the surface area of a torus using major and minor radii. Formula: 4π²Rr. Instant results for rings, tubes, O-rings, and design applications.",
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
    id: "torus-volume-calculator",
    category: "math",
    slugs: {
      en: "torus-volume-calculator",
      "zh-CN": "",
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
      en: "Torus Volume Calculator - Donut Shape Volume",
      "zh-CN": "",
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
      en: "Calculate the volume of a torus using major and minor radii. Formula: 2π²Rr². Instant results for engineering, design, and geometry applications.",
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
    id: "trapezoid-calculator",
    category: "math",
    slugs: {
      en: "trapezoid-calculator",
      "zh-CN": "",
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
      en: "Trapezoid Calculator - Area, Perimeter, Height",
      "zh-CN": "",
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
      en: "Calculate the area, perimeter, height, or base of a trapezoid. Enter known values and choose what to find. Instant results with clear formulas.",
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
    id: "triangle-angle-calculator",
    category: "math",
    slugs: {
      en: "triangle-angle-calculator",
      "zh-CN": "",
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
      en: "Triangle Angle Calculator - SSS and AA Methods",
      "zh-CN": "",
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
      en: "Find missing triangle angles from two known angles or three side lengths using SSS and AA methods. All angles in degrees with instant results.",
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
      "zh-CN": "",
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
      en: "Surface Area of a Hemisphere Calculator",
      "zh-CN": "",
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
      en: "Calculate curved surface area, base area, and total surface area of a hemisphere from its radius. Instant results with formulas for geometry and engineering.",
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
    id: "surface-area-of-a-triangular-prism-calculator",
    category: "math",
    slugs: {
      en: "surface-area-of-a-triangular-prism-calculator",
      "zh-CN": "",
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
      en: "Surface Area of a Triangular Prism Calculator",
      "zh-CN": "",
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
      en: "Calculate the total surface area of a triangular prism from its three side lengths and prism length. Uses Heron's formula for the base area instantly.",
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
    id: "tangent-of-a-circle-calculator",
    category: "math",
    slugs: {
      en: "tangent-of-a-circle-calculator",
      "zh-CN": "",
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
      en: "Tangent Line to a Circle Calculator",
      "zh-CN": "",
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
      en: "Find the tangent line equation for a circle at any point on its circumference. Returns general and slope-intercept forms with step-by-step results.",
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
    id: "tensor-product-calculator",
    category: "math",
    slugs: {
      en: "tensor-product-calculator",
      "zh-CN": "",
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
      en: "Tensor Product Calculator - Compute Outer Product of Vectors",
      "zh-CN": "",
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
      en: "Calculate the tensor (outer) product of two vectors instantly. Displays results as a matrix or flattened vector. Free online tool for linear algebra.",
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
    id: "terminating-decimals-calculator",
    category: "math",
    slugs: {
      en: "terminating-decimals-calculator",
      "zh-CN": "",
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
      en: "Terminating Decimals Calculator - Check Fractions",
      "zh-CN": "",
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
      en: "Determine if a fraction produces a terminating or repeating decimal. Shows prime factorization of the denominator and the simplified fraction instantly.",
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
    id: "tetrahedron-volume-calculator",
    category: "math",
    slugs: {
      en: "tetrahedron-volume-calculator",
      "zh-CN": "",
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
      en: "Tetrahedron Volume Calculator - Regular & Irregular Shapes",
      "zh-CN": "",
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
      en: "Calculate tetrahedron volume from edge length (regular) or base area and height (any shape). Fast, accurate, and free online geometry calculator.",
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
    id: "three-dimensional-distance-calculator",
    category: "math",
    slugs: {
      en: "three-dimensional-distance-calculator",
      "zh-CN": "",
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
      en: "3D Distance Calculator - Two Points in 3D Space",
      "zh-CN": "",
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
      en: "Calculate the Euclidean distance between two points in 3D space using the 3D distance formula. Handles negative coordinates. Free, fast, and accurate.",
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
    id: "subtracting-fractions-calculator",
    category: "math",
    slugs: {
      en: "subtracting-fractions-calculator",
      "zh-CN": "",
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
      en: "Subtracting Fractions Calculator",
      "zh-CN": "",
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
      en: "Subtract proper, improper, or mixed fractions instantly. Finds the common denominator, simplifies, and shows fraction, mixed number, and decimal results.",
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
    id: "subtraction-calculator",
    category: "math",
    slugs: {
      en: "subtraction-calculator",
      "zh-CN": "",
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
      en: "Subtraction Calculator - Find Difference of Two Numbers",
      "zh-CN": "",
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
      en: "Subtraction calculator for any two real numbers — integers, decimals, and negatives. Enter minuend and subtrahend to get the difference instantly.",
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
    id: "sum-and-difference-identities-calculator",
    category: "math",
    slugs: {
      en: "sum-and-difference-identities-calculator",
      "zh-CN": "",
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
      en: "Sum and Difference Identities Calculator",
      "zh-CN": "",
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
      en: "Calculate trig values using sum and difference identities for sin, cos, and tan. Supports degrees and radians with step-by-step formula display.",
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
    id: "sum-of-a-linear-number-sequence-calculator",
    category: "math",
    slugs: {
      en: "sum-of-a-linear-number-sequence-calculator",
      "zh-CN": "",
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
      en: "Sum of a Linear Number Sequence Calculator",
      "zh-CN": "",
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
      en: "Find the sum of any arithmetic sequence. Enter first term, common difference, and number of terms for an instant sum, last term, and formula.",
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
    id: "sum-of-products-calculator",
    category: "math",
    slugs: {
      en: "sum-of-products-calculator",
      "zh-CN": "",
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
      en: "Sum of Products Calculator - Dot Product of Two Vectors",
      "zh-CN": "",
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
      en: "Sum of products (dot product) calculator for vectors of any length. Enter comma-separated numbers and get the scalar result with full calculation shown.",
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
    id: "round-to-the-nearest-thousand-calculator",
    category: "math",
    slugs: {
      en: "round-to-the-nearest-thousand-calculator",
      "zh-CN": "",
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
      en: "Round to the Nearest Thousand Calculator",
      "zh-CN": "",
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
      en: "Round any number to the nearest thousand instantly. Free online rounding tool for financial estimates, math homework, data analysis, and quick approximations.",
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
    id: "rounding-calculator",
    category: "math",
    slugs: {
      en: "rounding-calculator",
      "zh-CN": "",
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
      en: "Rounding Calculator - Round Numbers to Any Precision",
      "zh-CN": "",
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
      en: "Rounding calculator supporting floor, ceiling, half-up, and decimal-place modes. Round numbers to any precision for math, finance, science, and everyday use.",
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
    id: "rsa-calculator",
    category: "math",
    slugs: {
      en: "rsa-calculator",
      "zh-CN": "",
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
      en: "RSA Calculator - Public Key Encryption & Decryption Tool",
      "zh-CN": "",
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
      en: "RSA encryption calculator for learning public key cryptography. Generate key pairs, encrypt and decrypt numbers — ideal for number theory study.",
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
    id: "scatter-plot-calculator",
    category: "math",
    slugs: {
      en: "scatter-plot-calculator",
      "zh-CN": "",
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
      en: "Scatter Plot Calculator - Correlation & Linear Regression",
      "zh-CN": "",
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
      en: "Scatter plot calculator for linear regression and Pearson correlation. Enter X and Y data to get slope, intercept, r, and R² — free regression analysis.",
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
    id: "scientific-notation-calculator",
    category: "math",
    slugs: {
      en: "scientific-notation-calculator",
      "zh-CN": "",
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
      en: "Scientific Notation Calculator - Convert to Standard Form",
      "zh-CN": "",
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
      en: "Scientific notation calculator to convert numbers to standard form or expand scientific notation to decimals. Handles large and small numbers instantly.",
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
    id: "simplifying-radicals-calculator",
    category: "math",
    slugs: {
      en: "simplifying-radicals-calculator",
      "zh-CN": "",
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
      en: "Simplifying Radicals Calculator - Simplify Square Roots",
      "zh-CN": "",
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
      en: "Simplify any radical expression instantly. Enter the radicand and root index to get the fully reduced form with coefficient, perfect for algebra and geometry.",
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
    id: "sine-calculator",
    category: "math",
    slugs: {
      en: "sine-calculator",
      "zh-CN": "",
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
      en: "Sine Calculator - Calculate Sin of Any Angle",
      "zh-CN": "",
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
      en: "Calculate sine of any angle in degrees or radians instantly. Supports negative angles and values over 360°. Ideal for trigonometry, physics, and engineering.",
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
    id: "singular-values-calculator",
    category: "math",
    slugs: {
      en: "singular-values-calculator",
      "zh-CN": "",
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
      en: "Singular Values Calculator - SVD Matrix Decomposition",
      "zh-CN": "",
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
      en: "Compute singular values of any matrix via SVD decomposition. Find rank, condition number, and matrix norms. Ideal for data science and linear algebra.",
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
    id: "slant-height-calculator",
    category: "math",
    slugs: {
      en: "slant-height-calculator",
      "zh-CN": "",
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
      en: "Slant Height Calculator - Cones and Square Pyramids",
      "zh-CN": "",
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
      en: "Calculate slant height, vertical height, or base dimensions for cones and square pyramids using the Pythagorean theorem. Fast and accurate geometry tool.",
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
    id: "slope-calculator",
    category: "math",
    slugs: {
      en: "slope-calculator",
      "zh-CN": "",
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
      en: "Slope Calculator - Find Slope from Two Points or Equation",
      "zh-CN": "",
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
      en: "Calculate slope from two coordinate points or a line equation. Get slope, angle, distance, and line equation. Perfect for algebra and coordinate geometry.",
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
    id: "rational-zeros-calculator",
    category: "math",
    slugs: {
      en: "rational-zeros-calculator",
      "zh-CN": "",
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
      en: "Rational Zeros Calculator - Possible Polynomial Roots",
      "zh-CN": "",
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
      en: "Rational zeros calculator that lists every possible rational root from polynomial coefficients using the Rational Root Theorem, so you can test factors faster.",
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
    id: "rationalize-denominator-calculator",
    category: "math",
    slugs: {
      en: "rationalize-denominator-calculator",
      "zh-CN": "",
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
      en: "Rationalize Denominator Calculator - Radical Fractions",
      "zh-CN": "",
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
      en: "Rationalize denominator calculator for simple radicals and binomial surds. See the conjugate method and get an equivalent exact fraction fast.",
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
    id: "ratios-of-directed-line-segments-calculator",
    category: "math",
    slugs: {
      en: "ratios-of-directed-line-segments-calculator",
      "zh-CN": "",
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
      en: "Section Formula Calculator - Directed Line Segments",
      "zh-CN": "",
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
      en: "Section formula calculator for internal or external division of directed line segments. Find the exact point from endpoints and ratio values fast.",
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
    id: "reciprocal-calculator",
    category: "math",
    slugs: {
      en: "reciprocal-calculator",
      "zh-CN": "",
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
      en: "Reciprocal Calculator - Multiplicative Inverse",
      "zh-CN": "",
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
      en: "Reciprocal calculator for integers, decimals, and fractions. Convert any nonzero value to its simplified multiplicative inverse instantly.",
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
    id: "rectangular-prism-calculator",
    category: "math",
    slugs: {
      en: "rectangular-prism-calculator",
      "zh-CN": "",
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
      en: "Rectangular Prism Calculator - Volume, Area, Diagonal",
      "zh-CN": "",
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
      en: "Rectangular prism calculator for volume, surface area, space diagonal, and face diagonals. Get every key cuboid measurement from three dimensions fast.",
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
    id: "quaternion-calculator",
    category: "math",
    slugs: {
      en: "quaternion-calculator",
      "zh-CN": "",
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
      en: "Quaternion Calculator - 4D Math & 3D Rotations",
      "zh-CN": "",
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
      en: "Quaternion calculator for addition, subtraction, multiplication, conjugate, norm, and inverse. Essential for 3D graphics, robotics, and aerospace rotation math.",
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
    id: "queueing-theory-calculator",
    category: "math",
    slugs: {
      en: "queueing-theory-calculator",
      "zh-CN": "",
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
      en: "Queueing Theory Calculator - M/M/c Queue Analysis",
      "zh-CN": "",
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
      en: "Queueing theory calculator for M/M/1, M/M/c, M/M/c/K, and M/M/c/N models. Compute utilization, queue length, wait times, and system probabilities instantly.",
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
    id: "quotient-calculator",
    category: "math",
    slugs: {
      en: "quotient-calculator",
      "zh-CN": "",
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
      en: "Quotient Calculator - Find Quotient and Remainder",
      "zh-CN": "",
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
      en: "Quotient calculator that instantly finds the integer quotient and remainder for any division. Supports positive, negative, and large integers with verification.",
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
    id: "radical-calculator",
    category: "math",
    slugs: {
      en: "radical-calculator",
      "zh-CN": "",
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
      en: "Radical Calculator - Simplify Square, Cube & Nth Roots",
      "zh-CN": "",
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
      en: "Radical calculator simplifies square roots, cube roots, and nth roots by factoring out perfect powers. Get simplified radical form and decimal value instantly.",
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
      "zh-CN": "",
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
      en: "Null Space Calculator - Find Matrix Kernel & Basis Vectors",
      "zh-CN": "",
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
      en: "Null space calculator using Gauss-Jordan RREF for matrices up to 4×4. Shows basis vectors, rank, and nullity — essential for linear algebra coursework.",
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
    id: "octagon-calculator",
    category: "math",
    slugs: {
      en: "octagon-calculator",
      "zh-CN": "",
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
      en: "Octagon Calculator: Area, Perimeter, Apothem & More",
      "zh-CN": "",
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
      en: "Octagon calculator that computes area, perimeter, apothem, circumradius, and diagonals of any regular octagon from its side length with instant results.",
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
    id: "multiplying-binomials-calculator",
    category: "math",
    slugs: {
      en: "multiplying-binomials-calculator",
      "zh-CN": "",
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
      en: "Multiplying Binomials Calculator - FOIL Method",
      "zh-CN": "",
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
      en: "Multiply two binomials using the FOIL method. Enter coefficients to expand (ax+b)(cx+d) and get step-by-step solutions instantly.",
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
    id: "multiplying-exponents-calculator",
    category: "math",
    slugs: {
      en: "multiplying-exponents-calculator",
      "zh-CN": "",
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
      en: "Multiplying Exponents Calculator - Multiply Powers",
      "zh-CN": "",
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
      en: "Multiply exponents with the same or different bases. Applies the product-of-powers rule automatically and computes the numerical result instantly.",
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
    id: "multiplying-fractions-calculator",
    category: "math",
    slugs: {
      en: "multiplying-fractions-calculator",
      "zh-CN": "",
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
      en: "Multiplying Fractions Calculator - Fraction Math",
      "zh-CN": "",
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
      en: "Multiply two fractions and get the fully simplified result. Handles proper and improper fractions with automatic GCD simplification instantly.",
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
    id: "multiplying-polynomials-calculator",
    category: "math",
    slugs: {
      en: "multiplying-polynomials-calculator",
      "zh-CN": "",
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
      en: "Multiplying Polynomials Calculator - Algebra Tool",
      "zh-CN": "",
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
      en: "Multiply any two polynomials by entering comma-separated coefficients. Get the fully expanded product polynomial with complete calculation instantly.",
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
    id: "multiplying-radicals-calculator",
    category: "math",
    slugs: {
      en: "multiplying-radicals-calculator",
      "zh-CN": "",
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
      en: "Multiplying Radicals Calculator - Simplify Radicals",
      "zh-CN": "",
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
      en: "Multiply radical expressions a√x and b√y and simplify the result. Factors out perfect squares automatically to return the simplest radical form.",
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
    id: "mayan-numerals-converter",
    category: "math",
    slugs: {
      en: "mayan-numerals-converter",
      "zh-CN": "",
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
      en: "Mayan Numerals Converter - Decimal to Maya Numbers",
      "zh-CN": "",
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
      en: "Convert decimal numbers to ancient Mayan vigesimal (base-20) notation with dots, bars, and shell symbols, or decode Mayan positions back to decimal.",
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
    id: "mean-calculator",
    category: "math",
    slugs: {
      en: "mean-calculator",
      "zh-CN": "",
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
      en: "Mean Calculator - Calculate the Average of Any Number Set",
      "zh-CN": "",
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
      en: "Mean calculator finds the arithmetic average of any set of numbers. Enter your data to get the mean, sum, and count with the formula shown.",
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
    id: "midpoint-calculator",
    category: "math",
    slugs: {
      en: "midpoint-calculator",
      "zh-CN": "",
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
      en: "Midpoint Calculator - Find Midpoint Between Two Points",
      "zh-CN": "",
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
      en: "Midpoint calculator finds the exact midpoint of a line segment in 2D or 3D space. Enter two point coordinates for instant results with the midpoint formula.",
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
    id: "mixed-number-calculator",
    category: "math",
    slugs: {
      en: "mixed-number-calculator",
      "zh-CN": "",
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
      en: "Mixed Number Calculator - Add, Subtract, Multiply, Divide",
      "zh-CN": "",
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
      en: "Mixed number calculator performs addition, subtraction, multiplication, and division on mixed fractions. Get simplified results with step-by-step working.",
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
    id: "mixed-number-to-improper-fraction-calculator",
    category: "math",
    slugs: {
      en: "mixed-number-to-improper-fraction-calculator",
      "zh-CN": "",
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
      en: "Mixed Number to Improper Fraction Calculator",
      "zh-CN": "",
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
      en: "Convert any mixed number to an improper fraction instantly with step-by-step solutions. Enter the whole number, numerator, and denominator for the answer.",
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
    id: "parallel-line-calculator",
    category: "math",
    slugs: {
      en: "parallel-line-calculator",
      "zh-CN": "",
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
      en: "Parallel Line Calculator - Find Equation of a Parallel Line",
      "zh-CN": "",
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
      en: "Find the equation of a line parallel to any given line through a specified point. Supports slope-intercept, two-point, and standard form — instant results.",
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
    id: "partial-fraction-decomposition-calculator",
    category: "math",
    slugs: {
      en: "partial-fraction-decomposition-calculator",
      "zh-CN": "",
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
      en: "Partial Fraction Decomposition Calculator",
      "zh-CN": "",
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
      en: "Partial fraction decomposition calculator — break rational expressions into simpler fractions. Enter polynomials to get the full expansion instantly.",
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
    id: "partial-products-calculator",
    category: "math",
    slugs: {
      en: "partial-products-calculator",
      "zh-CN": "",
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
      en: "Partial Products Calculator - Step-by-Step Multiplication",
      "zh-CN": "",
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
      en: "Partial products calculator breaks multiplication into place value steps. Great for learning multi-digit arithmetic visually with instant results.",
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
    id: "pascals-triangle-calculator",
    category: "math",
    slugs: {
      en: "pascals-triangle-calculator",
      "zh-CN": "",
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
      en: "Pascal's Triangle Calculator - Binomial Coefficients",
      "zh-CN": "",
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
      en: "Pascal's triangle calculator generates rows of binomial coefficients. Choose row count, specific row, and display format to explore combinatorial patterns.",
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
    id: "pentagon-calculator",
    category: "math",
    slugs: {
      en: "pentagon-calculator",
      "zh-CN": "",
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
      en: "Pentagon Calculator - Area, Perimeter & Apothem",
      "zh-CN": "",
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
      en: "Pentagon calculator finds area, perimeter, apothem, and diagonal from any one known value — side, apothem, area, or perimeter. Instant results.",
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
    id: "matrix-addition-and-subtraction-calculator",
    category: "math",
    slugs: {
      en: "matrix-addition-and-subtraction-calculator",
      "zh-CN": "",
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
      en: "Matrix Addition and Subtraction Calculator",
      "zh-CN": "",
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
      en: "Add or subtract two matrices instantly with this free online calculator. Compute element-wise sums and differences for linear algebra.",
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
    id: "matrix-by-scalar-calculator",
    category: "math",
    slugs: {
      en: "matrix-by-scalar-calculator",
      "zh-CN": "",
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
      en: "Matrix Scalar Multiplication Calculator",
      "zh-CN": "",
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
      en: "Multiply any matrix by a scalar value with this free online calculator. Scale every element uniformly for linear algebra and machine learning applications.",
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
    id: "matrix-calculator",
    category: "math",
    slugs: {
      en: "matrix-calculator",
      "zh-CN": "",
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
      en: "Matrix Calculator - Add, Multiply, Transpose, Determinant",
      "zh-CN": "",
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
      en: "Perform matrix addition, subtraction, multiplication, transpose, and determinant in one free online tool. Supports any matrix size for linear algebra problems.",
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
        en: "Find the latus rectum length for any conic section. Supports parabola (4p), ellipse, and hyperbola (2b\u00b2/a) with instant formula results.",
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
    id: "complex-root-calculator",
    category: "math",
    slugs: {
      en: "complex-root-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Complex Root Calculator - N-th Roots via De Moivre",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate all n-th roots of any complex number with De Moivre's Theorem. Polar form, principal root, and every conjugate root in one click.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "condense-logarithms-calculator",
    category: "math",
    slugs: {
      en: "condense-logarithms-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Condense Logarithms Calculator - Combine Log Expressions",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Condense logarithm sums, differences, and scalar multiples into a single logarithm using product, quotient, and power rules. Supports any base.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "condition-number-calculator",
    category: "math",
    slugs: {
      en: "condition-number-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Condition Number Calculator - Matrix Stability",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Compute the condition number of 2x2 or 3x3 matrices in the 1-norm, infinity-norm, or Frobenius norm. Diagnose numerical stability instantly.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "conic-sections-calculator",
    category: "math",
    slugs: {
      en: "conic-sections-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Conic Sections Calculator - Identify Conics by Discriminant",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Identify circle, ellipse, parabola, or hyperbola from the general equation Ax^2+Bxy+Cy^2+Dx+Ey+F=0 using the discriminant. Step-by-step result.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "consecutive-integers-calculator",
    category: "math",
    slugs: {
      en: "consecutive-integers-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Consecutive Integers Calculator - Sequences and Sums",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Generate consecutive integer sequences, find a sequence with a target sum, or analyze a list. Returns sequence, sum, average, and count instantly.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  }
];