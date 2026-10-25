/** 单位换算数据层:全部换算系数为国际精确定义(SI/国际码制),纯数学。
 *  温度用变换函数(非乘法系数);data 千进制与二进制并存(KB≠KiB,页面注明)。 */

export interface Unit {
  /** 短码(slug 用,不得含 '-to-') */
  id: string
  name: string
  symbol: string
  /** 相对类别基准单位的精确因子 */
  factor: number
  /** 常用换算值(数值页用) */
  common: number[]
}

export interface Category {
  key: string
  label: string
  base: string
  baseSymbol: string
  units: Unit[]
  /** 温度类:非线性变换 */
  transform?: boolean
}

export const CATEGORIES: Category[] = [
  {
    key: 'length', label: 'Length', base: 'meter', baseSymbol: 'm',
    units: [
      { id: 'mm', name: 'Millimeter', symbol: 'mm', factor: 0.001, common: [1, 5, 10, 50, 100] },
      { id: 'cm', name: 'Centimeter', symbol: 'cm', factor: 0.01, common: [10, 50, 100, 150, 165, 170, 175, 180, 185, 190, 200] },
      { id: 'm', name: 'Meter', symbol: 'm', factor: 1, common: [1, 2, 5, 10, 100] },
      { id: 'km', name: 'Kilometer', symbol: 'km', factor: 1000, common: [1, 5, 10, 21.0975, 42.195, 100] },
      { id: 'in', name: 'Inch', symbol: 'in', factor: 0.0254, common: [1, 6, 12, 32, 65] },
      { id: 'ft', name: 'Foot', symbol: 'ft', factor: 0.3048, common: [1, 5, 6, 10, 100] },
      { id: 'yd', name: 'Yard', symbol: 'yd', factor: 0.9144, common: [1, 10, 100] },
      { id: 'mi', name: 'Mile', symbol: 'mi', factor: 1609.344, common: [1, 5, 10, 26.2] },
      { id: 'nmi', name: 'Nautical mile', symbol: 'nmi', factor: 1852, common: [1, 10, 100] },
      { id: 'um', name: 'Micrometer', symbol: 'µm', factor: 0.000001, common: [1, 10, 100] },
    ],
  },
  {
    key: 'weight', label: 'Weight', base: 'kilogram', baseSymbol: 'kg',
    units: [
      { id: 'g', name: 'Gram', symbol: 'g', factor: 0.001, common: [1, 100, 500] },
      { id: 'kg', name: 'Kilogram', symbol: 'kg', factor: 1, common: [1, 40, 50, 60, 70, 80, 90, 100, 120, 150] },
      { id: 't', name: 'Metric ton', symbol: 't', factor: 1000, common: [1, 10] },
      { id: 'oz', name: 'Ounce', symbol: 'oz', factor: 0.028349523125, common: [1, 8, 16] },
      { id: 'lb', name: 'Pound', symbol: 'lb', factor: 0.45359237, common: [1, 100, 120, 130, 140, 150, 160, 180, 200, 250] },
      { id: 'st', name: 'Stone', symbol: 'st', factor: 6.35029318, common: [8, 10, 12, 14, 16, 20] },
      { id: 'ton-us', name: 'Ton (US short)', symbol: 'ton', factor: 907.18474, common: [1, 10] },
    ],
  },
  {
    key: 'temperature', label: 'Temperature', base: 'celsius', baseSymbol: '°C', transform: true,
    units: [
      { id: 'c', name: 'Celsius', symbol: '°C', factor: 1, common: [-40, -20, 0, 10, 20, 25, 30, 37, 40, 100] },
      { id: 'f', name: 'Fahrenheit', symbol: '°F', factor: 1, common: [-40, 0, 32, 50, 68, 72, 77, 98.6, 104, 212] },
      { id: 'k', name: 'Kelvin', symbol: 'K', factor: 1, common: [0, 233.15, 273.15, 293.15, 310.15, 373.15] },
    ],
  },
  {
    key: 'volume', label: 'Volume', base: 'liter', baseSymbol: 'L',
    units: [
      { id: 'ml', name: 'Milliliter', symbol: 'ml', factor: 0.001, common: [1, 100, 250, 500] },
      { id: 'l', name: 'Liter', symbol: 'L', factor: 1, common: [1, 2, 5, 10] },
      { id: 'm3', name: 'Cubic meter', symbol: 'm³', factor: 1000, common: [1] },
      { id: 'tsp', name: 'Teaspoon (US)', symbol: 'tsp', factor: 0.00492892159375, common: [1, 4] },
      { id: 'tbsp', name: 'Tablespoon (US)', symbol: 'tbsp', factor: 0.01478676478125, common: [1, 2, 16] },
      { id: 'floz', name: 'Fluid ounce (US)', symbol: 'fl oz', factor: 0.0295735295625, common: [1, 8, 16] },
      { id: 'cup', name: 'Cup (US)', symbol: 'cup', factor: 0.2365882365, common: [1, 2, 4] },
      { id: 'pt', name: 'Pint (US)', symbol: 'pt', factor: 0.473176473, common: [1, 2] },
      { id: 'qt', name: 'Quart (US)', symbol: 'qt', factor: 0.946352946, common: [1, 4] },
      { id: 'gal', name: 'Gallon (US)', symbol: 'gal', factor: 3.785411784, common: [1, 5, 10] },
      { id: 'gal-uk', name: 'Gallon (UK)', symbol: 'gal (UK)', factor: 4.54609, common: [1, 10] },
    ],
  },
  {
    key: 'area', label: 'Area', base: 'square meter', baseSymbol: 'm²',
    units: [
      { id: 'cm2', name: 'Square centimeter', symbol: 'cm²', factor: 0.0001, common: [100, 10000] },
      { id: 'm2', name: 'Square meter', symbol: 'm²', factor: 1, common: [1, 50, 100] },
      { id: 'km2', name: 'Square kilometer', symbol: 'km²', factor: 1e6, common: [1, 100] },
      { id: 'ft2', name: 'Square foot', symbol: 'ft²', factor: 0.09290304, common: [100, 500, 1000, 2000] },
      { id: 'yd2', name: 'Square yard', symbol: 'yd²', factor: 0.83612736, common: [1, 100] },
      { id: 'acre', name: 'Acre', symbol: 'acre', factor: 4046.8564224, common: [1, 10, 100] },
      { id: 'ha', name: 'Hectare', symbol: 'ha', factor: 10000, common: [1, 10, 100] },
      { id: 'mi2', name: 'Square mile', symbol: 'mi²', factor: 2589988.110336, common: [1, 10] },
    ],
  },
  {
    key: 'speed', label: 'Speed', base: 'meter per second', baseSymbol: 'm/s',
    units: [
      { id: 'ms', name: 'Meter per second', symbol: 'm/s', factor: 1, common: [1, 10, 30] },
      { id: 'kmh', name: 'Kilometer per hour', symbol: 'km/h', factor: 5 / 18, common: [30, 50, 60, 80, 100, 120] },
      { id: 'mph', name: 'Mile per hour', symbol: 'mph', factor: 0.44704, common: [25, 55, 65, 70, 100] },
      { id: 'kn', name: 'Knot', symbol: 'kn', factor: 1852 / 3600, common: [10, 20, 30] },
      { id: 'fts', name: 'Foot per second', symbol: 'ft/s', factor: 0.3048, common: [10, 100] },
    ],
  },
  {
    key: 'time', label: 'Time', base: 'second', baseSymbol: 's',
    units: [
      { id: 'ms', name: 'Millisecond', symbol: 'ms', factor: 0.001, common: [1, 500] },
      { id: 's', name: 'Second', symbol: 's', factor: 1, common: [1, 30, 60] },
      { id: 'min', name: 'Minute', symbol: 'min', factor: 60, common: [1, 5, 30, 60] },
      { id: 'h', name: 'Hour', symbol: 'h', factor: 3600, common: [1, 8, 24] },
      { id: 'day', name: 'Day', symbol: 'day', factor: 86400, common: [1, 7, 30, 365] },
      { id: 'week', name: 'Week', symbol: 'week', factor: 604800, common: [1, 4, 52] },
      { id: 'mo', name: 'Month (avg)', symbol: 'month', factor: 2629746, common: [1, 12] },
      { id: 'yr', name: 'Year (365.2425 d)', symbol: 'year', factor: 31556952, common: [1, 10] },
    ],
  },
  {
    key: 'data', label: 'Data storage', base: 'byte', baseSymbol: 'B',
    units: [
      { id: 'bit', name: 'Bit', symbol: 'bit', factor: 0.125, common: [1, 8] },
      { id: 'b', name: 'Byte', symbol: 'B', factor: 1, common: [1] },
      { id: 'kb', name: 'Kilobyte (1000)', symbol: 'KB', factor: 1e3, common: [1, 100, 1000] },
      { id: 'kib', name: 'Kibibyte (1024)', symbol: 'KiB', factor: 1024, common: [1, 1024] },
      { id: 'mb', name: 'Megabyte (1000²)', symbol: 'MB', factor: 1e6, common: [1, 500] },
      { id: 'mib', name: 'Mebibyte', symbol: 'MiB', factor: 1048576, common: [1, 100] },
      { id: 'gb', name: 'Gigabyte (1000³)', symbol: 'GB', factor: 1e9, common: [1, 16, 64, 128, 256, 512] },
      { id: 'gib', name: 'Gibibyte', symbol: 'GiB', factor: 1073741824, common: [1, 8, 16] },
      { id: 'tb', name: 'Terabyte (1000⁴)', symbol: 'TB', factor: 1e12, common: [1, 2] },
      { id: 'tib', name: 'Tebibyte', symbol: 'TiB', factor: 1099511627776, common: [1] },
    ],
  },
  {
    key: 'pressure', label: 'Pressure', base: 'pascal', baseSymbol: 'Pa',
    units: [
      { id: 'pa', name: 'Pascal', symbol: 'Pa', factor: 1, common: [101325] },
      { id: 'kpa', name: 'Kilopascal', symbol: 'kPa', factor: 1000, common: [101.325, 250] },
      { id: 'bar', name: 'Bar', symbol: 'bar', factor: 1e5, common: [1, 2.5] },
      { id: 'psi', name: 'PSI', symbol: 'psi', factor: 6894.757293168, common: [1, 14.696, 32] },
      { id: 'atm', name: 'Atmosphere', symbol: 'atm', factor: 101325, common: [1] },
      { id: 'mmhg', name: 'mmHg', symbol: 'mmHg', factor: 133.322387415, common: [760] },
    ],
  },
  {
    key: 'energy', label: 'Energy', base: 'joule', baseSymbol: 'J',
    units: [
      { id: 'j', name: 'Joule', symbol: 'J', factor: 1, common: [1, 1000] },
      { id: 'kj', name: 'Kilojoule', symbol: 'kJ', factor: 1000, common: [1, 500] },
      { id: 'cal', name: 'Calorie (th)', symbol: 'cal', factor: 4.184, common: [1, 100] },
      { id: 'kcal', name: 'Kilocalorie (food)', symbol: 'kcal', factor: 4184, common: [100, 500, 2000] },
      { id: 'wh', name: 'Watt hour', symbol: 'Wh', factor: 3600, common: [1, 500] },
      { id: 'kwh', name: 'Kilowatt hour', symbol: 'kWh', factor: 3.6e6, common: [1, 10, 100] },
      { id: 'btu', name: 'BTU', symbol: 'BTU', factor: 1055.05585262, common: [1, 10000] },
    ],
  },
]

