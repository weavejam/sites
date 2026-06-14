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
      "zh-CN": "zhankaishi-jisuanqi",
      "zh-TW": "zhankaishi-jisuanqi",
      ja: "tenkai-keishiki-keisanki",
      ko: "jeongae-sik-gyesangi",
      es: "calculadora-forma-desarrollada",
      fr: "calculateur-forme-developpee",
      de: "erweiterte-form-rechner",
      pt: "calculadora-forma-expandida",
      ru: "kalkulyator-razvernutoy-formy"
    },
    titles: {
      en: "Expanded Form Calculator - Break Numbers by Place Value",
      "zh-CN": "展开式计算器 - 按位值分解数字",
      "zh-TW": "展開式計算器 - 依位值分解數字",
      ja: "展開形式計算機 - 位取りで数を分解",
      ko: "전개식 계산기 - 자릿값으로 숫자 분해",
      es: "Calculadora de forma desarrollada",
      fr: "Calculateur de forme développée",
      de: "Rechner für erweiterte Form",
      pt: "Calculadora de forma expandida",
      ru: "Калькулятор развернутой формы"
    },
    descriptions: {
      en: "Expanded form calculator that breaks whole numbers, decimals, and negatives into place value parts. Learn number decomposition with instant results.",
      "zh-CN": "展开式计算器可将整数、小数和负数分解为位值部分，即时显示数字分解结果，帮助理解数位概念。",
      "zh-TW": "展開式計算器可將整數、小數與負數分解為位值部分，立即顯示數字分解結果，幫助理解位值。",
      ja: "展開形式計算機で整数、小数、負の数を位取りごとに分解。数の成り立ちをすぐに確認できます。",
      ko: "전개식 계산기로 정수, 소수, 음수를 자릿값 부분으로 나누고 숫자 분해 결과를 즉시 확인하세요.",
      es: "Calculadora de forma desarrollada para descomponer enteros, decimales y negativos por valor posicional con resultados instantáneos.",
      fr: "Calculateur de forme développée pour décomposer entiers, décimaux et nombres négatifs par valeur de position avec résultats instantanés.",
      de: "Rechner für erweiterte Form: Zerlegt ganze Zahlen, Dezimalzahlen und negative Zahlen nach Stellenwerten mit sofortigen Ergebnissen.",
      pt: "Calculadora de forma expandida para decompor inteiros, decimais e negativos por valor posicional com resultados instantâneos.",
      ru: "Калькулятор развернутой формы раскладывает целые, десятичные и отрицательные числа по разрядам и сразу показывает результат."
    }
  },
  {
    id: "expanding-logarithms-calculator",
    category: "math",
    slugs: {
      en: "expanding-logarithms-calculator",
      "zh-CN": "duishu-zhankai-jisuanqi",
      "zh-TW": "duishu-zhankai-jisuanqi",
      ja: "taisuu-tenkai-keisanki",
      ko: "log-jeongae-gyesangi",
      es: "calculadora-logaritmos-desarrollo",
      fr: "calculatrice-developpement-logarithmes",
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
      es: "Calculadora de logaritmos desarrollados",
      fr: "Calculatrice de développement des logarithmes",
      de: "Rechner zum Ausmultiplizieren von Logarithmen",
      pt: "Calculadora de expansão de logaritmos",
      ru: "Калькулятор раскрытия логарифмов"
    },
    descriptions: {
      en: "Expanding logarithms calculator for product, quotient, and power rules with ln, common log, or custom bases. See symbolic steps and numeric values.",
      "zh-CN": "对数展开计算器，支持乘积、商和幂法则，可用自然对数、常用对数或自定义底数，并显示符号步骤与数值结果。",
      "zh-TW": "對數展開計算器，支援乘積、商與冪法則，可用自然對數、常用對數或自訂底數，並顯示符號步驟與數值結果。",
      ja: "対数の積・商・べきの法則に対応し、自然対数・常用対数・任意の底で符号展開と数値を確認できます。",
      ko: "곱·나눗셈·거듭제곱 법칙을 적용하는 로그 전개 계산기입니다. 자연로그, 상용로그, 사용자 정의 밑을 지원합니다.",
      es: "Calculadora para desarrollar logaritmos con las reglas del producto, cociente y potencia, usando ln, log común o una base personalizada.",
      fr: "Calculatrice pour développer les logarithmes avec les règles du produit, du quotient et de la puissance, en ln, log décimal ou base personnalisée.",
      de: "Rechner zum Ausmultiplizieren von Logarithmen mit Produkt-, Quotienten- und Potenzregel für ln, Zehnerlogarithmus oder eigene Basis.",
      pt: "Calculadora de expansão de logaritmos com as regras do produto, quociente e potência, usando ln, log comum ou base personalizada.",
      ru: "Калькулятор раскрытия логарифмов для правил произведения, частного и степени с ln, десятичным логарифмом или своей основой."
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
      fr: "calcul-exposants",
      de: "exponenten-rechner",
      pt: "calculadora-de-expoentes",
      ru: "kalkulyator-stepeni"
    },
    titles: {
      en: "Exponent Calculator - Raise a Base to a Power",
      "zh-CN": "指数计算器",
      "zh-TW": "指數計算器",
      ja: "指数計算機",
      ko: "지수 계산기",
      es: "Calculadora de exponentes",
      fr: "Calculateur d'exposants",
      de: "Exponentenrechner",
      pt: "Calculadora de expoentes",
      ru: "Калькулятор степеней"
    },
    descriptions: {
      en: "Exponent calculator for powers such as b^n with real bases and exponents. Get instant results, including 0^0 by convention and overflow handling.",
      "zh-CN": "计算 b^n 等幂运算，支持实数底数和指数，立即返回结果，并按约定处理 0^0 与溢出。",
      "zh-TW": "計算 b^n 等冪運算，支援實數底數與指數，立即顯示結果，並依慣例處理 0^0 與溢位。",
      ja: "実数の底と指数で b^n を計算し、0^0 の慣例やオーバーフローにも対応する指数計算機です。",
      ko: "실수 밑과 지수로 b^n을 계산하고, 0^0 관례와 오버플로까지 처리하는 지수 계산기입니다.",
      es: "Calcula b^n con bases y exponentes reales, muestra el resultado al instante y maneja 0^0 y desbordamientos por convención.",
      fr: "Calculez b^n avec des bases et exposants réels, obtenez un résultat instantané et gérez 0^0 et les dépassements par convention.",
      de: "Berechnen Sie b^n mit reellen Basen und Exponenten, erhalten Sie sofort Ergebnisse und behandeln Sie 0^0 sowie Überläufe per Konvention.",
      pt: "Calcule b^n com bases e expoentes reais, veja o resultado instantaneamente e trate 0^0 e estouro por convenção.",
      ru: "Вычисляет b^n для действительных оснований и показателей, сразу показывает результат и обрабатывает 0^0 и переполнение по соглашению."
    }
  },
  {
    id: "exponential-form-calculator",
    category: "math",
    slugs: {
      en: "exponential-form-calculator",
      "zh-CN": "zhishu-xingshi-jisuanqi",
      "zh-TW": "zhishu-xingshi-jisuanqi",
      ja: "shisuu-hyoki-keisanki",
      ko: "jisu-pyo-gibeob-gyesan-gi",
      es: "calculadora-notacion-exponencial",
      fr: "calculateur-notation-exponentielle",
      de: "rechner-exponentialschreibweise",
      pt: "calculadora-notacao-exponencial",
      ru: "kalkulyator-pokazatelnoi-zapisi"
    },
    titles: {
      en: "Exponential Form Calculator - Scientific Notation Converter",
      "zh-CN": "指数形式计算器",
      "zh-TW": "指數形式計算器",
      ja: "指数表記計算機",
      ko: "지수 표기법 계산기",
      es: "Calculadora de notación exponencial",
      fr: "Calculateur de notation exponentielle",
      de: "Rechner für Exponentialschreibweise",
      pt: "Calculadora de notação exponencial",
      ru: "Калькулятор показательной записи"
    },
    descriptions: {
      en: "Exponential form calculator for standard and scientific notation. Convert numbers to exponential form or back to ordinary notation instantly.",
      "zh-CN": "标准数与科学计数法转换器，快速把数字转为指数形式，或还原为普通写法。",
      "zh-TW": "標準數與科學記號轉換器，快速把數字轉成指數形式，或還原為一般寫法。",
      ja: "標準表記と科学記数法を相互変換。数値を指数形式に、または通常表記にすばやく変換します。",
      ko: "일반 숫자와 과학적 표기를 서로 변환하는 계산기. 숫자를 지수 형태로 바꾸거나 다시 일반 표기로 돌립니다.",
      es: "Convierte entre notación estándar y científica al instante, o vuelve a la forma normal con un solo paso.",
      fr: "Convertissez instantanément les nombres entre notation standard et scientifique, ou revenez à la forme ordinaire.",
      de: "Wandelt Zahlen sofort zwischen Normal- und wissenschaftlicher Schreibweise um oder zurück in die Dezimalform.",
      pt: "Converta números entre notação padrão e científica instantaneamente, ou volte à forma comum.",
      ru: "Мгновенно переводите числа между обычной и научной записью или обратно в привычный вид."
    }
  },
  {
    id: "exponential-function-calculator",
    category: "math",
    slugs: {
      en: "exponential-function-calculator",
      "zh-CN": "zhishu-hanshu-ji-suan-qi",
      "zh-TW": "zhishu-hanshu-ji-suan-qi",
      ja: "shisuu-kansu-keisanki",
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
      de: "Exponentialfunktion-Rechner",
      pt: "Calculadora de função exponencial",
      ru: "Калькулятор показательной функции"
    },
    descriptions: {
      en: "Exponential function calculator for f(x)=a·b^x+c. Evaluate growth or decay with coefficient, base, input value, and vertical shift instantly.",
      "zh-CN": "指数函数计算器，可快速计算 f(x)=a·b^x+c 的增长或衰减结果。",
      "zh-TW": "指數函數計算器，可快速計算 f(x)=a·b^x+c 的成長或衰減結果。",
      ja: "指数関数計算機で f(x)=a·b^x+c の増加・減少をすばやく計算できます。",
      ko: "지수 함수 계산기로 f(x)=a·b^x+c의 증가·감소 값을 빠르게 계산하세요.",
      es: "Calculadora de función exponencial para evaluar f(x)=a·b^x+c y ver crecimiento o decaimiento al instante.",
      fr: "Calculatrice de fonction exponentielle pour évaluer f(x)=a·b^x+c et voir croissance ou décroissance instantanément.",
      de: "Exponentialfunktion-Rechner zur sofortigen Berechnung von f(x)=a·b^x+c bei Wachstum oder Zerfall.",
      pt: "Calculadora de função exponencial para avaliar f(x)=a·b^x+c e ver crescimento ou decaimento na hora.",
      ru: "Калькулятор показательной функции для мгновенного вычисления f(x)=a·b^x+c при росте или убывании."
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
