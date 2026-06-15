import type { ToolEntry } from "@/data/tools";

export const tools: ToolEntry[] = [
  {
    id: "loan-calculator",
    category: "finance",
    slugs: {
      en: "loan-calculator",
      "zh-CN": "daikuan-jisuanqi-yuegong-lixi",
      "zh-TW": "daikuan-jisuanqi-yuegong-lixi",
      ja: "roan-keisan-gekkan-hensai-risoku",
      ko: "daechul-gyesan-wol-sanghwan-igwa-ijea",
      es: "calculadora-prestamo-cuota-interes",
      fr: "calculateur-pret-mensualite-interets",
      de: "darlehensrechner-rate-zinsen",
      pt: "calculadora-emprestimo-parcela-juros",
      ru: "kreditnyy-kalkulyator-platezh-procenty"
    },
    titles: {
      en: "Loan Calculator - Monthly Payment & Interest",
      "zh-CN": "贷款计算器 - 月供与利息",
      "zh-TW": "貸款計算機 - 月付與利息",
      ja: "ローン計算機 - 毎月返済と利息",
      ko: "대출 계산기 - 월 상환액과 이자",
      es: "Calculadora de préstamo - cuota e interés",
      fr: "Calculateur de prêt - mensualité et intérêts",
      de: "Darlehensrechner - Rate und Zinsen",
      pt: "Calculadora de empréstimo - parcela e juros",
      ru: "Кредитный калькулятор — платеж и проценты"
    },
    descriptions: {
      en: "Loan calculator for monthly payments, total interest, and payoff timing on mortgages, auto loans, or personal loans. Compare costs before you borrow.",
      "zh-CN": "贷款计算器可估算房贷、车贷或个人贷款的月供、总利息和还清时间，帮助你借款前先比较成本。",
      "zh-TW": "貸款計算機可估算房貸、車貸或個人貸款的月付、總利息和還清時間，讓你借款前先比較成本。",
      ja: "住宅ローン、自動車ローン、個人ローンの毎月返済額、総利息、完済時期をすぐに確認できます。",
      ko: "주택담보대출, 자동차 대출, 개인대출의 월 상환액, 총이자, 완납 시점을 빠르게 계산합니다.",
      es: "Calcula la cuota mensual, el interés total y el tiempo de pago de hipotecas, autos o préstamos personales antes de pedir dinero.",
      fr: "Calculez la mensualité, les intérêts totaux et le délai de remboursement pour un prêt immobilier, auto ou personnel avant d’emprunter.",
      de: "Berechnen Sie Monatsrate, Gesamtzinsen und Laufzeit für Hypothek, Auto- oder Privatkredit, bevor Sie Geld aufnehmen.",
      pt: "Calcule parcela mensal, juros totais e prazo de quitação para financiamento imobiliário, auto ou pessoal antes de pegar dinheiro.",
      ru: "Рассчитайте ежемесячный платеж, общие проценты и срок погашения для ипотеки, автокредита или личного займа перед оформлением."
    }
  }
];