export function categoryByUnit(id: string): Category | null {
  for (const c of CATEGORIES) if (c.units.some((u) => u.id === id)) return c
  return null
}

export function categoryByKey(key: string): Category | null {
  return CATEGORIES.find((c) => c.key === key) ?? null
}

export function unitIn(cat: Category, id: string): Unit | null {
  return cat.units.find((u) => u.id === id) ?? null
}

export function fmtFactor(n: number): string {
  if (n === 0) return '0'
  if (Number.isInteger(n)) return String(n)
  return String(n)
}

/** 换算核心:temperature 用变换,其余用因子比。value 单位 from → 单位 to。 */
export function convert(value: number, from: Unit, to: Unit, cat: Category): number {
  if (cat.transform) {
    // 仅温度三单位:以摄氏度为中介
    let c: number
    if (from.id === 'c') c = value
    else if (from.id === 'f') c = (value - 32) * (5 / 9)
    else c = value - 273.15
    if (to.id === 'c') return c
    if (to.id === 'f') return c * (9 / 5) + 32
    return c + 273.15
  }
  return (value * from.factor) / to.factor
}

/** 数值显示:大数带千分位,常规 6 位有效。 */
export function fmtConv(n: number): string {
  if (!Number.isFinite(n)) return '—'
  if (n !== 0 && (Math.abs(n) >= 1e7 || Math.abs(n) < 1e-4)) return n.toExponential(4)
  return String(Math.round(n * 1e6) / 1e6)
}
