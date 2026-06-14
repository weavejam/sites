import type { ToolEntry } from "@/data/tools";

export const tools: ToolEntry[] = [
  {
    id: "percentage-calculator",
    category: "math",
    slugs: {
      en: "percentage-calculator",
      "zh-CN": "baifenbi-jisuanqi",
      "zh-TW": "baifenbi-jisuanqi",
      ja: "pasento-keisanki",
      ko: "baekbun-yul-gyesangi",
      es: "calculadora-porcentajes",
      fr: "calculateur-pourcentage",
      de: "prozentrechner",
      pt: "calculadora-porcentagem",
      ru: "kalkulyator-protsentov"
    },
    titles: {
      en: "Percentage Calculator - Calculate Percent of a Number",
      "zh-CN": "百分比计算器 - 计算一个数的百分之几",
      "zh-TW": "百分比計算機 - 計算一個數的百分之幾",
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
      "zh-CN": "百分比计算器可计算 X% 的 Y、百分比变化、折扣、小费、税费和反向百分比，立即给出清晰答案和公式。",
      "zh-TW": "百分比計算機可計算 X% 的 Y、百分比變化、折扣、小費、稅費與反向百分比，立即取得清楚答案與公式。",
      ja: "X% of Y、増減率、割引、チップ、税金、逆算まで対応。式付きでパーセント計算の答えをすぐに確認できます。",
      ko: "X% of Y, 증감률, 할인, 팁, 세금, 역산 백분율을 공식과 함께 즉시 계산하는 백분율 계산기입니다.",
      es: "Calculadora de porcentajes para X% de Y, cambios porcentuales, descuentos, propinas, impuestos y porcentajes inversos, con fórmulas claras al instante.",
      fr: "Calculez X% de Y, variations, remises, pourboires, taxes et pourcentages inversés, avec des formules claires instantanément.",
      de: "Prozentrechner für X% von Y, prozentuale Änderung, Rabatte, Trinkgeld, Steuern und umgekehrte Prozente – sofort mit klaren Formeln.",
      pt: "Calculadora de porcentagem para X% de Y, variação percentual, descontos, gorjetas, impostos e porcentagens inversas, com fórmulas claras na hora.",
      ru: "Калькулятор процентов для X% от Y, изменений, скидок, чаевых, налогов и обратных процентов. Мгновенный ответ с понятными формулами."
    }
  },
  {
    id: "expanded-form-calculator",
    category: "math",
    slugs: {
      en: "expanded-form-calculator",
      "zh-CN": "zhan-kai-shi-ji-suan-qi",
      "zh-TW": "zhan-kai-shi-ji-suan-qi",
      ja: "tenkai-keisan-ki",
      ko: "jeon-kae-hyeong-gye-san-gi",
      es: "calculadora-de-forma-desarrollada",
      fr: "calculateur-d-ecriture-developpee",
      de: "stellenwert-schreibweise-rechner",
      pt: "calculadora-de-forma-expandida",
      ru: "rasshirennaya-zapis-chisel-kalkulyator"
    },
    titles: {
      en: "Expanded Form Calculator - Break Numbers by Place Value",
      "zh-CN": "展开式计算器",
      "zh-TW": "展開式計算機",
      ja: "展開形計算機",
      ko: "전개형 계산기",
      es: "Calculadora de forma desarrollada",
      fr: "Calculateur d’écriture développée",
      de: "Rechner für Stellenwert-Schreibweise",
      pt: "Calculadora de forma expandida",
      ru: "Калькулятор развернутой записи"
    },
    descriptions: {
      en: "Expanded form calculator that breaks whole numbers, decimals, and negatives into place value parts. Learn number decomposition with instant results.",
      "zh-CN": "将整数、小数和负数按位展开，快速查看清晰的展开式求和结果。",
      "zh-TW": "將整數、小數與負數按位展開，立即查看清楚的展開式加總結果。",
      ja: "整数、小数、負の数を位ごとに展開し、わかりやすい和の形ですぐ確認できます。",
      ko: "정수, 소수, 음수를 자리값별로 전개해 한눈에 보이는 합으로 바로 확인하세요.",
      es: "Descompón enteros, decimales y negativos por valor posicional y comprueba la suma desarrollada al instante.",
      fr: "Décomposez entiers, décimaux et nombres négatifs par valeur de position et voyez la somme développée instantanément.",
      de: "Zerlege ganze Zahlen, Dezimalzahlen und negative Zahlen nach Stellenwerten und prüfe die Schreibweise sofort als Summe.",
      pt: "Decomponha inteiros, decimais e negativos por valor posicional e veja a forma expandida como soma na hora.",
      ru: "Разложите целые, десятичные и отрицательные числа по разрядам и сразу проверьте развернутую сумму."
    }
  },
  {
    id: "expanding-logarithms-calculator",
    category: "math",
    slugs: {
      en: "expanding-logarithms-calculator",
      "zh-CN": "duishu-zhankai-jisuanqi",
      "zh-TW": "duishu-zhan-kai-jisuanqi",
      ja: "taisu-tenkai-keisanki",
      ko: "log-jeon-gae-gyesangi",
      es: "calculadora-expansion-logaritmos",
      fr: "calculateur-developpement-logarithmes",
      de: "logarithmen-ausmultiplizieren-rechner",
      pt: "calculadora-expansao-logaritmos",
      ru: "raskrytie-logarifmov-kalkulyator"
    },
    titles: {
      en: "Expanding Logarithms Calculator - Product Quotient Power",
      "zh-CN": "对数展开计算器",
      "zh-TW": "對數展開計算器",
      ja: "対数展開計算機",
      ko: "로그 전개 계산기",
      es: "Calculadora de expansión de logaritmos",
      fr: "Calculateur de développement des logarithmes",
      de: "Logarithmen-Ausmultiplizieren-Rechner",
      pt: "Calculadora de expansão de logaritmos",
      ru: "Калькулятор раскрытия логарифмов"
    },
    descriptions: {
      en: "Expanding logarithms calculator for product, quotient, and power rules with ln, common log, or custom bases. See symbolic steps and numeric values.",
      "zh-CN": "用自然对数、常用对数或自定义底数应用乘积、商与幂规则，查看符号展开和数值结果。",
      "zh-TW": "用自然對數、常用對數或自訂底數套用乘積、商與冪規則，查看符號展開與數值結果。",
      ja: "自然対数・常用対数・任意の底で、積・商・冪の法則を展開し、式変形と数値をすぐ確認できます。",
      ko: "자연로그, 상용로그, 사용자 정의 밑으로 곱·나눗셈·거듭제곱 법칙을 전개하고, 식과 값을 바로 확인하세요.",
      es: "Aplica las reglas del producto, cociente y potencia con ln, logaritmo común o una base personalizada y ve la expansión y el valor numérico.",
      fr: "Appliquez les règles du produit, du quotient et de la puissance avec ln, le log décimal ou une base personnalisée, et voyez l'expansion et la valeur.",
      de: "Wende Produkt-, Quotienten- und Potenzregel auf ln, Zehnerlogarithmen oder eine eigene Basis an und sieh Umformung und Wert.",
      pt: "Aplique as regras do produto, quociente e potência com ln, log comum ou base personalizada e veja a expansão e o valor numérico.",
      ru: "Применяйте правила произведения, частного и степени для ln, десятичного или произвольного логарифма и сразу видите разложение и значение."
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
      ko: "jisu-gyeonsangi",
      es: "calculadora-exponentes",
      fr: "calculatrice-exposants",
      de: "exponenten-rechner",
      pt: "calculadora-expoente",
      ru: "vychislitel-stepeni"
    },
    titles: {
      en: "Exponent Calculator - Raise a Base to a Power",
      "zh-CN": "指数计算器",
      "zh-TW": "指數計算器",
      ja: "指数計算機",
      ko: "지수 계산기",
      es: "Calculadora de exponentes",
      fr: "Calculatrice d'exposants",
      de: "Exponenten-Rechner",
      pt: "Calculadora de Expoentes",
      ru: "Калькулятор степени"
    },
    descriptions: {
      en: "Exponent calculator for powers such as b^n with real bases and exponents. Get instant results, including 0^0 by convention and overflow handling.",
      "zh-CN": "指数计算器：计算任意实数底数与指数，清晰显示表达式，并一步处理 0^0 与溢出等特殊情况。",
      "zh-TW": "指數計算器：計算任意實數底數與指數，清楚顯示表達式，並一步處理 0^0 與溢位等特殊情況。",
      ja: "指数計算機：任意の実数の底と指数を計算し、式を見やすく表示。0^0 やオーバーフローも一度で処理。",
      ko: "지수 계산기: 임의의 실수 밑과 지수를 계산하고, 식을 선명하게 보여 주며, 0^0과 오버플로를 한 번에 처리합니다.",
      es: "Calculadora de exponentes para elevar cualquier base real a cualquier exponente real, con 0^0 y desbordamiento resueltos al instante.",
      fr: "Calculatrice d'exposants pour élever une base réelle à un exposant réel, avec 0^0 et le dépassement gérés instantanément.",
      de: "Exponenten-Rechner zum Potenzieren beliebiger reeller Basen und Exponenten, mit 0^0 und Überlauf sofort behandelt.",
      pt: "Calculadora de expoentes para elevar qualquer base real a qualquer expoente real, com 0^0 e overflow tratados na hora.",
      ru: "Калькулятор степени для возведения любой вещественной основы в любой вещественный показатель, с 0^0 и переполнением сразу."
    }
  },
  {
    id: "exponential-form-calculator",
    category: "math",
    slugs: {
      en: "exponential-form-calculator",
      "zh-CN": "zhishu-xingshi-jisuanqi",
      "zh-TW": "zhishu-xingshi-jisuanqi",
      ja: "shisu-keishiki-keisanki",
      ko: "jisu-hyeongsik-gyesangi",
      es: "calculadora-forma-exponencial",
      fr: "calculateur-forme-exponentielle",
      de: "exponentialform-rechner",
      pt: "calculadora-forma-exponencial",
      ru: "kalkulyator-eksponentsialnoy-formy"
    },
    titles: {
      en: "Exponential Form Calculator - Scientific Notation Converter",
      "zh-CN": "指数形式计算器 - 科学记数法转换器",
      "zh-TW": "指數形式計算器 - 科學記號轉換器",
      ja: "指数形式計算機 - 科学表記変換",
      ko: "지수 형식 계산기 - 과학적 표기법 변환",
      es: "Calculadora de forma exponencial - Notación científica",
      fr: "Calculateur de forme exponentielle - Notation scientifique",
      de: "Exponentialform-Rechner - Wissenschaftliche Schreibweise",
      pt: "Calculadora de forma exponencial - Notação científica",
      ru: "Калькулятор экспоненциальной формы - научная запись"
    },
    descriptions: {
      en: "Exponential form calculator for standard and scientific notation. Convert numbers to exponential form or back to ordinary notation instantly.",
      "zh-CN": "指数形式计算器可在普通表示法和科学记数法之间转换，快速把数字转为指数形式或还原为普通数字。",
      "zh-TW": "指數形式計算器可在一般記號與科學記號間轉換，快速將數字轉成指數形式或還原為普通數字。",
      ja: "指数形式計算機で標準表記と科学表記を相互変換。数値を指数形式へ、または通常表記へすばやく変換できます。",
      ko: "지수 형식 계산기로 일반 표기와 과학적 표기법을 변환하세요. 숫자를 지수 형식으로 또는 일반 표기로 즉시 바꿉니다.",
      es: "Calculadora de forma exponencial para convertir entre notación estándar y científica al instante, en ambos sentidos.",
      fr: "Calculateur de forme exponentielle pour convertir instantanément entre notation standard et notation scientifique, dans les deux sens.",
      de: "Exponentialform-Rechner für Standard- und wissenschaftliche Schreibweise. Zahlen sofort in beide Richtungen umwandeln.",
      pt: "Calculadora de forma exponencial para converter entre notação padrão e científica instantaneamente, nos dois sentidos.",
      ru: "Калькулятор экспоненциальной формы для мгновенного перевода между обычной и научной записью в обоих направлениях."
    }
  },
  {
    id: "exponential-function-calculator",
    category: "math",
    slugs: {
      en: "exponential-function-calculator",
      "zh-CN": "zhi-shu-han-shu-ji-suan-qi",
      "zh-TW": "zhi-shu-han-shu-ji-suan-qi",
      ja: "shisuu-kansu-keisan-ki",
      ko: "jisu-hamsu-gyesan-gi",
      es: "calculadora-funcion-exponencial",
      fr: "calculatrice-fonction-exponentielle",
      de: "exponentialfunktion-rechner",
      pt: "calculadora-funcao-exponencial",
      ru: "kalkulyator-pokazatelnoi-funktsii"
    },
    titles: {
      en: "Exponential Function Calculator - Evaluate a·b^x + c",
      "zh-CN": "指数函数计算器",
      "zh-TW": "指數函數計算器",
      ja: "指数関数計算機",
      ko: "지수 함수 계산기",
      es: "Calculadora de función exponencial",
      fr: "Calculatrice de fonction exponentielle",
      de: "Exponentialfunktion Rechner",
      pt: "Calculadora de função exponencial",
      ru: "Калькулятор показательной функции"
    },
    descriptions: {
      en: "Exponential function calculator for f(x)=a·b^x+c. Evaluate growth or decay with coefficient, base, input value, and vertical shift instantly.",
      "zh-CN": "指数函数计算器，快速计算 f(x)=a·b^x+c。输入系数、底数、x 值和垂直平移，立即查看结果。",
      "zh-TW": "指數函數計算器，快速計算 f(x)=a·b^x+c。輸入係數、底數、x 值與垂直平移，立即查看結果。",
      ja: "指数関数計算機で f(x)=a·b^x+c をすぐ計算。係数、底、x 値、縦方向の移動を入力して結果を確認。",
      ko: "지수 함수 계산기로 f(x)=a·b^x+c를 바로 계산하세요. 계수, 밑, x 값, 세로 이동을 입력해 결과를 확인합니다.",
      es: "Calculadora de función exponencial para f(x)=a·b^x+c. Calcula al instante crecimiento o decaimiento con coeficiente, base, x y desplazamiento vertical.",
      fr: "Calculatrice de fonction exponentielle pour f(x)=a·b^x+c. Calcule instantanément croissance ou décroissance avec coefficient, base, x et décalage vertical.",
      de: "Exponentialfunktion-Rechner für f(x)=a·b^x+c. Wachstum oder Zerfall mit Koeffizient, Basis, x und Verschiebung sofort berechnen.",
      pt: "Calculadora de função exponencial para f(x)=a·b^x+c. Calcule crescimento ou decaimento com coeficiente, base, x e deslocamento vertical.",
      ru: "Калькулятор показательной функции для f(x)=a·b^x+c. Мгновенно считайте рост или убывание по коэффициенту, основанию, x и сдвигу."
    }
  },
  {
    id: "generic-rectangle-calculator",
    category: "math",
    slugs: {
      en: "generic-rectangle-calculator",
      "zh-CN": "duoxiangshi-juxingfa-jisuanqi",
      "zh-TW": "duoxiangshi-juxingfa-jisuanqi",
      ja: "takoushiki-bokkusu-ho-keisanki",
      ko: "dahangsik-sangjabeop-gyesangi",
      es: "calculadora-polinomios-metodo-caja",
      fr: "calculateur-polynomes-methode-tableau",
      de: "polynom-box-methode-rechner",
      pt: "calculadora-polinomios-metodo-caixa",
      ru: "kalkulyator-mnogochlenov-metodom-tablitsy"
    },
    titles: {
      en: "Generic Rectangle Calculator - Box Method Polynomials",
      "zh-CN": "多项式矩形法计算器",
      "zh-TW": "多項式矩形法計算機",
      ja: "多項式ボックス法計算機",
      ko: "다항식 상자법 계산기",
      es: "Calculadora de polinomios por método de caja",
      fr: "Calculateur de polynômes par méthode du tableau",
      de: "Polynom-Rechner mit Box-Methode",
      pt: "Calculadora de polinômios pelo método da caixa",
      ru: "Калькулятор многочленов методом таблицы"
    },
    descriptions: {
      en: "Multiply polynomials visually using the generic rectangle box method. See the full multiplication table and simplified product instantly.",
      "zh-CN": "用矩形法可视化多项式乘法，立即查看完整乘法表和化简结果。",
      "zh-TW": "用矩形法視覺化多項式乘法，立即查看完整乘法表與化簡結果。",
      ja: "ボックス法で多項式の掛け算を視覚化し、展開表と簡約結果をすぐ確認できます。",
      ko: "상자법으로 다항식 곱셈을 시각화하고, 전체 표와 간단한 결과를 바로 확인하세요.",
      es: "Multiplica polinomios visualmente con el método de caja y ve al instante la tabla completa y el producto simplificado.",
      fr: "Multipliez des polynômes visuellement avec la méthode du tableau et voyez immédiatement le tableau complet et le produit simplifié.",
      de: "Polynome visuell mit der Box-Methode multiplizieren und sofort die vollständige Tabelle sowie das vereinfachte Ergebnis sehen.",
      pt: "Multiplique polinômios visualmente com o método da caixa e veja na hora a tabela completa e o produto simplificado.",
      ru: "Визуально умножайте многочлены методом таблицы и сразу видьте полную таблицу и упрощённый результат."
    }
  },
  {
    id: "gcf-calculator-greatest-common-factor",
    category: "math",
    slugs: {
      en: "gcf-calculator-greatest-common-factor",
      "zh-CN": "zuidagongyinshujisuanqi",
      "zh-TW": "zuidagongyinshujisuanqi",
      ja: "saidai-koyakusu-keisanki",
      ko: "choedae-gongyaksu-gyesangi",
      es: "calculadora-maximo-comun-divisor",
      fr: "calculateur-pgcd",
      de: "ggt-rechner",
      pt: "calculadora-mdc",
      ru: "kalkulyator-nod"
    },
    titles: {
      en: "GCF Calculator - Greatest Common Factor of Numbers",
      "zh-CN": "最大公因数计算器",
      "zh-TW": "最大公因數計算機",
      ja: "最大公約数計算機",
      ko: "최대공약수 계산기",
      es: "Calculadora de máximo común divisor",
      fr: "Calculateur du plus grand commun diviseur",
      de: "GGT-Rechner",
      pt: "Calculadora de MDC",
      ru: "Калькулятор НОД"
    },
    descriptions: {
      en: "Calculate the Greatest Common Factor (GCF) of two or more integers using the Euclidean algorithm or prime factorization. Shows step-by-step work for learning.",
      "zh-CN": "使用欧几里得算法或质因数分解计算两个或多个整数的最大公因数，并显示详细步骤。",
      "zh-TW": "使用歐幾里得演算法或質因數分解，計算兩個或多個整數的最大公因數，並顯示步驟。",
      ja: "ユークリッドの互除法や素因数分解で、2つ以上の整数の最大公約数を手順つきで計算します。",
      ko: "유클리드 알고리즘이나 소인수분해로 두 개 이상 정수의 최대공약수를 단계별로 계산합니다.",
      es: "Calcula el máximo común divisor de dos o más enteros con Euclides o factorización prima, mostrando los pasos.",
      fr: "Calculez le PGCD de deux entiers ou plus avec l'algorithme d'Euclide ou la décomposition en facteurs premiers, étape par étape.",
      de: "Berechnen Sie den größten gemeinsamen Teiler von zwei oder mehr Zahlen mit Euklid oder Primfaktorzerlegung, Schritt für Schritt.",
      pt: "Calcule o máximo divisor comum de dois ou mais inteiros com o algoritmo de Euclides ou fatoração em primos, passo a passo.",
      ru: "Вычисляйте наибольший общий делитель двух и более чисел по алгоритму Евклида или разложению на простые множители."
    }
  },
  {
    id: "gcf-and-lcm-calculator",
    category: "math",
    slugs: {
      en: "gcf-and-lcm-calculator",
      "zh-CN": "zui-da-gong-yin-shu-zui-xiao-gong-bei-shu-ji-suan-qi",
      "zh-TW": "zui-da-gong-yin-shu-zui-xiao-gong-bei-shu-ji-suan-qi",
      ja: "saidai-koyakusu-saisho-kobaisu-keisanki",
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
      "zh-TW": "最大公因數與最小公倍數計算器",
      ja: "最大公約数と最小公倍数計算機",
      ko: "최대공약수와 최소공배수 계산기",
      es: "Calculadora de MCD y MCM",
      fr: "Calculateur de PGCD et PPCM",
      de: "GGT- und KGV-Rechner",
      pt: "Calculadora de MDC e MMC",
      ru: "Калькулятор НОД и НОК"
    },
    descriptions: {
      en: "Calculate the GCF and LCM of any set of numbers instantly. Uses the Euclidean algorithm and supports two or more positive integers.",
      "zh-CN": "快速计算任意一组数字的最大公因数和最小公倍数。使用欧几里得算法，支持两个或更多正整数。",
      "zh-TW": "快速計算任意一組數字的最大公因數與最小公倍數。使用歐幾里得演算法，支援兩個或更多正整數。",
      ja: "任意の数列の最大公約数と最小公倍数をすばやく計算。ユークリッドの互除法を使い、2つ以上の正の整数に対応します。",
      ko: "숫자 집합의 최대공약수와 최소공배수를 즉시 계산합니다. 유클리드 알고리즘을 사용하며 두 개 이상의 양의 정수를 지원합니다.",
      es: "Calcula al instante el MCD y el MCM de cualquier conjunto de números. Usa el algoritmo de Euclides y admite dos o más enteros positivos.",
      fr: "Calculez instantanément le PGCD et le PPCM de n’importe quel ensemble de nombres. Utilise l’algorithme d’Euclide et accepte au moins deux entiers positifs.",
      de: "Berechne sofort GGT und KGV beliebiger Zahlen. Nutzt den euklidischen Algorithmus und unterstützt zwei oder mehr positive ganze Zahlen.",
      pt: "Calcule instantaneamente o MDC e o MMC de qualquer conjunto de números. Usa o algoritmo de Euclides e aceita dois ou mais inteiros positivos.",
      ru: "Мгновенно вычисляйте НОД и НОК любого набора чисел. Использует алгоритм Евклида и поддерживает два или более положительных целых числа."
    }
  },
  {
    id: "gauss-jordan-elimination-calculator",
    category: "math",
    slugs: {
      en: "gauss-jordan-elimination-calculator",
      "zh-CN": "gauss-jordan-xiaoyuan-jisuanqi",
      "zh-TW": "gauss-jordan-xiaoyuan-jisuanqi",
      ja: "gausu-jodan-shometsu-keisan",
      ko: "gaoseu-joldeon-sogeo-gyesan",
      es: "eliminacion-gauss-jordan-sistemas-lineales",
      fr: "elimination-gauss-jordan-systemes-lineaires",
      de: "gauss-jordan-elimination-lineare-gleichungssysteme",
      pt: "eliminacao-gauss-jordan-sistemas-lineares",
      ru: "metod-gaussa-zhordana-sistemy-uravneniy"
    },
    titles: {
      en: "Gauss-Jordan Elimination Calculator - Solve Linear Systems",
      "zh-CN": "高斯-约当消元计算器 - 解线性方程组",
      "zh-TW": "高斯-約當消元計算器 - 解線性方程組",
      ja: "ガウス・ジョルダン消去計算機 - 連立方程式を解く",
      ko: "가우스-조르당 소거 계산기 - 연립방정식 풀이",
      es: "Eliminación Gauss-Jordan - Sistemas lineales",
      fr: "Élimination de Gauss-Jordan - Systèmes linéaires",
      de: "Gauss-Jordan-Elimination - Lineare Gleichungssysteme",
      pt: "Eliminação de Gauss-Jordan - Sistemas lineares",
      ru: "Метод Гаусса-Жордана - Системы уравнений"
    },
    descriptions: {
      en: "Solve systems of linear equations using Gauss-Jordan elimination. Enter your augmented matrix to get the RREF and exact solution.",
      "zh-CN": "使用高斯-约当消元法求解线性方程组。输入增广矩阵，获取RREF和精确解。",
      "zh-TW": "使用高斯-約當消元法求解線性方程組。輸入增廣矩陣，取得RREF與精確解。",
      ja: "ガウス・ジョルダン消去法で連立一次方程式を解きます。拡大係数行列を入力するとRREFと厳密解を表示します。",
      ko: "가우스-조르당 소거법으로 연립일차방정식을 풉니다. 확대행렬을 입력하면 RREF와 정확한 해를 확인할 수 있습니다.",
      es: "Resuelve sistemas de ecuaciones lineales con eliminación Gauss-Jordan. Ingresa tu matriz aumentada para obtener la RREF y la solución exacta.",
      fr: "Résolvez des systèmes d'équations linéaires avec l'élimination de Gauss-Jordan. Saisissez la matrice augmentée pour obtenir la RREF et la solution exacte.",
      de: "Löse lineare Gleichungssysteme mit der Gauss-Jordan-Elimination. Gib die erweiterte Matrix ein, um RREF und exakte Lösung zu erhalten.",
      pt: "Resolva sistemas de equações lineares com a eliminação de Gauss-Jordan. Informe a matriz aumentada para obter a RREF e a solução exata.",
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
      ja: "ganma-kansu-keisanki",
      ko: "gamma-hamsu-gyesangi",
      es: "calculadora-funcion-gamma",
      fr: "calculateur-fonction-gamma",
      de: "gammafunktion-rechner",
      pt: "calculadora-funcao-gama",
      ru: "kalkulyator-gamma-funktsii"
    },
    titles: {
      en: "Gamma Function Calculator - Compute Γ(z) Online",
      "zh-CN": "Gamma 函数计算器 - 在线计算 Γ(z)",
      "zh-TW": "Gamma 函數計算器 - 線上計算 Γ(z)",
      ja: "ガンマ関数計算機 - Γ(z) をオンライン計算",
      ko: "감마 함수 계산기 - Γ(z) 온라인 계산",
      es: "Calculadora de función Gamma - Calcula Γ(z)",
      fr: "Calculateur de fonction Gamma - Calculer Γ(z)",
      de: "Gammafunktion-Rechner - Γ(z) online berechnen",
      pt: "Calculadora da função Gama - Calcule Γ(z)",
      ru: "Калькулятор гамма-функции - вычислить Γ(z)"
    },
    descriptions: {
      en: "Calculate the Gamma function Γ(z) for any real number using the Lanczos approximation. Instant results for factorials, integrals, and special functions.",
      "zh-CN": "使用 Lanczos 近似计算任意实数的 Gamma 函数 Γ(z)。即时获得阶乘、积分和特殊函数相关结果。",
      "zh-TW": "使用 Lanczos 近似計算任意實數的 Gamma 函數 Γ(z)。立即取得階乘、積分與特殊函數相關結果。",
      ja: "Lanczos 近似で任意の実数のガンマ関数 Γ(z) を計算。階乗、積分、特殊関数の結果をすばやく確認できます。",
      ko: "Lanczos 근사로 임의의 실수에 대한 감마 함수 Γ(z)를 계산하세요. 계승, 적분, 특수 함수 값을 즉시 확인할 수 있습니다.",
      es: "Calcula la función Gamma Γ(z) para cualquier número real con la aproximación de Lanczos. Resultados instantáneos para factoriales e integrales.",
      fr: "Calculez la fonction Gamma Γ(z) pour tout réel avec l’approximation de Lanczos. Résultats instantanés pour factorielles, intégrales et fonctions spéciales.",
      de: "Berechne die Gammafunktion Γ(z) für jede reelle Zahl mit der Lanczos-Approximation. Sofortige Ergebnisse für Fakultäten, Integrale und Spezialfunktionen.",
      pt: "Calcule a função Gama Γ(z) para qualquer número real com a aproximação de Lanczos. Resultados instantâneos para fatoriais, integrais e funções especiais.",
      ru: "Вычисляйте гамма-функцию Γ(z) для любого действительного числа методом Ланцоша. Мгновенные результаты для факториалов, интегралов и специальных функций."
    }
  }
];
