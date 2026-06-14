import type { ToolEntry } from "@/data/tools";

export const tools: ToolEntry[] = [
  {
    id: "ohms-law-calculator",
    category: "physic",
    slugs: {
      en: "ohms-law-calculator",
      "zh-CN": "ohm-dinglv-jisuanqi",
      "zh-TW": "ohm-dinglv-jisuanqi",
      ja: "ohm-no-hou-sanshiki",
      ko: "ohm-beobgye-sgye",
      es: "calculadora-ley-de-ohm",
      fr: "calculateur-loi-dohm",
      de: "ohmsches-gesetz-rechner",
      pt: "calculadora-lei-de-ohm",
      ru: "kalkulyator-zakona-oma"
    },
    titles: {
      en: "Ohm's Law Calculator for Voltage, Current, Resistance",
      "zh-CN": "欧姆定律计算器：电压、电流、电阻",
      "zh-TW": "歐姆定律計算器：電壓、電流、電阻",
      ja: "オームの法則計算機：電圧・電流・抵抗",
      ko: "옴의 법칙 계산기: 전압, 전류, 저항",
      es: "Calculadora de Ohm: voltaje, corriente, resistencia",
      fr: "Calculateur de la loi d’Ohm : tension, courant, résistance",
      de: "Ohmsches-Gesetz-Rechner: Spannung, Strom, Widerstand",
      pt: "Calculadora da lei de Ohm: tensão, corrente, resistência",
      ru: "Калькулятор закона Ома: напряжение, ток, сопротивление"
    },
    descriptions: {
      en: "Ohm's Law calculator: enter any two of voltage, current, resistance, or power to instantly solve the rest using V=IR and P=VI for circuit design.",
      "zh-CN": "欧姆定律计算器：输入电压、电流、电阻或功率中的任意两项，即可用 V=IR 和 P=VI 立即算出其余结果。",
      "zh-TW": "歐姆定律計算器：輸入電壓、電流、電阻或功率中的任兩項，即可用 V=IR 與 P=VI 立即算出其餘結果。",
      ja: "オームの法則計算機：電圧・電流・抵抗・電力のうち2つを入力すると、V=IR と P=VI で残りをすぐ計算します。",
      ko: "옴의 법칙 계산기: 전압, 전류, 저항, 전력 중 두 가지만 입력하면 V=IR과 P=VI로 나머지를 바로 계산합니다.",
      es: "Calculadora de la ley de Ohm: ingresa dos valores de voltaje, corriente, resistencia o potencia y resuelve el resto con V=IR y P=VI.",
      fr: "Calculateur de la loi d’Ohm : saisissez deux valeurs parmi tension, courant, résistance ou puissance pour résoudre le reste avec V=IR et P=VI.",
      de: "Ohmsches-Gesetz-Rechner: Gib zwei Werte aus Spannung, Strom, Widerstand oder Leistung ein und berechne den Rest mit V=IR und P=VI.",
      pt: "Calculadora da lei de Ohm: informe dois valores de tensão, corrente, resistência ou potência e resolva o restante com V=IR e P=VI.",
      ru: "Калькулятор закона Ома: введите любые два значения из напряжения, тока, сопротивления или мощности и сразу вычислите остальное по V=IR и P=VI."
    }
  },
  {
    id: "wheatstone-bridge-calculator",
    category: "physic",
    slugs: {
      en: "wheatstone-bridge-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Wheatstone Bridge Calculator – Measure Unknown Resistance",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate unknown resistance using the Wheatstone bridge circuit. Enter R1, R2, R3, voltage ratio, and supply voltage for precise resistance measurement.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "wiens-law-calculator",
    category: "physic",
    slugs: {
      en: "wiens-law-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Wien's Law Calculator – Peak Wavelength from Temperature",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate the peak wavelength of blackbody radiation from temperature using Wien's displacement law. Perfect for physics, astronomy, and thermal analysis.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "wind-correction-angle-calculator",
    category: "physic",
    slugs: {
      en: "wind-correction-angle-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Wind Correction Angle Calculator – Aviation Navigation",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate wind correction angle, true heading, and ground speed. Essential aviation tool for pilots to compensate for wind drift accurately.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "wind-load-calculator",
    category: "physic",
    slugs: {
      en: "wind-load-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Wind Load Calculator – Wind Pressure and Force on Structures",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate wind load, dynamic pressure, and wind force on structures. Essential tool for structural engineers using wind speed, dimensions, and exposure factors.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "wing-loading-calculator",
    category: "physic",
    slugs: {
      en: "wing-loading-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Wing Loading Calculator – Stall Speed and Performance",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate aircraft wing loading and stall speed from weight and wing area. Supports metric and imperial units for aircraft, gliders, and RC models.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "water-viscosity-calculator",
    category: "physic",
    slugs: {
      en: "water-viscosity-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Water Viscosity Calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate water dynamic viscosity, kinematic viscosity, density, and Reynolds number from temperature, pressure, flow velocity, and pipe size fast.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "watt-calculator",
    category: "physic",
    slugs: {
      en: "watt-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Watt Calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate volts, amps, ohms, watts, and optional watt-hours by entering any two electrical values, then solve the rest for quick circuit checks.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "watt-converter",
    category: "physic",
    slugs: {
      en: "watt-converter",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Watt Converter",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Convert watts, kilowatts, megawatts, horsepower, BTU per hour, calories per second, and more with accurate power-unit factors.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "watt-hour-calculator",
    category: "physic",
    slugs: {
      en: "watt-hour-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Watt Hour Calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate daily watt-hours, monthly kilowatt-hours, and electricity cost from appliance wattage, usage time, monthly days, and utility rate.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "watts-to-amps-calculator",
    category: "physic",
    slugs: {
      en: "watts-to-amps-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Watts to Amps Calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Convert watts to amps from power, voltage, and optional power factor for DC or AC loads so you can size circuits and compare current draw.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "volt-to-electron-volt-calculator",
    category: "physic",
    slugs: {
      en: "volt-to-electron-volt-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Volt to Electron Volt Calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Convert voltage to electron volts (eV) and joules instantly. Essential for physics, electronics, and quantum mechanics calculations.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "voltage-divider-calculator",
    category: "physic",
    slugs: {
      en: "voltage-divider-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Voltage Divider Calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate output voltage, current, and power dissipation for resistor voltage divider circuits. Essential for electronics engineers and students.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "voltage-drop-calculator",
    category: "physic",
    slugs: {
      en: "voltage-drop-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Voltage Drop Calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate voltage drop in electrical wire runs from current, length, and resistance. Find voltage drop percentage and power loss for safe wiring.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "voltage-regulation-calculator",
    category: "physic",
    slugs: {
      en: "voltage-regulation-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Voltage Regulation Calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate load regulation and line regulation for power supplies. Determine voltage stability from no-load and full-load voltage values.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "volume-to-mass-calculator",
    category: "physic",
    slugs: {
      en: "volume-to-mass-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Volume to Mass Calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate mass from volume and density with unit selection. Perfect for engineering, chemistry, and material science applications.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "von-mises-stress-calculator",
    category: "physic",
    slugs: {
      en: "von-mises-stress-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Von Mises Stress Calculator – Yield & Safety Analysis",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate von Mises equivalent stress and factor of safety from normal and shear stress components. Essential for structural and FEA yield analysis.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "vswr-calculator-voltage-standing-wave-ratio-calculator",
    category: "physic",
    slugs: {
      en: "vswr-calculator-voltage-standing-wave-ratio-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "VSWR Calculator – Voltage Standing Wave Ratio",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate VSWR, return loss, mismatch loss, and transmission efficiency from power or impedance measurements for RF transmission line analysis.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "warp-speed-calculator",
    category: "physic",
    slugs: {
      en: "warp-speed-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Warp Speed Calculator – Star Trek Warp Factor",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate warp speed multiplier, travel time, and energy for any Star Trek warp factor. Fun physics tool for sci-fi fans and educators.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "water-density-calculator",
    category: "physic",
    slugs: {
      en: "water-density-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Water Density Calculator – Temperature, Salinity & Pressure",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate water density from temperature, salinity, and pressure using the UNESCO equation. Compare measured vs theoretical density for fresh and saltwater.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "water-heating-calculator",
    category: "physic",
    slugs: {
      en: "water-heating-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Water Heating Calculator – Energy, Time & Cost",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate energy, heating time, cost, and CO₂ emissions to heat water. Supports liters and gallons, electric and heat pump systems.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "torsional-stiffness-calculator",
    category: "physic",
    slugs: {
      en: "torsional-stiffness-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Torsional Stiffness Calculator – Shear Stress and Torque",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate torsional stiffness, maximum shear stress, polar moment of inertia, and strain energy for circular shafts using shear modulus and geometry.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "trajectory-calculator",
    category: "physic",
    slugs: {
      en: "trajectory-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Trajectory Calculator – Projectile Motion Range and Height",      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate projectile range, maximum height, and time of flight from initial velocity, launch angle, and initial height. Metric and imperial supported.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "transformer-sizing-calculator",
    category: "physic",
    slugs: {
      en: "transformer-sizing-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Transformer Sizing Calculator – Required kVA Rating",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate the required transformer kVA rating from load power, power factor, efficiency, temperature, and safety factor for reliable electrical system design.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "transistor-biasing-calculator",
    category: "physic",
    slugs: {
      en: "transistor-biasing-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Transistor Biasing Calculator – DC Operating Point",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate transistor DC operating point, collector current, voltage gain, and stability factor for voltage divider bias circuits. Ideal for amplifier design.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "transmission-calculator",
    category: "physic",
    slugs: {
      en: "transmission-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Transmission Calculator – Signal Power and Data Rate",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate free-space path loss, received signal power, SNR, Shannon capacity, and bandwidth efficiency for wireless and satellite communication links.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "thin-film-optical-coating-calculator",
    category: "physic",
    slugs: {
      en: "thin-film-optical-coating-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Thin Film Optical Coating Calculator – AR & HR",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate reflectance and transmittance of single-layer thin film coatings using Fresnel equations. Analyze AR and HR coatings for s- and p-polarizations.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "thin-lens-equation-calculator",
    category: "physic",
    slugs: {
      en: "thin-lens-equation-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Thin Lens Equation Calculator – Focal Length",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Solve the thin lens equation for focal length, object, or image distance. Find magnification and identify real, virtual, upright, or inverted images.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "three-phase-calculator",
    category: "physic",
    slugs: {
      en: "three-phase-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Three Phase Power Calculator – Voltage & Current",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate three-phase apparent, active, and reactive power from voltage, current, and power factor. Essential tool for electrical engineers.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "thrust-to-weight-ratio-calculator",
    category: "physic",
    slugs: {
      en: "thrust-to-weight-ratio-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Thrust to Weight Ratio Calculator – Aerospace Performance",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate thrust-to-weight ratio (TWR), net force, and net acceleration for rockets, aircraft, and drones. Instantly determine if your vehicle can lift off.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  },
  {
    id: "time-dilation-calculator",
    category: "physic",
    slugs: {
      en: "time-dilation-calculator",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    titles: {
      en: "Time Dilation Calculator – Einstein's Special Relativity",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    },
    descriptions: {
      en: "Calculate relativistic time dilation using Einstein's special relativity. Enter velocity and proper time to find dilated time and Lorentz factor.",
      "zh-CN": "", "zh-TW": "", ja: "", ko: "", es: "", fr: "", de: "", pt: "", ru: ""
    }
  }



];
