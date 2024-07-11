export interface ISolarDataResponse {
  hora_std: number[];
  hora_m: number[];
  inclinacion_solar: number[];
  azimuth_solar: number[];
  radiacion_extraterrestre: number[];
  irradiacion_extraterrestre: number[];
  potencia_tubo: number;
  potencia_haz: number[];
  potencia_difusa: number[];
  potencia_total: number[];
  energia_tubo: number;
  energia_n_tubo: number;
  energia_acumulado_dia: number;
  eficiencia_dia: number;
  energia_acumulado_dia_mendoza: number;
  eficiencia_dia_mendoza: number[];
  eficiencia_1: number[];
  energia_acumulada: number[];
}


export enum SolarDataKeys {
  HoraStd = "hora_std",
  HoraM = "hora_m",
  InclinacionSolar = "inclinacion_solar",
  AzimuthSolar = "azimuth_solar",
  RadiacionExtraterrestre = "radiacion_extraterrestre",
  IrradiacionExtraterrestre = "irradiacion_extraterrestre",
  PotenciaTubo = "potencia_tubo",
  PotenciaHaz = "potencia_haz",
  PotenciaDifusa = "potencia_difusa",
  PotenciaTotal = "potencia_total",
  EnergiaTubo = "energia_tubo",
  EnergiaNTubo = "energia_n_tubo",
  EnergiaAcumuladoDia = "energia_acumulado_dia",
  EficienciaDia = "eficiencia_dia",
  EnergiaAcumuladoDiaMendoza = "energia_acumulado_dia_mendoza",
  EficienciaDiaMendoza = "eficiencia_dia_mendoza",
  Eficiencia1 = "eficiencia_1",
  EnergiaAcumulada = "energia_acumulada"
}

export const resultsChartsList = [
  {
    title: 'Inclinación Solar', key: 'inclinacion_solar', x: SolarDataKeys.HoraStd, y: [SolarDataKeys.InclinacionSolar]
  },
  { title: 'Azimuth Solar', key: 'azimuth_solar', x: SolarDataKeys.HoraStd, y: [SolarDataKeys.AzimuthSolar] },
  {
    title:
      'Intensidad de la Radiación Extraterrestre sobre Superficie Horizontal [W/m2]',
    key: 'intensidad_radiación',
    x: SolarDataKeys.HoraStd, y: [SolarDataKeys.RadiacionExtraterrestre]
  },
  {
    title:
      'Irradiación Extraterrestre sobre Superficie Horizontal por Intervalo de Tiempo [J/m2 \\Deltat]',
    key: 'irradiación_intervalo',
    x: SolarDataKeys.HoraM, y: [SolarDataKeys.IrradiacionExtraterrestre]
  },
  {
    title: 'Evolucion del Numero de Nu.Gr/Pr', key: 'evolución_numero',
    x: SolarDataKeys.HoraStd, y: [SolarDataKeys.PotenciaHaz, SolarDataKeys.PotenciaDifusa, SolarDataKeys.PotenciaTotal]
  },
  {
    title: 'Evolucion del Numero de Reynolds', key: 'evolución_reynolds',
    x: SolarDataKeys.HoraStd, y: [SolarDataKeys.PotenciaHaz, SolarDataKeys.PotenciaDifusa, SolarDataKeys.PotenciaTotal]
  },
  {
    title: 'Flujo Masico de Agua Caiente que Sale del Tubo al Vacio',
    key: 'flujo_masico',
    x: SolarDataKeys.HoraStd, y: [SolarDataKeys.PotenciaHaz, SolarDataKeys.PotenciaDifusa, SolarDataKeys.PotenciaTotal]
  },
  {
    title: 'Velocidad Media Agua Caiente que Sale del Tubo al Vacio',
    key: 'velocidad_media',
  },
  {
    title:
      'Temperaturas de Mezcla, de Salida y del Tanque de la Terma Solar [C] - Correlacion de Mendoza (2023)',
    key: 'temperaturas_mezcla',
  },
  {
    title: 'Eficiencia Termica de la Terma Solar (según la 1ra ley)',
    key: 'eficiencia_termica',
  },
  {
    title: 'Energia Térmica acumulada en el termotanque [MJ]',
    key: 'energia_termica',
  },
];


export const transformDataForChart = (xData: number[], yDataArrays: number[][]): any[] => {
  return xData.map((x, index) => {
    const dataPoint: any = { x };
    yDataArrays.forEach((yData, yIndex) => {
      dataPoint[`y${yIndex}`] = yData[index];
    });
    return dataPoint;
  });
}
