import type { ToolEntry } from "@/data/tools";

export const tools: ToolEntry[] = [
  {
    id: "3d-render-calculator",
    category: "other",
    slugs: {
      en: "3d-render-calculator",
      "zh-CN": "3d-xuanran-shijian-jisuanqi",
      "zh-TW": "3d-xuanran-shijian-jisuanqi",
      ja: "3d-renda-jikan-keisanki",
      ko: "3d-rendeo-sigan-gyesangi",
      es: "calculadora-tiempo-render-3d",
      fr: "calculateur-temps-rendu-3d",
      de: "3d-renderzeit-rechner",
      pt: "calculadora-tempo-renderizacao-3d",
      ru: "kalkulyator-vremeni-3d-renderinga"
    },
    titles: {
      en: "3D Render Calculator - Estimate Render Times",
      "zh-CN": "3D 渲染时间计算器 - 估算渲染耗时",
      "zh-TW": "3D 渲染時間計算器 - 估算渲染耗時",
      ja: "3Dレンダー時間計算機 - レンダー時間を見積もり",
      ko: "3D 렌더 시간 계산기 - 렌더링 시간 예측",
      es: "Calculadora de render 3D - Estima tiempos",
      fr: "Calculateur de rendu 3D - Estimer les temps",
      de: "3D-Renderzeit-Rechner - Renderzeiten schätzen",
      pt: "Calculadora de renderização 3D - Estime tempos",
      ru: "Калькулятор 3D-рендера - оценка времени"
    },
    descriptions: {
      en: "Estimate 3D render times by polygon count, texture resolution, lighting, and hardware specs. Optimize scenes and plan project timelines efficiently.",
      "zh-CN": "按多边形数量、纹理分辨率、灯光和硬件规格估算 3D 渲染时间，高效优化场景并规划项目进度。",
      "zh-TW": "依多邊形數量、紋理解析度、燈光與硬體規格估算 3D 渲染時間，協助最佳化場景並高效規劃專案時程。",
      ja: "ポリゴン数、テクスチャ解像度、ライティング、ハードウェア仕様から3Dレンダー時間を見積もり、シーン最適化と工程計画を効率化します。",
      ko: "폴리곤 수, 텍스처 해상도, 조명, 하드웨어 사양으로 3D 렌더 시간을 예측하고 장면 최적화와 일정 계획을 효율화하세요.",
      es: "Estima tiempos de render 3D por polígonos, resolución de texturas, luces y hardware. Optimiza escenas y planifica proyectos con eficiencia.",
      fr: "Estimez les temps de rendu 3D selon polygones, textures, éclairage et matériel. Optimisez vos scènes et planifiez vos projets efficacement.",
      de: "Schätze 3D-Renderzeiten nach Polygonen, Texturauflösung, Licht und Hardware. Optimiere Szenen und plane Projekte effizient.",
      pt: "Estime tempos de renderização 3D por polígonos, texturas, luzes e hardware. Otimize cenas e planeje projetos com eficiência.",
      ru: "Оценивайте время 3D-рендера по полигонам, текстурам, свету и железу. Оптимизируйте сцены и эффективно планируйте проекты."
    }
  },
  {
    id: "4-3-aspect-ratio-calculator",
    category: "other",
    slugs: {
      en: "4-3-aspect-ratio-calculator",
      "zh-CN": "4-3-bi-li-ji-suan-qi",
      "zh-TW": "4-3-bi-li-ji-suan-qi",
      ja: "4-3-hiritu-keisanki",
      ko: "4-3-sangbi-gyesangi",
      es: "calculadora-relacion-4-3",
      fr: "calculateur-ratio-4-3",
      de: "seitenverhaeltnis-rechner-4-3",
      pt: "calculadora-proporcao-4-3",
      ru: "kalkulyator-sootnosheniya-storon-4-3"
    },
    titles: {
      en: "4:3 Aspect Ratio Calculator - Traditional Display Dimensions",
      "zh-CN": "4:3比例计算器 - 传统显示尺寸",
      "zh-TW": "4:3比例計算器 - 傳統顯示尺寸",
      ja: "4:3アスペクト比計算機 - 伝統的な画面サイズ",
      ko: "4:3 화면비 계산기 - 전통적 디스플레이 크기",
      es: "Calculadora de relación 4:3",
      fr: "Calculateur de ratio 4:3",
      de: "4:3-Seitenverhältnis-Rechner",
      pt: "Calculadora de proporção 4:3",
      ru: "Калькулятор соотношения 4:3"
    },
    descriptions: {
      en: "Calculate width, height, diagonal, and pixel density for 4:3 displays. Convert pixels, inches, cm, and mm for classic monitors and legacy screen formats.",
      "zh-CN": "计算 4:3 显示器的宽度、高度、对角线和像素密度，并在像素、英寸、厘米和毫米间换算。",
      "zh-TW": "計算 4:3 顯示器的寬度、高度、對角線和像素密度，並在像素、英吋、公分與毫米間換算。",
      ja: "4:3ディスプレイの幅、高さ、対角線、画素密度を計算し、ピクセル・インチ・cm・mmを換算します。",
      ko: "4:3 디스플레이의 가로, 세로, 대각선, 픽셀 밀도를 계산하고 픽셀·인치·cm·mm를 변환합니다.",
      es: "Calcula ancho, alto, diagonal y densidad de píxeles para pantallas 4:3. Convierte píxeles, pulgadas, cm y mm.",
      fr: "Calculez largeur, hauteur, diagonale et densité de pixels pour les écrans 4:3. Convertissez pixels, pouces, cm et mm.",
      de: "Berechnen Sie Breite, Höhe, Diagonale und Pixeldichte für 4:3-Displays. Konvertieren Sie Pixel, Zoll, cm und mm.",
      pt: "Calcule largura, altura, diagonal e densidade de pixels para telas 4:3. Converta pixels, polegadas, cm e mm.",
      ru: "Рассчитайте ширину, высоту, диагональ и плотность пикселей для 4:3. Переводите пиксели, дюймы, см и мм."
    }
  },
  {
    id: "act-score-calculator",
    category: "other",
    slugs: {
      en: "act-score-calculator",
      "zh-CN": "act-fenshu-jisuanqi-zonghe-fenxiang",
      "zh-TW": "act-fenshu-jisuanqi-zonghe-fenxiang",
      ja: "act-sukoa-keisan-ki-sogou-bubun-ten",
      ko: "act-jeomsu-gyesangi-ongnyeog-bunyeol",
      es: "calculadora-puntaje-act-global-parciales",
      fr: "calculateur-score-act-global-sous-scores",
      de: "act-punktrechner-gesamt-teilwerte",
      pt: "calculadora-nota-act-geral-subscores",
      ru: "kalkulyator-ballov-act-obshchiy-podbally"
    },
    titles: {
      en: "ACT Score Calculator - Composite & Subscores",
      "zh-CN": "ACT分数计算器 - 综合与分项",
      "zh-TW": "ACT分數計算器 - 綜合與分項",
      ja: "ACTスコア計算機 - 総合・分野別",
      ko: "ACT 점수 계산기 - 종합 및 세부점수",
      es: "Calculadora de puntaje ACT - Global y parciales",
      fr: "Calculatrice ACT - Score global et sous-scores",
      de: "ACT-Punktrechner - Gesamt- und Teilwerte",
      pt: "Calculadora de nota ACT - Geral e subscores",
      ru: "Калькулятор ACT - общий и подбаллы"
    },
    descriptions: {
      en: "Calculate your ACT composite, ELA, and STEM subscores from English, Math, Reading, Science, and Writing scores. See your approximate national percentile.",
      "zh-CN": "根据英语、数学、阅读、科学和写作成绩计算ACT综合分、ELA和STEM分项，并查看大致全国百分位。",
      "zh-TW": "依據英文、數學、閱讀、科學與寫作成績計算 ACT 綜合分、ELA 與 STEM 分項，並查看大致全國百分位。",
      ja: "英語・数学・リーディング・理科・任意のライティング得点から、ACTの総合点、ELA、STEMを計算し、概算全国順位も確認できます。",
      ko: "영어, 수학, 독해, 과학, 선택 작성 점수로 ACT 종합점수, ELA, STEM을 계산하고 대략적인 전국 백분위를 확인하세요.",
      es: "Calcula tu puntaje global del ACT, ELA y STEM a partir de Inglés, Matemáticas, Lectura, Ciencias y Escritura opcional, y ve tu percentil nacional aproximado.",
      fr: "Calculez instantanément votre score global ACT, vos scores ELA et STEM à partir des notes d’anglais, de maths, de lecture, de sciences et de rédaction optionnelle.",
      de: "Berechnen Sie Ihren ACT-Gesamtwert, ELA- und STEM-Teilwert sofort aus Englisch, Mathematik, Lesen, Naturwissenschaften und optionalem Writing.",
      pt: "Calcule instantaneamente sua nota geral do ACT, o ELA e o STEM a partir de Inglês, Matemática, Leitura, Ciências e Writing opcional.",
      ru: "Мгновенно рассчитайте общий балл ACT, ELA и STEM по баллам за English, Math, Reading, Science и необязательный Writing."
    }
  },
  {
    id: "age-on-other-planets-calculator",
    category: "other",
    slugs: {
      en: "age-on-other-planets-calculator",
      "zh-CN": "qita-xingxing-nianling-jisuanqi",
      "zh-TW": "qita-xingxing-nianling-jisuanqi",
      ja: "hoka-no-wakusei-nenrei-keisanki",
      ko: "dareun-haengseong-nai-gyesangi",
      es: "calculadora-edad-otros-planetas",
      fr: "calculateur-age-autres-planetes",
      de: "alter-auf-anderen-planeten-rechner",
      pt: "calculadora-idade-outros-planetas",
      ru: "kalkulyator-vozrasta-na-drugikh-planetakh"
    },
    titles: {
      en: "Age on Other Planets Calculator - Planetary Age",
      "zh-CN": "其他行星年龄计算器 - 行星年龄换算",
      "zh-TW": "其他行星年齡計算器 - 行星年齡換算",
      ja: "他の惑星での年齢計算機 - 惑星年齢換算",
      ko: "다른 행성 나이 계산기 - 행성 나이 변환",
      es: "Calculadora de edad en otros planetas",
      fr: "Calculateur d’âge sur les autres planètes",
      de: "Alter auf anderen Planeten berechnen",
      pt: "Calculadora de idade em outros planetas",
      ru: "Калькулятор возраста на других планетах"
    },
    descriptions: {
      en: "Calculate your age on Mercury, Venus, Mars, Jupiter, Saturn, Uranus, or Neptune by orbital period. Discover how many planetary years you have lived.",
      "zh-CN": "按公转周期计算你在水星、金星、火星、木星、土星、天王星或海王星上的年龄，了解你度过了多少个行星年。",
      "zh-TW": "依公轉週期計算你在水星、金星、火星、木星、土星、天王星或海王星上的年齡，了解你活過多少個行星年。",
      ja: "公転周期をもとに、水星、金星、火星、木星、土星、天王星、海王星での年齢を計算し、何惑星年生きたかを確認できます。",
      ko: "공전 주기로 수성, 금성, 화성, 목성, 토성, 천왕성, 해왕성에서의 나이를 계산하고 몇 행성년을 살았는지 알아보세요.",
      es: "Calcula tu edad en Mercurio, Venus, Marte, Júpiter, Saturno, Urano o Neptuno según su periodo orbital y descubre tus años planetarios.",
      fr: "Calculez votre âge sur Mercure, Vénus, Mars, Jupiter, Saturne, Uranus ou Neptune selon leur période orbitale et vos années planétaires.",
      de: "Berechne dein Alter auf Merkur, Venus, Mars, Jupiter, Saturn, Uranus oder Neptun nach Umlaufzeit und entdecke deine Planetenjahre.",
      pt: "Calcule sua idade em Mercúrio, Vênus, Marte, Júpiter, Saturno, Urano ou Netuno pelo período orbital e veja seus anos planetários.",
      ru: "Рассчитайте возраст на Меркурии, Венере, Марсе, Юпитере, Сатурне, Уране или Нептуне по орбитальному периоду."
    }
  },
  {
    id: "amdahls-law-calculator",
    category: "other",
    slugs: {
      en: "amdahls-law-calculator",
      "zh-CN": "amudaer-dinglv-bingxing-jiasu-yu-xiaolv-ji-suanqi",
      "zh-TW": "amudaer-dinglu-bingxing-jiasu-yu-xiaolv-ji-suanqi",
      ja: "amudaru-ho-no-ryokaku-sokudo-kouka-keisan",
      ko: "amdahl-ui-beobchik-byeolsu-gasok-hyoyul-gyeongsan",
      es: "calculadora-ley-amdahl-aceleracion-paralela",
      fr: "calculateur-loi-amdahl-acceleration-parallele",
      de: "amdahls-gesetz-parallele-beschleunigung-rechner",
      pt: "calculadora-lei-amdahl-aceleracao-paralela",
      ru: "kalkulyator-zakona-amdala-parallelnoe-uskorenie"
    },
    titles: {
      en: "Amdahl's Law Calculator - Parallel Speedup & Efficiency",
      "zh-CN": "Amdahl定律并行加速与效率计算器",
      "zh-TW": "Amdahl定律並行加速與效率計算器",
      ja: "Amdahlの法則 並列加速と効率計算",
      ko: "Amdahl의 법칙 병렬 가속과 효율 계산",
      es: "Ley de Amdahl: aceleración y eficiencia",
      fr: "Loi d’Amdahl : accélération et efficacité",
      de: "Amdahlsches Gesetz: Speedup und Effizienz",
      pt: "Lei de Amdahl: aceleração e eficiência",
      ru: "Закон Амдала: ускорение и эффективность"
    },
    descriptions: {
      en: "Calculate parallel speedup, max theoretical speedup, and efficiency using Amdahl's Law. Plan multi-processor systems and find serial-fraction bottlenecks.",
      "zh-CN": "使用Amdahl定律计算并行加速比、理论最大加速比、执行时间和并行效率，帮助规划多处理器系统并找出串行瓶颈。",
      "zh-TW": "使用Amdahl定律計算並行加速比、理論最大加速比、執行時間與並行效率，協助規劃多處理器系統並找出串行瓶頸。",
      ja: "Amdahlの法則で並列加速比、理論最大加速比、実行時間、並列効率を計算し、マルチプロセッサ設計のボトルネックを把握できます。",
      ko: "Amdahl의 법칙으로 병렬 가속도, 이론적 최대 가속도, 실행 시간, 병렬 효율을 계산해 멀티프로세서 병목을 파악합니다.",
      es: "Calcula la aceleración paralela, la aceleración máxima teórica, el tiempo de ejecución y la eficiencia con la ley de Amdahl.",
      fr: "Calculez l’accélération parallèle, l’accélération théorique maximale, le temps d’exécution et l’efficacité avec la loi d’Amdahl.",
      de: "Berechnen Sie parallelen Speedup, theoretisches Maximum, Laufzeit und Effizienz mit Amdahls Gesetz für Multiprozessorsysteme.",
      pt: "Calcule a aceleração paralela, o máximo teórico, o tempo de execução e a eficiência usando a lei de Amdahl.",
      ru: "Рассчитайте параллельное ускорение, теоретический максимум, время выполнения и эффективность по закону Амдала."
    }
  },
  {
    id: "easter-calculator",
    category: "other",
    slugs: {
      en: "easter-calculator",
      "zh-CN": "fuhuojie-riqi-ji-suanqi",
      "zh-TW": "fuhuojie-riqi-ji-suanqi",
      ja: "fukkatsusetsu-hizuke-keitai",
      ko: "buheoljeol-naljja-gyesangi",
      es: "calculadora-fecha-pascua",
      fr: "calculateur-date-paques",
      de: "osterdatum-rechner",
      pt: "calculadora-data-pascoa",
      ru: "kalkulyator-daty-paskhi"
    },
    titles: {
      en: "Easter Calculator - Find Easter Sunday Date",
      "zh-CN": "复活节日期计算器",
      "zh-TW": "復活節日期計算器",
      ja: "復活祭の日付計算",
      ko: "부활절 날짜 계산기",
      es: "Calculadora de fecha de Pascua",
      fr: "Calculateur de date de Pâques",
      de: "Osterdatum-Rechner",
      pt: "Calculadora de data da Páscoa",
      ru: "Калькулятор даты Пасхи"
    },
    descriptions: {
      en: "Calculate Easter Sunday and related Christian holiday dates for any year using the Meeus/Jones/Butcher algorithm. Plan religious and civic calendars.",
      "zh-CN": "使用精确的 Meeus/Jones/Butcher 算法，计算任意年份的复活节主日及相关基督教节日。",
      "zh-TW": "使用精確的 Meeus/Jones/Butcher 演算法，計算任一年份的復活節主日及相關基督教節日。",
      ja: "Meeus/Jones/Butcher 法で、任意の年の復活祭と関連祝日を計算します。",
      ko: "Meeus/Jones/Butcher 알고리즘으로 모든 해의 부활절과 관련 절기를 계산합니다.",
      es: "Calcula la Pascua y las festividades cristianas relacionadas para cualquier año con el algoritmo Meeus/Jones/Butcher.",
      fr: "Calculez Pâques et les fêtes chrétiennes associées pour n’importe quelle année avec l’algorithme Meeus/Jones/Butcher.",
      de: "Berechne Ostern und verwandte christliche Feiertage für jedes Jahr mit dem Meeus/Jones/Butcher-Algorithmus.",
      pt: "Calcule a Páscoa e feriados cristãos relacionados para qualquer ano com o algoritmo Meeus/Jones/Butcher.",
      ru: "Рассчитайте Пасху и связанные христианские праздники для любого года по алгоритму Meeus/Jones/Butcher."
    }
  },
  {
    id: "edpi-calculator",
    category: "other",
    slugs: {
      en: "edpi-calculator",
      "zh-CN": "edpi-ji-suan-qi-you-xi-shu-biao-min-gan-du",
      "zh-TW": "edpi-ji-suan-qi-you-xi-shu-biao-min-gan-du",
      ja: "edpi-keitanki-gemu-sentenshiti",
      ko: "edpi-gyesan-gi-geim-maseukeu-sensiti-beol",
      es: "calculadora-edpi-sensibilidad-raton-juegos",
      fr: "calculateur-edpi-sensibilite-souris-jeu",
      de: "edpi-rechner-gaming-maussensitivitat",
      pt: "calculadora-edpi-sensibilidade-mouse-jogos",
      ru: "edpi-kalkulator-chuvstvitelnost-myshi-igry"
    },
    titles: {
      en: "EDPI Calculator - Gaming Mouse Sensitivity",
      "zh-CN": "EDPI计算器 - 游戏鼠标灵敏度",
      "zh-TW": "EDPI計算器 - 遊戲滑鼠靈敏度",
      ja: "eDPI計算機 - ゲーミング感度",
      ko: "eDPI 계산기 - 게이밍 감도",
      es: "Calculadora eDPI - Sensibilidad de ratón",
      fr: "Calculateur eDPI - Sensibilité souris",
      de: "eDPI Rechner - Maus-Sensitivität",
      pt: "Calculadora eDPI - Sensibilidade do mouse",
      ru: "Калькулятор eDPI - чувствительность мыши"
    },
    descriptions: {
      en: "Calculate eDPI (Effective DPI) by multiplying mouse DPI and in-game sensitivity. Standardise aim across games and compare setups with pro players.",
      "zh-CN": "通过鼠标DPI和游戏内灵敏度计算eDPI，统一各游戏的瞄准手感，并与职业选手配置对比。",
      "zh-TW": "透過滑鼠DPI與遊戲內靈敏度計算eDPI，統一各遊戲的瞄準手感，並與職業選手配置比較。",
      ja: "マウスDPIとゲーム内感度からeDPIを算出し、ゲーム間の感度を統一してプロ設定と比較できます。",
      ko: "마우스 DPI와 게임 내 감도로 eDPI를 계산해 게임 간 감도를 맞추고 프로 세팅과 비교하세요.",
      es: "Calcula el eDPI con el DPI del ratón y la sensibilidad del juego para unificar tu puntería y comparar ajustes con pros.",
      fr: "Calculez l’eDPI avec le DPI de votre souris et la sensibilité en jeu pour harmoniser votre visée et comparer vos réglages aux pros.",
      de: "Berechne eDPI aus Maus-DPI und In-Game-Sensitivität, gleiche dein Aim zwischen Spielen an und vergleiche es mit Pros.",
      pt: "Calcule o eDPI com o DPI do mouse e a sensibilidade do jogo para padronizar sua mira e comparar com profissionais.",
      ru: "Рассчитайте eDPI по DPI мыши и чувствительности в игре, чтобы унифицировать прицеливание и сравнить настройки с про."
    }
  },
  {
    id: "encounter-calculator-5e",
    category: "other",
    slugs: {
      en: "encounter-calculator-5e",
      "zh-CN": "5e-zaoyu-suanqi",
      "zh-TW": "5e-zaoyu-suanqi",
      ja: "5e-souguu-keisanki",
      ko: "5e-jo-u-gyeonsangi",
      es: "calculadora-encuentros-5e",
      fr: "calculateur-rencontres-5e",
      de: "begegnungsrechner-5e",
      pt: "calculadora-encontros-5e",
      ru: "kalkulyator-vstrech-5e"
    },
    titles: {
      en: "D&D 5E Encounter Calculator - Balance Combat",
      "zh-CN": "5E遭遇计算器",
      "zh-TW": "5E遭遇計算器",
      ja: "5E遭遇計算ツール",
      ko: "5E 조우 계산기",
      es: "Calculadora de encuentros 5E",
      fr: "Calculateur de rencontres 5E",
      de: "5E Begegnungsrechner",
      pt: "Calculadora de encontros 5E",
      ru: "Калькулятор встреч 5E"
    },
    descriptions: {
      en: "Build balanced D&D 5th Edition encounters using official XP thresholds. Get XP budgets, difficulty ratings, and suggested Challenge Ratings instantly.",
      "zh-CN": "使用官方XP阈值构建平衡的D&D 5E遭遇。即时获取XP预算、难度评级和建议的挑战等级。",
      "zh-TW": "使用官方XP門檻打造平衡的D&D 5E遭遇。立即取得XP預算、難度評級與建議的挑戰等級。",
      ja: "公式XP閾値でD&D 5Eの遭遇を調整。XP予算、難易度、推奨CRをすぐに算出します。",
      ko: "공식 XP 기준으로 D&D 5E 조우를 균형 있게 설계하세요. XP 예산, 난이도, 권장 CR을 즉시 확인합니다.",
      es: "Crea encuentros equilibrados de D&D 5e con los umbrales oficiales de PX. Obtén presupuesto, dificultad y CR sugerido al instante.",
      fr: "Créez des rencontres D&D 5e équilibrées grâce aux seuils de PX officiels. Obtenez instantanément budget, difficulté et CR suggéré.",
      de: "Erstelle ausgewogene D&D-5e-Begegnungen mit den offiziellen XP-Schwellen. XP-Budget, Schwierigkeit und empfohlene CR sofort.",
      pt: "Crie encontros equilibrados de D&D 5e usando os limites oficiais de XP. Veja orçamento, dificuldade e CR sugerido na hora.",
      ru: "Создавайте сбалансированные встречи D&D 5e по официальным порогам XP. Мгновенно получайте бюджет XP, сложность и CR."
    }
  },
  {
    id: "engagement-rate-calculator",
    category: "other",
    slugs: {
      en: "engagement-rate-calculator",
      "zh-CN": "shejiao-meiti-hudong-lv-jisuanqi",
      "zh-TW": "shejiao-meiti-hudong-lv-jisuanqi",
      ja: "enjimento-ritsu-keisanki",
      ko: "eonjinmeonteu-rateu-gyeolsanki",
      es: "calculadora-tasa-interaccion-redes-sociales",
      fr: "calculateur-taux-engagement-reseaux-sociaux",
      de: "engagement-rate-rechner-social-media",
      pt: "calculadora-taxa-engajamento-redes-sociais",
      ru: "kalkulyator-urovnya-vovlechennosti-socseti"
    },
    titles: {
      en: "Engagement Rate Calculator - Social Media Metrics",
      "zh-CN": "社交媒体互动率计算器",
      "zh-TW": "社群媒體互動率計算器",
      ja: "エンゲージメント率計算機",
      ko: "참여율 계산기",
      es: "Calculadora de tasa de interacción",
      fr: "Calculateur de taux d'engagement",
      de: "Engagement-Rate-Rechner",
      pt: "Calculadora de taxa de engajamento",
      ru: "Калькулятор уровня вовлеченности"
    },
    descriptions: {
      en: "Calculate social media engagement rate from reach, likes, comments, shares, saves, and clicks. Benchmark performance against industry averages instantly.",
      "zh-CN": "根据曝光、点赞、评论、分享、收藏和点击计算社交媒体互动率，并立即对照行业平均水平评估表现。",
      "zh-TW": "根據曝光、按讚、留言、分享、收藏與點擊計算社群媒體互動率，並立即對照產業平均表現。",
      ja: "リーチ、いいね、コメント、シェア、保存、クリックからSNSのエンゲージメント率を計算し、業界平均とすぐ比較できます。",
      ko: "도달수, 좋아요, 댓글, 공유, 저장, 클릭으로 소셜 미디어 참여율을 계산하고 업계 평균과 바로 비교하세요.",
      es: "Calcula la tasa de interacción en redes sociales con alcance, likes, comentarios, compartidos, guardados y clics, y compárala con promedios del sector.",
      fr: "Calculez le taux d'engagement sur les réseaux sociaux à partir de la portée, des likes, des commentaires, des partages, des sauvegardes et des clics.",
      de: "Berechnen Sie die Engagement-Rate für Social Media aus Reichweite, Likes, Kommentaren, Shares, Saves und Klicks und vergleichen Sie sie mit Branchenwerten.",
      pt: "Calcule a taxa de engajamento nas redes sociais com alcance, curtidas, comentários, compartilhamentos, salvamentos e cliques, e compare com médias do setor.",
      ru: "Рассчитайте уровень вовлеченности в соцсетях по охвату, лайкам, комментариям, репостам, сохранениям и кликам и сравните с отраслевыми средними."
    }
  },
  {
    id: "even-parity-bit-calculator",
    category: "other",
    slugs: {
      en: "even-parity-bit-calculator",
      "zh-CN": "ou-jiao-yan-wei-ji-suan-qi",
      "zh-TW": "ou-jiao-yan-wei-ji-suan-qi",
      ja: "gusu-paritei-bitto-keisanki",
      ko: "jjaksu-paeliti-biteu-gyesangi",
      es: "calculadora-bit-paridad-par",
      fr: "calculateur-bit-parite-paire",
      de: "rechner-gerades-paritaetsbit",
      pt: "calculadora-bit-paridade-par",
      ru: "kalkulyator-bita-chetnoy-chetnosti"
    },
    titles: {
      en: "Even Parity Bit Calculator - Binary Error Detection",
      "zh-CN": "偶校验位计算器 - 二进制错误检测",
      "zh-TW": "偶校驗位計算器 - 二進位錯誤檢測",
      ja: "偶数パリティビット計算機 - 二進数エラー検出",
      ko: "짝수 패리티 비트 계산기 - 이진 오류 검출",
      es: "Calculadora de paridad par - Detección binaria",
      fr: "Calculateur de parité paire - Détection binaire",
      de: "Rechner für gerade Parität - Binäre Fehlererkennung",
      pt: "Calculadora de paridade par - Detecção binária",
      ru: "Калькулятор бита чётной чётности - обнаружение ошибок"
    },
    descriptions: {
      en: "Generate even parity bits for binary data and validate received strings for single-bit transmission errors. Essential error detection tool for digital systems.",
      "zh-CN": "为二进制数据生成偶校验位，并验证收到的字符串是否存在单比特传输错误。数字系统中必备的错误检测工具。",
      "zh-TW": "為二進位資料產生偶校驗位，並驗證收到的字串是否存在單位元傳輸錯誤。數位系統必備的錯誤檢測工具。",
      ja: "二進数データの偶数パリティビットを生成し、受信文字列の単一ビット通信エラーを検証します。",
      ko: "이진 데이터의 짝수 패리티 비트를 생성하고, 수신 문자열의 단일 비트 전송 오류를 검증합니다.",
      es: "Genera bits de paridad par para datos binarios y valida cadenas recibidas para detectar errores de un solo bit.",
      fr: "Générez des bits de parité paire pour des données binaires et validez des chaînes reçues pour détecter les erreurs d'un seul bit.",
      de: "Erzeugen Sie gerade Paritätsbits für Binärdaten und prüfen Sie empfangene Zeichenfolgen auf Einzelbit-Übertragungsfehler.",
      pt: "Gere bits de paridade par para dados binários e valide strings recebidas para detectar erros de um único bit.",
      ru: "Генерируйте биты чётной чётности для двоичных данных и проверяйте принятые строки на одиночные ошибки передачи."
    }
  },
  {
    id: "vampire-apocalypse-calculator",
    category: "other",
    slugs: {
      en: "vampire-apocalypse-calculator",
      "zh-CN": "xixuegui-mori-jisuanqi",
      "zh-TW": "xixuegui-mori-jisuanqi",
      ja: "kyuketsuki-matsubou-keisanki",
      ko: "hyukseolgwi-malmang-gyeongsangi",
      es: "calculadora-apocalipsis-vampiros",
      fr: "calculateur-apocalypse-vampires",
      de: "vampir-apokalypse-rechner",
      pt: "calculadora-apocalipse-vampiros",
      ru: "rechnik-apokalipsisa-vampirov"
    },
    titles: {
      en: "Vampire Apocalypse Calculator - Survival Odds",
      "zh-CN": "吸血鬼末日计算器",
      "zh-TW": "吸血鬼末日計算器",
      ja: "吸血鬼終末計算機",
      ko: "흡혈귀 종말 계산기",
      es: "Calculadora de Apocalipsis Vampírico",
      fr: "Calculateur d’Apocalypse Vampirique",
      de: "Vampir-Apokalypse-Rechner",
      pt: "Calculadora de Apocalipse Vampírico",
      ru: "Рассчётчик вампирского апокалипсиса"
    },
    descriptions: {
      en: "Simulate vampire outbreak population dynamics and calculate human survival probabilities using predator-prey equations. Plan your apocalypse strategy.",
      "zh-CN": "用数学捕食-被捕食方程模拟吸血鬼爆发，并计算人类生存概率。",
      "zh-TW": "用數學捕食-被捕食方程模擬吸血鬼爆發，並計算人類生存機率。",
      ja: "吸血鬼の発生を数理モデルでシミュレーションし、人類の生存確率を算出します。",
      ko: "흡혈귀 확산을 수학적 모델로 시뮬레이션하고 인간 생존 확률을 계산합니다.",
      es: "Simula un brote vampírico y calcula la probabilidad de supervivencia humana con ecuaciones depredador-presa.",
      fr: "Simulez une épidémie de vampires et calculez les chances de survie humaine avec des équations proie-prédateur.",
      de: "Simuliere einen Vampir-Ausbruch und berechne die menschlichen Überlebenschancen mit Räuber-Beute-Gleichungen.",
      pt: "Simule um surto de vampiros e calcule as chances de sobrevivência humana com equações presa-predador.",
      ru: "Смоделируйте вспышку вампиров и рассчитайте шансы выживания людей с помощью уравнений хищник-жертва."
    }
  },
  {
    id: "vertical-exaggeration-calculator",
    category: "other",
    slugs: {
      en: "vertical-exaggeration-calculator",
      "zh-CN": "chui-zhi-kua-zhang-jisuanqi",
      "zh-TW": "chui-zhi-kua-zhang-jisuanqi",
      ja: "tate-no-chogyo-keisanki",
      ko: "sujik-gwa-jang-gye-san-gi",
      es: "calculadora-exageracion-vertical",
      fr: "calculateur-exageration-verticale",
      de: "vertikaluberhoehung-rechner",
      pt: "calculadora-exagero-vertical",
      ru: "kalkulyator-vertikalnogo-uskoreniya"
    },
    titles: {
      en: "Vertical Exaggeration Calculator - Map Scale Ratios",
      "zh-CN": "垂直夸张计算器 - 地图比例尺",
      "zh-TW": "垂直誇張計算器 - 地圖比例尺",
      ja: "垂直誇張計算機 - 地図の縮尺比",
      ko: "수직 과장 계산기 - 지도 축척 비율",
      es: "Calculadora de exageración vertical - Escala del mapa",
      fr: "Calculateur d'exagération verticale - Échelle de carte",
      de: "Rechner für vertikale Überhöhung - Kartenmaßstab",
      pt: "Calculadora de exagero vertical - Escala do mapa",
      ru: "Калькулятор вертикального преувеличения - Масштаб карты"
    },
    descriptions: {
      en: "Calculate vertical exaggeration ratios for topographic maps and 3D terrain. Enter horizontal and vertical scales to get instant VE results.",
      "zh-CN": "计算地形图和3D地形的垂直夸张比率。输入水平与垂直比例尺，立即得到 VE 结果。",
      "zh-TW": "計算地形圖與3D地形的垂直誇張比率。輸入水平與垂直比例尺，立即取得 VE 結果。",
      ja: "地形図や3D地形の垂直誇張比を計算。水平・垂直縮尺を入力するとVEをすぐに表示します。",
      ko: "지형도와 3D 지형의 수직 과장 비율을 계산하세요. 수평·수직 축척을 입력하면 VE 결과를 즉시 확인합니다.",
      es: "Calcula la exageración vertical en mapas topográficos y terreno 3D. Introduce las escalas horizontal y vertical para ver el VE al instante.",
      fr: "Calculez l'exagération verticale des cartes topographiques et terrains 3D. Saisissez les échelles horizontale et verticale pour obtenir le VE instantané.",
      de: "Berechnen Sie die vertikale Überhöhung für topografische Karten und 3D-Gelände. Horizontale und vertikale Maßstäbe eingeben und VE sofort sehen.",
      pt: "Calcule o exagero vertical em mapas topográficos e terrenos 3D. Informe as escalas horizontal e vertical para ver o VE na hora.",
      ru: "Рассчитайте вертикальное преувеличение для топокарт и 3D-рельефа. Введите горизонтальный и вертикальный масштабы и сразу получите VE."
    }
  },
  {
    id: "video-file-size-calculator-by-format",
    category: "other",
    slugs: {
      en: "video-file-size-calculator-by-format",
      "zh-CN": "shipin-wenjian-daxiao-jisuanqi",
      "zh-TW": "shipin-wenjian-daxiao-jisuanqi",
      ja: "douga-fairu-saizu-keisan",
      ko: "dongyeong-sayonglyang-gyeolsangi",
      es: "calculadora-tamano-archivo-video",
      fr: "calculateur-taille-fichier-video",
      de: "video-dateigroesse-rechner",
      pt: "calculadora-tamanho-arquivo-video",
      ru: "kalkulyator-razmera-video-faila"
    },
    titles: {
      en: "Video File Size Calculator by Format",
      "zh-CN": "视频文件大小计算器",
      "zh-TW": "影片檔案大小計算器",
      ja: "動画ファイルサイズ計算機",
      ko: "동영상 파일 크기 계산기",
      es: "Calculadora de tamaño de video",
      fr: "Calculateur de taille de vidéo",
      de: "Video-Dateigrößen-Rechner",
      pt: "Calculadora de tamanho de vídeo",
      ru: "Калькулятор размера видео"
    },
    descriptions: {
      en: "Estimate video file sizes for MP4, MOV, AVI, MKV, and WebM by resolution, frame rate, duration, and bit depth. Plan storage needs for any video project.",
      "zh-CN": "按分辨率、帧率、时长和位深估算 MP4、MOV、AVI、MKV 和 WebM 的视频文件大小。",
      "zh-TW": "依解析度、幀率、時長與位元深度估算 MP4、MOV、AVI、MKV 和 WebM 的影片檔案大小。",
      ja: "解像度、フレームレート、尺、ビット深度から MP4、MOV、AVI、MKV、WebM の動画サイズを推定します。",
      ko: "해상도, 프레임 속도, 길이, 비트 깊이로 MP4, MOV, AVI, MKV, WebM의 파일 크기를 추정합니다.",
      es: "Estima el tamaño de archivos MP4, MOV, AVI, MKV y WebM según resolución, fps, duración y profundidad de bits.",
      fr: "Estimez la taille des fichiers MP4, MOV, AVI, MKV et WebM selon la résolution, la cadence, la durée et la profondeur de bits.",
      de: "Schätze MP4-, MOV-, AVI-, MKV- und WebM-Dateigrößen nach Auflösung, Bildrate, Dauer und Bittiefe.",
      pt: "Estime o tamanho de arquivos MP4, MOV, AVI, MKV e WebM por resolução, taxa de quadros, duração e profundidade de bits.",
      ru: "Оценивает размер файлов MP4, MOV, AVI, MKV и WebM по разрешению, частоте кадров, длительности и глубине цвета."
    }
  },
  {
    id: "video-frame-size-calculator",
    category: "other",
    slugs: {
      en: "video-frame-size-calculator",
      "zh-CN": "shupin-zhou-tuchicun-jisuanqi",
      "zh-TW": "shupin-zhou-tuchicun-jisuanqi",
      ja: "bideo-furemu-saizu-keisanki",
      ko: "bideo-peureim-sayizeu-gyesangi",
      es: "calculadora-tamano-cuadro-video",
      fr: "calculateur-taille-image-video",
      de: "video-bildgroessen-rechner",
      pt: "calculadora-tamanho-quadro-video",
      ru: "kalkulyator-razmera-kadra-video"
    },
    titles: {
      en: "Video Frame Size Calculator - Resolution & Storage",
      "zh-CN": "视频帧大小计算器 - 分辨率与存储",
      "zh-TW": "影片幀大小計算器 - 解析度與儲存",
      ja: "動画フレームサイズ計算機 - 解像度と容量",
      ko: "동영상 프레임 크기 계산기 - 해상도와 저장",
      es: "Calculadora de tamaño de fotograma de video",
      fr: "Calculateur de taille d'image vidéo",
      de: "Video-Bildgrößenrechner - Auflösung und Speicher",
      pt: "Calculadora de tamanho de quadro de vídeo",
      ru: "Калькулятор размера кадра видео"
    },
    descriptions: {
      en: "Calculate video frame sizes in bytes for any resolution, bit depth, and color channels. Get uncompressed and compressed frame size estimates instantly.",
      "zh-CN": "按分辨率、位深、色彩通道和压缩比计算视频帧字节大小，立即获取未压缩和压缩后的帧大小估算。",
      "zh-TW": "依解析度、位元深度、色彩通道與壓縮比計算影片幀位元組大小，立即取得未壓縮與壓縮後的估算。",
      ja: "解像度、ビット深度、カラーチャンネル、圧縮率から動画フレームのバイト数を計算し、非圧縮・圧縮後の推定値を即表示します。",
      ko: "해상도, 비트 깊이, 채널 수, 압축 비율로 동영상 프레임의 바이트 크기를 계산하고 비압축·압축 추정값을 바로 확인하세요.",
      es: "Calcula el tamaño de un fotograma de video en bytes según resolución, profundidad de bits, canales y compresión.",
      fr: "Calculez la taille d'une image vidéo en octets selon la résolution, la profondeur de bits, les canaux et la compression.",
      de: "Berechnen Sie die Byte-Größe eines Videobilds nach Auflösung, Bittiefe, Kanälen und Komprimierung.",
      pt: "Calcule o tamanho de um quadro de vídeo em bytes por resolução, profundidade de bits, canais e compressão.",
      ru: "Рассчитайте размер видеокадра в байтах по разрешению, глубине цвета, каналам и сжатию."
    }
  },
  {
    id: "vocal-range-calculator",
    category: "other",
    slugs: {
      en: "vocal-range-calculator",
      "zh-CN": "shengyu-jisuanqi-shengbu-leixing-yinyu",
      "zh-TW": "shengyu-jisuanqi-shengbu-leixing-yinyu",
      ja: "seionikaisanki-seishu-ongiki",
      ko: "eumyeok-gyesangi-moksori-yuhyeong-eumyeok",
      es: "calculadora-rango-vocal-tipo-voz",
      fr: "calculateur-etendue-vocale-type-voix",
      de: "stimmumfang-rechner-stimmtyp-tonumfang",
      pt: "calculadora-alcance-vocal-tipo-voz",
      ru: "kalkulyator-vokalnogo-diapazona-tip-golosa"
    },
    titles: {
      en: "Vocal Range Calculator - Voice Type & Singing Range",
      "zh-CN": "声域计算器 - 声部类型与音域",
      "zh-TW": "聲域計算器 - 聲部類型與音域",
      ja: "声域計算機 - 声種と音域",
      ko: "음역 계산기 - 목소리 유형과 음역",
      es: "Calculadora de rango vocal - tipo de voz",
      fr: "Calculateur d’étendue vocale - type de voix",
      de: "Stimmumfang-Rechner - Stimmtyp & Tonumfang",
      pt: "Calculadora de alcance vocal - tipo de voz",
      ru: "Калькулятор вокального диапазона - тип голоса"
    },
    descriptions: {
      en: "Find your vocal range in octaves and semitones, and identify your voice type — Soprano, Tenor, Baritone, Bass — from frequency measurements in Hz.",
      "zh-CN": "按 Hz 频率计算你的音域跨度、半音数，并识别女高音、男高音、男中音、男低音等声部类型。",
      "zh-TW": "依據 Hz 頻率計算你的音域跨度、半音數，並辨識女高音、男高音、男中音、男低音等聲部類型。",
      ja: "Hz の周波数から声域のオクターブ数と半音数を計算し、ソプラノやテノールなどの声種を判定します。",
      ko: "Hz 주파수로 음역의 옥타브와 반음 수를 계산하고 소프라노, 테너 등 목소리 유형을 판별합니다.",
      es: "Calcula tu rango vocal en octavas y semitonos, y clasifica tu voz por tipo a partir de frecuencias en Hz.",
      fr: "Calculez votre étendue vocale en octaves et demi-tons, et identifiez votre type de voix à partir de fréquences en Hz.",
      de: "Berechnen Sie Ihren Stimmumfang in Oktaven und Halbtönen und bestimmen Sie Ihren Stimmtyp anhand von Hz-Frequenzen.",
      pt: "Calcule seu alcance vocal em oitavas e semitons e identifique seu tipo de voz a partir de frequências em Hz.",
      ru: "Рассчитайте вокальный диапазон в октавах и полутонах и определите тип голоса по частотам в Гц."
    }
  },
  {
    id: "snowman-calculator",
    category: "other",
    slugs: {
      en: "snowman-calculator",
      "zh-CN": "xueren-jisuanqi-chicun-cailiao",
      "zh-TW": "xueren-jisuanqi-chicun-cailiao",
      ja: "yukidaruma-sakusei-keisanki-saizu-zairyo",
      ko: "nunsaram-jejag-gyesangi-kiigi-jaeryo",
      es: "calculadora-muneco-nieve-tamano-materiales",
      fr: "calculateur-bonhomme-neige-taille-materiaux",
      de: "schneemann-bau-rechner-groesse-material",
      pt: "calculadora-boneco-neve-tamanho-materiais",
      ru: "kalkulyator-snegovika-razmer-materialy"
    },
    titles: {
      en: "Snowman Building Calculator - Size & Materials",
      "zh-CN": "雪人建造计算器：尺寸与材料",
      "zh-TW": "雪人建造計算器：尺寸與材料",
      ja: "雪だるま作成計算機：サイズと材料",
      ko: "눈사람 제작 계산기: 크기와 재료",
      es: "Calculadora de muñecos de nieve: tamaño y materiales",
      fr: "Calculateur de bonhomme de neige : taille et matériaux",
      de: "Schneemann-Bau-Rechner: Größe und Material",
      pt: "Calculadora de boneco de neve: tamanho e materiais",
      ru: "Калькулятор снеговика: размер и материалы"
    },
    descriptions: {
      en: "Calculate snow volume, weight, and materials for building the perfect snowman. Uses 1:2:3 proportional ratio for structurally sound, visually balanced snowmen.",
      "zh-CN": "计算雪人的体积、重量和材料，按 1:2:3 比例打造结构稳固、外观协调的雪人。",
      "zh-TW": "計算雪人的體積、重量與材料，按 1:2:3 比例打造結構穩固、外觀平衡的雪人。",
      ja: "雪だるまの体積・重さ・材料を計算し、1:2:3の比率で安定感のある雪だるまを作れます。",
      ko: "눈사람의 부피, 무게, 재료를 계산해 1:2:3 비율로 균형 잡히고 안정적인 눈사람을 만들 수 있습니다.",
      es: "Calcula el volumen, el peso y los materiales del muñeco de nieve con una proporción 1:2:3 estable y equilibrada.",
      fr: "Calculez le volume, le poids et les matériaux d’un bonhomme de neige avec une proportion 1:2:3 stable et équilibrée.",
      de: "Berechne Volumen, Gewicht und Material für den Schneemann mit einem stabilen, ausgewogenen 1:2:3-Verhältnis.",
      pt: "Calcule o volume, o peso e os materiais para o boneco de neve com uma proporção 1:2:3 estável e equilibrada.",
      ru: "Рассчитайте объём, вес и материалы для снеговика по устойчивой и сбалансированной пропорции 1:2:3."
    }
  },
  {
    id: "speaker-box-calculator",
    category: "other",
    slugs: {
      en: "speaker-box-calculator",
      "zh-CN": "yinxiang-jisuanqi",
      "zh-TW": "yinxiang-jisuanqi",
      ja: "supi-ka-bokkusu-keisan",
      ko: "seupikeo-bokseu-gyesangi",
      es: "calculadora-caja-altavoz",
      fr: "calculateur-boite-haut-parleur",
      de: "lautsprechergehaeuse-rechner",
      pt: "calculadora-caixa-altifalante",
      ru: "kalkulyator-korobki-dinamika"
    },
    titles: {
      en: "Speaker Box Calculator - Enclosure Volume & Port Tuning",
      "zh-CN": "音箱体积与导管调音计算器",
      "zh-TW": "音箱體積與導管調音計算器",
      ja: "スピーカーボックス容積とポート調整計算機",
      ko: "스피커 박스 용적·포트 튜닝 계산기",
      es: "Calculadora de caja de altavoz y sintonía",
      fr: "Calculateur de volume et d’accord d’enceinte",
      de: "Lautsprechergehäuse Volumen- und Tuning-Rechner",
      pt: "Calculadora de caixa acústica e sintonia",
      ru: "Калькулятор объёма и настройки акустического ящика"
    },
    descriptions: {
      en: "Calculate internal box volume, speaker displacement, and bass reflex port length for sealed and ported speaker enclosures. Optimise audio performance instantly.",
      "zh-CN": "计算密闭式和倒相式音箱的内部容积、单元位移和倒相管长度，快速优化音频表现。",
      "zh-TW": "計算密閉式與倒相式音箱的內部容積、單體位移與倒相管長度，快速優化音訊表現。",
      ja: "密閉型とバスレフ型の内部容積、ドライバーの占有量、ポート長を計算し、音響特性をすぐ最適化。",
      ko: "밀폐형과 포트형 스피커 인클로저의 내부 용적, 유닛 변위, 포트 길이를 계산해 음향 성능을 바로 최적화합니다.",
      es: "Calcula el volumen interno, el desplazamiento del altavoz y la longitud del puerto para cajas selladas y bass reflex.",
      fr: "Calculez le volume interne, le déplacement du haut-parleur et la longueur d’évent pour les enceintes closes et bass-reflex.",
      de: "Berechnen Sie Innenvolumen, Lautsprecherverdrängung und Portlänge für geschlossene und bassreflex Lautsprechergehäuse.",
      pt: "Calcule o volume interno, o deslocamento do alto-falante e o comprimento do duto para caixas seladas e bass reflex.",
      ru: "Рассчитайте внутренний объём, смещение динамика и длину порта для закрытых и фазоинверторных корпусов."
    }
  },
  {
    id: "streaming-bitrate-calculator",
    category: "other",
    slugs: {
      en: "streaming-bitrate-calculator",
      "zh-CN": "zhibo-bitrate-jisuanqi",
      "zh-TW": "zhibo-bitrate-jisuanqi",
      ja: "sutoorimingu-bitrate-keisanki",
      ko: "seutaeliming-bitreiteu-gyeongsangi",
      es: "calculadora-bitrate-streaming",
      fr: "calculateur-bitrate-streaming",
      de: "streaming-bitrate-rechner",
      pt: "calculadora-bitrate-streaming",
      ru: "kalkulyator-bitrata-striming"
    },
    titles: {
      en: "Streaming Bitrate Calculator - Video Bitrate & File Size",
      "zh-CN": "直播比特率计算器 - 视频码率与文件大小",
      "zh-TW": "直播比特率計算器 - 影片碼率與檔案大小",
      ja: "配信ビットレート計算機 - 動画容量とファイルサイズ",
      ko: "스트리밍 비트레이트 계산기 - 영상 용량과 파일 크기",
      es: "Calculadora de bitrate de streaming - tamaño de video",
      fr: "Calculateur de débit streaming - taille vidéo",
      de: "Streaming-Bitrate-Rechner - Videogröße und Datei",
      pt: "Calculadora de bitrate de streaming - tamanho do vídeo",
      ru: "Калькулятор битрейта стрима - размер видео"
    },
    descriptions: {
      en: "Calculate optimal streaming bitrate, file size, and bandwidth for YouTube, Twitch, and other platforms using resolution, frame rate, and compression factor.",
      "zh-CN": "根据分辨率、帧率和压缩系数，计算 YouTube、Twitch 等平台的最佳直播比特率、文件大小和带宽。",
      "zh-TW": "依據解析度、影格率與壓縮係數，計算 YouTube、Twitch 等平台的最佳直播比特率、檔案大小與頻寬。",
      ja: "解像度、フレームレート、圧縮係数から、YouTube や Twitch などの最適な配信ビットレート、ファイルサイズ、帯域を計算します。",
      ko: "해상도, 프레임 속도, 압축 계수를 바탕으로 YouTube, Twitch 등의 최적 스트리밍 비트레이트, 파일 크기, 대역폭을 계산합니다.",
      es: "Calcula el bitrate, tamaño de archivo y ancho de banda óptimos para YouTube, Twitch y otras plataformas según resolución, fps y compresión.",
      fr: "Calculez le débit optimal, la taille du fichier et la bande passante pour YouTube, Twitch et autres plateformes selon la résolution, le fps et la compression.",
      de: "Berechnen Sie optimale Streaming-Bitrate, Dateigröße und Bandbreite für YouTube, Twitch und andere Plattformen anhand von Auflösung, fps und Kompression.",
      pt: "Calcule o bitrate ideal, o tamanho do arquivo e a largura de banda para YouTube, Twitch e outras plataformas com base em resolução, fps e compressão.",
      ru: "Рассчитайте оптимальный битрейт, размер файла и пропускную способность для YouTube, Twitch и других платформ по разрешению, fps и сжатию."
    }
  },
  {
    id: "streaming-services-royalties-calculator",
    category: "other",
    slugs: {
      en: "streaming-services-royalties-calculator",
      "zh-CN": "liuliang-banquan-jisuanqi",
      "zh-TW": "liuliang-banquan-jisuanqi",
      ja: "sutorimingu-inzei-keisanki",
      ko: "seuteulimingu-royolti-gyesangi",
      es: "calculadora-regalias-streaming",
      fr: "calculatrice-redevances-streaming",
      de: "streaming-tantiemen-rechner",
      pt: "calculadora-royalties-streaming",
      ru: "strimingovye-royalti-kalkulyator"
    },
    titles: {
      en: "Streaming Royalties Calculator - Music Earnings Estimator",
      "zh-CN": "流媒体版税计算器 - 音乐收益估算",
      "zh-TW": "串流版稅計算器 - 音樂收益估算",
      ja: "ストリーミング印税計算機 - 音楽収益見積もり",
      ko: "스트리밍 로열티 계산기 - 음악 수익 추정",
      es: "Calculadora de regalías de streaming - ingresos musicales",
      fr: "Calculatrice de redevances de streaming - revenus musicaux",
      de: "Streaming-Tantiemen-Rechner - Musikeinnahmen",
      pt: "Calculadora de royalties de streaming - ganhos musicais",
      ru: "Калькулятор стриминговых роялти - доход музыканта"
    },
    descriptions: {
      en: "Calculate music streaming royalties, platform fees, and net artist earnings for Spotify, Apple Music, and YouTube Music. Maximize your streaming income.",
      "zh-CN": "计算 Spotify、Apple Music 和 YouTube Music 的流媒体版税、平台费用和艺人净收入，最大化你的流媒体收益。",
      "zh-TW": "計算 Spotify、Apple Music 和 YouTube Music 的串流版稅、平台費用與藝人淨收入，放大你的串流收益。",
      ja: "Spotify、Apple Music、YouTube Music のストリーミング印税、プラットフォーム手数料、アーティストの純収益を計算します。",
      ko: "Spotify, Apple Music, YouTube Music의 스트리밍 로열티, 플랫폼 수수료, 아티스트 순수익을 계산합니다.",
      es: "Calcula regalías de streaming, comisiones de plataforma e ingresos netos de artista para Spotify, Apple Music y YouTube Music.",
      fr: "Calculez les redevances de streaming, les frais de plateforme et le revenu net des artistes sur Spotify, Apple Music et YouTube Music.",
      de: "Berechne Streaming-Tantiemen, Plattformgebühren und Nettoeinnahmen für Spotify, Apple Music und YouTube Music.",
      pt: "Calcule royalties de streaming, taxas de plataforma e ganhos líquidos de artistas no Spotify, Apple Music e YouTube Music.",
      ru: "Рассчитайте роялти со стриминга, комиссии платформ и чистый доход артиста для Spotify, Apple Music и YouTube Music."
    }
  },
  {
    id: "sunbathing-calculator",
    category: "other",
    slugs: {
      en: "sunbathing-calculator",
      "zh-CN": "shaishai-jisuanqi",
      "zh-TW": "riguangyu-jisuanqi",
      ja: "nikkoyoku-keisanki",
      ko: "ilgwagyok-gyesangi",
      es: "calculadora-bano-sol",
      fr: "calculateur-bain-soleil",
      de: "sonnenbad-rechner",
      pt: "calculadora-banho-sol",
      ru: "kalkulyator-zagara"
    },
    titles: {
      en: "Sunbathing Calculator - Safe Sun Exposure & Vitamin D",
      "zh-CN": "日光浴计算器 - 安全晒太阳与维生素D",
      "zh-TW": "日光浴計算器 - 安全日曬與維生素D",
      ja: "日光浴計算機 - 安全な日光浴とビタミンD",
      ko: "일광욕 계산기 - 안전한 햇빛 노출과 비타민D",
      es: "Calculadora de baño de sol seguro y vitamina D",
      fr: "Calculateur de bain de soleil et vitamine D",
      de: "Sonnenbad-Rechner für sichere Sonne und Vitamin D",
      pt: "Calculadora de banho de sol e vitamina D",
      ru: "Калькулятор загара: безопасное солнце и витамин D"
    },
    descriptions: {
      en: "Calculate safe sun exposure time, vitamin D production potential, and sunburn risk based on UV index, Fitzpatrick skin type, sun angle, and SPF factor.",
      "zh-CN": "根据紫外线指数、Fitzpatrick肤型、太阳高度角和SPF系数，计算安全日晒时间、维生素D生成潜力和晒伤风险。",
      "zh-TW": "依紫外線指數、Fitzpatrick膚型、太陽高度角與SPF係數，計算安全日曬時間、維生素D生成潛力與曬傷風險。",
      ja: "UV指数、Fitzpatrickスキンタイプ、太陽高度角、SPFから、安全な日光浴時間、ビタミンD生成量、日焼けリスクを計算します。",
      ko: "자외선 지수, Fitzpatrick 피부 유형, 태양 고도각, SPF를 바탕으로 안전 노출 시간, 비타민D 생성 가능성, 화상 위험을 계산합니다.",
      es: "Calcula el tiempo seguro al sol, la producción potencial de vitamina D y el riesgo de quemadura según índice UV, tipo de piel, ángulo solar y SPF.",
      fr: "Calculez le temps d'exposition sûr, la vitamine D potentielle et le risque de coup de soleil selon l'indice UV, la peau, l'angle solaire et le SPF.",
      de: "Berechne sichere Sonnenzeit, Vitamin-D-Potenzial und Sonnenbrandrisiko anhand von UV-Index, Fitzpatrick-Hauttyp, Sonnenwinkel und SPF.",
      pt: "Calcule tempo seguro ao sol, potencial de vitamina D e risco de queimadura com índice UV, tipo de pele, ângulo solar e SPF.",
      ru: "Рассчитайте безопасное время на солнце, потенциал витамина D и риск ожога по УФ-индексу, типу кожи, углу солнца и SPF."
    }
  },
  {
    id: "rainfall-calculator",
    category: "other",
    slugs: {
      en: "rainfall-calculator",
      "zh-CN": "jiangyu-liang-jisuanqi",
      "zh-TW": "jiangyu-liang-jisuanqi",
      ja: "kouuryou-keisanki",
      ko: "ganguryang-gyesangi",
      es: "calculadora-lluvia",
      fr: "calculateur-pluie",
      de: "regenrechner",
      pt: "calculadora-chuva",
      ru: "kalkulyator-osadkov"
    },
    titles: {
      en: "Rainfall Calculator - Precipitation Amount & Volume",
      "zh-CN": "降雨量计算器 - 降水量与体积",
      "zh-TW": "降雨量計算器 - 降水量與體積",
      ja: "降雨量計算機 - 降水量と体積",
      ko: "강우량 계산기 - 강수량 및 부피",
      es: "Calculadora de lluvia - precipitación y volumen",
      fr: "Calculateur de pluie - précipitations et volume",
      de: "Regenrechner - Niederschlag und Volumen",
      pt: "Calculadora de chuva - precipitação e volume",
      ru: "Калькулятор осадков - количество и объем"
    },
    descriptions: {
      en: "Calculate rainfall amount, intensity, duration, and volume for hydrological analysis. Free online tool for meteorologists, engineers, and weather enthusiasts.",
      "zh-CN": "计算降雨量、强度、持续时间和体积，用于水文分析。适合气象人员、工程师和天气爱好者的免费在线工具。",
      "zh-TW": "計算降雨量、強度、持續時間與體積，用於水文分析。適合氣象人員、工程師與天氣愛好者的免費線上工具。",
      ja: "水文解析向けに降雨量、強度、継続時間、体積を計算。気象関係者、技術者、天気愛好家に役立つ無料オンラインツールです。",
      ko: "수문 분석을 위해 강우량, 강도, 지속 시간, 부피를 계산하세요. 기상 전문가, 엔지니어, 날씨 애호가를 위한 무료 온라인 도구입니다.",
      es: "Calcula cantidad, intensidad, duración y volumen de lluvia para análisis hidrológicos. Herramienta gratis para meteorólogos, ingenieros y aficionados.",
      fr: "Calculez quantité, intensité, durée et volume de pluie pour l'analyse hydrologique. Outil gratuit pour météorologues, ingénieurs et passionnés.",
      de: "Berechnen Sie Regenmenge, Intensität, Dauer und Volumen für hydrologische Analysen. Kostenloses Tool für Meteorologen, Ingenieure und Wetterfans.",
      pt: "Calcule quantidade, intensidade, duração e volume de chuva para análise hidrológica. Ferramenta grátis para meteorologistas, engenheiros e entusiastas.",
      ru: "Рассчитайте количество, интенсивность, длительность и объем дождя для гидрологического анализа. Бесплатный инструмент для метеорологов и инженеров."
    }
  },
  {
    id: "ram-latency-calculator",
    category: "other",
    slugs: {
      en: "ram-latency-calculator",
      "zh-CN": "ram-yan-chi-ji-suan-qi",
      "zh-TW": "ram-yan-chi-ji-suan-qi",
      ja: "ram-retenshi-keisanki",
      ko: "ram-jiyeon-gyesangi",
      es: "calculadora-latencia-ram",
      fr: "calculateur-latence-ram",
      de: "ram-latenzrechner",
      pt: "calculadora-latencia-ram",
      ru: "kalkulyator-zaderzhki-ram"
    },
    titles: {
      en: "RAM Latency Calculator - Memory Timing & Performance",
      "zh-CN": "RAM延迟计算器",
      "zh-TW": "RAM延遲計算器",
      ja: "RAMレイテンシ計算機",
      ko: "RAM 지연 계산기",
      es: "Calculadora de latencia RAM",
      fr: "Calculateur de latence RAM",
      de: "RAM-Latenzrechner",
      pt: "Calculadora de latência de RAM",
      ru: "Калькулятор задержки RAM"
    },
    descriptions: {
      en: "Calculate RAM latency, memory timing, and performance metrics for DDR3, DDR4, and DDR5. Essential for computer builders and overclockers.",
      "zh-CN": "计算 DDR3、DDR4 和 DDR5 的 RAM 延迟、内存时序和性能指标，适合装机玩家和超频爱好者。",
      "zh-TW": "計算 DDR3、DDR4 和 DDR5 的 RAM 延遲、記憶體時序與效能指標，適合裝機玩家與超頻愛好者。",
      ja: "DDR3、DDR4、DDR5 の RAM レイテンシ、メモリタイミング、性能指標を計算。自作PCやOCに便利です。",
      ko: "DDR3, DDR4, DDR5의 RAM 지연, 메모리 타이밍, 성능 지표를 계산합니다. 조립 PC와 오버클러커에게 유용합니다.",
      es: "Calcula la latencia de RAM, los tiempos de memoria y las métricas de rendimiento para DDR3, DDR4 y DDR5.",
      fr: "Calculez la latence RAM, les timings mémoire et les performances pour DDR3, DDR4 et DDR5.",
      de: "Berechnen Sie RAM-Latenz, Speichertimings und Leistungswerte für DDR3, DDR4 und DDR5.",
      pt: "Calcule a latência de RAM, timings de memória e métricas de desempenho para DDR3, DDR4 e DDR5.",
      ru: "Рассчитайте задержку RAM, тайминги памяти и показатели производительности для DDR3, DDR4 и DDR5."
    }
  },
  {
    id: "recruitment-process-duration-calculator",
    category: "other",
    slugs: {
      en: "recruitment-process-duration-calculator",
      "zh-CN": "zhaopin-liucheng-shichang-jisuanqi",
      "zh-TW": "zhaopin-liucheng-shichang-jisuanqi",
      ja: "saiyo-process-kikan-keisanki",
      ko: "chaeyong-peuroseseu-gigan-gyesangi",
      es: "calculadora-duracion-proceso-reclutamiento",
      fr: "calculateur-duree-processus-recrutement",
      de: "recruiting-prozess-dauer-rechner",
      pt: "calculadora-duracao-processo-recrutamento",
      ru: "kalkulyator-dlitelnosti-protsessa-podbora"
    },
    titles: {
      en: "Recruitment Process Duration Calculator",
      "zh-CN": "招聘流程时长计算器",
      "zh-TW": "招募流程時長計算器",
      ja: "採用プロセス期間計算ツール",
      ko: "채용 프로세스 기간 계산기",
      es: "Calculadora de duración del reclutamiento",
      fr: "Calculateur de durée du recrutement",
      de: "Recruiting-Prozess-Dauer-Rechner",
      pt: "Calculadora de duração do recrutamento",
      ru: "Калькулятор длительности подбора"
    },
    descriptions: {
      en: "Calculate total recruitment process duration, time-to-hire metrics, and efficiency analysis. Free HR tool to optimize hiring timelines.",
      "zh-CN": "计算招聘流程总时长、录用周期指标和效率分析。免费 HR 工具，帮助优化招聘时间线。",
      "zh-TW": "計算招募流程總時長、錄用週期指標與效率分析。免費 HR 工具，協助最佳化招募時程。",
      ja: "採用プロセス全体の期間、採用までの時間指標、効率分析を計算。採用スケジュール最適化に役立つ無料HRツール。",
      ko: "전체 채용 프로세스 기간, 채용 소요 시간 지표, 효율성 분석을 계산하세요. 채용 일정을 최적화하는 무료 HR 도구입니다.",
      es: "Calcula la duración total del reclutamiento, el time-to-hire y la eficiencia. Herramienta gratuita de RR. HH. para optimizar plazos.",
      fr: "Calculez la durée totale du recrutement, le time-to-hire et l’efficacité. Outil RH gratuit pour optimiser vos délais d’embauche.",
      de: "Berechnen Sie Recruiting-Gesamtdauer, Time-to-Hire und Effizienz. Kostenloses HR-Tool zur Optimierung von Einstellungsplänen.",
      pt: "Calcule a duração total do recrutamento, time-to-hire e eficiência. Ferramenta gratuita de RH para otimizar prazos de contratação.",
      ru: "Рассчитайте общую длительность подбора, time-to-hire и эффективность. Бесплатный HR-инструмент для оптимизации сроков найма."
    }
  },
  {
    id: "reorder-point-calculator",
    category: "other",
    slugs: {
      en: "reorder-point-calculator",
      "zh-CN": "zaidinghuodian-jisuanqi",
      "zh-TW": "zaitinghuodian-jisuanqi",
      ja: "saihacchuten-keisanki",
      ko: "jaejumunjeom-gyesangi",
      es: "calculadora-punto-reorden-inventario",
      fr: "calculateur-point-de-commande-stock",
      de: "nachbestellpunkt-rechner",
      pt: "calculadora-ponto-de-reposicao-estoque",
      ru: "kalkulyator-tochki-perezakaza-zapasa"
    },
    titles: {
      en: "Reorder Point Calculator - Optimal Inventory Levels",
      "zh-CN": "再订货点计算器 - 优化库存水平",
      "zh-TW": "再訂貨點計算器 - 最佳化庫存水準",
      ja: "再発注点計算機 - 最適な在庫水準",
      ko: "재주문점 계산기 - 최적 재고 수준",
      es: "Calculadora de punto de reorden - inventario óptimo",
      fr: "Calculateur de point de commande - stock optimal",
      de: "Nachbestellpunkt-Rechner - optimale Lagerbestände",
      pt: "Calculadora de ponto de reposição - estoque ideal",
      ru: "Калькулятор точки перезаказа - оптимальный запас"
    },
    descriptions: {
      en: "Calculate reorder points, safety stock levels, and optimal inventory management strategies. Essential supply chain tool to prevent stockouts.",
      "zh-CN": "计算再订货点、安全库存和最佳库存管理策略，帮助防止缺货的供应链必备工具。",
      "zh-TW": "計算再訂貨點、安全庫存與最佳庫存管理策略，協助防止缺貨的供應鏈必備工具。",
      ja: "再発注点、安全在庫、最適な在庫管理戦略を計算します。欠品防止に欠かせないサプライチェーンツールです。",
      ko: "재주문점, 안전 재고, 최적의 재고 관리 전략을 계산합니다. 품절을 막는 필수 공급망 도구입니다.",
      es: "Calcula puntos de reorden, stock de seguridad y estrategias óptimas de inventario. Evita quiebres de stock.",
      fr: "Calculez les points de commande, le stock de sécurité et des stratégies optimales de gestion. Un outil essentiel pour éviter les ruptures de stock.",
      de: "Berechnen Sie Nachbestellpunkte, Sicherheitsbestände und optimale Bestandsstrategien. Verhindern Sie Lagerengpässe.",
      pt: "Calcule pontos de reposição, estoque de segurança e estratégias ideais de gestão. Ferramenta essencial para evitar falta de estoque.",
      ru: "Рассчитайте точку перезаказа, страховой запас и оптимальные стратегии управления запасами. Помогает избежать дефицита."
    }
  },
  {
    id: "resolution-scale-calculator",
    category: "other",
    slugs: {
      en: "resolution-scale-calculator",
      "zh-CN": "fenbianlv-suofang-jisuanqi",
      "zh-TW": "fenbianlv-suofang-jisuanqi",
      ja: "kaizoudo-sukeiru-keisanki",
      ko: "haesangdo-seukeil-gyesan-gi",
      es: "calculadora-escala-resolucion",
      fr: "calculatrice-echelle-resolution",
      de: "aufloesungs-skalenrechner",
      pt: "calculadora-escala-resolucao",
      ru: "kalkulyator-masshtaba-razresheniya"
    },
    titles: {
      en: "Resolution Scale Calculator - Image Scaling & Pixel Density",
      "zh-CN": "分辨率缩放计算器",
      "zh-TW": "解析度縮放計算器",
      ja: "解像度スケール計算機",
      ko: "해상도 스케일 계산기",
      es: "Calculadora de escala de resolución",
      fr: "Calculateur d'échelle de résolution",
      de: "Auflösungs-Skalenrechner",
      pt: "Calculadora de escala de resolução",
      ru: "Калькулятор масштаба разрешения"
    },
    descriptions: {
      en: "Calculate resolution scaling, aspect ratio changes, and pixel density for images and displays. Free tool for designers and developers.",
      "zh-CN": "计算图片和显示设备的分辨率缩放、宽高比变化与像素密度。面向设计师和开发者的免费工具。",
      "zh-TW": "計算圖片與顯示裝置的解析度縮放、長寬比變化與像素密度。適合設計師與開發者的免費工具。",
      ja: "画像と表示デバイスの解像度スケーリング、縦横比の変化、ピクセル密度を計算。デザイナーと開発者向けの無料ツール。",
      ko: "이미지와 디스플레이의 해상도 스케일, 종횡비 변화, 픽셀 밀도를 계산합니다. 디자이너와 개발자를 위한 무료 도구입니다.",
      es: "Calcula la escala de resolución, los cambios de relación de aspecto y la densidad de píxeles para imágenes y pantallas. Herramienta gratis para diseñadores y desarrolladores.",
      fr: "Calculez l'échelle de résolution, les changements de ratio et la densité de pixels pour images et écrans. Outil gratuit pour designers et développeurs.",
      de: "Berechnet Auflösungsskalierung, Seitenverhältnis-Änderungen und Pixeldichte für Bilder und Displays. Kostenloses Tool für Designer und Entwickler.",
      pt: "Calcule escala de resolução, mudanças de proporção e densidade de pixels para imagens e telas. Ferramenta grátis para designers e desenvolvedores.",
      ru: "Рассчитайте масштабирование разрешения, изменение соотношения сторон и плотность пикселей для изображений и экранов. Бесплатный инструмент для дизайнеров и разработчиков."
    }
  },
  {
    id: "poker-odds-calculator",
    category: "other",
    slugs: {
      en: "poker-odds-calculator",
      "zh-CN": "puke-peilv-jisuanqi",
      "zh-TW": "puke-peilv-jisuanqi",
      ja: "poka-oddsu-keisan",
      ko: "pokeo-eodjeu-gyesangi",
      es: "calculadora-odds-poker",
      fr: "calculateur-cotes-poker",
      de: "poker-odds-rechner",
      pt: "calculadora-odds-poker",
      ru: "kalkulyator-oddsov-pokera"
    },
    titles: {
      en: "Poker Odds Calculator - Winning Probability & Hand Odds",
      "zh-CN": "扑克赔率计算器 - 胜率与手牌赔率",
      "zh-TW": "撲克賠率計算機 - 勝率與手牌賠率",
      ja: "ポーカーオッズ計算機 - 勝率とハンドオッズ",
      ko: "포커 오즈 계산기 - 승률과 핸드 오즈",
      es: "Calculadora de odds de póker - Probabilidad y outs",
      fr: "Calculateur de cotes de poker - Probabilité et outs",
      de: "Poker-Odds-Rechner - Gewinnwahrscheinlichkeit und Outs",
      pt: "Calculadora de odds de pôquer - Probabilidade e outs",
      ru: "Калькулятор шансов в покере - вероятность и ауты"
    },
    descriptions: {
      en: "Calculate poker hand odds, winning probability, and pot odds for Texas Hold'em. Analyze flush draws, gutshots, and overpairs for better play.",
      "zh-CN": "用于德州扑克的扑克赔率计算器，可计算手牌赔率、胜率和底池赔率，分析同花听牌、顺子听牌和超对。",
      "zh-TW": "用於德州撲克的撲克賠率計算機，可計算手牌賠率、勝率和底池賠率，分析同花聽牌、順子聽牌與超對。",
      ja: "テキサスホールデム向けのポーカーオッズ計算機。ハンドオッズ、勝率、ポットオッズを算出し、各ドローやオーバーペアを分析します。",
      ko: "텍사스 홀덤용 포커 오즈 계산기입니다. 핸드 오즈, 승률, 팟 오즈를 계산하고 플러시 드로우, 갓샷, 오버페어를 분석합니다.",
      es: "Calculadora de odds de póker para Texas Hold'em. Calcula probabilidad de ganar, pot odds y analiza draws como color, gutshot y overpairs.",
      fr: "Calculateur de cotes de poker pour le Texas Hold'em. Calculez votre probabilité de gagner, les pot odds et analysez vos tirages.",
      de: "Poker-Odds-Rechner für Texas Hold'em. Berechnet Gewinnwahrscheinlichkeit, Pot Odds und analysiert Flush Draws, Gutshots und Overpairs.",
      pt: "Calculadora de odds de pôquer para Texas Hold'em. Calcule probabilidade de vitória, pot odds e analise draws como flush, gutshot e overpairs.",
      ru: "Калькулятор шансов для техасского холдема. Считает вероятность победы, pot odds и анализирует флеш-дро, гатшоты и оверпары."
    }
  },
  {
    id: "port-length-calculator",
    category: "other",
    slugs: {
      en: "port-length-calculator",
      "zh-CN": "daoxiangguan-changdu-ji-suanqi",
      "zh-TW": "daoxiangguan-changdu-ji-suanqi",
      ja: "poto-choudo-keisanki",
      ko: "poteu-gil-i-gyeolsangi",
      es: "calculadora-longitud-puerto-subwoofer",
      fr: "calculateur-longueur-port-subwoofer",
      de: "portlaengenrechner-subwoofer-gehausetuning",
      pt: "calculadora-comprimento-duto-subwoofer",
      ru: "kalkulyator-dliny-porta-sabvufera"
    },
    titles: {
      en: "Port Length Calculator - Subwoofer Box Tuning",
      "zh-CN": "导向管长度计算器 - 低音炮箱体调谐",
      "zh-TW": "導向管長度計算器 - 低音炮箱體調諧",
      ja: "ポート長計算機 - サブウーファー箱チューニング",
      ko: "포트 길이 계산기 - 서브우퍼 박스 튜닝",
      es: "Calculadora de longitud de puerto - Subwoofer",
      fr: "Calculateur de longueur de port - Caisson subwoofer",
      de: "Portlängenrechner - Subwoofer-Gehäusetuning",
      pt: "Calculadora de comprimento de duto - Subwoofer",
      ru: "Калькулятор длины порта - настройка сабвуфера"
    },
    descriptions: {
      en: "Calculate the optimal port length for bass reflex speaker enclosures. Enter box volume, tuning frequency, and port diameter for precise acoustic design.",
      "zh-CN": "根据箱体容积、调谐频率和导向管直径，计算低音反射音箱的最佳导向管长度。",
      "zh-TW": "根據箱體容積、調諧頻率與導向管直徑，計算低音反射音箱的最佳導向管長度。",
      ja: "箱の容積、チューニング周波数、ポート径から、バスレフエンクロージャーの最適なポート長を計算します。",
      ko: "박스 부피, 튜닝 주파수, 포트 직경으로 베이스 리플렉스 인클로저의 최적 포트 길이를 계산합니다.",
      es: "Calcula la longitud óptima del puerto para cajas bass reflex según el volumen, la frecuencia de sintonía y el diámetro del puerto.",
      fr: "Calculez la longueur idéale du port pour une enceinte bass-reflex à partir du volume, de la fréquence d’accord et du diamètre du port.",
      de: "Berechnen Sie die optimale Portlänge für Bassreflex-Gehäuse anhand von Volumen, Abstimmfrequenz und Portdurchmesser.",
      pt: "Calcule o comprimento ideal do duto para caixas bass reflex com base no volume, na frequência de sintonia e no diâmetro do duto.",
      ru: "Рассчитайте оптимальную длину порта для фазоинверторного корпуса по объёму, частоте настройки и диаметру порта."
    }
  },
  {
    id: "portrait-aspect-ratio-calculator",
    category: "other",
    slugs: {
      en: "portrait-aspect-ratio-calculator",
      "zh-CN": "renxiang-kuangaobi-jisuanqi",
      "zh-TW": "renxiang-zhangkuanbi-jisuanqi",
      ja: "tateyoko-hi-keisanki",
      ko: "sero-hyeong-garoseoro-bi-gyeonsangi",
      es: "calculadora-relacion-aspecto-vertical",
      fr: "calculateur-format-portrait",
      de: "hochformat-seitenverhaeltnis-rechner",
      pt: "calculadora-proporcao-vertical",
      ru: "kalkulyator-sootnosheniya-storon-portreta"
    },
    titles: {
      en: "Portrait Aspect Ratio Calculator - Image Dimensions",
      "zh-CN": "人像宽高比计算器 - 图像尺寸",
      "zh-TW": "人像長寬比計算器 - 圖像尺寸",
      ja: "縦横比計算機 - 画像サイズ",
      ko: "세로형 가로세로비 계산기 - 이미지 크기",
      es: "Calculadora de relación de aspecto vertical - Dimensiones",
      fr: "Calculateur de format portrait - Dimensions d'image",
      de: "Hochformat-Seitenverhältnis-Rechner - Bildmaße",
      pt: "Calculadora de proporção vertical - Dimensões da imagem",
      ru: "Калькулятор соотношения сторон портрета - Размеры"
    },
    descriptions: {
      en: "Calculate aspect ratios and scaled dimensions for portrait photos on Instagram, TikTok, and print. Get simplified ratios and diagonal measurements instantly.",
      "zh-CN": "计算 Instagram、TikTok 和印刷人像照片的宽高比与缩放尺寸，立即得到化简比例和对角线长度。",
      "zh-TW": "計算 Instagram、TikTok 與列印人像照片的長寬比和縮放尺寸，立即取得化簡比例與對角線。",
      ja: "Instagram、TikTok、印刷向けの縦写真の縦横比と拡大縮小サイズを計算し、簡略比と対角線をすぐ確認できます。",
      ko: "Instagram, TikTok, 인쇄용 세로 사진의 가로세로비와 확대·축소 크기를 계산해 간단한 비율과 대각선을 바로 확인하세요.",
      es: "Calcula la relación de aspecto y las dimensiones escaladas de fotos verticales para Instagram, TikTok e impresión.",
      fr: "Calculez le format, les dimensions mises à l'échelle et la diagonale des photos portrait pour Instagram, TikTok et l'impression.",
      de: "Berechnen Sie Seitenverhältnis, skalierte Maße und Diagonale für Hochformatfotos auf Instagram, TikTok und im Druck.",
      pt: "Calcule proporções, dimensões escaladas e diagonal de fotos verticais para Instagram, TikTok e impressão.",
      ru: "Рассчитайте соотношение сторон, масштабированные размеры и диагональ для портретных фото в Instagram, TikTok и для печати."
    }
  },
  {
    id: "ppi-calculator-pixels-per-inch",
    category: "other",
    slugs: {
      en: "ppi-calculator-pixels-per-inch",
      "zh-CN": "ppi-jisuanqi-xiangsu-midu",
      "zh-TW": "ppi-jisuanqi-xiangsu-midu",
      ja: "ppi-keisan-ki-pikuseru-mitsudo",
      ko: "ppi-gyesan-gi-pigsel-mildo",
      es: "calculadora-ppi-densidad-pixeles",
      fr: "calculatrice-ppi-densite-pixels",
      de: "ppi-rechner-pixeldichte",
      pt: "calculadora-ppi-densidade-de-pixels",
      ru: "kalkulyator-ppi-plotnost-pikseley"
    },
    titles: {
      en: "PPI Calculator - Pixels Per Inch Density",
      "zh-CN": "PPI计算器 - 像素密度",
      "zh-TW": "PPI計算器 - 像素密度",
      ja: "PPI計算機 - ピクセル密度",
      ko: "PPI 계산기 - 픽셀 밀도",
      es: "Calculadora PPI - Densidad de píxeles",
      fr: "Calculatrice PPI - Densité de pixels",
      de: "PPI-Rechner - Pixeldichte",
      pt: "Calculadora PPI - Densidade de Pixels",
      ru: "Калькулятор PPI - Плотность пикселей"
    },
    descriptions: {
      en: "Calculate pixel density (PPI) and dot pitch for any display by entering resolution and screen size. Compare sharpness across monitors, TVs, and smartphones.",
      "zh-CN": "输入分辨率和屏幕尺寸，计算任意显示器的像素密度（PPI）和点距，并比较显示器、电视和手机的清晰度。",
      "zh-TW": "輸入解析度和螢幕尺寸，計算任意顯示器的像素密度（PPI）和點距，並比較顯示器、電視和手機的清晰度。",
      ja: "解像度と画面サイズを入力して、あらゆるディスプレイのピクセル密度（PPI）とドットピッチを計算し、見やすさを比較できます。",
      ko: "해상도와 화면 크기를 입력해 어떤 디스플레이든 픽셀 밀도(PPI)와 도트 피치를 계산하고 선명도를 비교하세요.",
      es: "Calcula la densidad de píxeles (PPI) y el dot pitch de cualquier pantalla ingresando la resolución y el tamaño. Compara la nitidez.",
      fr: "Calculez la densité de pixels (PPI) et le dot pitch de n’importe quel écran en saisissant la résolution et la taille.",
      de: "Berechnen Sie die Pixeldichte (PPI) und den Dot Pitch für jedes Display, indem Sie Auflösung und Größe eingeben.",
      pt: "Calcule a densidade de pixels (PPI) e o dot pitch de qualquer tela informando resolução e tamanho.",
      ru: "Рассчитайте плотность пикселей (PPI) и dot pitch для любого экрана, введя разрешение и размер."
    }
  },
  {
    id: "projector-calculator",
    category: "other",
    slugs: {
      en: "projector-calculator",
      "zh-CN": "touyingji-jisuanqi-toubi-bili-pingmu-chicun-liangdu",
      "zh-TW": "touyingji-jisuanqi-toubi-pingmu-chicun-liangdu",
      ja: "purojekuta-keisanki-sutoru-hi-ratio-sukurin-saizu-akari",
      ko: "peurojekteo-gyesangi-tusabi-hwamyeon-keugi-balki",
      es: "calculadora-proyector-throw-ratio-tamano-pantalla-brillo",
      fr: "calculateur-videoprojecteur-ratio-throw-taille-ecran-luminosite",
      de: "beamer-rechner-throw-ratio-leinwandgroesse-helligkeit",
      pt: "calculadora-projetor-throw-ratio-tamanho-tela-brilho",
      ru: "kalkulyator-proektora-throw-ratio-razmer-ekrana-yarkost"
    },
    titles: {
      en: "Projector Calculator - Throw Ratio, Screen Size & Brightness",
      "zh-CN": "投影机计算器 - 投比、屏幕尺寸和亮度",
      "zh-TW": "投影機計算器 - 投比、螢幕尺寸和亮度",
      ja: "プロジェクター計算機 - 投写比・画面サイズ・明るさ",
      ko: "프로젝터 계산기 - 투사비·화면 크기·밝기",
      es: "Calculadora de proyector - tiro, pantalla y brillo",
      fr: "Calculateur de vidéoprojecteur - distance, écran et luminosité",
      de: "Beamer-Rechner - Wurfverhältnis, Größe und Helligkeit",
      pt: "Calculadora de projetor - distância, tela e brilho",
      ru: "Калькулятор проектора — дистанция, экран и яркость"
    },
    descriptions: {
      en: "Calculate projector screen size, throw distance, and brightness in foot-lamberts for home theater and business setups. Plan your projection precisely.",
      "zh-CN": "计算家庭影院和商务场景的投影画面尺寸、投射距离和亮度（foot-lamberts）。精准规划你的投影。",
      "zh-TW": "計算家庭劇院和商務情境的投影畫面尺寸、投射距離與亮度（foot-lamberts）。精準規劃你的投影。",
      ja: "ホームシアターやビジネス用途の画面サイズ、投写距離、明るさ（foot-lamberts）を計算します。",
      ko: "홈시어터와 업무 환경의 화면 크기, 투사 거리, 밝기(foot-lamberts)를 계산합니다. 정확하게 투영을 계획하세요.",
      es: "Calcula tamaño de pantalla, distancia de tiro y brillo en foot-lamberts para cine en casa y negocios. Planifica tu proyección con precisión.",
      fr: "Calculez la taille d'écran, la distance de projection et la luminosité en foot-lamberts pour le home cinéma et le bureau. Planifiez avec précision.",
      de: "Berechne Leinwandgröße, Projektionsabstand und Helligkeit in Foot-Lamberts für Heimkino und Business. Plane deine Projektion präzise.",
      pt: "Calcule tamanho da tela, distância de projeção e brilho em foot-lamberts para home theater e negócios. Planeje sua projeção com precisão.",
      ru: "Рассчитайте размер экрана, дистанцию проекции и яркость в foot-lamberts для домашнего кинотеатра и бизнеса. Планируйте точно."
    }
  },
  {
    id: "propagation-delay-calculator",
    category: "other",
    slugs: {
      en: "propagation-delay-calculator",
      "zh-CN": "chuanbo-yanchi-jisuanqi",
      "zh-TW": "chuanbo-yanchi-jisuanqi",
      ja: "denpa-chien-keisanki",
      ko: "jeonpa-jiyeon-gyesangi",
      es: "calculadora-retardo-propagacion",
      fr: "calculateur-retard-propagation",
      de: "ausbreitungsverzoegerung-rechner",
      pt: "calculadora-atraso-propagacao",
      ru: "kalkulyator-zaderzhki-rasprostraneniya"
    },
    titles: {
      en: "Propagation Delay Calculator - Signal Travel Time",
      "zh-CN": "传播延迟计算器 - 信号传输时间",
      "zh-TW": "傳播延遲計算器 - 訊號傳輸時間",
      ja: "伝搬遅延計算機 - 信号の伝送時間",
      ko: "전파 지연 계산기 - 신호 이동 시간",
      es: "Calculadora de retardo de propagación",
      fr: "Calculateur de retard de propagation",
      de: "Rechner für Ausbreitungsverzögerung",
      pt: "Calculadora de atraso de propagação",
      ru: "Калькулятор задержки распространения"
    },
    descriptions: {
      en: "Calculate signal propagation delay and travel time for electromagnetic waves, sound, and data transmission through vacuum, fibre, copper, air, and water.",
      "zh-CN": "计算电磁波、声音和数据在真空、光纤、铜线、空气与水中的传播延迟和传输时间。",
      "zh-TW": "計算電磁波、聲音與資料在真空、光纖、銅線、空氣和水中的傳播延遲與傳輸時間。",
      ja: "真空、光ファイバー、銅線、空気、水を通る電磁波、音、データ伝送の伝搬遅延と到達時間を計算します。",
      ko: "진공, 광섬유, 구리선, 공기, 물을 지나는 전자기파, 소리, 데이터 전송의 전파 지연과 이동 시간을 계산합니다.",
      es: "Calcula el retardo de propagación y el tiempo de viaje de ondas electromagnéticas, sonido y datos en vacío, fibra, cobre, aire y agua.",
      fr: "Calculez le retard de propagation et le temps de trajet des ondes électromagnétiques, du son et des données dans le vide, la fibre, le cuivre, l’air et l’eau.",
      de: "Berechnen Sie Ausbreitungsverzögerung und Laufzeit für elektromagnetische Wellen, Schall und Daten in Vakuum, Glasfaser, Kupfer, Luft und Wasser.",
      pt: "Calcule atraso de propagação e tempo de viagem de ondas eletromagnéticas, som e dados no vácuo, fibra, cobre, ar e água.",
      ru: "Рассчитайте задержку распространения и время прохождения электромагнитных волн, звука и данных в вакууме, оптоволокне, меди, воздухе и воде."
    }
  },
  {
    id: "pte-score-calculator",
    category: "other",
    slugs: {
      en: "pte-score-calculator",
      "zh-CN": "pte-fen-shu-ji-suan-qi",
      "zh-TW": "pte-fen-shu-ji-suan-qi",
      ja: "pte-sukoa-keisan",
      ko: "pte-jeom-su-gye-san-gi",
      es: "calculadora-puntaje-pte",
      fr: "calculateur-score-pte",
      de: "pte-punktzahl-rechner",
      pt: "calculadora-nota-pte",
      ru: "pte-kalkulyator-balla"
    },
    titles: {
      en: "PTE Score Calculator - Overall Score from Section Scores",
      "zh-CN": "PTE分数计算器：按各项分数算总分",
      "zh-TW": "PTE分數計算器：依分項分數算總分",
      ja: "PTEスコア計算機：各項目から総合点",
      ko: "PTE 점수 계산기: 영역 점수로 총점",
      es: "Calculadora de puntaje PTE: total por secciones",
      fr: "Calculateur de score PTE : total par section",
      de: "PTE-Punktzahlrechner: Gesamtwert aus Teilwerten",
      pt: "Calculadora de nota PTE: total por seção",
      ru: "Калькулятор балла PTE: общий результат по секциям"
    },
    descriptions: {
      en: "Calculate your overall PTE Academic score from Listening, Reading, Speaking, and Writing section scores. Understand your English proficiency level instantly.",
      "zh-CN": "根据听力、阅读、口语和写作分数计算你的PTE Academic总分，快速了解英语水平。",
      "zh-TW": "根據聽力、閱讀、口說與寫作分數計算你的PTE Academic總分，立即了解英語程度。",
      ja: "リスニング、リーディング、スピーキング、ライティングの得点からPTE Academicの総合点を計算します。",
      ko: "리스닝, 리딩, 스피킹, 라이팅 점수로 PTE Academic 총점을 계산하고 영어 실력을 바로 확인하세요.",
      es: "Calcula tu puntaje total de PTE Academic con los resultados de Listening, Reading, Speaking y Writing.",
      fr: "Calculez votre score total PTE Academic à partir des scores en Listening, Reading, Speaking et Writing.",
      de: "Berechnen Sie Ihre gesamte PTE Academic Punktzahl aus Listening, Reading, Speaking und Writing.",
      pt: "Calcule sua nota total do PTE Academic a partir dos resultados de Listening, Reading, Speaking e Writing.",
      ru: "Рассчитайте общий балл PTE Academic по Listening, Reading, Speaking и Writing."
    }
  },
  {
    id: "pyramid-block-calculator",
    category: "other",
    slugs: {
      en: "pyramid-block-calculator",
      "zh-CN": "jinzita-jisuanqi-tiiji-biaomianji",
      "zh-TW": "jinzita-jisuanqi-tiiji-biaomianji",
      ja: "piramiddo-burokku-keisan-ki",
      ko: "piramideu-beulok-gyesangi",
      es: "calculadora-piramide-volumen-superficie",
      fr: "calculateur-pyramide-volume-surface",
      de: "pyramide-rechner-volumen-oberflache",
      pt: "calculadora-piramide-volume-area",
      ru: "kalculator-piramidy-obem-poverhnost"
    },
    titles: {
      en: "Pyramid Block Calculator - Volume & Surface Area",
      "zh-CN": "金字塔体积与表面积计算器",
      "zh-TW": "金字塔體積與表面積計算器",
      ja: "ピラミッド体積と表面積計算機",
      ko: "피라미드 부피·표면적 계산기",
      es: "Calculadora de pirámides: volumen y superficie",
      fr: "Calculateur de pyramide : volume et surface",
      de: "Pyramidenrechner: Volumen und Oberfläche",
      pt: "Calculadora de pirâmide: volume e área",
      ru: "Калькулятор пирамиды: объем и поверхность"
    },
    descriptions: {
      en: "Calculate pyramid volume, surface area, lateral area, and base area for square, triangular, pentagonal, and hexagonal bases.",
      "zh-CN": "计算方形、三角形、五边形和六边形金字塔的体积、表面积、侧面积和底面积。",
      "zh-TW": "計算正方形、三角形、五邊形與六邊形金字塔的體積、表面積、側面積與底面積。",
      ja: "正方形、三角形、五角形、六角形の底面を持つピラミッドの体積、表面積、側面積、底面積を計算します。",
      ko: "정사각형, 삼각형, 오각형, 육각형 밑면을 가진 피라미드의 부피, 표면적, 옆면적, 밑면적을 계산합니다.",
      es: "Calcula volumen, superficie total, lateral y base de pirámides con base cuadrada, triangular, pentagonal o hexagonal.",
      fr: "Calcule le volume, la surface totale, la surface latérale et l’aire de base des pyramides à base carrée, triangulaire, pentagonale ou hexagonale.",
      de: "Berechnet Volumen, Oberfläche, Mantelfläche und Grundfläche von Pyramiden mit quadratischer, dreieckiger, fünfeckiger oder sechseckiger Grundfläche.",
      pt: "Calcule volume, área total, área lateral e área da base de pirâmides com base quadrada, triangular, pentagonal ou hexagonal.",
      ru: "Рассчитывает объем, полную поверхность, боковую поверхность и площадь основания пирамид с квадратным, треугольным, пятиугольным или шестиугольным основанием."
    }
  },
  {
    id: "raid-calculator",
    category: "other",
    slugs: {
      en: "raid-calculator",
      "zh-CN": "raid-cunchu-rongliang-guzhang-renduxing",
      "zh-TW": "raid-cunchu-rongliang-guzhang-renduxing",
      ja: "raid-ryoiki-keisan",
      ko: "raid-seuchori-yongnyang-gyesangi",
      es: "calculadora-raid-capacidad-tolerancia",
      fr: "calculateur-raid-capacite-tolerance",
      de: "raid-speicherkapazitaet-rechner",
      pt: "calculadora-raid-capacidade-tolerancia",
      ru: "kalkulyator-raid-emkosti-i-otkazoustoychivosti"
    },
    titles: {
      en: "RAID Storage Calculator - Capacity & Fault Tolerance",
      "zh-CN": "RAID 存储容量计算器",
      "zh-TW": "RAID 儲存容量計算器",
      ja: "RAID 容量計算機",
      ko: "RAID 저장 용량 계산기",
      es: "Calculadora RAID de capacidad",
      fr: "Calculateur RAID de capacité",
      de: "RAID-Kapazitätsrechner",
      pt: "Calculadora RAID de capacidade",
      ru: "RAID калькулятор емкости"
    },
    descriptions: {
      en: "Calculate usable RAID capacity, efficiency, and fault tolerance for RAID 0, 1, 5, 6, and 10 with estimated read/write speed figures.",
      "zh-CN": "计算 RAID 0、1、5、6、10 的可用容量、效率、故障容忍度和估算读写速度。",
      "zh-TW": "計算 RAID 0、1、5、6、10 的可用容量、效率、故障容忍度與估算讀寫速度。",
      ja: "RAID 0、1、5、6、10 の使用可能容量、効率、耐障害性、推定読書き速度を計算します。",
      ko: "RAID 0, 1, 5, 6, 10의 사용 가능 용량, 효율, 장애 허용도와 예상 읽기/쓰기 속도를 계산합니다.",
      es: "Calcula la capacidad útil, la eficiencia y la tolerancia a fallos de RAID 0, 1, 5, 6 y 10 con velocidades estimadas.",
      fr: "Calculez la capacité utile, l'efficacité et la tolérance aux pannes de RAID 0, 1, 5, 6 et 10 avec des vitesses estimées.",
      de: "Berechnen Sie nutzbare Kapazität, Effizienz und Ausfallsicherheit für RAID 0, 1, 5, 6 und 10 mit geschätzten Lese-/Schreibraten.",
      pt: "Calcule a capacidade útil, a eficiência e a tolerância a falhas de RAID 0, 1, 5, 6 e 10 com velocidades estimadas.",
      ru: "Рассчитайте полезную емкость, эффективность и отказоустойчивость RAID 0, 1, 5, 6 и 10 с оценкой скорости чтения и записи."
    }
  },
  {
    id: "rain-to-snow-calculator",
    category: "other",
    slugs: {
      en: "rain-to-snow-calculator",
      "zh-CN": "yu-zhuan-xue-ji-suan-qi",
      "zh-TW": "yu-zhuan-xue-ji-suan-qi",
      ja: "ame-yuki-keisan",
      ko: "bi-nun-gyesangi",
      es: "calculadora-lluvia-nieve",
      fr: "calculateur-pluie-neige",
      de: "regen-schnee-rechner",
      pt: "calculadora-chuva-neve",
      ru: "kalkulyator-dozhd-sneg"
    },
    titles: {
      en: "Rain to Snow Calculator - Convert Precipitation",
      "zh-CN": "雨转雪计算器 - 换算降水量",
      "zh-TW": "雨轉雪計算器 - 換算降水量",
      ja: "雨から雪への計算機 - 降水量を換算",
      ko: "비를 눈으로 변환 계산기 - 강수량 환산",
      es: "Calculadora de lluvia a nieve - Convertir precipitación",
      fr: "Calculateur pluie-neige - Convertir les précipitations",
      de: "Regen-zu-Schnee-Rechner - Niederschlag umrechnen",
      pt: "Calculadora de chuva para neve - Converter precipitação",
      ru: "Калькулятор дождя в снег - пересчет осадков"
    },
    descriptions: {
      en: "Convert rainfall to snow equivalent depth using temperature, humidity, and elevation. Estimate snow accumulation from liquid precipitation instantly.",
      "zh-CN": "根据温度、湿度和海拔将降雨量换算为等效雪深，快速估算液态降水可能形成的积雪量。",
      "zh-TW": "依溫度、濕度與海拔將降雨量換算為等效雪深，快速估算液態降水可能形成的積雪量。",
      ja: "気温、湿度、標高から雨量を雪の等価深に換算し、液体降水による積雪量をすばやく推定します。",
      ko: "기온, 습도, 고도를 바탕으로 강우량을 눈의 등가 깊이로 변환하고 적설량을 빠르게 추정합니다.",
      es: "Convierte lluvia en profundidad equivalente de nieve con temperatura, humedad y altitud. Estima al instante la acumulación de nieve.",
      fr: "Convertissez la pluie en hauteur de neige équivalente avec température, humidité et altitude. Estimez vite l’accumulation de neige.",
      de: "Regenmenge mit Temperatur, Luftfeuchte und Höhe in Schneehöhe umrechnen. Schneezuwachs aus Flüssigniederschlag sofort schätzen.",
      pt: "Converta chuva em profundidade equivalente de neve com temperatura, umidade e altitude. Estime a acumulação de neve rapidamente.",
      ru: "Переводите дождь в эквивалентную глубину снега по температуре, влажности и высоте. Быстро оценивайте накопление снега."
    }
  },
  {
    id: "parity-calculator",
    category: "other",
    slugs: {
      en: "parity-calculator",
      "zh-CN": "ouqi-jisuanqi",
      "zh-TW": "ouqi-jisuanqi",
      ja: "parity-keisanki",
      ko: "paeriti-gyesangi",
      es: "calculadora-paridad",
      fr: "calculateur-parite",
      de: "paritaetsrechner",
      pt: "calculadora-paridade",
      ru: "kalkulyator-chetnosti"
    },
    titles: {
      en: "Parity Calculator - Even/Odd Number Detector",
      "zh-CN": "奇偶校验计算器",
      "zh-TW": "奇偶校驗計算器",
      ja: "偶奇判定計算機",
      ko: "짝수홀수 판별 계산기",
      es: "Calculadora de paridad",
      fr: "Calculateur de parité",
      de: "Paritätsrechner",
      pt: "Calculadora de paridade",
      ru: "Калькулятор чётности"
    },
    descriptions: {
      en: "Calculate parity of numbers and detect even/odd values. Supports decimal, binary, and hexadecimal input with parity bit computation for error detection.",
      "zh-CN": "计算数字的奇偶性并检测偶数/奇数，支持十进制、二进制和十六进制输入，以及用于错误检测的奇偶校验位。",
      "zh-TW": "計算數字的奇偶性並偵測偶數/奇數，支援十進位、二進位與十六進位輸入，以及用於錯誤偵測的奇偶校驗位。",
      ja: "数の偶奇を判定し、偶数/奇数を検出。10進・2進・16進入力と、誤り検出用のパリティビット計算に対応。",
      ko: "숫자의 짝수/홀수와 패리티 비트를 계산합니다. 10진, 2진, 16진 입력 및 오류 검출용 패리티 비트 계산을 지원합니다.",
      es: "Calcula la paridad de números y detecta valores pares/impares. Compatible con entradas decimal, binaria y hexadecimal, y con bit de paridad para detectar errores.",
      fr: "Calculez la parité des nombres et détectez les valeurs paires/impaires. Prend en charge les entrées décimales, binaires et hexadécimales, avec bit de parité.",
      de: "Berechnen Sie die Parität von Zahlen und erkennen Sie gerade/ungerade Werte. Unterstützt Dezimal-, Binär- und Hex-Eingaben sowie Paritätsbits.",
      pt: "Calcule a paridade de números e detecte valores pares/ímpares. Suporta entrada decimal, binária e hexadecimal, com bit de paridade para detecção de erros.",
      ru: "Вычисляйте чётность чисел и определяйте чётные/нечётные значения. Поддерживаются ввод в десятичной, двоичной и шестнадцатеричной системах и бит чётности."
    }
  },
  {
    id: "password-entropy-calculator",
    category: "other",
    slugs: {
      en: "password-entropy-calculator",
      "zh-CN": "mima-shang-jisuanqi",
      "zh-TW": "mima-shang-jisuanqi",
      ja: "pasuwado-entoropi-keisanki",
      ko: "bimilbeonho-entropi-gyesangi",
      es: "calculadora-entropia-contrasenas",
      fr: "calculateur-entropie-mot-de-passe",
      de: "passwort-entropie-rechner",
      pt: "calculadora-entropia-senhas",
      ru: "kalkulyator-entropii-parolya"
    },
    titles: {
      en: "Password Entropy Calculator - Analyze Password Strength",
      "zh-CN": "密码熵计算器：分析密码强度",
      "zh-TW": "密碼熵計算器：分析密碼強度",
      ja: "パスワードエントロピー計算機 - 強度分析",
      ko: "비밀번호 엔트로피 계산기 - 강도 분석",
      es: "Calculadora de entropía de contraseñas",
      fr: "Calculateur d’entropie de mot de passe",
      de: "Passwort-Entropie-Rechner",
      pt: "Calculadora de entropia de senha",
      ru: "Калькулятор энтропии пароля"
    },
    descriptions: {
      en: "Calculate password entropy in bits, assess strength rating, and estimate crack time from character pool size and length to guide secure password creation.",
      "zh-CN": "按字符池大小和长度计算密码熵，评估强度并估算破解时间，帮助你创建更安全的密码。",
      "zh-TW": "依字元池大小與長度計算密碼熵，評估強度並估算破解時間，幫助你建立更安全的密碼。",
      ja: "文字種の組み合わせと長さからパスワードのエントロピーを計算し、強度と推定突破時間を確認できます。",
      ko: "문자 풀 크기와 길이로 비밀번호 엔트로피를 계산해 강도와 예상 해독 시간을 확인할 수 있습니다.",
      es: "Calcula la entropía de una contraseña, evalúa su fuerza y estima el tiempo de descifrado según el conjunto de caracteres y la longitud.",
      fr: "Calculez l’entropie d’un mot de passe, évaluez sa robustesse et estimez le temps de cassage selon la taille du jeu de caractères et la longueur.",
      de: "Berechnen Sie die Entropie eines Passworts, bewerten Sie die Stärke und schätzen Sie die Knackzeit anhand von Zeichenpool und Länge.",
      pt: "Calcule a entropia de uma senha, avalie sua força e estime o tempo de quebra com base no conjunto de caracteres e no tamanho.",
      ru: "Рассчитайте энтропию пароля, оцените его стойкость и время взлома по размеру набора символов и длине."
    }
  },
  {
    id: "pay-gap-calculator",
    category: "other",
    slugs: {
      en: "pay-gap-calculator",
      "zh-CN": "xinzi-chaju-jisuanqi",
      "zh-TW": "xinzi-chaju-jisuanqi",
      ja: "chingin-kakusa-keisanki",
      ko: "imgeum-gyeokcha-gyesangi",
      es: "calculadora-brecha-salarial",
      fr: "calculateur-ecart-salarial",
      de: "gehaltsluecke-rechner",
      pt: "calculadora-diferenca-salarial",
      ru: "kalkulyator-razryva-v-oplate"
    },
    titles: {
      en: "Pay Gap Calculator - Salary Difference & Equity Analysis",
      "zh-CN": "薪资差距计算器 - 工资差异与公平分析",
      "zh-TW": "薪資差距計算器 - 薪酬差異與公平分析",
      ja: "賃金格差計算機 - 給与差と公平性分析",
      ko: "임금 격차 계산기 - 급여 차이와 형평성 분석",
      es: "Calculadora de brecha salarial y equidad",
      fr: "Calculateur d’écart salarial et d’équité",
      de: "Gehaltslücke-Rechner für Entgeltgleichheit",
      pt: "Calculadora de diferença salarial e equidade",
      ru: "Калькулятор разрыва в оплате и равенства"
    },
    descriptions: {
      en: "Calculate pay gap percentage, pay ratio, and absolute salary difference between groups. Supports HR equity analysis and mandatory pay gap reporting.",
      "zh-CN": "计算群体之间的薪资差距百分比、薪资比率和绝对工资差异，支持人力资源薪酬公平分析和强制薪酬差距报告。",
      "zh-TW": "計算群體間的薪資差距百分比、薪資比率與絕對薪酬差額，支援人資薪酬公平分析與強制薪資差距報告。",
      ja: "グループ間の賃金格差率、給与比率、絶対的な給与差を計算。人事の報酬公平性分析や義務的な賃金格差報告に役立ちます。",
      ko: "그룹 간 임금 격차율, 급여 비율, 절대 급여 차이를 계산해 HR 보상 형평성 분석과 의무 임금 격차 보고를 지원합니다.",
      es: "Calcula la brecha salarial, el ratio de pago y la diferencia absoluta entre grupos para análisis de equidad y reportes obligatorios.",
      fr: "Calculez l’écart salarial, le ratio de rémunération et la différence absolue entre groupes pour l’analyse d’équité RH et les rapports obligatoires.",
      de: "Berechnen Sie Gehaltslücke, Entgeltquote und absolute Gehaltsdifferenz zwischen Gruppen für HR-Equity-Analysen und Pflichtberichte.",
      pt: "Calcule diferença salarial, razão de remuneração e diferença absoluta entre grupos para análise de equidade em RH e relatórios obrigatórios.",
      ru: "Рассчитайте разрыв в оплате, коэффициент оплаты и абсолютную разницу между группами для HR-анализа равенства и обязательной отчетности."
    }
  },
  {
    id: "pcb-impedance-calculator",
    category: "other",
    slugs: {
      en: "pcb-impedance-calculator",
      "zh-CN": "pcb-zudang-jisuanqi-weidai-xian-daizhuang-xian",
      "zh-TW": "pcb-zudang-jisuanqi-weidai-xian-yu-daizhuang-xian",
      ja: "pcb-impedance-keisanki-mikurostripu-sutorairin",
      ko: "pcb-impeudanseu-gyesangi-mikeuroseuteurip-seuteureipeu",
      es: "pcb-impedancia-calculadora-microstrip-stripline",
      fr: "calculateur-impedance-pcb-microstrip-stripline",
      de: "pcb-impedanz-rechner-microstrip-stripline",
      pt: "calculadora-impedancia-pcb-microstrip-stripline",
      ru: "kalkulyator-impedansa-pcb-mikrostrip-stripline"
    },
    titles: {
      en: "PCB Impedance Calculator - Microstrip & Stripline",
      "zh-CN": "PCB 阻抗计算器：微带线与带状线",
      "zh-TW": "PCB 阻抗計算器：微帶線與帶狀線",
      ja: "PCBインピーダンス計算機：マイクロストリップとストリップライン",
      ko: "PCB 임피던스 계산기: 마이크로스트립과 스트립라인",
      es: "Calculadora de impedancia PCB: microstrip y stripline",
      fr: "Calculateur d’impédance PCB : microstrip et stripline",
      de: "PCB-Impedanzrechner: Microstrip und Stripline",
      pt: "Calculadora de impedância PCB: microstrip e stripline",
      ru: "Калькулятор импеданса PCB: микрополоса и стриплайн"
    },
    descriptions: {
      en: "Calculate PCB trace impedance for microstrip and stripline using IPC formulas. Essential for RF and high-speed designers targeting 50 Ω or custom impedance.",
      "zh-CN": "使用 IPC 公式计算微带线和带状线的 PCB 走线阻抗，适用于 RF 与高速设计，快速获得 50 Ω 或自定义阻抗。",
      "zh-TW": "使用 IPC 公式計算微帶線與帶狀線的 PCB 走線阻抗，適用於 RF 與高速設計，快速取得 50 Ω 或自訂阻抗。",
      ja: "IPC式でマイクロストリップとストリップラインのPCB配線インピーダンスを計算。RFや高速設計で50 Ωや任意値の整合に最適。",
      ko: "IPC 공식을 사용해 마이크로스트립과 스트립라인 PCB 배선 임피던스를 계산합니다. RF와 고속 설계의 50 Ω 또는 맞춤 임피던스에 적합합니다.",
      es: "Calcula la impedancia de pistas PCB en microstrip y stripline con fórmulas IPC. Ideal para RF y alta velocidad con 50 Ω o impedancia personalizada.",
      fr: "Calcule l’impédance des pistes PCB en microstrip et stripline avec les formules IPC. Idéal pour le RF et le haut débit, pour 50 Ω ou une impédance personnalisée.",
      de: "Berechnen Sie die Leiterbahnimpedanz auf PCBs für Microstrip und Stripline mit IPC-Formeln. Ideal für RF und High-Speed mit 50 Ω oder Sonderimpedanz.",
      pt: "Calcule a impedância de trilhas PCB em microstrip e stripline usando fórmulas IPC. Ideal para RF e alta velocidade, com 50 Ω ou impedância personalizada.",
      ru: "Рассчитайте импеданс дорожек PCB для микрополосы и стриплайна по формулам IPC. Подходит для RF и высоких скоростей, 50 Ω или любое значение."
    }
  },
  {
    id: "pcb-trace-current-calculator",
    category: "other",
    slugs: {
      en: "pcb-trace-current-calculator",
      "zh-CN": "pcb-buxian-dianliu-jisuanqi",
      "zh-TW": "pcb-zouxian-dianliu-jisuanqi",
      ja: "pcb-haisen-denryu-keisanki",
      ko: "pcb-baeseon-jeonlyu-gyesangi",
      es: "calculadora-corriente-pista-pcb",
      fr: "calculateur-courant-piste-pcb",
      de: "leiterbahn-strom-rechner",
      pt: "calculadora-corrente-trilha-pcb",
      ru: "kalkulyator-toka-dorozhki-pcb"
    },
    titles: {
      en: "PCB Trace Current Calculator - IPC-2221 Current Capacity",
      "zh-CN": "PCB走线电流计算器 - IPC-2221载流能力",
      "zh-TW": "PCB走線電流計算器 - IPC-2221載流能力",
      ja: "PCB配線電流計算機 - IPC-2221許容電流",
      ko: "PCB 배선 전류 계산기 - IPC-2221 허용 전류",
      es: "Calculadora de corriente de pistas PCB IPC-2221",
      fr: "Calculateur de courant de piste PCB IPC-2221",
      de: "PCB-Leiterbahn-Stromrechner nach IPC-2221",
      pt: "Calculadora de corrente de trilha PCB IPC-2221",
      ru: "Калькулятор тока дорожки PCB по IPC-2221"
    },
    descriptions: {
      en: "Calculate PCB trace current capacity and power loss using IPC-2221. Supports outer and inner layers with adjustable copper weight and temperature rise.",
      "zh-CN": "使用 IPC-2221 计算 PCB 走线载流能力和功率损耗，支持内外层、可调铜厚和温升。",
      "zh-TW": "使用 IPC-2221 計算 PCB 走線載流能力與功率損耗，支援內外層、可調銅厚與溫升。",
      ja: "IPC-2221に基づきPCB配線の許容電流と電力損失を計算。外層・内層、銅厚、温度上昇を調整できます。",
      ko: "IPC-2221로 PCB 배선 허용 전류와 전력 손실을 계산합니다. 외층/내층, 구리 중량, 온도 상승 조정 지원.",
      es: "Calcula la capacidad de corriente y pérdida de potencia de pistas PCB con IPC-2221. Admite capas externas e internas, cobre y temperatura ajustables.",
      fr: "Calculez le courant admissible et la perte de puissance d'une piste PCB avec IPC-2221. Couches internes/externes, cuivre et élévation réglables.",
      de: "Berechnen Sie Strombelastbarkeit und Leistungsverlust von PCB-Leiterbahnen nach IPC-2221. Für Innen-/Außenlagen, Kupfergewicht und Temperaturanstieg.",
      pt: "Calcule a capacidade de corrente e perda de potência de trilhas PCB com IPC-2221. Suporta camadas externas/internas, cobre e elevação térmica.",
      ru: "Рассчитайте токовую нагрузку и потери мощности дорожки PCB по IPC-2221. Поддерживаются внешние/внутренние слои, медь и нагрев."
    }
  },
  {
    id: "odd-parity-bit-calculator",
    category: "other",
    slugs: {
      en: "odd-parity-bit-calculator",
      "zh-CN": "qi-jiao-yan-wei-ji-suan-qi",
      "zh-TW": "qi-jiao-yan-wei-ji-suan-qi",
      ja: "gusuu-paeriti-bitto-keisanki",
      ko: "holsu-paeriti-biteu-gyesangi",
      es: "calculadora-bit-paridad-impar",
      fr: "calculateur-bit-parite-impaire",
      de: "ungerade-paritaetsbit-rechner",
      pt: "calculadora-bit-paridade-impar",
      ru: "kalkulyator-nechetnogo-bita-chetnosti"
    },
    titles: {
      en: "Odd Parity Bit Calculator - Binary Error Detection",
      "zh-CN": "奇校验位计算器",
      "zh-TW": "奇同位元計算器",
      ja: "奇数パリティビット計算機",
      ko: "홀수 패리티 비트 계산기",
      es: "Calculadora de bit de paridad impar",
      fr: "Calculateur de bit de parité impaire",
      de: "Rechner für ungerade Paritätsbits",
      pt: "Calculadora de bit de paridade ímpar",
      ru: "Калькулятор нечётного бита чётности"
    },
    descriptions: {
      en: "Calculate odd parity bits for binary data transmission. Generate parity bits, validate received data integrity, and detect single-bit errors instantly.",
      "zh-CN": "计算二进制数据的奇校验位，生成传输字符串，快速验证接收数据并检测单比特错误。",
      "zh-TW": "計算二進位資料的奇同位元，產生傳輸字串，快速驗證接收資料並偵測單一位元錯誤。",
      ja: "バイナリデータの奇数パリティビットを計算し、送信文字列を生成。受信データを素早く検証して単一ビット誤りを検出します。",
      ko: "이진 데이터의 홀수 패리티 비트를 계산하고 전송 문자열을 생성합니다. 수신 데이터를 빠르게 검증하고 단일 비트 오류를 감지합니다.",
      es: "Calcula bits de paridad impar para datos binarios, genera la cadena de transmisión y detecta errores de un solo bit al instante.",
      fr: "Calculez des bits de parité impaire pour des données binaires, générez la chaîne de transmission et détectez instantanément les erreurs d’un seul bit.",
      de: "Berechnen Sie ungerade Paritätsbits für Binärdaten, erzeugen Sie die Übertragungszeichenfolge und erkennen Sie Ein-Bit-Fehler sofort.",
      pt: "Calcule bits de paridade ímpar para dados binários, gere a cadeia de transmissão e detecte erros de um único bit instantaneamente.",
      ru: "Рассчитайте нечётные биты чётности для двоичных данных, сформируйте строку передачи и мгновенно обнаруживайте одиночные ошибки."
    }
  },
  {
    id: "op-amp-gain-calculator",
    category: "other",
    slugs: {
      en: "op-amp-gain-calculator",
      "zh-CN": "yunfang-zengyi-jisuanqi",
      "zh-TW": "yunfang-zengyi-jisuanqi",
      ja: "op-ampu-zoueki-keisan",
      ko: "opampeu-seung-i-gyesan-gi",
      es: "calculadora-ganancia-op-amp",
      fr: "calculateur-gain-ampli-op",
      de: "op-amp-verstaerkungsrechner",
      pt: "calculadora-ganho-op-amp",
      ru: "kalkulyator-usileniya-operatsionnogo-usilitelya"
    },
    titles: {
      en: "Op Amp Gain Calculator - Inverting & Non-Inverting",
      "zh-CN": "运放增益计算器",
      "zh-TW": "運放增益計算器",
      ja: "オペアンプ増幅率計算機",
      ko: "연산 증폭기 이득 계산기",
      es: "Calculadora de ganancia de op amp",
      fr: "Calculateur de gain d’ampli op",
      de: "OP-Amp-Verstärkungsrechner",
      pt: "Calculadora de ganho de op amp",
      ru: "Калькулятор усиления ОУ"
    },
    descriptions: {
      en: "Calculate operational amplifier voltage gain, output voltage, and dB gain for inverting and non-inverting configurations. Free electronics circuit design tool.",
      "zh-CN": "计算反相与同相运算放大器的电压增益、输出电压和 dB 增益。",
      "zh-TW": "計算反相與同相運算放大器的電壓增益、輸出電壓與 dB 增益。",
      ja: "反転・非反転オペアンプ回路の電圧増幅率、出力電圧、dB増幅率を計算します。",
      ko: "반전 및 비반전 연산 증폭기 회로의 전압 이득, 출력 전압, dB 이득을 계산합니다.",
      es: "Calcula la ganancia de voltaje, el voltaje de salida y la ganancia en dB para configuraciones inversora y no inversora.",
      fr: "Calcule le gain en tension, la tension de sortie et le gain en dB pour les montages inverseur et non inverseur.",
      de: "Berechnet Spannungsverstärkung, Ausgangsspannung und dB-Verstärkung für invertierende und nichtinvertierende Schaltungen.",
      pt: "Calcule o ganho de tensão, a tensão de saída e o ganho em dB para configurações inversora e não inversora.",
      ru: "Рассчитывает коэффициент усиления, выходное напряжение и усиление в дБ для инвертирующих и неинвертирующих схем."
    }
  },
  {
    id: "oxygen-tank-duration-calculator",
    category: "other",
    slugs: {
      en: "oxygen-tank-duration-calculator",
      "zh-CN": "yangqi-ping-shi-yong-shi-jisuanqi",
      "zh-TW": "yangqi-gang-shi-yong-shi-jian-jisuanqi",
      ja: "sanso-bonbe-jikan-keisanki",
      ko: "sanso-tong-sayong-sigan-gyesangi",
      es: "calculadora-duracion-tanque-oxigeno",
      fr: "calculateur-duree-bouteille-oxygene",
      de: "sauerstoffflasche-dauer-rechner",
      pt: "calculadora-duracao-cilindro-oxigenio",
      ru: "kalkulyator-vremeni-kislorodnogo-ballona"
    },
    titles: {
      en: "Oxygen Tank Duration Calculator - Medical & Scuba",
      "zh-CN": "氧气瓶使用时长计算器 - 医疗与潜水",
      "zh-TW": "氧氣鋼瓶使用時間計算器 - 醫療與潛水",
      ja: "酸素ボンベ使用時間計算機 - 医療・ダイビング",
      ko: "산소통 사용 시간 계산기 - 의료 및 스쿠버",
      es: "Calculadora de duración de tanque de oxígeno",
      fr: "Calculateur de durée de bouteille d’oxygène",
      de: "Sauerstoffflasche-Dauer-Rechner",
      pt: "Calculadora de duração de cilindro de oxigênio",
      ru: "Калькулятор времени кислородного баллона"
    },
    descriptions: {
      en: "Estimate oxygen tank duration based on capacity, pressure, and flow rate. Essential for medical oxygen therapy, scuba diving, and emergency planning.",
      "zh-CN": "根据容量、压力和流量估算氧气瓶可用时长，适用于医用氧疗、水肺潜水和应急规划。",
      "zh-TW": "依容量、壓力與流量估算氧氣鋼瓶可用時間，適用於醫療氧療、水肺潛水與緊急規劃。",
      ja: "容量、圧力、流量から酸素ボンベの使用可能時間を推定。医療用酸素療法、スクーバダイビング、緊急計画に役立ちます。",
      ko: "용량, 압력, 유량을 기준으로 산소통 사용 가능 시간을 추정합니다. 의료 산소요법, 스쿠버 다이빙, 응급 계획에 유용합니다.",
      es: "Estima la duración de un tanque de oxígeno según capacidad, presión y caudal. Útil para oxigenoterapia, buceo y planes de emergencia.",
      fr: "Estimez la durée d’une bouteille d’oxygène selon la capacité, la pression et le débit. Utile en oxygénothérapie, plongée et urgence.",
      de: "Schätzen Sie die Laufzeit einer Sauerstoffflasche anhand von Kapazität, Druck und Flussrate. Für Sauerstofftherapie, Tauchen und Notfallplanung.",
      pt: "Estime a duração do cilindro de oxigênio por capacidade, pressão e fluxo. Ideal para oxigenoterapia, mergulho e emergências.",
      ru: "Оцените время работы кислородного баллона по объему, давлению и потоку. Для кислородной терапии, дайвинга и ЧС."
    }
  },
  {
    id: "pallet-calculator",
    category: "other",
    slugs: {
      en: "pallet-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Pallet Calculator - Boxes, Layers & Weight Capacity",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate boxes per pallet, stacking layers, total weight, and space utilization for logistics and warehousing. Optimize pallet loading for shipping efficiency.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "parity-bit-calculator",
    category: "other",
    slugs: {
      en: "parity-bit-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Parity Bit Calculator - Even & Odd Error Detection",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate even or odd parity bits for binary data. Generate transmission strings, validate received data, and detect single-bit errors.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "nanowrimo-calculator",
    category: "other",
    slugs: {
      en: "nanowrimo-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "NaNoWriMo Calculator - Track Novel Writing Progress",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate daily word count targets, track NaNoWriMo progress, and estimate completion dates for your 50,000-word novel writing challenge.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "nether-portal-calculator",
    category: "other",
    slugs: {
      en: "nether-portal-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Nether Portal Calculator - Minecraft Portal Coordinates",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate Nether portal coordinates, convert Overworld to Nether coords at the 8:1 ratio, and find obsidian requirements for any portal size.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "new-year-countdown-calculator",
    category: "other",
    slugs: {
      en: "new-year-countdown-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "New Year Countdown Calculator - Time Until New Year",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate the exact days, hours, minutes, and seconds until New Year with a live countdown timer. Supports all time zones for accurate local midnight.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "new-years-resolutions-calculator",
    category: "other",
    slugs: {
      en: "new-years-resolutions-calculator",
      "zh-CN": "xin-nian-mubiao-jisuanqi",
      "zh-TW": "xin-nian-mubiao-jisuanqi",
      ja: "shinnen-mokuhyo-keisan-ki",
      ko: "saehae-gyeolsim-gyesangi",
      es: "calculadora-propositos-ano-nuevo",
      fr: "calculateur-resolutions-nouvel-an",
      de: "neujahrsvorsaetze-rechner",
      pt: "calculadora-resolucoes-ano-novo",
      ru: "kalkulyator-novogodnih-celey"
    },
    titles: {
      en: "New Year Resolutions Calculator - Track Goals Success",
      "zh-CN": "新年目标计算器 - 追踪目标达成",
      "zh-TW": "新年目標計算器 - 追蹤目標達成",
      ja: "新年目標計算機 - 目標達成率を追跡",
      ko: "새해 결심 계산기 - 목표 달성 추적",
      es: "Calculadora de propósitos de Año Nuevo - progreso",
      fr: "Calculateur de résolutions du Nouvel An - progrès",
      de: "Neujahrsvorsätze-Rechner - Zielerfolg verfolgen",
      pt: "Calculadora de resoluções de ano novo - metas",
      ru: "Калькулятор новогодних целей - отслеживание прогресса"
    },
    descriptions: {
      en: "Calculate New Year resolutions success rate, track goal progress by category, and get motivation-based insights to improve your annual achievement rate.",
      "zh-CN": "计算新年目标达成率，按类别追踪进度，并获取基于动机的洞察，提升年度完成率。",
      "zh-TW": "計算新年目標達成率，按類別追蹤進度，並取得以動機為基礎的洞察，提升年度完成率。",
      ja: "新年の目標達成率を計算し、カテゴリ別に進捗を追跡し、動機ベースの洞察で年間達成率を高めます。",
      ko: "새해 결심 달성률을 계산하고, 카테고리별 진행 상황을 추적하며, 동기 기반 인사이트로 연간 달성률을 높이세요.",
      es: "Calcula la tasa de éxito de tus propósitos de Año Nuevo, sigue el progreso por categoría y obtén ideas basadas en motivación.",
      fr: "Calculez le taux de réussite de vos résolutions du Nouvel An, suivez le progrès par catégorie et obtenez des conseils fondés sur la motivation.",
      de: "Berechne die Erfolgsquote deiner Neujahrsvorsätze, verfolge Fortschritte nach Kategorie und erhalte motivierende Einblicke.",
      pt: "Calcule a taxa de sucesso das suas resoluções de ano novo, acompanhe o progresso por categoria e receba insights baseados em motivação.",
      ru: "Рассчитайте процент успеха новогодних целей, отслеживайте прогресс по категориям и получайте основанные на мотивации инсайты."
    }
  },
  {
    id: "note-frequency-calculator",
    category: "other",
    slugs: {
      en: "note-frequency-calculator",
      "zh-CN": "yinfu-pinlv-jisuanqi",
      "zh-TW": "yinfu-pinlv-jisuanqi",
      ja: "onpu-shuuhasu-keisanki",
      ko: "eumpyo-jupasu-gyesangi",
      es: "calculadora-frecuencia-notas",
      fr: "calculateur-frequence-notes",
      de: "notenfrequenz-rechner",
      pt: "calculadora-frequencia-notas",
      ru: "kalkulyator-chastoty-not-gts-i-vysota"
    },
    titles: {
      en: "Note Frequency Calculator - Musical Note Hz & Pitch",
      "zh-CN": "音符频率计算器：音高 Hz 与音程",
      "zh-TW": "音符頻率計算器：音高 Hz 與音程",
      ja: "音符周波数計算機：Hz と音高",
      ko: "음표 주파수 계산기: Hz와 음높이",
      es: "Calculadora de frecuencia de notas: Hz y tono",
      fr: "Calculateur de fréquence des notes : Hz et hauteur",
      de: "Notenfrequenz-Rechner: Hz und Tonhöhe",
      pt: "Calculadora de frequência de notas: Hz e tom",
      ru: "Калькулятор частоты нот: Гц и высота"
    },
    descriptions: {
      en: "Calculate the exact frequency of any musical note in Hz, find MIDI numbers, wavelength, and period. Supports custom tuning and all 12 pitch classes.",
      "zh-CN": "计算任意音符的精确频率、MIDI 编号、波长和周期，支持自定义调音与全部 12 个音级。",
      "zh-TW": "計算任意音符的精確頻率、MIDI 編號、波長與週期，支援自訂調音與全部 12 個音級。",
      ja: "任意の音の周波数、MIDI 番号、波長、周期を計算。カスタム調律と全 12 音に対応。",
      ko: "임의의 음표 주파수, MIDI 번호, 파장, 주기를 계산하고 사용자 지정 조율과 12음계를 지원합니다.",
      es: "Calcula la frecuencia exacta de cualquier nota, el número MIDI, la longitud de onda y el período, con afinación personalizada y 12 clases.",
      fr: "Calculez la fréquence exacte de n’importe quelle note, le numéro MIDI, la longueur d’onde et la période, avec accordage personnalisé et 12 classes.",
      de: "Berechne die exakte Frequenz jeder Note, MIDI-Nummer, Wellenlänge und Periode mit eigener Stimmung und allen 12 Tonklassen.",
      pt: "Calcule a frequência exata de qualquer nota, o número MIDI, o comprimento de onda e o período, com afinação personalizada e 12 classes.",
      ru: "Рассчитайте точную частоту любой ноты, номер MIDI, длину волны и период с пользовательским строем и 12 классами."
    }
  },
  {
    id: "impact-factor-calculator",
    category: "other",
    slugs: {
      en: "impact-factor-calculator",
      "zh-CN": "qikan-yingxiang-yinzi-jisuanqi",
      "zh-TW": "qikan-yingxiang-yinzi-jisuanqi",
      ja: "kikan-impact-factor-keisan",
      ko: "impaegteu-paekteo-gyesangi",
      es: "calculadora-factor-impacto-revista",
      fr: "calculateur-facteur-impact-revue",
      de: "impact-faktor-rechner",
      pt: "calculadora-fator-impacto-periodico",
      ru: "kalkulyator-impakt-faktora-zhurnala"
    },
    titles: {
      en: "Impact Factor Calculator - Journal Ranking Metric",
      "zh-CN": "期刊影响因子计算器",
      "zh-TW": "期刊影響因子計算器",
      ja: "影響因子計算ツール",
      ko: "임팩트 팩터 계산기",
      es: "Calculadora del factor de impacto",
      fr: "Calculateur du facteur d’impact",
      de: "Impact-Faktor-Rechner",
      pt: "Calculadora do fator de impacto",
      ru: "Калькулятор импакт-фактора"
    },
    descriptions: {
      en: "Calculate journal impact factor from citation counts and publication data. Evaluate academic journal quality and research influence with a single score.",
      "zh-CN": "根据引文和发表数据计算期刊影响因子，快速评估学术期刊的影响力。",
      "zh-TW": "根據引用與發表資料計算期刊影響因子，快速評估學術期刊的影響力。",
      ja: "引用数と発表データから期刊の影響因子を計算し、学術誌の影響力をすばやく把握できます。",
      ko: "인용 수와 발행 데이터를 바탕으로 학술지 임팩트 팩터를 계산하고, 논문의 영향력을 빠르게 확인하세요.",
      es: "Calcula el factor de impacto de una revista con citas y datos de publicación para evaluar su influencia académica.",
      fr: "Calculez le facteur d’impact d’une revue à partir des citations et des données de publication pour évaluer son influence académique.",
      de: "Berechnen Sie den Impact-Faktor einer Zeitschrift anhand von Zitationen und Publikationsdaten zur Bewertung ihrer wissenschaftlichen Wirkung.",
      pt: "Calcule o fator de impacto de um periódico com citações e dados de publicação para avaliar sua influência acadêmica.",
      ru: "Рассчитайте импакт-фактор журнала по числу цитирований и данным о публикациях для оценки его научного влияния."
    }
  },
  {
    id: "impedance-matching-calculator",
    category: "other",
    slugs: {
      en: "impedance-matching-calculator",
      "zh-CN": "zukang-pipei-jisuanqi",
      "zh-TW": "zukang-pipei-jisuanqi",
      ja: "impidansu-seigo-keisanki",
      ko: "impideonseu-jeonghap-gyesangi",
      es: "calculadora-adaptacion-impedancias",
      fr: "calculateur-adaptation-impedance",
      de: "impedanzanpassung-rechner",
      pt: "calculadora-casamento-impedancia",
      ru: "kalkulyator-soglasovaniya-impedansa"
    },
    titles: {
      en: "Impedance Matching Calculator - VSWR & Power Transfer",
      "zh-CN": "阻抗匹配计算器 - VSWR 与功率传输",
      "zh-TW": "阻抗匹配計算器 - VSWR 與功率傳輸",
      ja: "インピーダンス整合計算機 - VSWRと電力伝送",
      ko: "임피던스 정합 계산기 - VSWR 및 전력 전달",
      es: "Calculadora de adaptación de impedancias - VSWR",
      fr: "Calculateur d’adaptation d’impédance - VSWR",
      de: "Impedanzanpassung Rechner - VSWR und Leistung",
      pt: "Calculadora de casamento de impedância - VSWR",
      ru: "Калькулятор согласования импеданса - КСВН"
    },
    descriptions: {
      en: "Calculate VSWR, reflection coefficient, and power transfer efficiency for RF systems. Optimize impedance matching between source and load in antenna design.",
      "zh-CN": "计算射频系统的 VSWR、反射系数和功率传输效率，优化天线设计中源与负载之间的阻抗匹配。",
      "zh-TW": "計算射頻系統的 VSWR、反射係數與功率傳輸效率，最佳化天線設計中訊源與負載的阻抗匹配。",
      ja: "RFシステムのVSWR、反射係数、電力伝送効率を計算し、アンテナ設計で信号源と負荷のインピーダンス整合を最適化します。",
      ko: "RF 시스템의 VSWR, 반사 계수, 전력 전달 효율을 계산하고 안테나 설계에서 소스와 부하의 임피던스 정합을 최적화하세요.",
      es: "Calcula VSWR, coeficiente de reflexión y eficiencia de transferencia de potencia en sistemas RF. Optimiza la adaptación entre fuente y carga.",
      fr: "Calculez le VSWR, le coefficient de réflexion et le rendement de transfert de puissance des systèmes RF. Optimisez l’adaptation source-charge.",
      de: "Berechnen Sie VSWR, Reflexionskoeffizient und Leistungsübertragung in RF-Systemen. Optimieren Sie die Anpassung zwischen Quelle und Last.",
      pt: "Calcule VSWR, coeficiente de reflexão e eficiência de transferência de potência em sistemas RF. Otimize o casamento entre fonte e carga.",
      ru: "Рассчитайте КСВН, коэффициент отражения и эффективность передачи мощности для RF-систем. Оптимизируйте согласование источника и нагрузки."
    }
  },
  {
    id: "impostor-odds-calculator-among-us",
    category: "other",
    slugs: {
      en: "impostor-odds-calculator-among-us",
      "zh-CN": "among-us-neigui-gailv-jisuanqi",
      "zh-TW": "among-us-neigui-gailv-jisuanqi",
      ja: "among-us-impostor-kakuritsu-keisan",
      ko: "among-us-imposeuteo-gyeoljeonggi",
      es: "among-us-probabilidad-impostor",
      fr: "among-us-probabilite-imposteur",
      de: "among-us-impostor-wahrscheinlichkeit",
      pt: "among-us-probabilidade-impostor",
      ru: "among-us-veroyatnost-samozvantsa"
    },
    titles: {
      en: "Impostor Odds Calculator - Among Us Probability",
      "zh-CN": "内鬼概率计算器 - Among Us",
      "zh-TW": "內鬼機率計算器 - Among Us",
      ja: "インポスター確率計算機 - Among Us",
      ko: "임포스터 확률 계산기 - Among Us",
      es: "Probabilidad de impostor en Among Us",
      fr: "Probabilité d'imposteur dans Among Us",
      de: "Impostor-Wahrscheinlichkeit in Among Us",
      pt: "Probabilidade de impostor em Among Us",
      ru: "Вероятность самозванца в Among Us"
    },
    descriptions: {
      en: "Calculate impostor probability and detection odds in Among Us. Analyze player counts and game state to improve your deduction and strategy skills.",
      "zh-CN": "根据玩家总数、内鬼数和存活人数计算 Among Us 的内鬼概率与抓出概率，帮助你提升判断与策略。",
      "zh-TW": "依據玩家總數、內鬼數與存活人數，計算 Among Us 的內鬼機率與抓中機率，提升你的判斷與策略。",
      ja: "総人数、インポスター数、生存者数から Among Us のインポスター確率と見つかる確率を計算し、判断力を高めます。",
      ko: "총 플레이어 수, 임포스터 수, 생존 인원으로 Among Us의 임포스터 확률과 적발 가능성을 계산하세요.",
      es: "Calcula la probabilidad de impostor y de detección en Among Us según jugadores totales, impostores y vivos para mejorar tu estrategia.",
      fr: "Calculez la probabilité d'imposteur et de détection dans Among Us selon le nombre de joueurs, d'imposteurs et de survivants.",
      de: "Berechne die Impostor-Wahrscheinlichkeit und Entdeckungs-Chancen in Among Us anhand von Spielerzahlen und Spielstand.",
      pt: "Calcule a probabilidade de impostor e de detecção em Among Us com base no total de jogadores, impostores e vivos.",
      ru: "Рассчитайте вероятность самозванца и шансы на его выявление в Among Us по числу игроков и состоянию матча."
    }
  },
  {
    id: "ip-subnet-calculator",
    category: "other",
    slugs: {
      en: "ip-subnet-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "IP Subnet Calculator - Network Address & IP Ranges",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate network address, subnet mask, broadcast address, and usable IP ranges from any IP and CIDR prefix. Essential for network planning and administration.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "kd-calculator-kill-death-ratio",
    category: "other",
    slugs: {
      en: "kd-calculator-kill-death-ratio",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "KD Calculator - Kill Death Ratio for Gaming",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate your KD ratio, efficiency rating, win rate, and shooting accuracy for FPS and competitive games. Analyze your gaming performance with detailed stats.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "mm-to-carat-conversion",
    category: "other",
    slugs: {
      en: "mm-to-carat-conversion",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "MM to Carat Conversion Calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Convert gemstone dimensions from millimeters to carat weight. Free calculator for jewelry makers, gemologists, and diamond buyers. Accurate weight estimation.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "music-duration-calculator",
    category: "other",
    slugs: {
      en: "music-duration-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Music Duration Calculator - Song Length from BPM",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate music duration, song length, and track timing from BPM, tempo, and time signature. Free tool for musicians, DJs, and music producers.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "music-interval-calculator",
    category: "other",
    slugs: {
      en: "music-interval-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Music Interval Calculator - Note Distances",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate musical intervals between two notes instantly. Learn interval names, semitone distances, and music theory concepts for composition and ear training.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "music-scale-calculator",
    category: "other",
    slugs: {
      en: "music-scale-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Music Scale Calculator - Scales and Modes",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate musical scales, modes, and intervals. Learn major, minor, pentatonic, blues scales for any root note. Free tool for composition and music theory.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "music-transposition-calculator",
    category: "other",
    slugs: {
      en: "music-transposition-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Music Transposition Calculator - Key Converter",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Transpose musical notes and keys instantly. Convert between different keys, calculate semitone differences, and learn music transposition for any instrument.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "minecraft-stack-calculator",
    category: "other",
    slugs: {
      en: "minecraft-stack-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Minecraft Stack Calculator - Item & Storage Planner",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate Minecraft item stacks, shulker box capacity, and inventory slots. Optimise storage for any resource quantity with precise stack counts.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "minecraft-end-portal-finder",
    category: "other",
    slugs: {
      en: "minecraft-end-portal-finder",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Minecraft End Portal Finder - Locate Strongholds",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Find Minecraft Strongholds using Eye of Ender angle and distance calculations. Supports single-throw and optional second-throw estimation for better accuracy.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "minecraft-circle-generator",
    category: "other",
    slugs: {
      en: "minecraft-circle-generator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Minecraft Circle Generator - Pixel Perfect Circles",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Generate pixel-perfect Minecraft circles with exact block coordinates. Supports Midpoint and Bresenham algorithms with outline or filled options.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "mayan-calendar-converter",
    category: "other",
    slugs: {
      en: "mayan-calendar-converter",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Mayan Calendar Converter - Gregorian to Mayan Date",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Convert Gregorian dates to Mayan Long Count, Tzolkin, and Haab calendars. Includes Calendar Round output and reverse Mayan-to-Gregorian conversion.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "matched-betting-calculator",
    category: "other",
    slugs: {
      en: "matched-betting-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Matched Betting Calculator - Risk-Free Profits",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate optimal lay stakes, qualifying losses, and guaranteed profits from matched betting and bookmaker bonuses. Free matched betting tool.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "exposure-calculator",
    category: "other",
    slugs: {
      en: "exposure-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Exposure Calculator - Camera EV & Exposure Triangle",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate camera Exposure Value from aperture, shutter speed, and ISO. Master the exposure triangle and achieve perfect lighting in any shooting condition.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "film-calculator",
    category: "other",
    slugs: {
      en: "film-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Film Calculator - Film Length, Reels & Production Costs",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate film length, reel count, and production costs for 35mm, 16mm, Super 8, and 70mm formats. Plan your filmmaking budget accurately.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "final-grade-calculator",
    category: "other",
    slugs: {
      en: "final-grade-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Final Grade Calculator - Weighted Course Grade",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate your final course grade from current performance and final exam score using weighted averages. Plan your exam strategy to hit your target grade.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "flag-calculator-usa",
    category: "other",
    slugs: {
      en: "flag-calculator-usa",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "US Flag Calculator - Official Dimensions & Proportions",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate American flag dimensions, union size, stripe width, and star measurements for any flag size. Based on official Executive Order 10834 specifications.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "floating-point-calculator",
    category: "other",
    slugs: {
      en: "floating-point-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Floating Point Calculator - IEEE 754 Binary Representation",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Convert decimal numbers to IEEE 754 single and double precision binary format. Analyze sign, exponent, mantissa, and rounding errors for any numeric value.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "gpa-calculator",
    category: "other",
    slugs: {
      en: "gpa-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "GPA Calculator - Calculate Grade Point Average",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate your GPA with the standard 4.0 scale. Enter courses, letter grades, and credit hours for an instant weighted Grade Point Average result.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "gpa-calculator-pakistan",
    category: "other",
    slugs: {
      en: "gpa-calculator-pakistan",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "GPA Calculator Pakistan - Convert Grades to 4.0 GPA",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Convert Pakistani university grades — percentage or letter — to GPA on the HEC 4.0 scale. Supports mixed input for accurate academic GPA calculation.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "grade-calculator",
    category: "other",
    slugs: {
      en: "grade-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Grade Calculator - Calculate Academic Grades and GPA",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate GPA from letter or numerical grades with credit-hour weighting. Supports mixed grading systems and shows per-course letter grade conversions.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "gsd-calculator-ground-sample-distance",
    category: "other",
    slugs: {
      en: "gsd-calculator-ground-sample-distance",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "GSD Calculator - Ground Sample Distance for Drone Mapping",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate Ground Sample Distance (GSD) in cm/pixel for aerial photography and drone mapping. Enter sensor width, altitude, and focal length for instant results.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "guitar-string-tension-calculator",
    category: "other",
    slugs: {
      en: "guitar-string-tension-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Guitar String Tension Calculator - Calculate String Force",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate guitar string tension in pounds and Newtons. Enter scale length, string gauge, material, and target note or frequency for precise tension results.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "chord-finder",
    category: "other",
    slugs: {
      en: "chord-finder",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Chord Finder - Circle Chord Length & Arc Calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate chord length, arc length, sector area, and segment area for any circle. Enter radius and central angle to solve circle geometry problems instantly.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "chord-inversion-calculator",
    category: "other",
    slugs: {
      en: "chord-inversion-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Chord Inversion Calculator - Voicings & Inversions",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate chord inversions and voicings for any root note and quality. Identify bass notes, chord symbols, and interval structures for music composition.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "chord-progression-generator",
    category: "other",
    slugs: {
      en: "chord-progression-generator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Chord Progression Generator - Create Musical Sequences",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Generate chord progressions using music theory. Create Pop, Jazz, Blues, and Classical sequences in any key and style with Roman numeral analysis.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "chord-transposer",
    category: "other",
    slugs: {
      en: "chord-transposer",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Chord Transposer - Free Online Music Transposition Tool",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Transpose chords and progressions between musical keys while preserving chord quality. Select original and target keys for instant transposition results.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "christmas-countdown-calculator",
    category: "other",
    slugs: {
      en: "christmas-countdown-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Christmas Countdown Calculator - Days Until Christmas",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate days, hours, minutes, and seconds until Christmas or any special date. Holiday countdown with timezone support and flexible time precision modes.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "16-10-aspect-ratio-calculator",
    category: "other",
    slugs: {
      en: "16-10-aspect-ratio-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "16:10 Aspect Ratio Calculator - Screen & Display Dimensions",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate 16:10 screen dimensions, diagonal, pixel density, and area for monitors and laptops. Supports pixels, cm, inches, and mm units.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "16-9-aspect-ratio-calculator",
    category: "other",
    slugs: {
      en: "16-9-aspect-ratio-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "16:9 Aspect Ratio Calculator - Screen & Display Dimensions",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate 16:9 screen dimensions, diagonal, pixel density, and area for TVs and monitors. Supports pixels, cm, inches, and mm units.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "3d-printing-cost-calculator",
    category: "other",
    slugs: {
      en: "3d-printing-cost-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "3D Printing Cost Calculator - Filament & Total Cost",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate the complete cost of 3D printing projects including filament, electricity, machine depreciation, and labor. Accurate cost breakdown.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "angle-of-impact-calculator",
    category: "other",
    slugs: {
      en: "angle-of-impact-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Angle of Impact Calculator - Collision & Trajectory Analysis",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate impact angles, exit velocity, and energy loss for any collision. Enter velocity, angles, coefficient of restitution, and mass for instant results.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "antipode-calculator",
    category: "other",
    slugs: {
      en: "antipode-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Antipode Calculator - Find Earth's Opposite Point",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Find the exact antipodal coordinates for any location on Earth. Enter latitude and longitude to get the diametrically opposite point and great-circle distance.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "aquarium-calculator",
    category: "other",
    slugs: {
      en: "aquarium-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Aquarium Calculator - Volume, Fish Capacity & Maintenance",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate aquarium volume, safe fish capacity, required filtration flow, and weekly water change volume. Essential planning tool for aquarium hobbyists.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "aquarium-glass-thickness-calculator",
    category: "other",
    slugs: {
      en: "aquarium-glass-thickness-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Aquarium Glass Thickness Calculator - Safe Tank Design",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate the minimum safe glass thickness for any aquarium tank. Uses hydrostatic pressure and plate-bending formulas for float, tempered, and acrylic panels.",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    }
  },
  {
    id: "aspect-ratio-calculator",
    category: "other",
    slugs: {
      en: "aspect-ratio-calculator",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    titles: {
      en: "Aspect Ratio Calculator - Screen, Video & Image Ratios",
      "zh-CN": "",
      "zh-TW": "",
      ja: "",
      ko: "",
      es: "",
      fr: "",
      de: "",
      pt: "",
      ru: ""
    },
    descriptions: {
      en: "Calculate the aspect ratio of any display, video, or image. Get simplified W:H ratio, decimal value, and nearest standard format name instantly.",
      "zh-CN": "",
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
