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
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "XOR Calculator - Exclusive OR Logic & Bitwise Operations",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate XOR (Exclusive OR) for boolean values, binary sequences, and decimal integers with step-by-step explanations and truth tables.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "y-intercept-calculator",
    category: "math",
    slugs: {
      en: "y-intercept-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Y-Intercept Calculator - Find Y-Intercept of a Line",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate the y-intercept and slope-intercept equation of a line from slope and point, or from two points. Instant results with the full equation.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
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
  }
];
