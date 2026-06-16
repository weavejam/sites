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
      "zh-CN": "juzhen-hanglieshi-jisuanqi",
      "zh-TW": "juzhen-hanglieshi-jisuanqi",
      ja: "gyoretsu-gyoretsushiki-keisanki",
      ko: "haengnyeol-haengnyeolsik-gyesangi",
      es: "calculadora-determinante-matrices",
      fr: "calculateur-determinant-matrice",
      de: "matrix-determinante-rechner",
      pt: "calculadora-determinante-matriz",
      ru: "kalkulyator-opredelitelya-matricy"
    },
    titles: {
      en: "Matrix Determinant Calculator - Any Square Matrix",
      "zh-CN": "矩阵行列式计算器 - 任意方阵",
      "zh-TW": "矩陣行列式計算器 - 任意方陣",
      ja: "行列式計算機 - 任意の正方行列",
      ko: "행렬식 계산기 - 모든 정사각 행렬",
      es: "Calculadora de determinantes de matrices",
      fr: "Calculateur de déterminant de matrice",
      de: "Matrix-Determinanten-Rechner",
      pt: "Calculadora de determinante de matriz",
      ru: "Калькулятор определителя матрицы"
    },
    descriptions: {
      en: "Calculate the determinant of any square matrix online for free. Supports 2×2, 3×3, 4×4, and larger matrices with instant results for linear algebra.",
      "zh-CN": "免费在线计算任意方阵的行列式，支持 2×2、3×3、4×4 及更大矩阵，快速获得线性代数结果。",
      "zh-TW": "免費線上計算任意方陣的行列式，支援 2×2、3×3、4×4 及更大矩陣，快速取得線性代數結果。",
      ja: "任意の正方行列の行列式を無料でオンライン計算。2×2、3×3、4×4 から大きな行列まで対応し、線形代数の結果を即時表示します。",
      ko: "모든 정사각 행렬의 행렬식을 무료로 온라인 계산합니다. 2×2, 3×3, 4×4 및 더 큰 행렬을 지원하며 선형대수 결과를 즉시 제공합니다.",
      es: "Calcula gratis en línea el determinante de cualquier matriz cuadrada. Admite matrices 2×2, 3×3, 4×4 y mayores con resultados instantáneos.",
      fr: "Calculez gratuitement en ligne le déterminant de toute matrice carrée. Compatible 2×2, 3×3, 4×4 et matrices plus grandes, avec résultat instantané.",
      de: "Berechne die Determinante jeder quadratischen Matrix kostenlos online. Unterstützt 2×2, 3×3, 4×4 und größere Matrizen mit Sofortergebnis.",
      pt: "Calcule grátis online o determinante de qualquer matriz quadrada. Suporta matrizes 2×2, 3×3, 4×4 e maiores, com resultado instantâneo.",
      ru: "Бесплатно вычисляйте онлайн определитель любой квадратной матрицы. Поддерживаются 2×2, 3×3, 4×4 и более крупные матрицы."
    }
  },
  {
    id: "matrix-multiplication-calculator",
    category: "math",
    slugs: {
      en: "matrix-multiplication-calculator",
      "zh-CN": "juzhen-chengfa-jisuanqi",
      "zh-TW": "juzhen-chengfa-jisuanqi",
      ja: "gyoretsu-seki-keisanki",
      ko: "haenglyeol-gop-sanseonggi",
      es: "calculadora-multiplicacion-matrices",
      fr: "calculatrice-multiplication-matrices",
      de: "matrixmultiplikationsrechner",
      pt: "calculadora-multiplicacao-matrizes",
      ru: "kalkulyator-umnozheniya-matric"
    },
    titles: {
      en: "Matrix Multiplication Calculator",
      "zh-CN": "矩阵乘法计算器",
      "zh-TW": "矩陣乘法計算器",
      ja: "行列積計算機",
      ko: "행렬 곱셈 계산기",
      es: "Calculadora de multiplicación de matrices",
      fr: "Calculatrice de multiplication de matrices",
      de: "Matrixmultiplikationsrechner",
      pt: "Calculadora de multiplicação de matrizes",
      ru: "Калькулятор умножения матриц"
    },
    descriptions: {
      en: "Multiply two matrices of compatible dimensions with this free online calculator. Get the product matrix instantly with automatic dimension validation.",
      "zh-CN": "使用这款免费在线计算器，计算两个维度兼容的矩阵，自动校验维度并立即得到结果矩阵。",
      "zh-TW": "使用這款免費線上計算器，計算兩個維度相容的矩陣，並自動檢查維度，立即取得結果矩陣。",
      ja: "互換可能な次元の2つの行列を掛け算し、自動で次元を検証して結果行列をすぐに表示します。",
      ko: "호환되는 차원의 두 행렬을 곱하고, 자동 차원 검증으로 결과 행렬을 즉시 확인하세요.",
      es: "Multiplica dos matrices de dimensiones compatibles con esta calculadora gratuita y obtén la matriz resultado al instante con validación automática.",
      fr: "Multipliez deux matrices de dimensions compatibles avec ce calculateur gratuit et obtenez instantanément la matrice produit avec validation automatique.",
      de: "Multipliziere zwei Matrizen mit kompatiblen Dimensionen mit diesem kostenlosen Online-Rechner und erhalte die Ergebnismatrix sofort mit automatischer Dimensionsprüfung.",
      pt: "Multiplique duas matrizes de dimensões compatíveis com esta calculadora gratuita e obtenha a matriz produto instantaneamente com validação automática.",
      ru: "Перемножайте две матрицы совместимых размеров с помощью этого бесплатного онлайн-калькулятора и мгновенно получайте результат с автоматической проверкой размерностей."
    }
  },
  {
    id: "log-calculator",
    category: "math",
    slugs: {
      en: "log-calculator",
      "zh-CN": "duishu-jisuanqi",
      "zh-TW": "duishu-jisuanqi",
      ja: "taisu-keisanki",
      ko: "daesu-gyesangi",
      es: "calculadora-logaritmos",
      fr: "calculatrice-logarithme",
      de: "logarithmus-rechner",
      pt: "calculadora-logaritmos",
      ru: "kalkulyator-logarifmov"
    },
    titles: {
      en: "Log Calculator - Base 10, e, 2, and Custom Logs",
      "zh-CN": "对数计算器 - 以 10、e、2 或自定义为底",
      "zh-TW": "對數計算器 - 以 10、e、2 或自訂為底",
      ja: "対数計算機 - 底 10、e、2、任意底に対応",
      ko: "로그 계산기 - 밑 10, e, 2 및 사용자 지정",
      es: "Calculadora de logaritmos - base 10, e, 2 y personalizada",
      fr: "Calculatrice logarithmes - bases 10, e, 2 et personnalisée",
      de: "Logarithmus-Rechner - Basis 10, e, 2 und frei wählbar",
      pt: "Calculadora de logaritmos - base 10, e, 2 e personalizada",
      ru: "Калькулятор логарифмов - основания 10, e, 2 и свои"
    },
    descriptions: {
      en: "Log calculator for common, natural, binary, and custom-base logarithms. Get instant results and clear examples for any positive input.",
      "zh-CN": "对数计算器支持常用、自然、二进制和自定义底数对数。为任意正数即时给出结果和清晰示例。",
      "zh-TW": "對數計算器支援常用、自然、二進位與自訂底數對數。為任意正數即時給出結果與清楚範例。",
      ja: "常用対数、自然対数、二進対数、任意底の対数を計算。任意の正の入力に対して結果とわかりやすい例をすぐに表示します。",
      ko: "상용로그, 자연로그, 이진로그, 사용자 지정 밑 로그를 계산합니다. 양수 입력에 대해 즉시 결과와 명확한 예시를 제공합니다.",
      es: "Calcula logaritmos comunes, naturales, binarios y de base personalizada. Obtén resultados al instante y ejemplos claros para cualquier valor positivo.",
      fr: "Calculez les logarithmes décimaux, naturels, binaires et à base personnalisée. Résultats instantanés et exemples clairs pour toute valeur positive.",
      de: "Berechnen Sie dekadische, natürliche, binäre und frei wählbare Logarithmen. Sofortige Ergebnisse und klare Beispiele für jede positive Eingabe.",
      pt: "Calcule logaritmos comuns, naturais, binários e de base personalizada. Resultados instantâneos e exemplos claros para qualquer valor positivo.",
      ru: "Калькулятор десятичных, натуральных, двоичных и пользовательских логарифмов. Мгновенные результаты и понятные примеры для любого положительного числа."
    }
  },
  {
    id: "long-addition-calculator",
    category: "math",
    slugs: {
      en: "long-addition-calculator",
      "zh-CN": "shushi-jiafa-jisuanqi",
      "zh-TW": "shushi-jiafa-jisuanqi",
      ja: "shikijou-zu-shisan-ki",
      ko: "sejik-gopgye-san-gyeong",
      es: "calculadora-suma-larga",
      fr: "calculatrice-addition-posee",
      de: "schriftliche-addition-rechner",
      pt: "calculadora-adicao-armada",
      ru: "pismennoe-slozhenie-kalkulyator"
    },
    titles: {
      en: "Long Addition Calculator - Column Addition Steps",
      "zh-CN": "竖式加法计算器 - 列式步骤",
      "zh-TW": "直式加法計算器 - 欄式步驟",
      ja: "筆算加算機 - 列ごとの手順",
      ko: "세로셈 덧셈 계산기 - 자리별 단계",
      es: "Calculadora de suma larga - pasos por columnas",
      fr: "Calculatrice d’addition posée - étapes par colonnes",
      de: "Schriftliche Addition Rechner - Spaltenweise Schritte",
      pt: "Calculadora de adição armada - passos por coluna",
      ru: "Калькулятор письменного сложения - шаги по столбцам"
    },
    descriptions: {
      en: "Long addition calculator for adding whole numbers with carries, aligned columns, and step-by-step explanations you can follow at a glance.",
      "zh-CN": "适用于整数加法的竖式加法计算器，支持进位、对齐列和一眼可读的分步讲解。",
      "zh-TW": "適用於整數加法的直式加法計算器，支援進位、對齊欄位與一目了然的分步說明。",
      ja: "繰り上がり、桁をそろえた列、手順付きの説明をすぐに確認できる整数の筆算加算機です。",
      ko: "올림, 정렬된 자리, 단계별 설명을 바로 볼 수 있는 정수 세로셈 덧셈 계산기입니다.",
      es: "Calculadora de suma larga para números enteros, con llevadas, columnas alineadas y explicación paso a paso.",
      fr: "Calculatrice d’addition posée pour les entiers, avec retenues, colonnes alignées et explications pas à pas.",
      de: "Schriftliche Additionsrechner für ganze Zahlen mit Überträgen, ausgerichteten Spalten und Schritt-für-Schritt-Erklärungen.",
      pt: "Calculadora de adição armada para números inteiros, com vai-um, colunas alinhadas e explicação passo a passo.",
      ru: "Калькулятор письменного сложения целых чисел с переносами, выровненными столбцами и пошаговым объяснением."
    }
  },
  {
    id: "long-division-calculator",
    category: "math",
    slugs: {
      en: "long-division-calculator",
      "zh-CN": "chang-chu-fa-ji-suan-qi",
      "zh-TW": "chang-chu-fa-ji-suan-qi",
      ja: "chojoho-keisan",
      ko: "nanutsem-gyesangi",
      es: "calculadora-division-larga",
      fr: "calculatrice-division-longue",
      de: "schriftliche-division-rechner",
      pt: "calculadora-divisao-longa",
      ru: "kalkulyator-dlinnogo-deleniya"
    },
    titles: {
      en: "Long Division Calculator - Quotient, Remainder, Steps",
      "zh-CN": "长除法计算器：商、余数、步骤",
      "zh-TW": "長除法計算機：商、餘數、步驟",
      ja: "長除法計算機 - 商・余り・手順",
      ko: "나눗셈 계산기 - 몫, 나머지, 단계",
      es: "Calculadora de división larga - Cociente y resto",
      fr: "Calculatrice de division longue - Quotient et reste",
      de: "Schriftliche Division Rechner - Quotient und Rest",
      pt: "Calculadora de divisão longa - Quociente e resto",
      ru: "Калькулятор деления столбиком - Частное и остаток"
    },
    descriptions: {
      en: "Long division calculator for whole numbers with quotient, remainder, decimal output, and step-by-step division reasoning for each stage.",
      "zh-CN": "长除法计算器可处理整数除法，显示商、余数、十进制结果，以及每一步的除法推理。",
      "zh-TW": "長除法計算機可處理整數除法，顯示商、餘數、十進位結果，以及每一步的除法推理。",
      ja: "整数の割り算で商、余り、小数結果、各段階の長除法の考え方を表示する計算機です。",
      ko: "정수 나눗셈의 몫, 나머지, 소수 결과와 단계별 풀이를 보여주는 계산기입니다.",
      es: "Calculadora de división larga para enteros con cociente, resto, resultado decimal y pasos explicados.",
      fr: "Calculatrice de division longue pour les entiers avec quotient, reste, résultat décimal et étapes expliquées.",
      de: "Rechner für schriftliche Division mit Quotient, Rest, Dezimalergebnis und Schritt-für-Schritt-Erklärung.",
      pt: "Calculadora de divisão longa para números inteiros com quociente, resto, resultado decimal e etapas explicadas.",
      ru: "Калькулятор деления столбиком для целых чисел с частным, остатком, десятичным результатом и пошаговым разбором."
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
      "zh-CN": "lfsr-ji-suan-qi-xian-xing-fan-kui-yi-wei-ji-cun-qi",
      "zh-TW": "lfsr-ji-suan-qi-xian-xing-hui-kui-yi-wei-zhan-cun-qi",
      ja: "lfsr-keisanki-linearu-hanpuku-shifuto-rejisutaa",
      ko: "lfsr-gyesan-gi-seonhyeong-pideubaek-sipeuteu-reejiseuteo",
      es: "calculadora-lfsr-registro-desplazamiento-lineal",
      fr: "calculateur-lfsr-registre-decalage-lineaire",
      de: "lfsr-rechner-lineares-schieberegister",
      pt: "calculadora-lfsr-registrador-deslocamento-linear",
      ru: "lfsr-kalkulyator-lineinyi-registr-sdviga"
    },
    titles: {
      en: "LFSR Calculator - Linear Feedback Shift Register",
      "zh-CN": "LFSR计算器 - 线性反馈移位寄存器",
      "zh-TW": "LFSR計算器 - 線性回饋移位暫存器",
      ja: "LFSR計算機 - 線形帰還シフトレジスタ",
      ko: "LFSR 계산기 - 선형 피드백 시프트 레지스터",
      es: "Calculadora LFSR - Registro de desplazamiento lineal",
      fr: "Calculateur LFSR - Registre à décalage linéaire",
      de: "LFSR-Rechner - Lineares Schieberegister",
      pt: "Calculadora LFSR - Registrador de deslocamento linear",
      ru: "LFSR-калькулятор - линейный регистр сдвига"
    },
    descriptions: {
      en: "LFSR calculator generates pseudo-random binary sequences using Fibonacci or Galois Linear Feedback Shift Registers with custom seed, taps, and iterations.",
      "zh-CN": "使用可自定义种子、反馈抽头和迭代次数的 Fibonacci 或 Galois LFSR 生成伪随机二进制序列。",
      "zh-TW": "使用可自訂種子、回饋抽頭與迭代次數的 Fibonacci 或 Galois LFSR 產生偽隨機二進位序列。",
      ja: "カスタムのシード、タップ、反復回数で Fibonacci または Galois LFSR の疑似乱数ビット列を生成します。",
      ko: "사용자 지정 시드, 탭, 반복 횟수로 Fibonacci 또는 Galois LFSR의 의사난수 이진 시퀀스를 생성합니다.",
      es: "Genera secuencias binarias seudoaleatorias con LFSR Fibonacci o Galois, usando semilla, taps e iteraciones personalizables.",
      fr: "Générez des séquences binaires pseudo-aléatoires avec un LFSR Fibonacci ou Galois, avec seed, taps et itérations personnalisables.",
      de: "Erzeugt pseudorandom binäre Sequenzen mit Fibonacci- oder Galois-LFSR, inklusive anpassbarer Seed, Taps und Iterationen.",
      pt: "Gere sequências binárias pseudoaleatórias com LFSR Fibonacci ou Galois, usando seed, taps e iterações personalizáveis.",
      ru: "Генерирует псевдослучайные двоичные последовательности с LFSR Fibonacci или Galois, с настраиваемыми seed, taps и итерациями."
    }
  },
  {
    id: "line-equation-from-two-points-calculator",
    category: "math",
    slugs: {
      en: "line-equation-from-two-points-calculator",
      "zh-CN": "liangdian-qiu-zhi-xian-fangcheng-jisuanqi",
      "zh-TW": "liangdian-qiu-zhi-xian-fangcheng-jisuanqi",
      ja: "niten-karano-chokusen-hotei-keisan",
      ko: "du-jeom-jikseon-bangjeongsig-gyesan-gi",
      es: "ecuacion-recta-dos-puntos-calculadora",
      fr: "equation-droite-deux-points-calculatrice",
      de: "geradengleichung-aus-zwei-punkten-rechner",
      pt: "equacao-da-reta-por-dois-pontos-calculadora",
      ru: "uravnenie-pryamoi-po-dvum-tochkam-kalkulyator"
    },
    titles: {
      en: "Line Equation from Two Points Calculator",
      "zh-CN": "两点求直线方程计算器",
      "zh-TW": "兩點求直線方程計算器",
      ja: "2点から直線の方程式計算機",
      ko: "두 점 직선 방정식 계산기",
      es: "Calculadora de ecuación de recta por dos puntos",
      fr: "Calculatrice d’équation de droite à deux points",
      de: "Geradengleichung aus zwei Punkten Rechner",
      pt: "Calculadora da equação da reta por dois pontos",
      ru: "Калькулятор уравнения прямой по двум точкам"
    },
    descriptions: {
      en: "Line equation calculator finds slope, y-intercept, and line equation in slope-intercept, point-slope, and standard form from any two coordinate points.",
      "zh-CN": "输入任意两点，计算斜率、y 截距，以及斜截式、点斜式和标准式直线方程。",
      "zh-TW": "輸入任意兩點，計算斜率、y 截距，以及斜截式、點斜式和標準式直線方程。",
      ja: "2点を入力して、傾き、y切片、直線の方程式を傾き切片形・点傾き形・標準形で求めます。",
      ko: "두 점을 입력해 기울기, y절편, 그리고 점기울기형·기울기절편형·표준형 직선 방정식을 구합니다.",
      es: "Introduce dos puntos y calcula la pendiente, la ordenada al origen y la ecuación en forma pendiente-intersección, punto-pendiente y general.",
      fr: "Saisissez deux points pour calculer la pente, l’ordonnée à l’origine et l’équation sous forme réduite, point-pente et générale.",
      de: "Geben Sie zwei Punkte ein und berechnen Sie Steigung, y-Achsenabschnitt sowie Geradengleichung in Normal-, Punkt-Steigungs- und Standardform.",
      pt: "Digite dois pontos e calcule a inclinação, o intercepto em y e a equação nas formas inclinação-intercepto, ponto-inclinação e geral.",
      ru: "Введите две точки и найдите наклон, пересечение с осью y и уравнение в виде y = mx + b, точка-наклон и общем виде."
    }
  },
  {
    id: "lagrange-error-bound-calculator",
    category: "math",
    slugs: {
      en: "lagrange-error-bound-calculator",
      "zh-CN": "lagrange-wucha-jisuanqi",
      "zh-TW": "lagrange-wucha-jisuanqi",
      ja: "raguranju-gosa-kai-keisan",
      ko: "lagrange-ocha-gyesan-gi",
      es: "calculadora-cota-error-lagrange",
      fr: "calculateur-borne-erreur-lagrange",
      de: "lagrange-fehlergrenze-rechner",
      pt: "calculadora-cota-erro-lagrange",
      ru: "kalkulyator-granicy-oshibki-lagranzha"
    },
    titles: {
      en: "Lagrange Error Bound Calculator - Taylor Polynomial Error",
      "zh-CN": "拉格朗日误差界计算器",
      "zh-TW": "拉格朗日誤差界計算器",
      ja: "ラグランジュ誤差界計算機",
      ko: "라그랑주 오차 한계 계산기",
      es: "Calculadora de cota de error de Lagrange",
      fr: "Calculateur de borne d’erreur de Lagrange",
      de: "Rechner für die Lagrange-Fehlergrenze",
      pt: "Calculadora de cota de erro de Lagrange",
      ru: "Калькулятор границы ошибки Лагранжа"
    },
    descriptions: {
      en: "Calculate the Lagrange error bound for Taylor polynomial approximations. Instantly find the maximum truncation error with M, n, a, and x.",
      "zh-CN": "计算泰勒多项式近似的拉格朗日误差界，快速求出给定 M、n、a、x 下的最大截断误差。",
      "zh-TW": "計算泰勒多項式近似的拉格朗日誤差界，快速求出指定 M、n、a、x 下的最大截斷誤差。",
      ja: "テイラー多項式近似のラグランジュ誤差界を計算し、M、n、a、x から最大打ち切り誤差をすばやく求めます。",
      ko: "테일러 다항식 근사의 라그랑주 오차 한계를 계산하고 M, n, a, x로 최대 절단 오차를 빠르게 구합니다.",
      es: "Calcula la cota de error de Lagrange para aproximaciones con polinomios de Taylor y obtiene el error máximo con M, n, a y x.",
      fr: "Calculez la borne d’erreur de Lagrange pour les approximations par polynôme de Taylor et trouvez l’erreur maximale avec M, n, a et x.",
      de: "Berechnen Sie die Lagrange-Fehlergrenze für Taylor-Polynom-Approximationen und bestimmen Sie den maximalen Fehler mit M, n, a und x.",
      pt: "Calcule a cota de erro de Lagrange para aproximações por polinômios de Taylor e encontre o erro máximo com M, n, a e x.",
      ru: "Рассчитайте границу ошибки Лагранжа для аппроксимаций полиномом Тейлора и найдите максимальную погрешность по M, n, a и x."
    }
  },
  {
    id: "lateral-area-trapezoidal-prism-calculator",
    category: "math",
    slugs: {
      en: "lateral-area-trapezoidal-prism-calculator",
      "zh-CN": "tixingzhu-cemianji-jisuanqi",
      "zh-TW": "tixingzhu-cemianji-jisuanqi",
      ja: "daikeichu-sokumenseki-keisanki",
      ko: "sadeungbyeongmyeonche-cheukmyeonjeok-gyesangi",
      es: "calculadora-area-lateral-prisma-trapezoidal",
      fr: "calculateur-aire-laterale-prisme-trapezoidal",
      de: "mantelflaeche-trapezprisma-rechner",
      pt: "calculadora-area-lateral-prisma-trapezoidal",
      ru: "kalkulyator-bokovoy-ploshchadi-trapecoidalnoy-prizmy"
    },
    titles: {
      en: "Lateral Area of Trapezoidal Prism Calculator",
      "zh-CN": "梯形柱侧面积计算器",
      "zh-TW": "梯形柱側面積計算器",
      ja: "台形柱の側面積計算機",
      ko: "사다리꼴 각기둥 측면적 계산기",
      es: "Calculadora de área lateral de prisma trapezoidal",
      fr: "Calculateur d'aire latérale d'un prisme trapézoïdal",
      de: "Mantelfläche eines Trapezprismas berechnen",
      pt: "Calculadora de área lateral de prisma trapezoidal",
      ru: "Калькулятор боковой площади трапецеидальной призмы"
    },
    descriptions: {
      en: "Calculate the lateral surface area of a trapezoidal prism. Enter bases, non-parallel sides, and prism height for instant results with formula.",
      "zh-CN": "计算梯形柱的侧表面积。输入两个底边、两条非平行边和柱高，即可按公式快速得到结果。",
      "zh-TW": "計算梯形柱的側表面積。輸入兩個底邊、兩條非平行邊與柱高，即可依公式快速取得結果。",
      ja: "台形柱の側面積を計算します。2つの底辺、2つの斜辺、柱の高さを入力すると、公式で即座に結果を表示します。",
      ko: "사다리꼴 각기둥의 측면적을 계산합니다. 두 밑변, 두 빗변, 각기둥 높이를 입력하면 공식으로 즉시 결과를 확인할 수 있습니다.",
      es: "Calcula el área lateral de un prisma trapezoidal. Ingresa bases, lados no paralelos y altura del prisma para obtener el resultado con fórmula.",
      fr: "Calculez l'aire latérale d'un prisme trapézoïdal. Saisissez bases, côtés non parallèles et hauteur du prisme pour un résultat instantané.",
      de: "Berechnen Sie die Mantelfläche eines Trapezprismas. Basen, nicht parallele Seiten und Prismenhöhe eingeben und sofort das Ergebnis erhalten.",
      pt: "Calcule a área lateral de um prisma trapezoidal. Informe bases, lados não paralelos e altura do prisma para obter o resultado com fórmula.",
      ru: "Рассчитайте боковую поверхность трапецеидальной призмы. Введите основания, боковые стороны и высоту призмы для мгновенного результата."
    }
  },
  {
    id: "latus-rectum-calculator",
    category: "math",
    slugs: {
      en: "latus-rectum-calculator",
      "zh-CN": "tongjing-jisuanqi",
      "zh-TW": "tongjing-ji-suan-qi",
      ja: "tsuukei-keisan-ki",
      ko: "tong-gyeong-gyesangi",
      es: "calculadora-lado-recto",
      fr: "calculateur-latus-rectum",
      de: "latus-rectum-rechner",
      pt: "calculadora-latus-rectum",
      ru: "kalkulyator-latus-rectum"
    },
    titles: {
      en: "Latus Rectum Calculator - Parabola, Ellipse, Hyperbola",
      "zh-CN": "通径计算器 - 抛物线、椭圆、双曲线",
      "zh-TW": "通徑計算器 - 拋物線、橢圓、雙曲線",
      ja: "通径計算機 - 放物線・楕円・双曲線",
      ko: "통경 계산기 - 포물선, 타원, 쌍곡선",
      es: "Calculadora de lado recto - Parábola, elipse e hipérbola",
      fr: "Calculateur du latus rectum - Parabole, ellipse et hyperbole",
      de: "Latus-Rectum-Rechner - Parabel, Ellipse, Hyperbel",
      pt: "Calculadora do latus rectum - Parábola, elipse e hipérbole",
      ru: "Калькулятор латус-ректума — парабола, эллипс, гипербола"
    },
    descriptions: {
      en: "Find the latus rectum length for any conic section. Supports parabola (4p), ellipse, and hyperbola (2b²/a) with instant formula results.",
      "zh-CN": "快速计算任意二次曲线的通径长度。支持抛物线（4p）、椭圆和双曲线（2b²/a），即时给出公式结果。",
      "zh-TW": "快速計算任何二次曲線的通徑長度。支援拋物線（4p）、橢圓與雙曲線（2b²/a），即時顯示公式結果。",
      ja: "あらゆる円錐曲線の通径の長さを計算します。放物線（4p）、楕円、双曲線（2b²/a）に対応し、式の結果を即表示します。",
      ko: "모든 원뿔곡선의 통경 길이를 계산합니다. 포물선(4p), 타원, 쌍곡선(2b²/a)을 지원하며 즉시 공식을 보여줍니다.",
      es: "Calcula al instante la longitud del lado recto de cualquier cónica. Compatible con parábola (4p), elipse e hipérbola (2b²/a).",
      fr: "Calculez instantanément la longueur du latus rectum pour toute conique. Prend en charge la parabole (4p), l’ellipse et l’hyperbole (2b²/a).",
      de: "Berechnen Sie die Länge des Latus rectum jeder Kegelschnittfigur sofort. Unterstützt Parabel (4p), Ellipse und Hyperbel (2b²/a).",
      pt: "Calcule instantaneamente o comprimento do latus rectum de qualquer cônica. Suporta parábola (4p), elipse e hipérbole (2b²/a).",
      ru: "Мгновенно вычисляйте длину латус-ректума для любой коники. Поддерживает параболу (4p), эллипс и гиперболу (2b²/a)."
    }
  },
  {
    id: "law-of-cosines-calculator",
    category: "math",
    slugs: {
      en: "law-of-cosines-calculator",
      "zh-CN": "yu-xian-ding-li-ji-suan-qi",
      "zh-TW": "yu-xian-ding-li-ji-suan-qi",
      ja: "yogen-teiri-keisan-ki",
      ko: "kosain-beobchik-gyesan-gi",
      es: "calculadora-ley-cosenos",
      fr: "calculateur-loi-cosinus",
      de: "kosinussatz-rechner",
      pt: "calculadora-lei-dos-cossenos",
      ru: "kalkulyator-teoremy-kosinusov"
    },
    titles: {
      en: "Law of Cosines Calculator - Solve Any Triangle (SAS/SSS)",
      "zh-CN": "余弦定理计算器",
      "zh-TW": "餘弦定理計算機",
      ja: "余弦定理計算機",
      ko: "코사인 법칙 계산기",
      es: "Calculadora de la ley de cosenos",
      fr: "Calculateur de la loi des cosinus",
      de: "Kosinussatz-Rechner",
      pt: "Calculadora da Lei dos Cossenos",
      ru: "Калькулятор теоремы косинусов"
    },
    descriptions: {
      en: "Solve any triangle using the law of cosines. Find a missing side (SAS) or a missing angle (SSS) instantly with formula verification.",
      "zh-CN": "使用余弦定理求解任意三角形，立即计算未知边（SAS）或未知角（SSS），并核对公式。",
      "zh-TW": "使用餘弦定理解任意三角形，立即求未知邊（SAS）或未知角（SSS），並可核對公式。",
      ja: "余弦定理で任意の三角形を解き、未知の辺（SAS）や角（SSS）をすぐに求め、式も確認できます。",
      ko: "코사인 법칙으로 임의의 삼각형을 풀어 보세요. SAS의 변이나 SSS의 각을 즉시 구하고 식도 확인할 수 있습니다.",
      es: "Resuelve cualquier triángulo con la ley de cosenos. Calcula un lado faltante (SAS) o un ángulo (SSS) y verifica la fórmula.",
      fr: "Résolvez n’importe quel triangle avec la loi des cosinus. Trouvez un côté manquant (SAS) ou un angle (SSS) et vérifiez la formule.",
      de: "Löse beliebige Dreiecke mit dem Kosinussatz. Finde eine fehlende Seite (SAS) oder einen fehlenden Winkel (SSS) und prüfe die Formel.",
      pt: "Resolva qualquer triângulo com a lei dos cossenos. Encontre um lado faltante (SAS) ou um ângulo (SSS) e confira a fórmula.",
      ru: "Решайте любые треугольники по теореме косинусов. Найдите неизвестную сторону (SAS) или угол (SSS) и проверьте формулу."
    }
  },
  {
    id: "law-of-sines-calculator",
    category: "math",
    slugs: {
      en: "law-of-sines-calculator",
      "zh-CN": "zhengxian-dingli-jisuanqi",
      "zh-TW": "zhengxian-dingli-jisuanqi",
      ja: "sinho-otei-keisanki",
      ko: "sain-beobchik-gyesangi",
      es: "calculadora-ley-de-senos",
      fr: "calculateur-loi-des-sinus",
      de: "sinussatz-rechner",
      pt: "calculadora-lei-dos-senos",
      ru: "kalkulyator-zakona-sinusov"
    },
    titles: {
      en: "Law of Sines Calculator - Solve Triangles (AAS, ASA, SSA)",
      "zh-CN": "正弦定理计算器 - 解三角形（AAS、ASA、SSA）",
      "zh-TW": "正弦定理計算器 - 解三角形（AAS、ASA、SSA）",
      ja: "正弦定理計算機 - 三角形を解く（AAS、ASA、SSA）",
      ko: "사인 법칙 계산기 - 삼각형 풀이 (AAS, ASA, SSA)",
      es: "Calculadora de la ley de senos - Triángulos",
      fr: "Calculateur de loi des sinus - Triangles",
      de: "Sinussatz-Rechner - Dreiecke lösen",
      pt: "Calculadora da lei dos senos - Triângulos",
      ru: "Калькулятор теоремы синусов - Треугольники"
    },
    descriptions: {
      en: "Solve triangles with the law of sines for AAS, ASA, and SSA cases. Handles the ambiguous SSA case automatically. Get all sides and angles.",
      "zh-CN": "使用正弦定理解 AAS、ASA 和 SSA 三角形，自动处理 SSA 的歧义情况，获取全部边和角。",
      "zh-TW": "使用正弦定理解 AAS、ASA 與 SSA 三角形，自動處理 SSA 歧義情況，取得所有邊和角。",
      ja: "正弦定理で AAS、ASA、SSA の三角形を解き、SSA の曖昧な場合も自動処理して全ての辺と角を求めます。",
      ko: "사인 법칙으로 AAS, ASA, SSA 삼각형을 풀고 SSA의 애매한 경우도 자동 처리해 모든 변과 각을 구합니다.",
      es: "Resuelve triángulos con la ley de senos en casos AAS, ASA y SSA, y maneja automáticamente la ambigüedad del SSA.",
      fr: "Résolvez des triangles avec la loi des sinus pour les cas AAS, ASA et SSA, avec gestion automatique du cas ambigu SSA.",
      de: "Dreiecke mit dem Sinussatz für AAS, ASA und SSA lösen, einschließlich des automatischen Umgangs mit dem SSA-Fall.",
      pt: "Resolva triângulos com a lei dos senos nos casos AAS, ASA e SSA, com tratamento automático do caso ambíguo SSA.",
      ru: "Решайте треугольники по теореме синусов для случаев AAS, ASA и SSA с автоматической обработкой неоднозначного SSA."
    }
  },
  {
    id: "gram-schmidt-calculator",
    category: "math",
    slugs: {
      en: "gram-schmidt-calculator",
      "zh-CN": "gram-schmidt-zhengjiaohua-jisuanqi",
      "zh-TW": "gram-schmidt-zhengjiaohua-jisuanqi",
      ja: "gram-schmidt-seikou-kaisanki",
      ko: "geuram-syumeuteu-jeonggyojihwa-gyesan-gi",
      es: "calculadora-ortogonalizacion-gram-schmidt",
      fr: "calculatrice-orthogonalisation-gram-schmidt",
      de: "gram-schmidt-orthogonalisierung-rechner",
      pt: "calculadora-ortogonalizacao-gram-schmidt",
      ru: "kalkulyator-ortogonalizacii-grama-shmidta"
    },
    titles: {
      en: "Gram-Schmidt Orthogonalization Calculator",
      "zh-CN": "Gram-Schmidt 正交化计算器",
      "zh-TW": "Gram-Schmidt 正交化計算器",
      ja: "Gram-Schmidt 正規直交化計算機",
      ko: "Gram-Schmidt 정규직교화 계산기",
      es: "Calculadora de ortogonalización Gram-Schmidt",
      fr: "Calculatrice d’orthogonalisation de Gram-Schmidt",
      de: "Gram-Schmidt-Orthogonalisierungsrechner",
      pt: "Calculadora de ortogonalização de Gram-Schmidt",
      ru: "Калькулятор ортогонализации Грама-Шмидта"
    },
    descriptions: {
      en: "Gram-Schmidt calculator converts linearly independent vectors into an orthogonal and orthonormal basis. Handles any dimension and dependent vectors.",
      "zh-CN": "将线性无关向量转换为正交或标准正交基，支持任意维度并可处理线性相关向量。",
      "zh-TW": "將線性獨立向量轉換為正交或正交規一基底，支援任意維度並可處理線性相依向量。",
      ja: "線形独立なベクトルを正規直交基底に変換します。任意の次元に対応し、線形従属ベクトルも処理できます。",
      ko: "선형 독립 벡터를 정규직교 기저로 변환합니다. 어떤 차원도 지원하며 선형 종속 벡터도 처리합니다.",
      es: "Convierte vectores linealmente independientes en una base ortogonal u ortonormal. Admite cualquier dimensión y vectores dependientes.",
      fr: "Transforme des vecteurs linéairement indépendants en base orthogonale ou orthonormale. Gère toute dimension et les vecteurs dépendants.",
      de: "Wandelt linear unabhängige Vektoren in eine orthogonale oder orthonormale Basis um. Unterstützt beliebige Dimensionen und abhängige Vektoren.",
      pt: "Converte vetores linearmente independentes em base ortogonal ou ortonormal. Suporta qualquer dimensão e vetores dependentes.",
      ru: "Преобразует линейно независимые векторы в ортогональный или ортонормированный базис. Поддерживает любую размерность и зависимые векторы."
    }
  },
  {
    id: "graphing-inequalities-on-a-number-line-calculator",
    category: "math",
    slugs: {
      en: "graphing-inequalities-on-a-number-line-calculator",
      "zh-CN": "shuxian-budengshi-jisuanqi",
      "zh-TW": "shuxian-budengshi-jisuanqi",
      ja: "sujisen-futoushiki-gurafu-keisanki",
      ko: "sujiseon-budeungshik-geuraep-gyesangi",
      es: "calculadora-desigualdades-recta-numerica",
      fr: "calculatrice-inegalites-droite-graduee",
      de: "ungleichungen-zahlenstrahl-rechner",
      pt: "calculadora-inequacoes-reta-numerica",
      ru: "kalkulyator-neravenstv-chislovoy-pryamoy"
    },
    titles: {
      en: "Graphing Inequalities on a Number Line Calculator",
      "zh-CN": "数轴不等式作图计算器",
      "zh-TW": "數線不等式作圖計算器",
      ja: "数直線の不等式グラフ計算機",
      ko: "수직선 부등식 그래프 계산기",
      es: "Calculadora de desigualdades en la recta numérica",
      fr: "Calculatrice d’inégalités sur une droite graduée",
      de: "Ungleichungen auf dem Zahlenstrahl",
      pt: "Calculadora de inequações na reta numérica",
      ru: "Калькулятор неравенств на числовой прямой"
    },
    descriptions: {
      en: "Number line inequality calculator that graphs simple and compound inequalities with open/closed circles, shading direction, and interval notation instantly.",
      "zh-CN": "数轴不等式计算器，可即时绘制简单与复合不等式，显示空心/实心圆、阴影方向和区间表示。",
      "zh-TW": "數線不等式計算器，可即時繪製簡單與複合不等式，顯示空心/實心圓、陰影方向和區間表示。",
      ja: "単純・合成不等式を数直線に即表示。白丸/黒丸、塗りつぶし方向、区間表記まで確認できます。",
      ko: "단순·복합 부등식을 수직선에 즉시 표시합니다. 빈 원/채운 원, 음영 방향, 구간 표기를 모두 확인하세요.",
      es: "Calculadora de desigualdades en la recta numérica que grafica desigualdades simples y compuestas con círculos y notación de intervalos.",
      fr: "Calculatrice d’inégalités sur une droite graduée qui trace les inégalités simples et composées avec cercles et notation d’intervalle.",
      de: "Rechner für Ungleichungen auf dem Zahlenstrahl mit offenen/geschlossenen Kreisen, Schattierungsrichtung und Intervallschreibweise.",
      pt: "Calculadora de inequações na reta numérica que grafa inequações simples e compostas com círculos e notação de intervalos.",
      ru: "Калькулятор неравенств на числовой прямой, который строит простые и составные неравенства с кругами и интервальной записью."
    }
  },
  {
    id: "graphing-quadratic-inequalities-calculator",
    category: "math",
    slugs: {
      en: "graphing-quadratic-inequalities-calculator",
      "zh-CN": "er-ci-bu-deng-shi-hui-tu-ji-suan-qi",
      "zh-TW": "er-ci-bu-deng-shi-hui-tu-ji-suan-qi",
      ja: "niji-futoshiki-gurafu-keisan-ki",
      ko: "i-cha-budengsik-geurapeu-gyesangi",
      es: "calculadora-inecuaciones-cuadraticas-grafica",
      fr: "calculatrice-inequations-quadratiques-graphique",
      de: "quadratische-ungleichungen-rechner-grafik",
      pt: "calculadora-inequacoes-quadraticas-grafico",
      ru: "kalkulyator-kvadratnyh-neravenstv-grafik"
    },
    titles: {
      en: "Graphing Quadratic Inequalities Calculator",
      "zh-CN": "二次不等式绘图计算器",
      "zh-TW": "二次不等式繪圖計算機",
      ja: "二次不等式グラフ計算機",
      ko: "이차부등식 그래프 계산기",
      es: "Calculadora de inecuaciones cuadráticas",
      fr: "Calculatrice d’inéquations quadratiques",
      de: "Rechner für quadratische Ungleichungen",
      pt: "Calculadora de inequações quadráticas",
      ru: "Калькулятор квадратных неравенств"
    },
    descriptions: {
      en: "Quadratic inequalities calculator: enter a, b, c and sign to get roots, discriminant, vertex, parabola direction, and solution set in interval notation.",
      "zh-CN": "二次不等式计算器：输入 a、b、c 和符号，获取根、判别式、顶点、抛物线方向与区间解集。",
      "zh-TW": "二次不等式計算機：輸入 a、b、c 和符號，取得根、判別式、頂點、拋物線方向與區間解集。",
      ja: "二次不等式計算機。a、b、c と符号を入力すると、解、判別式、頂点、放物線の向き、区間表示の解集合を表示します。",
      ko: "이차부등식 계산기: a, b, c와 부등호를 입력하면 근, 판별식, 꼭짓점, 포물선 방향, 구간 해집합을 보여줍니다.",
      es: "Calculadora de inecuaciones cuadráticas: ingresa a, b, c y el signo para ver raíces, discriminante, vértice, dirección y solución en intervalos.",
      fr: "Calculatrice d’inéquations quadratiques : saisissez a, b, c et le signe pour obtenir racines, discriminant, sommet, sens et solution en intervalles.",
      de: "Quadratische-Ungleichungen-Rechner: a, b, c und das Zeichen eingeben und Nullstellen, Diskriminante, Scheitel, Richtung und Intervalllösung erhalten.",
      pt: "Calculadora de inequações quadráticas: informe a, b, c e o sinal para obter raízes, discriminante, vértice, direção e solução em intervalos.",
      ru: "Калькулятор квадратных неравенств: введите a, b, c и знак, чтобы получить корни, дискриминант, вершину, направление и решение в интервалах."
    }
  },
  {
    id: "great-circle-calculator",
    category: "math",
    slugs: {
      en: "great-circle-calculator",
      "zh-CN": "da-yuan-ju-li-ji-suan-qi",
      "zh-TW": "da-yuan-ju-li-ji-suan-qi",
      ja: "daien-kyori-keisanki",
      ko: "daeweon-geori-gyesangi",
      es: "calculadora-distancia-gran-circulo",
      fr: "calculateur-distance-grand-cercle",
      de: "grosskreis-entfernung-rechner",
      pt: "calculadora-distancia-grande-circulo",
      ru: "kalkulyator-rasstoyaniya-bolshogo-kruga"
    },
    titles: {
      en: "Great Circle Calculator - Shortest Earth Distance",
      "zh-CN": "大圆距离计算器 - 两点间最短地表距离",
      "zh-TW": "大圓距離計算器 - 兩點間最短地表距離",
      ja: "大圏距離計算機 - 地球上の最短距離",
      ko: "대권 거리 계산기 - 지구상 최단 거리",
      es: "Calculadora de gran círculo - distancia mínima",
      fr: "Calculateur de grand cercle - distance la plus courte",
      de: "Großkreis-Entfernungsrechner - kürzeste Erddistanz",
      pt: "Calculadora de grande círculo - menor distância",
      ru: "Калькулятор большого круга - кратчайшее расстояние"
    },
    descriptions: {
      en: "Great circle distance calculator using the Haversine formula. Enter two lat/lon coordinates to get surface distance in km, miles, or nautical miles.",
      "zh-CN": "使用 Haversine 公式计算大圆距离。输入两组经纬度，获取公里、英里或海里的地表距离。",
      "zh-TW": "使用 Haversine 公式計算大圓距離。輸入兩組經緯度，取得公里、英里或海里的地表距離。",
      ja: "Haversine 公式で大圏距離を計算。2組の緯度・経度を入力し、km、マイル、海里で地表距離を取得できます。",
      ko: "Haversine 공식으로 대권 거리를 계산합니다. 두 위도/경도 좌표를 입력해 km, 마일, 해리 단위의 지표 거리를 확인하세요.",
      es: "Calcula la distancia de gran círculo con la fórmula de Haversine. Ingresa dos coordenadas lat/lon y obtén km, millas o millas náuticas.",
      fr: "Calculez la distance de grand cercle avec la formule de Haversine. Entrez deux coordonnées lat/lon pour obtenir km, miles ou milles nautiques.",
      de: "Berechne Großkreisentfernungen mit der Haversine-Formel. Gib zwei Lat/Lon-Koordinaten ein und erhalte km, Meilen oder Seemeilen.",
      pt: "Calcule a distância de grande círculo com a fórmula de Haversine. Informe duas coordenadas lat/lon e veja km, milhas ou milhas náuticas.",
      ru: "Расчет расстояния большого круга по формуле гаверсинусов. Введите две пары широты/долготы и получите км, мили или морские мили."
    }
  },
  {
    id: "greater-than-or-less-than-calculator",
    category: "math",
    slugs: {
      en: "greater-than-or-less-than-calculator",
      "zh-CN": "dayu-huo-xiaoyu-jisuanqi",
      "zh-TW": "dayu-huo-xiaoyu-jisuanqi",
      ja: "dainyorimo-sukunai-keisanki",
      ko: "keugeona-jageun-su-gyesangi",
      es: "calculadora-mayor-o-menor",
      fr: "calculateur-plus-grand-ou-plus-petit",
      de: "groesser-oder-kleiner-rechner",
      pt: "calculadora-maior-ou-menor",
      ru: "kalkulyator-bolshe-ili-menshe"
    },
    titles: {
      en: "Greater Than or Less Than Calculator",
      "zh-CN": "大于或小于计算器",
      "zh-TW": "大於或小於計算器",
      ja: "大小比較計算機",
      ko: "크거나 작은 수 계산기",
      es: "Calculadora de mayor o menor",
      fr: "Calculateur plus grand ou plus petit",
      de: "Größer-oder-kleiner-Rechner",
      pt: "Calculadora de maior ou menor",
      ru: "Калькулятор больше или меньше"
    },
    descriptions: {
      en: "Greater than or less than calculator to compare any two numbers — integers, decimals, or negatives — and instantly display the correct symbol >, <, or =.",
      "zh-CN": "大于或小于计算器可比较任意两个数（整数、小数或负数），并立即显示正确符号 >、< 或 =。",
      "zh-TW": "大於或小於計算器可比較任意兩個數（整數、小數或負數），並立即顯示正確符號 >、< 或 =。",
      ja: "任意の2つの数（整数・小数・負の数）を比較し、正しい記号 >、<、= をすぐに表示します。",
      ko: "두 수를 비교해 정수, 소수, 음수도 바로 >, <, = 기호로 보여주는 계산기입니다.",
      es: "Calculadora para comparar dos números — enteros, decimales o negativos — y mostrar al instante >, < o =.",
      fr: "Calculateur pour comparer deux nombres — entiers, décimaux ou négatifs — et afficher instantanément >, < ou =.",
      de: "Rechner zum Vergleichen zweier Zahlen — ganze Zahlen, Dezimalzahlen oder negative Zahlen — mit sofortigem >, < oder =.",
      pt: "Calculadora para comparar dois números — inteiros, decimais ou negativos — e mostrar instantaneamente >, < ou =.",
      ru: "Калькулятор для сравнения двух чисел — целых, десятичных или отрицательных — и мгновенного отображения >, < или =."
    }
  },
  {
    id: "equation-of-a-circle-calculator",
    category: "math",
    slugs: {
      en: "equation-of-a-circle-calculator",
      "zh-CN": "yuan-de-fangcheng-jisuanqi",
      "zh-TW": "yuan-de-fangcheng-jisuanqi",
      ja: "en-no-houteishiki-keisanki",
      ko: "won-ui-bangjeongsik-gyesangi",
      es: "calculadora-ecuacion-circulo",
      fr: "calculatrice-equation-cercle",
      de: "kreisgleichung-rechner",
      pt: "calculadora-equacao-circulo",
      ru: "uravnenie-okruzhnosti-kalkulyator"
    },
    titles: {
      en: "Equation of a Circle Calculator",
      "zh-CN": "圆的方程计算器",
      "zh-TW": "圓的方程計算器",
      ja: "円の方程式計算機",
      ko: "원의 방정식 계산기",
      es: "Calculadora de ecuación de la circunferencia",
      fr: "Calculatrice d’équation de cercle",
      de: "Kreisgleichung-Rechner",
      pt: "Calculadora da equação do círculo",
      ru: "Калькулятор уравнения окружности"
    },
    descriptions: {
      en: "Generate circle equations in standard and general forms from center and radius. Calculate area and circumference instantly.",
      "zh-CN": "根据圆心和半径快速生成圆的标准式和一般式方程，并即时计算面积与周长。",
      "zh-TW": "根據圓心與半徑快速產生圓的標準式與一般式方程，並即時計算面積與周長。",
      ja: "中心と半径から、円の標準形と一般形をすばやく生成し、面積と円周も即座に計算します。",
      ko: "중심과 반지름으로 원의 표준형과 일반형을 빠르게 만들고, 넓이와 둘레도 바로 계산합니다.",
      es: "Genera al instante ecuaciones de la circunferencia en forma estándar y general a partir del centro y el radio. Calcula área y perímetro.",
      fr: "Générez instantanément les équations d’un cercle sous forme standard et générale à partir du centre et du rayon. Calculez aire et circonférence.",
      de: "Erzeugen Sie Kreisgleichungen in Standard- und Allgemeinform direkt aus Mittelpunkt und Radius. Flächeninhalt und Umfang sofort berechnen.",
      pt: "Gere equações do círculo nas formas padrão e geral a partir do centro e do raio. Calcule área e circunferência instantaneamente.",
      ru: "Быстро получайте уравнение окружности в стандартном и общем виде по центру и радиусу. Мгновенно считайте площадь и длину окружности."
    }
  },
  {
    id: "equation-of-a-sphere-calculator",
    category: "math",
    slugs: {
      en: "equation-of-a-sphere-calculator",
      "zh-CN": "qiu-mian-fang-cheng-ji-suan-qi",
      "zh-TW": "qiu-mian-fang-cheng-ji-suan-qi",
      ja: "kyumen-hoteishiki-keisanki",
      ko: "guui-bangjeongsik-gyesangi",
      es: "calculadora-ecuacion-esfera",
      fr: "calculateur-equation-sphere",
      de: "kugelgleichung-rechner",
      pt: "calculadora-equacao-esfera",
      ru: "kalkulyator-uravneniya-sfery"
    },
    titles: {
      en: "Equation of a Sphere Calculator",
      "zh-CN": "球面方程计算器",
      "zh-TW": "球面方程計算器",
      ja: "球面の方程式計算機",
      ko: "구의 방정식 계산기",
      es: "Calculadora de ecuación de una esfera",
      fr: "Calculateur d’équation de sphère",
      de: "Kugelgleichung Rechner",
      pt: "Calculadora de equação da esfera",
      ru: "Калькулятор уравнения сферы"
    },
    descriptions: {
      en: "Generate 3D sphere equations in standard form from center coordinates and radius with correct sign handling and expanded form.",
      "zh-CN": "根据球心坐标和半径生成三维球面的标准方程，自动处理正负号并给出展开式。",
      "zh-TW": "依球心座標與半徑產生三維球面的標準方程，自動處理正負號並提供展開式。",
      ja: "中心座標と半径から3D球面の標準形を生成し、符号処理と展開形も正しく表示します。",
      ko: "중심 좌표와 반지름으로 3D 구의 표준형 방정식을 만들고 부호 처리와 전개형을 정확히 표시합니다.",
      es: "Genera ecuaciones 3D de esferas en forma estándar desde centro y radio, con signos correctos y forma expandida.",
      fr: "Générez l’équation 3D d’une sphère en forme standard depuis le centre et le rayon, avec signes corrects et forme développée.",
      de: "Erzeuge 3D-Kugelgleichungen in Standardform aus Mittelpunkt und Radius, mit korrekten Vorzeichen und erweiterter Form.",
      pt: "Gere equações 3D de esferas na forma padrão a partir do centro e raio, com sinais corretos e forma expandida.",
      ru: "Стройте 3D-уравнение сферы в стандартной форме по центру и радиусу с верными знаками и развернутой формой."
    }
  },
  {
    id: "equilateral-triangle-calculator",
    category: "math",
    slugs: {
      en: "equilateral-triangle-calculator",
      "zh-CN": "dengbian-sanjiaoxing-jisuanqi",
      "zh-TW": "dengbian-sanjiaoxing-jisuanqi",
      ja: "seisankakkei-keisanki",
      ko: "jeongsamgakhyeong-gyesangi",
      es: "calculadora-triangulo-equilatero",
      fr: "calculatrice-triangle-equilateral",
      de: "gleichseitiges-dreieck-rechner",
      pt: "calculadora-triangulo-equilatero",
      ru: "kalkulyator-ravnostoronnego-treugolnika"
    },
    titles: {
      en: "Equilateral Triangle Calculator - Area, Perimeter & Height",
      "zh-CN": "等边三角形计算器",
      "zh-TW": "等邊三角形計算器",
      ja: "正三角形計算機",
      ko: "정삼각형 계산기",
      es: "Calculadora de triángulo equilátero",
      fr: "Calculatrice de triangle équilatéral",
      de: "Rechner für gleichseitige Dreiecke",
      pt: "Calculadora de triângulo equilátero",
      ru: "Калькулятор равностороннего треугольника"
    },
    descriptions: {
      en: "Calculate area, perimeter, height, inradius, and circumradius of any equilateral triangle from side length using exact formulas.",
      "zh-CN": "根据边长，使用精确公式计算任意等边三角形的面积、周长、高、内切圆半径和外接圆半径。",
      "zh-TW": "根據邊長，使用精確公式計算任意等邊三角形的面積、周長、高、內切圓半徑和外接圓半徑。",
      ja: "辺の長さから、正三角形の面積・周長・高さ・内接円半径・外接円半径を厳密な式で計算します。",
      ko: "변의 길이로 정삼각형의 넓이, 둘레, 높이, 내접원 반지름, 외접원 반지름을 정확한 공식으로 계산합니다.",
      es: "Calcula el área, perímetro, altura, inradio y circunradio de cualquier triángulo equilátero a partir del lado con fórmulas exactas.",
      fr: "Calculez l’aire, le périmètre, la hauteur, le rayon inscrit et le rayon circonscrit d’un triangle équilatéral à partir du côté.",
      de: "Berechnen Sie Fläche, Umfang, Höhe, Inkreisradius und Umkreisradius eines gleichseitigen Dreiecks aus der Seitenlänge mit exakten Formeln.",
      pt: "Calcule a área, o perímetro, a altura, o raio da incircunferência e o raio da circunferência circunscrita de qualquer triângulo equilátero.",
      ru: "Вычисляйте площадь, периметр, высоту, радиус вписанной и описанной окружности равностороннего треугольника по стороне."
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
      "zh-CN": "tiaohe-shu-jisuanqi",
      "zh-TW": "tiaohe-shu-jisuanqi",
      ja: "harumonikku-suu-keisanki",
      ko: "johwasu-gyesangi",
      es: "calculadora-numero-armonico",
      fr: "calculateur-nombre-harmonique",
      de: "harmonische-zahl-rechner",
      pt: "calculadora-numero-harmonico",
      ru: "garmonicheskii-kalkulyator-chisel"
    },
    titles: {
      en: "Harmonic Number Calculator",
      "zh-CN": "调和数计算器",
      "zh-TW": "調和數計算器",
      ja: "調和数計算機",
      ko: "조화수 계산기",
      es: "Calculadora de número armónico",
      fr: "Calculateur de nombre harmonique",
      de: "Rechner für harmonische Zahlen",
      pt: "Calculadora de número harmônico",
      ru: "Калькулятор гармонического числа"
    },
    descriptions: {
      en: "Harmonic number calculator sums H_n term by term, with optional series breakdown and logarithmic approximation for analysis, number theory, and bounds.",
      "zh-CN": "调和数计算器按项求和 H_n，可选显示展开过程与对数近似，适用于分析、数论和界限研究。",
      "zh-TW": "調和數計算器逐項加總 H_n，可選顯示展開過程與對數近似，適合分析、數論與界限研究。",
      ja: "調和数計算機は H_n を項ごとに求め、展開表示と対数近似にも対応。解析、数論、評価の確認に便利です。",
      ko: "조화수 계산기는 H_n을 항별로 계산하고, 전개와 로그 근사도 제공합니다. 해석학, 수론, 분석에 유용합니다.",
      es: "Calcula H_n término a término, con desglose opcional y aproximación logarítmica para análisis, teoría de números y cotas.",
      fr: "Calcule H_n terme par terme, avec décomposition optionnelle et approximation logarithmique pour l’analyse, la théorie des nombres et les bornes.",
      de: "Berechnet H_n termweise mit optionaler Aufschlüsselung und logarithmischer Näherung für Analyse, Zahlentheorie und Schranken.",
      pt: "Calcula H_n termo a termo, com decomposição opcional e aproximação logarítmica para análise, teoria dos números e limites.",
      ru: "Суммирует H_n по членам, с необязательным разбором и логарифмической аппроксимацией для анализа, теории чисел и оценок."
    }
  },
  {
    id: "herons-formula-calculator",
    category: "math",
    slugs: {
      en: "herons-formula-calculator",
      "zh-CN": "hailun-gongshi-jisuanqi",
      "zh-TW": "hailun-gongshi-jisuanqi",
      ja: "heron-no-sankakkei-menseki-keisan",
      ko: "heron-gongsig-samgak-hyeong-myeonjeok-gyesan-gi",
      es: "calculadora-formula-heron",
      fr: "calculatrice-formule-heron",
      de: "herons-formel-rechner",
      pt: "calculadora-formula-heron",
      ru: "kalkulyator-formuly-gerona"
    },
    titles: {
      en: "Heron's Formula Calculator",
      "zh-CN": "海伦公式计算器",
      "zh-TW": "海龍公式計算器",
      ja: "ヘロンの公式計算機",
      ko: "헤론 공식 삼각형 면적 계산기",
      es: "Calculadora de fórmula de Herón",
      fr: "Calculatrice de formule de Héron",
      de: "Herons-Formel-Rechner",
      pt: "Calculadora da fórmula de Heron",
      ru: "Калькулятор формулы Герона"
    },
    descriptions: {
      en: "Heron's formula calculator finds triangle area from three side lengths, checks triangle validity, and returns area, perimeter, and semi-perimeter.",
      "zh-CN": "用海伦公式根据三边求三角形面积，并校验三角形有效性，同时显示周长和半周长。",
      "zh-TW": "用海龍公式依三邊求三角形面積，並檢查三角形有效性，同時顯示周長與半周長。",
      ja: "3辺からヘロンの公式で三角形の面積を求め、三角不等式を確認し、周長と半周長も表示します。",
      ko: "세 변으로 헤론 공식에 따라 삼각형 면적을 구하고, 삼각형 성립을 확인하며 둘레와 반둘레도 보여줍니다.",
      es: "Calcula el área de un triángulo con tres lados, valida la desigualdad triangular y muestra perímetro y semiperímetro.",
      fr: "Calculez l’aire d’un triangle à partir de ses trois côtés, vérifiez l’inégalité triangulaire et affichez périmètre et demi-périmètre.",
      de: "Berechnet die Dreiecksfläche aus drei Seiten, prüft die Dreiecksungleichung und zeigt Umfang sowie Halbumfang.",
      pt: "Calcula a área de um triângulo a partir de três lados, verifica a desigualdade triangular e mostra perímetro e semiperímetro.",
      ru: "Вычисляет площадь треугольника по трём сторонам, проверяет неравенство треугольника и показывает периметр и полупериметр."
    }
  },
  {
    id: "distributive-property-calculator",
    category: "math",
    slugs: {
      en: "distributive-property-calculator",
      "zh-CN": "fen-pei-lv-ji-suan-qi",
      "zh-TW": "fen-pei-lv-ji-suan-qi",
      ja: "bunpairitsu-keisanki",
      ko: "bunbaekbeopchik-gyesangi",
      es: "calculadora-propiedad-distributiva",
      fr: "calculatrice-propriete-distributive",
      de: "distributivgesetz-rechner",
      pt: "calculadora-propriedade-distributiva",
      ru: "kalkulyator-raspredelitelnogo-svoystva"
    },
    titles: {
      en: "Distributive Property Calculator - Expand Expressions",
      "zh-CN": "分配律计算器 - 展开代数表达式",
      "zh-TW": "分配律計算器 - 展開代數式",
      ja: "分配法則計算機 - 代数式を展開",
      ko: "분배법칙 계산기 - 대수식 전개",
      es: "Calculadora de propiedad distributiva",
      fr: "Calculatrice de distributivité",
      de: "Distributivgesetz-Rechner",
      pt: "Calculadora da propriedade distributiva",
      ru: "Калькулятор распределительного свойства"
    },
    descriptions: {
      en: "Expand algebraic expressions using the distributive property a(b+c)=ab+ac. Enter coefficient and terms to get instant step-by-step expansion results.",
      "zh-CN": "使用分配律 a(b+c)=ab+ac 展开代数表达式。输入系数和项，立即获得分步展开结果。",
      "zh-TW": "使用分配律 a(b+c)=ab+ac 展開代數式。輸入係數與項目，立即取得逐步展開結果。",
      ja: "分配法則 a(b+c)=ab+ac で代数式を展開。係数と項を入力すると、途中式付きの展開結果をすぐに表示します。",
      ko: "분배법칙 a(b+c)=ab+ac로 대수식을 전개하세요. 계수와 항을 입력하면 단계별 전개 결과를 즉시 확인할 수 있습니다.",
      es: "Expande expresiones algebraicas con la propiedad distributiva a(b+c)=ab+ac. Ingresa coeficiente y términos para ver pasos al instante.",
      fr: "Développez des expressions algébriques avec la distributivité a(b+c)=ab+ac. Saisissez coefficient et termes pour obtenir les étapes.",
      de: "Erweitere algebraische Ausdrücke mit dem Distributivgesetz a(b+c)=ab+ac. Koeffizient und Terme eingeben, Schritte sofort sehen.",
      pt: "Expanda expressões algébricas com a propriedade distributiva a(b+c)=ab+ac. Insira coeficiente e termos para ver os passos.",
      ru: "Раскрывайте алгебраические выражения по свойству a(b+c)=ab+ac. Введите коэффициент и слагаемые, чтобы увидеть шаги."
    }
  },
  {
    id: "dividing-exponents-calculator",
    category: "math",
    slugs: {
      en: "dividing-exponents-calculator",
      "zh-CN": "zhishu-chufa-jisuanqi",
      "zh-TW": "zhishu-chufa-jisuanqi",
      ja: "shisuu-warizan-keisanki",
      ko: "jisu-nanussem-gyesangi",
      es: "calculadora-division-exponentes",
      fr: "calculatrice-division-exposants",
      de: "exponenten-teilungsrechner",
      pt: "calculadora-divisao-expoentes",
      ru: "kalkulyator-deleniya-stepeney"
    },
    titles: {
      en: "Dividing Exponents Calculator - Quotient Rule a^m÷a^n",
      "zh-CN": "指数相除计算器",
      "zh-TW": "指數相除計算器",
      ja: "指数の割り算計算機",
      ko: "지수 나눗셈 계산기",
      es: "Calculadora de división de exponentes",
      fr: "Calculatrice de division d'exposants",
      de: "Exponenten-Teilungsrechner",
      pt: "Calculadora de divisão de expoentes",
      ru: "Калькулятор деления степеней"
    },
    descriptions: {
      en: "Apply the quotient rule to divide exponential expressions. Enter bases and exponents to get a^m÷a^n=a^(m-n) with step-by-step solutions and numeric results.",
      "zh-CN": "应用商法则化简指数表达式，输入底数和指数即可得到 a^m÷a^n=a^(m−n)，并查看分步结果和数值。",
      "zh-TW": "套用商法則化簡指數式，輸入底數與指數即可得到 a^m÷a^n=a^(m−n)，並查看步驟與數值結果。",
      ja: "商の法則で指数式を整理。底と指数を入力すると a^m÷a^n=a^(m−n) を手順つきで表示します。",
      ko: "지수의 몫의 법칙으로 식을 정리합니다. 밑과 지수를 입력하면 a^m÷a^n=a^(m−n)을 단계별로 보여줍니다.",
      es: "Aplica la regla del cociente para dividir expresiones exponenciales. Ingresa bases y exponentes para ver a^m÷a^n=a^(m−n) con pasos y resultados.",
      fr: "Applique la règle du quotient pour diviser des expressions exponentielles. Saisissez les bases et exposants pour voir a^m÷a^n=a^(m−n) avec étapes et résultats.",
      de: "Wende die Quotientenregel an, um Potenzterme zu teilen. Gib Basen und Exponenten ein und erhalte a^m÷a^n=a^(m−n) mit Schritten und Zahlenwerten.",
      pt: "Aplique a regra do quociente para dividir expressões exponenciais. Informe bases e expoentes para ver a^m÷a^n=a^(m−n) com passos e resultados.",
      ru: "Применяйте правило частного для деления степенных выражений. Введите основания и показатели, чтобы увидеть a^m÷a^n=a^(m−n) с шагами и числом."
    }
  },
  {
    id: "dividing-fractions-calculator",
    category: "math",
    slugs: {
      en: "dividing-fractions-calculator",
      "zh-CN": "fenshu-chufa-jisuanqi",
      "zh-TW": "fenshu-chufa-jisuanqi",
      ja: "bunsu-warizan-keisanki",
      ko: "bunsu-nanugi-gyesangi",
      es: "calculadora-division-fracciones",
      fr: "calculatrice-division-fractions",
      de: "bruchdivision-rechner",
      pt: "calculadora-divisao-fracoes",
      ru: "kalkulyator-deleniya-drobey"
    },
    titles: {
      en: "Dividing Fractions Calculator - Step-by-Step Solutions",
      "zh-CN": "分数除法计算器",
      "zh-TW": "分數除法計算器",
      ja: "分数の割り算計算機",
      ko: "분수 나누기 계산기",
      es: "Calculadora de división de fracciones",
      fr: "Calculatrice de division de fractions",
      de: "Bruchdivision-Rechner",
      pt: "Calculadora de divisão de frações",
      ru: "Калькулятор деления дробей"
    },
    descriptions: {
      en: "Divide fractions step by step using the keep-change-flip method. Enter two fractions to get simplified results with decimal equivalents and worked solutions.",
      "zh-CN": "使用“保留-变换-翻转”法逐步除分数。输入两个分数即可得到约分结果、十进制值和完整解题步骤。",
      "zh-TW": "使用「保留、變換、翻轉」法逐步除分數。輸入兩個分數即可得到約分結果、十進位值與完整解題步驟。",
      ja: "「そのまま・逆にする・掛ける」で分数を段階的に割ります。2つの分数を入力すると、約分結果・小数・途中式を表示します。",
      ko: "‘그대로-뒤집기-곱하기’ 방법으로 분수를 단계별로 나눕니다. 두 분수를 입력하면 약분 결과, 소수값, 풀이 과정을 보여줍니다.",
      es: "Divide fracciones paso a paso con el método conserva-cambia-invierte. Ingresa dos fracciones y obtén el resultado simplificado, decimal y la solución completa.",
      fr: "Divisez des fractions pas à pas avec la méthode garder-changer-retourner. Obtenez le résultat simplifié, l’équivalent décimal et la solution détaillée.",
      de: "Brüche Schritt für Schritt mit der Merken-Ändern-Umkehren-Methode teilen. Zwei Brüche eingeben und vereinfachtes Ergebnis, Dezimalwert und Lösung erhalten.",
      pt: "Divida frações passo a passo com o método mantenha-troque-inverta. Digite duas frações e obtenha resultado simplificado, decimal e solução completa.",
      ru: "Делите дроби пошагово методом сохрани-измени-переверни. Введите две дроби, чтобы получить сокращённый результат, десятичное значение и решение."
    }
  },
  {
    id: "dividing-radicals-calculator",
    category: "math",
    slugs: {
      en: "dividing-radicals-calculator",
      "zh-CN": "genhao-chufa-jisuanqi",
      "zh-TW": "genhao-chufa-jisuanqi",
      ja: "kongo-warizan-keisanki",
      ko: "geunho-nanuseom-gyesangi",
      es: "calculadora-division-radicales",
      fr: "calculatrice-division-radicaux",
      de: "wurzel-division-rechner",
      pt: "calculadora-divisao-radicais",
      ru: "delenie-korney-kalkulyator"
    },
    titles: {
      en: "Dividing Radicals Calculator - ⁿ√a ÷ ⁿ√b Quotient Property",
      "zh-CN": "根式除法计算器",
      "zh-TW": "根式除法計算器",
      ja: "根号の割り算計算機",
      ko: "근호 나눗셈 계산기",
      es: "Calculadora de división de radicales",
      fr: "Calculatrice de division de radicaux",
      de: "Wurzeldivision-Rechner",
      pt: "Calculadora de divisão de radicais",
      ru: "Калькулятор деления корней"
    },
    descriptions: {
      en: "Divide radical expressions using the quotient property ⁿ√a÷ⁿ√b=ⁿ√(a÷b). Supports square roots, cube roots, and nth roots with simplified step-by-step results.",
      "zh-CN": "使用商法则 ⁿ√a÷ⁿ√b=ⁿ√(a÷b) 计算根式除法，并给出化简结果与小数值。",
      "zh-TW": "使用商法則 ⁿ√a÷ⁿ√b=ⁿ√(a÷b) 計算根式除法，並提供化簡結果與小數值。",
      ja: "商の性質 ⁿ√a÷ⁿ√b=ⁿ√(a÷b) を使って根号の割り算を計算し、簡約結果と小数値を表示します。",
      ko: "몫의 성질 ⁿ√a÷ⁿ√b=ⁿ√(a÷b)을 사용해 근호 나눗셈을 계산하고, 간단한 결과와 소수값을 보여줍니다.",
      es: "Usa la propiedad del cociente ⁿ√a÷ⁿ√b=ⁿ√(a÷b) para dividir radicales y ver resultados simplificados y decimales.",
      fr: "Utilisez la propriété du quotient ⁿ√a÷ⁿ√b=ⁿ√(a÷b) pour diviser des radicaux et obtenir des résultats simplifiés et décimaux.",
      de: "Nutzen Sie die Quotientenregel ⁿ√a÷ⁿ√b=ⁿ√(a÷b), um Wurzeln zu teilen und vereinfachte sowie dezimale Ergebnisse zu sehen.",
      pt: "Use a propriedade do quociente ⁿ√a÷ⁿ√b=ⁿ√(a÷b) para dividir radicais e ver resultados simplificados e decimais.",
      ru: "Используйте свойство частного ⁿ√a÷ⁿ√b=ⁿ√(a÷b), чтобы делить корни и видеть упрощённый результат и десятичное значение."
    }
  },
  {
    id: "divisibility-test-calculator",
    category: "math",
    slugs: {
      en: "divisibility-test-calculator",
      "zh-CN": "zhengchu-ceshi-jisuanqi",
      "zh-TW": "zhengchu-ceshi-jisuanqi",
      ja: "warikire-hantei-keisanki",
      ko: "nanu-eotteoreojim-panjeong-gyesangi",
      es: "calculadora-divisibilidad",
      fr: "calculatrice-divisibilite",
      de: "teilbarkeitsrechner",
      pt: "calculadora-divisibilidade",
      ru: "kalkulyator-delimosti"
    },
    titles: {
      en: "Divisibility Test Calculator - Check Divisibility Rules",
      "zh-CN": "整除测试计算器",
      "zh-TW": "整除測試計算器",
      ja: "割り切れ判定計算機",
      ko: "나누어떨어짐 판정 계산기",
      es: "Calculadora de divisibilidad",
      fr: "Calculatrice de divisibilité",
      de: "Teilbarkeitsrechner",
      pt: "Calculadora de divisibilidade",
      ru: "Калькулятор делимости"
    },
    descriptions: {
      en: "Test any integer for divisibility by 2–12 or custom divisors. Get instant results with remainders and built-in divisibility rules for every number.",
      "zh-CN": "测试任意整数是否可被 2–12 或自定义除数整除，并即时查看余数与规则。",
      "zh-TW": "測試任意整數是否可被 2–12 或自訂除數整除，並即時查看餘數與規則。",
      ja: "2～12 や任意の除数で整数の割り切れを判定し、余りとルールをすぐ確認できます。",
      ko: "2~12 또는 사용자 지정 수로 정수의 나누어떨어짐을 판정하고 나머지와 규칙을 바로 확인하세요.",
      es: "Comprueba si cualquier entero es divisible por 2–12 o por divisores personalizados y ve el resto al instante.",
      fr: "Testez la divisibilité de n'importe quel entier par 2–12 ou des diviseurs personnalisés, avec le reste affiché instantanément.",
      de: "Prüfen Sie die Teilbarkeit ganzer Zahlen durch 2–12 oder benutzerdefinierte Teiler und sehen Sie den Rest sofort.",
      pt: "Teste qualquer inteiro para divisibilidade por 2–12 ou divisores personalizados e veja o resto na hora.",
      ru: "Проверьте делимость любого целого числа на 2–12 или свои делители и сразу увидьте остаток."
    }
  },
  {
    id: "dot-product-calculator",
    category: "math",
    slugs: {
      en: "dot-product-calculator",
      "zh-CN": "dianji-jisuanqi",
      "zh-TW": "dianji-jisuanqi",
      ja: "naiseki-keisanki",
      ko: "jeomgop-gyesangi",
      es: "calculadora-producto-punto",
      fr: "calculatrice-produit-scalaire",
      de: "skalarprodukt-rechner",
      pt: "calculadora-produto-escalar",
      ru: "kalkulyator-skalyarnogo-proizvedeniya"
    },
    titles: {
      en: "Dot Product Calculator - 2D & 3D Vector Dot Product",
      "zh-CN": "点积计算器 - 2D 和 3D 向量点积",
      "zh-TW": "點積計算器 - 2D 與 3D 向量點積",
      ja: "内積計算機 - 2D・3Dベクトルの内積",
      ko: "점곱 계산기 - 2D 및 3D 벡터 내적",
      es: "Calculadora de producto punto - Vectores 2D y 3D",
      fr: "Calculatrice de produit scalaire - Vecteurs 2D et 3D",
      de: "Skalarprodukt-Rechner - 2D- und 3D-Vektoren",
      pt: "Calculadora de produto escalar - Vetores 2D e 3D",
      ru: "Калькулятор скалярного произведения 2D и 3D"
    },
    descriptions: {
      en: "Dot product calculator for 2D and 3D vectors. Computes scalar product, angle between vectors, and magnitudes — essential for linear algebra and physics.",
      "zh-CN": "用于 2D 和 3D 向量的点积计算器。计算数量积、向量夹角和模长，是线性代数与物理学习的实用工具。",
      "zh-TW": "適用於 2D 與 3D 向量的點積計算器。計算純量積、向量夾角與長度，是線性代數和物理的實用工具。",
      ja: "2D・3Dベクトルの内積計算機。スカラー積、ベクトル間の角度、大きさを計算し、線形代数や物理に役立ちます。",
      ko: "2D 및 3D 벡터용 점곱 계산기. 스칼라곱, 벡터 사이 각도와 크기를 계산해 선형대수와 물리에 유용합니다.",
      es: "Calculadora de producto punto para vectores 2D y 3D. Calcula producto escalar, ángulo entre vectores y magnitudes para álgebra lineal y física.",
      fr: "Calculatrice de produit scalaire pour vecteurs 2D et 3D. Calcule produit scalaire, angle entre vecteurs et normes pour l’algèbre linéaire et la physique.",
      de: "Skalarprodukt-Rechner für 2D- und 3D-Vektoren. Berechnet Skalarprodukt, Winkel zwischen Vektoren und Beträge für lineare Algebra und Physik.",
      pt: "Calculadora de produto escalar para vetores 2D e 3D. Calcula produto escalar, ângulo entre vetores e magnitudes para álgebra linear e física.",
      ru: "Калькулятор скалярного произведения для 2D и 3D векторов: вычисляет произведение, угол между векторами и длины для линейной алгебры и физики."
    }
  },
  {
    id: "double-angle-formula-calculator",
    category: "math",
    slugs: {
      en: "double-angle-formula-calculator",
      "zh-CN": "shuang-jiao-gong-shi-ji-suan-qi",
      "zh-TW": "shuang-jiao-gong-shi-ji-suan-qi",
      ja: "double-angle-formula-calculator",
      ko: "i-jung-gak-gong-sig-gyesan-gi",
      es: "calculadora-formula-angulo-doble",
      fr: "calculateur-formule-angle-double",
      de: "doppelwinkel-formel-rechner",
      pt: "calculadora-formula-angulo-duplo",
      ru: "kalkulyator-formuly-dvoynogo-ugla"
    },
    titles: {
      en: "Double Angle Formula Calculator - sin cos tan 2x",
      "zh-CN": "双角公式计算器",
      "zh-TW": "雙角公式計算器",
      ja: "二倍角公式計算機",
      ko: "이중각 공식 계산기",
      es: "Calculadora de ángulo doble",
      fr: "Calculateur d’angle double",
      de: "Doppelwinkel-Formelrechner",
      pt: "Calculadora de ângulo duplo",
      ru: "Калькулятор двойного угла"
    },
    descriptions: {
      en: "Double angle formula calculator for sin(2x), cos(2x), and tan(2x) in degrees or radians. Instant trig identity results for students and engineers.",
      "zh-CN": "计算 sin(2x)、cos(2x) 和 tan(2x) 的双角公式计算器，支持角度或弧度，立即得到三角恒等式结果。",
      "zh-TW": "計算 sin(2x)、cos(2x) 和 tan(2x) 的雙角公式計算器，支援角度或弧度，立即取得三角恆等式結果。",
      ja: "sin(2x)、cos(2x)、tan(2x) を求める二倍角公式計算機。度数法・ラジアンに対応し、三角恒等式の結果を即表示します。",
      ko: "sin(2x), cos(2x), tan(2x)를 구하는 이중각 공식 계산기. 도와 라디안 모두 지원하며 삼각 항등식 결과를 바로 보여줍니다.",
      es: "Calculadora de ángulo doble para sin(2x), cos(2x) y tan(2x) en grados o radianes. Resultados instantáneos de identidades trigonométricas.",
      fr: "Calculateur d’angle double pour sin(2x), cos(2x) et tan(2x) en degrés ou en radians. Résultats instantanés des identités trigonométriques.",
      de: "Doppelwinkel-Formelrechner für sin(2x), cos(2x) und tan(2x) in Grad oder Radiant. Sofortige Ergebnisse trigonometrischer Identitäten.",
      pt: "Calculadora de ângulo duplo para sin(2x), cos(2x) e tan(2x) em graus ou radianos. Resultados instantâneos de identidades trigonométricas.",
      ru: "Калькулятор двойного угла для sin(2x), cos(2x) и tan(2x) в градусах или радианах. Мгновенные результаты тригонометрических тождеств."
    }
  },
  {
    id: "doubling-time-calculator",
    category: "math",
    slugs: {
      en: "doubling-time-calculator",
      "zh-CN": "beishu-shijian-jisuanqi",
      "zh-TW": "beishu-shijian-jisuanqi",
      ja: "baibai-jikan-keisan",
      ko: "bibeul-sigan-gyesan-gi",
      es: "calculadora-tiempo-doblar",
      fr: "calculateur-temps-doublement",
      de: "verdopplungszeit-rechner",
      pt: "calculadora-tempo-dobramento",
      ru: "kalkulyator-vremeni-dvoeniya"
    },
    titles: {
      en: "Doubling Time Calculator - Investment & Population Growth",
      "zh-CN": "翻倍时间计算器",
      "zh-TW": "翻倍時間計算器",
      ja: "倍倍時間計算機",
      ko: "두 배 시간 계산기",
      es: "Calculadora de tiempo de duplicación",
      fr: "Calculateur du temps de doublement",
      de: "Verdopplungszeit-Rechner",
      pt: "Calculadora de tempo de dobramento",
      ru: "Калькулятор времени удвоения"
    },
    descriptions: {
      en: "Doubling time calculator using exact logarithm formula and Rule of 72. Find how long investments, populations, or any growth rate takes to double.",
      "zh-CN": "使用精确对数公式和72法则计算投资、人口或其他增长率的翻倍时间。",
      "zh-TW": "使用精確對數公式與72法則，計算投資、人口或其他成長率的翻倍時間。",
      ja: "正確な対数公式と72の法則で、投資・人口・成長率の倍倍時間を計算します。",
      ko: "정확한 로그 공식과 72의 법칙으로 투자, 인구, 성장률의 두 배 시간을 계산합니다.",
      es: "Calcula el tiempo de duplicación de inversiones, población o crecimiento con fórmula logarítmica exacta y la regla de 72.",
      fr: "Calculez le temps de doublement d’un investissement, d’une population ou d’une croissance avec la formule logarithmique exacte et la règle de 72.",
      de: "Berechnen Sie die Verdopplungszeit von Investitionen, Bevölkerungen oder Wachstum mit exakter Logarithmusformel und der 72er-Regel.",
      pt: "Calcule o tempo de dobramento de investimentos, população ou crescimento com fórmula logarítmica exata e a regra de 72.",
      ru: "Рассчитайте время удвоения инвестиций, населения или роста по точной логарифмической формуле и правилу 72."
    }
  },
  {
    id: "e-calculator",
    category: "math",
    slugs: {
      en: "e-calculator",
      "zh-CN": "e-jisuanqi",
      "zh-TW": "e-jisuanqi",
      ja: "e-keisanki",
      ko: "e-gyesangi",
      es: "calculadora-e",
      fr: "calculatrice-e",
      de: "e-rechner",
      pt: "calculadora-e",
      ru: "kalkulyator-e"
    },
    titles: {
      en: "e Calculator - Euler's Number, e^x & ln(x)",
      "zh-CN": "e 计算器 - 欧拉数、e^x 与 ln(x)",
      "zh-TW": "e 計算器 - 歐拉數、e^x 與 ln(x)",
      ja: "e 計算機 - ネイピア数、e^x、ln(x)",
      ko: "e 계산기 - 오일러 수, e^x 및 ln(x)",
      es: "Calculadora de e - número de Euler, e^x y ln(x)",
      fr: "Calculatrice e - nombre d’Euler, e^x et ln(x)",
      de: "e Rechner - Eulersche Zahl, e^x und ln(x)",
      pt: "Calculadora de e - número de Euler, e^x e ln(x)",
      ru: "Калькулятор e - число Эйлера, e^x и ln(x)"
    },
    descriptions: {
      en: "e calculator for Euler's number, e^x exponential functions, and natural logarithms ln(x). Get precise results with Taylor series and step-by-step solutions.",
      "zh-CN": "用于欧拉数、e^x 指数函数和自然对数 ln(x) 的 e 计算器。通过泰勒级数和分步解法获得精确结果。",
      "zh-TW": "用於歐拉數、e^x 指數函數與自然對數 ln(x) 的 e 計算器。透過泰勒級數與逐步解法取得精確結果。",
      ja: "ネイピア数、e^x 指数関数、自然対数 ln(x) 用の e 計算機。テイラー級数と段階的な解法で高精度な結果を得られます。",
      ko: "오일러 수, e^x 지수 함수, 자연로그 ln(x)를 계산하는 e 계산기입니다. 테일러 급수와 단계별 풀이로 정밀한 결과를 얻으세요.",
      es: "Calculadora de e para el número de Euler, funciones exponenciales e^x y logaritmos naturales ln(x). Resultados precisos con series de Taylor y pasos.",
      fr: "Calculatrice e pour le nombre d’Euler, les fonctions exponentielles e^x et les logarithmes naturels ln(x). Résultats précis avec séries de Taylor et étapes.",
      de: "e Rechner für die Eulersche Zahl, e^x-Exponentialfunktionen und natürliche Logarithmen ln(x). Präzise Ergebnisse mit Taylorreihen und Schritt-für-Schritt-Lösungen.",
      pt: "Calculadora de e para o número de Euler, funções exponenciais e^x e logaritmos naturais ln(x). Resultados precisos com séries de Taylor e passo a passo.",
      ru: "Калькулятор e для числа Эйлера, экспонент e^x и натуральных логарифмов ln(x). Точные результаты с рядами Тейлора и пошаговыми решениями."
    }
  },
  {
    id: "egyptian-fractions-calculator",
    category: "math",
    slugs: {
      en: "egyptian-fractions-calculator",
      "zh-CN": "ai-ji-fen-shu-ji-suan-qi",
      "zh-TW": "ai-ji-fen-shu-ji-suan-qi",
      ja: "ejiputo-bunsu-keisanki",
      ko: "aegip-bunsu-gyesan-gi",
      es: "calculadora-fracciones-egipcias",
      fr: "calculatrice-fractions-egyptiennes",
      de: "aegyptischer-bruchrechner",
      pt: "calculadora-fracoes-egipcias",
      ru: "egipetskiy-kalkulyator-drobey"
    },
    titles: {
      en: "Egyptian Fractions Calculator - Unit Fraction Decomposition",
      "zh-CN": "埃及分数计算器",
      "zh-TW": "埃及分數計算器",
      ja: "エジプト分数計算機",
      ko: "이집트 분수 계산기",
      es: "Calculadora de fracciones egipcias",
      fr: "Calculatrice de fractions égyptiennes",
      de: "Ägyptischer Bruchrechner",
      pt: "Calculadora de frações egípcias",
      ru: "Калькулятор египетских дробей"
    },
    descriptions: {
      en: "Egyptian fractions calculator converts any fraction into a sum of distinct unit fractions using the greedy algorithm — with step-by-step greedy decomposition.",
      "zh-CN": "使用贪心算法将任意分数拆解为互不相同的单位分数，并提供逐步分解过程。",
      "zh-TW": "使用貪心演算法將任意分數拆解為互不相同的單位分數，並提供逐步分解過程。",
      ja: "貪欲法で任意の分数を単位分数の和に分解し、手順を段階的に表示します。",
      ko: "탐욕 알고리즘으로 임의의 분수를 서로 다른 단위분수의 합으로 분해하고 단계별 과정을 보여줍니다.",
      es: "Convierte cualquier fracción en una suma de fracciones unitarias distintas con el algoritmo voraz y pasos detallados.",
      fr: "Convertissez n’importe quelle fraction en somme de fractions unitaires distinctes avec l’algorithme glouton et ses étapes.",
      de: "Wandle jeden Bruch mit dem gierigen Algorithmus in eine Summe verschiedener Stammbrüche um – Schritt für Schritt.",
      pt: "Converta qualquer fração em uma soma de frações unitárias distintas usando o algoritmo ganancioso com etapas detalhadas.",
      ru: "Разложите любую дробь в сумму различных единичных дробей с жадным алгоритмом и пошаговым разбором."
    }
  },
  {
    id: "direct-variation-calculator",
    category: "math",
    slugs: {
      en: "direct-variation-calculator",
      "zh-CN": "zheng-bili-jisuanqi",
      "zh-TW": "zheng-bili-jisuanqi",
      ja: "chokuhirei-keisan",
      ko: "biryegyeonsangi",
      es: "calculadora-variacion-directa",
      fr: "calculateur-variation-directe",
      de: "direkte-proportionalitat-rechner",
      pt: "calculadora-variacao-direta",
      ru: "pryamaya-proportsiya-kalkulyator"
    },
    titles: {
      en: "Direct Variation Calculator - Solve y = kx Problems",
      "zh-CN": "正比例计算器：解 y = kx 问题",
      "zh-TW": "正比例計算機：解 y = kx 問題",
      ja: "直接比例計算機: y = kx を解く",
      ko: "비례 계산기: y = kx 문제 풀이",
      es: "Calculadora de variación directa: y = kx",
      fr: "Calculateur de variation directe : y = kx",
      de: "Direkte Proportionalität Rechner: y = kx",
      pt: "Calculadora de variação direta: y = kx",
      ru: "Калькулятор прямой пропорции: y = kx"
    },
    descriptions: {
      en: "Calculate the constant of variation k, find unknown x or y values in direct variation equations y = kx, and explore proportional relationships.",
      "zh-CN": "计算正比例中的常数 k，求解 y = kx 中未知的 x 或 y，并探索成比例关系。",
      "zh-TW": "計算正比例中的常數 k，求解 y = kx 中未知的 x 或 y，並探索成比例關係。",
      ja: "比例定数 k を求め、y = kx の未知の x または y を計算し、比例関係を理解できます。",
      ko: "비례상수 k를 구하고, y = kx에서 알 수 없는 x 또는 y 값을 계산하며 비례 관계를 이해하세요.",
      es: "Calcula la constante de variación k, encuentra x o y desconocidos en y = kx y explora relaciones proporcionales.",
      fr: "Calculez la constante de variation k, trouvez x ou y inconnus dans y = kx et explorez les relations proportionnelles.",
      de: "Berechne die Proportionalitätskonstante k, finde unbekannte x- oder y-Werte in y = kx und erkunde proportionale Beziehungen.",
      pt: "Calcule a constante de variação k, encontre x ou y desconhecidos em y = kx e explore relações proporcionais.",
      ru: "Вычисляйте константу пропорциональности k, находите неизвестные x или y в y = kx и изучайте пропорциональные зависимости."
    }
  },
  {
    id: "direction-of-the-vector-calculator",
    category: "math",
    slugs: {
      en: "direction-of-the-vector-calculator",
      "zh-CN": "xiangliang-fangxiang-jisuanqi",
      "zh-TW": "xiangliang-fangxiang-jisuanqi",
      ja: "bekutoru-houkou-keisanki",
      ko: "bektor-banghyang-gyesangi",
      es: "calculadora-direccion-vector",
      fr: "calculateur-direction-vecteur",
      de: "vektor-richtung-rechner",
      pt: "calculadora-direcao-vetor",
      ru: "kalkulyator-napravleniya-vektora"
    },
    titles: {
      en: "Direction of a Vector Calculator - Angles & Cosines",
      "zh-CN": "向量方向计算器 - 方向角与方向余弦",
      "zh-TW": "向量方向計算器 - 方向角與方向餘弦",
      ja: "ベクトル方向計算機 - 方向角と方向余弦",
      ko: "벡터 방향 계산기 - 방향각과 방향 코사인",
      es: "Calculadora de dirección de un vector",
      fr: "Calculateur de direction d’un vecteur",
      de: "Vektorrichtung-Rechner - Winkel und Kosinus",
      pt: "Calculadora de direção de vetor",
      ru: "Калькулятор направления вектора"
    },
    descriptions: {
      en: "Calculate direction angles, direction cosines, and unit vectors for 2D and 3D vectors. Find the angle a vector makes with each coordinate axis instantly.",
      "zh-CN": "计算二维和三维向量的方向角、方向余弦与单位向量，快速求出向量与各坐标轴的夹角。",
      "zh-TW": "計算二維和三維向量的方向角、方向餘弦與單位向量，快速找出向量與各座標軸的夾角。",
      ja: "2D・3Dベクトルの方向角、方向余弦、単位ベクトルを計算。各座標軸となす角をすばやく求めます。",
      ko: "2D·3D 벡터의 방향각, 방향 코사인, 단위벡터를 계산하고 각 좌표축과 이루는 각을 빠르게 구합니다.",
      es: "Calcula ángulos directores, cosenos directores y vectores unitarios para vectores 2D y 3D al instante.",
      fr: "Calculez angles directeurs, cosinus directeurs et vecteurs unitaires pour des vecteurs 2D et 3D en quelques secondes.",
      de: "Berechnen Sie Richtungswinkel, Richtungskosinus und Einheitsvektoren für 2D- und 3D-Vektoren sofort.",
      pt: "Calcule ângulos diretores, cossenos diretores e vetores unitários para vetores 2D e 3D instantaneamente.",
      ru: "Вычисляйте направляющие углы, косинусы и единичные векторы для 2D и 3D векторов мгновенно."
    }
  },
  {
    id: "discriminant-calculator",
    category: "math",
    slugs: {
      en: "discriminant-calculator",
      "zh-CN": "erci-fangcheng-panbie-jisuanqi",
      "zh-TW": "erci-fangcheng-panbie-jisuanqi",
      ja: "nikai-houtei-betsushiki-keisan",
      ko: "icha-bangjeongsik-panbyeol-sigyesan",
      es: "calculadora-discriminante-ecuacion-cuadratica",
      fr: "calculatrice-discriminant-equation-quadratique",
      de: "diskriminanten-rechner-quadratische-gleichung",
      pt: "calculadora-discriminante-equacao-quadratica",
      ru: "kalkulyator-diskriminanta-kvadratnogo-uravneniya"
    },
    titles: {
      en: "Discriminant Calculator - Quadratic Root Analysis",
      "zh-CN": "判别式计算器 - 二次方程根分析",
      "zh-TW": "判別式計算器 - 二次方程根分析",
      ja: "判別式計算機 - 二次方程式の解の判定",
      ko: "판별식 계산기 - 이차방정식 근 분석",
      es: "Calculadora del discriminante - raíces cuadráticas",
      fr: "Calculatrice du discriminant - racines quadratiques",
      de: "Diskriminantenrechner - quadratische Nullstellen",
      pt: "Calculadora do discriminante - raízes quadráticas",
      ru: "Калькулятор дискриминанта - корни квадратного уравнения"
    },
    descriptions: {
      en: "Calculate the discriminant b² − 4ac of any quadratic equation ax² + bx + c = 0. Determine root nature — real, repeated, or complex — instantly.",
      "zh-CN": "计算任意二次方程 ax² + bx + c = 0 的判别式 b² − 4ac，立即判断根是实数、重根还是复数。",
      "zh-TW": "計算任意二次方程 ax² + bx + c = 0 的判別式 b² − 4ac，立即判定根是實數、重根還是複數。",
      ja: "二次方程式 ax² + bx + c = 0 の判別式 b² − 4ac を計算し、解が実数・重解・複素数かをすぐに判定します。",
      ko: "이차방정식 ax² + bx + c = 0의 판별식 b² − 4ac를 계산하고, 근이 실수·중근·복소수인지 즉시 확인하세요.",
      es: "Calcula el discriminante b² − 4ac de cualquier ecuación cuadrática ax² + bx + c = 0 y determina si sus raíces son reales, dobles o complejas.",
      fr: "Calculez le discriminant b² − 4ac de toute équation quadratique ax² + bx + c = 0 et déterminez si ses racines sont réelles, doubles ou complexes.",
      de: "Berechnen Sie die Diskriminante b² − 4ac jeder quadratischen Gleichung ax² + bx + c = 0 und bestimmen Sie sofort, ob die Nullstellen reell, doppelt oder komplex sind.",
      pt: "Calcule o discriminante b² − 4ac de qualquer equação quadrática ax² + bx + c = 0 e descubra instantaneamente se as raízes são reais, repetidas ou complexas.",
      ru: "Вычисляйте дискриминант b² − 4ac любого квадратного уравнения ax² + bx + c = 0 и сразу определяйте, какие у него корни — действительные, кратные или комплексные."
    }
  },
  {
    id: "distance-formula-calculator",
    category: "math",
    slugs: {
      en: "distance-formula-calculator",
      "zh-CN": "juli-gongshi-jisuanqi",
      "zh-TW": "juli-gongshi-jisuanqi",
      ja: "kyori-shiki-keisanki",
      ko: "geori-gongsik-gyesan-gi",
      es: "calculadora-formula-distancia",
      fr: "calculateur-formule-distance",
      de: "abstandsformel-rechner",
      pt: "calculadora-formula-distancia",
      ru: "kalkulyator-formuly-rasstoyaniya"
    },
    titles: {
      en: "Distance Formula Calculator - 2D and 3D Distance",
      "zh-CN": "距离公式计算器：二维和三维距离",
      "zh-TW": "距離公式計算器：二維和三維距離",
      ja: "距離公式計算機：2Dと3Dの距離",
      ko: "거리 공식 계산기: 2D와 3D 거리",
      es: "Calculadora de distancia: 2D y 3D",
      fr: "Calculateur de distance : 2D et 3D",
      de: "Abstandsformel-Rechner: 2D und 3D",
      pt: "Calculadora de distância: 2D e 3D",
      ru: "Калькулятор формулы расстояния: 2D и 3D"
    },
    descriptions: {
      en: "Calculate Euclidean distance between two points in 2D or 3D space using the distance formula. Fast, accurate results with the formula shown.",
      "zh-CN": "使用距离公式计算二维或三维空间中两点之间的欧几里得距离，清晰展示完整计算过程。",
      "zh-TW": "使用距離公式計算二維或三維空間中兩點之間的歐幾里得距離，並清楚顯示完整運算過程。",
      ja: "距離公式で、2次元または3次元空間の2点間のユークリッド距離を計算します。計算式と途中式も表示します。",
      ko: "거리 공식으로 2D 또는 3D 공간의 두 점 사이 유클리드 거리를 계산하고, 풀이 과정을 함께 보여줍니다.",
      es: "Calcula la distancia euclídea entre dos puntos en 2D o 3D con la fórmula, mostrando el proceso completo.",
      fr: "Calculez la distance euclidienne entre deux points en 2D ou 3D avec la formule et le détail complet du calcul.",
      de: "Berechnen Sie die euklidische Distanz zwischen zwei Punkten in 2D oder 3D mit angezeigter Formel und Rechenweg.",
      pt: "Calcule a distância euclidiana entre dois pontos em 2D ou 3D com a fórmula e o passo a passo exibidos.",
      ru: "Вычисляйте евклидово расстояние между двумя точками в 2D или 3D по формуле с показом полного решения."
    }
  },
  {
    id: "distance-from-point-to-plane-calculator",
    category: "math",
    slugs: {
      en: "distance-from-point-to-plane-calculator",
      "zh-CN": "dian-dao-pingmian-ju-li-ji-suan-qi",
      "zh-TW": "dian-dao-pingmian-ju-li-ji-suan-qi",
      ja: "ten-kara-heimen-made-no-kyori-keitanki",
      ko: "jeom-eseo-pyeongmyeon-kkaji-geori-gyeolsangi",
      es: "distancia-punto-plano-calculadora",
      fr: "distance-point-plan-calculateur",
      de: "abstand-punkt-ebene-rechner",
      pt: "distancia-ponto-plano-calculadora",
      ru: "rasstoyanie-ot-tochki-do-ploskosti-kalkulyator"
    },
    titles: {
      en: "Distance from Point to Plane Calculator - 3D Geometry",
      "zh-CN": "点到平面距离计算器 - 3D几何",
      "zh-TW": "點到平面距離計算器 - 3D幾何",
      ja: "点から平面までの距離計算機 - 3D幾何",
      ko: "점에서 평면까지 거리 계산기 - 3D 기하학",
      es: "Distancia de punto a plano - Calculadora 3D",
      fr: "Distance d'un point à un plan - Calculateur 3D",
      de: "Abstand Punkt zu Ebene - 3D-Rechner",
      pt: "Distância de ponto a plano - Calculadora 3D",
      ru: "Расстояние от точки до плоскости - калькулятор 3D"
    },
    descriptions: {
      en: "Calculate the perpendicular distance from a point to a plane in 3D space using the formula |ax₀+by₀+cz₀+d|/√(a²+b²+c²). Step-by-step results.",
      "zh-CN": "使用公式 |ax₀+by₀+cz₀+d|/√(a²+b²+c²) 计算 3D 空间中点到平面的垂直距离，并提供逐步结果。",
      "zh-TW": "使用公式 |ax₀+by₀+cz₀+d|/√(a²+b²+c²) 計算 3D 空間中點到平面的垂直距離，並提供逐步結果。",
      ja: "3D 空間で点から平面までの垂直距離を、|ax₀+by₀+cz₀+d|/√(a²+b²+c²) の式で計算します。手順付き結果を表示。",
      ko: "공식 |ax₀+by₀+cz₀+d|/√(a²+b²+c²) 로 3D 공간에서 점과 평면 사이의 수직 거리를 계산합니다. 단계별 결과 제공.",
      es: "Calcula la distancia perpendicular de un punto a un plano en 3D con la fórmula |ax₀+by₀+cz₀+d|/√(a²+b²+c²). Resultados paso a paso.",
      fr: "Calculez la distance perpendiculaire d'un point à un plan en 3D avec la formule |ax₀+by₀+cz₀+d|/√(a²+b²+c²). Résultats détaillés.",
      de: "Berechnet den senkrechten Abstand eines Punktes von einer Ebene im 3D-Raum mit |ax₀+by₀+cz₀+d|/√(a²+b²+c²). Mit Schritten.",
      pt: "Calcule a distância perpendicular de um ponto a um plano em 3D com |ax₀+by₀+cz₀+d|/√(a²+b²+c²). Resultado passo a passo.",
      ru: "Вычисляет перпендикулярное расстояние от точки до плоскости в 3D по формуле |ax₀+by₀+cz₀+d|/√(a²+b²+c²). Пошаговый результат."
    }
  },
  {
    id: "decimal-to-percent-converter",
    category: "math",
    slugs: {
      en: "decimal-to-percent-converter",
      "zh-CN": "xiaoshu-zhu-baifenbi-zhuanhuanqi",
      "zh-TW": "xiaoshu-zhu-baifenbi-zhuanhuanqi",
      ja: "shosu-paasento-henkan",
      ko: "sosu-baekbunnyul-byeonhwan-gi",
      es: "conversor-de-decimal-a-porcentaje",
      fr: "convertisseur-decimal-en-pourcentage",
      de: "dezimal-in-prozent-rechner",
      pt: "conversor-de-decimal-para-porcentagem",
      ru: "koneverter-desyatichnogo-chisla-v-protsenty"
    },
    titles: {
      en: "Decimal to Percent Converter",
      "zh-CN": "小数转百分比转换器",
      "zh-TW": "小數轉百分比轉換器",
      ja: "小数からパーセント変換",
      ko: "소수 백분율 변환기",
      es: "Conversor de decimal a porcentaje",
      fr: "Convertisseur décimal en pourcentage",
      de: "Dezimal-in-Prozent-Rechner",
      pt: "Conversor de decimal para porcentagem",
      ru: "Конвертер десятичного числа в проценты"
    },
    descriptions: {
      en: "Convert any decimal to a percentage instantly by multiplying by 100. Handles positive, negative, and decimals greater than 1. Free online converter.",
      "zh-CN": "输入任意小数，乘以 100 即可立刻转换为百分比。支持正数、负数和大于 1 的小数。免费在线转换器。",
      "zh-TW": "輸入任意小數，乘以 100 就能立即轉成百分比。支援正數、負數與大於 1 的小數。免費線上轉換器。",
      ja: "任意の小数に 100 を掛けるだけで割合をすぐ百分率に変換。正数、負数、1 を超える数にも対応。無料オンライン変換。",
      ko: "임의의 소수에 100을 곱해 백분율로 즉시 변환합니다. 양수, 음수, 1보다 큰 값도 지원하는 무료 온라인 변환기입니다.",
      es: "Convierte cualquier decimal a porcentaje al instante multiplicando por 100. Admite positivos, negativos y valores mayores que 1. Gratis en línea.",
      fr: "Convertissez instantanément n'importe quel décimal en pourcentage en le multipliant par 100. Gère les positifs, négatifs et valeurs > 1.",
      de: "Wandle jede Dezimalzahl sofort in einen Prozentsatz um, indem du sie mit 100 multiplizierst. Für positive, negative und Werte über 1.",
      pt: "Converta qualquer decimal em porcentagem instantaneamente multiplicando por 100. Suporta positivos, negativos e valores maiores que 1.",
      ru: "Мгновенно переводите любое десятичное число в проценты, умножая его на 100. Поддерживает положительные, отрицательные и значения больше 1."
    }
  },
  {
    id: "descartes-rule-of-signs-calculator",
    category: "math",
    slugs: {
      en: "descartes-rule-of-signs-calculator",
      "zh-CN": "dekate-fuhao-faze-jisuanqi",
      "zh-TW": "dekate-fuhao-faze-jisuanqi",
      ja: "dekaruto-fugo-housoku-keisanki",
      ko: "dekarteu-buho-beopchik-gyesangi",
      es: "calculadora-regla-signos",
      fr: "calculateur-regle-signes",
      de: "rechner-vorzeichenregel",
      pt: "calculadora-regra-sinais",
      ru: "kalkulyator-pravila-znakov-dekarta"
    },
    titles: {
      en: "Descartes Rule of Signs Calculator",
      "zh-CN": "德卡特符号法则计算器",
      "zh-TW": "德卡特符號法則計算機",
      ja: "デカルトの符号法則計算機",
      ko: "데카르트 부호 법칙 계산기",
      es: "Calculadora de la regla de los signos",
      fr: "Calculateur de la règle des signes",
      de: "Rechner zur Regel der Vorzeichen",
      pt: "Calculadora da regra dos sinais",
      ru: "Калькулятор правила знаков Декарта"
    },
    descriptions: {
      en: "Apply Descartes' Rule of Signs to any polynomial: count coefficient sign changes to predict positive and negative real root counts instantly.",
      "zh-CN": "应用德卡特符号法则，快速统计多项式系数的符号变化，预测正负实根数量。",
      "zh-TW": "套用德卡特符號法則，快速統計多項式係數的符號變化，預測正負實根數量。",
      ja: "デカルトの符号法則で多項式の係数変化を数え、正負の実根の個数をすぐ予測できます。",
      ko: "데카르트의 부호 법칙으로 다항식 계수의 부호 변화를 세어 양의·음의 실근 개수를 빠르게 예측합니다.",
      es: "Aplica la regla de los signos de Descartes para contar cambios de signo y estimar raíces reales positivas y negativas al instante.",
      fr: "Appliquez la règle des signes de Descartes pour compter les changements de signe et estimer instantanément les racines réelles positives et négatives.",
      de: "Wende die Regel von Descartes an, zähle Vorzeichenwechsel und schätze positive und negative reelle Nullstellen sofort.",
      pt: "Aplique a regra dos sinais de Descartes para contar mudanças de sinal e estimar raízes reais positivas e negativas instantaneamente.",
      ru: "Применяйте правило знаков Декарта к любому многочлену: считайте смены знаков и мгновенно оценивайте положительные и отрицательные корни."
    }
  },
  {
    id: "diagonalize-matrix-calculator",
    category: "math",
    slugs: {
      en: "diagonalize-matrix-calculator",
      "zh-CN": "juzhen-duijiaohua-jisuanqi",
      "zh-TW": "juzhen-duijiaohua-jisuanqi",
      ja: "gyoretsu-taikakuka-keisanki",
      ko: "haengryeol-daegakhwa-gyesangi",
      es: "calculadora-diagonalizacion-matrices",
      fr: "calculatrice-diagonalisation-matrices",
      de: "matrix-diagonalisierung-rechner",
      pt: "calculadora-diagonalizacao-matrizes",
      ru: "diagonalizaciya-matric-kalkulyator"
    },
    titles: {
      en: "Diagonalize Matrix Calculator",
      "zh-CN": "矩阵对角化计算器",
      "zh-TW": "矩陣對角化計算器",
      ja: "行列対角化計算機",
      ko: "행렬 대각화 계산기",
      es: "Calculadora de diagonalización de matrices",
      fr: "Calculateur de diagonalisation de matrices",
      de: "Rechner zur Matrixdiagonalisierung",
      pt: "Calculadora de diagonalização de matrizes",
      ru: "Калькулятор диагонализации матриц"
    },
    descriptions: {
      en: "Diagonalize 2×2 and 3×3 matrices online. Finds eigenvalues, eigenvectors, transformation matrix P, and diagonal matrix D with step-by-step output.",
      "zh-CN": "在线对 2×2 和 3×3 矩阵进行对角化，求特征值、特征向量、变换矩阵 P 和对角矩阵 D，并提供步骤结果。",
      "zh-TW": "線上對 2×2 與 3×3 矩陣進行對角化，求特徵值、特徵向量、變換矩陣 P 與對角矩陣 D，並提供步驟結果。",
      ja: "2×2 と 3×3 の行列をオンラインで対角化し、固有値・固有ベクトル・変換行列 P・対角行列 D を手順付きで表示します。",
      ko: "2×2 및 3×3 행렬을 온라인으로 대각화해 고유값, 고유벡터, 변환 행렬 P와 대각 행렬 D를 단계별로 보여줍니다.",
      es: "Diagonaliza matrices 2×2 y 3×3 en línea. Encuentra valores propios, vectores propios, la matriz P y la matriz diagonal D paso a paso.",
      fr: "Diagonalisez en ligne des matrices 2×2 et 3×3. Trouvez les valeurs propres, vecteurs propres, la matrice P et la matrice diagonale D, étape par étape.",
      de: "Diagonalisiert 2×2- und 3×3-Matrizen online. Findet Eigenwerte, Eigenvektoren, die Transformationsmatrix P und die Diagonalmatrix D mit Schritten.",
      pt: "Diagonalize matrizes 2×2 e 3×3 online. Encontre autovalores, autovetores, a matriz P e a matriz diagonal D com passos detalhados.",
      ru: "Онлайн диагонализация матриц 2×2 и 3×3. Находит собственные значения, собственные векторы, матрицу P и диагональную матрицу D с шагами."
    }
  },
  {
    id: "diamond-problem-calculator",
    category: "math",
    slugs: {
      en: "diamond-problem-calculator",
      "zh-CN": "lingxing-wenti-ji-suan-qi",
      "zh-TW": "lingxing-wenti-ji-suan-qi",
      ja: "daiyamondo-mondai-keisanki",
      ko: "daiamondeu-munje-gyesangi",
      es: "calculadora-problema-diamante",
      fr: "calculatrice-probleme-diamant",
      de: "diamantenaufgabe-rechner",
      pt: "calculadora-problema-diamante",
      ru: "kalkulyator-almaznoy-problemy"
    },
    titles: {
      en: "Diamond Problem Calculator",
      "zh-CN": "菱形问题计算器",
      "zh-TW": "菱形問題計算器",
      ja: "ダイヤモンド問題計算機",
      ko: "다이아몬드 문제 계산기",
      es: "Problema del diamante: calculadora",
      fr: "Problème du diamant : calculatrice",
      de: "Diamantenaufgabe-Rechner",
      pt: "Problema do diamante: calculadora",
      ru: "Калькулятор алмазной задачи"
    },
    descriptions: {
      en: "Diamond problem calculator finds two numbers from their sum and product. Essential for factoring quadratics and algebra practice with instant results.",
      "zh-CN": "根据两个数的和与积找出它们，适合二次式因式分解和代数练习，结果即时显示。",
      "zh-TW": "根據兩個數的和與積找出它們，適合二次式因式分解和代數練習，結果即時顯示。",
      ja: "和と積から2つの数を求める計算機。二次式の因数分解や代数練習に役立ち、結果はすぐ表示されます。",
      ko: "두 수의 합과 곱으로 원래 수를 찾는 계산기입니다. 이차식 인수분해와 대수 연습에 유용하며 결과가 즉시 표시됩니다.",
      es: "Calcula dos números a partir de su suma y producto. Ideal para factorizar cuadráticas y practicar álgebra con resultados al instante.",
      fr: "Trouve deux nombres à partir de leur somme et de leur produit. Idéal pour factoriser des quadratiques et s'exercer à l'algèbre.",
      de: "Findet zwei Zahlen aus ihrer Summe und ihrem Produkt. Ideal zum Faktorisieren quadratischer Terme und zum Üben von Algebra.",
      pt: "Encontre dois números pela soma e pelo produto. Ideal para fatorar quadráticas e praticar álgebra com resultados instantâneos.",
      ru: "Находит два числа по их сумме и произведению. Подходит для разложения квадратных выражений и практики алгебры."
    }
  },
  {
    id: "digit-sum-calculator",
    category: "math",
    slugs: {
      en: "digit-sum-calculator",
      "zh-CN": "shuzi-hejisuanqi",
      "zh-TW": "shuzi-hejisuanqi",
      ja: "shisuwa-keisanki",
      ko: "jari-su-hwagis",
      es: "calculadora-suma-digitos",
      fr: "calculateur-somme-chiffres",
      de: "ziffernsumme-rechner",
      pt: "calculadora-soma-digitos",
      ru: "kalkulyator-summy-tsifr"
    },
    titles: {
      en: "Digit Sum Calculator",
      "zh-CN": "数字和计算器",
      "zh-TW": "數字和計算器",
      ja: "桁和計算機",
      ko: "자릿수 합 계산기",
      es: "Calculadora de suma de dígitos",
      fr: "Calculateur de somme des chiffres",
      de: "Ziffernsumme-Rechner",
      pt: "Calculadora de soma dos dígitos",
      ru: "Калькулятор суммы цифр"
    },
    descriptions: {
      en: "Calculate digit sum and digital root of any integer instantly. Useful for divisibility checks, number theory, and checksum verification. Free tool.",
      "zh-CN": "快速计算任意整数的各位数字之和和数字根。适合整除判断、数论和校验验证。免费工具。",
      "zh-TW": "快速計算任意整數的各位數字和與數字根。適合整除判斷、數論與校驗驗證。免費工具。",
      ja: "任意の整数の各桁の和とデジタルルートをすばやく計算。約数判定、数論、チェックサム確認に便利な無料ツール。",
      ko: "임의의 정수의 자릿수 합과 디지털 루트를 즉시 계산합니다. 약수 판정, 수론, 체크섬 검증에 유용한 무료 도구입니다.",
      es: "Calcula al instante la suma de dígitos y la raíz digital de cualquier entero. Útil para divisibilidad, teoría de números y verificación.",
      fr: "Calculez instantanément la somme des chiffres et la racine numérique de n'importe quel entier. Utile pour la divisibilité, la théorie des nombres et la vérification.",
      de: "Berechnet sofort die Ziffernsumme und die digitale Wurzel beliebiger Ganzzahlen. Nützlich für Teilbarkeit, Zahlentheorie und Prüfwerte.",
      pt: "Calcule instantaneamente a soma dos dígitos e a raiz digital de qualquer inteiro. Útil para divisibilidade, teoria dos números e verificação.",
      ru: "Мгновенно вычисляет сумму цифр и цифровой корень любого целого числа. Полезно для проверок делимости, теории чисел и контрольных сумм."
    }
  },
  {
    id: "cycloid-calculator",
    category: "math",
    slugs: {
      en: "cycloid-calculator",
      "zh-CN": "bai-xian-ji-suan-qi",
      "zh-TW": "bai-xian-ji-suan-qi",
      ja: "saikuroido-keisanki",
      ko: "saikeulloideu-gyesangi",
      es: "calculadora-cicloide",
      fr: "calculateur-cycloide",
      de: "zykloiden-rechner",
      pt: "calculadora-cicloide",
      ru: "kalkulyator-tsikloidy"
    },
    titles: {
      en: "Cycloid Calculator - Parametric Curve Properties",
      "zh-CN": "摆线计算器 - 参数曲线性质",
      "zh-TW": "擺線計算器 - 參數曲線性質",
      ja: "サイクロイド計算機 - パラメトリック曲線の性質",
      ko: "사이클로이드 계산기 - 매개변수 곡선 성질",
      es: "Calculadora de cicloide - Propiedades paramétricas",
      fr: "Calculateur de cycloïde - Propriétés paramétriques",
      de: "Zykloiden-Rechner - Parametrische Kurveneigenschaften",
      pt: "Calculadora de cicloide - Propriedades paramétricas",
      ru: "Калькулятор циклоиды - Свойства параметрической кривой"
    },
    descriptions: {
      en: "Cycloid calculator computes x,y coordinates, one-arch arc length, and area under the curve from radius and parameter. Free parametric curve tool.",
      "zh-CN": "摆线计算器可根据半径和参数计算 x、y 坐标、单拱弧长及曲线下方面积。免费的参数曲线工具。",
      "zh-TW": "擺線計算器可依半徑與參數計算 x、y 座標、單拱弧長與曲線下方面積。免費參數曲線工具。",
      ja: "半径とパラメータからサイクロイドの x,y 座標、1アーチの弧長、曲線下の面積を計算する無料ツールです。",
      ko: "반지름과 매개변수로 사이클로이드의 x,y 좌표, 한 아치의 호 길이, 곡선 아래 면적을 계산하는 무료 도구입니다.",
      es: "Calcula coordenadas x,y de una cicloide, longitud de un arco y área bajo la curva a partir del radio y el parámetro.",
      fr: "Calcule les coordonnées x,y d’une cycloïde, la longueur d’une arche et l’aire sous la courbe à partir du rayon et du paramètre.",
      de: "Berechnet x,y-Koordinaten einer Zykloide, Bogenlänge eines Bogens und Fläche unter der Kurve aus Radius und Parameter.",
      pt: "Calcule coordenadas x,y da cicloide, comprimento de um arco e área sob a curva a partir do raio e do parâmetro.",
      ru: "Вычисляет координаты x,y циклоиды, длину одной арки и площадь под кривой по радиусу и параметру."
    }
  },
  {
    id: "cyclomatic-complexity-calculator",
    category: "math",
    slugs: {
      en: "cyclomatic-complexity-calculator",
      "zh-CN": "quan-fuzaodu-jisuanqi",
      "zh-TW": "quan-fuzaodu-jisuanqi",
      ja: "saikuromatikku-fukuzatsudo-keisanki",
      ko: "saikeulomatik-bokjapdo-gyeonsangi",
      es: "calculadora-complejidad-ciclotomica",
      fr: "calculateur-complexite-cyclomatique",
      de: "zyklomatische-komplexitaet-rechner",
      pt: "calculadora-complexidade-ciclomatica",
      ru: "tsiklomaticheskaya-slozhnost-kalkulyator"
    },
    titles: {
      en: "Cyclomatic Complexity Calculator - McCabe Metric Tool",
      "zh-CN": "圈复杂度计算器",
      "zh-TW": "圈複雜度計算器",
      ja: "循環的複雑度計算機",
      ko: "순환 복잡도 계산기",
      es: "Calculadora de complejidad ciclomática",
      fr: "Calculateur de complexité cyclomatique",
      de: "Zyklomatische Komplexität Rechner",
      pt: "Calculadora de complexidade ciclomática",
      ru: "Калькулятор цикломатической сложности"
    },
    descriptions: {
      en: "Cyclomatic complexity calculator using McCabe's formula M = E − N + 2P or decision count. Measure code complexity and software quality instantly.",
      "zh-CN": "使用 McCabe 公式 M = E − N + 2P 或决策数快速计算圈复杂度，立即评估代码复杂度和软件质量。",
      "zh-TW": "使用 McCabe 公式 M = E − N + 2P 或決策數快速計算圈複雜度，立即評估程式複雜度與軟體品質。",
      ja: "McCabe 公式 M = E − N + 2P または決定数で循環的複雑度を素早く計算し、コードの複雑さと品質を評価します。",
      ko: "McCabe 공식 M = E − N + 2P 또는 결정 수로 순환 복잡도를 빠르게 계산해 코드 복잡도와 품질을 평가합니다.",
      es: "Calcula la complejidad ciclomática con la fórmula de McCabe M = E − N + 2P o con el conteo de decisiones y evalúa la calidad del código.",
      fr: "Calculez la complexité cyclomatique avec la formule de McCabe M = E − N + 2P ou le comptage des décisions, et évaluez la qualité du code.",
      de: "Berechne die zyklomatische Komplexität mit McCabes Formel M = E − N + 2P oder per Entscheidungszähler und bewerte die Codequalität.",
      pt: "Calcule a complexidade ciclomática com a fórmula de McCabe M = E − N + 2P ou pelo número de decisões e avalie a qualidade do código.",
      ru: "Вычисляйте цикломатическую сложность по формуле Маккейба M = E − N + 2P или по числу решений и оценивайте качество кода."
    }
  },
  {
    id: "cylindrical-coordinates-calculator",
    category: "math",
    slugs: {
      en: "cylindrical-coordinates-calculator",
      "zh-CN": "zhu-zuobiao-jisuanqi",
      "zh-TW": "zhu-zuobiao-jisuanqi",
      ja: "enchu-zaahyo-keisanki",
      ko: "wontong-jwapyogyesan-gi",
      es: "calculadora-coordenadas-cilindricas",
      fr: "calculatrice-coordonnees-cylindriques",
      de: "zylinderkoordinaten-rechner",
      pt: "calculadora-coordenadas-cilindricas",
      ru: "kalkulyator-tsilindricheskikh-koordinat"
    },
    titles: {
      en: "Cylindrical Coordinates Calculator - 3D Conversion Tool",
      "zh-CN": "柱坐标计算器 - 3D 坐标转换工具",
      "zh-TW": "柱坐標計算器 - 3D 座標轉換工具",
      ja: "円柱座標計算機 - 3D変換ツール",
      ko: "원통 좌표 계산기 - 3D 변환 도구",
      es: "Calculadora de coordenadas cilíndricas",
      fr: "Calculatrice de coordonnées cylindriques",
      de: "Zylinderkoordinaten-Rechner",
      pt: "Calculadora de coordenadas cilíndricas",
      ru: "Калькулятор цилиндрических координат"
    },
    descriptions: {
      en: "Cylindrical coordinates calculator converts Cartesian (x,y,z) to cylindrical (ρ,φ,z) and back. Instant 3D coordinate transformation with formulas.",
      "zh-CN": "柱坐标计算器可在笛卡尔 (x,y,z) 与柱坐标 (ρ,φ,z) 之间双向转换，并即时显示公式。",
      "zh-TW": "柱坐標計算器可在笛卡兒 (x,y,z) 與柱坐標 (ρ,φ,z) 之間雙向轉換，並即時顯示公式。",
      ja: "円柱座標計算機はデカルト座標 (x,y,z) と円柱座標 (ρ,φ,z) を相互変換し、式もすぐ表示します。",
      ko: "원통 좌표 계산기는 직교 좌표 (x,y,z)와 원통 좌표 (ρ,φ,z)를 서로 변환하고 공식을 바로 보여줍니다.",
      es: "Calcula coordenadas cilíndricas entre cartesianas (x,y,z) y cilíndricas (ρ,φ,z) con fórmulas al instante.",
      fr: "Convertissez instantanément des coordonnées cartésiennes (x,y,z) vers cylindriques (ρ,φ,z) et inversement avec les formules.",
      de: "Rechner für Zylinderkoordinaten: wandelt kartesische (x,y,z) in zylindrische (ρ,φ,z) und zurück um, mit Formeln sofort.",
      pt: "Converta coordenadas cartesianas (x,y,z) e cilíndricas (ρ,φ,z) instantaneamente com fórmulas.",
      ru: "Калькулятор цилиндрических координат переводит декартовы (x,y,z) в цилиндрические (ρ,φ,z) и обратно с формулами."
    }
  },
  {
    id: "decimal-calculator",
    category: "math",
    slugs: {
      en: "decimal-calculator",
      "zh-CN": "xiaoshu-jisuanqi",
      "zh-TW": "xiaoshu-jisuanqi",
      ja: "shosu-keisanki",
      ko: "sosu-gyesangi",
      es: "calculadora-decimal",
      fr: "calculatrice-decimale",
      de: "dezimalrechner",
      pt: "calculadora-decimal",
      ru: "desyatichnyy-kalkulyator"
    },
    titles: {
      en: "Decimal Calculator - Add, Subtract, Multiply, Divide",
      "zh-CN": "小数计算器 - 加、减、乘、除",
      "zh-TW": "小數計算器 - 加、減、乘、除",
      ja: "小数計算機 - 加算、減算、乗算、除算",
      ko: "소수 계산기 - 덧셈, 뺄셈, 곱셈, 나눗셈",
      es: "Calculadora decimal - sumar, restar, multiplicar, dividir",
      fr: "Calculatrice décimale - +, −, ×, ÷",
      de: "Dezimalrechner - Plus, Minus, Mal, Geteilt",
      pt: "Calculadora decimal - somar, subtrair, multiplicar, dividir",
      ru: "Десятичный калькулятор — сложение, вычитание, деление"
    },
    descriptions: {
      en: "Decimal calculator performs precise addition, subtraction, multiplication, and division on decimal numbers. Get exact results with step-by-step formulas.",
      "zh-CN": "小数计算器可对小数进行精确的加、减、乘、除运算，并提供逐步公式与准确结果。",
      "zh-TW": "小數計算器可精確執行小數的加、減、乘、除，並提供逐步公式與正確結果。",
      ja: "小数計算機は、小数の加算・減算・乗算・除算を正確に計算し、手順付きの式とともに結果を表示します。",
      ko: "소수 계산기는 소수의 덧셈, 뺄셈, 곱셈, 나눗셈을 정확하게 계산하고 단계별 식과 함께 결과를 보여줍니다.",
      es: "La calculadora decimal realiza suma, resta, multiplicación y división precisas con números decimales y muestra fórmulas paso a paso.",
      fr: "La calculatrice décimale effectue des additions, soustractions, multiplications et divisions précises sur les nombres décimaux avec les formules détaillées.",
      de: "Der Dezimalrechner berechnet Dezimalzahlen exakt mit Addition, Subtraktion, Multiplikation und Division sowie Schritt-für-Schritt-Formeln.",
      pt: "A calculadora decimal faz soma, subtração, multiplicação e divisão precisas com números decimais, com fórmulas passo a passo.",
      ru: "Десятичный калькулятор точно выполняет сложение, вычитание, умножение и деление десятичных чисел с пошаговыми формулами."
    }
  },
  {
    id: "decimal-to-fraction-calculator",
    category: "math",
    slugs: {
      en: "decimal-to-fraction-calculator",
      "zh-CN": "xiao-shu-zhuan-fen-shu-ji-suan-qi",
      "zh-TW": "xiao-shu-zhuan-fen-shu-ji-suan-qi",
      ja: "shosu-bunsu-keisanki",
      ko: "sosu-bunsu-gyesangi",
      es: "calculadora-decimal-a-fraccion",
      fr: "calculatrice-decimal-en-fraction",
      de: "dezimal-in-bruch-rechner",
      pt: "calculadora-decimal-para-fracao",
      ru: "kalkulyator-desyatichnoy-drobi-v-obyknovennuyu"
    },
    titles: {
      en: "Decimal to Fraction Calculator - Simplify Instantly",
      "zh-CN": "小数转分数计算器 - 即刻化简",
      "zh-TW": "小數轉分數計算器 - 立即化簡",
      ja: "小数を分数に変換する計算機 - すぐに約分",
      ko: "소수를 분수로 변환하는 계산기 - 즉시 약분",
      es: "Calculadora de decimal a fracción - Simplifica al instante",
      fr: "Calculatrice décimal en fraction - Simplification",
      de: "Dezimal-in-Bruch-Rechner - Sofort vereinfachen",
      pt: "Calculadora decimal para fração - Simplifique na hora",
      ru: "Десятичная дробь в обычную - Быстро"
    },
    descriptions: {
      en: "Decimal to fraction calculator converts any decimal to its simplified fraction form using GCD. Handles terminating decimals and mixed numbers instantly.",
      "zh-CN": "小数转分数计算器可用最大公约数将任意小数转换为最简分数，立即处理有限小数和带分数。",
      "zh-TW": "小數轉分數計算器可用最大公因數將任意小數轉為最簡分數，立即處理有限小數與帶分數。",
      ja: "小数を分数に変換し、GCDで最簡分数へ。有限小数と帯分数をすばやく扱えます。",
      ko: "소수를 분수로 변환하고 GCD로 최간단 분수로 약분합니다. 유한소수와 대분수를 즉시 처리합니다.",
      es: "Convierte cualquier decimal en una fracción simplificada con el MCD. Maneja decimales finitos y números mixtos al instante.",
      fr: "Convertit tout décimal en fraction simplifiée avec le PGCD. Gère instantanément décimaux finis et nombres mixtes.",
      de: "Wandelt jede Dezimalzahl per ggT in einen gekürzten Bruch um. Verarbeitet endliche Dezimalzahlen und gemischte Zahlen sofort.",
      pt: "Converte qualquer decimal em fração simplificada usando MDC. Lida instantaneamente com decimais finitos e números mistos.",
      ru: "Преобразует любую десятичную дробь в сокращенную обычную через НОД. Мгновенно обрабатывает конечные десятичные и смешанные числа."
    }
  },
  {
    id: "cosine-similarity-calculator",
    category: "math",
    slugs: {
      en: "cosine-similarity-calculator",
      "zh-CN": "yu-xian-xiang-si-du-ji-suan-qi",
      "zh-TW": "yu-xian-xiang-si-du-ji-suan-qi",
      ja: "yogen-ruiji-do-keisanki",
      ko: "kosaein-yusado-gyesangi",
      es: "calculadora-similitud-coseno",
      fr: "calculateur-similarite-cosinus",
      de: "cosinusahnlichkeit-rechner",
      pt: "calculadora-similaridade-cosseno",
      ru: "kalkulyator-kosinusnoy-blizosti"
    },
    titles: {
      en: "Cosine Similarity Calculator - Vector Similarity Analysis",
      "zh-CN": "余弦相似度计算器",
      "zh-TW": "餘弦相似度計算器",
      ja: "余弦類似度計算機",
      ko: "코사인 유사도 계산기",
      es: "Calculadora de similitud coseno",
      fr: "Calculateur de similarité cosinus",
      de: "Cosinus-Ähnlichkeitsrechner",
      pt: "Calculadora de similaridade cosseno",
      ru: "Калькулятор косинусной близости"
    },
    descriptions: {
      en: "Cosine similarity calculator for vectors in machine learning, NLP, and data analysis. Compute similarity score, dot product, and magnitudes instantly.",
      "zh-CN": "用于机器学习、NLP 和数据分析的向量余弦相似度计算器。立即计算相似度、点积和模长。",
      "zh-TW": "用於機器學習、NLP 與資料分析的向量餘弦相似度計算器。立即計算相似度、點積與模長。",
      ja: "機械学習、NLP、データ分析向けのベクトル余弦類似度計算機。類似度、内積、ノルムをすぐに計算。",
      ko: "머신러닝, NLP, 데이터 분석용 벡터 코사인 유사도 계산기. 유사도, 내적, 크기를 즉시 계산합니다.",
      es: "Calculadora de similitud coseno para vectores en ML, NLP y análisis de datos. Calcula similitud, producto punto y magnitudes al instante.",
      fr: "Calculateur de similarité cosinus pour les vecteurs en ML, NLP et analyse de données. Calculez similitude, produit scalaire et normes instantanément.",
      de: "Cosinus-Ähnlichkeitsrechner für Vektoren in ML, NLP und Datenanalyse. Ähnlichkeit, Skalarprodukt und Beträge sofort berechnen.",
      pt: "Calculadora de similaridade cosseno para vetores em ML, PLN e análise de dados. Calcule similaridade, produto escalar e magnitudes instantaneamente.",
      ru: "Калькулятор косинусной близости для векторов в ML, NLP и анализе данных. Мгновенно считает близость, скалярное произведение и нормы."
    }
  },
  {
    id: "cotangent-calculator",
    category: "math",
    slugs: {
      en: "cotangent-calculator",
      "zh-CN": "yuqie-jisuanqi-cotx-du-hudu-tidu",
      "zh-TW": "yuqie-jisuanqi-cotx-du-hudian-tidu",
      ja: "yokessenkeisan-ki-cotx-do-radian-gram",
      ko: "yuche-gyeolsan-gi-cotx-dou-radian-geuradian",
      es: "calculadora-cotangente-cotx-grados-radianes-gradianes",
      fr: "calculateur-cotangente-cotx-degres-radians-gradians",
      de: "kotangens-rechner-cotx-grad-radian-grad",
      pt: "calculadora-cotangente-cotx-graus-radianos-gradianos",
      ru: "kalkulyator-kotangensa-cotx-grad-radian-gradian"
    },
    titles: {
      en: "Cotangent Calculator - cot(x) Degrees Radians Gradians",
      "zh-CN": "余切计算器 - cot(x) 度 弧度 梯度",
      "zh-TW": "餘切計算器 - cot(x) 度 弧度 梯度",
      ja: "余切計算機 - cot(x) 度 ラジアン グラジアン",
      ko: "여각 계산기 - cot(x) 도 라디안 그라디안",
      es: "Calculadora de cotangente - cot(x) grados radianes gradians",
      fr: "Calculateur de cotangente - cot(x) degrés radians gradians",
      de: "Kotangens-Rechner - cot(x) Grad Radian Gon",
      pt: "Calculadora de cotangente - cot(x) graus radianos gradianos",
      ru: "Калькулятор котангенса - cot(x) град радиан градиан"
    },
    descriptions: {
      en: "Cotangent calculator for angle and coordinate inputs in degrees, radians, or gradians. Get precise cot(x) values with the reciprocal tangent formula instantly.",
      "zh-CN": "余切计算器，支持角度和坐标输入，适用于度、弧度或梯度。使用倒正切公式，即时获取精确的 cot(x) 值。",
      "zh-TW": "餘切計算器，支援角度與座標輸入，適用於度、弧度或梯度。使用倒正切公式，即時取得精確的 cot(x) 值。",
      ja: "角度と座標入力に対応した余切計算機。度、ラジアン、グラジアンで cot(x) をすばやく高精度に求めます。",
      ko: "각도와 좌표 입력을 지원하는 여각 계산기입니다. 도, 라디안, 그라디안에서 cot(x) 값을 빠르고 정확하게 구합니다.",
      es: "Calculadora de cotangente para ángulos y coordenadas en grados, radianes o gradians. Obtén cot(x) con precisión al instante.",
      fr: "Calculateur de cotangente pour les angles et les coordonnées en degrés, radians ou gradians. Obtenez cot(x) instantanément avec précision.",
      de: "Kotangens-Rechner für Winkel- und Koordinateneingaben in Grad, Radian oder Gon. Erhalte cot(x) sofort und präzise.",
      pt: "Calculadora de cotangente para ângulos e coordenadas em graus, radianos ou gradianos. Obtenha cot(x) com precisão instantaneamente.",
      ru: "Калькулятор котангенса для углов и координат в градусах, радианах или градианах. Мгновенно получайте точные значения cot(x)."
    }
  },
  {
    id: "coterminal-angle-calculator",
    category: "math",
    slugs: {
      en: "coterminal-angle-calculator",
      "zh-CN": "tong-zhong-bian-jiao-ji-suan-qi",
      "zh-TW": "tong-zhong-bian-jiao-ji-suan-qi",
      ja: "doushuukaku-keisanki",
      ko: "dongjonggak-gyesan-gi",
      es: "calculadora-angulos-coterminales",
      fr: "calculateur-angles-coterminaux",
      de: "koterminalwinkel-rechner",
      pt: "calculadora-angulos-coterminais",
      ru: "koterminalnye-ugly-kalkulyator"
    },
    titles: {
      en: "Coterminal Angle Calculator - Find Coterminal Angles",
      "zh-CN": "同终边角计算器 - 找同终边角",
      "zh-TW": "同終邊角計算機 - 找同終邊角",
      ja: "同終辺角計算機 - 同終辺角を求める",
      ko: "동종각 계산기 - 동종각 찾기",
      es: "Calculadora de ángulos coterminales",
      fr: "Calculateur d’angles coterminaux",
      de: "Koterminalwinkel-Rechner",
      pt: "Calculadora de ângulos coterminais",
      ru: "Калькулятор котерминальных углов"
    },
    descriptions: {
      en: "Coterminal angle calculator for degrees, radians, and gradians. Find multiple positive and negative coterminals and the standard position angle in seconds.",
      "zh-CN": "适用于角度、弧度和百分度的同终边角计算器。快速找出多个正负同终边角和标准位置角。",
      "zh-TW": "適用於角度、弧度和百分度的同終邊角計算機。快速找出多個正負同終邊角和標準位置角。",
      ja: "度、ラジアン、グラードの同終辺角を求める計算機。正負の同終辺角と標準位置角をすばやく確認できます。",
      ko: "도, 라디안, 그라디안의 동종각을 계산합니다. 여러 개의 양수·음수 동종각과 표준 위치각을 빠르게 찾으세요.",
      es: "Calculadora de ángulos coterminales en grados, radianes y gradianes. Encuentra varios coterminales positivos y negativos y el ángulo estándar.",
      fr: "Calculateur d’angles coterminaux en degrés, radians et grades. Trouvez plusieurs coterminaux positifs et négatifs ainsi que l’angle standard.",
      de: "Koterminalwinkel-Rechner für Grad, Bogenmaß und Neugrad. Finde mehrere positive und negative Koterminalwinkel sowie den Standardwinkel.",
      pt: "Calculadora de ângulos coterminais em graus, radianos e gradianos. Encontre vários coterminais positivos e negativos e o ângulo padrão.",
      ru: "Калькулятор котерминальных углов для градусов, радиан и градианов. Найдите положительные и отрицательные котерминальные углы и стандартный угол."
    }
  },
  {
    id: "cramers-rule-calculator",
    category: "math",
    slugs: {
      en: "cramers-rule-calculator",
      "zh-CN": "kelamo-faze-jisuanqi",
      "zh-TW": "kelamo-faze-jisuanqi",
      ja: "kurameru-hosoku-keisanki",
      ko: "keuraemeo-beopchik-gyesangi",
      es: "calculadora-regla-cramer",
      fr: "calculatrice-regle-cramer",
      de: "cramersche-regel-rechner",
      pt: "calculadora-regra-cramer",
      ru: "kalkulyator-pravila-kramera"
    },
    titles: {
      en: "Cramer's Rule Calculator - Linear Systems & Determinants",
      "zh-CN": "克莱姆法则计算器 - 线性方程组与行列式",
      "zh-TW": "克拉瑪法則計算器 - 線性方程組與行列式",
      ja: "クラメルの公式計算機 - 連立一次方程式と行列式",
      ko: "크래머 공식 계산기 - 연립일차방정식과 행렬식",
      es: "Calculadora de regla de Cramer - Sistemas y determinantes",
      fr: "Calculatrice règle de Cramer - Systèmes et déterminants",
      de: "Cramersche-Regel-Rechner - Lineare Systeme und Determinanten",
      pt: "Calculadora da regra de Cramer - Sistemas e determinantes",
      ru: "Калькулятор правила Крамера - Системы и определители"
    },
    descriptions: {
      en: "Cramer's Rule calculator for 2×2 and 3×3 linear systems. Solve using determinants with step-by-step results showing D, Dx, Dy, and Dz values instantly.",
      "zh-CN": "用于 2×2 和 3×3 线性方程组的克莱姆法则计算器。用行列式求解，立即显示 D、Dx、Dy、Dz 的分步结果。",
      "zh-TW": "適用於 2×2 和 3×3 線性方程組的克拉瑪法則計算器。用行列式求解，立即顯示 D、Dx、Dy、Dz 的分步結果。",
      ja: "2×2・3×3 の連立一次方程式をクラメルの公式で計算。D、Dx、Dy、Dz の行列式を含む手順付き結果をすぐに表示します。",
      ko: "2×2 및 3×3 연립일차방정식을 크래머 공식으로 계산합니다. D, Dx, Dy, Dz 행렬식 값을 단계별로 즉시 확인하세요.",
      es: "Calculadora de la regla de Cramer para sistemas lineales 2×2 y 3×3. Resuelve con determinantes y muestra D, Dx, Dy y Dz al instante.",
      fr: "Calculatrice de la règle de Cramer pour systèmes linéaires 2×2 et 3×3. Résolvez par déterminants avec D, Dx, Dy et Dz étape par étape.",
      de: "Rechner für die Cramersche Regel bei 2×2- und 3×3-Systemen. Löst mit Determinanten und zeigt D, Dx, Dy und Dz Schritt für Schritt.",
      pt: "Calculadora da regra de Cramer para sistemas lineares 2×2 e 3×3. Resolva com determinantes e veja D, Dx, Dy e Dz passo a passo.",
      ru: "Калькулятор правила Крамера для систем 2×2 и 3×3. Решайте через определители с пошаговыми значениями D, Dx, Dy и Dz."
    }
  },
  {
    id: "cross-multiplication-calculator",
    category: "math",
    slugs: {
      en: "cross-multiplication-calculator",
      "zh-CN": "jiaochaxiangcheng-jisuanqi",
      "zh-TW": "jiaochaxiangcheng-jisuanqi",
      ja: "kousa-kakezan-keisanki",
      ko: "bilye-gyesangi",
      es: "calculadora-regla-de-tres",
      fr: "calculateur-proportions",
      de: "proportionsrechner",
      pt: "calculadora-proporcoes",
      ru: "kalkulyator-proportsiy"
    },
    titles: {
      en: "Cross Multiplication Calculator - Solve Proportions & Ratios",
      "zh-CN": "交叉相乘计算器 - 比例与比值求解",
      "zh-TW": "交叉相乘計算器 - 比例與比值求解",
      ja: "比例計算機 - 交差掛け算で比率を解く",
      ko: "비례 계산기 - 교차곱으로 비율과 비 구하기",
      es: "Calculadora de proporciones - regla de tres",
      fr: "Calculatrice de proportions - règle de trois",
      de: "Proportionsrechner - Verhältnisse lösen",
      pt: "Calculadora de proporções - regra de três",
      ru: "Калькулятор пропорций - решение отношений"
    },
    descriptions: {
      en: "Cross multiplication calculator to solve proportions a/b = c/x for the unknown x. Perfect for recipe scaling, unit conversion, and ratio problems instantly.",
      "zh-CN": "交叉相乘计算器，用于求解 a/b = c/x 中未知的 x。适合配方换算、单位转换和比值问题。",
      "zh-TW": "交叉相乘計算器，可解 a/b = c/x 中未知的 x。適合配方換算、單位轉換與比值問題。",
      ja: "a/b = c/x の未知数 x を交差掛け算で求める計算機。レシピ調整、単位変換、比率問題に最適です。",
      ko: "a/b = c/x의 미지수 x를 교차곱으로 푸는 계산기입니다. 레시피 비율 조정, 단위 변환, 비율 문제에 적합합니다.",
      es: "Calculadora para resolver a/b = c/x y encontrar x. Ideal para recetas, conversiones de unidades y problemas de proporción.",
      fr: "Calculatrice pour résoudre a/b = c/x et trouver x. Idéale pour les recettes, conversions d’unités et problèmes de proportion.",
      de: "Rechner zum Lösen von a/b = c/x und Finden von x. Ideal für Rezepte, Einheitenumrechnung und Verhältnisaufgaben.",
      pt: "Calculadora para resolver a/b = c/x e encontrar x. Ideal para receitas, conversão de unidades e problemas de proporção.",
      ru: "Калькулятор для решения a/b = c/x и поиска x. Подходит для рецептов, перевода единиц и задач на пропорции."
    }
  },
  {
    id: "complex-root-calculator",
    category: "math",
    slugs: {
      en: "complex-root-calculator",
      "zh-CN": "fu-shu-gen-ji-suan-qi",
      "zh-TW": "fu-shu-gen-ji-suan-qi",
      ja: "fukusuu-kon-keisanki",
      ko: "boksu-geun-gyesangi",
      es: "calculadora-raices-complejas",
      fr: "calculateur-racines-complexes",
      de: "komplexe-wurzelrechner",
      pt: "calculadora-raizes-complexas",
      ru: "kompleksnyi-kalkulyator-korney"
    },
    titles: {
      en: "Complex Root Calculator - N-th Roots via De Moivre",
      "zh-CN": "复数根计算器：用德莫弗定理求 n 次根",
      "zh-TW": "複數根計算器：用德莫弗定理求 n 次根",
      ja: "複素数の根計算機：ド・モアブルの定理で n 乗根",
      ko: "복소수 근 계산기: 드무아브르 정리로 n제곱근",
      es: "Calculadora de raíces complejas: n-ésimas por De Moivre",
      fr: "Calculateur de racines complexes : n-ièmes par De Moivre",
      de: "Komplexe Wurzeln berechnen: n-te Wurzeln nach De Moivre",
      pt: "Calculadora de raízes complexas: n-ésimas por De Moivre",
      ru: "Калькулятор комплексных корней: n-е корни по Муавру"
    },
    descriptions: {
      en: "Calculate all n-th roots of any complex number with De Moivre's Theorem. Polar form, principal root, and every conjugate root in one click.",
      "zh-CN": "用德莫弗定理求任意复数的所有 n 次根，显示极形式、主根和共轭根，一键完成。",
      "zh-TW": "用德莫弗定理求任意複數的所有 n 次根，顯示極形式、主根與共軛根，一鍵完成。",
      ja: "ド・モアブルの定理で任意の複素数の n 乗根をすべて求め、極形式・主根・共役根を一度に表示します。",
      ko: "드무아브르 정리로 임의의 복소수의 모든 n제곱근을 구하고, 극형식·주근·켤레근을 한 번에 보여줍니다.",
      es: "Calcula todas las raíces n-ésimas de cualquier número complejo con el teorema de De Moivre, en forma polar, raíz principal y conjugadas.",
      fr: "Calculez toutes les racines n-ièmes d’un nombre complexe avec le théorème de De Moivre, en forme polaire, racine principale et conjuguées.",
      de: "Berechnen Sie alle n-ten Wurzeln einer beliebigen komplexen Zahl mit dem Satz von De Moivre, inklusive Polarform, Hauptwurzel und Konjugierten.",
      pt: "Calcule todas as raízes n-ésimas de qualquer número complexo com o teorema de De Moivre, em forma polar, raiz principal e conjugadas.",
      ru: "Вычисляйте все n-е корни любого комплексного числа по теореме Муавра: полярная форма, главный корень и сопряжённые корни."
    }
  },
  {
    id: "condense-logarithms-calculator",
    category: "math",
    slugs: {
      en: "condense-logarithms-calculator",
      "zh-CN": "duishu-huajian-jisuanqi",
      "zh-TW": "duishu-huajian-jisuanqi",
      ja: "taisu-kenyaku-keisanki",
      ko: "rogeu-gansohwa-gyeonsangi",
      es: "calculadora-condensar-logaritmos",
      fr: "calculateur-condenser-logarithmes",
      de: "logarithmen-zusammenfassen-rechner",
      pt: "calculadora-condensar-logaritmos",
      ru: "kalkulyator-logarifmov-svedenie"
    },
    titles: {
      en: "Condense Logarithms Calculator - Combine Log Expressions",
      "zh-CN": "对数化简计算器 - 合并对数表达式",
      "zh-TW": "對數化簡計算器 - 合併對數表達式",
      ja: "対数簡約計算機 - 対数式をまとめる",
      ko: "로그 간소화 계산기 - 로그식 합치기",
      es: "Calculadora de logaritmos - Condensa expresiones",
      fr: "Calculatrice de logarithmes - Condenser les expressions",
      de: "Logarithmen-Rechner - Ausdrücke zusammenfassen",
      pt: "Calculadora de logaritmos - Condense expressões",
      ru: "Калькулятор логарифмов - Сведение выражений"
    },
    descriptions: {
      en: "Condense logarithm sums, differences, and scalar multiples into a single logarithm using product, quotient, and power rules. Supports any base.",
      "zh-CN": "使用乘积、商和幂法则，将对数的和、差与倍数化简为一个对数。支持任意底数。",
      "zh-TW": "使用乘積、商與冪法則，將對數的和、差與倍數化簡為單一對數。支援任意底數。",
      ja: "積・商・べきの法則で対数の和、差、係数倍を1つの対数に簡約します。任意の底に対応。",
      ko: "곱·나눗셈·거듭제곱 법칙으로 로그의 합, 차, 계수배를 하나의 로그로 간소화합니다. 모든 밑을 지원합니다.",
      es: "Condensa sumas, restas y múltiplos de logaritmos en un solo logaritmo con las reglas del producto, cociente y potencia. Compatible con cualquier base.",
      fr: "Condensez sommes, différences et multiples de logarithmes en un seul logarithme avec les règles du produit, du quotient et de la puissance. Toute base.",
      de: "Fasse Summen, Differenzen und Vielfache von Logarithmen mit Produkt-, Quotienten- und Potenzregel zu einem Logarithmus zusammen. Für jede Basis.",
      pt: "Condense somas, diferenças e múltiplos de logaritmos em um único logaritmo usando as regras do produto, do quociente e da potência. Qualquer base.",
      ru: "Сводите суммы, разности и кратные множители логарифмов к одному логарифму по правилам произведения, частного и степени. Любое основание."
    }
  },
  {
    id: "condition-number-calculator",
    category: "math",
    slugs: {
      en: "condition-number-calculator",
      "zh-CN": "tiaojianshu-jisuanqi",
      "zh-TW": "tiaojianshu-jisuanqi",
      ja: "joukensuu-keisanki",
      ko: "jogeonsu-gyesangi",
      es: "calculadora-numero-condicion",
      fr: "calculateur-nombre-condition",
      de: "konditionszahl-rechner",
      pt: "calculadora-numero-condicao",
      ru: "chislo-obuslovlennosti-matricy"
    },
    titles: {
      en: "Condition Number Calculator - Matrix Stability",
      "zh-CN": "条件数计算器 - 矩阵条件与稳定性",
      "zh-TW": "條件數計算器 - 矩陣條件與穩定性",
      ja: "条件数計算機 - 行列の条件と安定性",
      ko: "조건수 계산기 - 행렬 조건과 안정성",
      es: "Calculadora de número de condición de matrices",
      fr: "Calculateur du nombre de condition des matrices",
      de: "Konditionszahl-Rechner für Matrizen",
      pt: "Calculadora de número de condição de matrizes",
      ru: "Калькулятор числа обусловленности матрицы"
    },
    descriptions: {
      en: "Compute the condition number of 2x2 or 3x3 matrices in the 1-norm, infinity-norm, or Frobenius norm. Diagnose numerical stability instantly.",
      "zh-CN": "计算 2×2 或 3×3 矩阵在 1 范数、无穷范数或 Frobenius 范数下的条件数，立即判断数值稳定性。",
      "zh-TW": "計算 2×2 或 3×3 矩陣在 1 範數、無窮範數或 Frobenius 範數下的條件數，立即判斷數值穩定性。",
      ja: "2×2 または 3×3 行列の条件数を 1ノルム、∞ノルム、Frobenius ノルムで計算し、数値安定性をすぐに判定します。",
      ko: "2×2 또는 3×3 행렬의 조건수를 1-노름, 무한노름, Frobenius 노름으로 계산해 수치 안정성을 즉시 확인합니다.",
      es: "Calcula el número de condición de matrices 2×2 o 3×3 con la norma 1, la norma infinito o la norma de Frobenius y evalúa su estabilidad.",
      fr: "Calculez le nombre de condition de matrices 2×2 ou 3×3 avec la norme 1, la norme infinie ou la norme de Frobenius, et évaluez leur stabilité.",
      de: "Berechnen Sie die Konditionszahl von 2×2- oder 3×3-Matrizen mit 1-Norm, Unendlich-Norm oder Frobenius-Norm und beurteilen Sie die Stabilität.",
      pt: "Calcule o número de condição de matrizes 2×2 ou 3×3 com a norma 1, a norma infinito ou a norma de Frobenius e avalie a estabilidade.",
      ru: "Вычисляйте число обусловленности матриц 2×2 и 3×3 в норме 1, бесконечной норме или норме Фробениуса и оценивайте устойчивость."
    }
  },
  {
    id: "conic-sections-calculator",
    category: "math",
    slugs: {
      en: "conic-sections-calculator",
      "zh-CN": "yuan-zhui-qu-xian-ji-suan-qi",
      "zh-TW": "yuan-zhui-qu-xian-ji-suan-qi",
      ja: "ensui-kyokusen-keisanki",
      ko: "wonppokgokseon-gyesangi",
      es: "calculadora-secciones-conicas",
      fr: "calculatrice-sections-coniques",
      de: "kegelschnitte-rechner",
      pt: "calculadora-secoes-conicas",
      ru: "kalkulyator-konicheskih-sechenij"
    },
    titles: {
      en: "Conic Sections Calculator - Identify Conics by Discriminant",
      "zh-CN": "圆锥曲线计算器 - 用判别式识别曲线",
      "zh-TW": "圓錐曲線計算器 - 用判別式辨識曲線",
      ja: "円錐曲線計算機 - 判別式で曲線を判定",
      ko: "원뿔곡선 계산기 - 판별식으로 곡선 판별",
      es: "Calculadora de secciones cónicas por discriminante",
      fr: "Calculatrice de coniques par discriminant",
      de: "Kegelschnitte-Rechner mit Diskriminante",
      pt: "Calculadora de cônicas pelo discriminante",
      ru: "Калькулятор конических сечений по дискриминанту"
    },
    descriptions: {
      en: "Identify circle, ellipse, parabola, or hyperbola from the general equation Ax^2+Bxy+Cy^2+Dx+Ey+F=0 using the discriminant. Step-by-step result.",
      "zh-CN": "用判别式从一般方程 Ax^2+Bxy+Cy^2+Dx+Ey+F=0 识别圆、椭圆、抛物线或双曲线，并给出分步结果。",
      "zh-TW": "用判別式從一般方程 Ax^2+Bxy+Cy^2+Dx+Ey+F=0 辨識圓、橢圓、拋物線或雙曲線，並提供逐步結果。",
      ja: "一般式 Ax^2+Bxy+Cy^2+Dx+Ey+F=0 から判別式で円、楕円、放物線、双曲線を判定し、手順付き結果を表示します。",
      ko: "일반식 Ax^2+Bxy+Cy^2+Dx+Ey+F=0에서 판별식으로 원, 타원, 포물선, 쌍곡선을 판별하고 단계별 결과를 제공합니다.",
      es: "Identifica círculo, elipse, parábola o hipérbola desde Ax^2+Bxy+Cy^2+Dx+Ey+F=0 con el discriminante y resultado paso a paso.",
      fr: "Identifiez cercle, ellipse, parabole ou hyperbole depuis Ax^2+Bxy+Cy^2+Dx+Ey+F=0 avec le discriminant et un résultat détaillé.",
      de: "Erkenne Kreis, Ellipse, Parabel oder Hyperbel aus Ax^2+Bxy+Cy^2+Dx+Ey+F=0 per Diskriminante mit Schritt-für-Schritt-Ergebnis.",
      pt: "Identifique círculo, elipse, parábola ou hipérbole em Ax^2+Bxy+Cy^2+Dx+Ey+F=0 usando o discriminante, com resultado passo a passo.",
      ru: "Определяйте окружность, эллипс, параболу или гиперболу из Ax^2+Bxy+Cy^2+Dx+Ey+F=0 по дискриминанту с пошаговым результатом."
    }
  },
  {
    id: "consecutive-integers-calculator",
    category: "math",
    slugs: {
      en: "consecutive-integers-calculator",
      "zh-CN": "lianxu-zhengshu-jisuanqi",
      "zh-TW": "lianxu-zhengshu-jisuanqi",
      ja: "renzoku-seisuu-keisanki",
      ko: "yeonsok-jeongsu-gyesangi",
      es: "calculadora-numeros-consecutivos",
      fr: "calculatrice-entiers-consecutifs",
      de: "aufeinanderfolgende-ganze-zahlen-rechner",
      pt: "calculadora-inteiros-consecutivos",
      ru: "kalkulyator-posledovatelnykh-celikh-chisel"
    },
    titles: {
      en: "Consecutive Integers Calculator - Sequences and Sums",
      "zh-CN": "连续整数计算器：序列、求和与分析",
      "zh-TW": "連續整數計算器：序列、求和與分析",
      ja: "連続整数計算機：数列、合計、分析",
      ko: "연속 정수 계산기: 수열, 합, 분석",
      es: "Calculadora de números consecutivos: secuencias y sumas",
      fr: "Calculatrice d'entiers consécutifs : suites et sommes",
      de: "Rechner für aufeinanderfolgende Zahlen: Folgen und Summen",
      pt: "Calculadora de inteiros consecutivos: sequências e somas",
      ru: "Калькулятор последовательных чисел: суммы и анализ"
    },
    descriptions: {
      en: "Generate consecutive integer sequences, find a sequence with a target sum, or analyze a list. Returns sequence, sum, average, and count instantly.",
      "zh-CN": "生成连续整数序列、按目标和反推序列，或分析列表；即时返回序列、总和、平均值和数量。",
      "zh-TW": "產生連續整數序列、依目標和反推序列，或分析清單；立即回傳序列、總和、平均值與數量。",
      ja: "連続整数列を生成し、目標の合計から数列を求め、一覧を分析。数列、合計、平均、件数を即時表示します。",
      ko: "연속 정수 수열을 만들고, 목표 합으로 수열을 찾거나 목록을 분석하세요. 수열, 합, 평균, 개수를 즉시 보여줍니다.",
      es: "Genera secuencias de enteros consecutivos, encuentra una secuencia con suma objetivo o analiza una lista. Muestra secuencia, suma, promedio y cantidad.",
      fr: "Générez des suites d'entiers consécutifs, trouvez une suite à somme cible ou analysez une liste. Affiche suite, somme, moyenne et nombre.",
      de: "Erzeuge Folgen aufeinanderfolgender ganzer Zahlen, finde eine Folge mit Zielsumme oder analysiere eine Liste. Zeigt Folge, Summe, Mittelwert und Anzahl.",
      pt: "Gere sequências de inteiros consecutivos, encontre uma sequência com soma-alvo ou analise uma lista. Mostra sequência, soma, média e contagem.",
      ru: "Создавайте последовательные целые числа, ищите последовательность по сумме или анализируйте список. Показывает последовательность, сумму, среднее и количество."
    }
  },
  {
    id: "cholesky-decomposition-calculator",
    category: "math",
    slugs: {
      en: "cholesky-decomposition-calculator",
      "zh-CN": "cholesky-fenjie-ji-suanqi",
      "zh-TW": "cholesky-fenjie-ji-suanqi",
      ja: "choreresuki-bunkai-keisanki",
      ko: "koleseuki-bunhae-gyeong-sangi",
      es: "calculadora-descomposicion-cholesky",
      fr: "calculatrice-decomposition-cholesky",
      de: "cholesky-zerlegung-rechner",
      pt: "calculadora-decomposicao-cholesky",
      ru: "kalkulyator-razlozheniya-holescogo"
    },
    titles: {
      en: "Cholesky Decomposition Calculator - Matrix Factorization",
      "zh-CN": "Cholesky分解计算器",
      "zh-TW": "Cholesky分解計算器",
      ja: "コレスキー分解計算機",
      ko: "촐레스키 분해 계산기",
      es: "Calculadora de descomposición de Cholesky",
      fr: "Calculateur de décomposition de Cholesky",
      de: "Cholesky-Zerlegungsrechner",
      pt: "Calculadora de decomposição de Cholesky",
      ru: "Калькулятор разложения Холецкого"
    },
    descriptions: {
      en: "Compute Cholesky decomposition A = LLᵀ for symmetric positive definite matrices. Supports 2×2, 3×3, 4×4 inputs for linear algebra and statistics.",
      "zh-CN": "计算对称正定矩阵的 Cholesky 分解 A = LLᵀ，支持 2×2、3×3 和 4×4 输入，适用于线性代数和统计。",
      "zh-TW": "計算對稱正定矩陣的 Cholesky 分解 A = LLᵀ，支援 2×2、3×3、4×4 輸入，適用於線性代數與統計。",
      ja: "対称正定値行列の Cholesky 分解 A = LLᵀ を計算。2×2、3×3、4×4 入力に対応し、線形代数と統計に使えます。",
      ko: "대칭 양의 정부호 행렬의 Cholesky 분해 A = LLᵀ를 계산합니다. 2×2, 3×3, 4×4 입력을 지원하며 선형대수와 통계에 유용합니다.",
      es: "Calcula la descomposición de Cholesky A = LLᵀ para matrices simétricas definidas positivas. Admite entradas 2×2, 3×3 y 4×4.",
      fr: "Calculez la décomposition de Cholesky A = LLᵀ pour les matrices symétriques définies positives. Prend en charge les entrées 2×2, 3×3 et 4×4.",
      de: "Berechnen Sie die Cholesky-Zerlegung A = LLᵀ für symmetrisch positiv definite Matrizen. Unterstützt 2×2-, 3×3- und 4×4-Eingaben.",
      pt: "Calcule a decomposição de Cholesky A = LLᵀ para matrizes simétricas definidas positivas. Suporta entradas 2×2, 3×3 e 4×4.",
      ru: "Вычисляйте разложение Холецкого A = LLᵀ для симметричных положительно определённых матриц. Поддерживаются размеры 2×2, 3×3 и 4×4."
    }
  },
  {
    id: "chord-length-calculator",
    category: "math",
    slugs: {
      en: "chord-length-calculator",
      "zh-CN": "xian-chang-ji-suan-qi",
      "zh-TW": "xian-chang-ji-suan-qi",
      ja: "gencho-keisanki",
      ko: "hyeon-ui-gil-i-gyesangi",
      es: "calculadora-cuerda",
      fr: "calculatrice-corde",
      de: "sehnenrechner",
      pt: "calculadora-corda",
      ru: "kalkulyator-dliny-hordy"
    },
    titles: {
      en: "Chord Length Calculator - Chord, Radius & Central Angle",
      "zh-CN": "弦长计算器 - 求弦长、半径或圆心角",
      "zh-TW": "弦長計算器 - 求弦長、半徑或圓心角",
      ja: "弦長計算機 - 弦長、半径、中心角",
      ko: "현의 길이 계산기 - 현, 반지름, 중심각",
      es: "Calculadora de cuerda - radio y ángulo central",
      fr: "Calculatrice de corde - rayon et angle central",
      de: "Sehnenrechner - Sehne, Radius und Mittelpunktswinkel",
      pt: "Calculadora de corda - raio e ângulo central",
      ru: "Калькулятор хорды - хорда, радиус и центральный угол"
    },
    descriptions: {
      en: "Calculate chord length from radius and central angle, or find radius and angle with the formula c = 2r·sin(θ/2). Free online tool for circle geometry problems.",
      "zh-CN": "根据半径和圆心角计算弦长，或根据弦长与角度求半径，亦可由半径和弦长求出圆心角。免费圆几何在线工具。",
      "zh-TW": "根據半徑和圓心角計算弦長，或根據弦長與角度求半徑，也可由半徑和弦長求出圓心角。免費圓幾何線上工具。",
      ja: "半径と中心角から弦長を求めたり、弦長と角度から半径を求めたり、半径と弦長から中心角を求められる無料の円幾何ツール。",
      ko: "반지름과 중심각으로 현의 길이를 계산하고, 현과 각도로 반지름을 구하거나, 반지름과 현으로 중심각을 구하는 무료 원 기하 도구입니다.",
      es: "Calcula la longitud de una cuerda con el radio y el ángulo central, o encuentra radio y ángulo con c = 2r·sin(θ/2).",
      fr: "Calculez la longueur d’une corde à partir du rayon et de l’angle central, ou trouvez rayon et angle avec c = 2r·sin(θ/2).",
      de: "Berechne die Sehnenlänge aus Radius und Mittelpunktswinkel oder finde Radius und Winkel mit c = 2r·sin(θ/2).",
      pt: "Calcule o comprimento da corda com raio e ângulo central, ou encontre raio e ângulo com c = 2r·sen(θ/2).",
      ru: "Вычисляйте длину хорды по радиусу и центральному углу или находите радиус и угол по формуле c = 2r·sin(θ/2)."
    }
  },
  {
    id: "circle-calculator",
    category: "math",
    slugs: {
      en: "circle-calculator",
      "zh-CN": "yuan-xing-ji-suan-qi",
      "zh-TW": "yuan-xing-ji-suan-qi",
      ja: "en-keisanki",
      ko: "won-gyesangi",
      es: "calculadora-circulo",
      fr: "calculateur-cercle",
      de: "kreisrechner",
      pt: "calculadora-circulo",
      ru: "kalkulyator-kruga"
    },
    titles: {
      en: "Circle Calculator - Area, Circumference, Radius & Diameter",
      "zh-CN": "圆形计算器 - 面积、周长、半径与直径",
      "zh-TW": "圓形計算機 - 面積、圓周、半徑與直徑",
      ja: "円計算機 - 面積、円周、半径、直径",
      ko: "원 계산기 - 넓이, 둘레, 반지름, 지름",
      es: "Calculadora de círculo - área, circunferencia, radio y diámetro",
      fr: "Calculateur de cercle - aire, circonférence, rayon et diamètre",
      de: "Kreisrechner - Fläche, Umfang, Radius und Durchmesser",
      pt: "Calculadora de círculo - área, circunferência, raio e diâmetro",
      ru: "Калькулятор круга - площадь, окружность, радиус и диаметр"
    },
    descriptions: {
      en: "Calculate circle area, circumference, radius, and diameter from any known measurement. Enter radius, diameter, circumference, or area to get all properties.",
      "zh-CN": "根据任意已知值计算圆的面积、周长、半径和直径。输入半径、直径、周长或面积即可得到全部属性。",
      "zh-TW": "根據任意已知值計算圓的面積、圓周、半徑與直徑。輸入半徑、直徑、圓周或面積即可得到全部屬性。",
      ja: "既知の値から円の面積、円周、半径、直径を計算します。半径、直径、円周、面積を入力すると全属性を求められます。",
      ko: "알려진 값으로 원의 넓이, 둘레, 반지름, 지름을 계산합니다. 반지름, 지름, 둘레, 넓이를 입력하면 모든 값을 얻을 수 있습니다.",
      es: "Calcula el área, la circunferencia, el radio y el diámetro de un círculo a partir de cualquier dato conocido. Introduce radio, diámetro, circunferencia o área.",
      fr: "Calculez l’aire, la circonférence, le rayon et le diamètre d’un cercle à partir d’une mesure connue. Saisissez rayon, diamètre, circonférence ou aire.",
      de: "Berechnen Sie Kreisfläche, Umfang, Radius und Durchmesser aus einem bekannten Wert. Geben Sie Radius, Durchmesser, Umfang oder Fläche ein.",
      pt: "Calcule a área, a circunferência, o raio e o diâmetro de um círculo a partir de qualquer medida conhecida. Insira raio, diâmetro, circunferência ou área.",
      ru: "Вычисляйте площадь, окружность, радиус и диаметр круга по известной величине. Введите радиус, диаметр, окружность или площадь."
    }
  },
  {
    id: "circle-theorems-calculator",
    category: "math",
    slugs: {
      en: "circle-theorems-calculator",
      "zh-CN": "yuan-de-dingli-jisuanqi",
      "zh-TW": "yuan-de-dingli-jisuanqi",
      ja: "en-no-teiri-keisanki",
      ko: "won-ui-jeongli-gyesangi",
      es: "calculadora-teoremas-circunferencia",
      fr: "calculateur-theoremes-cercle",
      de: "kreiswinkelsatz-rechner",
      pt: "calculadora-teoremas-circunferencia",
      ru: "kalkulyator-teorem-okruzhnosti"
    },
    titles: {
      en: "Circle Theorems Calculator - Angle & Arc Problems",
      "zh-CN": "圆的定理计算器 - 圆周角与内接四边形",
      "zh-TW": "圓的定理計算器 - 圓周角與內接四邊形",
      ja: "円の定理計算機 - 円周角と内接四角形",
      ko: "원의 정리 계산기 - 원주각과 내접사각형",
      es: "Calculadora de teoremas de la circunferencia",
      fr: "Calculateur de théorèmes du cercle",
      de: "Kreiswinkelsatz-Rechner",
      pt: "Calculadora de teoremas da circunferência",
      ru: "Калькулятор теорем окружности"
    },
    descriptions: {
      en: "Apply circle theorems to solve inscribed angle, central angle, cyclic quadrilateral, and tangent-chord problems. Includes theorem explanations with results.",
      "zh-CN": "应用圆的定理，求解圆周角、圆心角、圆内接四边形和切线-弦问题，并附带定理说明与结果。",
      "zh-TW": "應用圓的定理，求解圓周角、圓心角、圓內接四邊形與切線-弦問題，並附上定理說明與結果。",
      ja: "円周角、中心角、内接四角形、接線と弦の問題を円の定理で解き、定理の説明と結果も表示します。",
      ko: "원의 정리를 적용해 원주각, 중심각, 내접사각형, 접선-현 문제를 풀고 정리 설명과 결과를 함께 제공합니다.",
      es: "Resuelve ángulos inscritos, ángulos centrales, cuadriláteros cíclicos y ángulos tangente-cuerda con explicaciones y resultados.",
      fr: "Résolvez les angles inscrits, angles au centre, quadrilatères cycliques et angles tangente-corde avec explications et résultats.",
      de: "Lösen Sie Umfangswinkel, Mittelpunktswinkel, Sehnenvierecke und Tangenten-Sehnen-Probleme mit Erklärungen und Ergebnissen.",
      pt: "Resolva ângulos inscritos, ângulos centrais, quadriláteros cíclicos e ângulos tangente-corda com explicações e resultados.",
      ru: "Решайте вписанные углы, центральные углы, вписанные четырёхугольники и задачи с касательной и хордой с пояснениями и результатами."
    }
  },
  {
    id: "circumference-calculator",
    category: "math",
    slugs: {
      en: "circumference-calculator",
      "zh-CN": "yuan-zhou-chang-ji-suan-qi",
      "zh-TW": "yuan-zhou-chang-ji-suan-qi",
      ja: "enshu-keisan-ki",
      ko: "wonju-gyesangi",
      es: "calculadora-circunferencia",
      fr: "calculateur-circonference",
      de: "umfang-rechner",
      pt: "calculadora-circunferencia",
      ru: "kalkulyator-dliny-okruzhnosti"
    },
    titles: {
      en: "Circumference Calculator - Radius or Diameter to Perimeter",
      "zh-CN": "圆周长计算器 - 由半径或直径求周长",
      "zh-TW": "圓周長計算器 - 由半徑或直徑求周長",
      ja: "円周計算機 - 半径または直径から周長を計算",
      ko: "원주 계산기 - 반지름 또는 지름으로 둘레 계산",
      es: "Calculadora de circunferencia - radio o diámetro",
      fr: "Calculateur de circonférence - rayon ou diamètre",
      de: "Umfang-Rechner - Radius oder Durchmesser",
      pt: "Calculadora de circunferência - raio ou diâmetro",
      ru: "Калькулятор длины окружности - радиус или диаметр"
    },
    descriptions: {
      en: "Calculate circle circumference from radius or diameter using C = 2πr and C = πd. Free online circumference calculator with instant results.",
      "zh-CN": "使用 C = 2πr 和 C = πd，根据半径或直径计算圆周长。免费在线圆周长计算器，即时给出结果。",
      "zh-TW": "使用 C = 2πr 與 C = πd，依半徑或直徑計算圓周長。免費線上圓周長計算器，即時取得結果。",
      ja: "C = 2πr と C = πd を使い、半径または直径から円周を計算します。無料のオンライン円周計算機で即座に結果を表示。",
      ko: "C = 2πr 및 C = πd로 반지름이나 지름에서 원주를 계산하세요. 무료 온라인 원주 계산기로 즉시 결과를 확인할 수 있습니다.",
      es: "Calcula la circunferencia de un círculo desde el radio o el diámetro con C = 2πr y C = πd. Resultados instantáneos gratis.",
      fr: "Calculez la circonférence d'un cercle à partir du rayon ou du diamètre avec C = 2πr et C = πd. Résultats instantanés gratuits.",
      de: "Berechnen Sie den Kreisumfang aus Radius oder Durchmesser mit C = 2πr und C = πd. Kostenloser Online-Rechner mit Sofortergebnis.",
      pt: "Calcule a circunferência de um círculo pelo raio ou diâmetro com C = 2πr e C = πd. Calculadora online grátis com resultado instantâneo.",
      ru: "Рассчитайте длину окружности по радиусу или диаметру по формулам C = 2πr и C = πd. Бесплатный онлайн-калькулятор с мгновенным результатом."
    }
  },
  {
    id: "cofunction-calculator",
    category: "math",
    slugs: {
      en: "cofunction-calculator",
      "zh-CN": "yuhanshu-jisuanqi",
      "zh-TW": "yuhanshu-jisuanqi",
      ja: "yo-kansu-keisan",
      ko: "yeohamsu-gyesan",
      es: "calculadora-cofunciones",
      fr: "calculateur-cofonctions",
      de: "kofunktionsrechner",
      pt: "calculadora-cofuncoes",
      ru: "kalkulyator-kofunktsiy"
    },
    titles: {
      en: "Cofunction Calculator - Trigonometric Cofunction Identities",
      "zh-CN": "余函数计算器",
      "zh-TW": "餘函數計算器",
      ja: "余関数計算機",
      ko: "여함수 계산기",
      es: "Calculadora de cofunciones",
      fr: "Calculateur de cofonctions",
      de: "Kofunktionsrechner",
      pt: "Calculadora de cofunções",
      ru: "Калькулятор кофункций"
    },
    descriptions: {
      en: "Cofunction calculator finds sin/cos, tan/cot, sec/csc relationships for complementary angles. Explore trigonometric cofunction identities instantly.",
      "zh-CN": "余函数计算器可快速查看补角下的 sin/cos、tan/cot、sec/csc 关系，立即探索三角函数余函数恒等式。",
      "zh-TW": "餘函數計算器可快速查看補角下的 sin/cos、tan/cot、sec/csc 關係，立即探索三角函數餘函數恆等式。",
      ja: "余関数計算機で、補角における sin/cos、tan/cot、sec/csc の関係をすぐ確認。三角関数の余関数恒等式を一目で。",
      ko: "여함수 계산기로 보각에서의 sin/cos, tan/cot, sec/csc 관계를 바로 확인하고 삼각함수 여함수 항등식을 알아보세요.",
      es: "Calculadora de cofunciones para ver sin/cos, tan/cot y sec/csc en ángulos complementarios. Explora identidades trigonométricas al instante.",
      fr: "Calculateur de cofonctions pour voir les rapports sin/cos, tan/cot et sec/csc aux angles complémentaires. Explorez les identités trigonométriques.",
      de: "Kofunktionsrechner für sin/cos-, tan/cot- und sec/csc-Beziehungen bei Ergänzungswinkeln. Trigonometrische Identitäten sofort prüfen.",
      pt: "Calculadora de cofunções para ver relações sin/cos, tan/cot e sec/csc em ângulos complementares. Explore identidades trigonométricas na hora.",
      ru: "Калькулятор кофункций показывает связи sin/cos, tan/cot и sec/csc для дополнительных углов. Мгновенно изучайте тригонометрические тождества."
    }
  },
  {
    id: "coin-rotation-paradox",
    category: "math",
    slugs: {
      en: "coin-rotation-paradox",
      "zh-CN": "yingbi-xuanzhuan-bei-lun-jisuanqi",
      "zh-TW": "yingbi-xuanzhuan-bei-lun-jisuanqi",
      ja: "koimawari-gyakubetsu-keisanki",
      ko: "dongjeongbeom-hoejeon-bigyo-gyeonsan-gi",
      es: "calculadora-paradoja-rotacion-moneda",
      fr: "calculateur-paradoxe-rotation-piece",
      de: "muenz-rotations-paradoxon-rechner",
      pt: "calculadora-paradoxo-rotacao-moeda",
      ru: "paradoks-vrashcheniya-monety-kalkulyator"
    },
    titles: {
      en: "Coin Rotation Paradox Calculator - Rolling Coin Rotations",
      "zh-CN": "硬币旋转悖论计算器",
      "zh-TW": "硬幣旋轉悖論計算器",
      ja: "コイン回転のパラドックス計算機",
      ko: "동전 회전 역설 계산기",
      es: "Calculadora de la paradoja de rotación de una moneda",
      fr: "Calculateur du paradoxe de rotation d’une pièce",
      de: "Rechner für das Münz-Rotationsparadoxon",
      pt: "Calculadora do paradoxo da rotação da moeda",
      ru: "Калькулятор парадокса вращения монеты"
    },
    descriptions: {
      en: "Coin rotation paradox calculator shows how many times a rolling coin rotates around a fixed coin. Visualize this surprising geometry result instantly.",
      "zh-CN": "硬币旋转悖论计算器可显示一个滚动硬币绕固定硬币旋转多少圈，立刻呈现这一惊人的几何结果。",
      "zh-TW": "硬幣旋轉悖論計算器可顯示一個滾動硬幣繞固定硬幣會旋轉幾圈，立即呈現這個令人驚訝的幾何結果。",
      ja: "転がるコインが固定コインのまわりで何回回転するかを表示する計算機。驚きの幾何学的結果をすぐに確認できます。",
      ko: "굴러가는 동전이 고정 동전 주위를 몇 번 회전하는지 보여주는 계산기입니다. 놀라운 기하학 결과를 바로 확인하세요.",
      es: "Calcula cuántas vueltas da una moneda al rodar alrededor de otra fija. Visualiza al instante este sorprendente resultado geométrico.",
      fr: "Calculez combien de tours une pièce roulante effectue autour d’une pièce fixe. Visualisez instantanément ce résultat géométrique surprenant.",
      de: "Berechnet, wie oft eine rollende Münze um eine feste Münze rotiert. Das überraschende geometrische Ergebnis sofort sichtbar machen.",
      pt: "Descubra quantas voltas uma moeda em rotação dá ao redor de uma moeda fixa. Visualize instantaneamente esse resultado geométrico surpreendente.",
      ru: "Показывает, сколько раз катящаяся монета вращается вокруг неподвижной. Сразу визуализируйте этот неожиданный геометрический результат."
    }
  },
  {
    id: "collatz-conjecture-calculator",
    category: "math",
    slugs: {
      en: "collatz-conjecture-calculator",
      "zh-CN": "collatz-cai-xiang-ji-suan-qi",
      "zh-TW": "collatz-cai-xiang-ji-suan-qi",
      ja: "korattsu-suisoku-keisan-ki",
      ko: "kollacheu-gangnyeon-gyesan-gi",
      es: "calculadora-conjetura-collatz",
      fr: "calculatrice-conjecture-collatz",
      de: "collatz-vermutung-rechner",
      pt: "calculadora-conjectura-collatz",
      ru: "kalkulyator-gipotezy-kollatca"
    },
    titles: {
      en: "Collatz Conjecture Calculator - 3n+1 Sequence Generator",
      "zh-CN": "Collatz猜想计算器 - 3n+1序列生成器",
      "zh-TW": "Collatz猜想計算器 - 3n+1序列產生器",
      ja: "コラッツ予想計算機 - 3n+1列生成器",
      ko: "콜라츠 추측 계산기 - 3n+1 수열 생성기",
      es: "Calculadora de la conjetura de Collatz - Secuencia 3n+1",
      fr: "Calculatrice de la conjecture de Collatz - Suite 3n+1",
      de: "Rechner zur Collatz-Vermutung - 3n+1-Folge",
      pt: "Calculadora da conjectura de Collatz - Sequência 3n+1",
      ru: "Калькулятор гипотезы Коллатца - последовательность 3n+1"
    },
    descriptions: {
      en: "Collatz conjecture calculator generates the 3n+1 sequence for any positive integer. Explore steps, max value, and stopping time for this unsolved problem.",
      "zh-CN": "Collatz猜想计算器可为任意正整数生成3n+1序列，并查看步骤、最大值和停机时间。",
      "zh-TW": "Collatz猜想計算器可為任意正整數產生3n+1序列，並查看步數、最大值與停機時間。",
      ja: "任意の正の整数の3n+1列を生成し、手順、最大値、停止時間を確認できます。",
      ko: "임의의 양의 정수에 대한 3n+1 수열을 생성하고 단계, 최대값, 정지 시간을 확인하세요.",
      es: "Genera la secuencia 3n+1 para cualquier entero positivo y consulta pasos, valor máximo y tiempo de parada.",
      fr: "Générez la suite 3n+1 pour tout entier positif et consultez les étapes, la valeur max et le temps d’arrêt.",
      de: "Erzeuge die 3n+1-Folge für jede positive Zahl und sieh Schritte, Maximalwert und Stoppzeit.",
      pt: "Gera a sequência 3n+1 para qualquer inteiro positivo e veja passos, valor máximo e tempo de parada.",
      ru: "Генерирует последовательность 3n+1 для любого положительного числа и показывает шаги, максимум и время остановки."
    }
  },
  {
    id: "column-space-calculator",
    category: "math",
    slugs: {
      en: "column-space-calculator",
      "zh-CN": "lie-kong-jisuanqi",
      "zh-TW": "lie-kong-jisuanqi",
      ja: "retsukukan-keisanki",
      ko: "yeol-gonggan-gyesangi",
      es: "calculadora-espacio-columna",
      fr: "calculatrice-espace-colonne",
      de: "spaltenraum-rechner",
      pt: "calculadora-espaco-coluna",
      ru: "kalkulyator-stolbtsovogo-prostranstva"
    },
    titles: {
      en: "Column Space Calculator - Find Matrix Basis Vectors",
      "zh-CN": "列空间计算器：求矩阵基向量",
      "zh-TW": "欄空間計算器：求矩陣基向量",
      ja: "列空間計算機：行列の基底ベクトル",
      ko: "열공간 계산기: 행렬 기저 벡터 찾기",
      es: "Calculadora de espacio columna: bases de matriz",
      fr: "Calculatrice espace colonne : bases de matrice",
      de: "Spaltenraum-Rechner: Matrix-Basisvektoren",
      pt: "Calculadora de espaço coluna: bases da matriz",
      ru: "Калькулятор столбцового пространства: базисы матрицы"
    },
    descriptions: {
      en: "Column space calculator finds basis vectors and dimension of a matrix using row reduction. Check if a vector is in the column space with step-by-step solutions.",
      "zh-CN": "用行化简求矩阵的列空间基向量、主元列和维数，并可检验向量是否属于列空间。",
      "zh-TW": "用列簡化求矩陣的欄空間基向量、主元欄與維度，並可檢驗向量是否屬於欄空間。",
      ja: "行基本変形で行列の列空間の基底ベクトル、ピボット列、次元を求め、ベクトルが属するか判定します。",
      ko: "행렬의 열공간 기저 벡터, 피벗 열, 차원을 행 사다리꼴로 구하고 벡터 포함 여부를 확인합니다.",
      es: "Halla las bases del espacio columna, las columnas pivote y la dimensión con reducción por filas, y comprueba si un vector pertenece.",
      fr: "Trouvez les vecteurs de base, les colonnes pivots et la dimension d’une matrice, et testez l’appartenance d’un vecteur.",
      de: "Bestimme Basisvektoren, Pivotspalten und Dimension einer Matrix per Zeilenreduktion und prüfe, ob ein Vektor dazugehört.",
      pt: "Encontre vetores base, colunas pivô e a dimensão de uma matriz por redução por linhas e teste se um vetor pertence ao espaço coluna.",
      ru: "Найдите базисные векторы, опорные столбцы и размерность матрицы методом строк и проверьте принадлежность вектора."
    }
  },
  {
    id: "comparing-fractions-calculator",
    category: "math",
    slugs: {
      en: "comparing-fractions-calculator",
      "zh-CN": "fen-shu-bi-jiao-ji-suan-qi",
      "zh-TW": "fen-shu-bi-jiao-ji-suan-qi",
      ja: "bunsu-hikaku-keisanki",
      ko: "bunsu-bigyo-gyesangi",
      es: "comparar-fracciones-calculadora",
      fr: "comparaison-fractions-calculatrice",
      de: "bruchvergleich-rechner",
      pt: "comparacao-fracoes-calculadora",
      ru: "sravnenie-drobei-kakaya-bolshe"
    },
    titles: {
      en: "Comparing Fractions Calculator - Which Fraction is Larger",
      "zh-CN": "分数比较计算器：哪个分数更大",
      "zh-TW": "分數比較計算器：哪個分數較大",
      ja: "分数比較計算機：どちらが大きいか",
      ko: "분수 비교 계산기: 어느 분수가 더 큰가",
      es: "Comparar fracciones: cuál es mayor",
      fr: "Comparaison de fractions : laquelle est plus grande",
      de: "Bruchvergleich: Welcher Bruch ist größer",
      pt: "Comparação de frações: qual é maior",
      ru: "Сравнение дробей: какая больше"
    },
    descriptions: {
      en: "Comparing fractions calculator determines which fraction is greater using decimal, common denominator, or cross multiplication methods with clear explanations.",
      "zh-CN": "使用小数、公分母或交叉相乘方法判断两个分数的大小，并附带清晰的步骤说明。",
      "zh-TW": "使用小數、公分母或交叉相乘方法判斷兩個分數的大小，並附上清楚的步驟說明。",
      ja: "小数・通分・交差掛け算で2つの分数の大小を判定し、わかりやすい手順も表示します。",
      ko: "소수, 공통 분모, 교차 곱셈으로 두 분수의 크기를 판별하고, 이해하기 쉬운 단계도 함께 보여줍니다.",
      es: "Compara dos fracciones con decimal, denominador común o multiplicación cruzada, con pasos claros y explicación.",
      fr: "Comparez deux fractions avec les décimales, le dénominateur commun ou la multiplication croisée, avec une explication claire.",
      de: "Vergleiche zwei Brüche mit Dezimalzahl, gemeinsamem Nenner oder Kreuzmultiplikation – mit klarer Schritt-für-Schritt-Erklärung.",
      pt: "Compare duas frações com decimal, denominador comum ou multiplicação cruzada, com explicações passo a passo.",
      ru: "Сравнивайте две дроби через десятичные числа, общий знаменатель или перекрёстное умножение с понятным объяснением."
    }
  },
  {
    id: "binary-fraction-converter",
    category: "math",
    slugs: {
      en: "binary-fraction-converter",
      "zh-CN": "erjinzhi-xiaoshu-zhuanhuanqi",
      "zh-TW": "erjinzhi-xiaoshu-zhuanhuanqi",
      ja: "nishinsu-shosu-henkan",
      ko: "ijin-sojeom-byeonhwan-gi",
      es: "conversor-fracciones-binarias",
      fr: "convertisseur-fractions-binaires",
      de: "binaerbruch-umrechner",
      pt: "conversor-fracoes-binarias",
      ru: "konverter-dvoichnyh-drobej"
    },
    titles: {
      en: "Binary Fraction Converter - Binary to Decimal Fractions",
      "zh-CN": "二进制小数转换器 - 二进制与十进制小数",
      "zh-TW": "二進位小數轉換器 - 二進位與十進位小數",
      ja: "二進小数変換 - 二進数と十進小数",
      ko: "이진 소수 변환기 - 이진수와 십진 소수",
      es: "Conversor de fracciones binarias",
      fr: "Convertisseur de fractions binaires",
      de: "Binärbruch-Umrechner",
      pt: "Conversor de frações binárias",
      ru: "Конвертер двоичных дробей"
    },
    descriptions: {
      en: "Convert binary fractions to decimal and decimal fractions to binary with step-by-step explanations. Supports configurable fractional precision up to 32 bits.",
      "zh-CN": "将二进制小数转为十进制，也可将十进制小数转为二进制，并提供分步说明。支持最高 32 位小数精度。",
      "zh-TW": "將二進位小數轉為十進位，也可將十進位小數轉為二進位，並提供逐步說明。支援最高 32 位小數精度。",
      ja: "二進小数を十進数へ、十進小数を二進数へ変換し、手順付きで解説します。小数精度は最大 32 ビットまで指定できます。",
      ko: "이진 소수를 십진수로, 십진 소수를 이진수로 변환하고 단계별 설명을 제공합니다. 최대 32비트 소수 정밀도를 지원합니다.",
      es: "Convierte fracciones binarias a decimales y decimales a binarias con explicaciones paso a paso. Precisión configurable de hasta 32 bits.",
      fr: "Convertissez les fractions binaires en décimal et les fractions décimales en binaire avec explications étape par étape, jusqu’à 32 bits.",
      de: "Wandle Binärbrüche in Dezimalzahlen und Dezimalbrüche in Binärzahlen um, mit Schritt-für-Schritt-Erklärungen bis 32 Bit.",
      pt: "Converta frações binárias para decimal e frações decimais para binário com explicações passo a passo. Precisão de até 32 bits.",
      ru: "Переводите двоичные дроби в десятичные и десятичные в двоичные с пошаговыми пояснениями. Точность до 32 бит."
    }
  },
  {
    id: "binary-multiplication-calculator",
    category: "math",
    slugs: {
      en: "binary-multiplication-calculator",
      "zh-CN": "er-jin-zhi-cheng-fa-ji-suan-qi",
      "zh-TW": "er-jin-zhi-cheng-fa-ji-suan-qi",
      ja: "nishinsu-kakezan-keisanki",
      ko: "ijinbeop-gopsembub-gyesangi",
      es: "calculadora-multiplicacion-binaria",
      fr: "calculatrice-multiplication-binaire",
      de: "binaer-multiplikation-rechner",
      pt: "calculadora-multiplicacao-binaria",
      ru: "kalkulyator-dvoichnogo-umnozheniya"
    },
    titles: {
      en: "Binary Multiplication Calculator - Multiply Binary Numbers",
      "zh-CN": "二进制乘法计算器 - 相乘二进制数",
      "zh-TW": "二進位乘法計算器 - 相乘二進位數",
      ja: "二進数掛け算計算機 - 二進数を乗算",
      ko: "이진 곱셈 계산기 - 이진수 곱하기",
      es: "Calculadora de multiplicación binaria",
      fr: "Calculatrice de multiplication binaire",
      de: "Binär-Multiplikation Rechner",
      pt: "Calculadora de multiplicação binária",
      ru: "Калькулятор двоичного умножения"
    },
    descriptions: {
      en: "Multiply binary numbers with step-by-step partial products and decimal conversion. Ideal for learning binary arithmetic and digital electronics.",
      "zh-CN": "使用分步部分积和十进制转换来相乘二进制数。非常适合学习二进制算术和数字电子技术。",
      "zh-TW": "使用分步部分積與十進位轉換來相乘二進位數。非常適合學習二進位算術與數位電子學。",
      ja: "二進数を部分積の手順表示と十進変換付きで乗算。二進算術やデジタル電子回路の学習に最適です。",
      ko: "부분곱 단계와 십진수 변환을 보며 이진수를 곱하세요. 이진 산술과 디지털 전자공학 학습에 적합합니다.",
      es: "Multiplica números binarios con productos parciales paso a paso y conversión decimal. Ideal para aprender aritmética binaria y electrónica digital.",
      fr: "Multipliez des nombres binaires avec produits partiels étape par étape et conversion décimale. Idéal pour l’arithmétique binaire et l’électronique numérique.",
      de: "Multiplizieren Sie Binärzahlen mit schrittweisen Teilprodukten und Dezimalumrechnung. Ideal zum Lernen von Binärarithmetik und Digitalelektronik.",
      pt: "Multiplique números binários com produtos parciais passo a passo e conversão decimal. Ideal para aprender aritmética binária e eletrônica digital.",
      ru: "Умножайте двоичные числа с пошаговыми частичными произведениями и переводом в десятичный вид. Подходит для изучения двоичной арифметики."
    }
  },
  {
    id: "binary-subtraction-calculator",
    category: "math",
    slugs: {
      en: "binary-subtraction-calculator",
      "zh-CN": "er-jin-zhi-jian-fa-ji-suan-qi",
      "zh-TW": "er-jin-zhi-jian-fa-ji-suan-qi",
      ja: "nishinsu-hikizan-keisanki",
      ko: "ijin-ppaegi-gyesangi",
      es: "calculadora-resta-binaria",
      fr: "calculatrice-soustraction-binaire",
      de: "binaer-subtraktion-rechner",
      pt: "calculadora-subtracao-binaria",
      ru: "kalkulyator-dvoichnogo-vychitaniya"
    },
    titles: {
      en: "Binary Subtraction Calculator - Borrowing & Two's Complement",
      "zh-CN": "二进制减法计算器 - 借位与二进制补码",
      "zh-TW": "二進位減法計算器 - 借位與二補數",
      ja: "二進数引き算計算機 - 借り入れと2の補数",
      ko: "이진수 뺄셈 계산기 - 빌림과 2의 보수",
      es: "Calculadora de resta binaria - préstamo y complemento a dos",
      fr: "Calculatrice de soustraction binaire - emprunt et complément à deux",
      de: "Binärsubtraktion Rechner - Entleihen und Zweierkomplement",
      pt: "Calculadora de subtração binária - empréstimo e complemento de dois",
      ru: "Калькулятор двоичного вычитания - заём и дополнительный код"
    },
    descriptions: {
      en: "Subtract binary numbers using standard borrowing or two's complement with step-by-step solutions and decimal equivalents. Free online binary arithmetic tool.",
      "zh-CN": "使用标准借位或二进制补码进行二进制减法，提供分步解答和十进制等值。免费的在线二进制运算工具。",
      "zh-TW": "使用標準借位或二補數進行二進位減法，提供逐步解答與十進位等值。免費線上二進位算術工具。",
      ja: "標準の借り入れ法または2の補数で二進数を減算し、手順付き解答と十進数の等価値を表示します。無料の二進演算ツール。",
      ko: "표준 빌림 또는 2의 보수로 이진수를 빼고 단계별 풀이와 십진수 값을 확인하세요. 무료 온라인 이진 산술 도구입니다.",
      es: "Resta números binarios con préstamo estándar o complemento a dos, con soluciones paso a paso y equivalentes decimales.",
      fr: "Soustrayez des nombres binaires par emprunt standard ou complément à deux, avec étapes détaillées et équivalents décimaux.",
      de: "Subtrahiere Binärzahlen per Entleihen oder Zweierkomplement, mit Schritt-für-Schritt-Lösungen und Dezimalwerten.",
      pt: "Subtraia números binários por empréstimo padrão ou complemento de dois, com passo a passo e equivalentes decimais.",
      ru: "Вычитайте двоичные числа с обычным заёмом или дополнительным кодом, с пошаговым решением и десятичными эквивалентами."
    }
  },
  {
    id: "binomial-coefficient-calculator",
    category: "math",
    slugs: {
      en: "binomial-coefficient-calculator",
      "zh-CN": "erxiangshi-xishu-ji-suan-qi",
      "zh-TW": "erxiangshi-xishu-ji-suan-qi",
      ja: "nijoshiki-keisu-keisanki",
      ko: "ihangsik-gyesu-gyesangi",
      es: "calculadora-coeficiente-binomial",
      fr: "calculateur-coefficient-binomial",
      de: "binomialkoeffizient-rechner",
      pt: "calculadora-coeficiente-binomial",
      ru: "kalkulyator-binomialnogo-koeffitsienta"
    },
    titles: {
      en: "Binomial Coefficient Calculator - C(n,k) Combinations",
      "zh-CN": "二项式系数计算器 - C(n,k) 组合数",
      "zh-TW": "二項式係數計算器 - C(n,k) 組合數",
      ja: "二項係数計算機 - C(n,k) 組み合わせ",
      ko: "이항계수 계산기 - C(n,k) 조합",
      es: "Calculadora de coeficiente binomial C(n,k)",
      fr: "Calculateur de coefficient binomial C(n,k)",
      de: "Binomialkoeffizient-Rechner C(n,k)",
      pt: "Calculadora de coeficiente binomial C(n,k)",
      ru: "Калькулятор биномиального коэффициента C(n,k)"
    },
    descriptions: {
      en: "Calculate binomial coefficients C(n,k) for combinatorics, probability, and Pascal's triangle. Enter n and k to get the exact combination count with formula.",
      "zh-CN": "计算组合数学、概率和帕斯卡三角形中的二项式系数 C(n,k)。输入 n 和 k，获得精确组合数与公式。",
      "zh-TW": "計算組合、機率與帕斯卡三角形中的二項式係數 C(n,k)。輸入 n 和 k，取得精確組合數與公式。",
      ja: "組合せ、確率、パスカルの三角形で使う二項係数 C(n,k) を計算。n と k を入力して正確な組合せ数と公式を表示します。",
      ko: "조합론, 확률, 파스칼의 삼각형에 쓰이는 이항계수 C(n,k)를 계산합니다. n과 k를 입력해 정확한 조합 수와 공식을 확인하세요.",
      es: "Calcula coeficientes binomiales C(n,k) para combinatoria, probabilidad y triángulo de Pascal. Ingresa n y k para obtener el resultado exacto.",
      fr: "Calculez les coefficients binomiaux C(n,k) pour la combinatoire, les probabilités et le triangle de Pascal, avec résultat exact et formule.",
      de: "Berechne Binomialkoeffizienten C(n,k) für Kombinatorik, Wahrscheinlichkeit und Pascalsches Dreieck mit exaktem Ergebnis und Formel.",
      pt: "Calcule coeficientes binomiais C(n,k) para combinatória, probabilidade e triângulo de Pascal, com resultado exato e fórmula.",
      ru: "Вычисляйте биномиальные коэффициенты C(n,k) для комбинаторики, вероятности и треугольника Паскаля с точным результатом и формулой."
    }
  },
  {
    id: "bit-shift-calculator",
    category: "math",
    slugs: {
      en: "bit-shift-calculator",
      "zh-CN": "wei-yi-ji-suan-qi",
      "zh-TW": "wei-yi-ji-suan-qi",
      ja: "bitto-shifuto-keisanki",
      ko: "bit-syipeuteu-gyesan-gi",
      es: "calculadora-desplazamiento-bits",
      fr: "calculateur-decalage-bits",
      de: "bit-shift-rechner",
      pt: "calculadora-deslocamento-bits",
      ru: "kalkulyator-sdviga-bitov"
    },
    titles: {
      en: "Bit Shift Calculator - Binary Left & Right Shift Operations",
      "zh-CN": "位移计算器",
      "zh-TW": "位移計算器",
      ja: "ビットシフト計算機",
      ko: "비트 시프트 계산기",
      es: "Calculadora de desplazamiento de bits",
      fr: "Calculateur de décalage binaire",
      de: "Bit-Shift-Rechner",
      pt: "Calculadora de deslocamento de bits",
      ru: "Калькулятор сдвига битов"
    },
    descriptions: {
      en: "Perform left shift, logical right shift, and arithmetic right shift on integers. Results shown in binary, decimal, and hexadecimal with instant calculations.",
      "zh-CN": "对整数执行左移、逻辑右移和算术右移，并以二进制、十进制和十六进制显示结果。",
      "zh-TW": "對整數執行左移、邏輯右移與算術右移，並以二進位、十進位和十六進位顯示結果。",
      ja: "整数に左シフト、論理右シフト、算術右シフトを適用し、2進数・10進数・16進数で結果を表示します。",
      ko: "정수에 왼쪽 시프트, 논리적 오른쪽 시프트, 산술적 오른쪽 시프트를 적용하고 결과를 2진수, 10진수, 16진수로 표시합니다.",
      es: "Aplica desplazamiento a la izquierda, desplazamiento lógico a la derecha y desplazamiento aritmético a enteros, con resultados en binario, decimal y hex.",
      fr: "Applique un décalage à gauche, un décalage logique à droite et un décalage arithmétique aux entiers, avec résultats en binaire, décimal et hexadécimal.",
      de: "Führt Links-, logische Rechts- und arithmetische Rechtsverschiebungen auf ganzen Zahlen aus, mit Ergebnissen in Binär, Dezimal und Hexadezimal.",
      pt: "Aplica deslocamento à esquerda, deslocamento lógico à direita e deslocamento aritmético em inteiros, com resultados em binário, decimal e hexadecimal.",
      ru: "Выполняет левый сдвиг, логический правый сдвиг и арифметический правый сдвиг для целых чисел, показывая результат в двоичном, десятичном и шестнадцатеричном виде."
    }
  },
  {
    id: "bitwise-calculator",
    category: "math",
    slugs: {
      en: "bitwise-calculator",
      "zh-CN": "wei-yun-suan-qi",
      "zh-TW": "wei-yun-suan-ji-suan-qi",
      ja: "bitwise-keisanki",
      ko: "bipeul-yunsan-gyeongsan-gi",
      es: "calculadora-bitwise",
      fr: "calculatrice-bitwise",
      de: "bitweise-rechner",
      pt: "calculadora-bitwise",
      ru: "bitovyy-kalkulyator"
    },
    titles: {
      en: "Bitwise Calculator - AND, OR, XOR, NOT, Shift Operations",
      "zh-CN": "位运算计算器：与、或、异或、非、移位",
      "zh-TW": "位元運算計算器：AND、OR、XOR、NOT、位移",
      ja: "ビット演算計算機：AND、OR、XOR、NOT、シフト",
      ko: "비트 연산 계산기: AND, OR, XOR, NOT, 시프트",
      es: "Calculadora bit a bit: AND, OR, XOR, NOT y shift",
      fr: "Calculatrice binaire : AND, OR, XOR, NOT et décalages",
      de: "Bitweise Rechner: AND, OR, XOR, NOT und Shift",
      pt: "Calculadora bit a bit: AND, OR, XOR, NOT e shift",
      ru: "Побитовый калькулятор: AND, OR, XOR, NOT и сдвиги"
    },
    descriptions: {
      en: "Free bitwise calculator for AND, OR, XOR, NOT, left shift, and right shift. Supports decimal, binary, and hex input with instant multi-format results.",
      "zh-CN": "支持与、或、异或、非、左移和右移的位运算计算器，输入十进制、二进制或十六进制即可即时查看多种格式结果。",
      "zh-TW": "支援 AND、OR、XOR、NOT、左移與右移的位元運算計算器，輸入十進位、二進位或十六進位即可即時查看多種格式結果。",
      ja: "AND、OR、XOR、NOT、左シフト、右シフトに対応したビット演算計算機。10進・2進・16進の入力で即座に結果を表示します。",
      ko: "AND, OR, XOR, NOT, 왼쪽 시프트, 오른쪽 시프트를 지원하는 비트 연산 계산기입니다. 10진수, 2진수, 16진수 입력으로 즉시 결과를 확인하세요.",
      es: "Calculadora bit a bit con AND, OR, XOR, NOT, desplazamiento a la izquierda y a la derecha. Acepta decimal, binario y hex.",
      fr: "Calculatrice binaire avec AND, OR, XOR, NOT, décalage à gauche et à droite. Saisie décimale, binaire ou hexadécimale avec résultats instantanés.",
      de: "Bitweiser Rechner mit AND, OR, XOR, NOT, Links- und Rechtsverschiebung. Unterstützt Dezimal, Binär und Hex mit sofortigen Ergebnissen.",
      pt: "Calculadora bit a bit com AND, OR, XOR, NOT, shift à esquerda e à direita. Aceita decimal, binário e hexadecimal com resultados instantâneos.",
      ru: "Побитовый калькулятор с AND, OR, XOR, NOT, левым и правым сдвигом. Поддерживает ввод в десятичном, двоичном и шестнадцатеричном виде."
    }
  },
  {
    id: "box-method-calculator",
    category: "math",
    slugs: {
      en: "box-method-calculator",
      "zh-CN": "fangkuang-fa-ji-suan-qi",
      "zh-TW": "fangkuang-fa-ji-suan-qi",
      ja: "bokkusu-hoho-keisanki",
      ko: "bokseu-bangbeop-gyesangi",
      es: "calculadora-metodo-caja",
      fr: "calculateur-methode-boite",
      de: "kastenmethode-rechner",
      pt: "calculadora-metodo-caixa",
      ru: "kalkulyator-metoda-korobki"
    },
    titles: {
      en: "Box Method Calculator - Visualize Polynomial Multiplication",
      "zh-CN": "方框法计算器 - 多项式乘法可视化",
      "zh-TW": "方框法計算機 - 多項式乘法視覺化",
      ja: "ボックス法計算機 - 多項式の掛け算を可視化",
      ko: "박스법 계산기 - 다항식 곱셈 시각화",
      es: "Calculadora del método de caja - Multiplicación visual",
      fr: "Calculateur méthode boîte - Multiplication visuelle",
      de: "Kastenmethode-Rechner - Polynom-Multiplikation",
      pt: "Calculadora do método da caixa - Multiplicação visual",
      ru: "Калькулятор метода коробки - Умножение многочленов"
    },
    descriptions: {
      en: "Multiply binomials visually using the box method. See every partial product in a grid and the fully expanded polynomial expression instantly.",
      "zh-CN": "用方框法可视化二项式相乘，查看每一步部分积和完整展开式。",
      "zh-TW": "用方框法視覺化二項式相乘，查看每一步部分積與完整展開式。",
      ja: "ボックス法で二項式を掛け算し、部分積と展開式をひと目で確認できます。",
      ko: "박스법으로 이항식을 곱하고 각 부분곱과 전개식을 한눈에 확인하세요.",
      es: "Multiplica binomios con el método de caja y ve cada producto parcial en una cuadrícula junto con la forma expandida.",
      fr: "Multipliez des binômes avec la méthode de la boîte et voyez chaque produit partiel dans une grille avec le polynôme développé.",
      de: "Multiplizieren Sie Binome mit der Kastenmethode und sehen Sie alle Teilprodukte im Raster samt ausmultiplizierter Form.",
      pt: "Multiplique binômios com o método da caixa e veja cada produto parcial em uma grade junto com a forma expandida.",
      ru: "Умножайте двучлены методом коробки и сразу видьте все частичные произведения и раскрытое выражение."
    }
  },
  {
    id: "catenary-curve-calculator",
    category: "math",
    slugs: {
      en: "catenary-curve-calculator",
      "zh-CN": "xuanlianxian-jisuanqi",
      "zh-TW": "xuanlianxian-jisuanqi",
      ja: "kentsui-sen-keisanki",
      ko: "hyeonsuseon-gyeongsan-gi",
      es: "calculadora-curva-catenaria",
      fr: "calculateur-courbe-catenaire",
      de: "kettenlinie-rechner",
      pt: "calculadora-curva-catenaria",
      ru: "katenarnaya-krivaya-kalkulyator"
    },
    titles: {
      en: "Catenary Curve Calculator - Hanging Chain and Cable Sag",
      "zh-CN": "悬链线计算器",
      "zh-TW": "懸鏈線計算器",
      ja: "懸垂線計算機",
      ko: "현수선 계산기",
      es: "Calculadora de curva catenaria",
      fr: "Calculateur de courbe caténaire",
      de: "Kettenlinienrechner",
      pt: "Calculadora de curva catenária",
      ru: "Калькулятор катенары"
    },
    descriptions: {
      en: "Calculate catenary curve sag height, slope, arc length, and tension for hanging cables. Uses the hyperbolic cosine formula with step-by-step results.",
      "zh-CN": "计算悬挂电缆的悬垂高度、斜率、弧长和张力，采用双曲余弦公式并提供逐步结果。",
      "zh-TW": "計算懸掛電纜的垂弧高度、斜率、弧長與張力，採用雙曲餘弦公式並提供逐步結果。",
      ja: "吊り下げたケーブルのたるみ、高さ、傾き、弧長、張力を双曲線余弦の式で計算します。",
      ko: "매달린 케이블의 처짐 높이, 기울기, 호 길이, 장력을 쌍곡코사인 공식으로 계산합니다.",
      es: "Calcula la flecha, la pendiente, la longitud de arco y la tensión de cables colgantes con la fórmula del coseno hiperbólico.",
      fr: "Calculez la flèche, la pente, la longueur d’arc et la tension des câbles suspendus avec la formule du cosinus hyperbolique.",
      de: "Berechnen Sie Durchhang, Steigung, Bogenlänge und Seilzug von hängenden Kabeln mit der Formel des hyperbolischen Kosinus.",
      pt: "Calcule a flecha, a inclinação, o comprimento de arco e a tensão de cabos suspensos com a fórmula do cosseno hiperbólico.",
      ru: "Рассчитайте провисание, наклон, длину дуги и натяжение подвешенных кабелей по формуле гиперболического косинуса."
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
