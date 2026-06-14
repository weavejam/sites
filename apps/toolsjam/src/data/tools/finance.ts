import type { ToolEntry } from "@/data/tools";

export const tools: ToolEntry[] = [
  {
    id: "loan-calculator",
    category: "finance",
    slugs: {
      en: "loan-calculator",
      "zh-CN": "daikuan-jisuanqi-yuegong-lixi",
      "zh-TW": "daikuan-jisuanqi-yuegong-lixi",
      ja: "roan-keisan-maitsuki-hensai-rishi",
      ko: "daechul-gyesan-wol-sanghwan-aek-ija",
      es: "calculadora-prestamo-cuota-interes",
      fr: "calculatrice-pret-mensualites-interets",
      de: "kreditrechner-rate-zinsen",
      pt: "calculadora-emprestimo-parcela-juros",
      ru: "kalkulyator-zajma-ezhemesyachnyi-platezh-procenty"
    },
    titles: {
      en: "Loan Calculator - Monthly Payment & Interest",
      "zh-CN": "贷款计算器：月供与利息",
      "zh-TW": "貸款計算機：月付與利息",
      ja: "ローン計算機：毎月返済と利息",
      ko: "대출 계산기: 월 상환액과 이자",
      es: "Calculadora de préstamo: cuota e interés",
      fr: "Calculatrice de prêt : mensualité et intérêts",
      de: "Kreditrechner: Rate und Zinsen",
      pt: "Calculadora de empréstimo: parcela e juros",
      ru: "Калькулятор займа: платёж и проценты"
    },
    descriptions: {
      en: "Loan calculator for monthly payments, total interest, and payoff timing on mortgages, auto loans, or personal loans. Compare costs before you borrow.",
      "zh-CN": "贷款计算器可估算按揭、车贷或个人贷款的月供、总利息和还清时间，先比较成本再借款。",
      "zh-TW": "貸款計算機可估算房貸、車貸或個人貸款的月付、總利息與還清時間，先比較成本再借。",
      ja: "住宅ローン、オートローン、個人ローンの毎月返済額、総利息、完済時期を試算。借りる前に比較できます。",
      ko: "주택담보대출, 자동차 대출, 개인 대출의 월 상환액, 총이자, 상환 시점을 계산해 빌리기 전에 비교하세요.",
      es: "Calculadora de préstamo para cuota mensual, interés total y tiempo de pago en hipotecas, autos o préstamos personales. Compara antes de pedir.",
      fr: "Calculatrice de prêt pour mensualité, intérêts totaux et durée de remboursement sur prêt immobilier, auto ou personnel. Comparez avant d’emprunter.",
      de: "Kreditrechner für Monatsrate, Gesamtzinsen und Laufzeit bei Hypothek, Autokredit oder Privatkredit. Vor dem Kreditvergleich rechnen.",
      pt: "Calculadora de empréstimo para parcela mensal, juros totais e prazo em financiamento imobiliário, de carro ou pessoal. Compare antes de pegar.",
      ru: "Калькулятор займа для ежемесячного платежа, общей переплаты и срока погашения по ипотеке, автокредиту или личному займу. Сравните до займа."
    }
  }
];
