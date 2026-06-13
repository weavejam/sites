import type { ToolEntry } from "@/data/tools";

export const tools: ToolEntry[] = [
  {
    id: "loan-calculator",
    category: "finance",
    slugs: {
      en: "loan-calculator",
      "zh-CN": "daikuan-jisuanqi-yuegong-lixi",
      "zh-TW": "daikuan-jisuanqi-yuegong-lixi",
      ja: "roan-keisanki-tsukigaku-risuku",
      ko: "daechul-gyesangi-wolbul-i-ja",
      es: "calculadora-prestamo-cuota-interes",
      fr: "calculatrice-pret-mensualites-interets",
      de: "kreditrechner-rate-zinsen",
      pt: "calculadora-emprestimo-parcela-juros",
      ru: "kreditnyi-kalkulyator-platezh-procenty"
    },
    titles: {
      en: "Loan Calculator - Monthly Payment & Interest",
      "zh-CN": "贷款计算器 - 月供与利息",
      "zh-TW": "貸款計算機 - 月付與利息",
      ja: "ローン計算機 - 月々の返済と利息",
      ko: "대출 계산기 - 월 상환액과 이자",
      es: "Calculadora de préstamo - Cuota e interés",
      fr: "Calculatrice de prêt - Mensualité et intérêts",
      de: "Kreditrechner - Monatsrate und Zinsen",
      pt: "Calculadora de empréstimo - Parcela e juros",
      ru: "Калькулятор кредита — платёж и проценты"
    },
    descriptions: {
      en: "Loan calculator for monthly payments, total interest, and payoff timing on mortgages, auto loans, or personal loans. Compare costs before you borrow.",
      "zh-CN": "用于计算房贷、车贷或个人贷款的月供、总利息和还清时间。借款前先比较成本。",
      "zh-TW": "用來計算房貸、車貸或個人貸款的月付、總利息與還清時間。借款前先比較成本。",
      ja: "住宅ローン、オートローン、個人ローンの月々の返済額、総利息、完済時期を計算。借入前の比較に。",
      ko: "주택담보대출, 자동차대출, 개인대출의 월 상환액, 총이자, 상환 시점을 계산합니다. 빌리기 전에 비용을 비교하세요.",
      es: "Calcula la cuota mensual, el interés total y el tiempo de amortización de hipotecas, autos o préstamos personales. Compara antes de pedir dinero.",
      fr: "Calculez la mensualité, les intérêts totaux et le délai de remboursement d’un prêt immobilier, auto ou personnel. Comparez avant d’emprunter.",
      de: "Berechnen Sie Monatsrate, Gesamtzinsen und Tilgungsdauer für Baufinanzierung, Auto- oder Privatkredite. Vor dem Kredit vergleichen.",
      pt: "Calcule a parcela mensal, o juros total e o prazo para quitar financiamentos, auto ou empréstimos pessoais. Compare antes de contratar.",
      ru: "Рассчитайте ежемесячный платёж, общие проценты и срок погашения ипотеки, автокредита или личного займа. Сравните до оформления."
    }
  }
];
